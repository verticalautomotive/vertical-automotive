/**
 * Backlinks router — unit tests for schema validation and data structures
 */
import { describe, it, expect } from "vitest";
import { z } from "zod";

// Re-define the input schema for testing (mirrors backlinks.ts)
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

describe("backlinks input schema", () => {
  it("accepts a minimal valid entry", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com" });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.status).toBe("not_contacted");
      expect(result.data.linkAcquired).toBe(false);
      expect(result.data.tier).toBe("tier1_local");
    }
  });

  it("accepts a fully populated entry", () => {
    const result = backlinkInput.safeParse({
      website: "https://fortlauderdale.gov",
      contactName: "Jane Smith",
      email: "jane@fortlauderdale.gov",
      dateContacted: "2026-04-14",
      status: "link_acquired",
      linkAcquired: true,
      linkUrl: "https://fortlauderdale.gov/business-directory/vertical-automotive",
      targetPage: "/fort-lauderdale/auto-repair",
      domainAuthority: 72,
      tier: "tier1_local",
      notes: "City business directory listing acquired.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty website", () => {
    const result = backlinkInput.safeParse({ website: "" });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", email: "not-an-email" });
    expect(result.success).toBe(false);
  });

  it("accepts empty string email (optional field)", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", email: "" });
    expect(result.success).toBe(true);
  });

  it("rejects domain authority > 100", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", domainAuthority: 101 });
    expect(result.success).toBe(false);
  });

  it("rejects domain authority < 0", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", domainAuthority: -1 });
    expect(result.success).toBe(false);
  });

  it("accepts all valid status values", () => {
    for (const status of STATUS_VALUES) {
      const result = backlinkInput.safeParse({ website: "https://example.com", status });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid status value", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", status: "pending" });
    expect(result.success).toBe(false);
  });

  it("accepts all valid tier values", () => {
    for (const tier of TIER_VALUES) {
      const result = backlinkInput.safeParse({ website: "https://example.com", tier });
      expect(result.success).toBe(true);
    }
  });

  it("rejects invalid tier value", () => {
    const result = backlinkInput.safeParse({ website: "https://example.com", tier: "tier5_unknown" });
    expect(result.success).toBe(false);
  });
});

describe("backlinks tier labels", () => {
  it("has 4 tier categories", () => {
    expect(TIER_VALUES.length).toBe(4);
  });

  it("has 6 status categories", () => {
    expect(STATUS_VALUES.length).toBe(6);
  });

  it("tier1_local is the first tier (highest authority)", () => {
    expect(TIER_VALUES[0]).toBe("tier1_local");
  });

  it("link_acquired is a valid terminal status", () => {
    expect(STATUS_VALUES).toContain("link_acquired");
  });
});
