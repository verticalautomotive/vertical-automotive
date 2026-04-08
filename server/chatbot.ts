/**
 * Ask Shift AI Chatbot Router
 * Uses Google Gemini API for AI responses about Vertical Automotive services
 */
import { z } from "zod";
import { publicProcedure, router } from "./_core/trpc";
import { ENV } from "./_core/env";

// Pricing data from the spreadsheet
const PRICING_DATA = `
VERTICAL AUTOMOTIVE - SERVICE PRICING GUIDE

INTERVAL PACKAGES (Major Service):
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
- Spark Plug Replacement (4-Cyl): $275 - $450
- Serpentine Belt Replacement: $245 - $395

REPAIR:
- Wheel Bearing/Hub Assembly: $550 - $950
- A/C Performance & Leak Test: $240 - $325
- Premium Battery Replacement: $240 - $450

DIAGNOSTICS:
- Diagnostic Scan & Health Report: $200 - $275

Note: Final pricing depends on vehicle make, model, year, and specific parts needed. 
All prices are estimates. We offer a 3-year warranty on all repairs.
`;

// Company knowledge base
const COMPANY_KNOWLEDGE = `
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

SCHEDULING:
- Online scheduling available at: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US
- Phone: Wilton Manors (954) 565-1518 | Fort Lauderdale (645) 216-2266

WHEN TO SERVICE (general guidelines):
- Oil Change: Every 5,000-7,500 miles (synthetic) or per manufacturer recommendation
- Brake Inspection: Every 12,000 miles or if you hear squealing/grinding
- Tire Rotation: Every 5,000-7,500 miles
- Transmission Fluid: Every 30,000-60,000 miles
- Coolant Flush: Every 30,000-50,000 miles
- Spark Plugs: Every 30,000-100,000 miles depending on type
- Serpentine Belt: Every 60,000-100,000 miles
- 30k/60k/90k/120k Mile Services: At the specified mileage intervals per manufacturer
- A/C Service: When cooling is weak, or annually for preventive maintenance
- Battery: When experiencing slow starts or battery warning light
`;

const SYSTEM_PROMPT_EN = `You are "Ask Shift," the friendly AI assistant for Vertical Automotive — a trusted ASE-certified auto repair shop in South Florida with 36 years of experience.

Your role is to:
1. Help customers understand what services they need and when
2. Provide price range estimates for services
3. Explain what's included in each service
4. Guide customers to schedule an appointment

COMPANY KNOWLEDGE:
${COMPANY_KNOWLEDGE}

PRICING DATA:
${PRICING_DATA}

GUIDELINES:
- Be friendly, professional, and helpful
- Always provide price ranges when asked (use the pricing data above)
- Explain what's included in services when asked
- Recommend scheduling for accurate quotes: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049
- Keep responses concise (2-4 sentences max unless more detail is needed)
- If you don't know something specific, say so and recommend calling or scheduling
- Always mention the 3-year warranty when discussing repairs
- Do NOT make up prices outside the ranges provided
- When recommending scheduling, use this exact link: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049

Format your responses in plain text. When listing prices, use the format: "$X - $Y"
End responses that involve services with a scheduling call-to-action when appropriate.`;

const SYSTEM_PROMPT_ES = `Eres "Ask Shift," el asistente de IA amigable de Vertical Automotive — un taller de reparación de autos certificado ASE de confianza en el sur de Florida con 36 años de experiencia.

Tu rol es:
1. Ayudar a los clientes a entender qué servicios necesitan y cuándo
2. Proporcionar estimados de rangos de precios para servicios
3. Explicar qué incluye cada servicio
4. Guiar a los clientes para agendar una cita

CONOCIMIENTO DE LA EMPRESA:
${COMPANY_KNOWLEDGE}

DATOS DE PRECIOS:
${PRICING_DATA}

DIRECTRICES:
- Sé amigable, profesional y útil
- Siempre proporciona rangos de precios cuando se te pida (usa los datos de precios anteriores)
- Explica qué incluyen los servicios cuando se te pida
- Recomienda agendar para cotizaciones precisas: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049
- Mantén las respuestas concisas (máximo 2-4 oraciones a menos que se necesite más detalle)
- Si no sabes algo específico, dilo y recomienda llamar o agendar
- Siempre menciona la garantía de 3 años cuando hables de reparaciones
- NO inventes precios fuera de los rangos proporcionados
- Cuando recomiendes agendar, usa este enlace exacto: https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049

Formatea tus respuestas en texto simple. Al listar precios, usa el formato: "$X - $Y"
Termina las respuestas que involucren servicios con un llamado a la acción para agendar cuando sea apropiado.`;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

async function callGemini(messages: ChatMessage[], lang: "en" | "es"): Promise<string> {
  const apiKey = ENV.geminiApiKey;
  if (!apiKey) {
    throw new Error("Gemini API key not configured");
  }

  const systemPrompt = lang === "es" ? SYSTEM_PROMPT_ES : SYSTEM_PROMPT_EN;

  // Build Gemini contents array
  // Gemini uses "user" and "model" roles, and system instruction is separate
  const contents = messages.map((msg) => ({
    role: msg.role === "assistant" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const requestBody = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents,
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 512,
      topP: 0.9,
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
      content?: {
        parts?: Array<{ text?: string }>;
      };
    }>;
    error?: { message: string };
  };

  if (data.error) {
    throw new Error(`Gemini error: ${data.error.message}`);
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return text;
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
        const reply = await callGemini(input.messages, input.lang);
        return { success: true, reply };
      } catch (error) {
        console.error("[Chatbot Error]", error);
        const errorMsg = input.lang === "es"
          ? "Lo siento, tuve un problema técnico. Por favor llama al (954) 565-1518 o agenda en línea."
          : "Sorry, I had a technical issue. Please call (954) 565-1518 or schedule online.";
        return { success: false, reply: errorMsg };
      }
    }),
});
