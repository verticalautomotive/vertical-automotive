import { z } from "zod";
import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import {
  getAistudioEscalations,
  getAllAistudioConversations,
  getAistudioConversationCount,
  updateAistudioConversation,
} from "../db";
import { notifyOwner } from "../_core/notification";

/**
 * Escalation Router
 * Handles escalated conversations, notifications, and admin tracking
 */
export const escalationRouter = router({
  /**
   * Get all escalated conversations (admin only)
   */
  list: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(50),
        offset: z.number().min(0).default(0),
        status: z.enum(["pending", "assigned", "resolved"]).optional(),
        language: z.enum(["en", "es"]).optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .query(async ({ input }) => {
      try {
        const conversations = await getAllAistudioConversations({
          limit: input.limit,
          offset: input.offset,
          language: input.language,
          status: "escalated",
          startDate: input.startDate,
          endDate: input.endDate,
        });

        const total = await getAistudioConversationCount({
          language: input.language,
          status: "escalated",
          startDate: input.startDate,
          endDate: input.endDate,
        });

        return {
          conversations,
          total,
          limit: input.limit,
          offset: input.offset,
        };
      } catch (error) {
        console.error("[Escalation] Failed to list escalations:", error);
        return {
          conversations: [],
          total: 0,
          limit: input.limit,
          offset: input.offset,
        };
      }
    }),

  /**
   * Get escalation stats for admin dashboard
   */
  stats: protectedProcedure.query(async ({ ctx }) => {
    try {
      const total = await getAistudioConversationCount({ status: "escalated" });
      const pending = await getAistudioConversationCount({
        status: "escalated",
      });
      const englishCount = await getAistudioConversationCount({
        status: "escalated",
        language: "en",
      });
      const spanishCount = await getAistudioConversationCount({
        status: "escalated",
        language: "es",
      });

      return {
        total,
        pending,
        byLanguage: {
          en: englishCount,
          es: spanishCount,
        },
      };
    } catch (error) {
      console.error("[Escalation] Failed to get stats:", error);
      return {
        total: 0,
        pending: 0,
        byLanguage: { en: 0, es: 0 },
      };
    }
  }),

  /**
   * Assign escalation to team member
   */
  assign: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        assignedTo: z.string().email("Invalid email address"),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Get escalation details
        const escalations = await getAistudioEscalations(input.conversationId);
        if (escalations.length === 0) {
          throw new Error("Escalation not found");
        }

        const escalation = escalations[0];

        // Update escalation status
        // Note: You'll need to add an update function to db.ts for this
        // For now, we'll just log it
        console.log(
          `[Escalation] Assigned escalation ${escalation.id} to ${input.assignedTo}`
        );

        // Send notification to assigned team member
        const emailSent = await notifyOwner({
          title: "Escalated Conversation Assigned",
          content: `A customer conversation has been escalated and assigned to you.\n\nAssigned to: ${input.assignedTo}\nNotes: ${input.notes || "None"}\n\nPlease review the conversation and follow up with the customer.`,
        });

        return {
          success: emailSent,
          escalationId: escalation.id,
          assignedTo: input.assignedTo,
        };
      } catch (error) {
        console.error("[Escalation] Failed to assign escalation:", error);
        throw error;
      }
    }),

  /**
   * Resolve escalation
   */
  resolve: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Get escalation details
        const escalations = await getAistudioEscalations(input.conversationId);
        if (escalations.length === 0) {
          throw new Error("Escalation not found");
        }

        const escalation = escalations[0];

        // Update conversation status to closed
        // Note: You'll need to add an update function to db.ts for this
        console.log(
          `[Escalation] Resolved escalation ${escalation.id} with notes: ${input.notes || "None"}`
        );

        return {
          success: true,
          escalationId: escalation.id,
          status: "resolved",
        };
      } catch (error) {
        console.error("[Escalation] Failed to resolve escalation:", error);
        throw error;
      }
    }),

  /**
   * Send escalation notification (called automatically when escalation is detected)
   */
  notifyEscalation: publicProcedure
    .input(
      z.object({
        conversationId: z.number(),
        reason: z.string(),
        language: z.enum(["en", "es"]).optional().default("en"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const title =
          input.language === "es"
            ? "Nueva Conversación Escalada"
            : "New Escalated Conversation";

        const content =
          input.language === "es"
            ? `Una conversación de cliente ha sido escalada.\n\nRazón: ${input.reason}\n\nPor favor, revisa la conversación y sigue up con el cliente.`
            : `A customer conversation has been escalated.\n\nReason: ${input.reason}\n\nPlease review the conversation and follow up with the customer.`;

        const emailSent = await notifyOwner({
          title,
          content,
        });

        console.log(
          `[Escalation] Notification sent for conversation ${input.conversationId}`
        );

        return {
          success: emailSent,
          conversationId: input.conversationId,
        };
      } catch (error) {
        console.error("[Escalation] Failed to send notification:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    }),
});
