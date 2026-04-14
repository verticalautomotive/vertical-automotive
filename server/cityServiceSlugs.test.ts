import { describe, it, expect } from "vitest";
import { getCityServicePath, getCitySlug } from "@/lib/cityServiceSlugs";

describe("getCitySlug", () => {
  it("maps battery-cranking-charging-systems to battery-charging-systems", () => {
    expect(getCitySlug("battery-cranking-charging-systems")).toBe("battery-charging-systems");
  });

  it("maps brake-system to brake-repair", () => {
    expect(getCitySlug("brake-system")).toBe("brake-repair");
  });

  it("maps transmission to transmission-service", () => {
    expect(getCitySlug("transmission")).toBe("transmission-service");
  });

  it("maps a-c-maintenance-repair to ac-repair", () => {
    expect(getCitySlug("a-c-maintenance-repair")).toBe("ac-repair");
  });

  it("maps oil-change-engine-service to engine-oil-service", () => {
    expect(getCitySlug("oil-change-engine-service")).toBe("engine-oil-service");
  });

  it("maps complete-diagnostics to complete-diagnostics (unchanged)", () => {
    expect(getCitySlug("complete-diagnostics")).toBe("complete-diagnostics");
  });

  it("maps routine-preventive-maintenance to routine-maintenance", () => {
    expect(getCitySlug("routine-preventive-maintenance")).toBe("routine-maintenance");
  });

  it("maps steering-suspension to steering-suspension (unchanged)", () => {
    expect(getCitySlug("steering-suspension")).toBe("steering-suspension");
  });

  it("maps fuel-system to fuel-system-service", () => {
    expect(getCitySlug("fuel-system")).toBe("fuel-system-service");
  });

  it("maps hybrids-ev to hybrid-ev-service", () => {
    expect(getCitySlug("hybrids-ev")).toBe("hybrid-ev-service");
  });

  it("maps alignment-tire-rotation-balancing to wheel-alignment", () => {
    expect(getCitySlug("alignment-tire-rotation-balancing")).toBe("wheel-alignment");
  });

  it("maps tires to empty string (homepage fallback)", () => {
    expect(getCitySlug("tires")).toBe("");
  });

  it("maps powertrain-restoration to empty string (homepage fallback)", () => {
    expect(getCitySlug("powertrain-restoration")).toBe("");
  });

  it("maps fleet-maintenance-repairs to fleet-services", () => {
    expect(getCitySlug("fleet-maintenance-repairs")).toBe("fleet-services");
  });

  it("maps manufacturer-recommended-services to routine-maintenance", () => {
    expect(getCitySlug("manufacturer-recommended-services")).toBe("routine-maintenance");
  });

  // Vehicle types
  it("maps tesla-vehicles-service to tesla-ev-repair", () => {
    expect(getCitySlug("tesla-vehicles-service")).toBe("tesla-ev-repair");
  });

  it("maps european-vehicles-service to european-vehicle-repair", () => {
    expect(getCitySlug("european-vehicles-service")).toBe("european-vehicle-repair");
  });

  it("maps asian-vehicles-service to asian-vehicle-repair", () => {
    expect(getCitySlug("asian-vehicles-service")).toBe("asian-vehicle-repair");
  });

  it("maps domestic-vehicles-service to domestic-vehicle-repair", () => {
    expect(getCitySlug("domestic-vehicles-service")).toBe("domestic-vehicle-repair");
  });

  it("returns the slug unchanged if no mapping exists", () => {
    expect(getCitySlug("unknown-service")).toBe("unknown-service");
  });
});

