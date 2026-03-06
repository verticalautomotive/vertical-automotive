/**
 * ServiceFAQ — Accordion FAQ section with FAQPage JSON-LD structured data
 * Industrial Brutalism + Glassmorphism design
 * Bilingual: renders EN or ES FAQs based on current language
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SERVICE_FAQS, type FAQItem } from "@/lib/faq-data";
import { SERVICE_FAQS_ES } from "@/lib/faq-data-es";
import { useTranslation } from "@/hooks/useTranslation";

interface ServiceFAQProps {
  serviceSlug: string;
  serviceTitle: string;
}

function FAQAccordionItem({ item, index, isOpen, onToggle }: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`glass-card overflow-hidden transition-all duration-300 ${
        isOpen ? "ring-1 ring-primary/30" : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-5 sm:p-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        {/* Number badge */}
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black transition-colors duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Question text */}
        <span className="flex-1 text-sm sm:text-base font-bold leading-snug pr-2 group-hover:text-primary transition-colors">
          {item.question}
        </span>

        {/* Chevron */}
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Answer — collapsible */}
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 pl-[4.25rem]">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ServiceFAQ({ serviceSlug, serviceTitle }: ServiceFAQProps) {
  const { isSpanish } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  // Get FAQs for this service (Spanish override or English default)
  const faqSource = isSpanish ? SERVICE_FAQS_ES : SERVICE_FAQS;
  const faqs = faqSource[serviceSlug];

  // No FAQs for this service — render nothing
  if (!faqs || faqs.length === 0) return null;

  const t = {
    heading: isSpanish ? "PREGUNTAS" : "FREQUENTLY ASKED",
    headingAccent: isSpanish ? "FRECUENTES" : "QUESTIONS",
  };

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  // JSON-LD FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-10 sm:py-20 bg-background">
        <div className="container max-w-4xl">
          {/* Section heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black">
              {t.heading}{" "}
              <span className="text-primary">{t.headingAccent}</span>
            </h2>
            <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mt-3 sm:mt-4" />
            <p className="text-sm text-muted-foreground mt-3 sm:mt-4 max-w-xl mx-auto">
              {isSpanish
                ? `Todo lo que necesita saber sobre nuestro servicio de ${serviceTitle.toLowerCase()}.`
                : `Everything you need to know about our ${serviceTitle.toLowerCase()} service.`}
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordionItem
                key={index}
                item={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
