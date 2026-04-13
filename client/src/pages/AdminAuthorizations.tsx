/**
 * Admin Payment Authorizations Dashboard — /admin/authorizations
 * Protected: requires authentication. Shows all payment authorization records
 * with search, filter, CSV export, and dispute flagging.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Download,
  AlertTriangle,
  FileText,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Shield,
  Filter,
  Link2,
  RefreshCw,
  Loader2,
  Send,
  CheckCircle2,
} from "lucide-react";
import { getLoginUrl } from "@/const";

type Authorization = {
  id: number;
  referenceNumber: string;
  fullLegalName: string;
  email: string;
  phone: string;
  invoiceNumber: string;
  authorizedAmount: string;
  serviceLocation: "Fort Lauderdale" | "Wilton Manors";
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  paymentMethod: string;
  usedInDispute: number;
  pdfUrl: string | null;
  roSourceUrl: string | null;
  createdAt: Date;
  signatureImage: string;
};

export default function AdminAuthorizations() {
  const { user, loading } = useAuth();
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState<"all" | "Fort Lauderdale" | "Wilton Manors">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [disputeOnly, setDisputeOnly] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 25;

  const [selectedRef, setSelectedRef] = useState<string | null>(null);
  const [disputeRef, setDisputeRef] = useState<string | null>(null);
  const [disputeNotes, setDisputeNotes] = useState("");
  const [sendLinkRecord, setSendLinkRecord] = useState<Authorization | null>(null);
  const [sendLinkPhone, setSendLinkPhone] = useState("");
  const [sendLinkSuccess, setSendLinkSuccess] = useState<string | null>(null);

  const { data, isLoading, refetch } = trpc.paymentAuth.list.useQuery({
    search: search || undefined,
    location,
    dateFrom: dateFrom || undefined,
    dateTo: dateTo || undefined,
    disputeOnly,
    page,
    pageSize: PAGE_SIZE,
  });

  const { data: detail } = trpc.paymentAuth.get.useQuery(
    { referenceNumber: selectedRef! },
    { enabled: !!selectedRef }
  );

  const { data: csvData } = trpc.paymentAuth.exportCsv.useQuery(
    { search: search || undefined, location, dateFrom: dateFrom || undefined, dateTo: dateTo || undefined },
    { enabled: false }
  );

  const reExtractMutation = trpc.paymentAuth.reExtractRo.useMutation({
    onSuccess: () => {
      // Refresh detail
      utils.paymentAuth.get.invalidate({ referenceNumber: selectedRef! });
    },
  });

  const sendFormLink = trpc.paymentAuth.sendFormLink.useMutation({
    onSuccess: (data) => {
      setSendLinkSuccess(data.sentTo);
    },
  });

  const markDispute = trpc.paymentAuth.markDispute.useMutation({
    onSuccess: () => {
      setDisputeRef(null);
      setDisputeNotes("");
      refetch();
    },
  });

  const utils = trpc.useUtils();

  const handleExportCsv = async () => {
    const result = await utils.paymentAuth.exportCsv.fetch({
      search: search || undefined,
      location,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
    });
    if (!result.csv) return;
    const blob = new Blob([result.csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-authorizations-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-sm w-full">
          <CardContent className="p-8 text-center space-y-4">
            <Shield className="w-10 h-10 text-blue-600 mx-auto" />
            <h2 className="text-xl font-bold">Admin Access Required</h2>
            <p className="text-gray-500 text-sm">Please sign in to view payment authorizations.</p>
            <Button className="w-full" onClick={() => window.location.href = getLoginUrl()}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const records: Authorization[] = (data?.records ?? []) as Authorization[];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const formatDate = (d: Date) =>
    new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#0a0f1e] text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold">Payment Authorizations</h1>
          <p className="text-gray-400 text-xs">Vertical Automotive — Admin Dashboard</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-300">{user.name}</span>
          <Button size="sm" variant="outline" onClick={handleExportCsv} className="gap-1.5 bg-transparent border-gray-600 text-gray-200 hover:bg-gray-800">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b px-6 py-3 flex items-center gap-6 text-sm">
        <div>
          <span className="text-gray-500">Total Records</span>
          <span className="ml-2 font-bold text-gray-900">{total}</span>
        </div>
        <div>
          <span className="text-gray-500">Fort Lauderdale</span>
          <span className="ml-2 font-bold text-blue-600">
            {records.filter(r => r.serviceLocation === "Fort Lauderdale").length}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Wilton Manors</span>
          <span className="ml-2 font-bold text-blue-600">
            {records.filter(r => r.serviceLocation === "Wilton Manors").length}
          </span>
        </div>
        <div>
          <span className="text-gray-500">Disputes</span>
          <span className="ml-2 font-bold text-red-600">
            {records.filter(r => r.usedInDispute).length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search name, email, invoice, reference..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pl-9"
              />
            </div>
          </div>
          <Select value={location} onValueChange={v => { setLocation(v as typeof location); setPage(1); }}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Fort Lauderdale">Fort Lauderdale</SelectItem>
              <SelectItem value="Wilton Manors">Wilton Manors</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="w-36 text-sm" />
            <span className="text-gray-400 text-sm">to</span>
            <Input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="w-36 text-sm" />
          </div>
          <Button
            variant={disputeOnly ? "default" : "outline"}
            size="sm"
            onClick={() => { setDisputeOnly(!disputeOnly); setPage(1); }}
            className="gap-1.5"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Disputes Only
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-gray-400">Loading records...</div>
          ) : records.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No authorization records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Reference</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Invoice</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Vehicle</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">RO</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {records.map(r => (
                    <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setSelectedRef(r.referenceNumber)}
                          className="text-blue-600 hover:underline font-mono text-xs font-medium"
                        >
                          {r.referenceNumber}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(r.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{r.fullLegalName}</div>
                        <div className="text-gray-400 text-xs">{r.email}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700 font-mono text-xs">{r.invoiceNumber}</td>
                      <td className="px-4 py-3 text-gray-700 text-xs">{r.vehicleYear} {r.vehicleMake} {r.vehicleModel}</td>
                      <td className="px-4 py-3 font-bold text-gray-900">${r.authorizedAmount}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`text-xs ${r.serviceLocation === "Fort Lauderdale" ? "border-blue-300 text-blue-700" : "border-purple-300 text-purple-700"}`}>
                          {r.serviceLocation === "Fort Lauderdale" ? "FTL" : "WM"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {r.usedInDispute ? (
                          <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">Dispute</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Active</Badge>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {r.roSourceUrl ? (
                          <a href={r.roSourceUrl} target="_blank" rel="noopener noreferrer" title="Open Shop-Ware RO">
                            <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1 text-blue-600 border-blue-200">
                              <Link2 className="w-3 h-3" /> RO
                            </Button>
                          </a>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 px-2 text-xs"
                            onClick={() => setSelectedRef(r.referenceNumber)}
                          >
                            View
                          </Button>
                          {r.pdfUrl && (
                            <a href={r.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Button size="sm" variant="outline" className="h-7 px-2 text-xs gap-1">
                                <ExternalLink className="w-3 h-3" /> PDF
                              </Button>
                            </a>
                          )}
                          <Button
                            size="sm"
                            className="h-7 px-2.5 text-xs bg-green-600 hover:bg-green-700 text-white gap-1.5 font-semibold shadow-sm"
                            title="Send payment form link via SMS"
                            onClick={() => {
                              setSendLinkRecord(r);
                              setSendLinkPhone(r.phone || "");
                              setSendLinkSuccess(null);
                            }}
                          >
                            <Send className="w-3 h-3" /> Send Link
                          </Button>
                          {!r.usedInDispute && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2 text-xs text-red-600 border-red-200 hover:bg-red-50"
                              onClick={() => setDisputeRef(r.referenceNumber)}
                            >
                              <AlertTriangle className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <span>Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, total)} of {total}</span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)} className="gap-1">
                <ChevronLeft className="w-4 h-4" /> Prev
              </Button>
              <Button size="sm" variant="outline" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="gap-1">
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Dialog */}
      <Dialog open={!!selectedRef} onOpenChange={open => !open && setSelectedRef(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Authorization Detail — {selectedRef}</DialogTitle>
            <DialogDescription>Full record for chargeback reference</DialogDescription>
          </DialogHeader>
          {detail && (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  ["Reference", detail.referenceNumber],
                  ["Submitted", new Date(detail.createdAt).toLocaleString()],
                  ["Customer", detail.fullLegalName],
                  ["Email", detail.email],
                  ["Phone", detail.phone],
                  ["Billing Address", `${detail.billingStreet}, ${detail.billingCity}, ${detail.billingState} ${detail.billingZip}`],
                  ["Vehicle", `${detail.vehicleYear} ${detail.vehicleMake} ${detail.vehicleModel}`],
                  ["VIN", detail.vin ?? "—"],
                  ["License Plate", detail.licensePlate ?? "—"],
                  ["Mileage", detail.mileage ?? "—"],
                  ["Invoice", detail.invoiceNumber],
                  ["Amount", `$${detail.authorizedAmount}`],
                  ["Payment Method", detail.paymentMethod],
                  ["Location", detail.serviceLocation],
                  ["Signed By", detail.signatureName],
                  ["Signed At", new Date(Number(detail.signedAt)).toLocaleString()],
                  ["IP Address", detail.submissionIp ?? "—"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <span className="text-gray-500 font-medium">{label}:</span>
                    <span className="ml-2 text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="text-gray-500 font-medium">Services:</span>
                <p className="mt-1 text-gray-900 bg-gray-50 rounded p-2">{detail.serviceDescription}</p>
              </div>
              {detail.signatureImage && detail.signatureImage !== "[redacted]" && (
                <div>
                  <span className="text-gray-500 font-medium block mb-1">Signature:</span>
                  <img src={detail.signatureImage} alt="Customer signature" className="border rounded bg-white max-h-24" />
                </div>
              )}
              {detail.pdfUrl && (
                <a href={detail.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-blue-600 hover:underline text-sm">
                  <ExternalLink className="w-4 h-4" /> Download PDF Authorization
                </a>
              )}
              {(detail as Authorization & { roSourceUrl?: string | null }).roSourceUrl && (
                <div className="bg-blue-50 border border-blue-200 rounded p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-blue-700 text-xs font-medium">
                      <Link2 className="w-3.5 h-3.5" /> Shop-Ware RO Source
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 px-2 text-xs gap-1 text-blue-600 border-blue-300"
                      disabled={reExtractMutation.isPending}
                      onClick={() => reExtractMutation.mutate({ referenceNumber: detail.referenceNumber })}
                    >
                      {reExtractMutation.isPending ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Re-extracting...</>
                      ) : (
                        <><RefreshCw className="w-3 h-3" /> Re-extract</>
                      )}
                    </Button>
                  </div>
                  <a
                    href={(detail as Authorization & { roSourceUrl?: string | null }).roSourceUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-xs break-all"
                  >
                    {(detail as Authorization & { roSourceUrl?: string | null }).roSourceUrl}
                  </a>
                </div>
              )}
              {detail.usedInDispute ? (
                <div className="bg-red-50 border border-red-200 rounded p-3">
                  <p className="text-red-700 font-medium text-xs">Flagged for Dispute</p>
                  {detail.disputeNotes && <p className="text-red-600 text-xs mt-1">{detail.disputeNotes}</p>}
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 gap-1.5"
                  onClick={() => { setSelectedRef(null); setDisputeRef(detail.referenceNumber); }}
                >
                  <AlertTriangle className="w-3.5 h-3.5" /> Flag for Dispute
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Link Dialog */}
      <Dialog open={!!sendLinkRecord} onOpenChange={open => { if (!open) { setSendLinkRecord(null); setSendLinkSuccess(null); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-4 h-4 text-green-600" /> Send Payment Form Link
            </DialogTitle>
            <DialogDescription>
              {sendLinkRecord && (
                <>Send a pre-filled authorization form to <strong>{sendLinkRecord.fullLegalName}</strong> for <strong>${sendLinkRecord.authorizedAmount}</strong> (RO #{sendLinkRecord.invoiceNumber}).</>
              )}
            </DialogDescription>
          </DialogHeader>
          {sendLinkSuccess ? (
            <div className="py-6 flex flex-col items-center gap-3 text-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
              <p className="font-semibold text-gray-900">SMS Sent!</p>
              <p className="text-sm text-gray-500">Form link delivered to <span className="font-mono">{sendLinkSuccess}</span></p>
              <Button className="mt-2" onClick={() => { setSendLinkRecord(null); setSendLinkSuccess(null); }}>Done</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Customer Phone Number</label>
                <Input
                  value={sendLinkPhone}
                  onChange={e => setSendLinkPhone(e.target.value)}
                  placeholder="+1 (954) 555-0000"
                  className="font-mono"
                />
                <p className="text-xs text-gray-400 mt-1">Pre-filled from record. Edit if needed.</p>
              </div>
              {sendFormLink.error && (
                <p className="text-xs text-red-600">{sendFormLink.error.message}</p>
              )}
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setSendLinkRecord(null)}>Cancel</Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                  disabled={sendFormLink.isPending || !sendLinkPhone.trim()}
                  onClick={() => {
                    if (!sendLinkRecord) return;
                    sendFormLink.mutate({
                      phone: sendLinkPhone,
                      referenceNumber: sendLinkRecord.referenceNumber,
                      customerName: sendLinkRecord.fullLegalName,
                      invoiceNumber: sendLinkRecord.invoiceNumber,
                      authorizedAmount: sendLinkRecord.authorizedAmount,
                      serviceLocation: sendLinkRecord.serviceLocation,
                      vehicleYear: sendLinkRecord.vehicleYear,
                      vehicleMake: sendLinkRecord.vehicleMake,
                      vehicleModel: sendLinkRecord.vehicleModel,
                      origin: window.location.origin,
                    });
                  }}
                >
                  {sendFormLink.isPending ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending...</>
                  ) : (
                    <><Send className="w-3.5 h-3.5" /> Send SMS</>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dispute Dialog */}
      <Dialog open={!!disputeRef} onOpenChange={open => !open && setDisputeRef(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Flag for Dispute</DialogTitle>
            <DialogDescription>
              Mark {disputeRef} as used in a chargeback dispute. This is for internal tracking only.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Notes (optional)</label>
              <Textarea
                placeholder="e.g. Chargeback filed 2026-04-13, case #12345..."
                value={disputeNotes}
                onChange={e => setDisputeNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setDisputeRef(null)}>Cancel</Button>
              <Button
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={markDispute.isPending}
                onClick={() => markDispute.mutate({ referenceNumber: disputeRef!, notes: disputeNotes || undefined })}
              >
                {markDispute.isPending ? "Flagging..." : "Flag as Dispute"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
