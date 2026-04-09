/**
 * Ask Shift - AI Studio Chatbot Iframe Component
 * Embedded iframe pointing to AI Studio chatbot
 * Faster responses and accurate training data
 *
 * Desktop: Shows its own floating button (bottom-right)
 * Mobile: Button is in FloatingActions, this component receives isOpen/onClose props
 */
import { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AskShiftProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AI_STUDIO_CHATBOT_URL = "https://ais-dev-q73kw5kk7gnfswdjstsrpe-629206854967.us-east1.run.app";

export default function AskShift({ isOpen = false, onOpenChange }: AskShiftProps) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const handleClose = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
  };

  const handleOpen = () => {
    if (onOpenChange) {
      onOpenChange(!isOpen);
    }
  };

  return (
    <>
      {/* Desktop Floating Button */}
      {!isMobile && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center text-white z-40 md:flex hidden"
          aria-label="Open Shift chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "fixed z-50 bg-white rounded-2xl shadow-2xl flex flex-col",
            isMobile
              ? "inset-0 m-0 rounded-none"
              : "bottom-24 right-6 w-96 h-[600px] max-h-[80vh]"
          )}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">⚡</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Shift</h3>
                <p className="text-xs text-blue-100">Vertical Automotive Assistant</p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-blue-700 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Iframe Container */}
          <div className="flex-1 overflow-hidden rounded-b-2xl">
            <iframe
              src={AI_STUDIO_CHATBOT_URL}
              title="Shift - Vertical Automotive Assistant"
              className="w-full h-full border-none"
              allow="microphone; camera"
            />
          </div>
        </div>
      )}
    </>
  );
}
