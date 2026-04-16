/**
 * useNavTranslation — Lightweight translation hook for Navigation component
 *
 * This is intentionally a MINIMAL version of useTranslation that does NOT
 * import data.ts or data-es.ts. Those files are 43KB + 64KB = 107KB and
 * would be hoisted into the index chunk (loaded on every page) because
 * Navigation is shared across all lazy-loaded pages.
 *
 * Only includes:
 * - isSpanish / lang / prefix detection
 * - Navigation UI strings (inline, no external data file)
 * - Path helper functions (toSpanishPath, toEnglishPath, getAlternatePath)
 */
import { useLocation } from "wouter";
import { useMemo } from "react";

export type Lang = "en" | "es";

// Route mapping: English path segment -> Spanish path segment
const EN_TO_ES: Record<string, string> = {
  services: "servicios",
  offers: "ofertas",
  about: "sobre-nosotros",
  blog: "informacion",
  "about/gallery": "sobre-nosotros/galeria",
  contacts: "contactos",
};

// Blog article slug mapping EN <-> ES
const BLOG_SLUG_EN_TO_ES: Record<string, string> = {
  "seasonal-car-care-south-florida": "cuidado-estacional-del-auto-sur-de-florida",
  "oil-change-engine-best-friend": "cambio-de-aceite-mejor-amigo-del-motor",
  "brake-warning-signs": "senales-de-advertencia-de-frenos",
  "ac-florida-summer-prep": "preparar-ac-para-verano-florida",
  "tire-care-pressure-rotation-alignment": "cuidado-de-neumaticos-presion-rotacion-alineacion",
  "hybrid-ev-maintenance-guide": "guia-mantenimiento-hibridos-ev",
  "check-engine-light-guide": "guia-luz-check-engine",
  "transmission-service-fluid-change": "servicio-de-transmision-cambio-de-fluido",
  "fleet-vehicle-maintenance-schedules": "programas-mantenimiento-vehiculos-de-flota",
  "dashboard-warning-lights-guide": "guia-luces-de-advertencia-del-tablero",
  "tesla-ldu-rebuild-vs-replacement": "reconstruccion-vs-reemplazo-ldu-tesla",
  "tesla-battery-degradation-range-loss": "degradacion-bateria-tesla-perdida-autonomia",
  "tesla-ac-thermal-management-south-florida": "tesla-ac-gestion-termica-sur-de-florida",
  "tesla-suspension-alignment-south-florida": "tesla-suspension-alineacion-sur-de-florida",
};
const BLOG_SLUG_ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(BLOG_SLUG_EN_TO_ES).map(([k, v]) => [v, k])
);

const ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_ES).map(([k, v]) => [v, k])
);

export function toSpanishPath(enPath: string): string {
  if (enPath === "/" || enPath === "") return "/es";
  if (enPath === "/services/faq") return "/es/servicios/preguntas-frecuentes";
  const parts = enPath.replace(/^\//, "").split("/");
  if (parts[0] && EN_TO_ES[parts[0]]) {
    parts[0] = EN_TO_ES[parts[0]];
  }
  if (parts[0] === "informacion" && parts[1] && BLOG_SLUG_EN_TO_ES[parts[1]]) {
    parts[1] = BLOG_SLUG_EN_TO_ES[parts[1]];
  }
  return `/es/${parts.join("/")}`;
}

export function toEnglishPath(esPath: string): string {
  const withoutPrefix = esPath.replace(/^\/es\/?/, "/");
  if (withoutPrefix === "/" || withoutPrefix === "") return "/";
  if (withoutPrefix === "/servicios/preguntas-frecuentes") return "/services/faq";
  const parts = withoutPrefix.replace(/^\//, "").split("/");
  if (parts[0] && ES_TO_EN[parts[0]]) {
    parts[0] = ES_TO_EN[parts[0]];
  }
  if (parts[0] === "blog" && parts[1] && BLOG_SLUG_ES_TO_EN[parts[1]]) {
    parts[1] = BLOG_SLUG_ES_TO_EN[parts[1]];
  }
  return `/${parts.join("/")}`;
}

export function getAlternatePath(currentPath: string): string {
  if (currentPath.startsWith("/es")) {
    return toEnglishPath(currentPath);
  }
  return toSpanishPath(currentPath);
}

// Inline nav + footer UI strings — avoids importing the full 64KB data-es.ts
const NAV_UI_ES = {
  service: "SERVICIOS",
  allServices: "TODOS LOS SERVICIOS",
  vehicleTypes: "Tipos de Vehículos",
  services: "Servicios",
  offers: "OFERTAS",
  aboutUs: "SOBRE NOSOTROS",
  reviews: "RESEÑAS",
  contacts: "CONTACTOS",
  info: "CONSEJOS",
  scheduleNow: "AGENDAR CITA",
};

const FOOTER_UI_ES = {
  description: "Mecánicos certificados ASE proporcionando servicio automotriz completo con",
  yearsExp: "años de experiencia.",
  aseCertified: "CERTIFICADO ASE",
  hours: "HORARIO",
  paySystem: "SISTEMA DE PAGO",
  allRights: "Todos los Derechos Reservados.",
  privacyPolicy: "Política de Privacidad",
  termsOfService: "Términos de Servicio",
};

// Minimal COMPANY_ES overrides needed by Footer
const COMPANY_ES_OVERRIDES = {
  tagline: "Servicio Automotriz Completo — ¡3 Años de Garantía!",
  testimonial: '"..Excelente servicio, buenos precios, gran experiencia. ¡5 estrellas!"',
  hours: "8:00 AM — 5:00 PM",
  closedDays: "SÁB-DOM Cerrado",
};

export function useNavTranslation() {
  const [location] = useLocation();

  return useMemo(() => {
    const isSpanish = location.startsWith("/es");
    const lang: Lang = isSpanish ? "es" : "en";
    const prefix = isSpanish ? "/es" : "";
    const servicesPath = isSpanish ? "/es/servicios" : "/services";

    return {
      lang,
      isSpanish,
      prefix,
      servicesPath,
      ui: isSpanish ? { nav: NAV_UI_ES, footer: FOOTER_UI_ES } : null,
      companyOverrides: isSpanish ? COMPANY_ES_OVERRIDES : null,
      getAlternatePath,
      toSpanishPath,
      toEnglishPath,
    };
  }, [location]);
}
