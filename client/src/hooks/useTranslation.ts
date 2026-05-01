/**
 * useTranslation — Returns the correct data set (EN or ES) based on current URL
 * Single hook that provides all translated data for any component.
 *
 * PERFORMANCE: Spanish data (data-es.ts, ~19KB gzip) is dynamically imported
 * only when the user navigates to an /es route. English visitors never download it.
 */
import { useLocation } from "wouter";
import { useMemo, useState, useEffect } from "react";
import { SERVICES, VEHICLE_TYPES, OFFERS, COUPONS, ABOUT_CONTENT, COMPANY, SERVICES_PAGE_EXTRA } from "@/lib/data";
import type {
  SERVICES_ES as ServicesEsType,
  VEHICLE_TYPES_ES as VehicleTypesEsType,
  OFFERS_ES as OffersEsType,
  COUPONS_ES as CouponsEsType,
  ABOUT_CONTENT_ES as AboutContentEsType,
  COMPANY_ES as CompanyEsType,
  SERVICES_PAGE_EXTRA_ES as ServicesPageExtraEsType,
  UI_ES as UiEsType,
} from "@/lib/data-es";

export type Lang = "en" | "es";

// Cached Spanish data — loaded once, reused on subsequent /es navigations
let esDataCache: {
  SERVICES_ES: typeof ServicesEsType;
  VEHICLE_TYPES_ES: typeof VehicleTypesEsType;
  OFFERS_ES: typeof OffersEsType;
  COUPONS_ES: typeof CouponsEsType;
  ABOUT_CONTENT_ES: typeof AboutContentEsType;
  COMPANY_ES: typeof CompanyEsType;
  SERVICES_PAGE_EXTRA_ES: typeof ServicesPageExtraEsType;
  UI_ES: typeof UiEsType;
} | null = null;

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
  "european-car-service-wilton-manors-south-florida": "servicio-autos-europeos-wilton-manors-sur-florida",
  "porsche-911-maintenance-guide": "guia-mantenimiento-porsche-911",
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
  const isSpanish = location.startsWith("/es");

  // Spanish data state — null until loaded
  const [esData, setEsData] = useState(esDataCache);

  useEffect(() => {
    if (!isSpanish) return; // Don't load Spanish data for English visitors
    if (esDataCache) {
      setEsData(esDataCache);
      return;
    }
    // Dynamically import Spanish data only when needed
    import("@/lib/data-es").then((mod) => {
      esDataCache = {
        SERVICES_ES: mod.SERVICES_ES,
        VEHICLE_TYPES_ES: mod.VEHICLE_TYPES_ES,
        OFFERS_ES: mod.OFFERS_ES,
        COUPONS_ES: mod.COUPONS_ES,
        ABOUT_CONTENT_ES: mod.ABOUT_CONTENT_ES,
        COMPANY_ES: mod.COMPANY_ES,
        SERVICES_PAGE_EXTRA_ES: mod.SERVICES_PAGE_EXTRA_ES,
        UI_ES: mod.UI_ES,
      };
      setEsData(esDataCache);
    });
  }, [isSpanish]);

  return useMemo(() => {
    const lang: Lang = isSpanish ? "es" : "en";
    const prefix = isSpanish ? "/es" : "";

    // Build service link prefix: /services/ for EN, /es/servicios/ for ES
    const servicesPath = isSpanish ? "/es/servicios" : "/services";

    // While Spanish data is loading, fall back to English data
    // (avoids blank/broken UI during the brief async load)
    const es = esData;

    return {
      lang,
      isSpanish,
      prefix,
      servicesPath,
      // Data — falls back to EN while ES loads
      services: (isSpanish && es) ? es.SERVICES_ES : SERVICES,
      vehicleTypes: (isSpanish && es) ? es.VEHICLE_TYPES_ES : VEHICLE_TYPES,
      offers: (isSpanish && es) ? es.OFFERS_ES : OFFERS,
      coupons: (isSpanish && es) ? es.COUPONS_ES : COUPONS,
      aboutContent: (isSpanish && es) ? es.ABOUT_CONTENT_ES : ABOUT_CONTENT,
      servicesPageExtra: (isSpanish && es) ? es.SERVICES_PAGE_EXTRA_ES : SERVICES_PAGE_EXTRA,
      companyOverrides: (isSpanish && es) ? es.COMPANY_ES : null,
      // UI strings
      ui: (isSpanish && es) ? es.UI_ES : null,
      // Alternate path
      getAlternatePath,
      toSpanishPath,
      toEnglishPath,
    };
  }, [location, esData, isSpanish]);
}
