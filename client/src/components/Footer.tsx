/**
 * Footer — Industrial Brutalism Design
 * Blue accents, grid pattern, diagonal accent line
 * Contact section + certified info + hours + copyright
 */
import { COMPANY, LOCATIONS } from "@/lib/data";
import { MapPin, Phone, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Diagonal top accent */}
      <div className="h-1 bg-primary"
        style={{
          clipPath: 'polygon(2% 0, 100% 0, 100% 100%, 0 100%)'
        }}
      />

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-4 tracking-wider">
            CONTACT <span className="text-primary">US</span>
          </h2>
          <div className="h-1 w-24 bg-primary mx-auto mb-12" />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="border border-border p-8 hover:border-primary/50 transition-colors">
                <h3 className="font-display text-2xl font-bold mb-6 text-primary tracking-wider">
                  {loc.name}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium text-secondary-foreground">ADDRESS:</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {loc.address}, {loc.city}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${loc.phoneRaw}`}
                      className="mono-number font-medium hover:text-primary transition-colors text-lg"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider">
                    SCHEDULE YOUR APPOINTMENT
                  </Button>
                </a>

                {/* Google Maps Embed */}
                <div className="mt-6">
                  <iframe
                    src={loc.mapUrl}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`Map - ${loc.name}`}
                    className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <div className="border-t border-border py-10 grid-pattern">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Certified */}
            <div className="flex items-start space-x-4">
              <Shield className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-display text-lg font-bold tracking-wider">
                  Certified Automotive<br />Professionals
                </p>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  Our ASE-certified MASTER technicians feature complete repairs on all car models.
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-display text-lg font-bold tracking-wider">Hours</p>
                <p className="text-secondary-foreground/80 mt-2 mono-number">{COMPANY.hours}</p>
                <p className="text-muted-foreground text-sm mt-1 mono-number">{COMPANY.closedDays}</p>
              </div>
            </div>

            {/* Payment */}
            <div>
              <p className="font-display text-lg font-bold tracking-wider mb-3">PAY SYSTEM</p>
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

          <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Vertical Automotive. All Rights Reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
