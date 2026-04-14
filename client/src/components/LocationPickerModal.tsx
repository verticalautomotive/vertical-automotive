/**
 * LocationPickerModal — Clean location chooser that appears when a service tile is clicked.
 * Shows the Vertical Automotive logo, a prompt, and two large tappable location buttons.
 * Matches the site's dark/blue industrial theme.
 */
import { useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { COMPANY, LOCATIONS } from "@/lib/data";
import { getCityServicePath } from "@/lib/cityServiceSlugs";
import { MapPin, X, Phone } from "lucide-react";

interface LocationPickerModalProps {
  open: boolean;
  onClose: () => void;
  /** The data-file slug for the service (e.g., "brake-system") */
  serviceSlug: string;
  /** Service display name shown in the modal */
  serviceName: string;
  /** Language prefix: "" for EN, "/es" for ES */
  langPrefix?: string;
}

const CITY_MAP: { key: string; locationIndex: number }[] = [
  { key: "fort-lauderdale", locationIndex: 1 },
  { key: "wilton-manors", locationIndex: 0 },
];

export default function LocationPickerModal({
  open,
  onClose,
  serviceSlug,
  serviceName,
  langPrefix = "",
}: LocationPickerModalProps) {
  const [, navigate] = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleLocationClick = (cityKey: string) => {
    const path = getCityServicePath(cityKey, serviceSlug);
    onClose();
    navigate(`${langPrefix}${path}`);
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Choose a location"
    >
      <div className="relative w-full max-w-sm bg-secondary rounded-2xl shadow-2xl border border-border/30 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Header with logo */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          <img
            src={COMPANY.logoUrl}
            alt="Vertical Automotive"
            className="h-10 mb-4"
          />
          <h3 className="text-lg font-bold text-white text-center leading-tight">
            Which location for
          </h3>
          <p className="text-primary font-black text-center mt-1">
            {serviceName}?
          </p>
        </div>

        {/* Location buttons */}
        <div className="flex flex-col gap-3 px-6 pb-8">
          {CITY_MAP.map(({ key, locationIndex }) => {
            const loc = LOCATIONS[locationIndex];
            return (
              <button
                key={key}
                onClick={() => handleLocationClick(key)}
                className="group w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary hover:bg-primary/10 transition-all duration-200 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-base">
                    {loc.name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {loc.phone}
                    </span>
                  </div>
                </div>
                <div className="flex-shrink-0 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
