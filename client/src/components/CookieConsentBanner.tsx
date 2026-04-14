/**
 * CookieConsentBanner — GDPR/CCPA compliant cookie consent
 * Industrial Brutalism design, bilingual (EN/ES), localStorage persistence
 * Minimal, non-intrusive, respects user preferences
 */
import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export type ConsentPreferences = {
  essential: boolean; // Always true (required)
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
};

const CONSENT_STORAGE_KEY = "cookie_consent_preferences";
const CONSENT_VERSION = "1.0";

export function CookieConsentBanner() {
  const { isSpanish } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    timestamp: Date.now(),
  });

  // Load saved preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!saved) {
      setIsVisible(true);
    } else {
      try {
        const parsed = JSON.parse(saved);
        setPreferences(parsed);
      } catch {
        setIsVisible(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const newPrefs: ConsentPreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    };
    savePreferences(newPrefs);
  };

  const handleRejectAll = () => {
    const newPrefs: ConsentPreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    };
    savePreferences(newPrefs);
  };

  const handleSavePreferences = () => {
    const newPrefs: ConsentPreferences = {
      ...preferences,
      timestamp: Date.now(),
    };
    savePreferences(newPrefs);
  };

  const savePreferences = (prefs: ConsentPreferences) => {
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    
    // Push consent event to dataLayer for GTM to handle
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "cookie_consent",
      analytics_enabled: prefs.analytics,
      marketing_enabled: prefs.marketing,
    });
  };

  if (!isVisible) return null;

  const content = isSpanish
    ? {
        title: "Preferencias de Cookies",
        description:
          "Utilizamos cookies para mejorar su experiencia. Seleccione sus preferencias de privacidad.",
        essential: "Esencial",
        essentialDesc: "Requerido para funcionalidad básica del sitio",
        analytics: "Análisis",
        analyticsDesc: "Nos ayuda a entender cómo usa el sitio",
        marketing: "Marketing",
        marketingDesc: "Personaliza anuncios según sus intereses",
        rejectAll: "Rechazar Todo",
        acceptAll: "Aceptar Todo",
        savePreferences: "Guardar Preferencias",
        details: "Detalles",
      }
    : {
        title: "Cookie Preferences",
        description:
          "We use cookies to enhance your experience. Please select your privacy preferences.",
        essential: "Essential",
        essentialDesc: "Required for basic site functionality",
        analytics: "Analytics",
        analyticsDesc: "Helps us understand how you use the site",
        marketing: "Marketing",
        marketingDesc: "Personalizes ads based on your interests",
        rejectAll: "Reject All",
        acceptAll: "Accept All",
        savePreferences: "Save Preferences",
        details: "Details",
      };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Compact view */}
        {!isExpanded && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">
                {content.title}
              </h3>
              <p className="text-sm text-muted-foreground">{content.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="text-xs sm:text-sm"
              >
                {content.rejectAll}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="text-xs sm:text-sm"
              >
                {content.acceptAll}
              </Button>
              <button
                onClick={() => setIsExpanded(true)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                aria-label={content.details}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Expanded view */}
        {isExpanded && (
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-foreground">
                  {content.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {content.description}
                </p>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie toggles */}
            <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border/50">
              {/* Essential */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="essential"
                  checked={true}
                  disabled
                  className="mt-1 w-4 h-4 rounded border-border cursor-not-allowed"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="essential"
                    className="text-sm font-semibold text-foreground cursor-not-allowed"
                  >
                    {content.essential}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {content.essentialDesc}
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      analytics: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="analytics"
                    className="text-sm font-semibold text-foreground cursor-pointer"
                  >
                    {content.analytics}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {content.analyticsDesc}
                  </p>
                </div>
              </div>

              {/* Marketing */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({
                      ...preferences,
                      marketing: e.target.checked,
                    })
                  }
                  className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <label
                    htmlFor="marketing"
                    className="text-sm font-semibold text-foreground cursor-pointer"
                  >
                    {content.marketing}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {content.marketingDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="flex-1"
              >
                {content.rejectAll}
              </Button>
              <Button
                size="sm"
                onClick={handleSavePreferences}
                className="flex-1"
              >
                {content.savePreferences}
              </Button>
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1"
              >
                {content.acceptAll}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Hook to check if user has consented to a specific cookie category
 * Usage: const hasAnalyticsConsent = useConsentPreference('analytics');
 */
export function useConsentPreference(
  category: keyof Omit<ConsentPreferences, "timestamp">
): boolean {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (saved) {
      try {
        const prefs = JSON.parse(saved) as ConsentPreferences;
        setHasConsent(prefs[category] ?? false);
      } catch {
        setHasConsent(false);
      }
    }
  }, [category]);

  return hasConsent;
}
