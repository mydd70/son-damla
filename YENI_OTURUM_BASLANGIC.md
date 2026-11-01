# Son Damla – Yeni Oturum Devir Notu (1 Kasım 2026, akşam)

Önceki konuşmayı görmeden devam etmeye yeter. Önce bunu, sonra `CLAUDE.md`'yi oku. Aynı kararı yeniden tartışma, aynı işi yeniden yapma.

## Durum özeti
- **Oyun:** Son Damla (İngilizce The Last Drop). Eski adı Köyümün Suyu. Depo ve adres `son-damla` oldu, eski Pages adresi 404 verir. Yerel klasör `D:/kop31/koyumun-suyu` ve `koyumun-suyu-*` kayıt anahtarları eski adla kaldı; araç yolları klasöre bağlı, değiştirme. Kayıt anahtarlarını değiştirme, oyuncuların kaydı silinir.
- **Hackathon:** GameUP Türkiye (HP / ICPSD / UNDP), COP31 teması. Belgelerdeki teslim **1 Kasım Pazar 23:59**; kullanıcı tarihi teslim sayfasından doğrulayacak.
- **Teslim içeriği:** Sunum, 1 dakikalık oynanış videosu, oyunun demosu ve dosyaları.
- **Yayın:** https://mydd70.github.io/son-damla/ · Depo: https://github.com/mydd70/son-damla (`main`e push yayınlar). `gh` kurulu değil. Kullanıcı son testi iPhone'da yapıyor.
- **Metin ve çeviri bitti:** Kullanıcının metni işlendi, İngilizce tam. Görseller bağlı. Hikâye metninde çevrilmemiş satır yok.
- **Depo durumu:** `git status` ile bak. Son yayınlanan commit `fae09c9`. Onay beklenen yerel değişiklik varsa aşağıda "Açık konular"da yazar.

## Sıradaki adımlar
1. **Kullanıcı:** Telefonda baştan sona oynar, sesleri dinler, süreyi ölçer.
2. **Kullanıcı:** Yayındaki sürümden video ve sunum, teslim (`notlar/video_plani.md`, `notlar/sunum_taslagi.md`).
3. **Claude, istenirse:** `README` (taslak `notlar/README_taslak.md`, projeye eklemek onay ister), `asama-7/8/9` etiketleri, uzun vadede `tasarim_v4.md` başlığı.

## Çalışma kuralları
- **Türkçe metin kullanıcının.** Mantık hatası bulursan değiştirmeden sor; yazım hatalarını düzeltebilirsin. `taslak/DIYALOGLAR.md` ile `js/story.js` birlikte güncellenir.
- **Commit, push, silme, İngilizce metinde öneri uygulama her seferinde onay ister.** Önceki onay sonrakine geçmez. Force push ve `reset --hard` yok.
- `muzik_iyi.mp3` CC BY-ND: **dosya değiştirilmez**, seviye yalnızca `config.js`'te.
- `assets/audio/` son hâlidir. `ses_hazirla.py` bütün sesleri yeniden yazar, çalıştırma.
- `sesdeneme/`, `karakterdeneme/`, `gptgörselleri/`, `kaynaklar-deneme.md`, `notlar/` git dışındadır; kullanıcı onayı olmadan silme. Kaynak dosya ve lisans kaydı içerir.
- Bazı dosyalar CRLF: çok satırlı metin değiştiren betik önce `\r\n`'yi normalleştirmeli. msys `grep` ve `sed` CR'yi göstermez.
- Testten sonra oyun sekmesini kapat: açık kalırsa final müziği döngüde çalar.

## Metin değişirse çeviri
`notlar/ceviri/kaynak_tr.txt` ile `ceviri_en.txt` satır satır hizalıdır, son gelen kazanır.
- `node notlar/ceviri/uygula_ceviri.js D:/kop31/koyumun-suyu` eksikleri `eksik_satirlar.txt`'ye yazar, dosyaya dokunmaz.
- Eksiklerin Türkçesini ve çevirisini iki dosyanın sonuna ekle, `--yaz` ile çalıştır. Betik var olan `en` alanlarını da yeniler; `story.js`'te elle İngilizce düzeltme yapma, `ceviri_en.txt`'den yap.
- Terimler: jerrycan, drop, headman, pantry, sinkhole, notebook, Mum, Miss. İngiliz yazımı: neighbour, grey, uzunlukta metre (sayaç meter). Keçi "she", bebek "the baby".
- Arayüz metni ve final mesajı iki dilde `js/dil.js`'te.

