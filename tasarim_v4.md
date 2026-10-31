# Köyümün Suyu – Oyun Tasarım Belgesi (v4, 31 Ekim 2026)

Kodlamaya hazır sürüm. v3'ten değişenler: gecikmeli plan, gün-dilim tablosu, sabitler tablosu, zorunlu ev işi kuralı, görev ziyareti kuralı, kayıt (yalnızca son kayıt), final ekranı, kodlama aşamaları ve kod kuralları.

---

## 1. Bağlam
- GameUP Türkiye Oyun Hackathonu (HP / ICPSD / UNDP), COP31 teması (9-20 Kasım 2026, Antalya). En iyi 10 oyun COP31'de tanıtılacak.
- Teslim: 1 Kasım Pazar 23:59; sunum şablonu + demo. Jüri değerlendirmesinde sunum ağırlıklı; oyun basit ve anlaşılır olmalı.
- Odak alanları: Gıda Güvenliği, İklim Değişikliği Odağında Eğitim (ikincil: kırsal dayanıklılık). Hedef kitle: her yaş.
- Tek kişi. Kod ve diyaloglar Claude tarafından; portre, arka plan ve sesler kullanıcıdan.
- Hedef süre 15-18 dk, 9 gün. Metin bütçesi 4-5 bin kelime.
- Gerçekçilik ikinci planda: mevsim ve hukuki ayrıntılar oyunun akışı için sadeleştirilebilir.

## 2. Hikaye
- Ağustos 2025, Konya Ovası'nda küçük bir köy, son 65 yılın en kurak dönemi.
- Mehmet (geçici isim), 12 yaşında. Ev: anne, bebek kardeş, keçi (adını oyuncu verir; geçim kaynağı süt/peynir, bebeğin besini değil). Baba şehirde iş arıyor. Ailenin yalnızca bahçesi var.
- Açılış: Keçi ayağa kalkamıyor, bebek ağlıyor. Annesiyle sabah konuşması; Mehmet bir çözüm aramaya karar verir.

## 3. Karakterler
- **Yaşlı çift:** Anılarla geçmiş-gelecek köprüsü. Dayanıklı tohum, eski usul bilgisi, unutulmuş sarnıç. Güvenlik ağı: en fazla 2 yardım; 2.'de "artık bize de zor yetiyor" derler. Kötü sonda geride kalırlar.
- **İnatçı komşu:** Yalnız, inatçı, kötü değil. Belgeli ama sayaçsız motorlu kuyu. Obruk gün 8'de onun tarlasında açılır. Oyu sonucu belirler.
- **Muhtar:** İnsanlar ve resmî yol. Komşuyla eski dost, küs; küslüğün sebebi (su paylaşımı) yalnızca iyi sonda açığa çıkar.
- **Öğretmen (kadın):** Ölçüm ve yöntem. Muhtarla eşit ağırlıkta; aralarında "cahil-okumuş" ayrımı kurulmaz.
- Yaşlı çift ve öğretmenin ek ziyaretlerinde kısa, vaaz olmayan iklim sözleri.
- Diğer köylüler siluet.

## 4. Gün ve dilim tablosu

Her sabah sırası: (varsa sabah olayı) → su payı + dağıtım paneli → mini oyun (tek gün keçi bakımı, çift gün ot yolma).
Sabah olayları dilim harcamaz. Öğle olayı o günün öğle eylemini, akşam olayı akşam ziyaretini kullanır.

| Gün | Sabah | Öğle | Akşam |
|---|---|---|---|
| 1 | Açılış sahnesi, keçiye isim, dağıtım öğreticisi, keçi bakımı öğreticisi | **Olay:** Köyü tanıma (kuyu başı, kuyu göstergesi tanıtımı, harita öğreticisi) | Serbest (ilk ziyaret, harita öğreticisi) |
| 2 | Annenin gri su sözü (gri su açılır) | **Olay:** Yaşlı çift (anılar, dayanıklı tohum, sarnıç; argüman 1 isteğe bağlı) | Serbest |
| 3 | **Olay:** Öğretmen kuyu ölçümü, kuyu başında (argüman 2 isteğe bağlı; defter: "Ölçümü muhtara götür") | Serbest | Serbest (muhtara görev ziyareti açık) |
| 4 | Sakin gün. Annenin çiçeği (tek seferlik) | Serbest | Serbest. Ölçüm teslim edilmediyse anne hatırlatır |
| 5 | **Olay:** Baba araması (tepe), sinyal kesilir. Ölçüm teslim edilmediyse anne tekrar hatırlatır | Serbest | Serbest. **Ölçüm teslimi için son akşam** |
| 6 | — | **Olay:** Muhtarlıkta plan (güçlü ya da gecikmeli), sarnıç onarımı başlar; argüman 3 isteğe bağlı | Serbest |
| 7 | Sakin gün. **Olay:** Kuyu başında komşuyla zorunlu karşılaşma | Serbest | Serbest |
| 8 | Sıcak dalga mesajı | **Olay:** Obruk, komşunun tarlası, zorunlu karşılaşma | Serbest |
| 9 | — | Serbest (son şans) | **Olay:** Köy toplantısı ve oylama → Son |

