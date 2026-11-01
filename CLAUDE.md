# Son Damla (The Last Drop)

GameUP Türkiye hackathonu için tarayıcı oyunu. Teslim: 1 Kasım 2026 Pazar 23:59. Özellik dondurma: Pazar 14:00.

Tek geçerli tasarım belgesi `tasarim_v4.md`. Kod kuralları bölüm 16, onay gerektiren işler bölüm 17, aşamalar bölüm 18. Hangi aşamada olunduğu `ILERLEME.md` ve git etiketlerinde (`asama-N`). Oturum devri, alınmış kararlar, açık konular ve test notları `YENI_OTURUM_BASLANGIC.md`'de: yeni oturumda önce onu oku. Yayın: https://mydd70.github.io/son-damla/ (`main`'e push yeter; yerel klasör eski adı taşır). Test araçları ve çeviri dosyaları git dışındaki `notlar/` klasöründe. `taslak/DIYALOGLAR.md` ile `js/story.js` aynı metni taşır; biri değişince öbürü de güncellenir.

## Çalışma biçimi
- Kullanıcıyla Türkçe, net, kısa, abartısız konuş. Uygun görmediğin yerde itiraz et.
- Kararları tek tek, sırayla sor.
- Aşama başlamadan kısa plan yaz, kullanıcı "başla" demeden başlama. Aşama sonunda kısa özet ver, `ILERLEME.md`'yi güncelle, sonraki aşama için onay al.
- Belgede olmayan özellik, dosya ya da araç ekleme; gerekirse önce sor.
- Onaysız yapma: GitHub'a ilk push, depoyu herkese açma, Pages yayını, dosya silme, git geçmişini değiştirme, tasarım kararı değiştirme, kesme listesinden bir şey kesme, lisansı belirsiz asset kullanma.
-Tüm işleri bir görev kuyruğu olarak ele al. Yeni istekleri, düzenlemeleri ve düzeltmeleri mevcut görevi yarıda kesmek yerine kuyruğun sonuna ekle. Öncelikleri açıkça değiştirmediğim veya kritik bir durum acil müdahale gerektirmediği sürece görevleri sırayla tamamla. Yalnızca kuyruktaki tüm işler tamamlandığında dur.
- Herhangi bir değişiklik yapmadan önce gerekli tüm dosyaları listele ve mümkün olduğunca hepsini tek seferde oku. Düzenlemelere başlamadan önce bağımlılıkları anla. Değişmemiş dosyaları gereksiz yere tekrar okuma.
- Testleri çalıştırmadan önce ilgili tüm düzenlemeleri tamamla. Değişikliklerden sonra uygun testleri bir kez çalıştır. Bir test başarısız olursa harekete geçmeden önce hatanın nedenini analiz et. Temel sorunu düzelt ve yalnızca düzeltmeyi doğrulamak için gerekli testleri yeniden çalıştır. Gerekçesiz test tekrarı yapma ve çalıştırılmamış testleri başarılı olarak gösterme.
- Hataları gereksiz özürler yerine araştırılması gereken sorunlar olarak ele al. Temel nedeni belirle; proje talimatlarındaki veya yapılandırmadaki olası eksiklikleri de değerlendir. Uygun bir çözüm öner veya uygula.
- YAGNI ilkesini uygula. Aşırı mühendislikten, gereksiz soyutlamalardan ve talep edilmeyen kapsam genişletmelerinden kaçın. Yapılacak işin mühendislik düzeyini projenin gerçek ihtiyaçlarına göre belirle. Kapsam iyileştirmelerini ayrı olarak öner ve uygulamadan önce onayımı al.
- Bağımsız kod incelemesini görevin karmaşıklığı veya riski gerektirdiğinde kullan. Uygun olduğunda, yalnızca gerekli bağlamı sağlayarak düşük maliyetli bir alt ajan kullan. Her küçük değişiklik için ajan başlatma; sağlayacağı faydayı ek maliyetle karşılaştır. İnceleme bulgularını değerlendir ve görev tamamlanmadan önce önemli sorunları gider.


## İş bölümü
Kod, story.js aktarımı, SVG sahneler ve simülasyon Claude'da. Portre, arka plan, ses ve `taslak/DIYALOGLAR.md` düzeltmeleri kullanıcıda; bu dosyayı kullanıcı düzenliyor olabilir, aktarmadan önce yeniden oku.

## Kod kuralları
- Düz HTML/CSS/JS. Framework, derleme aracı, paket yöneticisi, test kütüphanesi, canvas yok.
- ES modül yok: düz `<script>` etiketleri ve tek global `KS`, `index.html` çift tıklamayla açılmalı. Mantık dosyaları `module.exports` korumasıyla biter.
- Her sayı `js/config.js`'te adlandırılmış sabit olarak durur.
- Oyun iki dilli (tr/en): arayüz metni `KS.t` ile `js/dil.js`'ten, hikaye metni `story.js`'teki `metin`/`en` alanlarından gelir. Arayüz koduna metin yazma.
- Tek durum nesnesi `KS.state`. Durumu yalnızca `js/logic.js` değiştirir; arayüz okur ve logic fonksiyonlarını çağırır.
- `logic.js` DOM'a, sese ve zamana dokunmaz; aynı girdi aynı çıktıyı verir.
- Akıllıca soyutlama yerine açık kod, küçük fonksiyonlar. Dosya başında tek satır açıklama, karmaşık kurallarda kısa Türkçe yorum. Adlar Türkçe.
- Eksik görsel ya da ses oyunu durdurmaz: SVG ya da sessiz yer tutucu kullanılır, konsola uyarı yazılır.

## Git
- Commit mesajları Türkçe ve ne değiştiğini söyler. Riskli değişiklikten önce commit at.
- Her aşama, oyun çalışır hâldeyken commit ve etiketle kapanır.
- Force push ve `reset --hard` yok.

## Doğrulama
- `node sim/simulate.js` hatasız çalışmalı. Denge değişikliğinden sonra yeniden koş, sonuç tablosunu kullanıcıya göster, `sim/SONUC.md`'yi güncelle.
- Aşama sonunda oyunu tarayıcıda baştan sona tıklayarak ilerlet. `?gun=N` istenen günden başlatır, `?debug=1` durum panelini açar.
