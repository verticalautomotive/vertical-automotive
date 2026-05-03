/**
 * Home Page - Vertical Automotive
 * Design Philosophy: Industrial Brutalism
 * - Raw workshop aesthetics with bold geometric shapes
 * - Diagonal grid system with asymmetric layouts
 * - Black, white, and blue color scheme
 * - Mechanical precision in interactions
 * MOBILE: Compact layout, reduced spacing, 2-col grids, minimal scrolling
 * BILINGUAL: Uses useTranslation hook for EN/ES content
 */

import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { COMPANY, LOCATIONS } from "@/lib/data";
import type { VehicleType } from "@/lib/data";
import Navigation from "@/components/Navigation";
import OptimizedImage from "@/components/OptimizedImage";
import {
  CheckCircle,
  Award,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Star,
  Quote,
  ExternalLink,
  ChevronDown,
} from "lucide-react";
import { Link } from "wouter";
import SEO from "@/components/SEO";
import ServiceIcon from "@/components/ServiceIcon";
import { useTranslation } from "@/hooks/useTranslation";
import { trackCall, trackSchedule, trackDirections } from "@/lib/gtm";
// Lazy-load below-the-fold and dialog components — only fetched when needed
const Footer = lazy(() => import("@/components/Footer"));
const TrustBadges = lazy(() => import("@/components/TrustBadges"));
const CallNowDialog = lazy(() => import("@/components/CallNowDialog"));
const LocationPickerModal = lazy(() => import("@/components/LocationPickerModal"));

const HERO_POSTER = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-poster_30c5bb2a.webp";
const HERO_VIDEO_DESKTOP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-video-web_c01ed999.mp4";
// Mobile hero: static image for faster LCP and lower data usage on phones/tablets
const HERO_MOBILE_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-mobile-shop_7705f9e1.webp";
const HERO_MOBILE_SM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-mobile-sm_v2_82ad64ef.webp";
const HERO_MOBILE_MD = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-mobile-md_v2_1e04a512.webp";

/**
 * HeroBackground — renders the hero section background.
 * Mobile/tablet (< 1024px): static image for fast LCP and low data usage.
 * Desktop (≥ 1024px): autoplay muted looping video.
 *
 * PERFORMANCE: Both the mobile image AND the desktop video poster are rendered
 * immediately on first render (no mounted/isMobile state gate). This ensures
 * the LCP image is in the DOM as soon as React hydrates, matching the static
 * shell in index.html and eliminating the element render delay.
 * CSS media queries hide/show the appropriate element per device.
 */
function HeroBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let attempts = 0;
    const maxAttempts = 5;

    const tryPlay = () => {
      if (attempts >= maxAttempts) return;
      attempts++;
      video.muted = true;
      video.play().catch(() => {
        setTimeout(tryPlay, attempts * 500);
      });
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener('loadeddata', tryPlay, { once: true });
      video.addEventListener('canplay', tryPlay, { once: true });
    }

    const onInteraction = () => {
      if (video.paused) {
        video.muted = true;
        video.play().catch(() => {});
      }
      document.removeEventListener('touchstart', onInteraction);
      document.removeEventListener('click', onInteraction);
    };
    document.addEventListener('touchstart', onInteraction, { once: true, passive: true });
    document.addEventListener('click', onInteraction, { once: true });

    return () => {
      document.removeEventListener('touchstart', onInteraction);
      document.removeEventListener('click', onInteraction);
    };
  }, []);

  return (
    <>
      {/* Mobile/tablet hero image — shown on screens < 1024px via CSS, hidden on desktop */}
      <picture>
        <source media="(max-width: 479px)" srcSet={HERO_MOBILE_SM} type="image/webp" />
        <source media="(max-width: 1023px)" srcSet={HERO_MOBILE_MD} type="image/webp" />
        <img
          src={HERO_MOBILE_IMAGE}
          alt="Vertical Automotive shop — Honda NSX on lift"
          width={1080}
          height={1350}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center lg:hidden"
        />
      </picture>
      {/* Desktop video hero — always rendered with static source */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={HERO_POSTER}
        className="absolute inset-0 w-full h-full object-cover hidden lg:block"
      >
        <source src={HERO_VIDEO_DESKTOP} type="video/mp4" />
      </video>
    </>
  );
}

