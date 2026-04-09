/**
 * ChatButton Component
 * Floating button to open/close the AI Studio chat bubble
 * Desktop: Bottom-right corner, 64px circle
 * Mobile: Responsive sizing
 */

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatBubble } from "./ChatBubble";

interface ChatButtonProps {
  language?: "en" | "es";
}

export function ChatButton({ language = "en" }: ChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const buttonLabel =
    language === "es" ? "Abrir chat" : "Open chat";

  return (
    <>
      {/* Chat Bubble */}
      <ChatBubble
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
      />

      {/* Floating Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        aria-label={buttonLabel}
        className={`fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
          isChatOpen ? "scale-95" : "hover:scale-110"
        }`}
      >
        <MessageCircle className="w-8 h-8" />
        
        {/* Pulse animation when not open */}
        {!isChatOpen && (
          <span className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-75"></span>
        )}

        {/* Tooltip */}
        <span className="absolute bottom-full mb-2 px-3 py-1 bg-foreground text-background text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {buttonLabel}
        </span>
      </button>
    </>
  );
}
