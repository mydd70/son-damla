# Köyümün Suyu – Diyalog taslağı (v2, oynanışa göre baştan yazıldı)

Bu sürüm oyuna aktarıldı, oynayarak düzenleyebilirsin. Değişikliklerini buraya yaz; "metin hazır" deyince tekrar aktarılır.

**Yazım kuralları**
- `{keci}` = oyuncunun verdiği keçi adı. Ad hep yalın yazılır, ek almaz ("Benek'nin" gibi bozuk çıkar).
- `{pay}` = o günkü damla sayısı. Metindeki diğer sayılar aktarılırken config.js'e bağlanır.
- `[ses: ...]` ses, `[sahne: ...]` arka plan, `(iç ses)` Mehmet'in düşüncesi.
- `> ` oyuncu seçeneği. `{A1}` gibi etiketler argüman öğrenme anıdır.
- `[ipucu]` ampullü öğretici penceresi. `(koşul)` satırın yalnızca o durumda görüneceğini söyler.
- 1 damla = 1 bidon su. Oyuncu damla görür, karakterler bidon der.
- Geçici isimler: Hasan Dede, Fatma Nine, Rıza Amca (komşu), Zeynep Öğretmen.

---

## Başlangıç

### Keçiye isim
- **Ekran:** Keçimizin adı ne?
- *(boş bırakılırsa: Pamuk)*

### Gün kartları
Kartta planın altında bugünkü su payı yazar; komşuya su götürüldüyse kaç damlasının ona gittiği de eklenir.

| Gün | Kart | O günün planı (karta eklenecek) |
|---|---|---|
| 1 | Ağustos 2025. Konya Ovası. | Sabah: ev · Öğle: kuyu başı · Akşam: serbest |
| 2 | Gün 2 – Sıcak, rüzgârsız. | Sabah: ev · Öğle: yaşlı çift · Akşam: serbest |
| 3 | Gün 3 – Kuyu başında erken bir sıra. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 4 | Gün 4 – Domatesler boynunu büktü. | Sabah: ev · Öğle: serbest · Akşam: serbest |
| 5 | Gün 5 – Tepeye çıkan yol tozlu. | Sabah: tepe · Öğle: serbest · Akşam: serbest |
| 6 | Gün 6 – Muhtarlıkta toplantı var. | Sabah: ev · Öğle: muhtarlık · Akşam: serbest |
| 7 | Gün 7 – Köy sessiz. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 8 | Gün 8 – Sıcak dalgası. | Sabah: ev · Öğle: ? · Akşam: serbest |
| 9 | Gün 9 – Cuma. Köy toplantısı. | Sabah: ev · Öğle: son fırsat · Akşam: toplantı |

### g1_acilis – Gün 1 sabah [sahne: avlu]
- [ses: bebek ağlaması, kısa]
- **Mehmet (iç ses):** Kardeşim yine erkenden uyandı. Yani herkes uyandı.
- **Mehmet (iç ses):** {keci} ağılda yatıyor. Kalkmaya çalışıyor, kalkamıyor.
- **Anne:** Dün akşamdan beri böyle. Susuzluktan halsiz.
- **Mehmet:** Veteriner çağırsak?
- **Anne:** Veterinere para yok, oğlum. Su lazım, biraz da ilgi.
- **Mehmet:** Babam aradı mı?
- **Anne:** Aramadı. Şehirde iş bulursa arayacak.
- **Anne:** Muhtar her eve günlük pay yazdı. Bugün on bir bidon. Her geçen gün biraz daha azalacak.
- **Mehmet:** On bir bidon yeter mi?
- **Anne:** *(bir süre susar)* Yetmez. Yine de bölüştüreceğiz.

### Öğretici: dağıtım
- **[ipucu]** Bugünkü payın {pay} damla. Her damla bir bidon su. Evin, keçinin ve bahçenin ihtiyacı daha fazla.
- **[ipucu]** Kime ne kadar vereceğine sen karar ver. Tam su alan toparlanır, eksik kalan her damla çubuğu biraz daha düşürür.
- **[ipucu]** "Kuyudan fazladan çek" 4 damla daha verir. Bunu kimse görmez, ama köyün kuyusu düşer.

### Öğretici: keçi bakımı
- **[ipucu]** {keci} seni bekliyor. Sırtını tara, su kabını göster, yemini ver. Bakım gördükçe toparlanır.

### g1_tanima – Gün 1 öğle [sahne: kuyu_basi]
- **Kart:** Annen seni bidonlarla kuyu başına yolladı.
- **Mehmet (iç ses):** Kuyu başı yine kalabalık. Bidonlar sıra sıra.
- **Köylü:** Eskiden bir kova yeterdi. Şimdi ip uzadıkça uzuyor.
- **Başka bir köylü:** Biz burada bidon sayıyoruz, Rıza'nın motoru bütün gece çalıştı.
- **Köylü:** Sus. Rıza duyar.
- **Mehmet (iç ses):** Rıza Amca bizim komşu. Motorunun sesi evimize kadar gelir. Kimse yüzüne bir şey demez, arkasından çok konuşur.
- **Mehmet (iç ses):** Kuyuda ne kadar su kaldığını kimse bilmiyor. Bilen varsa da söylemiyor.
- **[ipucu]** Ekranın kenarındaki gösterge köy kuyusunun seviyesi. Her gün biraz iner. Oyunun sonunda her şey ona bağlı olacak.

### Öğretici: harita (gün 1 akşam, ilk harita)
- **[ipucu]** Akşamları birine uğrayabilir ya da ailenle vakit geçirebilirsin. Ama yalnızca birini: akşam uzun değil.
- **[ipucu]** Haritada gitmek istediğin yere dokun. Soluk yerlerde şimdilik yapılacak bir şey yok.

### Öğretici: kiler (gün 1 gece, ilk kiler değişiminde)
- **[ipucu]** Sepetler evin yiyeceği. Her akşam iki sepet eksilir. Süt veren keçi bir, yeşeren bahçe bir sepet getirir: ikisi de ayakta olmalı. Kiler boşalırsa ev zorlanır.

### Öğretici: boş kiler (kiler ilk kez boş kaldığı gece)
- **[ipucu] Boş kiler:** Kiler boş kaldığı her gece aile kuyudan gizlice su çeker, köyün kuyusu düşer. Keçi ve bahçe kileri doldurur.

---

## Gün olayları

