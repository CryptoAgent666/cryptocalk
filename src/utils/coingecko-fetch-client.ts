const COINGECKO_HOST = 'api.coingecko.com';
const CACHE_TTL_MS = 5 * 60 * 1000;
const STALE_FALLBACK_MAX_AGE_MS = 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;
const MAX_RETRIES = 2;
const STORAGE_PREFIX = 'cg-cache-v1:';

interface CacheEntry {
  body: string;
  status: number;
  statusText: string;
  headers: Array<[string, string]>;
  createdAt: number;
  expiresAt: number;
}

interface WindowWithCoinGeckoPatch extends Window {
  __coinGeckoFetchPatched__?: boolean;
}

const memoryCache = new Map<string, CacheEntry>();
const inFlight = new Map<string, Promise<CacheEntry>>();

class RetriableHttpError extends Error {
  response: Response;

  constructor(response: Response) {
    super(`Retriable CoinGecko response: ${response.status}`);
    this.name = 'RetriableHttpError';
    this.response = response;
  }
}

function normalizeRequestUrl(rawUrl: string): string {
  const url = new URL(rawUrl, window.location.origin);
  url.hash = '';
  const sortedParams = new URLSearchParams(
    Array.from(url.searchParams.entries()).sort(([ak, av], [bk, bv]) => {
      if (ak === bk) return av.localeCompare(bv);
      return ak.localeCompare(bk);
    })
  );
  url.search = sortedParams.toString();
  return url.toString();
}

function getRequestMethod(input: RequestInfo | URL, init?: RequestInit): string {
  if (init?.method) return init.method.toUpperCase();
  if (input instanceof Request) return input.method.toUpperCase();
  return 'GET';
}

function getRequestUrl(input: RequestInfo | URL): string {
  if (typeof input === 'string') return input;
  if (input instanceof URL) return input.toString();
  return input.url;
}

function getCacheStorageKey(cacheKey: string): string {
  return `${STORAGE_PREFIX}${cacheKey}`;
}

