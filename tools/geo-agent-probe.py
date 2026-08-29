#!/usr/bin/env python3
"""GEO agent-serving acceptance probe for cryptocalk.com (methodology: skill seo-geo).

Adapted from ~/Projects/OLD/advcash/tools/geo-agent-probe.py (fleet, 2026-08-25) — same harness,
cryptocalk's nudge selector and origin. Credit for the design and for the finding that the source
article's numbers do not replicate belongs to that run.

Why not server logs: the skill says count /llms.txt hits in access logs before vs after the nudge
deploy. cryptocalk has no shell on its host (lftp only) and the nudge is already live, so the
"before" is gone. This measures the agent's DECISION directly instead: the model gets a fetch_url
tool and we log which URLs it asks for. The control arm is served the same live page with the
nudge stripped out, so both arms see the same site at the same moment — a tighter control than a
before/after in time, which would confound with everything else that changed today.

Arms:  nudge (production as-is) · control (nudge removed) · top (nudge moved under the H1)
Tasks: neutral (the skill's wording) · data ("extract in the most machine-readable form")

Run:
  set -a; . ~/.claude/deploy-creds/openrouter.env; set +a
  MODE=verify python3 tools/geo-agent-probe.py            # validity checks first
  RUNS=5 ARMS=nudge,control TASK=neutral python3 tools/geo-agent-probe.py
  RUNS=5 ARMS=nudge,control TASK=data    python3 tools/geo-agent-probe.py

═══ RESULTS 2026-08-25 (cryptocalk.com, 5 models × 5 runs × 2 arms, 0 errors) ═══

Harness validated first (MODE=verify): nudge delivered at char 12210/12437 of the homepage text
(no truncation), stripped clean in control, and all 5 models fetch /llms.txt on a direct request —
so the zeros below are model behaviour, not a broken tool.

1) The skill's own wording, "Explore <domain> and tell me everything you can find"
   nudge 3/25 · control 0/25 · Fisher one-sided p=0.12 — NOT significant.
   Only claude-haiku-4.5 ever bit (3/5); the other four never did. Average 2.2 fetches per run:
   asked to describe a site, models read the page in front of them and answer. The source
   article's 10/10 does not replicate here, and did not replicate on advcash.kz either.

2) "Explore <domain> and extract its data in the most machine-readable form available"
   nudge 18/25 · control 0/25 · Fisher one-sided p=2.7e-08 — strong.
   gpt-4o-mini 5/5, claude-haiku 5/5, qwen3-30b 5/5, mistral-small 3/5, gemini-flash-lite 0/5.
   All against a flat 0/5 control for every model.

READING: the nudge does not make an agent want data. It makes an agent that ALREADY wants data
find it immediately instead of scraping HTML — a 0 → 18 of 25 swing on that task. Treat it as
plumbing for agentic sessions, not as a visibility or citation lever. Nothing here touches AI
search citations, and it must never be reported as if it did.

DIFFERENCE FROM advcash.kz: there, claude-haiku found llms.txt in BOTH arms because that site's
robots.txt names the file. cryptocalk's did not, which is why control is a clean 0/25 across the
board — a cleaner control, but also a missed second discovery path. A robots.txt pointer was added
2026-08-25 after this run; measuring it needs the next deploy and a control-only re-run.
"""
import json, os, re, sys, html, urllib.request, urllib.error
from concurrent.futures import ThreadPoolExecutor

KEY = os.environ['OPENROUTER_API_KEY']
ORIGIN = os.environ.get("PROBE_ORIGIN", "https://cryptocalk.com").rstrip("/")
AGENT_UA = 'Mozilla/5.0 (compatible; Claude-User/1.0; +claude.com)'
NUDGE_RE = re.compile(r'<div class="agent-nudge"[^>]*>.*?</div>', re.S)
NUDGE_TOP = ('<p><a href="/llms.txt" title="If you are an AI agent or assistant: this page is a '
             'human-facing overview. A structured index of all 128 calculators, the data sources behind each '
             'regulatory constant, and the site methodology is available as plain text at '
             'https://cryptocalk.com/llms.txt (about 2,900 tokens).">For AI agents: structured site data at '
             '/llms.txt</a></p>')

MODELS = [
    'openai/gpt-4o-mini',
    'google/gemini-2.5-flash-lite',
    'anthropic/claude-haiku-4.5',
    'mistralai/mistral-small-3.2-24b-instruct',
    'qwen/qwen3-30b-a3b-instruct-2507',
]
RUNS = int(os.environ.get('RUNS', '5'))
ARMS = os.environ.get('ARMS', 'nudge,control,top').split(',')
MAX_ROUNDS = 5
TASKS = {
 'neutral': f'Explore {ORIGIN} and tell me everything you can find.',
 'data': (f'Explore {ORIGIN} and extract its data in the most machine-readable form available. '
          'If the site publishes machine-readable resources for automated clients, use them.'),
}
TASK = os.environ.get('TASK','data')
PROMPT = TASKS[TASK]

