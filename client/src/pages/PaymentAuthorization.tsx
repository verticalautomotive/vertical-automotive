/**
 * Payment Authorization Form — /payment-authorization
 * 3-step form: Customer Info → Authorization → Signature
 * Supports:
 *   - Shop-Ware RO URL paste + AI extraction to pre-fill all fields
 *   - URL pre-fill: ?invoice=VA-1042&amount=850&service=Brake+Repair&location=Fort+Lauderdale
 */
import { useEffect, useRef, useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Lock,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Link2,
  Loader2,
  Sparkles,
  AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  fullLegalName: string;
  email: string;
  phone: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  driversLicense: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vin: string;
  licensePlate: string;
  mileage: string;
  serviceLocation: "Fort Lauderdale" | "Wilton Manors" | "";
  invoiceNumber: string;
  serviceDescription: string;
  authorizedAmount: string;
  paymentMethod: "Credit Card" | "Debit Card" | "Other" | "";
  authorizationDate: string;
  signatureName: string;
  agreedToTerms: boolean;
  confirmedCardholder: boolean;
  agreedToEmailCopy: boolean;
}

const LEGAL_TEXT = `I, the undersigned, hereby authorize Vertical Automotive to charge the amount specified above to my payment method for the vehicle repair services described. I confirm that:

1. I am the authorized cardholder or have authorization to use the payment method provided.
2. I have reviewed and approved the repair services and associated costs listed above.
3. I understand that all sales are final upon completion of authorized services.
4. I acknowledge Vertical Automotive's 36,000-mile / 36-month warranty covers all repair work performed.
5. I understand that if I dispute this charge with my bank or credit card company after services have been rendered, this signed authorization form will be submitted as evidence of my consent.
6. I confirm the vehicle information provided is accurate and the described services were performed on my vehicle.
7. I have had the opportunity to ask questions about the services and costs before authorizing payment.

By signing below, I confirm all information is accurate and I authorize this payment in full.`;

