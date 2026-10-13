// Live network data for the ASIC and GPU mining calculators. whattomine sends no CORS
// headers, so the browser cannot read it directly; our own Worker relays it
// (worker.js → functions/api/whattomine.js) and caches each feed for 10 minutes.
import { loc } from '../i18n/format';

export type WhattomineFeed = 'asic' | 'gpu';

export interface WhattomineCoin {
    difficulty?: number;
    difficulty24?: number;
    nethash?: number;
    block_reward?: number;
    block_reward24?: number;
    exchange_rate?: number;
}

export interface WhattominePayload {
    coins: Record<string, WhattomineCoin>;
}

// Visitors used to wait ~20 s on a dead public proxy before seeing the fallback.
// The Worker gives up on whattomine after 5 s, so 8 s here only cuts off a hung network.
const TIMEOUT_MS = 8000;

// The Android app serves its pages from https://localhost, where a relative /api/ path
// would hit the app's own file server — it has to call the site by its full origin.
function apiBase(): string {
    if (typeof document !== 'undefined' && document.documentElement.getAttribute('data-native') === '1') {
        return 'https://cryptocalk.com';
    }
    return '';
}

export async function fetchWhattomine(feed: WhattomineFeed): Promise<WhattominePayload> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
        const res = await fetch(`${apiBase()}/api/whattomine?kind=${feed}`, { signal: controller.signal });
        if (!res.ok) throw new Error(`whattomine ${feed}: HTTP ${res.status}`);
        const data = await res.json();
        if (!data || typeof data.coins !== 'object' || data.coins === null) {
            throw new Error(`whattomine ${feed}: no coins in payload`);
        }
        return data as WhattominePayload;
    } finally {
        clearTimeout(timer);
    }
}

/** "2026-10-13" → "Oct 13, 2026" / "13 oct 2026" … in the page's language. */
export function formatSnapshotDate(isoDate: string, lang?: string): string {
    return new Intl.DateTimeFormat(loc(lang), { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
        .format(new Date(`${isoDate}T00:00:00Z`));
}
