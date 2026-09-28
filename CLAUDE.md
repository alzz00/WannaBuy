# WannaBuy — çalışma notları

## Proje

Alışveriş listesi uygulaması. İki liste, altta iki sekme:

- **Market**: market ve ev alışverişi. Ürünler reyonlara göre gruplu (Manav, Kahvaltılık, Temizlik…), miktar yazılabilir
  (1 kg, 6 adet, 30'lu), dokununca tiklenir ve "Alındı" bölümüne iner.
- **İstekler**: istek listesi (kıyafet, eşya, teknoloji). Fiyat, mağaza, link, "Öncelikli / Bekleyebilir", kategori süzgeci
  (Hepsi, Giyim, Ev, Teknoloji), üstte toplam tutar.

Kullanıcının seçimleri (2026-09-28): ayrı uygulama (Bilancom'dan bağımsız), tek kullanıcı, **veriler yalnızca iPhone'da**
(localStorage). Sunucu, hesap, senkron yok. iPhone'da Safari → Paylaş → Ana Ekrana Ekle ile uygulama gibi kullanılır.
İnternet yokken de açılmalı (markette çekmeyebilir).

Yayın: GitHub Pages, https://alzz00.github.io/WannaBuy/ (adres büyük/küçük harfe duyarlı).

## Kullanıcıyla çalışma

- Türkçe yaz. Cihazları Windows PC + iPhone; Mac ve Android yok, çözümleri buna göre öner. Telefon adımlarını
  Safari/iOS menü adlarıyla yaz.
- Yazılıma yeni. İş bitince özetin sonuna **numaralı, somut adımlar** ekle: nereye dokunacak, ne görecek.
- Hesap açtırma, yayın, izin verme gibi adımlardan önce 1-2 cümleyle neden gerektiğini ve neyin herkese açık
  olacağını söyle. Benzetme: herkese açık depo boş bir defter gibidir, yazdıkları telefonda kalır.
- Görünüm işlerinde önce 2-3 seçeneği yan yana telefon görseli olarak göster, seçtirince son hali de görsel göster.
  Kullanıcı **"yükle"** demeden yayınlama (push etme).
- Arayüz sade, görsel ağırlıklı, az yazılı ve göz yormayan olsun: yazılar ≥16px, yumuşak kontrast, bol boşluk.
- **Jenerik "yapay zekâ yaptı" görünümü istemiyor.** İlk 3 öneri (`_tasarim/ilk-oneriler.png`) "hep aynı tarz, Bilancom'la aynı
  olmuş" diye beğenilmedi. Kaçın: yuvarlak beyaz kart + yumuşak gölge, emoji ikon, sistem fontu, küçük hap rozetler,
  gradyanlı özet kartı, lacivert-altın ya da adaçayı yeşili paletler. Karakterli yazı tipi ve güçlü bir konsept kullan.

## Durum

- 2026-09-28: 5 farklı tasarım yönü hazırlandı ve kullanıcıya resim olarak gönderildi (numaralar bu sırayla):
  1. **Fiş** (`fis`): termal fiş, Doto (nokta vuruşlu başlık) + IBM Plex Mono, ₺ JetBrains Mono'dan; ikonlar ve barkod JS ile çiziliyor.
  2. **Defter** (`defter`): çizgili defter, Caveat + Caveat Brush + Courier Prime, mavi tükenmez, kraft kapak.
  3. **Neo-brütal** (`brutal`): kalın çerçeve + sert gölge, Bricolage Grotesque + Space Mono, asit sarı/pembe/lila/mint.
  4. **Dergi** (`dergi`): krem kağıt, Bodoni Moda + Jost, bordo vurgu, ince çizgiler, 01/02 numaralama.
  5. **70'ler** (`retro`): Shrikhand + Fraunces + Bricolage Grotesque, hardal/turuncu/kahve şeritler.
  Dosyalar: `_tasarim/<yön>/market.html`, `istek.html`; karşılaştırma görselleri `_tasarim/hepsi.png`, `tek-<yön>.png`
  (`node _tasarim/birlestir.js "$(cat _tasarim/liste.json)"` sayfaları üretir, sonra headless tarayıcıyla çekilir).
  Kullanıcı hiçbirini beğenmedi: "daha modern bir şey olsun".
- 2026-09-28 gece: modern tur, 5 yeni yön (dal `tasarim-modern`, brif `_tasarim/modern-brif.md`,
  liste `_tasarim/liste-modern.json`, karşılaştırma `_tasarim/modern.png`):
  1. **Cam** (`cam`): iOS 26 buzlu cam, domates/kayısı/erik bulanık şekiller, Funnel Display + Host Grotesk.
  2. **Neon** (`neon`): koyu kömür + tek asit yeşili vurgu, halka sayaç, Geist + Geist Mono.
  3. **Bento** (`bento`): siyah zemin, canlı renkli kutucuk ızgarası, Unbounded + Onest.
  4. **İsviçre** (`isvicre`): kırık beyaz, siyah, cıva kırmızısı; dev geniş Archivo, iki sütun ızgara.
  5. **Cihaz** (`cihaz`): Teenage Engineering tarzı gri panel, turuncu 7 segment ekran, kaydırmalı anahtarlar, Chivo + Chivo Mono.
  Kullanıcı **Cam**'ı seçti, renk seçenekleri istedi.
- Cam renkleri (`_tasarim/cam-<renk>/`, liste `liste-cam.json`, görsel `cam-renkler.png`): 1 Gün batımı (`cam`),
  2 Okyanus, 3 Lavanta, 4 Narenciye, 5 Gece (koyu). Kullanıcı birini seçecek.
- Sıradaki: seçilen yönle uygulamayı yap (`index.html` + `sw.js` + `manifest.webmanifest` + `ikonlar/`), görsellerini göster,
  "yükle" gelince yayınla. Şu an `index.html` sadece "yakında" sayfası.

## Teknik kararlar

- Tek dosya PWA: `index.html` (görünüm + mantık) + `sw.js` (internetsiz açılış) + `manifest.webmanifest` + `ikonlar/`.
- Bilancom da `alzz00.github.io` altında, yani aynı origin. localStorage anahtarlarına `wb.` öneki koy, Bilancom'un
  `hd.*` anahtarlarına asla dokunma. Anahtar adı yayından sonra değişmez, yoksa kullanıcının listesi kaybolur.
- Yedek: JSON dışa/içe aktarma (Dosyalar'a kaydet). Ana ekrandaki simge silinirse veriler de silinir.
- Sürüm: `node araclar/surum-artir.js` ile `index.html`'deki `const APP_VERSION = '...'` ve `sw.js`'deki
  `const VERSION = '...'` aynı anda artırılır. Telefonda "Yeni sürüm hazır – Yenile" gösterilir.
- Yayına giden dosyalar: GitHub Pages Jekyll ile yayınlar. `_tasarim/` alt çizgiyle başladığı için yayına çıkmaz.
  `_config.yml` bu notları, `BENIOKU.md`'yi ve `araclar/`'ı dışarıda tutar. **`.nojekyll` ekleme**, yoksa tasarım
  dosyaları da herkese açık sayfa olur.
- Google Fonts kullanılırsa internetsiz açılış için font dosyalarını depoya koy ya da `sw.js`'de önbelleğe al.
- iOS tuzakları (Bilancom'da yaşandı): iOS 26+ ana ekran uygulamasında sayfa kaydırılamayacak kadar kısaysa
  alttaki sabit sekme çubuğu havada kalıyor. Çözüm: standalone modda `html { min-height: calc(100% + 1px) }`.
  Service worker önizlemede eski dosyayı verir; denemeden önce SW'yi kaldırıp önbelleği sil.
- Bilgisayarda önizleme: `node araclar/onizleme.js` → http://localhost:4547
- Bulutta ekran görüntüsü: `NODE_PATH=$(npm root -g) node araclar/ekran-goruntusu.js <sayfa.html> <çıktı.png> [en] [boy]`
  (Google Fonts'u curl ile getirir; tarayıcı vekil sunucu sertifikasını tanımıyor). Görselleri kullanıcıya her zaman
  sohbette de gönder, GitHub'da olsa bile.
- Commit kimliği: `alzz00` / `333697088+alzz00@users.noreply.github.com`. Kişisel e-posta adresini yazma.
- Yayın `main` dalından. Bulut oturumu `main`'e gönderemezse PR aç; kullanıcı telefondan **Merge**'e basınca yayına çıkar.
