/**
 * Post-build script: moves the manus-runtime inline script to the very end of
 * <body> in the production HTML so it does not block the initial paint.
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
  console.warn('[move-manus-runtime] dist/public/index.html not found, skipping.');
  process.exit(0);
}

let html = fs.readFileSync(htmlPath, 'utf-8');

// Match the full inline manus-runtime script tag
const scriptRegex = /<script\s+id="manus-runtime"[^>]*>[\s\S]*?<\/script>/;
const match = html.match(scriptRegex);

if (!match) {
  console.warn('[move-manus-runtime] manus-runtime script not found in HTML, skipping.');
  process.exit(0);
}

// Check if it's already at the end (within 500 chars of </body>)
const bodyEnd = html.lastIndexOf('</body>');
const scriptPos = html.indexOf('id="manus-runtime"');
if (scriptPos > bodyEnd - 500) {
  console.log('[move-manus-runtime] manus-runtime is already at end of body, nothing to do.');
  process.exit(0);
}

// Remove from current position and insert just before the LAST </body>
// (the built HTML contains </body> inside JS bundle strings, so we must
// use lastIndexOf to find the actual closing HTML tag, not a JS string)
html = html.replace(scriptRegex, '');
const lastBodyClose = html.lastIndexOf('</body>');
if (lastBodyClose === -1) {
  console.warn('[move-manus-runtime] No </body> tag found in HTML, skipping.');
  process.exit(0);
}
html = html.slice(0, lastBodyClose) + match[0] + '\n</body>' + html.slice(lastBodyClose + 7);
fs.writeFileSync(htmlPath, html, 'utf-8');

const newPos = html.indexOf('id="manus-runtime"');
const newBodyEnd = html.lastIndexOf('</body>');
const bodyStart = html.indexOf('<body');
const pct = ((newPos - bodyStart) / (newBodyEnd - bodyStart) * 100).toFixed(1);
console.log(`[move-manus-runtime] Moved manus-runtime to ${pct}% through body (near end). Non-blocking.`);
