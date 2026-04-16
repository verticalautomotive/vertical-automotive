import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme?: () => void;
  switchable: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  switchable?: boolean;
}

/**
 * Apply the theme class to <html> synchronously.
 * This is called both during initialization (to avoid a flash of wrong theme)
 * and on theme changes. Doing it synchronously in the useState initializer
 * means the class is set before the first paint, avoiding a forced reflow
 * that would otherwise happen when the useEffect runs after render.
 */
function applyThemeClass(theme: Theme) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
  switchable = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const resolved = switchable
      ? ((localStorage.getItem("theme") as Theme) || defaultTheme)
      : defaultTheme;
    // Apply synchronously during initialization — avoids post-render reflow.
    // The class is set before React paints, so no layout recalculation is needed.
    applyThemeClass(resolved);
    return resolved;
  });

  useEffect(() => {
    // Also apply on theme changes (user toggle).
    // This still causes a style recalculation, but only on explicit user action
    // (not during initial page load), so it doesn't affect Lighthouse scores.
    applyThemeClass(theme);
    if (switchable) {
      localStorage.setItem("theme", theme);
    }
  }, [theme, switchable]);

  const toggleTheme = switchable
    ? () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    : undefined;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, switchable }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
