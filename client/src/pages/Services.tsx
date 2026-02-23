/**
 * Services Index Page — Industrial Brutalism Design
 * Blue accents, diagonal elements, bold typography
 */
import { SERVICES, VEHICLE_TYPES, SERVICES_PAGE_EXTRA } from "@/lib/data";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <PageHero
        title="OUR SERVICES"
        breadcrumb={[
          { label: "HOME", href: "/" },
          { label: "OUR SERVICES" },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80"
      />

      {/* Vehicle Types Section */}
      <section className="bg-background py-16">
        <div className="container">
          <p className="text-center text-muted-foreground font-display tracking-wider mb-2 text-sm">
            {SERVICES_PAGE_EXTRA.subtitle}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-black text-center tracking-wider mb-4">
            {SERVICES_PAGE_EXTRA.heading}
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {VEHICLE_TYPES.map((vt) => (
              <Link
                key={vt.slug}
                href={`/services/${vt.slug}`}
                className="group relative overflow-hidden aspect-[4/3] border border-border hover:border-primary transition-all duration-500"
              >
                <img
                  src={vt.image}
                  alt={vt.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="font-display text-xl md:text-2xl font-black text-white tracking-wider">
                    {vt.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group border border-border p-6 text-center hover:border-primary hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-display text-sm font-bold tracking-wider uppercase leading-tight mb-2 group-hover:text-primary transition-colors">
                  {service.shortTitle}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Services List */}
      <section className="bg-secondary text-secondary-foreground py-16 diagonal-top">
        <div className="container max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-black tracking-wider mb-4 text-center">
            {SERVICES_PAGE_EXTRA.bottomSection.title.toUpperCase()}
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-8" />
          <p className="text-secondary-foreground/70 mb-8 text-center leading-relaxed">
            {SERVICES_PAGE_EXTRA.bottomSection.description}
          </p>
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-3">
            {SERVICES_PAGE_EXTRA.bottomSection.list.map((item, i) => (
              <div key={i} className="flex items-center space-x-3 py-2 border-b border-border">
                <span className="text-primary text-lg">✓</span>
                <span className="text-secondary-foreground/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
