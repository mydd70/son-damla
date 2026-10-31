# Köyümün Suyu – Diyalog taslağı (v2, oynanışa göre baştan yazıldı)

Bu dosyayı sen düzenleyeceksin; oyuna ancak sen bitirince aktarılacak. Şu an oyunda hâlâ v1 var.

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
| Gün | Kart | O günün planı (karta eklenecek) |
|---|---|---|
| 1 | Ağustos 2025. Konya Ovası. | Sabah: ev · Öğle: kuyu başı · Akşam: serbest |
| 2 | Gün 2 – Sıcak, rüzgârsız. | Sabah: ev · Öğle: yaşlı çift · Akşam: serbest |
| 3 | Gün 3 – Kuyu başında erken bir sıra. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 4 | Gün 4 – Domatesler boynunu büktü. | Sabah: ev · Öğle: serbest · Akşam: serbest |
| 5 | Gün 5 – Tepeye çıkan yol tozlu. | Sabah: tepe · Öğle: serbest · Akşam: serbest |
| 6 | Gün 6 – Muhtarlıkta toplantı var. | Sabah: ev · Öğle: muhtarlık · Akşam: serbest |
| 7 | Gün 7 – Köy sessiz. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 8 | Gün 8 – Sıcak dalgası. | Sabah: ev · Öğle: serbest değil · Akşam: serbest |
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
- **[ipucu]** Kime ne kadar vereceğine sen karar ver. Yetmeyen göstergenin çubuğu düşer.
- **[ipucu]** "Kuyudan fazladan çek" 4 damla daha verir. Bunu kimse görmez, ama köyün kuyusu düşer.

### Öğretici: keçi bakımı
- **[ipucu]** {keci} seni bekliyor. Sırtını tara, su kabını göster, yemini ver. Bakım gördükçe toparlanır.

### g1_tanima – Gün 1 öğle [sahne: kuyu_basi]
- **Kart:** Annen seni bidonlarla kuyu başına yolladı.
- **Mehmet (iç ses):** Kuyu başı yine kalabalık. Bidonlar sıra sıra.
- **Köylü:** Eskiden bir kova yeterdi. Şimdi ip uzadıkça uzuyor.
- **Başka bir köylü:** Biz burada bidon sayıyoruz, Rıza'nın motoru bütün gece çalıştı.
- **Köylü:** Sus. Duyar.
- **Mehmet (iç ses):** Rıza Amca bizim komşu. Motorunun sesi evimize kadar gelir. Kimse yüzüne bir şey demez, arkasından çok konuşur.
- **Mehmet (iç ses):** Kuyuda ne kadar su kaldığını kimse bilmiyor. Bilen varsa da söylemiyor.
- **[ipucu]** Ekranın kenarındaki gösterge köy kuyusunun seviyesi. Her gün biraz iner. Oyunun sonunda her şey ona bağlı olacak.

### Öğretici: harita (gün 1 akşam, ilk harita)
- **[ipucu]** Akşamları birine uğrayabilir ya da ailenle vakit geçirebilirsin. Ama yalnızca birini: akşam uzun değil.
- **[ipucu]** Haritada gitmek istediğin yere dokun. Soluk yerlere şimdilik gidilmez.

### Öğretici: kiler (gün 1 gece, ilk kiler değişiminde)
- **[ipucu]** Sepetler evin yiyeceği. Her akşam biri eksilir. Keçi süt verir, bahçe sebze verirse yenisi gelir. Kiler boşalırsa ev zorlanır.

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
- **Zeynep Öğretmen:** Mehmet, iyi geldin. Tut şu ipin ucunu. Bırakma ama.
- **Mehmet:** Ne yapıyorsunuz?
- **Zeynep Öğretmen:** Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.
- **Zeynep Öğretmen:** *(ipi işaretler)* Bir ayda neredeyse bir buçuk metre inmiş.
- **Mehmet:** Bu çok mu?
- **Zeynep Öğretmen:** Bu hızla giderse kış gelmeden kuyu boşa döner.
- **Zeynep Öğretmen:** Bunu muhtar görmeli. Ben anlatınca "öğretmen hanım yine hesap yapmış" diyor. Kâğıt senin elinden gitsin, köyün çocuğu getirdi desin.
- **Zeynep Öğretmen:** *(kâğıdı katlayıp uzatır)* Al. Cebinden düşürme. Muhtar akşamları muhtarlıkta olur.
- **[ipucu] Defter:** Görevlerin üstteki Defter'de yazar. Ölçümü gün 5 akşamına kadar muhtara götür. Geç kalırsan plan zayıf kalır.
- > Kuyu tamamen kurursa ne olur? {A2}
- > Tamam, götürürüm.