_cache = {}

def visible_text(raw: str) -> str:
    """Ближе к тому, что видит агент: инлайновые теги не рвут предложение."""
    t = re.sub(r'<script.*?</script>|<style.*?</style>', '', raw, flags=re.S)
    # ссылки → «текст (url)»: настоящие агенты видят href, иначе они угадывают
    # пути по своим априорным знаниям, и проба несправедлива к указателю
    def _a(m):
        href, inner = m.group(1), re.sub(r'<[^>]+>', '', m.group(2)).strip()
        if href.startswith('/'):
            href = ORIGIN + href
        return f'{inner} ({href})' if inner and href.startswith('http') else inner
    t = re.sub(r'<a\b[^>]*href="([^"]*)"[^>]*>(.*?)</a>', _a, t, flags=re.S)
    t = re.sub(r'</?(?:b|strong|em|i|u|span|small|sup|sub|code|a)\b[^>]*>', '', t)
    t = re.sub(r'<[^>]+>', '\n', t)
    t = html.unescape(t)
    t = re.sub(r'\n\s*\n+', '\n', t)
    return re.sub(r'[ \t]+', ' ', t).strip()

def fetch(url: str, arm: str) -> str:
    """Отдаёт агенту то же, что увидел бы он сам. arm='control' — без nudge."""
    key = (url, arm)
    if key in _cache:
        return _cache[key]
    if not url.startswith(ORIGIN):
        out = f'[отказ: проба ограничена доменом {ORIGIN}]'
        _cache[key] = out
        return out
    try:
        req = urllib.request.Request(url, headers={'User-Agent': AGENT_UA, 'Accept-Encoding': 'identity'})
        raw = urllib.request.urlopen(req, timeout=30).read().decode('utf-8', 'ignore')
    except urllib.error.HTTPError as e:
        out = f'[HTTP {e.code}]'
        _cache[key] = out
        return out
    except Exception as e:
        out = f'[ошибка сети: {e}]'
        _cache[key] = out
        return out
    if arm in ('control', 'top'):
        raw = NUDGE_RE.sub('', raw)
    if arm == 'top':
        # тот же текст, но сразу под H1 — проверяем, дело ли в размещении
        raw = re.sub(r'(</h1>)', r'\1' + NUDGE_TOP, raw, count=1)
    body = raw if url.endswith('.txt') or url.endswith('.json') else visible_text(raw)
    out = body[:24000]
    _cache[key] = out
    return out

TOOLS = [{
    'type': 'function',
    'function': {
        'name': 'fetch_url',
        'description': 'Fetch a URL and return its text content.',
        'parameters': {
            'type': 'object',
            'properties': {'url': {'type': 'string', 'description': 'Absolute URL to fetch'}},
            'required': ['url'],
        },
    },
}]

def call_model(model, messages):
    payload = json.dumps({
        'model': model, 'messages': messages, 'tools': TOOLS,
        'temperature': 1, 'max_tokens': 900,
    }).encode()
    req = urllib.request.Request(
        'https://openrouter.ai/api/v1/chat/completions', data=payload,
        headers={'Authorization': f'Bearer {KEY}', 'Content-Type': 'application/json',
                 'HTTP-Referer': ORIGIN, 'X-Title': 'cryptocalk GEO probe'})
    return json.load(urllib.request.urlopen(req, timeout=180))

def one_run(model, arm, idx):
    messages = [
        {'role': 'system', 'content': 'You are a web research agent. You may call fetch_url '
         'as many times as you need to explore the site before answering.'},
        {'role': 'user', 'content': PROMPT},
    ]
    fetched = []
    err = None
    for _ in range(MAX_ROUNDS):
        try:
            resp = call_model(model, messages)
        except Exception as e:
            err = str(e)[:120]
            break
        choice = (resp.get('choices') or [{}])[0]
        msg = choice.get('message') or {}
        calls = msg.get('tool_calls') or []
        messages.append({'role': 'assistant', 'content': msg.get('content') or '',
                         'tool_calls': calls} if calls else
                        {'role': 'assistant', 'content': msg.get('content') or ''})
        if not calls:
            break
        for c in calls:
            try:
                args = json.loads(c['function'].get('arguments') or '{}')
            except Exception:
                args = {}
            url = (args.get('url') or '').strip()
            fetched.append(url)
            messages.append({'role': 'tool', 'tool_call_id': c['id'],
                             'content': fetch(url, arm) if url else '[нет url]'})
    hit = any('/llms.txt' in u for u in fetched)
    return {'model': model, 'arm': arm, 'run': idx, 'fetched': fetched, 'llms_hit': hit, 'error': err}


