/**
 * ChatBubble — Shift AI iframe panel
 * - Listens for postMessage events from the Shift AI bot (close/minimize) to fully unmount
 * - Has a small × button on the wrapper as a reliable fallback dismiss control
 */
import { useEffect } from "react";
import { X } from "lucide-react";

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

export function ChatBubble({ isOpen, onClose }: ChatBubbleProps) {
  // Listen for postMessage events sent by the Shift AI bot when user closes it internally
  useEffect(() => {
    if (!isOpen) return;

    function handleMessage(event: MessageEvent) {
      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        const type: string = (data?.type ?? data?.action ?? data?.event ?? "").toLowerCase();
        if (
          type.includes("close") ||
          type.includes("hide") ||
          type.includes("minimize") ||
          type.includes("dismiss")
        ) {
          onClose();
        }
      } catch {
        // Non-JSON messages — ignore
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isOpen, onClose]);

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
      {/* Wrapper close button — always visible so user can dismiss the panel */}
      <button
        onClick={onClose}
        aria-label="Close chat"
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          zIndex: 10,
          width: "28px",
          height: "28px",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.55)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <X size={14} />
      </button>

      <iframe
        src="https://shift-vertical-automotive-ai-992037985080.us-west1.run.app?external=true&embed=true"
        style={{ border: "none", width: "100%", height: "100%" }}
        title="Shift AI Chat"
        allow="microphone"
      />
    </div>
  );
}
