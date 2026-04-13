/**
 * Payment Authorization Router
 * Handles secure payment authorization form submissions for chargeback protection.
 * Records are immutable after creation.
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import { paymentAuthorizations } from "../drizzle/schema";
import { eq, desc, like, and, gte, lte, or } from "drizzle-orm";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import nodemailer from "nodemailer";
import twilio from "twilio";
import { storagePut } from "./storage";
import { invokeLLM } from "./_core/llm";
import type { Request } from "express";

// ─── Shop-Ware RO Extractor ───────────────────────────────────────────────────
export type RoExtractedData = {
  customerName: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  invoiceNumber: string;
  serviceLocation: "Fort Lauderdale" | "Wilton Manors" | "";
  serviceDescription: string;
  authorizedAmount: string;
  serviceAdvisor: string;
};

async function extractRoFromUrl(url: string): Promise<RoExtractedData & { email?: string; phone?: string; billingStreet?: string; billingCity?: string; billingState?: string; billingZip?: string }> {
  // Parse the Shop-Ware URL to extract work order ID and auth_token
  // Supports: https://verticalautomotive.shop-ware.com/work_orders/{id}?auth_token={token}
  const urlObj = new URL(url);
  const authToken = urlObj.searchParams.get("auth_token");
  const pathMatch = urlObj.pathname.match(/\/work_orders\/(\d+)/);
  if (!authToken || !pathMatch) {
    throw new Error("Invalid Shop-Ware URL — expected format: https://verticalautomotive.shop-ware.com/work_orders/{id}?auth_token={token}");
  }
  const workOrderId = pathMatch[1];
  const baseUrl = `${urlObj.protocol}//${urlObj.host}`;
  const headers = { "Accept": "application/json", "User-Agent": "VerticalAutomotive/1.0" };

  // 1. Fetch the work order
  const woResp = await fetch(`${baseUrl}/api/internal/work_orders/${workOrderId}?auth_token=${authToken}`, { headers });
  if (!woResp.ok) throw new Error(`Shop-Ware API error: ${woResp.status}`);
  const wo = await woResp.json() as {
    number: number;
    odometer_in: number | null;
    customer: { id: number; full_name: string };
    vehicle: { id: number; model: string };
    shop: { name: string };
    advisor: { name: string } | null;
    invoiced_work_order_financial?: { total_cents?: number; grand_total_cents?: number };
  };

  // 2. Fetch customer details
  const custResp = await fetch(`${baseUrl}/api/internal/customers/${wo.customer.id}?auth_token=${authToken}`, { headers });
  const customer = custResp.ok ? await custResp.json() as {
    full_name: string;
    contact_email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    primary_phone?: { international: string };
  } : null;

  // 3. Fetch vehicle details
  const vehResp = await fetch(`${baseUrl}/api/internal/vehicles/${wo.vehicle.id}?auth_token=${authToken}`, { headers });
  const vehicle = vehResp.ok ? await vehResp.json() as {
    year: string;
    make: string;
    model: string;
    plate: string;
    vin: string;
  } : null;

  // 4. Fetch cart for line items and total
  const cartResp = await fetch(`${baseUrl}/api/internal/work_orders/${workOrderId}/cart?auth_token=${authToken}`, { headers });
  const cart = cartResp.ok ? await cartResp.json() as {
    recommendations?: Array<{ name: string; total_cents?: number }>;
    total_cents?: number;
    grand_total_cents?: number;
  } : null;

  // Determine service location from shop name
  const shopName = wo.shop?.name ?? "";
  let serviceLocation: "Fort Lauderdale" | "Wilton Manors" | "" = "";
  if (shopName.toLowerCase().includes("wilton")) serviceLocation = "Wilton Manors";
  else if (shopName.toLowerCase().includes("fort lauderdale") || shopName.toLowerCase().includes("ftl")) serviceLocation = "Fort Lauderdale";

  // Build service description from cart line items
  const lineItems = cart?.recommendations?.map((r: { name: string }) => r.name).filter(Boolean) ?? [];
  const serviceDescription = lineItems.length > 0 ? lineItems.join("; ") : `RO #${wo.number}`;

  // Determine total — prefer cart grand_total, then invoiced financial
  const totalCents = cart?.grand_total_cents ?? cart?.total_cents ?? wo.invoiced_work_order_financial?.grand_total_cents ?? wo.invoiced_work_order_financial?.total_cents ?? 0;
  const authorizedAmount = totalCents > 0 ? (totalCents / 100).toFixed(2) : "";

  // Format phone
  const phone = customer?.primary_phone?.international ?? customer?.phone ?? "";

  return {
    customerName: customer?.full_name ?? wo.customer.full_name ?? "",
    email: customer?.contact_email ?? "",
    phone,
    billingStreet: customer?.address ?? "",
    billingCity: customer?.city ?? "",
    billingState: customer?.state ?? "",
    billingZip: customer?.zip ?? "",
    vehicleYear: vehicle?.year ?? "",
    vehicleMake: vehicle?.make ?? "",
    vehicleModel: vehicle?.model ?? wo.vehicle.model ?? "",
    licensePlate: vehicle?.plate ?? "",
    vin: vehicle?.vin ?? "",
    mileage: wo.odometer_in ? String(wo.odometer_in) : "",
    invoiceNumber: String(wo.number),
    serviceLocation,
    serviceDescription,
    authorizedAmount,
    serviceAdvisor: wo.advisor?.name ?? "",
  };
}

// ─── Email helpers ────────────────────────────────────────────────────────────
const LOCATION_EMAILS: Record<string, string> = {
  "Fort Lauderdale": "ftlauderdale@verticalautomotive.com",
  "Wilton Manors": "contact@verticalautomotive.com",
};

function getTransporter() {
  // Uses SMTP env vars if set; falls back to a no-op in dev
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  // Dev fallback — log only
  return null;
}

async function sendAuthEmails(record: typeof paymentAuthorizations.$inferSelect, pdfUrl: string) {
  const transporter = getTransporter();
  if (!transporter) {
    console.log("[PaymentAuth] No SMTP configured — skipping email send");
    return;
  }

  const subject = `Payment Authorization ${record.referenceNumber} — ${record.fullLegalName}`;
  const body = `
Payment Authorization Received

Reference: ${record.referenceNumber}
Customer: ${record.fullLegalName}
Email: ${record.email}
Phone: ${record.phone}
Invoice: ${record.invoiceNumber}
Amount: $${record.authorizedAmount}
Service: ${record.serviceDescription}
Location: ${record.serviceLocation}
Signed At: ${new Date(Number(record.signedAt)).toLocaleString()}
IP Address: ${record.submissionIp ?? "N/A"}

PDF: ${pdfUrl}
  `.trim();

  const recipients = [
    record.email,
    LOCATION_EMAILS[record.serviceLocation] ?? "contact@verticalautomotive.com",
    "ftlauderdale@verticalautomotive.com",
    "contact@verticalautomotive.com",
  ].filter((v, i, a) => a.indexOf(v) === i); // dedupe

  for (const to of recipients) {
    try {
      await transporter.sendMail({
        from: '"Vertical Automotive" <noreply@verticalautomotive.com>',
        to,
        subject,
        text: body,
        attachments: [{ filename: `${record.referenceNumber}.pdf`, path: pdfUrl }],
      });
    } catch (err) {
      console.error(`[PaymentAuth] Failed to send email to ${to}:`, err);
    }
  }
}

// ─── Reference number generator ──────────────────────────────────────────────
async function generateReferenceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const dbRef = await getDb();
  const count = dbRef
    ? await dbRef.select({ id: paymentAuthorizations.id }).from(paymentAuthorizations)
    : [];
  const seq = String(count.length + 1).padStart(5, "0");
  return `VA-${year}-${seq}`;
}

// ─── PDF Generator ────────────────────────────────────────────────────────────
async function generatePDF(record: typeof paymentAuthorizations.$inferSelect): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([612, 792]); // US Letter
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontReg = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const blue = rgb(0.04, 0.47, 0.91);
  const dark = rgb(0.1, 0.1, 0.1);
  const gray = rgb(0.4, 0.4, 0.4);
  const lightGray = rgb(0.9, 0.9, 0.9);

  let y = height - 40;

  // Header bar
  page.drawRectangle({ x: 0, y: height - 70, width, height: 70, color: blue });
  page.drawText("VERTICAL AUTOMOTIVE", { x: 40, y: height - 35, size: 18, font: fontBold, color: rgb(1, 1, 1) });
  page.drawText("Payment Authorization Form", { x: 40, y: height - 55, size: 11, font: fontReg, color: rgb(0.9, 0.9, 0.9) });
  page.drawText(`Ref: ${record.referenceNumber}`, { x: width - 200, y: height - 45, size: 11, font: fontBold, color: rgb(1, 1, 1) });

  y = height - 90;

  const section = (title: string) => {
    y -= 18;
    page.drawRectangle({ x: 36, y: y - 4, width: width - 72, height: 18, color: lightGray });
    page.drawText(title.toUpperCase(), { x: 40, y, size: 9, font: fontBold, color: blue });
    y -= 14;
  };

  const field = (label: string, value: string) => {
    if (y < 80) return; // overflow guard
    page.drawText(`${label}:`, { x: 40, y, size: 8, font: fontBold, color: gray });
    page.drawText(value || "—", { x: 180, y, size: 8, font: fontReg, color: dark });
    y -= 13;
  };

  // Section 1 — Customer
  section("Customer Information");
  field("Full Legal Name", record.fullLegalName);
  field("Email", record.email);
  field("Phone", record.phone);
  field("Billing Address", `${record.billingStreet}, ${record.billingCity}, ${record.billingState} ${record.billingZip}`);
  field("Driver's License", record.driversLicense);

  // Section 2 — Vehicle
  section("Vehicle Information");
  field("Vehicle", `${record.vehicleYear} ${record.vehicleMake} ${record.vehicleModel}`);
  field("VIN", record.vin ?? "Not provided");
  field("License Plate", record.licensePlate ?? "Not provided");
  field("Mileage at Drop-off", record.mileage ?? "Not provided");

  // Section 3 — Service & Payment
  section("Service & Payment Details");
  field("Service Location", record.serviceLocation);
  field("Invoice / RO Number", record.invoiceNumber);
  field("Authorized Amount", `$${record.authorizedAmount}`);
  field("Payment Method", record.paymentMethod);
  field("Authorization Date", record.authorizationDate);
  y -= 4;
  page.drawText("Services Authorized:", { x: 40, y, size: 8, font: fontBold, color: gray });
  y -= 13;
  // Word-wrap service description
  const words = record.serviceDescription.split(" ");
  let line = "";
  for (const word of words) {
    if ((line + word).length > 90) {
      page.drawText(line.trim(), { x: 180, y, size: 8, font: fontReg, color: dark });
      y -= 12;
      line = word + " ";
    } else {
      line += word + " ";
    }
  }
  if (line.trim()) {
    page.drawText(line.trim(), { x: 180, y, size: 8, font: fontReg, color: dark });
    y -= 12;
  }

  // Section 4 — Legal Agreement
  section("Authorization Agreement");
  const legalLines = [
    "I, the undersigned, hereby authorize Vertical Automotive to charge the amount specified above",
    "to my payment method for the vehicle repair services described. I confirm that:",
    "",
    "1. I am the authorized cardholder or have authorization to use the payment method provided.",
    "2. I have reviewed and approved the repair services and associated costs listed above.",
    "3. I understand that all sales are final upon completion of authorized services.",
    "4. I acknowledge Vertical Automotive's 36,000-mile / 36-month warranty covers all repair work.",
    "5. I understand that if I dispute this charge after services have been rendered, this signed",
    "   authorization form will be submitted as evidence of my consent.",
    "6. I confirm the vehicle information provided is accurate and the described services were",
    "   performed on my vehicle.",
    "7. I have had the opportunity to ask questions about the services and costs before authorizing.",
  ];
  for (const ln of legalLines) {
    if (y < 120) break;
    page.drawText(ln, { x: 40, y, size: 7.5, font: fontReg, color: dark });
    y -= 11;
  }

  // Section 5 — Signature
  y -= 6;
  section("Digital Signature");
  field("Signed By (typed)", record.signatureName);
  field("Signed At", new Date(Number(record.signedAt)).toLocaleString("en-US", { timeZone: "America/New_York" }) + " ET");
  field("IP Address", record.submissionIp ?? "N/A");
  field("User Agent", (record.userAgent ?? "N/A").substring(0, 80));

  // Embed signature image
  if (record.signatureImage && record.signatureImage.startsWith("data:image/png;base64,")) {
    try {
      const base64 = record.signatureImage.replace("data:image/png;base64,", "");
      const sigBytes = Buffer.from(base64, "base64");
      const sigImg = await pdfDoc.embedPng(sigBytes);
      const sigDims = sigImg.scale(0.4);
      y -= 8;
      page.drawText("Signature:", { x: 40, y, size: 8, font: fontBold, color: gray });
      y -= sigDims.height + 4;
      page.drawImage(sigImg, { x: 180, y, width: sigDims.width, height: sigDims.height });
      y -= 8;
    } catch (e) {
      console.error("[PaymentAuth] Failed to embed signature image:", e);
    }
  }

  // Footer
  page.drawLine({ start: { x: 36, y: 50 }, end: { x: width - 36, y: 50 }, thickness: 0.5, color: lightGray });
  page.drawText("Vertical Automotive | verticalautomotive.com | (954) 565-1518", {
    x: 40, y: 36, size: 7, font: fontReg, color: gray,
  });
  page.drawText(`Generated: ${new Date().toISOString()} | This document is legally binding.`, {
    x: 40, y: 24, size: 7, font: fontReg, color: gray,
  });

  return pdfDoc.save();
}

// ─── Input schema ─────────────────────────────────────────────────────────────
const submitSchema = z.object({
  // Customer
  fullLegalName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  billingStreet: z.string().min(3),
  billingCity: z.string().min(2),
  billingState: z.string().min(2),
  billingZip: z.string().min(4),
  driversLicense: z.string().min(3),
  // Vehicle
  vehicleYear: z.string().min(4),
  vehicleMake: z.string().min(1),
  vehicleModel: z.string().min(1),
  vin: z.string().optional(),
  licensePlate: z.string().optional(),
  mileage: z.string().optional(),
  // Service
  serviceLocation: z.enum(["Fort Lauderdale", "Wilton Manors"]),
  invoiceNumber: z.string().min(1),
  serviceDescription: z.string().min(3),
  authorizedAmount: z.string().min(1),
  paymentMethod: z.enum(["Credit Card", "Debit Card", "Other"]),
  authorizationDate: z.string().min(6),
  // Signature
  signatureImage: z.string().min(10), // base64 PNG
  signatureName: z.string().min(2),
  agreedToTerms: z.boolean(),
  confirmedCardholder: z.boolean(),
  agreedToEmailCopy: z.boolean(),
  signedAt: z.string(), // ms timestamp as string
  // Client metadata
  submissionIp: z.string().optional(),
  userAgent: z.string().optional(),
  // RO source
  roSourceUrl: z.string().url().optional(),
  roExtractedData: z.string().optional(), // JSON string
});

// ─── Router ───────────────────────────────────────────────────────────────────
export const paymentAuthRouter = router({
  /**
   * Public — customers submit the form
   */
  submit: publicProcedure
    .input(submitSchema)
    .mutation(async ({ input, ctx }) => {
      const req = (ctx as { req?: Request }).req;
      const ip = req?.ip ?? req?.headers?.["x-forwarded-for"]?.toString() ?? "unknown";
      const ua = req?.headers?.["user-agent"] ?? "unknown";

      const referenceNumber = await generateReferenceNumber();

      const record = {
        referenceNumber,
        fullLegalName: input.fullLegalName,
        email: input.email,
        phone: input.phone,
        billingStreet: input.billingStreet,
        billingCity: input.billingCity,
        billingState: input.billingState,
        billingZip: input.billingZip,
        driversLicense: input.driversLicense,
        vehicleYear: input.vehicleYear,
        vehicleMake: input.vehicleMake,
        vehicleModel: input.vehicleModel,
        vin: input.vin ?? null,
        licensePlate: input.licensePlate ?? null,
        mileage: input.mileage ?? null,
        serviceLocation: input.serviceLocation,
        invoiceNumber: input.invoiceNumber,
        serviceDescription: input.serviceDescription,
        authorizedAmount: input.authorizedAmount,
        paymentMethod: input.paymentMethod,
        authorizationDate: input.authorizationDate,
        signatureImage: input.signatureImage,
        signatureName: input.signatureName,
        agreedToTerms: input.agreedToTerms ? 1 : 0,
        confirmedCardholder: input.confirmedCardholder ? 1 : 0,
        agreedToEmailCopy: input.agreedToEmailCopy ? 1 : 0,
        signedAt: input.signedAt,
        submissionIp: ip,
        userAgent: ua,
        pdfUrl: null,
        usedInDispute: 0,
        disputeNotes: null,
        roSourceUrl: input.roSourceUrl ?? null,
        roExtractedData: input.roExtractedData ?? null,
      };

      const dbConn0 = await getDb();
      if (!dbConn0) throw new Error("Database not available");

      // Insert first to get the ID
      await dbConn0.insert(paymentAuthorizations).values(record);

      // Fetch the inserted record
      const dbConn = await getDb();
      if (!dbConn) throw new Error("Database not available");

      const [inserted] = await dbConn
        .select()
        .from(paymentAuthorizations)
        .where(eq(paymentAuthorizations.referenceNumber, referenceNumber))
        .limit(1);

      // Generate PDF
      let pdfUrl: string | null = null;
      try {
        const pdfBytes = await generatePDF(inserted);
        const key = `payment-authorizations/${referenceNumber}.pdf`;
        const { url } = await storagePut(key, Buffer.from(pdfBytes), "application/pdf");
        pdfUrl = url;
        // Update record with PDF URL
        const dbConn2 = await getDb();
        if (dbConn2) {
          await dbConn2
            .update(paymentAuthorizations)
            .set({ pdfUrl: url })
            .where(eq(paymentAuthorizations.referenceNumber, referenceNumber));
        }
        inserted.pdfUrl = url;
      } catch (err) {
        console.error("[PaymentAuth] PDF generation failed:", err);
      }

      // Send emails (non-blocking)
      sendAuthEmails(inserted, pdfUrl ?? "PDF generation failed").catch(console.error);

      return {
        success: true,
        referenceNumber,
        pdfUrl,
        customerName: input.fullLegalName,
        authorizedAmount: input.authorizedAmount,
        serviceLocation: input.serviceLocation,
        invoiceNumber: input.invoiceNumber,
      };
    }),

  /**
   * Protected — admin list with search/filter
   */
  list: protectedProcedure
    .input(z.object({
      search: z.string().optional(),
      location: z.enum(["Fort Lauderdale", "Wilton Manors", "all"]).default("all"),
      dateFrom: z.string().optional(),
      dateTo: z.string().optional(),
      disputeOnly: z.boolean().default(false),
      page: z.number().default(1),
      pageSize: z.number().default(25),
    }))
    .query(async ({ input }) => {
      const conditions = [];

      if (input.search) {
        conditions.push(
          or(
            like(paymentAuthorizations.fullLegalName, `%${input.search}%`),
            like(paymentAuthorizations.invoiceNumber, `%${input.search}%`),
            like(paymentAuthorizations.referenceNumber, `%${input.search}%`),
            like(paymentAuthorizations.email, `%${input.search}%`)
          )
        );
      }
      if (input.location !== "all") {
        conditions.push(eq(paymentAuthorizations.serviceLocation, input.location));
      }
      if (input.dateFrom) {
        conditions.push(gte(paymentAuthorizations.createdAt, new Date(input.dateFrom)));
      }
      if (input.dateTo) {
        conditions.push(lte(paymentAuthorizations.createdAt, new Date(input.dateTo)));
      }
      if (input.disputeOnly) {
        conditions.push(eq(paymentAuthorizations.usedInDispute, 1));
      }

      const dbList = await getDb();
      if (!dbList) return { records: [], total: 0, page: input.page, pageSize: input.pageSize };

      const query = conditions.length > 0
        ? dbList.select().from(paymentAuthorizations).where(and(...conditions)).orderBy(desc(paymentAuthorizations.createdAt))
        : dbList.select().from(paymentAuthorizations).orderBy(desc(paymentAuthorizations.createdAt));

      const all = await query;
      const total = all.length;
      const offset = (input.page - 1) * input.pageSize;
      const records = all.slice(offset, offset + input.pageSize).map((r: typeof paymentAuthorizations.$inferSelect) => ({
        ...r,
        signatureImage: "[redacted]", // don't send base64 in list view
      }));

      return { records, total, page: input.page, pageSize: input.pageSize };
    }),

  /**
   * Protected — get single record (full detail including signature)
   */
  get: protectedProcedure
    .input(z.object({ referenceNumber: z.string() }))
    .query(async ({ input }) => {
      const dbGet = await getDb();
      if (!dbGet) throw new Error("Database not available");
      const [record] = await dbGet
        .select()
        .from(paymentAuthorizations)
        .where(eq(paymentAuthorizations.referenceNumber, input.referenceNumber))
        .limit(1);
      if (!record) throw new Error("Record not found");
      return record;
    }),

  /**
   * Public — extract RO data from a Shop-Ware work order URL
   */
  extractRo: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      const data = await extractRoFromUrl(input.url);
      return { success: true, data };
    }),

  /**
   * Protected — re-extract RO data from the stored URL on an existing record
   */
  reExtractRo: protectedProcedure
    .input(z.object({ referenceNumber: z.string() }))
    .mutation(async ({ input }) => {
      const dbRe = await getDb();
      if (!dbRe) throw new Error("Database not available");
      const [record] = await dbRe
        .select({ roSourceUrl: paymentAuthorizations.roSourceUrl })
        .from(paymentAuthorizations)
        .where(eq(paymentAuthorizations.referenceNumber, input.referenceNumber))
        .limit(1);
      if (!record?.roSourceUrl) throw new Error("No RO URL stored for this record");
      const data = await extractRoFromUrl(record.roSourceUrl);
      const dbRe2 = await getDb();
      if (dbRe2) {
        await dbRe2
          .update(paymentAuthorizations)
          .set({ roExtractedData: JSON.stringify(data) })
          .where(eq(paymentAuthorizations.referenceNumber, input.referenceNumber));
      }
      return { success: true, data };
    }),

  /**
   * Protected — mark as used in dispute
   */
  markDispute: protectedProcedure
    .input(z.object({ referenceNumber: z.string(), notes: z.string().optional() }))
    .mutation(async ({ input }) => {
      const dbDisp = await getDb();
      if (!dbDisp) throw new Error("Database not available");
      await dbDisp
        .update(paymentAuthorizations)
        .set({ usedInDispute: 1, disputeNotes: input.notes ?? null })
        .where(eq(paymentAuthorizations.referenceNumber, input.referenceNumber));
      return { success: true };
    }),

  /**
   * Protected — export all matching records as CSV data
   */
  exportCsv: protectedProcedure
    .input(z.object({
      search: z.string().optional(),
      location: z.enum(["Fort Lauderdale", "Wilton Manors", "all"]).default("all"),
      dateFrom: z.string().optional(),
      dateTo: z.string().optional(),
    }))
    .query(async ({ input }) => {
      const conditions = [];
      if (input.search) {
        conditions.push(
          or(
            like(paymentAuthorizations.fullLegalName, `%${input.search}%`),
            like(paymentAuthorizations.invoiceNumber, `%${input.search}%`),
            like(paymentAuthorizations.referenceNumber, `%${input.search}%`)
          )
        );
      }
      if (input.location !== "all") {
        conditions.push(eq(paymentAuthorizations.serviceLocation, input.location));
      }
      if (input.dateFrom) {
        conditions.push(gte(paymentAuthorizations.createdAt, new Date(input.dateFrom)));
      }
      if (input.dateTo) {
        conditions.push(lte(paymentAuthorizations.createdAt, new Date(input.dateTo)));
      }

      const dbCsv = await getDb();
      if (!dbCsv) return { csv: "" };
      const records = conditions.length > 0
        ? await dbCsv.select().from(paymentAuthorizations).where(and(...conditions)).orderBy(desc(paymentAuthorizations.createdAt))
        : await dbCsv.select().from(paymentAuthorizations).orderBy(desc(paymentAuthorizations.createdAt));

      const headers = [
        "Reference", "Date", "Customer Name", "Email", "Phone",
        "Invoice", "Amount", "Location", "Vehicle", "Payment Method",
        "Dispute", "PDF URL",
      ];
      const rows = records.map((r: typeof paymentAuthorizations.$inferSelect) => [
        r.referenceNumber,
        r.createdAt.toISOString(),
        r.fullLegalName,
        r.email,
        r.phone,
        r.invoiceNumber,
        r.authorizedAmount,
        r.serviceLocation,
        `${r.vehicleYear} ${r.vehicleMake} ${r.vehicleModel}`,
        r.paymentMethod,
        r.usedInDispute ? "Yes" : "No",
        r.pdfUrl ?? "",
      ]);

      const csv = [headers, ...rows]
        .map((row: string[]) => row.map((v: string) => `"${String(v).replace(/"/g, '""')}"`).join(","))
        .join("\n");

      return { csv };
    }),

  /**
   * Protected — generate a pre-filled payment form link and send via SMS
   */
  sendFormLink: protectedProcedure
    .input(z.object({
      referenceNumber: z.string().optional(),
      // Customer phone to send the SMS to
      phone: z.string(),
      // Pre-fill params for the form URL
      customerName: z.string().optional(),
      invoiceNumber: z.string().optional(),
      authorizedAmount: z.string().optional(),
      serviceDescription: z.string().optional(),
      serviceLocation: z.string().optional(),
      vehicleYear: z.string().optional(),
      vehicleMake: z.string().optional(),
      vehicleModel: z.string().optional(),
      licensePlate: z.string().optional(),
      vin: z.string().optional(),
      mileage: z.string().optional(),
      // Origin URL so we can build the absolute link
      origin: z.string(),
    }))
    .mutation(async ({ input }) => {
      const sid = process.env.TWILIO_ACCOUNT_SID;
      const token = process.env.TWILIO_AUTH_TOKEN;
      const from = process.env.TWILIO_FROM_NUMBER;

      if (!sid || !token || !from) {
        throw new Error("Twilio credentials not configured");
      }

      // Build pre-filled form URL
      const params = new URLSearchParams();
      if (input.invoiceNumber) params.set("invoice", input.invoiceNumber);
      if (input.authorizedAmount) params.set("amount", input.authorizedAmount);
      if (input.serviceDescription) params.set("service", input.serviceDescription);
      if (input.serviceLocation) params.set("location", input.serviceLocation);
      if (input.vehicleYear) params.set("year", input.vehicleYear);
      if (input.vehicleMake) params.set("make", input.vehicleMake);
      if (input.vehicleModel) params.set("model", input.vehicleModel);
      if (input.licensePlate) params.set("plate", input.licensePlate);
      if (input.vin) params.set("vin", input.vin);
      if (input.mileage) params.set("mileage", input.mileage);
      if (input.customerName) params.set("name", input.customerName);

      const formUrl = `${input.origin}/payment-authorization?${params.toString()}`;

      // Format phone — ensure E.164
      let toPhone = input.phone.replace(/[\s().\-]/g, "");
      if (!toPhone.startsWith("+")) {
        toPhone = toPhone.startsWith("1") ? `+${toPhone}` : `+1${toPhone}`;
      }

      const customerName = input.customerName ? ` for ${input.customerName.split(" ")[0]}` : "";
      const invoiceRef = input.invoiceNumber ? ` (RO #${input.invoiceNumber})` : "";
      const amount = input.authorizedAmount ? ` — Amount: $${input.authorizedAmount}` : "";

      const message = `Hi${customerName}! Vertical Automotive has sent you a payment authorization form${invoiceRef}${amount}.\n\nPlease review and sign here:\n${formUrl}\n\nQuestions? Call us at (954) 565-1518.`;

      const client = twilio(sid, token);
      const result = await client.messages.create({
        body: message,
        from,
        to: toPhone,
      });

      console.log(`[PaymentAuth] SMS sent to ${toPhone} — SID: ${result.sid}`);

      return {
        success: true,
        messageSid: result.sid,
        formUrl,
        sentTo: toPhone,
      };
    }),
});
