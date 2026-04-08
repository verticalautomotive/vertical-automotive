import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { chatbotRouter } from "./chatbot";
import { runFullSync, getSyncStatus } from "./crawler";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
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
    /** Trigger a full website sync — used by admin UI and cron job */
    sync: publicProcedure.mutation(async () => {
      const result = await runFullSync();
      return result;
    }),
    /** Get sync status for all sections */
    status: publicProcedure.query(async () => {
      const rows = await getSyncStatus();
      return rows;
    }),
  }),
});

export type AppRouter = typeof appRouter;
