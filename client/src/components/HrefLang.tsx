/**
 * HrefLang — Adds hreflang link tags for EN/ES alternate pages
 * Helps search engines understand the language relationship between pages
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useNavTranslation } from "@/hooks/useNavTranslation";

const BASE_URL = "https://verticalautomotive.com";

export default function HrefLang() {
  const [location] = useLocation();
  const { lang, getAlternatePath } = useNavTranslation();

  useEffect(() => {
    const enPath = lang === "en" ? location : getAlternatePath(location);
    const esPath = lang === "es" ? location : getAlternatePath(location);

    const enUrl = `${BASE_URL}${enPath === "/" ? "" : enPath}`;
    const esUrl = `${BASE_URL}${esPath}`;

    // Set or update hreflang="en"
    let enLink = document.querySelector('link[hreflang="en"]') as HTMLLinkElement | null;
    if (!enLink) {
      enLink = document.createElement("link");
      enLink.setAttribute("rel", "alternate");
      enLink.setAttribute("hreflang", "en");
      document.head.appendChild(enLink);
    }
    enLink.setAttribute("href", enUrl);

    // Set or update hreflang="es"
    let esLink = document.querySelector('link[hreflang="es"]') as HTMLLinkElement | null;
    if (!esLink) {
      esLink = document.createElement("link");
      esLink.setAttribute("rel", "alternate");
      esLink.setAttribute("hreflang", "es");
      document.head.appendChild(esLink);
    }
    esLink.setAttribute("href", esUrl);

    // Set or update hreflang="x-default"
    let defaultLink = document.querySelector('link[hreflang="x-default"]') as HTMLLinkElement | null;
    if (!defaultLink) {
      defaultLink = document.createElement("link");
      defaultLink.setAttribute("rel", "alternate");
      defaultLink.setAttribute("hreflang", "x-default");
      document.head.appendChild(defaultLink);
    }
    defaultLink.setAttribute("href", enUrl);

    return () => {
      // Don't remove — they'll be updated on next navigation
    };
  }, [location, lang, getAlternatePath]);

  return null;
}
