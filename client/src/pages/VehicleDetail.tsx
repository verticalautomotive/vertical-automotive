/**
 * VehicleDetail — Industrial Brutalism Design
 * Blue accents, diagonal elements, bold typography
 * Dynamic page for vehicle-type service pages
 */
import { VEHICLE_TYPES, SERVICES, COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";

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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <PageHero
        title={vehicle.title}
        breadcrumb={[
          { label: "HOME", href: "/" },
          { label: vehicle.title },
        ]}
        backgroundImage={vehicle.image}
      />

      {/* Description */}
      <section className="bg-background py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider mb-4">
            WE SERVICE <span className="text-primary">{vehicle.title}</span> VEHICLES
          </h2>
          <div className="h-1 w-16 bg-primary mb-6" />
          <p className="text-muted-foreground leading-relaxed text-lg mb-12">
            {vehicle.description}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-secondary text-secondary-foreground py-16 diagonal-top">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vehicleServices.map((service) =>
              service ? (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group border border-border p-6 hover:border-primary/50 transition-all duration-300 grid-pattern"
                >
                  <h3 className="font-display text-lg font-bold tracking-wider mb-3 text-primary group-hover:text-secondary-foreground transition-colors">
                    {service.shortTitle}
                  </h3>
                  <p className="text-secondary-foreground/60 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background py-16 diagonal-top">
        <div className="container text-center max-w-3xl">
          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            SCHEDULE YOUR <span className="text-primary">APPOINTMENT</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-6" />
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Trust Vertical Automotive for all your {vehicle.title.toLowerCase()} vehicle repair and maintenance needs. Our ASE-certified technicians are ready to help.
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider px-10">
              BOOK NOW
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
