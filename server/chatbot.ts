/**
 * Ask Shift AI Chatbot Router
 * Uses Google Gemini API for AI responses about Vertical Automotive services.
 * Knowledge is loaded from the DB (auto-synced from website) with a hardcoded fallback.
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";
import { loadKnowledgeFromDB } from "./crawler";

// ─── FALLBACK pricing data (used when DB has no synced knowledge yet) ─────────
const FALLBACK_PRICING = `
=== VERTICAL AUTOMOTIVE PRICING (always give BOTH the low AND high end) ===

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
`;

// ─── FALLBACK company knowledge ───────────────────────────────────────────────
const FALLBACK_COMPANY = `
ABOUT VERTICAL AUTOMOTIVE:
- ASE-certified auto repair shop in South Florida with 36 years of experience
- Two locations: Wilton Manors (1100 W Oakland Park Blvd Unit 5) and Fort Lauderdale (707 NE 11th Street)
- Specialists in Tesla, Asian, European, and Domestic vehicles
- 3-year warranty on all repairs
- 4.9 stars on Google with 500+ reviews
- Hours: Monday-Friday 8am-5pm

SERVICES OFFERED:
- Engine & Drivetrain: Engine diagnostics, transmission repair, drivetrain service
- Safety & Handling: Brake service, wheel alignment, tire service, suspension repair
- Comfort & Specialty: A/C repair, Tesla & EV service, hybrid vehicle service
- Maintenance & More: Oil changes, fluid services, filter replacements, spark plugs, belts
- Fleet Maintenance: Commercial vehicle maintenance programs
- Diagnostics: Complete diagnostic scan & health reports

CONTACT & SCHEDULING:
- Online scheduling: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US
- Wilton Manors phone: (954) 565-1518
- Fort Lauderdale phone: (645) 216-2266

SERVICE INTERVALS (general guidelines):
- Oil Change: Every 5,000-7,500 miles (synthetic) or per manufacturer recommendation
- Brake Inspection: Every 12,000 miles or if you hear squealing/grinding
- Tire Rotation: Every 5,000-7,500 miles
- Transmission Fluid: Every 30,000-60,000 miles
- Coolant Flush: Every 30,000-50,000 miles
- Spark Plugs: Every 30,000-100,000 miles depending on type
- Serpentine Belt: Every 60,000-100,000 miles
- A/C Service: When cooling is weak, or annually for preventive maintenance
- Battery: When experiencing slow starts or battery warning light
`;

// ─── CRITICAL RULES ───────────────────────────────────────────────────────────
const CRITICAL_RULES_EN = `
=== CRITICAL RULES — FOLLOW THESE WITHOUT EXCEPTION ===

RULE 1 — ALWAYS GIVE THE FULL PRICE RANGE:
When a customer asks about pricing, you MUST state BOTH the low AND high end of the range.
CORRECT: "A full synthetic oil change is $89.99 - $185."
WRONG: "A full synthetic oil change starts at $89.99." (incomplete — missing the upper end)
WRONG: "A full synthetic oil change typically ranges from $89" (truncated — never cut off mid-sentence)

RULE 2 — NEVER ESCALATE SIMPLE PRICING OR SERVICE QUESTIONS:
Do NOT add [NEEDS_HUMAN] for ANY of these types of questions:
- "How much is an oil change?" → Give the price range from the pricing data.
- "How much are spark plugs?" → Give the price range from the pricing data.
- "What does a brake service cost?" → Give the price range from the pricing data.
- "When should I change my oil?" → Give the service interval guideline.
- "What's included in a 60k service?" → Explain what's typically included.
- "How do I schedule?" → Provide the scheduling link.
These are ROUTINE questions you CAN and MUST answer directly using the pricing data above.

RULE 3 — COMPLETE YOUR SENTENCES:
Never end a response mid-sentence. Always finish the complete thought including the full price range before ending your reply.

RULE 4 — WHEN TO USE [NEEDS_HUMAN]:
ONLY add [NEEDS_HUMAN] at the end of your reply for these specific situations:
- Customer describes a specific noise, symptom, or warning light that requires physical inspection
- Billing dispute or complaint about a past visit
- Warranty claim on a specific previous repair
- Request for an exact quote on a complex multi-part job
- Any complaint or negative experience

RULE 5 — FORMAT:
Keep responses to 2-4 sentences. Use "$X - $Y" format for all prices. Do not use markdown headers or bullet lists unless listing multiple services.
`;

const CRITICAL_RULES_ES = `
=== REGLAS CRÍTICAS — SEGUIR SIN EXCEPCIÓN ===

REGLA 1 — SIEMPRE DAR EL RANGO COMPLETO DE PRECIOS:
Cuando un cliente pregunta por precios, DEBES indicar TANTO el límite inferior COMO el superior del rango.
CORRECTO: "Un cambio de aceite sintético completo cuesta $89.99 - $185."
INCORRECTO: "Un cambio de aceite sintético comienza en $89.99." (incompleto — falta el límite superior)

REGLA 2 — NUNCA ESCALAR PREGUNTAS SIMPLES DE PRECIOS O SERVICIOS:
NO agregues [NEEDS_HUMAN] para NINGUNA de estas preguntas:
- "¿Cuánto cuesta un cambio de aceite?" → Da el rango de precios.
- "¿Cuánto cuestan las bujías?" → Da el rango de precios.
- "¿Cuándo debo cambiar el aceite?" → Da la guía de intervalos de servicio.
Estas son preguntas RUTINARIAS que PUEDES y DEBES responder directamente.

REGLA 3 — COMPLETA TUS ORACIONES:
Nunca termines una respuesta a mitad de oración. Siempre incluye el rango completo de precios.

REGLA 4 — CUÁNDO USAR [NEEDS_HUMAN]:
SOLO agrega [NEEDS_HUMAN] al final de tu respuesta para:
- El cliente describe un ruido, síntoma o luz de advertencia específica que requiere inspección física
- Disputa de facturación o queja sobre una visita anterior
- Reclamo de garantía sobre una reparación anterior específica
- Solicitud de cotización exacta para un trabajo complejo de múltiples partes
- Cualquier queja o experiencia negativa

REGLA 5 — FORMATO:
Respuestas de 2-4 oraciones. Usa el formato "$X - $Y" para todos los precios.
`;

// ─── System prompt builder — uses DB knowledge if available ──────────────────
async function buildSystemPrompt(lang: "en" | "es"): Promise<string> {
  // Try to load live knowledge from DB
  const liveKnowledge = await loadKnowledgeFromDB();

  if (liveKnowledge && liveKnowledge.length > 100) {
    // DB has synced knowledge — use it as the primary source
    if (lang === "es") {
      return `Eres "Shift," el asistente de IA amigable de Vertical Automotive — un taller de reparación de autos certificado ASE de confianza en el sur de Florida con 36 años de experiencia.

CONOCIMIENTO ACTUALIZADO DEL SITIO WEB:
${liveKnowledge}

DATOS DE PRECIOS DE RESPALDO (usar si el conocimiento anterior no incluye precios):
${FALLBACK_PRICING}

${CRITICAL_RULES_ES}`;
    } else {
      return `You are "Shift," the friendly AI assistant for Vertical Automotive — a trusted ASE-certified auto repair shop in South Florida with 36 years of experience.

LIVE KNOWLEDGE FROM WEBSITE:
${liveKnowledge}

FALLBACK PRICING DATA (use if live knowledge above does not include prices):
${FALLBACK_PRICING}

${CRITICAL_RULES_EN}`;
    }
  }

  // Fallback to hardcoded knowledge if DB is empty
  console.log("[Chatbot] DB knowledge empty, using hardcoded fallback");
  if (lang === "es") {
    return `Eres "Shift," el asistente de IA amigable de Vertical Automotive — un taller de reparación de autos certificado ASE de confianza en el sur de Florida con 36 años de experiencia.

CONOCIMIENTO DE LA EMPRESA:
${FALLBACK_COMPANY}

DATOS DE PRECIOS:
${FALLBACK_PRICING}

${CRITICAL_RULES_ES}`;
  } else {
    return `You are "Shift," the friendly AI assistant for Vertical Automotive — a trusted ASE-certified auto repair shop in South Florida with 36 years of experience.

COMPANY KNOWLEDGE:
${FALLBACK_COMPANY}

PRICING DATA:
${FALLBACK_PRICING}

${CRITICAL_RULES_EN}`;
  }
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

async function callGeminiOnce(
  messages: ChatMessage[],
  systemPrompt: string
): Promise<{ reply: string; needsHuman: boolean }> {
  const apiKey = ENV.geminiApiKey;
  if (!apiKey) throw new Error("Gemini API key not configured");

  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const requestBody = {
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents,
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1024,
      topP: 0.85,
    },
  };

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Gemini API Error]", response.status, errorText);
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json() as {
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
      finishReason?: string;
    }>;
    error?: { message: string };
  };

  if (data.error) throw new Error(`Gemini error: ${data.error.message}`);

  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error("No response from Gemini");

  const needsHuman = rawText.includes("[NEEDS_HUMAN]");
  const reply = rawText.replace(/\[NEEDS_HUMAN\]/g, "").trim();

  return { reply, needsHuman };
}

// Retry wrapper — retries once on transient 503/429 errors
async function callGemini(
  messages: ChatMessage[],
  lang: "en" | "es"
): Promise<{ reply: string; needsHuman: boolean }> {
  const systemPrompt = await buildSystemPrompt(lang);
  try {
    return await callGeminiOnce(messages, systemPrompt);
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("503") || msg.includes("429") || msg.includes("500")) {
      console.warn("[Gemini] Transient error, retrying once...", msg);
      await new Promise((r) => setTimeout(r, 1500));
      return await callGeminiOnce(messages, systemPrompt);
    }
    throw err;
  }
}

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
        const { reply, needsHuman } = await callGemini(input.messages, input.lang);
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