### g2_grisu – Gün 2 sabah [sahne: avlu]
- **Anne:** Dur, leğendeki suyu dökme. Bulaşık suyunu da.
- **Mehmet:** Kirli o.
- **Anne:** Domatesler kirli mirli bakmaz. Ninen de böyle yapardı. Dök bahçeye.
- **[ipucu] Gri su:** Evde kullanılan su artık boşa gitmiyor. Eve verdiğin her 3 damladan 1'i bahçeye döner. Dağıtım panelindeki "Gri su" satırında görürsün. Eve az verirsen bahçeye dönen de azalır. Gri su ertesi güne kalmaz.

### g2_yaslicift – Gün 2 öğle [sahne: yasli_cift_evi]
- **Kart:** Fatma Nine seni çağırtmış.
- **Fatma Nine:** Gel bakalım, Mehmet. Gölgeye otur. Gölge dediysem, çardağın gölgesi de kurudu ya.
- **Hasan Dede:** Bu asma kırk yıl üzüm verdi. İki yazdır yaprak bile zor tutuyor.
- **Mehmet:** Dede, eskiden de böyle kurak olur muydu?
- **Hasan Dede:** Kurak yıl çok gördük. Ama yeraltı dolardı, dere de akardı. Kuyuya on metre ip yeterdi.
- **Fatma Nine:** Seni bunun için çağırmadım, dinleme onu. Al şu tohumları. Bizim köyün tohumu bunlar, az suyla yetinir. Bahçenizin boş kalan yerine ek.
- **[ipucu] Dayanıklı tohum:** Yarından itibaren bahçe daha az su ister.
- **Hasan Dede:** Bir de köyün yukarısında eski bir sarnıç var. Yağmur suyunu orada toplardık. Kimse bakmadı, yıkıldı gitti.
- > Dere mi vardı burada, dede? {A1}
- > Teşekkürler, Nine. Annem bekler.

**{A1} seçilirse (g2_a1):**
- **Hasan Dede:** Vardı ya. Muhtarlığın önünden akardı. Kıyısında koca bir söğüt vardı.
- **Fatma Nine:** Çocuklar yazın hep oradaydı. Rıza'yla muhtar en önde. Söğüdün dalından suya atlarlardı.
- **Mehmet:** Rıza Amca mı? Suya mı atlardı?
- **Hasan Dede:** *(güler)* O da çocuktu bir zaman. Motorlar çoğaldı, dere çekildi, söğüt de kurudu. O ağacı çok severdi.
- **Mehmet (iç ses):** Rıza Amca'yı hiç gülerken görmedim. Bunu aklımda tutayım.
- **Ekran:** Deftere yazıldı: Rıza Amca'nın söğüdü

### g3_olcum – Gün 3 sabah [sahne: kuyu_basi]
- **Kart:** Su almaya indin. Öğretmen elinde iple kuyunun başında.
- **Zeynep Öğretmen:** Mehmet, iyi ki geldin. Tut şu ipin ucunu. Bırakma ama.
- **Mehmet:** Ne yapıyorsunuz?
- **Zeynep Öğretmen:** Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.
- **Zeynep Öğretmen:** *(ipi işaretler)* Bir ayda neredeyse bir buçuk metre inmiş.
- **Mehmet:** Bu çok mu?
- **Zeynep Öğretmen:** Altmış beş yılın en kurak yıllarından birindeyiz. Bu hızla giderse sonbahara kuyu boşa döner.
- **Mehmet:** Rıza Amca'nın kuyusu da bu suyu mu çekiyor?
- **Zeynep Öğretmen:** Hepimizin kuyusu aynı suya iniyor. Biri çekince hepimizin ipi uzuyor.
- **Zeynep Öğretmen:** Bunu muhtar görmeli. Ben anlatınca "öğretmen hanım yine hesap yapmış" diyor. Kâğıt senin elinden gitsin, köyün çocuğu getirdi desin.
- **Zeynep Öğretmen:** *(kâğıdı katlayıp uzatır)* Al. Cebinden düşürme. Muhtar akşamları muhtarlıkta olur.
- **[ipucu] Defter:** Görevlerin üstteki Defter'de yazar. Ölçümü gün 5 akşamına kadar muhtara götür. Geç kalırsan plan zayıf kalır.
- > Kuyu tamamen kurursa ne olur? {A2}
- > Tamam, götürürüm.

**{A2} seçilirse (g3_a2):**
- **Zeynep Öğretmen:** Yeraltı suyu çekildikçe toprağın altında boşluklar kalıyor. Bir gün tavan çöküyor.
- **Zeynep Öğretmen:** Ovada yüzlerce obruk var artık. Motorların en çok çalıştığı tarlalarda da...
- **Mehmet:** Rıza Amca'nın tarlası gibi mi?
- **Zeynep Öğretmen:** *(cevap vermez, ipi sarar; akşam ziyaretinde: cevap vermez, önündeki defteri kapatır)*
- **Ekran:** Deftere yazıldı: Obruk uyarısı

### Ölçüm teslimi – görev ziyareti, gün 3-5 akşam [sahne: muhtarlik]
- **Mehmet:** Muhtar amca, öğretmen bunu gönderdi. Kuyunun ölçümü.
- **Muhtar:** *(kâğıda uzun uzun bakar)* Bir buçuk metre ha...
- **Muhtar:** Ben de içten içe biliyordum. Ama kâğıda yazılınca başka oluyor.
- **Muhtar:** Öğretmen hanımla oturalım o zaman. Köyün işini köy konuşsun. Sen de eline sağlık.
- **Ekran:** Defter: Ölçüm muhtara ulaştı ✓

### Ölçüm hatırlatmaları
- **Gün 4 akşam (teslim edilmediyse) – Anne:** Öğretmen hanım bir kâğıt vermiş sana, muhtara götürdün mü?
- **Gün 5 sabah (teslim edilmediyse) – Anne:** O kâğıt hâlâ cebinde mi? Bu akşam götür, oğlum.

### g4_cicek – Gün 4 sabah [sahne: avlu]
- **Anne:** Muhtar kapı kapı dolaşıyor, suyu idareli kullanın diye. Öğretmen hanım da anlatıp duruyormuş. *(ölçüm teslim edilmediyse: Öğretmen hanım kapı kapı dolaşıyor, suyu idareli kullanın diye. Muhtar da çağırmış köylüyü.)*
- **Mehmet (iç ses):** Annemin pencere önündeki sardunyası. Kurumak üzere.
- **Anne:** Ona su verme, boş ver.
- **Mehmet:** *(bardağının dibinde kalan suyu sardunyaya döker)*
- **Anne:** *(gülümser, bir şey demez)*

