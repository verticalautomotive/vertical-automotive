import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Loader2, X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
  timestamp?: Date;
}

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

export function ChatBubble({ isOpen, onClose, language = "en" }: ChatBubbleProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Single useEffect for all side effects
  useEffect(() => {
    if (isOpen) {
      console.log("[ChatBubble] Opened with language:", language);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen, language, messages]);

  const sendMessageMutation = trpc.chat.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          content: data.response,
          timestamp: new Date(),
        },
      ]);

      if (!conversationId) {
        setConversationId(data.conversationId);
      }

      if (data.needsHuman) {
        setError(
          language === "es"
            ? "Un especialista ha sido notificado para ayudarte."
            : "A specialist has been notified to help you."
        );
      }

      setIsLoading(false);
    },
    onError: (error) => {
      setError(
        language === "es"
          ? "Error al enviar el mensaje. Por favor, intenta de nuevo."
          : "Error sending message. Please try again."
      );
      setIsLoading(false);
      console.error("[Chat] Error:", error);
    },
  });

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setError(null);
    setIsLoading(true);

    console.log("[ChatBubble] Sending message:", input);
    sendMessageMutation.mutate({
      message: input,
      conversationId: conversationId || undefined,
      previousMessages: messages,
      language: language as "en" | "es",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const emptyStateText =
    language === "es"
      ? "¡Hola! Soy tu asistente de IA. ¿Cómo puedo ayudarte hoy?"
      : "Hello! I'm your AI assistant. How can I help you today?";

  const placeholderText =
    language === "es" ? "Escribe tu mensaje..." : "Type your message...";

  const sendButtonText = language === "es" ? "Enviar" : "Send";

  return (
    <div className="fixed bottom-6 right-6 z-[10000] w-96 max-w-[calc(100vw-2rem)]">
      <Card className="flex flex-col h-[500px] bg-background text-foreground shadow-2xl border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h3 className="font-semibold">
              {language === "es" ? "Asistente IA" : "AI Assistant"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-primary-foreground/20 rounded transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-full text-center">
              <p className="text-sm text-muted-foreground">{emptyStateText}</p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                {message.timestamp && (
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">
                  {language === "es" ? "Escribiendo..." : "Typing..."}
                </span>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background rounded-b-lg space-y-3">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholderText}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              size="sm"
              className="px-3"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span className="hidden sm:inline ml-1">{sendButtonText}</span>
                </>
              )}
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">
            {language === "es"
              ? "Powered by AI Studio"
              : "Powered by AI Studio"}
          </p>
        </div>
      </Card>
    </div>
  );
}
