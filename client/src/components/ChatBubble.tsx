/**
 * ChatBubble — "Shift" AI assistant for Vertical Automotive
 * Design spec: 400px wide, clean white background, mobile-friendly
 * Header: "Shift" branding, green active dot, "Your Auto Repair Assistant" tagline
 * Features: quick-reply buttons, typing indicator, bilingual, lead capture, escalation
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { X, Send, Wrench, Phone, Calendar, MapPin, Tag, User } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  quickReplies?: string[];
  isEscalation?: boolean;
}

const QUICK_REPLIES_EN = [
  "Book an Appointment",
  "Services & Pricing",
  "Hours & Location",
  "Current Offers",
  "Talk to Someone",
];

const QUICK_REPLIES_ES = [
  "Hacer una Cita",
  "Servicios y Precios",
  "Horarios y Ubicación",
  "Ofertas Actuales",
  "Hablar con Alguien",
];

const GREETING_EN = `Hi! I'm Shift, Vertical Automotive's AI assistant. How can I help you today?`;
const GREETING_ES = `¡Hola! Soy Shift, el asistente de IA de Vertical Automotive. ¿En qué puedo ayudarte hoy?`;

const ESCALATION_MSG_EN = `Of course! You can call us right now at **(954) 565-1518**, or I can have someone call you back — which do you prefer?`;
const ESCALATION_MSG_ES = `¡Claro! Puedes llamarnos ahora al **(954) 565-1518**, o puedo hacer que alguien te llame — ¿qué prefieres?`;

function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
}

// Simple markdown bold renderer
function renderContent(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export function ChatBubble({ isOpen, onClose, language = "en" }: ChatBubbleProps) {
  const isEs = language === "es";
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const chatMutation = trpc.chatbot.chat.useMutation();

  // Show greeting when panel opens
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      setMessages([
        {
          role: "assistant",
          content: isEs ? GREETING_ES : GREETING_EN,
          timestamp: new Date(),
          quickReplies: isEs ? QUICK_REPLIES_ES : QUICK_REPLIES_EN,
        },
      ]);
    }
  }, [isOpen, hasGreeted, isEs]);

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setMessages([]);
      setHasGreeted(false);
      setInput("");
      setIsTyping(false);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    // Detect language from message
    const detectedLang: "en" | "es" =
      /[áéíóúüñ¿¡]/i.test(text) || isEs ? "es" : "en";

    try {
      const result = await chatMutation.mutateAsync({
        messages: updatedMessages.map((m) => ({
          role: m.role,
          content: m.content,
        })),
        lang: detectedLang,
      });

      const assistantMsg: Message = {
        role: "assistant",
        content: result.reply,
        timestamp: new Date(),
        isEscalation: result.needsHuman,
      };

      // Add escalation CTA if needed
      if (result.needsHuman) {
        assistantMsg.content =
          result.reply +
          "\n\n" +
          (detectedLang === "es" ? ESCALATION_MSG_ES : ESCALATION_MSG_EN);
      }

      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: isEs
            ? "Lo siento, tuve un problema técnico. Por favor llama al (954) 565-1518."
            : "Sorry, I had a technical issue. Please call us at (954) 565-1518.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, chatMutation, isEs]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "100px",
        right: "20px",
        zIndex: 9998,
        width: "400px",
        maxWidth: "calc(100vw - 32px)",
        height: "580px",
        maxHeight: "calc(100vh - 120px)",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 12px 48px rgba(0,0,0,0.28)",
        fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
        fontSize: "14px",
        backgroundColor: "#ffffff",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d1f3c 100%)",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexShrink: 0,
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #0066cc, #0044aa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <Wrench size={18} color="white" />
          {/* Green active dot */}
          <span
            style={{
              position: "absolute",
              bottom: "1px",
              right: "1px",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#22c55e",
              border: "2px solid #0a1628",
            }}
          />
        </div>

        {/* Title */}
        <div style={{ flex: 1 }}>
          <div style={{ color: "white", fontWeight: 700, fontSize: "15px", lineHeight: 1.2 }}>
            Shift
          </div>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", marginTop: "1px" }}>
            {isEs ? "Tu Asistente de Reparación de Autos" : "Your Auto Repair Assistant"}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close chat"
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "rgba(255,255,255,0.8)",
            flexShrink: 0,
          }}
        >
          <X size={14} />
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          background: "#f8f9fb",
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx}>
            <div
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-end",
                gap: "6px",
              }}
            >
              {/* Bot avatar for assistant messages */}
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #0066cc, #0044aa)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Wrench size={12} color="white" />
                </div>
              )}

              <div
                style={{
                  maxWidth: "78%",
                  padding: "10px 13px",
                  borderRadius:
                    msg.role === "user"
                      ? "16px 16px 4px 16px"
                      : "16px 16px 16px 4px",
                  background: msg.role === "user" ? "#0066cc" : "#ffffff",
                  color: msg.role === "user" ? "white" : "#1a1a2e",
                  boxShadow:
                    msg.role === "assistant"
                      ? "0 1px 4px rgba(0,0,0,0.08)"
                      : "none",
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              >
                {renderContent(msg.content)}
                <div
                  style={{
                    fontSize: "10px",
                    marginTop: "4px",
                    opacity: 0.55,
                    textAlign: "right",
                  }}
                >
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            </div>

            {/* Quick reply buttons */}
            {msg.quickReplies && msg.quickReplies.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "6px",
                  marginTop: "8px",
                  paddingLeft: "32px",
                }}
              >
                {msg.quickReplies.map((qr, qIdx) => {
                  const icons = [Calendar, Wrench, MapPin, Tag, User];
                  const Icon = icons[qIdx] ?? Wrench;
                  return (
                    <button
                      key={qIdx}
                      onClick={() => sendMessage(qr)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        border: "1.5px solid #0066cc",
                        background: "white",
                        color: "#0066cc",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "#0066cc";
                        (e.currentTarget as HTMLButtonElement).style.color = "white";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "white";
                        (e.currentTarget as HTMLButtonElement).style.color = "#0066cc";
                      }}
                    >
                      <Icon size={11} />
                      {qr}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Escalation CTA */}
            {msg.isEscalation && (
              <div
                style={{
                  marginTop: "8px",
                  paddingLeft: "32px",
                  display: "flex",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <a
                  href="tel:+19545651518"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "7px 14px",
                    borderRadius: "20px",
                    background: "#0066cc",
                    color: "white",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  <Phone size={11} />
                  {isEs ? "Llamar Ahora" : "Call Now"}
                </a>
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "6px" }}>
            <div
              style={{
                width: "26px",
                height: "26px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0066cc, #0044aa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Wrench size={12} color="white" />
            </div>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "16px 16px 16px 4px",
                background: "#ffffff",
                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                display: "flex",
                gap: "4px",
                alignItems: "center",
              }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    background: "#0066cc",
                    opacity: 0.4,
                    animation: `chatDot 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input ── */}
      <div
        style={{
          padding: "12px 14px",
          background: "#ffffff",
          borderTop: "1px solid #e8eaf0",
          display: "flex",
          gap: "8px",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isEs ? "Escribe tu mensaje..." : "Type your message..."}
          disabled={isTyping}
          style={{
            flex: 1,
            padding: "9px 14px",
            borderRadius: "22px",
            border: "1.5px solid #e0e4ef",
            outline: "none",
            fontSize: "13px",
            background: "#f8f9fb",
            color: "#1a1a2e",
            transition: "border-color 0.15s",
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "#0066cc"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = "#e0e4ef"; }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          aria-label="Send"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: input.trim() && !isTyping ? "#0066cc" : "#d1d5db",
            border: "none",
            cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <Send size={15} color="white" />
        </button>
      </div>

      {/* Typing animation keyframes */}
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { opacity: 0.4; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}
