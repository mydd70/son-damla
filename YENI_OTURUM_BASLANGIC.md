# Köyümün Suyu – Yeni Oturum Devir Notu (1 Kasım 2026, gece)

Önceki oturum token tasarrufu için kapatıldı. Bu dosya onun tek özetidir; konuşmayı görmeden devam etmeye yeter. Önce bunu oku, sonra `CLAUDE.md`. Aynı kararı yeniden tartışma, aynı işi yeniden yapma.

## Durum özeti
- **Hackathon:** GameUP Türkiye (HP / ICPSD / UNDP), COP31 teması. Belgelerdeki teslim **1 Kasım Pazar 23:59**, özellik dondurma 14:00. Kullanıcı gece yarısından sonra "yarın gece 23.59" dedi; tarihi teslim sayfasından doğrulamasını söyledik, kesin değilse erken olanı esas al.
- **Teslim içeriği:** Sunum, 1 dakikalık oynanış videosu, oyunun demosu ve dosyaları (kullanıcıya göre GitHub deposu yeterli, şablondan doğrulayacak).
- **Yayın:** https://mydd70.github.io/koyumun-suyu/ · Depo: https://github.com/mydd70/koyumun-suyu (herkese açık, `main`). `main`e push yayınlar. Bu makinede push çalışıyor.
- **Oyun:** 9 gün baştan sona oynanıyor, iki son açık, 12 arka plan, 8 portre, 25 ses ve müzik dosyası bağlı. Kullanıcı yerelde ayrı bir kopya da aldı.
- **Tek geçerli tasarım:** `tasarim_v4.md`. Kurallar: `CLAUDE.md`. Hikâye: `taslak/DIYALOGLAR.md` ile `js/story.js` aynı metni taşır. `SABAH_RAPORU.md` eskidir.
- **Etiketler:** `asama-0` … `asama-6`. Aşama 7 (metin + çeviri) ve 8 (görsel) devam ediyor, etiketlenmedi. Aşama 9 başlamadı.

- **Depo durumu:** Bütün iş yerelde commit edildi. **Push edilmedi** (izin denetimi engelledi, yayındaki oyun hâlâ `0f2563f`). Kullanıcı kendi terminalinden `git push origin main` yapmalı ya da yeni oturumda açıkça istemeli.

## Sıradaki adımlar (sırayla)
1. **Kullanıcı:** Oyunu bir kez oynayarak metni okur, `taslak/DIYALOGLAR.md`'yi kesinleştirir, final metnini verir, sesleri dinler. Bitince **"metin hazır"** der.
2. **Kullanıcı:** Görselleri üretir (`referans/PROMPTLAR.md` sonundaki "Detay görselleri"), `gorseldeneme/` klasörüne koyar. Bu klasör git dışındadır.
3. **Claude ("metin hazır" sonrası):** `git diff` ile taslak farklarını görür, `js/story.js` ve `js/dil.js`'e aktarır. Commit ve yayın için onay alır. `asama-7` metin kısmı biter.
4. **Claude, çeviriden önce hatırlatır:** final metni, karakter adları ve oyunun İngilizce adı (geçici: "Water of My Village") kesinleşmeli. Sonra hazır çeviri taslağını değişen satırlarla güncelleyip işler: `story.js`'te satır, seçenek, `giris`, `baslik` için `en`; `GUN_KARTLARI`, `YER_DUSUNCELERI`, `IKNA_SECENEK`, `IKNA_METIN`, `GIRIS_METNI`, `SON_KARTLARI`. Arayüz metni `dil.js`'te zaten iki dilli. Yetişmezse İngilizce düğmesi gizlenir (kesmek onay ister).
5. **Claude:** Görselleri küçültür, saydamlaştırır, bağlar, `KAYNAKLAR.md`'ye yazar; `asama-8`.
6. **Claude:** Aşama 9: biri İngilizce 3 tam oynanış, hata düzeltme, son yayın, `asama-9`.
7. **Kullanıcı:** Yayındaki sürümden video, sunum, teslim.

