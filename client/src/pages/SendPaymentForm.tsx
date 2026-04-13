/**
 * Send Payment Form — /send-payment-form
 * Staff-facing page: paste a Shop-Ware RO URL, verify extracted data, then send
 * the pre-filled payment authorization form link to the customer via SMS.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Link2,
  Loader2,
  Send,
  CheckCircle2,
  Car,
  User,
  FileText,
  Phone,
  MapPin,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type ExtractedData = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  licensePlate: string;
  vin: string;
  mileage: string;
  invoiceNumber: string;
  serviceDescription: string;
  authorizedAmount: string;
  serviceLocation: string;
};

export default function SendPaymentForm() {
  const [roUrl, setRoUrl] = useState("");
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [phone, setPhone] = useState("");
  const [smsSent, setSmsSent] = useState(false);
  const [sentTo, setSentTo] = useState("");

  const extractMutation = trpc.paymentAuth.extractRo.useMutation({
    onSuccess: (data) => {
      const d = data.data as unknown as ExtractedData;
      setExtracted(d);
      setPhone(d?.customerPhone || "");
    },
  });

  const sendLinkMutation = trpc.paymentAuth.sendFormLink.useMutation({
    onSuccess: (data) => {
      setSentTo(data.sentTo);
      setSmsSent(true);
    },
  });

  const handleExtract = () => {
    if (!roUrl.trim()) return;
    extractMutation.mutate({ url: roUrl.trim() });
  };

  const handleSend = () => {
    if (!extracted || !phone.trim()) return;
    sendLinkMutation.mutate({
      phone,
      customerName: extracted.customerName,
      invoiceNumber: extracted.invoiceNumber,
      authorizedAmount: extracted.authorizedAmount,
      serviceDescription: extracted.serviceDescription,
      serviceLocation: extracted.serviceLocation,
      vehicleYear: extracted.vehicleYear,
      vehicleMake: extracted.vehicleMake,
      vehicleModel: extracted.vehicleModel,
      licensePlate: extracted.licensePlate,
      vin: extracted.vin,
      mileage: extracted.mileage,
      origin: window.location.origin,
    });
  };

  const handleReset = () => {
    setRoUrl("");
    setExtracted(null);
    setPhone("");
    setSmsSent(false);
    setSentTo("");
    extractMutation.reset();
    sendLinkMutation.reset();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <main className="flex-1 py-10 px-4">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Page Header */}
          <div>
            <h1 className="text-2xl font-bold text-foreground">Send Payment Authorization</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Paste a Shop-Ware work order URL to extract customer and vehicle info, then send the pre-filled form to the customer via SMS.
            </p>
          </div>

          {/* Step 1 — RO URL */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">1</span>
                Paste Shop-Ware Work Order URL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Input
                  value={roUrl}
                  onChange={e => setRoUrl(e.target.value)}
                  placeholder="https://verticalautomotive.shop-ware.com/work_orders/XXXXXX?auth_token=..."
                  className="font-mono text-xs flex-1"
                  onKeyDown={e => e.key === "Enter" && handleExtract()}
                  disabled={extractMutation.isPending || !!extracted}
                />
                {extracted ? (
                  <Button variant="outline" onClick={handleReset} className="gap-1.5 shrink-0">
                    <RefreshCw className="w-4 h-4" /> New RO
                  </Button>
                ) : (
                  <Button
                    onClick={handleExtract}
                    disabled={!roUrl.trim() || extractMutation.isPending}
                    className="gap-1.5 shrink-0"
                  >
                    {extractMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Extracting...</>
                    ) : (
                      <><Link2 className="w-4 h-4" /> Extract</>
                    )}
                  </Button>
                )}
              </div>
              {extractMutation.error && (
                <p className="text-xs text-red-600">{extractMutation.error.message}</p>
              )}
            </CardContent>
          </Card>

          {/* Step 2 — Extracted Data Preview */}
          {extracted && (
            <Card className="border-green-200 bg-green-50/40">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  Verify Extracted Information
                  <Badge className="ml-auto bg-green-100 text-green-700 border-green-200 text-xs">Extracted</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Customer */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <User className="w-3.5 h-3.5" /> Customer
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm pl-5">
                    <div><span className="text-gray-500">Name:</span> <span className="font-medium">{extracted.customerName || "—"}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium">{extracted.customerEmail || "—"}</span></div>
                    <div><span className="text-gray-500">Phone:</span> <span className="font-medium">{extracted.customerPhone || "—"}</span></div>
                    {extracted.billingStreet && (
                      <div className="col-span-2"><span className="text-gray-500">Address:</span> <span className="font-medium">{extracted.billingStreet}, {extracted.billingCity}, {extracted.billingState} {extracted.billingZip}</span></div>
                    )}
                  </div>
                </div>

                {/* Vehicle */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <Car className="w-3.5 h-3.5" /> Vehicle
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm pl-5">
                    <div><span className="text-gray-500">Vehicle:</span> <span className="font-medium">{extracted.vehicleYear} {extracted.vehicleMake} {extracted.vehicleModel}</span></div>
                    <div><span className="text-gray-500">Plate:</span> <span className="font-medium">{extracted.licensePlate || "—"}</span></div>
                    <div><span className="text-gray-500">VIN:</span> <span className="font-mono text-xs">{extracted.vin || "—"}</span></div>
                    <div><span className="text-gray-500">Mileage:</span> <span className="font-medium">{extracted.mileage || "—"}</span></div>
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    <FileText className="w-3.5 h-3.5" /> Service & Invoice
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm pl-5">
                    <div><span className="text-gray-500">Invoice #:</span> <span className="font-mono font-medium">{extracted.invoiceNumber || "—"}</span></div>
                    <div><span className="text-gray-500">Amount:</span> <span className="font-bold text-gray-900">${extracted.authorizedAmount || "—"}</span></div>
                    <div className="col-span-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">Location:</span>
                      <Badge variant="outline" className={`text-xs ml-1 ${extracted.serviceLocation === "Fort Lauderdale" ? "border-blue-300 text-blue-700" : "border-purple-300 text-purple-700"}`}>
                        {extracted.serviceLocation || "—"}
                      </Badge>
                    </div>
                    {extracted.serviceDescription && (
                      <div className="col-span-2">
                        <span className="text-gray-500">Services:</span>
                        <p className="mt-0.5 text-gray-800 bg-white rounded border px-2 py-1.5 text-xs leading-relaxed">{extracted.serviceDescription}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3 — Send SMS */}
          {extracted && !smsSent && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">3</span>
                  Send Form Link via SMS
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Customer Phone Number
                  </label>
                  <Input
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 (954) 555-0000"
                    className="font-mono"
                  />
                  <p className="text-xs text-gray-400">Pre-filled from Shop-Ware. Edit if needed before sending.</p>
                </div>
                <div className="bg-gray-50 border rounded p-3 text-xs text-gray-600 leading-relaxed">
                  <span className="font-medium text-gray-700 block mb-1">Message preview:</span>
                  Hi {extracted.customerName?.split(" ")[0] || "there"}! Vertical Automotive has sent you a payment authorization form (RO #{extracted.invoiceNumber}) — Amount: ${extracted.authorizedAmount}. Please review and sign here: [link]. Questions? Call us at (954) 565-1518.
                </div>
                {sendLinkMutation.error && (
                  <p className="text-xs text-red-600">{sendLinkMutation.error.message}</p>
                )}
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 font-semibold"
                  size="lg"
                  disabled={sendLinkMutation.isPending || !phone.trim()}
                  onClick={handleSend}
                >
                  {sendLinkMutation.isPending ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending SMS...</>
                  ) : (
                    <><Send className="w-4 h-4" /> Send Payment Form Link</>
                  )}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Success State */}
          {smsSent && (
            <Card className="border-green-300 bg-green-50">
              <CardContent className="py-10 flex flex-col items-center gap-4 text-center">
                <CheckCircle2 className="w-14 h-14 text-green-500" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900">SMS Sent!</h2>
                  <p className="text-gray-600 text-sm mt-1">
                    Payment form link delivered to <span className="font-mono font-semibold">{sentTo}</span>
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {extracted?.customerName} will receive a pre-filled form for RO #{extracted?.invoiceNumber} (${extracted?.authorizedAmount}).
                  </p>
                </div>
                <div className="flex gap-3 mt-2">
                  <Button variant="outline" onClick={handleReset} className="gap-1.5">
                    <RefreshCw className="w-4 h-4" /> Send Another
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-1.5"
                    onClick={() => window.open("/admin/authorizations", "_blank")}
                  >
                    <ChevronRight className="w-4 h-4" /> View All Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
