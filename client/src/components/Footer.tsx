/**
 * Footer Component
 * Design: Industrial Brutalism - Geometric layout with grid pattern
 */

import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      {/* Diagonal top accent */}
      <div className="h-1 bg-primary" 
        style={{
          clipPath: 'polygon(2% 0, 100% 0, 100% 100%, 0 100%)'
        }}
      />
      
      <div className="container py-16 grid-pattern">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-black mb-4">
              VERTICAL
              <span className="text-primary ml-2">AUTO</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              ASE-certified mechanics providing complete auto care with 36 years of experience. Specializing in Tesla, Asian, European, and Domestic vehicles.
            </p>
          </div>

          {/* Wilton Manors Location */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-primary">
              WILTON MANORS
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>1100 W Oakland Park Blvd Bay 5<br />Wilton Manors, FL 33311</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:9545651518" className="mono-number hover:text-primary transition-colors">
                  (954) 565-1518
                </a>
              </div>
            </div>
          </div>

          {/* Fort Lauderdale Location */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-primary">
              FORT LAUDERDALE
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>707 NE 11th Str<br />Fort Lauderdale, FL 33304</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:6452162266" className="mono-number hover:text-primary transition-colors">
                  (645) 216-2266
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-display text-lg font-bold mb-4 text-primary">
              HOURS
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="mono-number">MON-FRI: 8:00 AM - 5:00 PM</div>
                  <div className="mono-number text-muted-foreground mt-1">SAT-SUN: CLOSED</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © 2026 Vertical Automotive. All Rights Reserved.
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
