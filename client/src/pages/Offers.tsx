/**
 * Offers / Coupons Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography, card grid + printable coupons
 * MOBILE: Compact 2-col grids, smaller text, reduced spacing
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useTranslation } from "@/hooks/useTranslation";
import { trackClaimOffer } from "@/lib/gtm";

export default function OffersPage() {
  const { isSpanish, offers, coupons, ui } = useTranslation();

  const t = ui?.offersPage ?? {
    title: "OFFERS & COUPONS",
    subtitle: "Save on quality auto care with our exclusive promotions",
    currentOffers: "CURRENT",
    current: "OFFERS",
    scheduleToday: "Schedule your appointment to claim these exclusive offers",
    printableCoupons: "PRINTABLE",
    printable: "COUPONS",
    printCoupon: "Print Coupon",
    claimOffer: "CLAIM OFFER",
  };

  const handlePrint = (title: string) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>${isSpanish ? "Cupón" : "Coupon"} - ${title}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; text-align: center; }
            h1 { font-size: 28px; margin-bottom: 10px; }
            p { font-size: 16px; color: #555; }
            .border { border: 3px dashed #ccc; padding: 40px; margin: 20px; }
            .brand { font-size: 14px; color: #999; margin-top: 20px; }
          </style>
          </head>
          <body>
            <div class="border">
              <h1>${title}</h1>
              <p>Vertical Automotive</p>
              <p class="brand">verticalautomotive.com</p>
            </div>
            <script>window.print();<\/script>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <SEO
        title={isSpanish
          ? "Cupones y Ofertas Auto Fort Lauderdale | Vertical Automotive"
          : "Auto Repair Deals Fort Lauderdale | Coupons & Offers"}
        description={isSpanish
          ? "Ahorre en su próxima visita con cupones exclusivos de Vertical Automotive. Inspección de frenos gratis, cambio de aceite, descuentos en alineación y más. Fort Lauderdale y Wilton Manors."
          : "Save on your next visit with exclusive Vertical Automotive coupons. Free brake inspection, oil change deals, alignment discounts & more. Fort Lauderdale & Wilton Manors."}
        keywords={isSpanish
          ? "cupones reparación auto Fort Lauderdale, ofertas cambio aceite, descuento frenos, taller económico Wilton Manors"
          : "auto repair coupons Fort Lauderdale, oil change deals near me, brake discount Wilton Manors, affordable mechanic Broward County"}
        canonical={isSpanish ? "https://verticalautomotive.com/es/ofertas" : "https://verticalautomotive.com/offers"}
      />
      <Navigation />

      <PageHero
        title={t.title}
        subtitle={t.subtitle}
      />

      {/* SEO Intro Section */}
      <section className="py-6 sm:py-12 bg-accent/5 border-b border-border">
        <div className="container max-w-3xl">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {isSpanish
              ? "Busca ofertas de reparación de autos cerca de ti en Fort Lauderdale? Vertical Automotive ofrece cupones exclusivos y descuentos en servicios de reparación de autos. Desde cambios de aceite económicos hasta inspecciones de frenos gratis, nuestras promociones te ayudan a ahorrar en mantenimiento de vehículos de calidad."
              : "Looking for auto repair deals near you in Fort Lauderdale? Vertical Automotive offers exclusive coupons and discounts on auto service & repairs. From budget-friendly oil changes to free brake inspections, our promotions help you save on quality vehicle maintenance."}
          </p>
        </div>
      </section>

      {/* Current Offers */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            {t.currentOffers} <span className="text-primary">{t.current}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-2 sm:mb-4" />
          <p className="text-center text-xs sm:text-base text-muted-foreground mb-6 sm:mb-12">
            {t.scheduleToday}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {offers.map((offer, index) => (
              <a
                key={index}
                href={COMPANY.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackClaimOffer(offer.title, "offers_page")}
                className="group block relative overflow-hidden rounded-lg min-h-[260px] sm:min-h-[320px] cursor-pointer"
              >
                {/* Background image */}
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                {/* Blue accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                {/* Badge */}
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-2.5 py-0.5 text-[10px] font-black tracking-widest uppercase">
                  {offer.badge}
                </div>
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6">
                  {/* Value — big marketing number */}
                  <div className="text-3xl sm:text-5xl font-black text-white mb-1 sm:mb-2 leading-none mono-number drop-shadow-lg">
                    {offer.value}
                  </div>
                  <h3 className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 leading-tight">
                    {offer.title}
                  </h3>
                  <p className="text-[11px] sm:text-sm text-white/75 mb-3 sm:mb-4 leading-snug">
                    {offer.description}
                  </p>
                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-black uppercase tracking-wider px-4 py-2 text-[11px] sm:text-sm w-fit transition-all group-hover:bg-white group-hover:text-black">
                    {t.claimOffer}
                    <span className="text-base leading-none">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Printable Coupons */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            {t.printableCoupons} <span className="text-primary">{t.printable}</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto">
            {coupons.map((coupon, index) => (
              <div
                key={index}
                className="glass-coupon border-2 border-dashed border-border/50 p-4 sm:p-8 text-center"
              >
                <h3 className="text-sm sm:text-xl font-bold mb-1 sm:mb-2">{coupon.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-4 whitespace-pre-line">
                  {coupon.description}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mb-3 sm:mb-6">
                  {coupon.expiry}
                </p>
                <button
                  onClick={() => handlePrint(coupon.title)}
                  className="inline-flex items-center space-x-1 sm:space-x-2 bg-secondary text-secondary-foreground font-bold uppercase tracking-wider px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm hover:bg-secondary/80 transition-colors"
                >
                  <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{t.printCoupon}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
