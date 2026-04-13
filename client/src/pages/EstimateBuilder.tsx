/**
 * EstimateBuilder — Staff-side estimate creation tool
 * White-label ready: no Vertical Automotive branding.
 * Route: /estimate-comparison/new
 */
import { useState, useCallback, useRef } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Plus, Trash2, Sparkles, ChevronDown, ChevronUp, Loader2,
  User, Car, Wrench, DollarSign, Send, Copy, CheckCircle2
} from "lucide-react";

// ─── types ───────────────────────────────────────────────────────────────────

interface LineItem {
  id: string;
  description: string;
  partQuality: "Aftermarket" | "OEM" | "Premium";
  laborHours: string;
  partCost: string;
  laborCost: string;
}

interface EstimateOption {
  id: string;
  name: string;
  badge: string;
  isRecommended: boolean;
  taxRate: string;
  warranty: string;
  completionTime: string;
  sellingPoints: string[];
  lineItems: LineItem[];
  sortOrder: number;
}

const BADGE_OPTIONS = ["Recommended", "Most Popular", "Best Value", "Premium", "Budget", ""];
const OPTION_PRESETS = ["Good", "Better", "Best", "Aftermarket", "OEM", "Premium"];

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function emptyLineItem(): LineItem {
  return { id: uid(), description: "", partQuality: "OEM", laborHours: "", partCost: "", laborCost: "" };
}

function emptyOption(name: string, sortOrder: number, isRecommended = false): EstimateOption {
  return {
    id: uid(), name, badge: isRecommended ? "Recommended" : "", isRecommended, taxRate: "7",
    warranty: "", completionTime: "", sellingPoints: [""], lineItems: [emptyLineItem()], sortOrder,
  };
}

function calcOptionTotal(opt: EstimateOption): { subtotal: number; tax: number; total: number } {
  const subtotal = opt.lineItems.reduce((s, li) => {
    return s + (parseFloat(li.partCost) || 0) + (parseFloat(li.laborCost) || 0);
  }, 0);
  const taxRate = parseFloat(opt.taxRate) / 100 || 0;
  const tax = subtotal * taxRate;
  return { subtotal, tax, total: subtotal + tax };
}

// ─── sub-components ──────────────────────────────────────────────────────────

