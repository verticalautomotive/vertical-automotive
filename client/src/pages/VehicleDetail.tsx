/**
 * VehicleDetail — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Dynamic page for vehicle-type service pages
 */
import { VEHICLE_TYPES, SERVICES, COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";
import { ArrowRight } from "lucide-react";

export default function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const vehicle = VEHICLE_TYPES.find((v) => v.slug === slug);

  if (!vehicle) {
    return <NotFound />;
  }

  const vehicleServices = vehicle.services
    .map((sSlug) => SERVICES.find((s) => s.slug === sSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navigation />

      <PageHero
        title={vehicle.title.toUpperCase()}
        subtitle="Comprehensive Computer Diagnostic, Preventive Maintenance and Repair"
        backgroundImage={vehicle.image}
      />

      {/* Description */}
      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            WE SERVICE <span className="text-primary">{vehicle.title.toUpperCase()}</span> VEHICLES
          </h2>
          <div className="h-1 w-16 bg-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed text-lg mb-12">
            {vehicle.description}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="text-3xl font-black mb-4 text-center">
            AVAILABLE <span className="text-primary">SERVICES</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vehicleServices.map((service) =>
              service ? (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border-2 border-primary/20 p-6 hover:border-primary transition-all duration-300"
                >
                  <h3 className="text-lg font-bold mb-3 text-primary group-hover:text-secondary-foreground transition-colors">
                    {service.shortTitle}
                  </h3>
                  <p className="text-secondary-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-primary text-sm font-bold">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            SCHEDULE YOUR APPOINTMENT
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Trust Vertical Automotive for all your {vehicle.title.toLowerCase()} vehicle repair and maintenance needs. Our ASE-certified technicians are ready to help.
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-lg px-8 py-6"
            >
              BOOK NOW
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