describe("getCityServicePath", () => {
  it("builds Fort Lauderdale brake repair path", () => {
    expect(getCityServicePath("fort-lauderdale", "brake-system")).toBe("/fort-lauderdale/brake-repair");
  });

  it("builds Wilton Manors brake repair path", () => {
    expect(getCityServicePath("wilton-manors", "brake-system")).toBe("/wilton-manors/brake-repair");
  });

  it("builds Fort Lauderdale Tesla EV repair path", () => {
    expect(getCityServicePath("fort-lauderdale", "tesla-vehicles-service")).toBe("/fort-lauderdale/tesla-ev-repair");
  });

  it("builds Wilton Manors Tesla EV repair path", () => {
    expect(getCityServicePath("wilton-manors", "tesla-vehicles-service")).toBe("/wilton-manors/tesla-ev-repair");
  });

  it("builds Fort Lauderdale AC repair path", () => {
    expect(getCityServicePath("fort-lauderdale", "a-c-maintenance-repair")).toBe("/fort-lauderdale/ac-repair");
  });

  it("builds Fort Lauderdale fleet services path", () => {
    expect(getCityServicePath("fort-lauderdale", "fleet-maintenance-repairs")).toBe("/fort-lauderdale/fleet-services");
  });

  it("returns homepage for tires slug (no dedicated city page yet)", () => {
    expect(getCityServicePath("fort-lauderdale", "tires")).toBe("/");
    expect(getCityServicePath("wilton-manors", "tires")).toBe("/");
  });

  it("returns homepage for powertrain-restoration slug (no dedicated city page yet)", () => {
    expect(getCityServicePath("fort-lauderdale", "powertrain-restoration")).toBe("/");
    expect(getCityServicePath("wilton-manors", "powertrain-restoration")).toBe("/");
  });

  it("returns homepage for car-wash slug (no dedicated city page yet)", () => {
    expect(getCityServicePath("fort-lauderdale", "car-wash")).toBe("/");
    expect(getCityServicePath("wilton-manors", "car-wash")).toBe("/");
  });

  it("builds Wilton Manors European vehicle repair path", () => {
    expect(getCityServicePath("wilton-manors", "european-vehicles-service")).toBe("/wilton-manors/european-vehicle-repair");
  });

  it("handles unknown slugs by using them as-is", () => {
    expect(getCityServicePath("fort-lauderdale", "custom-service")).toBe("/fort-lauderdale/custom-service");
  });

  // Verify all 16 Fort Lauderdale service paths from user requirements
  const ftlExpected: [string, string][] = [
    ["battery-cranking-charging-systems", "/fort-lauderdale/battery-charging-systems"],
    ["brake-system", "/fort-lauderdale/brake-repair"],
    ["transmission", "/fort-lauderdale/transmission-service"],
    ["a-c-maintenance-repair", "/fort-lauderdale/ac-repair"],
    ["oil-change-engine-service", "/fort-lauderdale/engine-oil-service"],
    ["complete-diagnostics", "/fort-lauderdale/complete-diagnostics"],
    ["routine-preventive-maintenance", "/fort-lauderdale/routine-maintenance"],
    ["steering-suspension", "/fort-lauderdale/steering-suspension"],
    ["fuel-system", "/fort-lauderdale/fuel-system-service"],
    ["hybrids-ev", "/fort-lauderdale/hybrid-ev-service"],
    ["alignment-tire-rotation-balancing", "/fort-lauderdale/wheel-alignment"],
    ["fleet-maintenance-repairs", "/fort-lauderdale/fleet-services"],
    ["tesla-vehicles-service", "/fort-lauderdale/tesla-ev-repair"],
    ["european-vehicles-service", "/fort-lauderdale/european-vehicle-repair"],
    ["asian-vehicles-service", "/fort-lauderdale/asian-vehicle-repair"],
    ["domestic-vehicles-service", "/fort-lauderdale/domestic-vehicle-repair"],
  ];

  ftlExpected.forEach(([dataSlug, expectedPath]) => {
    it(`FTL: ${dataSlug} → ${expectedPath}`, () => {
      expect(getCityServicePath("fort-lauderdale", dataSlug)).toBe(expectedPath);
    });
  });

  // Verify all 16 Wilton Manors service paths
  ftlExpected.forEach(([dataSlug, expectedPath]) => {
    const wmPath = expectedPath.replace("/fort-lauderdale/", "/wilton-manors/");
    it(`WM: ${dataSlug} → ${wmPath}`, () => {
      expect(getCityServicePath("wilton-manors", dataSlug)).toBe(wmPath);
    });
  });
});
