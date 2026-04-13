/**
 * Vertical Automotive AI Chatbot — "Shift"
 * Performance optimizations:
 *   1. System prompts are built ONCE at startup (or on first request) and cached in memory.
 *      loadKnowledgeFromDB() is NOT called on every chat request.
 *   2. Gemini streaming API is used — tokens are pushed to the client as they arrive via SSE.
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { loadKnowledgeFromDB } from "./crawler";
import type { Request, Response } from "express";

// ─── STATIC KNOWLEDGE (always included, no DB needed) ─────────────────────────
const STATIC_KNOWLEDGE = `
LOCATION DETAILS (CRITICAL — always use cross-street landmarks when asking which location is closer):

LOCATION 1 — Wilton Manors:
  Address: 1100 W Oakland Park Blvd Unit 5, Wilton Manors, FL 33311
  Landmarks: Oakland Park Blvd & I-95
  Phone: (954) 565-1518
  Email: contact@verticalautomotive.com
  Google Maps: https://maps.google.com/?q=1100+W+Oakland+Park+Blvd+Unit+5+Wilton+Manors+FL

LOCATION 2 — Fort Lauderdale:
  Address: 707 NE 11th Street, Fort Lauderdale, FL 33304
  Landmarks: Sunrise Blvd & US-1
  Phone: (645) 216-2266
  Email: ftlauderdale@verticalautomotive.com
  Google Maps: https://maps.google.com/?q=707+NE+11th+Street+Fort+Lauderdale+FL

Hours (both locations): Monday–Friday 8:00 AM – 5:00 PM, Closed weekends

SCHEDULING: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US

PRICING DATA:
INTERVAL / MAJOR SERVICE PACKAGES:
- 30k Mile Major Service: $450 - $750
- 60k Mile Major Service: $850 - $1,450
- 90k Mile Major Service: $1,100 - $1,850
- 120k Mile Major Service: $1,250 - $2,100

BRAKES:
- Brake Pads & Rotors (Per Axle): $550 - $950
- Brake Pad Replacement (Per Axle): $270 - $550
- Tesla Brake Caliper Clean/Lube: $150 - $225
- Brake Fluid Flush & Exchange: $155 - $275

MAINTENANCE:
- Full Synthetic Oil Change: $89.99 - $185
- Transmission Fluid Exchange: $285 - $495
- Coolant System Flush: $230 - $485
- Cabin & HEPA Filter Service: $99.99 - $250
- Spark Plug Replacement (4-Cylinder): $275 - $450
- Serpentine Belt Replacement: $245 - $395

REPAIR:
- Wheel Bearing/Hub Assembly: $550 - $950
- A/C Performance & Leak Test: $240 - $325
- Premium Battery Replacement: $240 - $450

DIAGNOSTICS:
- Diagnostic Scan & Health Report: $200 - $275

CURRENT OFFERS:
- $25 off first service for all new customers
- Every 3rd oil change free (loyalty program)
- Free Uber/Lyft ride with $500+ service
- Free wiper blades with $200+ services

ABOUT:
- ASE-certified auto repair shop in South Florida with 36 years of experience (since 1989)
- Specialists in Tesla, Asian, European, and Domestic vehicles
- 3-year / $5,000 warranty on all repairs
- 4.9 stars on Google with 500+ reviews
`;

const RULES_EN = `
=== CRITICAL RULES — FOLLOW THESE WITHOUT EXCEPTION ===

RULE 1 — ALWAYS GIVE THE FULL PRICE RANGE:
State BOTH the low AND high end. CORRECT: "$89.99 - $185". WRONG: "starts at $89.99".

RULE 2 — NEVER ESCALATE SIMPLE PRICING OR SERVICE QUESTIONS:
Do NOT add [NEEDS_HUMAN] for routine pricing, service, or scheduling questions. Answer them directly.

RULE 3 — COMPLETE YOUR SENTENCES: Never end a response mid-sentence.

RULE 4 — WHEN TO USE [NEEDS_HUMAN]:
ONLY for: specific noise/symptom/warning light needing physical inspection, billing dispute, warranty claim on past repair, complex multi-part quote, complaint, or explicit request to speak to a person.

RULE 5 — FORMAT: Keep responses to 2-4 sentences. Use "$X - $Y" for prices.

RULE 6 — LOCATION ROUTING:
When a customer needs to book or call, ALWAYS ask which location is closer using the cross-street landmarks:
"Which location is more convenient for you?
📍 Wilton Manors — Oakland Park Blvd & I-95 → (954) 565-1518
📍 Fort Lauderdale — Sunrise Blvd & US-1 → (645) 216-2266"
Then recommend the phone number for that location.
Route lead emails: Wilton Manors → contact@verticalautomotive.com | Fort Lauderdale → ftlauderdale@verticalautomotive.com

RULE 7 — LEAD CAPTURE:
When a customer provides their name and phone number, acknowledge warmly and confirm someone will reach out.

RULE 8 — APPOINTMENT BOOKING FLOW:
Step 1: What service do they need?
Step 2: Which location is closer? (use cross-street landmarks above)
Step 3: Recommend the correct phone for that location.
Step 4: Preferred day and time?
Step 5: Name, phone, vehicle year/make/model?
Step 6: Share the scheduling link.
`;

const RULES_ES = `
=== REGLAS CRÍTICAS — SEGUIR SIN EXCEPCIÓN ===

REGLA 1 — SIEMPRE DAR EL RANGO COMPLETO DE PRECIOS:
Indica TANTO el límite inferior COMO el superior. CORRECTO: "$89.99 - $185". INCORRECTO: "comienza en $89.99".

REGLA 2 — NUNCA ESCALAR PREGUNTAS SIMPLES: No agregues [NEEDS_HUMAN] para preguntas rutinarias de precios o servicios.

REGLA 3 — COMPLETA TUS ORACIONES: Nunca termines a mitad de oración.

REGLA 4 — CUÁNDO USAR [NEEDS_HUMAN]:
SOLO para: ruido/síntoma/luz de advertencia específica, disputa de facturación, reclamo de garantía, cotización compleja, queja, o solicitud explícita de hablar con una persona.

REGLA 5 — FORMATO: Respuestas de 2-4 oraciones. Usa "$X - $Y" para precios.

REGLA 6 — ENRUTAMIENTO POR UBICACIÓN:
Cuando el cliente necesite reservar o llamar, SIEMPRE pregunta cuál ubicación le queda más cerca usando las calles de referencia:
"¿Cuál ubicación te queda más cerca?
📍 Wilton Manors — Oakland Park Blvd & I-95 → (954) 565-1518
📍 Fort Lauderdale — Sunrise Blvd & US-1 → (645) 216-2266"
Luego recomienda el teléfono de esa ubicación.
Emails: Wilton Manors → contact@verticalautomotive.com | Fort Lauderdale → ftlauderdale@verticalautomotive.com

REGLA 7 — CAPTURA DE CLIENTES: Cuando el cliente dé su nombre y teléfono, confírmalo calurosamente.

REGLA 8 — FLUJO DE CITAS:
Paso 1: ¿Qué servicio necesita?
Paso 2: ¿Cuál ubicación le queda más cerca? (usa las calles de referencia)
Paso 3: Recomienda el teléfono correcto.
Paso 4: ¿Día y hora preferidos?
Paso 5: Nombre, teléfono, año/marca/modelo del vehículo.
Paso 6: Comparte el enlace de programación.
`;

// ─── SYSTEM PROMPT CACHE ──────────────────────────────────────────────────────
// Built once at startup (or first request). Never rebuilt per-request.
const promptCache: { en: string | null; es: string | null; builtAt: number } = {
  en: null,
  es: null,
  builtAt: 0,
};

// Cache TTL: 1 hour (allows DB knowledge to refresh without restart)
const CACHE_TTL_MS = 60 * 60 * 1000;

function buildBasePrompt(lang: "en" | "es", liveKnowledge: string): string {
  const liveSection = liveKnowledge.length > 100
    ? `\nLIVE KNOWLEDGE FROM WEBSITE (use as primary source):\n${liveKnowledge}\n`
    : "";

  if (lang === "es") {
    return `Eres "Shift", el asistente de IA amigable de Vertical Automotive — un taller de reparación de autos certificado ASE de confianza en el sur de Florida con 36 años de experiencia.

Tu trabajo: responder preguntas sobre servicios y precios, ayudar a reservar citas, y capturar clientes potenciales para el equipo. Sé amigable, seguro y útil como un asesor de servicio — no un robot.
${liveSection}
CONOCIMIENTO ESTÁTICO:
${STATIC_KNOWLEDGE}
${RULES_ES}`;
  }

  return `You are "Shift", the friendly AI assistant for Vertical Automotive — a trusted ASE-certified auto repair shop in South Florida with 36 years of experience.

Your job: answer questions about services and pricing, help book appointments, and capture leads for the team. Be friendly, confident, and helpful like a service advisor — not a robot.
${liveSection}
STATIC KNOWLEDGE:
${STATIC_KNOWLEDGE}
${RULES_EN}`;
}

async function getSystemPrompt(lang: "en" | "es"): Promise<string> {
  const now = Date.now();
  const expired = now - promptCache.builtAt > CACHE_TTL_MS;

  if (!expired && promptCache[lang]) {
    return promptCache[lang]!;
  }

  // Rebuild cache (runs once per hour max)
  console.log("[Chatbot] Rebuilding system prompt cache...");
  const liveKnowledge = await loadKnowledgeFromDB();
  promptCache.en = buildBasePrompt("en", liveKnowledge);
  promptCache.es = buildBasePrompt("es", liveKnowledge);
  promptCache.builtAt = now;
  console.log(`[Chatbot] System prompt cache built (live knowledge: ${liveKnowledge.length} chars)`);

  return promptCache[lang]!;
}

/**
 * Warm the cache at server startup so the first user request is instant.
 */