Serbest öğle günleri: 3, 4, 5, 7, 9. Serbest akşamlar: 1-8.

### Plan
- Ölçüm gün 3-5 akşamları arasında muhtara teslim edildiyse gün 6'da **güçlü plan** kurulur.
- Teslim edilmediyse muhtar ile öğretmen gün 6'da geç de olsa buluşur ve **gecikmeli (zayıf) plan** kurulur: kuyuya etkisi daha düşük. İyi son hâlâ mümkün ama zordur.
- Plan her oynanışta kurulur; fark yalnızca gücündedir.
- Gün 3-5 arasında muhtar ve öğretmen ayrı ayrı köylüyü tasarrufa yönlendirir (metinle anlatılır, gönüllü tasarruf).

## 5. Günlük döngü ve eylemler

### Öğle eylemleri (serbest öğlelerde biri seçilir)
| Eylem | Etki | Sınır |
|---|---|---|
| Komşuya su götür | Komşuyla karşılaşma; ertesi günün payından 2 damla düşer (metinle söylenir) | En fazla 2 kez |
| Bahçede ek iş | Bahçe +1 | — |
| Evde yardım | Ev +1 | — |
| Babayı ara (tepe) | Ev +1 | 1 kez, gün 3'ten sonra |
| Çamurda serinle | Ev +1, kısa sahne | 1 kez, gün 4'ten sonra |

### Akşam
- Ziyaret: yaşlı çift, muhtar, öğretmen, komşu. Her eve bir kez; yaşlı çift ve öğretmene birer ek hak.
- **Görev ziyareti hak tüketmez:** defterdeki bir görev için yapılan ziyaret (ör. ölçümü muhtara götürmek) ziyaret hakkından sayılmaz.
- Ya da aile vakti: ev +2.
- Ertesi günün su payı duyurulur.

### Zorunlu ev işi
- Ev 3'ün altına düşerse ertesi sabah mini oyunun yerine kısa bir "annene yardım" sahnesi gelir: ev +2, mini oyunun bonusu alınmaz.
- Hiçbir dilimi harcamaz, hikaye olaylarıyla çakışmaz.

### Yaşlı çiftin yardımı
- Akşam ziyaretinde kiler boşsa kilere +2. En fazla 2 kez; 2.'sinde "bir daha getiremeyiz" sözü.

## 6. Göstergeler
- **Kuyu:** Dikey seviye, eşik çizgisi yok. 50'nin altına inince renk koyulaşır ve bir karakter (anne ya da öğretmen) tek cümleyle uyarır.
- **Keçi (0-10):** Başlangıç 2. ≥5 süt verir. Asla ölmez (en az 1).
- **Bahçe (0-10):** Su + ot yolma. Dayanıklı tohum gün 3'ten bahçe ihtiyacını azaltır.
- **Kiler (sepet ikonu, 0-6):** Süt ve sebze doldurur, aile her akşam tüketir. Boşsa ev düşer.
- **Ev (0-10):** Ev suyu, aile vakti, kiler, baba, çiçek ve çamur etkiler. Yüksekse anne ipucu verir. Ağlama ve iç ses evle değişir.

### Görünüm
- Sayı gösterilmez; sayılar yalnızca dağıtım panelinde damla olarak görünür.
- Keçi, ev, bahçe: 10 dilimli çubuk + tek kelime durum.
  - Keçi: Hasta (0-2) / Zayıf (3-4) / Toparlanıyor (5-7) / Sağlıklı (8-10)
  - Ev: Gergin (0-2) / Yorgun (3-4) / Sakin (5-7) / Huzurlu (8-10)
  - Bahçe: Kurumuş (0-2) / Susuz (3-4) / İdare eder (5-7) / Yeşil (8-10)
