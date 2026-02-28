/**
 * FloatingActions — Floating action buttons on mobile only
 * 1. SMS/Text icon with location picker popup (Wilton Manors / Fort Lauderdale)
 * 2. Directions icon with location picker popup
 * Positioned above the MobileFooterBar, right side
 * Bilingual: adapts labels based on /es/ URL prefix
 */
import { MessageCircle, Navigation2, X, MapPin } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const SMS_NUMBERS = {
  wiltonManors: "9548336584",
  fortLauderdale: "8448411185",
};

const DIRECTIONS_URLS = {
  wiltonManors: "https://www.google.com/maps/dir/?api=1&destination=1100+W+Oakland+Park+Blvd+Unit+5+Wilton+Manors+FL+33311",
  fortLauderdale: "https://www.google.com/maps/dir/?api=1&destination=707+NE+11th+St+Fort+Lauderdale+FL+33304",
};

type PopupType = "sms" | "directions" | null;

export default function FloatingActions() {
  const [openPopup, setOpenPopup] = useState<PopupType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSpanish } = useTranslation();

  const labels = isSpanish
    ? {
        textUs: "Enviar Texto",
        getDirections: "Direcciones",
        wiltonManors: "Wilton Manors",
        fortLauderdale: "Fort Lauderdale",
        chooseLocation: "Elegir ubicación",
      }
    : {
        textUs: "Text Us",
        getDirections: "Directions",
        wiltonManors: "Wilton Manors",
        fortLauderdale: "Fort Lauderdale",
        chooseLocation: "Choose location",
      };

  // Close popup on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenPopup(null);
      }
    }
    if (openPopup) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openPopup]);

  const togglePopup = (type: PopupType) => {
    setOpenPopup((prev) => (prev === type ? null : type));
  };

  return (
    <div
      ref={containerRef}
      className="fixed right-4 z-50 md:hidden flex flex-col items-end gap-3"
      style={{ bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* SMS Popup */}
      {openPopup === "sms" && (
        <div className="bg-[#0f1724] border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 mb-1 w-56">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="text-xs font-display font-bold text-blue-300 tracking-wider uppercase">
              {labels.chooseLocation}
            </span>
            <button onClick={() => setOpenPopup(null)} className="text-white/50 hover:text-white p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <a
            href={`sms:${SMS_NUMBERS.wiltonManors}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors border-b border-white/5"
            onClick={() => setOpenPopup(null)}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.wiltonManors}</div>
              <div className="text-[11px] text-blue-300/70 mono-number">(954) 833-6584</div>
            </div>
          </a>
          <a
            href={`sms:${SMS_NUMBERS.fortLauderdale}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors"
            onClick={() => setOpenPopup(null)}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
              <div className="text-[11px] text-blue-300/70 mono-number">(844) 841-1185</div>
            </div>
          </a>
        </div>
      )}

      {/* Directions Popup */}
      {openPopup === "directions" && (
        <div className="bg-[#0f1724] border border-blue-500/30 rounded-xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 mb-1 w-56">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10">
            <span className="text-xs font-display font-bold text-blue-300 tracking-wider uppercase">
              {labels.chooseLocation}
            </span>
            <button onClick={() => setOpenPopup(null)} className="text-white/50 hover:text-white p-0.5">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <a
            href={DIRECTIONS_URLS.wiltonManors}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors border-b border-white/5"
            onClick={() => setOpenPopup(null)}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.wiltonManors}</div>
              <div className="text-[11px] text-white/50">1100 W Oakland Park Blvd</div>
            </div>
          </a>
          <a
            href={DIRECTIONS_URLS.fortLauderdale}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors"
            onClick={() => setOpenPopup(null)}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
              <div className="text-[11px] text-white/50">707 NE 11th St</div>
            </div>
          </a>
        </div>
      )}

      {/* Floating SMS Button */}
      <button
        onClick={() => togglePopup("sms")}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 active:scale-95 ${
          openPopup === "sms"
            ? "bg-primary text-white shadow-primary/40"
            : "bg-[#0f1724]/95 text-primary border border-blue-500/30 shadow-blue-500/20 hover:shadow-blue-500/40"
        }`}
        aria-label={labels.textUs}
      >
        <MessageCircle className="w-6 h-6" />
        {/* Label tooltip */}
        <span className="absolute right-full mr-2 px-2 py-1 bg-[#0f1724] text-white text-[10px] font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-blue-500/20">
          {labels.textUs}
        </span>
      </button>

      {/* Floating Directions Button */}
      <button
        onClick={() => togglePopup("directions")}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 active:scale-95 ${
          openPopup === "directions"
            ? "bg-primary text-white shadow-primary/40"
            : "bg-[#0f1724]/95 text-primary border border-blue-500/30 shadow-blue-500/20 hover:shadow-blue-500/40"
        }`}
        aria-label={labels.getDirections}
      >
        <Navigation2 className="w-6 h-6" />
        <span className="absolute right-full mr-2 px-2 py-1 bg-[#0f1724] text-white text-[10px] font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-blue-500/20">
          {labels.getDirections}
        </span>
      </button>
    </div>
  );
}
