/**
 * PhotoGallery — Reusable gallery component for vehicle type pages
 * Industrial Brutalism Design: Blue/white/black palette, bold typography
 * Masonry grid layout with lightbox viewer
 * Accepts array of images and displays in responsive grid
 * BILINGUAL: Supports alt text in EN/ES
 */
import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  src: string;
  alt: string;
  altEs: string;
}

interface PhotoGalleryProps {
  images: GalleryImage[];
  isSpanish: boolean;
  title?: string;
  titleEs?: string;
}

export default function PhotoGallery({
  images,
  isSpanish,
  title = "GALLERY",
  titleEs = "GALERÍA",
}: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length]);

  const handleNext = useCallback(() => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") setSelectedIndex(null);
    },
    [selectedIndex, handlePrev, handleNext]
  );

  // Attach keyboard listener when lightbox is open
  if (selectedIndex !== null && typeof window !== "undefined") {
    window.addEventListener("keydown", handleKeyDown);
  }

  if (images.length === 0) {
    return <></>;  
  }

  return (
    <section className="py-10 sm:py-20 bg-background">
      <div className="container">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4">
          {isSpanish ? titleEs : title}
        </h2>
        <div className="h-1 w-16 sm:w-24 bg-primary mb-8 sm:mb-12" />

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              data-gallery-tile
              className="group relative overflow-hidden aspect-square rounded-xl border border-primary/20 hover:border-primary transition-all duration-300 cursor-pointer"
              style={{ borderRadius: '0.75rem' }}
            >
              <img
                src={image.src}
                alt={isSpanish ? image.altEs : image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                style={{ filter: 'brightness(0.85) saturate(0.85)' }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">+</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setSelectedIndex(null)}
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Main image */}
          <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center">
            <img
              src={images[selectedIndex].src}
              alt={isSpanish ? images[selectedIndex].altEs : images[selectedIndex].alt}
              className="w-full h-full object-contain"
            />

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-10 h-10" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-10 h-10" />
                </button>
              </>
            )}

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/50 px-4 py-2 rounded">
              {selectedIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
