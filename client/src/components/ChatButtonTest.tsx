import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { ChatBubble } from "./ChatBubble";

interface ChatButtonProps {
  language?: "en" | "es";
}

export function ChatButtonTest({ language = "en" }: ChatButtonProps) {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleButtonClick = () => {
    console.log("[ChatButtonTest] Button clicked! Current state:", isChatOpen);
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

      {/* Test Button - Minimal styling */}
      <button
        onClick={handleButtonClick}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "64px",
          height: "64px",
          borderRadius: "50%",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        aria-label="Open chat"
      >
        <MessageCircle size={32} />
      </button>
    </>
  );
}
