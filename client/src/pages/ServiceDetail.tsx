/**
 * ServiceDetail — Dynamic page for individual service pages
 * Matches the service-type pages on verticalautomotive.com
 * Hero, intro content, when needed, benefits, contact section
 */
import { SERVICES, COMPANY } from "@/lib/data";
import { useParams } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";

const SERVICE_IMAGES: Record<string, string> = {
  "battery-cranking-charging-systems": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1400&q=80",
  "brake-system": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80",
  "transmission": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1400&q=80",
  "a-c-maintenance-repair": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1400&q=80",
  "oil-change-engine-service": "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1400&q=80",
  "complete-diagnostics": "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1400&q=80",
  "routine-preventive-maintenance": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1400&q=80",
  "steering-suspension": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80",
  "fuel-system": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1400&q=80",
  "hybrids-ev": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1400&q=80",
  "alignment-tire-rotation-balancing": "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1400&q=80",
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <PageHero
        title={service.title.toUpperCase()}
        breadcrumb={[
          { label: "HOME", href: "/" },
          { label: service.title.toUpperCase() },
        ]}
        backgroundImage={SERVICE_IMAGES[service.slug]}
      />

      {/* Content */}
      <section className="bg-white text-black py-16">
        <div className="container max-w-4xl">
          {/* Intro */}
          <p className="text-lg leading-relaxed text-gray-700 mb-12">
            {service.content.intro}
          </p>

          {/* When Needed */}
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider mb-4">
            WHEN DO I NEED THIS SERVICE?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12">
            {service.content.whenNeeded}
          </p>

          {/* Benefits */}
          <h2 className="font-display text-2xl md:text-3xl font-black tracking-wider mb-4">
            BENEFITS
          </h2>
          <p className="text-gray-700 leading-relaxed mb-12">
            {service.content.benefits}
          </p>

          {/* CTA */}
          <div className="bg-gray-50 border border-gray-200 p-8 text-center">
            <p className="font-display text-xl font-bold tracking-wider mb-4">
              VERTICAL AUTOMOTIVE IS HERE TO HELP!
            </p>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto leading-relaxed">
              Our auto repair shop offers superior car service with straightforward pricing and honest recommendations for all our valued customers. Contact us today for all your auto repair and car service needs!
            </p>
            <a
              href={COMPANY.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary text-white font-display font-bold uppercase tracking-wider px-8 py-3 text-sm hover:bg-red-700 transition-colors"
            >
              SCHEDULE YOUR APPOINTMENT
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
