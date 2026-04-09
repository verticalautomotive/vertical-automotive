import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * knowledge_base — stores AI-extracted knowledge from verticalautomotive.com
 * One row per "section" (e.g. services, pricing, offers, about, contact).
 * Shift reads all rows and injects them into its system prompt at chat time.
 */
export const knowledgeBase = mysqlTable("knowledge_base", {
  id: int("id").autoincrement().primaryKey(),
  /** Logical section name, e.g. "services", "pricing", "offers", "about", "contact" */
  section: varchar("section", { length: 64 }).notNull().unique(),
  /** Source URL that was crawled */
  sourceUrl: varchar("sourceUrl", { length: 512 }).notNull(),
  /** AI-extracted knowledge in plain text, ready to inject into system prompt */
  content: text("content").notNull(),
  /** When this section was last successfully synced */
  syncedAt: timestamp("syncedAt").defaultNow().notNull(),
  /** HTTP status or error message from last crawl attempt */
  lastStatus: varchar("lastStatus", { length: 64 }).default("pending").notNull(),
});

export type KnowledgeBase = typeof knowledgeBase.$inferSelect;
export type InsertKnowledgeBase = typeof knowledgeBase.$inferInsert;

/**
 * conversation_logs — stores chat history when user clicks "Talk to a Human"
 * Allows the shop owner to review conversations and improve Shift's knowledge base
 */
export const conversationLogs = mysqlTable("conversation_logs", {
  id: int("id").autoincrement().primaryKey(),
  /** Language of the conversation ("en" or "es") */
  language: varchar("language", { length: 2 }).default("en").notNull(),
  /** Full conversation history as JSON array of {role, content} messages */
  messages: text("messages").notNull(), // JSON stringified
  /** When the user clicked "Talk to a Human" */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** Session identifier (optional, for grouping related conversations) */
  sessionId: varchar("sessionId", { length: 64 }),
});

export type ConversationLog = typeof conversationLogs.$inferSelect;
export type InsertConversationLog = typeof conversationLogs.$inferInsert;
