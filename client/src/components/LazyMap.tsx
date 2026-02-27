/**
 * LazyMap — Lazy-loaded Google Maps component
 * Only loads the Google Maps SDK when the map scrolls into the viewport.
 * Shows a static placeholder (styled div with address) until then.
 * This dramatically reduces TBT and improves LCP on mobile.
 */
import { useState, useRef, useEffect, useCallback } from "react";
import { MapView } from "@/components/Map";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface LazyMapProps {
  className?: string;
  initialCenter: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
  locationName?: string;
  address?: string;
}

export function LazyMap({
  className,
  initialCenter,
  initialZoom = 16,
  onMapReady,
  locationName,
  address,
}: LazyMapProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before visible
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Delay actual map load slightly after becoming visible to avoid jank
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShouldLoad(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {shouldLoad ? (
        <MapView
          className="w-full h-full"
          initialCenter={initialCenter}
          initialZoom={initialZoom}
          onMapReady={onMapReady}
        />
      ) : (
        // Static placeholder — lightweight, no external JS
        <div className="w-full h-full bg-secondary/80 flex flex-col items-center justify-center text-muted-foreground">
          <MapPin className="w-8 h-8 text-primary mb-2" />
          {locationName && (
            <p className="text-sm font-bold text-primary">{locationName}</p>
          )}
          {address && (
            <p className="text-xs text-muted-foreground mt-1">{address}</p>
          )}
          <p className="text-xs text-muted-foreground/60 mt-2">Loading map...</p>
        </div>
      )}
    </div>
  );
}
