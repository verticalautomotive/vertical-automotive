/**
 * Community & Partnerships Page
 * Goal: Give organizations a reason to link back to Vertical Automotive
 * Showcases sponsorships, local involvement, and community roots since 1989
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Users, Award, MapPin, Phone, ExternalLink, Star } from "lucide-react";
import { COMPANY, LOCATIONS } from "@/lib/data";

const SPONSORSHIPS = [
  {
    name: "Breast Cancer Awareness Walk",
    description:
      "Vertical Automotive proudly sponsors and participates in the annual South Florida Breast Cancer Awareness Walk, supporting research and local families affected by breast cancer.",
    category: "Health & Wellness",
    icon: "🎗️",
  },
  {
    name: "South Florida Derby Girls",
    description:
      "Official sponsor of the South Florida Derby Girls roller derby league — supporting women's athletics and the spirit of competition in our community.",
    category: "Women's Athletics",
    icon: "🏆",
  },
  {
    name: "Local Dance Teams",
    description:
      "Sponsoring youth and community dance teams across Wilton Manors and Fort Lauderdale, helping young performers pursue their passion.",
    category: "Youth Arts",
    icon: "💃",
  },
  {
    name: "Wilton Manors Business Association",
    description:
      "Active member and supporter of the Wilton Manors business community — participating in local events, referral networks, and neighborhood improvement initiatives.",
    category: "Local Business",
    icon: "🤝",
  },
  {
    name: "Fort Lauderdale Community Events",
    description:
      "Regular participant in Fort Lauderdale community events, car shows, and neighborhood outreach programs throughout Broward County.",
    category: "Community",
    icon: "🌴",
  },
  {
    name: "Local Schools & Youth Programs",
    description:
      "Supporting local schools and youth programs with donations, sponsorships, and automotive education opportunities for the next generation.",
    category: "Education",
    icon: "📚",
  },
];

const MILESTONES = [
  { year: "1989", event: "Vertical Automotive founded in South Florida" },
  { year: "1995", event: "Expanded to serve European and Asian vehicles" },
  { year: "2005", event: "Became ASE-certified for all technicians" },
  { year: "2015", event: "Added hybrid and EV service capabilities" },
  { year: "2020", event: "Opened second location in Fort Lauderdale" },
  { year: "2024", event: "Surpassed 54,000 vehicles serviced" },
  { year: "2025", event: "36 years of serving South Florida drivers" },
];

export default function Community() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Community & Partnerships | Vertical Automotive"
        description="Vertical Automotive has proudly served and supported the South Florida community since 1989. Learn about our sponsorships, local partnerships, and community involvement in Fort Lauderdale and Wilton Manors."
        canonical="https://verticalautomotive.com/community"
        keywords="Vertical Automotive community, Fort Lauderdale auto shop sponsorships, Wilton Manors community, South Florida auto repair partnerships, local business Fort Lauderdale"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
            <Heart className="w-3 h-3" /> PROUDLY SERVING SOUTH FLORIDA SINCE 1989
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
            COMMUNITY &<br />
            <span className="text-primary">PARTNERSHIPS</span>
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl leading-relaxed">
            For over 36 years, Vertical Automotive has been more than an auto repair shop — we are an active part of the South Florida community. We sponsor local organizations, support youth programs, and invest in the neighborhoods we serve.
          </p>
        </div>
      </section>

      {/* Community Callout Banner */}
      <section className="bg-primary text-primary-foreground py-6">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-lg font-bold uppercase tracking-wide">
            Proudly serving South Florida since 1989 — Fort Lauderdale & Wilton Manors
          </p>
        </div>
      </section>

      {/* Sponsorships */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
              OUR <span className="text-primary">SPONSORSHIPS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              We believe in giving back to the community that has supported us for over three decades. These are the organizations and causes we proudly stand behind.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPONSORSHIPS.map((s) => (
              <div key={s.name} className="border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <div className="text-3xl mb-3">{s.icon}</div>
                <div className="text-xs font-bold tracking-widest text-primary uppercase mb-2">{s.category}</div>
                <h3 className="text-lg font-bold uppercase mb-3">{s.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Involvement */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-6">
                ROOTED IN <span className="text-primary">SOUTH FLORIDA</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Vertical Automotive was founded in 1989 with a simple mission: provide honest, high-quality auto repair to South Florida drivers. Over 36 years, that mission has expanded to include active participation in the communities we serve.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We employ local technicians, partner with local businesses, and invest in local organizations. When you choose Vertical Automotive, your dollars stay in the community.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our two locations — in Wilton Manors and Fort Lauderdale — are strategically placed to serve drivers across Broward County, from Oakland Park and Pompano Beach to Victoria Park and Las Olas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacts">
                  <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide">
                    <Phone className="w-4 h-4 mr-2" /> Contact Us
                  </Button>
                </Link>
                <Link href="/press">
                  <Button variant="outline" className="font-bold uppercase tracking-wide border-foreground/30">
                    Press & Media
                  </Button>
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-wide mb-4">Our Journey</h3>
              {MILESTONES.map((m, i) => (
                <div key={m.year} className="flex gap-4 items-start">
                  <div className="w-16 shrink-0 text-right">
                    <span className="text-primary font-black text-sm">{m.year}</span>
                  </div>
                  <div className="w-px bg-border self-stretch mx-2" />
                  <p className="text-sm text-muted-foreground pt-0.5">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner With Us CTA */}
      <section className="py-16 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Users className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight mb-4">
            PARTNER WITH <span className="text-primary">US</span>
          </h2>
          <p className="text-secondary-foreground/80 max-w-2xl mx-auto mb-8 leading-relaxed">
            Are you a local organization, school, sports team, or business looking for a community partner? We'd love to hear from you. We offer sponsorships, cross-promotion, and referral partnerships to organizations that share our values.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {LOCATIONS.map((loc) => (
              <a key={loc.name} href={`tel:${loc.phoneRaw}`} className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors">
                <Phone className="w-4 h-4" />
                {loc.name} — {loc.phone}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 border-t border-border">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-8">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="flex gap-4">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                <div>
                  <div className="font-bold uppercase tracking-wide mb-1">{loc.name}</div>
                  <div className="text-sm text-muted-foreground">{loc.fullAddress}</div>
                  <a href={`tel:${loc.phoneRaw}`} className="text-sm text-primary font-bold hover:underline">{loc.phone}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
