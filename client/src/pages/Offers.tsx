/**
 * Offers / Coupons Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography, card grid + printable coupons
 * MOBILE: Compact 2-col grids, smaller text, reduced spacing
 */
import { OFFERS, COUPONS, COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Printer } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function OffersPage() {
  const handlePrint = (title: string) => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Coupon - ${title}</title>
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
        title="Auto Repair Coupons & Offers - Vertical Automotive | Fort Lauderdale, FL"
        description="Save on auto repairs with exclusive coupons and offers from Vertical Automotive. Free brake inspection, free oil change, tire discounts, and more. Print coupons and schedule today."
      />
      <Navigation />

      <PageHero
        title="OFFERS & COUPONS"
        subtitle="Save on quality auto care with our exclusive promotions"
      />

      {/* Current Offers */}
      <section className="py-10 sm:py-20 bg-background">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            CURRENT <span className="text-primary">OFFERS</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-2 sm:mb-4" />
          <p className="text-center text-xs sm:text-base text-muted-foreground mb-6 sm:mb-12">
            Schedule your appointment to claim these exclusive offers
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {OFFERS.map((offer, index) => (
              <Card
                key={index}
                className="p-3 sm:p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                <div className="inline-block bg-primary text-primary-foreground px-2 sm:px-4 py-0.5 sm:py-1 text-[9px] sm:text-xs font-bold mb-2 sm:mb-4">
                  {offer.badge}
                </div>
                <h3 className="text-xs sm:text-xl font-bold mb-1 sm:mb-3 leading-tight">{offer.title}</h3>
                <div className="text-xl sm:text-4xl font-black text-primary mb-1 sm:mb-4 mono-number">
                  {offer.value}
                </div>
                <p className="text-[10px] sm:text-sm text-muted-foreground mb-2 sm:mb-6 hidden sm:block">
                  {offer.description}
                </p>
                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold text-[10px] sm:text-sm py-1.5 sm:py-2"
                  >
                    CLAIM OFFER
                  </Button>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Printable Coupons */}
      <section className="py-10 sm:py-20 bg-muted">
        <div className="container">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-center">
            PRINTABLE <span className="text-primary">COUPONS</span>
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6 sm:mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 max-w-6xl mx-auto">
            {COUPONS.map((coupon, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-border p-4 sm:p-8 bg-card text-center hover:border-primary transition-colors"
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
                  <span>Print Coupon</span>
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
