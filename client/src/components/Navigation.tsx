/**
 * Navigation — Matches original verticalautomotive.com
 * Black background, white text, logo left, links right
 * SERVICE dropdown with all services + vehicle types
 */
import { COMPANY, SERVICES, VEHICLE_TYPES } from "@/lib/data";
import { ChevronDown, Menu, X } from "lucide-react";
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

  // Close mobile menu on route change
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
    <nav className="sticky top-0 z-50 bg-black border-b border-white/10">
      <div className="container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <img
              src={COMPANY.logoUrl}
              alt="Vertical Automotive"
              className="h-10 lg:h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 font-display text-sm font-semibold tracking-wider text-white/90 hover:text-green-400 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* SERVICE Dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                className="flex items-center px-4 py-2 font-display text-sm font-semibold tracking-wider text-white/90 hover:text-green-400 transition-colors"
              >
                SERVICE
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviceDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-black/95 backdrop-blur-sm border border-white/10 shadow-2xl z-50">
                  <div className="py-2">
                    <Link
                      href="/services"
                      className="block px-4 py-2.5 text-sm font-display font-semibold text-green-400 hover:bg-white/5 tracking-wider"
                      onClick={() => setServiceDropdownOpen(false)}
                    >
                      ALL SERVICES
                    </Link>
                    <div className="border-t border-white/10 my-1" />
                    <div className="px-4 py-1.5 text-xs font-display text-white/40 tracking-widest">VEHICLE TYPES</div>
                    {VEHICLE_TYPES.map((v) => (
                      <Link
                        key={v.slug}
                        href={`/services/${v.slug}`}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setServiceDropdownOpen(false)}
                      >
                        {v.title}
                      </Link>
                    ))}
                    <div className="border-t border-white/10 my-1" />
                    <div className="px-4 py-1.5 text-xs font-display text-white/40 tracking-widest">SERVICES</div>
                    {SERVICES.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className="block px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                        onClick={() => setServiceDropdownOpen(false)}
                      >
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Appointment */}
            <a
              href={COMPANY.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 font-display text-sm font-semibold tracking-wider text-green-400 hover:text-green-300 transition-colors"
            >
              APPOINTMENT
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10 max-h-[80vh] overflow-y-auto">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-3 font-display text-sm font-semibold tracking-wider text-white/90 hover:text-green-400"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Service Accordion */}
            <button
              onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
              className="flex items-center justify-between w-full py-3 font-display text-sm font-semibold tracking-wider text-white/90"
            >
              SERVICE
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServiceOpen && (
              <div className="pl-4 space-y-1 pb-2">
                <Link href="/services" className="block py-2 text-sm text-green-400 font-display font-semibold tracking-wider">
                  ALL SERVICES
                </Link>
                <div className="text-xs text-white/40 font-display tracking-widest pt-2">VEHICLE TYPES</div>
                {VEHICLE_TYPES.map((v) => (
                  <Link key={v.slug} href={`/services/${v.slug}`} className="block py-2 text-sm text-white/70 hover:text-white">
                    {v.title}
                  </Link>
                ))}
                <div className="text-xs text-white/40 font-display tracking-widest pt-2">SERVICES</div>
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`} className="block py-2 text-sm text-white/70 hover:text-white">
                    {s.shortTitle}
                  </Link>
                ))}
              </div>
            )}

            <a
              href={COMPANY.appointmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-3 font-display text-sm font-semibold tracking-wider text-green-400"
            >
              APPOINTMENT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
