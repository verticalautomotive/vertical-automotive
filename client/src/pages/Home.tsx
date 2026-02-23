/**
 * Home Page — Industrial Brutalism Design
 * Black/white/blue palette, diagonal dividers, bold typography
 * Hero with vehicle types, stats, services grid, offers carousel, coupons
 */
import { COMPANY, SERVICES, VEHICLE_TYPES, OFFERS, COUPONS } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight, ChevronLeft, Printer } from "lucide-react";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const [offerIndex, setOfferIndex] = useState(0);
  const [couponIndex, setCouponIndex] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);

  // Auto-advance offers
  useEffect(() => {
    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % OFFERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Stats animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setStatsVisible(true);
        });
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById("stats");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* ===== HERO ===== */}
      <section className="relative bg-secondary text-secondary-foreground overflow-hidden">
        <div className="container py-12 md:py-20">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-wider leading-none">
              <span className="text-muted-foreground">Fort Lauderdale</span>
            </h1>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black tracking-wider leading-none mt-2">
              Total Auto Care - 3 Years Warranty!
            </h2>
            <div className="h-1 w-32 bg-primary mx-auto mt-4" />
            <p className="text-primary italic mt-4 text-sm md:text-base">
              {COMPANY.testimonial}
            </p>
          </div>

          {/* Vehicle Type Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
            {VEHICLE_TYPES.map((vt) => (
              <Link
                key={vt.slug}
                href={`/services/${vt.slug}`}
                className="group relative overflow-hidden aspect-[16/10] border border-border hover:border-primary/50 transition-all duration-500"
              >
                <img
                  src={vt.image}
                  alt={vt.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 flex items-center space-x-2">
                  <span className="text-primary font-bold text-lg">&laquo;</span>
                  <h3 className="font-display text-xl md:text-3xl lg:text-4xl font-black tracking-wider text-white">
                    {vt.title}
                  </h3>
                  <span className="text-primary font-bold text-lg">&raquo;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section id="stats" className="relative">
        <div
          className="relative py-20 md:py-28"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1400&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="container relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: COMPANY.yearsExperience, label: "Years of Experience" },
                { value: COMPANY.vehiclesRepaired, label: "Vehicles\nRepaired" },
                { value: COMPANY.staff, label: "Staff" },
                { value: COMPANY.satisfaction, label: "Satisfied\nCustomers" },
              ].map((stat) => (
                <div key={stat.label} className={`transition-all duration-700 ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="font-display text-5xl md:text-7xl font-black text-white mono-number">
                    {stat.value}
                  </div>
                  <p className="text-white/80 text-sm md:text-base mt-2 whitespace-pre-line font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="bg-background text-foreground py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-wider">
              OUR <span className="text-primary">SERVICES</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border border-border p-6 text-center hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="font-display text-sm md:text-base font-bold tracking-wider uppercase leading-tight group-hover:text-primary transition-colors">
                  {service.shortTitle}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CURRENT OFFERS ===== */}
      <section className="bg-secondary text-secondary-foreground py-16 relative overflow-hidden diagonal-top">
        <div className="container relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-wider">
              CURRENT <span className="text-primary">OFFERS</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mt-4 mb-2" />
            <p className="text-muted-foreground font-display tracking-wider">
              SCHEDULE YOUR APPOINTMENT
            </p>
          </div>

          {/* Offers Carousel */}
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${offerIndex * 100}%)` }}
              >
                {OFFERS.map((offer, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="border border-border p-8 md:p-12 text-center grid-pattern">
                      <span className="inline-block bg-primary text-primary-foreground text-xs font-display font-bold tracking-widest px-4 py-1 mb-4">
                        {offer.badge}
                      </span>
                      <h3 className="font-display text-xl md:text-2xl font-bold mb-4 tracking-wider">
                        {offer.title}
                      </h3>
                      <div className="font-display text-4xl md:text-6xl font-black text-primary mb-4 mono-number">
                        {offer.value}
                      </div>
                      <p className="text-muted-foreground mb-8">{offer.description}</p>
                      <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider">
                          Schedule now
                        </Button>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setOfferIndex((prev) => (prev - 1 + OFFERS.length) % OFFERS.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setOfferIndex((prev) => (prev + 1) % OFFERS.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center space-x-2 mt-6">
              {OFFERS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setOfferIndex(i)}
                  className={`w-2.5 h-2.5 transition-colors ${i === offerIndex ? 'bg-primary' : 'bg-secondary-foreground/30'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== COUPONS ===== */}
      <section className="bg-background text-foreground py-16 diagonal-top">
        <div className="container">
          <div className="text-center mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-black tracking-wider">
              PRINTABLE <span className="text-primary">COUPONS</span>
            </h2>
            <div className="h-1 w-24 bg-primary mx-auto mt-4" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${couponIndex * 100}%)` }}
              >
                {COUPONS.map((coupon, i) => (
                  <div key={i} className="w-full flex-shrink-0 px-4">
                    <div className="border-2 border-dashed border-border p-8 md:p-12 text-center bg-muted">
                      <h3 className="font-display text-xl font-bold mb-2 tracking-wider">{coupon.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 whitespace-pre-line">{coupon.description}</p>
                      <p className="text-xs text-muted-foreground mb-6">{coupon.expiry}</p>
                      <button
                        onClick={() => window.print()}
                        className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground font-display font-bold uppercase tracking-wider px-6 py-3 text-sm hover:bg-secondary/80 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print this Coupon</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCouponIndex((prev) => (prev - 1 + COUPONS.length) % COUPONS.length)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-foreground/10 hover:bg-foreground/20 p-2 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCouponIndex((prev) => (prev + 1) % COUPONS.length)}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-foreground/10 hover:bg-foreground/20 p-2 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="flex justify-center space-x-2 mt-6">
              {COUPONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCouponIndex(i)}
                  className={`w-2.5 h-2.5 transition-colors ${i === couponIndex ? 'bg-primary' : 'bg-foreground/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const iconColor = "text-primary";
  const size = "w-12 h-12";

  const icons: Record<string, React.ReactNode> = {
    battery: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="14" width="32" height="22" rx="2" />
        <line x1="16" y1="10" x2="16" y2="14" />
        <line x1="32" y1="10" x2="32" y2="14" />
        <line x1="18" y1="22" x2="18" y2="30" />
        <line x1="14" y1="26" x2="22" y2="26" />
        <line x1="26" y1="26" x2="34" y2="26" />
      </svg>
    ),
    disc: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    cog: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
      </svg>
    ),
    snowflake: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="4" y1="24" x2="44" y2="24" />
        <line x1="10" y1="10" x2="38" y2="38" />
        <line x1="38" y1="10" x2="10" y2="38" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    ),
    droplet: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 4C24 4 10 20 10 30a14 14 0 0028 0C38 20 24 4 24 4z" />
      </svg>
    ),
    search: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="20" cy="20" r="14" />
        <line x1="30" y1="30" x2="42" y2="42" />
        <path d="M14 20h12M20 14v12" />
      </svg>
    ),
    wrench: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M36 8a12 12 0 00-16 16L8 36l4 4 12-12a12 12 0 0016-16l-6 6-4-4 6-6z" />
      </svg>
    ),
    gauge: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="28" r="16" />
        <path d="M24 28l-8-12" strokeWidth="3" />
        <line x1="24" y1="14" x2="24" y2="18" />
        <line x1="12" y1="28" x2="16" y2="28" />
        <line x1="36" y1="28" x2="32" y2="28" />
      </svg>
    ),
    fuel: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="10" width="22" height="30" rx="2" />
        <rect x="12" y="14" width="14" height="10" />
        <path d="M30 20h6a4 4 0 014 4v12a2 2 0 01-4 0v-8" />
        <circle cx="37" cy="14" r="3" />
      </svg>
    ),
    zap: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" fill="currentColor" opacity="0.2" />
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" />
      </svg>
    ),
    circle: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="6" />
        <line x1="24" y1="6" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="42" />
        <line x1="6" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="42" y2="24" />
      </svg>
    ),
  };

  return <>{icons[name] || icons.wrench}</>;
}
