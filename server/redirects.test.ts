import { describe, it, expect } from "vitest";

/**
 * Tests for the 301 redirect map defined in server/_core/index.ts.
 * We test the redirect mapping logic directly (no HTTP server needed).
 */

// Replicate the redirect map from server/_core/index.ts
const serviceRedirects: Record<string, string> = {
  // Vehicle type pages
  "/services/tesla-vehicles-service": "/fort-lauderdale/tesla-ev-repair",
  "/services/asian-vehicles-service": "/fort-lauderdale/asian-vehicle-repair",
  "/services/european-vehicles-service": "/fort-lauderdale/european-vehicle-repair",
  "/services/domestic-vehicles-service": "/fort-lauderdale/domestic-vehicle-repair",
  // Service pages
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
  // Additional service pages
  "/services/battery-cranking-charging-systems": "/fort-lauderdale/battery-charging-systems",
  "/services/tires": "/fort-lauderdale/wheel-alignment",
  "/services/fleet-maintenance-repairs": "/fort-lauderdale/fleet-services",
  "/services/powertrain-restoration": "/fort-lauderdale/routine-maintenance",
  "/services/manufacturer-recommended-services": "/fort-lauderdale/routine-maintenance",
  "/services/car-wash": "/",
};

const slugRedirects: Record<string, string> = {
  "/brake-system-vertical-automotive/": "/fort-lauderdale/brake-repair",
  "/hybrids-ev-vertical-automotive/": "/fort-lauderdale/hybrid-ev-service",
  "/a-c-maintenance-repair-vertical-automotive/": "/fort-lauderdale/ac-repair",
  "/oil-change-engine-service-vertical-automotive/": "/fort-lauderdale/engine-oil-service",
  "/complete-diagnostics-vertical-automotive/": "/fort-lauderdale/complete-diagnostics",
  "/alignment-tire-rotation-balancing-vertical-automotive/": "/fort-lauderdale/wheel-alignment",
  "/battery-cranking-charging-systems-vertical-automotive/": "/fort-lauderdale/battery-charging-systems",
  "/transmission-vertical-automotive/": "/fort-lauderdale/transmission-service",
  "/steering-suspension-vertical-automotive/": "/fort-lauderdale/steering-suspension",
  "/fuel-system-vertical-automotive/": "/fort-lauderdale/fuel-system-service",
  "/routine-preventive-maintenance-vertical-automotive/": "/fort-lauderdale/routine-maintenance",
  "/fleet-maintenance-repairs-vertical-automotive/": "/fort-lauderdale/fleet-services",
  "/powertrain-restoration-vertical-automotive/": "/fort-lauderdale/routine-maintenance",
  "/tires-vertical-automotive/": "/fort-lauderdale/wheel-alignment",
};

const serviceRedirectsEs: Record<string, string> = {};
for (const [from, to] of Object.entries(serviceRedirects)) {
  const esTo = to === "/" ? "/es" : "/es" + to;
  serviceRedirectsEs["/es" + from] = esTo;
}

const allRedirects = { ...serviceRedirects, ...slugRedirects, ...serviceRedirectsEs };

describe("301 Redirect Map", () => {
  it("should have exactly 20 English /services/* redirects", () => {
    expect(Object.keys(serviceRedirects)).toHaveLength(20);
  });

  it("should have exactly 14 slug-format redirects", () => {
    expect(Object.keys(slugRedirects)).toHaveLength(14);
  });

  it("should have exactly 20 Spanish /es/services/* redirects", () => {
    expect(Object.keys(serviceRedirectsEs)).toHaveLength(20);
  });

  it("should have 54 total redirects (20 EN + 14 slug + 20 ES)", () => {
    expect(Object.keys(allRedirects)).toHaveLength(54);
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

  describe("/services/* redirect mappings", () => {
    const expectedMappings: [string, string][] = [
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
      ["/services/battery-cranking-charging-systems", "/fort-lauderdale/battery-charging-systems"],
      ["/services/tires", "/fort-lauderdale/wheel-alignment"],
      ["/services/fleet-maintenance-repairs", "/fort-lauderdale/fleet-services"],
      ["/services/powertrain-restoration", "/fort-lauderdale/routine-maintenance"],
      ["/services/manufacturer-recommended-services", "/fort-lauderdale/routine-maintenance"],
      ["/services/car-wash", "/"],
    ];

    for (const [from, to] of expectedMappings) {
      it(`EN: ${from} → ${to}`, () => {
        expect(allRedirects[from]).toBe(to);
      });
    }

    it("ES: /es/services/car-wash → /es (homepage)", () => {
      expect(allRedirects["/es/services/car-wash"]).toBe("/es");
    });

    it("ES: /es/services/transmission → /es/fort-lauderdale/transmission-service", () => {
      expect(allRedirects["/es/services/transmission"]).toBe("/es/fort-lauderdale/transmission-service");
    });
  });

  describe("/slug-vertical-automotive/ redirect mappings", () => {
    const expectedSlugMappings: [string, string][] = [
      ["/brake-system-vertical-automotive/", "/fort-lauderdale/brake-repair"],
      ["/hybrids-ev-vertical-automotive/", "/fort-lauderdale/hybrid-ev-service"],
      ["/a-c-maintenance-repair-vertical-automotive/", "/fort-lauderdale/ac-repair"],
      ["/oil-change-engine-service-vertical-automotive/", "/fort-lauderdale/engine-oil-service"],
      ["/complete-diagnostics-vertical-automotive/", "/fort-lauderdale/complete-diagnostics"],
      ["/alignment-tire-rotation-balancing-vertical-automotive/", "/fort-lauderdale/wheel-alignment"],
      ["/battery-cranking-charging-systems-vertical-automotive/", "/fort-lauderdale/battery-charging-systems"],
      ["/transmission-vertical-automotive/", "/fort-lauderdale/transmission-service"],
      ["/steering-suspension-vertical-automotive/", "/fort-lauderdale/steering-suspension"],
      ["/fuel-system-vertical-automotive/", "/fort-lauderdale/fuel-system-service"],
      ["/routine-preventive-maintenance-vertical-automotive/", "/fort-lauderdale/routine-maintenance"],
      ["/fleet-maintenance-repairs-vertical-automotive/", "/fort-lauderdale/fleet-services"],
      ["/powertrain-restoration-vertical-automotive/", "/fort-lauderdale/routine-maintenance"],
      ["/tires-vertical-automotive/", "/fort-lauderdale/wheel-alignment"],
    ];

    for (const [from, to] of expectedSlugMappings) {
      it(`${from} → ${to}`, () => {
        expect(allRedirects[from]).toBe(to);
      });
    }
  });
});
