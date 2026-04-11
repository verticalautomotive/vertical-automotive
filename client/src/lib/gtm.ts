/**
 * GTM DataLayer Tracking Utility
 * Centralized event tracking for all CTA interactions.
 * Events are pushed to window.dataLayer for Google Tag Manager.
 */

// Extend Window to include dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushEvent(event: Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Track phone call button clicks */
export function trackCall(location: string, phoneNumber: string, source: string) {
  pushEvent({
    event: "cta_call",
    cta_type: "call",
    cta_location: location,
    cta_phone: phoneNumber,
    cta_source: source,
  });
}

/** Track SMS/Text Us button clicks */
export function trackTextUs(location: string, phoneNumber: string, source: string) {
  pushEvent({
    event: "cta_text_us",
    cta_type: "text_us",
    cta_location: location,
    cta_phone: phoneNumber,
    cta_source: source,
  });
}

/** Track Get Directions button clicks */
export function trackDirections(location: string, source: string) {
  pushEvent({
    event: "cta_directions",
    cta_type: "directions",
    cta_location: location,
    cta_source: source,
  });
  // Google Ads conversion — Get directions
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    (window as any).gtag("event", "conversion", {
      send_to: "AW-17913524206/PjP3CMKCp4ocEO7f6t1C",
      value: 1.0,
      currency: "USD",
    });
  }
}

/** Track Schedule Appointment button clicks */
export function trackSchedule(source: string) {
  pushEvent({
    event: "cta_schedule",
    cta_type: "schedule",
    cta_source: source,
  });
}

/** Track Claim Offer button clicks */
export function trackClaimOffer(offerTitle: string, source: string) {
  pushEvent({
    event: "cta_claim_offer",
    cta_type: "claim_offer",
    cta_offer: offerTitle,
    cta_source: source,
  });
}
