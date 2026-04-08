/**
 * FloatingActions — Floating action buttons on mobile only
 * 1. Ask Shift AI chatbot button
 * 2. SMS/Text icon with location picker popup (Wilton Manors / Fort Lauderdale)
 * 3. Directions icon with location picker popup
 * Positioned above the MobileFooterBar, right side
 * Bilingual: adapts labels based on /es/ URL prefix
 */
import { MessageCircle, Navigation2, X, MapPin, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { trackTextUs, trackDirections } from "@/lib/gtm";

const SMS_NUMBERS = {
  wiltonManors: "9548336584",
  fortLauderdale: "9544667186",
};

const DIRECTIONS_URLS = {
  wiltonManors: "https://maps.app.goo.gl/dyKs1o1YECYzbJFf6",
  fortLauderdale: "https://maps.app.goo.gl/52SrqXcH6K65Nqn66",
};

type PopupType = "sms" | "directions" | null;

interface FloatingActionsProps {
  onAskShiftClick?: () => void;
  askShiftOpen?: boolean;
}

export default function FloatingActions({ onAskShiftClick, askShiftOpen }: FloatingActionsProps) {
  const [openPopup, setOpenPopup] = useState<PopupType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSpanish } = useTranslation();

  const labels = isSpanish
    ? {
        textUs: "Enviar Texto",
        getDirections: "Direcciones",
        askShift: "Ask Shift",
        wiltonManors: "Wilton Manors",
        fortLauderdale: "Fort Lauderdale",
        chooseLocation: "Elegir ubicación",
      }
    : {
        textUs: "Text Us",
        getDirections: "Directions",
        askShift: "Ask Shift",
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
            onClick={() => { trackTextUs("Wilton Manors", "(954) 833-6584", "floating_button"); setOpenPopup(null); }}
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
            onClick={() => { trackTextUs("Fort Lauderdale", "(954) 466-7186", "floating_button"); setOpenPopup(null); }}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
              <div className="text-[11px] text-blue-300/70 mono-number">(954) 466-7186</div>
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
            onClick={() => { trackDirections("Wilton Manors", "floating_button"); setOpenPopup(null); }}
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
            onClick={() => { trackDirections("Fort Lauderdale", "floating_button"); setOpenPopup(null); }}
          >
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
              <div className="text-[11px] text-white/50">707 NE 11th St</div>
            </div>
          </a>
        </div>
      )}

      {/* Ask Shift Button — mobile only */}
      <button
        onClick={onAskShiftClick}
        className={`group relative flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-200 active:scale-95 ${
          askShiftOpen
            ? "bg-primary text-white shadow-primary/40"
            : "bg-primary text-white shadow-primary/30 hover:shadow-primary/50 hover:scale-105"
        }`}
        aria-label={labels.askShift}
      >
        <Sparkles className="w-6 h-6" />
        {/* Pulse indicator */}
        {!askShiftOpen && (
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
        )}
        {/* Label tooltip */}
        <span className="absolute right-full mr-2 px-2 py-1 bg-[#0f1724] text-white text-[10px] font-bold tracking-wider rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-blue-500/20">
          {labels.askShift}
        </span>
      </button>

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
