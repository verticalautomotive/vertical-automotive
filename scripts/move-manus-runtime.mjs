/**
 * Post-build script: runs AFTER all Vite plugins (including Critters) to:
 * 1. Deduplicate CSS <link> tags (Critters can produce duplicates)
 * 2. Move the manus-runtime inline script to the very end of <body>
 *
 * `defer` cannot be applied to inline scripts (HTML spec), so the only way to
 * make it non-blocking is to place it after all visible content has been parsed.
 *
 * Run via: node scripts/move-manus-runtime.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.resolve(__dirname, '../dist/public/index.html');

if (!fs.existsSync(htmlPath)) {
  console.warn('[post-build] dist/public/index.html not found, skipping.');
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, 'utf-8');

// =============================================================================
// Step 1: Deduplicate CSS link tags
// Critters adds an async version of each stylesheet link but keeps the original
// render-blocking version too. We want to keep only the BEST version per href:
//   - Prefer async (media="print" + onload="this.media='all'") over render-blocking
//   - Among async versions, prefer onload="this.media='all'" over onload="this.media='print'"
// =============================================================================
const linkRegex = /<link\s[^>]*rel="stylesheet"[^>]*>/gi;
const allLinks = Array.from(html.matchAll(linkRegex));

// Build a map: href -> best tag
const bestByHref = new Map();
for (const m of allLinks) {
  const tag = m[0];
  const hrefMatch = tag.match(/href="([^"]+)"/);
  if (!hrefMatch) continue;
  const href = hrefMatch[1];
  const existing = bestByHref.get(href);
  if (!existing) {
    bestByHref.set(href, tag);
    continue;
  }
  // Score: async with media='all' > async with media='print' > render-blocking
  const score = (t) => {
    if (t.includes("onload=") && t.includes("this.media='all'")) return 2;
    if (t.includes("onload=")) return 1;
    return 0;
  };
  if (score(tag) > score(existing)) {
    bestByHref.set(href, tag);
  }
}

// Replace all stylesheet links: keep best version on first occurrence, remove rest
const hrefSeen = new Set();
html = html.replace(linkRegex, (tag) => {
  const hrefMatch = tag.match(/href="([^"]+)"/);
  if (!hrefMatch) return tag;
  const href = hrefMatch[1];
  const best = bestByHref.get(href);
  if (!best) return tag;
  if (!hrefSeen.has(href)) {
    hrefSeen.add(href);
    return best; // Keep the best version on first occurrence
  }
  return ''; // Remove all subsequent occurrences
});

console.log(`[post-build] CSS deduplication: kept ${hrefSeen.size} unique stylesheet(s).`);
for (const [href, tag] of bestByHref) {
  const isAsync = tag.includes("onload=") && tag.includes("this.media='all'");
  console.log(`  ${isAsync ? '[async]' : '[BLOCKING]'} ${href}`);
}

// =============================================================================
// Step 2: Move manus-runtime inline script to the very end of <body>
// =============================================================================
const scriptRegex = /<script\s+id="manus-runtime"[^>]*>[\s\S]*?<\/script>/;
const match = html.match(scriptRegex);

if (!match) {
  console.warn('[post-build] manus-runtime script not found in HTML, skipping move.');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  process.exit(0);
}

// Check if it's already at the end (within 500 chars of </body>)
const bodyEnd = html.lastIndexOf('</body>');
const scriptPos = html.indexOf('id="manus-runtime"');
if (scriptPos > bodyEnd - 500) {
  console.log('[post-build] manus-runtime is already at end of body.');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  process.exit(0);
}

// Remove from current position and insert just before the LAST </body>
// (the built HTML contains </body> inside JS bundle strings, so we must
// use lastIndexOf to find the actual closing HTML tag, not a JS string)
html = html.replace(scriptRegex, '');
const lastBodyClose = html.lastIndexOf('</body>');
if (lastBodyClose === -1) {
  console.warn('[post-build] No </body> tag found in HTML, skipping.');
  fs.writeFileSync(htmlPath, html, 'utf-8');
  process.exit(0);
}
html = html.slice(0, lastBodyClose) + match[0] + '\n</body>' + html.slice(lastBodyClose + 7);
fs.writeFileSync(htmlPath, html, 'utf-8');

const newPos = html.indexOf('id="manus-runtime"');
const newBodyEnd = html.lastIndexOf('</body>');
const bodyStart = html.indexOf('<body');
const pct = ((newPos - bodyStart) / (newBodyEnd - bodyStart) * 100).toFixed(1);
console.log(`[post-build] Moved manus-runtime to ${pct}% through body (near end). Non-blocking.`);
