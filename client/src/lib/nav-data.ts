// ============================================================
// nav-data.ts — Minimal data needed by Navigation component
// Extracted from data.ts to prevent the full 43KB data.ts from
// being hoisted into the index chunk just because Navigation
// is shared across all lazy-loaded pages.
// ============================================================

export const COMPANY = {
  name: "Vertical Automotive",
  tagline: "Total Auto Care - 3 Years Warranty!",
  testimonial: '"..Great service, great prices, great customer experience. 5 stars!"',
  founded: 1989,
  yearsExperience: 36,
  vehiclesRepaired: "54k",
  staff: 2,
  satisfaction: "99%",
  hours: "8:00 AM — 5:00 PM",
  closedDays: "SAT-SUN Closed",
  appointmentUrl: "https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US&gei=cI2TafOKM-PJwt0PyNG6QQ&rwg_token=AFd1xnEuArG_s518nC9zqHme02PTrt1Bh4eLxCPdzptPNdAHspxQPFRzmUn0StOuvZamtHD05WU3V_u7JwtkKRM4EhUsB67PDA%3D%3D",
  logoUrl: "/logo-vertical-automotive.svg",
};

export const LOCATIONS = [
  {
    name: "Wilton Manors",
    address: "1100 W Oakland Park Blvd Unit 5",
    city: "Wilton Manors, FL 33311",
    fullAddress: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311",
    phone: "(954) 565-1518",
    phoneRaw: "9545651518",
    lat: 26.165788050203393,
    lng: -80.15759747891684,
    directionsUrl: "https://maps.app.goo.gl/dyKs1o1YECYzbJFf6",
  },
  {
    name: "Fort Lauderdale",
    address: "707 NE 11th Street",
    city: "Fort Lauderdale, FL 33304",
    fullAddress: "707 NE 11th Street, Fort Lauderdale, FL 33304",
    phone: "(645) 216-2266",
    phoneRaw: "6452162266",
    lat: 26.139035077116752,
    lng: -80.13559753014344,
    directionsUrl: "https://maps.app.goo.gl/52SrqXcH6K65Nqn66",
  },
];
