import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// =============================================================================
// Manus Debug Collector - Vite Plugin
// Writes browser logs directly to files, trimmed when exceeding size limit
// =============================================================================

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024; // 1MB per log file
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6); // Trim to 60% to avoid constant re-trimming

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  try {
    if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) {
      return;
    }

    const lines = fs.readFileSync(logPath, "utf-8").split("\n");
    const keptLines: string[] = [];
    let keptBytes = 0;

    // Keep newest lines (from end) that fit within 60% of maxSize
    const targetSize = TRIM_TARGET_BYTES;
    for (let i = lines.length - 1; i >= 0; i--) {
      const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
      if (keptBytes + lineBytes > targetSize) break;
      keptLines.unshift(lines[i]);
      keptBytes += lineBytes;
    }

    fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
  } catch {
    /* ignore trim errors */
  }
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (entries.length === 0) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  // Format entries with timestamps
  const lines = entries.map((entry) => {
    const ts = new Date().toISOString();
    return `[${ts}] ${JSON.stringify(entry)}`;
  });

  // Append to log file
  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");

  // Trim if exceeds max size
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

/**
 * Vite plugin to collect browser debug logs
 * - POST /__manus__/logs: Browser sends logs, written directly to files
 * - Files: browserConsole.log, networkRequests.log, sessionReplay.log
 * - Auto-trimmed when exceeding 1MB (keeps newest entries)
 */
