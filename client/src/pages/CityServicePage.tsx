/**
 * CityServicePage — Dynamic city-specific service landing pages
 * 32 pages: 16 services × 2 locations (Fort Lauderdale + Wilton Manors)
 * Each page has unique content, LocalBusiness schema, FAQ schema, and internal linking
 * Updated: expanded What's Included with title + description + pricing,
 *          Why Choose Us with title + description cards
 */

import { useParams, useLocation } from "wouter";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { Phone, MapPin, CheckCircle, ArrowRight, DollarSign, Shield, Award, Wrench, Star, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import NotFound from "./NotFound";
import { getCityPage, type ServiceItem, type WhyChooseItem } from "@/data/city-pages";
import { useTranslation } from "@/hooks/useTranslation";
import { trackCall, trackSchedule } from "@/lib/gtm";

// Reviews shown on every service page — same pool as location pages
const REVIEWS = [
  { name: "David M.", rating: 5, text: "Best auto shop in Fort Lauderdale. They diagnosed my BMW correctly the first time — other shops had it wrong for months. Honest, professional, and fast.", textEs: "El mejor taller en Fort Lauderdale. Le diagnosticaron el BMW bien desde la primera — otros talleres anduvieron equivocados por meses. Honestos, profesionales y rápidos.", date: "2025" },
  { name: "Sarah K.", rating: 5, text: "Brought my Tesla Model 3 in for brake service. Half the price of the Tesla Service Center and done same day. Highly recommend.", textEs: "Llevé el Tesla Model 3 para los frenos. La mitad del precio del Centro de Servicio Tesla y lo tuvieron listo el mismo día. Los recomiendo al 100%.", date: "2025" },
  { name: "Carlos R.", rating: 5, text: "My A/C went out in July — worst timing. They got me in next day, fixed it in a few hours, and the price was very fair. 5 stars.", textEs: "Se me dañó el A/C en julio — el peor momento. Me dieron cita al día siguiente, lo arreglaron en pocas horas y el precio fue muy justo. 5 estrellas.", date: "2024" },
  { name: "Jennifer L.", rating: 5, text: "I've been coming here for 8 years. They always explain exactly what's wrong and why. Never felt pressured. Best shop in Broward.", textEs: "Llevo 8 años trayendo el carro aquí. Siempre te explican exactamente qué tiene y por qué. Nunca te presionan. El mejor taller en Broward.", date: "2024" },
  { name: "Michael T.", rating: 5, text: "Transmission service on my Audi A4. Vertical Automotive knew exactly what fluid to use and the procedure. Dealership wanted $800 more for the same job.", textEs: "Le hicieron el servicio de transmisión al Audi A4. Sabían exactamente qué fluido usar. El concesionario pedía $800 más por el mismo trabajo. Aquí lo hicieron bien y más barato.", date: "2025" },
  { name: "Ana G.", rating: 5, text: "Friendly staff, clean shop, honest pricing. They fixed my Prius hybrid battery issue that two other shops couldn't diagnose. Incredible.", textEs: "Buen trato, taller limpio y precios honestos. Le arreglaron el problema de la batería híbrida al Prius que dos talleres no pudieron diagnosticar. Increíble.", date: "2024" },
];

export default function CityServicePage() {
  const { service } = useParams<{ service: string }>();
  const [location] = useLocation();
  const { isSpanish } = useTranslation();
  const [reviewsExpanded, setReviewsExpanded] = useState(false);

  // Derive city from pathname (supports both /city/service and /es/city/service)
  const pathWithoutLang = location.startsWith("/es/") ? location.slice(3) : location;
  const normalizedCity = pathWithoutLang.startsWith("/fort-lauderdale/")
    ? "fort-lauderdale"
    : pathWithoutLang.startsWith("/wilton-manors/")
    ? "wilton-manors"
    : null;

  if (!normalizedCity || !service) {
    return <NotFound />;
  }

  const page = getCityPage(normalizedCity, service);

  if (!page) {
    return <NotFound />;
  }

  const title = isSpanish ? page.titleTagEs : page.titleTag;
  const description = isSpanish ? page.metaDescriptionEs : page.metaDescription;
  const h1 = isSpanish ? page.h1Es : page.h1;
  const subheading = isSpanish ? page.subheadingEs : page.subheading;
  const introText = isSpanish ? page.introTextEs : page.introText;
  const vehiclesWeService = isSpanish ? page.vehiclesWeServiceEs : page.vehiclesWeService;
  const directions = isSpanish ? page.directionsEs : page.directions;

  const canonicalUrl = `https://verticalautomotive.com/${normalizedCity}/${service}/`;
  const canonicalUrlEs = `https://verticalautomotive.com/es/${normalizedCity}/${service}/`;

  // LocalBusiness JSON-LD Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Vertical Automotive",
    url: canonicalUrl,
    telephone: page.phone,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: page.address.split(",")[0],
      addressLocality: page.cityDisplay,
      addressRegion: "FL",
      postalCode: page.zipCode,
      addressCountry: "US",
    },
    openingHours: "Mo-Fr 08:00-17:00",
    areaServed: page.cityDisplay,
    serviceType: page.serviceName,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "516",
      bestRating: "5",
    },
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: isSpanish ? item.questionEs : item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: isSpanish ? item.answerEs : item.answer,
      },
    })),
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://verticalautomotive.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.cityDisplay,
        item: `https://verticalautomotive.com/${normalizedCity}/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: page.serviceName,
        item: canonicalUrl,
      },
    ],
  };

  // Helper to get localized service item text
  const getServiceItemTitle = (item: ServiceItem) => isSpanish ? item.titleEs : item.title;
  const getServiceItemDesc = (item: ServiceItem) => isSpanish ? item.descriptionEs : item.description;
  const getWhyTitle = (item: WhyChooseItem) => isSpanish ? item.titleEs : item.title;
  const getWhyDesc = (item: WhyChooseItem) => isSpanish ? item.descriptionEs : item.description;

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={title}
        description={description}
        canonical={isSpanish ? canonicalUrlEs : canonicalUrl}
        keywords={`${page.serviceName.toLowerCase()} ${page.cityDisplay}, ${page.serviceName.toLowerCase()} near me, ASE certified mechanic`}
      />

      {/* LocalBusiness JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center bg-secondary text-secondary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="container max-w-5xl relative z-10 py-12 sm:py-20">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 leading-tight">{h1}</h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl">{subheading}</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Button
              size="lg"
              onClick={() => {
                trackSchedule("city-service-page");
                window.open("https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049", "_blank");
              }}
            >
              {isSpanish ? 'Agendar Cita' : 'Schedule Service'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                trackCall(page.cityDisplay, page.phone, "city-service-page");
                window.location.href = `tel:${page.phone}`;
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isSpanish ? 'Llamar' : 'Call'} {page.phone}
            </Button>
          </div>
          {/* Credential badges — BMW Factory Trained shown only on European page */}
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {isSpanish ? 'Certificado ASE' : 'ASE Certified'}
            </span>
            {page.serviceSlug === 'european-vehicle-repair' && (
              <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
                <Shield className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                {isSpanish ? 'Entrenado por Fábrica BMW' : 'BMW Factory Trained'}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">
              <CheckCircle className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              {isSpanish ? 'Garantía 3 Años' : '3-Year Warranty'}
            </span>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container max-w-5xl">
          <p className="text-base sm:text-lg leading-relaxed text-muted-foreground mb-8 sm:mb-12">{introText}</p>
        </div>
      </section>

      {/* Photo Gallery — shown only on vehicle-type pages that have gallery images */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="py-10 sm:py-16 bg-muted">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">
              {isSpanish ? "Nuestro Taller en Acción" : "Our Shop in Action"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {isSpanish
                ? `Vehículos reales servidos por nuestros técnicos certificados ASE en ${page.cityDisplay}.`
                : `Real vehicles serviced by our ASE-certified technicians in ${page.cityDisplay}.`}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {page.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg bg-secondary aspect-[4/3] group"
                >
                  <img
                    src={imgUrl}
                    alt={page.galleryAlt?.[idx] || `${page.serviceName} at Vertical Automotive ${page.cityDisplay}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Gallery — shown only on pages that have videos */}
      {page.videos && page.videos.length > 0 && (
        <section className="py-10 sm:py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">
              {isSpanish ? "Videos de Nuestro Taller" : "Shop Videos"}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">
              {isSpanish
                ? `Mira a nuestros técnicos en acción en ${page.cityDisplay}.`
                : `Watch our technicians at work in ${page.cityDisplay}.`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {page.videos.map((videoUrl, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden rounded-lg bg-secondary aspect-video"
                >
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    muted
                    preload="metadata"
                    className="w-full h-full object-cover"
                    aria-label={page.videosAlt?.[idx] || `${page.serviceName} video at Vertical Automotive ${page.cityDisplay}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What's Included — expanded with title, description, and pricing */}
      {page.whatIncluded.length > 0 && (
        <section className="py-10 sm:py-16 bg-muted">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">
              {isSpanish ? "Qué Incluye Nuestro" : "What's Included in Our"} {page.serviceName}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {page.whatIncluded.map((item: ServiceItem, idx: number) => (
                <Card key={idx} className="p-4 sm:p-5 border border-border bg-background hover:border-primary/30 transition-colors">
                  <div className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="mb-1.5">
                        <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight">
                          {getServiceItemTitle(item)}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {getServiceItemDesc(item)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us — expanded with title + description cards */}
      {page.whyChooseUs.length > 0 && (
        <section className="py-10 sm:py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8">
              {isSpanish
                ? `¿Por Qué Elegir Vertical Automotive en ${page.cityDisplay}?`
                : `Why Choose Vertical Automotive in ${page.cityDisplay}?`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {page.whyChooseUs.map((item: WhyChooseItem, idx: number) => (
                <Card key={idx} className="p-5 sm:p-6 border border-border hover:border-primary/30 transition-colors">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {idx % 4 === 0 && <Award className="w-4 h-4 text-primary" />}
                      {idx % 4 === 1 && <Shield className="w-4 h-4 text-primary" />}
                      {idx % 4 === 2 && <Wrench className="w-4 h-4 text-primary" />}
                      {idx % 4 === 3 && <DollarSign className="w-4 h-4 text-primary" />}
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1.5">
                        {getWhyTitle(item)}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {getWhyDesc(item)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What to Expect Section */}
      <section className="py-10 sm:py-16 bg-background">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-3">
            {isSpanish ? "QUÉ ESPERAR" : "WHAT TO"} <span className="text-primary">{isSpanish ? "" : "EXPECT"}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mb-8 sm:mb-12" />

          {/* Process Steps */}
          <div className="mb-10 sm:mb-16">
            <h3 className="text-lg sm:text-xl font-bold mb-6 text-secondary-foreground">
              {isSpanish ? "Nuestro Proceso de Servicio" : "Our Service Process"}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">1</div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">{isSpanish ? "Inspección y Diagnóstico" : "Inspection & Diagnosis"}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{isSpanish ? "Realizamos una inspección exhaustiva usando herramientas de diagnóstico de nivel de fábrica." : "We perform a thorough inspection using factory-level diagnostic tools to identify all issues."}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">2</div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">{isSpanish ? "Presupuesto Transparente" : "Transparent Estimate"}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{isSpanish ? "Proporcionamos un presupuesto detallado mostrando exactamente qué necesita reparación." : "We provide a detailed estimate showing exactly what needs repair and what can wait."}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">3</div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">{isSpanish ? "Reparación Experta" : "Expert Repair"}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{isSpanish ? "Nuestros técnicos certificados ASE realizan reparaciones usando piezas y equipos de grado profesional." : "Our ASE-certified technicians perform repairs using professional-grade parts and equipment."}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-black text-sm">4</div>
                <div>
                  <h4 className="font-bold text-sm sm:text-base mb-1">{isSpanish ? "Garantía de Calidad" : "Quality Assurance"}</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">{isSpanish ? "Probamos y verificamos todas las reparaciones, respaldadas por nuestra garantía de 36 meses." : "We test and verify all repairs, backed by our 36,000-mile / 36-month warranty."}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-secondary text-secondary-foreground rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4">{isSpanish ? "Cronograma Típico" : "Typical Timeline"}</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Servicios simples (cambio de aceite, batería): 30–60 min" : "Simple services (oil change, battery): 30–60 min"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Servicio de frenos o A/C: 1–3 horas" : "Brake or A/C service: 1–3 hours"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Trabajo de transmisión o motor: 4–8 horas" : "Transmission or engine work: 4–8 hours"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Diagnóstico complejo: 1–2 horas" : "Complex diagnostics: 1–2 hours"}</span></li>
              </ul>
            </div>
            <div className="p-6 sm:p-8 bg-secondary text-secondary-foreground rounded-lg">
              <h3 className="text-lg sm:text-xl font-bold mb-4">{isSpanish ? "Rangos de Precios" : "Pricing Ranges"}</h3>
              <ul className="space-y-3 text-sm sm:text-base">
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Mantenimiento: $100–$300" : "Maintenance: $100–$300"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Reparaciones menores: $200–$600" : "Minor repairs: $200–$600"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Reparaciones mayores: $600–$2,000+" : "Major repairs: $600–$2,000+"}</span></li>
                <li className="flex gap-3"><span className="text-primary font-bold">•</span> <span>{isSpanish ? "Llame para presupuesto exacto: (954) 565-1518" : "Call for exact quote: (954) 565-1518"}</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vehicles We Service */}
      {vehiclesWeService.length > 0 && (
        <section className="py-10 sm:py-16 bg-muted">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8">
              {isSpanish ? "Vehículos Que Servimos" : "Vehicles We Service"}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {vehiclesWeService.map((vehicle: string, idx: number) => (
                <div key={idx} className="bg-background rounded-lg p-3 sm:p-4 text-center">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">{vehicle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {page.faq.length > 0 && (
        <section className="py-10 sm:py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8">
              {isSpanish ? "Preguntas Frecuentes" : "Frequently Asked Questions"}
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {page.faq.map((item, idx) => (
                <Card key={idx} className="p-4 sm:p-6 border border-border">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
                    {isSpanish ? item.questionEs : item.question}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {isSpanish ? item.answerEs : item.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Real World Story — shown when page has a customer story */}
      {page.realWorldStory && !isSpanish && (
        <section className="py-10 sm:py-16 bg-secondary text-secondary-foreground">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">
              Real Work, Real Results
            </h2>
            <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 text-sm sm:text-base leading-relaxed text-secondary-foreground/90 italic">
              {page.realWorldStory}
            </blockquote>
          </div>
        </section>
      )}

      {/* Location & Directions */}
      <section className="py-10 sm:py-16 bg-muted">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8">
            {isSpanish ? "Ubicación y Direcciones" : "Location & Directions"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <div className="flex gap-3 mb-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm sm:text-base">{page.address}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    {isSpanish ? "Lunes–Viernes 8:00 AM – 5:00 PM" : "Monday–Friday 8:00 AM – 5:00 PM"}
                  </p>
                </div>
              </div>
              <div className="flex gap-3 mb-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0 mt-0.5" />
                <a href={`tel:${page.phone}`} className="text-primary hover:underline text-sm sm:text-base font-semibold">
                  {page.phone}
                </a>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-4">{directions}</p>
            </div>
            <div className="bg-background rounded-lg overflow-hidden h-64 sm:h-80">
              <iframe
                width="100%"
                height="100%"
                frameBorder={0 as any}
                src={
                  normalizedCity === "fort-lauderdale"
                    ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.2447356890626!2d-80.13559!3d26.139035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9129f7b5c5c5d%3A0x1234567890abcdef!2s707%20NE%2011th%20St%2C%20Fort%20Lauderdale%2C%20FL%2033304!5e0!3m2!1sen!2sus!4v1234567890"
                    : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3516.2447356890626!2d-80.15759!3d26.165788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9128c5c5c5c5d%3A0x1234567890abcdef!2s1100%20W%20Oakland%20Park%20Blvd%20Unit%205%2C%20Wilton%20Manors%2C%20FL%2033311!5e0!3m2!1sen!2sus!4v1234567890"
                }
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {page.relatedServices.length > 0 && (
        <section className="py-10 sm:py-16 bg-background">
          <div className="container max-w-5xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-6 sm:mb-8">
              {isSpanish
                ? `Servicios Relacionados en ${page.cityDisplay}`
                : `Related Services in ${page.cityDisplay}`}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {page.relatedServices.map((related, idx) => (
                <Link key={idx} href={`${isSpanish ? '/es' : ''}/${normalizedCity}/${related.serviceSlug}`}>
                  <div className="group block p-4 sm:p-6 bg-muted rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                    <p className="font-semibold text-sm sm:text-base mb-2 group-hover:text-primary transition-colors">
                      {related.serviceName}
                    </p>
                    <div className="flex items-center gap-2 text-primary text-xs sm:text-sm">
                      {isSpanish ? "Ver Más" : "Learn More"} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      <section id="reviews" className="py-10 sm:py-20 bg-muted">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-6 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4">
              {isSpanish ? "RESEÑAS DE" : "CUSTOMER"}{" "}
              <span className="text-primary">{isSpanish ? "CLIENTES" : "REVIEWS"}</span>
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
              {isSpanish ? "Basado en" : "Based on"}{" "}
              <span className="font-bold text-foreground">516 {isSpanish ? "Reseñas de Google" : "Google Reviews"}</span>
            </p>
          </div>
          {/* Mobile: collapsible */}
          <div className="sm:hidden mb-6">
            <button
              onClick={() => setReviewsExpanded(!reviewsExpanded)}
              className="w-full py-3.5 bg-card border-2 border-primary/30 text-foreground font-bold text-sm flex items-center justify-between px-4 hover:bg-primary/5 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                {isSpanish ? "Leer Reseñas de Clientes" : "Read Customer Reviews"}
              </span>
              <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-300 ${reviewsExpanded ? "rotate-180" : ""}`} />
            </button>
            <div
              className="overflow-hidden transition-all duration-500 ease-in-out"
              style={{ maxHeight: reviewsExpanded ? "3000px" : "0px", opacity: reviewsExpanded ? 1 : 0 }}
            >
              <div className="space-y-3 pt-3">
                {REVIEWS.map((review, i) => (
                  <Card key={i} className="p-4 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(review.rating)].map((_, j) => (
                        <Star key={j} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-xs leading-relaxed mb-3 line-clamp-4">
                      "{isSpanish ? review.textEs : review.text}"
                    </p>
                    <div className="border-t border-border pt-2 flex items-center justify-between">
                      <p className="font-bold text-xs">{review.name}</p>
                      <span className="text-[10px] text-muted-foreground">{review.date}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          {/* Desktop: 3-col grid */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6 mb-12">
            {REVIEWS.map((review, i) => (
              <Card key={i} className="p-6 bg-card border-2 border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-4">
                  "{isSpanish ? review.textEs : review.text}"
                </p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <p className="font-bold text-sm">{review.name}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </Card>
            ))}
          </div>
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
                {isSpanish ? "VER LAS 516 RESEÑAS EN GOOGLE" : "SEE ALL 516 REVIEWS ON GOOGLE"}
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-10 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container max-w-5xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-4 sm:mb-6">
            {isSpanish
              ? `¿Listo para Agendar tu ${page.serviceName} en ${page.cityDisplay}?`
              : `Ready to Schedule Your ${page.serviceName} in ${page.cityDisplay}?`}
          </h2>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 opacity-90">
            {isSpanish
              ? `Abierto lunes–viernes 8 AM–5 PM en ${page.address}`
              : `Open Monday–Friday 8 AM–5 PM at ${page.address}`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                trackSchedule("city-service-cta-banner");
                window.open("https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049", "_blank");
              }}
            >
              {isSpanish ? "Agendar Cita" : "Book Online"}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                trackCall(page.cityDisplay, page.phone, "city-service-cta-banner");
                window.location.href = `tel:${page.phone}`;
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              {isSpanish ? 'Llamar' : 'Call'} {page.phone}
            </Button>
          </div>
        </div>
      </section>

      {/* Cross-Location Banner */}
      <section className="py-8 sm:py-12 bg-secondary text-secondary-foreground border-t border-border">
        <div className="container max-w-5xl">
          {normalizedCity === "fort-lauderdale" ? (
            <div className="text-center">
              <p className="text-sm sm:text-base mb-3">
                {isSpanish
                  ? "También disponible en nuestra ubicación de Wilton Manors"
                  : "Also available at our Wilton Manors location"}
              </p>
              <Link href={`${isSpanish ? '/es' : ''}/wilton-manors/${service}`}>
                <Button variant="outline" className="text-xs sm:text-sm">
                  {isSpanish ? "Ver en Wilton Manors" : "View in Wilton Manors"} — (954) 565-1518
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm sm:text-base mb-3">
                {isSpanish
                  ? "También disponible en nuestra ubicación de Fort Lauderdale"
                  : "Also available at our Fort Lauderdale location"}
              </p>
              <Link href={`${isSpanish ? '/es' : ''}/fort-lauderdale/${service}`}>
                <Button variant="outline" className="text-xs sm:text-sm">
                  {isSpanish ? "Ver en Fort Lauderdale" : "View in Fort Lauderdale"} — (645) 216-2266
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
