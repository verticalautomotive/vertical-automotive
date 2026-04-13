import { describe, it, expect } from "vitest";

describe("Slack CCAUTH Webhook", () => {
  it("should have SLACK_CCAUTH_WEBHOOK_URL env var set", () => {
    expect(process.env.SLACK_CCAUTH_WEBHOOK_URL).toBeTruthy();
    expect(process.env.SLACK_CCAUTH_WEBHOOK_URL).toMatch(
      /^https:\/\/hooks\.slack\.com\/services\//
    );
  });

  it("should successfully send a test message to Slack", async () => {
    const webhookUrl = process.env.SLACK_CCAUTH_WEBHOOK_URL!;
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "✅ *Vertical Automotive* — Slack webhook credential test passed.",
      }),
    });
    expect(response.ok).toBe(true);
  }, 10000);
});

describe("SendGrid API Key", () => {
  it("should have SENDGRID_API_KEY env var set", () => {
    expect(process.env.SENDGRID_API_KEY).toBeTruthy();
    expect(process.env.SENDGRID_API_KEY).toMatch(/^SG\./);
  });

  it("should authenticate successfully with SendGrid API", async () => {
    const response = await fetch("https://api.sendgrid.com/v3/user/profile", {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
      },
    });
    // 200 = valid key, 401 = invalid key
    expect(response.status).not.toBe(401);
    expect(response.ok).toBe(true);
  }, 10000);
});
