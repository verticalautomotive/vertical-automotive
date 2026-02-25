/**
 * Navigation — Industrial Brutalism Design
 * Black/white/blue palette, diagonal accent, bold typography
 * SERVICE dropdown with all services + vehicle types
 * MOBILE: Compact header (h-14), streamlined menu
 */
import { COMPANY, SERVICES, VEHICLE_TYPES } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: "OFFERS", href: "/offers" },
    { label: "ABOUT US", href: "/about" },
    { label: "REVIEWS", href: "/#reviews" },
    { label: "CONTACTS", href: "/#contact" },
    { label: "INFO", href: "/blog" },
  ];

  const [, navigate] = useLocation();

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const hash = href.slice(1); // e.g. "#reviews"
      const id = hash.slice(1);   // e.g. "reviews"
      if (location === '/') {
        // Already on home — just scroll
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Navigate to home, then scroll after render
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
      setMobileOpen(false);
    }
  }, [location, navigate]);

  return (
    <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
      <div className="container">
        {/* Desktop: h-20, Mobile: h-14 */}
        <div className="flex items-center justify-between h-14 sm:h-20">
          {/* Logo — smaller on mobile */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              className="h-9 sm:h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* SERVICE Dropdown — first item */}
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

            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-3 py-2 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA with phone numbers — desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex flex-col items-end text-sm space-y-0.5">
              <a href="tel:9545651518" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">Wilton Manors (954) 565-1518</span>
              </a>
              <a href="tel:6452162266" className="flex items-center space-x-2 hover:text-primary transition-colors">
                <Phone className="w-3.5 h-3.5" />
                <span className="mono-number">Ft. Lauderdale (645) 216-2266</span>
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

          {/* Mobile: phone icon + hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <a href="tel:9545651518" className="p-2 text-primary" aria-label="Call us">
              <Phone className="w-5 h-5" />
            </a>
            <button
              className="p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — compact */}
      {mobileOpen && (
        <div className="lg:hidden bg-secondary border-t-2 border-primary fixed inset-x-0 top-[3.5rem] bottom-0 overflow-y-auto z-50">
          <div className="container py-3">
            {/* Mobile Service Accordion — first item */}
            <button
              onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
              className="flex items-center justify-between w-full py-2.5 font-display text-sm font-bold tracking-wider border-b border-border/30"
            >
              SERVICE
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServiceOpen && (
              <div className="pl-4 pb-2 border-b border-border/30">
                <Link href="/services" className="block py-1.5 text-sm text-primary font-display font-bold tracking-wider">
                  ALL SERVICES
                </Link>
                <div className="text-[10px] text-muted-foreground font-display tracking-widest pt-1.5 pb-0.5 uppercase">Vehicle Types</div>
                {VEHICLE_TYPES.map((v) => (
                  <Link key={v.slug} href={`/services/${v.slug}`} className="block py-1.5 text-sm text-secondary-foreground/70 hover:text-primary">
                    {v.title}
                  </Link>
                ))}
                <div className="text-[10px] text-muted-foreground font-display tracking-widest pt-1.5 pb-0.5 uppercase">Services</div>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block py-1.5 text-sm text-secondary-foreground/70 hover:text-primary">
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            )}

            {navLinks.map((link) => (
              link.href.startsWith('/#') ? (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="block py-2.5 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors border-b border-border/30 cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block py-2.5 font-display text-sm font-bold tracking-wider hover:text-primary transition-colors border-b border-border/30"
                >
                  {link.label}
                </Link>
              )
            ))}

            {/* Phone numbers + CTA */}
            <div className="pt-3 space-y-2">
              <div className="flex items-center gap-4">
                <a href="tel:9545651518" className="flex items-center space-x-2 text-sm">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span className="mono-number">Wilton Manors (954) 565-1518</span>
                </a>
                <a href="tel:6452162266" className="flex items-center space-x-2 text-sm">
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span className="mono-number">Ft. Lauderdale (645) 216-2266</span>
                </a>
              </div>
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" className="block">
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider text-sm py-2.5"
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
