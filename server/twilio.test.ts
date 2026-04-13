/**
 * Twilio credentials validation test
 * Verifies that the Twilio client can be initialized and the account is reachable.
 */
import { describe, it, expect } from "vitest";
import twilio from "twilio";

describe("Twilio credentials", () => {
  it("should initialize Twilio client with env credentials", () => {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    const from = process.env.TWILIO_FROM_NUMBER;

    expect(sid, "TWILIO_ACCOUNT_SID must be set").toBeTruthy();
    expect(token, "TWILIO_AUTH_TOKEN must be set").toBeTruthy();
    expect(from, "TWILIO_FROM_NUMBER must be set").toBeTruthy();
    expect(sid).toMatch(/^AC/);
  });

  it("should be able to fetch account details from Twilio API", async () => {
    const sid = process.env.TWILIO_ACCOUNT_SID!;
    const token = process.env.TWILIO_AUTH_TOKEN!;
    const client = twilio(sid, token);

    const account = await client.api.accounts(sid).fetch();
    expect(account.sid).toBe(sid);
    expect(account.status).toBe("active");
  }, 15000);
});