### g5_baba – Gün 5 sabah [sahne: tepe]
- **Kart:** Babanın araması için tepeye çıktın.
- **Mehmet (iç ses):** Annemin telefonu yalnızca tepede çekiyor. Babam muhtarlığa haber bırakmış, bu sabah arayacakmış.
- [ses: telefon]
- **Baba:** Mehmet? Sesim geliyor mu?
- **Mehmet:** Geliyor baba! Ne zaman geleceksin?
- **Baba:** *(bir an susar)* İnşaatta bir iş var, belki. Çağırdıkları gün gidiyorum, çağırmadıkları gün bekliyorum.
- **Baba:** Annen nasıl? Uyuyor mu geceleri? {keci} nasıl?
- *(keçi <5)* **Mehmet:** {keci} hâlâ iyi değil. Kuyu da iniyor, öğretmen ölçtü.
- *(keçi ≥5)* **Mehmet:** {keci} toparlanıyor. Ama kuyu iniyor, öğretmen ölçtü.
- **Mehmet:** Bidonları artık ben taşıyorum.
- **Baba:** Ben de senin yaşındayken taşırdım. O zaman bu kadar ağır değildi.
- **Mehmet:** Rıza Amca'nın motoru da hiç durmuyor.
- **Baba:** Rıza mı? Sen muhtarla konuş. O adamı bir tek muhtar...
- [ses: hat kesilir]
- **Mehmet (iç ses):** Kesildi. Bir tek muhtar ne?

### g6_sabah – Gün 6 sabah [sahne: avlu]
- **Anne:** Muhtar seni sormuş. Öğlen muhtarlığa uğra.
- **Mehmet:** Beni mi?
- **Anne:** Seni. Temiz gömleğini giy.

### g6_plan – Gün 6 öğle [sahne: muhtarlik]
- **Kart:** Muhtar seni de muhtarlığa çağırdı.

**Güçlü plan (ölçüm zamanında ulaştıysa):**
- **Muhtar:** Öğretmen hanımla oturduk, bir yol çizdik. Sen de dinle, senin sayende.
- **Zeynep Öğretmen:** Eski sarnıcı onarıyoruz. Yağmur gelince boşa akmasın, köy çeşmesine insin.
- **Muhtar:** Kuyulara sayaç, motorlara saat. Yasada var zaten, bizde kimse takmamış. Herkes ne çektiğini bilecek.
- **Zeynep Öğretmen:** Sulama sabah erken ya da akşam serinde, miktarı sayaç söyleyecek. Toprağın üstü saman ya da otla örtülecek, buharlaşmasın.
- **Muhtar:** Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.
- **Muhtar:** Hepsini cuma akşamı köy toplantısında oylayacağız.

**Gecikmeli plan (ölçüm ulaşmadıysa):**
- **Muhtar:** Öğretmen hanım ölçümün bir örneğini getirdi sonunda. Ölçüm bize geç ulaştı.
- **Mehmet (iç ses):** Kâğıt cebimde kalmıştı.
- **Muhtar:** Keşke daha önce görseydim. Kuyu bu arada epey indi.
- **Zeynep Öğretmen:** Sarnıç, sayaç, sulama saatleri... Bu kadar kısa sürede elimizden geleni yazdık.
- **Muhtar:** Cuma akşamı köy toplantısında oylayacağız.

**Her iki durumda:**
- **Zeynep Öğretmen:** Sarnıcı Hasan Dede hatırlattı, toprağı otla örtmeyi Fatma Nine'den öğrendik. Ben yalnız ölçtüm.
- **Muhtar:** Rıza'nın motoru durmazsa hiçbiri yetmez. Köy de ikiye bölünmüş, oylar eşit çıkarsa gözler ona döner. O da kimseyi dinlemez.
- > (A3 öğrenilmediyse) Babam "o adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca'yla neden konuşmuyorsunuz? {A3}
- > Ben konuşurum.

**{A3} seçilirse (g6_a3):**
- **Muhtar:** *(uzun süre susar)* Biz Rıza'yla askere beraber gittik. Döndüğümüzde köyün yukarısındaki sarnıcın oluğunu beraber çaktık.
- **Muhtar:** Kuraklık yılıydı, seksen dokuz. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı, Rıza.
- **Muhtar:** Baban da senin yaşındaydı. Yukarıya bidonla su taşırdı bize.
- **Muhtar:** Sonra motorlar geldi, laflar uzadı. Sonra... olan oldu. Neyse.
- **Ekran:** Deftere yazıldı: Muhtarla Rıza Amca'nın sarnıcı

**Sonunda (her iki seçenekte):**
- **Zeynep Öğretmen:** Bize kapısını açmaz. Sen çocuksun, sana bir şey demez belki.
- **Muhtar:** Zorla olmaz, Mehmet. Dinletebilirsen dinlet.
- **[ipucu] Komşuyu ikna et:** Rıza Amca'ya köyde öğrendiğin iki şeyi söylersen toplantıda planı destekler. Bir konuşmada yalnız bir şey dinler, her şeye de hemen inanmaz. Ne söylediğin kadar nasıl söylediğin de önemli. Defter'de görürsün.

### g7_komsu – Gün 7 sabah [sahne: kuyu_basi]
- **Kart:** Su almaya indin. Bu sabah kuyu başında beklemediğin biri var.
- **Mehmet (iç ses):** Rıza Amca kuyu başında. Herkes onu görünce susmuş.
- **Rıza Amca:** Damacanam bitti. Bir bidon alıp gideceğim.
- **Köylü:** Sıra sayılı, Rıza. Motorun yüzünden bidonlar yetmiyor.
- **Başka bir köylü:** Senin kuyun var ya. Ondan iç.
- **Rıza Amca:** O su içilmez, biliyorsunuz.
- **Köylü:** Biliyoruz.
- **Rıza Amca:** *(bir süre durur, boş bidonu alır, gider)*
- **Mehmet (iç ses):** Haksız da değiller. Ama bidon boş döndü.
- **Mehmet (iç ses):** Bir şey diyemedim. Ama bir bidon taşıyabilirim.
- **[ipucu] Komşuya su:** Artık öğlenleri haritadan Rıza Amca'ya su götürebilirsin. Yarınki paydan 2 damla gider, ama onunla konuşma fırsatı olur.

