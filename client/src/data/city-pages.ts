/**
 * City-Specific Service Pages Data
 * 32 pages total: 16 services × 2 locations (Fort Lauderdale + Wilton Manors)
 * Each page has genuinely unique content per city — not thin duplicates
 */

import { CITY_PAGES_CONTENT } from "./city-pages-content";

export interface ServiceItem {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
  price?: string; // e.g. "$270–$550 per axle"
}

export interface WhyChooseItem {
  title: string;
  titleEs: string;
  description: string;
  descriptionEs: string;
}

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
  whyChooseUs: WhyChooseItem[];
  whatIncluded: ServiceItem[];
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

  // Optional photo gallery (vehicle-type pages)
  gallery?: string[];
  galleryAlt?: string[];
  // Optional video gallery
  videos?: string[];
  videosAlt?: string[];
  // Optional real-world customer story
  realWorldStory?: string;
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

// SERVICE DEFINITIONS with expanded What's Included (10-12 items with descriptions and pricing)
const SERVICES = [
  {
    slug: "tesla-ev-repair",
    name: "Tesla & EV Service",
    nameEs: "Servicio Tesla y Vehículos Eléctricos",
    vehicles: ["Tesla Model S", "Tesla Model 3", "Tesla Model X", "Tesla Model Y", "Tesla Cybertruck", "Chevrolet Bolt", "Nissan Leaf", "Ford Mustang Mach-E", "Hyundai Ioniq", "Kia EV6", "Rivian R1T/R1S", "BMW iX"],
    vehiclesEs: ["Tesla Model S", "Tesla Model 3", "Tesla Model X", "Tesla Model Y", "Tesla Cybertruck", "Chevrolet Bolt", "Nissan Leaf", "Ford Mustang Mach-E", "Hyundai Ioniq", "Kia EV6", "Rivian R1T/R1S", "BMW iX"],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-diagnostics_7906cd95.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-frunk-open_3696ade7.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-gears_c5769e70.png?format=webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-battery-fuse_8c80d49f.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-hv-battery_19dac181.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/tesla-service-mode_ca070e93.webp",
    ],
    galleryAlt: [
      "Tesla diagnostics at Vertical Automotive Fort Lauderdale",
      "Tesla frunk open during service inspection",
      "Tesla drive unit and gear assembly",
      "Tesla battery fuse and high-voltage system",
      "Tesla high-voltage battery pack service",
      "Tesla service mode diagnostic screen",
    ],
    whatIncluded: [
      { title: "High-Voltage System Inspection", titleEs: "Inspección del Sistema de Alto Voltaje", description: "Safety inspection of HV cables, connectors, inverter, and onboard charger — required for warranty compliance", descriptionEs: "Inspección de seguridad de cables HV, conectores, inversor y cargador a bordo — requerido para cumplimiento de garantía" },
      { title: "Charging System Repair", titleEs: "Reparación del Sistema de Carga", description: "Diagnosis and repair of onboard charger, charge port, and J1772/CCS connector issues", descriptionEs: "Diagnóstico y reparación del cargador a bordo, puerto de carga y problemas de conectores J1772/CCS" },
      { title: "Suspension & Alignment", titleEs: "Suspensión y Alineación", description: "Air suspension diagnostics, coilover service, and precision alignment for heavy EV platforms", descriptionEs: "Diagnóstico de suspensión neumática, servicio de coilovers y alineación de precisión para plataformas EV pesadas" },
      { title: "Tire Service & Rotation", titleEs: "Servicio y Rotación de Neumáticos", description: "EV-specific tire service — heavier vehicles wear tires faster, we recommend EV-rated tires for maximum range", descriptionEs: "Servicio de neumáticos específico para EV — los vehículos más pesados desgastan los neumáticos más rápido, recomendamos neumáticos clasificados para EV" },
      { title: "Software & Module Reset", titleEs: "Reinicio de Software y Módulos", description: "ECU reset, module recalibration, and firmware troubleshooting for Tesla and other EV platforms", descriptionEs: "Reinicio de ECU, recalibración de módulos y solución de problemas de firmware para Tesla y otras plataformas EV" },
    ],
  },
  {
    slug: "european-vehicle-repair",
    name: "European Vehicle Service",
    nameEs: "Servicio de Vehículos Europeos",
    vehicles: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat", "MINI Cooper", "Land Rover"],
    vehiclesEs: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat", "MINI Cooper", "Land Rover"],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-911_1b816237.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-range-rover_05d0f6a6.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-bmw-m2_ad657da1.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-cayenne_3689fe50.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-maserati_1e019840.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/euro-porsche-panamera_1282f008.webp",
    ],
    galleryAlt: [
      "Porsche 911 service at Vertical Automotive Fort Lauderdale",
      "Range Rover repair and maintenance",
      "BMW M2 performance service",
      "Porsche Cayenne SUV repair",
      "Maserati luxury vehicle service",
      "Porsche Panamera at Vertical Automotive",
    ],
    whatIncluded: [
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Air suspension repair, adaptive damper service, control arm bushings, tie rods, and ball joints", descriptionEs: "Reparación de suspensión neumática, servicio de amortiguadores adaptativos, bujes de brazos de control, rótulas y bieletas" },
      { title: "Electrical System Diagnostics", titleEs: "Diagnóstico del Sistema Eléctrico", description: "CAN bus diagnostics, module coding, battery registration, and electrical fault tracing for complex European systems", descriptionEs: "Diagnóstico de bus CAN, codificación de módulos, registro de batería y rastreo de fallas eléctricas para sistemas europeos complejos" },
      { title: "Turbocharger Service", titleEs: "Servicio de Turbocompresor", description: "Turbo diagnostics, wastegate repair, boost leak testing, and turbo replacement for BMW, Audi, VW, and Mercedes", descriptionEs: "Diagnóstico de turbo, reparación de wastegate, prueba de fugas de boost y reemplazo de turbo para BMW, Audi, VW y Mercedes" },
    ],
  },
  {
    slug: "asian-vehicle-repair",
    name: "Asian Vehicle Service",
    nameEs: "Servicio de Vehículos Asiáticos",
    vehicles: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi", "Infiniti", "Genesis"],
    vehiclesEs: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi", "Infiniti", "Genesis"],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-acura-nsx-shop_bcf4008e.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-acura-nsx-lift_4f2edb68.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-hood-open_9ea6e232.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-sc-convertible_4e06b62a.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-toyota-tacoma-alignment_8b858d66.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/asian-lexus-is-dyno_33f4b770.webp",
    ],
    galleryAlt: [
      "Acura NSX in Vertical Automotive shop",
      "Acura NSX on lift for service",
      "Lexus hood open for engine inspection",
      "Lexus SC convertible at Vertical Automotive",
      "Toyota Tacoma wheel alignment service",
      "Lexus IS on dyno at Vertical Automotive",
    ],
    whatIncluded: [
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Shocks, struts, tie rods, ball joints, control arms, and sway bar links — restore ride comfort and handling", descriptionEs: "Amortiguadores, puntales, rótulas, bieletas, brazos de control y enlaces de barra estabilizadora — restaure comodidad y manejo" },
      { title: "Electrical System Service", titleEs: "Servicio del Sistema Eléctrico", description: "Battery testing, alternator diagnostics, starter repair, and wiring diagnosis for all Asian vehicles", descriptionEs: "Prueba de batería, diagnóstico de alternador, reparación de arranque y diagnóstico de cableado para todos los vehículos asiáticos" },
      { title: "Fuel System Service", titleEs: "Servicio del Sistema de Combustible", description: "Fuel injector cleaning, fuel pump replacement, and fuel filter service — restores performance and fuel economy", descriptionEs: "Limpieza de inyectores, reemplazo de bomba de combustible y servicio de filtro — restaura rendimiento y economía de combustible" },
    ],
  },
  {
    slug: "domestic-vehicle-repair",
    name: "Domestic Vehicle Service",
    nameEs: "Servicio de Vehículos Domésticos",
    vehicles: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    vehiclesEs: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-dodge-charger-black_f3986d96.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-plymouth-fury_6eea5fa5.jpeg?format=webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-ford-raptor_f0115281.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-dodge-challenger-green_02019df5.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-plymouth-barracuda-purple_302f3af9.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/domestic-challengers-lifts_b0804351.webp",
    ],
    galleryAlt: [
      "Dodge Charger at Vertical Automotive Fort Lauderdale",
      "Classic Plymouth Fury restoration service",
      "Ford Raptor truck repair and maintenance",
      "Dodge Challenger performance service",
      "Classic Plymouth Barracuda at Vertical Automotive",
      "Dodge Challengers on lifts in the shop",
    ],
    whatIncluded: [
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Shocks, struts, tie rods, ball joints, alignment — especially important for heavy trucks and SUVs", descriptionEs: "Amortiguadores, puntales, rótulas, bieletas, alineación — especialmente importante para camionetas y SUVs pesados" },
      { title: "Electrical System Service", titleEs: "Servicio del Sistema Eléctrico", description: "Battery, alternator, starter, wiring diagnosis — full electrical diagnostics for Ford, Chevy, Dodge, and more", descriptionEs: "Batería, alternador, arranque, diagnóstico de cableado — diagnóstico eléctrico completo para Ford, Chevy, Dodge y más" },
      { title: "Fuel System Service", titleEs: "Servicio del Sistema de Combustible", description: "Injector cleaning, fuel pump replacement, fuel filter service — restores power and fuel economy", descriptionEs: "Limpieza de inyectores, reemplazo de bomba de combustible, servicio de filtro — restaura potencia y economía de combustible" },
    ],
  },
  {
    slug: "brake-repair",
    name: "Brake & Rotor Service",
    nameEs: "Servicio de Frenos y Rotores",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/brake-rotor-real_2efc5177.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/brake-rotor-real-2_fa4a30ab.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/brake-rotor-real-3_a7f34183.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/brake-rotor-real-4_5cee919e.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/brake-rotor-real-5_38d98424.webp",
    ],
    galleryAlt: [
      "Drilled and slotted rotor with red caliper — brake job at Vertical Automotive",
      "New rotor and caliper installed on vehicle at Vertical Automotive Fort Lauderdale",
      "Slotted performance rotor with Siprol caliper — brake upgrade service",
      "Before and after brake rotor replacement at Vertical Automotive",
      "Slotted rotor with red caliper — Tesla brake service at Vertical Automotive",
    ],
    whatIncluded: [
      { title: "Brake Caliper Repair & Replacement", titleEs: "Reparación y Reemplazo de Calibradores", description: "Caliper rebuild, slide pin service, and replacement — fixes uneven pad wear and pulling", descriptionEs: "Reconstrucción de calibrador, servicio de pines deslizantes y reemplazo — corrige desgaste desigual y tirón" },
      { title: "Brake Line Inspection & Repair", titleEs: "Inspección y Reparación de Líneas de Freno", description: "Visual and pressure inspection of brake lines, hoses, and fittings — critical for safety", descriptionEs: "Inspección visual y de presión de líneas, mangueras y conexiones de freno — crítico para la seguridad" },
      { title: "ABS System Diagnostics", titleEs: "Diagnóstico del Sistema ABS", description: "Anti-lock braking system diagnosis, sensor replacement, and module repair", descriptionEs: "Diagnóstico del sistema de frenos antibloqueo, reemplazo de sensores y reparación de módulos" },
      { title: "Parking Brake Service", titleEs: "Servicio de Freno de Estacionamiento", description: "Adjustment, cable replacement, and electronic parking brake service for all vehicles", descriptionEs: "Ajuste, reemplazo de cable y servicio de freno de estacionamiento electrónico para todos los vehículos" },
      { title: "Brake Noise Diagnosis", titleEs: "Diagnóstico de Ruido de Frenos", description: "Squealing, grinding, or pulsating brakes — we identify the root cause and fix it right the first time", descriptionEs: "Frenos chirriantes, rechinantes o pulsantes — identificamos la causa raíz y lo arreglamos bien la primera vez" },
      { title: "Complete Brake System Inspection", titleEs: "Inspección Completa del Sistema de Frenos", description: "Full visual and measurement inspection of pads, rotors, calipers, lines, and fluid — written report included", descriptionEs: "Inspección visual y de medición completa de pastillas, rotores, calibradores, líneas y fluido — informe escrito incluido" },
    ],
  },
  {
    slug: "transmission-service",
    name: "Transmission Service",
    nameEs: "Servicio de Transmisión",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/transmission-service-1_296bc26d.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/transmission-service-2_0e0a92cc.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/transmission-service-3_c155e3c3.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/transmission-service-4_ad200624.jpg",
    ],
    galleryAlt: [
      "Transmission repair and rebuild at Vertical Automotive Fort Lauderdale",
      "Automatic transmission fluid service and filter replacement",
      "CVT and manual transmission diagnostics",
      "Transmission cooler and differential service",
    ],
    whatIncluded: [
      { title: "Automatic Transmission Repair", titleEs: "Reparación de Transmisión Automática", description: "Solenoid replacement, valve body repair, torque converter service, and full rebuilds", descriptionEs: "Reemplazo de solenoide, reparación del cuerpo de válvulas, servicio de convertidor de torque y reconstrucciones completas" },
      { title: "Manual Transmission Service", titleEs: "Servicio de Transmisión Manual", description: "Clutch replacement, synchronizer repair, and gear oil service for manual transmissions", descriptionEs: "Reemplazo de embrague, reparación de sincronizadores y servicio de aceite de engranajes para transmisiones manuales" },
      { title: "CVT Transmission Service", titleEs: "Servicio de Transmisión CVT", description: "Specialized CVT fluid exchange and diagnostics for Nissan, Subaru, Honda, and Toyota CVT units", descriptionEs: "Intercambio especializado de fluido CVT y diagnóstico para unidades CVT de Nissan, Subaru, Honda y Toyota" },
      { title: "Transmission Filter Replacement", titleEs: "Reemplazo de Filtro de Transmisión", description: "Internal and external filter replacement — prevents contamination and premature wear", descriptionEs: "Reemplazo de filtro interno y externo — previene contaminación y desgaste prematuro" },
      { title: "Transmission Cooler Service", titleEs: "Servicio de Enfriador de Transmisión", description: "Cooler line repair, flush, and replacement — critical in South Florida heat to prevent overheating", descriptionEs: "Reparación, purga y reemplazo de líneas de enfriador — crítico en el calor del sur de Florida para prevenir sobrecalentamiento" },
      { title: "Differential Service", titleEs: "Servicio de Diferencial", description: "Front and rear differential fluid exchange for AWD and 4WD vehicles", descriptionEs: "Intercambio de fluido de diferencial delantero y trasero para vehículos AWD y 4WD" },
      { title: "Transfer Case Service", titleEs: "Servicio de Caja de Transferencia", description: "Transfer case fluid exchange for 4WD and AWD trucks and SUVs", descriptionEs: "Intercambio de fluido de caja de transferencia para camionetas y SUVs 4WD y AWD" },
      { title: "Driveshaft & U-Joint Service", titleEs: "Servicio de Eje de Transmisión y Juntas U", description: "Driveshaft balance, U-joint replacement, and CV axle service", descriptionEs: "Balance del eje de transmisión, reemplazo de juntas U y servicio de ejes CV" },
    ],
  },
  {
    slug: "ac-repair",
    name: "A/C Repair & Maintenance",
    nameEs: "Reparación y Mantenimiento de Aire Acondicionado",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/ac-repair-1_009d8f66.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/ac-repair-2_52518421.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/ac-repair-3_af4f9e64.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/ac-repair-4_a15e44f5.jpg",
    ],
    galleryAlt: [
      "A/C system diagnosis at Vertical Automotive Fort Lauderdale",
      "Refrigerant recharge service for vehicle air conditioning",
      "A/C compressor inspection and repair",
      "Climate control system service South Florida",
    ],
    whatIncluded: [
      { title: "Refrigerant Recharge", titleEs: "Recarga de Refrigerante", description: "R-134a and R-1234yf recharge to manufacturer specifications — restores cold air output", descriptionEs: "Recarga de R-134a y R-1234yf a especificaciones del fabricante — restaura la salida de aire frío" },
      { title: "Compressor Repair & Replacement", titleEs: "Reparación y Reemplazo de Compresor", description: "A/C compressor diagnosis, clutch repair, and complete replacement with new receiver/drier", descriptionEs: "Diagnóstico del compresor de A/C, reparación del embrague y reemplazo completo con nuevo receptor/secador" },
      { title: "Condenser Service", titleEs: "Servicio de Condensador", description: "Condenser cleaning, leak repair, and replacement — road debris and salt air cause premature failure in South Florida", descriptionEs: "Limpieza, reparación de fugas y reemplazo del condensador — escombros del camino y aire salado causan fallas prematuras en el sur de Florida" },
      { title: "Evaporator Service", titleEs: "Servicio del Evaporador", description: "Evaporator core cleaning, leak repair, and replacement — eliminates musty odors and restores cooling", descriptionEs: "Limpieza, reparación de fugas y reemplazo del núcleo del evaporador — elimina olores a humedad y restaura la refrigeración" },
      { title: "Expansion Valve & Orifice Tube", titleEs: "Válvula de Expansión y Tubo de Orificio", description: "Replacement of metering devices that control refrigerant flow — fixes inconsistent cooling", descriptionEs: "Reemplazo de dispositivos de medición que controlan el flujo de refrigerante — corrige enfriamiento inconsistente" },
      { title: "A/C Hose & Line Repair", titleEs: "Reparación de Mangueras y Líneas de A/C", description: "High and low pressure hose replacement, O-ring service, and fitting repair", descriptionEs: "Reemplazo de mangueras de alta y baja presión, servicio de juntas tóricas y reparación de conexiones" },
      { title: "Blower Motor & Resistor Service", titleEs: "Servicio de Motor y Resistor del Ventilador", description: "Blower motor replacement and resistor repair — fixes weak airflow or fan speed issues", descriptionEs: "Reemplazo del motor del ventilador y reparación del resistor — corrige flujo de aire débil o problemas de velocidad del ventilador" },
      { title: "Climate Control Diagnostics", titleEs: "Diagnóstico del Control Climático", description: "Dual-zone, automatic, and manual climate control system diagnosis and repair", descriptionEs: "Diagnóstico y reparación del sistema de control climático de zona dual, automático y manual" },
      { title: "A/C System Flush", titleEs: "Purga del Sistema de A/C", description: "Complete system flush to remove contamination after compressor failure — prevents repeat failures", descriptionEs: "Purga completa del sistema para eliminar contaminación después de falla del compresor — previene fallas repetidas" },
    ],
  },
  {
    slug: "engine-oil-service",
    name: "Engine, Oil & Filters",
    nameEs: "Motor, Aceite y Filtros",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-1_2794a779.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-2_764ac92e.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-3_da419f4d.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-4_98f9144f.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-5_b1c03e3f.jpg",
    ],
    galleryAlt: [
      "Subaru engine block rebuild at Vertical Automotive Fort Lauderdale",
      "Engine disassembly and inspection at Vertical Automotive",
      "Subaru engine removal and replacement — Vertical Automotive shop",
      "RAM truck engine service on lift at Vertical Automotive",
      "Mechanic performing engine removal with engine hoist at Vertical Automotive",
    ],
    videos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-video-1_36eba95a.mov",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/engine-oil-video-2_d8f08d83.mov",
    ],
    videosAlt: [
      "Engine service in progress at Vertical Automotive",
      "Engine work at Vertical Automotive Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Conventional Oil Change", titleEs: "Cambio de Aceite Convencional", description: "Standard oil change for older vehicles or those with lower mileage requirements", descriptionEs: "Cambio de aceite estándar para vehículos más antiguos o con requisitos de menor kilometraje" },
      { title: "High-Mileage Oil Service", titleEs: "Servicio de Aceite de Alto Kilometraje", description: "Specialized oil with seal conditioners for vehicles over 75,000 miles — reduces oil consumption and leaks", descriptionEs: "Aceite especializado con acondicionadores de sellos para vehículos con más de 75,000 millas — reduce consumo de aceite y fugas" },
      { title: "Engine Air Filter Replacement", titleEs: "Reemplazo de Filtro de Aire del Motor", description: "Clean air filter improves fuel economy and engine performance — recommended every 15K–30K miles", descriptionEs: "Un filtro de aire limpio mejora la economía de combustible y el rendimiento del motor — recomendado cada 15K–30K millas" },
      { title: "PCV Valve Replacement", titleEs: "Reemplazo de Válvula PCV", description: "Positive crankcase ventilation valve replacement — prevents oil leaks and excessive oil consumption", descriptionEs: "Reemplazo de válvula de ventilación positiva del cárter — previene fugas de aceite y consumo excesivo" },
      { title: "Engine Flush Service", titleEs: "Servicio de Purga del Motor", description: "Chemical engine flush to remove sludge and deposits — recommended for neglected maintenance intervals", descriptionEs: "Purga química del motor para eliminar lodos y depósitos — recomendado para intervalos de mantenimiento descuidados" },
    ],
  },
  {
    slug: "complete-diagnostics",
    name: "Complete Diagnostics",
    nameEs: "Diagnóstico Completo",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-1_ceb74e24.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-2_35a138b1.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-3_6c436797.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-4_b00d4b11.webp",
    ],
    galleryAlt: [
      "Burned circuit board diagnosed at Vertical Automotive Fort Lauderdale",
      "Mechanic using Autel MaxiSys scanner on Infiniti V6 engine",
      "Tesla Model X service mode diagnostics at Vertical Automotive",
      "Autel MaxiSys ADAS diagnostic scan on Infiniti engine bay",
    ],
    videos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-video-1_e39e0dde.mov",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/diag-video-2_dfa34a6e.mov",
    ],
    videosAlt: [
      "Vehicle diagnostic service in progress at Vertical Automotive",
      "Advanced diagnostics at Vertical Automotive Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Check Engine Light Diagnosis", titleEs: "Diagnóstico de Luz de Motor", description: "Root cause analysis — not just reading codes, but identifying why the code set and what repair is needed", descriptionEs: "Análisis de causa raíz — no solo lectura de códigos, sino identificación de por qué se estableció el código y qué reparación se necesita" },
      { title: "Electrical System Testing", titleEs: "Prueba del Sistema Eléctrico", description: "Battery load test, alternator output, starter draw, and parasitic drain testing", descriptionEs: "Prueba de carga de batería, salida del alternador, consumo del arranque y prueba de drenaje parasitario" },
      { title: "Drivability Diagnostics", titleEs: "Diagnóstico de Conducción", description: "Rough idle, misfires, stalling, hesitation, and poor fuel economy — we road test and diagnose the root cause", descriptionEs: "Ralentí irregular, fallas de encendido, calado, vacilación y mala economía de combustible — probamos en carretera y diagnosticamos la causa raíz" },
      { title: "Emissions System Diagnostics", titleEs: "Diagnóstico del Sistema de Emisiones", description: "Catalytic converter, O2 sensor, EGR valve, and EVAP system diagnosis", descriptionEs: "Diagnóstico de convertidor catalítico, sensor O2, válvula EGR y sistema EVAP" },
      { title: "A/C System Diagnostics", titleEs: "Diagnóstico del Sistema de A/C", description: "Pressure testing, leak detection, and component testing for A/C systems that aren't cooling properly", descriptionEs: "Prueba de presión, detección de fugas y prueba de componentes para sistemas de A/C que no enfrían correctamente" },
      { title: "Transmission Diagnostics", titleEs: "Diagnóstico de Transmisión", description: "Shift quality analysis, fluid condition check, and electronic control module scan", descriptionEs: "Análisis de calidad de cambio, verificación de condición del fluido y escaneo del módulo de control electrónico" },
      { title: "Suspension & Steering Inspection", titleEs: "Inspección de Suspensión y Dirección", description: "Visual and hands-on inspection of shocks, struts, tie rods, ball joints, and bushings", descriptionEs: "Inspección visual y manual de amortiguadores, puntales, rótulas, bieletas y bujes" },
      { title: "Brake System Inspection", titleEs: "Inspección del Sistema de Frenos", description: "Pad thickness measurement, rotor condition, fluid quality, and line inspection with written report", descriptionEs: "Medición de espesor de pastillas, condición de rotores, calidad del fluido e inspección de líneas con informe escrito" },
      { title: "Pre-Purchase Vehicle Inspection", titleEs: "Inspección de Vehículo Pre-Compra", description: "Comprehensive 150+ point inspection before you buy a used car — saves you from costly surprises", descriptionEs: "Inspección integral de más de 150 puntos antes de comprar un auto usado — le ahorra sorpresas costosas" },
    ],
  },
  {
    slug: "routine-maintenance",
    name: "Routine & Preventive Maintenance",
    nameEs: "Mantenimiento Rutinario y Preventivo",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/routine-maintenance-1_f6972918.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/routine-maintenance-2_e00162a6.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/routine-maintenance-3_a9f8c5e3.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/routine-maintenance-4_6a3d179d.jpg",
    ],
    galleryAlt: [
      "Routine vehicle maintenance service at Vertical Automotive",
      "Multi-point inspection and fluid check",
      "Preventive maintenance service Fort Lauderdale",
      "Tire rotation and brake inspection",
    ],
    whatIncluded: [
      { title: "Tire Rotation & Balance", titleEs: "Rotación y Balanceo de Neumáticos", description: "Regular rotation extends tire life and ensures even wear — recommended every 5K–7.5K miles", descriptionEs: "La rotación regular extiende la vida del neumático y asegura desgaste uniforme — recomendado cada 5K–7.5K millas" },
      { title: "Brake Inspection", titleEs: "Inspección de Frenos", description: "Pad thickness measurement, rotor condition check, and fluid quality assessment — included with most services", descriptionEs: "Medición de espesor de pastillas, verificación de condición de rotores y evaluación de calidad del fluido — incluido con la mayoría de servicios" },
      { title: "Battery Test & Service", titleEs: "Prueba y Servicio de Batería", description: "Load test, terminal cleaning, and charging system check — prevents unexpected no-start situations", descriptionEs: "Prueba de carga, limpieza de terminales y verificación del sistema de carga — previene situaciones inesperadas de no arranque" },
      { title: "Fluid Top-Off & Inspection", titleEs: "Rellenado e Inspección de Fluidos", description: "Check and top-off all fluids: coolant, brake, power steering, transmission, and washer fluid", descriptionEs: "Verificación y rellenado de todos los fluidos: refrigerante, frenos, dirección hidráulica, transmisión y limpiaparabrisas" },
      { title: "Wiper Blade Replacement", titleEs: "Reemplazo de Escobillas del Limpiaparabrisas", description: "Premium wiper blade replacement — critical for visibility during Florida's heavy rain season", descriptionEs: "Reemplazo de escobillas premium — crítico para visibilidad durante la temporada de lluvias fuertes de Florida" },
    ],
  },
  {
    slug: "steering-suspension",
    name: "Steering & Suspension",
    nameEs: "Dirección y Suspensión",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-1_056d4a19.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-2_778bab8d.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-3_77539562.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-4_abb8b313.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-5_6977c8df.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-6_5c2b4a70.jpg",
    ],
    galleryAlt: [
      "Worn brake caliper and coil spring suspension inspection at Vertical Automotive",
      "Undercarriage steering linkage and sway bar inspection at Vertical Automotive",
      "Strut mount bearing and shock absorber service at Vertical Automotive",
      "New brake rotor and front suspension control arm on lift at Vertical Automotive",
      "Cadillac Lyriq EV on HOTON chassis simulation alignment machine at Vertical Automotive",
      "Jeep Wrangler suspension and steering service at Vertical Automotive Fort Lauderdale",
    ],
    videos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-video-1_67ce9899.mp4",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/susp-video-2_1dd5ea12.mov",
    ],
    videosAlt: [
      "Steering and suspension service in progress at Vertical Automotive",
      "Suspension repair at Vertical Automotive Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Shock & Strut Replacement", titleEs: "Reemplazo de Amortiguadores y Puntales", description: "Front and rear shock/strut replacement — restores ride comfort, handling, and tire wear patterns", descriptionEs: "Reemplazo de amortiguadores/puntales delanteros y traseros — restaura comodidad, manejo y patrones de desgaste de neumáticos" },
      { title: "Control Arm & Bushing Service", titleEs: "Servicio de Brazos de Control y Bujes", description: "Upper and lower control arm replacement, bushing press, and alignment — fixes clunking and wandering", descriptionEs: "Reemplazo de brazos de control superiores e inferiores, prensado de bujes y alineación — corrige golpeteo y desvío" },
      { title: "Tie Rod Replacement", titleEs: "Reemplazo de Rótulas de Dirección", description: "Inner and outer tie rod replacement with alignment — fixes loose steering and uneven tire wear", descriptionEs: "Reemplazo de rótulas de dirección internas y externas con alineación — corrige dirección floja y desgaste desigual" },
      { title: "Ball Joint Replacement", titleEs: "Reemplazo de Rótulas", description: "Upper and lower ball joint replacement — critical safety component that affects steering and suspension", descriptionEs: "Reemplazo de rótulas superiores e inferiores — componente de seguridad crítico que afecta dirección y suspensión" },
      { title: "Sway Bar Link & Bushing Service", titleEs: "Servicio de Bieletas y Bujes de Barra Estabilizadora", description: "Sway bar link and bushing replacement — eliminates clunking over bumps and improves cornering stability", descriptionEs: "Reemplazo de bieletas y bujes de barra estabilizadora — elimina golpeteo en baches y mejora estabilidad en curvas" },
      { title: "Power Steering Service", titleEs: "Servicio de Dirección Hidráulica", description: "Power steering fluid flush, pump repair, and rack service — fixes whining noise and heavy steering", descriptionEs: "Purga de fluido de dirección hidráulica, reparación de bomba y servicio de cremallera — corrige ruido de zumbido y dirección pesada" },
      { title: "Air Suspension Repair", titleEs: "Reparación de Suspensión Neumática", description: "Air spring, compressor, and height sensor repair for vehicles with air suspension systems", descriptionEs: "Reparación de resorte neumático, compresor y sensor de altura para vehículos con sistemas de suspensión neumática" },
      { title: "Wheel Alignment", titleEs: "Alineación de Ruedas", description: "Precision 4-wheel alignment — corrects pulling, uneven tire wear, and steering wheel off-center", descriptionEs: "Alineación de precisión de 4 ruedas — corrige tirón, desgaste desigual de neumáticos y volante descentrado" },
      { title: "Suspension Inspection & Diagnosis", titleEs: "Inspección y Diagnóstico de Suspensión", description: "Complete visual and hands-on inspection of all suspension and steering components with written report", descriptionEs: "Inspección visual y manual completa de todos los componentes de suspensión y dirección con informe escrito" },
    ],
  },
  {
    slug: "fuel-system-service",
    name: "Fuel System Service",
    nameEs: "Servicio del Sistema de Combustible",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fuel-system-service-1_3f6bcf4c.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fuel-system-service-2_565d22f2.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fuel-system-service-3_45b1cbb7.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fuel-system-service-4_9ac490ef.jpg",
    ],
    galleryAlt: [
      "Fuel system service and injector cleaning at Vertical Automotive",
      "Fuel pump diagnosis and replacement",
      "Fuel pressure testing and fuel filter service",
      "EVAP system diagnostics Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Fuel Injector Cleaning", titleEs: "Limpieza de Inyectores de Combustible", description: "Professional ultrasonic cleaning and flow testing — restores fuel economy and smooth idle", descriptionEs: "Limpieza ultrasónica profesional y prueba de flujo — restaura economía de combustible y ralentí suave" },
      { title: "Fuel Pump Replacement", titleEs: "Reemplazo de Bomba de Combustible", description: "In-tank and external fuel pump diagnosis and replacement — fixes no-start and loss of power issues", descriptionEs: "Diagnóstico y reemplazo de bomba de combustible interna y externa — corrige problemas de no arranque y pérdida de potencia" },
      { title: "Fuel Filter Replacement", titleEs: "Reemplazo de Filtro de Combustible", description: "Inline and in-tank fuel filter replacement — prevents fuel starvation and injector damage", descriptionEs: "Reemplazo de filtro de combustible en línea y en tanque — previene falta de combustible y daño a inyectores" },
      { title: "Fuel Pressure Testing", titleEs: "Prueba de Presión de Combustible", description: "Fuel rail pressure test and regulator check — identifies weak pump, clogged filter, or faulty regulator", descriptionEs: "Prueba de presión del riel de combustible y verificación del regulador — identifica bomba débil, filtro obstruido o regulador defectuoso" },
      { title: "Fuel Line Inspection & Repair", titleEs: "Inspección y Reparación de Líneas de Combustible", description: "Visual inspection and repair of fuel lines, fittings, and connections — prevents leaks and fire hazards", descriptionEs: "Inspección visual y reparación de líneas, conexiones y accesorios de combustible — previene fugas y riesgos de incendio" },
      { title: "Throttle Body Service", titleEs: "Servicio del Cuerpo de Aceleración", description: "Throttle body cleaning and idle air control service — fixes rough idle and hesitation", descriptionEs: "Limpieza del cuerpo de aceleración y servicio de control de aire de ralentí — corrige ralentí irregular y vacilación" },
      { title: "EVAP System Diagnostics", titleEs: "Diagnóstico del Sistema EVAP", description: "Evaporative emission system diagnosis — fixes check engine light codes related to fuel vapor leaks", descriptionEs: "Diagnóstico del sistema de emisiones evaporativas — corrige códigos de luz de motor relacionados con fugas de vapor de combustible" },
      { title: "Fuel Tank Service", titleEs: "Servicio del Tanque de Combustible", description: "Tank cleaning, sender unit repair, and tank replacement for damaged or corroded fuel tanks", descriptionEs: "Limpieza del tanque, reparación de la unidad emisora y reemplazo del tanque para tanques dañados o corroídos" },
      { title: "Direct Injection Carbon Cleaning", titleEs: "Limpieza de Carbón de Inyección Directa", description: "Walnut blast or chemical cleaning of intake valves — critical for GDI engines that build carbon deposits", descriptionEs: "Limpieza con cáscara de nuez o química de válvulas de admisión — crítico para motores GDI que acumulan depósitos de carbón" },
      { title: "Fuel System Diagnostics", titleEs: "Diagnóstico del Sistema de Combustible", description: "Complete fuel system analysis including injector balance test, pressure test, and volume test", descriptionEs: "Análisis completo del sistema de combustible incluyendo prueba de balance de inyectores, prueba de presión y prueba de volumen" },
    ],
  },
  {
    slug: "hybrid-ev-service",
    name: "Hybrid & EV Service",
    nameEs: "Servicio de Híbridos y Eléctricos",
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hybrid-ev-service-1_223c5903.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hybrid-ev-service-2_3956c16f.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hybrid-ev-service-3_1129ceb8.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/hybrid-ev-service-4_c8b0b582.jpg",
    ],
    galleryAlt: [
      "Hybrid and electric vehicle service at Vertical Automotive Fort Lauderdale",
      "Toyota Prius and hybrid battery inspection",
      "EV charging system and high-voltage diagnostics",
      "Hybrid regenerative braking and inverter service",
    ],
    vehicles: ["Toyota Prius", "Toyota RAV4 Hybrid", "Honda Insight", "Honda CR-V Hybrid", "Chevy Volt", "Lexus Hybrid", "Hyundai Ioniq Hybrid", "Ford Escape Hybrid", "Kia Niro", "Toyota Camry Hybrid"],
    vehiclesEs: ["Toyota Prius", "Toyota RAV4 Hybrid", "Honda Insight", "Honda CR-V Hybrid", "Chevy Volt", "Lexus Hybrid", "Hyundai Ioniq Hybrid", "Ford Escape Hybrid", "Kia Niro", "Toyota Camry Hybrid"],
    whatIncluded: [
      { title: "Hybrid Battery Diagnostics", titleEs: "Diagnóstico de Batería Híbrida", description: "Cell-level testing and state-of-health analysis for NiMH and lithium-ion hybrid battery packs", descriptionEs: "Prueba a nivel de celda y análisis del estado de salud para paquetes de batería híbrida NiMH y litio-ion" },
      { title: "High-Voltage System Inspection", titleEs: "Inspección del Sistema de Alto Voltaje", description: "Safety inspection of HV cables, connectors, and isolation — required before any hybrid service work", descriptionEs: "Inspección de seguridad de cables HV, conectores y aislamiento — requerido antes de cualquier trabajo de servicio híbrido" },
      { title: "Regenerative Braking Service", titleEs: "Servicio de Frenado Regenerativo", description: "Brake system service specific to hybrid vehicles — pads last longer but still need periodic inspection", descriptionEs: "Servicio del sistema de frenos específico para vehículos híbridos — las pastillas duran más pero aún necesitan inspección periódica" },
      { title: "Hybrid Transmission Service", titleEs: "Servicio de Transmisión Híbrida", description: "eCVT and hybrid-specific transmission fluid exchange and diagnostics", descriptionEs: "Intercambio de fluido y diagnóstico de transmisión eCVT y específica para híbridos" },
      { title: "Electric Motor Diagnostics", titleEs: "Diagnóstico del Motor Eléctrico", description: "Motor/generator testing, inverter diagnostics, and power electronics inspection", descriptionEs: "Prueba de motor/generador, diagnóstico del inversor e inspección de electrónica de potencia" },
      { title: "Hybrid Cooling System Service", titleEs: "Servicio del Sistema de Enfriamiento Híbrido", description: "Separate cooling loop for hybrid battery and inverter — critical for battery longevity in Florida heat", descriptionEs: "Circuito de enfriamiento separado para batería híbrida e inversor — crítico para longevidad de la batería en el calor de Florida" },
      { title: "Hybrid System Warning Light Diagnosis", titleEs: "Diagnóstico de Luz de Advertencia del Sistema Híbrido", description: "Triangle of death, hybrid battery warning, and check hybrid system light diagnosis and repair", descriptionEs: "Triángulo de la muerte, advertencia de batería híbrida y diagnóstico y reparación de luz de verificación del sistema híbrido" },
    ],
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment, Tire Rotation & Balancing",
    nameEs: "Alineación de Ruedas, Rotación y Balanceo",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/alignment-real-1_11cbcc74.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/align-1_e2569bdc.webp",
    ],
    galleryAlt: [
      "Wheel alignment service in progress at Vertical Automotive — Lexus on alignment rack with precision measurement equipment",
      "Maserati Ghibli on precision wheel alignment rack at Vertical Automotive Fort Lauderdale",
    ],
    videos: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/align-video-1_df329804.mov",
    ],
    videosAlt: [
      "Wheel alignment service at Vertical Automotive Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Precision 4-Wheel Alignment", titleEs: "Alineación de Precisión de 4 Ruedas", description: "Computer-guided alignment adjusting camber, caster, and toe to manufacturer specifications", descriptionEs: "Alineación guiada por computadora ajustando camber, caster y convergencia a especificaciones del fabricante" },
      { title: "Tire Rotation", titleEs: "Rotación de Neumáticos", description: "Front-to-rear and cross-pattern rotation — extends tire life by 20-30% with regular service", descriptionEs: "Rotación de frente a atrás y patrón cruzado — extiende la vida del neumático un 20-30% con servicio regular" },
      { title: "Tire Balancing", titleEs: "Balanceo de Neumáticos", description: "Dynamic wheel balancing — eliminates vibration at highway speeds and prevents uneven tire wear", descriptionEs: "Balanceo dinámico de ruedas — elimina vibración a velocidades de autopista y previene desgaste desigual" },
      { title: "Tire Pressure Monitoring (TPMS)", titleEs: "Monitoreo de Presión de Neumáticos (TPMS)", description: "TPMS sensor replacement, programming, and system diagnostics — fixes dashboard warning light", descriptionEs: "Reemplazo de sensor TPMS, programación y diagnóstico del sistema — corrige luz de advertencia del tablero" },
      { title: "Suspension Inspection", titleEs: "Inspección de Suspensión", description: "Pre-alignment inspection of shocks, struts, tie rods, and ball joints — worn parts cause alignment to fail", descriptionEs: "Inspección pre-alineación de amortiguadores, puntales, rótulas y bieletas — piezas desgastadas causan falla de alineación" },
      { title: "Tire Wear Analysis", titleEs: "Análisis de Desgaste de Neumáticos", description: "Read tire wear patterns to identify alignment, inflation, or suspension problems before they get worse", descriptionEs: "Lectura de patrones de desgaste de neumáticos para identificar problemas de alineación, inflado o suspensión antes de que empeoren" },
      { title: "Flat Tire Repair", titleEs: "Reparación de Neumático Ponchado", description: "Professional plug and patch repair for repairable punctures — follows industry safety standards", descriptionEs: "Reparación profesional con tapón y parche para pinchazos reparables — sigue estándares de seguridad de la industria" },
      { title: "Tire Replacement & Installation", titleEs: "Reemplazo e Instalación de Neumáticos", description: "We source and install tires from all major brands — mounted, balanced, and TPMS programmed", descriptionEs: "Obtenemos e instalamos neumáticos de todas las marcas principales — montados, balanceados y TPMS programado" },
      { title: "Alignment Check", titleEs: "Verificación de Alineación", description: "Quick alignment measurement to determine if adjustment is needed — recommended after hitting a pothole or curb", descriptionEs: "Medición rápida de alineación para determinar si se necesita ajuste — recomendado después de golpear un bache o bordillo" },
    ],
  },
  {
    slug: "battery-charging-systems",
    name: "Battery & Charging Systems",
    nameEs: "Batería y Sistemas de Carga",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/battery-charging-systems-1_2033b1d6.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/battery-charging-systems-2_f8985363.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/battery-charging-systems-3_50cd2e51.jpg",
    ],
    galleryAlt: [
      "Car battery replacement and charging system test at Vertical Automotive",
      "Alternator and starter repair Fort Lauderdale",
      "Battery load test and electrical system diagnostics",
    ],
    whatIncluded: [
      { title: "Battery Load Test", titleEs: "Prueba de Carga de Batería", description: "Electronic load test to determine battery health and remaining life — prevents unexpected no-start situations", descriptionEs: "Prueba de carga electrónica para determinar salud de la batería y vida restante — previene situaciones inesperadas de no arranque" },
      { title: "Alternator Diagnostics & Replacement", titleEs: "Diagnóstico y Reemplazo de Alternador", description: "Output test, diode check, and replacement — fixes dim lights, dead battery, and charging warning light", descriptionEs: "Prueba de salida, verificación de diodos y reemplazo — corrige luces tenues, batería muerta y luz de advertencia de carga" },
      { title: "Starter Motor Service", titleEs: "Servicio del Motor de Arranque", description: "Starter diagnostics, solenoid repair, and replacement — fixes slow cranking and no-start conditions", descriptionEs: "Diagnóstico del arranque, reparación del solenoide y reemplazo — corrige arranque lento y condiciones de no arranque" },
      { title: "Charging System Diagnostics", titleEs: "Diagnóstico del Sistema de Carga", description: "Complete charging system analysis including battery, alternator, voltage regulator, and wiring", descriptionEs: "Análisis completo del sistema de carga incluyendo batería, alternador, regulador de voltaje y cableado" },
      { title: "Parasitic Draw Testing", titleEs: "Prueba de Drenaje Parasitario", description: "Identifies electrical components draining your battery overnight — a common cause of dead batteries", descriptionEs: "Identifica componentes eléctricos que drenan su batería durante la noche — una causa común de baterías muertas" },
      { title: "Battery Terminal & Cable Service", titleEs: "Servicio de Terminales y Cables de Batería", description: "Terminal cleaning, cable end replacement, and corrosion prevention treatment", descriptionEs: "Limpieza de terminales, reemplazo de extremos de cable y tratamiento de prevención de corrosión" },
      { title: "Battery Registration & Coding", titleEs: "Registro y Codificación de Batería", description: "Required for BMW, Mercedes, and other European vehicles — ensures proper charging profile after replacement", descriptionEs: "Requerido para BMW, Mercedes y otros vehículos europeos — asegura perfil de carga adecuado después del reemplazo" },
      { title: "Voltage Regulator Service", titleEs: "Servicio del Regulador de Voltaje", description: "Diagnosis and replacement of internal and external voltage regulators", descriptionEs: "Diagnóstico y reemplazo de reguladores de voltaje internos y externos" },
      { title: "Electrical System Inspection", titleEs: "Inspección del Sistema Eléctrico", description: "Complete visual and electronic inspection of battery, charging, and starting systems with written report", descriptionEs: "Inspección visual y electrónica completa de batería, sistemas de carga y arranque con informe escrito" },
    ],
  },
  {
    slug: "fleet-services",
    name: "Fleet Services & Maintenance",
    nameEs: "Servicios de Flota y Mantenimiento",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fleet-services-1_61b50655.jpg",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/fleet-services-2_b17f1436.jpg",
    ],
    galleryAlt: [
      "Commercial fleet maintenance and repair at Vertical Automotive Fort Lauderdale",
      "Fleet vehicle service and preventive maintenance program",
    ],
    whatIncluded: [
      { title: "Scheduled Fleet Maintenance", titleEs: "Mantenimiento Programado de Flota", description: "Customized maintenance schedules based on your fleet's mileage, usage patterns, and manufacturer requirements", descriptionEs: "Horarios de mantenimiento personalizados basados en el kilometraje de su flota, patrones de uso y requisitos del fabricante" },
      { title: "Fleet Diagnostics", titleEs: "Diagnóstico de Flota", description: "Comprehensive diagnostics for fleet vehicles — check engine lights, drivability issues, and preventive scans", descriptionEs: "Diagnóstico integral para vehículos de flota — luces de motor, problemas de conducción y escaneos preventivos" },
      { title: "Commercial Vehicle Repair", titleEs: "Reparación de Vehículos Comerciales", description: "Service for vans, box trucks, and commercial vehicles — engine, transmission, brakes, and electrical", descriptionEs: "Servicio para furgonetas, camiones de caja y vehículos comerciales — motor, transmisión, frenos y eléctrico" },
      { title: "Fleet A/C Service", titleEs: "Servicio de A/C de Flota", description: "A/C recharge and repair for fleet vehicles — critical for South Florida delivery and service vehicles", descriptionEs: "Recarga y reparación de A/C para vehículos de flota — crítico para vehículos de entrega y servicio del sur de Florida" },
      { title: "Fleet Tire Service", titleEs: "Servicio de Neumáticos de Flota", description: "Tire rotation, balancing, alignment, and replacement for fleet vehicles with volume pricing", descriptionEs: "Rotación, balanceo, alineación y reemplazo de neumáticos para vehículos de flota con precios por volumen" },
      { title: "Preventive Maintenance Programs", titleEs: "Programas de Mantenimiento Preventivo", description: "Custom PM programs designed to minimize downtime and extend vehicle life — includes tracking and reporting", descriptionEs: "Programas de MP personalizados diseñados para minimizar tiempo de inactividad y extender la vida del vehículo — incluye seguimiento y reportes" },
      { title: "Fleet Reporting & Tracking", titleEs: "Reportes y Seguimiento de Flota", description: "Detailed service history, cost tracking, and maintenance scheduling for your entire fleet", descriptionEs: "Historial de servicio detallado, seguimiento de costos y programación de mantenimiento para toda su flota" },
      { title: "Priority Scheduling", titleEs: "Programación Prioritaria", description: "Fleet customers receive priority scheduling to minimize vehicle downtime — same-day service when possible", descriptionEs: "Los clientes de flota reciben programación prioritaria para minimizar tiempo de inactividad — servicio el mismo día cuando sea posible" },
    ],
  },
  {
    slug: "tire-service",
    name: "Tire Service & Replacement",
    nameEs: "Servicio y Reemplazo de Neumáticos",
    vehicles: [],
    vehiclesEs: [],
    gallery: [
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/align-1_e2569bdc.webp",
      "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB/alignment-real-1_11cbcc74.webp",
    ],
    galleryAlt: [
      "Maserati Ghibli on precision alignment rack during tire service at Vertical Automotive",
      "Wheel alignment and tire service in progress at Vertical Automotive Fort Lauderdale",
    ],
    whatIncluded: [
      { title: "Tire Replacement", titleEs: "Reemplazo de Neumáticos", description: "New tire sourcing and installation for all makes and models — we stock major brands and can order any tire", descriptionEs: "Adquisición e instalación de neumáticos nuevos para todas las marcas y modelos" },
      { title: "Tire Mounting & Installation", titleEs: "Montaje e Instalación de Neumáticos", description: "Professional mounting on your existing wheels — proper bead seating and TPMS programming included", descriptionEs: "Montaje profesional en sus rines existentes — asentamiento correcto del talón y programación TPMS incluida" },
      { title: "Tire Balancing", titleEs: "Balanceo de Neumáticos", description: "Dynamic wheel balancing eliminates vibration at highway speeds and prevents uneven wear patterns", descriptionEs: "El balanceo dinámico de ruedas elimina la vibración a velocidades de autopista y previene patrones de desgaste desigual" },
      { title: "Tire Rotation", titleEs: "Rotación de Neumáticos", description: "Front-to-rear and cross-pattern rotation extends tire life by 20–30% — recommended every 5,000–7,500 miles", descriptionEs: "La rotación de frente a atrás y patrón cruzado extiende la vida del neumático un 20–30%" },
      { title: "Flat Tire Repair", titleEs: "Reparación de Neumático Ponchado", description: "Professional plug-and-patch repair for repairable punctures following industry safety standards", descriptionEs: "Reparación profesional con tapón y parche para pinchazos reparables siguiendo los estándares de seguridad de la industria" },
      { title: "Tire Inspection", titleEs: "Inspección de Neumáticos", description: "Tread depth measurement, sidewall inspection, and wear pattern analysis — identifies alignment or suspension issues early", descriptionEs: "Medición de profundidad de banda de rodamiento, inspección de flancos y análisis de patrones de desgaste" },
      { title: "TPMS Service", titleEs: "Servicio TPMS", description: "Tire pressure monitoring system sensor replacement, programming, and diagnostics — fixes dashboard warning lights", descriptionEs: "Reemplazo, programación y diagnóstico del sensor del sistema de monitoreo de presión de neumáticos" },
      { title: "Wheel Alignment Check", titleEs: "Verificación de Alineación de Ruedas", description: "Alignment check recommended with every tire replacement — misalignment causes immediate uneven wear on new tires", descriptionEs: "Verificación de alineación recomendada con cada reemplazo de neumáticos" },
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
        whatIncluded: service.whatIncluded,
        vehiclesWeService: service.vehicles.length > 0 ? service.vehicles : [],
        vehiclesWeServiceEs: service.vehiclesEs.length > 0 ? service.vehiclesEs : [],

        faq: generatedContent?.faq || [],
        directions: location.directions,
        directionsEs: location.directionsEs,
        relatedServices: generatedContent?.relatedServices || [],
        gallery: (service as any).gallery,
        galleryAlt: (service as any).galleryAlt,
        videos: (service as any).videos,
        videosAlt: (service as any).videosAlt,
        realWorldStory: generatedContent?.realWorldStory,
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
