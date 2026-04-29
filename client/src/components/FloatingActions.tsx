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
  isChatOpen?: boolean;
  onChatToggle?: () => void;
}

export default function FloatingActions({ isChatOpen: _isChatOpen, onChatToggle: _onChatToggle }: FloatingActionsProps) {
  const [openPopup, setOpenPopup] = useState<PopupType>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { isSpanish } = useTranslation();

  const labels = isSpanish
    ? {
        textUs: "Texto",
        getDirections: "Cómo llegar",
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
    <>
      {/* Mobile Floating Actions Container */}
      <div
        ref={containerRef}
        className="fixed right-3 z-50 md:hidden flex flex-col items-end gap-2.5"
        style={{ bottom: "calc(5.5rem + env(safe-area-inset-bottom, 0px))" }}
      >
        {/* SMS Popup */}
        {openPopup === "sms" && (
          <div className="bg-[#0a1220] border border-blue-400/40 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 mb-1 w-60">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-blue-600/10">
              <span className="text-xs font-display font-bold text-blue-300 tracking-wider uppercase">
                {labels.chooseLocation}
              </span>
              <button onClick={() => setOpenPopup(null)} className="text-white/50 hover:text-white p-0.5">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <a
              href={`sms:${SMS_NUMBERS.wiltonManors}`}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors border-b border-white/5"
              onClick={() => { trackTextUs("Wilton Manors", "(954) 833-6584", "floating_button"); setOpenPopup(null); }}
            >
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{labels.wiltonManors}</div>
                <div className="text-[11px] text-blue-300/80 mono-number">(954) 833-6584</div>
              </div>
            </a>
            <a
              href={`sms:${SMS_NUMBERS.fortLauderdale}`}
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-blue-500/15 active:bg-blue-500/25 transition-colors"
              onClick={() => { trackTextUs("Fort Lauderdale", "(954) 466-7186", "floating_button"); setOpenPopup(null); }}
            >
              <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
                <div className="text-[11px] text-blue-300/80 mono-number">(954) 466-7186</div>
              </div>
            </a>
          </div>
        )}

        {/* Directions Popup */}
        {openPopup === "directions" && (
          <div className="bg-[#0a1220] border border-green-400/40 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-2 fade-in duration-200 mb-1 w-60">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-green-600/10">
              <span className="text-xs font-display font-bold text-green-300 tracking-wider uppercase">
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
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-green-500/15 active:bg-green-500/25 transition-colors border-b border-white/5"
              onClick={() => { trackDirections("Wilton Manors", "floating_button"); setOpenPopup(null); }}
            >
              <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{labels.wiltonManors}</div>
                <div className="text-[11px] text-white/50">1100 W Oakland Park Blvd</div>
              </div>
            </a>
            <a
              href={DIRECTIONS_URLS.fortLauderdale}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3.5 hover:bg-green-500/15 active:bg-green-500/25 transition-colors"
              onClick={() => { trackDirections("Fort Lauderdale", "floating_button"); setOpenPopup(null); }}
            >
              <MapPin className="w-4 h-4 text-green-400 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold text-white">{labels.fortLauderdale}</div>
                <div className="text-[11px] text-white/50">707 NE 11th St</div>
              </div>
            </a>
          </div>
        )}

        {/* Floating SMS Button — solid blue pill with label */}
        <button
          onClick={() => togglePopup("sms")}
          className={`flex items-center gap-2 px-4 h-12 rounded-full shadow-xl transition-all duration-200 active:scale-95 font-bold text-sm tracking-wide ${
            openPopup === "sms"
              ? "bg-blue-700 text-white shadow-blue-600/60 scale-95"
              : "bg-blue-600 text-white shadow-blue-600/50 hover:bg-blue-500 hover:shadow-blue-500/60"
          }`}
          aria-label={labels.textUs}
          style={{ boxShadow: openPopup === "sms" ? undefined : "0 4px 20px rgba(37,99,235,0.55), 0 1px 4px rgba(0,0,0,0.4)" }}
        >
          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span>{labels.textUs}</span>
        </button>

        {/* Floating Directions Button — solid green pill with label */}
        <button
          onClick={() => togglePopup("directions")}
          className={`flex items-center gap-2 px-4 h-12 rounded-full shadow-xl transition-all duration-200 active:scale-95 font-bold text-sm tracking-wide ${
            openPopup === "directions"
              ? "bg-green-700 text-white shadow-green-600/60 scale-95"
              : "bg-green-600 text-white shadow-green-600/50 hover:bg-green-500 hover:shadow-green-500/60"
          }`}
          aria-label={labels.getDirections}
          style={{ boxShadow: openPopup === "directions" ? undefined : "0 4px 20px rgba(22,163,74,0.55), 0 1px 4px rgba(0,0,0,0.4)" }}
        >
          <Navigation2 className="w-5 h-5 flex-shrink-0" />
          <span>{labels.getDirections}</span>
        </button>
      </div>
    </>
  );
}
