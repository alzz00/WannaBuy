// Tasarım sayfalarının ekran görüntüsünü alır (bulut oturumu için).
// node araclar/ekran-goruntusu.js <sayfa.html> <cikti.png> [genişlik] [yükseklik]
'use strict';
const path = require('path');
const { execFileSync } = require('child_process');
const { chromium } = require('playwright');

(async () => {
  const [src, out, w = 390, h = 844] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
  // Bulut oturumunda tarayıcı vekil sunucunun sertifikasını tanımıyor; Google Fonts isteklerini curl ile getir.
  await page.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//, route => {
    try {
      const url = route.request().url();
      const body = execFileSync('curl', ['-sSL', '-A', 'Mozilla/5.0 Chrome/140', url], { maxBuffer: 32 << 20 });
      const type = url.includes('googleapis') ? 'text/css; charset=utf-8' : 'font/woff2';
      route.fulfill({ status: 200, body, headers: { 'content-type': type, 'access-control-allow-origin': '*' } });
    } catch (e) { route.abort(); }
  });
  await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: out, fullPage: +w > 390 });
  await browser.close();
  console.log('kaydedildi:', out);
})();
