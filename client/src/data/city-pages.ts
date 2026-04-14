/**
 * City-Specific Service Pages Data
 * 32 pages total: 16 services × 2 locations (Fort Lauderdale + Wilton Manors)
 * Each page has genuinely unique content per city — not thin duplicates
 */

import { CITY_PAGES_CONTENT } from "./city-pages-content";

export interface CityPageContent {
  serviceSlug: string;
  serviceName: string;
  serviceNameEs: string;
  city: "fort-lauderdale" | "wilton-manors";
  cityDisplay: string;
  cityDisplayEs: string;
  phone: string;
  address: string;
  addressEs: string;
  zipCode: string;
  
  // SEO
  titleTag: string;
  titleTagEs: string;
  metaDescription: string;
  metaDescriptionEs: string;
  h1: string;
  h1Es: string;
  subheading: string;
  subheadingEs: string;
  
  // Content sections
  introText: string;
  introTextEs: string;
  whyChooseUs: string[];
  whyChooseUsEs: string[];
  whatIncluded: string[];
  whatIncludedEs: string[];
  vehiclesWeService: string[];
  vehiclesWeServiceEs: string[];
  
  // FAQ (3 questions per page)
  faq: Array<{
    question: string;
    questionEs: string;
    answer: string;
    answerEs: string;
  }>;
  
  // Directions
  directions: string;
  directionsEs: string;
  
  // Related services (3 links to same-city pages)
  relatedServices: Array<{
    serviceSlug: string;
    serviceName: string;
  }>;
}

// LOCATION DATA
const FORT_LAUDERDALE = {
  city: "fort-lauderdale" as const,
  cityDisplay: "Fort Lauderdale",
  cityDisplayEs: "Fort Lauderdale",
  phone: "(645) 216-2266",
  address: "707 NE 11th Street, Fort Lauderdale, FL 33304",
  addressEs: "707 NE 11th Street, Fort Lauderdale, FL 33304",
  zipCode: "33304",
  directions: "Located at 707 NE 11th Street, just off Federal Highway in Fort Lauderdale. Easily accessible from downtown Fort Lauderdale, Flagler Village, and Las Olas.",
  directionsEs: "Ubicado en 707 NE 11th Street, justo al lado de Federal Highway en Fort Lauderdale. Fácil acceso desde el centro de Fort Lauderdale, Flagler Village y Las Olas.",
};

const WILTON_MANORS = {
  city: "wilton-manors" as const,
  cityDisplay: "Wilton Manors",
  cityDisplayEs: "Wilton Manors",
  phone: "(954) 565-1518",
  address: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311",
  addressEs: "1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311",
  zipCode: "33311",
  directions: "Located at 1100 W Oakland Park Blvd Unit 5, easily accessible from Wilton Drive, Oakland Park, and the surrounding Broward County communities.",
  directionsEs: "Ubicado en 1100 W Oakland Park Blvd Unit 5, fácil acceso desde Wilton Drive, Oakland Park y las comunidades circundantes de Broward County.",
};

