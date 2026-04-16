/**
 * Service Worker Registration
 * Registers the CDN caching service worker on page load.
 * Only runs in production (not dev server) to avoid interfering with HMR.
 */
export function registerServiceWorker(): void {
  if (typeof window === 'undefined') return;
  if (!('serviceWorker' in navigator)) return;

  // Only register in production to avoid interfering with Vite HMR in dev
  if (import.meta.env.DEV) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js', { scope: '/' })
      .then((registration) => {
        // SW registered successfully — silent in production
        if (import.meta.env.DEV) {
          console.log('[SW] Registered:', registration.scope);
        }
      })
      .catch((err) => {
        // SW registration failed — non-fatal, site works without it
        if (import.meta.env.DEV) {
          console.warn('[SW] Registration failed:', err);
        }
      });
  });
}
