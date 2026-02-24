/**
 * ServiceDetail — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Dynamic page for individual service pages
 * MOBILE: Compact spacing, smaller text, tighter grids
 */
import { SERVICES, COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useParams } from "wouter";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";
import { CheckCircle, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import ServiceIcon from "@/components/ServiceIcon";

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

  // Get related services (exclude current)
  const relatedServices = SERVICES.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={`${service.title} - Vertical Automotive | Fort Lauderdale Auto Repair`}
        description={`Professional ${service.title.toLowerCase()} service in Fort Lauderdale, FL. ${service.description} ASE-certified technicians. 3-year warranty. Call (954) 565-1518.`}
      />
      <Navigation />

      <PageHero
        title={service.title.toUpperCase()}
        subtitle="Comprehensive Computer Diagnostic, Preventive Maintenance and Repair"
        backgroundImage={SERVICE_IMAGES[service.slug]}
      />

      {/* Content */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-5xl">
          <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground mb-8 sm:mb-12">
            {service.content.intro}
          </p>

          {/* When Needed */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
            WHEN DO I NEED <span className="text-primary">THIS SERVICE?</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12">
            {service.content.whenNeeded}
          </p>

          {/* Benefits */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
            <span className="text-primary">BENEFITS</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12">
            {service.content.benefits}
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            VERTICAL AUTOMOTIVE IS HERE TO HELP!
          </h2>
          <p className="text-xs sm:text-lg opacity-90 max-w-2xl mx-auto mb-4 sm:mb-8">
            Our auto repair shop offers superior car service with straightforward pricing and honest recommendations for all our valued customers.
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              SCHEDULE YOUR APPOINTMENT
            </Button>
          </a>
        </div>
      </section>

      {/* Related Services — mobile: compact icon tiles, Desktop: 4-col cards */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4 text-center">
            OTHER <span className="text-primary">SERVICES</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          {/* Mobile: compact icon tiles */}
          <div className="grid grid-cols-4 gap-2 sm:hidden">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col items-center text-center p-2 bg-card border border-border hover:border-primary transition-all duration-200"
              >
                <div className="w-6 h-6 mb-1">
                  <ServiceIcon name={s.icon} />
                </div>
                <span className="text-[9px] font-bold leading-tight group-hover:text-primary transition-colors">{s.shortTitle}</span>
              </Link>
            ))}
          </div>

          {/* Desktop: 4-col full cards */}
          <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group p-6 bg-card border-2 border-border hover:border-primary transition-all duration-300"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                  {s.shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {s.description}
                </p>
                <span className="inline-flex items-center text-primary text-sm font-bold">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
