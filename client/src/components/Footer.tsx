/**
 * Footer — Matches original verticalautomotive.com
 * Contact section + certified professionals info + hours + copyright
 */
import { COMPANY, LOCATIONS } from "@/lib/data";
import { MapPin, Phone, Clock, Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Contact Section */}
      <section id="contact" className="py-16 border-t border-white/10">
        <div className="container">
          <h2 className="font-display text-4xl md:text-5xl font-black text-center mb-12 tracking-wider">
            CONTACT US
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {LOCATIONS.map((loc) => (
              <div key={loc.name} className="bg-white/5 border border-white/10 p-8">
                <h3 className="font-display text-2xl font-bold mb-6 text-green-400 tracking-wider">
                  {loc.name}
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 mt-0.5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">ADDRESS:</p>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(loc.address + ', ' + loc.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors"
                      >
                        {loc.address}, {loc.city}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <a
                      href={`tel:${loc.phoneRaw}`}
                      className="font-medium hover:text-green-400 transition-colors text-lg"
                    >
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-white font-display font-bold uppercase tracking-wider px-6 py-3 text-sm hover:bg-red-700 transition-colors"
                >
                  SCHEDULE YOUR APPOINTMENT
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
      <div className="border-t border-white/10 py-10">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Certified */}
            <div className="flex items-start space-x-4">
              <Shield className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-display text-lg font-bold tracking-wider">
                  Certified Automotive<br />Professionals
                </p>
                <p className="text-sm text-white/60 mt-2 leading-relaxed">
                  Our ASE-certified MASTER technicians feature complete repairs on all car models.
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start space-x-4">
              <Clock className="w-10 h-10 text-primary flex-shrink-0 mt-1" />
              <div>
                <p className="font-display text-lg font-bold tracking-wider">Hours</p>
                <p className="text-white/80 mt-2">{COMPANY.hours}</p>
                <p className="text-white/60 text-sm mt-1">{COMPANY.closedDays}</p>
              </div>
            </div>

            {/* Payment */}
            <div>
              <p className="font-display text-lg font-bold tracking-wider mb-3">PAY SYSTEM</p>
              <div className="flex items-center space-x-3 text-white/50 text-sm">
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

          <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-white/40">
            © {new Date().getFullYear()} — Vertical Automotive, All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
