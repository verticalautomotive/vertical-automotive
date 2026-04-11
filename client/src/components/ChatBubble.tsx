/**
 * ChatBubble — Shift AI iframe panel
 * Opens/closes via ChatButton. Renders the Shift AI hosted bot in an iframe.
 */

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

export function ChatBubble({ isOpen, onClose }: ChatBubbleProps) {
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
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close chat"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 10000,
          background: "rgba(0,0,0,0.55)",
          border: "none",
          borderRadius: "50%",
          width: "28px",
          height: "28px",
          color: "#fff",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          lineHeight: 1,
        }}
      >
        ×
      </button>

      <iframe
        src="https://shift-vertical-automotive-ai-992037985080.us-west1.run.app"
        style={{ border: "none", width: "100%", height: "100%" }}
        title="Shift AI Chat"
        allow="microphone"
      />
    </div>
  );
}
