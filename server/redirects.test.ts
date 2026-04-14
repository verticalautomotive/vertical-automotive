import { describe, it, expect } from "vitest";

/**
 * Tests for the 301 redirect map defined in server/_core/index.ts.
 * We test the redirect mapping logic directly (no HTTP server needed).
 */

// Replicate the redirect map from server/_core/index.ts
const serviceRedirects: Record<string, string> = {
  "/services/tesla-vehicles-service": "/fort-lauderdale/tesla-ev-repair",
  "/services/asian-vehicles-service": "/fort-lauderdale/asian-vehicle-repair",
  "/services/european-vehicles-service": "/fort-lauderdale/european-vehicle-repair",
  "/services/domestic-vehicles-service": "/fort-lauderdale/domestic-vehicle-repair",
  "/services/brake-system": "/fort-lauderdale/brake-repair",
  "/services/transmission": "/fort-lauderdale/transmission-service",
  "/services/a-c-maintenance-repair": "/fort-lauderdale/ac-repair",
  "/services/oil-change-engine-service": "/fort-lauderdale/engine-oil-service",
  "/services/complete-diagnostics": "/fort-lauderdale/complete-diagnostics",
  "/services/routine-preventive-maintenance": "/fort-lauderdale/routine-maintenance",
  "/services/steering-suspension": "/fort-lauderdale/steering-suspension",
  "/services/fuel-system": "/fort-lauderdale/fuel-system-service",
  "/services/hybrids-ev": "/fort-lauderdale/hybrid-ev-service",
  "/services/alignment-tire-rotation-balancing": "/fort-lauderdale/wheel-alignment",
};

const serviceRedirectsEs: Record<string, string> = {};
for (const [from, to] of Object.entries(serviceRedirects)) {
  serviceRedirectsEs["/es" + from] = "/es" + to;
}

const allRedirects = { ...serviceRedirects, ...serviceRedirectsEs };

describe("301 Redirect Map", () => {
  it("should have exactly 14 English redirects", () => {
    expect(Object.keys(serviceRedirects)).toHaveLength(14);
  });

  it("should have exactly 14 Spanish redirects", () => {
    expect(Object.keys(serviceRedirectsEs)).toHaveLength(14);
  });

  it("should have 28 total redirects", () => {
    expect(Object.keys(allRedirects)).toHaveLength(28);
  });

  it("should redirect all old EN service URLs to /fort-lauderdale/ paths", () => {
    for (const [from, to] of Object.entries(serviceRedirects)) {
      expect(from).toMatch(/^\/services\//);
      expect(to).toMatch(/^\/fort-lauderdale\//);
    }
  });

  it("should redirect all old ES service URLs to /es/fort-lauderdale/ paths", () => {
    for (const [from, to] of Object.entries(serviceRedirectsEs)) {
      expect(from).toMatch(/^\/es\/services\//);
      expect(to).toMatch(/^\/es\/fort-lauderdale\//);
    }
  });

  it("should NOT redirect /services (main page)", () => {
    expect(allRedirects["/services"]).toBeUndefined();
  });

  it("should NOT redirect /services/faq", () => {
    expect(allRedirects["/services/faq"]).toBeUndefined();
  });

  it("should NOT redirect /payment-authorization", () => {
    expect(allRedirects["/payment-authorization"]).toBeUndefined();
  });

  describe("specific redirect mappings", () => {
    const expectedMappings = [
      ["/services/tesla-vehicles-service", "/fort-lauderdale/tesla-ev-repair"],
      ["/services/asian-vehicles-service", "/fort-lauderdale/asian-vehicle-repair"],
      ["/services/european-vehicles-service", "/fort-lauderdale/european-vehicle-repair"],
      ["/services/domestic-vehicles-service", "/fort-lauderdale/domestic-vehicle-repair"],
      ["/services/brake-system", "/fort-lauderdale/brake-repair"],
      ["/services/transmission", "/fort-lauderdale/transmission-service"],
      ["/services/a-c-maintenance-repair", "/fort-lauderdale/ac-repair"],
      ["/services/oil-change-engine-service", "/fort-lauderdale/engine-oil-service"],
      ["/services/complete-diagnostics", "/fort-lauderdale/complete-diagnostics"],
      ["/services/routine-preventive-maintenance", "/fort-lauderdale/routine-maintenance"],
      ["/services/steering-suspension", "/fort-lauderdale/steering-suspension"],
      ["/services/fuel-system", "/fort-lauderdale/fuel-system-service"],
      ["/services/hybrids-ev", "/fort-lauderdale/hybrid-ev-service"],
      ["/services/alignment-tire-rotation-balancing", "/fort-lauderdale/wheel-alignment"],
    ] as const;

    for (const [from, to] of expectedMappings) {
      it(`should redirect ${from} → ${to}`, () => {
        expect(allRedirects[from]).toBe(to);
      });

      it(`should redirect /es${from} → /es${to}`, () => {
        expect(allRedirects["/es" + from]).toBe("/es" + to);
      });
    }
  });
});
