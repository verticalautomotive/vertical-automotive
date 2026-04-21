#!/usr/bin/env node
/**
 * Metadata Patch Script
 *
 * For routes that Puppeteer couldn't render fast enough (lazy-loaded pages,
 * pages with Maps, etc.), this script directly injects the correct title and
 * meta description into the pre-built HTML file.
 *
 * Run after prerender.mjs to ensure 100% coverage.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_PUBLIC = path.resolve(__dirname, "..", "dist/public");

const DEFAULT_TITLES = [
  "Vertical Automotive | Auto Repair Fort Lauderdale",
  "Auto Repair Fort Lauderdale &amp; Wilton Manors | All Makes",
  "Auto Repair Fort Lauderdale & Wilton Manors | All Makes",
];

// Metadata for routes that commonly fail Puppeteer rendering
const ROUTE_METADATA = {
  // City landing pages with maps (slow to render)
  "/fort-lauderdale/auto-repair": {
    title: "Auto Repair Fort Lauderdale | Vertical Automotive — ASE-Certified",
    description:
      "Auto repair in Fort Lauderdale, FL. ASE-certified mechanics at 707 NE 11th Street. Serving Victoria Park, Las Olas, Flagler Village, Coral Ridge, and all of Broward County. 36-month warranty. Call (645) 216-2266.",
  },
  "/wilton-manors/auto-repair": {
    title: "Auto Repair Wilton Manors | Vertical Automotive — ASE-Certified",
    description:
      "Auto repair in Wilton Manors, FL. ASE-certified mechanics at 1100 W Oakland Park Blvd. Serving Wilton Manors, Oakland Park, Pompano Beach, and all of Broward County. 36-month warranty. Call (954) 565-1518.",
  },
  // Spanish city landing pages (LocationHub doesn't have ES metadata)
  "/es/fort-lauderdale": {
    title: "Reparación de Autos Fort Lauderdale | Vertical Automotive",
    description:
      "Reparación de autos certificada ASE en Fort Lauderdale, FL. Especialistas en Tesla, Europeos, Asiáticos y Domésticos. Garantía 36 meses. Llame (645) 216-2266.",
  },
  "/es/wilton-manors": {
    title: "Reparación de Autos Wilton Manors | Vertical Automotive",
    description:
      "Reparación de autos certificada ASE en Wilton Manors, FL. Especialistas en Tesla, Europeos, Asiáticos y Domésticos. Garantía 36 meses. Llame (954) 565-1518.",
  },
  // Spanish service guide (was showing English title)
  "/es/guia-de-servicios": {
    title: "Guía de Servicios | Vertical Automotive — Precios y Servicios",
    description:
      "Guía completa de servicios de Vertical Automotive. Precios, intervalos de mantenimiento, especialidades de vehículos y más. Referencia para conductores y sistemas de IA.",
  },
};

function routeToFilePath(route) {
  if (route === "/") return path.join(DIST_PUBLIC, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return path.join(DIST_PUBLIC, clean, "index.html");
}

function injectMetadata(html, title, description) {
  // Replace title tag
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);

  // Replace or add meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeHtml(description)}">`
    );
  } else {
    html = html.replace(
      "</title>",
      `</title>\n    <meta name="description" content="${escapeHtml(description)}">`
    );
  }

  // Update og:title
  html = html.replace(
    /(<meta property="og:title"[^>]*content=")[^"]*(")/,
    `$1${escapeHtml(title)}$2`
  );

  // Update og:description
  html = html.replace(
    /(<meta property="og:description"[^>]*content=")[^"]*(")/,
    `$1${escapeHtml(description)}$2`
  );

  // Update twitter:title
  html = html.replace(
    /(<meta name="twitter:title"[^>]*content=")[^"]*(")/,
    `$1${escapeHtml(title)}$2`
  );

  // Update twitter:description
  html = html.replace(
    /(<meta name="twitter:description"[^>]*content=")[^"]*(")/,
    `$1${escapeHtml(description)}$2`
  );

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCurrentTitle(html) {
  const match = html.match(/<title>([^<]*)<\/title>/);
  return match ? match[1] : "";
}

let patched = 0;
let skipped = 0;
let notFound = 0;

// Process explicit route overrides
for (const [route, meta] of Object.entries(ROUTE_METADATA)) {
  const filePath = routeToFilePath(route);
  if (!fs.existsSync(filePath)) {
    console.log(`  ⚠ Not found: ${route}`);
    notFound++;
    continue;
  }

  let html = fs.readFileSync(filePath, "utf-8");
  const currentTitle = getCurrentTitle(html);

  // Always patch explicit overrides (they may have wrong language)
  html = injectMetadata(html, meta.title, meta.description);
  fs.writeFileSync(filePath, html, "utf-8");
  console.log(`  ✓ Patched: ${route}`);
  console.log(`    Before: ${currentTitle}`);
  console.log(`    After:  ${meta.title}`);
  patched++;
}

// Also scan all HTML files and patch any that still have the default title
const allHtmlFiles = [];
function findHtmlFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(fullPath);
    } else if (entry.name === "index.html") {
      allHtmlFiles.push(fullPath);
    }
  }
}
findHtmlFiles(DIST_PUBLIC);

let stillGeneric = 0;
for (const filePath of allHtmlFiles) {
  const html = fs.readFileSync(filePath, "utf-8");
  const title = getCurrentTitle(html);
  if (DEFAULT_TITLES.includes(title)) {
    const route = filePath.replace(DIST_PUBLIC, "").replace("/index.html", "") || "/";
    // Skip homepage — its generic title IS correct
    if (route === "/") continue;
    console.log(`  ⚠ Still generic: ${route} → "${title}"`);
    stillGeneric++;
  }
}

console.log(`\n[Patch] ─────────────────────────────────────────`);
console.log(`[Patch] ✓ ${patched} routes patched`);
console.log(`[Patch] - ${skipped} routes skipped (already unique)`);
console.log(`[Patch] ⚠ ${notFound} routes not found`);
if (stillGeneric > 0) {
  console.log(`[Patch] ⚠ ${stillGeneric} routes still have generic titles (review needed)`);
}
