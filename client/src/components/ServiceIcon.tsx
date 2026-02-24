/**
 * ServiceIcon — Shared SVG icon component for service types
 * Used across Home, Services, ServiceDetail, and VehicleDetail pages
 */

export default function ServiceIcon({ name }: { name: string }) {
  const iconColor = "text-primary group-hover:text-primary-foreground transition-colors";
  const size = "w-full h-full";

  const icons: Record<string, React.ReactNode> = {
    battery: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="14" width="32" height="22" rx="2" />
        <line x1="16" y1="10" x2="16" y2="14" />
        <line x1="32" y1="10" x2="32" y2="14" />
        <line x1="18" y1="22" x2="18" y2="30" />
        <line x1="14" y1="26" x2="22" y2="26" />
        <line x1="26" y1="26" x2="34" y2="26" />
      </svg>
    ),
    disc: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="8" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
      </svg>
    ),
    cog: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="8" />
        <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 38l4-4M34 14l4-4" />
      </svg>
    ),
    snowflake: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="24" y1="4" x2="24" y2="44" />
        <line x1="4" y1="24" x2="44" y2="24" />
        <line x1="10" y1="10" x2="38" y2="38" />
        <line x1="38" y1="10" x2="10" y2="38" />
        <circle cx="24" cy="24" r="4" fill="currentColor" />
      </svg>
    ),
    droplet: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M24 4C24 4 10 20 10 30a14 14 0 0028 0C38 20 24 4 24 4z" />
      </svg>
    ),
    search: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="20" cy="20" r="14" />
        <line x1="30" y1="30" x2="42" y2="42" />
        <path d="M14 20h12M20 14v12" />
      </svg>
    ),
    wrench: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M36 8a12 12 0 00-16 16L8 36l4 4 12-12a12 12 0 0016-16l-6 6-4-4 6-6z" />
      </svg>
    ),
    gauge: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="28" r="16" />
        <path d="M24 28l-8-12" strokeWidth="3" />
        <line x1="24" y1="14" x2="24" y2="18" />
        <line x1="12" y1="28" x2="16" y2="28" />
        <line x1="36" y1="28" x2="32" y2="28" />
      </svg>
    ),
    fuel: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="10" width="22" height="30" rx="2" />
        <rect x="12" y="14" width="14" height="10" />
        <path d="M30 20h6a4 4 0 014 4v12a2 2 0 01-4 0v-8" />
        <circle cx="37" cy="14" r="3" />
      </svg>
    ),
    zap: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" fill="currentColor" opacity="0.2" />
        <path d="M26 4L10 28h12L20 44l16-24H24L26 4z" />
      </svg>
    ),
    circle: (
      <svg className={`${size} ${iconColor}`} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="6" />
        <line x1="24" y1="6" x2="24" y2="12" />
        <line x1="24" y1="36" x2="24" y2="42" />
        <line x1="6" y1="24" x2="12" y2="24" />
        <line x1="36" y1="24" x2="42" y2="24" />
      </svg>
    ),
  };

  return <>{icons[name] || icons.wrench}</>;
}
