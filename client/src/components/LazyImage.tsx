/**
 * LazyImage — Wrapper for any <img> with shimmer placeholder + fade-in
 * Use this for standalone img tags that don't go through OptimizedImage.
 * Provides a dark shimmer placeholder while loading, then fades in smoothly.
 */
import { useState, useCallback, useRef, useEffect } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Extra class for the shimmer wrapper div */
  wrapperClassName?: string;
  /** Extra style for the shimmer wrapper div */
  wrapperStyle?: React.CSSProperties;
}

export default function LazyImage({
  wrapperClassName = "",
  wrapperStyle,
  className = "",
  onLoad,
  ...imgProps
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached
  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setLoaded(true);
    }
  }, []);

  const handleLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      setLoaded(true);
      onLoad?.(e);
    },
    [onLoad]
  );

  return (
    <div
      className={`img-shimmer ${loaded ? "shimmer-done" : ""} ${wrapperClassName}`}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%",
        ...wrapperStyle,
      }}
    >
      <img
        ref={imgRef}
        {...imgProps}
        onLoad={handleLoad}
        className={`img-fade-in ${loaded ? "loaded" : ""} ${className}`}
      />
    </div>
  );
}
