/**
 * Navigation — Industrial Brutalism Design
 * Black/white/blue palette, diagonal accent, bold typography
 * SERVICE dropdown with categorized services + vehicle types
 * MOBILE: Compact header (h-14), streamlined menu
 * BILINGUAL: Detects /es/ prefix and shows Spanish labels + correct links
 * CALL NOW button opens location picker popup instead of showing two phone numbers
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import LanguageSwitcher from "./LanguageSwitcher";
import { trackSchedule } from "@/lib/gtm";
import CallNowDialog from "./CallNowDialog";

// Category definitions for organizing services
const SERVICE_CATEGORIES_EN = [
  {
    label: "ENGINE & DRIVETRAIN",
    slugs: [
      "battery-cranking-charging-systems",
      "transmission",
      "oil-change-engine-service",
      "fuel-system",
      "powertrain-restoration",
    ],
  },
  {
    label: "SAFETY & HANDLING",
    slugs: [
      "brake-system",
      "steering-suspension",
      "alignment-tire-rotation-balancing",
      "tires",
    ],
  },
  {
    label: "COMFORT & SPECIALTY",
    slugs: [
      "a-c-maintenance-repair",
      "hybrids-ev",
      "complete-diagnostics",
    ],
  },
  {
    label: "MAINTENANCE & MORE",
    slugs: [
      "routine-preventive-maintenance",
      "manufacturer-recommended-services",
      "fleet-maintenance-repairs",
      "car-wash",
    ],
  },
];

const SERVICE_CATEGORIES_ES = [
  {
    label: "MOTOR Y TREN MOTRIZ",
    slugs: [
      "battery-cranking-charging-systems",
      "transmission",
      "oil-change-engine-service",
      "fuel-system",
      "powertrain-restoration",
    ],
  },
  {
    label: "SEGURIDAD Y MANEJO",
    slugs: [
      "brake-system",
      "steering-suspension",
      "alignment-tire-rotation-balancing",
      "tires",
    ],
  },
  {
    label: "CONFORT Y ESPECIALIDAD",
    slugs: [
      "a-c-maintenance-repair",
      "hybrids-ev",
      "complete-diagnostics",
    ],
  },
  {
    label: "MANTENIMIENTO Y MÁS",
    slugs: [
      "routine-preventive-maintenance",
      "manufacturer-recommended-services",
      "fleet-maintenance-repairs",
      "car-wash",
    ],
  },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [callDialogOpen, setCallDialogOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const serviceButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [location] = useLocation();
  const { lang, isSpanish, prefix, servicesPath, services, vehicleTypes, ui } = useTranslation();

  // UI labels
  const t = ui?.nav ?? {
    service: "SERVICE",
    allServices: "ALL SERVICES",
    vehicleTypes: "Vehicle Types",
    services: "Services",
    offers: "OFFERS",
    aboutUs: "ABOUT US",
    reviews: "REVIEWS",
    contacts: "CONTACTS",
    info: "TIPS",
    scheduleNow: "SCHEDULE NOW",
  };

  // Build categorized services from the flat services array
  const categories = useMemo(() => {
    const cats = isSpanish ? SERVICE_CATEGORIES_ES : SERVICE_CATEGORIES_EN;
    const serviceMap = new Map(services.map((s) => [s.slug, s]));
    return cats.map((cat) => ({
      label: cat.label,
      items: cat.slugs
        .map((slug) => serviceMap.get(slug))
        .filter(Boolean) as typeof services,
    }));
  }, [isSpanish, services]);

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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const homeHash = isSpanish ? "/es" : "/";

  const navLinks = [
    { label: isSpanish ? t.offers : "OFFERS", href: isSpanish ? "/es/ofertas" : "/offers" },
    { label: isSpanish ? t.aboutUs : "ABOUT US", href: isSpanish ? "/es/sobre-nosotros" : "/about" },
    { label: isSpanish ? "GALERÍA" : "GALLERY", href: isSpanish ? "/es/sobre-nosotros/galeria" : "/about/gallery" },
    { label: isSpanish ? t.reviews : "REVIEWS", href: `${homeHash}#reviews` },
    { label: isSpanish ? t.contacts : "CONTACTS", href: isSpanish ? "/es/contactos" : "/contacts" },
    { label: isSpanish ? t.info : "TIPS", href: isSpanish ? "/es/informacion" : "/blog" },
  ];

  const [, navigate] = useLocation();

  const homePath = isSpanish ? "/es" : "/";

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    const hashIndex = href.indexOf('#');
    if (hashIndex !== -1) {
      e.preventDefault();
      const id = href.slice(hashIndex + 1);
      const isOnHome = location === homePath || location === homePath + "/";
      if (isOnHome) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(homePath);
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
      setMobileOpen(false);
    }
  }, [location, navigate, homePath]);

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
                ref={serviceButtonRef}
                onClick={() => {
                  if (!serviceDropdownOpen && serviceButtonRef.current) {
                    const rect = serviceButtonRef.current.getBoundingClientRect();
                    setDropdownPos({ top: rect.bottom + 4, left: rect.left });
                  }
                  setServiceDropdownOpen(!serviceDropdownOpen);
                }}
                className="flex items-center px-2 xl:px-3 py-2 font-display text-[13px] xl:text-sm font-bold tracking-wider hover:text-primary transition-colors"
              >
                {isSpanish ? t.service : "SERVICE"}
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${serviceDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {serviceDropdownOpen && (
                <div
                  className="fixed w-[320px] bg-secondary border border-border shadow-2xl z-[9999] overflow-y-auto overscroll-contain"
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    maxHeight: `calc(100vh - ${dropdownPos.top}px - 1rem)`,
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'var(--primary) transparent',
                  }}
                >
                  <div className="py-2">
                    {/* All Services link */}
                    <Link
                      href={servicesPath}
                      className="block px-4 py-2.5 text-sm font-display font-bold text-primary hover:bg-white/5 tracking-wider"
                      onClick={() => setServiceDropdownOpen(false)}
                    >
                      {isSpanish ? t.allServices : "ALL SERVICES"}
                    </Link>

                    <div className="border-t border-border my-1" />

                    {/* Vehicle Types */}
                    <div className="px-4 py-1.5 text-[10px] font-display text-muted-foreground tracking-widest uppercase">
                      {isSpanish ? t.vehicleTypes : "VEHICLE TYPES"}
                    </div>
                    {vehicleTypes.map((v) => (
                      <Link
                        key={v.slug}
                        href={`${servicesPath}/${v.slug}`}
                        className="block px-4 py-1.5 text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 transition-colors"
                        onClick={() => setServiceDropdownOpen(false)}
                      >
                        {v.title}
                      </Link>
                    ))}

                    {/* Categorized Services */}
                    {categories.map((cat) => (
                      <div key={cat.label}>
                        <div className="border-t border-border my-1" />
                        <div className="px-4 py-1.5 text-[10px] font-display text-muted-foreground tracking-widest uppercase">
                          {cat.label}
                        </div>
                        {cat.items.map((s) => (
                          <Link
                            key={s.slug}
                            href={`${servicesPath}/${s.slug}`}
                            className="block px-4 py-1.5 text-sm text-secondary-foreground/80 hover:text-primary hover:bg-white/5 transition-colors"
                            onClick={() => setServiceDropdownOpen(false)}
                          >
                            {s.shortTitle}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isHash = link.href.includes('#');
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
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-primary/40 hover:border-primary text-primary hover:bg-primary/10 font-display font-bold tracking-wider text-sm transition-all"
            >
              <Phone className="w-4 h-4" />
              {isSpanish ? "LLAMAR" : "CALL NOW"}
            </button>
            <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackSchedule("desktop_nav")}>
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
            {/* Mobile Service Accordion */}
            <button
              onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
              className="flex items-center justify-between w-full py-2.5 font-display text-sm font-bold tracking-wider border-b border-border/30"
            >
              {isSpanish ? t.service : "SERVICE"}
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileServiceOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileServiceOpen && (
              <div className="pl-4 pb-2 border-b border-border/30">
                <Link href={servicesPath} className="block py-1.5 text-sm text-primary font-display font-bold tracking-wider">
                  {isSpanish ? t.allServices : "ALL SERVICES"}
                </Link>

                {/* Vehicle Types */}
                <div className="text-[10px] text-muted-foreground font-display tracking-widest pt-2 pb-0.5 uppercase">
                  {isSpanish ? t.vehicleTypes : "Vehicle Types"}
                </div>
                {vehicleTypes.map((v) => (
                  <Link key={v.slug} href={`${servicesPath}/${v.slug}`} className="block py-1.5 text-sm text-secondary-foreground/70 hover:text-primary">
                    {v.title}
                  </Link>
                ))}

                {/* Categorized Services */}
                {categories.map((cat) => (
                  <div key={cat.label}>
                    <div className="text-[10px] text-muted-foreground font-display tracking-widest pt-2 pb-0.5 uppercase">
                      {cat.label}
                    </div>
                    {cat.items.map((s) => (
                      <Link key={s.slug} href={`${servicesPath}/${s.slug}`} className="block py-1.5 text-sm text-secondary-foreground/70 hover:text-primary">
                        {s.shortTitle}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {navLinks.map((link) => {
              const isHash = link.href.includes('#');
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
                onClick={() => { setCallDialogOpen(true); setMobileOpen(false); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-primary/40 text-primary font-display font-bold tracking-wider text-sm hover:bg-primary/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {isSpanish ? "LLAMAR" : "CALL NOW"}
              </button>
              <a href={COMPANY.appointmentUrl} target="_blank" rel="noopener noreferrer" className="block" onClick={() => trackSchedule("mobile_menu")}>
                <Button
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-wider text-sm py-2.5"
                >
                  {isSpanish ? t.scheduleNow : "SCHEDULE NOW"}
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

    {/* Call Now Dialog */}
    <CallNowDialog
      open={callDialogOpen}
      onClose={() => setCallDialogOpen(false)}
      source="nav"
    />
    </>
  );
}
