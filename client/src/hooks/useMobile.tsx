import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialize with matchMedia.matches instead of undefined to avoid
  // a flash of wrong layout AND avoid window.innerWidth forced reflow.
  // matchMedia reads pre-computed media state; innerWidth reads layout geometry
  // which forces the browser to flush pending style/layout calculations.
  const [isMobile, setIsMobile] = React.useState<boolean>(
    typeof window !== "undefined"
      ? window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`).matches
      : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    // Use mql.matches from the event — avoids window.innerWidth forced reflow
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
