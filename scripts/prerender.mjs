/**
 * prerender.mjs — Pure Node.js static prerendering (NO Chromium/Puppeteer)
 *
 * Reads the Vite-built dist/public/index.html as a base template, then for each
 * known route injects the correct <title>, <meta description>, <link canonical>,
 * <link hreflang>, and Open Graph / Twitter tags, and saves the result as
 * dist/public/{route}/index.html.
 *
 * Zero external dependencies — works in any Node.js 18+ environment.
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DIST = join(ROOT, "dist", "public");
const BASE_URL = "https://verticalautomotive.com";

// ─── Service slugs for city pages ────────────────────────────────────────────
const CITY_SERVICES = [
  { slug: "tesla-ev-repair",          name: "Tesla & EV Service",                         nameEs: "Servicio Tesla y Vehículos Eléctricos" },
  { slug: "european-vehicle-repair",  name: "European Vehicle Service",                   nameEs: "Servicio de Vehículos Europeos" },
  { slug: "asian-vehicle-repair",     name: "Asian Vehicle Service",                      nameEs: "Servicio de Vehículos Asiáticos" },
  { slug: "domestic-vehicle-repair",  name: "Domestic Vehicle Service",                   nameEs: "Servicio de Vehículos Domésticos" },
  { slug: "brake-repair",             name: "Brake & Rotor Service",                      nameEs: "Servicio de Frenos y Rotores" },
  { slug: "transmission-service",     name: "Transmission Service",                       nameEs: "Servicio de Transmisión" },
  { slug: "ac-repair",                name: "A/C Repair & Maintenance",                   nameEs: "Reparación y Mantenimiento de Aire Acondicionado" },
  { slug: "engine-oil-service",       name: "Engine, Oil & Filters",                      nameEs: "Motor, Aceite y Filtros" },
  { slug: "complete-diagnostics",     name: "Complete Diagnostics",                       nameEs: "Diagnóstico Completo" },
  { slug: "routine-maintenance",      name: "Routine & Preventive Maintenance",           nameEs: "Mantenimiento Rutinario y Preventivo" },
  { slug: "steering-suspension",      name: "Steering & Suspension",                      nameEs: "Dirección y Suspensión" },
  { slug: "fuel-system-service",      name: "Fuel System Service",                        nameEs: "Servicio del Sistema de Combustible" },
  { slug: "hybrid-ev-service",        name: "Hybrid & EV Service",                        nameEs: "Servicio de Híbridos y Eléctricos" },
  { slug: "wheel-alignment",          name: "Wheel Alignment, Tire Rotation & Balancing", nameEs: "Alineación de Ruedas, Rotación y Balanceo" },
  { slug: "battery-charging-systems", name: "Battery & Charging Systems",                 nameEs: "Batería y Sistemas de Carga" },
  { slug: "fleet-services",           name: "Fleet Services & Maintenance",               nameEs: "Servicios de Flota y Mantenimiento" },
  { slug: "tire-service",             name: "Tire Service & Replacement",                 nameEs: "Servicio y Reemplazo de Neumáticos" },
];

const CITIES = [
  { city: "fort-lauderdale", display: "Fort Lauderdale", phone: "(645) 216-2266" },
  { city: "wilton-manors",   display: "Wilton Manors",   phone: "(954) 565-1518" },
];

// ─── Blog article metadata ────────────────────────────────────────────────────
const BLOG_EN = [
  { slug: "brake-warning-signs",                      title: "5 Brake Warning Signs You Shouldn't Ignore | Vertical Automotive",                                   desc: "Learn the 5 critical signs your brakes need professional attention. Expert brake advice from Vertical Automotive in Fort Lauderdale." },
  { slug: "seasonal-car-care-south-florida",           title: "Seasonal Car Care Guide for South Florida | Vertical Automotive",                                    desc: "Complete seasonal car care guide for Fort Lauderdale drivers. Keep your vehicle running in South Florida's heat and humidity." },
  { slug: "oil-change-engine-best-friend",             title: "Why Regular Oil Changes Are Your Engine's Best Friend | Vertical Automotive",                        desc: "Learn why regular oil changes are essential for your engine's longevity. Expert advice from Vertical Automotive in Fort Lauderdale." },
  { slug: "ac-florida-summer-prep",                    title: "Prepare Your Car's A/C for Florida Summer | Vertical Automotive",                                    desc: "Expert tips to prepare your vehicle's A/C system for Florida's summer heat. Vertical Automotive Fort Lauderdale." },
  { slug: "tire-care-pressure-rotation-alignment",     title: "Tire Care Guide: Pressure, Rotation & Alignment | Vertical Automotive",                             desc: "Complete tire care guide for South Florida drivers. Learn about tire pressure, rotation, and alignment from Vertical Automotive." },
  { slug: "hybrid-ev-maintenance-guide",               title: "Hybrid & EV Maintenance Guide | Vertical Automotive Fort Lauderdale",                                desc: "Expert guide to hybrid and electric vehicle maintenance. Learn what's different about EV service from Vertical Automotive." },
  { slug: "check-engine-light-guide",                  title: "Check Engine Light Guide: What It Means | Vertical Automotive",                                      desc: "What does your check engine light mean? Expert diagnostic guide from Vertical Automotive in Fort Lauderdale." },
  { slug: "transmission-service-fluid-change",         title: "Transmission Service & Fluid Change Guide | Vertical Automotive Fort Lauderdale",                    desc: "Learn why transmission fluid changes are critical for your vehicle's longevity. Vertical Automotive Fort Lauderdale." },
  { slug: "fleet-vehicle-maintenance-schedules",       title: "Fleet Vehicle Maintenance Schedules Guide | Vertical Automotive Fort Lauderdale",                    desc: "Complete guide to fleet vehicle maintenance schedules for South Florida businesses. Vertical Automotive." },
  { slug: "dashboard-warning-lights-guide",            title: "Dashboard Warning Lights Guide: What Every Driver Must Know | Vertical Automotive Fort Lauderdale",  desc: "Complete guide to car dashboard warning lights. Learn what check engine, ABS, oil, and battery lights mean." },
  { slug: "tesla-ldu-rebuild-vs-replacement",          title: "Tesla LDU Rebuild vs. Replacement Guide | Vertical Automotive Fort Lauderdale",                      desc: "Tesla LDU rebuild vs replacement: costs, symptoms, and what to expect. Expert EV advice from Vertical Automotive." },
  { slug: "tesla-battery-degradation-range-loss",      title: "Tesla Battery Degradation & Range Loss Guide | Vertical Automotive Fort Lauderdale",                 desc: "Expert guide on Tesla battery degradation for South Florida owners. Learn what causes range loss and how to slow it." },
  { slug: "tesla-ac-thermal-management-south-florida", title: "Tesla A/C & Thermal Management Repair Guide | Vertical Automotive Fort Lauderdale",                  desc: "Tesla A/C not cooling? Thermal management issues in South Florida heat explained by Vertical Automotive." },
  { slug: "tesla-suspension-alignment-south-florida",  title: "Tesla Suspension & Alignment Repair Guide | Vertical Automotive Fort Lauderdale",                    desc: "Tesla Model 3 and Model Y suspension problems explained for South Florida owners by Vertical Automotive." },
];

const BLOG_ES = [
  { slug: "cuidado-estacional-del-auto-sur-de-florida",        title: "Guía de Cuidado Estacional del Auto en el Sur de Florida | Vertical Automotive",                                   desc: "Guía completa de cuidado estacional del auto para conductores de Fort Lauderdale. Vertical Automotive." },
  { slug: "cambio-de-aceite-mejor-amigo-del-motor",            title: "Por Qué los Cambios de Aceite Regulares Importan | Vertical Automotive",                                           desc: "Aprenda por qué los cambios de aceite regulares son esenciales para la longevidad de su motor. Vertical Automotive." },
  { slug: "senales-de-advertencia-de-frenos",                  title: "5 Señales de Advertencia de Frenos | Vertical Automotive Fort Lauderdale",                                         desc: "Conozca las 5 señales críticas de que sus frenos necesitan atención profesional. Vertical Automotive Fort Lauderdale." },
  { slug: "preparar-ac-para-verano-florida",                   title: "Prepare el A/C de Su Auto para el Verano de Florida | Vertical Automotive",                                        desc: "Consejos expertos para preparar el sistema de A/C de su vehículo para el calor de Florida. Vertical Automotive." },
  { slug: "cuidado-de-neumaticos-presion-rotacion-alineacion", title: "Guía de Cuidado de Neumáticos: Presión, Rotación y Alineación | Vertical Automotive",                              desc: "Guía completa de cuidado de neumáticos para conductores del sur de Florida. Vertical Automotive." },
  { slug: "guia-mantenimiento-hibridos-ev",                    title: "Guía de Mantenimiento de Híbridos y EV | Vertical Automotive Fort Lauderdale",                                     desc: "Guía experta de mantenimiento de vehículos híbridos y eléctricos. Vertical Automotive Fort Lauderdale." },
  { slug: "guia-luz-check-engine",                             title: "Guía de Luz de Check Engine: Qué Significa | Vertical Automotive",                                                 desc: "¿Qué significa su luz de check engine? Guía de diagnóstico experta de Vertical Automotive Fort Lauderdale." },
  { slug: "servicio-de-transmision-cambio-de-fluido",          title: "Guía de Servicio de Transmisión y Cambio de Fluido | Vertical Automotive Fort Lauderdale",                         desc: "Aprenda por qué los cambios de fluido de transmisión son críticos para la longevidad de su vehículo." },
  { slug: "programas-mantenimiento-vehiculos-de-flota",        title: "Guía de Programas de Mantenimiento de Flotas | Vertical Automotive Fort Lauderdale",                               desc: "Guía completa de programas de mantenimiento de vehículos de flota para empresas del sur de Florida." },
  { slug: "guia-luces-de-advertencia-del-tablero",             title: "Guía de Luces de Advertencia del Tablero | Vertical Automotive Fort Lauderdale",                                   desc: "Guía completa de luces de advertencia del tablero. Aprenda qué significan las luces de check engine, ABS y más." },
  { slug: "reconstruccion-vs-reemplazo-ldu-tesla",             title: "Guía de Reconstrucción vs. Reemplazo del LDU de Tesla | Vertical Automotive Fort Lauderdale",                      desc: "Reconstrucción vs. reemplazo del LDU de Tesla: costos, síntomas y qué esperar. Vertical Automotive." },
  { slug: "degradacion-bateria-tesla-perdida-autonomia",       title: "Guía de Degradación de Batería Tesla y Pérdida de Autonomía | Vertical Automotive Fort Lauderdale",                desc: "Guía experta sobre la degradación de la batería Tesla para propietarios en el sur de Florida." },
  { slug: "tesla-ac-gestion-termica-sur-de-florida",           title: "Guía de Reparación de A/C y Gestión Térmica Tesla | Vertical Automotive Fort Lauderdale",                          desc: "¿El A/C de tu Tesla no enfría? Problemas de gestión térmica en el calor del sur de Florida explicados." },
  { slug: "tesla-suspension-alineacion-sur-de-florida",        title: "Guía de Reparación de Suspensión y Alineación Tesla | Vertical Automotive Fort Lauderdale",                        desc: "Problemas de suspensión del Tesla Model 3 y Model Y explicados para propietarios en el sur de Florida." },
];

// ─── Build the full route metadata map ───────────────────────────────────────
function buildRoutes() {
  const routes = [];

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages = [
    { path: "/",                                  lang: "en", title: "Auto Repair Fort Lauderdale & Wilton Manors | All Makes",                                          desc: "Trusted auto repair in Fort Lauderdale & Wilton Manors for all makes & models. ASE-certified mechanics, EV specialists, 36,000-mile / 36-month warranty, 2 locations.",                                                                                                                   canonical: `${BASE_URL}/`,                                                hreflangEn: `${BASE_URL}/`,                                                hreflangEs: `${BASE_URL}/es` },
    { path: "/es",                                lang: "es", title: "Reparación de Autos Fort Lauderdale y Wilton Manors | Todas las Marcas",                            desc: "Taller de confianza en Fort Lauderdale y Wilton Manors para todas las marcas y modelos. Mecánicos certificados ASE, especialistas en EV, garantía de 3 años, 2 ubicaciones.",                                                                                                               canonical: `${BASE_URL}/es`,                                              hreflangEn: `${BASE_URL}/`,                                                hreflangEs: `${BASE_URL}/es` },
    { path: "/services",                          lang: "en", title: "Services | Vertical Automotive Fort Lauderdale",                                                    desc: "Brakes, transmission, A/C, oil change, diagnostics, steering & EV service in Fort Lauderdale. ASE-certified. 36,000-mile / 36-month warranty.",                                                                                                                                        canonical: `${BASE_URL}/services`,                                        hreflangEn: `${BASE_URL}/services`,                                        hreflangEs: `${BASE_URL}/es/servicios` },
    { path: "/es/servicios",                      lang: "es", title: "Servicios | Vertical Automotive Fort Lauderdale",                                                   desc: "Frenos, transmisión, A/C, aceite, diagnósticos, dirección y servicio EV en Fort Lauderdale. Técnicos ASE. Garantía de 3 años.",                                                                                                                                                       canonical: `${BASE_URL}/es/servicios`,                                    hreflangEn: `${BASE_URL}/services`,                                        hreflangEs: `${BASE_URL}/es/servicios` },
    { path: "/offers",                            lang: "en", title: "Auto Repair Deals Fort Lauderdale | Coupons & Offers",                                              desc: "Save on your next visit with exclusive Vertical Automotive coupons. Free brake inspection, oil change deals, alignment discounts & more. Fort Lauderdale & Wilton Manors.",                                                                                                              canonical: `${BASE_URL}/offers`,                                          hreflangEn: `${BASE_URL}/offers`,                                          hreflangEs: `${BASE_URL}/es/ofertas` },
    { path: "/es/ofertas",                        lang: "es", title: "Cupones y Ofertas Auto Fort Lauderdale | Vertical Automotive",                                      desc: "Ahorre en su próxima visita con cupones exclusivos de Vertical Automotive. Inspección de frenos gratis, cambio de aceite, descuentos en alineación y más.",                                                                                                                              canonical: `${BASE_URL}/es/ofertas`,                                      hreflangEn: `${BASE_URL}/offers`,                                          hreflangEs: `${BASE_URL}/es/ofertas` },
    { path: "/about",                             lang: "en", title: "About Us | Vertical Automotive Fort Lauderdale",                                                    desc: "Family-owned ASE-certified auto repair since 1989 in Fort Lauderdale. 54,000+ vehicles repaired. Meet our expert team.",                                                                                                                                                              canonical: `${BASE_URL}/about`,                                           hreflangEn: `${BASE_URL}/about`,                                           hreflangEs: `${BASE_URL}/es/sobre-nosotros` },
    { path: "/es/sobre-nosotros",                 lang: "es", title: "Sobre Nosotros | Vertical Automotive Fort Lauderdale",                                              desc: "Taller familiar desde 1989 en Fort Lauderdale. Certificado ASE, más de 54,000 vehículos reparados. Conozca a nuestro equipo.",                                                                                                                                                        canonical: `${BASE_URL}/es/sobre-nosotros`,                               hreflangEn: `${BASE_URL}/about`,                                           hreflangEs: `${BASE_URL}/es/sobre-nosotros` },
    { path: "/about/gallery",                     lang: "en", title: "Gallery | Vertical Automotive",                                                                     desc: "See photos and videos of our shop, classic, European, and Japanese vehicles being serviced at Vertical Automotive, Fort Lauderdale.",                                                                                                                                                  canonical: `${BASE_URL}/about/gallery`,                                   hreflangEn: `${BASE_URL}/about/gallery`,                                   hreflangEs: `${BASE_URL}/es/sobre-nosotros/galeria` },
    { path: "/es/sobre-nosotros/galeria",         lang: "es", title: "Galería | Vertical Automotive",                                                                     desc: "Vea fotos y videos de nuestro taller, vehículos clásicos, europeos y japoneses en servicio en Vertical Automotive, Fort Lauderdale.",                                                                                                                                                  canonical: `${BASE_URL}/es/sobre-nosotros/galeria`,                       hreflangEn: `${BASE_URL}/about/gallery`,                                   hreflangEs: `${BASE_URL}/es/sobre-nosotros/galeria` },
    { path: "/services/faq",                      lang: "en", title: "FAQ | Vertical Automotive Fort Lauderdale",                                                         desc: "Answers to common questions about auto repair in Fort Lauderdale and Wilton Manors. Brakes, oil, A/C and more.",                                                                                                                                                                    canonical: `${BASE_URL}/services/faq`,                                    hreflangEn: `${BASE_URL}/services/faq`,                                    hreflangEs: `${BASE_URL}/es/servicios/preguntas-frecuentes` },
    { path: "/es/servicios/preguntas-frecuentes", lang: "es", title: "Preguntas Frecuentes | Vertical Automotive",                                                        desc: "Respuestas a preguntas frecuentes sobre reparación automotriz en Fort Lauderdale y Wilton Manors. Frenos, aceite, A/C y más.",                                                                                                                                                       canonical: `${BASE_URL}/es/servicios/preguntas-frecuentes`,               hreflangEn: `${BASE_URL}/services/faq`,                                    hreflangEs: `${BASE_URL}/es/servicios/preguntas-frecuentes` },
    { path: "/blog",                              lang: "en", title: "Auto Care Tips & Blog | Vertical Automotive",                                                       desc: "Maintenance tips, repair guides and auto news from the ASE technicians at Vertical Automotive in Fort Lauderdale.",                                                                                                                                                                 canonical: `${BASE_URL}/blog`,                                            hreflangEn: `${BASE_URL}/blog`,                                            hreflangEs: `${BASE_URL}/es/informacion` },
    { path: "/es/informacion",                    lang: "es", title: "Blog de Consejos Automotrices | Vertical Automotive",                                               desc: "Consejos de mantenimiento, guías de reparación y noticias automotrices de los técnicos ASE de Vertical Automotive en Fort Lauderdale.",                                                                                                                                              canonical: `${BASE_URL}/es/informacion`,                                  hreflangEn: `${BASE_URL}/blog`,                                            hreflangEs: `${BASE_URL}/es/informacion` },
    { path: "/contacts",                          lang: "en", title: "Contact Us | Vertical Automotive Fort Lauderdale",                                                  desc: "Contact us at our two locations in Wilton Manors and Fort Lauderdale. Call us or schedule your appointment online.",                                                                                                                                                                canonical: `${BASE_URL}/contacts`,                                        hreflangEn: `${BASE_URL}/contacts`,                                        hreflangEs: `${BASE_URL}/es/contactos` },
    { path: "/es/contactos",                      lang: "es", title: "Contacto | Vertical Automotive Fort Lauderdale",                                                    desc: "Contáctenos en nuestras dos ubicaciones en Wilton Manors y Fort Lauderdale. Llámenos o agende su cita en línea.",                                                                                                                                                                  canonical: `${BASE_URL}/es/contactos`,                                    hreflangEn: `${BASE_URL}/contacts`,                                        hreflangEs: `${BASE_URL}/es/contactos` },
    { path: "/service-guide",                     lang: "en", title: "Service Guide | Vertical Automotive - Complete Pricing & Services Reference",                       desc: "Complete auto repair pricing and services reference guide for Fort Lauderdale and Wilton Manors. Transparent pricing from Vertical Automotive.",                                                                                                                                     canonical: `${BASE_URL}/service-guide`,                                   hreflangEn: `${BASE_URL}/service-guide`,                                   hreflangEs: `${BASE_URL}/es/guia-de-servicios` },
    { path: "/es/guia-de-servicios",              lang: "es", title: "Guía de Servicios | Vertical Automotive - Referencia Completa de Precios",                         desc: "Guía completa de precios y servicios de reparación automotriz para Fort Lauderdale y Wilton Manors. Precios transparentes de Vertical Automotive.",                                                                                                                                  canonical: `${BASE_URL}/es/guia-de-servicios`,                            hreflangEn: `${BASE_URL}/service-guide`,                                   hreflangEs: `${BASE_URL}/es/guia-de-servicios` },
    { path: "/community",                         lang: "en", title: "Community & Partnerships | Vertical Automotive",                                                    desc: "Vertical Automotive has proudly served and supported the South Florida community since 1989. Learn about our sponsorships, local partnerships, and community involvement.",                                                                                                             canonical: `${BASE_URL}/community`,                                       hreflangEn: `${BASE_URL}/community`,                                       hreflangEs: `${BASE_URL}/community` },
    { path: "/press",                             lang: "en", title: "Press & Media | Vertical Automotive",                                                               desc: "Press and media resources for Vertical Automotive — Fort Lauderdale and Wilton Manors' most trusted auto repair shop since 1989.",                                                                                                                                                  canonical: `${BASE_URL}/press`,                                           hreflangEn: `${BASE_URL}/press`,                                           hreflangEs: `${BASE_URL}/press` },
    { path: "/fort-lauderdale-auto-repair-guide", lang: "en", title: "Complete Guide to Auto Repair in Fort Lauderdale | Vertical Automotive",                            desc: "Everything Fort Lauderdale drivers need to know about auto repair: how to choose a mechanic, read estimates, avoid scams, and maintain your car in South Florida's heat.",                                                                                                             canonical: `${BASE_URL}/fort-lauderdale-auto-repair-guide`,               hreflangEn: `${BASE_URL}/fort-lauderdale-auto-repair-guide`,               hreflangEs: `${BASE_URL}/fort-lauderdale-auto-repair-guide` },
    { path: "/car-maintenance-south-florida",     lang: "en", title: "Ultimate Car Maintenance Guide for South Florida Drivers | Vertical Automotive",                    desc: "Complete car maintenance guide for South Florida's heat and humidity. Covers all vehicle types: gas, European, Asian, hybrid, and EV.",                                                                                                                                                canonical: `${BASE_URL}/car-maintenance-south-florida`,                   hreflangEn: `${BASE_URL}/car-maintenance-south-florida`,                   hreflangEs: `${BASE_URL}/car-maintenance-south-florida` },
    { path: "/ev-hybrid-repair-fort-lauderdale",  lang: "en", title: "Hybrid & EV Repair in Fort Lauderdale | Vertical Automotive",                                       desc: "Expert hybrid and EV repair in Fort Lauderdale. Tesla, Toyota Prius, Honda Accord Hybrid, BMW i-series, and all major EV/hybrid platforms. ASE-certified technicians, 36-month warranty.",                                                                                           canonical: `${BASE_URL}/ev-hybrid-repair-fort-lauderdale`,                hreflangEn: `${BASE_URL}/ev-hybrid-repair-fort-lauderdale`,                hreflangEs: `${BASE_URL}/ev-hybrid-repair-fort-lauderdale` },
    { path: "/fort-lauderdale/auto-repair",       lang: "en", title: "Auto Repair Fort Lauderdale | Vertical Automotive — ASE-Certified",                                 desc: "Auto repair in Fort Lauderdale, FL. ASE-certified mechanics at 707 NE 11th Street. Serving Victoria Park, Las Olas, Flagler Village, Coral Ridge, and all of Broward County. 36-month warranty. Call (645) 216-2266.",                                                                  canonical: `${BASE_URL}/fort-lauderdale/auto-repair`,                     hreflangEn: `${BASE_URL}/fort-lauderdale/auto-repair`,                     hreflangEs: `${BASE_URL}/fort-lauderdale/auto-repair` },
    { path: "/wilton-manors/auto-repair",         lang: "en", title: "Auto Repair Wilton Manors | Vertical Automotive — ASE-Certified",                                   desc: "Auto repair in Wilton Manors, FL. ASE-certified mechanics at 1100 W Oakland Park Blvd. Serving Oakland Park, Sunrise, Lauderdale Lakes, and all of Broward County. 36-month warranty. Call (954) 565-1518.",                                                                           canonical: `${BASE_URL}/wilton-manors/auto-repair`,                       hreflangEn: `${BASE_URL}/wilton-manors/auto-repair`,                       hreflangEs: `${BASE_URL}/wilton-manors/auto-repair` },
    { path: "/fort-lauderdale",                   lang: "en", title: "Auto Repair Fort Lauderdale | Vertical Automotive",                                                 desc: "ASE-certified auto repair in Fort Lauderdale, FL. Tesla, European, Asian & Domestic specialists. 36-month / 36,000-mile warranty. Call (645) 216-2266.",                                                                                                                              canonical: `${BASE_URL}/fort-lauderdale`,                                 hreflangEn: `${BASE_URL}/fort-lauderdale`,                                 hreflangEs: `${BASE_URL}/es/fort-lauderdale` },
    { path: "/wilton-manors",                     lang: "en", title: "Auto Repair Wilton Manors | Vertical Automotive",                                                   desc: "ASE-certified auto repair in Wilton Manors, FL. Tesla, European, Asian & Domestic specialists. 36-month / 36,000-mile warranty. Call (954) 565-1518.",                                                                                                                              canonical: `${BASE_URL}/wilton-manors`,                                   hreflangEn: `${BASE_URL}/wilton-manors`,                                   hreflangEs: `${BASE_URL}/es/wilton-manors` },
    { path: "/es/fort-lauderdale",                lang: "es", title: "Reparación de Autos Fort Lauderdale | Vertical Automotive",                                         desc: "Reparación de autos certificada ASE en Fort Lauderdale, FL. Especialistas en Tesla, Europeos, Asiáticos y Domésticos. Garantía 36 meses / 36,000 millas. Llame (645) 216-2266.",                                                                                                     canonical: `${BASE_URL}/es/fort-lauderdale`,                              hreflangEn: `${BASE_URL}/fort-lauderdale`,                                 hreflangEs: `${BASE_URL}/es/fort-lauderdale` },
    { path: "/es/wilton-manors",                  lang: "es", title: "Reparación de Autos Wilton Manors | Vertical Automotive",                                           desc: "Reparación de autos certificada ASE en Wilton Manors, FL. Especialistas en Tesla, Europeos, Asiáticos y Domésticos. Garantía 36 meses / 36,000 millas. Llame (954) 565-1518.",                                                                                                     canonical: `${BASE_URL}/es/wilton-manors`,                                hreflangEn: `${BASE_URL}/wilton-manors`,                                   hreflangEs: `${BASE_URL}/es/wilton-manors` },
  ];

  routes.push(...staticPages);

  // ── City service pages ────────────────────────────────────────────────────
  for (const city of CITIES) {
    for (const svc of CITY_SERVICES) {
      const enPath = `/${city.city}/${svc.slug}`;
      const esPath = `/es/${city.city}/${svc.slug}`;
      routes.push({
        path: enPath,
        lang: "en",
        title: `${svc.name} in ${city.display}, FL | Vertical Automotive`,
        desc: `${svc.name} in ${city.display} at Vertical Automotive. ASE-certified, 3-year warranty. Call ${city.phone} or book online.`,
        canonical: `${BASE_URL}${enPath}`,
        hreflangEn: `${BASE_URL}${enPath}`,
        hreflangEs: `${BASE_URL}${esPath}`,
      });
      routes.push({
        path: esPath,
        lang: "es",
        title: `${svc.nameEs} en ${city.display}, FL | Vertical Automotive`,
        desc: `${svc.nameEs} en ${city.display} en Vertical Automotive. Certificado ASE, garantía 3 años. Llame ${city.phone} o reserve en línea.`,
        canonical: `${BASE_URL}${esPath}`,
        hreflangEn: `${BASE_URL}${enPath}`,
        hreflangEs: `${BASE_URL}${esPath}`,
      });
    }
  }

  // ── Blog articles ─────────────────────────────────────────────────────────
  for (const art of BLOG_EN) {
    routes.push({
      path: `/blog/${art.slug}`,
      lang: "en",
      title: art.title,
      desc: art.desc,
      canonical: `${BASE_URL}/blog/${art.slug}`,
      hreflangEn: `${BASE_URL}/blog/${art.slug}`,
      hreflangEs: null,
    });
  }
  for (const art of BLOG_ES) {
    routes.push({
      path: `/es/informacion/${art.slug}`,
      lang: "es",
      title: art.title,
      desc: art.desc,
      canonical: `${BASE_URL}/es/informacion/${art.slug}`,
      hreflangEn: null,
      hreflangEs: `${BASE_URL}/es/informacion/${art.slug}`,
    });
  }

  return routes;
}

// ─── HTML injection helpers ───────────────────────────────────────────────────
function esc(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildHreflang(hreflangEn, hreflangEs) {
  const parts = [];
  if (hreflangEn) parts.push(`<link rel="alternate" hreflang="en" href="${esc(hreflangEn)}">`);
  if (hreflangEs) parts.push(`<link rel="alternate" hreflang="es" href="${esc(hreflangEs)}">`);
  const defaultUrl = hreflangEn || hreflangEs;
  if (defaultUrl) parts.push(`<link rel="alternate" hreflang="x-default" href="${esc(defaultUrl)}">`);
  return parts.join("\n    ");
}

function injectMeta(html, route) {
  const { title, desc, canonical, hreflangEn, hreflangEs, lang } = route;
  const eTitle = esc(title);
  const eDesc = esc(desc);
  const eCanonical = esc(canonical);

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${eTitle}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${eDesc}"`
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${eCanonical}"`
  );

  // Replace hreflang block — matches from first hreflang to x-default
  const hreflangBlock = buildHreflang(hreflangEn, hreflangEs);
  html = html.replace(
    /<link rel="alternate" hreflang="en"[^>]*>[\s\S]*?<link rel="alternate" hreflang="x-default"[^>]*>/,
    hreflangBlock
  );

  // Replace OG tags
  html = html.replace(/<meta property="og:url" content="[^"]*"/, `<meta property="og:url" content="${eCanonical}"`);
  html = html.replace(/<meta property="og:title" content="[^"]*"/, `<meta property="og:title" content="${eTitle}"`);
  html = html.replace(/<meta property="og:description" content="[^"]*"/, `<meta property="og:description" content="${eDesc}"`);

  // Replace Twitter tags
  html = html.replace(/<meta name="twitter:title" content="[^"]*"/, `<meta name="twitter:title" content="${eTitle}"`);
  html = html.replace(/<meta name="twitter:description" content="[^"]*"/, `<meta name="twitter:description" content="${eDesc}"`);

  // Set lang attribute on <html>
  html = html.replace(/(<html[^>]*) lang="[^"]*"/, `$1 lang="${lang}"`);

  return html;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
function main() {
  const baseHtmlPath = join(DIST, "index.html");
  const baseHtml = readFileSync(baseHtmlPath, "utf-8");
  const routes = buildRoutes();

  console.log(`[Prerender] ${routes.length} routes to prerender (pure Node.js, no Chromium)\n`);

  let count = 0;
  let errors = 0;

  for (const route of routes) {
    try {
      const html = injectMeta(baseHtml, route);
      // Convert /path/to/page → dist/public/path/to/page/index.html
      const segments = route.path.replace(/^\//, "").split("/").filter(Boolean);
      const dir = segments.length > 0 ? join(DIST, ...segments) : DIST;
      mkdirSync(dir, { recursive: true });
      const outPath = join(dir, "index.html");
      writeFileSync(outPath, html, "utf-8");
      count++;
      console.log(`  ✓ ${route.path}`);
    } catch (err) {
      console.error(`  ✗ ${route.path}: ${err.message}`);
      errors++;
    }
  }

  console.log(`\n[Prerender] ✓ ${count} routes prerendered successfully (${errors} errors)\n`);

  if (errors > 0) {
    process.exit(1);
  }
}

main();
