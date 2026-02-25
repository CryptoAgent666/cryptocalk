import { onRequestPost } from "./functions/api/contact.js";

function isContactEndpoint(pathname) {
  return pathname === "/api/contact";
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (isContactEndpoint(url.pathname)) {
      if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
      }

      return onRequestPost({
        request,
        env,
        waitUntil: (promise) => ctx.waitUntil(promise),
      });
    }

    return env.ASSETS.fetch(request);
  },
};