**{A2} seçilirse (g3_a2):**
- **Zeynep Öğretmen:** Yeraltı suyu çekildikçe toprağın altında boşluklar kalıyor. Bir gün tavan çöküyor.
- **Zeynep Öğretmen:** Ovada yüzlerce obruk var artık. Motorların en çok çalıştığı tarlalarda da...
- **Mehmet:** Rıza Amca'nın tarlası gibi mi?
- **Zeynep Öğretmen:** *(cevap vermez, ipi sarar)*
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
- **Mehmet:** *(bardağın dibindeki suyu döker)*
- **Anne:** *(gülümser, bir şey demez)*

### g5_baba – Gün 5 sabah [sahne: tepe]
- **Kart:** Babanın araması için tepeye çıktın.
- **Mehmet (iç ses):** Annemin telefonu yalnızca tepede çekiyor. Babam bugün arayacağım demişti.
- [ses: telefon]
- **Baba:** Mehmet? Sesim geliyor mu?
- **Mehmet:** Geliyor baba! Ne zaman geleceksin?
- **Baba:** İnşaatta bir iş var, belki... Annen nasıl? {keci} nasıl?
- *(keçi <5)* **Mehmet:** {keci} hâlâ iyi değil. Kuyu da iniyor, öğretmen ölçtü.
- *(keçi ≥5)* **Mehmet:** {keci} toparlanıyor. Ama kuyu iniyor, öğretmen ölçtü.
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
- **Muhtar:** Kuyulara sayaç, motorlara saat. Herkes ne çektiğini bilecek.
- **Zeynep Öğretmen:** Sulama sabah erken ya da gece. Toprağın üstü saman ya da otla örtülecek, buharlaşmasın.
- **Muhtar:** Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.
- **Muhtar:** Hepsini cuma akşamı köy toplantısında oylayacağız.

**Gecikmeli plan (ölçüm ulaşmadıysa):**
- **Muhtar:** Öğretmen hanım ölçümün bir örneğini getirdi sonunda. Kâğıt sende kalmış, Mehmet.
- **Mehmet:** *(başını eğer)*
- **Muhtar:** Neyse. Keşke daha önce görseydim. Kuyu bu arada epey indi.
- **Zeynep Öğretmen:** Sarnıç, sayaç, sulama saatleri... Bu kadar kısa sürede elimizden geleni yazdık.
- **Muhtar:** Cuma akşamı köy toplantısında oylayacağız.

**Her iki durumda:**
- **Muhtar:** Rıza'nın motoru durmazsa hiçbiri yetmez. Oylar da eşit çıkar, gözler ona döner. O da kimseyi dinlemez.
- > (A3 öğrenilmediyse) Rıza Amca'yla neden konuşmuyorsunuz? {A3}
- > Ben konuşurum.

**{A3} seçilirse (g6_a3):**
- **Muhtar:** *(uzun süre susar)* Biz Rıza'yla askere beraber gittik. Döndüğümüzde o sarnıcın oluğunu beraber çaktık.
- **Muhtar:** Kuraklık yılıydı, seksen dokuz. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı, Rıza.
- **Muhtar:** Sonra motorlar geldi, laflar uzadı. Sonra... olan oldu. Neyse.
- **Ekran:** Deftere yazıldı: Muhtarla Rıza Amca'nın sarnıcı

**Sonunda (her iki seçenekte):**
- **Zeynep Öğretmen:** Bize kapısını açmaz. Sen çocuksun, sana bir şey demez belki.
- **Muhtar:** Zorla olmaz, Mehmet. Dinletebilirsen dinlet.
- **[ipucu] Komşuyu ikna et:** Rıza Amca'ya köyde öğrendiğin iki şeyi söylersen toplantıda planı destekler. Ne söyleyeceğin kadar nasıl söylediğin de önemli. Defter'de görürsün.

