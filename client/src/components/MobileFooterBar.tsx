/**
 * MobileFooterBar — Sticky bottom bar on mobile only
 * Shows Call Now button (opens location picker) + Schedule button
 * Neon blue glow effect matching brand colors
 * Bilingual: adapts text based on /es/ URL prefix
 */
import { Phone, CalendarCheck } from "lucide-react";
import { COMPANY } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";
import { trackSchedule } from "@/lib/gtm";
import { useState } from "react";
import CallNowDialog from "./CallNowDialog";

export default function MobileFooterBar() {
  const { isSpanish } = useTranslation();
  const [callDialogOpen, setCallDialogOpen] = useState(false);

  const callLabel = isSpanish ? "LLAMAR" : "CALL NOW";
  const scheduleLabel = isSpanish ? "AGENDAR" : "SCHEDULE";

  return (
    <>
      <div className="mobile-footer-bar fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Neon glow border on top */}
        <div className="neon-glow-line h-[2px] w-full" />

        <div className="flex items-stretch bg-[#0a0e17]/95 backdrop-blur-md">
          {/* Call Now Button */}
          <button
            onClick={() => setCallDialogOpen(true)}
            className="neon-call-btn flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 border-r border-white/10 active:bg-blue-500/20 transition-colors"
          >
            <Phone className="w-5 h-5 neon-icon" />
            <span className="text-xs font-extrabold text-white tracking-widest">
              {callLabel}
            </span>
          </button>

          {/* Schedule Button */}
          <a
            href={COMPANY.appointmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="neon-schedule-btn flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 active:brightness-125 transition-all"
            onClick={() => trackSchedule("mobile_footer")}
          >
            <CalendarCheck className="w-5 h-5 text-white" />
            <span className="text-xs font-extrabold text-white tracking-widest">
              {scheduleLabel}
            </span>
          </a>
        </div>

        {/* Safe area padding for devices with home indicator */}
        <div className="bg-[#0a0e17]/95 backdrop-blur-md safe-area-bottom" />
      </div>

      {/* Call Now Dialog */}
      <CallNowDialog
        open={callDialogOpen}
        onClose={() => setCallDialogOpen(false)}
        source="mobile_footer"
      />
    </>
  );
}
