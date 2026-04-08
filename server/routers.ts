import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { chatbotRouter } from "./chatbot";
import { runFullSync, getSyncStatus } from "./crawler";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
  system: systemRouter,
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
  knowledge: router({
    /** Trigger a full website sync — owner only */
    sync: publicProcedure.mutation(async ({ ctx }) => {
      if (!ctx.user || ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Owner access required" });
      }
      const result = await runFullSync();
      return result;
    }),
    /** Get sync status for all sections — owner only */
    status: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user || ctx.user.openId !== ENV.ownerOpenId) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Owner access required" });
      }
      const rows = await getSyncStatus();
      return rows;
    }),
  }),
});

export type AppRouter = typeof appRouter;