## Kullanıcı uyurken yapılacak işler (onay beklemez)
Hepsi **proje dışında**, notlar klasöründe yapılır (aşağıda). `story.js`, taslak ve belgelerde değişiklik, commit ve push yok; test için kopya kullanılır. Bitince özeti `gece_raporu.md` olarak o klasöre yaz.
1. **Çeviriyi deneme:** `ceviri_en.txt` satırlarını projenin bir kopyasında `en` alanlarına işleyen betik yaz, `?dil=en` ile baştan sona oynat, Türkçe kalan yerleri ve taşmaları listele. Çeviriyi baştan oku, kalitesini düzelt. Betik "metin hazır" sonrası tek komutla çalışabilmeli.
2. **Görsel bağlama yaması:** `gorsel_baglama.patch` eskidi (`config.js` parçası uymuyor). Güncel koda göre yenile; keçi, ot, ampul, kova, yem, sepet, damla, defter, ses ikonları, köylü portreleri (`koylu` için rastgele değil, sabit bir kural), başlangıç görseli, okul ve toplantı sahnesini kapsasın. Görsel yoksa bugünkü SVG ya da emoji kalsın. Sahte görsellerle kopyada dene. Mini oyunda keçi taraması çalışmaya devam etmeli.
3. **Tam test:** Kopya olmadan yalnızca okuyarak: iyi son, kötü son, ikna var kuyu yetmedi, `?gun=8` kaba söz ve geri alma; 1280×720 ve 667×375 taşma ölçümü (Kaynaklar paneli dahil); `file://` ile başsız Chrome. Oyun hatası bulursan düzeltme, raporla.
4. **Yayın denetimi (yalnızca push yapıldıysa):** Yayın adresinde bütün ses, portre ve görsel dosyaları 200 dönüyor mu, oyun açılıyor mu.
5. **Sunum ve video hazırlığı:** 1 dakikalık video için saniye saniye çekim planı (hangi `?gun=N`, hangi anlar); sunum için içerik taslağı (`tasarim_v4.md` bölüm 1-2 ve `referans/VERILER.md`). Şablon elimizde yok, başlıklar şablona uyarlanacak. Doğrulanmamış sayıları işaretle.
6. **README taslağı:** Depo teslim dosyası olacağı için oyun adresi, nasıl oynanır, kaynaklara bağlantı. Notlar klasörüne yaz; projeye eklemek onay ister.

## Çakışma kuralları
- **Türkçe hikâye metni kullanıcının elinde.** "Metin hazır"dan önce `js/story.js` ve `taslak/DIYALOGLAR.md`'de metin değiştirme; diyalog önerilerini raporda listele. Bu dosyaları kullanıcı düzenliyor olabilir, aktarmadan önce yeniden oku.
- Çeviri, ham Türkçe satıra bağlıdır: `kaynak_tr.txt` ile `ceviri_en.txt` satır satır hizalıdır (549 satır). Metin değişince önce farkı bul, yalnızca değişen satırı çevir, yeniden çevirme.
- Ses dosyalarını yeniden üretme: `assets/audio/` son hâlidir. `ses_hazirla.py` bütün sesleri yeniden yazar, yalnızca seviye değişikliği istenirse tek tek çalıştır. `muzik_iyi.mp3` kesinlikle işlenmez (aşağıya bak).
- `sesdeneme/`, `karakterdeneme/`, `gorseldeneme/`, `gptgörselleri/`, `kaynaklar-deneme.md` git dışındadır; silme, commit etme.
- Commit ve push kullanıcının onayına bağlı; bu dosyanın yazıldığı commit onaylıydı, sonrakiler için yeniden sor. Force push ve `reset --hard` yok.

## Alınmış kararlar (kullanıcı onayladı, yeniden tartışma)
**Mekanik**
- Kiler sona bağlı: akşam −2, keçi ≥5 ve bahçe ≥8 birer sepet; yetmeyen gece ev −2, kuyu −3 ve anne gizlice kuyuya iner.
- Mini oyun her gün (tek gün keçi bakımı, çift gün ot yolma). Ev 3'ün altındaysa önce kısa ev işi sahnesi (ev +2), mini oyun yine oynanır.
- Denge ölçümü: dikkatli oyuncu kuyu 42 iyi son, rastgele dağıtımda iyi son %50, tamamen rastgele %3, pasif 13. Son koşulu ve bu sayılar değişmez.
- Su etkisi kademeli: yeterli +1, 1 eksik −1, 2 eksik −2, 3 ve üstü −3. Eve en az 2 damla. Her satıra en fazla ihtiyaç kadar damla.
- Gri su birikmez, panelde ayrı satırdır, gün 2'de vurguludur.
- Komşuya su: gün 7 sahnesinden sonra açılır (gün 7 ve 9 öğlesi), en fazla 2, gün 9'da bedelsiz, ikna olunca kapanır.
- İkna: 3 argümandan 2'si; konuşmada en fazla 1; A2 gün 8'den önce sayılmaz, kilitlenmez, o konuşmayı harcar; yanlış seçenek konuyu kilitler, özür açar, gün 8'de aynı konuşmada geri alınır.
- Gün 9 tek başına kurtarmaz. Gün 9'da ikna olursa motor o gün çalışmış olur (kuyu −3).
- Görev ziyareti ve kısa sohbet hak tüketmez. Sohbet tanışma gibi yazılmaz, sonunda Mehmet'in iç sesi gelir.
- Serbest öğle ve akşam "bir şey yapma" ile etkisiz geçilebilir.

