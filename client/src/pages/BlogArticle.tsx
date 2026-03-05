/**
 * BlogArticle — Full standalone article page
 * Industrial Brutalism Design — Blue accents, bold typography
 * Features: breadcrumb, article structured data, related articles, CTA
 * BILINGUAL: EN at /blog/:slug, ES at /es/informacion/:slug
 */
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { COMPANY } from "@/lib/data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { trackSchedule } from "@/lib/gtm";
import { BLOG_ARTICLES_EN, BLOG_ARTICLES_ES, type BlogArticle as BlogArticleType } from "@/lib/blog-articles";
import LazyImage from "@/components/LazyImage";
import {
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Wrench,
  Share2,
  Link2,
  Check,
} from "lucide-react";

const BASE_URL = "https://verticalautomotive.com";

// Social sharing SVG icons (inline to avoid extra dependencies)
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SocialShareBar({
  articleUrl,
  articleTitle,
  shareLabel,
  copiedLabel,
  variant = "horizontal",
}: {
  articleUrl: string;
  articleTitle: string;
  shareLabel: string;
  copiedLabel: string;
  variant?: "horizontal" | "vertical";
}) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);

  const handleCopyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = articleUrl;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [articleUrl]);

  const links = [
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="w-4 h-4" />,
      hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
    {
      name: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <XTwitterIcon className="w-4 h-4" />,
      hoverClass: "hover:bg-foreground hover:text-background hover:border-foreground",
    },
    {
      name: "WhatsApp",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon className="w-4 h-4" />,
      hoverClass: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    },
  ];

  const isVertical = variant === "vertical";

  return (
    <div className={isVertical ? "space-y-3" : "flex items-center gap-3 flex-wrap"}>
      <div className="flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5 text-primary" />
        <span className="font-display text-xs font-bold tracking-widest uppercase text-muted-foreground">
          {shareLabel}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Share on ${link.name}`}
            className={`w-9 h-9 flex items-center justify-center border-2 border-border text-muted-foreground transition-all duration-200 ${link.hoverClass}`}
          >
            {link.icon}
          </a>
        ))}

        {/* Copy Link button */}
        <button
          onClick={handleCopyLink}
          aria-label="Copy link"
          className={`h-9 flex items-center justify-center gap-1.5 border-2 transition-all duration-200 font-display text-xs font-bold tracking-wider ${
            copied
              ? "border-primary bg-primary text-primary-foreground px-3"
              : "border-border text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary px-3"
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>{copiedLabel}</span>
            </>
          ) : (
            <>
              <Link2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">COPY LINK</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { isSpanish, prefix, servicesPath, ui } = useTranslation();

  const articles = isSpanish ? BLOG_ARTICLES_ES : BLOG_ARTICLES_EN;
  const altArticles = isSpanish ? BLOG_ARTICLES_EN : BLOG_ARTICLES_ES;
  const article = articles.find((a) => a.slug === slug);
  const articleIndex = articles.findIndex((a) => a.slug === slug);

  // Labels
  const labels = useMemo(
    () =>
      isSpanish
        ? {
            home: "Inicio",
            blog: "Información",
            blogPath: "/es/informacion",
            readTime: "de lectura",
            quickTips: "Consejos Rápidos",
            relatedArticles: "Artículos Relacionados",
            readMore: "LEER MÁS",
            backToBlog: "Volver a Información",
            scheduleBtn: "AGENDAR CITA",
            readyTitle: "¿LISTO PARA PROGRAMAR",
            readyHighlight: "SU SERVICIO",
            readyCta:
              "Nuestros técnicos certificados ASE están listos para ayudarle. Programe su cita hoy.",
            relatedService: "Servicio Relacionado",
            viewService: "VER SERVICIO",
            shareArticle: "Compartir",
            copied: "COPIADO",
            articleNotFound: "Artículo no encontrado",
            articleNotFoundDesc:
              "El artículo que busca no existe. Vuelva a nuestra página de información.",
            goBack: "Volver a Información",
            tableOfContents: "Contenido",
          }
        : {
            home: "Home",
            blog: "Blog",
            blogPath: "/blog",
            readTime: "read",
            quickTips: "Quick Tips",
            relatedArticles: "Related Articles",
            readMore: "READ MORE",
            backToBlog: "Back to Blog",
            scheduleBtn: "SCHEDULE APPOINTMENT",
            readyTitle: "READY TO SCHEDULE",
            readyHighlight: "YOUR SERVICE",
            readyCta:
              "Our ASE-certified technicians are ready to help. Schedule your appointment today.",
            relatedService: "Related Service",
            viewService: "VIEW SERVICE",
            shareArticle: "Share",
            copied: "COPIED",
            articleNotFound: "Article Not Found",
            articleNotFoundDesc:
              "The article you're looking for doesn't exist. Return to our blog page.",
            goBack: "Back to Blog",
            tableOfContents: "Contents",
          },
    [isSpanish]
  );

  // Related articles: pick 3 others (not the current one)
  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return articles.filter((a) => a.slug !== slug).slice(0, 3);
  }, [article, slug, articles]);

  // Article structured data
  useEffect(() => {
    if (!article) return;

    const altArticle = altArticles[articleIndex];
    const enSlug = isSpanish ? altArticle?.slug : article.slug;
    const esSlug = isSpanish ? article.slug : altArticle?.slug;

    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: `${article.title} ${article.titleHighlight}${article.titleSuffix ? ` ${article.titleSuffix}` : ""}`,
      description: article.excerpt,
      image: article.image,
      author: {
        "@type": "Organization",
        name: "Vertical Automotive",
        url: BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        name: "Vertical Automotive",
        logo: {
          "@type": "ImageObject",
          url: COMPANY.logoUrl,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": isSpanish
          ? `${BASE_URL}/es/informacion/${esSlug}`
          : `${BASE_URL}/blog/${enSlug}`,
      },
      inLanguage: isSpanish ? "es" : "en",
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "article-structured-data";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    // Update document title
    document.title = article.metaTitle;

    // Update meta description
    let metaDesc = document.querySelector(
      'meta[name="description"]'
    ) as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", article.metaDescription);

    // Open Graph tags
    const ogTags: Record<string, string> = {
      "og:title": article.metaTitle,
      "og:description": article.metaDescription,
      "og:image": article.image,
      "og:type": "article",
      "og:url": isSpanish
        ? `${BASE_URL}/es/informacion/${esSlug}`
        : `${BASE_URL}/blog/${enSlug}`,
    };
    Object.entries(ogTags).forEach(([prop, content]) => {
      let tag = document.querySelector(
        `meta[property="${prop}"]`
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", prop);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    });

    return () => {
      const el = document.getElementById("article-structured-data");
      if (el) el.remove();
    };
  }, [article, articleIndex, altArticles, isSpanish]);

  // 404 — article not found
  if (!article) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container py-20 text-center">
          <h1 className="font-display text-3xl sm:text-5xl font-black mb-4">
            {labels.articleNotFound}
          </h1>
          <p className="text-muted-foreground mb-8">
            {labels.articleNotFoundDesc}
          </p>
          <Link
            href={labels.blogPath}
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-display font-bold tracking-widest px-8 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.goBack}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const articlePath = isSpanish
    ? `/es/informacion/${article.slug}`
    : `/blog/${article.slug}`;

  // Generate stable section IDs from headings
  const sectionIds = useMemo(() => {
    if (!article) return [];
    return article.sections.map((section, i) => {
      const base = section.heading
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .slice(0, 50);
      return `section-${i + 1}-${base}`;
    });
  }, [article]);

  // Active section tracking for TOC highlight
  const [activeSection, setActiveSection] = useState<number>(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (!article) return;
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const idx = sectionRefs.current.findIndex(
            (ref) => ref === visible[0].target
          );
          if (idx !== -1) setActiveSection(idx);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [article, sectionIds]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80; // approximate sticky nav height
      const y = el.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero Banner */}
      <div
        className="relative h-[40vh] sm:h-[50vh] min-h-[260px] sm:min-h-[400px] flex items-end overflow-hidden"
      >
        {/* Background image — lazy loaded with fade-in */}
        <LazyImage
          src={article.image}
          alt=""
          role="presentation"
          width={1200}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
          wrapperClassName="absolute inset-0"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/75" />
        <div className="container pb-8 sm:pb-12 z-10 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs sm:text-sm mb-4 sm:mb-6">
            <Link
              href={isSpanish ? "/es" : "/"}
              className="text-white/60 hover:text-primary transition-colors font-display tracking-wider"
            >
              {labels.home}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <Link
              href={labels.blogPath}
              className="text-white/60 hover:text-primary transition-colors font-display tracking-wider"
            >
              {labels.blog}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-primary font-display tracking-wider truncate max-w-[200px]">
              {article.titleHighlight}
            </span>
          </nav>

          {/* Category & Read Time */}
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="bg-primary text-primary-foreground font-display text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1.5 uppercase">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-white/70">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs sm:text-sm font-display tracking-wider">
                {article.readTime}
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-wide leading-tight max-w-3xl">
            {article.title}{" "}
            <span className="text-primary">{article.titleHighlight}</span>
            {article.titleSuffix && ` ${article.titleSuffix}`}
          </h1>
        </div>
      </div>

      {/* Article Body */}
      <section className="py-8 sm:py-16">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
            {/* Main Content */}
            <article className="max-w-none">
              {/* Intro / Excerpt */}
              <div className="border-l-4 border-primary pl-5 sm:pl-6 mb-8 sm:mb-12">
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed italic">
                  {article.excerpt}
                </p>
              </div>

              {/* Article Sections */}
              {article.sections.map((section, i) => (
                <div
                  key={i}
                  id={sectionIds[i]}
                  ref={(el) => { sectionRefs.current[i] = el; }}
                  className="mb-8 sm:mb-10 scroll-mt-24"
                >
                  <h2 className="font-display text-xl sm:text-2xl font-black tracking-wide mb-3 sm:mb-4 flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-primary/10 text-primary font-display text-sm sm:text-base font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <span>{section.heading}</span>
                  </h2>
                  <div className="pl-11 sm:pl-[52px]">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              ))}

              {/* Quick Tips */}
              <div className="bg-secondary border-2 border-primary/20 p-5 sm:p-8 mb-8 sm:mb-12">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center bg-primary text-primary-foreground">
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-black tracking-wider text-white">
                    {labels.quickTips}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {article.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm sm:text-base text-muted-foreground"
                    >
                      <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-display font-bold mt-0.5">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusion */}
              <div className="bg-muted/30 border-l-4 border-primary p-5 sm:p-8 mb-8 sm:mb-12">
                <p className="text-sm sm:text-base text-foreground leading-relaxed font-medium">
                  {article.conclusion}
                </p>
              </div>

              {/* Social Share — inline in article body */}
              <div className="mb-8 sm:mb-12 py-5 border-t-2 border-b-2 border-border">
                <SocialShareBar
                  articleUrl={`${BASE_URL}${articlePath}`}
                  articleTitle={`${article.title} ${article.titleHighlight}${article.titleSuffix ? ` ${article.titleSuffix}` : ""}`}
                  shareLabel={labels.shareArticle}
                  copiedLabel={labels.copied}
                />
              </div>

              {/* CTA */}
              <div className="bg-secondary p-6 sm:p-10 border-2 border-border text-center">
                <h3 className="font-display text-lg sm:text-2xl font-black tracking-wider mb-2 sm:mb-3 text-white">
                  {labels.readyTitle}{" "}
                  <span className="text-primary">{labels.readyHighlight}</span>?
                </h3>
                <p className="text-xs sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-lg mx-auto">
                  {labels.readyCta}
                </p>
                <a
                  href={COMPANY.appointmentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackSchedule(`blog_article_${slug}`)}
                >
                  <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-display font-bold tracking-widest px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base shadow-lg transition-colors">
                    {labels.scheduleBtn}
                  </button>
                </a>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              {/* Table of Contents */}
              <div className="sticky top-24 space-y-6">
                <div className="bg-card border-2 border-border p-5">
                  <h4 className="font-display text-sm font-bold tracking-widest uppercase mb-4 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    {labels.tableOfContents}
                  </h4>
                  <nav className="space-y-2">
                    {article.sections.map((section, i) => (
                      <button
                        key={i}
                        onClick={() => scrollToSection(sectionIds[i])}
                        className={`flex items-start gap-2 text-sm text-left w-full transition-all duration-200 group/toc ${
                          activeSection === i
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                      >
                        <span
                          className={`font-display text-xs mt-0.5 transition-colors duration-200 ${
                            activeSection === i
                              ? "text-primary"
                              : "text-primary/60"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`leading-snug transition-all duration-200 ${
                            activeSection === i
                              ? "font-bold translate-x-0.5"
                              : ""
                          }`}
                        >
                          {section.heading}
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Related Service */}
                <div className="bg-primary/5 border-2 border-primary/20 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Wrench className="w-4 h-4 text-primary" />
                    <h4 className="font-display text-sm font-bold tracking-widest uppercase">
                      {labels.relatedService}
                    </h4>
                  </div>
                  <Link
                    href={`${servicesPath}/${article.relatedServiceSlug}`}
                    className="inline-flex items-center gap-2 text-primary font-display font-bold text-xs tracking-wider group/link"
                  >
                    {labels.viewService}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Share — sidebar */}
                <div className="bg-card border-2 border-border p-5">
                  <SocialShareBar
                    articleUrl={`${BASE_URL}${articlePath}`}
                    articleTitle={`${article.title} ${article.titleHighlight}${article.titleSuffix ? ` ${article.titleSuffix}` : ""}`}
                    shareLabel={labels.shareArticle}
                    copiedLabel={labels.copied}
                    variant="vertical"
                  />
                </div>

                {/* Back to Blog */}
                <Link
                  href={labels.blogPath}
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display text-sm tracking-wider"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {labels.backToBlog}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        className="h-1 bg-primary"
        style={{ clipPath: "polygon(0 0, 100% 0, 97% 100%, 0 100%)" }}
      />

      {/* Related Articles */}
      <section className="py-10 sm:py-16 bg-muted/30">
        <div className="container">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-black tracking-wide">
              {labels.relatedArticles}
            </h2>
            <div className="h-1 w-16 sm:w-20 bg-primary mx-auto mt-3" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {relatedArticles.map((related) => {
              const relatedPath = isSpanish
                ? `/es/informacion/${related.slug}`
                : `/blog/${related.slug}`;
              return (
                <Link
                  key={related.slug}
                  href={relatedPath}
                  className="bg-card border-2 border-border hover:border-primary/50 transition-all duration-300 group overflow-hidden block"
                >
                  <div className="relative h-36 sm:h-44 overflow-hidden">
                    <LazyImage
                      src={related.image.replace("w=1200", "w=600")}
                      loading="lazy"
                      decoding="async"
                      alt={related.imageAlt}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-secondary/90 text-secondary-foreground font-display text-[10px] sm:text-xs font-bold tracking-widest px-2.5 py-1 uppercase">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="text-[10px] sm:text-xs font-display tracking-wider">
                        {related.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold tracking-wide leading-snug mb-2">
                      {related.title}{" "}
                      <span className="text-primary">
                        {related.titleHighlight}
                      </span>
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-primary font-display font-bold text-xs tracking-wider group-hover/link:gap-2 transition-all">
                      {labels.readMore}
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile: Back to Blog + Related Service (visible on mobile only) */}
      <div className="lg:hidden bg-background border-t-2 border-border py-6">
        <div className="container flex flex-col gap-4">
          <Link
            href={`${servicesPath}/${article.relatedServiceSlug}`}
            className="flex items-center justify-between bg-primary/5 border-2 border-primary/20 p-4"
          >
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-primary" />
              <span className="font-display text-sm font-bold tracking-wider">
                {labels.relatedService}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <Link
            href={labels.blogPath}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-display text-sm tracking-wider justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
            {labels.backToBlog}
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