- Kiler: adet kadar sepet ikonu.
- Değişim geri bildirimi: "+2" / "−1" belirip kaybolur; kuyu düşünce kısa titreme.

## 7. Sabitler tablosu (taslak, simülasyonla ayarlanır)

Tüm sayılar kodda tek dosyada (config.js) durur.

### Su
| Sabit | Değer |
|---|---|
| Günlük pay (gün 1-9) | 12, 12, 11, 11, 10, 10, 9, 9, 8 |
| İhtiyaç: ev / keçi / bahçe | 6 / 4 / 4 (dayanıklı tohumla bahçe 3, gün 3'ten) |
| Fazla çekme | +4 damla, kuyu −5, günde en fazla 1 |
| Gri su | Her 3 ev damlasına 1 bahçe damlası (gün 2'den) |
| Komşuya su | Ertesi gün payı −2 |

İlke: **Fazla çekmeden hiçbir gün her ihtiyaç karşılanamaz.** Fazla çekme gün 1'de her şeyi karşılatır (12 + 4 = 16 ≥ 14); cazipliği buradan gelir. Son günlerde fazla çekme de yetmez.

### Göstergeler
| Gösterge | Kural |
|---|---|
| Keçi | Verilen ≥4: +1 · 2-3: 0 · <2: −1 · bakım mini oyunu: +1 |
| Bahçe (başlangıç 3) | Verilen (gri su dahil) ≥ ihtiyaç: +1 · ihtiyaç−1: 0 · daha az: −1 · ot yolma: +1 |
| Kiler (başlangıç 3, en fazla 6) | Akşam −1 · keçi ≥5: +1 · bahçe ≥6: +1 |
| Ev (başlangıç 4) | Ev suyu ≥6: +1 · 4-5: 0 · <4: −1 · aile vakti +2 · kiler boşsa −2 · baba araması (gün 5) +1 · çiçek +1 |

### Kuyu (başlangıç 100, düşüş her sabah uygulanır)
| Etki | Değer |
|---|---|
| Doğal düşüş | −6 / gün |
| Komşunun motoru | −3 / gün (ikna edildiyse gün 9 sabahı durur) |
| Fazla çekme | −5 / kez |
| Gönüllü tasarruf (gün 3-5) | +1 / gün |
| Güçlü plan (gün 6'dan) | +5 / gün |
| Gecikmeli plan (gün 6'dan) | +3 / gün |
| Gizli eşik (toplantıda kontrol) | 35 |
| Uyarı seviyesi | 50 |

### Kontrol hesabı (komşu ikna edilmiş)
| Profil | Gün 9 sonu kuyu | Sonuç |
|---|---|---|
| Güçlü plan, hiç fazla çekme yok | 45 | İyi |
| Güçlü plan, 2 fazla çekme | 35 | İyi (sınırda) |
| Güçlü plan, 3 fazla çekme | 30 | Kötü |
| Gecikmeli plan, hiç fazla çekme yok | 37 | İyi (sınırda) |
| Gecikmeli plan, 1 fazla çekme | 32 | Kötü |
| Pasif (gecikmeli plan, komşu ikna edilmemiş) | 34 | Kötü |

Simülasyon hedefi: dikkatli profil iyi sona rahat, pasif profil kötü sona ulaşır.

## 8. İkna sistemi
- **Karşılaşmalar:** akşam ziyareti (1 kez), öğle "komşuya su götür" (en fazla 2), gün 7 sabah zorunlu, gün 8 öğle zorunlu (obruk).
- **3 argüman ve kaynakları:**
  - A1, dere/söğüt anısı: gün 2 yaşlı çift olayı ya da sonraki yaşlı çift ziyareti
  - A2, obruk uyarısı: gün 3 ölçüm olayı ya da öğretmen ziyareti
  - A3, eski dostluk anısı: muhtar ziyareti (gün 3'ten) ya da gün 6 plan olayı. Anı yalnızca dostluğu anlatır, küslüğün sebebini değil.
- Bir karşılaşmada o ana kadar öğrenilmiş tüm argümanlar iletilebilir.
- **2 argüman iletilince komşu ikna olur:** toplantıda evet der, motoru gün 9 sabahı durur.
- **Kabalık:** Kaba seçim ilgili argümanı kilitler (görünür geri bildirim). Sonraki karşılaşmada özür seçeneği kilidi açar. Gün 8'de kaba seçim yapılırsa aynı konuşmada geri alınabilir ("Dur, öyle demek istemedim").
- İpuçları: annenin akşam cümleleri, baba telefonu, doğal diyaloglar.

## 9. Mehmet'in Defteri
Görev listesi. Örnek maddeler: "Öğretmenin ölçümünü muhtara götür", "Komşuyu ikna et: 1/2". Tamamlananlar işaretlenir. Öğrenilen argümanlar da burada görünür.

## 10. Toplantı ve sonlar
- Köylülerin oyları her zaman eşit çıkar (sayılar temsilî). Köyün ikiye bölündüğü, gözlerin komşuya döndüğü gösterilir.
- **İyi son = komşu evet VE kuyu ≥ eşik.** Aksi halde kötü son.
- **İyi:** Plan kabul, yağmur onarılmış sarnıca dolar, çeşmeden ilk damla, muhtar ve komşu barışır (küslüğün sebebi burada açılır), baba döner, son sabah bebeğin gülme sesi. Keçi satırı keçiye göre değişir (≥5: süt veriyor; <5: toparlanıyor).
- **Kötü:** Keçi yol parası için satılır, kamyonla göç, yaşlı çiftin kapısının önünden geçilir, uzakta dumanlı şehir, bebeğin ağlaması kamyonla uzaklaşarak söner (ölüm çağrışımı olmamalı), boş avluya ve kırık sarnıca yağmur.
- Ev ve kiler değerleri sonda birer satırı değiştirir.
- **Kötü son akışı:** bitiş sahnesi → neyin eksik kaldığını anlatan maddeler (mantık üretir, suçlamayan dille) → final metni → Tekrar oyna.
  - Maddeler: "Komşu planı desteklemedi, motoru çalışmaya devam etti" · "Kuyu çok düştü" · "Ölçüm geç ulaştı, plan zayıf kaldı" (yalnızca gecikmeli plan ve kuyu yetmediyse)
- **İyi son akışı:** bitiş sahnesi → final metni → Tekrar oyna.
- **Final metni:** Şimdilik tek bir geçici metin bloğu; içeriği kullanıcı sonra yazar.
- Tekrar oyna baştan başlatır.

## 11. Oyuncu kolaylıkları
- Diyalog hızlandırma ve atlama.
- **Kayıt:** Her günün başında otomatik, yalnızca son kayıt. Başlangıçta "Devam et" ve "Yeni oyun".
- Gün 1'de dağıtım, mini oyun ve harita öğreticisi.
- Mini oyunlar: başarısız olan tekrar dener. "Hızlı geç" yalnızca tekrar oynayışta.
- Bebek ağlaması: gün 1-2 her sabah, sonra yalnızca ev <4 iken. Düşük ses.
- Ses düğmesi her zaman erişilebilir.
- Başla'ya basınca destekleyen cihazlarda tam ekran istenir.

## 12. Ekranlar ve arayüz
- **Yön:** Yatay, PC öncelikli. Telefon dikey tutulursa "Cihazını yatay çevir" uyarısı.
- **Ekranlar:**
  1. Başlangıç
  2. Keçiye isim
  3. Ana sahne: arka plan, altta portreli diyalog kutusu, üstte göstergeler, gün/dilim, defter ve ses düğmeleri
  4. Dağıtım paneli
  5. Mini oyun
  6. Köy haritası
  7. Gün geçiş kartı
  8. Defter
  9. Toplantı
  10. Son ve final
- **Köy haritası:** Kuşbakışı. Yerler: ev, yaşlı çiftin evi, muhtarlık, okul, komşunun evi ve tarlası, köy kuyusu, sarnıç, tepe. Adlar her zaman görünür, kullanılamayan yerler soluk. Tıklama noktaları yüzdeyle tanımlanır.
- **Dağıtım paneli:** Ev, keçi, bahçe satırları; ihtiyaç ve verilen damla ikonları; +/− düğmeleri; "Kalan: N damla"; "Kuyudan fazladan çek (+4)" düğmesi; "Tamam".
- **Mini oyunlar (10-15 sn):**
  - Ot yolma: 8-10 ot, 10 sn.
  - Keçi bakımı: tara (sürterek çubuk doldur), su kabı, yem.
- **Diyalog kutusu:** Konuşan adı, portre (isteğe bağlı ifade varyantı; yoksa düz portre), metin, seçenekler. Bebek ve keçi siluet.

## 13. Sanat ve ses
- **SVG sahneler (Claude):** Her mekân için kodla çizilmiş sahne. Hem yer tutucu hem de kullanıcının YZ ile üreteceği arka planların düzen referansı. Asset yoksa oyun SVG ile çalışır.
- **Mekânlar:** avlu, köy yolu, kuyu başı, yaşlı çiftin evi, tepe, komşunun tarlası (obruk), muhtarlık/toplantı yeri, sarnıç, köy çıkışı + köy haritası.
- **Arka planlar (kullanıcı):** ChatGPT ile, SVG düzenlerine ve portre tarzına uygun. Mekân başına tek görsel; sabah/öğle/akşam kodla renk filtresiyle.
- **Portreler (kullanıcı):** PixelLab; ifade varyantları gerekirse Gemini ile.
- **Sesler (kullanıcı):** Freesound CC0, Kenney: cırcır böceği, rüzgâr, keçi, bebek ağlaması, bebek gülmesi, kamyon, yağmur. Müzik isteğe bağlı.
- Yetişmeyen sahneler metin kartıyla anlatılır.
- Tüm assetler KAYNAKLAR.md'de: ad, kaynak, lisans/araç.

## 14. Kaldırılan ve reddedilenler
Bebek ölümü sonu, ağıt sesi, keçi sütüyle bebek beslenmesi, buçuklu birimler, "daha verimli kova çekme", 30 dk oyun, destek göstergesi, plansız kötü son yolu, gün kayıtları / geri dönme, gün 6'dan tekrar dene.

---

## 15. Teknik yapı
- Düz HTML/CSS/JS. Framework, derleme aracı, paket yöneticisi ve test kütüphanesi yok. Tek ek araç: Node ile çalışan denge simülasyonu betiği.
- ES modül yok. Düz `<script>` etiketleri ve tek global ad alanı (`KS`) kullanılır. Böylece `index.html` çift tıklamayla da açılır. Mantık dosyaları Node'da da yüklenebilmek için `module.exports` korumasıyla biter.
- DOM + CSS arayüz, canvas yok.

### Dosya yapısı
```
index.html
css/style.css
js/config.js       # tüm sabitler (sayı başka yerde yazılmaz)
js/state.js        # durum oluşturma, kayıt/yükleme
js/logic.js        # kurallar; DOM'a dokunmaz
js/story.js        # olaylar ve diyaloglar (veri)
js/scenes.js       # SVG sahneler
js/audio.js        # ses
js/ui/*.js         # ekranlar (dağıtım, harita, diyalog, mini oyunlar, defter, son)
js/main.js         # başlatma ve akış
sim/simulate.js    # Node denge simülasyonu
assets/img, assets/portraits, assets/audio
KAYNAKLAR.md
```

### Olay veri formatı (story.js)
```
{ id, gun, dilim, kosul, mekan, satirlar: [{ kim, ifade?, metin }],
  secenekler: [{ metin, etkiler, bayraklar, sonraki }] }
```

## 16. Kod kuralları
Amaç: geri döndürülebilir, karışıklıktan uzak, kolay hata ayıklanan kod.

### Geri döndürülebilirlik
- Git kullanılır. Her aşama, oyun çalışır hâldeyken commit ile kapanır; aşama sonunda etiket (`asama-1` gibi) atılır.
- Riskli bir değişiklikten önce commit atılır.
- Commit mesajları Türkçe ve ne değiştiğini söyler.
- Geçmişi silen işlemler (force push, reset --hard) yapılmaz.

### Sadelik
- Yalnızca bu belgede olan özellikler yazılır. Belgede olmayan bir şey gerekirse önce sorulur.
- Akıllıca soyutlama yerine açık ve okunur kod. Küçük, tek işi yapan fonksiyonlar.
- Sihirli sayı yok: her sayı config.js'te adlandırılmış sabit olarak durur.
- Tek durum nesnesi (`KS.state`). Durumu yalnızca logic.js fonksiyonları değiştirir; arayüz yalnızca okur ve logic fonksiyonlarını çağırır.
- logic.js DOM'a, sese ve zamana dokunmaz; aynı girdi aynı çıktıyı verir.
- Dosya başında tek satırlık açıklama; karmaşık kurallarda kısa Türkçe yorum.

### Hata ayıklama
- `?gun=N`: istenen günün başından başlar (varsayılan bayraklarla).
- `?debug=1`: ekranda küçük durum paneli (gerçek sayılar, bayraklar, kuyu); konsolda `KS.state` ve son 50 olayın günlüğü (`KS.log`).
- Debug modunda yakalanmayan hatalar ekranın köşesinde kısa kırmızı uyarı olarak görünür.
- story.js yüklenirken doğrulayıcı çalışır: eksik `sonraki` hedefi, tanımsız bayrak ve eksik portre için konsola uyarı yazar.
- Eksik görsel ya da ses oyunu durdurmaz: SVG ya da sessiz yer tutucu kullanılır, konsola uyarı yazılır.
- Kayıtta sürüm numarası tutulur; uyumsuz ya da bozuk kayıt sessizce yok sayılır, oyun çökmez.

### Doğrulama
- Her aşama sonunda: oyun tarayıcıda baştan sona tıklanarak ilerleyebilir, simülasyon hatasız çalışır.
- Denge değişikliğinden sonra simülasyon yeniden koşulur ve sonuç tablosu kullanıcıya gösterilir.

## 17. Onay gerektiren işler
Claude aşağıdakileri kullanıcının açık onayı olmadan yapmaz:
- GitHub'a ilk push, depoyu herkese açık yapma, GitHub Pages yayını
- Dosya ya da klasör silme, git geçmişini değiştirme
- Bu belgedeki bir tasarım kararını değiştirme
- Kesme listesinden bir şey kesme
- Belgede olmayan özellik, dosya ya da araç ekleme
- Lisansı belirsiz bir asseti kullanma

## 18. Kodlama aşamaları
Her aşama sonunda çalışan sürüm, commit ve etiket.

| # | Aşama | Çıktı |
|---|---|---|
| 0 | Kurulum | Klasör yapısı, git, boş sayfa açılıyor. GitHub deposu ve Pages yayını **onayla** |
| 1 | Mantık + sabitler + simülasyon | config, state, logic, sim. 3 profilin sonuç tablosu kullanıcıya sunulur. Arayüz yok |
| 2 | Ana iskelet | Ana sahne, diyalog kutusu, göstergeler, gün döngüsü, dağıtım paneli, harita (SVG yer tutucu). Taslak metinlerle 9 gün baştan sona oynanır. **İlk yayın (onayla)** |
| 3 | Mini oyunlar | Ot yolma, keçi bakımı, zorunlu ev işi sahnesi |
| 4 | Hikaye ve ikna | story.js'te tüm olaylar (taslak metin), ikna, defter, toplantı, iki son, final |
| 5 | Kolaylıklar | Kayıt, öğretici, atlama/hızlandırma, ses altyapısı, tam ekran, yön uyarısı |
| 6 | SVG sahneler | Tüm mekânlar ve harita; günün saatine göre renk filtresi |
| 7 | Diyaloglar | Son metinler (kullanıcı okur, düzeltir) |
| 8 | Asset entegrasyonu | Kullanıcının portre, arka plan ve sesleri; KAYNAKLAR.md |
| 9 | Test ve yayın | 3 tam oynanış, hata düzeltme, son yayın |

**Özellik dondurma: Pazar 14:00.** Sonrasında yalnızca hata düzeltme.

Geride kalınırsa kesme sırası (her biri onayla): çamur sahnesi, annenin çiçeği, ek ziyaret hakları, isteğe bağlı baba araması, müzik, ikinci mini oyun, yetişmeyen sahnelerin metin kartına çevrilmesi.

## 19. Zaman planı (yaklaşık)
| Zaman | İş |
|---|---|
| Cmt 10-12 | Aşama 0-1 |
| Cmt 12-17 | Aşama 2-3 |
| Cmt 17-21 | Aşama 4-5 |
| Cmt 21-24 | Aşama 6 (kullanıcı paralelde görsel ve ses üretir) |
| Paz 09-12 | Aşama 7-8 |
| Paz 12-14 | Aşama 9, dondurma |
| Paz 14-23 | Sunum, demo, teslim |

## 20. Açık konular
- Mehmet'in kesin adı (öncelik düşük).
- Final metni (kullanıcı yazacak).
- Teslim formatının ayrıntıları (sunum şablonu, demo biçimi): kodlamadan sonra.
