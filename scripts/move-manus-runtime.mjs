/**
 * Post-build script: runs AFTER all Vite plugins (including Critters) AND
 * after prerender.mjs to:
 * 1. Deduplicate CSS <link> tags (Critters can produce duplicates)
 * 2. Move the manus-runtime inline script to the very end of <body>
 *
 * IMPORTANT: Must run AFTER prerender.mjs because prerender.mjs overwrites
 * dist/public/index.html (the root "/" route), which would undo the move.
 *
 * This script processes ALL HTML files in dist/public/ recursively so that
 * every prerendered route also benefits from the manus-runtime deferral.
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
const DIST = path.resolve(__dirname, '../dist/public');

if (!fs.existsSync(DIST)) {
  console.warn('[post-build] dist/public/ not found, skipping.');
  process.exit(0);
}

// =============================================================================
// Collect all HTML files recursively
// =============================================================================
function findHtmlFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findHtmlFiles(full, results);
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = findHtmlFiles(DIST);
console.log(`[post-build] Processing ${htmlFiles.length} HTML file(s) in dist/public/`);

// =============================================================================
// Process each HTML file
// =============================================================================
const linkRegex = /<link\s[^>]*rel="stylesheet"[^>]*>/gi;
const scriptRegex = /<script\s+id="manus-runtime"[^>]*>[\s\S]*?<\/script>/;

let totalMoved = 0;
let totalSkipped = 0;

for (const htmlPath of htmlFiles) {
  let html = fs.readFileSync(htmlPath, 'utf-8');

  // --- Step 1: Deduplicate CSS link tags ---
  const allLinks = Array.from(html.matchAll(linkRegex));
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
    const score = (t) => {
      if (t.includes("onload=") && t.includes("this.media='all'")) return 2;
      if (t.includes("onload=")) return 1;
      return 0;
    };
    if (score(tag) > score(existing)) {
      bestByHref.set(href, tag);
    }
  }
  const hrefSeen = new Set();
  html = html.replace(linkRegex, (tag) => {
    const hrefMatch = tag.match(/href="([^"]+)"/);
    if (!hrefMatch) return tag;
    const href = hrefMatch[1];
    const best = bestByHref.get(href);
    if (!best) return tag;
    if (!hrefSeen.has(href)) {
      hrefSeen.add(href);
      return best;
    }
    return '';
  });

  // --- Step 2: Move manus-runtime inline script to the very end of <body> ---
  const match = html.match(scriptRegex);
  if (!match) {
    // No manus-runtime in this file — just save CSS dedup result
    fs.writeFileSync(htmlPath, html, 'utf-8');
    totalSkipped++;
    continue;
  }

  // Find the REAL closing </body> tag.
  // The minified JS bundle may contain "</body>" as a string literal inside JS,
  // so we cannot use lastIndexOf naively. Instead we find the last </body> that
  // is followed only by optional whitespace and </html>.
  // Strategy: find the last </body> that is followed by \s*</html> or \s*$
  const bodyCloseRegex = /<\/body>(?=\s*<\/html>|\s*$)/i;
  const bodyCloseMatch = html.match(bodyCloseRegex);
  if (!bodyCloseMatch) {
    // Fallback: just save what we have
    fs.writeFileSync(htmlPath, html, 'utf-8');
    totalSkipped++;
    continue;
  }

  const bodyClosePos = html.lastIndexOf(bodyCloseMatch[0]);

  // Check if manus-runtime is already near the end (within 2000 chars of </body>)
  const scriptPos = html.indexOf('id="manus-runtime"');
  if (scriptPos > bodyClosePos - 2000) {
    fs.writeFileSync(htmlPath, html, 'utf-8');
    totalSkipped++;
    continue;
  }

  // Remove from current position and insert just before the real </body>
  html = html.replace(scriptRegex, '');
  // Re-find the real </body> after removal
  const newBodyCloseMatch = html.match(/<\/body>(?=\s*<\/html>|\s*$)/i);
  if (!newBodyCloseMatch) {
    fs.writeFileSync(htmlPath, html, 'utf-8');
    totalSkipped++;
    continue;
  }
  const insertPos = html.lastIndexOf(newBodyCloseMatch[0]);
  html = html.slice(0, insertPos) + match[0] + '\n' + html.slice(insertPos);
  fs.writeFileSync(htmlPath, html, 'utf-8');
  totalMoved++;
}

console.log(`[post-build] manus-runtime moved to end of <body> in ${totalMoved} file(s). ${totalSkipped} file(s) skipped (already at end or no script).`);
console.log(`[post-build] CSS deduplication applied to all ${htmlFiles.length} file(s).`);
