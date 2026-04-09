import { z } from "zod";
import { publicProcedure, router } from "../_core/trpc";
import {
  createAistudioConversation,
  getAistudioConversation,
  addAistudioMessage,
  getAistudioMessages,
  updateAistudioConversation,
  createAistudioEscalation,
} from "../db";
import { randomUUID } from "crypto";

const AI_STUDIO_API_URL = "https://shift-vertical-automotive-ai-992037985080.us-west1.run.app/api/chat";

/**
 * Message schema for API communication
 */
const MessageSchema = z.object({
  role: z.enum(["user", "model"]),
  content: z.string(),
});

/**
 * AI Studio API Response schema
 */
const AiStudioResponseSchema = z.object({
  response: z.string(),
  needsHuman: z.boolean().optional().default(false),
  confidence: z.number().optional(),
});

/**
 * Call AI Studio API with retry logic
 */
async function callAiStudioApi(
  message: string,
  previousMessages: z.infer<typeof MessageSchema>[]
): Promise<z.infer<typeof AiStudioResponseSchema>> {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(AI_STUDIO_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          previousMessages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `AI Studio API error: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();
      return AiStudioResponseSchema.parse(data);
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(
        `[AI Studio] Attempt ${attempt + 1}/${maxRetries} failed:`,
        lastError.message
      );

      // Exponential backoff
      if (attempt < maxRetries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
      }
    }
  }

  throw new Error(
    `Failed to call AI Studio API after ${maxRetries} attempts: ${lastError?.message}`
  );
}

export const chatRouter = router({
  /**
   * Send a message to AI Studio and log the conversation
   */
  sendMessage: publicProcedure
    .input(
      z.object({
        message: z.string().min(1, "Message cannot be empty"),
        conversationId: z.string().optional(),
        previousMessages: z
          .array(
            z.object({
              role: z.enum(["user", "model"]),
              content: z.string(),
            })
          )
          .optional()
          .default([]),
        language: z.enum(["en", "es"]).optional().default("en"),
        userIdentifier: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // 1. Create or get conversation
        let conversationId = input.conversationId;
        let conversation = null;

        if (!conversationId) {
          conversationId = randomUUID();
          await createAistudioConversation({
            sessionId: conversationId,
            language: input.language,
            status: "active",
            userIdentifier: input.userIdentifier,
          });
          console.log("[Chat] Created new conversation:", conversationId);
        }

        conversation = await getAistudioConversation(conversationId);
        if (!conversation) {
          throw new Error(`Conversation not found: ${conversationId}`);
        }

        // 2. Save user message to DB
        await addAistudioMessage({
          conversationId: conversation!.id,
          role: "user",
          content: input.message,
        });

        // 3. Call AI Studio API
        const aiResponse = await callAiStudioApi(
          input.message,
          input.previousMessages
        );

        // 4. Save AI response to DB
        await addAistudioMessage({
          conversationId: conversation!.id,
          role: "model",
          content: aiResponse.response,
          confidence: aiResponse.confidence?.toString(),
        });

        // 5. Handle escalation
        if (aiResponse.needsHuman) {
          await updateAistudioConversation(conversationId, {
            status: "escalated",
            needsHuman: 1,
          });

          await createAistudioEscalation({
            conversationId: conversation!.id,
            reason: "User requested human assistance or AI detected complex issue",
            status: "pending",
          });

          console.log("[Chat] Escalation created for conversation:", conversationId);
        }

        return {
          response: aiResponse.response,
          conversationId,
          needsHuman: aiResponse.needsHuman || false,
          confidence: aiResponse.confidence,
        };
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        console.error("[Chat] Error sending message:", errorMessage);

        // Return user-friendly error message
        return {
          response:
            "I apologize, but I encountered an error processing your request. Please try again or contact our team directly.",
          conversationId: input.conversationId || "",
          needsHuman: true,
          error: errorMessage,
        };
      }
    }),

  /**
   * Get conversation history
   */
  getConversationHistory: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const conversation = await getAistudioConversation(
          input.conversationId
        );
        if (!conversation) {
          return { messages: [], conversation: null };
        }

        const messages = await getAistudioMessages(conversation!.id);

        return {
          messages,
          conversation,
        };
      } catch (error) {
        console.error("[Chat] Error getting conversation history:", error);
        return { messages: [], conversation: null };
      }
    }),
});
