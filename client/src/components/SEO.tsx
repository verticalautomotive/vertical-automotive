/**
 * SEO Component — Sets per-page title, meta description, and Open Graph tags
 * Uses direct DOM manipulation (no external dependency needed)
 */
import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
}

function setMetaTag(name: string, content: string, attribute: string = "name") {
  let el = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({ title, description, canonical, ogImage }: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Meta description
    setMetaTag("description", description);

    // Open Graph
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:site_name", "Vertical Automotive", "property");

    if (ogImage) {
      setMetaTag("og:image", ogImage, "property");
    }

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

    // Canonical URL
    if (canonical) {
      setLinkTag("canonical", canonical);
    }

    // Cleanup: restore default title on unmount
    return () => {
      document.title = "Vertical Automotive - Full-Service Auto Repair Shop in Fort Lauderdale, FL";
    };
  }, [title, description, canonical, ogImage]);

  return null;
}
