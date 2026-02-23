/**
 * VehicleDetail — Dynamic page for vehicle-type service pages
 * Matches Tesla, Asian, European, Domestic pages on verticalautomotive.com
 * Hero, description, service cards grid
 */
import { VEHICLE_TYPES, SERVICES, COMPANY } from "@/lib/data";
import { useParams } from "wouter";
import { Link } from "wouter";
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

  // Get the services associated with this vehicle type
  const vehicleServices = vehicle.services
    .map((sSlug) => SERVICES.find((s) => s.slug === sSlug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
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
      <section className="bg-white text-black py-16">
        <div className="container max-w-4xl">
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider mb-6">
            WE SERVICE {vehicle.title} VEHICLES
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-12">
            {vehicle.description}
          </p>
        </div>
      </section>

      {/* Service Cards */}
      <section className="bg-black py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vehicleServices.map((service) =>
              service ? (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group bg-white/5 border border-white/10 p-6 hover:border-green-400/50 transition-all duration-300"
                >
                  <h3 className="font-display text-lg font-bold tracking-wider mb-3 text-green-400 group-hover:text-white transition-colors">
                    {service.shortTitle}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white text-black py-16">
        <div className="container text-center max-w-3xl">
          <h2 className="font-display text-3xl font-black tracking-wider mb-4">
            SCHEDULE YOUR APPOINTMENT
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Trust Vertical Automotive for all your {vehicle.title.toLowerCase()} vehicle repair and maintenance needs. Our ASE-certified technicians are ready to help.
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white font-display font-bold uppercase tracking-wider px-10 py-4 text-sm hover:bg-red-700 transition-colors"
          >
            BOOK NOW
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
