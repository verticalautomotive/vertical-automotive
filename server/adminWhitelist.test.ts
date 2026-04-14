/**
 * Admin email whitelist — unit tests
 * Verifies that whitelisted emails are auto-promoted to admin role
 */
import { describe, it, expect } from "vitest";

// Mirror the whitelist logic from db.ts for isolated testing
const ADMIN_EMAIL_WHITELIST = [
  "verticalauto89@gmail.com",
  "verticalautoft@gmail.com",
];

function shouldBeAdmin(email: string | null | undefined, ownerOpenId: string, userOpenId: string): boolean {
  if (userOpenId === ownerOpenId) return true;
  if (email && ADMIN_EMAIL_WHITELIST.includes(email.toLowerCase())) return true;
  return false;
}

describe("Admin email whitelist", () => {
  const MOCK_OWNER_OPEN_ID = "owner-open-id-123";

  it("grants admin to verticalauto89@gmail.com", () => {
    expect(shouldBeAdmin("verticalauto89@gmail.com", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(true);
  });

  it("grants admin to verticalautoft@gmail.com", () => {
    expect(shouldBeAdmin("verticalautoft@gmail.com", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(true);
  });

  it("grants admin to owner by openId even without email match", () => {
    expect(shouldBeAdmin("random@example.com", MOCK_OWNER_OPEN_ID, MOCK_OWNER_OPEN_ID)).toBe(true);
  });

  it("denies admin to non-whitelisted email", () => {
    expect(shouldBeAdmin("customer@example.com", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(false);
  });

  it("denies admin when email is null", () => {
    expect(shouldBeAdmin(null, MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(false);
  });

  it("denies admin when email is undefined", () => {
    expect(shouldBeAdmin(undefined, MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(false);
  });

  it("is case-insensitive for email matching", () => {
    expect(shouldBeAdmin("VerticalAuto89@Gmail.COM", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(true);
    expect(shouldBeAdmin("VERTICALAUTOFT@GMAIL.COM", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(true);
  });

  it("denies admin to a partial email match", () => {
    expect(shouldBeAdmin("verticalauto89", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(false);
    expect(shouldBeAdmin("verticalauto89@gmail", MOCK_OWNER_OPEN_ID, "some-other-id")).toBe(false);
  });

  it("whitelist has exactly 2 entries", () => {
    expect(ADMIN_EMAIL_WHITELIST.length).toBe(2);
  });

  it("whitelist contains the correct emails", () => {
    expect(ADMIN_EMAIL_WHITELIST).toContain("verticalauto89@gmail.com");
    expect(ADMIN_EMAIL_WHITELIST).toContain("verticalautoft@gmail.com");
  });
});
