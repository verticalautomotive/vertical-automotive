/**
 * PageHero — Reusable hero banner for inner pages
 * Black background with car image, page title, breadcrumb
 * Diagonal white transition at bottom (matching original site)
 */
import { COMPANY } from "@/lib/data";
import { Link } from "wouter";

interface PageHeroProps {
  title: string;
  breadcrumb: { label: string; href?: string }[];
  backgroundImage?: string;
  icon?: React.ReactNode;
}

export default function PageHero({ title, breadcrumb, backgroundImage, icon }: PageHeroProps) {
  const defaultBg = "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1400&q=80";

  return (
    <div className="relative">
      {/* Hero */}
      <div
        className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-black"
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
          <div className="flex items-center justify-center space-x-2 mt-4 text-sm">
            {breadcrumb.map((item, i) => (
              <span key={i} className="flex items-center space-x-2">
                {i > 0 && <span className="text-white/40">·</span>}
                {item.href ? (
                  <Link href={item.href} className="text-white/60 hover:text-green-400 transition-colors font-display tracking-wider">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-green-400 font-display tracking-wider underline underline-offset-4">
                    {item.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment ribbon */}
      <div className="relative bg-white" style={{ clipPath: "polygon(0 0, 100% 30%, 100% 100%, 0 100%)" }}>
        <div className="pt-12 pb-8 flex justify-center">
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white font-display font-bold uppercase tracking-widest px-10 py-3 text-sm hover:bg-red-700 transition-colors relative"
            style={{ clipPath: "polygon(5% 0, 95% 0, 100% 100%, 0 100%)" }}
          >
            APPOINTMENT
          </a>
        </div>
      </div>
    </div>
  );
}