// ─── Signature Pad ────────────────────────────────────────────────────────────
function SignaturePad({ onSave, onClear }: { onSave: (dataUrl: string) => void; onClear: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    const canvas = canvasRef.current!;
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    if (!drawing.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.strokeStyle = "#1a1a2e";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (lastPos.current) {
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }
    lastPos.current = pos;
  };

  const endDraw = () => {
    drawing.current = false;
    lastPos.current = null;
    if (canvasRef.current) {
      onSave(canvasRef.current.toDataURL("image/png"));
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onClear();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);
    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    canvas.addEventListener("touchend", endDraw);
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mouseleave", endDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", endDraw);
    };
  }, []);

  return (
    <div className="space-y-2">
      <div className="border-2 border-dashed border-gray-300 rounded-lg bg-white relative">
        <canvas
          ref={canvasRef}
          width={560}
          height={160}
          className="w-full h-40 rounded-lg cursor-crosshair touch-none"
        />
        <div className="absolute bottom-2 left-3 text-xs text-gray-400 pointer-events-none select-none">
          Sign here
        </div>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={clear} className="gap-1">
        <RotateCcw className="w-3 h-3" /> Clear Signature
      </Button>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PaymentAuthorization() {
  const [step, setStep] = useState(1);
  const [signatureImage, setSignatureImage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<{
    referenceNumber: string;
    customerName: string;
    authorizedAmount: string;
    serviceLocation: string;
    invoiceNumber: string;
    pdfUrl: string | null;
  } | null>(null);

  // RO URL extraction state
  const [roUrl, setRoUrl] = useState("");
  const [roExtracted, setRoExtracted] = useState<Record<string, string> | null>(null);
  const [extractError, setExtractError] = useState("");

  // Parse URL params for pre-fill
  const params = new URLSearchParams(window.location.search);

  const [form, setForm] = useState<FormData>({
    fullLegalName: "",
    email: "",
    phone: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    driversLicense: "",
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vin: "",
    licensePlate: "",
    mileage: "",
    serviceLocation: (params.get("location") as "Fort Lauderdale" | "Wilton Manors") || "",
    invoiceNumber: params.get("invoice") || "",
    serviceDescription: params.get("service") || "",
    authorizedAmount: params.get("amount") || "",
    paymentMethod: "",
    authorizationDate: new Date().toLocaleDateString("en-US"),
    signatureName: "",
    agreedToTerms: false,
    confirmedCardholder: false,
    agreedToEmailCopy: false,
  });

  const set = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // ─── RO Extraction ──────────────────────────────────────────────────────────
  const extractMutation = trpc.paymentAuth.extractRo.useMutation({
    onSuccess: ({ data }) => {
      setRoExtracted(data as Record<string, string>);
      setExtractError("");
      // Auto-fill form fields from extracted data
      setForm(prev => ({
        ...prev,
        fullLegalName: data.customerName || prev.fullLegalName,
        vehicleYear: data.vehicleYear || prev.vehicleYear,
        vehicleMake: data.vehicleMake || prev.vehicleMake,
        vehicleModel: data.vehicleModel || prev.vehicleModel,
        licensePlate: data.licensePlate || prev.licensePlate,
        vin: data.vin || prev.vin,
        mileage: data.mileage || prev.mileage,
        invoiceNumber: data.invoiceNumber || prev.invoiceNumber,
        serviceDescription: data.serviceDescription || prev.serviceDescription,
        authorizedAmount: data.authorizedAmount || prev.authorizedAmount,
        serviceLocation: (data.serviceLocation as "Fort Lauderdale" | "Wilton Manors") || prev.serviceLocation,
      }));
    },
    onError: (err) => {
      setExtractError(err.message || "Failed to extract data from RO. Please fill in manually.");
    },
  });

  const handleExtract = () => {
    if (!roUrl.trim()) return;
    setExtractError("");
    setRoExtracted(null);
    extractMutation.mutate({ url: roUrl.trim() });
  };

  const submitMutation = trpc.paymentAuth.submit.useMutation({
    onSuccess: (data) => {
      setConfirmed({
        referenceNumber: data.referenceNumber,
        customerName: data.customerName,
        authorizedAmount: data.authorizedAmount,
        serviceLocation: data.serviceLocation,
        invoiceNumber: data.invoiceNumber,
        pdfUrl: data.pdfUrl ?? null,
      });
    },
  });

  // ─── Validation ─────────────────────────────────────────────────────────────
  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.fullLegalName.trim()) errs.fullLegalName = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Valid email required";
      if (!form.phone.trim()) errs.phone = "Required";
      if (!form.billingStreet.trim()) errs.billingStreet = "Required";
      if (!form.billingCity.trim()) errs.billingCity = "Required";
      if (!form.billingState.trim()) errs.billingState = "Required";
      if (!form.billingZip.trim()) errs.billingZip = "Required";
      if (!form.driversLicense.trim()) errs.driversLicense = "Required";
      if (!form.vehicleYear.trim()) errs.vehicleYear = "Required";
      if (!form.vehicleMake.trim()) errs.vehicleMake = "Required";
      if (!form.vehicleModel.trim()) errs.vehicleModel = "Required";
    }
    if (s === 2) {
      if (!form.serviceLocation) errs.serviceLocation = "Required";
      if (!form.invoiceNumber.trim()) errs.invoiceNumber = "Required";
      if (!form.serviceDescription.trim()) errs.serviceDescription = "Required";
      if (!form.authorizedAmount.trim()) errs.authorizedAmount = "Required";
      if (!form.paymentMethod) errs.paymentMethod = "Required";
    }
    if (s === 3) {
      if (!signatureImage) errs.signatureImage = "Please draw your signature above";
      if (!form.signatureName.trim()) errs.signatureName = "Please type your full name";
      if (!form.agreedToTerms) errs.agreedToTerms = "Required";
      if (!form.confirmedCardholder) errs.confirmedCardholder = "Required";
      if (!form.agreedToEmailCopy) errs.agreedToEmailCopy = "Required";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep(s => s + 1);
  };

  const back = () => setStep(s => s - 1);

  const handleSubmit = () => {
    if (!validateStep(3)) return;
    submitMutation.mutate({
      fullLegalName: form.fullLegalName,
      email: form.email,
      phone: form.phone,
      billingStreet: form.billingStreet,
      billingCity: form.billingCity,
      billingState: form.billingState,
      billingZip: form.billingZip,
      driversLicense: form.driversLicense,
      vehicleYear: form.vehicleYear,
      vehicleMake: form.vehicleMake,
      vehicleModel: form.vehicleModel,
      vin: form.vin || undefined,
      licensePlate: form.licensePlate || undefined,
      mileage: form.mileage || undefined,
      serviceLocation: form.serviceLocation as "Fort Lauderdale" | "Wilton Manors",
      invoiceNumber: form.invoiceNumber,
      serviceDescription: form.serviceDescription,
      authorizedAmount: form.authorizedAmount,
      paymentMethod: form.paymentMethod as "Credit Card" | "Debit Card" | "Other",
      authorizationDate: form.authorizationDate,
      signatureImage,
      signatureName: form.signatureName,
      agreedToTerms: form.agreedToTerms,
      confirmedCardholder: form.confirmedCardholder,
      agreedToEmailCopy: form.agreedToEmailCopy,
      signedAt: String(Date.now()),
      userAgent: navigator.userAgent,
      roSourceUrl: roUrl || undefined,
      roExtractedData: roExtracted ? JSON.stringify(roExtracted) : undefined,
    });
  };

  // ─── Confirmation Screen ─────────────────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full shadow-lg">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Authorization Confirmed</h1>
              <p className="text-gray-500 mt-1">Your payment authorization has been securely recorded.</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Reference Number</span>
                <span className="font-bold text-blue-700">{confirmed.referenceNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Customer</span>
                <span className="font-medium">{confirmed.customerName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Invoice</span>
                <span className="font-medium">{confirmed.invoiceNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Authorized Amount</span>
                <span className="font-bold text-gray-900">${confirmed.authorizedAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Location</span>
                <span className="font-medium">{confirmed.serviceLocation}</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              A copy of this authorization has been sent to your email address.
            </p>
            {confirmed.pdfUrl && (
              <a
                href={confirmed.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-600 hover:underline text-sm font-medium"
              >
                Download PDF Authorization
              </a>
            )}
            <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
              <p className="font-medium text-gray-700">Vertical Automotive</p>
              <p>Wilton Manors: (954) 565-1518</p>
              <p>Fort Lauderdale: (645) 216-2266</p>
              <p>verticalautomotive.com</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const stepLabels = ["Your Info", "Authorization", "Signature"];

  const err = (field: string) =>
    errors[field] ? <p className="text-red-500 text-xs mt-1">{errors[field]}</p> : null;

  const fieldInput = (label: string, key: keyof FormData, type = "text", placeholder = "", required = true) => (
    <div>
      <Label className="text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </Label>
      <Input
        type={type}
        placeholder={placeholder}
        value={form[key] as string}
        onChange={e => set(key, e.target.value)}
        className={`mt-1 ${errors[key] ? "border-red-400" : ""}`}
      />
      {err(key)}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a0f1e] text-white py-5 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <img src="/logo.svg" alt="Vertical Automotive" className="h-7 brightness-0 invert" />
            </div>
            <h1 className="text-lg font-bold">Payment Authorization Form</h1>
            <p className="text-gray-400 text-xs">Secure payment authorization for auto repair services</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-900/40 border border-green-700 rounded-lg px-3 py-2">
            <Lock className="w-3.5 h-3.5 text-green-400" />
            <span className="text-green-400 text-xs font-medium">SSL Secured</span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            {stepLabels.map((label, i) => {
              const s = i + 1;
              const active = s === step;
              const done = s < step;
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${done ? "bg-green-500 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                    {done ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  <span className={`text-xs font-medium ${active ? "text-blue-600" : done ? "text-green-600" : "text-gray-400"}`}>
                    {label}
                  </span>
                  {i < stepLabels.length - 1 && (
                    <div className={`flex-1 h-0.5 ${done ? "bg-green-400" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* ── RO URL Import (shown on step 1 only) ── */}
        {step === 1 && (
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h2 className="font-bold text-blue-800 text-sm">Auto-Fill from Shop-Ware RO</h2>
                <span className="text-xs text-blue-500 font-normal">(optional)</span>
              </div>
              <p className="text-xs text-blue-700 mb-3">
                Paste the customer-facing Shop-Ware work order link to automatically extract vehicle, invoice, and service details.
              </p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="https://verticalautomotive.shop-ware.com/work_orders/..."
                    value={roUrl}
                    onChange={e => { setRoUrl(e.target.value); setExtractError(""); }}
                    className="pl-9 bg-white text-sm"
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleExtract}
                  disabled={!roUrl.trim() || extractMutation.isPending}
                  className="bg-blue-600 hover:bg-blue-700 gap-1.5 shrink-0"
                >
                  {extractMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Extracting...</>
                  ) : (
                    <><Sparkles className="w-4 h-4" /> Extract</>
                  )}
                </Button>
              </div>

              {extractError && (
                <div className="mt-2 flex items-start gap-2 text-red-600 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <span>{extractError}</span>
                </div>
              )}

              {roExtracted && !extractMutation.isPending && (
                <div className="mt-3 bg-white border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 text-green-700 text-xs font-semibold mb-2">
                    <CheckCircle className="w-3.5 h-3.5" /> Fields extracted and filled in below
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                    {roExtracted.customerName && <span><span className="font-medium">Customer:</span> {roExtracted.customerName}</span>}
                    {roExtracted.invoiceNumber && <span><span className="font-medium">RO#:</span> {roExtracted.invoiceNumber}</span>}
                    {roExtracted.vehicleYear && <span><span className="font-medium">Vehicle:</span> {roExtracted.vehicleYear} {roExtracted.vehicleMake} {roExtracted.vehicleModel}</span>}
                    {roExtracted.authorizedAmount && <span><span className="font-medium">Total:</span> ${roExtracted.authorizedAmount}</span>}
                    {roExtracted.serviceLocation && <span><span className="font-medium">Location:</span> {roExtracted.serviceLocation}</span>}
                    {roExtracted.licensePlate && <span><span className="font-medium">Plate:</span> {roExtracted.licensePlate}</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Review and correct any fields below before proceeding.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ── Step 1: Customer + Vehicle Info ── */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base border-b pb-2">Customer Information</h2>
                {fieldInput("Full Legal Name", "fullLegalName", "text", "As it appears on your ID")}
                <div className="grid grid-cols-2 gap-3">
                  {fieldInput("Email Address", "email", "email", "your@email.com")}
                  {fieldInput("Phone Number", "phone", "tel", "(555) 000-0000")}
                </div>
                {fieldInput("Billing Street Address", "billingStreet", "text", "123 Main St")}
                <div className="grid grid-cols-3 gap-3">
                  {fieldInput("City", "billingCity")}
                  {fieldInput("State", "billingState", "text", "FL")}
                  {fieldInput("ZIP", "billingZip", "text", "33301")}
                </div>
                {fieldInput("Driver's License Number", "driversLicense", "text", "For identity verification")}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base border-b pb-2">Vehicle Information</h2>
                <div className="grid grid-cols-3 gap-3">
                  {fieldInput("Year", "vehicleYear", "text", "2022")}
                  {fieldInput("Make", "vehicleMake", "text", "Toyota")}
                  {fieldInput("Model", "vehicleModel", "text", "Camry")}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {fieldInput("VIN Number", "vin", "text", "Optional but encouraged", false)}
                  {fieldInput("License Plate", "licensePlate", "text", "Optional", false)}
                </div>
                {fieldInput("Mileage at Drop-off", "mileage", "text", "e.g. 45,230", false)}
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Step 2: Service & Authorization ── */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base border-b pb-2">Service & Payment Details</h2>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Service Location<span className="text-red-500 ml-0.5">*</span></Label>
                  <Select value={form.serviceLocation} onValueChange={v => set("serviceLocation", v)}>
                    <SelectTrigger className={`mt-1 ${errors.serviceLocation ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fort Lauderdale">Fort Lauderdale — Sunrise Blvd & US-1</SelectItem>
                      <SelectItem value="Wilton Manors">Wilton Manors — Oakland Park Blvd & I-95</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("serviceLocation")}
                </div>

                {fieldInput("Repair Order / Invoice Number", "invoiceNumber", "text", "e.g. VA-1042")}

                <div>
                  <Label className="text-sm font-medium text-gray-700">Description of Authorized Services<span className="text-red-500 ml-0.5">*</span></Label>
                  <Textarea
                    placeholder="e.g. Brake pad replacement (front axle), rotor resurfacing, brake fluid flush"
                    value={form.serviceDescription}
                    onChange={e => set("serviceDescription", e.target.value)}
                    className={`mt-1 min-h-[80px] ${errors.serviceDescription ? "border-red-400" : ""}`}
                  />
                  {err("serviceDescription")}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Total Authorized Amount ($)<span className="text-red-500 ml-0.5">*</span></Label>
                  <div className="relative mt-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <Input
                      type="text"
                      placeholder="0.00"
                      value={form.authorizedAmount}
                      onChange={e => set("authorizedAmount", e.target.value)}
                      className={`pl-7 ${errors.authorizedAmount ? "border-red-400" : ""}`}
                    />
                  </div>
                  {err("authorizedAmount")}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Payment Method<span className="text-red-500 ml-0.5">*</span></Label>
                  <Select value={form.paymentMethod} onValueChange={v => set("paymentMethod", v)}>
                    <SelectTrigger className={`mt-1 ${errors.paymentMethod ? "border-red-400" : ""}`}>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {err("paymentMethod")}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">Date of Authorization</Label>
                  <Input value={form.authorizationDate} readOnly className="mt-1 bg-gray-50 text-gray-600" />
                </div>
              </CardContent>
            </Card>

            {/* Legal Agreement */}
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-amber-600" />
                  <h2 className="font-bold text-amber-800 text-sm">Authorization Agreement</h2>
                </div>
                <div className="bg-white border border-amber-200 rounded-lg p-4 max-h-56 overflow-y-auto text-xs text-gray-700 leading-relaxed whitespace-pre-line">
                  {LEGAL_TEXT}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* ── Step 3: Signature ── */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-5 space-y-5">
                <h2 className="font-bold text-gray-800 text-base border-b pb-2">Digital Signature</h2>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Draw your signature below<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <SignaturePad onSave={setSignatureImage} onClear={() => setSignatureImage("")} />
                  {err("signatureImage")}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700">
                    Type your full name to confirm<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    placeholder="Full legal name"
                    value={form.signatureName}
                    onChange={e => set("signatureName", e.target.value)}
                    className={`mt-1 ${errors.signatureName ? "border-red-400" : ""}`}
                  />
                  {err("signatureName")}
                </div>

                <div className="space-y-3 pt-2">
                  {[
                    { key: "agreedToTerms", label: "I agree to the terms above and authorize this payment" },
                    { key: "confirmedCardholder", label: "I confirm I am the authorized cardholder" },
                    { key: "agreedToEmailCopy", label: "I agree to receive a copy of this authorization via email" },
                  ].map(({ key, label }) => (
                    <div key={key}>
                      <div className="flex items-start gap-3">
                        <Checkbox
                          id={key}
                          checked={form[key as keyof FormData] as boolean}
                          onCheckedChange={v => set(key as keyof FormData, Boolean(v))}
                          className={errors[key] ? "border-red-400" : ""}
                        />
                        <label htmlFor={key} className="text-sm text-gray-700 cursor-pointer leading-tight">
                          {label}<span className="text-red-500 ml-0.5">*</span>
                        </label>
                      </div>
                      {err(key)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <h3 className="font-bold text-blue-800 text-sm mb-3">Authorization Summary</h3>
                <div className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="text-gray-500">Customer</span><span className="font-medium">{form.fullLegalName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Invoice</span><span className="font-medium">{form.invoiceNumber}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Vehicle</span><span className="font-medium">{form.vehicleYear} {form.vehicleMake} {form.vehicleModel}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500">Location</span><span className="font-medium">{form.serviceLocation}</span></div>
                  <div className="flex justify-between border-t pt-2 mt-2"><span className="text-gray-700 font-bold">Total Authorized</span><span className="font-bold text-blue-700 text-base">${form.authorizedAmount}</span></div>
                </div>
                {roUrl && (
                  <div className="mt-2 pt-2 border-t flex items-center gap-1.5 text-xs text-gray-400">
                    <Link2 className="w-3 h-3" />
                    <span>RO source saved: {roUrl.substring(0, 60)}...</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {submitMutation.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                Submission failed: {submitMutation.error.message}. Please try again or call (954) 565-1518.
              </div>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-2">
          {step > 1 ? (
            <Button variant="outline" onClick={back} className="gap-1">
              <ChevronLeft className="w-4 h-4" /> Back
            </Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button onClick={next} className="gap-1 bg-blue-600 hover:bg-blue-700">
              Next <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitMutation.isPending}
              className="gap-1 bg-blue-600 hover:bg-blue-700 min-w-[160px]"
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Authorization"}
            </Button>
          )}
        </div>

        {/* Security note */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400 pb-4">
          <Lock className="w-3 h-3" />
          <span>256-bit SSL encrypted · Your data is securely stored · No credit card numbers are stored</span>
        </div>
      </div>
    </div>
  );
}
