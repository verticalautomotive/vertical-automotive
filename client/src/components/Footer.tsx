/**
 * Footer — Industrial Brutalism Design
 * Blue accents, grid pattern, diagonal accent line
 * MOBILE: Condensed 2-column layout, reduced spacing
 */
import { COMPANY, LOCATIONS } from "@/lib/data";
import { MapPin, Phone, Clock, Shield } from "lucide-react";

export default function Footer() {
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
        {/* Mobile: 2-col grid, Desktop: 4-col */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              className="h-10 sm:h-12 w-auto mb-3 sm:mb-6 mx-auto sm:mx-0"
            />
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              ASE-certified mechanics providing complete auto care with{" "}
              {COMPANY.yearsExperience} years of experience.
            </p>
            <div className="flex items-center space-x-2 mt-3 sm:mt-6">
              <Shield className="w-5 h-5 sm:w-8 sm:h-8 text-primary flex-shrink-0" />
              <span className="text-xs sm:text-sm font-bold tracking-wider">
                ASE CERTIFIED
              </span>
            </div>
          </div>

          {/* Wilton Manors — desktop only */}
          <div className="hidden sm:block">
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              WILTON MANORS
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm">{LOCATIONS[0].address}</p>
                  <p className="text-sm text-muted-foreground">
                    {LOCATIONS[0].city}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${LOCATIONS[0].phoneRaw}`}
                  className="mono-number text-sm font-medium hover:text-primary transition-colors"
                >
                  {LOCATIONS[0].phone}
                </a>
              </div>
            </div>
          </div>

          {/* Fort Lauderdale — desktop only */}
          <div className="hidden sm:block">
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              FT. LAUDERDALE
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm">{LOCATIONS[1].address}</p>
                  <p className="text-sm text-muted-foreground">
                    {LOCATIONS[1].city}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a
                  href={`tel:${LOCATIONS[1].phoneRaw}`}
                  className="mono-number text-sm font-medium hover:text-primary transition-colors"
                >
                  {LOCATIONS[1].phone}
                </a>
              </div>
            </div>
          </div>

          {/* Hours & Payment */}
          <div className="col-span-2 sm:col-span-1">
            <h3 className="font-display text-sm sm:text-lg font-bold tracking-wider mb-3 sm:mb-6 text-primary">
              HOURS
            </h3>
            <div className="flex items-start space-x-2 sm:space-x-3">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 text-primary flex-shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-medium mono-number">
                  {COMPANY.hours}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mono-number">
                  {COMPANY.closedDays}
                </p>
              </div>
            </div>

            <div className="hidden sm:block">
              <h3 className="font-display text-lg font-bold tracking-wider mt-8 mb-4 text-primary">
                PAY SYSTEM
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
            © {new Date().getFullYear()} Vertical Automotive. All Rights
            Reserved.
          </p>
          <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
