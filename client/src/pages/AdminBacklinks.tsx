/**
 * Admin Backlinks Tracker — /admin/backlinks
 * Full CRUD table for tracking backlink outreach and acquired links.
 * Admin-only access.
 */
import { useState, useMemo } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Plus, Search, ExternalLink, Pencil, Trash2, CheckCircle2,
  Link2, TrendingUp, Target, Users, ArrowLeft
} from "lucide-react";

type BacklinkStatus = "not_contacted" | "contacted" | "follow_up" | "link_acquired" | "declined" | "no_response";
type BacklinkTier = "tier1_local" | "tier2_business" | "tier3_community" | "tier4_niche";

interface BacklinkFormData {
  website: string;
  contactName: string;
  email: string;
  dateContacted: string;
  status: BacklinkStatus;
  linkAcquired: boolean;
  linkUrl: string;
  targetPage: string;
  domainAuthority: string;
  tier: BacklinkTier;
  notes: string;
}

const EMPTY_FORM: BacklinkFormData = {
  website: "",
  contactName: "",
  email: "",
  dateContacted: "",
  status: "not_contacted",
  linkAcquired: false,
  linkUrl: "",
  targetPage: "",
  domainAuthority: "",
  tier: "tier1_local",
  notes: "",
};

const STATUS_LABELS: Record<BacklinkStatus, string> = {
  not_contacted: "Not Contacted",
  contacted: "Contacted",
  follow_up: "Follow Up",
  link_acquired: "Link Acquired",
  declined: "Declined",
  no_response: "No Response",
};

const STATUS_COLORS: Record<BacklinkStatus, string> = {
  not_contacted: "bg-muted text-muted-foreground",
  contacted: "bg-blue-500/20 text-blue-600 dark:text-blue-400",
  follow_up: "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
  link_acquired: "bg-green-500/20 text-green-700 dark:text-green-400",
  declined: "bg-red-500/20 text-red-700 dark:text-red-400",
  no_response: "bg-orange-500/20 text-orange-700 dark:text-orange-400",
};

const TIER_LABELS: Record<BacklinkTier, string> = {
  tier1_local: "T1 — Local Authority",
  tier2_business: "T2 — Business",
  tier3_community: "T3 — Community",
  tier4_niche: "T4 — Niche Auto",
};

const TIER_COLORS: Record<BacklinkTier, string> = {
  tier1_local: "bg-primary/20 text-primary",
  tier2_business: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
  tier3_community: "bg-teal-500/20 text-teal-700 dark:text-teal-400",
  tier4_niche: "bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
};

