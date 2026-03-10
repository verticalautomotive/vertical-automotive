/**
 * Services Index Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography, grid layout
 * MOBILE: Compact spacing, 2-col grids, smaller text
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { trackSchedule } from "@/lib/gtm";
import ServiceIcon from "@/components/ServiceIcon";
import { useTranslation } from "@/hooks/useTranslation";

export default function ServicesPage() {
  const { isSpanish, servicesPath, services, vehicleTypes, servicesPageExtra, ui } = useTranslation();

  const t = ui?.servicesPage ?? {
    ourServices: "OUR SERVICES",
    completeAutoCare: "COMPLETE",
    complete: "AUTO CARE",
    readyToSchedule: "READY TO SCHEDULE?",
    bookOnline: "Book your appointment online or call us today",
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={isSpanish
          ? "Servicios | Vertical Automotive Fort Lauderdale"
          : "Services | Vertical Automotive Fort Lauderdale"}
        description={isSpanish
          ? "Frenos, transmisión, A/C, aceite, diagnósticos, dirección y servicio EV en Fort Lauderdale. Técnicos ASE. Garantía de 3 años."
          : "Brakes, transmission, A/C, oil change, diagnostics, steering & EV service in Fort Lauderdale. ASE-certified. 3-year warranty."}
        keywords={isSpanish
          ? "servicios automotrices Fort Lauderdale, frenos, transmisión, aire acondicionado, cambio de aceite, diagnóstico motor, reparación Tesla"
          : "auto repair services Fort Lauderdale, brakes, transmission, AC repair, oil change, engine diagnostics, Tesla service"}
      />
      <Navigation />

      <PageHero
        title={isSpanish ? t.ourServices : "OUR SERVICES"}
        subtitle={servicesPageExtra.subtitle}
      />

      {/* Vehicle Types */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            {servicesPageExtra.heading}
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {vehicleTypes.map((vt) => (
              <Link
                key={vt.slug}
                href={`${servicesPath}/${vt.slug}`}
                className="glass-image group relative aspect-[4/3] bg-card"
              >
                <img
                  src={vt.image}
                  alt={vt.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 flex items-end p-3 sm:p-6">
                  <h3 className="text-sm sm:text-2xl font-black text-secondary-foreground leading-tight">
                    {vt.title}
                  </h3>
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid — mobile: compact icon+title tiles, Desktop: 3-col cards */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            {t.completeAutoCare} <span className="text-primary">{t.complete}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          {/* Mobile: compact 3-col icon tiles */}
          <div className="grid grid-cols-3 gap-2 sm:hidden">
            {services.map((service) => (
              <Link key={service.slug} href={`${servicesPath}/${service.slug}`}>
                <div className="glass-compact flex flex-col items-center text-center p-2.5 hover:border-primary/30 group cursor-pointer">
                  <div className="w-7 h-7 mb-1.5 glass-icon">
                    <ServiceIcon name={service.icon} />
                  </div>
                  <span className="text-[10px] font-bold leading-tight group-hover:text-primary transition-colors">{service.shortTitle}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop: 3-col full cards */}
          <div className="hidden sm:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link key={service.slug} href={`${servicesPath}/${service.slug}`}>
                <div className="glass-wrap h-full">
                  <Card className="glass-card p-8 cursor-pointer h-full group">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight relative z-[2]">
                      {service.shortTitle}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed relative z-[2]">
                      {service.description}
                    </p>
                  </Card>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-10 sm:py-20 bg-secondary text-secondary-foreground">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-start">
            <div>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
                {servicesPageExtra.bottomSection.title.toUpperCase()}
              </h2>
              <div className="h-1 w-16 sm:w-24 bg-primary mb-4 sm:mb-8" />
              <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">
                {servicesPageExtra.bottomSection.description}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              {servicesPageExtra.bottomSection.list.map((item) => (
                <div key={item} className="flex items-center space-x-2 sm:space-x-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-16 bg-primary text-primary-foreground text-center">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
            {t.readyToSchedule}
          </h2>
          <p className="text-sm sm:text-lg mb-4 sm:mb-8 opacity-90">
            {t.bookOnline}
          </p>
          <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSchedule("services_cta")}>
            <Button
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
            >
              {isSpanish ? "AGENDAR CITA" : "SCHEDULE APPOINTMENT"}
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
