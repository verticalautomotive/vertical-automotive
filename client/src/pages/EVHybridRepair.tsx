/**
 * Hybrid & EV Repair in Fort Lauderdale
 * Goal: Capture EV niche without over-focusing entire SEO
 * Covers: Tesla + hybrid, charging, batteries, diagnostics, FAQs, cost comparisons
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Zap, DollarSign, Shield, CheckCircle, MapPin, ChevronDown } from "lucide-react";
import { COMPANY, LOCATIONS } from "@/lib/data";
import { useState } from "react";

const SERVICES = [
  { name: "High-Voltage Battery Diagnostics", desc: "Complete battery pack health assessment using manufacturer-level diagnostic tools. State of health (SOH) testing, cell balance analysis, and thermal management inspection." },
  { name: "Charging System Repair", desc: "On-board charger (OBC) diagnostics and repair, charge port inspection, and Level 1/Level 2 charging troubleshooting. We diagnose charging errors before recommending component replacement." },
  { name: "Regenerative Brake Service", desc: "Hybrid and EV brake systems use regenerative braking that reduces pad wear — but brake fluid still degrades. We service the hydraulic brake backup system and inspect regenerative components." },
  { name: "12V Auxiliary Battery Replacement", desc: "Every EV and hybrid has a small 12V battery that powers accessories and enables the main system to start. This battery fails independently of the main pack — typically every 3–5 years." },
  { name: "Thermal Management System", desc: "Battery cooling loops, coolant flush, and thermal management module diagnostics. Critical in South Florida's heat — battery overheating reduces range and accelerates degradation." },
  { name: "Inverter & Motor Diagnostics", desc: "Electric motor and inverter diagnostics using OEM-level scan tools. Fault code analysis, performance testing, and repair recommendations." },
  { name: "Software & Firmware Updates", desc: "ECU and battery management system (BMS) software updates. Keeping your EV's software current improves efficiency, range, and charging performance." },
  { name: "Hybrid Transmission Service", desc: "CVT and e-CVT fluid service for Toyota, Honda, and Ford hybrids. Specialized fluid and procedures for hybrid-specific transmission designs." },
];

const VEHICLES = [
  { brand: "Tesla", models: "Model 3, Model Y, Model S, Model X, Cybertruck" },
  { brand: "Toyota", models: "Prius, RAV4 Hybrid, Camry Hybrid, Highlander Hybrid, Sienna Hybrid" },
  { brand: "Honda", models: "Accord Hybrid, CR-V Hybrid, Insight" },
  { brand: "Ford", models: "Mustang Mach-E, F-150 Lightning, Escape Hybrid, Fusion Hybrid" },
  { brand: "Chevrolet", models: "Bolt EV, Bolt EUV, Volt" },
  { brand: "BMW", models: "i3, i4, iX, 330e, 530e, X5 xDrive45e" },
  { brand: "Mercedes", models: "EQS, EQE, C350e, GLE 350e" },
  { brand: "Hyundai/Kia", models: "Ioniq 5, Ioniq 6, EV6, EV9, Tucson Hybrid, Sorento Hybrid" },
  { brand: "Nissan", models: "Leaf, Ariya" },
  { brand: "Rivian", models: "R1T, R1S" },
];

const FAQS = [
  {
    q: "Can an independent shop work on my Tesla?",
    a: "Yes. Tesla vehicles use standard automotive components alongside proprietary systems. At Vertical Automotive, we use OBD-II diagnostic tools compatible with Tesla's systems for most repairs and maintenance. For high-voltage battery pack replacement, we refer to Tesla-certified facilities, but the vast majority of Tesla service — brakes, tires, suspension, A/C, 12V battery, software diagnostics — can be performed at our shop at 30–50% below Tesla Service Center pricing.",
  },
  {
    q: "How much does EV repair cost compared to a dealership?",
    a: "For most EV maintenance and repair, independent shops charge 30–50% less than dealerships. A Tesla brake fluid flush at a Tesla Service Center costs $130–$180. At Vertical Automotive, it's $89–$120. Tire rotation at Tesla: $70–$100. At our shop: $35–$50. The savings add up significantly over the life of your vehicle.",
  },
  {
    q: "Does my EV warranty require dealership service?",
    a: "No. Under the Magnuson-Moss Warranty Act, manufacturers cannot void your warranty simply because you used an independent shop for maintenance — as long as the work meets manufacturer specifications and proper parts are used. We document all services to protect your warranty.",
  },
  {
    q: "How often does a hybrid or EV need service in South Florida?",
    a: "EVs require less frequent service than gas vehicles — no oil changes, fewer brake replacements due to regenerative braking. However, South Florida's heat requires more frequent attention to: battery cooling system (every 2 years), brake fluid (every 2 years), 12V auxiliary battery (every 3–5 years), and cabin air filter (annually). Tire rotation every 6,000–7,500 miles due to EV weight.",
  },
  {
    q: "What if my EV's main battery pack needs replacement?",
    a: "Main battery pack replacement is a major repair typically costing $8,000–$20,000+ depending on the vehicle. We perform diagnostics to determine if the full pack needs replacement or if individual modules can be serviced. In many cases, a battery diagnostic reveals software or thermal management issues that can be resolved without pack replacement.",
  },
  {
    q: "Can you service hybrid vehicles from all manufacturers?",
    a: "Yes. We service Toyota, Honda, Ford, Hyundai, Kia, BMW, Mercedes, and other hybrid platforms. Each manufacturer uses different hybrid system architectures — we have the diagnostic tools and training for all major hybrid platforms sold in the US.",
  },
];

export default function EVHybridRepair() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Hybrid & EV Repair in Fort Lauderdale | Vertical Automotive"
        description="Expert hybrid and EV repair in Fort Lauderdale. Tesla, Toyota Prius, Honda Accord Hybrid, BMW i-series, and all major EV/hybrid platforms. ASE-certified technicians, 36-month warranty, 30–50% below dealership pricing."
        canonical="https://verticalautomotive.com/ev-hybrid-repair-fort-lauderdale"
        keywords="EV repair Fort Lauderdale, hybrid repair Fort Lauderdale, Tesla repair Fort Lauderdale, Toyota Prius repair Fort Lauderdale, electric vehicle service Fort Lauderdale, hybrid car service Broward County"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
            <Zap className="w-3 h-3" /> FORT LAUDERDALE EV & HYBRID SPECIALISTS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
            HYBRID & EV REPAIR<br />
            <span className="text-primary">FORT LAUDERDALE</span>
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl leading-relaxed">
            ASE-certified EV and hybrid service at 707 NE 11th Street, Fort Lauderdale. All major platforms — Tesla, Toyota, Honda, BMW, Hyundai, and more. 30–50% below dealership pricing with a 36-month warranty.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide px-8">
                Schedule EV Service
              </Button>
            </a>
            <a href={`tel:${LOCATIONS[1].phoneRaw}`}>
              <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary-foreground/30 text-secondary-foreground">
                Call (645) 216-2266
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Cost Comparison */}
      <section className="py-12 bg-primary/10 border-y border-primary/20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-black uppercase tracking-wide">Save 30–50% vs. Dealership EV Service</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { service: "Brake Fluid Flush", dealer: "$130–$180", us: "$89–$120" },
              { service: "Tire Rotation", dealer: "$70–$100", us: "$35–$50" },
              { service: "Cabin Air Filter", dealer: "$80–$120", us: "$45–$65" },
              { service: "12V Battery Replacement", dealer: "$200–$350", us: "$120–$200" },
            ].map((row) => (
              <div key={row.service} className="bg-card border border-border p-4">
                <div className="text-sm font-bold mb-3">{row.service}</div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Dealership</span>
                  <span className="text-red-500 font-bold">{row.dealer}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Vertical Automotive</span>
                  <span className="text-primary font-bold">{row.us}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            EV & HYBRID <span className="text-primary">SERVICES</span>
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((s) => (
              <div key={s.name} className="border border-border bg-card p-5 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-bold mb-2">{s.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicles Serviced */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            VEHICLES <span className="text-primary">WE SERVICE</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VEHICLES.map((v) => (
              <div key={v.brand} className="border border-border bg-card p-4">
                <div className="font-black uppercase tracking-wide text-primary mb-1">{v.brand}</div>
                <div className="text-sm text-muted-foreground">{v.models}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-8">
            FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border bg-card">
                <button
                  className="w-full text-left p-5 flex items-start justify-between gap-4 hover:bg-muted/30 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-bold text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            SCHEDULE YOUR <span className="text-primary">EV SERVICE</span>
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            Fort Lauderdale's independent EV and hybrid specialists. 36-month warranty. 30–50% below dealership pricing. Open Monday–Friday 8 AM–5 PM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide px-8">
                Book Online
              </Button>
            </a>
            <a href={`tel:${LOCATIONS[1].phoneRaw}`}>
              <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary-foreground/30 text-secondary-foreground">
                Call (645) 216-2266
              </Button>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mt-8">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-secondary-foreground/70">{loc.name} — </span>
                <a href={`tel:${loc.phoneRaw}`} className="text-primary font-bold hover:underline">{loc.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
