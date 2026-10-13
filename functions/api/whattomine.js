// Relay for the two whattomine feeds the ASIC and GPU mining calculators read.
//
// Not an open proxy: the client picks a feed by NAME (?kind=asic|gpu), never by URL,
// and only the two upstreams below can ever be fetched.
//
// Cache: the last good copy of each feed lives in the colo's Cache API. It is served as
// fresh for FRESH_SECONDS; after that the next request refetches, and if whattomine is
// down or answers with something that is not its JSON, the stale copy (up to
// STALE_SECONDS old) is served instead of an error. A malformed body is never cached.
const FEEDS = {
  asic: "https://whattomine.com/asic.json",
  gpu: "https://whattomine.com/coins.json",
};

const FRESH_SECONDS = 600;
const STALE_SECONDS = 86400;
const UPSTREAM_TIMEOUT_MS = 5000;

// The site itself is same-origin and needs no CORS. The Android app serves its pages
// from https://localhost (Capacitor, androidScheme https), the iOS build from
// capacitor://localhost — both call https://cryptocalk.com/api/whattomine directly.
const ALLOWED_ORIGINS = new Set([
  "https://cryptocalk.com",
  "https://www.cryptocalk.com",
  "https://localhost",
  "capacitor://localhost",
]);

function corsHeaders(origin) {
  const headers = { vary: "Origin" };
  if (origin && ALLOWED_ORIGINS.has(origin)) {
    headers["access-control-allow-origin"] = origin;
    headers["access-control-expose-headers"] = "X-Cache, X-Fetched-At";
  }
  return headers;
}

function jsonError(error, status, origin, extra = {}) {
  return new Response(JSON.stringify({ error }), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex",
      ...corsHeaders(origin),
      ...extra,
    },
  });
}

async function fetchFeed(upstream) {
  const res = await fetch(upstream, {
    headers: {
      accept: "application/json",
      "user-agent": "cryptocalk.com mining calculators (+https://cryptocalk.com/methodology/)",
    },
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`upstream HTTP ${res.status}`);
  const text = await res.text();
  const data = JSON.parse(text);
  const coins = data && data.coins;
  if (!coins || typeof coins !== "object" || Array.isArray(coins) || Object.keys(coins).length === 0) {
    throw new Error("upstream payload has no coins");
  }
  return text;
}

function respond(body, fetchedAt, cacheState, origin) {
  const ageSeconds = Math.max(0, Math.floor((Date.now() - fetchedAt) / 1000));
  return new Response(body, {
    status: 200,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": `public, max-age=${Math.max(0, FRESH_SECONDS - ageSeconds)}`,
      "x-cache": cacheState,
      "x-fetched-at": new Date(fetchedAt).toISOString(),
      "x-robots-tag": "noindex",
      ...corsHeaders(origin),
    },
  });
}

export async function handleWhattomine(request, ctx) {
  const url = new URL(request.url);
  const origin = request.headers.get("origin");

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-methods": "GET, OPTIONS",
        "access-control-max-age": "86400",
        ...corsHeaders(origin),
      },
    });
  }
  if (request.method !== "GET") {
    return jsonError("method_not_allowed", 405, origin, { allow: "GET, OPTIONS" });
  }

  const kind = url.searchParams.get("kind");
  const upstream = Object.hasOwn(FEEDS, kind) ? FEEDS[kind] : null;
  if (!upstream) {
    return jsonError("unknown_feed", 400, origin);
  }

  // One cache entry per feed, whatever else is in the query string (?cb=… etc.).
  const cacheKey = new Request(`${url.origin}/api/whattomine?kind=${kind}`);
  const cache = caches.default;
  const cached = await cache.match(cacheKey);
  let cachedBody = null;
  let cachedAt = 0;
  if (cached) {
    cachedAt = Number(cached.headers.get("x-fetched-at-ms")) || 0;
    cachedBody = await cached.text();
    if (Date.now() - cachedAt < FRESH_SECONDS * 1000) {
      return respond(cachedBody, cachedAt, "HIT", origin);
    }
  }

  try {
    const body = await fetchFeed(upstream);
    const fetchedAt = Date.now();
    ctx.waitUntil(
      cache.put(
        cacheKey,
        new Response(body, {
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": `public, max-age=${STALE_SECONDS}`,
            "x-fetched-at-ms": String(fetchedAt),
          },
        }),
      ),
    );
    return respond(body, fetchedAt, "MISS", origin);
  } catch (err) {
    if (cachedBody !== null) {
      return respond(cachedBody, cachedAt, "STALE", origin);
    }
    console.error(`whattomine ${kind}: ${err && err.message}`);
    return jsonError("upstream_unavailable", 502, origin);
  }
}
