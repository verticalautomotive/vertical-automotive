/**
 * CallNowDialog — Reusable popup for choosing which location to call
 * Shows two location options: Wilton Manors and Fort Lauderdale
 * Bilingual: adapts labels based on /es/ URL prefix
 * Used in header, mobile footer bar, sticky bar, and FAQ CTA
 */
import { Phone, MapPin, X } from "lucide-react";
import { LOCATIONS } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";
import { trackCall } from "@/lib/gtm";
import { useEffect, useRef } from "react";

interface CallNowDialogProps {
  open: boolean;
  onClose: () => void;
  source: string;
}

export default function CallNowDialog({ open, onClose, source }: CallNowDialogProps) {
  const { isSpanish } = useTranslation();
  const overlayRef = useRef<HTMLDivElement>(null);

  const labels = isSpanish
    ? {
        title: "ELEGIR UBICACIÓN",
        subtitle: "Seleccione la ubicación más cercana para llamar",
      }
    : {
        title: "CHOOSE LOCATION",
        subtitle: "Select the nearest location to call",
      };

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200" />

      {/* Dialog */}
      <div className="relative bg-[#0f1724] border border-blue-500/30 shadow-2xl shadow-blue-500/10 w-full max-w-sm animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <h3 className="text-sm font-display font-bold text-white tracking-wider">
              {labels.title}
            </h3>
            <p className="text-xs text-blue-300/60 mt-0.5">{labels.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Location Options */}
        <div className="p-2">
          {LOCATIONS.map((loc, i) => (
            <a
              key={loc.name}
              href={`tel:${loc.phoneRaw}`}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors group ${
                i === 0 ? "border-b border-white/5" : ""
              }`}
              onClick={() => {
                trackCall(loc.name, loc.phone, source);
                onClose();
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                  {loc.name}
                </div>
                <div className="text-xs text-white/40 truncate">{loc.address}</div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Phone className="w-4 h-4 text-primary" />
                <span className="mono-number text-sm font-bold text-primary">
                  {loc.phone}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
