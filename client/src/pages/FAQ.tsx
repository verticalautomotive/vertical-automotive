/**
 * FAQ — Standalone FAQ page aggregating questions across all services
 * Industrial Brutalism + Glassmorphism design
 * Includes FAQPage JSON-LD structured data for SEO
 * Bilingual: EN (/services/faq) and ES (/es/servicios/preguntas-frecuentes)
 */
import { useState, useMemo, useEffect } from "react";
import { ChevronDown, Search, Wrench, X } from "lucide-react";
import { SERVICE_FAQS, type FAQItem } from "@/lib/faq-data";
import { SERVICE_FAQS_ES } from "@/lib/faq-data-es";
import { SERVICES } from "@/lib/data";
import { useTranslation } from "@/hooks/useTranslation";
import Navigation from "@/components/Navigation";
import SEO from "@/components/SEO";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Link } from "wouter";

/* ─── Types ─── */
interface ServiceFAQGroup {
  slug: string;
  title: string;
  faqs: FAQItem[];
}

/* ─── Accordion Item ─── */
function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
  globalIndex,
}: {
  item: FAQItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  globalIndex: number;
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
        aria-controls={`faq-answer-${globalIndex}`}
      >
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black transition-colors duration-300 ${
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-primary/10 text-primary"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-sm sm:text-base font-bold leading-snug pr-2 group-hover:text-primary transition-colors">
          {item.question}
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-primary transition-transform duration-300 mt-0.5 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={`faq-answer-${globalIndex}`}
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

/* ─── Main Page ─── */
export default function FAQ() {
  const { isSpanish, services, servicesPath } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Build grouped FAQ data
  const faqSource = isSpanish ? SERVICE_FAQS_ES : SERVICE_FAQS;
  const serviceGroups: ServiceFAQGroup[] = useMemo(() => {
    return Object.entries(faqSource)
      .map(([slug, faqs]) => {
        const svc = services.find((s: any) => s.slug === slug) ||
          SERVICES.find((s) => s.slug === slug);
        return {
          slug,
          title: svc?.title || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
          faqs,
        };
      })
      .filter((g) => g.faqs.length > 0);
  }, [faqSource, services]);

  // Filter by search and category
  const filteredGroups = useMemo(() => {
    let groups = serviceGroups;
    if (activeCategory) {
      groups = groups.filter((g) => g.slug === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      groups = groups
        .map((g) => ({
          ...g,
          faqs: g.faqs.filter(
            (f) =>
              f.question.toLowerCase().includes(q) ||
              f.answer.toLowerCase().includes(q)
          ),
        }))
        .filter((g) => g.faqs.length > 0);
    }
    return groups;
  }, [serviceGroups, activeCategory, searchQuery]);

  // Total FAQ count
  const totalFAQs = filteredGroups.reduce((sum, g) => sum + g.faqs.length, 0);

  // Global index tracker for unique IDs
  let globalIdx = 0;

  // All FAQs for JSON-LD
  const allFaqs = serviceGroups.flatMap((g) => g.faqs);
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  // Page meta — handled by SEO component below

  // Translations
  const t = {
    heroTitle: isSpanish ? "PREGUNTAS FRECUENTES" : "FREQUENTLY ASKED QUESTIONS",
    heroSubtitle: isSpanish
      ? "Respuestas a las preguntas más comunes sobre nuestros servicios"
      : "Answers to the most common questions about our services",
    breadcrumbHome: isSpanish ? "INICIO" : "HOME",
    breadcrumbServices: isSpanish ? "SERVICIOS" : "SERVICES",
    breadcrumbFaq: isSpanish ? "PREGUNTAS FRECUENTES" : "FAQ",
    searchPlaceholder: isSpanish ? "Buscar preguntas..." : "Search questions...",
    allCategories: isSpanish ? "Todas las categorías" : "All Categories",
    questionsFound: isSpanish ? "preguntas encontradas" : "questions found",
    noResults: isSpanish ? "No se encontraron resultados" : "No results found",
    noResultsDesc: isSpanish
      ? "Intente con otros términos de búsqueda o seleccione otra categoría."
      : "Try different search terms or select another category.",
    clearFilters: isSpanish ? "Limpiar filtros" : "Clear Filters",
    viewService: isSpanish ? "Ver servicio" : "View Service",
    ctaHeading: isSpanish ? "¿TIENE MÁS PREGUNTAS?" : "STILL HAVE QUESTIONS?",
    ctaText: isSpanish
      ? "Nuestros mecánicos certificados ASE están listos para ayudarle. Llámenos o programe una cita."
      : "Our ASE-certified mechanics are ready to help. Call us or schedule an appointment.",
    ctaButton: isSpanish ? "PROGRAMAR CITA" : "SCHEDULE APPOINTMENT",
    ctaCall: isSpanish ? "LLAMAR AHORA" : "CALL NOW",
  };

  return (
    <>
      <SEO
        title={isSpanish
          ? "Preguntas Frecuentes | Vertical Automotive"
          : "FAQ | Vertical Automotive Fort Lauderdale"}
        description={isSpanish
          ? "Respuestas a preguntas frecuentes sobre reparación automotriz en Fort Lauderdale y Wilton Manors. Frenos, aceite, A/C y más."
          : "Answers to common questions about auto repair in Fort Lauderdale and Wilton Manors. Brakes, oil, A/C and more."}
        keywords={isSpanish
          ? "preguntas frecuentes taller, FAQ reparación auto, dudas mecánico Fort Lauderdale"
          : "auto repair FAQ, mechanic questions Fort Lauderdale, car service answers"}
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navigation />
      <PageHero
        title={t.heroTitle}
        subtitle={t.heroSubtitle}
        breadcrumb={[
          { label: t.breadcrumbHome, href: isSpanish ? "/es" : "/" },
          { label: t.breadcrumbServices, href: servicesPath },
          { label: t.breadcrumbFaq },
        ]}
        backgroundImage="https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=1200&q=50&fm=webp&fit=crop&auto=format"
      />

      {/* Search & Filter Section */}
      <section className="py-8 sm:py-12 bg-background">
        <div className="container max-w-5xl">
          {/* Search bar */}
          <div className="relative mb-6 sm:mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-card border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-muted flex items-center justify-center hover:bg-primary/20 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                !activeCategory
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-primary"
              }`}
            >
              {t.allCategories}
            </button>
            {serviceGroups.map((group) => (
              <button
                key={group.slug}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === group.slug ? null : group.slug
                  )
                }
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 ${
                  activeCategory === group.slug
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card border border-border/50 text-muted-foreground hover:border-primary/30 hover:text-primary"
                }`}
              >
                {group.title}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-6">
            <span className="font-bold text-foreground">{totalFAQs}</span>{" "}
            {t.questionsFound}
          </p>
        </div>
      </section>

      {/* FAQ Groups */}
      <section className="pb-12 sm:pb-20 bg-background">
        <div className="container max-w-5xl">
          {filteredGroups.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t.noResults}</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                {t.noResultsDesc}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                {t.clearFilters}
              </button>
            </div>
          ) : (
            <div className="space-y-10 sm:space-y-14">
              {filteredGroups.map((group) => {
                const startIdx = globalIdx;
                globalIdx += group.faqs.length;
                return (
                  <div key={group.slug}>
                    {/* Category header */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Wrench className="w-4.5 h-4.5 text-primary" />
                        </div>
                        <h2 className="text-lg sm:text-xl font-black tracking-wide">
                          {group.title}
                        </h2>
                      </div>
                      <Link
                        href={`${servicesPath}/${group.slug}`}
                        className="text-xs sm:text-sm text-primary font-bold hover:underline underline-offset-4 flex items-center gap-1"
                      >
                        {t.viewService} →
                      </Link>
                    </div>

                    {/* Accordion items */}
                    <div className="space-y-3">
                      {group.faqs.map((faq, i) => {
                        const gIdx = startIdx + i;
                        return (
                          <FAQAccordionItem
                            key={gIdx}
                            item={faq}
                            index={i}
                            isOpen={openIndex === gIdx}
                            onToggle={() =>
                              setOpenIndex(openIndex === gIdx ? null : gIdx)
                            }
                            globalIndex={gIdx}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-foreground text-background">
        <div className="container max-w-3xl text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-wider mb-4">
            {t.ctaHeading}
          </h2>
          <div className="h-1 w-16 sm:w-24 bg-primary mx-auto mb-6" />
          <p className="text-sm sm:text-base text-background/70 mb-8 max-w-xl mx-auto leading-relaxed">
            {t.ctaText}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://schedule.kukui.com/?mg_permanent=true&cid=8f11f65e-faae-4fdd-9275-20daefd38e2b&merchant_id=41049&hl=en-US"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-bold tracking-widest text-sm hover:bg-primary/90 transition-colors shadow-lg"
            >
              {t.ctaButton}
            </a>
            <a
              href="tel:9545651518"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full border-2 border-background/30 text-background font-bold tracking-widest text-sm hover:border-primary hover:text-primary transition-colors"
            >
              {t.ctaCall}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
