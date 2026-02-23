/**
 * Footer — Industrial Brutalism Design
 * Blue accents, grid pattern, diagonal accent line
 * Simple layout with brand, locations, hours, payment
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
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              className="h-12 w-auto mb-6"
            />
            <p className="text-sm text-muted-foreground leading-relaxed">
              ASE-certified mechanics providing complete auto care with{" "}
              {COMPANY.yearsExperience} years of experience. Specializing in
              Tesla, Asian, European, and Domestic vehicles.
            </p>
            <div className="flex items-center space-x-3 mt-6">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <span className="text-sm font-bold tracking-wider">
                ASE CERTIFIED
              </span>
            </div>
          </div>

          {/* Wilton Manors */}
          <div>
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              WILTON MANORS
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm">{LOCATIONS[0].address}</p>
                  <p className="text-sm text-muted-foreground">
                    {LOCATIONS[0].city}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
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

          {/* Fort Lauderdale */}
          <div>
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              FORT LAUDERDALE
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm">{LOCATIONS[1].address}</p>
                  <p className="text-sm text-muted-foreground">
                    {LOCATIONS[1].city}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
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
          <div>
            <h3 className="font-display text-lg font-bold tracking-wider mb-6 text-primary">
              HOURS
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium mono-number">
                    {COMPANY.hours}
                  </p>
                  <p className="text-sm text-muted-foreground mono-number">
                    {COMPANY.closedDays}
                  </p>
                </div>
              </div>
            </div>

            <h3 className="font-display text-lg font-bold tracking-wider mt-8 mb-4 text-primary">
              PAY SYSTEM
            </h3>
            <div className="flex items-center space-x-3 text-muted-foreground text-sm">
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

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vertical Automotive. All Rights
            Reserved.
          </p>
          <div className="flex items-center space-x-6 text-sm">
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
