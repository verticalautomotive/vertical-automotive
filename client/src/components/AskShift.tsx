/**
 * Ask Shift - AI Studio Chatbot Integration
 * Embeds AI Studio chatbot via iframe with external button control
 * Uses postMessage to trigger chat window from Shift button
 */
import { useEffect, useRef } from "react";

const AISTUDIO_IFRAME_URL = "https://ais-dev-q73kw5kk7gnfswdjstsrpe-629206854967.us-east1.run.app?external=true";

export default function AskShift() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Inject iframe into page
    const container = document.getElementById("shift-container");
    if (!container) {
      const div = document.createElement("div");
      div.id = "shift-container";
      document.body.appendChild(div);
    }
  }, []);

  // Expose openShiftChat to window for onclick handlers
  useEffect(() => {
    (window as any).openShiftChat = () => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage("openChat", "*");
      }
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      id="shift-chat"
      src={AISTUDIO_IFRAME_URL}
      style={{
        border: "none",
        width: "400px",
        height: "600px",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        borderRadius: "12px",
        boxShadow: "0 5px 40px rgba(0, 0, 0, 0.16)",
      }}
      title="Shift - Vertical Automotive Assistant"
    />
  );
}
