/**
 * Vertical Automotive Service Worker
 * Purpose: Cache CDN static assets (images, fonts, WebP) in the browser
 * for 1 year, since the CloudFront origin does not set Cache-Control headers.
 *
 * Strategy: Cache-First for CDN assets (images, fonts)
 * - On first visit: fetch from CDN, store in Cache API
 * - On repeat visits: serve from Cache API instantly (no network request)
 * - Cache expires after 1 year (365 days)
 *
 * This SW does NOT intercept HTML, JS, CSS, or API requests.
 */

const CACHE_NAME = 'va-static-v1';
const CDN_ORIGIN = 'https://d2xsxph8kpxj0f.cloudfront.net';
const CACHE_TTL_MS = 365 * 24 * 60 * 60 * 1000; // 1 year in milliseconds

// File types to cache from CDN
const CACHEABLE_EXTENSIONS = [
  '.webp', '.jpg', '.jpeg', '.png', '.svg', '.gif',
  '.woff', '.woff2', '.ttf', '.otf',
  '.mp4', '.webm'
];

function isCacheableUrl(url) {
  try {
    const parsed = new URL(url);
    // Only cache CDN assets
    if (parsed.origin !== CDN_ORIGIN) return false;
    const path = parsed.pathname.toLowerCase();
    return CACHEABLE_EXTENSIONS.some(ext => path.endsWith(ext));
  } catch {
    return false;
  }
}

function isCacheExpired(response) {
  const cachedAt = response.headers.get('sw-cached-at');
  if (!cachedAt) return false; // No timestamp = treat as valid
  return Date.now() - parseInt(cachedAt, 10) > CACHE_TTL_MS;
}

// Install: activate immediately
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// Activate: claim all clients immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old cache versions
      caches.keys().then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
    ])
  );
});

// Fetch: Cache-First strategy for CDN assets
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Only handle GET requests to cacheable CDN URLs
  if (request.method !== 'GET' || !isCacheableUrl(request.url)) {
    return; // Let browser handle normally
  }

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(request);

      // Return cached response if valid and not expired
      if (cached && !isCacheExpired(cached)) {
        return cached;
      }

      // Fetch from network
      try {
        const networkResponse = await fetch(request);

        if (networkResponse.ok) {
          // Clone the response and add a timestamp header before caching
          const headers = new Headers(networkResponse.headers);
          headers.set('sw-cached-at', Date.now().toString());
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');

          const responseToCache = new Response(
            await networkResponse.clone().arrayBuffer(),
            {
              status: networkResponse.status,
              statusText: networkResponse.statusText,
              headers
            }
          );

          cache.put(request, responseToCache);
        }

        return networkResponse;
      } catch (err) {
        // Network failed — return stale cache if available
        if (cached) return cached;
        throw err;
      }
    })
  );
});
