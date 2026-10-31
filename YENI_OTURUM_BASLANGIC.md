# Köyümün Suyu – Yeni Oturum Devir Notu (31 Ekim 2026, akşam)

Önceki oturum çok uzadığı için aktarıldı. Bu dosya önceki oturumun tek özetidir; konuşmanın kendisini görmeden devam etmeye yeter.

## Durum özeti
- **Hackathon:** GameUP Türkiye (HP / ICPSD / UNDP), COP31 teması. **Özellik dondurma Pazar 1 Kasım 14:00, teslim 23:59** (sunum şablonu + demo).
- **Yayın:** https://mydd70.github.io/koyumun-suyu/ · Depo: https://github.com/mydd70/koyumun-suyu (herkese açık, `main`). Bu makinede push çalışıyor.
- **Oyun:** 9 gün baştan sona oynanıyor, iki son açık, 12 arka plan bağlı, diyalog v2 oyunda.
- **Tek geçerli tasarım:** `tasarim_v4.md`. Kurallar: `CLAUDE.md`. İlerleme ve açık konular: `ILERLEME.md`. `SABAH_RAPORU.md` eskidir.
- **Etiketler:** `asama-0` … `asama-6`. Aşama 7 (metin + çeviri) ve Aşama 8 (görsel) devam ediyor, etiketlenmedi. Aşama 9 başlamadı.

## Sıradaki adımlar (sırayla)
1. **Kullanıcı:** Oyunu oynar, `taslak/DIYALOGLAR.md`'yi kesinleştirir, final metnini seçer. Bitince **"metin hazır"** der.
2. **Claude:** `git diff` ile taslaktaki farkları görür, `js/story.js` ve `js/dil.js`'e aktarır (taslak ve oyun şu an birebir aynı, son commit `ae8f8ea` ve sonrası). `asama-7` metin kısmı biter.
3. **Claude:** Kesinleşen metni İngilizceye çevirir: `story.js`'te her satır, seçenek, `giris` ve `baslik` için `en`; `GUN_KARTLARI`, `YER_DUSUNCELERI`, `IKNA_SECENEK`, `IKNA_METIN`. Arayüz metinleri `dil.js`'te zaten iki dilli. Çeviri geride kalınırsa kesme listesinde ilk sıradadır (kesmek onay ister). Oyunun İngilizce adı geçici: "Water of My Village".
4. **Kullanıcı:** Portreler (`anne`, `mehmet`, `yasli_cift`, `komsu`, `muhtar`, `ogretmen`, `baba`), ampul (256×256) ve keçi (yaklaşık 800×560) görseli, saydam PNG. İsteğe bağlı sesler.
5. **Claude:** Görselleri inceler, WebP'ye çevirir, bağlar, `KAYNAKLAR.md`'yi günceller; `asama-8`.
6. **Claude:** Aşama 9: biri İngilizce 3 tam oynanış, hata düzeltme, son yayın, `asama-9`.
7. **Kullanıcı:** Sunum, demo, teslim.

Her aşama sonunda kısa özet ver, bir sonrakine geçmeden onay al.

## Alınmış kararlar (kullanıcı onayladı, yeniden tartışma)
**Mekanik**
- Eve en az 2 damla (içme suyu). Her satıra en fazla ihtiyaç kadar damla; fazlası verilemez, kalan damla boşa gider.
- Gri su birikmez, panelde Ev ile Bahçe arasında ayrı satırdır, gün 2'de vurguludur.
- Komşuya su: gün 7 sahnesinden sonra açılır (gün 7 ve 9 öğlesi), en fazla 2, gün 9'da bedelsiz, ikna olunca kapanır.
- İkna: 3 argümandan 2'si; **konuşmada en fazla 1 argüman**; **A2 gün 8'den önce sayılmaz, kilitlenmez**, o konuşmayı harcar; yanlış seçenek konuyu kilitler ve konuşmayı bitirir, özür açar, gün 8'de aynı konuşmada geri alınır.
- Gün 9 tek başına kurtarmaz. Gün 9'da ikna olursa motor o gün çalışmış olur (kuyu −3), komşu yine evet der.
- Görev ziyareti ve kısa sohbet hak tüketmez. Sohbet: bilgisi açılmamış kişide, kişi başına 1, argüman vermez; **tanışma gibi yazılmaz** (herkes birbirini tanır), sonunda Mehmet'in o kişi hakkındaki iç sesi gelir.
- Serbest öğle ve akşam "bir şey yapma" ile etkisiz geçilebilir.

