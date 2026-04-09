/**
 * Ask Shift - AI Chatbot Component for Vertical Automotive
 * Floating chat button + chat window with Gemini AI
 * Bilingual EN/ES support
 * Includes "Talk to a Human" fallback when AI cannot answer
 *
 * Desktop: Shows its own floating button (bottom-right)
 * Mobile: Button is in FloatingActions, this component receives isOpen/onClose props
 */
import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { X, Send, ChevronDown, ExternalLink, Sparkles, Phone, MessageSquare, User, Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ShiftSyncPanel from "./ShiftSyncPanel";

const SCHEDULE_URL =
  "https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US";

const LOCATIONS = {
  wiltonManors: {
    phone: "(954) 565-1518",
    phoneRaw: "9545651518",
    sms: "9548336584",
    name: "Wilton Manors",
  },
  fortLauderdale: {
    phone: "(645) 216-2266",
    phoneRaw: "6452162266",
    sms: "9544667186",
    name: "Fort Lauderdale",
  },
};

type Message = {
  role: "user" | "assistant";
  content: string;
  needsHuman?: boolean;
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

const HUMAN_CARD_CONTENT = {
  en: {
    title: "Talk to a Human",
    subtitle: "Our team is ready to help you directly.",
    callLabel: "Call Us",
    textLabel: "Text Us",
    chooseLocation: "Choose a location:",
    orSchedule: "Or schedule online:",
    scheduleLabel: "Schedule Appointment",
    dismiss: "Continue with Shift",
  },
  es: {
    title: "Hablar con una Persona",
    subtitle: "Nuestro equipo está listo para ayudarte directamente.",
    callLabel: "Llamar",
    textLabel: "Enviar Texto",
    chooseLocation: "Elige una ubicación:",
    orSchedule: "O agenda en línea:",
    scheduleLabel: "Agendar Cita",
    dismiss: "Continuar con Shift",
  },
};

function HumanFallbackCard({
  lang,
  onDismiss,
}: {
  lang: "en" | "es";
  onDismiss: () => void;
}) {
  const t = HUMAN_CARD_CONTENT[lang];
  const [showLocations, setShowLocations] = useState<"call" | "text" | null>(null);

  return (
    <div className="mx-1 my-2 rounded-2xl border-2 border-primary/40 bg-secondary text-secondary-foreground overflow-hidden shadow-lg animate-in slide-in-from-bottom-2 fade-in duration-300">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-4 pt-4 pb-2">
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
          <User className="w-4 h-4 text-primary" />
        </div>
        <div>
          <div className="font-black text-sm tracking-wide">{t.title}</div>
          <div className="text-xs text-gray-400">{t.subtitle}</div>
        </div>
      </div>

      {/* Location picker for call/text */}
      {showLocations ? (
        <div className="px-4 pb-3">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
            {t.chooseLocation}
          </div>
          <div className="space-y-2">
            {Object.values(LOCATIONS).map((loc) => (
              <a
                key={loc.name}
                href={
                  showLocations === "call"
                    ? `tel:${loc.phoneRaw}`
                    : `sms:${loc.sms}`
                }
                className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 transition-colors group"
              >
                <div>
                  <div className="text-sm font-semibold">{loc.name}</div>
                  <div className="text-xs text-gray-400 font-mono">
                    {showLocations === "call" ? loc.phone : loc.phone}
                  </div>
                </div>
                {showLocations === "call" ? (
                  <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                ) : (
                  <MessageSquare className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                )}
              </a>
            ))}
          </div>
          <button
            onClick={() => setShowLocations(null)}
            className="mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            ← Back
          </button>
        </div>
      ) : (
        <div className="px-4 pb-3 space-y-2">
          {/* Call / Text buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowLocations("call")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {t.callLabel}
            </button>
            <button
              onClick={() => setShowLocations("text")}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 border border-white/20 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              {t.textLabel}
            </button>
          </div>

          {/* Schedule online */}
          <div>
            <div className="text-xs text-gray-500 text-center mb-1.5">{t.orSchedule}</div>
            <a
              href={SCHEDULE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/5 border border-white/20 text-white text-xs font-bold hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {t.scheduleLabel}
            </a>
          </div>
        </div>
      )}

      {/* Dismiss */}
      <div className="border-t border-white/10 px-4 py-2">
        <button
          onClick={onDismiss}
          className="w-full text-xs text-gray-500 hover:text-gray-300 transition-colors py-1"
        >
          {t.dismiss}
        </button>
      </div>
    </div>
  );
}

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
  const [dismissedHumanCard, setDismissedHumanCard] = useState(false);
  const [showSyncPanel, setShowSyncPanel] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { isSpanish } = useTranslation();
  const lang = isSpanish ? "es" : "en";
  const chatMutation = trpc.chatbot.chat.useMutation();
  const { user } = useAuth();
  const isOwner = Boolean((user as any)?.isOwner);

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

  // Scroll to top when chat first opens (show welcome message)
  // Scroll to bottom on new messages
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      // Scroll to top to show welcome message when chat opens
      const messagesDiv = document.querySelector('[data-chat-messages]');
      if (messagesDiv) {
        setTimeout(() => {
          messagesDiv.scrollTop = 0;
        }, 100);
      }
    } else {
      // Scroll to bottom for new messages
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatMutation.isPending, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Determine if the last assistant message needs human
  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");
  const showHumanCard = !!(lastAssistantMessage?.needsHuman) && !dismissedHumanCard;

  const handleSend = async (text?: string) => {
    const messageText = text ?? input.trim();
    if (!messageText || chatMutation.isPending) return;

    // Reset dismissed state when user sends a new message
    setDismissedHumanCard(false);

    const userMessage: Message = { role: "user", content: messageText };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");

    try {
      const result = await chatMutation.mutateAsync({
        messages: newMessages.map(({ role, content }) => ({ role, content })),
        lang,
      });
      setMessages([
        ...newMessages,
        { role: "assistant", content: result.reply, needsHuman: result.needsHuman },
      ]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Lo siento, ocurrió un error. Por favor intenta de nuevo."
              : "Sorry, something went wrong. Please try again.",
          needsHuman: true,
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

  const titleText = "Shift";
  const subtitleText =
    lang === "es" ? "Asistente de Vertical Automotive" : "Vertical Automotive Assistant";
  const scheduleLabel = lang === "es" ? "Agendar Cita" : "Schedule Appointment";
  const scheduleCtaLabel = lang === "es" ? "Agendar Cita Online" : "Schedule Appointment Online";
  const talkHumanLabel = lang === "es" ? "Hablar con una Persona" : "Talk to a Human";

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
          style={{ height: "min(560px, calc(100vh - 200px))" }}
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
            <div className="flex items-center gap-1">
              {isOwner && (
                <button
                  onClick={() => setShowSyncPanel(true)}
                  className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                  aria-label="Knowledge sync settings"
                  title="Sync Shift's knowledge from website"
                >
                  <Settings2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background" data-chat-messages>
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

            {/* Human fallback card — shown after AI signals it needs human */}
            {showHumanCard && (
              <HumanFallbackCard
                lang={lang}
                onDismiss={() => setDismissedHumanCard(true)}
              />
            )}

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

            {/* Quick questions (show after welcome message only) */}
            {messages.length === 1 && !chatMutation.isPending && (
              <div className="space-y-1.5 pt-1">
                {QUICK_QUESTIONS[lang].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="w-full text-left text-xs px-3 py-2 rounded-xl border border-primary/30 text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white transition-colors font-medium"
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

          {/* Input + Talk to Human button */}
          <div className="px-3 py-3 border-t border-border bg-background flex flex-col gap-2 flex-shrink-0">
            <div className="flex gap-2 items-end">
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

            {/* Talk to Human persistent link */}
            <button
              onClick={() => {
                // Inject a user message to trigger the human fallback card
                const triggerMsg = lang === "es"
                  ? "Quiero hablar con una persona"
                  : "I want to talk to a human";
                handleSend(triggerMsg);
              }}
              disabled={chatMutation.isPending}
              className="flex items-center justify-center gap-1.5 w-full text-xs text-muted-foreground hover:text-primary transition-colors py-0.5 disabled:opacity-40"
            >
              <User className="w-3 h-3" />
              {talkHumanLabel}
            </button>
          </div>
        </div>
      </div>

      {/* Sync Panel */}
      {showSyncPanel && (
        <ShiftSyncPanel onClose={() => setShowSyncPanel(false)} />
      )}

      {/* Desktop floating button only (mobile uses FloatingActions) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Shift AI Assistant"
        style={{ position: 'fixed', bottom: '24px', right: '24px' }}
        className={cn(
          "z-[9998] hidden sm:flex items-center gap-2.5 px-4 py-3 rounded-full shadow-xl transition-all duration-300",
          isOpen
            ? "bg-secondary text-white hover:bg-secondary/90"
            : "bg-primary text-white hover:bg-primary/90 hover:shadow-2xl hover:scale-105"
        )}
      >
        {isOpen ? (
          <>
            <ChevronDown className="w-5 h-5" />
            <span className="font-black text-sm tracking-wide">Shift</span>
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            <span className="font-black text-sm tracking-wide">Shift</span>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </>
        )}
      </button>
    </>
  );
}
