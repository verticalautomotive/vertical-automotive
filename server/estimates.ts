/**
 * estimates.ts — tRPC router for the Service Estimate Comparison Tool
 * White-label ready: no Vertical Automotive branding.
 */
import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { getDb } from "./db";
import type { EstimateOption } from "../drizzle/schema";
import { estimates, estimateOptions, estimateLineItems } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";
import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";

// ─── helpers ────────────────────────────────────────────────────────────────

function generatePublicId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < 12; i++) id += chars[Math.floor(Math.random() * chars.length)];
  return id;
}

function centsToDisplay(cents: number): string {
  return (cents / 100).toFixed(2);
}

function dollarsToCents(dollars: string | number): number {
  const n = typeof dollars === "string" ? parseFloat(dollars.replace(/[^0-9.]/g, "")) : dollars;
  return isNaN(n) ? 0 : Math.round(n * 100);
}

// ─── line item schema ────────────────────────────────────────────────────────

const lineItemSchema = z.object({
  id: z.number().optional(),
  description: z.string().min(1),
  partQuality: z.enum(["Aftermarket", "OEM", "Premium"]).default("OEM"),
  laborHours: z.string().optional().default(""),
  partCost: z.string().default("0"),   // dollar string
  laborCost: z.string().default("0"),  // dollar string
  sortOrder: z.number().default(1),
});

const optionSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1),
  badge: z.string().optional().default(""),
  isRecommended: z.boolean().default(false),
  taxRate: z.string().default("0"),
  warranty: z.string().optional().default(""),
  completionTime: z.string().optional().default(""),
  sellingPoints: z.array(z.string()).default([]),
  lineItems: z.array(lineItemSchema).default([]),
  sortOrder: z.number().default(1),
});

const estimateInputSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().optional().default(""),
  customerEmail: z.string().optional().default(""),
  vehicleYear: z.string().optional().default(""),
  vehicleMake: z.string().optional().default(""),
  vehicleModel: z.string().optional().default(""),
  vin: z.string().optional().default(""),
  jobTitle: z.string().min(1),
  advisorName: z.string().optional().default(""),
  location: z.string().optional().default(""),
  dealerPrice: z.string().optional().default(""),
  tenantName: z.string().optional().default(""),
  tenantLogo: z.string().optional().default(""),
  tenantPhone: z.string().optional().default(""),
  tenantColor: z.string().optional().default(""),
  options: z.array(optionSchema).min(2).max(3),
});

// ─── router ─────────────────────────────────────────────────────────────────

