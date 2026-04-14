/**
 * Backlinks router — CRUD for the backlink tracker admin tool
 * All operations are protected (admin only)
 */
import { z } from "zod";
import { protectedProcedure, router } from "../_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDb } from "../db";
import { backlinks } from "../../drizzle/schema";
import { eq, desc, like, or, and, sql } from "drizzle-orm";

const TIER_VALUES = ["tier1_local", "tier2_business", "tier3_community", "tier4_niche"] as const;
const STATUS_VALUES = ["not_contacted", "contacted", "follow_up", "link_acquired", "declined", "no_response"] as const;

const backlinkInput = z.object({
  website: z.string().min(1).max(512),
  contactName: z.string().max(256).optional(),
  email: z.string().email().max(320).optional().or(z.literal("")),
  dateContacted: z.string().max(32).optional(),
  status: z.enum(STATUS_VALUES).default("not_contacted"),
  linkAcquired: z.boolean().default(false),
  linkUrl: z.string().max(1024).optional(),
  targetPage: z.string().max(512).optional(),
  domainAuthority: z.number().int().min(0).max(100).optional(),
  tier: z.enum(TIER_VALUES).default("tier1_local"),
  notes: z.string().optional(),
});

async function requireAdmin(ctx: { user: { role: string } | null }) {
  if (!ctx.user || ctx.user.role !== "admin") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Admin access required" });
  }
}

export const backlinksRouter = router({
  /** List all backlinks with optional search/filter */
  list: protectedProcedure
    .input(
      z.object({
        search: z.string().optional(),
        status: z.enum(STATUS_VALUES).optional(),
        tier: z.enum(TIER_VALUES).optional(),
        limit: z.number().min(1).max(200).default(100),
        offset: z.number().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      await requireAdmin(ctx);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const conditions = [];
      if (input.search) {
        conditions.push(
          or(
            like(backlinks.website, `%${input.search}%`),
            like(backlinks.contactName, `%${input.search}%`),
            like(backlinks.email, `%${input.search}%`),
            like(backlinks.notes, `%${input.search}%`)
          )
        );
      }
      if (input.status) conditions.push(eq(backlinks.status, input.status));
      if (input.tier) conditions.push(eq(backlinks.tier, input.tier));

      const rows = await db
        .select()
        .from(backlinks)
        .where(conditions.length > 0 ? and(...conditions) : undefined)
        .orderBy(desc(backlinks.updatedAt))
        .limit(input.limit)
        .offset(input.offset);

      const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(backlinks)
        .where(conditions.length > 0 ? and(...conditions) : undefined);

      return { rows, total: Number(count) };
    }),

  /** Get summary stats */
  stats: protectedProcedure.query(async ({ ctx }) => {
    await requireAdmin(ctx);
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    const [{ total }] = await db.select({ total: sql<number>`count(*)` }).from(backlinks);
    const [{ acquired }] = await db.select({ acquired: sql<number>`count(*)` }).from(backlinks).where(eq(backlinks.linkAcquired, 1));
    const [{ contacted }] = await db.select({ contacted: sql<number>`count(*)` }).from(backlinks).where(eq(backlinks.status, "contacted"));
    const [{ followUp }] = await db.select({ followUp: sql<number>`count(*)` }).from(backlinks).where(eq(backlinks.status, "follow_up"));

    return {
      total: Number(total),
      acquired: Number(acquired),
      contacted: Number(contacted),
      followUp: Number(followUp),
      goal: 50,
    };
  }),

  /** Create a new backlink entry */
  create: protectedProcedure.input(backlinkInput).mutation(async ({ ctx, input }) => {
    await requireAdmin(ctx);
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

    await db.insert(backlinks).values({
      website: input.website,
      contactName: input.contactName || null,
      email: input.email || null,
      dateContacted: input.dateContacted || null,
      status: input.status,
      linkAcquired: input.linkAcquired ? 1 : 0,
      linkUrl: input.linkUrl || null,
      targetPage: input.targetPage || null,
      domainAuthority: input.domainAuthority ?? null,
      tier: input.tier,
      notes: input.notes || null,
    });

    return { success: true };
  }),

  /** Update an existing backlink entry */
  update: protectedProcedure
    .input(z.object({ id: z.number().int(), data: backlinkInput.partial() }))
    .mutation(async ({ ctx, input }) => {
      await requireAdmin(ctx);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      const updateData: Record<string, unknown> = {};
      if (input.data.website !== undefined) updateData.website = input.data.website;
      if (input.data.contactName !== undefined) updateData.contactName = input.data.contactName || null;
      if (input.data.email !== undefined) updateData.email = input.data.email || null;
      if (input.data.dateContacted !== undefined) updateData.dateContacted = input.data.dateContacted || null;
      if (input.data.status !== undefined) updateData.status = input.data.status;
      if (input.data.linkAcquired !== undefined) updateData.linkAcquired = input.data.linkAcquired ? 1 : 0;
      if (input.data.linkUrl !== undefined) updateData.linkUrl = input.data.linkUrl || null;
      if (input.data.targetPage !== undefined) updateData.targetPage = input.data.targetPage || null;
      if (input.data.domainAuthority !== undefined) updateData.domainAuthority = input.data.domainAuthority ?? null;
      if (input.data.tier !== undefined) updateData.tier = input.data.tier;
      if (input.data.notes !== undefined) updateData.notes = input.data.notes || null;

      await db.update(backlinks).set(updateData).where(eq(backlinks.id, input.id));
      return { success: true };
    }),

  /** Delete a backlink entry */
  delete: protectedProcedure
    .input(z.object({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      await requireAdmin(ctx);
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB unavailable" });

      await db.delete(backlinks).where(eq(backlinks.id, input.id));
      return { success: true };
    }),
});
