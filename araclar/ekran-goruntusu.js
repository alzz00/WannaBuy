// Tasarım sayfalarının ekran görüntüsünü alır (bulut oturumu için).
// node araclar/ekran-goruntusu.js <sayfa.html> <cikti.png> [genişlik] [yükseklik]
'use strict';
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const [src, out, w = 390, h = 844] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.resolve(src), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  await page.screenshot({ path: out, fullPage: +w > 390 });
  await browser.close();
  console.log('kaydedildi:', out);
})();