**Akış ve arayüz**
- Her dilim sonunda düğme: Öğleye geç / Akşama geç / Eve dön / Günü bitir. Ziyaretten sonra "Hava karardı. Eve dönmeliyim.", avlu, gece satırı, sonra yarınki pay ve yarının planı.
- Gün kartında ve üst çubukta günün planı, serbest dilimler yeşil. Gün 8 öğlesi "?" (obruk sezdirilmez). Gün 4 gecesi ölçüm hatırlatması.
- Zorunlu sahnede yer kartı sebebiyle birlikte tıklanana kadar bekler, diğerleri yaklaşık 1 saniyede kapanır.
- Tüm öğreticiler ampullü pencerede, tekrar oynayışta çıkmaz. Şimdilik 💡; kullanıcı görsel üretecek.
- Haritada soluk yerler tıklanır, Mehmet kısa düşünce söyler, zaman geçmez.
- Keçi adı ek almaz ("Benek'nin" gibi bozulur), metinde hep yalın yazılır.

**Hikâye**
- Mesaj: *Yeraltı suyu ortaktır; kararı suçlayarak değil, ölçeni ve hatırlayanı dinleyerek birlikte verirsek köy ayakta kalır.*
- Rıza'nın kuyusu tarlaya gider, içilmez. Gün 7'de köylüler sırayı kapatır; köy de onu dışlar, kimse yalnızca kötü adam değildir.
- 1 damla = 1 bidon. Karakterler bidon, arayüz damla der.
- Kötü son "Ekim." ile başlar, "İlk yağmur" en sonda gelir. İyi son "Ekim. İlk yağmur." ile başlar. Yağmur her şeyi çözmez ("Bir yağmurla dolmaz.").
- Bebek ölümü çağrışımı olmaz; Mehmet Rıza'nın kapısına su ile gider, annesi gönderdi yalanı yok.