## Alınmış kararlar (kullanıcı onayladı, yeniden tartışma)
**Mekanik**
- Son koşulu ve denge değişmedi: dikkatli oyuncu kuyu 42 iyi son, rastgele dağıtımda iyi son %50, tamamen rastgele %3, pasif 13.
- Kiler sona bağlı: akşam −2, keçi ≥5 ve bahçe ≥8 birer sepet; yetmeyen gece ev −2, kuyu −3 ve anne gizlice kuyuya iner.
- Mini oyun her gün (tek gün keçi, çift gün ot). Ev 3'ün altındaysa önce kısa ev işi.
- Su etkisi: yeterli +1, 1 eksik −1, 2 eksik −2, 3 ve üstü −3. Eve en az 2 damla.
- Komşuya su: gün 7 sahnesinden sonra (gün 7 ve 9 öğlesi), en fazla 2, gün 9'da bedelsiz, ikna olunca kapanır. Argüman yokken de götürülebilir; bilerek.
- İkna: 3 argümandan 2'si; konuşmada en fazla 1; A2 gün 8'den önce sayılmaz; yanlış seçenek konuyu kilitler, özür açar, gün 8'de aynı konuşmada geri alınır.
- **Öğle seçenekleri olduğu gibi kalacak:** öğle ev ve bahçe işi içindir, kişi ziyareti akşama aittir. Kullanıcı "öyle kalsın" dedi.
- **"Hızlı geç" yalnızca tekrar oynayışta çıkar.** Kullanıcı "açılmasına gerek yok" dedi.

**Hikâye**
- Oyun Ağustos 2029'da geçer (kullanıcının kararı). Kadro aynı: Mehmet, Hasan Amca, Fatma Teyze (kodda `dede`, `nine`), Rıza Amca, Zeynep Öğretmen, muhtar. **Karakter adları kesin.**
- Ailenin tarlası var, babası kuraklıkta su yetiştiremediği için bıraktı; oyunda görünmez.
- Kuyu ölçümü **bir ayda yarım metre** (kurgu; ovada yıllık kabaca 0,5-2 metre aktarılıyor). 40 derece kaldı.
- Kötü sonda araç **kamyon**. Anne gün 8'de tepeye çıkıp babayla konuşmuş olabilir; sorun değil. Muhtarın "Baban aradı dün" sözü de sorun değil, baba muhtarlığı arıyor.
- Sonlar: "Oylamadan birkaç hafta sonra" kartı, müzikle birlikte "Ekim - İlk Yağmur" ya da "Ekim - Kolay Kararlar Zor Sonuçlar", kötü sonda ayrıca "İlk yağmur" kartı. Hepsi büyük yazı.

**Final ekranı** (`js/dil.js`, `js/ui/son.js`)
- "Son damla bir günde düşmez." ile başlar, "Tek bir yağmur kurtarmaz. Birlikte alınan kararlar kurtarır." ile biter. Odak alanı listesi kullanıcı yapmacık bulduğu için kalktı; odak alanları sunumda.
- Veriler: 740 obruk ve 2026 yağışı (Prof. Dr. F. Arık), WMO 2025 nehir verisi ve düzensiz su döngüsü. Doğrudan "dünyada yağış azaldı" diye rakam yazılmadı, çünkü IPCC'ye göre karada yağış artıyor; sorun düzensizlik. Kaynaklar `KAYNAKLAR.md` ve oyun içi Kaynaklar panelinde.
- "Neler eksik kaldı" Tekrar oyna'nın altındadır. İyi sonda arka planda soluk grup görseli. Yapımcı bilgisi başlangıç ve son ekranının sol altında (`KS.YAPIMCI`); e-postanın görünmesini kullanıcı istedi.

