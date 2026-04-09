/**
 * Shift Button - Desktop floating button
 * Shows on desktop (md and up), hidden on mobile
 */
import { Sparkles } from "lucide-react";

export default function ShiftButton() {
  const handleClick = () => {
    (window as any).openShiftChat?.();
  };

  return (
    <button
      onClick={handleClick}
      className="hidden md:flex fixed bottom-8 right-8 items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-200 active:scale-95 z-[9999]"
      aria-label="Ask Shift"
      title="Ask Shift - Chat with our AI Assistant"
    >
      <Sparkles className="w-7 h-7" />
    </button>
  );
}
