/**
 * Ultimate Car Maintenance Guide for South Florida Drivers
 * Goal: Broad authority content covering ICE, European, EV/Hybrid — NOT Tesla-only
 * Covers: heat failures, AC, battery, all vehicle types
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Thermometer, Zap, Wrench, Shield, MapPin } from "lucide-react";
import { COMPANY, LOCATIONS } from "@/lib/data";

const HEAT_FAILURES = [
  { part: "Battery", risk: "CRITICAL", desc: "Heat is the #1 killer of car batteries in Florida. Extreme temperatures cause internal corrosion and electrolyte evaporation. Average battery life in South Florida: 3–4 years (vs. 5–6 nationally). Test annually." },
  { part: "A/C Compressor", risk: "HIGH", desc: "Running A/C year-round puts constant stress on the compressor. Refrigerant leaks, worn seals, and clutch failure are common. Annual A/C service prevents compressor replacement ($800–$1,500)." },
  { part: "Transmission", risk: "HIGH", desc: "Stop-and-go traffic on I-95 and US-1 generates heat that degrades transmission fluid. Service every 30,000–45,000 miles in Florida — more frequently than the national recommendation." },
  { part: "Coolant System", risk: "HIGH", desc: "Overheating causes head gasket failure and engine damage. Flush coolant every 2 years. Check hoses, thermostat, and radiator cap annually. Never ignore a temperature warning light." },
  { part: "Tires", risk: "MEDIUM", desc: "Heat causes tire pressure to rise 1 PSI for every 10°F increase. Overinflated tires wear unevenly and blow out more easily. Check pressure monthly — especially in summer." },
  { part: "Brake Rotors", risk: "MEDIUM", desc: "Coastal humidity causes surface rust on rotors when cars sit unused. This is normal but deep pitting requires replacement. Brake fluid also absorbs moisture faster in humid climates." },
  { part: "Rubber Components", risk: "MEDIUM", desc: "UV radiation and heat degrade rubber belts, hoses, and seals faster in Florida. Inspect serpentine belts, coolant hoses, and CV boots annually." },
  { part: "Paint & Exterior", risk: "LOW", desc: "UV exposure fades paint and causes oxidation. Regular waxing and parking in shade extends paint life. Salt air near the coast accelerates rust on exposed metal." },
];

const VEHICLE_SECTIONS = [
  {
    type: "ICE Vehicles (Gas & Diesel)",
    icon: "⛽",
    priority: "MAJORITY",
    items: [
      { interval: "Every 5,000–7,500 miles", service: "Oil & Filter Change", note: "Synthetic oil recommended for Florida heat" },
      { interval: "Every 15,000–30,000 miles", service: "Air Filter Replacement", note: "More frequent in dusty/urban environments" },
      { interval: "Every 30,000–45,000 miles", service: "Transmission Fluid Service", note: "More frequent than national average due to heat" },
      { interval: "Every 30,000 miles", service: "Spark Plug Inspection", note: "Iridium plugs last longer in high-heat environments" },
      { interval: "Every 2 years", service: "Coolant Flush", note: "Critical in Florida — prevents overheating" },
      { interval: "Annually", service: "Battery Test", note: "Florida heat kills batteries in 3–4 years" },
      { interval: "Annually", service: "A/C Service", note: "Refrigerant check + cabin filter replacement" },
      { interval: "Every 6 months", service: "Brake Inspection", note: "Humidity accelerates rotor corrosion" },
    ],
  },
  {
    type: "European Vehicles (BMW, Mercedes, Audi, Porsche, Volvo)",
    icon: "🇩🇪",
    priority: "SPECIALIST",
    items: [
      { interval: "Every 10,000 miles", service: "Oil Service (OEM-spec oil required)", note: "European engines require specific viscosity grades" },
      { interval: "Every 20,000 miles", service: "Microfilter (Cabin Air Filter)", note: "European vehicles often have two-stage filtration" },
      { interval: "Every 2 years", service: "Brake Fluid Flush", note: "European manufacturers specify biennial flush" },
      { interval: "Every 40,000 miles", service: "DSG/DCT Transmission Service", note: "Dual-clutch transmissions require specialized fluid" },
      { interval: "Every 4 years", service: "Coolant Flush", note: "European OAT coolant — do not mix with standard" },
      { interval: "As needed", service: "Software Updates (OBD)", note: "European vehicles receive frequent ECU updates" },
    ],
  },
  {
    type: "Asian Vehicles (Toyota, Honda, Lexus, Subaru, Nissan)",
    icon: "🇯🇵",
    priority: "COMMON",
    items: [
      { interval: "Every 5,000–7,500 miles", service: "Oil Change", note: "Toyota/Honda recommend 0W-20 synthetic" },
      { interval: "Every 30,000 miles", service: "CVT Fluid Service (if applicable)", note: "Nissan, Subaru, Honda CVTs require specialized fluid" },
      { interval: "Every 60,000 miles", service: "Timing Belt/Chain Inspection", note: "Timing belt failure = engine damage; don't skip" },
      { interval: "Every 30,000 miles", service: "Differential Fluid (AWD models)", note: "Subaru AWD requires front/rear differential service" },
      { interval: "Every 2 years", service: "Coolant Flush", note: "Toyota SLLC coolant — do not mix with standard" },
      { interval: "Annually", service: "Battery Test", note: "Toyota/Honda batteries typically last 4–5 years in FL" },
    ],
  },
  {
    type: "Hybrid & Electric Vehicles (Tesla, Prius, Leaf, Ioniq)",
    icon: "⚡",
    priority: "GROWING",
    items: [
      { interval: "Every 2 years", service: "Brake Fluid Flush", note: "Regenerative braking reduces pad wear but fluid still degrades" },
      { interval: "Every 2 years", service: "Coolant Flush (battery cooling loop)", note: "EV battery packs have dedicated cooling systems" },
      { interval: "Every 3–5 years", service: "12V Auxiliary Battery Replacement", note: "EVs have a small 12V battery that fails independently of the main pack" },
      { interval: "Annually", service: "Cabin Air Filter", note: "HEPA filters on Tesla/Ioniq require annual replacement" },
      { interval: "Every 12,000 miles", service: "Tire Rotation", note: "EVs are heavier — tires wear faster; rotate more frequently" },
      { interval: "As needed", service: "Software Updates", note: "Tesla and modern EVs receive OTA updates — keep current" },
    ],
  },
];

export default function SouthFloridaMaintenance() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Ultimate Car Maintenance Guide for South Florida Drivers | Vertical Automotive"
        description="Complete car maintenance guide for South Florida's heat and humidity. Covers all vehicle types: gas, European, Asian, hybrid, and EV. Heat-related failures, maintenance schedules, and expert tips from Vertical Automotive."
        canonical="https://verticalautomotive.com/car-maintenance-south-florida"
        keywords="South Florida car maintenance, car maintenance Florida heat, Fort Lauderdale car care, European car maintenance Florida, EV maintenance South Florida, hybrid car maintenance Florida, car battery Florida heat"
      />
      <Navigation />

      {/* Hero */}
      <section className="relative bg-secondary text-secondary-foreground py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        </div>
        <div className="container relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-3 py-1 text-xs font-bold tracking-widest uppercase mb-6">
            <Thermometer className="w-3 h-3" /> SOUTH FLORIDA DRIVER'S GUIDE
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6 leading-none">
            ULTIMATE CAR<br />
            <span className="text-primary">MAINTENANCE GUIDE</span><br />
            FOR SOUTH FLORIDA
          </h1>
          <p className="text-lg sm:text-xl text-secondary-foreground/80 max-w-2xl leading-relaxed">
            South Florida's extreme heat, humidity, and salt air create unique challenges for every vehicle — gas, European, Asian, hybrid, or EV. This guide covers what every local driver needs to know.
          </p>
        </div>
      </section>

      {/* Heat Failures */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              HOW FLORIDA HEAT <span className="text-primary">DESTROYS CARS</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              The average temperature in Fort Lauderdale is 77°F — but summer highs regularly exceed 95°F, and interior car temperatures can reach 140°F+. Here's what that does to your vehicle:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {HEAT_FAILURES.map((item) => (
              <div key={item.part} className="border border-border bg-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm uppercase tracking-wide">{item.part}</h3>
                  <span className={`text-xs font-bold px-2 py-0.5 ${
                    item.risk === "CRITICAL" ? "bg-red-500/20 text-red-500" :
                    item.risk === "HIGH" ? "bg-orange-500/20 text-orange-500" :
                    "bg-yellow-500/20 text-yellow-600"
                  }`}>{item.risk}</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle-Type Maintenance Schedules */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="mb-10">
            <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
              MAINTENANCE SCHEDULES <span className="text-primary">BY VEHICLE TYPE</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Standard maintenance intervals are designed for "normal" climates. In South Florida, many intervals should be shortened. Here's what we recommend for each vehicle type:
            </p>
          </div>
          <div className="space-y-10">
            {VEHICLE_SECTIONS.map((vs) => (
              <div key={vs.type} className="border border-border bg-card">
                <div className="bg-secondary text-secondary-foreground p-4 flex items-center gap-3">
                  <span className="text-2xl">{vs.icon}</span>
                  <div>
                    <h3 className="font-black uppercase tracking-wide">{vs.type}</h3>
                    <span className="text-xs text-primary font-bold tracking-widest">{vs.priority}</span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {vs.items.map((item) => (
                    <div key={item.service} className="p-4 grid sm:grid-cols-3 gap-2 text-sm">
                      <div className="text-primary font-bold">{item.interval}</div>
                      <div className="font-medium">{item.service}</div>
                      <div className="text-muted-foreground">{item.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* A/C Section */}
      <section className="py-16 sm:py-20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                A/C SYSTEMS IN <span className="text-primary">FLORIDA HEAT</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Your A/C system works harder in South Florida than anywhere else in the country. It runs nearly year-round, often at maximum capacity. This accelerates wear on every component.
                </p>
                <p>
                  The most common A/C failure in Florida is refrigerant leak — caused by UV degradation of rubber seals and O-rings. Annual refrigerant checks catch leaks before they cause compressor damage.
                </p>
                <p>
                  Compressor replacement costs $800–$1,500. Annual A/C service costs $89–$150. The math is clear.
                </p>
              </div>
              <Link href="/fort-lauderdale/ac-repair">
                <Button className="mt-6 bg-primary text-primary-foreground font-bold uppercase tracking-wide">
                  A/C Service in Fort Lauderdale →
                </Button>
              </Link>
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight mb-6">
                BATTERY LIFE IN <span className="text-primary">SOUTH FLORIDA</span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Cold weather gets the blame for battery failures, but heat is actually the bigger killer. High temperatures cause internal corrosion and accelerate electrolyte evaporation.
                </p>
                <p>
                  In Fort Lauderdale and Wilton Manors, we see batteries fail at 3–4 years regularly. If your battery is approaching 3 years old, test it annually — don't wait for a no-start.
                </p>
                <p>
                  This applies to both 12V lead-acid batteries in conventional vehicles and the auxiliary 12V batteries in EVs and hybrids.
                </p>
              </div>
              <Link href="/fort-lauderdale/battery-charging-systems">
                <Button className="mt-6 bg-primary text-primary-foreground font-bold uppercase tracking-wide">
                  Battery Service in Fort Lauderdale →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black uppercase tracking-tight mb-4">
            SCHEDULE YOUR <span className="text-primary">SOUTH FLORIDA CHECKUP</span>
          </h2>
          <p className="text-secondary-foreground/80 mb-8 max-w-xl mx-auto">
            Don't wait for a breakdown. Vertical Automotive's ASE-certified technicians service all makes and models — gas, European, Asian, hybrid, and EV — with a 36-month warranty on every repair.
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
