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

/**
 * aistudio_conversations — stores AI Studio chatbot conversations
 * One row per conversation session with metadata
 */
export const aistudioConversations = mysqlTable("aistudio_conversations", {
  id: int("id").autoincrement().primaryKey(),
  /** Unique session identifier for this conversation */
  sessionId: varchar("sessionId", { length: 64 }).notNull().unique(),
  /** Language of the conversation ("en" or "es") */
  language: varchar("language", { length: 2 }).default("en").notNull(),
  /** Conversation status: "active", "escalated", "closed" */
  status: mysqlEnum("status", ["active", "escalated", "closed"]).default("active").notNull(),
  /** Whether this conversation needs human follow-up */
  needsHuman: int("needsHuman").default(0).notNull(), // 0 or 1 for boolean
  /** Reason for escalation (if applicable) */
  escalationReason: text("escalationReason"),
  /** User's IP address or identifier for analytics */
  userIdentifier: varchar("userIdentifier", { length: 128 }),
  /** When conversation was created */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** When conversation was last updated */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AistudioConversation = typeof aistudioConversations.$inferSelect;
export type InsertAistudioConversation = typeof aistudioConversations.$inferInsert;

/**
 * aistudio_messages — stores individual messages within a conversation
 * One row per message (user or AI)
 */
export const aistudioMessages = mysqlTable("aistudio_messages", {
  id: int("id").autoincrement().primaryKey(),
  /** Foreign key to aistudio_conversations */
  conversationId: int("conversationId").notNull(),
  /** Role: "user" or "model" (AI) */
  role: mysqlEnum("role", ["user", "model"]).notNull(),
  /** Message content */
  content: text("content").notNull(),
  /** Confidence score from AI Studio (0-1) if applicable */
  confidence: varchar("confidence", { length: 10 }),
  /** When message was created */
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type AistudioMessage = typeof aistudioMessages.$inferSelect;
export type InsertAistudioMessage = typeof aistudioMessages.$inferInsert;

/**
 * aistudio_escalations — tracks escalated conversations
 * One row per escalation event
 */
export const aistudioEscalations = mysqlTable("aistudio_escalations", {
  id: int("id").autoincrement().primaryKey(),
  /** Foreign key to aistudio_conversations */
  conversationId: int("conversationId").notNull(),
  /** Reason for escalation from AI Studio */
  reason: text("reason").notNull(),
  /** Status: "pending", "assigned", "resolved" */
  status: mysqlEnum("status", ["pending", "assigned", "resolved"]).default("pending").notNull(),
  /** Email of team member assigned to handle this */
  assignedTo: varchar("assignedTo", { length: 320 }),
  /** Notes from team member handling the escalation */
  notes: text("notes"),
  /** When escalation was created */
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  /** When escalation was last updated */
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AistudioEscalation = typeof aistudioEscalations.$inferSelect;
export type InsertAistudioEscalation = typeof aistudioEscalations.$inferInsert;

/**
 * payment_authorizations — immutable records of customer payment authorizations
 * Created when a customer submits the /payment-authorization form.
 * Records cannot be edited after creation (chargeback protection).
 */
export const paymentAuthorizations = mysqlTable("payment_authorizations", {
  id: int("id").autoincrement().primaryKey(),
  /** Auto-generated reference number, e.g. VA-2026-00142 */
  referenceNumber: varchar("referenceNumber", { length: 32 }).notNull().unique(),

  // Customer Information
  fullLegalName: varchar("fullLegalName", { length: 256 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  billingStreet: varchar("billingStreet", { length: 256 }).notNull(),
  billingCity: varchar("billingCity", { length: 128 }).notNull(),
  billingState: varchar("billingState", { length: 64 }).notNull(),
  billingZip: varchar("billingZip", { length: 16 }).notNull(),

  // Vehicle Information
  vehicleYear: varchar("vehicleYear", { length: 8 }).notNull(),
  vehicleMake: varchar("vehicleMake", { length: 64 }).notNull(),
  vehicleModel: varchar("vehicleModel", { length: 64 }).notNull(),
  vin: varchar("vin", { length: 32 }),
  licensePlate: varchar("licensePlate", { length: 16 }),
  mileage: varchar("mileage", { length: 16 }),

  // Service & Payment Details
  serviceLocation: mysqlEnum("serviceLocation", ["Fort Lauderdale", "Wilton Manors"]).notNull(),
  invoiceNumber: varchar("invoiceNumber", { length: 64 }).notNull(),
  serviceDescription: text("serviceDescription").notNull(),
  authorizedAmount: varchar("authorizedAmount", { length: 32 }).notNull(),
  paymentMethod: mysqlEnum("paymentMethod", ["Credit Card", "Debit Card", "Other"]).notNull(),
  authorizationDate: varchar("authorizationDate", { length: 32 }).notNull(),

  // Signature & Consent
  /** Base64-encoded PNG of the drawn signature */
  signatureImage: text("signatureImage").notNull(),
  /** Customer typed their name as confirmation */
  signatureName: varchar("signatureName", { length: 256 }).notNull(),
  agreedToTerms: int("agreedToTerms").default(0).notNull(),
  confirmedCardholder: int("confirmedCardholder").default(0).notNull(),
  agreedToEmailCopy: int("agreedToEmailCopy").default(0).notNull(),
  /** UTC timestamp at moment of signing (ms since epoch) */
  signedAt: varchar("signedAt", { length: 32 }).notNull(),

  // Security Metadata
  submissionIp: varchar("submissionIp", { length: 64 }),
  userAgent: text("userAgent"),

  // PDF Storage
  /** S3 URL of the generated PDF */
  pdfUrl: text("pdfUrl"),

  // RO Source (Shop-Ware)
  /** Original Shop-Ware work order URL used to pre-fill this form */
  roSourceUrl: text("roSourceUrl"),
  /** AI-extracted JSON data from the RO URL (for re-extraction) */
  roExtractedData: text("roExtractedData"),

  // Admin Tracking
  /** Whether this record has been flagged for use in a chargeback dispute */
  usedInDispute: int("usedInDispute").default(0).notNull(),
  disputeNotes: text("disputeNotes"),

  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PaymentAuthorization = typeof paymentAuthorizations.$inferSelect;
export type InsertPaymentAuthorization = typeof paymentAuthorizations.$inferInsert;
