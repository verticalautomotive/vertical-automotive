/**
 * ChatBubble — Shift AI iframe panel
 * Opens/closes via ChatButton. The Shift AI bot has its own built-in close/expand controls.
 * This wrapper is a clean transparent container only.
 */

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

export function ChatBubble({ isOpen }: ChatBubbleProps) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "20px",
        zIndex: 9998,
        width: "400px",
        height: "600px",
        maxWidth: "calc(100vw - 32px)",
        maxHeight: "calc(100vh - 120px)",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}
    >
      <iframe
        src="https://shift-vertical-automotive-ai-992037985080.us-west1.run.app?external=true&embed=true"
        style={{ border: "none", width: "100%", height: "100%" }}
        title="Shift AI Chat"
        allow="microphone"
      />
    </div>
  );
}
