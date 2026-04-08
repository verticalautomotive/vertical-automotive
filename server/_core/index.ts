import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { runFullSync } from "../crawler";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);

// ─── Weekly knowledge sync cron job ───────────────────────────────────────────
// Runs once per week automatically. Manual sync is available via the admin UI.
const SYNC_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

async function scheduledSync() {
  console.log("[KnowledgeSync] Starting weekly scheduled website sync...");
  try {
    const result = await runFullSync();
    const ok = result.results.filter((r) => r.status === "ok").length;
    const fail = result.results.filter((r) => r.status === "error").length;
    console.log(`[KnowledgeSync] Weekly sync complete: ${ok} ok, ${fail} failed`);
  } catch (err) {
    console.error("[KnowledgeSync] Weekly sync failed:", err);
  }
}

// Repeat every 7 days — no startup sync (use admin panel for on-demand sync)
setInterval(scheduledSync, SYNC_INTERVAL_MS);
