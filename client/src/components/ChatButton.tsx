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

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("[ChatButton] Clicked, toggling from", isChatOpen, "to", !isChatOpen);
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Chat Bubble */}
      <ChatBubble
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        language={language}
      />

      {/* Floating Button with inline styles */}
      <button
        onClick={handleButtonClick}
        aria-label={buttonLabel}
        type="button"
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "#0066ff",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          pointerEvents: "auto",
          transition: "all 0.3s ease",
          transform: isChatOpen ? "scale(0.95)" : "scale(1)",
        }}
        onMouseEnter={(e) => {
          if (!isChatOpen) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.2)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isChatOpen) {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
          }
        }}
      >
        <MessageCircle size={32} style={{ pointerEvents: "none" }} />
        
        {/* Pulse animation when not open */}
        {!isChatOpen && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              backgroundColor: "#0066ff",
              opacity: 0.75,
              animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              pointerEvents: "none",
            }}
          />
        )}

        {/* Tooltip */}
        <span
          style={{
            position: "absolute",
            bottom: "100%",
            marginBottom: "8px",
            paddingLeft: "12px",
            paddingRight: "12px",
            paddingTop: "4px",
            paddingBottom: "4px",
            backgroundColor: "white",
            color: "black",
            fontSize: "14px",
            borderRadius: "4px",
            opacity: 0,
            transition: "opacity 0.3s ease",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLSpanElement).style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLSpanElement).style.opacity = "0";
          }}
        >
          {buttonLabel}
        </span>
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.75;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
}
