/**
 * Footer — Industrial Brutalism Design
 * Blue accents, grid pattern, diagonal accent line
 * MOBILE: Condensed 2-column layout, reduced spacing
 * BILINGUAL: Uses useTranslation for Spanish labels
 * Street addresses are clickable → Google Maps
 */
import { COMPANY, LOCATIONS } from "@/lib/data";
import { MapPin, Phone, Clock, Shield, Instagram, Facebook, ExternalLink, Navigation2 } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" />
    </svg>
  );
}

function getMapsUrl(location: typeof LOCATIONS[0]) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.fullAddress)}`;
}

function getDirectionsUrl(location: typeof LOCATIONS[0]) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.fullAddress)}`;
}

export default function Footer() {
  const { isSpanish, ui, companyOverrides } = useTranslation();
  const t = ui?.footer ?? {
    description: "ASE-certified mechanics providing complete auto care with",
    yearsExp: "years of experience.",
    aseCertified: "ASE CERTIFIED",
    hours: "HOURS",
    paySystem: "PAY SYSTEM",
    allRights: "All Rights Reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
  };

  const hours = companyOverrides?.hours ?? COMPANY.hours;
  const closedDays = companyOverrides?.closedDays ?? COMPANY.closedDays;

  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Diagonal accent line */}
      <div
        className="h-1 bg-primary"
        style={{
          clipPath: "polygon(2% 0, 100% 0, 100% 100%, 0 100%)",
        }}
      />

      {/* Main Footer Content */}
      <div className="container py-8 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              width={200}
              height={48}
              className="h-10 sm:h-12 w-auto mb-3 sm:mb-6 mx-auto sm:mx-0"
            />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {t.description}{" "}
              {COMPANY.yearsExperience} {t.yearsExp}
            </p>
            <div className="flex items-center space-x-2 mt-3 sm:mt-6">
              <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">
                {t.aseCertified}
              </span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center sm:justify-start space-x-4 mt-4 sm:mt-6">
              <a
                href="https://www.instagram.com/verticalautomotive/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/verticalautomotive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@verticalautomotive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Wilton Manors — desktop only */}
          <div className="hidden sm:block">
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              WILTON MANORS
            </h3>
            <div className="space-y-4">
              <a
                href={getMapsUrl(LOCATIONS[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 group"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm group-hover:text-primary transition-colors">{LOCATIONS[0].address}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {LOCATIONS[0].city}
                  </p>
                </div>
              </a>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${LOCATIONS[0].phoneRaw}`}
                  className="mono-number text-sm font-medium hover:text-primary transition-colors"
                >
                  {LOCATIONS[0].phone}
                </a>
              </div>
              <a
                href={getDirectionsUrl(LOCATIONS[0])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors mt-1"
              >
                <Navigation2 className="w-3 h-3" />
                {isSpanish ? "Direcciones" : "Get Directions"}
              </a>
            </div>
          </div>

          {/* Fort Lauderdale — desktop only */}
          <div className="hidden sm:block">
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              FT. LAUDERDALE
            </h3>
            <div className="space-y-4">
              <a
                href={getMapsUrl(LOCATIONS[1])}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start space-x-2 group"
              >
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm group-hover:text-primary transition-colors">{LOCATIONS[1].address}</p>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                    {LOCATIONS[1].city}
                  </p>
                </div>
              </a>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${LOCATIONS[1].phoneRaw}`}
                  className="mono-number text-sm font-medium hover:text-primary transition-colors"
                >
                  {LOCATIONS[1].phone}
                </a>
              </div>
              <a
                href={getDirectionsUrl(LOCATIONS[1])}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-primary/70 hover:text-primary transition-colors mt-1"
              >
                <Navigation2 className="w-3 h-3" />
                {isSpanish ? "Direcciones" : "Get Directions"}
              </a>
            </div>
          </div>

          {/* Hours & Payment */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-sm sm:text-lg font-bold tracking-wider mb-3 sm:mb-6 text-primary">
              {t.hours}
            </h3>
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium mono-number">
                  {hours}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mono-number">
                  {closedDays}
                </p>
              </div>
            </div>

            <div className="hidden sm:block">
              <h3 className="font-display text-lg font-bold tracking-wider mt-8 mb-4 text-primary">
                {t.paySystem}
              </h3>
              <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-muted-foreground text-sm">
                <span>Visa</span>
                <span>•</span>
                <span>Mastercard</span>
                <span>•</span>
                <span>Amex</span>
                <span>•</span>
                <span>Discover</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-6 sm:mt-12 pt-4 sm:pt-8 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-xs sm:text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vertical Automotive. {t.allRights}
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              {t.privacyPolicy}
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              {t.termsOfService}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
