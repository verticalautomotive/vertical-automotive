/**
 * LanguageContext — Detects current language from URL path
 * /es/* routes = Spanish, everything else = English
 * Provides language state and helper functions for the entire app
 */
import { createContext, useContext, useMemo } from "react";
import { useLocation } from "wouter";

export type Language = "en" | "es";

interface LanguageContextType {
  lang: Language;
  isSpanish: boolean;
  /** Prefix for building links: "" for English, "/es" for Spanish */
  prefix: string;
  /** Get the equivalent URL in the other language */
  getAlternateUrl: (currentPath: string) => string;
  /** Get the Spanish equivalent path for an English path */
  toSpanishPath: (enPath: string) => string;
  /** Get the English equivalent path for a Spanish path */
  toEnglishPath: (esPath: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  isSpanish: false,
  prefix: "",
  getAlternateUrl: (p) => p,
  toSpanishPath: (p) => `/es${p}`,
  toEnglishPath: (p) => p.replace(/^\/es/, ""),
});

// Route mapping: English path segment -> Spanish path segment
const EN_TO_ES_ROUTES: Record<string, string> = {
  services: "servicios",
  offers: "ofertas",
  about: "sobre-nosotros",
  blog: "informacion",
};

const ES_TO_EN_ROUTES: Record<string, string> = Object.fromEntries(
  Object.entries(EN_TO_ES_ROUTES).map(([k, v]) => [v, k])
);

function toSpanishPath(enPath: string): string {
  if (enPath === "/" || enPath === "") return "/es";
  // Replace first path segment
  const parts = enPath.split("/").filter(Boolean);
  if (parts[0] && EN_TO_ES_ROUTES[parts[0]]) {
    parts[0] = EN_TO_ES_ROUTES[parts[0]];
  }
  return `/es/${parts.join("/")}`;
}

function toEnglishPath(esPath: string): string {
  // Remove /es prefix
  const withoutPrefix = esPath.replace(/^\/es\/?/, "/");
  if (withoutPrefix === "/" || withoutPrefix === "") return "/";
  const parts = withoutPrefix.split("/").filter(Boolean);
  if (parts[0] && ES_TO_EN_ROUTES[parts[0]]) {
    parts[0] = ES_TO_EN_ROUTES[parts[0]];
  }
  return `/${parts.join("/")}`;
}

function getAlternateUrl(currentPath: string): string {
  if (currentPath.startsWith("/es")) {
    return toEnglishPath(currentPath);
  }
  return toSpanishPath(currentPath);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const value = useMemo(() => {
    const isSpanish = location.startsWith("/es");
    return {
      lang: (isSpanish ? "es" : "en") as Language,
      isSpanish,
      prefix: isSpanish ? "/es" : "",
      getAlternateUrl,
      toSpanishPath,
      toEnglishPath,
    };
  }, [location]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export { toSpanishPath, toEnglishPath, getAlternateUrl, EN_TO_ES_ROUTES, ES_TO_EN_ROUTES };