### g8_sabah – Gün 8 sabah [sahne: avlu]
- **Ekran:** Sıcak dalgası. Gölgede kırk derece.
- **Anne:** Bugün dışarıda fazla kalma. Kardeşini de içeri alalım.

### g8_obruk – Gün 8 öğle [sahne: komsu_tarlasi_obruk]
- **Kart:** Derinden bir gürültü geldi. Köylüler Rıza Amca'nın tarlasına koşuyor.
- [ses: derinden gelen gürültü, toz]
- **Mehmet (iç ses):** Rıza Amca'nın tarlası... Toprak yarılmış. Kocaman bir çukur.
- **Rıza Amca:** *(çukurun kenarında, eli titreyerek)* Dün burada pancar vardı.
- **Rıza Amca:** Kırk yıldır bu toprağı sürüyorum. Kırk yıl!
- **Mehmet:** Rıza Amca, uzak durun, kenarı çöküyor.
- **Rıza Amca:** *(geri çekilir, oturur)* Motor şuradaydı. Bir metre öteye düşseydi...
- *(Karşılaşma başlar. Kaba seçim yapılırsa aynı konuşmada geri alma seçeneği çıkar.)*

### g9_sabah – Gün 9 sabah [sahne: avlu]
- **Anne:** Bu akşam toplantı. Bütün köy orada olacak.
- **Anne:** Baban dün muhtarlığı aramış, toplantıyı sormuş. "Mehmet de gitsin, görsün" demiş.
- *(komşu ikna edilmediyse)* **Mehmet (iç ses):** Rıza Amca'ya söyleyecek son bir şansım var. Öğlen gitmeliyim.
- *(ikna edildiyse)* **Mehmet (iç ses):** "Bakarız" dedi. Gelir mi, gelmez mi, akşam göreceğiz.

---

## Komşuyla karşılaşma

### Kurallar
Bir konuşmada en fazla bir şey söylenir, sonra konuşma biter. Obruk uyarısı gün 8'den önce sayılmaz ve kilitlenmez. Su götürme gün 7 sahnesinden sonra açılır (gün 7 ve 9 öğlesi).

### Açılış
- **Akşam ziyareti:** **Rıza Amca:** Bu saatte tarlada ne arıyorsun, evlat? Otur bakalım, madem geldin.
- **Su götürünce, gün 7:**
  - **Mehmet:** Bidonunuz boştu. Biz paylaşırız.
  - **Rıza Amca:** Benim kuyum var. Suyu tarlaya yarar, içilmez.
  - **Mehmet:** Biliyorum.
  - **Rıza Amca:** *(bir süre bakar, bidonları alır)* Otur, bir çay iç.
  - **Ekran:** Yarınki paydan 2 damla eksilecek.
- **Su götürünce, gün 9:** **Mehmet:** Size su getirdim, Rıza Amca. **Rıza Amca:** Bu köyde bana su getiren bir sen çıktın. *(bir bardak uzatır)* Otur.

### Özür (önceki karşılaşmada kaba seçim yapıldıysa)
- **Mehmet (iç ses):** Geçen sefer ağzımdan çıkanı düzeltmeliyim.
- > Geçen sefer yanlış konuştum, kusura bakmayın.
- > (Bir şey demeyeyim.)
- **Özür dilerse – Rıza Amca:** *(homurdanır)* Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?

### Argüman sorusu
- **Mehmet (iç ses):** Ne diyeyim?
- Her argümanda ek seçenek: > (Bunu açmayayım.)
- Hiçbirini açmazsa: **Mehmet (iç ses):** Bugün ağzımı açamadım. Belki başka zaman.

### Söyleyecek bir şey yoksa
- **Normal:** **Mehmet (iç ses):** Ne desem bilemedim. Önce köydekilerle konuşmalıyım. **Rıza Amca:** Söyleyecek bir şeyin yoksa git işine. *(su götürdüyse: Çayını iç de git, evlat. Annen merak eder.)*
- **Gün 8, obrukta:** **Mehmet (iç ses):** Şimdi ne desem boş. **Rıza Amca:** Git evlat. Burası tehlikeli.

### A1 – Söğüt
- > (nazik) Hasan Dede anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.
  - **Rıza Amca:** *(bir an durur)* Söğüt... Herkes "Rıza'nın söğüdü" derdi. *(yüzünü çevirir)* O dere çoktan gitti.
  - **Rıza Amca:** Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde?
- > (yanlış yaklaşım) Eskiden dere vardı. Herkes biraz idareli olsaydı hâlâ akardı.
  - **Rıza Amca:** İdareyi sen mi öğreteceksin bana? Benim belgem var, devletten aldım.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A2 – Obruk uyarısı
**Gün 8'den önce:**
- > (nazik) Öğretmen ölçtü, kuyu bir ayda bir buçuk metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.
  - **Rıza Amca:** Obruk ovanın öbür ucunda olur. Bizim burada olmaz. *(ama gözünü tarlasından ayırmaz)*
  - **Ekran:** Rıza Amca buna şimdilik inanmıyor. *(sayılmaz, kilitlenmez)*
- > (yanlış yaklaşım) En doğrusu motoru hemen kapatmanız.
  - **Rıza Amca:** Öyle mi? Başka emrin var mı, evlat?
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

**Gün 8 ve sonrası:**
- > (nazik) Öğretmen tek motorun açmadığını söyledi. Ama hepimiz çektikçe sıra birinin tarlasına geliyor.
  - **Rıza Amca:** *(çukura doğru bakar)* Öğretmen söylemişti, değil mi? Ben dinlemedim.
- > (yanlış yaklaşım) Görüyorsunuz işte. En doğrusu artık motoru kapatmanız.
  - **Rıza Amca:** Kırk yılın üstüne bir de senden mi dinleyeceğim? Git.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A3 – Sarnıç ve dostluk
- > (nazik) Muhtar amca anlattı. Seksen dokuzda sarnıcın oluğunu beraber çakmışsınız.
  - **Rıza Amca:** *(sesi yumuşar)* Kırk gün taş taşıdık. Elimizde nasır kaldı. *(güler)* Muhtar mı anlattı bunu?
  - **Rıza Amca:** O sarnıç yıkıldı. Biz de... neyse.
- > (yanlış yaklaşım) Muhtar amca sizi hâlâ düşünüyor. Gidip barışsanız herkes için iyi olur.
  - **Rıza Amca:** Benimle muhtarın arasına girme. Sen bilmezsin ne olduğunu.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### Gün 8: kabalığı geri alma