export async function warmChatbotCache(): Promise<void> {
  try {
    await getSystemPrompt("en");
    console.log("[Chatbot] System prompt cache warmed at startup");
  } catch (err) {
    console.warn("[Chatbot] Cache warm failed (will retry on first request):", err);
  }
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type ChatMessage = { role: "user" | "assistant"; content: string };

// ─── NON-STREAMING (tRPC mutation — kept for fallback) ────────────────────────
async function callGeminiOnce(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<{ reply: string; needsHuman: boolean }> {
  const apiKey = ENV.shiftApiKey;
  if (!apiKey) throw new Error("Shift API key not configured");

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024, topP: 0.85 },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error("[Gemini API Error]", response.status, err);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    error?: { message: string };
  };

  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("No response from Gemini");

  const needsHuman = rawText.includes("[NEEDS_HUMAN]");
  return { reply: rawText.replace(/\[NEEDS_HUMAN\]/g, "").trim(), needsHuman };
}

// ─── STREAMING SSE HANDLER (Express route) ────────────────────────────────────
/**
 * POST /api/chat/stream
 * Body: { messages: ChatMessage[], lang: "en" | "es" }
 * Response: text/event-stream
 *   data: {"token":"..."}\n\n   — for each token chunk
 *   data: {"done":true,"needsHuman":false}\n\n  — final event
 */
