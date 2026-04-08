import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: () => {} } as unknown as TrpcContext["res"],
  };
}

describe("chatbot.chat", () => {
  it("returns a reply for a simple English question", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chatbot.chat({
      messages: [{ role: "user", content: "How much is an oil change?" }],
      lang: "en",
    });

    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(10);
  }, 30000);

  it("returns a reply in Spanish when lang is es", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chatbot.chat({
      messages: [{ role: "user", content: "¿Cuánto cuesta un cambio de aceite?" }],
      lang: "es",
    });

    expect(result).toHaveProperty("reply");
    expect(typeof result.reply).toBe("string");
    expect(result.reply.length).toBeGreaterThan(10);
  }, 30000);
});

  it("returns needsHuman=true for a question requiring physical inspection", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chatbot.chat({
      messages: [{ role: "user", content: "My car is making a loud clunking noise when I turn left. What is wrong with it?" }],
      lang: "en",
    });

    expect(result).toHaveProperty("reply");
    expect(result).toHaveProperty("needsHuman");
    // The reply should NOT contain the raw token
    expect(result.reply).not.toContain("[NEEDS_HUMAN]");
  }, 30000);
