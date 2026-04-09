/**
 * ChatButton Component
 * Floating button to open/close the AI Studio chat bubble
 * Uses Shift's original design (Sparkles icon, blue color, pulse animation)
 * Desktop: Bottom-right corner, 64px circle (via App.tsx)
 * Mobile: Rendered inside FloatingActions component
 */

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { ChatBubble } from "./ChatBubble";

interface ChatButtonProps {
  language?: "en" | "es";
  isMobile?: boolean;
}

export function ChatButton({ language = "en", isMobile = false }: ChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const buttonLabel =
    language === "es" ? "Preguntar a Shift" : "Ask Shift";

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[ChatButton] Clicked, toggling from", isChatOpen, "to", !isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

  // Mobile button styling (used in FloatingActions)
  if (isMobile) {
    return (
      <>
        <ChatBubble
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          language={language}
        />
        <button
          onClick={handleButtonClick}
          aria-label={buttonLabel}
          type="button"
          title={buttonLabel}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/40 hover:scale-110 transition-all duration-200 active:scale-95 z-[1000] pointer-events-auto cursor-pointer"
        >
          <Sparkles className="w-6 h-6" />
        </button>
      </>
    );
  }

  // Desktop button styling (fixed position)
  return (
    <>
      <ChatBubble
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
      />

      <button
        onClick={handleButtonClick}
        aria-label={buttonLabel}
        type="button"
        title={buttonLabel}
        className="hidden md:flex fixed bottom-8 right-8 items-center justify-center w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-200 active:scale-95 z-[1000] pointer-events-auto cursor-pointer"
      >
        <Sparkles className="w-7 h-7" />
      </button>
    </>
  );
}