export async function handleChatStream(req: Request, res: Response): Promise<void> {
  const apiKey = ENV.shiftApiKey;
  if (!apiKey) {
    res.status(500).json({ error: "API key not configured" });
    return;
  }

  const { messages, lang = "en" } = req.body as {
    messages: ChatMessage[];
    lang?: "en" | "es";
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages required" });
    return;
  }

  // Set SSE headers
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();

  const sendEvent = (data: object) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  };

  try {
    // Use cached system prompt — no DB call here
    const systemPrompt = await getSystemPrompt(lang as "en" | "es");

    const contents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:streamGenerateContent?alt=sse&key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 1024, topP: 0.85 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("[Gemini Stream Error]", geminiRes.status, errText);
      sendEvent({ error: `Gemini error: ${geminiRes.status}` });
      res.end();
      return;
    }

    // Parse the SSE stream from Gemini and forward tokens to the client
    const reader = geminiRes.body?.getReader();
    if (!reader) {
      sendEvent({ error: "No stream body" });
      res.end();
      return;
    }

    const decoder = new TextDecoder();
    let buffer = "";
    let fullText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === "[DONE]") continue;

        try {
          const chunk = JSON.parse(jsonStr) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          const token = chunk.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (token) {
            fullText += token;
            sendEvent({ token });
          }
        } catch {
          // Malformed chunk — skip
        }
      }
    }

    const needsHuman = fullText.includes("[NEEDS_HUMAN]");
    sendEvent({ done: true, needsHuman });
    res.end();
  } catch (err) {
    console.error("[Chat Stream Error]", err);
    sendEvent({ error: "Technical issue" });
    res.end();
  }
}

// ─── tRPC ROUTER (non-streaming fallback) ─────────────────────────────────────
export const chatbotRouter = router({
  chat: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["user", "assistant"]),
            content: z.string().max(2000),
          })
        ).max(20),
        lang: z.enum(["en", "es"]).default("en"),
      })
    )
    .mutation(async ({ input }) => {
      try {
        // Use cached system prompt — no DB call per request
        const systemPrompt = await getSystemPrompt(input.lang);
        const { reply, needsHuman } = await callGeminiOnce(input.messages, systemPrompt);
        return { success: true, reply, needsHuman };
      } catch (error) {
        console.error("[Chatbot Error]", error);
        const errorMsg = input.lang === "es"
          ? "Lo siento, tuve un problema técnico momentáneo. Por favor intenta de nuevo, o llama al (954) 565-1518."
          : "Sorry, I had a momentary technical issue. Please try again, or call us at (954) 565-1518.";
        return { success: false, reply: errorMsg, needsHuman: false };
      }
    }),
});
