/**
 * City-specific URL slug mapping for all services and vehicle types.
 * Maps old data slugs → correct city page slugs used in /fort-lauderdale/ and /wilton-manors/ routes.
 * 
 * Usage:
 *   getCityServicePath("fort-lauderdale", "brake-system") → "/fort-lauderdale/brake-repair"
 *   getCityServicePath("wilton-manors", "tesla-vehicles-service") → "/wilton-manors/tesla-ev-repair"
 */

// Maps the data-file slug to the correct city-page slug
const SLUG_TO_CITY_SLUG: Record<string, string> = {
  // Services
  "battery-cranking-charging-systems": "battery-charging-systems",
  "brake-system": "brake-repair",
  "transmission": "transmission-service",
  "a-c-maintenance-repair": "ac-repair",
  "oil-change-engine-service": "engine-oil-service",
  "complete-diagnostics": "complete-diagnostics",
  "routine-preventive-maintenance": "routine-maintenance",
  "steering-suspension": "steering-suspension",
  "fuel-system": "fuel-system-service",
  "hybrids-ev": "hybrid-ev-service",
  "alignment-tire-rotation-balancing": "wheel-alignment",
  "tires": "__homepage__",
  "powertrain-restoration": "__homepage__",
  "fleet-maintenance-repairs": "fleet-services",
  "manufacturer-recommended-services": "routine-maintenance",
  "car-wash": "__homepage__",
  // Vehicle types
  "tesla-vehicles-service": "tesla-ev-repair",
  "european-vehicles-service": "european-vehicle-repair",
  "asian-vehicles-service": "asian-vehicle-repair",
  "domestic-vehicles-service": "domestic-vehicle-repair",
};

/**
 * Get the city-specific path for a service or vehicle type.
 * @param city - "fort-lauderdale" or "wilton-manors"
 * @param dataSlug - The slug from the data file (e.g., "brake-system")
 * @returns Full path like "/fort-lauderdale/brake-repair"
 */
export function getCityServicePath(city: string, dataSlug: string): string {
  const citySlug = SLUG_TO_CITY_SLUG[dataSlug] || dataSlug;
  // Services without a dedicated city page fall back to homepage
  if (citySlug === "__homepage__") return "/";
  return `/${city}/${citySlug}`;
}

/**
 * Get the city slug for a given data slug.
 * @param dataSlug - The slug from the data file
 * @returns The city-page slug
 */
export function getCitySlug(dataSlug: string): string {
  const slug = SLUG_TO_CITY_SLUG[dataSlug] || dataSlug;
  return slug === "__homepage__" ? "" : slug;
}

export default SLUG_TO_CITY_SLUG;