function LineItemRow({ item, onChange, onRemove }: {
  item: LineItem;
  onChange: (updated: LineItem) => void;
  onRemove: () => void;
}) {
  const lineTotal = (parseFloat(item.partCost) || 0) + (parseFloat(item.laborCost) || 0);
  return (
    <div className="grid grid-cols-12 gap-2 items-center py-2 border-b border-border/50 last:border-0">
      <div className="col-span-12 sm:col-span-4">
        <Input
          placeholder="Description"
          value={item.description}
          onChange={e => onChange({ ...item, description: e.target.value })}
          className="h-8 text-sm"
        />
      </div>
      <div className="col-span-4 sm:col-span-2">
        <Select value={item.partQuality} onValueChange={v => onChange({ ...item, partQuality: v as LineItem["partQuality"] })}>
          <SelectTrigger className="h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Aftermarket">Aftermarket</SelectItem>
            <SelectItem value="OEM">OEM</SelectItem>
            <SelectItem value="Premium">Premium</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Input placeholder="Hrs" value={item.laborHours} onChange={e => onChange({ ...item, laborHours: e.target.value })} className="h-8 text-xs" />
      </div>
      <div className="col-span-3 sm:col-span-2">
        <Input placeholder="Part $" value={item.partCost} onChange={e => onChange({ ...item, partCost: e.target.value })} className="h-8 text-xs" />
      </div>
      <div className="col-span-3 sm:col-span-2">
        <Input placeholder="Labor $" value={item.laborCost} onChange={e => onChange({ ...item, laborCost: e.target.value })} className="h-8 text-xs" />
      </div>
      <div className="col-span-2 sm:col-span-1 text-right text-xs font-semibold text-foreground/70">
        ${lineTotal.toFixed(2)}
      </div>
      <div className="col-span-1 flex justify-end">
        <button onClick={onRemove} className="text-destructive/60 hover:text-destructive transition-colors">
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export default function EstimateBuilder() {
  const [, navigate] = useLocation();
  // Header fields
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [vehicleYear, setVehicleYear] = useState("");
  const [vehicleMake, setVehicleMake] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vin, setVin] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [advisorName, setAdvisorName] = useState("");
  const [location, setLocation] = useState("");
  const [dealerPrice, setDealerPrice] = useState("");
  const [tenantName, setTenantName] = useState("");
  const [tenantPhone, setTenantPhone] = useState("");
  const [tenantColor, setTenantColor] = useState("#2563eb");

  // Options
  const [options, setOptions] = useState<EstimateOption[]>([
    emptyOption("Good", 1, false),
    emptyOption("Better", 2, true),
    emptyOption("Best", 3, false),
  ]);

  const pendingSellingPointsOptId = useRef<string | null>(null);
  const [expandedOption, setExpandedOption] = useState<string | null>(options[0].id);
  const [generatedId, setGeneratedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // tRPC mutations
  const createMutation = trpc.estimates.create.useMutation({
    onSuccess: (data) => {
      setGeneratedId(data.publicId);
      toast.success("Estimate created! Share the link with your customer.");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const aiGenerateMutation = trpc.estimates.aiGenerateOptions.useMutation({
    onSuccess: (data) => {
      if (data.options?.length) {
        const newOptions = data.options.map((opt: {
          name: string; badge: string; warranty: string; completionTime: string;
          sellingPoints: string[];
          lineItems: { description: string; partQuality: string; laborHours: string; partCost: string; laborCost: string }[]
        }, i: number) => ({
          id: uid(),
          name: opt.name,
          badge: opt.badge,
          isRecommended: i === 1,
          taxRate: "7",
          warranty: opt.warranty,
          completionTime: opt.completionTime,
          sellingPoints: opt.sellingPoints,
          lineItems: opt.lineItems.map((li) => ({
            id: uid(),
            description: li.description,
            partQuality: (li.partQuality as LineItem["partQuality"]) || "OEM",
            laborHours: li.laborHours,
            partCost: li.partCost,
            laborCost: li.laborCost,
          })),
          sortOrder: i + 1,
        }));
        setOptions(newOptions);
        toast.success("AI options generated! Review and adjust before sending.");
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const aiSellingPointsMutation = trpc.estimates.aiSellingPoints.useMutation({
    onSuccess: (data) => {
      if (data.sellingPoints && pendingSellingPointsOptId.current) {
        const targetId = pendingSellingPointsOptId.current;
        setOptions(prev => prev.map(opt =>
          opt.id === targetId
            ? { ...opt, sellingPoints: data.sellingPoints }
            : opt
        ));
        pendingSellingPointsOptId.current = null;
        toast.success("Selling points generated!");
      }
    },
  });

  // Option helpers
  const updateOption = useCallback((id: string, patch: Partial<EstimateOption>) => {
    setOptions(prev => prev.map(o => o.id === id ? { ...o, ...patch } : o));
  }, []);

  const updateLineItem = useCallback((optId: string, liId: string, patch: Partial<LineItem>) => {
    setOptions(prev => prev.map(o => o.id === optId
      ? { ...o, lineItems: o.lineItems.map(li => li.id === liId ? { ...li, ...patch } : li) }
      : o
    ));
  }, []);

  const addLineItem = useCallback((optId: string) => {
    setOptions(prev => prev.map(o => o.id === optId
      ? { ...o, lineItems: [...o.lineItems, emptyLineItem()] }
      : o
    ));
  }, []);

  const removeLineItem = useCallback((optId: string, liId: string) => {
    setOptions(prev => prev.map(o => o.id === optId
      ? { ...o, lineItems: o.lineItems.filter(li => li.id !== liId) }
      : o
    ));
  }, []);

  const addOption = () => {
    if (options.length >= 3) return;
    setOptions(prev => [...prev, emptyOption("Option " + (prev.length + 1), prev.length + 1)]);
  };

  const removeOption = (id: string) => {
    if (options.length <= 2) return;
    setOptions(prev => prev.filter(o => o.id !== id));
  };

  const handleGenerate = () => {
    if (!customerName.trim() || !jobTitle.trim()) {
      toast.error("Customer name and job title are required.");
      return;
    }
    createMutation.mutate({
      customerName, customerPhone, customerEmail,
      vehicleYear, vehicleMake, vehicleModel, vin,
      jobTitle, advisorName, location, dealerPrice,
      tenantName, tenantPhone, tenantColor,
      options: options.map((opt, i) => ({
        name: opt.name,
        badge: opt.badge,
        isRecommended: opt.isRecommended,
        taxRate: opt.taxRate,
        warranty: opt.warranty,
        completionTime: opt.completionTime,
        sellingPoints: opt.sellingPoints.filter(Boolean),
        sortOrder: i + 1,
        lineItems: opt.lineItems.map((li, j) => ({
          description: li.description,
          partQuality: li.partQuality,
          laborHours: li.laborHours,
          partCost: li.partCost || "0",
          laborCost: li.laborCost || "0",
          sortOrder: j + 1,
        })),
      })),
    });
  };

  const customerLink = generatedId ? `${window.location.origin}/estimate-comparison/${generatedId}` : "";

  const copyLink = () => {
    navigator.clipboard.writeText(customerLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0e172a]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Estimate Builder</h1>
            <p className="text-xs text-white/50 mt-0.5">Create a comparison estimate for your customer</p>
          </div>
          <div className="flex items-center gap-2">
            {jobTitle && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => aiGenerateMutation.mutate({ jobTitle })}
                disabled={aiGenerateMutation.isPending}
                className="border-blue-500/40 text-blue-400 hover:bg-blue-500/10 text-xs"
              >
                {aiGenerateMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                AI Build Options
              </Button>
            )}
            <Button
              onClick={handleGenerate}
              disabled={createMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
            >
              {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Send className="w-4 h-4 mr-1" />}
              Generate Comparison
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

        {/* Success banner */}
        {generatedId && (
          <Card className="bg-green-950/40 border-green-500/30">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-green-300">Estimate created successfully</p>
                  <p className="text-xs text-green-400/70 mt-0.5 break-all">{customerLink}</p>
                </div>
                <Button size="sm" variant="outline" onClick={copyLink}
                  className="border-green-500/40 text-green-400 hover:bg-green-500/10 shrink-0">
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customer & Vehicle */}
        <Card className="bg-[#0e172a] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white/70 flex items-center gap-2">
              <User className="w-4 h-4" /> Customer & Vehicle
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="col-span-2 sm:col-span-1">
              <Label className="text-xs text-white/50">Customer Name *</Label>
              <Input value={customerName} onChange={e => setCustomerName(e.target.value)}
                placeholder="John Smith" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Phone</Label>
              <Input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)}
                placeholder="(954) 000-0000" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Email</Label>
              <Input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)}
                placeholder="john@email.com" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Year</Label>
              <Input value={vehicleYear} onChange={e => setVehicleYear(e.target.value)}
                placeholder="2022" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Make</Label>
              <Input value={vehicleMake} onChange={e => setVehicleMake(e.target.value)}
                placeholder="Toyota" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Model</Label>
              <Input value={vehicleModel} onChange={e => setVehicleModel(e.target.value)}
                placeholder="Camry" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div className="col-span-2 sm:col-span-3">
              <Label className="text-xs text-white/50">VIN (optional)</Label>
              <Input value={vin} onChange={e => setVin(e.target.value)}
                placeholder="1HGBH41JXMN109186" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
          </CardContent>
        </Card>

        {/* Job & Advisor */}
        <Card className="bg-[#0e172a] border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold text-white/70 flex items-center gap-2">
              <Wrench className="w-4 h-4" /> Job Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="col-span-2">
              <Label className="text-xs text-white/50">Job Title / Service Description *</Label>
              <Input value={jobTitle} onChange={e => setJobTitle(e.target.value)}
                placeholder="Brake Pad Replacement — Front & Rear"
                className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Advisor Name</Label>
              <Input value={advisorName} onChange={e => setAdvisorName(e.target.value)}
                placeholder="Doug" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Location</Label>
              <Input value={location} onChange={e => setLocation(e.target.value)}
                placeholder="Fort Lauderdale" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Dealer Price (for savings callout)</Label>
              <Input value={dealerPrice} onChange={e => setDealerPrice(e.target.value)}
                placeholder="850.00" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Shop Name (white-label)</Label>
              <Input value={tenantName} onChange={e => setTenantName(e.target.value)}
                placeholder="Your Shop Name" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Shop Phone</Label>
              <Input value={tenantPhone} onChange={e => setTenantPhone(e.target.value)}
                placeholder="(954) 565-1518" className="mt-1 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9" />
            </div>
            <div>
              <Label className="text-xs text-white/50">Brand Color</Label>
              <div className="flex items-center gap-2 mt-1">
                <input type="color" value={tenantColor} onChange={e => setTenantColor(e.target.value)}
                  className="w-9 h-9 rounded cursor-pointer border border-white/10 bg-transparent" />
                <Input value={tenantColor} onChange={e => setTenantColor(e.target.value)}
                  className="bg-white/5 border-white/10 text-white h-9 text-xs" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Options */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/70 flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> Estimate Options ({options.length}/3)
            </h2>
            {options.length < 3 && (
              <Button size="sm" variant="outline" onClick={addOption}
                className="border-white/20 text-white/60 hover:bg-white/5 text-xs">
                <Plus className="w-3 h-3 mr-1" /> Add Option
              </Button>
            )}
          </div>

          {options.map((opt, optIdx) => {
            const totals = calcOptionTotal(opt);
            const isExpanded = expandedOption === opt.id;
            return (
              <Card key={opt.id} className={`bg-[#0e172a] border transition-colors ${opt.isRecommended ? "border-blue-500/50" : "border-white/10"}`}>
                {/* Option header */}
                <div
                  className="flex items-center justify-between px-4 py-3 cursor-pointer"
                  onClick={() => setExpandedOption(isExpanded ? null : opt.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-white/40 font-mono w-4">{optIdx + 1}</span>
                    <div className="flex items-center gap-2">
                      {/* Preset selector */}
                      <Select value={opt.name} onValueChange={v => updateOption(opt.id, { name: v })}>
                        <SelectTrigger className="h-7 w-28 bg-transparent border-white/20 text-white text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {OPTION_PRESETS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      {opt.badge && (
                        <Badge className="text-[10px] px-1.5 py-0"
                          style={{ backgroundColor: opt.isRecommended ? tenantColor : undefined }}>
                          {opt.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">${totals.total.toFixed(2)}</span>
                    <button
                      onClick={e => { e.stopPropagation(); updateOption(opt.id, { isRecommended: !opt.isRecommended }); }}
                      className={`text-xs px-2 py-0.5 rounded border transition-colors ${opt.isRecommended ? "border-blue-500 text-blue-400 bg-blue-500/10" : "border-white/20 text-white/40 hover:border-white/40"}`}
                    >
                      {opt.isRecommended ? "★ Recommended" : "Set Recommended"}
                    </button>
                    {options.length > 2 && (
                      <button onClick={e => { e.stopPropagation(); removeOption(opt.id); }}
                        className="text-destructive/50 hover:text-destructive">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
                  </div>
                </div>

                {isExpanded && (
                  <CardContent className="pt-0 pb-4 space-y-4">
                    <Separator className="bg-white/10" />

                    {/* Option meta */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div>
                        <Label className="text-xs text-white/50">Badge</Label>
                        <Select value={opt.badge} onValueChange={v => updateOption(opt.id, { badge: v })}>
                          <SelectTrigger className="mt-1 h-8 bg-white/5 border-white/10 text-white text-xs">
                            <SelectValue placeholder="None" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="">None</SelectItem>
                            {BADGE_OPTIONS.filter(Boolean).map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs text-white/50">Tax Rate (%)</Label>
                        <Input value={opt.taxRate} onChange={e => updateOption(opt.id, { taxRate: e.target.value })}
                          placeholder="7" className="mt-1 h-8 bg-white/5 border-white/10 text-white text-xs" />
                      </div>
                      <div>
                        <Label className="text-xs text-white/50">Warranty</Label>
                        <Input value={opt.warranty} onChange={e => updateOption(opt.id, { warranty: e.target.value })}
                          placeholder="12 months / 12,000 miles" className="mt-1 h-8 bg-white/5 border-white/10 text-white text-xs" />
                      </div>
                      <div>
                        <Label className="text-xs text-white/50">Completion Time</Label>
                        <Input value={opt.completionTime} onChange={e => updateOption(opt.id, { completionTime: e.target.value })}
                          placeholder="Same day" className="mt-1 h-8 bg-white/5 border-white/10 text-white text-xs" />
                      </div>
                    </div>

                    {/* Line items */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs text-white/50">Line Items</Label>
                        <div className="grid grid-cols-12 gap-2 text-[10px] text-white/30 w-full max-w-[calc(100%-80px)] ml-4 hidden sm:grid">
                          <span className="col-span-4">Description</span>
                          <span className="col-span-2">Quality</span>
                          <span className="col-span-1">Hrs</span>
                          <span className="col-span-2">Part $</span>
                          <span className="col-span-2">Labor $</span>
                          <span className="col-span-1 text-right">Total</span>
                        </div>
                      </div>
                      {opt.lineItems.map(li => (
                        <LineItemRow key={li.id} item={li}
                          onChange={updated => updateLineItem(opt.id, li.id, updated)}
                          onRemove={() => removeLineItem(opt.id, li.id)} />
                      ))}
                      <Button size="sm" variant="ghost" onClick={() => addLineItem(opt.id)}
                        className="mt-2 text-xs text-white/40 hover:text-white/70 h-7">
                        <Plus className="w-3 h-3 mr-1" /> Add Line Item
                      </Button>
                    </div>

                    {/* Totals */}
                    <div className="bg-white/5 rounded-lg p-3 text-sm space-y-1">
                      <div className="flex justify-between text-white/60 text-xs">
                        <span>Subtotal</span><span>${totals.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-white/60 text-xs">
                        <span>Tax ({opt.taxRate}%)</span><span>${totals.tax.toFixed(2)}</span>
                      </div>
                      <Separator className="bg-white/10 my-1" />
                      <div className="flex justify-between font-bold text-white">
                        <span>Total</span><span>${totals.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Selling points */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <Label className="text-xs text-white/50">Selling Points</Label>
                        <Button size="sm" variant="ghost"
                          onClick={() => {
                            const firstOpt = options[0];
                            const payload = {
                              optionName: opt.name,
                              partQuality: opt.lineItems[0]?.partQuality ?? "OEM",
                              warranty: opt.warranty,
                              totalPrice: totals.total.toFixed(2),
                              jobTitle,
                              comparedToBasicPrice: firstOpt && firstOpt.id !== opt.id ? calcOptionTotal(firstOpt).total.toFixed(2) : undefined,
                            };
                            // Store optId for onSuccess handler via ref
                            pendingSellingPointsOptId.current = opt.id;
                            aiSellingPointsMutation.mutate(payload);
                          }}
                          disabled={aiSellingPointsMutation.isPending}
                          className="text-xs text-blue-400 hover:text-blue-300 h-6">
                            {aiSellingPointsMutation.isPending ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Sparkles className="w-3 h-3 mr-1" />}
                            AI Generate
                          </Button>
                      </div>
                      {opt.sellingPoints.map((sp, spIdx) => (
                        <div key={spIdx} className="flex items-center gap-2 mb-1.5">
                          <Input
                            value={sp}
                            onChange={e => {
                              const updated = [...opt.sellingPoints];
                              updated[spIdx] = e.target.value;
                              updateOption(opt.id, { sellingPoints: updated });
                            }}
                            placeholder="e.g. Longer lasting than OEM parts"
                            className="h-7 text-xs bg-white/5 border-white/10 text-white placeholder:text-white/20"
                          />
                          <button onClick={() => {
                            const updated = opt.sellingPoints.filter((_, i) => i !== spIdx);
                            updateOption(opt.id, { sellingPoints: updated.length ? updated : [""] });
                          }} className="text-destructive/50 hover:text-destructive shrink-0">
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      <Button size="sm" variant="ghost" onClick={() => updateOption(opt.id, { sellingPoints: [...opt.sellingPoints, ""] })}
                        className="text-xs text-white/40 hover:text-white/70 h-6 mt-1">
                        <Plus className="w-3 h-3 mr-1" /> Add Point
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-end gap-3 pb-8">
          <Button
            onClick={handleGenerate}
            disabled={createMutation.isPending}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
            Generate Comparison
          </Button>
        </div>
      </div>
    </div>
  );
}
