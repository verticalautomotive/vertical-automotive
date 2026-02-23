/**
 * Offers / Coupons Page — Matches verticalautomotive.com/offers-coupons-vertical-automotive/
 * Hero banner, printable coupons grid
 */
import { COUPONS, COMPANY } from "@/lib/data";
import { Printer } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";

export default function OffersPage() {
  const handlePrint = (title: string) => {
    const printWindow = window.open('', '_blank');
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
            <script>window.print();</script>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <PageHero
        title="OFFERS / COUPONS"
        breadcrumb={[
          { label: "HOME", href: "/" },
          { label: "OFFERS / COUPONS" },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80"
      />

      {/* Coupons Grid */}
      <section className="bg-white text-black py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {COUPONS.map((coupon, i) => (
              <div
                key={i}
                className="border-2 border-dashed border-gray-300 p-8 text-center bg-gray-50 hover:border-red-400 transition-colors"
              >
                <h3 className="font-display text-xl font-bold tracking-wider mb-3">
                  {coupon.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 whitespace-pre-line leading-relaxed">
                  {coupon.description}
                </p>
                <p className="text-xs text-gray-400 mb-6">{coupon.expiry}</p>
                <button
                  onClick={() => handlePrint(coupon.title)}
                  className="inline-flex items-center space-x-2 bg-black text-white font-display font-bold uppercase tracking-wider px-6 py-3 text-xs hover:bg-gray-800 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print this Coupon</span>
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
