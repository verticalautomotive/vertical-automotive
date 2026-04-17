/**
 * VehicleDetail — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Dynamic page for vehicle-type service pages
 * MOBILE: Compact spacing, smaller text, tighter grids
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { useParams, Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import NotFound from "./NotFound";
import { ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";
import ServiceIcon from "@/components/ServiceIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { trackSchedule } from "@/lib/gtm";
import PhotoGallery, { GalleryImage } from "@/components/PhotoGallery";

export default function VehicleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { isSpanish, servicesPath, services, vehicleTypes, ui } = useTranslation();

  const vehicle = vehicleTypes.find((v) => v.slug === slug);

  if (!vehicle) {
    return <NotFound />;
  }

  const t = ui?.vehicleDetail ?? {
    weService: "WE SERVICE",
    availableServices: "AVAILABLE",
    available: "SERVICES",
    scheduleYour: "SCHEDULE YOUR APPOINTMENT",
    trustVertical: "Trust Vertical Automotive for all your vehicle repair and maintenance needs",
    bookNow: "BOOK NOW",
    learnMore: "Learn More",
    subtitle: "Comprehensive Computer Diagnostic, Preventive Maintenance and Repair",
  };

  const vehicleServices = vehicle.services
    .map((sSlug) => services.find((s) => s.slug === sSlug))
    .filter(Boolean);

  // Gallery images — use real photos for Tesla, placeholders for others
  const TESLA_GALLERY_IMAGES: GalleryImage[] = [
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-diagnostics_7906cd95.webp",
      alt: "Tesla Model X on lift with Snap-on diagnostic tool",
      altEs: "Tesla Model X en elevador con herramienta de diagnóstico",
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-frunk-open_3696ade7.webp",
      alt: "White Tesla Model X frunk open in service bay",
      altEs: "Tesla Model X blanco con frunk abierto en taller",
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-gears_c5769e70_1bca9bcd.webp",
      alt: "Tesla drive unit gears and bearings close-up",
      altEs: "Primer plano de engranajes y rodamientos del motor Tesla",
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-battery-fuse_8c80d49f.webp",
      alt: "Tesla battery fuse replacement with laptop diagnostics",
      altEs: "Reemplazo de fusible de batería Tesla con diagnóstico en laptop",
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-hv-battery_19dac181.webp",
      alt: "Tesla high-voltage battery compartment open",
      altEs: "Compartimento de batería de alto voltaje Tesla abierto",
    },
    {
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-service-mode_ca070e93.webp",
      alt: "Tesla service mode display on touchscreen",
      altEs: "Modo de servicio Tesla en pantalla táctil",
    },
  ];

  const galleryImages: GalleryImage[] = vehicle.slug === "tesla-vehicles-service"
    ? TESLA_GALLERY_IMAGES
    : vehicle.gallery && vehicle.gallery.length > 0
    ? vehicle.gallery.map((src, i) => ({
        src,
        alt: `${vehicle.title} service photo ${i + 1}`,
        altEs: `Foto de servicio ${vehicle.title.toLowerCase()} ${i + 1}`,
      }))
    : [
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+1",
          alt: `${vehicle.title} service photo 1`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 1`,
        },
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+2",
          alt: `${vehicle.title} service photo 2`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 2`,
        },
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+3",
          alt: `${vehicle.title} service photo 3`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 3`,
        },
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+4",
          alt: `${vehicle.title} service photo 4`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 4`,
        },
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+5",
          alt: `${vehicle.title} service photo 5`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 5`,
        },
        {
          src: "https://via.placeholder.com/600x600?text=Vehicle+Photo+6",
          alt: `${vehicle.title} service photo 6`,
          altEs: `Foto de servicio ${vehicle.title.toLowerCase()} 6`,
        },
      ];

  // Per-slug SEO data
  type VehicleSEO = { title: string; titleEs: string; description: string; descriptionEs: string; keywords: string; keywordsEs: string; ogImage: string; canonical: string; canonicalEs: string; h1?: string; h1Es?: string; };
  const vehicleSEOMap: Record<string, VehicleSEO> = {
    "tesla-vehicles-service": {
      title: "Tesla Repair Fort Lauderdale | EV Specialists | Vertical Automotive",
      titleEs: "Reparación Tesla Fort Lauderdale | Especialistas EV | Vertical Automotive",
      description: "Tesla and EV repair specialists in Fort Lauderdale & Wilton Manors. Model S, 3, X, Y. Battery diagnostics, LDU rebuild, A/C, suspension. ASE-certified technicians, 3-year warranty. Book today.",
      descriptionEs: "Especialistas en reparación de Tesla y vehículos eléctricos en Fort Lauderdale y Wilton Manors. Model S, 3, X, Y. Diagnóstico de batería, reconstrucción LDU. Técnicos ASE certificados, garantía 3 años. Reserve hoy.",
      h1: "Tesla & EV Repair Specialists in Fort Lauderdale",
      h1Es: "Especialistas en Reparación Tesla y EV en Fort Lauderdale",
      keywords: "Tesla repair Fort Lauderdale, Tesla service Wilton Manors, EV repair Broward County, Tesla Model 3 mechanic, Tesla battery diagnostic, ASE certified EV specialist",
      keywordsEs: "reparación Tesla Fort Lauderdale, servicio Tesla Wilton Manors, mecánico EV certificado ASE",
      ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-diagnostics_7906cd95.webp",
      canonical: "https://verticalautomotive.com/services/tesla-vehicles-service",
      canonicalEs: "https://verticalautomotive.com/es/servicios/tesla-vehicles-service",
    },
    "european-vehicles-service": {
      title: "European Auto Repair Fort Lauderdale | BMW & Mercedes | Vertical Automotive",
      titleEs: "Reparación Autos Europeos Fort Lauderdale | BMW y Mercedes | Vertical Automotive",
      description: "Expert European car repair in Fort Lauderdale & Wilton Manors. BMW, Mercedes-Benz, Audi, Porsche, Volkswagen specialists. ASE-certified technicians, 3-year warranty. Schedule your appointment today.",
      descriptionEs: "Reparación experta de autos europeos en Fort Lauderdale y Wilton Manors. Especialistas en BMW, Mercedes-Benz, Audi, Porsche, Volkswagen. Técnicos ASE certificados, garantía 3 años. Reserve hoy.",
      h1: "Expert European Auto Repair in Fort Lauderdale",
      h1Es: "Reparación Experta de Autos Europeos en Fort Lauderdale",
      keywords: "European car repair Fort Lauderdale, BMW repair Wilton Manors, Mercedes repair Fort Lauderdale, Audi mechanic Broward County, Porsche service South Florida, ASE certified European specialist",
      keywordsEs: "reparación autos europeos Fort Lauderdale, mecánico BMW Wilton Manors, servicio Mercedes Fort Lauderdale",
      ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-video-web_c01ed999.mp4",
      canonical: "https://verticalautomotive.com/services/european-vehicles-service",
      canonicalEs: "https://verticalautomotive.com/es/servicios/european-vehicles-service",
    },
    "asian-vehicles-service": {
      title: "Asian Vehicle Repair Fort Lauderdale | Toyota, Honda, Lexus & More",
      titleEs: "Reparación Autos Asiáticos Fort Lauderdale | Toyota, Honda, Lexus y Más",
      description: "Trusted Asian vehicle repair in Fort Lauderdale & Wilton Manors. Toyota, Honda, Lexus, Acura, Nissan, Mazda & more. ASE-certified mechanics, 3-year warranty. Book your appointment today.",
      descriptionEs: "Reparación confiable de vehículos asiáticos en Fort Lauderdale y Wilton Manors. Toyota, Honda, Lexus, Acura, Nissan, Mazda y más. Mecánicos ASE certificados, garantía 3 años. Reserve hoy.",
      h1: "Trusted Asian Car Repair Services in Fort Lauderdale",
      h1Es: "Servicios de Reparación de Autos Asiáticos en Fort Lauderdale",
      keywords: "Asian car repair Fort Lauderdale, Toyota mechanic Wilton Manors, Honda repair Fort Lauderdale, Lexus service Broward County, Acura specialist South Florida, ASE certified Asian vehicle mechanic",
      keywordsEs: "reparación autos asiáticos Fort Lauderdale, mecánico Toyota Wilton Manors, servicio Honda Fort Lauderdale",
      ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-video-web_c01ed999.mp4",
      canonical: "https://verticalautomotive.com/services/asian-vehicles-service",
      canonicalEs: "https://verticalautomotive.com/es/servicios/asian-vehicles-service",
    },
    "domestic-vehicles-service": {
      title: "Domestic Car Repair Fort Lauderdale | Ford, Chevy, Dodge & More",
      titleEs: "Reparación Autos Domésticos Fort Lauderdale | Ford, Chevy, Dodge y Más",
      description: "Expert domestic vehicle repair in Fort Lauderdale & Wilton Manors. Ford, Chevrolet, Dodge, RAM, Jeep & more. ASE-certified, 3-year warranty, competitive pricing. Schedule online today.",
      descriptionEs: "Reparación experta de vehículos domésticos en Fort Lauderdale y Wilton Manors. Ford, Chevrolet, Dodge, RAM, Jeep y más. ASE certificados, garantía 3 años, precios competitivos. Reserve en línea hoy.",
      h1: "Domestic Vehicle Repair Experts in Fort Lauderdale",
      h1Es: "Expertos en Reparación de Vehículos Domésticos en Fort Lauderdale",
      keywords: "domestic car repair Fort Lauderdale, Ford mechanic Wilton Manors, Chevrolet repair Fort Lauderdale, Dodge service Broward County, Jeep specialist South Florida, ASE certified domestic vehicle mechanic",
      keywordsEs: "reparación autos domésticos Fort Lauderdale, mecánico Ford Wilton Manors, servicio Chevrolet Fort Lauderdale",
      ogImage: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-video-web_c01ed999.mp4",
      canonical: "https://verticalautomotive.com/services/domestic-vehicles-service",
      canonicalEs: "https://verticalautomotive.com/es/servicios/domestic-vehicles-service",
    },
  };

  const seo = vehicleSEOMap[vehicle.slug];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={seo ? (isSpanish ? seo.titleEs : seo.title) : (isSpanish ? `${vehicle.title} | Vertical Automotive` : `${vehicle.title} Service | Vertical Automotive`)}
        description={seo ? (isSpanish ? seo.descriptionEs : seo.description) : (isSpanish ? `Reparación experta de vehículos ${vehicle.title.toLowerCase()} en Fort Lauderdale. ASE. (954) 565-1518.` : `Expert ${vehicle.title.toLowerCase()} repair in Fort Lauderdale. ASE-certified. (954) 565-1518.`)}
        keywords={seo ? (isSpanish ? seo.keywordsEs : seo.keywords) : `${vehicle.title.toLowerCase()} repair Fort Lauderdale, ASE certified mechanic`}
        canonical={seo ? (isSpanish ? seo.canonicalEs : seo.canonical) : undefined}
        ogImage={seo ? seo.ogImage : undefined}
      />
      {/* LocalBusiness JSON-LD for this vehicle type */}
      {seo && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoRepair",
            "name": "Vertical Automotive",
            "url": seo.canonical,
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
            "openingHours": "Mo-Fr 08:00-17:00",
            "areaServed": ["Fort Lauderdale", "Wilton Manors", "Broward County"],
            "serviceType": [
              vehicle.slug === "tesla-vehicles-service" ? "Tesla & EV Repair" : "",
              vehicle.slug === "european-vehicles-service" ? "European Vehicle Repair" : "",
              vehicle.slug === "asian-vehicles-service" ? "Asian Vehicle Repair" : "",
              vehicle.slug === "domestic-vehicles-service" ? "Domestic Vehicle Repair" : "",
              "Auto Repair", "Brake Repair", "A/C Repair", "Oil Change", "Wheel Alignment"
            ].filter(Boolean),
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "503",
              "bestRating": "5"
            }
          }) }}
        />
      )}
      <Navigation />

      <PageHero
        title={seo?.h1 ? (isSpanish ? (seo.h1Es ?? seo.h1) : seo.h1) : vehicle.title.toUpperCase()}
        subtitle={t.subtitle}
        backgroundImage={vehicle.image}
      />

      {/* Description */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-3 sm:mb-4">
            {isSpanish ? t.weService : "WE SERVICE"} <span className="text-primary">{vehicle.title.toUpperCase()}</span> {isSpanish ? "" : "VEHICLES"}
          </h2>
          <div className="h-1 w-12 sm:w-16 bg-primary mb-4 sm:mb-6" />
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-lg mb-8 sm:mb-12">
            {vehicle.description}
          </p>
        </div>
      </section>

      {/* Service Cards — mobile: compact icon tiles, Desktop: 3-col cards */}
      <section className="py-10 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <h2 className="text-xl sm:text-3xl font-black mb-3 sm:mb-4 text-center">
            {t.availableServices} <span className="text-primary">{t.available}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          {/* Mobile: compact icon tiles */}
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {vehicleServices.map((service) =>
              service ? (
                <Link
                  key={service.slug}
                  href={`${servicesPath}/${service.slug}`}
                  className="group flex flex-col items-center text-center p-2.5 border border-primary/30 hover:border-primary transition-all duration-200"
                >
                  <div className="w-7 h-7 mb-1.5">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="text-[10px] font-bold leading-tight text-primary group-hover:text-secondary-foreground transition-colors">{service.shortTitle}</span>
                </Link>
              ) : null
            )}
          </div>

          {/* Desktop: 3-col full cards */}
          <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vehicleServices.map((service) =>
              service ? (
                <Link
                  key={service.slug}
                  href={`${servicesPath}/${service.slug}`}
                  className="group border-2 border-primary/20 p-6 hover:border-primary transition-all duration-300"
                >
                  <h3 className="text-lg font-bold mb-3 text-primary group-hover:text-secondary-foreground transition-colors leading-tight">
                    {service.shortTitle}
                  </h3>
                  <p className="text-secondary-foreground/60 text-sm leading-relaxed line-clamp-3 mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-primary text-sm font-bold">
                    {t.learnMore} <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <PhotoGallery
        images={galleryImages}
        isSpanish={isSpanish}
        title={`${vehicle.title.toUpperCase()} GALLERY`}
        titleEs={`GALERÍA DE ${vehicle.title.toUpperCase()}`}
      />

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            {t.scheduleYour}
          </h2>
          <p className="text-xs sm:text-lg opacity-90 max-w-2xl mx-auto mb-4 sm:mb-8">
            {isSpanish
              ? `${t.trustVertical} ${vehicle.title.toLowerCase()}.`
              : `Trust Vertical Automotive for all your ${vehicle.title.toLowerCase()} vehicle repair and maintenance needs. Our ASE-certified technicians are ready to help.`}
          </p>
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackSchedule("vehicle_detail_cta")}
          >
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              {t.bookNow}
            </Button>
          </a>
        </div>
      </section>

      <ServiceFAQ serviceSlug={vehicle.slug} serviceTitle={vehicle.title} />
      <Footer />
    </div>
  );
}
