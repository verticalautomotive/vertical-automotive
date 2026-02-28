/**
 * MobileFooterBar — Sticky bottom bar on mobile only
 * Shows Call buttons for both locations + Schedule button
 * Neon blue glow effect matching brand colors
 * Bilingual: adapts text based on /es/ URL prefix
 */
import { Phone, CalendarCheck } from "lucide-react";
import { LOCATIONS, COMPANY } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";
import { trackCall, trackSchedule } from "@/lib/gtm";

export default function MobileFooterBar() {
  const { isSpanish } = useTranslation();

  const scheduleLabel = isSpanish ? "AGENDAR" : "SCHEDULE";

  return (
    <div className="mobile-footer-bar fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Neon glow border on top */}
      <div className="neon-glow-line h-[2px] w-full" />

      <div className="flex items-stretch bg-[#0a0e17]/95 backdrop-blur-md">
        {/* Call Wilton Manors */}
        <a
          href={`tel:${LOCATIONS[0].phoneRaw}`}
          className="neon-call-btn flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 border-r border-white/10 active:bg-blue-500/20 transition-colors"
          onClick={() => trackCall("Wilton Manors", LOCATIONS[0].phone, "mobile_footer")}
        >
          <Phone className="w-4 h-4 neon-icon" />
          <span className="text-[10px] font-medium text-blue-300/80 tracking-wide">
            {LOCATIONS[0].name}
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            {LOCATIONS[0].phone}
          </span>
        </a>

        {/* Call Fort Lauderdale */}
        <a
          href={`tel:${LOCATIONS[1].phoneRaw}`}
          className="neon-call-btn flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 border-r border-white/10 active:bg-blue-500/20 transition-colors"
          onClick={() => trackCall("Fort Lauderdale", LOCATIONS[1].phone, "mobile_footer")}
        >
          <Phone className="w-4 h-4 neon-icon" />
          <span className="text-[10px] font-medium text-blue-300/80 tracking-wide">
            {LOCATIONS[1].name}
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            {LOCATIONS[1].phone}
          </span>
        </a>

        {/* Schedule Button */}
        <a
          href={COMPANY.appointmentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="neon-schedule-btn flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 active:brightness-125 transition-all"
          onClick={() => trackSchedule("mobile_footer")}
        >
          <CalendarCheck className="w-4 h-4 text-white" />
          <span className="text-xs font-extrabold text-white tracking-widest">
            {scheduleLabel}
          </span>
        </a>
      </div>

      {/* Safe area padding for devices with home indicator */}
      <div className="bg-[#0a0e17]/95 backdrop-blur-md safe-area-bottom" />
    </div>
  );
}