// SERVICE DEFINITIONS
const SERVICES = [
  {
    slug: "tesla-ev-repair",
    name: "Tesla & EV Service",
    nameEs: "Servicio Tesla y Vehículos Eléctricos",
    vehicles: ["Tesla Model S", "Tesla Model 3", "Tesla Model X", "Tesla Model Y", "Tesla Cybertruck", "Chevrolet Bolt", "Nissan Leaf", "Ford Mustang Mach-E", "Hyundai Ioniq", "Kia EV6"],
    vehiclesEs: ["Tesla Model S", "Tesla Model 3", "Tesla Model X", "Tesla Model Y", "Tesla Cybertruck", "Chevrolet Bolt", "Nissan Leaf", "Ford Mustang Mach-E", "Hyundai Ioniq", "Kia EV6"],
    whatIncluded: [
      "Battery diagnostics and health reports",
      "High-voltage system inspection",
      "Charging system repair",
      "Brake fluid and coolant service",
      "Software updates and resets",
      "Suspension and alignment",
    ],
    whatIncludedEs: [
      "Diagnóstico de batería e informes de salud",
      "Inspección del sistema de alto voltaje",
      "Reparación del sistema de carga",
      "Servicio de líquido de frenos y refrigerante",
      "Actualizaciones de software y reinicio",
      "Suspensión y alineación",
    ],
  },
  {
    slug: "european-vehicle-repair",
    name: "European Vehicle Service",
    nameEs: "Servicio de Vehículos Europeos",
    vehicles: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat"],
    vehiclesEs: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat"],
    whatIncluded: [
      "Engine diagnostics and repair",
      "Transmission service",
      "Brake system maintenance",
      "Suspension and steering repair",
      "Air conditioning service",
      "Electrical system diagnostics",
    ],
    whatIncludedEs: [
      "Diagnóstico y reparación del motor",
      "Servicio de transmisión",
      "Mantenimiento del sistema de frenos",
      "Reparación de suspensión y dirección",
      "Servicio de aire acondicionado",
      "Diagnóstico del sistema eléctrico",
    ],
  },
  {
    slug: "asian-vehicle-repair",
    name: "Asian Vehicle Service",
    nameEs: "Servicio de Vehículos Asiáticos",
    vehicles: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi"],
    vehiclesEs: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi"],
    whatIncluded: [
      "Full engine service and diagnostics",
      "Transmission repair and maintenance",
      "Brake pad and rotor replacement",
      "Air conditioning recharge",
      "Oil change and filter service",
      "Suspension alignment",
    ],
    whatIncludedEs: [
      "Servicio completo del motor y diagnóstico",
      "Reparación y mantenimiento de transmisión",
      "Reemplazo de pastillas y rotores de freno",
      "Recarga de aire acondicionado",
      "Cambio de aceite y servicio de filtro",
      "Alineación de suspensión",
    ],
  },
  {
    slug: "domestic-vehicle-repair",
    name: "Domestic Vehicle Service",
    nameEs: "Servicio de Vehículos Domésticos",
    vehicles: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    vehiclesEs: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    whatIncluded: [
      "Engine diagnostics and repair",
      "Transmission service",
      "Brake system maintenance",
      "Suspension and steering",
      "Air conditioning service",
      "Electrical system repair",
    ],
    whatIncludedEs: [
      "Diagnóstico y reparación del motor",
      "Servicio de transmisión",
      "Mantenimiento del sistema de frenos",
      "Suspensión y dirección",
      "Servicio de aire acondicionado",
      "Reparación del sistema eléctrico",
    ],
  },
  {
    slug: "brake-repair",
    name: "Brake & Rotor Service",
    nameEs: "Servicio de Frenos y Rotores",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Brake pad replacement ($270–$550 per axle)",
      "Rotor resurfacing or replacement ($550–$950 per axle)",
      "Brake fluid flush and exchange ($155–$275)",
      "Brake caliper cleaning and lubrication ($150–$225)",
      "Brake line inspection",
      "Complete brake system diagnostics",
    ],
    whatIncludedEs: [
      "Reemplazo de pastillas de freno ($270–$550 por eje)",
      "Resurfacing o reemplazo de rotores ($550–$950 por eje)",
      "Purga e intercambio de líquido de frenos ($155–$275)",
      "Limpieza y lubricación de calibrador ($150–$225)",
      "Inspección de líneas de freno",
      "Diagnóstico completo del sistema de frenos",
    ],
  },
  {
    slug: "transmission-service",
    name: "Transmission Service",
    nameEs: "Servicio de Transmisión",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Transmission fluid exchange",
      "Automatic transmission repair",
      "Manual transmission service",
      "CVT transmission diagnostics",
      "Transmission filter replacement",
      "Complete transmission diagnostics",
    ],
    whatIncludedEs: [
      "Intercambio de líquido de transmisión",
      "Reparación de transmisión automática",
      "Servicio de transmisión manual",
      "Diagnóstico de transmisión CVT",
      "Reemplazo de filtro de transmisión",
      "Diagnóstico completo de transmisión",
    ],
  },
  {
    slug: "ac-repair",
    name: "A/C Repair & Maintenance",
    nameEs: "Reparación y Mantenimiento de Aire Acondicionado",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "A/C performance and leak test ($240–$325)",
      "Refrigerant recharge",
      "Compressor repair or replacement",
      "Condenser service",
      "Evaporator cleaning",
      "A/C system diagnostics",
    ],
    whatIncludedEs: [
      "Prueba de rendimiento y fugas de A/C ($240–$325)",
      "Recarga de refrigerante",
      "Reparación o reemplazo de compresor",
      "Servicio de condensador",
      "Limpieza del evaporador",
      "Diagnóstico del sistema de A/C",
    ],
  },
  {
    slug: "engine-oil-service",
    name: "Engine, Oil & Filters",
    nameEs: "Motor, Aceite y Filtros",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Full synthetic oil change ($89.99–$185)",
      "Conventional oil change",
      "High-mileage oil service",
      "Oil filter replacement",
      "Engine air filter service",
      "Cabin air filter replacement",
    ],
    whatIncludedEs: [
      "Cambio de aceite sintético completo ($89.99–$185)",
      "Cambio de aceite convencional",
      "Servicio de aceite de alto kilometraje",
      "Reemplazo de filtro de aceite",
      "Servicio de filtro de aire del motor",
      "Reemplazo de filtro de aire de cabina",
    ],
  },
  {
    slug: "complete-diagnostics",
    name: "Complete Diagnostics",
    nameEs: "Diagnóstico Completo",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Diagnostic scan and health report ($200–$275)",
      "Engine light diagnostics",
      "Computer diagnostics for all systems",
      "Electrical system testing",
      "Performance analysis",
      "Written diagnostic report",
    ],
    whatIncludedEs: [
      "Escaneo de diagnóstico e informe de salud ($200–$275)",
      "Diagnóstico de luz del motor",
      "Diagnóstico computarizado de todos los sistemas",
      "Prueba del sistema eléctrico",
      "Análisis de rendimiento",
      "Informe de diagnóstico escrito",
    ],
  },
  {
    slug: "routine-maintenance",
    name: "Routine & Preventive Maintenance",
    nameEs: "Mantenimiento Rutinario y Preventivo",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "30,000 mile service ($450–$750)",
      "60,000 mile service ($850–$1,450)",
      "90,000 mile service ($1,100–$1,850)",
      "120,000 mile service ($1,250–$2,100)",
      "Scheduled maintenance intervals",
      "Fluid checks and top-offs",
    ],
    whatIncludedEs: [
      "Servicio de 30,000 millas ($450–$750)",
      "Servicio de 60,000 millas ($850–$1,450)",
      "Servicio de 90,000 millas ($1,100–$1,850)",
      "Servicio de 120,000 millas ($1,250–$2,100)",
      "Intervalos de mantenimiento programado",
      "Verificación de fluidos y rellenado",
    ],
  },
  {
    slug: "steering-suspension",
    name: "Steering & Suspension",
    nameEs: "Dirección y Suspensión",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Suspension inspection and diagnostics",
      "Shock and strut replacement",
      "Control arm repair",
      "Steering system service",
      "Wheel bearing replacement ($550–$950)",
      "Suspension alignment",
    ],
    whatIncludedEs: [
      "Inspección y diagnóstico de suspensión",
      "Reemplazo de amortiguadores",
      "Reparación de brazos de control",
      "Servicio del sistema de dirección",
      "Reemplazo de rodamiento de rueda ($550–$950)",
      "Alineación de suspensión",
    ],
  },
  {
    slug: "fuel-system-service",
    name: "Fuel System Service",
    nameEs: "Servicio del Sistema de Combustible",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Fuel injector cleaning",
      "Fuel filter replacement",
      "Fuel pump diagnostics",
      "Fuel line inspection",
      "Fuel system pressure testing",
      "Complete fuel system diagnostics",
    ],
    whatIncludedEs: [
      "Limpieza de inyectores de combustible",
      "Reemplazo de filtro de combustible",
      "Diagnóstico de bomba de combustible",
      "Inspección de líneas de combustible",
      "Prueba de presión del sistema de combustible",
      "Diagnóstico completo del sistema de combustible",
    ],
  },
  {
    slug: "hybrid-ev-service",
    name: "Hybrid & EV Service",
    nameEs: "Servicio de Híbridos y Eléctricos",
    vehicles: ["Toyota Prius", "Honda Hybrid", "Chevy Volt", "Lexus Hybrid", "Acura Hybrid"],
    vehiclesEs: ["Toyota Prius", "Honda Hybrid", "Chevy Volt", "Lexus Hybrid", "Acura Hybrid"],
    whatIncluded: [
      "Hybrid battery diagnostics",
      "High-voltage system inspection",
      "Regenerative braking service",
      "Hybrid transmission service",
      "Electric motor diagnostics",
      "Hybrid system optimization",
    ],
    whatIncludedEs: [
      "Diagnóstico de batería híbrida",
      "Inspección del sistema de alto voltaje",
      "Servicio de frenado regenerativo",
      "Servicio de transmisión híbrida",
      "Diagnóstico del motor eléctrico",
      "Optimización del sistema híbrido",
    ],
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment, Tire Rotation & Balancing",
    nameEs: "Alineación de Ruedas, Rotación y Balanceo",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Precision wheel alignment",
      "Tire rotation service",
      "Tire balancing",
      "Alignment diagnostics",
      "Suspension inspection",
      "Tire pressure monitoring",
    ],
    whatIncludedEs: [
      "Alineación de ruedas de precisión",
      "Servicio de rotación de neumáticos",
      "Balanceo de neumáticos",
      "Diagnóstico de alineación",
      "Inspección de suspensión",
      "Monitoreo de presión de neumáticos",
    ],
  },
  {
    slug: "battery-charging-systems",
    name: "Battery & Charging Systems",
    nameEs: "Batería y Sistemas de Carga",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Battery replacement ($240–$450)",
      "Battery diagnostics",
      "Charging system repair",
      "Alternator service",
      "Starter motor repair",
      "Electrical system testing",
    ],
    whatIncludedEs: [
      "Reemplazo de batería ($240–$450)",
      "Diagnóstico de batería",
      "Reparación del sistema de carga",
      "Servicio de alternador",
      "Reparación del motor de arranque",
      "Prueba del sistema eléctrico",
    ],
  },
  {
    slug: "fleet-services",
    name: "Fleet Services & Maintenance",
    nameEs: "Servicios de Flota y Mantenimiento",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      "Scheduled fleet maintenance",
      "Bulk oil change service",
      "Fleet diagnostics",
      "Commercial vehicle repair",
      "Preventive maintenance programs",
      "Fleet tracking and reporting",
    ],
    whatIncludedEs: [
      "Mantenimiento programado de flota",
      "Servicio de cambio de aceite a granel",
      "Diagnóstico de flota",
      "Reparación de vehículos comerciales",
      "Programas de mantenimiento preventivo",
      "Seguimiento y reporte de flota",
    ],
  },
];

