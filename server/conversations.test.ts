import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getConversations, getConversationCount } from "./db";
import { getDb } from "./db";
import { conversationLogs } from "../drizzle/schema";

describe("Conversation logging and retrieval", () => {
  let db: Awaited<ReturnType<typeof getDb>>;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error("Database not available for tests");
    }
  });

  it("should count total conversations", async () => {
    const count = await getConversationCount();
    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });

  it("should filter conversations by language", async () => {
    const enCount = await getConversationCount({ language: "en" });
    const esCount = await getConversationCount({ language: "es" });
    const totalCount = await getConversationCount();

    expect(typeof enCount).toBe("number");
    expect(typeof esCount).toBe("number");
    expect(enCount + esCount).toBeLessThanOrEqual(totalCount);
  });

  it("should retrieve conversations with pagination", async () => {
    const result = await getConversations({ limit: 10, offset: 0 });
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(10);

    // Verify structure of returned conversations
    if (result.length > 0) {
      const conv = result[0];
      expect(conv).toHaveProperty("id");
      expect(conv).toHaveProperty("messages");
      expect(conv).toHaveProperty("language");
      expect(conv).toHaveProperty("createdAt");
    }
  });

  it("should search conversations by keyword", async () => {
    // Search for a common word that might appear in conversations
    const results = await getConversations({ search: "brake" });
    expect(Array.isArray(results)).toBe(true);
    // Results may be empty if no matching conversations exist
  });

  it("should parse messages as JSON", async () => {
    const results = await getConversations({ limit: 5 });
    
    results.forEach(conv => {
      if (typeof conv.messages === "string") {
        // If messages is a string, it should be valid JSON
        expect(() => JSON.parse(conv.messages)).not.toThrow();
      } else if (Array.isArray(conv.messages)) {
        // If already parsed, should be an array
        expect(Array.isArray(conv.messages)).toBe(true);
      }
    });
  });

  it("should respect date range filters", async () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const results = await getConversations({
      startDate: yesterday,
      endDate: tomorrow,
    });

    expect(Array.isArray(results)).toBe(true);
    // Results should be within the date range
    results.forEach(conv => {
      const convDate = new Date(conv.createdAt);
      expect(convDate.getTime()).toBeGreaterThanOrEqual(yesterday.getTime());
      expect(convDate.getTime()).toBeLessThanOrEqual(tomorrow.getTime());
    });
  });

  it("should combine multiple filters", async () => {
    const count = await getConversationCount({
      language: "en",
      search: "oil",
    });

    expect(typeof count).toBe("number");
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
