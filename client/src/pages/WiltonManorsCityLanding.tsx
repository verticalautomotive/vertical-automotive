/**
 * Wilton Manors Auto Repair — City Landing Page
 * Unique content with local references, services, map, reviews, internal links
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { MapPin, Phone, Clock, CheckCircle, Star, ExternalLink } from "lucide-react";
import { COMPANY, LOCATIONS, SERVICES } from "@/lib/data";
import { LazyMap } from "@/components/LazyMap";

const WM_LOCATION = LOCATIONS[0]; // Wilton Manors

const NEIGHBORHOODS = [
  "Wilton Manors", "Oakland Park", "Sunrise", "Lauderdale Lakes",
  "North Andrews Gardens", "Coral Springs", "Tamarac", "Plantation",
  "Lauderhill", "Fort Lauderdale", "Pompano Beach", "Deerfield Beach",
];

const REVIEWS = [
  { name: "Robert H.", rating: 5, text: "I've been bringing my cars here since 2018. Best shop in Wilton Manors by far. They know European cars — my Volvo is always in great hands.", date: "2025" },
  { name: "Lisa P.", rating: 5, text: "Took my Prius in for a strange noise. They found the issue in 20 minutes, fixed it same day. Very honest — didn't try to upsell me on anything.", date: "2025" },
  { name: "Marcus W.", rating: 5, text: "Had a full brake job done on my F-150. Price was fair, work was excellent, and they finished ahead of schedule. Will be back for everything.", date: "2024" },
  { name: "Diana F.", rating: 5, text: "My Honda's AC stopped working in August. Vertical Automotive on Oakland Park got me in immediately and fixed it the same day. Lifesavers!", date: "2024" },
  { name: "Tom B.", rating: 5, text: "These guys are the real deal. Diagnosed a transmission issue that the dealer missed. Saved me over $1,000. Honest and skilled.", date: "2025" },
  { name: "Natalie C.", rating: 5, text: "Clean shop, friendly staff, and they explain everything clearly. My whole family brings their cars here now. Wouldn't go anywhere else.", date: "2024" },
];

export default function WiltonManorsCityLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Auto Repair Wilton Manors | Vertical Automotive — ASE-Certified"
        description="Auto repair in Wilton Manors, FL. ASE-certified mechanics at 1100 W Oakland Park Blvd. Serving Oakland Park, Sunrise, Lauderdale Lakes, and all of Broward County. 36-month warranty. Call (954) 565-1518."
        canonical="https://verticalautomotive.com/wilton-manors/auto-repair"
        keywords="auto repair Wilton Manors, car mechanic Wilton Manors, Wilton Manors auto shop, brake repair Wilton Manors, oil change Oakland Park, AC repair Wilton Manors, engine repair Oakland Park, ASE certified Wilton Manors"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
                <MapPin className="w-3 h-3" /> WILTON MANORS, FL
              </div>
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight mb-4 leading-none">
                AUTO REPAIR<br />
                <span className="text-primary">WILTON MANORS</span>
              </h1>
              <p className="text-lg text-secondary-foreground/80 mb-6 leading-relaxed">
                ASE-certified auto repair at 1100 W Oakland Park Blvd, Wilton Manors. Serving Oakland Park, Sunrise, Lauderdale Lakes, and all of Broward County since 1989. 36-month warranty on every repair.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide">
                    Schedule Appointment
                  </Button>
                </a>
                <a href={`tel:${WM_LOCATION.phoneRaw}`}>
                  <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary-foreground/30 text-secondary-foreground">
                    <Phone className="w-4 h-4 mr-2" /> {WM_LOCATION.phone}
                  </Button>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border border-primary/30 bg-primary/5 p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-wide mb-1">Wilton Manors Location</div>
                    <div className="text-sm text-secondary-foreground/80">{WM_LOCATION.fullAddress}</div>
                    <a href={WM_LOCATION.directionsUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1 mt-1">
                      Get Directions <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-border bg-card p-5">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold uppercase tracking-wide mb-1">Hours</div>
                    <div className="text-sm text-secondary-foreground/80">Monday – Friday: 8:00 AM – 5:00 PM</div>
                    <div className="text-sm text-secondary-foreground/60">Saturday – Sunday: Closed</div>
                  </div>
                </div>
              </div>
              <div className="border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-2">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-primary text-primary" />)}
                  <span className="font-bold">4.9</span>
                  <span className="text-sm text-secondary-foreground/60">· 500+ Google Reviews</span>
                </div>
                <a href="https://www.google.com/maps/place/Vertical+Automotive" target="_blank" rel="noopener noreferrer" className="text-sm text-primary font-bold hover:underline inline-flex items-center gap-1">
                  Read Reviews on Google <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-primary/10 border-y border-primary/20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Years in Business", value: "36+" },
              { label: "Vehicles Serviced", value: "54,000+" },
              { label: "Warranty", value: "36-Month" },
              { label: "Certification", value: "ASE-Certified" },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-2xl font-black text-primary">{item.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            SERVICES IN <span className="text-primary">WILTON MANORS</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {SERVICES.slice(0, 12).map((s) => (
              <Link key={s.slug} href={`/wilton-manors/${s.slug === "brake-system" ? "brake-repair" : s.slug}`}>
                <div className="border border-border bg-card p-4 hover:border-primary/50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-sm font-bold group-hover:text-primary transition-colors">{s.shortTitle}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/services">
            <Button variant="outline" className="font-bold uppercase tracking-wide border-foreground/30">
              View All Services →
            </Button>
          </Link>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
            SERVING THESE <span className="text-primary">NEIGHBORHOODS</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {NEIGHBORHOODS.map((n) => (
              <span key={n} className="border border-border bg-card px-3 py-1.5 text-sm font-medium">
                {n}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Located at 1100 W Oakland Park Blvd Unit 5, Wilton Manors — easy access from Oakland Park Blvd, I-95, and US-1. Serving all of Broward County.
          </p>
        </div>
      </section>

      {/* Map */}
      <section className="py-12">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
            FIND US IN <span className="text-primary">WILTON MANORS</span>
          </h2>
          <div className="h-64 sm:h-80 border border-border overflow-hidden">
            <LazyMap
              initialCenter={{ lat: WM_LOCATION.lat, lng: WM_LOCATION.lng }}
              locationName={`Vertical Automotive — ${WM_LOCATION.name}`}
              address={WM_LOCATION.fullAddress}
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              CUSTOMER <span className="text-primary">REVIEWS</span>
            </h2>
            <div className="flex items-center gap-2">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-primary text-primary" />)}
              <span className="font-black text-xl">4.9</span>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <div key={r.name} className="border border-border bg-card p-5">
                <div className="flex items-center gap-1 mb-3">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">"{r.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{r.name}</span>
                  <span className="text-xs text-muted-foreground">{r.date}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <a href="https://www.google.com/maps/place/Vertical+Automotive" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="font-bold uppercase tracking-wide border-foreground/30">
                See All 500+ Reviews on Google <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-12 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-xl font-black uppercase tracking-tight mb-6">EXPLORE MORE</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/fort-lauderdale-auto-repair-guide", label: "Fort Lauderdale Auto Repair Guide" },
              { href: "/car-maintenance-south-florida", label: "South Florida Maintenance Guide" },
              { href: "/ev-hybrid-repair-fort-lauderdale", label: "EV & Hybrid Repair" },
              { href: "/fort-lauderdale/auto-repair", label: "Fort Lauderdale Location" },
              { href: "/services/faq", label: "FAQ" },
              { href: "/about", label: "About Us" },
            ].map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-sm text-primary font-bold hover:underline">{link.label} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            SCHEDULE YOUR <span className="text-primary">WILTON MANORS APPOINTMENT</span>
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311. Open Monday–Friday 8 AM–5 PM. 36-month warranty on all repairs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide px-8">
                Book Online
              </Button>
            </a>
            <a href={`tel:${WM_LOCATION.phoneRaw}`}>
              <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary-foreground/30 text-secondary-foreground">
                <Phone className="w-4 h-4 mr-2" /> {WM_LOCATION.phone}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
