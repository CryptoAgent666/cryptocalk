#!/usr/bin/env python3
"""Upload an .aab to Google Play via the Android Publisher API.

Credentials: a service-account JSON that is BOTH
  1. created in a GCP project with the "Google Play Android Developer API" enabled, and
  2. invited in Play Console -> Users and permissions with release rights on this app.
A key that satisfies only (1) authenticates fine and then gets 403 PERMISSION_DENIED from Play —
that is exactly what the DATA_HUB Search Console key does, so do not reuse it and assume it works.

  export PLAY_SA_JSON=~/.claude/deploy-creds/google-play-publisher.json
  python3 scripts/play-upload.py --aab android/app/release/cryptocalk-1.7-vc12.aab --track internal
  python3 scripts/play-upload.py --aab <file> --track production --status completed --rollout 0.1

Defaults are deliberately timid: track must be named explicitly, and a release is created as a
DRAFT unless --status completed is passed. Promoting a draft is a click; un-publishing a bad
production rollout is not.
"""
import argparse, base64, json, os, sys, time, urllib.error, urllib.parse, urllib.request

API = "https://androidpublisher.googleapis.com/androidpublisher/v3"
UPLOAD = "https://androidpublisher.googleapis.com/upload/androidpublisher/v3"


def access_token(sa_path: str) -> str:
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
    sa = json.load(open(os.path.expanduser(sa_path)))
    b64 = lambda x: base64.urlsafe_b64encode(x).rstrip(b"=")
    now = int(time.time())
    hdr = b64(json.dumps({"alg": "RS256", "typ": "JWT"}).encode())
    clm = b64(json.dumps({
        "iss": sa["client_email"],
        "scope": "https://www.googleapis.com/auth/androidpublisher",
        "aud": "https://oauth2.googleapis.com/token",
        "exp": now + 3600, "iat": now,
    }).encode())
    key = serialization.load_pem_private_key(sa["private_key"].encode(), password=None)
    sig = b64(key.sign(hdr + b"." + clm, padding.PKCS1v15(), hashes.SHA256()))
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": (hdr + b"." + clm + b"." + sig).decode(),
    }).encode()
    r = urllib.request.urlopen(urllib.request.Request("https://oauth2.googleapis.com/token", data=body), timeout=60)
    return json.load(r)["access_token"]


def call(tok, method, url, data=None, ctype="application/json", raw=False):
    req = urllib.request.Request(url, method=method,
                                 data=data if raw else (json.dumps(data).encode() if data is not None else None))
    req.add_header("Authorization", "Bearer " + tok)
    if data is not None:
        req.add_header("Content-Type", ctype)
    try:
        with urllib.request.urlopen(req, timeout=900) as r:
            payload = r.read()
            return json.loads(payload) if payload else {}
    except urllib.error.HTTPError as e:
        detail = e.read().decode("utf-8", "ignore")[:800]
        raise SystemExit(f"\n!! {method} {url.split('?')[0]}\n   HTTP {e.code}\n   {detail}\n")


def release_notes(path: str, version: str):
    """Pull the per-language 'What's new' blocks out of play-store-assets/listing.md."""
    import re
    if not os.path.exists(path):
        return []
    s = open(path, encoding="utf-8").read()
    i = s.find(f"## Release notes — {version}")
    if i < 0:
        return []
    seg = s[i:]
    out = []
    LOCALE = {"en": "en-US", "es": "es-ES", "pt": "pt-BR", "tr": "tr-TR", "hi": "hi-IN", "ru": "ru-RU"}
    for m in re.finditer(r"\*\*([a-z]{2})\*\*[^\n]*\n```\n(.*?)\n```", seg, re.S):
        lang, text = m.group(1), m.group(2).strip()
        if lang in LOCALE:
            out.append({"language": LOCALE[lang], "text": text[:500]})
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--aab", required=True)
    ap.add_argument("--package", default="com.cryptocalk.calculator")
    ap.add_argument("--track", required=True, choices=["internal", "alpha", "beta", "production"])
    ap.add_argument("--status", default="draft", choices=["draft", "completed", "inProgress"])
    ap.add_argument("--rollout", type=float, default=None, help="fraction for inProgress, e.g. 0.1")
    ap.add_argument("--notes-version", default="1.7")
    ap.add_argument("--sa", default=os.environ.get("PLAY_SA_JSON", "~/.claude/deploy-creds/google-play-publisher.json"))
    a = ap.parse_args()

    if not os.path.exists(a.aab):
        raise SystemExit(f"no such file: {a.aab}")
    if a.status == "inProgress" and not a.rollout:
        raise SystemExit("--status inProgress requires --rollout")

    tok = access_token(a.sa)
    print(f"==> token ok · package {a.package} · track {a.track} · status {a.status}")

    edit = call(tok, "POST", f"{API}/applications/{a.package}/edits")
    eid = edit["id"]
    print(f"==> edit {eid}")

    blob = open(a.aab, "rb").read()
    print(f"==> uploading {len(blob) / 1048576:.1f} MB …")
    bundle = call(tok, "POST",
                  f"{UPLOAD}/applications/{a.package}/edits/{eid}/bundles?uploadType=media",
                  data=blob, ctype="application/octet-stream", raw=True)
    vc = bundle["versionCode"]
    print(f"==> uploaded versionCode {vc}")

    rel = {"versionCodes": [str(vc)], "status": a.status}
    notes = release_notes("play-store-assets/listing.md", a.notes_version)
    if notes:
        rel["releaseNotes"] = notes
        print(f"==> release notes: {', '.join(n['language'] for n in notes)}")
    else:
        print("==> no release notes found — check the '## Release notes — <version>' heading")
    if a.rollout:
        rel["userFraction"] = a.rollout

    call(tok, "PUT", f"{API}/applications/{a.package}/edits/{eid}/tracks/{a.track}",
         data={"track": a.track, "releases": [rel]})
    call(tok, "POST", f"{API}/applications/{a.package}/edits/{eid}:commit")
    print(f"==> committed. versionCode {vc} is on '{a.track}' as {a.status}.")
    if a.status == "draft":
        print("    It is a DRAFT — open Play Console and press Review release to publish.")


if __name__ == "__main__":
    main()
