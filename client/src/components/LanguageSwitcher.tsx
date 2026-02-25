/**
 * LanguageSwitcher — Compact EN | ES toggle for header
 * Navigates to the equivalent page in the other language
 */
import { useLocation } from "wouter";
import { useTranslation } from "@/hooks/useTranslation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const [location, navigate] = useLocation();
  const { lang, getAlternatePath } = useTranslation();

  const handleSwitch = () => {
    const alt = getAlternatePath(location);
    navigate(alt);
  };

  return (
    <button
      onClick={handleSwitch}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-display font-bold tracking-wider border border-border/50 hover:border-primary hover:text-primary transition-colors ${className}`}
      aria-label={lang === "en" ? "Cambiar a Español" : "Switch to English"}
    >
      <Globe className="w-3.5 h-3.5" />
      <span className={lang === "en" ? "text-primary" : ""}>EN</span>
      <span className="text-muted-foreground">|</span>
      <span className={lang === "es" ? "text-primary" : ""}>ES</span>
    </button>
  );
}
