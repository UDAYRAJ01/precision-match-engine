// Minimal service worker to satisfy PWA installability criteria.
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", (event) => {
  // Network-first passthrough; no caching, just needs a fetch handler.
  event.respondWith(fetch(event.request).catch(() => new Response("", { status: 504 })));
});
