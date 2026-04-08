/**
 * ShiftSyncPanel — Admin panel for managing Shift's knowledge base sync
 * Shows sync status per section and allows manual re-sync trigger
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  Clock,
  Globe,
  X,
  Sparkles,
} from "lucide-react";

interface ShiftSyncPanelProps {
  onClose: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  services: "Services",
  pricing: "Pricing",
  offers: "Current Offers",
  about: "About Us",
  contact: "Contact Info",
  homepage: "Homepage",
};

export default function ShiftSyncPanel({ onClose }: ShiftSyncPanelProps) {
  const [syncLog, setSyncLog] = useState<string[]>([]);

  const { data: statusRows, refetch: refetchStatus, isLoading: statusLoading } =
    trpc.knowledge.status.useQuery(undefined, {
      refetchInterval: false,
    });

  const syncMutation = trpc.knowledge.sync.useMutation({
    onMutate: () => {
      setSyncLog(["Starting sync of all pages from verticalautomotive.com..."]);
    },
    onSuccess: (data) => {
      const logs: string[] = [];
      for (const r of data.results) {
        const label = SECTION_LABELS[r.section] ?? r.section;
        if (r.status === "ok") {
          logs.push(`✓ ${label} — ${r.message}`);
        } else {
          logs.push(`✗ ${label} — ${r.message}`);
        }
      }
      logs.push(`\nSync completed at ${data.syncedAt.toLocaleTimeString()}`);
      setSyncLog(logs);
      refetchStatus();
    },
    onError: (err) => {
      setSyncLog([`Sync failed: ${err.message}`]);
    },
  });

  const isSyncing = syncMutation.isPending;

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Never";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string | null | undefined) => {
    if (!status || status === "pending")
      return <Clock className="w-4 h-4 text-yellow-500" />;
    if (status === "ok")
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    return <XCircle className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-lg bg-background border border-border shadow-2xl rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary text-secondary-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <div>
              <h2 className="font-bold text-sm tracking-wider">SHIFT KNOWLEDGE SYNC</h2>
              <p className="text-xs text-secondary-foreground/60">Auto-syncs from verticalautomotive.com</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-secondary-foreground/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sync Status Table */}
        <div className="px-5 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold tracking-wider text-muted-foreground">
              KNOWLEDGE SECTIONS
            </span>
          </div>

          {statusLoading ? (
            <div className="text-sm text-muted-foreground py-4 text-center">
              Loading sync status...
            </div>
          ) : (
            <div className="space-y-2">
              {(["services", "pricing", "offers", "about", "contact", "homepage"] as const).map(
                (section) => {
                  const row = statusRows?.find((r) => r.section === section);
                  return (
                    <div
                      key={section}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/50 border border-border/50"
                    >
                      <div className="flex items-center gap-2">
                        {getStatusIcon(row?.lastStatus)}
                        <span className="text-sm font-medium">
                          {SECTION_LABELS[section]}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {row ? formatDate(row.syncedAt) : "Not synced yet"}
                      </span>
                    </div>
                  );
                }
              )}
            </div>
          )}
        </div>

        {/* Sync Log */}
        {syncLog.length > 0 && (
          <div className="mx-5 mb-4 rounded-lg bg-secondary/50 border border-border p-3 font-mono text-xs space-y-1 max-h-32 overflow-y-auto">
            {syncLog.map((line, i) => (
              <div
                key={i}
                className={
                  line.startsWith("✓")
                    ? "text-green-600"
                    : line.startsWith("✗")
                    ? "text-red-500"
                    : "text-muted-foreground"
                }
              >
                {line}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="px-5 pb-5 flex gap-3">
          <Button
            onClick={() => syncMutation.mutate()}
            disabled={isSyncing}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-bold"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`}
            />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border"
          >
            Close
          </Button>
        </div>

        {/* Footer note */}
        <div className="px-5 pb-4 text-xs text-muted-foreground text-center">
          Auto-syncs daily at midnight. Manual sync takes ~30 seconds.
        </div>
      </Card>
    </div>
  );
}