function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") {
        return html;
      }
      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      // POST /__manus__/logs: Browser sends logs (written directly to files)
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }

        const handlePayload = (payload: any) => {
          // Write logs directly to files
          if (payload.consoleLogs?.length > 0) {
            writeToLogFile("browserConsole", payload.consoleLogs);
          }
          if (payload.networkRequests?.length > 0) {
            writeToLogFile("networkRequests", payload.networkRequests);
          }
          if (payload.sessionEvents?.length > 0) {
            writeToLogFile("sessionReplay", payload.sessionEvents);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true }));
        };

        const reqBody = (req as { body?: unknown }).body;
        if (reqBody && typeof reqBody === "object") {
          try {
            handlePayload(reqBody);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            handlePayload(payload);
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

/**
 * Vite plugin to move the manus-runtime inline script to the very end of <body>.
 * The vite-plugin-manus-runtime injectTo:'body' option places it before app
 * bundle scripts, so it still blocks rendering. This plugin physically
 * relocates it to just before </body> in the final HTML output.
 */
function vitePluginManusRuntimeDefer(): Plugin {
  return {
    name: 'vite-plugin-manus-runtime-defer',
    apply: 'build',
    enforce: 'post',
    // Use writeBundle (runs after closeBundle and all file writes) to:
    // 1. Deduplicate CSS link tags (Critters can create duplicates)
    // 2. Move the manus-runtime inline script to the very end of <body>
    // Must run AFTER Critters (which uses closeBundle) to prevent it being reset.
    writeBundle() {
      const htmlPath = path.resolve(import.meta.dirname, 'dist/public/index.html');
      if (!fs.existsSync(htmlPath)) return;
      let html = fs.readFileSync(htmlPath, 'utf-8');

      // --- Step 1: Deduplicate CSS link tags ---
      // Critters can produce multiple <link rel="stylesheet"> tags for the same href.
      // Strategy: for each unique href, keep only the BEST version:
      //   - Prefer the async version (media="print" + onload) over render-blocking
      //   - Remove all duplicates
      const linkRegex = /<link\s[^>]*rel=["']stylesheet["'][^>]*>/gi;
      const linkMatches = Array.from(html.matchAll(linkRegex));
      const seenHrefs = new Map<string, string>(); // href -> best tag
      for (const m of linkMatches) {
        const tag = m[0];
        const hrefMatch = tag.match(/href=["']([^"']+)["']/);
        if (!hrefMatch) continue;
        const href = hrefMatch[1];
        const existing = seenHrefs.get(href);
        if (!existing) {
          seenHrefs.set(href, tag);
        } else {
          // Prefer async version (has onload attribute)
          const tagIsAsync = tag.includes('onload=');
          const existingIsAsync = existing.includes('onload=');
          if (tagIsAsync && !existingIsAsync) {
            seenHrefs.set(href, tag); // upgrade to async version
          }
          // Either way, mark this tag for removal (we'll keep only the best)
        }
      }
      // Remove ALL stylesheet link tags, then re-insert the best version for each href
      // We do this by replacing duplicates: keep first occurrence of best version, remove rest
      const hrefBestTag = new Map(seenHrefs); // href -> the one tag to keep
      const hrefSeen = new Set<string>();
      html = html.replace(linkRegex, (tag) => {
        const hrefMatch = tag.match(/href=["']([^"']+)["']/);
        if (!hrefMatch) return tag;
        const href = hrefMatch[1];
        const best = hrefBestTag.get(href);
        if (!best) return tag;
        if (!hrefSeen.has(href)) {
          hrefSeen.add(href);
          return best; // Keep the best version on first occurrence
        }
        return ''; // Remove all subsequent occurrences
      });
      console.log(`[manus-runtime-defer] Deduplicated CSS links. Kept: ${Array.from(hrefSeen).join(', ')}`);

      // --- Step 2: Move manus-runtime to end of <body> ---
      const scriptRegex = /<script\s+id="manus-runtime"[^>]*>[\s\S]*?<\/script>/;
      const match = html.match(scriptRegex);
      if (!match) {
        fs.writeFileSync(htmlPath, html, 'utf-8');
        return;
      }
      // Remove from current position and append just before the LAST </body>
      // (the built HTML contains </body> inside JS bundle strings, so we must
      // use lastIndexOf to find the actual closing HTML tag, not a JS string)
      html = html.replace(scriptRegex, '');
      const lastBodyClose = html.lastIndexOf('</body>');
      if (lastBodyClose === -1) {
        console.warn('[manus-runtime-defer] No </body> tag found in HTML, skipping.');
        fs.writeFileSync(htmlPath, html, 'utf-8');
        return;
      }
      html = html.slice(0, lastBodyClose) + match[0] + '\n</body>' + html.slice(lastBodyClose + 7);
      fs.writeFileSync(htmlPath, html, 'utf-8');
      console.log('[manus-runtime-defer] Moved manus-runtime script to end of <body>.');
    },
  };
}

/**
 * Vite plugin to inline critical CSS using Critters.
 * Runs post-build to extract above-the-fold CSS and inline it in the HTML,
 * converting the full CSS bundle to async loading.
 */
function vitePluginCriticalCSS(): Plugin {
  return {
    name: "vite-plugin-critical-css",
    apply: "build",
    enforce: "post",
    async closeBundle() {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const Critters = (await import("critters" as any)).default;
        const outDir = path.resolve(import.meta.dirname, "dist/public");
        const htmlPath = path.join(outDir, "index.html");

        if (!fs.existsSync(htmlPath)) {
          console.warn("[critical-css] index.html not found, skipping.");
          return;
        }

        const critters = new Critters({
          path: outDir,
          preload: "media",       // Use media="print" onload pattern
          inlineFonts: false,      // Don't inline font files
          compress: true,          // Minify inlined CSS
          pruneSource: false,      // Keep the full CSS file for non-critical styles
          reduceInlineStyles: true, // Remove unused inline styles
          mergeStylesheets: true,  // Merge multiple stylesheets
        });

        const html = fs.readFileSync(htmlPath, "utf-8");
        let inlined = await critters.process(html);

        // Move manus-runtime inline script to the very end of <body> so it
        // does not block the initial paint (defer cannot be used on inline scripts).
        const manusScriptRegex = /<script\s+id="manus-runtime"[^>]*>[\s\S]*?<\/script>/;
        const manusMatch = inlined.match(manusScriptRegex);
        if (manusMatch) {
          inlined = inlined.replace(manusScriptRegex, '');
          inlined = inlined.replace('</body>', `${manusMatch[0]}\n</body>`);
          console.log('[critical-css] Moved manus-runtime script to end of <body>.');
        }

        fs.writeFileSync(htmlPath, inlined, "utf-8");
        console.log("[critical-css] Critical CSS inlined successfully.");
      } catch (e) {
        console.warn("[critical-css] Failed to inline critical CSS:", e);
      }
    },
  };
}

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime({ injectTo: 'body' }), vitePluginManusDebugCollector(), vitePluginCriticalCSS(), vitePluginManusRuntimeDefer()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    cssCodeSplit: false, // Keep CSS in a single file for critters to process
    // Disable automatic modulepreload injection — we control which chunks get preloaded
    // via the custom plugin below. This prevents non-critical chunks (vendor-trpc, vendor-ui)
    // from being eagerly downloaded before they are actually needed.
    modulePreload: false,
    rollupOptions: {
      output: {
          manualChunks(id) {
          // Core React runtime — smallest possible first-load chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'vendor-react';
          }
          // tRPC + tanstack-query — only needed after hydration
          if (id.includes('@trpc') || id.includes('@tanstack')) {
            return 'vendor-trpc';
          }
          // Radix UI primitives + class-variance-authority — large, shared across all pages
          // Splitting these out means they are cached independently of app code changes
          if (id.includes('@radix-ui') || id.includes('class-variance-authority') || id.includes('cmdk')) {
            return 'vendor-ui';
          }
          // Lucide icons — large, tree-shake per page via lazy imports
          if (id.includes('lucide-react')) {
            return 'vendor-icons';
          }
          // Routing
          if (id.includes('wouter')) {
            return 'vendor-router';
          }
          // Superjson + date-fns — utility libraries
          if (id.includes('superjson') || id.includes('date-fns')) {
            return 'vendor-utils';
          }
          // City pages content — large data file, only needed on /fort-lauderdale/* and /wilton-manors/* routes
          if (id.includes('city-pages-content') || id.includes('city-pages.ts')) {
            return 'data-city-pages';
          }
          // Spanish translation data — only needed on /es/* routes (lazy-loaded by useTranslation)
          if (id.includes('data-es.ts') || id.includes('data-es/')) {
            return 'data-es';
          }
          // Blog articles — large content file, only needed on /blog/* routes
          if (id.includes('blog-articles')) {
            return 'data-blog';
          }
        },
      },
    },
    target: 'es2020', // Modern browsers only — no legacy polyfills
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
  },
  server: {
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
