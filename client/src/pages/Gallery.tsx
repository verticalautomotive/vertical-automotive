/**
 * Gallery Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Masonry grid layout with lightbox viewer
 * CSS filter for consistent industrial lighting across all images
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

interface GalleryImage {
  src: string;
  alt: string;
  altEs: string;
  category: "classics" | "european" | "japanese" | "american" | "shop" | "brakes";
}

const CDN = "https://d2xsxph8kpxj0f.cloudfront.net/310519663354819748/eJoUqgUmjNSqQB7YVhnTRB";

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: `${CDN}/gallery-TUADJzvESUAODOSz_5acd13d1.jpg`,
    alt: "Classic Plymouth Fury in the shop",
    altEs: "Plymouth Fury clásico en el taller",
    category: "classics",
  },
  {
    src: `${CDN}/gallery-BbQEKgqRxpnCNVgB_c7cf6bd2.jpg`,
    alt: "Team member with Acura NSX and Range Rover",
    altEs: "Miembro del equipo con Acura NSX y Range Rover",
    category: "japanese",
  },
  {
    src: `${CDN}/gallery-qjgLkqRLLuXZLhTt_9d71666c.jpg`,
    alt: "Performance brake rotor and red caliper installation",
    altEs: "Instalación de rotor de freno y caliper rojo de alto rendimiento",
    category: "brakes",
  },
  {
    src: `${CDN}/gallery-dKGmwKPRjVoFghKt_a5f512d9.jpg`,
    alt: "Two red Acura NSX on lift and floor",
    altEs: "Dos Acura NSX rojos en elevador y piso",
    category: "japanese",
  },
  {
    src: `${CDN}/gallery-DyEXrexCKnZJcfWe_fd43483d.jpg`,
    alt: "Blue Lexus GS F engine bay service",
    altEs: "Servicio del compartimento del motor del Lexus GS F azul",
    category: "japanese",
  },
  {
    src: `${CDN}/gallery-fBKbEQlMKlMWvTJn_05b9b12e.jpg`,
    alt: "Black RAM truck on lift for service",
    altEs: "Camioneta RAM negra en elevador para servicio",
    category: "american",
  },
  {
    src: `${CDN}/gallery-LvRvQWZpiVPYKGaT_483be56b.jpg`,
    alt: "Classic Oldsmobile 442 on alignment rack",
    altEs: "Oldsmobile 442 clásico en rack de alineación",
    category: "classics",
  },
  {
    src: `${CDN}/gallery-tuGlZuceDGQGnQMx_4b20df64.jpg`,
    alt: "Audi and BMW X5 in busy shop bay",
    altEs: "Audi y BMW X5 en bahía de taller ocupada",
    category: "european",
  },
  {
    src: `${CDN}/gallery-nmWHfJqJQiUDdUlJ_b850830c.jpg`,
    alt: "Classic Dodge Charger R/T rear view",
    altEs: "Vista trasera del Dodge Charger R/T clásico",
    category: "classics",
  },
  {
    src: `${CDN}/gallery-ThpmSuUWSAbFJnPy_f277215d.jpg`,
    alt: "Porsche and BMW service bay",
    altEs: "Bahía de servicio de Porsche y BMW",
    category: "european",
  },
  {
    src: `${CDN}/gallery-ChoeLQrpvFpvbtQS_3911cc80.jpg`,
    alt: "Mercedes-Benz Maybach on alignment machine",
    altEs: "Mercedes-Benz Maybach en máquina de alineación",
    category: "european",
  },
  {
    src: `${CDN}/gallery-fOJuCwhCkzrbRNeq_ab359e50.jpg`,
    alt: "White Toyota Tacoma on alignment rack",
    altEs: "Toyota Tacoma blanca en rack de alineación",
    category: "japanese",
  },
  {
    src: `${CDN}/gallery-PTWDPJpqcdITQUvI_4603ec22.jpg`,
    alt: "Classic Dodge Charger R/T front view in shop",
    altEs: "Vista frontal del Dodge Charger R/T clásico en el taller",
    category: "classics",
  },
  {
    src: `${CDN}/gallery-fjpshhWUcXkJeyPO_f7092b89.jpg`,
    alt: "Busy shop floor with multiple vehicles",
    altEs: "Piso del taller ocupado con múltiples vehículos",
    category: "shop",
  },
  {
    src: `${CDN}/gallery-KhsRzJjApcIGSPfa_dc25fa8c.jpg`,
    alt: "Technician servicing Audi Q3 engine",
    altEs: "Técnico dando servicio al motor del Audi Q3",
    category: "european",
  },
];

const CATEGORIES = [
  { key: "all", labelEn: "All", labelEs: "Todos" },
  { key: "classics", labelEn: "Classics", labelEs: "Clásicos" },
  { key: "european", labelEn: "European", labelEs: "Europeos" },
  { key: "japanese", labelEn: "Japanese", labelEs: "Japoneses" },
  { key: "american", labelEn: "American", labelEs: "Americanos" },
  { key: "shop", labelEn: "Our Shop", labelEs: "Nuestro Taller" },
  { key: "brakes", labelEn: "Brakes", labelEs: "Frenos" },
] as const;

export default function GalleryPage() {
  const { isSpanish, ui } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const t = {
    title: isSpanish ? "GALERÍA" : "GALLERY",
    subtitle: isSpanish
      ? "Un vistazo a nuestro trabajo diario"
      : "A look inside our daily work",
    seoTitle: isSpanish
      ? "Galería | Vertical Automotive"
      : "Gallery | Vertical Automotive",
    seoDesc: isSpanish
      ? "Vea fotos de nuestro taller, vehículos clásicos, europeos y japoneses en servicio en Vertical Automotive, Fort Lauderdale."
      : "See photos of our shop, classic, European, and Japanese vehicles being serviced at Vertical Automotive, Fort Lauderdale.",
    photoCount: isSpanish ? "fotos" : "photos",
  };

  const filtered =
    activeCategory === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [closeLightbox, goNext, goPrev]
  );

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        keywords="auto repair gallery, car shop photos, Fort Lauderdale mechanic, classic cars, European car service, Japanese car repair"
      />
      <Navigation />
      <PageHero
        title={t.title}
        subtitle={t.subtitle}
        icon={<Camera className="w-6 h-6" />}
        breadcrumb={[
          { label: isSpanish ? "Inicio" : "Home", href: isSpanish ? "/es" : "/" },
          { label: isSpanish ? "Sobre Nosotros" : "About Us", href: isSpanish ? "/es/sobre-nosotros" : "/about" },
          { label: t.title },
        ]}
      />

      {/* Filter Bar */}
      <section className="bg-[#0a0e17] border-b border-white/10">
        <div className="container py-4 md:py-6">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.key;
              const count =
                cat.key === "all"
                  ? GALLERY_IMAGES.length
                  : GALLERY_IMAGES.filter((img) => img.category === cat.key).length;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-4 py-2 text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 border ${
                    isActive
                      ? "bg-[#0066FF] border-[#0066FF] text-white"
                      : "bg-transparent border-white/20 text-white/60 hover:border-[#0066FF]/50 hover:text-white"
                  }`}
                >
                  {isSpanish ? cat.labelEs : cat.labelEn}
                  <span className={`ml-1.5 text-[10px] ${isActive ? "text-white/80" : "text-white/40"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gallery Grid — Masonry-style with CSS columns */}
      <section className="bg-[#0a0e17] py-8 md:py-12">
        <div className="container">
          <div className="text-center mb-6">
            <p className="text-white/50 text-sm tracking-wider">
              {filtered.length} {t.photoCount}
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {filtered.map((image, index) => (
              <div
                key={image.src}
                className="break-inside-avoid group cursor-pointer relative overflow-hidden"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={isSpanish ? image.altEs : image.alt}
                  loading="lazy"
                  width={800}
                  height={600}
                  decoding="async"
                  className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                  style={{
                    /* Consistent industrial tone filter applied via CSS */
                    filter: "saturate(0.88) contrast(1.05) brightness(0.97)",
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium tracking-wide">
                    {isSpanish ? image.altEs : image.alt}
                  </p>
                </div>
                {/* Blue accent line on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#0066FF] group-hover:w-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Previous */}
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-[#0066FF]/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Next */}
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white/10 hover:bg-[#0066FF]/50 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* Image */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filtered[lightboxIndex].src}
              alt={
                isSpanish
                  ? filtered[lightboxIndex].altEs
                  : filtered[lightboxIndex].alt
              }
              className="max-w-full max-h-[78vh] object-contain"
              style={{
                filter: "saturate(0.88) contrast(1.05) brightness(0.97)",
              }}
              loading="lazy"
              width={1200}
              height={900}
              decoding="async"
            />
            <p className="text-white/70 text-sm mt-3 text-center tracking-wide">
              {isSpanish
                ? filtered[lightboxIndex].altEs
                : filtered[lightboxIndex].alt}
              <span className="text-white/40 ml-3">
                {lightboxIndex + 1} / {filtered.length}
              </span>
            </p>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
