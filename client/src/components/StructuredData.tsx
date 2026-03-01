/**
 * StructuredData — JSON-LD structured data for SEO
 * Provides a single AutoRepair schema markup for the business.
 * On the homepage, this component is skipped because Home.tsx provides its own
 * more detailed schema with aggregateRating and locations.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://verticalautomotive.com/#business",
  "name": "Vertical Automotive",
  "description": "ASE-certified full-service auto repair shop in Fort Lauderdale, FL. Specializing in Tesla, Asian, European, and Domestic vehicles with 36 years of experience.",
  "url": "https://verticalautomotive.com",
  "telephone": "+19545651518",
  "foundingDate": "1989",
  "priceRange": "$$",
  "image": "https://verticalautomotive.com/logo.png",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "1100 W Oakland Park Blvd Unit 5",
    "addressLocality": "Wilton Manors",
    "addressRegion": "FL",
    "postalCode": "33311",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "26.1617",
    "longitude": "-80.1544"
  },
  "areaServed": [
    { "@type": "City", "name": "Fort Lauderdale" },
    { "@type": "City", "name": "Wilton Manors" },
    { "@type": "City", "name": "Oakland Park" },
    { "@type": "City", "name": "Victoria Park" }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Auto Repair Services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Battery, Cranking & Charging Systems" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brake Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Transmission Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "A/C Maintenance & Repair" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Oil Change & Engine Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Complete Diagnostics" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Routine & Preventive Maintenance" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Steering & Suspension" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Fuel System Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Hybrid & EV Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Wheel Alignment, Tire Rotation & Balancing" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Tesla Vehicle Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Asian Vehicle Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "European Vehicle Service" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Domestic Vehicle Service" } }
    ]
  },
  "paymentAccepted": "Visa, Mastercard, American Express, Discover",
  "sameAs": [
    "https://www.google.com/maps/place/Vertical+Automotive"
  ]
};

export default function StructuredData() {
  const [location] = useLocation();

  useEffect(() => {
    // Skip on homepage — Home.tsx provides its own comprehensive schema
    // to avoid duplicate AutoRepair entities
    const isHomepage = location === "/" || location === "/es" || location === "/es/";
    if (isHomepage) return;

    const id = "structured-data-jsonld";
    let script = document.getElementById(id) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(STRUCTURED_DATA);

    return () => {
      script?.remove();
    };
  }, [location]);

  return null;
}