export default function AdminBacklinks() {
  const { user, isAuthenticated, loading } = useAuth();
  const utils = trpc.useUtils();

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BacklinkStatus | "all">("all");
  const [filterTier, setFilterTier] = useState<BacklinkTier | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<BacklinkFormData>(EMPTY_FORM);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const { data: statsData } = trpc.backlinks.stats.useQuery(undefined, { enabled: isAuthenticated && user?.role === "admin" });
  const { data: listData, isLoading } = trpc.backlinks.list.useQuery(
    {
      search: search || undefined,
      status: filterStatus !== "all" ? filterStatus : undefined,
      tier: filterTier !== "all" ? filterTier : undefined,
      limit: 200,
      offset: 0,
    },
    { enabled: isAuthenticated && user?.role === "admin" }
  );

  const createMutation = trpc.backlinks.create.useMutation({
    onSuccess: () => {
      utils.backlinks.list.invalidate();
      utils.backlinks.stats.invalidate();
      toast.success("Backlink added", { description: "Entry saved successfully." });
      setIsDialogOpen(false);
      setForm(EMPTY_FORM);
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const updateMutation = trpc.backlinks.update.useMutation({
    onSuccess: () => {
      utils.backlinks.list.invalidate();
      utils.backlinks.stats.invalidate();
      toast.success("Updated", { description: "Entry saved successfully." });
      setIsDialogOpen(false);
      setEditingId(null);
      setForm(EMPTY_FORM);
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  const deleteMutation = trpc.backlinks.delete.useMutation({
    onSuccess: () => {
      utils.backlinks.list.invalidate();
      utils.backlinks.stats.invalidate();
      toast.success("Deleted", { description: "Entry removed." });
      setDeleteConfirmId(null);
    },
    onError: (e) => toast.error("Error", { description: e.message }),
  });

  function openCreate() {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setIsDialogOpen(true);
  }

  function openEdit(row: NonNullable<typeof listData>["rows"][0]) {
    setEditingId(row.id);
    setForm({
      website: row.website,
      contactName: row.contactName ?? "",
      email: row.email ?? "",
      dateContacted: row.dateContacted ?? "",
      status: row.status,
      linkAcquired: row.linkAcquired === 1,
      linkUrl: row.linkUrl ?? "",
      targetPage: row.targetPage ?? "",
      domainAuthority: row.domainAuthority != null ? String(row.domainAuthority) : "",
      tier: row.tier,
      notes: row.notes ?? "",
    });
    setIsDialogOpen(true);
  }

  function handleSubmit() {
    const payload = {
      website: form.website,
      contactName: form.contactName || undefined,
      email: form.email || undefined,
      dateContacted: form.dateContacted || undefined,
      status: form.status,
      linkAcquired: form.linkAcquired,
      linkUrl: form.linkUrl || undefined,
      targetPage: form.targetPage || undefined,
      domainAuthority: form.domainAuthority ? parseInt(form.domainAuthority) : undefined,
      tier: form.tier,
      notes: form.notes || undefined,
    };
    if (editingId !== null) {
      updateMutation.mutate({ id: editingId, data: payload });
    } else {
      createMutation.mutate(payload);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-black uppercase mb-2">Access Denied</div>
          <p className="text-muted-foreground mb-4">Admin access required.</p>
          <Link href="/"><Button>Go Home</Button></Link>
        </div>
      </div>
    );
  }

  const rows = listData?.rows ?? [];
  const stats = statsData;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/conversations">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Backlink Tracker</h1>
              <p className="text-xs text-muted-foreground">90-Day Authority Building Campaign</p>
            </div>
          </div>
          <Button onClick={openCreate} className="gap-2 font-bold">
            <Plus className="w-4 h-4" /> Add Entry
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: Target, label: "Goal (90 days)", value: `${stats.acquired} / ${stats.goal}`, sub: "links acquired" },
              { icon: CheckCircle2, label: "Links Acquired", value: stats.acquired, sub: "live backlinks" },
              { icon: Link2, label: "Contacted", value: stats.contacted, sub: "awaiting response" },
              { icon: TrendingUp, label: "Follow Up", value: stats.followUp, sub: "need follow-up" },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-card p-4 rounded-sm">
                <div className="flex items-center gap-2 mb-2">
                  <s.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</span>
                </div>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        {stats && (
          <div className="border border-border bg-card p-4 rounded-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">90-Day Goal Progress</span>
              <span className="text-sm font-bold text-primary">{stats.acquired}/{stats.goal} links</span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${Math.min(100, (stats.acquired / stats.goal) * 100)}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground mt-1">{Math.round((stats.acquired / stats.goal) * 100)}% complete</div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search website, contact, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as BacklinkStatus | "all")}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {(Object.keys(STATUS_LABELS) as BacklinkStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterTier} onValueChange={(v) => setFilterTier(v as BacklinkTier | "all")}>
            <SelectTrigger className="w-52">
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              {(Object.keys(TIER_LABELS) as BacklinkTier[]).map((t) => (
                <SelectItem key={t} value={t}>{TIER_LABELS[t]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border border-border rounded-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Website</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Contact</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Status</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Tier</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">DA</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Target Page</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Contacted</th>
                  <th className="text-left px-4 py-3 font-bold uppercase tracking-wide text-xs">Link</th>
                  <th className="text-right px-4 py-3 font-bold uppercase tracking-wide text-xs">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={9} className="text-center py-12 text-muted-foreground">Loading...</td></tr>
                ) : rows.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-12">
                      <div className="text-muted-foreground mb-3">No entries yet</div>
                      <Button onClick={openCreate} size="sm" className="gap-2">
                        <Plus className="w-4 h-4" /> Add Your First Entry
                      </Button>
                    </td>
                  </tr>
                ) : rows.map((row) => (
                  <tr key={row.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium max-w-[200px] truncate">{row.website}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="max-w-[140px]">
                        {row.contactName && <div className="font-medium truncate">{row.contactName}</div>}
                        {row.email && <div className="text-xs text-muted-foreground truncate">{row.email}</div>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-sm ${STATUS_COLORS[row.status]}`}>
                        {STATUS_LABELS[row.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-sm ${TIER_COLORS[row.tier]}`}>
                        {TIER_LABELS[row.tier].split(" — ")[0]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-bold">{row.domainAuthority ?? "—"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground max-w-[140px] truncate">{row.targetPage ?? "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs text-muted-foreground">{row.dateContacted ?? "—"}</div>
                    </td>
                    <td className="px-4 py-3">
                      {row.linkAcquired === 1 && row.linkUrl ? (
                        <a href={row.linkUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 text-xs font-bold">
                          Live <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : row.linkAcquired === 1 ? (
                        <span className="text-green-600 text-xs font-bold">Acquired</span>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(row)} className="h-7 w-7 p-0">
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setDeleteConfirmId(row.id)} className="h-7 w-7 p-0 text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total count */}
        {rows.length > 0 && (
          <div className="text-xs text-muted-foreground text-right">
            Showing {rows.length} of {listData?.total ?? rows.length} entries
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) { setEditingId(null); setForm(EMPTY_FORM); } }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-black uppercase tracking-tight">
              {editingId !== null ? "Edit Entry" : "Add Backlink Entry"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
            <div className="sm:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Website *</Label>
              <Input placeholder="https://example.com" value={form.website} onChange={(e) => setForm(f => ({ ...f, website: e.target.value }))} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Contact Name</Label>
              <Input placeholder="John Smith" value={form.contactName} onChange={(e) => setForm(f => ({ ...f, contactName: e.target.value }))} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Email</Label>
              <Input placeholder="contact@example.com" value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm(f => ({ ...f, status: v as BacklinkStatus }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABELS) as BacklinkStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{STATUS_LABELS[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Tier</Label>
              <Select value={form.tier} onValueChange={(v) => setForm(f => ({ ...f, tier: v as BacklinkTier }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(TIER_LABELS) as BacklinkTier[]).map((t) => (
                    <SelectItem key={t} value={t}>{TIER_LABELS[t]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Date Contacted</Label>
              <Input type="date" value={form.dateContacted} onChange={(e) => setForm(f => ({ ...f, dateContacted: e.target.value }))} />
            </div>
            <div>
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Domain Authority (0–100)</Label>
              <Input type="number" min="0" max="100" placeholder="e.g. 45" value={form.domainAuthority} onChange={(e) => setForm(f => ({ ...f, domainAuthority: e.target.value }))} />
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Target Page</Label>
              <Input placeholder="/fort-lauderdale/brake-repair" value={form.targetPage} onChange={(e) => setForm(f => ({ ...f, targetPage: e.target.value }))} />
            </div>
            <div className="sm:col-span-2 flex items-center gap-3">
              <input
                type="checkbox"
                id="linkAcquired"
                checked={form.linkAcquired}
                onChange={(e) => setForm(f => ({ ...f, linkAcquired: e.target.checked }))}
                className="w-4 h-4 accent-primary"
              />
              <Label htmlFor="linkAcquired" className="text-sm font-bold cursor-pointer">Link Acquired</Label>
            </div>
            {form.linkAcquired && (
              <div className="sm:col-span-2">
                <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Live Link URL</Label>
                <Input placeholder="https://example.com/page-with-our-link" value={form.linkUrl} onChange={(e) => setForm(f => ({ ...f, linkUrl: e.target.value }))} />
              </div>
            )}
            <div className="sm:col-span-2">
              <Label className="text-xs font-bold uppercase tracking-wide mb-1 block">Notes</Label>
              <Textarea placeholder="Context, follow-up notes, outreach details..." value={form.notes} onChange={(e) => setForm(f => ({ ...f, notes: e.target.value }))} rows={3} />
            </div>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setIsDialogOpen(false); setEditingId(null); setForm(EMPTY_FORM); }}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!form.website || createMutation.isPending || updateMutation.isPending}
              className="font-bold"
            >
              {(createMutation.isPending || updateMutation.isPending) ? "Saving..." : editingId !== null ? "Save Changes" : "Add Entry"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirm Dialog */}
      <Dialog open={deleteConfirmId !== null} onOpenChange={(open) => { if (!open) setDeleteConfirmId(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="font-black uppercase">Delete Entry?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteConfirmId(null)}>Cancel</Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId !== null && deleteMutation.mutate({ id: deleteConfirmId })}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
