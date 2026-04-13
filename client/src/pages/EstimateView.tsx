/**
 * EstimateView — Premium customer-facing comparison page
 * Dark Apple/Stripe aesthetic. White-label ready.
 * Route: /estimate-comparison/:id
 */
import { useState, useRef, useEffect } from "react";
import { useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  CheckCircle2, Shield, Clock, Star, ChevronDown, ChevronUp,
  Phone, Loader2, Pen, X, Check
} from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────

interface LineItem {
  id: number;
  description: string;
  partQuality: string;
  laborHours: string;
  partCost: string;
  laborCost: string;
  total: string;
}

interface Option {
  id: number;
  name: string;
  badge: string | null;
  isRecommended: number;
  warranty: string | null;
  completionTime: string | null;
  sellingPoints: string[];
  lineItems: LineItem[];
  subtotal: string;
  total: string;
  taxRate: string | null;
  sortOrder: number;
}

interface EstimateData {
  id: number;
  publicId: string;
  status: string;
  customerName: string;
  vehicleYear: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  jobTitle: string;
  advisorName: string | null;
  location: string | null;
  dealerPrice: string | null;
  tenantName: string | null;
  tenantLogo: string | null;
  tenantPhone: string | null;
  tenantColor: string | null;
  approvedOptionId: number | null;
  options: Option[];
}

// ─── signature pad ────────────────────────────────────────────────────────────

function SignaturePad({ onSave, onCancel }: { onSave: (dataUrl: string) => void; onCancel: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const [hasStrokes, setHasStrokes] = useState(false);
  const [typedName, setTypedName] = useState("");

  const getPos = (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      drawing.current = true;
      const pos = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    };
    const move = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!drawing.current) return;
      const pos = getPos(e, canvas);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      setHasStrokes(true);
    };
    const end = () => { drawing.current = false; };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("touchstart", start, { passive: false });
    canvas.addEventListener("touchmove", move, { passive: false });
    canvas.addEventListener("touchend", end);
    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, []);

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
  };

  const save = () => {
    if (!typedName.trim()) { toast.error("Please type your full name to confirm."); return; }
    const canvas = canvasRef.current;
    onSave(canvas?.toDataURL() ?? "");
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-white/60">Draw your signature below</p>
      <div className="relative border border-white/20 rounded-xl overflow-hidden bg-white/5">
        <canvas ref={canvasRef} width={480} height={140} className="w-full touch-none cursor-crosshair" />
        {!hasStrokes && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-white/20 text-sm">Sign here</span>
          </div>
        )}
        <button onClick={clear} className="absolute top-2 right-2 text-white/30 hover:text-white/60 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div>
        <label className="text-xs text-white/50 block mb-1">Type your full name to confirm *</label>
        <input
          value={typedName}
          onChange={e => setTypedName(e.target.value)}
          placeholder="Full legal name"
          className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/20 outline-none focus:border-white/40"
        />
      </div>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1 border-white/20 text-white/60 hover:bg-white/5">
          Cancel
        </Button>
        <Button onClick={save} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
          <Check className="w-4 h-4 mr-1" /> Confirm Approval
        </Button>
      </div>
      <p className="text-[10px] text-white/30 text-center">
        By signing, you authorize the selected service option.
      </p>
    </div>
  );
}

// ─── option card ─────────────────────────────────────────────────────────────

