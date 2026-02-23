/**
 * Navigation — Industrial Brutalism Design
 * Black/white/blue palette, diagonal accent, bold typography
 * SERVICE dropdown with all services + vehicle types
 */
import { COMPANY, SERVICES, VEHICLE_TYPES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServiceDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServiceOpen(false);
  }, [location]);

  const navLinks = [
    { label: "AUTO REPAIR SHOP", href: "/" },
    { label: "OFFERS", href: "/offers" },
    { label: "ABOUT US", href: "/about" },
    { label: "CONTACTS", href: "/#contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-3 py-2 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* SERVICE Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                className="flex items-center px-3 py-2 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors"
              >
                SERVICE
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-secondary border border-border shadow-2xl z-50">
                  <div className="py-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2.5 text-sm font-display font-bold text-primary hover:bg-white/5 tracking-wider"
                      onClick={() => setServiceDropdownOpen(false)}
                    >
                      ALL SERVICES
                    </Link>
                    <div className="border-t border-border my-1" />
                    <div className="px-4 py-1.5 text-xs font-display text-muted-foreground tracking-widest">VEHICLE TYPES</div>
                    {VEHICLE_TYPES.map((v) => (
                      <Link
                        key={v.slug}
                        href={`/services/${v.slug}`}
                        className="block px-4 py-2 text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 transition-colors"
                        onClick={() => setServiceDropdownOpen(false)}
                      >
                        {v.title}
                      </Link>
                    ))}
                    <div className="border-t border-border my-1" />
                    <div className="px-4 py-1.5 text-xs font-display text-muted-foreground tracking-widest">SERVICES</div>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-4 py-2 text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 transition-colors"
                        onClick={() => setServiceDropdownOpen(false)}
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CTA with phone numbers */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col items-end text-sm space-y-0.5">
              <a href="tel:9545651518" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">(954) 565-1518</span>
              </a>
              <a href="tel:6452162266" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">(645) 216-2266</span>
              </a>
            </div>
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider shadow-lg"
              >
                SCHEDULE NOW
              </Button>
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-secondary border-t-4 border-primary max-h-[80vh] overflow-y-auto">
          <div className="container py-6 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Service Accordion */}
            <button
              onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
              className="flex items-center justify-between w-full py-3 font-display text-sm font-bold tracking-wider"
            >
              SERVICE
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServiceOpen && (
              <div className="pl-4 space-y-1 pb-2">
                <Link href="/services" className="block py-2 text-sm text-primary font-display font-bold tracking-wider">
                  ALL SERVICES
                </Link>
                <div className="text-xs text-muted-foreground font-display tracking-widest pt-2">VEHICLE TYPES</div>
                {VEHICLE_TYPES.map((v) => (
                  <Link key={v.slug} href={`/services/${v.slug}`} className="block py-2 text-sm text-secondary-foreground/70 hover:text-primary">
                    {v.title}
                  </Link>
                ))}
                <div className="text-xs text-muted-foreground font-display tracking-widest pt-2">SERVICES</div>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block py-2 text-sm text-secondary-foreground/70 hover:text-primary">
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            )}

            <div className="pt-4 space-y-3 border-t border-border">
              <a href="tel:9545651518" className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span className="mono-number">(954) 565-1518</span>
              </a>
              <a href="tel:6452162266" className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4" />
                <span className="mono-number">(645) 216-2266</span>
              </a>
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider"
                >
                  SCHEDULE NOW
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Diagonal accent line */}
      <div className="h-1 bg-primary"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 98% 100%, 0 100%)'
        }}
      />
    </nav>
  );
}
