import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { chatbotRouter } from "./chatbot";
import { paymentAuthRouter } from "./paymentAuth";
import { chatRouter } from "./routers/chat";
import { escalationRouter } from "./routers/escalation";
import { runFullSync, getSyncStatus } from "./crawler";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getDb, getConversations, getConversationCount } from "./db";
import { conversationLogs } from "../drizzle/schema";

export const appRouter = router({
  system: systemRouter,
  chat: chatRouter,
  escalation: escalationRouter,
  auth: router({
    me: publicProcedure.query(opts => {
      const user = opts.ctx.user;
      if (!user) return null;
      return {
        ...user,
        isOwner: user.openId === ENV.ownerOpenId,
      };
    }),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  chatbot: chatbotRouter,
  paymentAuth: paymentAuthRouter,
  knowledge: router({
    /** Trigger a full website sync */
    sync: publicProcedure.mutation(async ({ ctx }) => {
      const result = await runFullSync();
      return result;
    }),
    /** Get sync status for all sections */
    status: publicProcedure.query(async ({ ctx }) => {
      const rows = await getSyncStatus();
      return rows;
    }),
  }),
  conversations: router({
    /** Get paginated conversations with optional filters */
    list: publicProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).default(50),
          offset: z.number().min(0).default(0),
          language: z.enum(["en", "es"]).optional(),
          search: z.string().optional(),
          startDate: z.date().optional(),
          endDate: z.date().optional(),
        })
      )
      .query(async ({ ctx, input }) => {
        const conversations = await getConversations({
          limit: input.limit,
          offset: input.offset,
          language: input.language,
          search: input.search,
          startDate: input.startDate,
          endDate: input.endDate,
        });

        const total = await getConversationCount({
          language: input.language,
          search: input.search,
          startDate: input.startDate,
          endDate: input.endDate,
        });

        return {
          conversations: conversations.map(c => ({
            ...c,
            messages: typeof c.messages === "string" ? JSON.parse(c.messages) : c.messages,
          })),
          total,
          limit: input.limit,
          offset: input.offset,
        };
      }),

    /** Get summary stats for admin dashboard */
    stats: publicProcedure.query(async ({ ctx }) => {
      const total = await getConversationCount();
      const englishCount = await getConversationCount({ language: "en" });
      const spanishCount = await getConversationCount({ language: "es" });

      return {
        total,
        byLanguage: {
          en: englishCount,
          es: spanishCount,
        },
      };
    }),

    /** Log a conversation when user clicks "Talk to a Human" */
    logEscalation: publicProcedure
      .input(
        z.object({
          messages: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
          language: z.enum(["en", "es"]),
          sessionId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Database not available",
          });
        }

        try {
          await db.insert(conversationLogs).values({
            messages: JSON.stringify(input.messages),
            language: input.language,
            sessionId: input.sessionId || null,
          });
          return { success: true };
        } catch (error) {
          console.error("[Conversations] Failed to log escalation:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to save conversation",
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
