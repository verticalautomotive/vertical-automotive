/**
 * SEO Component — Sets per-page title, meta description, Open Graph tags, canonical, and hreflang
 * Uses direct DOM manipulation (no external dependency needed)
 */
import { useEffect } from "react";

interface HreflangPair {
  hreflang: string;
  href: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  keywords?: string;
  /** hreflang alternate links — pass EN, ES, and x-default pairs */
  hreflangLinks?: HreflangPair[];
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

/** Manage a set of hreflang <link rel="alternate"> tags keyed by hreflang value */
function setHreflangTags(pairs: HreflangPair[]) {
  // Remove any previously injected hreflang tags
  document
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());

  pairs.forEach(({ hreflang, href }) => {
    const el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", hreflang);
    el.setAttribute("href", href);
    document.head.appendChild(el);
  });
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  keywords,
  hreflangLinks,
}: SEOProps) {
  useEffect(() => {
    // Page title
    document.title = title;

    // Meta description
    setMetaTag("description", description);

    // Meta keywords
    if (keywords) {
      setMetaTag("keywords", keywords);
    }

    // Open Graph
    setMetaTag("og:title", title, "property");
    setMetaTag("og:description", description, "property");
    setMetaTag("og:type", "website", "property");
    setMetaTag("og:site_name", "Vertical Automotive", "property");

    if (canonical) {
      setMetaTag("og:url", canonical, "property");
    }

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

    // hreflang alternate links
    if (hreflangLinks && hreflangLinks.length > 0) {
      setHreflangTags(hreflangLinks);
    } else {
      // Clean up any leftover hreflang tags from previous page
      document
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((el) => el.remove());
    }

    // Cleanup: restore default title on unmount
    return () => {
      document.title = "Auto Repair Fort Lauderdale & Wilton Manors | All Makes";
      // Remove hreflang tags on unmount
      document
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((el) => el.remove());
    };
  }, [title, description, canonical, ogImage, keywords, hreflangLinks]);

  return null;
}
