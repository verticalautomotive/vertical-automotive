/**
 * ServiceDetail — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Dynamic page for individual service pages
 * MOBILE: Compact spacing, smaller text, tighter grids
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useParams } from "wouter";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import NotFound from "./NotFound";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import ServiceIcon from "@/components/ServiceIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { trackSchedule } from "@/lib/gtm";
import ServiceFAQ from "@/components/ServiceFAQ";
import { RelatedServices, RELATED_SERVICES } from "@/components/RelatedServices";

// Per-slug SEO overrides for high-value service pages
// Per-slug H1 overrides (Phase 2 — unique, keyword-rich H1s)
const SERVICE_H1: Record<string, { h1: string; h1Es: string }> = {
  "brake-system": {
    h1: "Expert Brake Repair & Replacement in Fort Lauderdale",
    h1Es: "Reparación y Reemplazo de Frenos Profesional en Fort Lauderdale",
  },
  "alignment-tire-rotation-balancing": {
    h1: "Wheel Alignment, Tire Rotation & Balancing in Fort Lauderdale",
    h1Es: "Alineación, Rotación y Balanceo de Neumáticos en Fort Lauderdale",
  },
  "battery-cranking-charging-systems": {
    h1: "Battery & Charging System Service in Fort Lauderdale",
    h1Es: "Servicio de Batería y Sistema de Carga en Fort Lauderdale",
  },
  "hybrids-ev": {
    h1: "Hybrid & Electric Vehicle Repair in Fort Lauderdale",
    h1Es: "Reparación de Híbridos y Eléctricos en Fort Lauderdale y Wilton Manors",
  },
};

const SERVICE_SEO: Record<string, { title: string; titleEs: string; description: string; descriptionEs: string }> = {
  "brake-system": {
    title: "Brake Repair Fort Lauderdale | Pads & Rotors | Vertical Automotive",
    titleEs: "Reparación de Frenos Fort Lauderdale | Pastillas y Rotores | Vertical Automotive",
    description: "Professional brake repair & replacement in Fort Lauderdale & Wilton Manors. Brake pads, rotors, calipers & fluid flush. All makes & models. 3-year warranty. Free inspection. Book today.",
    descriptionEs: "Reparación profesional de frenos en Fort Lauderdale y Wilton Manors. Pastillas, rotores, calibradores y purga de líquido. Todas las marcas. Garantía 3 años. Inspección gratis. Reserve hoy.",
  },
  "a-c-maintenance-repair": {
    title: "A/C Repair Fort Lauderdale | Recharge & Service | Vertical Automotive",
    titleEs: "Reparación de Aire Acondicionado Fort Lauderdale | Vertical Automotive",
    description: "Auto A/C repair in Fort Lauderdale & Wilton Manors. Recharge, compressor, condenser & leak repair for all makes. ASE-certified, 36,000-mile / 36-month warranty. Call (954) 565-1518.",
    descriptionEs: "Reparación de aire acondicionado en Fort Lauderdale y Wilton Manors. Recarga, compresor, condensador para todas las marcas. Certificados ASE. Llame al (954) 565-1518.",
  },
  "oil-change-engine-service": {
    title: "Oil Change Fort Lauderdale | Synthetic & Conventional | Vertical Automotive",
    titleEs: "Cambio de Aceite Fort Lauderdale y Wilton Manors | Vertical Automotive",
    description: "Fast oil change & engine service in Fort Lauderdale & Wilton Manors. Conventional, synthetic & high-mileage oil for all makes. ASE-certified. Call (954) 565-1518.",
    descriptionEs: "Cambio de aceite rápido en Fort Lauderdale y Wilton Manors. Aceite convencional, sintético y alto kilometraje para todas las marcas. Certificados ASE. (954) 565-1518.",
  },
  "transmission": {
    title: "Transmission Repair Fort Lauderdale | All Makes | Vertical Automotive",
    titleEs: "Reparación de Transmisión Fort Lauderdale | Vertical Automotive",
    description: "Transmission repair & service in Fort Lauderdale & Wilton Manors. Automatic, manual & CVT for all makes. ASE-certified mechanics, 36,000-mile / 36-month warranty. Call (954) 565-1518.",
    descriptionEs: "Reparación de transmisión en Fort Lauderdale y Wilton Manors. Automática, manual y CVT para todas las marcas. Certificados ASE, garantía 3 años. (954) 565-1518.",
  },
  "alignment-tire-rotation-balancing": {
    title: "Wheel Alignment Fort Lauderdale | Tire Service | Vertical Automotive",
    titleEs: "Alineación de Ruedas Fort Lauderdale | Rotación y Balanceo",
    description: "Precision wheel alignment, tire rotation & balancing in Fort Lauderdale & Wilton Manors. All makes & models including Tesla & EV. ASE-certified. Competitive pricing. Schedule online today.",
    descriptionEs: "Alineación de ruedas, rotación y balanceo en Fort Lauderdale y Wilton Manors. Todas las marcas incluyendo Tesla y EV. Certificados ASE. Precios competitivos. Reserve en línea hoy.",
  },
  "steering-suspension": {
    title: "Suspension Repair Fort Lauderdale | Shocks & Struts | Vertical Automotive",
    titleEs: "Reparación de Suspensión Fort Lauderdale | Vertical Automotive",
    description: "Steering & suspension repair in Fort Lauderdale & Wilton Manors. Shocks, struts, control arms & alignment for all makes. ASE-certified. Call (954) 565-1518.",
    descriptionEs: "Reparación de dirección y suspensión en Fort Lauderdale y Wilton Manors. Amortiguadores, brazos de control para todas las marcas. Certificados ASE. (954) 565-1518.",
  },
  "hybrids-ev": {
    title: "Hybrid & EV Repair Fort Lauderdale | Tesla Specialists | Vertical Automotive",
    titleEs: "Reparación Híbridos y Eléctricos Fort Lauderdale | Prius, Volt y Más",
    description: "Hybrid and electric vehicle repair in Fort Lauderdale & Wilton Manors. Toyota Prius, Honda Hybrid, Chevy Volt & all hybrid makes. ASE-certified EV specialists. 3-year warranty. Book today.",
    descriptionEs: "Reparación de vehículos híbridos y eléctricos en Fort Lauderdale y Wilton Manors. Toyota Prius, Honda Hybrid, Chevy Volt y todas las marcas híbridas. Especialistas ASE en EV. Garantía 3 años. Reserve hoy.",
  },
  "battery-cranking-charging-systems": {
    title: "Battery Replacement Fort Lauderdale | EV & All Makes | Vertical Automotive",
    titleEs: "Reemplazo de Batería Fort Lauderdale | Todas las Marcas y EVs",
    description: "Car battery replacement & charging system repair in Fort Lauderdale & Wilton Manors. All makes including Tesla & EV. Fast same-day service, ASE-certified, 3-year warranty. Book today.",
    descriptionEs: "Reemplazo de batería y reparación del sistema de carga en Fort Lauderdale y Wilton Manors. Todas las marcas incluyendo Tesla y EV. Servicio rápido el mismo día, ASE certificados, garantía 3 años. Reserve hoy.",
  },
  "fleet-maintenance-repairs": {
    title: "Fleet Maintenance Fort Lauderdale | Commercial Service | Vertical Automotive",
    titleEs: "Mantenimiento de Flota Fort Lauderdale | Vertical Automotive",
    description: "Fleet maintenance & repair in Fort Lauderdale & Wilton Manors. Scheduled service, diagnostics & repairs for commercial fleets. ASE-certified. Call (954) 565-1518.",
    descriptionEs: "Mantenimiento y reparación de flotas en Fort Lauderdale y Wilton Manors. Servicio programado y diagnóstico para flotas comerciales. Certificados ASE. (954) 565-1518.",
  },
  "complete-diagnostics": {
    title: "Engine Diagnostics Fort Lauderdale | Computer Scan | Vertical Automotive",
    titleEs: "Diagnóstico Automotriz Fort Lauderdale | Vertical Automotive",
    description: "Complete auto diagnostics in Fort Lauderdale & Wilton Manors. Advanced computer diagnostics for all makes & models. ASE-certified, 36,000-mile / 36-month warranty. Call (954) 565-1518.",
    descriptionEs: "Diagnóstico automotriz completo en Fort Lauderdale y Wilton Manors. Diagnóstico computarizado avanzado para todas las marcas. Certificados ASE. (954) 565-1518.",
  },
};

const SERVICE_IMAGES: Record<string, string> = {
  "battery-cranking-charging-systems": "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "brake-system": "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "transmission": "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "a-c-maintenance-repair": "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "oil-change-engine-service": "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "complete-diagnostics": "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "routine-preventive-maintenance": "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "steering-suspension": "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "fuel-system": "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "hybrids-ev": "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "alignment-tire-rotation-balancing": "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=1200&q=50&fm=webp&fit=crop&auto=format",
  "fleet-maintenance-repairs": "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200&q=50&fm=webp&fit=crop&auto=format",
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isSpanish, servicesPath, services, ui } = useTranslation();

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return <NotFound />;
  }

  const t = ui?.serviceDetail ?? {
    whenNeeded: "WHEN DO I NEED",
    thisService: "THIS SERVICE?",
    benefits: "BENEFITS",
    hereToHelp: "VERTICAL AUTOMOTIVE IS HERE TO HELP!",
    helpText: "Our auto repair shop offers superior car service with straightforward pricing and honest recommendations for all our valued customers.",
    scheduleYour: "SCHEDULE YOUR APPOINTMENT",
    otherServices: "OTHER",
    services: "SERVICES",
    learnMore: "Learn More",
    subtitle: "Comprehensive Computer Diagnostic, Preventive Maintenance and Repair",
  };

  // Get related services (exclude current)
  const relatedServices = services.filter((s) => s.slug !== slug).slice(0, 4);

  const seoOverride = SERVICE_SEO[service.slug];
  const h1Override = SERVICE_H1[service.slug];
  const seoTitle = seoOverride
    ? (isSpanish ? seoOverride.titleEs : seoOverride.title)
    : (isSpanish
        ? `${service.title} en Fort Lauderdale y Wilton Manors | Vertical Automotive`
        : `${service.title} Fort Lauderdale & Wilton Manors | Vertical Automotive`);
  const seoDescription = seoOverride
    ? (isSpanish ? seoOverride.descriptionEs : seoOverride.description)
    : (isSpanish
        ? `${service.description.slice(0, 110)}... Técnicos ASE certificados. Garantía 3 años. Fort Lauderdale y Wilton Manors. (954) 565-1518.`
        : `${service.description.slice(0, 110)}... ASE-certified mechanics. 36,000-mile / 36-month warranty. Fort Lauderdale & Wilton Manors. Call (954) 565-1518.`);
  const canonicalSlug = isSpanish ? `/es/servicios/${service.slug}` : `/services/${service.slug}`;
  const canonicalUrl = `https://verticalautomotive.com${canonicalSlug}`;
  const ogImage = SERVICE_IMAGES[service.slug] ?? "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-tesla-service-1440_879f7b42.webp";

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        ogImage={ogImage}
        keywords={isSpanish
          ? `${service.title.toLowerCase()} Fort Lauderdale, reparación ${service.title.toLowerCase()}, taller mecánico Fort Lauderdale, Wilton Manors, certificado ASE`
          : `${service.title.toLowerCase()} Fort Lauderdale, ${service.title.toLowerCase()} Wilton Manors, auto repair Fort Lauderdale, ASE certified mechanic`}
      />
      {/* LocalBusiness JSON-LD — Phase 3 enhanced schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AutoRepair",
          "name": "Vertical Automotive",
          "url": canonicalUrl,
          "telephone": "(954) 565-1518",
          "priceRange": "$$",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1100 W Oakland Park Blvd Unit 5",
            "addressLocality": "Wilton Manors",
            "addressRegion": "FL",
            "postalCode": "33311",
            "addressCountry": "US"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 26.165788,
            "longitude": -80.157597
          },
          "openingHours": "Mo-Fr 08:00-17:00",
          "sameAs": ["https://www.google.com/maps/place/Vertical+Automotive"],
          "areaServed": ["Fort Lauderdale", "Wilton Manors", "Broward County"],
          "serviceType": [service.title, "Auto Repair", "ASE Certified Mechanic"],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "503",
            "bestRating": "5"
          }
        }) }}
      />
      <Navigation />

      <PageHero
        title={h1Override ? (isSpanish ? h1Override.h1Es : h1Override.h1) : service.title.toUpperCase()}
        subtitle={t.subtitle}
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
            {t.whenNeeded} <span className="text-primary">{t.thisService}</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12">
            {service.content.whenNeeded}
          </p>

          {/* Benefits */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
            <span className="text-primary">{t.benefits}</span>
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
          <p className="text-xs sm:text-base text-muted-foreground leading-relaxed mb-8 sm:mb-12">
            {service.content.benefits}
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ serviceSlug={service.slug} serviceTitle={service.title} />

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            {t.hereToHelp}
          </h2>
          <p className="text-xs sm:text-lg opacity-90 max-w-2xl mx-auto mb-4 sm:mb-8">
            {t.helpText}
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSchedule("service_detail_cta")}
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              {t.scheduleYour}
            </Button>
          </a>
        </div>
      </section>

      {/* Related Services — mobile: compact icon tiles, Desktop: 4-col cards */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4 text-center">
            {t.otherServices} <span className="text-primary">{t.services}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          {/* Mobile: compact icon tiles */}
          <div className="grid grid-cols-4 gap-2 sm:hidden">
            {relatedServices.map((s) => (
              <Link
                key={s.slug}
                href={`${servicesPath}/${s.slug}`}
                className="group flex flex-col items-center text-center p-2 bg-card border border-border hover:border-primary transition-all duration-200 rounded-xl"
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
                href={`${servicesPath}/${s.slug}`}
                className="group p-6 bg-card border-2 border-border hover:border-primary transition-all duration-300 rounded-xl"
              >
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                  {s.shortTitle}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {s.description}
                </p>
                <span className="inline-flex items-center text-primary text-sm font-bold">
                  {t.learnMore} <ArrowRight className="w-4 h-4 ml-1" />
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