export const estimatesRouter = router({

  /**
   * Create a new estimate (staff side)
   */
  create: publicProcedure
    .input(estimateInputSchema)
    .mutation(async ({ input, ctx }) => {
      const publicId = generatePublicId();

      const db = await getDb();
      if (!db) throw new Error("Database unavailable");

      // Insert estimate header
      await db.insert(estimates).values({
        publicId,
        status: "draft",
        customerName: input.customerName,
        customerPhone: input.customerPhone,
        customerEmail: input.customerEmail,
        vehicleYear: input.vehicleYear,
        vehicleMake: input.vehicleMake,
        vehicleModel: input.vehicleModel,
        vin: input.vin,
        jobTitle: input.jobTitle,
        advisorName: input.advisorName,
        location: input.location,
        dealerPrice: input.dealerPrice,
        tenantName: input.tenantName,
        tenantLogo: input.tenantLogo,
        tenantPhone: input.tenantPhone,
        tenantColor: input.tenantColor,
      });

      const [est] = await db.select().from(estimates).where(eq(estimates.publicId, publicId));

      // Insert options + line items
      for (const opt of input.options) {
        const subtotalCents = opt.lineItems.reduce((sum, li) => {
          return sum + dollarsToCents(li.partCost) + dollarsToCents(li.laborCost);
        }, 0);
        const taxRate = parseFloat(opt.taxRate) || 0;
        const totalCents = Math.round(subtotalCents * (1 + taxRate));

        await db.insert(estimateOptions).values({
          estimateId: est.id,
          sortOrder: opt.sortOrder,
          name: opt.name,
          badge: opt.badge,
          isRecommended: opt.isRecommended ? 1 : 0,
          taxRate: opt.taxRate,
          warranty: opt.warranty,
          completionTime: opt.completionTime,
          sellingPoints: JSON.stringify(opt.sellingPoints),
          subtotalCents,
          totalCents,
        });

        const [savedOpt] = await db
          .select()
          .from(estimateOptions)
          .where(and(eq(estimateOptions.estimateId, est.id), eq(estimateOptions.name, opt.name)))
          .orderBy(desc(estimateOptions.id))
          .limit(1);

        for (const li of opt.lineItems) {
          await db.insert(estimateLineItems).values({
            optionId: savedOpt.id,
            sortOrder: li.sortOrder,
            description: li.description,
            partQuality: li.partQuality,
            laborHours: li.laborHours,
            partCostCents: dollarsToCents(li.partCost),
            laborCostCents: dollarsToCents(li.laborCost),
          });
        }
      }

      return { success: true, publicId };
    }),

  /**
   * Get a single estimate by publicId (public — customer view)
   * Also increments view count and marks as "viewed" if previously "sent"
   */
  getByPublicId: publicProcedure
    .input(z.object({ publicId: z.string() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [est] = await db.select().from(estimates).where(eq(estimates.publicId, input.publicId));
      if (!est) throw new Error("Estimate not found");

      // Increment view count
      const newCount = (est.viewCount ?? 0) + 1;
      const newStatus = est.status === "sent" ? "viewed" : est.status;
      await db.update(estimates)
        .set({ viewCount: newCount, lastViewedAt: new Date(), status: newStatus })
        .where(eq(estimates.id, est.id));

      const options = await db.select().from(estimateOptions).where(eq(estimateOptions.estimateId, est.id));
      const optionsWithItems = await Promise.all(options.map(async (opt: EstimateOption) => {
        const lineItems = await db.select().from(estimateLineItems).where(eq(estimateLineItems.optionId, opt.id));
        return {
          ...opt,
          sellingPoints: (() => { try { return JSON.parse(opt.sellingPoints ?? "[]"); } catch { return []; } })(),
          lineItems: lineItems.map((li: typeof lineItems[0]) => ({
            ...li,
            partCost: centsToDisplay(li.partCostCents),
            laborCost: centsToDisplay(li.laborCostCents),
            total: centsToDisplay(li.partCostCents + li.laborCostCents),
          })),
          subtotal: centsToDisplay(opt.subtotalCents),
          total: centsToDisplay(opt.totalCents),
        };
      }));

      return { ...est, options: optionsWithItems.sort((a: { sortOrder: number }, b: { sortOrder: number }) => a.sortOrder - b.sortOrder) };
    }),

  /**
   * List all estimates (admin/staff)
   */
  list: publicProcedure
    .input(z.object({
      page: z.number().default(1),
      pageSize: z.number().default(20),
      status: z.enum(["draft", "sent", "viewed", "approved", "all"]).default("all"),
    }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const all = await db.select().from(estimates).orderBy(desc(estimates.createdAt));
      const filtered = input.status === "all" ? all : all.filter((e: typeof all[0]) => e.status === input.status);
      const total = filtered.length;
      const start = (input.page - 1) * input.pageSize;
      const records = filtered.slice(start, start + input.pageSize);
      return { records, total, page: input.page, pageSize: input.pageSize };
    }),

  /**
   * Update estimate status (e.g. draft → sent)
   */
  updateStatus: publicProcedure
    .input(z.object({ publicId: z.string(), status: z.enum(["draft", "sent", "viewed", "approved"]) }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      await db.update(estimates).set({ status: input.status }).where(eq(estimates.publicId, input.publicId));
      return { success: true };
    }),

  /**
   * Approve an estimate — customer selects an option and signs
   */
  approve: publicProcedure
    .input(z.object({
      publicId: z.string(),
      optionId: z.number(),
      signatureImage: z.string(),
      signatureName: z.string().min(1),
      ip: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [est] = await db.select().from(estimates).where(eq(estimates.publicId, input.publicId));
      if (!est) throw new Error("Estimate not found");

      await db.update(estimates).set({
        status: "approved",
        approvedOptionId: input.optionId,
        approvedAt: new Date(),
        approvalSignature: input.signatureImage,
        approvalSignatureName: input.signatureName,
        approvalIp: input.ip ?? "",
      }).where(eq(estimates.id, est.id));

      const [opt] = await db.select().from(estimateOptions).where(eq(estimateOptions.id, input.optionId));

      // Notify shop owner
      try {
        await notifyOwner({
          title: `Estimate Approved — ${est.customerName}`,
          content: `${est.customerName} approved the "${opt?.name ?? "selected"}" option for "${est.jobTitle}" (${est.vehicleYear} ${est.vehicleMake} ${est.vehicleModel}). Total: $${centsToDisplay(opt?.totalCents ?? 0)}.`,
        });
      } catch { /* non-fatal */ }

      return { success: true };
    }),

  /**
   * Delete an estimate (admin)
   */
  delete: publicProcedure
    .input(z.object({ publicId: z.string() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new Error("Database unavailable");
      const [est] = await db.select().from(estimates).where(eq(estimates.publicId, input.publicId));
      if (!est) throw new Error("Not found");
      // Delete line items, options, then estimate
      const opts = await db.select().from(estimateOptions).where(eq(estimateOptions.estimateId, est.id));
      for (const opt of opts) {
        await db.delete(estimateLineItems).where(eq(estimateLineItems.optionId, opt.id));
      }
      await db.delete(estimateOptions).where(eq(estimateOptions.estimateId, est.id));
      await db.delete(estimates).where(eq(estimates.id, est.id));
      return { success: true };
    }),

  /**
   * AI: Generate Good/Better/Best options from a job title
   */
  aiGenerateOptions: publicProcedure
    .input(z.object({ jobTitle: z.string().min(1) }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `You are an automotive service advisor AI. Generate a Good/Better/Best estimate structure for the given job. Return JSON only.`,
          },
          {
            role: "user",
            content: `Job: "${input.jobTitle}"\n\nReturn JSON with this structure:\n{\n  "options": [\n    {\n      "name": "Good",\n      "badge": "Budget",\n      "warranty": "...",\n      "completionTime": "...",\n      "sellingPoints": ["...", "..."],\n      "lineItems": [\n        { "description": "...", "partQuality": "Aftermarket", "laborHours": "1.5", "partCost": "45.00", "laborCost": "90.00" }\n      ]\n    },\n    { "name": "Better", "badge": "Recommended", ... },\n    { "name": "Best", "badge": "Premium", ... }\n  ]\n}`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "estimate_options",
            strict: true,
            schema: {
              type: "object",
              properties: {
                options: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      badge: { type: "string" },
                      warranty: { type: "string" },
                      completionTime: { type: "string" },
                      sellingPoints: { type: "array", items: { type: "string" } },
                      lineItems: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            description: { type: "string" },
                            partQuality: { type: "string" },
                            laborHours: { type: "string" },
                            partCost: { type: "string" },
                            laborCost: { type: "string" },
                          },
                          required: ["description", "partQuality", "laborHours", "partCost", "laborCost"],
                          additionalProperties: false,
                        },
                      },
                    },
                    required: ["name", "badge", "warranty", "completionTime", "sellingPoints", "lineItems"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["options"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices?.[0]?.message?.content ?? "{}";
      const parsed = typeof content === "string" ? JSON.parse(content) : content;
      return parsed;
    }),

  /**
   * AI: Generate selling points for a single option
   */
  aiSellingPoints: publicProcedure
    .input(z.object({
      optionName: z.string(),
      partQuality: z.string(),
      warranty: z.string(),
      totalPrice: z.string(),
      jobTitle: z.string(),
      comparedToBasicPrice: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: "You are an automotive service advisor. Generate concise, persuasive selling points for a service estimate option. Return JSON only.",
          },
          {
            role: "user",
            content: `Job: "${input.jobTitle}"\nOption: "${input.optionName}"\nPart Quality: ${input.partQuality}\nWarranty: ${input.warranty}\nPrice: $${input.totalPrice}${input.comparedToBasicPrice ? `\nBasic option price: $${input.comparedToBasicPrice}` : ""}\n\nGenerate 3-5 short, punchy selling points. Return: { "sellingPoints": ["...", "..."] }`,
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "selling_points",
            strict: true,
            schema: {
              type: "object",
              properties: {
                sellingPoints: { type: "array", items: { type: "string" } },
              },
              required: ["sellingPoints"],
              additionalProperties: false,
            },
          },
        },
      });

      const content = response.choices?.[0]?.message?.content ?? "{}";
      const parsed = typeof content === "string" ? JSON.parse(content) : content;
      return parsed;
    }),
});