// Generate city page content for all combinations
export function generateCityPages(): CityPageContent[] {
  const pages: CityPageContent[] = [];

  for (const service of SERVICES) {
    for (const location of [FORT_LAUDERDALE, WILTON_MANORS]) {
      const isFortLauderdale = location.city === "fort-lauderdale";
      
      // Find generated content for this service + city combo
      const generatedContent = CITY_PAGES_CONTENT.find(
        (c) => c.serviceSlug === service.slug && c.city === location.city
      );

      const page: CityPageContent = {
        serviceSlug: service.slug,
        serviceName: service.name,
        serviceNameEs: service.nameEs,
        city: location.city,
        cityDisplay: location.cityDisplay,
        cityDisplayEs: location.cityDisplayEs,
        phone: location.phone,
        address: location.address,
        addressEs: location.addressEs,
        zipCode: location.zipCode,

        // SEO
        titleTag: `${service.name} in ${location.cityDisplay}, FL | Vertical Automotive`,
        titleTagEs: `${service.nameEs} en ${location.cityDisplay}, FL | Vertical Automotive`,
        metaDescription: isFortLauderdale
          ? `${service.name} in Fort Lauderdale at Vertical Automotive. ASE-certified, 3-year warranty. Call (645) 216-2266 or book online.`
          : `${service.name} in Wilton Manors at Vertical Automotive. ASE-certified, 3-year warranty. Call (954) 565-1518 or book online.`,
        metaDescriptionEs: isFortLauderdale
          ? `${service.nameEs} en Fort Lauderdale en Vertical Automotive. Certificado ASE, garantía 3 años. Llame (645) 216-2266 o reserve en línea.`
          : `${service.nameEs} en Wilton Manors en Vertical Automotive. Certificado ASE, garantía 3 años. Llame (954) 565-1518 o reserve en línea.`,
        h1: `${service.name} in ${location.cityDisplay}, FL | Vertical Automotive`,
        h1Es: `${service.nameEs} en ${location.cityDisplay}, FL | Vertical Automotive`,
        subheading: isFortLauderdale
          ? `Professional ${service.name.toLowerCase()} at 707 NE 11th Street, Fort Lauderdale. ASE-certified technicians, 3-year warranty.`
          : `Professional ${service.name.toLowerCase()} at 1100 W Oakland Park Blvd, Wilton Manors. ASE-certified technicians, 3-year warranty.`,
        subheadingEs: isFortLauderdale
          ? `${service.nameEs.toLowerCase()} profesional en 707 NE 11th Street, Fort Lauderdale. Técnicos certificados ASE, garantía 3 años.`
          : `${service.nameEs.toLowerCase()} profesional en 1100 W Oakland Park Blvd, Wilton Manors. Técnicos certificados ASE, garantía 3 años.`,

        // Use generated content
        introText: generatedContent?.introText || "",
        introTextEs: generatedContent?.introTextEs || "",
        whyChooseUs: generatedContent?.whyChooseUs || [],
        whyChooseUsEs: generatedContent?.whyChooseUsEs || [],
        whatIncluded: service.whatIncluded,
        whatIncludedEs: service.whatIncludedEs,
        vehiclesWeService: service.vehicles.length > 0 ? service.vehicles : [],
        vehiclesWeServiceEs: service.vehiclesEs.length > 0 ? service.vehiclesEs : [],

        faq: generatedContent?.faq || [],
        directions: location.directions,
        directionsEs: location.directionsEs,
        relatedServices: generatedContent?.relatedServices || [],
      };

      pages.push(page);
    }
  }

  return pages;
}

// Helper to get pages by city
export function getCityPages(city: "fort-lauderdale" | "wilton-manors"): CityPageContent[] {
  return generateCityPages().filter((p) => p.city === city);
}

// Helper to get a single page
export function getCityPage(city: "fort-lauderdale" | "wilton-manors", serviceSlug: string): CityPageContent | undefined {
  return generateCityPages().find((p) => p.city === city && p.serviceSlug === serviceSlug);
}
