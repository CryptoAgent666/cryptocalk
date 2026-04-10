const CACHE_NAME = 'cryptocalk-v4';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== self.location.origin) return;

  // Navigation requests (page loads) — rewrite directory paths to index.html
  // This fixes Capacitor local file serving which can't resolve /path/ → /path/index.html
  if (request.mode === 'navigate') {
    let path = url.pathname;

    // /profit-calculator/ → /profit-calculator/index.html
    if (path.endsWith('/')) {
      path = path + 'index.html';
    }
    // /profit-calculator → /profit-calculator/index.html
    else if (!path.includes('.')) {
      path = path + '/index.html';
    }

    const rewrittenUrl = new URL(path, url.origin);
    const rewrittenRequest = new Request(rewrittenUrl.href, {
      headers: request.headers,
      mode: request.mode,
      credentials: request.credentials,
      redirect: request.redirect,
    });

    event.respondWith(
      fetch(rewrittenRequest)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('/index.html')))
    );
    return;
  }

  // Hashed assets (_astro/*) — cache-first (immutable)
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

  // Other same-origin assets — cache-first
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      }).catch(() => new Response('', { status: 408 }));
    })
  );
});