**Görsel ve ses**
- Küçük görseller `assets/ui/`, listesi `config.js` `ARAYUZ_GORSEL`: listede olmayan için SVG ya da emoji kalır. Piksel görsel 8 piksellik ızgaraya kutu ortalamasıyla iner, arka planı silinir (yeşil kenar için G kanalı eşiğine bak).
- Kullanılmadı: turuncu damla, saksılı `ot2.png`, iki alternatif grup görseli, `simge.png`, `yatankeciyedek.png`. `assets/ui/ot2.webp` kaynağı `ot3.png`, `ot3.webp` kaynağı `ot4yedek.png`.
- Logo yalnızca Türkçede; İngilizce başlık yazıdır. Sekme ikonu `amblem.png`.
- Üç NC ses (`gunduz`, `oluk`, `tik`) kalıyor; dereceye girer ya da kâr amaçlı paylaşılırsa değiştirilecek.
- Gündüz ortam sesi seviyesi 0,3.
- Toplantı: kalabalık ayrı kanalda %60, akşam sesi %40; Rıza'ya dönülünce kalabalık susar, akşam sesi sürer. Kamyon ve bebek 14 saniyede söner, dosya başa dönerek.
- Tam ekran düğmesi yalnızca tam ekran kapalıyken görünür; iPhone Safari desteklemez.

## Açık konular
1. **Kulakla ve gerçek cihazda denenmedi:** sesler, kamyon sesindeki olası döngü kesiği, alt-tab sonrası giriş müziği, tam ekran düğmesi, dokunmatik, Safari, 667×375'te okunurluk.
2. Oynanış süresi ölçülmedi; "15-18 dakika" yalnızca hedef.
3. Sunumda doğrulanacak: 6111 sayılı kanunun yılı, COP31 tarihi. Obruk sayısı haberlerde 700-740 arası, tarihiyle söylenmeli.
4. Commit'lerde ve oyunda e-posta adresi açık; kullanıcı biliyor.
5. Küçük kalanlar: haritada "Köy kuyusu", yer kartında "Kuyu başı" yazıyor. `?gun=N` bazı bayrakları kurmaz, yalnızca test kısayolu.

## Tercihler
- Açıklamalar net, kısa, abartısız. Uygun görmediğin yerde itiraz et. Kararları tek tek sor. Küçük hataları kendin düzelt, büyük etkili olanı sor.

## Test araçları (`notlar/test_araclari/`)
- `sunucu.js [kök]`: 8931'de statik sunucu; `/__dosya.js` bu klasörden gelir. Arka planda başlat, işin bitince durdur.
- `bot.js`: sayfada `/__bot.js` yükle, `__bot.basla('iyi'|'kotu'|'ikna_kuyu'|'gun8', true)`; ikinci argüman gerçek mini oyun. Beklenen kuyu: iyi 36, kötü 3, ikna_kuyu 31 (kötü, eksik yalnızca kuyu), `?gun=8` ile gun8 45 (iyi). `__bot.turkce`: ekrandaki Türkçe harfli metinler; İngilizcede yalnızca özel adlar ve "Türkçe" düğmesi çıkmalı.
- `olcum.js`: `/__olcum.js` yükle, `?gun=5` ile başla düğmesine bas, `__olc()`. `sorun` boş olmalı. Dil için `?dil=en&gun=5`.
- `bilgi_sira.js`: 6000 sanal oyun ve bilgi sırası denetimi. `hata` 0, `IHLAL` 7 beklenir; yedisi de "Deftere yazıldı: ...söğüdü" yanlış alarmıdır.
- `esit.js`: story.js ile taslak. Beklenen: eksik 2.
- `sim_referans.txt`: `node sim/simulate.js` çıktısı birebir aynı olmalı.
- Bot her senaryodan önce temiz sayfa ister: `localStorage.clear()` sonra yeniden yükle. Tek `javascript_tool` çağrısı en çok 45 saniye.
- Önizleme bölmesi `file://` betiği çalıştırmaz; `file://` için başsız Chrome, `--virtual-time-budget`, botlu kopya.
- Sesin çalması için gerçek tıklama gerekir. Ekran görüntüsü botun hemen ardından bayat olabilir, bir saniye bekle.

## Diğer notlar (`notlar/`)
`video_plani.md`, `sunum_taslagi.md`, `README_taslak.md`, `teslim_kontrol_listesi.md` (eski), `hikaye_inceleme_raporu.md` (eski), `gece_raporu.md` (eski).