### g7_komsu – Gün 7 sabah [sahne: kuyu_basi]
- **Kart:** Su almaya indin. Bu sabah kuyu başında beklemediğin biri var.
- **Mehmet (iç ses):** Rıza Amca kuyu başında. Herkes onu görünce susmuş.
- **Rıza Amca:** Ne bakıyorsun? Motor arıza yaptı. Bir bidon alıp gideceğim.
- *(Karşılaşma başlar.)*

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
- *(komşu ikna edilmediyse)* **Mehmet (iç ses):** Rıza Amca'ya söyleyecek son bir şansım var. Öğlen gitmeliyim.
- *(ikna edildiyse)* **Mehmet (iç ses):** "Bakarız" dedi. Gelir mi, gelmez mi, akşam göreceğiz.

---

## Komşuyla karşılaşma

### Açılış
- **Mehmet başlar (gün 7, ilk kez):** **Mehmet:** Rıza Amca, bir şey söyleyecektim. **Rıza Amca:** Muhtar mı gönderdi seni? Söyle ona, benim işime karışmasın.
- **Gün 7, daha önce görüştüyse:** **Mehmet:** Rıza Amca, bir şey söyleyecektim. **Rıza Amca:** Yine mi sen? Söyle bakalım.
- **Akşam ziyareti:** **Rıza Amca:** Bu saatte kapı çalınmaz, evlat. Gir bakalım, madem geldin.
- **Su götürünce, ilk kez:**
  - **Mehmet:** Annem gönderdi, iki bidon su.
  - **Rıza Amca:** Benim kuyum var.
  - **Mehmet:** O kuyunun suyu tarlaya gidiyor. Acıymış, ağza konmazmış.
  - **Rıza Amca:** *(bir süre bakar, bidonları alır)* Annene teşekkür et. Otur, bir çay iç.
  - **Mehmet (iç ses):** Bir süredir köy kuyusunun sırasına da girmiyor. Demek suyu buradan buraya zor buluyor.
  - **Ekran:** Yarınki paydan 2 damla eksilecek.
- **Su götürünce, ikinci kez:**
  - **Rıza Amca:** Yine mi su? Sizin de payınız az, evlat.
  - **Mehmet:** Biliyoruz.
  - *(gün 9 değilse)* **Ekran:** Yarınki paydan 2 damla eksilecek.
- **Su götürünce, gün 9:** **Rıza Amca:** Bu köyde bana su getiren bir sen kaldın. *(bir bardak uzatır)* Otur.

### Özür (önceki karşılaşmada kaba seçim yapıldıysa)
- **Mehmet (iç ses):** Geçen sefer ağzımdan çıkanı düzeltmeliyim.
- > Geçen sefer kırıcı konuştum, kusura bakmayın.
- > (Bir şey demeyeyim.)
- **Özür dilerse – Rıza Amca:** *(homurdanır)* Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?

### Argüman sorusu
- **Mehmet (iç ses):** Ne diyeyim?
- Her argümanda ek seçenek: > (Bunu açmayayım.)

### Söyleyecek bir şey yoksa
- **Normal:** **Mehmet (iç ses):** Ne desem bilemedim. Önce köydekilerle konuşmalıyım. **Rıza Amca:** Söyleyecek bir şeyin yoksa git işine.
- **Gün 8, obrukta:** **Mehmet (iç ses):** Şimdi ne desem boş. **Rıza Amca:** Git evlat. Burası tehlikeli.

### A1 – Söğüt
- > (nazik) Hasan Dede anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.
  - **Rıza Amca:** *(bir an durur)* Söğüt... Herkes "Rıza'nın söğüdü" derdi. *(yüzünü çevirir)* O dere çoktan gitti.
  - **Rıza Amca:** Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde?
- > (kaba) Dereyi de sizin motorlar kuruttu zaten.
  - **Rıza Amca:** Bana bak! Benim belgem var, devletten aldım! Sen kimsin de bana hesap soruyorsun?
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A2 – Obruk uyarısı
**Gün 8'den önce:**
- > (nazik) Öğretmen ölçtü, kuyu bir ayda bir buçuk metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.
  - **Rıza Amca:** Obruk ovanın öbür ucunda olur. Bizim burada olmaz. *(ama gözünü tarlasından ayırmaz)*
