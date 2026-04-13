/**
 * ChatBubble — Chat panel placeholder
 * The iframe bot has been removed. The sparkle button (ChatButton) remains active
 * and ready to be wired to a new bot. Drop the new bot embed here when ready.
 */

interface ChatBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  language?: "en" | "es";
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ChatBubble(_props: ChatBubbleProps) {
  // Bot removed — return null until a new bot is configured
  return null;
}
