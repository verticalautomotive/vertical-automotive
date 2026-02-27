/**
 * OptimizedImage — Performance-optimized image component
 * - Converts Unsplash URLs to WebP format with proper sizing
 * - Adds loading="lazy" for below-fold images
 * - Supports fetchpriority="high" for LCP images
 */

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean; // Set true for above-fold / LCP images
  sizes?: string;
}

/**
 * Transform Unsplash URL to use WebP format and proper dimensions
 */
function optimizeUnsplashUrl(url: string, targetWidth?: number): string {
  if (!url.includes("unsplash.com")) return url;
  
  // Parse existing URL and rebuild with optimized params
  const baseUrl = url.split("?")[0];
  const w = targetWidth || 600;
  return `${baseUrl}?w=${w}&q=60&fm=webp&fit=crop&auto=format`;
}

/**
 * Generate srcset for responsive images from Unsplash
 */
function generateSrcSet(url: string): string | undefined {
  if (!url.includes("unsplash.com")) return undefined;
  
  const baseUrl = url.split("?")[0];
  const widths = [400, 600, 800, 1200];
  return widths
    .map((w) => `${baseUrl}?w=${w}&q=60&fm=webp&fit=crop&auto=format ${w}w`)
    .join(", ");
}

export default function OptimizedImage({
  src,
  alt,
  width,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  ...props
}: OptimizedImageProps) {
  const optimizedSrc = optimizeUnsplashUrl(src, width);
  const srcSet = generateSrcSet(src);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" } as any : {})}
      {...props}
    />
  );
}