export default function Home() {
  const [statsVisible, setStatsVisible] = useState(false);
  const [reviewsExpanded, setReviewsExpanded] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const [locationPickerService, setLocationPickerService] = useState<{ slug: string; name: string } | null>(null);
  const { lang, isSpanish, prefix, servicesPath, services, vehicleTypes, ui } = useTranslation();

  const t = ui?.home ?? {
    yearsExcellence: "YEARS OF EXCELLENCE",
    totalAuto: "Total Car Care for",
    care: "All Makes & Models",
    warranty3Year: "36,000-Mile / 36-Month Warranty on All Repairs",
    teslaAsianEuropean: "ASE-Certified Mechanics • Tesla, Asian, European & Domestic Specialists",
    scheduleAppointment: "SCHEDULE APPOINTMENT",
    viewOffers: "VIEW OFFERS",
    weServiceAllMakes: "WE SERVICE",
    allMakes: "ALL MAKES",
    yearsExperience: "YEARS OF EXPERIENCE",
    vehiclesRepaired: "VEHICLES REPAIRED",
    locations: "LOCATIONS",
    satisfiedCustomers: "SATISFIED CUSTOMERS",
    ourServices: "OUR",
    services: "SERVICES",
    currentOffers: "OFFERS",
    current: "CURRENT",
    offersAvailable: "Current Offers Available",
    claimOffer: "CLAIM OFFER",
    saveOnQuality: "Save on quality auto care with our exclusive promotions",
    certifiedAutomotive: "CERTIFIED AUTOMOTIVE",
    professionals: "PROFESSIONALS",
    whoWeAre: "Who Vertical Automotive Is",
    whoWeAreText: "Vertical Automotive is a trusted auto repair shop in Fort Lauderdale and Wilton Manors, Florida. Whether you need car repair in Fort Lauderdale or a reliable mechanic near me in Broward County, our ASE-certified team delivers honest diagnostics, professional workmanship, and long-term reliability for every make and model.",
    aseCertified: "ASE Certified",
    warranty3: "36,000-Mile / 36-Month Warranty",
    allMakesModels: "All Makes & Models",
    evSpecialists: "EV Specialists",
    customerReviews: "CUSTOMER",
    reviews: "REVIEWS",
    basedOn: "Based on",
    googleReviews: "Google Reviews",
    readReviews: "Read Customer Reviews",
    seeAllReviews: "SEE ALL 516 REVIEWS ON GOOGLE",
    contactUs: "CONTACT",
    twoLocations: "Two convenient locations to serve you",
    schedule: "SCHEDULE",
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }

    return () => observer.disconnect();
  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={isSpanish
          ? "Reparación de Autos Fort Lauderdale y Wilton Manors | Todas las Marcas"
          : "Auto Repair Fort Lauderdale & Wilton Manors | All Makes"}
        description={isSpanish
          ? "Taller de confianza en Fort Lauderdale y Wilton Manors para todas las marcas y modelos. Mecánicos certificados ASE, especialistas en EV, garantía de 3 años, 2 ubicaciones. Reserve su servicio hoy."
          : "Trusted auto repair in Fort Lauderdale & Wilton Manors for all makes & models. ASE-certified mechanics, EV specialists, 36,000-mile / 36-month warranty, 2 locations. Book your service today."}
        canonical={isSpanish ? "https://verticalautomotive.com/es" : "https://verticalautomotive.com/"}
        ogImage="https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hero-video-web_c01ed999.mp4"
        hreflangLinks={[
          { hreflang: "en", href: "https://verticalautomotive.com/" },
          { hreflang: "es", href: "https://verticalautomotive.com/es" },
          { hreflang: "x-default", href: "https://verticalautomotive.com/" },
        ]}
        keywords={isSpanish
          ? "taller mecánico Fort Lauderdale, reparación de autos Wilton Manors, reparación Tesla, certificado ASE, frenos, cambio de aceite, aire acondicionado, diagnóstico de motor, autos europeos, Sur de Florida"
          : "auto repair Fort Lauderdale, car repair Fort Lauderdale, auto repair Wilton Manors, mechanic near me, Tesla repair, ASE certified, brake service, oil change, AC repair, engine diagnostics, European car repair, South Florida"}
      />
      {/* LocalBusiness JSON-LD is now in static index.html — no React re-render cost */}

      <Navigation />

      {/* Hero Section — clean, conversion-focused */}
      <section 
        className="relative min-h-[50vh] sm:min-h-[85vh] flex items-center bg-secondary text-secondary-foreground overflow-hidden"
      >
        <HeroBackground />
        {/* Simplified gradient overlay — strong left for text readability */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10, 10, 18, 0.92) 0%, rgba(10, 10, 18, 0.65) 55%, rgba(10, 10, 18, 0.35) 100%)' }} />
        
        <div className="container relative z-10 py-16 sm:py-0">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-3 sm:mb-5 leading-[1.1] tracking-tight">
              {isSpanish
                ? <>Reparación de Autos en <span className="text-primary">Fort Lauderdale</span> y <span className="text-primary">Wilton Manors</span></>
                : <>Auto Repair in <span className="text-primary">Fort Lauderdale</span> & <span className="text-primary">Wilton Manors</span></>}
            </h1>

            <p className="text-sm sm:text-lg md:text-xl text-secondary-foreground/70 font-medium mb-6 sm:mb-8 tracking-wide">
              {isSpanish
                ? "Certificado ASE • Garantía de 36 Meses • Todas las Marcas y Modelos"
                : "ASE-Certified • 36-Month Warranty • All Makes & Models"}
            </p>
            
            <div className="flex items-center gap-4 sm:gap-5">
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSchedule("hero")}>
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider text-sm sm:text-base px-6 sm:px-10 py-5 sm:py-6 shadow-lg">
                  {isSpanish ? "AGENDAR CITA" : "SCHEDULE APPOINTMENT"}
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Diagonal bottom edge */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-10 sm:h-20 bg-background"
          style={{
            clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 70%)'
          }}
        />
      </section>

      {/* Vehicle Types Section — mobile: tighter */}
      <section className="pt-10 pb-20 sm:pt-20 sm:pb-36 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="container">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-12 text-center">
            {isSpanish ? "Servicio para Todas las Marcas" : "EV, European, Asian"} <span className="text-primary">{isSpanish ? "y Modelos" : "& Domestic Vehicle Specialists"}</span>
          </h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {vehicleTypes.map((type, idx) => (
              <VehicleTypeCard key={type.slug} type={type} servicesPath={servicesPath} onClickTile={(slug, name) => setLocationPickerService({ slug, name })} isFirst={idx === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section — mobile: compact 2x2 grid */}
      <section id="stats" className="py-10 sm:py-20 bg-secondary text-secondary-foreground diagonal-top diagonal-bottom" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}>
        <div className="container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8">
            {[
              { value: String(COMPANY.yearsExperience), label: t.yearsExperience, icon: Award },
              { value: COMPANY.vehiclesRepaired, label: t.vehiclesRepaired, icon: TrendingUp },
              { value: String(COMPANY.staff), label: t.locations, icon: MapPin },
              { value: COMPANY.satisfaction, label: t.satisfiedCustomers, icon: CheckCircle },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center p-4 sm:p-8 bg-secondary/50 border-2 border-primary/20 hover:border-primary transition-all duration-300"
              >
                <stat.icon className="w-7 h-7 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-4 text-primary" />
                <div className="text-2xl sm:text-5xl md:text-6xl font-black mono-number mb-1 sm:mb-2 text-primary">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-sm font-bold tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section — mobile: compact icon+title tiles, Desktop: 5-col cards */}
      <section id="services" className="py-10 sm:py-20 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 700px' }}>
        <div className="container">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              {isSpanish ? "Nuestros" : "Brake, A/C, Engine"} <span className="text-primary">{isSpanish ? "Servicios" : "& Diagnostic Services"}</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto" />
          </div>

          {/* Mobile: compact 3-col icon tiles — click opens location picker */}
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {services.map((service) => (
              <div
                key={service.slug}
                onClick={() => setLocationPickerService({ slug: service.slug, name: service.shortTitle })}
                className="glass-compact flex flex-col items-center justify-center text-center p-2.5 border border-transparent hover:border-[#8B0000] group cursor-pointer h-[88px] transition-all duration-300"
              >
                <div className="w-7 h-7 mb-1.5 flex-shrink-0 glass-icon group-hover:[&_svg]:text-[#8B0000] transition-colors duration-300">
                  <ServiceIcon name={service.icon} />
                </div>
                <span className="text-[10px] font-bold leading-tight group-hover:text-[#8B0000] transition-colors line-clamp-2">{service.shortTitle}</span>
              </div>
            ))}
          </div>

          {/* Desktop: 5-col full cards — click opens location picker */}
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {services.map((service) => (
              <div key={service.slug} className="glass-wrap h-full">
                <Card
                  onClick={() => setLocationPickerService({ slug: service.slug, name: service.shortTitle })}
                  className="glass-card p-6 group cursor-pointer h-full flex flex-col items-center justify-center text-center border border-transparent hover:border-[#8B0000] transition-all duration-300"
                >
                  <div className="w-12 h-12 mb-4 glass-icon group-hover:[&_svg]:text-[#8B0000] transition-colors duration-300">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <h3 className="text-lg font-bold group-hover:text-[#8B0000] transition-colors leading-tight relative z-[2]">{service.shortTitle}</h3>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* About Section — mobile: stacked, compact */}
      <section id="about" className="py-10 sm:py-20 bg-background" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <div className="container">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">
              <div>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-6">
                  {isSpanish ? "Taller de Confianza en" : "Full-Service Auto Repair in"}
                  <br />
                  <span className="text-primary">{isSpanish ? "Fort Lauderdale y Wilton Manors" : "Fort Lauderdale & Wilton Manors"}</span>
                </h2>
                <div className="h-1 w-16 sm:w-24 bg-primary mb-4 sm:mb-8" />
                <p className="font-display text-sm sm:text-base font-bold text-primary tracking-wider mb-2 sm:mb-3">{t.whoWeAre}</p>
                <p className="text-sm sm:text-lg leading-relaxed mb-4 sm:mb-8">
                  {t.whoWeAreText}
                </p>
                <p className="text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 text-muted-foreground">
                  {isSpanish
                    ? "¿Buscas un mecánico de confianza cerca de ti en Fort Lauderdale o Wilton Manors? Nuestro equipo certificado ASE está listo para ayudarte."
                    : "Looking for a trusted mechanic near you in Fort Lauderdale or Wilton Manors? Our ASE-certified team is ready to help."}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:gap-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">{t.aseCertified}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">{t.warranty3}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">{t.allMakesModels}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                    <span className="font-medium text-xs sm:text-base">{t.evSpecialists}</span>
                  </div>
                </div>
              </div>
              {/* Right column — visible on desktop, shows first 2 rows of badges */}
              <div className="hidden lg:block">
                <div className="rounded-xl border border-border/30 bg-card/50 p-6" style={{ backdropFilter: 'blur(8px)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm font-bold text-primary tracking-wider">
                      {isSpanish ? 'CERTIFICACIONES Y AFILIACIONES' : 'CERTIFICATIONS & AFFILIATIONS'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground leading-relaxed">
                    {isSpanish
                      ? 'Certificaciones profesionales, alianzas de la industria y estándares reconocidos que respaldan nuestro compromiso con un servicio de calidad.'
                      : 'Professional certifications, trusted industry partnerships, and recognized standards that support our commitment to quality service.'}
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Badges — full width below the two-column layout */}
            <Suspense fallback={null}>
              <TrustBadges />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Google Reviews Section — mobile: compact */}
      <section id="reviews" className="py-10 sm:py-20 bg-muted" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="container">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              {t.customerReviews} <span className="text-primary">{t.reviews}</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-3 sm:mb-4" />
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-7 sm:h-7 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-2xl sm:text-3xl font-black mono-number">4.9</span>
            </div>
            <p className="text-sm sm:text-lg text-muted-foreground">
              {t.basedOn} <span className="font-bold text-foreground">516 {t.googleReviews}</span>
            </p>
          </div>

          {/* Review Highlights — Desktop only */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6 mb-12">
            {[
              {
                quote: isSpanish
                  ? "Me trataron con respeto y recibí un servicio excelente a un precio accesible."
                  : "I was treated with respect and received excellent service at an affordable rate.",
                source: isSpanish ? "Reseña Destacada de Google" : "Google Review Highlight",
              },
              {
                quote: isSpanish
                  ? "La calidad del trabajo es de primera, y su atención al detalle es inigualable."
                  : "The quality of work is top-notch, and his attention to detail is unmatched.",
                source: isSpanish ? "Reseña Destacada de Google" : "Google Review Highlight",
              },
              {
                quote: isSpanish
                  ? "Tienen una buena selección de café y bebidas y una sala de espera cómoda."
                  : "They have a good selection of coffee and drinks and a comfortable waiting room.",
                source: isSpanish ? "Reseña Destacada de Google" : "Google Review Highlight",
              },
            ].map((highlight, i) => (
              <div key={i} className="bg-card border-2 border-border p-6 relative">
                <Quote className="w-8 h-8 text-primary/30 absolute top-4 right-4" />
                <p className="text-lg font-medium italic leading-relaxed pr-6">
                  "{highlight.quote}"
                </p>
                <p className="text-sm text-muted-foreground mt-4">{highlight.source}</p>
              </div>
            ))}
          </div>

          {/* Individual Reviews */}
          {(() => {
            const allReviews = [
              {
                name: "Sinii_balur",
                date: isSpanish ? "Enero 2026" : "January 2026",
                text: isSpanish
                  ? "¿Cansado de ver a su mecánico más que a cualquier otra persona? He venido a estos muchachos desde 2018, sí, la administración ha cambiado, pero no la calidad. Trabajo confiable en todos mis vehículos — ayudan a reducir el estrés de los problemas del carro."
                  : "Tired of seeing your mechanic more than anyone else you know? I've been coming to these guys since 2018, yes, management has changed, but not the quality. Dependable work across all my vehicles — they help reduce the stress of car troubles.",
                rating: 5,
              },
              {
                name: "Marlon Butler",
                badge: "Local Guide",
                date: isSpanish ? "Diciembre 2025" : "December 2025",
                text: isSpanish
                  ? "Traje mi Celica '02 por un ruido en la suspensión delantera. Proporcionaron un resumen completo y comprensible de todos los problemas que necesitaban atención. Excelente comunicación y trabajo de calidad en un carro de 23 años."
                  : "I brought in my '02 Celica for a front suspension noise. They provided a comprehensive, lay-person summary of all the issues needing attention. Excellent communication and quality work on a 23-year-old car.",
                rating: 5,
              },
              {
                name: "JKB",
                badge: "Local Guide",
                date: isSpanish ? "Noviembre 2025" : "November 2025",
                text: isSpanish
                  ? "UN DIAMANTE EN UN CAMPO MINADO. Siendo una mujer mayor y divorciada, me preocupo más que nunca por los problemas automotrices. El equipo proporcionó una experiencia sin estrés con mi Prius 2018. ¡El salón acogedor fue un bonus!"
                  : "A DIAMOND IN A MINEFIELD. Being a senior citizen and a divorced female, I am more worried than ever about dealing with automotive problems. The team provided a stress-free experience with my 2018 Prius. The cozy lounge was a bonus!",
                rating: 5,
              },
              {
                name: "Rick Swanston",
                date: isSpanish ? "Julio 2024" : "July 2024",
                text: isSpanish
                  ? "El servicio valió más que el precio. Todos fueron super amables y profesionales. Casi siento que les robé. No puedo agradecerles lo suficiente por el trabajo sobresaliente."
                  : "The service was more than worth the price. Everyone was super polite and professional. I almost feel like I ripped you guys off. I can't thank you enough for the outstanding work.",
                rating: 5,
              },
              {
                name: isSpanish ? "Cliente Verificado" : "Verified Customer",
                date: "2025",
                text: isSpanish
                  ? "Servicio muy profesional y honesto. Identificaron rápidamente la causa del problema y me explicaron todo claramente. Aprecio su transparencia y precios justos."
                  : "Very professional and honest service. They quickly identified the cause of the problem and clearly explained everything to me. I appreciate their transparency and fair pricing.",
                rating: 5,
              },
              {
                name: isSpanish ? "Cliente Verificado" : "Verified Customer",
                date: "2025",
                text: isSpanish
                  ? "¡Tuve una experiencia sobresaliente con Vertical Auto! Desde el momento que entré, el equipo fue profesional, conocedor y atento a mis necesidades. Altamente recomendado para cualquier reparación automotriz."
                  : "I had an outstanding experience with Vertical Auto! From the moment I walked in, the team was professional, knowledgeable, and attentive to my needs. Highly recommend for any auto repair.",
                rating: 5,
              },
            ];

            const ReviewCard = ({ review, i }: { review: typeof allReviews[0]; i: number }) => (
              <Card key={i} className="p-4 sm:p-6 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-1 mb-2 sm:mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-4 sm:line-clamp-none">
                  "{review.text}"
                </p>
                <div className="border-t border-border pt-2 sm:pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs sm:text-sm">{review.name}</p>
                    {(review as any).badge && (
                      <span className="text-[10px] sm:text-xs text-primary font-medium">{(review as any).badge}</span>
                    )}
                  </div>
                  <span className="text-[10px] sm:text-xs text-muted-foreground">{review.date}</span>
                </div>
              </Card>
            );

            return (
              <>
                {/* Mobile: true lazy render — review cards only mount when expanded */}
                <div className="sm:hidden mb-6">
                  <button
                    onClick={() => setReviewsExpanded(!reviewsExpanded)}
                    className="w-full py-3.5 bg-card border-2 border-primary/30 text-foreground font-bold text-sm flex items-center justify-between px-4 hover:bg-primary/5 transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {t.readReviews}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${reviewsExpanded ? "rotate-180" : ""}`} />
                  </button>
                  {reviewsExpanded && (
                    <div className="space-y-3 pt-3 animate-in fade-in duration-300">
                      {allReviews.map((review, i) => (
                        <ReviewCard key={i} review={review} i={i} />
                      ))}
                    </div>
                  )}
                </div>

                {/* Desktop: all reviews visible */}
                <div className="hidden sm:grid sm:grid-cols-3 gap-6 mb-12">
                  {allReviews.map((review, i) => (
                    <ReviewCard key={i} review={review} i={i} />
                  ))}
                </div>
              </>
            );
          })()}

          {/* CTA to Google Reviews */}
          <div className="text-center">
            <a
              href="https://maps.app.goo.gl/FeCVCCDNZMjGieMEA"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
              >
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {t.seeAllReviews}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* TWO LOCATIONS SECTION — lightweight cards linking to hub pages */}
      <section className="bg-secondary py-12 sm:py-16 border-t border-border" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}>
        <div className="container">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-black uppercase tracking-wider text-foreground">
              {isSpanish ? "NUESTRAS" : "OUR"}{" "}
              <span className="text-primary">{isSpanish ? "UBICACIONES" : "LOCATIONS"}</span>
            </h2>
            <div className="h-1 w-16 bg-primary mx-auto mt-3" />
            <p className="text-muted-foreground text-sm sm:text-base mt-3">
              {isSpanish ? "Dos ubicaciones convenientes para servirle" : "Two convenient locations to serve you"}
            </p>
          </div>

          {/* Location cards — dark design matching Contact Us style */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {/* Fort Lauderdale */}
            <div className="border-2 border-primary/20 bg-secondary/50 p-6 sm:p-8 group hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-primary font-display tracking-wider">
                FORT LAUDERDALE
              </h3>
              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8">
                <a
                  href={LOCATIONS[1].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-2 sm:space-x-3 group/link"
                  onClick={() => trackDirections("Fort Lauderdale", "home_locations_fl")}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-400 text-sm sm:text-base group-hover/link:text-primary transition-colors">
                      707 NE 11th Street
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base group-hover/link:text-primary transition-colors">
                      Fort Lauderdale, FL 33304
                    </p>
                    <span className="text-xs text-primary/70 flex items-center gap-1 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      {isSpanish ? "Abrir en Google Maps" : "Open in Google Maps"}
                    </span>
                  </div>
                </a>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <a
                    href="tel:+16452162266"
                    className="font-medium text-white hover:text-primary transition-colors text-sm sm:text-base"
                    onClick={() => trackCall("Fort Lauderdale", "+16452162266", "home_locations_fl")}
                  >
                    (645) 216-2266
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href="/fort-lauderdale" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-wider text-xs sm:text-sm"
                  >
                    {isSpanish ? "VER UBICACIÓN" : "VIEW LOCATION"}
                  </Button>
                </Link>
              </div>
            </div>

            {/* Wilton Manors */}
            <div className="border-2 border-primary/20 bg-secondary/50 p-6 sm:p-8 group hover:border-primary/50 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 text-primary font-display tracking-wider">
                WILTON MANORS
              </h3>
              <div className="space-y-3 sm:space-y-4 mb-5 sm:mb-8">
                <a
                  href={LOCATIONS[0].directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start space-x-2 sm:space-x-3 group/link"
                  onClick={() => trackDirections("Wilton Manors", "home_locations_wm")}
                >
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-400 text-sm sm:text-base group-hover/link:text-primary transition-colors">
                      1100 W Oakland Park Blvd, Bay 5
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base group-hover/link:text-primary transition-colors">
                      Wilton Manors, FL 33311
                    </p>
                    <span className="text-xs text-primary/70 flex items-center gap-1 mt-1">
                      <ExternalLink className="w-3 h-3" />
                      {isSpanish ? "Abrir en Google Maps" : "Open in Google Maps"}
                    </span>
                  </div>
                </a>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <a
                    href="tel:+19545651518"
                    className="font-medium text-white hover:text-primary transition-colors text-sm sm:text-base"
                    onClick={() => trackCall("Wilton Manors", "+19545651518", "home_locations_wm")}
                  >
                    (954) 565-1518
                  </a>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href="/wilton-manors" className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold uppercase tracking-wider text-xs sm:text-sm"
                  >
                    {isSpanish ? "VER UBICACIÓN" : "VIEW LOCATION"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Sticky Mobile Bottom CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 sm:hidden bg-secondary/95 backdrop-blur-sm border-t-2 border-primary/30 px-3 py-2 flex gap-2">
        <div className="flex-1">
          <Button
            variant="outline"
            onClick={() => setCallDialogOpen(true)}
            className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold py-2 gap-1 flex items-center justify-center h-auto"
          >
            <Phone className="w-4 h-4" />
            <span className="text-xs font-bold tracking-wider">{isSpanish ? "LLAMAR" : "CALL NOW"}</span>
          </Button>
        </div>
        <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" className="flex-1" onClick={() => trackSchedule("home_sticky_bar")}>
          <Button
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-xs py-2 h-full"
          >
            {t.schedule}
          </Button>
        </a>
      </div>

      {/* Bottom spacer for sticky bar on mobile */}
      <div className="h-16 sm:hidden" />

       {/* Call Now Dialog — lazy-loaded, only fetched when opened */}
      <Suspense fallback={null}>
        <CallNowDialog
          open={callDialogOpen}
          onClose={() => setCallDialogOpen(false)}
          source="home_sticky_bar"
        />
      </Suspense>
      {/* Location Picker Modal — lazy-loaded, only fetched when opened */}
      <Suspense fallback={null}>
        <LocationPickerModal
          open={!!locationPickerService}
          onClose={() => setLocationPickerService(null)}
          serviceSlug={locationPickerService?.slug ?? ""}
          serviceName={locationPickerService?.name ?? ""}
          langPrefix={prefix}
        />
      </Suspense>
    </div>
  );
}

/** Returns SEO-optimized alt text for vehicle category images */
function vehicleAltText(slug: string, index: number): string {
  const alts: Record<string, string[]> = {
    "tesla-vehicles-service": [
      "Tesla and EV repair Fort Lauderdale and Wilton Manors",
      "Tesla Model X frunk open at Vertical Automotive service bay",
      "Tesla drive unit gearbox internals — EV specialist Fort Lauderdale",
      "Tesla battery fuse replacement with laptop diagnostics",
      "Tesla high-voltage battery service Wilton Manors",
      "Tesla service mode diagnostic scan Fort Lauderdale",
    ],
    "asian-vehicles-service": [
      "Asian vehicle repair Wilton Manors — Toyota, Honda, Lexus, Acura",
      "Acura NSX on lift at Vertical Automotive Fort Lauderdale",
      "Lexus hood open engine inspection Wilton Manors",
      "Lexus SC convertible auto repair Fort Lauderdale",
      "Toyota Tacoma wheel alignment service South Florida",
      "Lexus IS on dyno — Asian car specialist Fort Lauderdale",
    ],
    "european-vehicles-service": [
      "European car repair Fort Lauderdale — BMW, Mercedes, Porsche, Audi",
      "Porsche 911 service at Vertical Automotive Wilton Manors",
      "Range Rover repair Fort Lauderdale",
      "BMW M2 auto repair South Florida",
      "Porsche Cayenne service Fort Lauderdale",
      "Maserati repair Wilton Manors",
    ],
    "domestic-vehicles-service": [
      "Domestic car repair Fort Lauderdale — Ford, Chevrolet, Dodge",
      "Dodge Charger auto repair Wilton Manors",
      "Classic Plymouth Fury restoration Fort Lauderdale",
      "Ford Raptor truck service South Florida",
      "Dodge Challenger repair Fort Lauderdale",
      "Plymouth Barracuda classic car service Wilton Manors",
    ],
  };
  const list = alts[slug];
  if (!list) return `${slug.replace(/-/g, " ")} auto repair Fort Lauderdale`;
  return list[index] ?? list[0];
}

/**
 * VehicleTypeCard — Shows a vehicle category card with optional rotating photo gallery.
 * For types with a gallery array (e.g., Tesla), images rotate every 4 seconds.
 * All images get a subtle dark/blue filter to match the site's industrial theme.
 */
function VehicleTypeCard({ type, servicesPath, onClickTile, isFirst }: { type: VehicleType; servicesPath: string; onClickTile?: (slug: string, name: string) => void; isFirst?: boolean }) {
  const gallery = type.gallery;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Only start the gallery rotation when the card enters the viewport
  useEffect(() => {
    if (!cardRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin: '200px' }
    );
    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !gallery || gallery.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, gallery]);

  const currentImage = gallery && gallery.length > 0 ? gallery[currentIndex] : type.image;
  const hasGallery = gallery && gallery.length > 1;

  const handleClick = (e: React.MouseEvent) => {
    if (onClickTile) {
      e.preventDefault();
      onClickTile(type.slug, type.title);
    }
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className="group relative aspect-[4/3] overflow-hidden bg-card hover:shadow-2xl transition-all duration-300 cursor-pointer"
    >
      {/* Image with crossfade for gallery types.
         Batch D optimization: only render current + next image (2 per card instead of 6).
         This reduces total DOM images from 24 to 8, cutting High-priority image requests. */}
      {hasGallery ? (
        <div className="w-full h-full relative">
          {(() => {
            // Only render the current visible image and the next one (for smooth crossfade)
            const nextIndex = (currentIndex + 1) % gallery.length;
            const indicesToRender = [currentIndex, nextIndex];
            // Deduplicate if gallery has only 1 image
            const uniqueIndices = Array.from(new Set(indicesToRender));
            return uniqueIndices.map((i) => (
              <img
                key={`${type.slug}-${i}`}
                src={gallery[i]}
                alt={vehicleAltText(type.slug, i)}
                loading="lazy"
                width={800}
                height={600}
                decoding="async"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  i === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ filter: 'brightness(0.75) saturate(0.9)' }}
              />
            ));
          })()}
        </div>
      ) : (
        <OptimizedImage
          src={currentImage}
          alt={vehicleAltText(type.slug, 0)}
          width={400}
          height={300}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          style={{
            ...(type.slug === 'asian-vehicles-service' ? { transform: 'scaleX(-1)' } : {}),
          }}
          sizes="(max-width: 640px) 50vw, 25vw"
        />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

      {/* Blue tint overlay for real photos */}
      {hasGallery && (
        <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
      )}

      {/* Title */}
      <div className="absolute inset-0 flex items-end p-3 sm:p-6">
        <div>
          <h3 className="text-sm sm:text-2xl font-black text-secondary-foreground leading-tight">
            {type.title}
          </h3>
          {/* Gallery dots indicator */}
          {hasGallery && (
            <div className="flex gap-1 mt-1.5">
              {gallery.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex ? 'bg-primary w-3' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top accent bar on hover */}
      <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}


