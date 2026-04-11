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
      src: "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-gears_c5769e70.png",
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

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={isSpanish
          ? `${vehicle.title} | Vertical Automotive`
          : `${vehicle.title} Service | Vertical Automotive`}
        description={isSpanish
          ? `Reparación experta de vehículos ${vehicle.title.toLowerCase()} en Fort Lauderdale. ${vehicle.description.slice(0, 80)}... ASE. (954) 565-1518.`
          : `Expert ${vehicle.title.toLowerCase()} repair in Fort Lauderdale. ${vehicle.description.slice(0, 80)}... ASE-certified. (954) 565-1518.`}
        keywords={isSpanish
          ? `reparación ${vehicle.title.toLowerCase()} Fort Lauderdale, servicio ${vehicle.title.toLowerCase()}, taller certificado ASE`
          : `${vehicle.title.toLowerCase()} repair Fort Lauderdale, ${vehicle.title.toLowerCase()} service, ASE certified mechanic`}
      />
      <Navigation />

      <PageHero
        title={vehicle.title.toUpperCase()}
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

      <Footer />
    </div>
  );
}
