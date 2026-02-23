/**
 * Offers / Coupons Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography, card grid + printable coupons
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
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
            CURRENT <span className="text-primary">OFFERS</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-4" />
          <p className="text-center text-muted-foreground mb-12">
            Schedule your appointment to claim these exclusive offers
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OFFERS.map((offer, index) => (
              <Card
                key={index}
                className="p-8 bg-card border-2 border-border hover:border-primary transition-all duration-300 hover:shadow-xl"
              >
                <div className="inline-block bg-primary text-primary-foreground px-4 py-1 text-xs font-bold mb-4">
                  {offer.badge}
                </div>
                <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
                <div className="text-4xl font-black text-primary mb-4 mono-number">
                  {offer.value}
                </div>
                <p className="text-sm text-muted-foreground mb-6">
                  {offer.description}
                </p>
                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold"
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
      <section className="py-20 bg-muted">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-black mb-4 text-center">
            PRINTABLE <span className="text-primary">COUPONS</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {COUPONS.map((coupon, index) => (
              <div
                key={index}
                className="border-2 border-dashed border-border p-8 bg-card text-center hover:border-primary transition-colors"
              >
                <h3 className="text-xl font-bold mb-2">{coupon.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                  {coupon.description}
                </p>
                <p className="text-xs text-muted-foreground mb-6">
                  {coupon.expiry}
                </p>
                <button
                  onClick={() => handlePrint(coupon.title)}
                  className="inline-flex items-center space-x-2 bg-secondary text-secondary-foreground font-bold uppercase tracking-wider px-6 py-3 text-sm hover:bg-secondary/80 transition-colors"
                >
                  <Printer className="w-4 h-4" />
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
