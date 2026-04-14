import { eq, desc, like, and, gte, lte } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, conversationLogs, aistudioConversations, aistudioMessages, aistudioEscalations, InsertAistudioConversation, InsertAistudioMessage, InsertAistudioEscalation } from "../drizzle/schema";
import { ENV } from './_core/env';

// Email addresses that are automatically granted admin role on login
const ADMIN_EMAIL_WHITELIST = [
  "verticalauto89@gmail.com",
  "verticalautoft@gmail.com",
];

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (
      user.openId === ENV.ownerOpenId ||
      (user.email && ADMIN_EMAIL_WHITELIST.includes(user.email.toLowerCase()))
    ) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getConversations({
  limit = 50,
  offset = 0,
  language,
  search,
  startDate,
  endDate,
}: {
  limit?: number;
  offset?: number;
  language?: "en" | "es";
  search?: string;
  startDate?: Date;
  endDate?: Date;
} = {}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get conversations: database not available");
    return [];
  }

  try {
    const conditions = [];

    if (language) {
      conditions.push(eq(conversationLogs.language, language));
    }

    if (startDate) {
      conditions.push(gte(conversationLogs.createdAt, startDate));
    }

    if (endDate) {
      conditions.push(lte(conversationLogs.createdAt, endDate));
    }

    // Search in messages JSON
    if (search) {
      conditions.push(like(conversationLogs.messages, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select()
      .from(conversationLogs)
      .where(whereClause)
      .orderBy(desc(conversationLogs.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  } catch (error) {
    console.error("[Database] Failed to get conversations:", error);
    return [];
  }
}

export async function getConversationCount({
  language,
  search,
  startDate,
  endDate,
}: {
  language?: "en" | "es";
  search?: string;
  startDate?: Date;
  endDate?: Date;
} = {}) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot count conversations: database not available");
    return 0;
  }

  try {
    const conditions = [];

    if (language) {
      conditions.push(eq(conversationLogs.language, language));
    }

    if (startDate) {
      conditions.push(gte(conversationLogs.createdAt, startDate));
    }

    if (endDate) {
      conditions.push(lte(conversationLogs.createdAt, endDate));
    }

    if (search) {
      conditions.push(like(conversationLogs.messages, `%${search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select({ count: conversationLogs.id })
      .from(conversationLogs)
      .where(whereClause);

    return result.length;
  } catch (error) {
    console.error("[Database] Failed to count conversations:", error);
    return 0;
  }
}

// ============================================================================
// AI Studio Chatbot Helpers
// ============================================================================

export async function createAistudioConversation(data: InsertAistudioConversation) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(aistudioConversations).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create conversation:", error);
    throw error;
  }
}

export async function getAistudioConversation(sessionId: string) {
  const db = await getDb();
  if (!db) {
    return undefined;
  }

  try {
    const result = await db
      .select()
      .from(aistudioConversations)
      .where(eq(aistudioConversations.sessionId, sessionId))
      .limit(1);

    return result.length > 0 ? result[0] : undefined;
  } catch (error) {
    console.error("[Database] Failed to get conversation:", error);
    return undefined;
  }
}

export async function addAistudioMessage(data: InsertAistudioMessage) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(aistudioMessages).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to add message:", error);
    throw error;
  }
}

export async function getAistudioMessages(conversationId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    const result = await db
      .select()
      .from(aistudioMessages)
      .where(eq(aistudioMessages.conversationId, conversationId))
      .orderBy(aistudioMessages.timestamp);

    return result;
  } catch (error) {
    console.error("[Database] Failed to get messages:", error);
    return [];
  }
}

export async function updateAistudioConversation(
  sessionId: string,
  updates: Partial<Omit<InsertAistudioConversation, 'sessionId'>>
) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .update(aistudioConversations)
      .set(updates)
      .where(eq(aistudioConversations.sessionId, sessionId));

    return result;
  } catch (error) {
    console.error("[Database] Failed to update conversation:", error);
    throw error;
  }
}

export async function createAistudioEscalation(data: InsertAistudioEscalation) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(aistudioEscalations).values(data);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create escalation:", error);
    throw error;
  }
}

export async function getAistudioEscalations(conversationId: number) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    const result = await db
      .select()
      .from(aistudioEscalations)
      .where(eq(aistudioEscalations.conversationId, conversationId));

    return result;
  } catch (error) {
    console.error("[Database] Failed to get escalations:", error);
    return [];
  }
}

export async function getAllAistudioConversations({
  limit = 50,
  offset = 0,
  language,
  status,
  startDate,
  endDate,
}: {
  limit?: number;
  offset?: number;
  language?: "en" | "es";
  status?: "active" | "escalated" | "closed";
  startDate?: Date;
  endDate?: Date;
} = {}) {
  const db = await getDb();
  if (!db) {
    return [];
  }

  try {
    const conditions = [];

    if (language) {
      conditions.push(eq(aistudioConversations.language, language));
    }

    if (status) {
      conditions.push(eq(aistudioConversations.status, status));
    }

    if (startDate) {
      conditions.push(gte(aistudioConversations.createdAt, startDate));
    }

    if (endDate) {
      conditions.push(lte(aistudioConversations.createdAt, endDate));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select()
      .from(aistudioConversations)
      .where(whereClause)
      .orderBy(desc(aistudioConversations.createdAt))
      .limit(limit)
      .offset(offset);

    return result;
  } catch (error) {
    console.error("[Database] Failed to get conversations:", error);
    return [];
  }
}

export async function getAistudioConversationCount({
  language,
  status,
  startDate,
  endDate,
}: {
  language?: "en" | "es";
  status?: "active" | "escalated" | "closed";
  startDate?: Date;
  endDate?: Date;
} = {}) {
  const db = await getDb();
  if (!db) {
    return 0;
  }

  try {
    const conditions = [];

    if (language) {
      conditions.push(eq(aistudioConversations.language, language));
    }

    if (status) {
      conditions.push(eq(aistudioConversations.status, status));
    }

    if (startDate) {
      conditions.push(gte(aistudioConversations.createdAt, startDate));
    }

    if (endDate) {
      conditions.push(lte(aistudioConversations.createdAt, endDate));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select({ count: aistudioConversations.id })
      .from(aistudioConversations)
      .where(whereClause);

    return result.length;
  } catch (error) {
    console.error("[Database] Failed to count conversations:", error);
    return 0;
  }
}

// TODO: add feature queries here as your schema grows.