- **Mehmet (iç ses):** Bugün olmaz. Onca şeyden sonra bugün olmaz.
- > Dur, öyle demek istemedim. Özür dilerim, Rıza Amca.
- > (Sus.)
- **Geri alırsa – Rıza Amca:** *(derin nefes alır)* Bugün kimseyle kavga edecek hâlim yok. Söyle.

### Bir argüman iletilince (henüz ikna değil)
- **Rıza Amca:** Laf çok, evlat. Bir laf ne değiştirir? Yeter bu kadar.
- **Ekran:** Defter: Komşuyu ikna et 1/2

### İkna (iki argüman iletilince)
- **Rıza Amca:** *(uzun süre susar)* Muhtar mı gönderdi seni, doğru söyle.
- **Mehmet:** Muhtar amca dinletebilirsen dinlet dedi. Ama gelmek benim fikrimdi.
- *(gün 7)* **Rıza Amca:** Toplantı ne zaman? **Mehmet:** Cuma akşamı, muhtarlıkta.
- *(gün 8)* **Rıza Amca:** Toplantı ne zaman? **Mehmet:** Yarın akşam, muhtarlıkta.
- *(gün 9)* **Rıza Amca:** Toplantı bu akşam mı? **Mehmet:** Bu akşam, muhtarlıkta.
- **Rıza Amca:** Bakarız. *(arkasını döner, sonra durur)* Bakarız dedim, git şimdi.
- **Ekran:** Defter: Komşuyu ikna et ✓

### Zaten ikna olduysa
- **Normal:** **Rıza Amca:** Bakarız dedim ya, evlat. Git şimdi.
- **Gün 8, obrukta:** **Rıza Amca:** *(başını kaldırmadan)* Bakarız demiştim. Bakacak tarla da kalmadı. Git evlat.

---

## Akşam ziyaretleri

### Kısa sohbetler (bilgisi henüz açılmamış kişi; herkes birbirini zaten tanır)
**Yaşlı çift (gün 1):**
- **Fatma Nine:** Mehmet! Gel oğlum, annen nasıl? Bebek uyuyor mu geceleri?
- **Mehmet:** Uyuyor Nine, biraz.
- **Hasan Dede:** Sıcağa dayanamaz o yaşta. Sen de dayanma, otur bir su iç. Az iç ama.
- **Mehmet (iç ses):** Kaç yaşındalar bilmiyorum. Köyün en eskileri onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.

**Muhtar (gün 1-2):**
- **Muhtar:** Hayırdır Mehmet? Annen bir şey mi istedi?
- **Mehmet:** Yok muhtar amca, öyle uğradım.
- **Muhtar:** İyi etmişsin. Selam söyle eve.
- **Mehmet (iç ses):** Köyde bir kâğıt işi mi var, önce bu kapı çalınır. Kimseye sesini yükseltmez, kimse de ona kolay kolay hayır demez. Rıza Amca hariç.

**Öğretmen (gün 1-2):**
- **Zeynep Öğretmen:** Mehmet, tatilde okulun yolunu unutmamışsın.
- **Mehmet:** Geçiyordum öğretmenim.
- **Zeynep Öğretmen:** Geçerken bir kitap da al o zaman. Geri getirmeyi unutma.
- **Mehmet (iç ses):** Şehirden geldi, gidenler gibi gitmedi. Yazın bile okulda. Cebindeki deftere her şeyi yazıyor, kuyuyu bile.

**Rıza Amca (argüman öğrenilmeden):**
- **Rıza Amca:** Ne var evlat? Annen mi gönderdi?
- **Mehmet:** Yok Rıza Amca, geçiyordum.
- **Rıza Amca:** Geç o zaman.
- **Mehmet (iç ses):** Yalnız yaşıyor. Akşamları evinden motorun sesinden başka ses gelmez. Eskiden bize ceviz verirdi, şimdi selamı bile kısa.

### Yaşlı çift
- **A1 öğrenilmediyse:** **Fatma Nine:** Otur, sana bir şey anlatayım. Bu köyde bir dere vardı, bilir misin? **Mehmet:** Dere mi? Burada mı? *(g2_a1'e bağlanır)*
- **İklim sözü (ek ziyaret):**
  - **Hasan Dede:** Bizim zamanımızda kar yerde kırk gün kalırdı. Şimdi düştüğü gibi eriyor.
  - **Fatma Nine:** Kuyudaki su, bizim çocukluğumuzda yağan kar, yağmur. Biz çok içtik, hiç düşünmemiştik.
- *(ikinci ek ziyaret)* **Hasan Dede:** Eskiden kışın toprak doyardı. Yazın ne çekersen çek, ertesi yıl yerine gelirdi.
- *(ikinci ek ziyaret)* **Fatma Nine:** Şimdi gelmiyor. Biz gideceğiz, sizin kuyunuz kalacak. Asıl ona üzülüyorum, oğlum.
- **Yardım 1 (kiler boşsa):** **Fatma Nine:** Annen sofrayı kuramıyormuş, duydum. Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.
- **Yardım 2:** **Fatma Nine:** Bu son, oğlum. Artık bize de zor yetiyor. Bir daha getiremeyiz, gücenme.

### Muhtar
- **A3 öğrenilmediyse (gün 3'ten):** **Muhtar:** Otur Mehmet. Babandan haber var mı? **Mehmet:** *(gün 5'ten önce)* Yok. Muhtar amca, siz Rıza Amca'yla neden konuşmuyorsunuz? *(gün 5'ten sonra)* Aradı. "O adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca'yla neden konuşmuyorsunuz? *(g6_a3'e bağlanır)*
- **Genel:** **Muhtar:** Baban aradı dün, seni sordu. "Sözünü dinliyor mu?" dedi. Köyü dinliyor, dedim. **Muhtar:** Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev. Kuyu giderse köy de gider.