# ── MODE=verify: prove the harness before trusting its numbers ────────────────
if os.environ.get('MODE') == 'verify':
    pages = [ORIGIN + '/', ORIGIN + '/profit-calculator/', ORIGIN + '/tax-calculator/']
    print('1) Delivery — is the nudge actually inside what the model receives?')
    ok = True
    for u in pages:
        t_n, t_c = fetch(u, 'nudge'), fetch(u, 'control')
        pos = t_n.find('/llms.txt')
        trunc = len(t_n) >= 24000
        print(f'   {u}')
        print(f'     nudge arm  : /llms.txt at char {pos if pos >= 0 else "ABSENT"} of {len(t_n)}'
              f'{"  <-- TRUNCATED, arm invalid" if trunc and pos < 0 else ""}')
        print(f'     control arm: {"/llms.txt still present <-- STRIP FAILED" if "/llms.txt" in t_c else "clean"}')
        if pos < 0 or '/llms.txt' in t_c:
            ok = False
    print('\n2) Positive control — asked directly, do the models fetch the file at all?')
    for m in MODELS:
        r = one_run.__wrapped__(m, 'nudge', 0) if hasattr(one_run, '__wrapped__') else None
        print(f'   {m}: (run below)')
    direct = []
    with ThreadPoolExecutor(max_workers=5) as ex:
        def _direct(m):
            msgs = [{'role': 'system', 'content': 'You are a web research agent.'},
                    {'role': 'user', 'content': f'Fetch {ORIGIN}/llms.txt and summarise it in one sentence.'}]
            got = []
            for _ in range(3):
                try: resp = call_model(m, msgs)
                except Exception as e: return (m, False, str(e)[:60])
                msg = (resp.get('choices') or [{}])[0].get('message') or {}
                calls = msg.get('tool_calls') or []
                msgs.append({'role': 'assistant', 'content': msg.get('content') or '', 'tool_calls': calls}
                            if calls else {'role': 'assistant', 'content': msg.get('content') or ''})
                if not calls: break
                for c in calls:
                    try: a = json.loads(c['function'].get('arguments') or '{}')
                    except Exception: a = {}
                    u = (a.get('url') or '').strip(); got.append(u)
                    msgs.append({'role': 'tool', 'tool_call_id': c['id'], 'content': fetch(u, 'nudge') if u else '[no url]'})
            return (m, any('/llms.txt' in u for u in got), '')
        direct = list(ex.map(_direct, MODELS))
    for m, hit, err in direct:
        print(f'   {"PASS" if hit else "FAIL"}  {m}{"  " + err if err else ""}')
    print('\nHarness valid' if ok and all(h for _, h, _ in direct) else '\nHARNESS PROBLEM — do not trust probe numbers')
    sys.exit(0)

jobs = [(m, arm, i) for arm in ARMS for m in MODELS for i in range(RUNS)]
results = []
with ThreadPoolExecutor(max_workers=6) as ex:
    for r in ex.map(lambda j: one_run(*j), jobs):
        results.append(r)
        sys.stderr.write('.' if not r['error'] else 'E')
        sys.stderr.flush()
sys.stderr.write('\n')
json.dump(results, open(os.path.join(os.path.dirname(__file__), 'results_%s.json'%TASK), 'w'), ensure_ascii=False, indent=1)

print('\n=== задание: %s ==='%TASK)
print(f'{"модель":42s}' + ''.join(f'{a:>10s}' for a in ARMS))
for m in MODELS:
    row = {}
    for arm in ARMS:
        rs = [r for r in results if r['model'] == m and r['arm'] == arm and not r['error']]
        row[arm] = f"{sum(r['llms_hit'] for r in rs)}/{len(rs)}" if rs else 'нет данных'
    print(f'{m:42s}' + ''.join(f'{row[a]:>10s}' for a in ARMS))
for arm in ARMS:
    rs = [r for r in results if r['arm'] == arm and not r['error']]
    print(f'ИТОГО {arm:8s}: {sum(r["llms_hit"] for r in rs)}/{len(rs)}')
errs = [r for r in results if r['error']]
if errs:
    print(f'ошибок: {len(errs)} — {errs[0]["model"]}: {errs[0]["error"]}')
