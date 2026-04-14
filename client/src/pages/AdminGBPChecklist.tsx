/**
 * Admin GBP Checklist — /admin/gbp-checklist
 * Google Business Profile optimization checklist for both locations.
 * Admin-only page.
 */
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Circle, ArrowLeft, ExternalLink, MapPin } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  priority: "critical" | "high" | "medium";
  link?: string;
  linkLabel?: string;
}

const CHECKLIST_ITEMS: ChecklistItem[] = [
  // Profile Completeness
  { id: "photos_25", label: "25+ high-quality photos uploaded", description: "Include exterior, interior, team, vehicles being serviced, before/after shots. Google rewards profiles with 25+ photos.", priority: "critical" },
  { id: "photos_360", label: "360° virtual tour or street view", description: "Add a Google Street View or 360° interior photo tour. Increases engagement significantly.", priority: "high" },
  { id: "categories", label: "Primary + secondary categories set correctly", description: "Primary: Auto Repair Shop. Secondary: Car Repair & Maintenance, Brake Shop, Oil Change Service, Tire Shop, Transmission Shop.", priority: "critical" },
  { id: "description", label: "Business description complete (750 chars)", description: "Include keywords: Fort Lauderdale, Wilton Manors, ASE-certified, Tesla, European, Asian, Domestic, 3-year warranty, 36 years.", priority: "critical" },
  { id: "services_list", label: "Full service list added in GBP", description: "Add all services with descriptions: Brakes, Oil Change, AC Repair, Diagnostics, Transmission, EV/Tesla, Alignment, etc.", priority: "critical" },
  { id: "hours", label: "Hours accurate (Mon–Fri 8AM–5PM)", description: "Verify hours are correct. Set holiday hours in advance. Inconsistent hours hurt trust.", priority: "critical" },
  { id: "phone", label: "Phone numbers verified for both locations", description: "WM: (954) 565-1518 | FL: (645) 216-2266. Use local numbers, not tracking numbers as primary.", priority: "critical" },
  { id: "website_links", label: "Website links to correct city pages", description: "WM profile → /wilton-manors/auto-repair | FL profile → /fort-lauderdale/auto-repair", priority: "critical" },
  { id: "address_verified", label: "Address verified and consistent with NAP", description: "Ensure address matches exactly across website, citations, and GBP. NAP consistency is critical for local SEO.", priority: "critical" },

  // Engagement
  { id: "weekly_posts", label: "Weekly GBP posts published", description: "Post at least once per week: offers, tips, before/after, team highlights. Posts expire after 7 days.", priority: "high" },
  { id: "qa_section", label: "Q&A section populated (10+ questions)", description: "Add and answer your own Q&As: 'Do you work on Tesla?', 'What warranty do you offer?', 'Do you service European cars?', etc.", priority: "high" },
  { id: "messaging", label: "Messaging enabled and monitored", description: "Enable GBP messaging. Respond within 24 hours. Google tracks response rate.", priority: "high" },
  { id: "booking_link", label: "Booking link added", description: "Add the scheduling link (Kukui) to GBP so customers can book directly from Google.", priority: "high", link: "https://business.google.com", linkLabel: "Open GBP" },
  { id: "products", label: "Products/services with photos and prices", description: "Add key services as 'products' with photos and price ranges. Shows in knowledge panel.", priority: "medium" },

  // Reviews
  { id: "reviews_500", label: "500+ Google reviews (current status)", description: "You have 500+ reviews with 4.9 stars. Maintain this by asking every satisfied customer to leave a review.", priority: "critical" },
  { id: "review_responses", label: "All reviews responded to within 48 hours", description: "Respond to every review — positive and negative. Shows engagement and professionalism.", priority: "critical" },
  { id: "review_strategy", label: "Review request strategy in place", description: "Send review request SMS/email after every completed job. Use a QR code at the front desk.", priority: "high" },

  // Local SEO
  { id: "gbp_posts_offers", label: "Current offers posted in GBP", description: "Sync current offers from the website to GBP posts. Offer posts get high visibility.", priority: "high" },
  { id: "service_area", label: "Service area set (Broward County)", description: "Set service area to include: Fort Lauderdale, Wilton Manors, Oakland Park, Pompano Beach, Coral Springs, Sunrise, Plantation.", priority: "high" },
  { id: "attributes", label: "Attributes set (wheelchair, WiFi, etc.)", description: "Set all relevant attributes: Wheelchair accessible, Restroom, WiFi, Appointment required, etc.", priority: "medium" },
  { id: "insights_monitored", label: "GBP Insights reviewed monthly", description: "Check search queries, views, calls, direction requests monthly. Use data to improve.", priority: "medium" },
];

const PRIORITY_COLORS = {
  critical: "text-red-600 dark:text-red-400",
  high: "text-yellow-600 dark:text-yellow-400",
  medium: "text-blue-600 dark:text-blue-400",
};

const PRIORITY_BG = {
  critical: "bg-red-500/10 border-red-500/20",
  high: "bg-yellow-500/10 border-yellow-500/20",
  medium: "bg-blue-500/10 border-blue-500/20",
};

const PRIORITY_LABELS = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
};