- > (kaba) Böyle çekmeye devam ederseniz tarlanız çökecek, benden söylemesi.
  - **Rıza Amca:** Beni korkutacak senin gibi velet mi kaldı? Defol!
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

**Gün 8 ve sonrası:**
- > (nazik) Öğretmen söylemişti. Toprağın altı boşalıyormuş. Motor durmazsa bir sonraki çukur başkasının evinin altında açılabilir.
  - **Rıza Amca:** *(çukura doğru bakar)* Söylemişti, değil mi? Ben dinlemedim.
- > (kaba) Gördünüz işte. Söylenmişti size, hak ettiniz.
  - **Rıza Amca:** Kırk yılın üstüne bir de senden mi dinleyeceğim? Çek git!
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A3 – Sarnıç ve dostluk
- > (nazik) Muhtar amca anlattı. Seksen dokuzda sarnıcın oluğunu beraber çakmışsınız.
  - **Rıza Amca:** *(sesi yumuşar)* Kırk gün taş taşıdık. Elimizde nasır kaldı. *(güler)* Muhtar mı anlattı bunu?
  - **Rıza Amca:** O sarnıç yıkıldı. Biz de... neyse.
- > (kaba) Muhtarla küsmüşsünüz, köy sizin yüzünüzden bir araya gelemiyor.
  - **Rıza Amca:** Benimle muhtarın arasına girme! Kimse bilmiyor ne olduğunu!
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### Gün 8: kabalığı geri alma
- **Mehmet (iç ses):** Bugün olmaz. Onca şeyden sonra bugün olmaz.
- > Dur, öyle demek istemedim. Özür dilerim, Rıza Amca.
- > (Sus.)
- **Geri alırsa – Rıza Amca:** *(derin nefes alır)* Bugün kimseyle kavga edecek hâlim yok. Söyle.

### Bir argüman iletilince (henüz ikna değil)
- **Rıza Amca:** Laf çok, evlat. Bir laf ne değiştirir?
- **Ekran:** Defter: Komşuyu ikna et 1/2

### İkna (iki argüman iletilince)
- **Rıza Amca:** *(uzun süre susar)* Muhtar mı gönderdi seni, doğru söyle.
- **Mehmet:** Kendim geldim.
- *(gün 9 değilse)* **Rıza Amca:** Toplantı cuma mı? **Mehmet:** Cuma akşamı, muhtarlıkta.
- *(gün 9)* **Rıza Amca:** Toplantı bu akşam mı? **Mehmet:** Bu akşam, muhtarlıkta.
- **Rıza Amca:** Bakarız. *(arkasını döner, sonra durur)* Bakarız dedim, git şimdi.
- **Ekran:** Defter: Komşuyu ikna et ✓

### Zaten ikna olduysa
- **Normal:** **Rıza Amca:** Bakarız dedim ya, evlat. Git şimdi.
- **Gün 8, obrukta:** **Rıza Amca:** *(başını kaldırmadan)* Bakarız demiştim. Bakacak bir şey kalmadı. Cuma geliyorum.

---

## Akşam ziyaretleri

