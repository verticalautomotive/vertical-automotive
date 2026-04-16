/**
 * Gallery Page — Industrial Brutalism Design
 * Blue/white/black palette, bold typography
 * Masonry grid layout with lightbox viewer
 * CSS filter for consistent industrial lighting across all images and videos
 * BILINGUAL: Uses useTranslation for EN/ES content
 */
import { useState, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight, Camera, Play } from "lucide-react";
import SEO from "@/components/SEO";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { useTranslation } from "@/hooks/useTranslation";

type MediaType = "image" | "video";

interface GalleryItem {
  src: string;
  alt: string;
  altEs: string;
  category: "classics" | "european" | "japanese" | "american" | "shop" | "brakes" | "diagnostics" | "engine";
  type: MediaType;
  /** For videos: a still frame thumbnail URL (optional — falls back to video poster) */
  thumb?: string;
}

const CDN = "/img";

const GALLERY_ITEMS: GalleryItem[] = [
  // ── Existing photos ──────────────────────────────────────────────────────────
  {
    src: `${CDN}/gallery-TUADJzvESUAODOSz_5acd13d1.jpg`,
    alt: "Classic Plymouth Fury in the shop",
    altEs: "Plymouth Fury clásico en el taller",
    category: "classics",
    type: "image",
  },
  {
    src: `${CDN}/gallery-BbQEKgqRxpnCNVgB_c7cf6bd2.jpg`,
    alt: "Team member with Acura NSX and Range Rover",
    altEs: "Miembro del equipo con Acura NSX y Range Rover",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/gallery-qjgLkqRLLuXZLhTt_9d71666c.jpg`,
    alt: "Performance brake rotor and red caliper installation",
    altEs: "Instalación de rotor de freno y caliper rojo de alto rendimiento",
    category: "brakes",
    type: "image",
  },
  {
    src: `${CDN}/gallery-dKGmwKPRjVoFghKt_a5f512d9.jpg`,
    alt: "Two red Acura NSX on lift and floor",
    altEs: "Dos Acura NSX rojos en elevador y piso",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/gallery-DyEXrexCKnZJcfWe_fd43483d.jpg`,
    alt: "Blue Lexus GS F engine bay service",
    altEs: "Servicio del compartimento del motor del Lexus GS F azul",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/gallery-fBKbEQlMKlMWvTJn_05b9b12e.jpg`,
    alt: "Black RAM truck on lift for service",
    altEs: "Camioneta RAM negra en elevador para servicio",
    category: "american",
    type: "image",
  },
  {
    src: `${CDN}/gallery-LvRvQWZpiVPYKGaT_483be56b.jpg`,
    alt: "Classic Oldsmobile 442 on alignment rack",
    altEs: "Oldsmobile 442 clásico en rack de alineación",
    category: "classics",
    type: "image",
  },
  {
    src: `${CDN}/gallery-tuGlZuceDGQGnQMx_4b20df64.jpg`,
    alt: "Audi and BMW X5 in busy shop bay",
    altEs: "Audi y BMW X5 en bahía de taller ocupada",
    category: "european",
    type: "image",
  },
  {
    src: `${CDN}/gallery-nmWHfJqJQiUDdUlJ_b850830c.jpg`,
    alt: "Classic Dodge Charger R/T rear view",
    altEs: "Vista trasera del Dodge Charger R/T clásico",
    category: "classics",
    type: "image",
  },
  {
    src: `${CDN}/gallery-ThpmSuUWSAbFJnPy_f277215d.jpg`,
    alt: "Porsche and BMW service bay",
    altEs: "Bahía de servicio de Porsche y BMW",
    category: "european",
    type: "image",
  },
  {
    src: `${CDN}/gallery-ChoeLQrpvFpvbtQS_3911cc80.jpg`,
    alt: "Mercedes-Benz Maybach on alignment machine",
    altEs: "Mercedes-Benz Maybach en máquina de alineación",
    category: "european",
    type: "image",
  },
  {
    src: `${CDN}/gallery-fOJuCwhCkzrbRNeq_ab359e50.jpg`,
    alt: "White Toyota Tacoma on alignment rack",
    altEs: "Toyota Tacoma blanca en rack de alineación",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/gallery-PTWDPJpqcdITQUvI_4603ec22.jpg`,
    alt: "Classic Dodge Charger R/T front view in shop",
    altEs: "Vista frontal del Dodge Charger R/T clásico en el taller",
    category: "classics",
    type: "image",
  },
  {
    src: `${CDN}/gallery-fjpshhWUcXkJeyPO_f7092b89.jpg`,
    alt: "Busy shop floor with multiple vehicles",
    altEs: "Piso del taller ocupado con múltiples vehículos",
    category: "shop",
    type: "image",
  },
  {
    src: `${CDN}/gallery-KhsRzJjApcIGSPfa_dc25fa8c.jpg`,
    alt: "Technician servicing Audi Q3 engine",
    altEs: "Técnico dando servicio al motor del Audi Q3",
    category: "european",
    type: "image",
  },

  // ── New photos (Apr 2025) ─────────────────────────────────────────────────
  {
    src: `${CDN}/IMG_0421_d51b2b0a.webp`,
    alt: "Subaru flat-four short block engine rebuild on stand",
    altEs: "Reconstrucción del bloque corto del motor plano Subaru en soporte",
    category: "engine",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0981_db1be89f.webp`,
    alt: "Subaru WRX engine removal — old and new engines on floor",
    altEs: "Extracción del motor del Subaru WRX — motores viejo y nuevo en el piso",
    category: "engine",
    type: "image",
  },
  {
    src: `${CDN}/IMG_83773_bbe6ccbe.webp`,
    alt: "Tesla red brake caliper and rotor close-up",
    altEs: "Primer plano del caliper rojo y rotor de freno Tesla",
    category: "brakes",
    type: "image",
  },
  {
    src: `${CDN}/IMG_8241_90e42d66.webp`,
    alt: "Burnt circuit board — electrical diagnostics repair",
    altEs: "Placa de circuito quemada — reparación de diagnóstico eléctrico",
    category: "diagnostics",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0311_9000ac5d.webp`,
    alt: "Infiniti V6 engine bay — Autel MaxiSys diagnostic scan",
    altEs: "Compartimento del motor Infiniti V6 — escaneo diagnóstico Autel MaxiSys",
    category: "diagnostics",
    type: "image",
  },
  {
    src: `${CDN}/IMG_1009_6c7e8025.webp`,
    alt: "New brake rotor installed on vehicle on lift",
    altEs: "Nuevo rotor de freno instalado en vehículo en elevador",
    category: "brakes",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0592_e6e486fd.webp`,
    alt: "Slotted performance rotor with Siprol caliper",
    altEs: "Rotor de alto rendimiento ranurado con caliper Siprol",
    category: "brakes",
    type: "image",
  },
  {
    src: `${CDN}/IMG_8115_405753ed.webp`,
    alt: "Blue Maserati Ghibli on alignment rack",
    altEs: "Maserati Ghibli azul en rack de alineación",
    category: "european",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0314_811d09ac.webp`,
    alt: "Technician running Autel MaxiSys on Infiniti engine",
    altEs: "Técnico ejecutando Autel MaxiSys en motor Infiniti",
    category: "diagnostics",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0182_9b54421c.webp`,
    alt: "Custom two-tone Rolls-Royce Ghost on BendPak lift",
    altEs: "Rolls-Royce Ghost bicolor personalizado en elevador BendPak",
    category: "european",
    type: "image",
  },
  {
    src: `${CDN}/IMG_6975_a8608308.webp`,
    alt: "Tesla Model X service mode — battery diagnostic on laptop",
    altEs: "Modo de servicio Tesla Model X — diagnóstico de batería en laptop",
    category: "diagnostics",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0659_aa695fef.webp`,
    alt: "Technician working on Lexus SC rear suspension",
    altEs: "Técnico trabajando en la suspensión trasera del Lexus SC",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/IMG_1103_f947a312.webp`,
    alt: "Black Cadillac Lyriq EV on BendPak lift — wheel alignment",
    altEs: "Cadillac Lyriq EV negro en elevador BendPak — alineación de ruedas",
    category: "american",
    type: "image",
  },
  {
    src: `${CDN}/IMG_1875_4def9390.webp`,
    alt: "Mitsubishi Lancer Evo X with carbon fiber engine bay",
    altEs: "Mitsubishi Lancer Evo X con compartimento del motor de fibra de carbono",
    category: "japanese",
    type: "image",
  },
  {
    src: `${CDN}/IMG_0943_960da29d.webp`,
    alt: "Busy shop floor — multiple vehicles on lifts",
    altEs: "Piso del taller ocupado — múltiples vehículos en elevadores",
    category: "shop",
    type: "image",
  },

  // ── New videos (Apr 2025) ─────────────────────────────────────────────────
  {
    src: `${CDN}/2e4a0f5799094ef1a82c8beea126f442_83cedb62.mov`,
    alt: "Shop work in action",
    altEs: "Trabajo en el taller en acción",
    category: "shop",
    type: "video",
  },
  {
    src: `${CDN}/BEATASK-P.I_110d9817.mp4`,
    alt: "Vertical Automotive — behind the scenes",
    altEs: "Vertical Automotive — detrás de cámaras",
    category: "shop",
    type: "video",
  },
  {
    src: `${CDN}/IMG_0418_087a0449.MOV`,
    alt: "Engine rebuild process — time-lapse",
    altEs: "Proceso de reconstrucción de motor — time-lapse",
    category: "engine",
    type: "video",
  },
  {
    src: `${CDN}/IMG_0591_29f45667.MOV`,
    alt: "Brake service in progress",
    altEs: "Servicio de frenos en progreso",
    category: "brakes",
    type: "video",
  },
  {
    src: `${CDN}/IMG_1634_33e5bae4.MOV`,
    alt: "Diagnostic scan on vehicle",
    altEs: "Escaneo diagnóstico en vehículo",
    category: "diagnostics",
    type: "video",
  },
  {
    src: `${CDN}/IMG_2238_96857ced.MOV`,
    alt: "Shop floor activity",
    altEs: "Actividad en el piso del taller",
    category: "shop",
    type: "video",
  },
  {
    src: `${CDN}/IMG_2343_ecf093a5.MOV`,
    alt: "Vehicle service walkthrough",
    altEs: "Recorrido de servicio del vehículo",
    category: "shop",
    type: "video",
  },
  {
    src: `${CDN}/IMG_6113_20dc7f79.MOV`,
    alt: "Engine component detail",
    altEs: "Detalle de componente del motor",
    category: "engine",
    type: "video",
  },
  {
    src: `${CDN}/IMG_7883_414cd150.MOV`,
    alt: "Full shop overview — multiple bays in action",
    altEs: "Vista general del taller — múltiples bahías en acción",
    category: "shop",
    type: "video",
  },
  {
    src: `${CDN}/IMG_7922_4d5cf9d7.MOV`,
    alt: "Quick shop clip",
    altEs: "Clip rápido del taller",
    category: "shop",
    type: "video",
  },
];

const CATEGORIES = [
  { key: "all", labelEn: "All", labelEs: "Todos" },
  { key: "classics", labelEn: "Classics", labelEs: "Clásicos" },
  { key: "european", labelEn: "European", labelEs: "Europeos" },
  { key: "japanese", labelEn: "Japanese", labelEs: "Japoneses" },
  { key: "american", labelEn: "American", labelEs: "Americanos" },
  { key: "engine", labelEn: "Engine", labelEs: "Motor" },
  { key: "brakes", labelEn: "Brakes", labelEs: "Frenos" },
  { key: "diagnostics", labelEn: "Diagnostics", labelEs: "Diagnóstico" },
  { key: "shop", labelEn: "Our Shop", labelEs: "Nuestro Taller" },
] as const;

/** Inline video thumbnail card */
function VideoThumb({
  item,
  onClick,
  isSpanish,
}: {
  item: GalleryItem;
  onClick: () => void;
  isSpanish: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div
      className="break-inside-avoid group cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        preload="metadata"
        muted
        playsInline
        className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
        style={{ filter: "saturate(0.88) contrast(1.05) brightness(0.97)" }}
        aria-label={isSpanish ? item.altEs : item.alt}
      />
      {/* Play icon overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors duration-300">
        <div className="w-14 h-14 rounded-full bg-[#0066FF]/80 flex items-center justify-center group-hover:bg-[#0066FF] transition-colors duration-300">
          <Play className="w-6 h-6 text-white ml-1" fill="white" />
        </div>
      </div>
      {/* Caption on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p className="text-white text-sm font-medium tracking-wide">
          {isSpanish ? item.altEs : item.alt}
        </p>
      </div>
      {/* Blue accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#0066FF] group-hover:w-full transition-all duration-500" />
    </div>
  );
}

export default function GalleryPage() {
  const { isSpanish } = useTranslation();
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
      ? "Vea fotos y videos de nuestro taller, vehículos clásicos, europeos y japoneses en servicio en Vertical Automotive, Fort Lauderdale."
      : "See photos and videos of our shop, classic, European, and Japanese vehicles being serviced at Vertical Automotive, Fort Lauderdale.",
    mediaCount: isSpanish ? "elementos" : "items",
  };

  const filtered =
    activeCategory === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    },
    [closeLightbox, goNext, goPrev]
  );

  const currentItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        keywords="auto repair gallery, car shop photos, Fort Lauderdale mechanic, classic cars, European car service, Japanese car repair, engine rebuild, brake service"
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
                  ? GALLERY_ITEMS.length
                  : GALLERY_ITEMS.filter((item) => item.category === cat.key).length;
              if (count === 0) return null;
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
              {filtered.length} {t.mediaCount}
            </p>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {filtered.map((item, index) =>
              item.type === "video" ? (
                <VideoThumb
                  key={item.src}
                  item={item}
                  onClick={() => openLightbox(index)}
                  isSpanish={isSpanish}
                />
              ) : (
                <div
                  key={item.src}
                  className="break-inside-avoid group cursor-pointer relative overflow-hidden"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={item.src}
                    alt={isSpanish ? item.altEs : item.alt}
                    loading="lazy"
                    width={800}
                    height={600}
                    decoding="async"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                    style={{
                      filter: "saturate(0.88) contrast(1.05) brightness(0.97)",
                    }}
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium tracking-wide">
                      {isSpanish ? item.altEs : item.alt}
                    </p>
                  </div>
                  {/* Blue accent line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#0066FF] group-hover:w-full transition-all duration-500" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && currentItem && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="dialog"
          aria-label="Media lightbox"
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

          {/* Media */}
          <div
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {currentItem.type === "video" ? (
              <video
                key={currentItem.src}
                src={currentItem.src}
                controls
                autoPlay
                playsInline
                className="max-w-full max-h-[78vh] object-contain"
                style={{ filter: "saturate(0.88) contrast(1.05) brightness(0.97)" }}
              />
            ) : (
              <img
                src={currentItem.src}
                alt={isSpanish ? currentItem.altEs : currentItem.alt}
                className="max-w-full max-h-[78vh] object-contain"
                style={{
                  filter: "saturate(0.88) contrast(1.05) brightness(0.97)",
                }}
                loading="lazy"
                width={1200}
                height={900}
                decoding="async"
              />
            )}
            <p className="text-white/70 text-sm mt-3 text-center tracking-wide">
              {isSpanish ? currentItem.altEs : currentItem.alt}
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
