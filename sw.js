// Service Worker für familien-kopf.de – Offline-Modus
// Auf den Server legen als: https://familien-kopf.de/sw.js (Hauptverzeichnis!)
const CACHE = 'spielhalle-v1';
const START = ['/', '/mtb.html', '/mtb-classic.html', '/trial-bike.html',
               '/blockwelt.html', '/astro-blaster.html', '/amir-clicker.html'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => Promise.allSettled(START.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: sofort aus dem Cache, im Hintergrund aktualisieren
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(req);
      const network = fetch(req).then(res => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
