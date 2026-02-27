/**
 * StructuredData — JSON-LD structured data for SEO
 * Provides LocalBusiness and AutoRepair schema markup
 */
import { useEffect } from "react";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Vertical Automotive",
  "description": "ASE-certified full-service auto repair shop in Fort Lauderdale, FL. Specializing in Tesla, Asian, European, and Domestic vehicles with 36 years of experience.",
  "url": "https://verticalautomotive.com",
  "telephone": ["+19545651518", "+16452162266"],
  "foundingDate": "1989",
  "priceRange": "$$",
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "17:00"
  },
  "address": [
    {
      "@type": "PostalAddress",
      "streetAddress": "1100 W Oakland Park Blvd Unit 5",
      "addressLocality": "Wilton Manors",
      "addressRegion": "FL",
      "postalCode": "33311",
      "addressCountry": "US"
    },
    {
      "@type": "PostalAddress",
      "streetAddress": "707 NE 11th St",
      "addressLocality": "Fort Lauderdale",
      "addressRegion": "FL",
      "postalCode": "33304",
      "addressCountry": "US"
    }
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "26.1617",
    "longitude": "-80.1544"
  },
  "areaServed": {
    "@type": "City",
    "name": "Fort Lauderdale"
  },
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
  "sameAs": []
};

export default function StructuredData() {
  useEffect(() => {
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
  }, []);

  return null;
}
