/**
 * PageHero — Industrial Brutalism Design
 * Blue accents, diagonal accent, bold typography
 * Reusable hero banner for inner pages
 * MOBILE: Reduced height (35vh), smaller text, compact appointment ribbon
 * BILINGUAL: Uses useTranslation for appointment button text
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  backgroundImage?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ title, subtitle, breadcrumb, backgroundImage, icon }: PageHeroProps) {
  const defaultBg = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&q=50&fm=webp&fit=crop&auto=format";
  const { isSpanish, ui } = useTranslation();
  const appointmentLabel = isSpanish ? (ui?.pageHero?.appointment ?? "CITA") : "APPOINTMENT";

  return (
    <div className="relative">
      {/* Hero */}
      <div
        className="relative h-[35vh] sm:h-[50vh] min-h-[220px] sm:min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgroundImage || defaultBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center z-10 px-4">
          {icon && (
            <div className="flex justify-center mb-3 sm:mb-6">
              <div className="w-10 h-10 sm:w-16 sm:h-16 flex items-center justify-center text-white">
                {icon}
              </div>
            </div>
          )}
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-wider leading-tight">
            {title}
          </h1>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mt-3 sm:mt-4" />
          
          {subtitle && (
            <p className="text-white/70 text-sm sm:text-lg mt-2 sm:mt-4 font-medium tracking-wide max-w-xs sm:max-w-none mx-auto">
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-2 sm:mt-4 text-xs sm:text-sm">
              {breadcrumb.map((item, i) => (
                <span key={i} className="flex items-center space-x-2">
                  {i > 0 && <span className="text-white/40">·</span>}
                  {item.href ? (
                    <Link href={item.href} className="text-white/60 hover:text-primary transition-colors font-display tracking-wider">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-primary font-display tracking-wider">
                      {item.label}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Appointment ribbon */}
      <div className="bg-background py-4 sm:py-8 flex justify-center">
        <a
          href={COMPANY.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest px-6 sm:px-10 text-sm sm:text-base shadow-lg"
          >
            {appointmentLabel}
          </Button>
        </a>
      </div>
    </div>
  );
}
