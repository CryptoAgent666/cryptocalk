// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
// @ts-expect-error — plain JS Worker module, no type declarations
import { handleWhattomine } from '../../functions/api/whattomine.js';

const PAYLOAD = JSON.stringify({ coins: { Bitcoin: { difficulty24: 1.3e14, exchange_rate: 84000 } } });

// Minimal stand-in for the Workers Cache API (caches.default), keyed by URL.
function memoryCache() {
  const store = new Map<string, { body: string; headers: [string, string][] }>();
  return {
    store,
    async match(req: Request) {
      const hit = store.get(req.url);
      return hit ? new Response(hit.body, { headers: hit.headers }) : undefined;
    },
    async put(req: Request, res: Response) {
      store.set(req.url, { body: await res.text(), headers: [...res.headers.entries()] });
    },
  };
}

let cache: ReturnType<typeof memoryCache>;
let fetchMock: ReturnType<typeof vi.fn>;
let pending: Promise<unknown>[];
const ctx = { waitUntil: (p: Promise<unknown>) => { pending.push(p); } };

async function call(path: string, init: RequestInit = {}) {
  const res = await handleWhattomine(new Request(`https://cryptocalk.com${path}`, init), ctx);
  await Promise.all(pending);
  pending = [];
  return res as Response;
}

beforeEach(() => {
  cache = memoryCache();
  pending = [];
  fetchMock = vi.fn(async () => new Response(PAYLOAD, { status: 200 }));
  vi.stubGlobal('caches', { default: cache });
  vi.stubGlobal('fetch', fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('/api/whattomine relay', () => {
  it('maps the two feed names to the two whattomine URLs and nothing else', async () => {
    await call('/api/whattomine?kind=asic');
    await call('/api/whattomine?kind=gpu');
    expect(fetchMock.mock.calls.map((c) => c[0])).toEqual([
      'https://whattomine.com/asic.json',
      'https://whattomine.com/coins.json',
    ]);
  });

  it.each([
    '/api/whattomine',
    '/api/whattomine?url=https://example.com/',
    '/api/whattomine?kind=https://example.com/',
    '/api/whattomine?kind=__proto__',
    '/api/whattomine?kind=constructor',
    '/api/whattomine?kind=ASIC',
  ])('refuses %s without touching the network', async (path) => {
    const res = await call(path);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'unknown_feed' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('refuses non-GET methods', async () => {
    const res = await call('/api/whattomine?kind=asic', { method: 'POST', body: 'x' });
    expect(res.status).toBe(405);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('serves the second request from cache, whatever cache-buster is appended', async () => {
    const first = await call('/api/whattomine?kind=asic');
    expect(first.headers.get('x-cache')).toBe('MISS');
    const second = await call('/api/whattomine?kind=asic&cb=123');
    expect(second.headers.get('x-cache')).toBe('HIT');
    expect(await second.text()).toBe(PAYLOAD);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('refetches after 10 minutes and serves the stale copy if whattomine is down', async () => {
    const t0 = Date.now();
    vi.spyOn(Date, 'now').mockReturnValue(t0);
    await call('/api/whattomine?kind=gpu');

    vi.spyOn(Date, 'now').mockReturnValue(t0 + 11 * 60 * 1000);
    fetchMock.mockRejectedValueOnce(new Error('timeout'));
    const stale = await call('/api/whattomine?kind=gpu');
    expect(stale.status).toBe(200);
    expect(stale.headers.get('x-cache')).toBe('STALE');
    expect(stale.headers.get('cache-control')).toBe('public, max-age=0');
    expect(await stale.text()).toBe(PAYLOAD);

    const fresh = await call('/api/whattomine?kind=gpu');
    expect(fresh.headers.get('x-cache')).toBe('MISS');
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it('never caches a body that is not whattomine JSON (e.g. a challenge page)', async () => {
    fetchMock.mockResolvedValueOnce(new Response('<html>Just a moment...</html>', { status: 200 }));
    const res = await call('/api/whattomine?kind=asic');
    expect(res.status).toBe(502);
    expect(cache.store.size).toBe(0);

    fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ coins: {} }), { status: 200 }));
    expect((await call('/api/whattomine?kind=asic')).status).toBe(502);
    expect(cache.store.size).toBe(0);
  });

  it('allows CORS only for the site and the app shells', async () => {
    const app = await call('/api/whattomine?kind=asic', { headers: { origin: 'https://localhost' } });
    expect(app.headers.get('access-control-allow-origin')).toBe('https://localhost');
    const other = await call('/api/whattomine?kind=asic', { headers: { origin: 'https://example.com' } });
    expect(other.headers.get('access-control-allow-origin')).toBeNull();
    expect(other.headers.get('vary')).toBe('Origin');
  });
});