const LOCATIONS_DATA = [
  {
    name: "Wilton Manors",
    address: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311",
    phone: "(954) 565-1518",
    gbpUrl: "https://business.google.com",
    cityPage: "/wilton-manors/auto-repair",
  },
  {
    name: "Fort Lauderdale",
    address: "707 NE 11th Street, Fort Lauderdale, FL 33304",
    phone: "(645) 216-2266",
    gbpUrl: "https://business.google.com",
    cityPage: "/fort-lauderdale/auto-repair",
  },
];

export default function AdminGBPChecklist() {
  const { user, isAuthenticated, loading } = useAuth();
  const [checked, setChecked] = useState<Record<string, Record<string, boolean>>>({
    "Wilton Manors": {},
    "Fort Lauderdale": {},
  });
  const [activeLocation, setActiveLocation] = useState("Wilton Manors");
  const [filterPriority, setFilterPriority] = useState<"all" | "critical" | "high" | "medium">("all");

  function toggle(locationName: string, itemId: string) {
    setChecked(prev => ({
      ...prev,
      [locationName]: {
        ...prev[locationName],
        [itemId]: !prev[locationName]?.[itemId],
      },
    }));
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

  const filteredItems = filterPriority === "all"
    ? CHECKLIST_ITEMS
    : CHECKLIST_ITEMS.filter(item => item.priority === filterPriority);

  const locationChecked = checked[activeLocation] ?? {};
  const completedCount = filteredItems.filter(item => locationChecked[item.id]).length;
  const totalCount = filteredItems.length;
  const allCompleted = CHECKLIST_ITEMS.filter(item => locationChecked[item.id]).length;
  const allTotal = CHECKLIST_ITEMS.length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/conversations">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Admin
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">GBP Optimization Checklist</h1>
              <p className="text-xs text-muted-foreground">Google Business Profile — Both Locations</p>
            </div>
          </div>
          <a href="https://business.google.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="gap-2 font-bold">
              Open GBP <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        {/* Location Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {LOCATIONS_DATA.map((loc) => {
            const locChecked = checked[loc.name] ?? {};
            const locCompleted = CHECKLIST_ITEMS.filter(i => locChecked[i.id]).length;
            const pct = Math.round((locCompleted / CHECKLIST_ITEMS.length) * 100);
            const isActive = activeLocation === loc.name;
            return (
              <button
                key={loc.name}
                onClick={() => setActiveLocation(loc.name)}
                className={`text-left border p-4 transition-colors ${isActive ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/50"}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-black uppercase tracking-tight">{loc.name}</span>
                  {isActive && <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 font-bold">Active</span>}
                </div>
                <div className="text-xs text-muted-foreground mb-3">{loc.address}</div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{locCompleted}/{CHECKLIST_ITEMS.length} complete</span>
                  <span className="text-xs font-bold text-primary">{pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap">
          {(["all", "critical", "high", "medium"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setFilterPriority(p)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide border transition-colors ${filterPriority === p ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-foreground/30"}`}
            >
              {p === "all" ? `All (${CHECKLIST_ITEMS.length})` : `${PRIORITY_LABELS[p]} (${CHECKLIST_ITEMS.filter(i => i.priority === p).length})`}
            </button>
          ))}
          <div className="ml-auto text-xs text-muted-foreground self-center">
            {completedCount}/{totalCount} shown · {allCompleted}/{allTotal} total
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-2">
          {filteredItems.map((item) => {
            const isChecked = locationChecked[item.id] ?? false;
            return (
              <div
                key={item.id}
                className={`border p-4 transition-colors cursor-pointer ${isChecked ? "border-green-500/30 bg-green-500/5" : `border-border bg-card hover:border-primary/30`}`}
                onClick={() => toggle(activeLocation, item.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 shrink-0">
                    {isChecked
                      ? <CheckCircle2 className="w-5 h-5 text-green-500" />
                      : <Circle className="w-5 h-5 text-muted-foreground" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`font-bold text-sm ${isChecked ? "line-through text-muted-foreground" : ""}`}>
                        {item.label}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 border rounded-sm ${PRIORITY_BG[item.priority]} ${PRIORITY_COLORS[item.priority]}`}>
                        {PRIORITY_LABELS[item.priority]}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 mt-1"
                      >
                        {item.linkLabel} <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Resources */}
        <div className="border border-border bg-card p-5">
          <h2 className="font-black uppercase tracking-tight mb-4">Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Google Business Profile Manager", href: "https://business.google.com" },
              { label: "Fort Lauderdale City Page", href: "/fort-lauderdale/auto-repair" },
              { label: "Wilton Manors City Page", href: "/wilton-manors/auto-repair" },
              { label: "Backlink Tracker", href: "/admin/backlinks" },
              { label: "Community Page", href: "/community" },
              { label: "Press Page", href: "/press" },
            ].map((r) => (
              r.href.startsWith("http") ? (
                <a key={r.label} href={r.href} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1">
                  {r.label} <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <Link key={r.label} href={r.href}>
                  <span className="text-sm text-primary font-bold hover:underline">{r.label} →</span>
                </Link>
              )
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Note: Checklist state is stored locally in this browser session and resets on refresh. For persistent tracking, use the notes field in the Backlink Tracker.
        </p>
      </div>
    </div>
  );
}