**Görseller**
- Hepsi ChatGPT, kaynak PNG'ler `gptgörselleri/` (depoya girmez). `harita1gptı` kullanıldı, `harita2gpt` düzeni bozuk olduğu için elendi; ilk `sarnic*`, `yasliciftevi`, `sehiryolu` sürümleri yenileriyle değişti.
- Görselle akşam yanan pencereler ve yeşeren bahçe görünmez (yalnızca SVG'de); kabul edildi.
- Sarnıç görselleri kapalı havalı çizildi, üstüne renk katmanı konmaz, yağmur çizgileri eklenir.

## Bir sonraki oturumda konuşulacak açık konular
**Kullanıcının kararı**
1. Metin uzunluğu: oyunda gerçek metin yaklaşık 2.600 kelime (bir oyuncu bir kısmını görür), hedef 4-5 bindi. Oynadıktan sonra karar.
2. Final metni. Adaylar `taslak/DIYALOGLAR.md` sonunda.
3. Karakter adları ve oyunun İngilizce adı hâlâ geçici.

**İncelemede görülen, henüz çözülmeyen küçük sorunlar (önce kullanıcıya sor)**
4. Defter A2 için "henüz inanmıyor" demiyor. Oyuncu gün 8'den önce A2'yi söyleyip konuşma hakkını boşa harcayabilir. Öneri: gün 8'e kadar defterde "(obruk görmeden inanmaz)" yazsın.
5. Dağıtımda kalan damla boşa gider ama "Tamam" uyarmıyor. Öneri: damla kaldıysa küçük bir uyarı.
6. Yarın duyurusu ile sabahki gün kartı aynı planı art arda gösteriyor. Kullanıcı planı beğendi; oynarken tekrar rahatsız ederse biri kısaltılır.
7. Anne ipucu aynı cümleyi ardışık akşamlarda tekrar edebilir.
8. Metinde hâlâ sabit sayılar var: g1'deki "on bir bidon", gecedeki "İki bidon", "Bir buçuk metre". Denge değişirse elle düzeltilir.
9. Öğretmen ziyareti haritada "Okul" ama sahne köy yolu; okul görseli yok. Kabul edildi, kullanıcı isterse görsel üretir.
10. Keçi hikâyede az işliyor. A3 iletildiyse iyi sonda karşılığı yok (A1 ve su götürmenin var). İsteğe bağlı.
11. Keçi ve ampul görseli için bağlama kodu yok: keçi `js/ui/minioyun.js` içinde SVG, ampul `js/ui/diyalog.js` içinde emoji. Görsel gelince yazılacak. Portre yükleme kodu hazır ama gerçek dosyayla denenmedi.

**Doğrulanmamış**
12. Kullanıcı arayüzde üst üste binme görmedi, ama elle tam kötü son ve gün 7'den sonraki yeni ikna akışı henüz oynanmadı. Otomatik tıklamayla hepsi çalışıyor (Rıza A2 reddi, tek argüman, geri alma, gün 9 son şans).
13. Gerçek ses dosyası hiç çalınmadı, tam ekran ve gerçek telefon denenmedi, `index.html` çift tıklamayla açılış denenmedi.

**Teslim öncesi kontrol (kullanıcı)**
14. Sunumda kaynağından doğrulanacaklar: 6111 sayılı kanunun yılı, 2026 yağış rakamı. "Ayda 1,5 metre" kurgudur, gerçek ölçüm gibi sunulmaz.
15. ChatGPT görselleri için hackathonun "3. kişi hakları" kuralına bakılmalı (`KAYNAKLAR.md`).
16. Commit'lerdeki e-posta adresi depoda açık; kullanıcıya bildirildi, kendisi push etti.

## Sesler
`assets/audio/<ad>.mp3`; eksik olan sessiz geçer, geç gelmesi sorun değil. Belgedekiler: `ruzgar`, `cirkir`, `yagmur`, `bebek_agla`, `bebek_gul`, `keci`, `kamyon`. İsteğe bağlı: `telefon`, `hat_kesilir`, `gurultu`, `kapi`.

## Tercihler
- Açıklamalar net, kısa, abartısız. Dürüst değerlendirme; uygun görmediğin yerde itiraz et, alternatif öner.
- Kararları tek tek sor. Belgede olmayan özellik ekleme, önce öner.
- Geri dönüşü olmayan işlerde (silme, tasarım değişikliği, kesme) önce onay al. Yayın ve GitHub Pages onaylandı, normal push'lar yapılıyor.

## Test notları
- **Önizleme bölmesi `file://` sayfasında betik çalıştırmıyor.** Geçici bir Node statik sunucusunu oturumun scratchpad'inde yaz (proje dışında), `localhost`'tan aç, işin bitince durdur.
- Önizleme pencere gizliyken ekran görüntüsü alamayabilir, CSS animasyonları da ilerlemeyebilir; bu oyun hatası değildir.
- Otomatik oynanış için sayfada JS ile sırayla tıkla: `#gecis` (`onclick`), `#ilerle`, `#tamEkran` son düğmesi, `#diyalog` ve `.secenekler button`, `.hizli-gec`, `.dagitim-satir:not(.gri-satir)` (sıra Keçi, Ev, Bahçe), `.yer-menu button`, `.yer:not(.soluk)`. `KS.state.tekrarOyun = true` mini oyunları ve öğreticileri geçer.
- `?gun=N` istenen günden başlatır, kaydı ezmez. `?debug=1` durum paneli. `?dil=en`.
- Yeni görsel: Python PIL ile `save(yol, 'WEBP', quality=85, method=6)`, `config.js`'te `GORSEL.dosyalar` ya da `PORTRE.dosyalar`'a ekle, `KAYNAKLAR.md`'ye yaz.
- Durum yapısı değişince `config.js`'te `KAYIT.surum` artır.
- Bağımsız inceleme gerekirse düşük maliyetli alt ajan iki kez işe yaradı (arayüz hataları, hikâye tutarlılığı); bulgularını kodla doğrula.
