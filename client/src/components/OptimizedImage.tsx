/**
 * OptimizedImage — Performance-optimized image component
 * - Converts Unsplash URLs to WebP format with proper sizing
 * - Adds loading="lazy" for below-fold images
 * - Supports fetchpriority="high" for LCP images
 * - Always renders with explicit width/height to prevent CLS
 * - Uses higher compression (q=50) for faster loads
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
 * Uses q=50 for better compression with acceptable quality
 */
function optimizeUnsplashUrl(url: string, targetWidth?: number): string {
  if (!url.includes("unsplash.com")) return url;
  
  const baseUrl = url.split("?")[0];
  const w = targetWidth || 600;
  return `${baseUrl}?w=${w}&q=50&fm=webp&fit=crop&auto=format`;
}

/**
 * Generate srcset for responsive images from Unsplash
 * Uses q=50 for better compression
 */
function generateSrcSet(url: string): string | undefined {
  if (!url.includes("unsplash.com")) return undefined;
  
  const baseUrl = url.split("?")[0];
  const widths = [400, 600, 800, 1200];
  return widths
    .map((w) => `${baseUrl}?w=${w}&q=50&fm=webp&fit=crop&auto=format ${w}w`)
    .join(", ");
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  className,
  style,
  ...props
}: OptimizedImageProps) {
  const optimizedSrc = optimizeUnsplashUrl(src, width);
  const srcSet = generateSrcSet(src);
  // Default dimensions based on 4:3 aspect ratio if not provided
  const imgWidth = width || 600;
  const imgHeight = height || Math.round(imgWidth * 0.75);

  return (
    <img
      src={optimizedSrc}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      {...(priority ? { fetchPriority: "high" } as any : {})}
      className={className}
      style={{
        contentVisibility: priority ? "visible" : "auto",
        ...style,
      }}
      {...props}
    />
  );
}
