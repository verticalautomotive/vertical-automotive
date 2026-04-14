/**
 * Complete Guide to Auto Repair in Fort Lauderdale
 * Goal: Earn local blog/news backlinks with high-value informational content
 * Covers: choosing a mechanic, reading estimates, avoiding scams, South FL maintenance
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle, AlertTriangle, Shield, Wrench, ThumbsUp, MapPin } from "lucide-react";
import { COMPANY, LOCATIONS } from "@/lib/data";

export default function FortLauderdaleGuide() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Complete Guide to Auto Repair in Fort Lauderdale | Vertical Automotive"
        description="Everything Fort Lauderdale drivers need to know about auto repair: how to choose a mechanic, read estimates, avoid scams, and maintain your car in South Florida's heat. From Vertical Automotive — 36 years of local expertise."
        canonical="https://verticalautomotive.com/fort-lauderdale-auto-repair-guide"
        keywords="auto repair Fort Lauderdale guide, how to choose mechanic Fort Lauderdale, car repair scams Florida, South Florida car maintenance, Fort Lauderdale mechanic tips, auto repair estimate guide"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
            <Wrench className="w-3 h-3" /> FREE GUIDE — FORT LAUDERDALE DRIVERS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
            COMPLETE GUIDE TO<br />
            <span className="text-primary">AUTO REPAIR</span><br />
            IN FORT LAUDERDALE
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl leading-relaxed">
            36 years of experience condensed into one guide. Learn how to choose the right mechanic, understand your repair estimate, avoid common scams, and keep your car running in South Florida's extreme heat.
          </p>
          <p className="text-sm text-secondary-foreground/60 mt-4">By Vertical Automotive — Serving Fort Lauderdale & Wilton Manors since 1989</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-10 border-b border-border bg-muted/20">
        <div className="container max-w-4xl mx-auto px-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">In This Guide</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              ["1", "How to Choose a Mechanic in Fort Lauderdale"],
              ["2", "How to Read a Repair Estimate"],
              ["3", "Common Auto Repair Scams to Avoid"],
              ["4", "Maintenance Tips for South Florida's Climate"],
              ["5", "When to Get a Second Opinion"],
              ["6", "Understanding Warranties on Repairs"],
            ].map(([num, title]) => (
              <div key={num} className="flex items-center gap-3 text-sm">
                <span className="w-6 h-6 bg-primary text-primary-foreground font-black text-xs flex items-center justify-center shrink-0">{num}</span>
                <span className="text-foreground/80">{title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="py-16 sm:py-20">
        <div className="container max-w-4xl mx-auto px-4 space-y-16">

          {/* Section 1 */}
          <section id="choose-mechanic">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              1. HOW TO CHOOSE A MECHANIC IN FORT LAUDERDALE
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Fort Lauderdale has hundreds of auto repair shops — from national chains to independent specialists. Choosing the right one can save you thousands of dollars and prevent unnecessary repairs. Here's what to look for:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {[
                { title: "ASE Certification", desc: "Look for shops with ASE-certified technicians. This certification requires passing rigorous exams and demonstrates professional competence. Ask to see certifications — legitimate shops display them proudly." },
                { title: "Warranty on Repairs", desc: "Any reputable shop should offer at least a 12-month / 12,000-mile warranty. Vertical Automotive offers 36-month / 36,000-mile — the strongest in Broward County. Short or no warranty is a red flag." },
                { title: "Diagnostic-First Approach", desc: "A good mechanic diagnoses before recommending repairs. If a shop quotes major work without running diagnostics first, walk away. Proper diagnosis prevents unnecessary repairs and saves money." },
                { title: "Transparent Estimates", desc: "You should receive a written estimate before any work begins. The estimate should itemize parts and labor separately. Verbal-only estimates leave you vulnerable to surprise charges." },
                { title: "Reviews and Reputation", desc: "Check Google Reviews, Yelp, and the Better Business Bureau. Look for consistent patterns — not just the star rating. A shop with 4.9 stars and 500+ reviews over many years is more reliable than one with 5 stars and 20 reviews." },
                { title: "Specialization", desc: "If you drive a European, Asian, or electric vehicle, choose a shop with documented experience in your vehicle type. Generic shops may lack the specialized tools and knowledge for complex vehicles." },
              ].map((item) => (
                <div key={item.title} className="border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2 */}
          <section id="read-estimate">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              2. HOW TO READ A REPAIR ESTIMATE
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
              <p>
                A repair estimate can be confusing — especially if you're not familiar with automotive terminology. Here's how to read one like a pro:
              </p>
            </div>
            <div className="space-y-4">
              {[
                { label: "Parts vs. Labor", desc: "Every estimate should separate parts costs from labor costs. Parts are the physical components being replaced. Labor is the time it takes to install them. If these are bundled together without breakdown, ask for itemization." },
                { label: "OEM vs. Aftermarket Parts", desc: "OEM (Original Equipment Manufacturer) parts are made by your car's manufacturer. Aftermarket parts are made by third parties. OEM is generally more reliable but costs more. Ask which type is being used and why." },
                { label: "Labor Hours", desc: "Labor is typically charged by the hour at a set shop rate. The number of hours is based on industry standard time guides. If the hours seem excessive for a simple job, ask for clarification." },
                { label: "Diagnostic Fees", desc: "Most shops charge a diagnostic fee to identify the problem. This is normal and reasonable — it covers the technician's time and equipment use. At Vertical Automotive, diagnostic fees are applied toward your repair if you proceed." },
                { label: "Estimate vs. Final Invoice", desc: "An estimate is not a final price — but it should be close. Shops are required to notify you if the actual cost will exceed the estimate by more than 10% in Florida. Always authorize additional work before it begins." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 border-b border-border pb-4">
                  <span className="text-primary font-black text-lg shrink-0 w-6">{i + 1}.</span>
                  <div>
                    <h3 className="font-bold mb-1">{item.label}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3 */}
          <section id="avoid-scams">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              3. COMMON AUTO REPAIR SCAMS TO AVOID
            </h2>
            <div className="bg-amber-500/10 border border-amber-500/30 p-4 mb-6 flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground">
                These are real scams reported by Fort Lauderdale and Broward County drivers. Knowing them can save you hundreds — or thousands — of dollars.
              </p>
            </div>
            <div className="space-y-5">
              {[
                { scam: "The Unnecessary Flush", desc: "Some shops recommend transmission flushes, coolant flushes, or fuel system flushes on every visit regardless of actual need. These services are legitimate when needed — but they're often recommended when the fluid is perfectly fine. Always ask to see the fluid and compare it to the manufacturer's service interval." },
                { scam: "Bait-and-Switch Pricing", desc: "A shop advertises a low price for an oil change or brake pad replacement, then adds 'required' services once your car is on the lift. Get the full price in writing before authorizing any work." },
                { scam: "Parts You Can't See", desc: "Some shops claim to replace parts that are difficult to verify — like internal engine components or hidden sensors. Ask to see the old part when it's removed. Reputable shops keep removed parts for you to inspect." },
                { scam: "Fake Urgency", desc: "\"You can't drive this car — it's dangerous\" is a pressure tactic used to force immediate, expensive repairs. If you're not experiencing symptoms and the car drove in fine, get a second opinion before authorizing major work." },
                { scam: "Inflated Labor Hours", desc: "Some shops charge more labor hours than the job actually requires. Standard repair times are published in industry guides. If a shop quotes 8 hours for a job that typically takes 3, ask for justification." },
                { scam: "Aftermarket Parts at OEM Prices", desc: "Charging OEM prices while installing cheaper aftermarket parts is fraud. Always ask which brand of parts is being used and verify it on your invoice." },
              ].map((item, i) => (
                <div key={i} className="border border-border bg-card p-5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold mb-2">"{item.scam}"</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4 */}
          <section id="south-florida-maintenance">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              4. MAINTENANCE TIPS FOR SOUTH FLORIDA'S CLIMATE
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
              <p>
                South Florida's heat, humidity, and salt air create unique wear patterns that don't apply in other parts of the country. Here's what Fort Lauderdale drivers need to know:
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: "🔋", title: "Battery Life", desc: "Heat kills batteries faster than cold. Florida batteries typically last 3–4 years vs. 5–6 years in moderate climates. Test your battery annually — don't wait for a no-start." },
                { icon: "❄️", title: "A/C System", desc: "Your A/C runs nearly year-round in South Florida. Annual A/C service — including refrigerant check and cabin filter replacement — prevents costly compressor failures." },
                { icon: "🌡️", title: "Transmission Fluid", desc: "Stop-and-go traffic on I-95 and Federal Highway generates heat that degrades transmission fluid faster. Service every 30,000–45,000 miles instead of the national average of 60,000." },
                { icon: "🛞", title: "Tire Pressure", desc: "Florida heat causes tire pressure to fluctuate significantly. Check pressure monthly — underinflated tires wear faster and reduce fuel economy. Target 2–3 PSI above minimum in summer." },
                { icon: "🌊", title: "Brake Corrosion", desc: "Coastal humidity and salt air accelerate brake rotor corrosion. If your car sits for more than a week, surface rust is normal — but deep pitting requires inspection." },
                { icon: "🔧", title: "Coolant System", desc: "Overheating is a leading cause of engine damage in South Florida. Flush coolant every 2 years or 30,000 miles. Check hoses and the radiator cap annually." },
              ].map((item) => (
                <div key={item.title} className="border border-border bg-card p-5">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 & 6 */}
          <section id="second-opinion">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              5. WHEN TO GET A SECOND OPINION
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-6">
              <p>Getting a second opinion is always your right — and sometimes your best financial decision. Consider a second opinion when:</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                "The repair estimate exceeds $500 and you have no prior relationship with the shop",
                "The shop recommends engine or transmission replacement without showing you diagnostic evidence",
                "You're told the car is unsafe to drive but you experienced no symptoms",
                "The shop cannot explain in plain language what is wrong and why it needs to be fixed",
                "You feel pressured to authorize work immediately without time to think",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl font-black uppercase tracking-tight mb-6 border-l-4 border-primary pl-4">
              6. UNDERSTANDING WARRANTIES ON REPAIRS
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Florida law requires repair shops to honor their written warranties. Here's what to know:
              </p>
              <p>
                A standard warranty covers parts and labor for a defined period. If a repaired component fails within the warranty period, the shop must fix it at no charge. Always get the warranty terms in writing on your invoice.
              </p>
              <p>
                Vertical Automotive offers a <strong className="text-foreground">36-month / 36,000-mile warranty</strong> on all repairs — the strongest warranty in Broward County. This warranty is transferable to subsequent owners, adding resale value to your vehicle.
              </p>
            </div>
          </section>

        </div>
      </article>

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            READY FOR AN <span className="text-primary">HONEST REPAIR?</span>
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            Vertical Automotive has served Fort Lauderdale and Wilton Manors drivers since 1989. ASE-certified, 36-month warranty, diagnostic-first approach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground font-bold uppercase tracking-wide px-8">
                Schedule Appointment
              </Button>
            </a>
            <Link href="/services">
              <Button variant="outline" className="font-bold uppercase tracking-wide border-secondary-foreground/30 text-secondary-foreground">
                View All Services
              </Button>
            </Link>
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
