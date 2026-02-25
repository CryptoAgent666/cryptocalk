const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const rateLimitStore = new Map();

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function htmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function htmlResponse(title, message, backUrl, status = 200) {
  const safeTitle = htmlEscape(title);
  const safeMessage = htmlEscape(message);
  const safeBackUrl = htmlEscape(backUrl);

  return new Response(
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${safeTitle}</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; margin: 0; background: #0b0f19; color: #f3f5f8; }
      main { max-width: 680px; margin: 8vh auto; padding: 24px; }
      .card { background: #121826; border: 1px solid #283044; border-radius: 14px; padding: 24px; }
      h1 { margin: 0 0 12px; font-size: 1.45rem; }
      p { margin: 0 0 18px; line-height: 1.55; color: #c7cfde; }
      a { color: #7cc4ff; text-decoration: none; font-weight: 600; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <section class="card">
        <h1>${safeTitle}</h1>
        <p>${safeMessage}</p>
        <a href="${safeBackUrl}">Back to contact form</a>
      </section>
    </main>
  </body>
</html>`,
    {
      status,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    }
  );
}

function wantsJson(request) {
  const accept = request.headers.get("accept") || "";
  return accept.includes("application/json");
}

function sanitizeRedirectTo(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) {
    return "/contact";
  }

  try {
    const url = new URL(`https://cryptocalk.local${value}`);
    return `${url.pathname}${url.search}`;
  } catch {
    return "/contact";
  }
}

function getClientIp(request) {
  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const xForwardedFor = request.headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const [firstIp] = xForwardedFor.split(",");
    return (firstIp || "").trim() || "unknown";
  }

  return "unknown";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function enforceRateLimit(ip, now = Date.now()) {
  const cutoff = now - RATE_LIMIT_WINDOW_MS;

  for (const [key, timestamps] of rateLimitStore.entries()) {
    const active = timestamps.filter((time) => time > cutoff);
    if (active.length > 0) {
      rateLimitStore.set(key, active);
    } else {
      rateLimitStore.delete(key);
    }
  }

  const existing = rateLimitStore.get(ip) || [];
  existing.push(now);
  rateLimitStore.set(ip, existing);

  return existing.length > RATE_LIMIT_MAX_REQUESTS;
}

async function verifyTurnstile(secret, token, ip) {
  if (!secret) {
    return { ok: true };
  }

  if (!token) {
    return { ok: false, error: "Turnstile verification failed. Please try again." };
  }

  const payload = new URLSearchParams({
    secret,
    response: token,
  });

  if (ip !== "unknown") {
    payload.set("remoteip", ip);
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: payload,
  });

  if (!response.ok) {
    return { ok: false, error: "Turnstile service is unavailable. Please try again." };
  }

  const data = await response.json();

  if (!data.success) {
    return { ok: false, error: "Turnstile verification failed. Please try again." };
  }

  return { ok: true };
}

function respond(request, redirectTo, status, payload) {
  if (wantsJson(request)) {
    return jsonResponse(payload, status);
  }

  if (status >= 200 && status < 300) {
    return htmlResponse("Message sent", payload.message || "Your message has been sent.", redirectTo, status);
  }

  return htmlResponse("Unable to send message", payload.error || "Please try again later.", redirectTo, status);
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return respond(request, "/contact", 400, { error: "Invalid form payload." });
  }

  const redirectTo = sanitizeRedirectTo(String(formData.get("redirectTo") || "/contact"));
  const honeypot = String(formData.get("company") || "").trim();

  // Bots often fill hidden fields; pretend success to avoid retried spam floods.
  if (honeypot) {
    return respond(request, redirectTo, 200, { message: "Your message has been sent." });
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const subject = String(formData.get("subject") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const locale = String(formData.get("formLocale") || "en").trim();
  const turnstileToken = String(formData.get("cf-turnstile-response") || "");
  const clientIp = getClientIp(request);

  if (!name || !email || !subject || !message) {
    return respond(request, redirectTo, 400, { error: "Please fill in all required fields." });
  }

  if (name.length > 120 || subject.length > 180 || message.length > 5000) {
    return respond(request, redirectTo, 400, { error: "Your message is too long. Please shorten it and try again." });
  }

  if (!isValidEmail(email)) {
    return respond(request, redirectTo, 400, { error: "Please provide a valid email address." });
  }

  if (clientIp !== "unknown" && enforceRateLimit(clientIp)) {
    return respond(request, redirectTo, 429, {
      error: "Too many requests from your IP. Please wait 10 minutes and try again.",
    });
  }

  try {
    const turnstileCheck = await verifyTurnstile(env.TURNSTILE_SECRET, turnstileToken, clientIp);
    if (!turnstileCheck.ok) {
      return respond(request, redirectTo, 400, { error: turnstileCheck.error });
    }
  } catch {
    return respond(request, redirectTo, 503, { error: "Verification is temporarily unavailable. Please retry shortly." });
  }

  const resendApiKey = env.RESEND_API_KEY;
  if (!resendApiKey) {
    return respond(request, redirectTo, 500, { error: "Server email is not configured." });
  }

  const toEmail = env.CONTACT_TO_EMAIL || "support@cryptocalk.com";
  const fromEmail = env.CONTACT_FROM_EMAIL || "CryptoCalk Contact <onboarding@resend.dev>";

  const text = [
    "New contact form submission from CryptoCalk",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    `Locale: ${locale}`,
    `IP: ${clientIp}`,
    "",
    "Message:",
    message,
  ].join("\n");

  let resendResponse;
  let resendBody;

  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[CryptoCalk Contact] ${subject}`,
        text,
      }),
    });
  } catch {
    return respond(request, redirectTo, 503, { error: "Email provider is temporarily unavailable. Please retry." });
  }

  try {
    resendBody = await resendResponse.json();
  } catch {
    resendBody = null;
  }

  if (!resendResponse.ok) {
    const providerMessage =
      (resendBody && typeof resendBody.message === "string" && resendBody.message) ||
      "Email provider rejected the request.";

    return respond(request, redirectTo, 502, { error: providerMessage });
  }

  return respond(request, redirectTo, 200, { message: "Thanks. Your message has been sent." });
}

export async function onRequest(context) {
  if (context.request.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  return onRequestPost(context);
}
