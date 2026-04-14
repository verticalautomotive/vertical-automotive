/**
 * Press & Media Page
 * Goal: Make it easy for media to feature and link to Vertical Automotive
 * Includes company history, milestones, logo download, media contact, story angles
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Download, Mail, Phone, ExternalLink, Newspaper, Award, Clock, Users } from "lucide-react";
import { COMPANY, LOCATIONS } from "@/lib/data";

const STORY_ANGLES = [
  {
    headline: "36 Years and Still Going Strong: The Independent Shop That Outlasted the Chains",
    angle:
      "Founded in 1989, Vertical Automotive has survived economic downturns, the rise of dealership service centers, and the EV revolution — by staying honest and earning customer loyalty one repair at a time.",
    tags: ["Local Business", "Small Business", "Longevity"],
  },
  {
    headline: "The Fort Lauderdale Shop Teaching Customers to Avoid Repair Scams",
    angle:
      "Vertical Automotive publishes free guides on how to read repair estimates, spot common scams, and understand what your car actually needs — building trust that translates to long-term customer relationships.",
    tags: ["Consumer Protection", "Auto Repair", "Education"],
  },
  {
    headline: "South Florida's Heat Is Destroying Cars — Here's What One Shop Is Doing About It",
    angle:
      "Extreme heat accelerates battery degradation, AC failure, and transmission wear. Vertical Automotive's technicians explain the unique maintenance challenges of driving in South Florida and how to protect your vehicle.",
    tags: ["Climate", "Auto Maintenance", "South Florida"],
  },
  {
    headline: "EV Repair Without the Dealership Price Tag: Fort Lauderdale's Independent EV Specialists",
    angle:
      "As Tesla and hybrid ownership grows in South Florida, Vertical Automotive offers manufacturer-level diagnostics and repair at 30–50% below dealership pricing — making EV ownership more accessible.",
    tags: ["Electric Vehicles", "Tesla", "Cost Savings"],
  },
  {
    headline: "From 1989 to Today: How One Family-Run Shop Became Fort Lauderdale's Most Trusted Mechanic",
    angle:
      "A behind-the-scenes look at how Vertical Automotive built a reputation for honesty, quality, and community involvement over 36 years — and why customers drive from across Broward County for their service.",
    tags: ["Human Interest", "Local Business", "Community"],
  },
];

const FACTS = [
  { label: "Founded", value: "1989" },
  { label: "Years in Business", value: "36+" },
  { label: "Vehicles Serviced", value: "54,000+" },
  { label: "Locations", value: "2 (Fort Lauderdale & Wilton Manors)" },
  { label: "Certifications", value: "ASE-Certified Technicians" },
  { label: "Warranty", value: "36-Month / 36,000-Mile on All Repairs" },
  { label: "Specialties", value: "Tesla, European, Asian, Domestic, Hybrid/EV" },
  { label: "Service Area", value: "Broward County, South Florida" },
];

export default function Press() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Press & Media | Vertical Automotive"
        description="Press and media resources for Vertical Automotive — Fort Lauderdale and Wilton Manors' most trusted auto repair shop since 1989. Company history, story angles, logo downloads, and media contact."
        canonical="https://verticalautomotive.com/press"
        keywords="Vertical Automotive press, Fort Lauderdale auto repair media, Wilton Manors mechanic press kit, auto repair shop story, South Florida auto repair news"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
            <Newspaper className="w-3 h-3" /> PRESS & MEDIA
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
            PRESS &<br />
            <span className="text-primary">MEDIA KIT</span>
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl leading-relaxed">
            Resources for journalists, bloggers, and media professionals covering South Florida's automotive industry, small business community, or consumer topics.
          </p>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            COMPANY <span className="text-primary">FACTS</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {FACTS.map((f) => (
              <div key={f.label} className="border border-border bg-card p-4">
                <div className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">{f.label}</div>
                <div className="text-sm font-bold text-foreground">{f.value}</div>
              </div>
            ))}
          </div>

          {/* Company History */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                COMPANY <span className="text-primary">HISTORY</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Vertical Automotive was founded in 1989 in South Florida with a straightforward mission: provide honest, high-quality auto repair to local drivers. What began as a single-location independent shop has grown into a two-location operation serving thousands of vehicles annually across Broward County.
                </p>
                <p>
                  Over 36 years, Vertical Automotive has built its reputation on three principles: accurate diagnostics before recommending repairs, transparent pricing, and standing behind every job with a 36-month / 36,000-mile warranty — the strongest in Broward County.
                </p>
                <p>
                  Today, Vertical Automotive's ASE-certified technicians service all makes and models, with specialized expertise in Tesla and electric vehicles, European imports (BMW, Mercedes, Audi, Porsche, Volvo), Asian vehicles (Toyota, Honda, Lexus, Subaru), and domestic vehicles. The shop serves drivers from Fort Lauderdale, Wilton Manors, Oakland Park, Pompano Beach, and across South Florida.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
                LOGO & <span className="text-primary">ASSETS</span>
              </h2>
              <div className="border border-border bg-card p-8 flex items-center justify-center mb-4">
                <img src={COMPANY.logoUrl} alt="Vertical Automotive Logo" className="max-h-24 w-auto" />
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                High-resolution logo available in SVG format. Please use on white or dark backgrounds only. Do not alter colors or proportions.
              </p>
              <a href={COMPANY.logoUrl} download="vertical-automotive-logo.svg">
                <Button className="w-full bg-primary text-primary-foreground font-bold uppercase tracking-wide">
                  <Download className="w-4 h-4 mr-2" /> Download Logo (SVG)
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Story Angles */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              STORY <span className="text-primary">ANGLES</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Looking for a story? Here are five angles our team is prepared to support with interviews, data, and on-site access.
            </p>
          </div>
          <div className="space-y-6">
            {STORY_ANGLES.map((s, i) => (
              <div key={i} className="border border-border bg-card p-6 hover:border-primary/50 transition-colors">
                <div className="flex flex-wrap gap-2 mb-3">
                  {s.tags.map((tag) => (
                    <span key={tag} className="text-xs font-bold tracking-widest text-primary uppercase bg-primary/10 px-2 py-0.5">{tag}</span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2">"{s.headline}"</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.angle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact */}
      <section className="py-16 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                MEDIA <span className="text-primary">CONTACT</span>
              </h2>
              <p className="text-secondary-foreground/80 mb-6 leading-relaxed">
                For press inquiries, interview requests, or media access, contact us directly. We respond to media requests within one business day.
              </p>
              <div className="space-y-4">
                {LOCATIONS.map((loc) => (
                  <div key={loc.name} className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-secondary-foreground/60">{loc.name}</div>
                      <a href={`tel:${loc.phoneRaw}`} className="font-bold text-primary hover:underline">{loc.phone}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                WHAT WE <span className="text-primary">OFFER</span>
              </h2>
              <ul className="space-y-3 text-secondary-foreground/80">
                {[
                  "On-site interviews and shop tours",
                  "Technical expert commentary on auto repair topics",
                  "South Florida driving and maintenance statistics",
                  "Customer testimonials and case studies",
                  "High-resolution photography of shop and vehicles",
                  "Written statements on industry topics",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary font-bold mt-0.5">→</span>
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
