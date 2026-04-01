const CACHE_NAME = 'cryptocalk-v2';
const REMOTE_ORIGIN = 'https://cryptocalk.com';

// Critical pages to pre-cache on install (local assets)
const PRECACHE_URLS = [
  '/',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png',
  '/manifest.json',
];

// Install: pre-cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();

  // After activation, try background update from live site
  event.waitUntil(backgroundUpdate());
});

// Fetch strategy:
// - _astro/* (hashed assets): Cache-first (immutable, content hashes in filenames)
// - HTML pages: Cache-first (local bundle), then background refresh from remote
// - CoinGecko API: Network-only (live prices, no caching in SW)
// - Everything else: Cache-first with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Let API requests pass through (CoinGecko, corsproxy, etc.)
  if (url.hostname !== self.location.hostname) return;

  // Hashed Astro assets — cache-first (immutable)
  if (url.pathname.startsWith('/_astro/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached;
        return fetch(request).then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // HTML pages — cache-first (fast offline), background refresh
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        // Start background refresh from remote
        const fetchPromise = fetchAndCache(request);
        // Return cached immediately if available, otherwise wait for network
        return cached || fetchPromise;
      })
    );
    return;
  }

  // Other assets (CSS, JS, images) — cache-first with network fallback
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => {
        // For navigation failures, fall back to cached homepage
        if (request.mode === 'navigate') {
          return caches.match('/');
        }
        return new Response('', { status: 408 });
      });
    })
  );
});

// Fetch and update cache in background
function fetchAndCache(request) {
  return fetch(request).then((response) => {
    if (response.ok) {
      const clone = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
    }
    return response;
  }).catch(() => null);
}

// Background update: fetch key pages from live site and update local cache
// This runs periodically when the app comes online
async function backgroundUpdate() {
  try {
    // Check if we're online
    const testResponse = await fetch(REMOTE_ORIGIN + '/manifest.json', { cache: 'no-store' });
    if (!testResponse.ok) return;

    const cache = await caches.open(CACHE_NAME);

    // Update the homepage and key calculator pages in background
    const pagesToUpdate = [
      '/',
      '/profit-calculator/',
      '/mining-calculator/',
      '/dca-calculator/',
      '/tax-calculator/',
      '/staking-calculator/',
      '/converter/',
    ];

    // Fetch from remote and cache locally (non-blocking)
    await Promise.allSettled(
      pagesToUpdate.map(async (path) => {
        try {
          const response = await fetch(REMOTE_ORIGIN + path, { cache: 'no-store' });
          if (response.ok) {
            // Cache with the local path as key (so local requests hit it)
            await cache.put(new Request(path), response);
          }
        } catch {
          // Silently skip pages that fail
        }
      })
    );

    // Notify clients that content was updated
    const clients = await self.clients.matchAll();
    clients.forEach((client) => {
      client.postMessage({ type: 'CONTENT_UPDATED' });
    });
  } catch {
    // Offline or network error — skip background update
  }
}

// Listen for manual update trigger from the app
self.addEventListener('message', (event) => {
  if (event.data === 'CHECK_UPDATE') {
    backgroundUpdate();
  }
});
