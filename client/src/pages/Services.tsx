/**
 * Services Index Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography, grid layout
 */
import { SERVICES, VEHICLE_TYPES, COMPANY, SERVICES_PAGE_EXTRA } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title="Auto Repair Services - Vertical Automotive | Fort Lauderdale, FL"
        description="Complete auto repair services in Fort Lauderdale: brakes, transmission, A/C, oil change, diagnostics, steering, EV & hybrid service. ASE-certified technicians. 3-year warranty."
      />
      <Navigation />

      <PageHero
        title="OUR SERVICES"
        subtitle={SERVICES_PAGE_EXTRA.subtitle}
      />

      {/* Vehicle Types */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
            {SERVICES_PAGE_EXTRA.heading}
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {VEHICLE_TYPES.map((vt) => (
              <Link
                key={vt.slug}
                href={`/services/${vt.slug}`}
                className="group relative aspect-[4/3] overflow-hidden bg-card hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={vt.image}
                  alt={vt.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-2xl font-black text-secondary-foreground">
                    {vt.title}
                  </h3>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
            COMPLETE <span className="text-primary">AUTO CARE</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`}>
                <Card className="p-8 bg-card border-2 border-border hover:border-primary hover:shadow-xl transition-all duration-300 cursor-pointer h-full group">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-4">
                {SERVICES_PAGE_EXTRA.bottomSection.title.toUpperCase()}
              </h2>
              <div className="h-1 w-24 bg-primary mb-8" />
              <p className="text-muted-foreground leading-relaxed">
                {SERVICES_PAGE_EXTRA.bottomSection.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SERVICES_PAGE_EXTRA.bottomSection.list.map((item) => (
                <div key={item} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            READY TO SCHEDULE?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Book your appointment online or call us today
          </p>
          <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 py-6"
            >
              SCHEDULE APPOINTMENT
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
