/**
 * Ask Shift - AI Chatbot Component for Vertical Automotive
 * Floating chat button + chat window with Gemini AI
 * Bilingual EN/ES support
 * 
 * Desktop: Shows its own floating button (bottom-right)
 * Mobile: Button is in FloatingActions, this component receives isOpen/onClose props
 */
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@/components/ui/button";
import { X, Send, MessageCircle, ChevronDown, ExternalLink, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const SCHEDULE_URL =
  "https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const WELCOME_MESSAGES = {
  en: `👋 Hi! I'm **Shift**, your Vertical Automotive assistant.

I can help you with:
• **Service pricing** estimates
• **When to service** your vehicle
• **What's included** in each service
• **Scheduling** your appointment

What can I help you with today?`,
  es: `👋 ¡Hola! Soy **Shift**, tu asistente de Vertical Automotive.

Puedo ayudarte con:
• Estimados de **precios de servicios**
• **Cuándo llevar** tu vehículo al taller
• **Qué incluye** cada servicio
• **Agendar** tu cita

¿En qué puedo ayudarte hoy?`,
};

const QUICK_QUESTIONS = {
  en: [
    "How much is an oil change?",
    "When do I need brake service?",
    "What's a 60k mile service?",
    "How do I schedule?",
  ],
  es: [
    "¿Cuánto cuesta un cambio de aceite?",
    "¿Cuándo necesito servicio de frenos?",
    "¿Qué es el servicio de 60k millas?",
    "¿Cómo agendo una cita?",
  ],
};

function formatMessage(text: string, scheduleLabel: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    // Detect scheduling link — replace with a button
    if (line.includes("schedule.kukui.com")) {
      return (
        <div key={i} className="mt-2">
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full hover:bg-primary/90 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            {scheduleLabel}
          </a>
        </div>
      );
    }

    // Bold text **...**
    const parts = line.split(/\*\*(.*?)\*\*/g);
    const formatted = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j}>{part}</strong> : part
    );

    return (
      <span key={i}>
        {formatted}
        {i < lines.length - 1 && <br />}
      </span>
    );
  });
}

interface AskShiftProps {
  /** Controlled open state (used by mobile FloatingActions) */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export default function AskShift({ isOpen: controlledOpen, onOpenChange }: AskShiftProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [hasOpened, setHasOpened] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isSpanish } = useTranslation();
  const lang = isSpanish ? "es" : "en";

  const chatMutation = trpc.chatbot.chat.useMutation();

  // Determine if open (controlled or internal)
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setIsOpen = (val: boolean) => {
    if (onOpenChange) onOpenChange(val);
    setInternalOpen(val);
  };

  // Initialize welcome message when first opened
  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
      setMessages([
        {
          role: "assistant",
          content: WELCOME_MESSAGES[lang],
        },
      ]);
    }
  }, [isOpen, hasOpened, lang]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatMutation.isPending]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = async (text?: string) => {
    const messageText = text ?? input.trim();
    if (!messageText || chatMutation.isPending) return;

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const result = await chatMutation.mutateAsync({
        messages: newMessages,
        lang,
      });
      setMessages([...newMessages, { role: "assistant", content: result.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Lo siento, ocurrió un error. Por favor intenta de nuevo."
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const placeholderText =
    lang === "es"
      ? "Pregunta sobre servicios, precios..."
      : "Ask about services, pricing...";

  const titleText = "Ask Shift";
  const subtitleText =
    lang === "es" ? "Asistente de Vertical Automotive" : "Vertical Automotive Assistant";
  const scheduleLabel = lang === "es" ? "Agendar Cita" : "Schedule Appointment";
  const scheduleCtaLabel = lang === "es" ? "Agendar Cita Online" : "Schedule Appointment Online";

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed z-[9999] transition-all duration-300 ease-in-out",
          // Mobile: above floating action buttons
          // Desktop: bottom-right corner
          "bottom-[calc(5rem+env(safe-area-inset-bottom,0px)+16px)] right-4",
          "sm:bottom-24 sm:right-6",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
        style={{ width: "min(380px, calc(100vw - 32px))" }}
      >
        <div
          className="bg-background border-2 border-primary/30 shadow-2xl rounded-2xl overflow-hidden flex flex-col"
          style={{ height: "min(500px, calc(100vh - 200px))" }}
        >
          {/* Header */}
          <div className="bg-secondary text-secondary-foreground px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-black text-sm tracking-wide">{titleText}</div>
                <div className="text-xs text-gray-400 font-medium">{subtitleText}</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-muted text-foreground rounded-tl-sm border border-border"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <div>{formatMessage(msg.content, scheduleLabel)}</div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-muted border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Quick questions (show after welcome message) */}
            {messages.length === 1 && !chatMutation.isPending && (
              <div className="space-y-1.5 pt-1">
                {QUICK_QUESTIONS[lang].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-white transition-colors font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Schedule CTA */}
          <div className="px-3 py-2 bg-muted/50 border-t border-border flex-shrink-0">
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {scheduleCtaLabel}
            </a>
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-border bg-background flex gap-2 items-end flex-shrink-0">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              disabled={chatMutation.isPending}
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-muted px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50 max-h-24 overflow-y-auto"
              style={{ minHeight: "38px" }}
            />
            <Button
              size="sm"
              onClick={() => handleSend()}
              disabled={!input.trim() || chatMutation.isPending}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl h-9 w-9 p-0 flex-shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop floating button only (mobile uses FloatingActions) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Ask Shift AI Assistant"
        className={cn(
          "fixed z-[9998] hidden sm:flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl transition-all duration-300",
          "bottom-6 right-6",
          isOpen
            ? "bg-secondary text-white hover:bg-secondary/90"
            : "bg-primary text-white hover:bg-primary/90 hover:shadow-2xl hover:scale-105"
        )}
      >
        {isOpen ? (
          <>
            <ChevronDown className="w-5 h-5" />
            <span className="font-black text-sm tracking-wide">Ask Shift</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span className="font-black text-sm tracking-wide">Ask Shift</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}
