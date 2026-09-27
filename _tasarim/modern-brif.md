# Modern tasarım turu — ortak brif

Kullanıcı ilk 5 yönü (fiş, defter, neo-brütal, dergi, 70'ler) beğenmedi: "daha modern bir şey olsun".
Daha önce reddedilen jenerik görünüm için `_tasarim/ilk-oneriler.png`'ye bak. Aynı hataya düşme.

## Çıktı
- `_tasarim/<anahtar>/market.html` ve `_tasarim/<anahtar>/istek.html`: tek dosya, statik mockup.
- `html,body{width:390px;height:844px;margin:0;overflow:hidden}`, `<meta name="viewport" content="width=390, initial-scale=1">`.
- Her şey kaydırmadan 844px'e sığmalı. Üstte iOS durum çubuğu (9:41, sinyal/wifi/pil inline SVG), altta sekme çubuğu
  (Market / İstekler, etkin olan belli) ve home indicator.
- Örnek için var olan `_tasarim/dergi/market.html` dosyasına bakabilirsin (yapı örneği; stilini kopyalama).
- Ekran görüntüsü: `NODE_PATH=$(npm root -g) node araclar/ekran-goruntusu.js _tasarim/<anahtar>/market.html /tmp/<anahtar>-market.png`
  Sonra PNG'yi Read ile aç ve kendi gözünle kontrol et. En az 2 tur düzelt.

## İçerik (aynen bu veriler)
Market: başlık "Market", "5 kaldı" sayacı, "Ne alacaksın?" giriş alanı + ekle düğmesi.
- Manav: Domates (1 kg), Muz (6 adet)
- Kahvaltılık: Süt (2), Yumurta (30'lu)
- Temizlik: Bulaşık deterjanı
- Alındı (2): Ekmek, Beyaz peynir — tikli, soluk/üstü çizili
İstekler: başlık "İstekler", Toplam ₺12.740, süzgeç Hepsi (etkin) / Giyim / Ev / Teknoloji.
- Beyaz spor ayakkabı — Zara — ₺2.499 — Öncelikli
- Trençkot — Mango — ₺3.990 — Öncelikli
- Kahve makinesi — Trendyol — ₺4.251 — Bekleyebilir
- Kulaklık — Hepsiburada — ₺2.000 — Bekleyebilir
Ürün görselleri ve reyon ikonları elle çizilmiş inline SVG olsun (tutarlı çizgi stili). Emoji, raster resim yok.

## Kurallar
- Modern, 2026 iOS uygulaması gibi cilalı; ama güçlü bir konsepti ve karakterli yazı tipi olsun.
- Sade, görsel ağırlıklı, az yazı, bol boşluk, göz yormayan. Ana metin ≥16px, küçük etiketler ≥12px.
  Metin kontrastı ≥4.5:1 (büyük yazı ≥3:1). Dokunma alanları ≥44px.
- Google Fonts kullan, `&subset=latin-ext` ile. Türkçe harfler (İ ı ş ğ ç ö ü) ve ₺ düzgün görünmeli;
  font ₺ içermiyorsa ₺'yi içeren bir fonta düşür, ekran görüntüsünde kontrol et.
- KAÇIN: yuvarlak beyaz kart + yumuşak gölge, emoji ikon, sistem fontu, küçük hap rozetler, gradyanlı özet kartı,
  lacivert-altın ya da adaçayı yeşili palet. Eski 5 yöne (fiş, defter, neo-brütal, serif dergi, 70'ler) benzeme.
- Market ve İstekler aynı uygulamanın iki ekranı gibi tutarlı olsun.