function OptionCard({
  opt, accentColor, isApproved, onApprove, isAlreadyApproved, baseTotal
}: {
  opt: Option;
  accentColor: string;
  isApproved: boolean;
  onApprove: (optId: number) => void;
  isAlreadyApproved: boolean;
  baseTotal: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const recommended = opt.isRecommended === 1;
  const total = parseFloat(opt.total);
  const base = baseTotal;
  const delta = base > 0 && total > base ? `+$${(total - base).toFixed(0)} vs Basic` : null;

  return (
    <div
      className={`relative flex flex-col rounded-2xl border transition-all duration-200 overflow-hidden
        ${recommended
          ? "border-blue-500/60 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-[1.02]"
          : "border-white/10"
        }
        ${isApproved ? "ring-2 ring-green-500/60" : ""}
        bg-[#111827]
      `}
    >
      {/* Recommended banner */}
      {recommended && (
        <div className="bg-blue-600 text-white text-[10px] font-bold tracking-widest text-center py-1.5 uppercase">
          Recommended for your vehicle
        </div>
      )}

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Badge + name */}
        <div className="flex items-start justify-between gap-2">
          <div>
            {opt.badge && (
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2 ${
                recommended ? "bg-blue-500/20 text-blue-300" : "bg-white/10 text-white/60"
              }`}>
                {opt.badge}
              </span>
            )}
            <h3 className="text-xl font-bold text-white">{opt.name}</h3>
          </div>
          {isApproved && (
            <div className="flex items-center gap-1 text-green-400 text-xs font-semibold shrink-0">
              <CheckCircle2 className="w-4 h-4" /> Approved
            </div>
          )}
        </div>

        {/* Price */}
        <div>
          <div className="text-4xl font-extrabold text-white tracking-tight">
            ${parseFloat(opt.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          {delta && (
            <div className="text-xs text-amber-400 mt-1 font-medium">{delta}</div>
          )}
          {recommended && (
            <div className="text-xs text-blue-300/70 mt-1">Most customers choose this option</div>
          )}
        </div>

        {/* Warranty + time */}
        <div className="flex flex-wrap gap-3">
          {opt.warranty && (
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Shield className="w-3.5 h-3.5 text-blue-400" />
              {opt.warranty}
            </div>
          )}
          {opt.completionTime && (
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {opt.completionTime}
            </div>
          )}
        </div>

        {/* Selling points */}
        {opt.sellingPoints.length > 0 && (
          <ul className="space-y-1.5">
            {opt.sellingPoints.filter(Boolean).map((sp, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                {sp}
              </li>
            ))}
          </ul>
        )}

        {/* Line items toggle */}
        {opt.lineItems.length > 0 && (
          <div>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              {expanded ? "Hide" : "View"} line items ({opt.lineItems.length})
            </button>
            {expanded && (
              <div className="mt-2 space-y-1.5 border-t border-white/10 pt-2">
                {opt.lineItems.map(li => (
                  <div key={li.id} className="flex justify-between text-xs text-white/50">
                    <span className="flex-1 pr-2">{li.description} <span className="text-white/30">({li.partQuality})</span></span>
                    <span className="shrink-0">${parseFloat(li.total).toFixed(2)}</span>
                  </div>
                ))}
                <Separator className="bg-white/10 my-1" />
                <div className="flex justify-between text-xs text-white/50">
                  <span>Subtotal</span><span>${parseFloat(opt.subtotal).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-white/50">
                  <span>Tax ({opt.taxRate ?? "0"}%)</span>
                  <span>${(parseFloat(opt.total) - parseFloat(opt.subtotal)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white">
                  <span>Total</span><span>${parseFloat(opt.total).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-auto pt-2">
          {isAlreadyApproved ? (
            isApproved
              ? <div className="w-full py-2.5 rounded-xl bg-green-600/20 text-green-400 text-sm font-semibold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Selected
                </div>
              : <div className="w-full py-2.5 rounded-xl bg-white/5 text-white/30 text-sm text-center">Not selected</div>
          ) : (
            <button
              onClick={() => onApprove(opt.id)}
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                recommended
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                  : "border border-white/20 text-white/70 hover:bg-white/5"
              }`}
            >
              Approve & Book
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function EstimateView() {
  const params = useParams<{ id: string }>();
  const publicId = params.id;

  const { data: estimate, isLoading, error } = trpc.estimates.getByPublicId.useQuery(
    { publicId: publicId ?? "" },
    { enabled: !!publicId }
  );

  const approveMutation = trpc.estimates.approve.useMutation({
    onSuccess: () => {
      toast.success("Your selection has been confirmed. The shop will be in touch shortly.");
      setApprovalStep("success");
    },
    onError: (err) => toast.error(err.message),
  });

  const [pendingOptionId, setPendingOptionId] = useState<number | null>(null);
  const [approvalStep, setApprovalStep] = useState<"idle" | "confirm" | "sign" | "success">("idle");

  const handleApprove = (optId: number) => {
    setPendingOptionId(optId);
    setApprovalStep("confirm");
  };

  const handleSign = (signatureImage: string) => {
    if (!pendingOptionId || !publicId) return;
    approveMutation.mutate({
      publicId,
      optionId: pendingOptionId,
      signatureImage,
      signatureName: "",
      ip: "",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
      </div>
    );
  }

  if (error || !estimate) {
    return (
      <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center text-white/60 text-sm">
        Estimate not found or has expired.
      </div>
    );
  }

  const est = estimate as unknown as EstimateData;
  const accentColor = est.tenantColor ?? "#2563eb";
  const vehicle = [est.vehicleYear, est.vehicleMake, est.vehicleModel].filter(Boolean).join(" ");
  const isApproved = est.status === "approved";
  const baseTotal = parseFloat(est.options[0]?.total ?? "0");
  const dealerSavings = est.dealerPrice
    ? parseFloat(est.dealerPrice) - parseFloat(est.options[1]?.total ?? est.options[0]?.total ?? "0")
    : null;

  // Comparison table rows
  const tableRows = [
    { label: "Warranty", key: "warranty" as const },
    { label: "Part Quality", key: "partQuality" as const },
    { label: "Completion", key: "completionTime" as const },
    { label: "Price", key: "total" as const },
  ];

  const getTableValue = (opt: Option, key: string) => {
    if (key === "partQuality") return opt.lineItems[0]?.partQuality ?? "—";
    if (key === "total") return `$${parseFloat(opt.total).toFixed(2)}`;
    return ((opt as unknown) as Record<string, unknown>)[key] as string ?? "—";
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0e172a]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {est.tenantLogo ? (
              <img src={est.tenantLogo} alt="Shop logo" className="h-8 w-auto" />
            ) : (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: accentColor }}>
                {(est.tenantName ?? "S").charAt(0).toUpperCase()}
              </div>
            )}
            <span className="font-semibold text-sm text-white/80">{est.tenantName ?? "Service Estimate"}</span>
          </div>
          {est.tenantPhone && (
            <a href={`tel:${est.tenantPhone}`}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              {est.tenantPhone}
            </a>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">

        {/* Hero */}
        <div className="text-center space-y-2">
          <p className="text-xs text-white/40 uppercase tracking-widest">Service Estimate</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Your Service Options</h1>
          <p className="text-white/50 text-sm">
            Prepared for <span className="text-white font-medium">{est.customerName}</span>
            {vehicle && <> — <span className="text-white font-medium">{vehicle}</span></>}
          </p>
          <p className="text-lg font-semibold text-white/80 mt-2">{est.jobTitle}</p>
          <div className="flex items-center justify-center gap-4 text-xs text-white/30 mt-1">
            {est.advisorName && <span>Advisor: {est.advisorName}</span>}
            {est.location && <span>· {est.location}</span>}
          </div>
        </div>

        {/* Dealer savings banner */}
        {dealerSavings && dealerSavings > 0 && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl px-5 py-3 text-center">
            <span className="text-amber-300 font-semibold text-sm">
              💰 You save ${dealerSavings.toFixed(0)} vs dealership pricing
            </span>
          </div>
        )}

        {/* Approval success */}
        {(approvalStep === "success" || isApproved) && (
          <div className="bg-green-950/40 border border-green-500/30 rounded-2xl p-6 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
            <h2 className="text-lg font-bold text-green-300">Appointment Approved</h2>
            <p className="text-sm text-green-400/70">
              Thank you! The shop will contact you to confirm your appointment.
            </p>
          </div>
        )}

        {/* Option cards */}
        <div className={`grid gap-4 ${est.options.length === 3 ? "sm:grid-cols-3" : est.options.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-1 max-w-sm mx-auto"}`}>
          {est.options.map(opt => (
            <OptionCard
              key={opt.id}
              opt={opt}
              accentColor={accentColor}
              isApproved={est.approvedOptionId === opt.id}
              onApprove={handleApprove}
              isAlreadyApproved={isApproved || approvalStep === "success"}
              baseTotal={baseTotal}
            />
          ))}
        </div>

        {/* Comparison table */}
        {est.options.length > 1 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 pr-4 text-white/40 text-xs font-medium w-32">Feature</th>
                  {est.options.map(opt => (
                    <th key={opt.id} className={`py-3 px-3 text-center text-xs font-semibold ${opt.isRecommended ? "text-blue-400" : "text-white/60"}`}>
                      {opt.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map(row => (
                  <tr key={row.key} className="border-b border-white/5">
                    <td className="py-3 pr-4 text-white/40 text-xs">{row.label}</td>
                    {est.options.map(opt => (
                      <td key={opt.id} className={`py-3 px-3 text-center text-xs ${opt.isRecommended ? "text-white" : "text-white/60"}`}>
                        {getTableValue(opt, row.key)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Sticky CTA */}
        {!isApproved && approvalStep === "idle" && (
          <div className="fixed bottom-0 left-0 right-0 bg-[#0e172a]/95 backdrop-blur-sm border-t border-white/10 px-4 py-4 z-20">
            <div className="max-w-5xl mx-auto">
              <p className="text-xs text-white/40 text-center mb-3">Select your preferred option</p>
              <div className={`grid gap-2 ${est.options.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                {est.options.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleApprove(opt.id)}
                    className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      opt.isRecommended
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border border-white/20 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {opt.name} — ${parseFloat(opt.total).toFixed(0)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Spacer for sticky bar */}
        {!isApproved && approvalStep === "idle" && <div className="h-24" />}

        {/* Confirm modal */}
        {approvalStep === "confirm" && pendingOptionId && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-4">
              <h2 className="text-lg font-bold text-white">Confirm Selection</h2>
              <p className="text-sm text-white/60">
                You are approving the <strong className="text-white">
                  {est.options.find(o => o.id === pendingOptionId)?.name}
                </strong> option for{" "}
                <strong className="text-white">
                  ${parseFloat(est.options.find(o => o.id === pendingOptionId)?.total ?? "0").toFixed(2)}
                </strong>.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setApprovalStep("idle")}
                  className="flex-1 border-white/20 text-white/60 hover:bg-white/5">
                  Go Back
                </Button>
                <Button onClick={() => setApprovalStep("sign")}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                  <Pen className="w-4 h-4 mr-1" /> Sign & Approve
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Signature modal */}
        {approvalStep === "sign" && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 flex items-end sm:items-center justify-center p-4">
            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-lg font-bold text-white mb-4">Sign to Approve</h2>
              {approveMutation.isPending ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                </div>
              ) : (
                <SignaturePad
                  onSave={handleSign}
                  onCancel={() => setApprovalStep("confirm")}
                />
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-white/20 pb-4 space-y-1">
          <p>256-bit SSL encrypted · Your data is securely stored</p>
          {est.tenantPhone && (
            <p>Questions? Call us at <a href={`tel:${est.tenantPhone}`} className="text-white/40 hover:text-white/60">{est.tenantPhone}</a></p>
          )}
        </div>
      </div>
    </div>
  );
}