### Kısa sohbetler (bilgisi henüz açılmamış kişi; herkes birbirini zaten tanır)
**Yaşlı çift (gün 1):**
- **Fatma Nine:** Mehmet! Gel oğlum, annen nasıl? Bebek uyuyor mu geceleri?
- **Mehmet:** Uyuyor Nine, biraz.
- **Hasan Dede:** Sıcağa dayanamaz o yaşta. Sen de dayanma, otur bir su iç. Az iç ama.
- **Mehmet (iç ses):** Kaç yaşındalar bilmiyorum. Bu köyde en çok zaman geçiren onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.

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
- **A1 öğrenilmediyse:** **Fatma Nine:** Otur, sana bir şey anlatayım. Bu köyde bir dere vardı, bilir misin? *(g2_a1'e bağlanır)*
- **İklim sözü (ek ziyaret):**
  - **Hasan Dede:** Bizim zamanımızda kar yerde kırk gün kalırdı. Şimdi düştüğü gibi eriyor.
  - **Fatma Nine:** Yerin altındaki su, yağmurun ve karın birikimi. Bizim çocukluğumuzdan kalma su bu. Siz ne bırakacaksınız, ona bakın.
- **Yardım 1 (kiler boşsa):** **Fatma Nine:** Annen sofrayı kuramıyormuş, duydum. Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.
- **Yardım 2:** **Fatma Nine:** Bu son, oğlum. Artık bize de zor yetiyor. Bir daha getiremeyiz, gücenme.

### Muhtar
- **A3 öğrenilmediyse (gün 3'ten):** **Muhtar:** Otur Mehmet. Babandan haber var mı? **Mehmet:** Yok. Muhtar amca, siz Rıza Amca'yla neden konuşmuyorsunuz? *(g6_a3'e bağlanır)*
- **Genel:** **Muhtar:** Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev. Kuyu giderse köy de gider.

### Öğretmen
- **A2 öğrenilmediyse:** **Zeynep Öğretmen:** Ölçümü düşünüyordum da. Asıl korktuğum kuyunun kuruması değil. *(g3_a2'ye bağlanır)*
- **İklim sözü (ek ziyaret):**
  - **Zeynep Öğretmen:** Bu kuraklık yalnız bizim köyde değil. Dünyanın her yerinde aynı dert konuşuluyor.
  - **Zeynep Öğretmen:** Büyük kararları büyükler verecek. Ama kuyudan kaç kova çekeceğimize biz karar veriyoruz.

### Aile vakti
- **Ev düşükken:** **Anne:** Otur yanıma. Bir şey yapmasak da olur. *(bebeği kucağına verir)*
- **Ev ortadayken, tek gün:** **Anne:** Kardeşin bugün sana baktı baktı güldü, biliyor musun?
- **Ev ortadayken, çift gün:** **Anne:** Baban küçükken bu avluda uyurmuş, yazın. Gel, biz de çıkalım.
- **Ev yüksekken:** **Anne:** Baban gelince bu evi görsün. Zor günde dağılmadık.

### Akşam bitişi (ziyaretten sonra, eve dönüş)
- **Mehmet (iç ses):** Hava karardı. Eve dönmeliyim.

### Gece satırı (akşamın sonunda, yarınki pay duyurusundan önce; ilk tutan çıkar)
1. *(bugün fazladan çekildiyse)* **Mehmet (iç ses):** Bugün kuyudan fazla çektik. Kimse bir şey demedi. Ben yine de kuyuya bakamadım.
2. *(kiler boşsa)* **Mehmet (iç ses):** Akşam sofrada yalnız ekmek vardı. Annem "tokum" dedi. Tok değildi.
3. *(komşuya bugün su götürüldüyse)* **Mehmet (iç ses):** İki bidon eksildi. Annem sordu, "Rıza Amca'ya" dedim. Bir şey demedi, başını salladı.
4. *(keçi çok düşükse)* **Mehmet (iç ses):** Gece ağıla baktım. {keci} başını kaldırmadı.
5. *(gün sırasına göre)*
   - **Gün 1:** İlk günü atlattık. Yarın pay yine aynı, ihtiyaç yine fazla.
   - **Gün 2:** Tohumları cebimde buldum. Yarın sabah erken ekerim.
   - **Gün 3:** Bir buçuk metre. Yatağıma uzandım, kuyunun dibini düşündüm.
   - **Gün 4:** Sardunya hâlâ orada. Annem suyunu sormadı, ben de söylemedim.
   - **Gün 5:** "O adamı bir tek muhtar..." Bir tek muhtar ne?
   - **Gün 6:** Muhtar bana "dinletebilirsen dinlet" dedi. Bir çocuk Rıza Amca'ya ne dinletir?
   - **Gün 7:** Motor yine çalışıyor. Demek arızayı giderdi.
   - **Gün 8:** Yarın toplantı. Motorun sesi yok bu gece. Köy ilk kez bu kadar sessiz.

---

## Öğle eylemleri
Tek cümleli olanlar tekrar edince tuhaf kalıyordu, her birine birkaç sürüm eklendi; gün sırasına göre döner.

- **Komşuya su götür:** Yukarıda "Su götürünce".
- **Bahçede ek iş:**
  1. **Mehmet (iç ses):** Toprağın üstünü kuru otla örttüm. Hasan Dede öyle derdi, su buharlaşmasın diye.
  2. **Mehmet (iç ses):** Otları ayıkladım, kuruyanları kopardım. Çapa elimi soydu.
  3. **Mehmet (iç ses):** Fatma Nine'nin tohumları çıkmış. Küçücük, ama yeşil.
- **Evde yardım:**
  1. **Mehmet (iç ses):** Bebeği salladım, annem biraz uyudu.
  2. **Mehmet (iç ses):** Bulaşığı yıkadım, suyunu leğende biriktirdim.
  3. **Anne:** Ne zaman büyüdün sen? **Mehmet:** *(cevap vermez, çamaşırı asmaya devam eder)*
- **Babayı ara (tepe):** **Baba:** Mehmet! Ben iyiyim, iş arıyorum. Anneni öp benim yerime. **Mehmet (iç ses):** Sesi yorgun. Sormadım.
- **Çamurda serinle (tek sefer):** **Mehmet (iç ses):** Leğenin dibindeki çamura ayaklarımı soktum. Kardeşim görüp kahkaha attı. Annem kızmadı.
- **Hiçbir şey yapmadan geçerse (onayına bağlı):** **Mehmet (iç ses):** Gölgede oturdum. Sıcak, kimseye bir şey yaptırmıyor.

## Zorunlu ev işi (ev 3'ün altına düşerse ertesi sabah)
- **Anne:** Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum.
- *(tek gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, bebeğin bezi. {keci} bugün bakımsız kaldı.
- *(çift gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, bebeğin bezi. Bahçeye bugün bakamadım.

## Sabah iç sesi (gün 1 hariç, her sabah; ev göstergesine göre)
- **Ev düşük:**
  - *(bebek ağlıyorsa)* Kardeşim ağlıyor, annemin sesi kısık.
  - Annem gece yine uyumadı, sesinden anlıyorum.
- **Ev orta:**
  - *(tek gün)* Güneş daha doğmadan sıcak. Bugün de uzun bir gün.
  - *(çift gün)* Kuyu başındaki sıraya erken gitmeliyim.
- **Ev yüksek:**
  - *(tek gün)* Annem mutfakta türkü mırıldanıyor. Ne zamandır duymamıştım.
  - *(çift gün)* Kardeşim annemin kucağında uyuyor. Ev bu sabah sessiz, iyi sessiz.

## Anne ipuçları (ev yüksekse, akşam; o an işe yarayanı)
1. *(ölçüm elde, teslim edilmemiş)* Öğretmen hanım akıllı kadın. Ama muhtar laftan çok kâğıda inanır.
2. *(A1 bilinmiyor)* Fatma Nine'yi ziyaret et. Yaşlılar konuşacak birini arıyor.
3. *(A3 bilinmiyor)* Rıza Amca'yla muhtar eskiden can ciğerdi. Ne oldu bilmiyorum.
4. *(diğer)* Kuyudan fazla çekmek kolay. Yarın yine çekersin, öbür gün yine. Sonra?

## Kuyu uyarısı (seviye ilk kez 50'nin altına inince; sabah, kuyu başında)
- **Zeynep Öğretmen:** Bu sabah ip yine uzadı. Böyle giderse cumaya kuyu dibi görecek. *(gün 9'da: Bu sabah ip yine uzadı. Akşamki toplantı boşa gitmesin.)*

## Keçi durum satırları (sabah)
- **Süt vermeye başlayınca (ilk kez ≥5):** **Anne:** {keci} bu sabah süt verdi! Az ama verdi.
- **Çok düşükse:** **Mehmet (iç ses):** {keci} bugün de yemine bakmadı bile.
- **Çok iyiyse (≥8, bir kez):** **Mehmet (iç ses):** {keci} sabah beni görünce ayağa kalktı. Sırtını sürttü.

---

## g9_toplanti – Gün 9 akşam [sahne: muhtarlik, toplanti]
- **Kart:** Bütün köy muhtarlığın önünde toplandı. Bugün oylama var.
- **Muhtar:** Hepiniz biliyorsunuz neden toplandığımızı. Kuyu iniyor. Öğretmen hanım ölçtü, ben de gördüm.
- **Zeynep Öğretmen:** Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve gece yapılacak.
- **Köylü:** Sayaç masrafını kim ödeyecek?
- **Başka bir köylü:** Benim tarlam kurursa çocuklarıma ne yediririm?
- **Muhtar:** Oylayalım. Kabul edenler...
- **Ekran:** *(eller kalkar)* Yarısı evet. Yarısı hayır.
- **Mehmet (iç ses):** Herkes dönüp Rıza Amca'ya bakıyor.

**Komşu evet derse:**
- **Rıza Amca:** *(ağır ağır ayağa kalkar)* Benim tarlam çöktü. Bir sonraki kimin tarlası? *(elini kaldırır)* Ben de varım. Motorum da sayaç taksın.
- **Muhtar:** *(bir an Rıza'ya bakar, başını sallar)* Kabul edilmiştir.

**Komşu hayır derse:**
- **Rıza Amca:** Benim belgem var. Kimse bana ne kadar su çekeceğimi söyleyemez. *(çıkıp gider)*
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
- [sahne: avlu]
- **Ekran:** Köy çeşmesinden ilk damla.
- **Mehmet (iç ses):** Az. Ama akıyor.
- *(keçi ≥5)* **Mehmet (iç ses):** {keci} sabah sağıldı. Annem peynir mayalıyor.
- *(keçi <5)* **Mehmet (iç ses):** {keci} ayağa kalktı. Yavaş yavaş toparlanıyor.
- *(ev düşükse)* **Mehmet (iç ses):** Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.
- *(kiler boşsa)* **Mehmet (iç ses):** Sofra hâlâ yoksul. Ama artık köyce paylaşıyoruz.
- [ses: kapı]
- **Baba:** Ben geldim.
- **Mehmet (iç ses):** Babam şehirde iş bulamamış. Ama köyde iş var artık. Sarnıç, borular, sayaçlar.
- [ses: bebeğin gülmesi]
- **Ekran:** Zor ama birlikte kaldık.

## Kötü son
- [sahne: avlu]
- *(komşu ikna edildiyse)* **Ekran:** Plan kabul edildi. Ama kuyu çok inmişti.
- **Ekran:** Eylülde kuyu dibini gördü. Ekim.
- **Anne:** Kamyon gelmiş. Eşyalar hazır mı?
- **Mehmet (iç ses):** Babam şehirde bir oda bulmuş. Hepimiz oraya.
- **Mehmet (iç ses):** Keçimiz {keci} pazarda satıldı. Yol parası lazımdı.
- *(ev düşükse)* **Mehmet (iç ses):** Annem günlerdir konuşmuyor.
- *(kiler boşsa)* **Mehmet (iç ses):** Son günlerde sofrada ekmekten başka bir şey yoktu.
- [sahne: koy_cikisi]
- [ses: kamyon motoru; bebeğin ağlaması kamyonla birlikte uzaklaşarak söner]
- **Mehmet (iç ses):** Fatma Nine'yle Hasan Dede kapının önündeydi. El salladılar. Onlar gitmiyor. Nereye gitsinler?
- **Mehmet (iç ses):** Uzakta şehir. Dumanın altında.
- [sahne: sarnic]
- **Ekran:** İlk yağmur.
- **Ekran:** Kırık sarnıca ve boş avluya yağmur yağdı.
- **Ekran:** İş işten geçti.

### Neler eksik kaldı (mantığın ürettiği maddeler)
- **Komşu:** Rıza Amca planı desteklemedi; motoru çalışmaya devam etti.
- **Kuyu:** Kuyudan çekilen su, yerine gelenden çoktu. Kuyu toparlanamayacak kadar düştü.
- **Geç ölçüm:** Öğretmenin ölçümü muhtara geç ulaştı; plan geç ve zayıf kuruldu.

## Final metni (geçici)
- **Ekran:** [Final metni buraya gelecek. Aday cümleler: referans/VERILER.md]
- **Düğme:** Tekrar oyna
