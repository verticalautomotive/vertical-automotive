/**
 * Website Crawler for Shift AI Knowledge Base
 * Crawls key pages of verticalautomotive.com, extracts structured knowledge
 * using Gemini, and stores it in the knowledge_base table.
 */
import { getDb } from "./db";
import { knowledgeBase } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import { ENV } from "./_core/env";

// Pages to crawl — section name + URL
const CRAWL_TARGETS = [
  { section: "services_pricing", url: "https://www.verticalautomotive.com/service-guide" },
  { section: "services", url: "https://www.verticalautomotive.com/services" },
  { section: "pricing", url: "https://www.verticalautomotive.com/services" },
  { section: "offers", url: "https://www.verticalautomotive.com/offers" },
  { section: "about", url: "https://www.verticalautomotive.com/about-us" },
  { section: "contact", url: "https://www.verticalautomotive.com/contacts" },
  { section: "homepage", url: "https://www.verticalautomotive.com/" },
];

// Extraction prompts per section — tells Gemini what to pull out
const EXTRACTION_PROMPTS: Record<string, string> = {
  services_pricing: `Extract COMPLETE service guide information from this page. Include: (1) All maintenance services with pricing ranges, (2) All major services (30k, 60k, 90k, 120k mile) with pricing, (3) MAINTENANCE INTERVALS - list EVERY interval mentioned starting from 1000 miles, (4) Company info, locations, hours, specialties, (5) Warranty details. Be exhaustive and include all numbers and intervals.`,

  services: `Extract all auto repair and maintenance services listed on this page. 
For each service, include: service name, brief description, and any pricing if shown.
Format as a clean list. Be thorough — include every service mentioned.`,

  pricing: `Extract all pricing information from this page.
For each service with a price, list: service name and price range (e.g. "$89.99 - $185").
If no prices are shown, state that explicitly.
Format as a clean list.`,

  offers: `Extract all current promotions, discounts, and special offers from this page.
For each offer: title, discount amount or value, and any conditions or expiry.
Format as a clean list.`,

  about: `Extract key facts about the company from this page:
- Years in business / founding year
- Certifications (ASE, etc.)
- Specializations (Tesla, European, Asian, Domestic, EV, etc.)
- Warranty information
- Number of locations
- Any awards or recognition
Format as a clean factual summary.`,

  contact: `Extract all contact information from this page:
- All phone numbers with their location labels
- All addresses with city/state/zip
- Business hours
- Any text/SMS numbers
Format as a clean structured list.`,

  homepage: `Extract the key value propositions and highlights from this homepage:
- Main tagline or headline
- Key differentiators (warranty, experience, certifications)
- Any stats (years experience, vehicles repaired, review rating, review count)
- Vehicle types served
Format as a clean summary.`,
};

/**
 * Fetch a URL and return clean text content (strips HTML tags)
 */
async function fetchPageText(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; VerticalAutoShiftBot/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} fetching ${url}`);
  }

  const html = await response.text();

  // Strip scripts, styles, and HTML tags to get readable text
  const stripped = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s{3,}/g, "\n\n")
    .trim();

  // Limit to 8000 chars to stay within Gemini token budget
  return stripped.slice(0, 8000);
}

/**
 * Use Gemini to extract structured knowledge from raw page text
 */
async function extractKnowledge(
  pageText: string,
  section: string,
  sourceUrl: string
): Promise<string> {
  const apiKey = ENV.geminiApiKey;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const extractionPrompt = EXTRACTION_PROMPTS[section] ?? 
    "Extract all useful information from this page that would help answer customer questions about auto repair services.";

  const requestBody = {
    system_instruction: {
      parts: [{
        text: `You are a data extraction assistant. Extract specific information from webpage text as instructed. 
Be concise and factual. Only include information actually present in the text — do not invent or assume.
Source URL: ${sourceUrl}`
      }]
    },
    contents: [{
      role: "user",
      parts: [{
        text: `${extractionPrompt}\n\n=== PAGE TEXT ===\n${pageText}`
      }]
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 1024,
    }
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
      signal: AbortSignal.timeout(30000),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini extraction error: ${response.status}`);
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    error?: { message: string };
  };

  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No extraction result from Gemini");

  return text.trim();
}

/**
 * Crawl a single page, extract knowledge, and upsert into DB
 */
async function crawlAndStore(
  section: string,
  url: string
): Promise<{ section: string; status: "ok" | "error"; message: string }> {
  const db = await getDb();
  if (!db) return { section, status: "error", message: "DB not available" };

  try {
    console.log(`[Crawler] Crawling ${section}: ${url}`);
    const pageText = await fetchPageText(url);
    const knowledge = await extractKnowledge(pageText, section, url);

    // Upsert into knowledge_base
    await db
      .insert(knowledgeBase)
      .values({
        section,
        sourceUrl: url,
        content: knowledge,
        syncedAt: new Date(),
        lastStatus: "ok",
      })
      .onDuplicateKeyUpdate({
        set: {
          content: knowledge,
          sourceUrl: url,
          syncedAt: new Date(),
          lastStatus: "ok",
        },
      });

    console.log(`[Crawler] ✓ ${section} synced (${knowledge.length} chars)`);
    return { section, status: "ok", message: `${knowledge.length} chars extracted` };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error(`[Crawler] ✗ ${section} failed:`, errMsg);

    // Update status to error in DB
    try {
      await db
        .insert(knowledgeBase)
        .values({
          section,
          sourceUrl: url,
          content: "",
          syncedAt: new Date(),
          lastStatus: `error: ${errMsg.slice(0, 50)}`,
        })
        .onDuplicateKeyUpdate({
          set: {
            lastStatus: `error: ${errMsg.slice(0, 50)}`,
            syncedAt: new Date(),
          },
        });
    } catch { /* ignore secondary error */ }

    return { section, status: "error", message: errMsg };
  }
}

/**
 * Run a full sync of all pages — called by the tRPC endpoint and cron job
 */
export async function runFullSync(): Promise<{
  results: Array<{ section: string; status: "ok" | "error"; message: string }>;
  syncedAt: Date;
}> {
  const results = [];
  for (const target of CRAWL_TARGETS) {
    const result = await crawlAndStore(target.section, target.url);
    results.push(result);
    // Small delay between requests to be polite to the server
    await new Promise((r) => setTimeout(r, 1000));
  }
  return { results, syncedAt: new Date() };
}

/**
 * Load all knowledge from DB and format as a system prompt section
 */
export async function loadKnowledgeFromDB(): Promise<string> {
  const db = await getDb();
  if (!db) return "";

  try {
    const rows = await db
      .select()
      .from(knowledgeBase)
      .where(eq(knowledgeBase.lastStatus, "ok"));

    if (rows.length === 0) return "";

    const sections = rows
      .map((row) => `=== ${row.section.toUpperCase()} (from ${row.sourceUrl}) ===\n${row.content}`)
      .join("\n\n");

    const latestSync = rows.reduce((latest, row) =>
      row.syncedAt > latest ? row.syncedAt : latest,
      rows[0].syncedAt
    );

    return `LIVE KNOWLEDGE BASE (last synced: ${latestSync.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}):\n\n${sections}`;
  } catch (err) {
    console.error("[Crawler] Failed to load knowledge from DB:", err);
    return "";
  }
}

/**
 * Get sync status for all sections
 */
export async function getSyncStatus() {
  const db = await getDb();
  if (!db) return [];

  try {
    return await db.select().from(knowledgeBase);
  } catch {
    return [];
  }
}
