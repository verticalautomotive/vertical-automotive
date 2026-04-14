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
    whatIncluded: [
      { title: "Battery Diagnostics & Health Reports", titleEs: "Diagnóstico de Batería e Informes de Salud", description: "Full state-of-health analysis, cell balancing check, and degradation report for your EV battery pack", descriptionEs: "Análisis completo del estado de salud, verificación del balanceo de celdas e informe de degradación de la batería de su vehículo eléctrico", price: "$200–$275" },
      { title: "High-Voltage System Inspection", titleEs: "Inspección del Sistema de Alto Voltaje", description: "Safety inspection of HV cables, connectors, inverter, and onboard charger — required for warranty compliance", descriptionEs: "Inspección de seguridad de cables HV, conectores, inversor y cargador a bordo — requerido para cumplimiento de garantía" },
      { title: "Tesla Brake Caliper Clean & Lube", titleEs: "Limpieza y Lubricación de Calibradores Tesla", description: "Specialized service for Tesla regenerative braking systems — prevents seized calipers and uneven pad wear", descriptionEs: "Servicio especializado para sistemas de frenado regenerativo Tesla — previene calibradores atascados y desgaste desigual de pastillas", price: "$150–$225" },
      { title: "Charging System Repair", titleEs: "Reparación del Sistema de Carga", description: "Diagnosis and repair of onboard charger, charge port, and J1772/CCS connector issues", descriptionEs: "Diagnóstico y reparación del cargador a bordo, puerto de carga y problemas de conectores J1772/CCS" },
      { title: "Coolant System Service", titleEs: "Servicio del Sistema de Refrigeración", description: "Battery thermal management coolant flush and refill — critical for battery longevity in South Florida heat", descriptionEs: "Purga y rellenado del refrigerante de gestión térmica de la batería — crítico para la longevidad de la batería en el calor del sur de Florida", price: "$230–$485" },
      { title: "Suspension & Alignment", titleEs: "Suspensión y Alineación", description: "Air suspension diagnostics, coilover service, and precision alignment for heavy EV platforms", descriptionEs: "Diagnóstico de suspensión neumática, servicio de coilovers y alineación de precisión para plataformas EV pesadas" },
      { title: "Brake Pad & Rotor Replacement", titleEs: "Reemplazo de Pastillas y Rotores de Freno", description: "Full brake service including pads, rotors, and hardware — EVs need less frequent service but still need it done right", descriptionEs: "Servicio completo de frenos incluyendo pastillas, rotores y herrajes — los EVs necesitan servicio menos frecuente pero aún necesitan que se haga correctamente", price: "$550–$950 per axle" },
      { title: "12V Auxiliary Battery Replacement", titleEs: "Reemplazo de Batería Auxiliar 12V", description: "Replacement of the 12V battery that powers accessories, computers, and door locks — a common EV failure point", descriptionEs: "Reemplazo de la batería de 12V que alimenta accesorios, computadoras y cerraduras — un punto de falla común en EVs", price: "$240–$450" },
      { title: "Tire Service & Rotation", titleEs: "Servicio y Rotación de Neumáticos", description: "EV-specific tire service — heavier vehicles wear tires faster, we recommend EV-rated tires for maximum range", descriptionEs: "Servicio de neumáticos específico para EV — los vehículos más pesados desgastan los neumáticos más rápido, recomendamos neumáticos clasificados para EV" },
      { title: "Software & Module Reset", titleEs: "Reinicio de Software y Módulos", description: "ECU reset, module recalibration, and firmware troubleshooting for Tesla and other EV platforms", descriptionEs: "Reinicio de ECU, recalibración de módulos y solución de problemas de firmware para Tesla y otras plataformas EV" },
      { title: "Cabin Air & HEPA Filter Replacement", titleEs: "Reemplazo de Filtro de Aire de Cabina y HEPA", description: "Tesla HEPA filter and cabin air filter replacement — especially important in Florida's humid climate", descriptionEs: "Reemplazo de filtro HEPA y filtro de aire de cabina Tesla — especialmente importante en el clima húmedo de Florida", price: "$99.99–$250" },
    ],
  },
  {
    slug: "european-vehicle-repair",
    name: "European Vehicle Service",
    nameEs: "Servicio de Vehículos Europeos",
    vehicles: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat", "MINI Cooper", "Land Rover"],
    vehiclesEs: ["BMW", "Mercedes-Benz", "Audi", "Volkswagen", "Porsche", "Range Rover", "Maserati", "Volvo", "Jaguar", "Fiat", "MINI Cooper", "Land Rover"],
    whatIncluded: [
      { title: "Engine Diagnostics & Repair", titleEs: "Diagnóstico y Reparación del Motor", description: "Factory-level scan tools for BMW, Mercedes, Audi, and Porsche — check engine light diagnosis, tune-ups, timing chain/belt service", descriptionEs: "Herramientas de escaneo de nivel de fábrica para BMW, Mercedes, Audi y Porsche — diagnóstico de luz de motor, puestas a punto, servicio de cadena/correa de distribución", price: "$200–$275 diagnostic" },
      { title: "Transmission Service", titleEs: "Servicio de Transmisión", description: "ZF, DSG, and PDK transmission fluid exchange, filter replacement, and mechatronic unit repair", descriptionEs: "Intercambio de fluido de transmisión ZF, DSG y PDK, reemplazo de filtro y reparación de unidad mecatrónica", price: "$285–$495" },
      { title: "Brake System Service", titleEs: "Servicio del Sistema de Frenos", description: "Pads, rotors, calipers, and brake fluid flush — using OEM-spec parts for proper fitment and performance", descriptionEs: "Pastillas, rotores, calibradores y purga de líquido de frenos — usando piezas de especificación OEM para ajuste y rendimiento adecuados", price: "$550–$950 per axle" },
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Air suspension repair, adaptive damper service, control arm bushings, tie rods, and ball joints", descriptionEs: "Reparación de suspensión neumática, servicio de amortiguadores adaptativos, bujes de brazos de control, rótulas y bieletas" },
      { title: "A/C Service & Repair", titleEs: "Servicio y Reparación de A/C", description: "European-spec A/C recharge, compressor repair, and climate control diagnostics", descriptionEs: "Recarga de A/C de especificación europea, reparación de compresor y diagnóstico de control climático", price: "$240–$325" },
      { title: "Electrical System Diagnostics", titleEs: "Diagnóstico del Sistema Eléctrico", description: "CAN bus diagnostics, module coding, battery registration, and electrical fault tracing for complex European systems", descriptionEs: "Diagnóstico de bus CAN, codificación de módulos, registro de batería y rastreo de fallas eléctricas para sistemas europeos complejos" },
      { title: "Oil Change & Filter Service", titleEs: "Cambio de Aceite y Servicio de Filtro", description: "European-spec synthetic oil (LL-01, 502/505, A40) with OEM filter — required for warranty compliance", descriptionEs: "Aceite sintético de especificación europea (LL-01, 502/505, A40) con filtro OEM — requerido para cumplimiento de garantía", price: "$89.99–$185" },
      { title: "Coolant System Flush", titleEs: "Purga del Sistema de Refrigeración", description: "Full system flush with manufacturer-specified coolant — prevents overheating in South Florida conditions", descriptionEs: "Purga completa del sistema con refrigerante especificado por el fabricante — previene sobrecalentamiento en condiciones del sur de Florida", price: "$230–$485" },
      { title: "Spark Plug Replacement", titleEs: "Reemplazo de Bujías", description: "Iridium and platinum plug replacement for European engines — critical for performance and fuel economy", descriptionEs: "Reemplazo de bujías de iridio y platino para motores europeos — crítico para rendimiento y economía de combustible", price: "$275–$450" },
      { title: "Turbocharger Service", titleEs: "Servicio de Turbocompresor", description: "Turbo diagnostics, wastegate repair, boost leak testing, and turbo replacement for BMW, Audi, VW, and Mercedes", descriptionEs: "Diagnóstico de turbo, reparación de wastegate, prueba de fugas de boost y reemplazo de turbo para BMW, Audi, VW y Mercedes" },
      { title: "Serpentine Belt & Tensioner", titleEs: "Correa Serpentina y Tensor", description: "Belt and tensioner replacement with full accessory drive inspection", descriptionEs: "Reemplazo de correa y tensor con inspección completa del sistema de accesorios", price: "$245–$395" },
      { title: "Factory Scheduled Maintenance", titleEs: "Mantenimiento Programado de Fábrica", description: "30K, 60K, 90K, and 120K mile services following manufacturer intervals — keeps your warranty intact", descriptionEs: "Servicios de 30K, 60K, 90K y 120K millas siguiendo intervalos del fabricante — mantiene su garantía intacta", price: "$450–$2,100" },
    ],
  },
  {
    slug: "asian-vehicle-repair",
    name: "Asian Vehicle Service",
    nameEs: "Servicio de Vehículos Asiáticos",
    vehicles: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi", "Infiniti", "Genesis"],
    vehiclesEs: ["Toyota", "Honda", "Lexus", "Acura", "Nissan", "Mazda", "Subaru", "Hyundai", "Kia", "Mitsubishi", "Infiniti", "Genesis"],
    whatIncluded: [
      { title: "Engine Diagnostics & Repair", titleEs: "Diagnóstico y Reparación del Motor", description: "Check engine light diagnosis, tune-ups, timing belt/chain replacement, and valve adjustment for all Asian makes", descriptionEs: "Diagnóstico de luz de motor, puestas a punto, reemplazo de correa/cadena de distribución y ajuste de válvulas para todas las marcas asiáticas", price: "$200–$275 diagnostic" },
      { title: "Transmission Service", titleEs: "Servicio de Transmisión", description: "CVT, automatic, and manual transmission fluid exchange, filter replacement, and full rebuilds with warranty", descriptionEs: "Intercambio de fluido de transmisión CVT, automática y manual, reemplazo de filtro y reconstrucciones completas con garantía", price: "$285–$495" },
      { title: "Brake Pad & Rotor Replacement", titleEs: "Reemplazo de Pastillas y Rotores de Freno", description: "Complete brake service with OEM-quality ceramic pads and rotors — includes hardware and brake fluid check", descriptionEs: "Servicio completo de frenos con pastillas cerámicas y rotores de calidad OEM — incluye herrajes y verificación de líquido de frenos", price: "$550–$950 per axle" },
      { title: "A/C Recharge & Repair", titleEs: "Recarga y Reparación de A/C", description: "System recharge, leak detection, compressor repair, and condenser replacement — essential in South Florida", descriptionEs: "Recarga del sistema, detección de fugas, reparación de compresor y reemplazo de condensador — esencial en el sur de Florida", price: "$240–$325" },
      { title: "Oil Change & Filter Service", titleEs: "Cambio de Aceite y Servicio de Filtro", description: "Conventional, synthetic blend, and full synthetic oil changes with OEM-spec filter — includes multi-point inspection", descriptionEs: "Cambios de aceite convencional, mezcla sintética y sintético completo con filtro de especificación OEM — incluye inspección multipunto", price: "$89.99–$185" },
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Shocks, struts, tie rods, ball joints, control arms, and sway bar links — restore ride comfort and handling", descriptionEs: "Amortiguadores, puntales, rótulas, bieletas, brazos de control y enlaces de barra estabilizadora — restaure comodidad y manejo" },
      { title: "Coolant System Flush", titleEs: "Purga del Sistema de Refrigeración", description: "Full system flush and refill with manufacturer-specified coolant — prevents overheating and corrosion", descriptionEs: "Purga completa del sistema y rellenado con refrigerante especificado por el fabricante — previene sobrecalentamiento y corrosión", price: "$230–$485" },
      { title: "Electrical System Service", titleEs: "Servicio del Sistema Eléctrico", description: "Battery testing, alternator diagnostics, starter repair, and wiring diagnosis for all Asian vehicles", descriptionEs: "Prueba de batería, diagnóstico de alternador, reparación de arranque y diagnóstico de cableado para todos los vehículos asiáticos" },
      { title: "Fuel System Service", titleEs: "Servicio del Sistema de Combustible", description: "Fuel injector cleaning, fuel pump replacement, and fuel filter service — restores performance and fuel economy", descriptionEs: "Limpieza de inyectores, reemplazo de bomba de combustible y servicio de filtro — restaura rendimiento y economía de combustible" },
      { title: "Spark Plug Replacement", titleEs: "Reemplazo de Bujías", description: "Iridium and platinum plug replacement — critical for Toyota, Honda, and Nissan engines at 60K–100K intervals", descriptionEs: "Reemplazo de bujías de iridio y platino — crítico para motores Toyota, Honda y Nissan en intervalos de 60K–100K", price: "$275–$450" },
      { title: "Cabin & Engine Air Filters", titleEs: "Filtros de Aire de Cabina y Motor", description: "Replacement of cabin air and engine air filters — improves air quality and engine performance", descriptionEs: "Reemplazo de filtros de aire de cabina y motor — mejora la calidad del aire y el rendimiento del motor", price: "$99.99–$250" },
      { title: "Factory Scheduled Maintenance", titleEs: "Mantenimiento Programado de Fábrica", description: "30K, 60K, 90K, and 120K mile services following manufacturer intervals for all Asian makes", descriptionEs: "Servicios de 30K, 60K, 90K y 120K millas siguiendo intervalos del fabricante para todas las marcas asiáticas", price: "$450–$2,100" },
    ],
  },
  {
    slug: "domestic-vehicle-repair",
    name: "Domestic Vehicle Service",
    nameEs: "Servicio de Vehículos Domésticos",
    vehicles: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    vehiclesEs: ["Ford", "Chevrolet", "Dodge", "RAM", "Jeep", "GMC", "Chrysler", "Cadillac", "Lincoln", "Buick"],
    whatIncluded: [
      { title: "Engine Diagnostics & Repair", titleEs: "Diagnóstico y Reparación del Motor", description: "Check engine light diagnosis, tune-ups, timing belt/chain, and engine performance optimization for all domestic makes", descriptionEs: "Diagnóstico de luz de motor, puestas a punto, correa/cadena de distribución y optimización del rendimiento del motor para todas las marcas domésticas", price: "$200–$275 diagnostic" },
      { title: "Transmission Service", titleEs: "Servicio de Transmisión", description: "Fluid exchange, filter replacement, full rebuilds with 1-year warranty — we service all domestic automatic and manual transmissions", descriptionEs: "Intercambio de fluido, reemplazo de filtro, reconstrucciones completas con garantía de 1 año — damos servicio a todas las transmisiones domésticas automáticas y manuales", price: "$285–$495" },
      { title: "Brake System Service", titleEs: "Servicio del Sistema de Frenos", description: "Pads, rotors, calipers, brake fluid flush — using OEM and premium aftermarket parts for trucks, SUVs, and cars", descriptionEs: "Pastillas, rotores, calibradores, purga de líquido de frenos — usando piezas OEM y de posventa premium para camionetas, SUVs y autos", price: "$270–$550 pads / $550–$950 per axle" },
      { title: "Suspension & Steering", titleEs: "Suspensión y Dirección", description: "Shocks, struts, tie rods, ball joints, alignment — especially important for heavy trucks and SUVs", descriptionEs: "Amortiguadores, puntales, rótulas, bieletas, alineación — especialmente importante para camionetas y SUVs pesados" },
      { title: "A/C Service & Repair", titleEs: "Servicio y Reparación de A/C", description: "Recharge, leak test, compressor repair — your domestic vehicle's A/C works overtime in South Florida", descriptionEs: "Recarga, prueba de fugas, reparación de compresor — el A/C de su vehículo doméstico trabaja horas extra en el sur de Florida", price: "$240–$325" },
      { title: "Electrical System Service", titleEs: "Servicio del Sistema Eléctrico", description: "Battery, alternator, starter, wiring diagnosis — full electrical diagnostics for Ford, Chevy, Dodge, and more", descriptionEs: "Batería, alternador, arranque, diagnóstico de cableado — diagnóstico eléctrico completo para Ford, Chevy, Dodge y más" },
      { title: "Oil & Filter Change", titleEs: "Cambio de Aceite y Filtro", description: "Conventional and full synthetic oil changes with OEM filter — includes multi-point inspection", descriptionEs: "Cambios de aceite convencional y sintético completo con filtro OEM — incluye inspección multipunto", price: "$89.99–$185" },
      { title: "Fuel System Service", titleEs: "Servicio del Sistema de Combustible", description: "Injector cleaning, fuel pump replacement, fuel filter service — restores power and fuel economy", descriptionEs: "Limpieza de inyectores, reemplazo de bomba de combustible, servicio de filtro — restaura potencia y economía de combustible" },
      { title: "Coolant System Flush", titleEs: "Purga del Sistema de Refrigeración", description: "Radiator flush, coolant replacement, thermostat service — prevents overheating in Florida heat", descriptionEs: "Purga de radiador, reemplazo de refrigerante, servicio de termostato — previene sobrecalentamiento en el calor de Florida", price: "$230–$485" },
      { title: "Factory Scheduled Maintenance", titleEs: "Mantenimiento Programado de Fábrica", description: "30K, 60K, 90K, 120K mile services — keeps your warranty intact and your vehicle running reliably", descriptionEs: "Servicios de 30K, 60K, 90K, 120K millas — mantiene su garantía intacta y su vehículo funcionando confiablemente", price: "$450–$2,100" },
    ],
  },
  {
    slug: "brake-repair",
    name: "Brake & Rotor Service",
    nameEs: "Servicio de Frenos y Rotores",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      { title: "Brake Pad Replacement", titleEs: "Reemplazo de Pastillas de Freno", description: "Ceramic and semi-metallic pad replacement for all makes — includes hardware and bedding procedure", descriptionEs: "Reemplazo de pastillas cerámicas y semi-metálicas para todas las marcas — incluye herrajes y procedimiento de asentamiento", price: "$270–$550 per axle" },
      { title: "Brake Pad & Rotor Replacement", titleEs: "Reemplazo de Pastillas y Rotores", description: "Complete pad and rotor replacement — we machine or replace rotors based on measurement and condition", descriptionEs: "Reemplazo completo de pastillas y rotores — maquinamos o reemplazamos rotores según medición y condición", price: "$550–$950 per axle" },
      { title: "Brake Fluid Flush & Exchange", titleEs: "Purga e Intercambio de Líquido de Frenos", description: "Complete brake fluid system flush — removes moisture and contaminants that cause spongy pedal feel", descriptionEs: "Purga completa del sistema de líquido de frenos — elimina humedad y contaminantes que causan sensación de pedal esponjoso", price: "$155–$275" },
      { title: "Tesla Brake Caliper Clean & Lube", titleEs: "Limpieza y Lubricación de Calibradores Tesla", description: "Specialized service for Tesla and EV regenerative braking — prevents seized calipers from low brake use", descriptionEs: "Servicio especializado para frenado regenerativo Tesla y EV — previene calibradores atascados por bajo uso de frenos", price: "$150–$225" },
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
    whatIncluded: [
      { title: "Transmission Fluid Exchange", titleEs: "Intercambio de Fluido de Transmisión", description: "Complete fluid replacement and system flush — extends transmission life and improves shift quality", descriptionEs: "Reemplazo completo de fluido y purga del sistema — extiende la vida de la transmisión y mejora la calidad del cambio", price: "$285–$495" },
      { title: "Automatic Transmission Repair", titleEs: "Reparación de Transmisión Automática", description: "Solenoid replacement, valve body repair, torque converter service, and full rebuilds", descriptionEs: "Reemplazo de solenoide, reparación del cuerpo de válvulas, servicio de convertidor de torque y reconstrucciones completas" },
      { title: "Manual Transmission Service", titleEs: "Servicio de Transmisión Manual", description: "Clutch replacement, synchronizer repair, and gear oil service for manual transmissions", descriptionEs: "Reemplazo de embrague, reparación de sincronizadores y servicio de aceite de engranajes para transmisiones manuales" },
      { title: "CVT Transmission Service", titleEs: "Servicio de Transmisión CVT", description: "Specialized CVT fluid exchange and diagnostics for Nissan, Subaru, Honda, and Toyota CVT units", descriptionEs: "Intercambio especializado de fluido CVT y diagnóstico para unidades CVT de Nissan, Subaru, Honda y Toyota" },
      { title: "Transmission Filter Replacement", titleEs: "Reemplazo de Filtro de Transmisión", description: "Internal and external filter replacement — prevents contamination and premature wear", descriptionEs: "Reemplazo de filtro interno y externo — previene contaminación y desgaste prematuro" },
      { title: "Transmission Diagnostics", titleEs: "Diagnóstico de Transmisión", description: "Computer scan, road test, and fluid analysis to identify shifting problems, slipping, and hard shifts", descriptionEs: "Escaneo computarizado, prueba en carretera y análisis de fluido para identificar problemas de cambio, deslizamiento y cambios duros", price: "$200–$275" },
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
    whatIncluded: [
      { title: "A/C Performance & Leak Test", titleEs: "Prueba de Rendimiento y Fugas de A/C", description: "Complete system diagnostic with UV dye test, pressure check, and vent temperature measurement", descriptionEs: "Diagnóstico completo del sistema con prueba de tinte UV, verificación de presión y medición de temperatura de ventilación", price: "$240–$325" },
      { title: "Refrigerant Recharge", titleEs: "Recarga de Refrigerante", description: "R-134a and R-1234yf recharge to manufacturer specifications — restores cold air output", descriptionEs: "Recarga de R-134a y R-1234yf a especificaciones del fabricante — restaura la salida de aire frío" },
      { title: "Compressor Repair & Replacement", titleEs: "Reparación y Reemplazo de Compresor", description: "A/C compressor diagnosis, clutch repair, and complete replacement with new receiver/drier", descriptionEs: "Diagnóstico del compresor de A/C, reparación del embrague y reemplazo completo con nuevo receptor/secador" },
      { title: "Condenser Service", titleEs: "Servicio de Condensador", description: "Condenser cleaning, leak repair, and replacement — road debris and salt air cause premature failure in South Florida", descriptionEs: "Limpieza, reparación de fugas y reemplazo del condensador — escombros del camino y aire salado causan fallas prematuras en el sur de Florida" },
      { title: "Evaporator Service", titleEs: "Servicio del Evaporador", description: "Evaporator core cleaning, leak repair, and replacement — eliminates musty odors and restores cooling", descriptionEs: "Limpieza, reparación de fugas y reemplazo del núcleo del evaporador — elimina olores a humedad y restaura la refrigeración" },
      { title: "Expansion Valve & Orifice Tube", titleEs: "Válvula de Expansión y Tubo de Orificio", description: "Replacement of metering devices that control refrigerant flow — fixes inconsistent cooling", descriptionEs: "Reemplazo de dispositivos de medición que controlan el flujo de refrigerante — corrige enfriamiento inconsistente" },
      { title: "A/C Hose & Line Repair", titleEs: "Reparación de Mangueras y Líneas de A/C", description: "High and low pressure hose replacement, O-ring service, and fitting repair", descriptionEs: "Reemplazo de mangueras de alta y baja presión, servicio de juntas tóricas y reparación de conexiones" },
      { title: "Cabin Air Filter Replacement", titleEs: "Reemplazo de Filtro de Aire de Cabina", description: "Fresh cabin air filter improves airflow and air quality — recommended every 15K–20K miles", descriptionEs: "Un filtro de aire de cabina nuevo mejora el flujo de aire y la calidad — recomendado cada 15K–20K millas", price: "$99.99–$250" },
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
    whatIncluded: [
      { title: "Full Synthetic Oil Change", titleEs: "Cambio de Aceite Sintético Completo", description: "Premium full synthetic oil with OEM-spec filter — includes fluid top-off and multi-point inspection", descriptionEs: "Aceite sintético premium completo con filtro de especificación OEM — incluye rellenado de fluidos e inspección multipunto", price: "$89.99–$185" },
      { title: "Conventional Oil Change", titleEs: "Cambio de Aceite Convencional", description: "Standard oil change for older vehicles or those with lower mileage requirements", descriptionEs: "Cambio de aceite estándar para vehículos más antiguos o con requisitos de menor kilometraje" },
      { title: "High-Mileage Oil Service", titleEs: "Servicio de Aceite de Alto Kilometraje", description: "Specialized oil with seal conditioners for vehicles over 75,000 miles — reduces oil consumption and leaks", descriptionEs: "Aceite especializado con acondicionadores de sellos para vehículos con más de 75,000 millas — reduce consumo de aceite y fugas" },
      { title: "Engine Air Filter Replacement", titleEs: "Reemplazo de Filtro de Aire del Motor", description: "Clean air filter improves fuel economy and engine performance — recommended every 15K–30K miles", descriptionEs: "Un filtro de aire limpio mejora la economía de combustible y el rendimiento del motor — recomendado cada 15K–30K millas" },
      { title: "Cabin Air Filter Replacement", titleEs: "Reemplazo de Filtro de Aire de Cabina", description: "Fresh cabin filter for clean air inside your vehicle — especially important in Florida's pollen season", descriptionEs: "Filtro de cabina nuevo para aire limpio dentro de su vehículo — especialmente importante en la temporada de polen de Florida", price: "$99.99–$250" },
      { title: "Spark Plug Replacement", titleEs: "Reemplazo de Bujías", description: "Iridium and platinum plug replacement — restores smooth idle, fuel economy, and engine performance", descriptionEs: "Reemplazo de bujías de iridio y platino — restaura ralentí suave, economía de combustible y rendimiento del motor", price: "$275–$450" },
      { title: "Serpentine Belt Replacement", titleEs: "Reemplazo de Correa Serpentina", description: "Belt and tensioner replacement — prevents sudden failure that can leave you stranded", descriptionEs: "Reemplazo de correa y tensor — previene fallas repentinas que pueden dejarlo varado", price: "$245–$395" },
      { title: "Coolant System Flush", titleEs: "Purga del Sistema de Refrigeración", description: "Full system flush and refill with OEM coolant — prevents overheating and corrosion damage", descriptionEs: "Purga completa del sistema y rellenado con refrigerante OEM — previene sobrecalentamiento y daño por corrosión", price: "$230–$485" },
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
    whatIncluded: [
      { title: "Diagnostic Scan & Health Report", titleEs: "Escaneo de Diagnóstico e Informe de Salud", description: "Complete OBD-II and manufacturer-specific scan with detailed written report of all fault codes and recommendations", descriptionEs: "Escaneo completo OBD-II y específico del fabricante con informe escrito detallado de todos los códigos de falla y recomendaciones", price: "$200–$275" },
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
    whatIncluded: [
      { title: "30,000 Mile Major Service", titleEs: "Servicio Mayor de 30,000 Millas", description: "Oil change, filter service, fluid checks, tire rotation, brake inspection, and multi-point inspection", descriptionEs: "Cambio de aceite, servicio de filtro, verificación de fluidos, rotación de neumáticos, inspección de frenos e inspección multipunto", price: "$450–$750" },
      { title: "60,000 Mile Major Service", titleEs: "Servicio Mayor de 60,000 Millas", description: "Includes transmission fluid, coolant flush, spark plugs (if due), and comprehensive inspection", descriptionEs: "Incluye fluido de transmisión, purga de refrigerante, bujías (si corresponde) e inspección integral", price: "$850–$1,450" },
      { title: "90,000 Mile Major Service", titleEs: "Servicio Mayor de 90,000 Millas", description: "Spark plugs, belt inspection/replacement, timing belt (if applicable), and full system check", descriptionEs: "Bujías, inspección/reemplazo de correa, correa de distribución (si aplica) y verificación completa del sistema", price: "$1,100–$1,850" },
      { title: "120,000 Mile Major Service", titleEs: "Servicio Mayor de 120,000 Millas", description: "Comprehensive service including transmission flush, coolant flush, all filters, and complete inspection", descriptionEs: "Servicio integral incluyendo purga de transmisión, purga de refrigerante, todos los filtros e inspección completa", price: "$1,250–$2,100" },
      { title: "Oil Change & Filter Service", titleEs: "Cambio de Aceite y Servicio de Filtro", description: "Conventional, synthetic blend, and full synthetic options — includes multi-point inspection", descriptionEs: "Opciones convencional, mezcla sintética y sintético completo — incluye inspección multipunto", price: "$89.99–$185" },
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
    whatIncluded: [
      { title: "Shock & Strut Replacement", titleEs: "Reemplazo de Amortiguadores y Puntales", description: "Front and rear shock/strut replacement — restores ride comfort, handling, and tire wear patterns", descriptionEs: "Reemplazo de amortiguadores/puntales delanteros y traseros — restaura comodidad, manejo y patrones de desgaste de neumáticos" },
      { title: "Control Arm & Bushing Service", titleEs: "Servicio de Brazos de Control y Bujes", description: "Upper and lower control arm replacement, bushing press, and alignment — fixes clunking and wandering", descriptionEs: "Reemplazo de brazos de control superiores e inferiores, prensado de bujes y alineación — corrige golpeteo y desvío" },
      { title: "Tie Rod Replacement", titleEs: "Reemplazo de Rótulas de Dirección", description: "Inner and outer tie rod replacement with alignment — fixes loose steering and uneven tire wear", descriptionEs: "Reemplazo de rótulas de dirección internas y externas con alineación — corrige dirección floja y desgaste desigual" },
      { title: "Ball Joint Replacement", titleEs: "Reemplazo de Rótulas", description: "Upper and lower ball joint replacement — critical safety component that affects steering and suspension", descriptionEs: "Reemplazo de rótulas superiores e inferiores — componente de seguridad crítico que afecta dirección y suspensión" },
      { title: "Wheel Bearing/Hub Assembly", titleEs: "Rodamiento de Rueda/Ensamblaje de Cubo", description: "Bearing or hub replacement with alignment check — fixes humming noise and wheel play", descriptionEs: "Reemplazo de rodamiento o cubo con verificación de alineación — corrige ruido de zumbido y juego de rueda", price: "$550–$950" },
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
    vehicles: ["Toyota Prius", "Toyota RAV4 Hybrid", "Honda Insight", "Honda CR-V Hybrid", "Chevy Volt", "Lexus Hybrid", "Hyundai Ioniq Hybrid", "Ford Escape Hybrid", "Kia Niro", "Toyota Camry Hybrid"],
    vehiclesEs: ["Toyota Prius", "Toyota RAV4 Hybrid", "Honda Insight", "Honda CR-V Hybrid", "Chevy Volt", "Lexus Hybrid", "Hyundai Ioniq Hybrid", "Ford Escape Hybrid", "Kia Niro", "Toyota Camry Hybrid"],
    whatIncluded: [
      { title: "Hybrid Battery Diagnostics", titleEs: "Diagnóstico de Batería Híbrida", description: "Cell-level testing and state-of-health analysis for NiMH and lithium-ion hybrid battery packs", descriptionEs: "Prueba a nivel de celda y análisis del estado de salud para paquetes de batería híbrida NiMH y litio-ion" },
      { title: "High-Voltage System Inspection", titleEs: "Inspección del Sistema de Alto Voltaje", description: "Safety inspection of HV cables, connectors, and isolation — required before any hybrid service work", descriptionEs: "Inspección de seguridad de cables HV, conectores y aislamiento — requerido antes de cualquier trabajo de servicio híbrido" },
      { title: "Regenerative Braking Service", titleEs: "Servicio de Frenado Regenerativo", description: "Brake system service specific to hybrid vehicles — pads last longer but still need periodic inspection", descriptionEs: "Servicio del sistema de frenos específico para vehículos híbridos — las pastillas duran más pero aún necesitan inspección periódica" },
      { title: "Hybrid Transmission Service", titleEs: "Servicio de Transmisión Híbrida", description: "eCVT and hybrid-specific transmission fluid exchange and diagnostics", descriptionEs: "Intercambio de fluido y diagnóstico de transmisión eCVT y específica para híbridos" },
      { title: "Electric Motor Diagnostics", titleEs: "Diagnóstico del Motor Eléctrico", description: "Motor/generator testing, inverter diagnostics, and power electronics inspection", descriptionEs: "Prueba de motor/generador, diagnóstico del inversor e inspección de electrónica de potencia" },
      { title: "Hybrid Cooling System Service", titleEs: "Servicio del Sistema de Enfriamiento Híbrido", description: "Separate cooling loop for hybrid battery and inverter — critical for battery longevity in Florida heat", descriptionEs: "Circuito de enfriamiento separado para batería híbrida e inversor — crítico para longevidad de la batería en el calor de Florida" },
      { title: "12V Auxiliary Battery Service", titleEs: "Servicio de Batería Auxiliar 12V", description: "Testing and replacement of the 12V battery that starts the hybrid system — a common failure point", descriptionEs: "Prueba y reemplazo de la batería de 12V que inicia el sistema híbrido — un punto de falla común", price: "$240–$450" },
      { title: "Oil Change for Hybrids", titleEs: "Cambio de Aceite para Híbridos", description: "Hybrid-specific oil service with 0W-20 synthetic — shorter intervals due to frequent engine start/stop cycles", descriptionEs: "Servicio de aceite específico para híbridos con sintético 0W-20 — intervalos más cortos debido a ciclos frecuentes de arranque/parada", price: "$89.99–$185" },
      { title: "Hybrid System Warning Light Diagnosis", titleEs: "Diagnóstico de Luz de Advertencia del Sistema Híbrido", description: "Triangle of death, hybrid battery warning, and check hybrid system light diagnosis and repair", descriptionEs: "Triángulo de la muerte, advertencia de batería híbrida y diagnóstico y reparación de luz de verificación del sistema híbrido" },
      { title: "Cabin & Engine Air Filters", titleEs: "Filtros de Aire de Cabina y Motor", description: "Filter replacement for hybrid vehicles — maintains engine efficiency and cabin air quality", descriptionEs: "Reemplazo de filtros para vehículos híbridos — mantiene la eficiencia del motor y la calidad del aire de la cabina", price: "$99.99–$250" },
    ],
  },
  {
    slug: "wheel-alignment",
    name: "Wheel Alignment, Tire Rotation & Balancing",
    nameEs: "Alineación de Ruedas, Rotación y Balanceo",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      { title: "Precision 4-Wheel Alignment", titleEs: "Alineación de Precisión de 4 Ruedas", description: "Computer-guided alignment adjusting camber, caster, and toe to manufacturer specifications", descriptionEs: "Alineación guiada por computadora ajustando camber, caster y convergencia a especificaciones del fabricante" },
      { title: "Tire Rotation", titleEs: "Rotación de Neumáticos", description: "Front-to-rear and cross-pattern rotation — extends tire life by 20-30% with regular service", descriptionEs: "Rotación de frente a atrás y patrón cruzado — extiende la vida del neumático un 20-30% con servicio regular" },
      { title: "Tire Balancing", titleEs: "Balanceo de Neumáticos", description: "Dynamic wheel balancing — eliminates vibration at highway speeds and prevents uneven tire wear", descriptionEs: "Balanceo dinámico de ruedas — elimina vibración a velocidades de autopista y previene desgaste desigual" },
      { title: "Tire Pressure Monitoring (TPMS)", titleEs: "Monitoreo de Presión de Neumáticos (TPMS)", description: "TPMS sensor replacement, programming, and system diagnostics — fixes dashboard warning light", descriptionEs: "Reemplazo de sensor TPMS, programación y diagnóstico del sistema — corrige luz de advertencia del tablero" },
      { title: "Suspension Inspection", titleEs: "Inspección de Suspensión", description: "Pre-alignment inspection of shocks, struts, tie rods, and ball joints — worn parts cause alignment to fail", descriptionEs: "Inspección pre-alineación de amortiguadores, puntales, rótulas y bieletas — piezas desgastadas causan falla de alineación" },
      { title: "Tire Wear Analysis", titleEs: "Análisis de Desgaste de Neumáticos", description: "Read tire wear patterns to identify alignment, inflation, or suspension problems before they get worse", descriptionEs: "Lectura de patrones de desgaste de neumáticos para identificar problemas de alineación, inflado o suspensión antes de que empeoren" },
      { title: "Flat Tire Repair", titleEs: "Reparación de Neumático Ponchado", description: "Professional plug and patch repair for repairable punctures — follows industry safety standards", descriptionEs: "Reparación profesional con tapón y parche para pinchazos reparables — sigue estándares de seguridad de la industria" },
      { title: "Tire Replacement & Installation", titleEs: "Reemplazo e Instalación de Neumáticos", description: "We source and install tires from all major brands — mounted, balanced, and TPMS programmed", descriptionEs: "Obtenemos e instalamos neumáticos de todas las marcas principales — montados, balanceados y TPMS programado" },
      { title: "Wheel Bearing Service", titleEs: "Servicio de Rodamiento de Rueda", description: "Bearing inspection, repacking, and replacement — fixes humming noise that changes with speed", descriptionEs: "Inspección, reempaque y reemplazo de rodamientos — corrige ruido de zumbido que cambia con la velocidad", price: "$550–$950" },
      { title: "Alignment Check", titleEs: "Verificación de Alineación", description: "Quick alignment measurement to determine if adjustment is needed — recommended after hitting a pothole or curb", descriptionEs: "Medición rápida de alineación para determinar si se necesita ajuste — recomendado después de golpear un bache o bordillo" },
    ],
  },
  {
    slug: "battery-charging-systems",
    name: "Battery & Charging Systems",
    nameEs: "Batería y Sistemas de Carga",
    vehicles: [],
    vehiclesEs: [],
    whatIncluded: [
      { title: "Premium Battery Replacement", titleEs: "Reemplazo de Batería Premium", description: "OEM and premium aftermarket battery installation with terminal cleaning and charging system verification", descriptionEs: "Instalación de batería OEM y de posventa premium con limpieza de terminales y verificación del sistema de carga", price: "$240–$450" },
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
    whatIncluded: [
      { title: "Scheduled Fleet Maintenance", titleEs: "Mantenimiento Programado de Flota", description: "Customized maintenance schedules based on your fleet's mileage, usage patterns, and manufacturer requirements", descriptionEs: "Horarios de mantenimiento personalizados basados en el kilometraje de su flota, patrones de uso y requisitos del fabricante" },
      { title: "Fleet Oil Change Service", titleEs: "Servicio de Cambio de Aceite de Flota", description: "Bulk oil change service with fleet pricing — conventional and synthetic options for all vehicle types", descriptionEs: "Servicio de cambio de aceite a granel con precios de flota — opciones convencionales y sintéticas para todos los tipos de vehículos", price: "$89.99–$185 per vehicle" },
      { title: "Fleet Brake Service", titleEs: "Servicio de Frenos de Flota", description: "Priority brake service for fleet vehicles — pads, rotors, and fluid service with fleet discount", descriptionEs: "Servicio de frenos prioritario para vehículos de flota — pastillas, rotores y servicio de fluido con descuento de flota", price: "$270–$950 per axle" },
      { title: "Fleet Diagnostics", titleEs: "Diagnóstico de Flota", description: "Comprehensive diagnostics for fleet vehicles — check engine lights, drivability issues, and preventive scans", descriptionEs: "Diagnóstico integral para vehículos de flota — luces de motor, problemas de conducción y escaneos preventivos" },
      { title: "Commercial Vehicle Repair", titleEs: "Reparación de Vehículos Comerciales", description: "Service for vans, box trucks, and commercial vehicles — engine, transmission, brakes, and electrical", descriptionEs: "Servicio para furgonetas, camiones de caja y vehículos comerciales — motor, transmisión, frenos y eléctrico" },
      { title: "Fleet A/C Service", titleEs: "Servicio de A/C de Flota", description: "A/C recharge and repair for fleet vehicles — critical for South Florida delivery and service vehicles", descriptionEs: "Recarga y reparación de A/C para vehículos de flota — crítico para vehículos de entrega y servicio del sur de Florida" },
      { title: "Fleet Tire Service", titleEs: "Servicio de Neumáticos de Flota", description: "Tire rotation, balancing, alignment, and replacement for fleet vehicles with volume pricing", descriptionEs: "Rotación, balanceo, alineación y reemplazo de neumáticos para vehículos de flota con precios por volumen" },
      { title: "Preventive Maintenance Programs", titleEs: "Programas de Mantenimiento Preventivo", description: "Custom PM programs designed to minimize downtime and extend vehicle life — includes tracking and reporting", descriptionEs: "Programas de MP personalizados diseñados para minimizar tiempo de inactividad y extender la vida del vehículo — incluye seguimiento y reportes" },
      { title: "Fleet Reporting & Tracking", titleEs: "Reportes y Seguimiento de Flota", description: "Detailed service history, cost tracking, and maintenance scheduling for your entire fleet", descriptionEs: "Historial de servicio detallado, seguimiento de costos y programación de mantenimiento para toda su flota" },
      { title: "Priority Scheduling", titleEs: "Programación Prioritaria", description: "Fleet customers receive priority scheduling to minimize vehicle downtime — same-day service when possible", descriptionEs: "Los clientes de flota reciben programación prioritaria para minimizar tiempo de inactividad — servicio el mismo día cuando sea posible" },
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
