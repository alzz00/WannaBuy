// WannaBuy service worker: uygulamayı internetsiz açar.
// Sürüm numarasını elle değiştirme: node araclar/surum-artir.js (index.html ile birlikte artırır).
'use strict';
const VERSION = '2026.09.28-1200';
const KABUK = 'wb-kabuk-' + VERSION;
const FONTLAR = 'wb-fontlar';
const DOSYALAR = [
  './',
  './index.html',
  './manifest.webmanifest',
  './ikonlar/ikon.svg',
  './ikonlar/ikon-180.png',
  './ikonlar/ikon-192.png',
  './ikonlar/ikon-512.png',
  './ikonlar/ikon-512-maskable.png',
];
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Funnel+Display:wght@400..800&family=Host+Grotesk:wght@400..700&display=swap';

// Yazı tiplerini ilk kurulumda indir: ilk açılıştan sonra internet olmasa da doğru font görünsün.
async function fontlariIndir() {
  const c = await caches.open(FONTLAR);
  if (await c.match(FONT_CSS, { ignoreVary: true })) return;
  const r = await fetch(FONT_CSS, { mode: 'cors', credentials: 'omit' });
  if (!r.ok) return;
  const css = await r.clone().text();
  await c.put(FONT_CSS, r);
  const adresler = [...new Set([...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)'"]+)\)/g)].map(m => m[1]))];
  await Promise.all(adresler.map(async u => {
    try { const f = await fetch(u, { mode: 'cors', credentials: 'omit' }); if (f.ok) await c.put(u, f); } catch (e) {}
  }));
}

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(KABUK);
    await c.addAll(DOSYALAR.map(u => new Request(u, { cache: 'reload' })));
    try { await fontlariIndir(); } catch (err) { /* internet yoksa sonra çalışırken önbelleğe alınır */ }
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    // Yalnızca bu uygulamanın eski önbelleklerini sil (aynı adreste başka uygulamalar da var).
    for (const ad of await caches.keys()) if (ad.startsWith('wb-kabuk-') && ad !== KABUK) await caches.delete(ad);
    await self.clients.claim();
  })());
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

async function fontGetir(req) {
  const c = await caches.open(FONTLAR);
  const kayit = await c.match(req, { ignoreVary: true });
  if (kayit) return kayit;
  try {
    const r = await fetch(req);
    if (r.ok || r.type === 'opaque') await c.put(req, r.clone());
    return r;
  } catch (err) {
    return Response.error();
  }
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(fontGetir(req));
    return;
  }
  if (url.origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const c = await caches.open(KABUK);
      return (await c.match('./index.html')) || fetch(req);
    })());
    return;
  }
  e.respondWith((async () => {
    const c = await caches.open(KABUK);
    return (await c.match(req, { ignoreSearch: true })) || fetch(req);
  })());
});
