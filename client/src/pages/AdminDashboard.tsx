/**
 * Admin Dashboard — /admin
 * Protected landing page for admin users.
 * Requires Manus OAuth login with a whitelisted email (verticalauto89@gmail.com or verticalautoft@gmail.com).
 */
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Link2, CheckSquare, MessageSquare, BarChart2,
  MapPin, FileText, Users, Settings, LogOut,
  ExternalLink, ChevronRight, Shield
} from "lucide-react";
import { trpc } from "@/lib/trpc";

const ADMIN_TOOLS = [
  {
    title: "Backlink Tracker",
    description: "Track outreach, acquired links, and 90-day link-building goal progress.",
    href: "/admin/backlinks",
    icon: Link2,
    color: "text-blue-500",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    title: "GBP Checklist",
    description: "Google Business Profile optimization checklist for both locations.",
    href: "/admin/gbp-checklist",
    icon: CheckSquare,
    color: "text-green-500",
    bg: "bg-green-500/10 border-green-500/20",
  },
  {
    title: "Chatbot Conversations",
    description: "Review AI chatbot conversations, escalations, and customer inquiries.",
    href: "/admin/conversations",
    icon: MessageSquare,
    color: "text-purple-500",
    bg: "bg-purple-500/10 border-purple-500/20",
  },
];

const QUICK_LINKS = [
  { label: "Fort Lauderdale City Page", href: "/fort-lauderdale/auto-repair" },
  { label: "Wilton Manors City Page", href: "/wilton-manors/auto-repair" },
  { label: "Community Page", href: "/community" },
  { label: "Press Page", href: "/press" },
  { label: "EV & Hybrid Guide", href: "/ev-hybrid-repair-fort-lauderdale" },
  { label: "FL Auto Repair Guide", href: "/fort-lauderdale-auto-repair-guide" },
  { label: "South FL Maintenance", href: "/car-maintenance-south-florida" },
  { label: "Services", href: "/services" },
  { label: "Offers", href: "/offers" },
  { label: "Blog", href: "/blog" },
];

export default function AdminDashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const statsQuery = trpc.backlinks.stats.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === "admin",
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Admin Access</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Sign in with your authorized Manus account to access the Vertical Automotive admin dashboard.
          </p>
          <a href={getLoginUrl()}>
            <Button className="w-full font-bold uppercase tracking-wide">
              Sign In with Manus
            </Button>
          </a>
        </div>
      </div>
    );
  }

  // Logged in but not admin — access denied
  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-sm w-full text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 flex items-center justify-center">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight mb-2">Access Denied</h1>
          <p className="text-muted-foreground text-sm mb-2">
            Your account (<strong>{user?.email ?? user?.name}</strong>) is not authorized to access this area.
          </p>
          <p className="text-muted-foreground text-sm mb-8">
            Only authorized Vertical Automotive accounts can access the admin dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <Button variant="outline" onClick={() => logout()} className="font-bold">
              Sign Out
            </Button>
            <Link href="/">
              <Button variant="ghost" className="w-full font-bold">Go to Homepage</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo-vertical-automotive.svg" alt="Vertical Automotive" className="h-8 w-auto" />
            <div>
              <div className="font-black uppercase tracking-tight text-sm">Admin Dashboard</div>
              <div className="text-xs text-muted-foreground">Vertical Automotive</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold">{user.name || user.email}</div>
              <div className="text-xs text-muted-foreground">{user.email}</div>
            </div>
            <div className="w-8 h-8 bg-primary/20 border border-primary/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <Button variant="ghost" size="sm" onClick={() => logout()} className="gap-1 text-muted-foreground hover:text-foreground">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight mb-1">
            Welcome back, <span className="text-primary">{user.name?.split(" ")[0] || "Admin"}</span>
          </h1>
          <p className="text-muted-foreground text-sm">Vertical Automotive Admin Panel — Fort Lauderdale & Wilton Manors</p>
        </div>

        {/* Stats Row */}
        {statsQuery.data && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Links Acquired", value: statsQuery.data.acquired, sub: `of ${statsQuery.data.goal} goal` },
              { label: "Contacted", value: statsQuery.data.contacted, sub: "awaiting reply" },
              { label: "Follow Up", value: statsQuery.data.followUp, sub: "need action" },
              { label: "Progress", value: `${Math.round((statsQuery.data.acquired / statsQuery.data.goal) * 100)}%`, sub: "90-day goal" },
            ].map((s) => (
              <div key={s.label} className="border border-border bg-card p-4">
                <div className="text-2xl font-black text-primary">{s.value}</div>
                <div className="text-xs font-bold uppercase tracking-wide">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Tools */}
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Admin Tools</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {ADMIN_TOOLS.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <div className={`border p-5 cursor-pointer hover:border-primary/50 transition-colors group ${tool.bg}`}>
                  <div className="flex items-start justify-between mb-3">
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="font-black uppercase tracking-tight mb-1">{tool.title}</div>
                  <div className="text-xs text-muted-foreground leading-relaxed">{tool.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Locations</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "Fort Lauderdale", address: "707 NE 11th Street, Fort Lauderdale, FL 33304", phone: "(645) 216-2266", href: "/fort-lauderdale/auto-repair", gbp: "https://business.google.com" },
              { name: "Wilton Manors", address: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311", phone: "(954) 565-1518", href: "/wilton-manors/auto-repair", gbp: "https://business.google.com" },
            ].map((loc) => (
              <div key={loc.name} className="border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="font-black uppercase tracking-tight">{loc.name}</span>
                </div>
                <div className="text-xs text-muted-foreground mb-1">{loc.address}</div>
                <div className="text-xs text-muted-foreground mb-3">{loc.phone}</div>
                <div className="flex gap-3">
                  <Link href={loc.href}>
                    <span className="text-xs text-primary font-bold hover:underline">City Page →</span>
                  </Link>
                  <a href={loc.gbp} target="_blank" rel="noopener noreferrer" className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1">
                    GBP <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-black uppercase tracking-tight mb-4">Quick Links</h2>
          <div className="border border-border bg-card p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {QUICK_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span className="text-sm text-primary font-bold hover:underline block py-1">{link.label} →</span>
                </Link>
              ))}
              <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1 py-1">
                Google Business <ExternalLink className="w-3 h-3" />
              </a>
              <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1 py-1">
                Search Console <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Account Info */}
        <div className="border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-primary" />
            <span className="font-black uppercase tracking-tight text-sm">Session Info</span>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 text-sm">
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Name</div>
              <div className="font-medium">{user.name || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Email</div>
              <div className="font-medium">{user.email || "—"}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Role</div>
              <div className="font-medium capitalize text-primary">{user.role}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