**Akış ve arayüz**
- Dilim sonunda düğme: Öğleye geç / Akşama geç / Eve dön / Günü bitir. Yeni günün planı ve payı gün kartında.
- Gün 8 öğlesi planda "?" (obruk sezdirilmez).
- Öğreticiler ampullü pencerede, tekrar oynayışta çıkmaz. Soluk harita yerleri kısa düşünce söyler, zaman geçmez.
- Keçi adı ek almaz, metinde hep yalın yazılır.
- Sofra önizlemesi annenin ilk kuyuya inişinden sonra çıkar, son gün çıkmaz.
- Sonlara geçişte zaman kartı (`KS.SON_KARTLARI`). Giriş metni (`KS.GIRIS_METNI`) geçici, oylamayı söylemez (oylama gün 6'da ortaya çıkar).
- `kars_ilk` ("Muhtar mı gönderdi seni?") ilk konuşmada, söyleyecek bir şey varsa ve obruk anı değilse oynar. `kars_sonraki` silindi.
- Öğle su ziyareti vedayla biter (`veda_su`). Annenin "su" ipucu su götürüldükten sonra çıkmaz.
- Harita adları "Rıza Amca'nın evi", "Rıza Amca'nın tarlası".
- Başlangıç ve son ekranının sağ altında küçük Kaynaklar düğmesi; liste `KS.KAYNAK_LISTESI` (`dil.js`). Ekranda nasıl durduğu henüz gözle görülmedi.

**Hikâye**
- Mesaj: *Yeraltı suyu ortaktır; kararı suçlayarak değil, ölçeni ve hatırlayanı dinleyerek birlikte verirsek köy ayakta kalır.*
- Rıza'nın kuyusu tarlaya gider, içilmez. Gün 7'de köylüler sırayı kapatır; köy de onu dışlar, kimse yalnızca kötü adam değildir.
- 1 damla = 1 bidon. Karakterler bidon, arayüz damla der.
- Kötü son "Aylar geçti. Ekim." ile başlar, "İlk yağmur" en sonda. İyi son "Ekim. İlk yağmur." ile başlar. Yağmur her şeyi çözmez.
- Bebek ölümü çağrışımı olmaz; annesi gönderdi yalanı yok.
- Hitap: Hasan Amca, Fatma Teyze (kodda `dede`, `nine`). Rıza'nın tarlası mısır, toprak babasından kalma; oğlu şehre gitmiş, yalnız yaşıyor. Küslüğün sebebi yalnızca iyi sonda açılır; obruk gün 8'den önce sezdirilmez.
- İyi sonda baba keçiyi sorar ("Süt veriyor, baba. Gel gör." / "Ayağa kalktı, baba. Gel gör."). Gün 2 akşam başında tohum iç sesi (`g2_tohum`), gece satırlarıyla yarışmaz.
- Yazım TDK'ye göre tarandı: hitap virgülü, "yer altı", "Selamünaleyküm", "Aleykümselam". "Benim tarla", "masraf", "kirli mirli" karakter sesidir, hata değil.

**Görseller**
- Sahneler: Claude SVG siluet, ChatGPT img2img; kaynak PNG'ler `gptgörselleri/`. Kullanıcı ChatGPT çıktılarının kullanım hakkının kendisinde olduğunu, yarışmanın yapay zekâya izin verdiğini teyit etti.
- Portreler: Stable Diffusion, Pixel Art Diffusion XL (CreativeML Open RAIL++-M). Asıl ızgara 8 piksel: 512×512 kaynak 64×64'e kutu ortalamasıyla iner, kayıpsız WebP, CSS `pixelated` büyütür. Yeni piksel görselde de aynı yöntem. Kaynaklar `karakterdeneme/`.
- Görselle akşam yanan pencereler ve yeşeren bahçe görünmez; kabul edildi. Sarnıç görsellerine renk katmanı konmaz.

**Sesler ve lisans**
- Kaynak dosyalar `sesdeneme/`, işlenmişler `assets/audio/`; eşleşme, lisans ve yapılan değişiklik `KAYNAKLAR.md`'de. CC BY atfı oyun içi Kaynaklar listesinde.
- **Üç NC ses (`gunduz`, `oluk`, `tik`) şimdilik kalıyor.** Kullanıcı kararı: dereceye girer ya da kâr amaçlı paylaşırsa değiştirilecek.
- **`muzik_iyi.mp3` (Beautiful Piano) CC BY-ND: dosya değiştirilemez**, orijinal bayt bayt kopya; seviye yalnızca `config.js`'te.
- Telefon ve hat kesilme sesi kullanıcı isteğiyle yok. `firtinauzak` gün 8 obruk gümbürtüsü (`gurultu`), `kecisusesi` su kabı (`su_dok`). kretopi kaynağı kullanılmadı.
- Yerleşim: `mekanOrtam` (tepe rüzgâr, kuyu başı kalabalık, tarla motor), `gunOrtam` (gün 8 sıcak), toplantıda satır bazlı `ortam`, müzik `muzik` alanı ya da `KS.ses.muzikCal` (giriş, iyi son ilk damladan, kötü son köy çıkışından). Kısa döngüler boşluksuz dönsün diye WAV.
- Kullanıcı dinleyince seviyeyi `config.js` `SES.liste` üzerinden ayarla.

## Açık konular
**Kullanıcının kararı**
1. Final metni. Adaylar `taslak/DIYALOGLAR.md` sonunda.
2. Karakter adları ve oyunun İngilizce adı geçici. (Kullanıcı: halledeceğim.)
3. Metin incelemesinde eklenen bilgiler onay bekliyor: Rıza'nın payı, oğlu, babadan kalan toprak, Hasan Amca'nın babasının diktiği asma, öğretmenin "İspanya'da da, Irak'ta da" sözü, muhtarın "Biz de onu pek dinlemedik" sözü, toplantıdaki annenin bidonları satırı, "Taş onarılır da... neyse.", yol kenarında bidonlu Rıza.
4. Tarla görseli kuru, "Mısırlar güzel olmuş" ile uyuşmuyor. En sona bırakıldı, prompt hazır.
5. Metin uzunluğu: gerçek metin hedefin altında olabilir, oynadıktan sonra karar.

**Küçük bilinen konular**
6. Metinde sabit sayılar: "on bir bidon", "iki bidon", "Bir buçuk metre". Denge değişirse elle düzeltilir.
7. Öğretmen ziyareti haritada "Okul", sahne köy yolu. Okul görseli gelirse bağlanır.
8. Keçi, ot, ampul, kova, yem, sepet hâlâ SVG ya da emoji; görsel gelince bağlanır. Köylü portresi yok, "K" harfi görünüyor.
9. `gunduz` ağırlıkla tıslama, `ot_yol` metalik çıkabilir, `yagmur` filtre sonrası cılız kalabilir, `kalabalik` İstanbul çarşısı kaydı. Kulakla denetlenmedi.

**Doğrulanmamış**
10. Sesler kulakla dinlenmedi. Gerçek telefon, dokunmatik, Safari, tam ekran denenmedi. 667×375'te yazı yaklaşık 10,6 piksel; okunurluk gerçek telefonda bakılmalı. `file://` yalnızca başlangıç ekranına kadar denendi.

**Teslim öncesi (kullanıcı)**
11. Sunumda kaynağından doğrulanacaklar: 6111 sayılı kanunun yılı, 2026 yağış rakamı. "Ayda 1,5 metre" kurgudur, gerçek ölçüm gibi sunulmaz.
12. Commit'lerdeki e-posta adresi depoda açık; kullanıcıya bildirildi.

## Tercihler
- Açıklamalar net, kısa, abartısız. Dürüst değerlendirme; uygun görmediğin yerde itiraz et, alternatif öner.
- Kararları tek tek sor. Belgede olmayan özellik ekleme, önce öner.
- Küçük hataları kendin düzelt, büyük etkili olanı sor.
- Geri dönüşü olmayan işlerde (silme, tasarım değişikliği, kesme) önce onay al.

## Notlar klasörü ve test araçları
Proje dışı klasör: `C:\Users\myd\AppData\Local\Claude-Data\claude_pzs8sxrjxfjjc\side-session-notes\local_b96309c5-c466-47a8-86a0-7a970b335532\`
- `ceviri_taslak.md` (yan yana), `ceviri_en.txt` + `kaynak_tr.txt` (hizalı), `metin_haritasi.md` (satırların görünme oranı), `gorsel_baglama.patch` (eski), `teslim_kontrol_listesi.md`, `hikaye_inceleme_raporu.md`.
- `test_araclari/`:
  - `sunucu.js [kök]`: 8931'de statik sunucu; `/__dosya.js` bu klasörden gelir. Arka planda başlat, işin bitince durdur.
  - `bot.js`: sayfada `/__bot.js` yükle, `__bot.basla('iyi'|'kotu'|'gun8', true)`; ikinci argüman gerçek mini oyun. `__bot.bitti`, `sonuc`, `son`, `hata`, `log`. Son beklenen: iyi kuyu 36, kötü kuyu 3.
  - `olcum.js`: `/__olcum.js` yükle, `?gun=5` ile `__olc()`; bütün metin ve panellerde taşma ölçer.
  - `esit.js`: `node esit.js` story.js ile taslağı karşılaştırır. Beklenen: eksik 2 (`{gereken}` satırı ve yedek harita düşüncesi).
  - `harita_sim.js <çıktı klasörü>`: 6000 sanal oyun, satır görünme oranı, hata sayısı.
  - `ses_analiz.py`, `ses_hazirla.py`: ses ölçüm ve üretim (`librosa` bozuk, kullanma; `scipy` var).
  - `sim_referans.txt`: `node sim/simulate.js` beklenen çıktısı. Denge değişmediyse `cmp` ile birebir aynı olmalı.

## Test notları
- **Önizleme bölmesi `file://` sayfasında betik çalıştırmıyor.** `sunucu.js` ile `localhost`'tan aç. `file://` için başsız Chrome: `chrome.exe --headless=new --user-data-dir=<scratchpad> --screenshot=... file:///D:/kop31/koyumun-suyu/index.html`.
- **Pencere gizliyken** zamanlayıcılar yavaşlar, ekran görüntüsü zaman aşımına uğrar, `requestAnimationFrame` durabilir; oyun hatası değildir. Tek `javascript_tool` çağrısı en çok 45 saniye sürmeli.
- Sesin çalması için en az bir gerçek tıklama gerekir (`computer` ile Başla).
- Keçi taraması botta `setPointerCapture` taklidiyle çalışır; gerçek sürükleme `computer left_click_drag` ile de doğrulandı.
- Windows'ta Python ile dosya yazarken nadiren `OSError 22` çıkabilir: dosya kısmen işlenmiş olabilir, yeniden denemeden önce durumu kontrol et.
- Uzun betikleri tek kabuk komutuna gömme (tırnak hatası); dosyaya yazıp çalıştır.
- `?gun=N` istenen günden başlatır, kaydı ezmez. `?debug=1` durum paneli. `?dil=en`.
- Durum yapısı değişince `config.js`'te `KAYIT.surum` artır.

## Güncelleme (1 Kasım öğleden sonra)
- Kullanıcının `gecicitalimatvediyalog/diyaloglar-deneme.md` metni `js/story.js` ve `taslak/DIYALOGLAR.md`'ye aktarıldı, yazımı düzeltildi. Görsel yaması uygulandı, görseller bağlandı, final metni yazıldı. Kuyu ölçümü "bir ayda yarım metre" oldu.
- Çeviri bu metne göre güncel değil: `ceviri/uygula_ceviri.js` 220 satırı eksik veriyor (notlar klasörü `local_7037aff6-...`).
- Açık mantık soruları kullanıcıda: otobüs/kamyon, ailenin tarlası, gün 7 bidonları, kötü sonda "çok geç" tekrarı.
- Oyunun Türkçe adı "Son Damla" oldu (depo adı ve adres aynı). Yeni logo `sondamla.png` bağlandı (Türkçe ekranda). İngilizce adı "The Last Drop", İngilizcede başlık yazıdır.
