import { onRequestPost } from "./functions/api/contact.js";
import { handleWhattomine } from "./functions/api/whattomine.js";

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

    if (url.pathname === "/api/whattomine") {
      return handleWhattomine(request, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};
