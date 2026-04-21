import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Hashed assets (JS, CSS, images in /assets/) — content-addressed filenames
  // so they can be cached aggressively for 1 year with immutable directive.
  // The immutable directive tells browsers not to revalidate during max-age.
  // CDN-Cache-Control and Cloudflare-CDN-Cache-Control override Cloudflare's
  // default 90-day cache so the full 1-year immutable TTL is respected.
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
      setHeaders: (res) => {
        res.setHeader(
          "Cache-Control",
          "public, max-age=31536000, immutable"
        );
        // Cloudflare-specific: override the default 90-day edge TTL
        res.setHeader(
          "CDN-Cache-Control",
          "public, max-age=31536000, immutable"
        );
        res.setHeader(
          "Cloudflare-CDN-Cache-Control",
          "public, max-age=31536000, immutable"
        );
      },
    })
  );

  // Service Worker must be served with no-cache so browsers always get the latest version
  app.get("/sw.js", (_req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.setHeader("Service-Worker-Allowed", "/");
    res.sendFile(path.resolve(distPath, "sw.js"));
  });

  // All other static files (favicon, robots.txt, fonts, manifest, etc.)
  // Use a shorter TTL since these don't have content hashes
  app.use(
    express.static(distPath, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        // HTML files must never be cached — they reference hashed assets
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
        }
        // WOFF2 fonts in /fonts/ — long-lived cache since filenames are content-hashed
        if (filePath.includes("/fonts/") && (filePath.endsWith(".woff2") || filePath.endsWith(".woff"))) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          res.setHeader("CDN-Cache-Control", "public, max-age=31536000, immutable");
          res.setHeader("Cloudflare-CDN-Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // Prerendered HTML: serve per-route index.html if it exists.
  // This handles routes like /fort-lauderdale/tesla-ev-repair → dist/public/fort-lauderdale/tesla-ev-repair/index.html
  // Falls back to the root index.html for routes without a pre-built file (e.g., /admin, /404).
  app.use("*", (req, res) => {
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");

    // Normalize the path: strip query string, decode URI, remove trailing slash
    const rawPath = req.path || req.originalUrl.split("?")[0];
    const normalizedPath = rawPath.replace(/\/+$/, "") || "/";

    // Check for a pre-built HTML file for this route
    let prebuiltPath: string;
    if (normalizedPath === "/") {
      prebuiltPath = path.resolve(distPath, "index.html");
    } else {
      const routeSegment = normalizedPath.replace(/^\//, "");
      prebuiltPath = path.resolve(distPath, routeSegment, "index.html");
    }

    if (fs.existsSync(prebuiltPath)) {
      // Serve the pre-built HTML with unique metadata
      res.sendFile(prebuiltPath);
    } else {
      // Fall back to root index.html (SPA shell) for unknown routes
      res.sendFile(path.resolve(distPath, "index.html"));
    }
  });
}