function readFromSession(cacheKey: string): CacheEntry | null {
  try {
    const raw = window.sessionStorage.getItem(getCacheStorageKey(cacheKey));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CacheEntry;
    if (
      typeof parsed?.body !== 'string' ||
      typeof parsed?.status !== 'number' ||
      typeof parsed?.statusText !== 'string' ||
      !Array.isArray(parsed?.headers) ||
      typeof parsed?.createdAt !== 'number' ||
      typeof parsed?.expiresAt !== 'number'
    ) {
      window.sessionStorage.removeItem(getCacheStorageKey(cacheKey));
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeToSession(cacheKey: string, entry: CacheEntry): void {
  try {
    window.sessionStorage.setItem(getCacheStorageKey(cacheKey), JSON.stringify(entry));
  } catch {
    // Ignore storage quota and privacy mode errors.
  }
}

function setCacheEntry(cacheKey: string, entry: CacheEntry): void {
  memoryCache.set(cacheKey, entry);
  writeToSession(cacheKey, entry);
}

function getCacheEntry(cacheKey: string): CacheEntry | null {
  const fromMemory = memoryCache.get(cacheKey);
  if (fromMemory) return fromMemory;
  const fromSession = readFromSession(cacheKey);
  if (fromSession) {
    memoryCache.set(cacheKey, fromSession);
    return fromSession;
  }
  return null;
}

function toResponse(entry: CacheEntry, cacheState: 'hit' | 'stale' | 'miss' = 'hit'): Response {
  const headers = new Headers(entry.headers);
  headers.set('x-cg-cache', cacheState);
  return new Response(entry.body, {
    status: entry.status,
    statusText: entry.statusText,
    headers,
  });
}

function isFresh(entry: CacheEntry): boolean {
  return Date.now() <= entry.expiresAt;
}

function canUseAsStaleFallback(entry: CacheEntry): boolean {
  return Date.now() - entry.createdAt <= STALE_FALLBACK_MAX_AGE_MS;
}

function parseRetryAfterMs(response: Response): number | null {
  const header = response.headers.get('retry-after');
  if (!header) return null;
  const seconds = Number(header);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1000;
  }
  const dateMs = Date.parse(header);
  if (Number.isFinite(dateMs)) {
    const delta = dateMs - Date.now();
    return delta > 0 ? delta : 0;
  }
  return null;
}

function getBackoffDelayMs(attempt: number, retryAfterMs: number | null): number {
  if (retryAfterMs !== null) return retryAfterMs;
  const base = 500 * Math.pow(2, attempt);
  const jitter = Math.random() * 250;
  return base + jitter;
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function withTimeoutSignal(initSignal?: AbortSignal): { signal: AbortSignal; cleanup: () => void } {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const onAbort = () => controller.abort();
  initSignal?.addEventListener('abort', onAbort, { once: true });

  if (initSignal?.aborted) controller.abort();

  return {
    signal: controller.signal,
    cleanup: () => {
      window.clearTimeout(timeoutId);
      initSignal?.removeEventListener('abort', onAbort);
    },
  };
}

async function fetchAndCache(
  originalFetch: typeof fetch,
  input: RequestInfo | URL,
  init: RequestInit,
  cacheKey: string
): Promise<CacheEntry> {
  let lastError: unknown;
  const requestInit = { ...init };
  let attempt = 0;

  while (attempt <= MAX_RETRIES) {
    const { signal, cleanup } = withTimeoutSignal(requestInit.signal);
    try {
      const response = await originalFetch(input, { ...requestInit, signal });

      if (response.status === 429 || response.status >= 500) {
        throw new RetriableHttpError(response);
      }

      const body = await response.clone().text();
      const entry: CacheEntry = {
        body,
        status: response.status,
        statusText: response.statusText,
        headers: Array.from(response.headers.entries()),
        createdAt: Date.now(),
        expiresAt: Date.now() + CACHE_TTL_MS,
      };
      setCacheEntry(cacheKey, entry);
      return entry;
    } catch (error) {
      lastError = error;
      if (attempt === MAX_RETRIES) break;
      const retryAfterMs = error instanceof RetriableHttpError ? parseRetryAfterMs(error.response) : null;
      await wait(getBackoffDelayMs(attempt, retryAfterMs));
      attempt += 1;
    } finally {
      cleanup();
    }
  }

  throw lastError instanceof Error ? lastError : new Error('CoinGecko request failed');
}

function shouldInterceptRequest(input: RequestInfo | URL, init?: RequestInit): boolean {
  const method = getRequestMethod(input, init);
  if (method !== 'GET') return false;
  const rawUrl = getRequestUrl(input);
  const parsed = new URL(rawUrl, window.location.origin);
  return parsed.hostname === COINGECKO_HOST;
}

export function installCoinGeckoFetchInterceptor(): void {
  if (typeof window === 'undefined') return;

  const patchedWindow = window as WindowWithCoinGeckoPatch;
  if (patchedWindow.__coinGeckoFetchPatched__) return;
  patchedWindow.__coinGeckoFetchPatched__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    if (!shouldInterceptRequest(input, init)) {
      return originalFetch(input, init);
    }

    const cacheKey = normalizeRequestUrl(getRequestUrl(input));
    const existing = getCacheEntry(cacheKey);
    if (existing && isFresh(existing)) {
      return toResponse(existing, 'hit');
    }

    const staleEntry = existing && canUseAsStaleFallback(existing) ? existing : null;
    const pendingRequest = inFlight.get(cacheKey);
    if (pendingRequest) {
      try {
        const pendingEntry = await pendingRequest;
        return toResponse(pendingEntry, 'hit');
      } catch (error) {
        if (staleEntry) return toResponse(staleEntry, 'stale');
        throw error;
      }
    }

    const requestPromise = fetchAndCache(originalFetch, input, init ?? {}, cacheKey);
    inFlight.set(cacheKey, requestPromise);

    try {
      const entry = await requestPromise;
      return toResponse(entry, 'miss');
    } catch (error) {
      if (staleEntry) return toResponse(staleEntry, 'stale');
      throw error;
    } finally {
      inFlight.delete(cacheKey);
    }
  };
}
