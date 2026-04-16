/**
 * Navigation — Industrial Brutalism Design
 * Black/white/blue palette, diagonal accent, bold typography
 * SERVICE dropdown: simple two-location menu (Fort Lauderdale / Wilton Manors)
 * MOBILE: SERVICE accordion with two location buttons
 * BILINGUAL: Detects /es/ prefix and shows Spanish labels + correct links
 */
import { COMPANY, LOCATIONS } from "@/lib/nav-data";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Menu, Phone, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "wouter";
import { useNavTranslation } from "@/hooks/useNavTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { trackSchedule } from "@/lib/gtm";
import CallNowDialog from "./CallNowDialog";

const FL_LOCATION = LOCATIONS[1]; // Fort Lauderdale
const WM_LOCATION = LOCATIONS[0]; // Wilton Manors

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [location] = useLocation();
  const { isSpanish, prefix, ui } = useNavTranslation();

  // UI labels
  const t = ui?.nav ?? {
    service: "SERVICE",
    offers: "OFFERS",
    aboutUs: "ABOUT US",
    reviews: "REVIEWS",
    contacts: "CONTACTS",
    info: "TIPS",
    scheduleNow: "SCHEDULE NOW",
  };

  // Location hub links
  const flHref = isSpanish ? "/es/fort-lauderdale" : "/fort-lauderdale";
  const wmHref = isSpanish ? "/es/wilton-manors" : "/wilton-manors";

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
    setServiceDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    // Use a CSS class toggle instead of inline style mutation.
    // Toggling a class on <body> is cheaper than writing inline styles because
    // the browser can batch the style recalculation with other pending changes.
    // The .mobile-nav-open class is defined in index.css with overflow: hidden.
    if (mobileOpen) {
      document.body.classList.add("mobile-nav-open");
    } else {
      document.body.classList.remove("mobile-nav-open");
    }
    return () => {
      document.body.classList.remove("mobile-nav-open");
    };
  }, [mobileOpen]);

  const homeHash = isSpanish ? "/es" : "/";
  const homePath = isSpanish ? "/es" : "/";

  const navLinks = [
    { label: isSpanish ? t.offers : "OFFERS", href: isSpanish ? "/es/ofertas" : "/offers" },
    { label: isSpanish ? t.aboutUs : "ABOUT US", href: isSpanish ? "/es/sobre-nosotros" : "/about" },
    { label: isSpanish ? "GALERÍA" : "GALLERY", href: isSpanish ? "/es/sobre-nosotros/galeria" : "/about/gallery" },
    { label: isSpanish ? t.reviews : "REVIEWS", href: `${homeHash}#reviews` },
    { label: isSpanish ? t.contacts : "CONTACTS", href: isSpanish ? "/es/contactos" : "/contacts" },
    { label: isSpanish ? t.info : "TIPS", href: isSpanish ? "/es/informacion" : "/blog" },
  ];

  const [, navigate] = useLocation();

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        e.preventDefault();
        const id = href.slice(hashIndex + 1);
        const isOnHome = location === homePath || location === homePath + "/";
        if (isOnHome) {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
          navigate(homePath);
          setTimeout(() => {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 300);
        }
        setMobileOpen(false);
      }
    },
    [location, navigate, homePath]
  );

  return (
    <>
      <nav className="sticky top-0 z-50 bg-secondary text-secondary-foreground shadow-lg">
        <div className="w-full px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-20">
            {/* Logo */}
            <Link href={homePath} className="flex-shrink-0">
              <img
                src={COMPANY.logoUrl}
                alt="Vertical Automotive"
                width={200}
                height={56}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="h-9 sm:h-14 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1">
              {/* SERVICE Dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                  className="flex items-center px-2 xl:px-3 py-2 font-display text-[13px] xl:text-sm font-bold tracking-wider hover:text-primary transition-colors"
                >
                  {isSpanish ? t.service : "SERVICE"}
                  <ChevronDown
                    className={`w-4 h-4 ml-1 transition-transform ${serviceDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {serviceDropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 bg-secondary border border-border shadow-2xl z-[9999] min-w-[420px]">
                    <div className="p-2 grid grid-cols-2 gap-2">
                      {/* Fort Lauderdale */}
                      <Link
                        href={flHref}
                        onClick={() => setServiceDropdownOpen(false)}
                        className="group flex flex-col gap-1 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <span className="font-display font-bold text-sm tracking-wider text-secondary-foreground group-hover:text-primary transition-colors">
                          FORT LAUDERDALE
                        </span>
                        <span className="flex items-start gap-1.5 text-xs text-white/80 leading-tight">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" />
                          {FL_LOCATION.address}<br />{FL_LOCATION.city}
                        </span>
                      </Link>

                      {/* Wilton Manors */}
                      <Link
                        href={wmHref}
                        onClick={() => setServiceDropdownOpen(false)}
                        className="group flex flex-col gap-1 p-4 border border-border hover:border-primary hover:bg-primary/5 transition-all"
                      >
                        <span className="font-display font-bold text-sm tracking-wider text-secondary-foreground group-hover:text-primary transition-colors">
                          WILTON MANORS
                        </span>
                        <span className="flex items-start gap-1.5 text-xs text-white/80 leading-tight">
                          <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0 text-primary" />
                          {WM_LOCATION.address}<br />{WM_LOCATION.city}
                        </span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map((link) => {
                const isHash = link.href.includes("#");
                return isHash ? (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="px-2 xl:px-3 py-2 font-display text-[13px] xl:text-sm font-bold tracking-wider hover:text-primary transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="px-2 xl:px-3 py-2 font-display text-[13px] xl:text-sm font-bold tracking-wider hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* CTA + Language Switcher — desktop */}
            <div className="hidden lg:flex items-center space-x-3">
              <LanguageSwitcher />
              <button
                onClick={() => setCallDialogOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 bg-primary border-2 border-white/80 text-white hover:bg-primary/90 hover:border-white font-display font-bold tracking-wider text-sm transition-all rounded-full shadow-lg hover:shadow-xl"
              >
                <Phone className="w-4 h-4" />
                {isSpanish ? "LLAMAR" : "CALL NOW"}
              </button>
              <a
                href={COMPANY.appointmentUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSchedule("desktop_nav")}
              >
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider shadow-lg"
                >
                  {isSpanish ? t.scheduleNow : "SCHEDULE NOW"}
                </Button>
              </a>
            </div>

            {/* Mobile: lang + hamburger */}
            <div className="flex lg:hidden items-center gap-1.5">
              <LanguageSwitcher className="text-[10px] px-1.5 py-1" />
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

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-secondary border-t-2 border-primary fixed inset-x-0 top-[3.5rem] bottom-0 overflow-y-auto z-50">
            <div className="container py-3">
              {/* SERVICE accordion */}
              <button
                onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                className="flex items-center justify-between w-full py-2.5 font-display text-sm font-bold tracking-wider border-b border-border/30"
              >
                {isSpanish ? t.service : "SERVICE"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${mobileServiceOpen ? "rotate-180" : ""}`}
                />
              </button>

              {mobileServiceOpen && (
                <div className="py-2 border-b border-border/30 grid grid-cols-2 gap-2">
                  {/* Fort Lauderdale */}
                  <Link
                    href={flHref}
                    onClick={() => { setMobileServiceOpen(false); setMobileOpen(false); }}
                    className="flex flex-col gap-1 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <span className="font-display font-bold text-xs tracking-wider text-secondary-foreground">
                      FORT LAUDERDALE
                    </span>
                    <span className="flex items-start gap-1 text-[10px] text-white/80 leading-tight">
                      <MapPin className="w-2.5 h-2.5 mt-0.5 flex-shrink-0 text-primary" />
                      {FL_LOCATION.address}
                    </span>
                  </Link>

                  {/* Wilton Manors */}
                  <Link
                    href={wmHref}
                    onClick={() => { setMobileServiceOpen(false); setMobileOpen(false); }}
                    className="flex flex-col gap-1 p-3 border border-border hover:border-primary hover:bg-primary/5 transition-all"
                  >
                    <span className="font-display font-bold text-xs tracking-wider text-secondary-foreground">
                      WILTON MANORS
                    </span>
                    <span className="flex items-start gap-1 text-[10px] text-white/80 leading-tight">
                      <MapPin className="w-2.5 h-2.5 mt-0.5 flex-shrink-0 text-primary" />
                      {WM_LOCATION.address}
                    </span>
                  </Link>
                </div>
              )}

              {navLinks.map((link) => {
                const isHash = link.href.includes("#");
                return isHash ? (
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
                );
              })}

              {/* Call Now + Schedule CTA */}
              <div className="pt-3 space-y-2">
                <button
                  onClick={() => {
                    setCallDialogOpen(true);
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-primary border-2 border-white/80 text-white font-display font-bold tracking-wider text-sm hover:bg-primary/90 hover:border-white transition-all rounded-full shadow-lg hover:shadow-xl"
                >
                  <Phone className="w-4 h-4" />
                  {isSpanish ? "LLAMAR" : "CALL NOW"}
                </button>
                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                  onClick={() => trackSchedule("mobile_menu")}
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider text-sm py-2.5">
                    {isSpanish ? t.scheduleNow : "SCHEDULE NOW"}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Diagonal accent line */}
        <div
          className="h-1 bg-primary"
          style={{ clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)" }}
        />
      </nav>

      {/* Call Now Dialog */}
      <CallNowDialog
        open={callDialogOpen}
        onClose={() => setCallDialogOpen(false)}
        source="nav"
      />
    </>
  );
}
