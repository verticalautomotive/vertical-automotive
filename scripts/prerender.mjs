#!/usr/bin/env node
/**
 * Prerender Script — Generates static HTML for all routes using Puppeteer
 *
 * Strategy:
 * 1. Start the production Express server on a random port
 * 2. Launch headless Chromium via Puppeteer
 * 3. Visit each route in parallel (concurrency = 5)
 * 4. Wait for React to hydrate (SEO component sets document.title)
 * 5. Capture the fully-rendered HTML (with unique title, meta, hreflang, canonical)
 * 6. Save each route as dist/public/{route}/index.html
 * 7. Shut down server and browser
 */

import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "net";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");
const DIST_PUBLIC = path.resolve(PROJECT_ROOT, "dist/public");

// ─── All routes to prerender ──────────────────────────────────────────────────

const SERVICE_SLUGS = [
  "tesla-ev-repair",
  "asian-vehicle-repair",
  "european-vehicle-repair",
  "domestic-vehicle-repair",
  "brake-repair",
  "transmission-service",
  "ac-repair",
  "engine-oil-service",
  "complete-diagnostics",
  "routine-maintenance",
  "steering-suspension",
  "fuel-system-service",
  "hybrid-ev-service",
  "wheel-alignment",
  "battery-charging-systems",
  "fleet-services",
  "tire-service",
];

const CITIES = ["fort-lauderdale", "wilton-manors"];

const BLOG_SLUGS = [
  "seasonal-car-care-south-florida",
  "oil-change-engine-best-friend",
  "brake-warning-signs",
  "ac-florida-summer-prep",
  "tire-care-pressure-rotation-alignment",
  "hybrid-ev-maintenance-guide",
  "check-engine-light-guide",
  "transmission-service-fluid-change",
  "fleet-vehicle-maintenance-schedules",
  "dashboard-warning-lights-guide",
  "tesla-ldu-rebuild-vs-replacement",
  "tesla-battery-degradation-range-loss",
  "tesla-ac-thermal-management-south-florida",
  "tesla-suspension-alignment-south-florida",
];

const BLOG_SLUGS_ES = [
  "cuidado-estacional-del-auto-sur-de-florida",
  "cambio-de-aceite-mejor-amigo-del-motor",
  "senales-de-advertencia-de-frenos",
  "preparar-ac-para-verano-florida",
  "cuidado-de-neumaticos-presion-rotacion-alineacion",
  "guia-mantenimiento-hibridos-ev",
  "guia-luz-check-engine",
  "servicio-de-transmision-cambio-de-fluido",
  "programas-mantenimiento-vehiculos-de-flota",
  "guia-luces-de-advertencia-del-tablero",
  "reconstruccion-vs-reemplazo-ldu-tesla",
  "degradacion-bateria-tesla-perdida-autonomia",
  "tesla-ac-gestion-termica-sur-de-florida",
  "tesla-suspension-alineacion-sur-de-florida",
];

const ROUTES = [
  "/",
  "/services",
  "/offers",
  "/about",
  "/about/gallery",
  "/services/faq",
  "/blog",
  "/contacts",
  "/service-guide",
  "/community",
  "/press",
  "/fort-lauderdale-auto-repair-guide",
  "/car-maintenance-south-florida",
  "/ev-hybrid-repair-fort-lauderdale",
  "/fort-lauderdale",
  "/fort-lauderdale/auto-repair",
  "/wilton-manors",
  "/wilton-manors/auto-repair",
  "/es",
  "/es/servicios",
  "/es/ofertas",
  "/es/sobre-nosotros",
  "/es/sobre-nosotros/galeria",
  "/es/servicios/preguntas-frecuentes",
  "/es/informacion",
  "/es/contactos",
  "/es/guia-de-servicios",
  "/es/fort-lauderdale",
  "/es/wilton-manors",
];

for (const city of CITIES) {
  for (const slug of SERVICE_SLUGS) {
    ROUTES.push(`/${city}/${slug}`);
    ROUTES.push(`/es/${city}/${slug}`);
  }
}

