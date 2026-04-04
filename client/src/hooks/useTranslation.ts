/**
 * useTranslation — Returns the correct data set (EN or ES) based on current URL
 * Single hook that provides all translated data for any component
 */
import { useLocation } from "wouter";
import { useMemo } from "react";
import { SERVICES, VEHICLE_TYPES, OFFERS, COUPONS, ABOUT_CONTENT, COMPANY, SERVICES_PAGE_EXTRA } from "@/lib/data";
import {
  SERVICES_ES, VEHICLE_TYPES_ES, OFFERS_ES, COUPONS_ES, ABOUT_CONTENT_ES,
  COMPANY_ES, SERVICES_PAGE_EXTRA_ES, UI_ES,
} from "@/lib/data-es";

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
};
const BLOG_SLUG_ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(BLOG_SLUG_EN_TO_ES).map(([k, v]) => [v, k])
);

const ES_TO_EN: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_ES).map(([k, v]) => [v, k])
);

export function toSpanishPath(enPath: string): string {
  if (enPath === "/" || enPath === "") return "/es";
  // Special route: /services/faq -> /es/servicios/preguntas-frecuentes
  if (enPath === "/services/faq") return "/es/servicios/preguntas-frecuentes";
  const parts = enPath.replace(/^\//, "").split("/");
  if (parts[0] && EN_TO_ES[parts[0]]) {
    parts[0] = EN_TO_ES[parts[0]];
  }
  // Map blog article slugs
  if (parts[0] === "informacion" && parts[1] && BLOG_SLUG_EN_TO_ES[parts[1]]) {
    parts[1] = BLOG_SLUG_EN_TO_ES[parts[1]];
  }
  return `/es/${parts.join("/")}`;
}

export function toEnglishPath(esPath: string): string {
  const withoutPrefix = esPath.replace(/^\/es\/?/, "/");
  if (withoutPrefix === "/" || withoutPrefix === "") return "/";
  // Special route: /servicios/preguntas-frecuentes -> /services/faq
  if (withoutPrefix === "/servicios/preguntas-frecuentes") return "/services/faq";
  const parts = withoutPrefix.replace(/^\//, "").split("/");
  if (parts[0] && ES_TO_EN[parts[0]]) {
    parts[0] = ES_TO_EN[parts[0]];
  }
  // Map blog article slugs back to English
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

export function useTranslation() {
  const [location] = useLocation();

  return useMemo(() => {
    const isSpanish = location.startsWith("/es");
    const lang: Lang = isSpanish ? "es" : "en";
    const prefix = isSpanish ? "/es" : "";

    // Build service link prefix: /services/ for EN, /es/servicios/ for ES
    const servicesPath = isSpanish ? "/es/servicios" : "/services";

    return {
      lang,
      isSpanish,
      prefix,
      servicesPath,
      // Data
      services: isSpanish ? SERVICES_ES : SERVICES,
      vehicleTypes: isSpanish ? VEHICLE_TYPES_ES : VEHICLE_TYPES,
      offers: isSpanish ? OFFERS_ES : OFFERS,
      coupons: isSpanish ? COUPONS_ES : COUPONS,
      aboutContent: isSpanish ? ABOUT_CONTENT_ES : ABOUT_CONTENT,
      servicesPageExtra: isSpanish ? SERVICES_PAGE_EXTRA_ES : SERVICES_PAGE_EXTRA,
      companyOverrides: isSpanish ? COMPANY_ES : null,
      // UI strings
      ui: isSpanish ? UI_ES : null,
      // Alternate path
      getAlternatePath,
      toSpanishPath,
      toEnglishPath,
    };
  }, [location]);
}