### Öğretmen
- **A2 öğrenilmediyse:** **Zeynep Öğretmen:** Ölçümü düşünüyordum da. Asıl korktuğum kuyunun kuruması değil. *(g3_a2'ye bağlanır)*
- **İklim sözü (ek ziyaret):**
  - **Zeynep Öğretmen:** Bu kuraklık yalnız bizim köyde değil. Dünyanın her yerinde aynı dert konuşuluyor.
  - **Zeynep Öğretmen:** Bunu büyük toplantılarda da konuşuyorlar. Ama kuyudan kaç kova çekeceğimiz bizim elimizde.
  - *(ikinci ek ziyaret)* **Zeynep Öğretmen:** Ölçmek kolay, Mehmet. Zor olan, ölçtüğünü insanlara kırmadan söylemek.

### Aile vakti
Her durumda üç sürüm, gün sırasıyla döner.
- **Ev düşükken – Anne:**
  1. Otur yanıma. Bir şey yapmasak da olur. *(bebeği kucağına verir)*
  2. Yoruldum, oğlum. Sana söylemiyorum, kendime söylüyorum. Otur biraz.
  3. Baban olsa "bu da geçer" derdi. Ben demeyeyim, sen otur yeter.
- **Ev ortadayken – Anne:**
  1. Kardeşin bugün sana baktı baktı güldü, biliyor musun?
  2. Baban küçükken bu avluda uyurmuş, yazın. Gel, biz de çıkalım.
  3. Baban gitmeden kapıyı onaracaktı. Döner dönmez sana da tutturacak, görürsün.
- **Ev yüksekken – Anne:**
  1. Baban gelince bu evi görsün. Zor günde dağılmadık.
  2. Bugün sana hiç "hadi" demedim, fark ettin mi? Her işe kendin yetiştin.
  3. Babana anlatacağım, bu yaz kimin sayesinde ayakta kaldık.

### Akşam bitişi (ziyaretten sonra, eve dönüş)
- **Mehmet (iç ses):** Hava karardı. Eve dönmeliyim.

### Gece satırı (akşamın sonunda, yeni günün kartından önce; ilk tutan çıkar)
0. *(bu gece kiler boştu; üç sürüm, gün sırasıyla)* **Mehmet (iç ses):** Akşam sofrada yalnız ekmek vardı. Gece annem bidonla kuyuya indi. Görmedim sandı. / Annem kendi payını önüme itti. Sonra bidonu alıp karanlıkta kuyuya yürüdü. / Kiler boş. Annem yine gece kuyuya indi. Kimseye söylemiyor, ben de söylemiyorum.
1. *(bugün fazladan çekildiyse; üç sürüm, gün sırasıyla)* **Mehmet (iç ses):** Bugün kuyudan fazla çektik. Kimse bir şey demedi. Ben yine de kuyuya bakamadım. / Bir kez daha fazla çektik. Alışıyorum, en kötüsü de bu. / Kuyunun önünden geçerken başımı çevirdim. Bir bidon daha, diye diye.
2. *(son sepet bu akşam bittiyse)* **Mehmet (iç ses):** Son sepet de bitti. Annem "tokum" dedi. Tok değildi.
3. *(komşuya bugün su götürüldüyse)* **Mehmet (iç ses):** İki bidon eksildi. Annem sordu, "Rıza Amca'ya" dedim. Bir şey demedi, başını salladı.
4. *(keçi çok düşükse)* **Mehmet (iç ses):** Gece ağıla baktım. {keci} başını kaldırmadı.
5. *(gün sırasına göre)*
   - **Gün 1:** İlk günü atlattık. Yarın pay yine aynı, ihtiyaç yine fazla.
   - **Gün 2:** Tohumları cebimde buldum. Yarın sabah erken ekerim.
   - **Gün 3:** Bir buçuk metre. Yatağıma uzandım, kuyunun dibini düşündüm.
   - **Gün 4:** Sardunya hâlâ orada. Annem suyunu sormadı, ben de söylemedim.
   - **Gün 5:** "O adamı bir tek muhtar..." Bir tek muhtar ne?
   - **Gün 6:** Muhtar bana "dinletebilirsen dinlet" dedi. Bir çocuk Rıza Amca'ya ne dinletir?
   - **Gün 7:** Boş bidonla dönüşü gözümün önünden gitmiyor.
   - **Gün 8:** Yarın toplantı. Herkes evine erken çekildi. Köy ilk kez bu kadar sessiz.

---

## Öğle eylemleri
Tek cümleli olanlar tekrar edince tuhaf kalıyordu, her birine birkaç sürüm eklendi; gün sırasına göre döner.

- **Komşuya su götür:** Yukarıda "Su götürünce".
- **Bahçede ek iş:**
  1. **Mehmet (iç ses):** Toprağın üstünü kuru otla örttüm. Fatma Nine öyle derdi, su buharlaşmasın diye.
  2. **Mehmet (iç ses):** Otları ayıkladım, kuruyanları kopardım. Çapa elimi soydu.
  3. **Mehmet (iç ses):** Fatma Nine'nin tohumları çıkmış. Küçücük, ama yeşil.
- **Evde yardım:**
  1. **Mehmet (iç ses):** Bebeği salladım, annem biraz uyudu.
  2. **Mehmet (iç ses):** Bulaşığı yıkadım, suyunu leğende biriktirdim.
  3. **Anne:** Ne zaman büyüdün sen? **Mehmet:** *(cevap vermez, çamaşırı asmaya devam eder)*
- **Babayı ara (tepe):**
  - *(gün 5'ten önce)* **Baba:** Mehmet! Ben iyiyim, iş arıyorum. Annene söyle, bu hafta biraz para yollamaya çalışacağım. **Mehmet:** Tamam baba. **Mehmet (iç ses):** Sesi yorgun. "Çalışacağım" dedi, "yollayacağım" demedi.
  - *(gün 5'ten sonra)* **Baba:** Hat kesilmişti. Rıza'yı bir tek muhtar yumuşatır diyecektim. Kardeş gibiydiler. **Mehmet:** Ne oldu onlara? **Baba:** O ikisinin bileceği iş. Sen anneni öp benim yerime. **Mehmet (iç ses):** Sesi yorgun. Sormadım.
- **Çamurda serinle (tek sefer):** **Mehmet (iç ses):** Leğenin dibindeki çamura ayaklarımı soktum. Kardeşim görüp kahkaha attı. Annem kızmadı.
- **Hiçbir şey yapmadan geçerse:**
  1. **Mehmet (iç ses):** Gölgede oturdum. Sıcak, kimseye bir şey yaptırmıyor.
  2. **Mehmet (iç ses):** Ağılın gölgesine oturdum. {keci} ile birbirimize baktık. O da bir şey yapmadı.
  3. **Mehmet (iç ses):** Bir süre yolu seyrettim. Geçen yok. Sıcak herkesi içeri almış.

## Haritadaki düşünceler (yapılacak bir şey olmayan yere tıklanınca; zaman geçmez, ilk tutan görünür)
| Yer | Durum | Mehmet (iç ses) |
|---|---|---|
| Yaşlı çift | Öğle | Öğlen sıcağında Hasan Dede uyur. Rahatsız etmeyeyim. |
| Yaşlı çift | Akşam | Işıkları sönmüş, uyumuşlar sanırım. Rahatsız etmeyeyim. |
| Muhtarlık | Öğle | Muhtarlığın kapısı kapalı. Muhtar akşamları burada olur. |
| Muhtarlık | Akşam | Muhtar içeride, başı kâğıtlarda. Şimdilik söyleyecek bir şeyim yok. |
| Okul | Öğle | Okul kilitli. Öğretmen sabahları kuyuda, akşamları burada olur. |
| Okul | Akşam | Okulun ışığı yanıyor ama defterlerine gömülmüştür. Şimdi bölmeyeyim. |
| Komşunun evi | İkna olduysa | Rıza Amca "bakarız" dedi. Şimdi üstüne gitmeyeyim. |
| Komşunun evi | Öğle, gün 7'den önce | Kapısını çalmak için bir bahanem yok. |
| Komşunun evi | Öğle | Rıza Amca'nın kapısı kapalı. Bugün yeniden gitmenin anlamı yok. |
| Komşunun evi | Akşam | Motorun sesinden başka ses yok. Kapısını çalacak bir sözüm yok şimdi. |
| Komşunun tarlası | Gün 8'den | Çukurun çevresine ip çekmişler. Yaklaşmayayım. |
| Komşunun tarlası | Diğer | Motor gürül gürül çalışıyor. Başkasının tarlasında işim yok. |
| Köy kuyusu | Öğle | Bugünkü payımızı aldık. Sırayı boşuna uzatmayayım. |
| Köy kuyusu | Akşam | Kuyu başı boşaldı. Bu saatte su çekene iyi gözle bakmazlar. |
| Sarnıç | Plan kurulduysa | Sarnıcın önüne taş yığmışlar. Büyükler çalışıyor, ayak altında dolaşmayayım. |
| Sarnıç | Akşam | Karanlıkta oraya çıkılmaz. |
| Sarnıç | Öğle | Yukarıdaki eski sarnıç. Bu sıcakta oraya kadar çıkmaya değmez. |
| Tepe | Akşam | Hava kararırken tepeye çıkılmaz. |
| Tepe | Baba arandıysa | Babamla konuştum. Bir daha aramaya kontör de yok. |
| Tepe | Öğle | Telefon burada çeker ama babam bu saatte iş peşindedir. Sonra denerim. |

## Zorunlu ev işi (ev 3'ün altına düşerse ertesi sabah)
- **Anne (üç sürüm, gün sırasıyla):** Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum. / Bu sabah da sana kaldı, oğlum. Elim ayağım tutmuyor. / Önce eve bak bugün, Mehmet. Gerisi bekler.
- *(tek gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, bebeğin bezi. {keci} bugün bakımsız kaldı.
- *(çift gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, bebeğin bezi. Bahçeye bugün bakamadım.

## Sabah iç sesi (gün 1 hariç, her sabah; ev göstergesine göre)
- **Ev düşük:**
  - *(bebek ağlıyorsa)* Kardeşim ağlıyor, annemin sesi kısık.
  - Annem gece yine uyumadı, sesinden anlıyorum.
- **Ev orta:**
  - Güneş daha doğmadan sıcak. Bugün de uzun bir gün.
  - Kuyu başındaki sıraya erken gitmeliyim.
  - Horozlar bile geç öttü. Sıcak herkesi susturuyor.
- **Ev yüksek:**
  - Annem mutfakta türkü mırıldanıyor. Ne zamandır duymamıştım.
  - Kardeşim annemin kucağında uyuyor. Ev bu sabah sessiz, iyi sessiz.
  - Annem babamın gömleğini yamıyor. "Gelince giyer" diyor.

## Anne ipuçları (ev yüksekse, akşam; o an işe yarayan ve daha önce söylenmemiş olan; hepsi söylendiyse susar)
1. *(ölçüm elde, teslim edilmemiş)* Öğretmen hanım akıllı kadın. Ama muhtar laftan çok kâğıda inanır.
2. *(A1 bilinmiyor)* Fatma Nine'ye bir akşam uğra. Yaşlılar konuşacak birini arıyor.
3. *(ölçüm elde, A2 bilinmiyor)* Öğretmen hanım ölçümden beri bir şeye takılmış, yüzünden belli. Bir akşam sor bakalım.
4. *(A3 bilinmiyor)* Rıza Amca'yla muhtar eskiden can ciğerdi. Aralarına ne girdi, kimse açıp sormuyor.
5. *(gün 7'den, komşu ikna değil)* Rıza'nın kapısı eli boş çalınmaz, oğlum. Bu sıcakta bir bidon su, bin selamdan iyidir.
6. *(diğer)* Kuyudan fazla çekmek kolay. Yarın yine çekersin, öbür gün yine. Sonra?

## Kuyu uyarısı (seviye ilk kez 50'nin altına inince; sabah, kuyu başında)
- **Zeynep Öğretmen:** Bu sabah ip yine uzadı. Böyle giderse eylüle kuyu dibi görünür. *(gün 9'da: Bu sabah ip yine uzadı. Akşamki toplantı boşa gitmesin.)*

## Keçi durum satırları (sabah)
- **Süt vermeye başlayınca (ilk kez ≥5):** **Anne:** {keci} bu sabah süt verdi! Az ama verdi.
- **Çok düşükse:** **Mehmet (iç ses):** {keci} bugün de yemine bakmadı bile.
- **Çok iyiyse (≥8, bir kez):** **Mehmet (iç ses):** {keci} sabah beni görünce ayağa kalktı. Sırtını sürttü.

---

## g9_toplanti – Gün 9 akşam [sahne: muhtarlik, toplanti]
- **Kart:** Bütün köy muhtarlığın önünde toplandı. Bugün oylama var.
- **Muhtar:** Hepiniz biliyorsunuz neden toplandığımızı. Kuyu iniyor. Öğretmen hanım ölçtü, ben de gördüm.
- **Zeynep Öğretmen:** Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve akşam serinde yapılacak.
- **Köylü:** Sayaç masrafını kim ödeyecek?
- **Başka bir köylü:** Benim tarlam kurursa çocuklarıma ne yediririm?
- **Muhtar:** Oylayalım. Kabul edenler...
- **Ekran:** Eller kalkıyor. Yarısı evet, yarısı hayır.
- **Mehmet (iç ses):** Herkes dönüp Rıza Amca'ya bakıyor.

**Komşu evet derse:**
- **Rıza Amca:** *(bir an Mehmet'e bakar, ağır ağır ayağa kalkar)* Benim tarlam çöktü. Bir sonraki kimin tarlası? *(elini kaldırır)* Ben de varım. Motorum da sayaç taksın.
- **Köylü:** Daha iki gün önce sırayı kapattık ona. Ayıp ettik.
- **Muhtar:** *(bir an Rıza'ya bakar, başını sallar)* Kabul edilmiştir.

**Komşu hayır derse:**
- **Rıza Amca:** Benim belgem var. Tarlam gitti, elimde bir motor kaldı. Sayaç takarsanız ona ne kalacak? *(çıkıp gider)*
- **Muhtar:** Oylar eşit. Bu hâliyle plan geçmez.

---

## İyi son
- [sahne: sarnic_onarildi]
- **Ekran:** Ekim. İlk yağmur.
- [ses: yağmur]
- **Mehmet (iç ses):** Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor, ikisi de ıslak, ikisi de susuyor.
- **Muhtar:** Seksen dokuzda da böyle durmuştuk, hatırlıyor musun?
- **Rıza Amca:** Hatırlıyorum. Sonra motoru aldım, sen de peşime düştün.
- **Muhtar:** Kaç kere geldim kapına. "Rıza, saati kıs." "Rıza, gece çalıştırma, kuyu iniyor."
- **Rıza Amca:** Ben de her seferinde "belgem var" dedim. Kapıyı yüzüne kapattım.
- **Muhtar:** Bir yıl böyle gitti. Sonunda dayanamadım, şikâyet yazdım.
- **Rıza Amca:** Bütün köy duydu. Ona içerledim.
- **Muhtar:** Haklıydım belki. Ama seni kaybetmeye değmezdi.
- **Rıza Amca:** *(güler)* Benim inadım da değmezdi.
- *(su götürüldüyse)* **Rıza Amca:** *(Mehmet'i gösterir)* Sırayı önümde kapattılar, bana bidon getiren bu çocuk oldu. Babası da böyle taşırdı.
- **Zeynep Öğretmen:** Bir yağmurla dolmaz. Yıllarca çektik, yıllarca bekleyeceğiz.
- [sahne: avlu]
- **Ekran:** Köy çeşmesinden ilk damla.
- **Mehmet (iç ses):** Az. Ama akıyor.
- *(A1 iletildiyse)* **Mehmet (iç ses):** Rıza Amca sarnıcın yanına bir söğüt dalı dikmiş.
- *(keçi ≥5)* **Mehmet (iç ses):** {keci} sabah sağıldı. Annem peynir mayalıyor.
- *(keçi <5)* **Mehmet (iç ses):** {keci} ayağa kalktı. Yavaş yavaş toparlanıyor.
- *(ev düşükse)* **Mehmet (iç ses):** Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.
- *(kiler boşsa)* **Mehmet (iç ses):** Sofra hâlâ yoksul. Ama artık köyce paylaşıyoruz.
- [ses: kapı]
- **Baba:** Ben geldim.
- **Mehmet (iç ses):** Koştum. Bir şey diyemedim. Annem kardeşimi ona uzattı.
- **Baba:** Muhtar anlattı. Rıza'nın kapısına gitmişsin.
- **Mehmet:** Biri gitmeliydi.
- **Baba:** Ben gidemedim. Yıllarca duvar duvara oturduk, gidemedim.
- **Mehmet (iç ses):** Şehirde iş bulamamış. Ama köyde iş var artık: borular, sayaçlar.
- [ses: bebeğin gülmesi]
- **Ekran:** Zor ama birlikte kaldık.

## Kötü son
- [sahne: avlu]
- *(komşu ikna edildiyse)* **Ekran:** Plan kabul edildi. Ama kuyu çok inmişti.
- **Ekran:** Eylülde köy kuyusu dibini gösterdi. Ekim.
- **Anne:** Kamyon gelmiş. Eşyalar hazır mı?
- **Mehmet (iç ses):** Babam şehirde bir oda bulmuş. Hepimiz oraya.
- **Mehmet (iç ses):** Yol parası lazımdı. İpi pazarcıya kendim uzattım. {keci} dönüp baktı. Ben bakamadım.
- *(ev düşükse)* **Mehmet (iç ses):** Annem günlerdir konuşmuyor.
- *(kiler boşsa)* **Mehmet (iç ses):** Son günlerde sofrada ekmekten başka bir şey yoktu.
- [sahne: koy_cikisi]
- [ses: kamyon motoru; bebeğin ağlaması kamyonla birlikte uzaklaşarak söner]
- **Mehmet (iç ses):** Fatma Nine'yle Hasan Dede kapının önündeydi. El salladılar. Onlar gitmiyor. Nereye gitsinler?
- **Mehmet (iç ses):** Kardeşim ağlamaktan yoruldu; kamyon sallandıkça annemin kucağında uyudu.
- **Mehmet (iç ses):** Uzakta şehir. Dumanın altında.
- **Mehmet (iç ses):** Babam otogarda bekleyecekmiş. "Her şey yoluna girecek" dedi telefonda. Sesi yine yorgundu.
- [sahne: sarnic]
- **Ekran:** İlk yağmur.
- **Ekran:** Kırık sarnıca ve boş avluya yağmur yağdı.
- **Ekran:** Tutacak sarnıç kalmamıştı.

### Neler eksik kaldı (mantığın ürettiği maddeler)
- **Komşu:** Plan oylamada eşit kaldı; Rıza Amca'yla köprü kurulamadı.
- **Kuyu:** Kuyudan çekilen su, yerine gelenden çoktu. Kuyu toparlanamayacak kadar düştü.
- **Geç ölçüm:** Öğretmenin ölçümü muhtara geç ulaştı; plan geç ve zayıf kuruldu.

## Final metni (geçici)
- **Ekran:** [Final metni buraya gelecek. Adaylar: (1) Kuyunun suyu kimsenin değil, hepimizin. Onu tek bir yağmur değil, ortak kararlar korur. (2) 2026'da yağış ortalamanın yaklaşık yüzde elli üstünde düştü, Konya'da yeraltı suyu yine de düşmeye devam etti. Kuraklıkta suçlu aramak değil, birbirini dinlemek köyü ayakta tutar. Diğerleri: referans/VERILER.md]
- **Düğme:** Tekrar oyna
