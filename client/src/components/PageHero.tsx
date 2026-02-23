/**
 * PageHero — Industrial Brutalism Design
 * Blue accents, diagonal accent, bold typography
 * Reusable hero banner for inner pages
 */
import { COMPANY } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  backgroundImage?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ title, subtitle, breadcrumb, backgroundImage, icon }: PageHeroProps) {
  const defaultBg = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80";

  return (
    <div className="relative">
      {/* Hero */}
      <div
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${backgroundImage || defaultBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center z-10 px-4">
          {icon && (
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center text-white">
                {icon}
              </div>
            </div>
          )}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-wider leading-tight">
            {title}
          </h1>
          <div className="h-1 w-24 bg-primary mx-auto mt-4" />
          
          {subtitle && (
            <p className="text-white/70 text-lg mt-4 font-medium tracking-wide">
              {subtitle}
            </p>
          )}

          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
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
      <div className="bg-background py-8 flex justify-center">
        <a
          href={COMPANY.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest px-10 shadow-lg"
          >
            APPOINTMENT
          </Button>
        </a>
      </div>
    </div>
  );
}