for (const slug of BLOG_SLUGS) {
  ROUTES.push(`/blog/${slug}`);
}
for (const slug of BLOG_SLUGS_ES) {
  ROUTES.push(`/es/informacion/${slug}`);
}

console.log(`[Prerender] ${ROUTES.length} routes to prerender`);

// ─── Utilities ────────────────────────────────────────────────────────────────

function findFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.listen(0, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on("error", reject);
  });
}

function routeToFilePath(route) {
  if (route === "/") return path.join(DIST_PUBLIC, "index.html");
  const clean = route.replace(/^\//, "").replace(/\/$/, "");
  return path.join(DIST_PUBLIC, clean, "index.html");
}

// Process routes in parallel with a concurrency limit
async function pMap(items, fn, concurrency = 5) {
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  const workers = Array.from({ length: concurrency }, worker);
  await Promise.all(workers);
  return results;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const port = await findFreePort();
  console.log(`[Prerender] Using port ${port}`);

  // Start production server
  console.log("[Prerender] Starting production server...");
  const serverProcess = spawn("node", ["dist/index.js"], {
    cwd: PROJECT_ROOT,
    env: { ...process.env, NODE_ENV: "production", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });

  serverProcess.stderr.on("data", (d) => {
    const msg = d.toString();
    if (!msg.includes("DeprecationWarning")) {
      process.stderr.write(`[Server] ${msg}`);
    }
  });

  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error("Server startup timeout")), 30000);
    serverProcess.stdout.on("data", (data) => {
      const msg = data.toString();
      if (msg.includes("Server running")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    serverProcess.on("error", reject);
  });
  console.log("[Prerender] Server ready");

  // Launch Puppeteer
  const { default: puppeteer } = await import("puppeteer");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--no-first-run",
      "--no-zygote",
      "--disable-extensions",
      "--disable-background-timer-throttling",
      "--disable-backgrounding-occluded-windows",
    ],
    headless: true,
  });

  console.log("[Prerender] Browser launched, starting parallel rendering...\n");

  let success = 0;
  let errors = 0;
  const errorList = [];

  await pMap(
    ROUTES,
    async (route) => {
      const url = `http://localhost:${port}${route}`;
      const outputPath = routeToFilePath(route);

      try {
        const page = await browser.newPage();

        // Block images, fonts, media to speed up rendering
        await page.setRequestInterception(true);
        page.on("request", (req) => {
          const type = req.resourceType();
          if (["image", "font", "media", "stylesheet"].includes(type)) {
            req.abort();
          } else {
            req.continue();
          }
        });

        // Navigate — use domcontentloaded (faster than networkidle0)
        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 20000,
        });

        // Wait for React to mount and SEO component to run
        // We check for a non-empty, non-default title
        await page
          .waitForFunction(
            () => {
              const title = document.title;
              return (
                title &&
                title !== "" &&
                title !== "Vite App" &&
                title !== "Vertical Automotive"
              );
            },
            { timeout: 8000 }
          )
          .catch(() => {
            // If title doesn't change, still capture whatever is rendered
          });

        // Small extra delay for all useEffects to flush
        await new Promise((r) => setTimeout(r, 300));

        // Get the fully rendered HTML
        let html = await page.content();

        await page.close();

        // Ensure output directory exists
        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, html, "utf-8");
        success++;
        const relPath = outputPath.replace(DIST_PUBLIC, "");
        console.log(`  ✓ ${route.padEnd(55)} → ${relPath}`);
      } catch (err) {
        errors++;
        errorList.push({ route, error: err.message });
        console.error(`  ✗ ${route}: ${err.message}`);
      }
    },
    5 // concurrency
  );

  await browser.close();
  serverProcess.kill("SIGTERM");

  console.log(`\n[Prerender] ─────────────────────────────────────────`);
  console.log(`[Prerender] ✓ ${success} routes prerendered successfully`);
  console.log(`[Prerender] ✗ ${errors} routes failed`);

  if (errorList.length > 0) {
    console.log("\nFailed routes:");
    errorList.forEach(({ route, error }) => console.log(`  - ${route}: ${error}`));
  }

  if (errors > success / 2) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("[Prerender] Fatal error:", err);
  process.exit(1);
});
