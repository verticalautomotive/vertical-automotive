/**
 * AdminEstimates — Staff/admin panel for managing all estimates
 * Route: /admin/estimates
 */
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Plus, ExternalLink, Copy, CheckCircle2, Clock, Eye, FileText,
  Loader2, Search, Trash2, MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-white/10 text-white/50",
  sent: "bg-blue-500/20 text-blue-300",
  viewed: "bg-amber-500/20 text-amber-300",
  approved: "bg-green-500/20 text-green-300",
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  draft: <FileText className="w-3 h-3" />,
  sent: <Clock className="w-3 h-3" />,
  viewed: <Eye className="w-3 h-3" />,
  approved: <CheckCircle2 className="w-3 h-3" />,
};

export default function AdminEstimates() {
  const [, navigate] = useLocation();
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { data, isLoading, refetch } = trpc.estimates.list.useQuery({
    page: 1,
    pageSize: 100,
    status: "all",
  });

  const deleteMutation = trpc.estimates.delete.useMutation({
    onSuccess: () => {
      toast.success("Estimate deleted.");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const copyLink = (publicId: string) => {
    const url = `${window.location.origin}/estimate-comparison/${publicId}`;
    navigator.clipboard.writeText(url);
    setCopiedId(publicId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const estimates = (data?.records ?? []).filter((e: { customerName: string; jobTitle: string; vehicleYear?: string | null; vehicleMake?: string | null; vehicleModel?: string | null }) => {
    const q = search.toLowerCase();
    return (
      !q ||
      e.customerName.toLowerCase().includes(q) ||
      e.jobTitle.toLowerCase().includes(q) ||
      [e.vehicleYear, e.vehicleMake, e.vehicleModel].filter(Boolean).join(" ").toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-white">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0e172a]/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Estimates</h1>
            <p className="text-xs text-white/40 mt-0.5">{data?.total ?? 0} total estimates</p>
          </div>
          <Button
            onClick={() => navigate("/estimate-comparison/new")}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> New Estimate
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-4">
        {/* Stats */}
        {data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {(["draft", "sent", "viewed", "approved"] as const).map(status => {
              const count = data.records.filter(e => e.status === status).length;
              return (
                <div key={status} className="bg-[#0e172a] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[status]}`}>
                      {STATUS_ICONS[status]} {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white">{count}</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <Input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer, vehicle, or job..."
            className="pl-9 bg-white/5 border-white/10 text-white placeholder:text-white/20 h-9"
          />
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
          </div>
        ) : estimates.length === 0 ? (
          <div className="text-center py-20 text-white/30 text-sm">
            {search ? "No estimates match your search." : "No estimates yet. Create your first one."}
          </div>
        ) : (
          <div className="space-y-2">
            {estimates.map(est => {
              const vehicle = [est.vehicleYear, est.vehicleMake, est.vehicleModel].filter(Boolean).join(" ");
              const topOption = (est as { options?: { id: number; name: string; total: string }[] }).options?.[0];
              const approvedOption = (est as { options?: { id: number; name: string; total: string }[]; approvedOptionId?: number }).options?.find((o: { id: number }) => o.id === (est as { approvedOptionId?: number }).approvedOptionId);
              const createdAt = new Date(est.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric"
              });

              return (
                <div key={est.id}
                  className="bg-[#0e172a] border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3 hover:border-white/20 transition-colors">
                  {/* Status */}
                  <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[est.status]}`}>
                    {STATUS_ICONS[est.status]}
                    {est.status.charAt(0).toUpperCase() + est.status.slice(1)}
                  </span>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm text-white truncate">{est.customerName}</span>
                      {vehicle && <span className="text-xs text-white/40 truncate">{vehicle}</span>}
                    </div>
                    <div className="text-xs text-white/40 mt-0.5 truncate">{est.jobTitle}</div>
                  </div>

                  {/* Approved option */}
                  {approvedOption ? (
                    <div className="hidden sm:flex items-center gap-1 text-xs text-green-400 shrink-0">
                      <CheckCircle2 className="w-3 h-3" />
                      {approvedOption.name} — ${parseFloat(approvedOption.total).toFixed(0)}
                    </div>
                  ) : topOption ? (
                    <div className="hidden sm:block text-xs text-white/30 shrink-0">
                      {(est as { options?: unknown[] }).options?.length ?? 0} option{((est as { options?: unknown[] }).options?.length ?? 0) !== 1 ? "s" : ""}
                    </div>
                  ) : null}

                  {/* Date */}
                  <span className="hidden sm:block text-xs text-white/30 shrink-0">{createdAt}</span>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => copyLink(est.publicId)}
                      className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                      title="Copy customer link"
                    >
                      {copiedId === est.publicId ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <a
                      href={`/estimate-comparison/${est.publicId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors"
                      title="Preview customer view"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-colors">
                          <MoreHorizontal className="w-3.5 h-3.5" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-[#111827] border-white/10 text-white text-sm">
                        <DropdownMenuItem
                          className="text-destructive/80 hover:text-destructive cursor-pointer"
                          onClick={() => {
                            if (confirm("Delete this estimate?")) {
                              deleteMutation.mutate({ publicId: est.publicId });
                            }
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
