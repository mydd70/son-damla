# Köyümün Suyu – Diyalog taslağı (v2, oynanışa göre baştan yazıldı)

Bu sürüm oyuna aktarıldı, oynayarak düzenleyebilirsin. Değişikliklerini buraya yaz; "metin hazır" deyince tekrar aktarılır.

**Yazım kuralları**
- `{keci}` = oyuncunun verdiği keçi adı. Ad hep yalın yazılır, ek almaz ("Benek'nin" gibi bozuk çıkar).
- `{pay}` = o günkü damla sayısı. Metindeki diğer sayılar aktarılırken config.js'e bağlanır.
- `[ses: ...]` ses, `[sahne: ...]` arka plan, `(iç ses)` Mehmet'in düşüncesi.
- `> ` oyuncu seçeneği. `{A1}` gibi etiketler argüman öğrenme anıdır.
- `[ipucu]` ampullü öğretici penceresi. `(koşul)` satırın yalnızca o durumda görüneceğini söyler.
- 1 damla = 1 bidon su. Oyuncu damla görür, karakterler bidon der.
- Geçici isimler: Hasan Amca, Fatma Teyze, Rıza Amca (komşu), Zeynep Öğretmen.

---

## Başlangıç

### Giriş metni (ilk oyunda gün kartından önce; geçici)
- İç Anadolu'da Konya Ovası'nda küçük bir köy. Son altmış beş yılın en kurak günleri.
- Sen Mehmet'sin, on iki yaşındasın. Baban köydeki kuraklık yüzünden tarla işlerini yapamıyor, şehirde iş arıyor. Evde annen, bebek kardeşin ve hasta keçiniz var.
- Önünde dokuz gün var. Her sabah evin suyunu sen bölüştüreceksin. Öğlen ve akşam ne yapacağına, kime gideceğine de sen karar vereceksin.
- Yetişkinlerin inatçılıklarını ve alışkanlıklarını değiştirmek zor ama bazen bir çocuğun umudu bize kim olduğumuzu ve neyi unuttuğumuzu hatırlatabilir.  
- Kuyu hepinizin ama zor şartlar, zor kararlar gerektiriyor. Bakalım köy ayakta kalabilecek mi?

### Keçiye isim
- **Ekran:** Keçimizin adı ne?
- *(boş bırakılırsa: Pamuk)*

### Gün kartları
Kartta planın altında bugünkü su payı yazar; komşuya su götürüldüyse kaç damlasının ona gittiği de eklenir.

| Gün | Kart | O günün planı (karta eklenecek) |
|---|---|---|
| 1 | Ağustos 2029 - Konya Ovası. | Sabah: ev · Öğle: kuyu başı · Akşam: serbest |
| 2 | Gün 2 – Sıcak, rüzgârsız. | Sabah: ev · Öğle: yaşlı çift · Akşam: serbest |
| 3 | Gün 3 – Kuyu başında erken bir sıra. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 4 | Gün 4 – Bahçe boynunu büktü. | Sabah: ev · Öğle: serbest · Akşam: serbest |
| 5 | Gün 5 – Tepeye çıkan yol tozlu. | Sabah: tepe · Öğle: serbest · Akşam: serbest |
| 6 | Gün 6 – Muhtarlıkta toplantı var. | Sabah: ev · Öğle: muhtarlık · Akşam: serbest |
| 7 | Gün 7 – Köy sessiz. | Sabah: kuyu başı · Öğle: serbest · Akşam: serbest |
| 8 | Gün 8 – Sıcak dalgası. | Sabah: ev · Öğle: ? · Akşam: serbest |
| 9 | Gün 9 – Cuma. Köy toplantısı. | Sabah: ev · Öğle: son fırsat · Akşam: toplantı |

### g1_acilis – Gün 1 sabah [sahne: avlu]
- [ses: bebek ağlaması, kısa]
- **Mehmet (iç ses):** Kardeşim yine erkenden uyandı. Yani herkes uyandı.
- **Mehmet (iç ses):** {keci} ağılda yatıyor. Bu günlerde iyice zayıfladı. Umarım yakında bir çözüm bulabiliriz.
- **Mehmet:** Günaydın, anne. Ağıla baktın mı? 
- **Anne:** Baktım, çöküp kalmış hayvancağız. Dün geceden beri böyle. Susuzluktan halsiz.
- **Mehmet:** Veteriner çağıralım, anne, böyle giderse {keci} dayanamayacak. 
- **Anne:** Veterinere verecek kadar paramız yok, oğlum. Babanın gönderdiği son parayı da erzağa verdik. {keci} için su lazım, biraz da ilgi. Gerçi herkese su lazım...
- **Mehmet:** Babam aradı mı?
- **Anne:** Aramadı. Birkaç güne araması lazım. Bu kadar uzun habersiz kalmazdık. Faturaya para yetişmedi belki de. Neyse.
- **Anne:** Muhtar kendince her eve günlük pay yazdı. Bugün on bir bidon. Günden güne azalacakmış. Sanki öncesinde çok vardı da!
- **Mehmet:** On bir bidon yeter mi?
- **Anne:** *(bir süre susar)* Yetmez. Yine de bölüştüreceğiz, oğlum, olduğu kadar.
- > Keçiye ben bakarım, anne. → **Anne:** Bak bakalım. Sen olmasan ne yapardım?
- > Yetmezse ne yapacağız? → **Anne:** Yettireceğiz, oğlum. Başka çaremiz yok.

### Öğretici: dağıtım
- **[ipucu]** Bugünkü payın {pay} damla. Her damla bir bidon su. Evin, keçinin ve bahçenin ihtiyacı payından daha fazla.
- **[ipucu]** Kime ne kadar vereceğine sen karar vermelisin. Tam su alan toparlanır, eksik kalan her damla çubuğu biraz daha düşürür.
- **[ipucu]** "Kuyudan fazladan çek" 4 damla daha verir. Bunu kimse görmez ama köyün kuyusunda su seviyesi düşer.

### Öğretici: keçi bakımı
- **[ipucu]** {keci} seni bekliyor. Sırtını tara, su kabını koy, yemini ver. Bakım gördükçe biraz toparlanır.

### g1_tanima – Gün 1 öğle [sahne: kuyu_basi]
- **Kart:** Annen seni bidonlarla kuyu başına yolladı.
- **Mehmet (iç ses):** Kuyu başı yine kalabalık. Bidonlar sıra sıra.
- **Mehmet:** Kolay gelsin.
- **Köylü:** Sağ ol, evlat. Geç sıraya.
- **Köylü:** Eskiden kovayı salardın, suyu duyardın. Şimdi ip uzadıkça uzuyor.
- **Başka bir köylü:** Biz burada bidon sayıyoruz, Rıza'nın motoru bütün gece çalıştı.
- **Köylü:** Sus sus. Rıza duyar.
- **Mehmet (iç ses):** Rıza Amca bizim komşu. Motorunun sesi evimize kadar gelir. Kimse yüzüne bir şey demez, arkasından çok konuşur.
- **Mehmet (iç ses):** Bize yakın olmasına rağmen pek görüşmeyiz, arada bir selam sabah o kadar... Zaten pek de görüşmek ister gibi hali yok.
- **Mehmet (iç ses):** Kuyuda ne kadar su kaldığını kimse bilmiyor. Endişelenenler de var, vurdumduymaz olanlar da.
- **[ipucu]** Ekranın sağ kenarındaki mavi gösterge köy kuyusunun seviyesi. Her gün biraz iner. Oyunun sonuna etki eden önemli bir faktör. Fazla düşmesine izin verme.

### Öğretici: harita (gün 1 akşam, ilk harita)
- **[ipucu]** Akşamları birine uğrayabilir ya da ailenle vakit geçirebilirsin. Ama yalnızca birini yapabilirsin. Akşam uzun değil.
- **[ipucu]** Haritada gitmek istediğin yere dokun. Bazı yerlerde her zaman yapılacak bir şey olmayabilir.

### Öğretici: kiler (gün 1 gece, ilk kiler değişiminde)
- **[ipucu]** Sepetler evin yiyeceği. Her akşam iki sepet eksilir. Keçi "Toparlanıyor" olunca süt, bahçe "Yeşil" olunca sebze getirir, ikisi birer sepet. Gece ne geldiğini görürsün. Kiler boşalırsa ev zorlanır.

### Kiler özeti (her gece, gece satırından sonra)
- **Ekran:** Kiler: Keçiden süt +1 / Keçi süt vermedi · Bahçeden sebze +1 / Bahçe sebze vermedi · Sofra −2 (yetmezse: sofraya yetmedi, annen kuyuya indi)

### Sofra önizlemesi (dağıtım panelinde, annenin ilk kuyuya inişinden sonra, son gün hariç)
- **Ekran:** Bu akşamki sofra (şimdilik): kilerde N · keçiden süt +1 / keçi süt vermedi · bahçeden sebze +1 / bahçe sebze vermedi → yeter / yetmez, annen kuyuya iner

### Öğretici: komşuluk (kiler bir gece boş kaldıktan sonraki akşam, bir kez)
- **Mehmet (iç ses):** Kiler yine boş. Birinden istesem verirler mi? Fatma Teyze annemi hep sorar.
- **[ipucu] Komşuluk:** Kiler boşken akşam yaşlı çifte uğrarsan yiyecek verebilirler. Ama onlarda da sınırsız değil.

### Öğretici: boş kiler (kiler ilk kez boş kaldığı gece)
- **[ipucu] Boş kiler:** Kiler boş kaldığı her gece annen, yarın sofraya bir şey çıksın diye kuyudan gizlice su çeker. Köyün su seviyesi düşer. Keçi ve bahçe kileri doldurur.

---

## Gün olayları

### g2_grisu – Gün 2 sabah [sahne: avlu]
- **Anne:** Dur, leğendeki suyu dökme. Bulaşık suyunu da.
- **Mehmet:** Ama kirli o.
- **Anne:** Domatesler kirli mirli bakmaz. Deterjan sabun olmasın yeter. Ninen de böyle yapardı. Dök bahçeye.
- **[ipucu] Gri su:** Evde kullanılan su artık boşa gitmiyor. Eve verdiğin her 3 damladan 1'i bahçeye döner. Dağıtım panelindeki "Gri su" satırında görürsün. Eve az verirsen bahçeye dönen de azalır. Gri su ertesi güne kalmaz.

### g2_yaslicift – Gün 2 öğle [sahne: yasli_cift_evi]
- **Kart:** Fatma Teyze seni çağırtmış.
- **Mehmet:** Hayırlı günler, Fatma Teyze, Hasan Amca.
- **Fatma Teyze:** Gel bakalım, Mehmet. Gölgeye otur. Gölge dediysem, asmada yaprak kalmadı ya.
- **Hasan Amca:** Bu asmayı babam dikti. İki yazdır yaprak bile zor tutuyor.
- **Mehmet:** Hasan Amca, eskiden de böyle kurak olur muydu?
- **Hasan Amca:** Kurak yıl çok gördük. Ama yer altı dolardı, dere de akardı. Kuyuya on metre ip yeterdi.
- **Fatma Teyze:** Seni bunun için çağırmadım, dinleme onu. Al şu tohumları. Bizim köyün eski tohumu bunlar, az suyla yetinir. Bahçenizin boş kalan yerine ek.
- **[ipucu] Dayanıklı tohum:** Yarından itibaren bahçe daha az su ister.
- **Hasan Amca:** Haa, bir de köyün yukarısında eski bir sarnıç var. Yağmur suyunu orada toplardık. Motorlar gelince kimse bakmadı, yıkıldı gitti.
- > Burada bir de dere mi vardı, Hasan Amca? {A1}
- > Teşekkürler. Ben artık gideyim, geç oldu. Annem bekler.

**{A1} seçilirse (g2_a1):**
- **Hasan Amca:** Vardı ya tabii. Muhtarlığın önünden akardı. Kıyısında koca bir söğüt vardı.
- **Fatma Teyze:** Çocuklar yazın hep oradaydı. Rıza'yla muhtar en önde. Söğüdün dalından suya atlarlardı.
- **Mehmet:** Rıza Amca mı? Suya mı atlardı?
- **Hasan Amca:** *(güler)* O da çocuktu bir zaman. Motorlar çoğaldı, dere çekildi, söğüt de kurudu. O ağacı çok severdi.
- **Mehmet (iç ses):** Rıza Amca'yı hiç gülerken görmedim. Suya atlarken nasıl gülüyordu acaba? Umarım büyüyünce ben de öyle olmam.
- **Ekran:** Deftere yazıldı: Rıza Amca'nın söğüdü

### g2_tohum – Gün 2 akşam başı [sahne: avlu]
- **Mehmet (iç ses):** Fatma Teyze'nin tohumları cebimde. Yarın sabah erken ekerim.

### g3_olcum – Gün 3 sabah [sahne: kuyu_basi]
- **Kart:** Su almaya indin. Öğretmen elinde iple kuyunun başında duruyor.
- **Mehmet:** Günaydın, öğretmenim.
- **Zeynep Öğretmen:** Günaydın, Mehmet. İyi ki geldin. Tut şu ipin ucunu. Sıkı tut ve bırakma.
- **Mehmet:** Ne yapıyorsunuz, öğretmenim?
- **Zeynep Öğretmen:** Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.
- **Zeynep Öğretmen:** *(ipi işaretler)* Bir ayda neredeyse yarım metre inmiş.
- **Mehmet:** Bu çok mu?
- **Zeynep Öğretmen:** Çok. Eskiden bir yılda bu kadar inerdi. Yağmur yok ki yerine gelsin. Bu gidişle sonbahara kuyuda su kalmaz.
- **Mehmet:** Rıza Amca'nın kuyusu da bu suyu mu çekiyor?
- **Zeynep Öğretmen:** Hepimizin kuyusu aynı kaynağa iniyor, onun ama çektiği kısım biraz daha farklı yapıda. Biri çekince hepimizin suyu azalıyor.
- **Zeynep Öğretmen:** Bunu muhtar görmeli. Ben anlatınca "öğretmen hanım yine hesap yapmış" diyor. Kâğıt senin elinden gitsin, köyün çocuğu getirdi desin.
- **Zeynep Öğretmen:** *(kâğıdı katlayıp uzatır)* Al. Cebinden düşürme. Muhtar akşamları muhtarlıkta olur.
- **[ipucu] Defter:** Görevlerin üstteki Defter'de yazar. Ölçümü gün 5 akşamına kadar muhtara götür. Geç kalırsan plan zayıf kalır.
- > Kuyu tamamen kurursa ne olur? {A2}
- > Tamam, götürürüm.

**{A2} seçilirse (g3_a2):**
- **Zeynep Öğretmen:** Yer altı suyu çekildikçe toprağın altında boşluklar kalıyor. Kontrolsüz su kuyuları yer altı su seviyesini düşürerek obrukları tetikliyor. Bir gün tavan çöküyor.
- **Zeynep Öğretmen:** Ovada yüzlerce obruk var artık. Motorların kontrolsüz ve en çok çalıştığı tarlalarda da...
- **Mehmet:** Rıza Amca'nın tarlası gibi mi?
- **Zeynep Öğretmen:** *(ipi sarar; akşam ziyaretinde: önündeki defteri kapatır)* Tek motorun işi değil, Mehmet. Hepimiz çekiyoruz. Sıra kimin tarlasına gelir, kimse bilmez.
- **Ekran:** Deftere yazıldı: Obruk uyarısı

### Ölçüm teslimi – görev ziyareti, gün 3-5 akşam [sahne: muhtarlik]
- **Mehmet:** Muhtar amca, öğretmenim bunu gönderdi. Kuyunun ölçümü.
- **Muhtar:** *(kâğıda uzun uzun bakar)* Yarım metre ha...
- **Muhtar:** Ben de içten içe biliyordum. Ama somutlaşınca başka oluyor. Sorunları görmezden gelmek hep daha kolay, alışmışız...
- **Muhtar:** Öğretmen hanımla oturup konuşsam iyi olur o zaman. Köyün işini de köylüye sormak lazım illa. Senin de eline sağlık yeğenim.
- **Ekran:** Defter: Ölçüm muhtara ulaştı ✓

### Ölçüm hatırlatmaları
- **Gün 4 akşam (teslim edilmediyse) – Anne:** Öğretmen hanım bir kâğıt vermişti sana, muhtara götürdün mü?
- **Gün 5 sabah (teslim edilmediyse) – Anne:** O öğretmenin kâğıdı hâlâ cebinde mi? Bu akşam götür, oğlum.

### g4_cicek – Gün 4 sabah [sahne: avlu]
- **Anne:** Muhtar kapı kapı dolaşıyor, suyu idareli kullanın diye. Öğretmen hanım da anlatıp duruyormuş. *(ölçüm teslim edilmediyse: Öğretmen hanım kapı kapı dolaşıyor, suyu idareli kullanın diye. Muhtar da kendi bildiği gibi söylemiş köylüye.)*
- **Mehmet (iç ses):** Annemin pencere önünde çok sevdiği sardunyası. Yaprakları iyice kıvrılmış.
- **Anne:** Ona su verme, boş ver.
- **Mehmet:** *(Bardağının dibinde kalan suyu sardunyaya döker)*
- **Anne:** *(Buruk şekilde gülümser, bir şey demez)*

### g5_baba – Gün 5 sabah [sahne: tepe]
- **Kart:** Babanın araması için tepeye çıktın.
- **Mehmet (iç ses):** Annemin telefonu yalnızca tepede çekiyor. Babam muhtarlığa haber bırakmış, bu sabah arayacakmış.
- **Baba:** Mehmet? Sesim geliyor mu?
- **Mehmet:** Geliyor, baba! Ne zaman geleceksin?
- **Baba:** *(bir an susar)* İnşaatta birkaç iş var. Çağırdıkları gün gidiyorum, çağırmadıkları bekliyorum.
- **Baba:** Annen nasıl? İyi uyuyor mu geceleri?
- > Yorgun biraz ama iyi sayılır, baba. → **Baba:** Yorgundur tabii ya. Söyle ona, biraz daha sabretsin.
- > Sen nasılsın ya? → **Baba:** Ben mi? İyiyim. Burada su musluktan akıyor, kötü de olsa, içerken utanıyorum.
- **Baba:** {keci} nasıl?
- *(keçi <5)* **Mehmet:** {keci} hâlâ iyi değil. Kuyu da iniyor, öğretmen ölçtü.
- *(keçi ≥5)* **Mehmet:** {keci} toparlanıyor. Ama kuyu iniyor, öğretmen ölçtü.
- **Mehmet:** Bidonları artık ben taşıyorum.
- **Baba:** Ben de senin yaşındayken taşırdım. O zaman bu kadar sorunlu değildi.
- **Mehmet:** Rıza Amca'nın motoru da hiç durmuyor. Sadece onun da değil aslında, başkaları da var ama gözümün gördüğü o...
- **Baba:** Rıza mı? Sen muhtarla konuş. O adamı bir tek muhtar...
- **Mehmet (iç ses):** Kesildi. Bir tek muhtar ne?

### g6_sabah – Gün 6 sabah [sahne: avlu]
- **Anne:** Muhtar seni sormuş. Öğlen muhtarlığa uğra.
- **Mehmet:** Beni mi?
- **Anne:** Evet, seni. Temiz gömleğini giy.

### g6_plan – Gün 6 öğle [sahne: muhtarlik]
- **Kart:** Muhtar seni de muhtarlığa çağırdı.

- **Mehmet:** Selamünaleyküm, muhtar amca. Beni çağırmışsınız.
- **Muhtar:** Aleykümselam. Gel, otur şöyle.

**Güçlü plan (ölçüm zamanında ulaştıysa):**
- **Muhtar:** Öğretmen hanımla oturduk, bir yol çizdik. Kâğıdı sen getirdin, sen de dinle.
- **Zeynep Öğretmen:** Eski sarnıcı onarıyoruz. Yağmur gelince boşa akmasın, köy çeşmesine insin.
- **Muhtar:** Kuyulara sayaç, motorlara saat taktıracağız. Yasada var zaten ama bizde kimse takmamış. Herkes ne kadar su çektiğini bilecek.
- **Zeynep Öğretmen:** Yetkililer geldiğinde bir de yer altı kaynaklarımıza baksalar iyi olur, ama sıra bize gelene kadar çok köy var daha...
- **Zeynep Öğretmen:** Sulama sabah erken ya da akşam serinde, ne kadar olacağını sayaç söyleyecek. Toprağın üstü uygun zamanda saman ya da otla örtülecek, buharlaşmasın.
- **Muhtar:** Gerekirse tarlalara az ekin ekeceğiz. Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.
- **Muhtar:** Hepsini cuma akşamı köy toplantısında oylayacağız.

**Gecikmeli plan (ölçüm ulaşmadıysa):**
- **Muhtar:** Öğretmen hanım ölçümün bir örneğini getirdi sonunda. "Aslını Mehmet'e vermiştim" dedi.
- **Mehmet (iç ses):** Eyvah, kâğıt cebimde kaldı, aklımdan çıkmış.
- **Muhtar:** Keşke daha önce görseydim. Kuyu bu arada epey indi. Kızmıyorum, zaten ben de hatalıyım, otur da dinle.
- **Zeynep Öğretmen:** Sarnıç, sayaç, sulama saatleri... Bu kadar kısa sürede elimizden geleni yazdık.
- **Muhtar:** Cuma akşamı köy toplantısında oylayacağız.

**Her iki durumda:**
- **Zeynep Öğretmen:** Sarnıcı Hasan Amca hatırlattı, toprağı otla örtmeyi Fatma Teyze'den öğrendik. Bazıları hâlâ umursamıyor, gözleriyle görseler de inanmıyorlar resmen.
- **Muhtar:** Bazıları kendi kuyularını kullanıyor ama havalar böyle giderse onlar da tükenecek, farkında değiller.
- **Zeynep Öğretmen:** Kuyular derinleştikçe derinleşiyor, on belki yüz yıllarca biriken sular bilinçsiz kullanımla aylar içinde eriyor.
- **Muhtar:** Rıza'nın motoru durmazsa ortak kuyudaki su hiçbirimize yetmez. Köy de ikiye bölündü, bazılarının tuzu kuru tabii. Oylar eşit çıkarsa herkes Rıza'ya bakacak. 
- **Muhtar:** Rıza da kimseyi dinlemez. Biz de onu pek dinlemedik açıkçası...
- > (A3 öğrenilmediyse) Babam "o adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca'yla neden konuşmuyorsunuz? {A3}
- > Ben konuşurum.
- > (Rıza Amca'ya daha önce bir şey anlattıysa, "Ben konuşurum" yerine) Ben onunla konuştum. Benimle az da olsa konuşuyor. Yine giderim.

**{A3} seçilirse (g6_a3):**
- **Muhtar:** *(uzun süre susar)* Biz Rıza'yla askere beraber gittik. Döndüğümüzde köyün yukarısındaki sarnıcın oluğunu beraber çaktık.
- **Muhtar:** Şimdiki kadar kötü olmasa da kuraklık yılıydı. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı Rıza.
- **Muhtar:** Hatta baban da senin yaşlarındaydı. Yukarıya bidonla su taşırdı bize.
- **Muhtar:** Sonra motorlar geldi, laflar karıştı. Sonra... olan oldu. Neyse.
- **Ekran:** Deftere yazıldı: Muhtarla Rıza Amca'nın sarnıcı

**Sonunda (her iki seçenekte):**
- *(Rıza'yla konuşmadıysa)* **Zeynep Öğretmen:** Seni bunun için de çağırdık. Bize kapısını açmaz. Sen çocuksun, sana bir şey demez belki.
- *(konuştuysa)* **Zeynep Öğretmen:** Demek sana kapısını açıyor. Bize açmaz.
- **Muhtar:** Zorla kabul ettiremeyiz, konuşmaya gideni de hep kaçırıyor bir şekilde. Dinletebilirsen kendini dinlet, Mehmet.
- **[ipucu] Komşuyu ikna et:** Rıza Amca'ya köyde öğrendiğin iki şeyi söylersen toplantıda planı destekler. Bir konuşmada yalnız bir şey dinler, her şeye de hemen inanmaz. Ne söylediğin kadar nasıl söylediğin de önemli. Defter'de görebilirsin.

### g7_komsu – Gün 7 sabah [sahne: kuyu_basi]
- **Kart:** Yine su almaya indin. Bu sabah kuyu başında beklemediğin biri var.
- **Mehmet (iç ses):** Rıza Amca kuyunun başında. Herkes onu görünce susmuş.
- **Rıza Amca:** Damacanam bitti. Payımı alıp gideceğim.
- **Köylü:** Sıra sayılı, Rıza. Motorun yüzünden bidonlar yetmiyor.
- **Başka bir köylü:** Senin kuyun var ya. Ondan iç.
- **Rıza Amca:** O su içilmez, geçen içine ilaç karıştı, biliyorsunuz.
- **Köylü:** Biliyoruz.
- **Rıza Amca:** *(bir süre durur, boş bidonu alır, gider)*
- **Mehmet (iç ses):** Haksız da değiller ama eli boş döndü.
- **Mehmet (iç ses):** Bir şey diyemedim. Ama belki bidon taşıyabilirim.
- **[ipucu] Komşuya su:** Artık öğlenleri haritadan Rıza Amca'ya su götürebilirsin. Yarınki paydan 2 damla gider ama onunla konuşma fırsatı olur.

### g8_sabah – Gün 8 sabah [sahne: avlu]
- **Ekran:** Sıcak dalgası. Gölgede kırk derece.
- **Anne:** Bugün dışarıda fazla kalma, yavrum, yine o sıcak rüzgârların kavurduğu günlerden birindeyiz. Kardeşin ve senin için endişeleniyorum.
- **Anne:** Bizim çocukluğumuzda hiç böyle değildi, yine sıcaktı ama ne olduysa iklimler değişti resmen. Sizin geleceğinizde nasıl olacak... Allah korusun.

### g8_obruk – Gün 8 öğle [sahne: komsu_tarlasi_obruk]
- **Kart:** Derinden bir gürültü geldi. Köylüler Rıza Amca'nın tarlasına doğru koşuyor.
- [ses: derinden gelen gürültü, toz]
- **Mehmet (iç ses):** Rıza Amca'nın tarlası... Toprak yarılmış. Kocaman bir çukur.
- **Rıza Amca:** *(çukurun kenarında, eli titreyerek)* Dün burada mısır vardı.
- **Rıza Amca:** Kırk yıldır bu toprağı sürüyorum. Kırk yıl!
- **Köylü:** *(alçak sesle)* Benim tarla da iki tarla ötede.
- **Mehmet:** Rıza Amca, orda durma, kenarı çöküyor!
- **Rıza Amca:** *(geri çekilir, oturur)* Motor da hemen şurada. Bir metre öteye açılsaydı...
- *(Karşılaşma başlar. Kaba seçim yapılırsa aynı konuşmada geri alma seçeneği çıkar.)*

### g9_sabah – Gün 9 sabah [sahne: avlu]
- **Anne:** Bu akşam toplantı var, oğlum. Bütün köy orada olacak, sen de gelmeyi unutma.
- **Anne:** Babanla dün konuştuk, selamı var. Toplantıyı o da merak etti.
- *(komşu ikna edilmediyse)* **Mehmet (iç ses):** Motor bu sabah da çalışıyor. Rıza Amca'ya gideceksem bugün gitmeliyim. Öğlen.
- *(ikna edildiyse)* **Mehmet (iç ses):** Bu sabah motorun sesi gelmiyor. Uzun zamandır ilk kez. "Bakarız" dedi ama gelir mi, gelmez mi, akşam göreceğiz.

---

## Komşuyla karşılaşma

### Kurallar
Bir konuşmada en fazla bir şey söylenir, sonra konuşma biter. Obruk uyarısı gün 8'den önce sayılmaz ve kilitlenmez. Su götürme gün 7 sahnesinden sonra açılır (gün 7 ve 9 öğlesi).

### Açılış
- **Akşam ziyareti:** **Rıza Amca:** Bu saatte tarlada ne arıyorsun, evlat? Otur bakalım, madem geldin. *(gün 8, obruktan sonra: Bu saatte burada ne arıyorsun, evlat? Çukura yaklaşma. Otur şöyle, madem geldin.)*
- **Su götürünce, gün 7:**
  - **Mehmet:** Bidonunuz boştu. Biz paylaşmak istedik, amca.
  - **Rıza Amca:** Benim kuyum var, evlat.
  - **Mehmet:** O su içilmez. Duydum geçenlerde, biliyorum.
  - **Rıza Amca:** *(bir süre bakar, çekinerek bidonları alır)* Çay yaptım, birazdan olur, iç sen de.
  - **Ekran:** Yarınki paydan 2 damla eksilecek.
- **Su götürünce, gün 9:** **Mehmet:** Size su getirdim, Rıza Amca. **Rıza Amca:** Bu köyde bana su getiren bir sen çıktın. *(bir bardak çay koyup uzatır)* Otur.
- **Su ziyaretinin sonunda (karşılaşma bitince):**
  - *(gün 7)* **Mehmet:** Çay için sağ olun, Rıza Amca. **Rıza Amca:** *(elini sallar)* Boş bidonları sonra alırsın.
  - *(gün 9)* **Mehmet:** Akşam görüşürüz, Rıza Amca. **Rıza Amca:** *(elini sallar)*

- **İlk konuşma (söyleyecek bir şey varsa, obruk anı hariç):** **Mehmet:** Rıza Amca, bir şey söyleyecektim. **Rıza Amca:** Muhtar mı gönderdi seni? Söyle ona, benim işime karışmasın.

### Özür (önceki karşılaşmada kaba seçim yapıldıysa)
- **Mehmet (iç ses):** Geçen sefer ağzımdan çıkanı düzeltmeliyim.
- > Geçen sefer yanlış konuştum, kusura bakmayın.
- > (Bir şey demeyeyim.)
- **Özür dilerse – Rıza Amca:** *(homurdanır)* Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?

### Argüman sorusu
- **Mehmet (iç ses):** Ne diyeyim?
- Her argümanda ek seçenek: > (Bu konuyu açmayayım.)
- Hiçbirini açmazsa: **Mehmet (iç ses):** Bugün bir şey söylemedim. Belki başka zaman.

### Söyleyecek bir şey yoksa
- **Normal:** **Mehmet (iç ses):** Ne desem bilemedim. Önce köydekilerle konuşmalıyım. **Rıza Amca:** Söyleyecek bir şeyin yoksa git işine. *(su götürdüyse: Çayını iç de git, evlat. Annen merak eder.)*
- **Gün 8, obrukta:** **Mehmet (iç ses):** Şimdi ne desem boş. **Rıza Amca:** Git, evlat. Burası tehlikeli.

### A1 – Söğüt
- > (nazik) Hasan Amca anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.
  - **Rıza Amca:** *(bir an durur)* Söğüt... Herkes "Rıza'nın söğüdü" derdi. *(yüzünü çevirir)* O dere çoktan gitti.
  - **Rıza Amca:** Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde tarlamdan başka?
- > (yanlış yaklaşım) Eskiden dere vardı. Herkes biraz idareli olsaydı hâlâ akardı.
  - **Rıza Amca:** İdareyi sen mi öğreteceksin bana? Benim belgem var, devletten aldım. Kendi tarlamda kendi motorum var, istediğimi yaparım.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A2 – Obruk uyarısı
**Gün 8'den önce:**
- > (nazik) Zeynep Öğretmen ölçtü, kuyu bir ayda yarım metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.
  - **Rıza Amca:** Obruk ovanın öbür ucunda olur. Bizim burada olmaz. *(ama gözünü tarlasından ayıramaz)*
  - **Ekran:** Rıza Amca buna şimdilik inanmıyor. *(sayılmaz, kilitlenmez)*
- > (yanlış yaklaşım) En doğrusu şu motoru hemen kapatmanız.
  - **Rıza Amca:** Öyle mi? Başka emrin var mı, velet?
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

**Gün 8 ve sonrası:**
- > (nazik) Öğretmen "Tek motorun işi değil" dedi. Hepimiz çektikçe sıra birinin tarlasına geliyormuş. İklim değişiyor, bir de bilinçsiz kaynak harcamasıyla dünya iyice kötüye gidiyormuş.
  - **Rıza Amca:** *(çukura doğru bakar)* Öğretmen söylemişti, değil mi? Ben dinlemedim.
- > (yanlış yaklaşım) Görüyorsunuz işte olanı. En doğrusu artık motoru kapatmanız.
  - **Rıza Amca:** Kırk yılın üstüne bir de senden mi dinleyeceğim? Defol.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### A3 – Sarnıç ve dostluk
- > (nazik) Muhtar amca anlattı. Gençliğinizde sarnıcın oluğunu beraber çakmışsınız.
  - **Rıza Amca:** *(sesi yumuşar)* Neredeyse kırk gün taş taşıdık. Ellerimiz parçalandı resmen. *(güler)* Muhtar mı anlattı bunu?
  - *(gün 6'dan önce)* **Rıza Amca:** O sarnıç yıkıldı. Biz de... neyse.
  - *(plan kurulduysa)* **Rıza Amca:** O sarnıç yıkıldı. Şimdi onaracaklarmış, duydum. Taş onarılır da... neyse.
- > (yanlış yaklaşım) Muhtar amca sizi hâlâ düşünüyor. Gidip tekrar konuşsanız ne olur?
  - **Rıza Amca:** Benimle muhtarın arasına girme. Sen bilmezsin ne olduğunu. Senden eski konular bunlar.
  - **Ekran:** Rıza Amca bu konuyu artık dinlemiyor.

### Gün 8: kabalığı geri alma
- **Mehmet (iç ses):** Bugün olmaz. Onca şeyden sonra bugün olmaz.
- > Dur, öyle demek istemedim. Özür dilerim, Rıza Amca.
- > (Sus.)
- **Geri alırsa – Rıza Amca:** *(derin nefes alır)* Bugün kimseyle kavga edecek hâlim yok. Söyle.

### Bir argüman iletilince (henüz ikna değil)
- **Rıza Amca:** Laf çok, evlat. Bir laf ne değiştirir? Yeter bu kadar.
- *(plan kurulduysa; görev defterde gün 6'dan sonra görünür)* **Ekran:** Defter: Komşuyu ikna et 1/2

### İkna (iki argüman iletilince)
- **Rıza Amca:** *(uzun süre susar)* Muhtar mı gönderdi seni, doğru söyle.
- **Mehmet:** Muhtar amca "dinletebilirsen dinlet" dedi. O kimseyi dinlemez dedi. Ama bunları söylemek benim fikrimdi.
- *(gün 7)* **Rıza Amca:** Toplantı ne zaman? **Mehmet:** Cuma akşamı, muhtarlıkta.
- *(gün 8)* **Rıza Amca:** Toplantı ne zaman? **Mehmet:** Yarın akşam, muhtarlıkta.
- *(gün 9)* **Rıza Amca:** Toplantı bu akşam mı? **Mehmet:** Bu akşam, muhtarlıkta.
- **Rıza Amca:** Bakarız. *(arkasını döner, sonra durur)* Bakarız dedim, git şimdi.
- **Ekran:** Defter: Komşuyu ikna et ✓

### Zaten ikna olduysa
- **Normal:** **Rıza Amca:** Bakarız dedim ya, evlat. Git şimdi.
- **Gün 8, obrukta:** **Rıza Amca:** *(başını kaldırmadan)* Bakarız demiştim. Bakacak tarla da kalmadı. Git, evlat.

---

## Akşam ziyaretleri

### Selamlaşma ve vedalaşma (her ziyaretin başında ve sonunda)
- **Yaşlı çift, selam:**
  - *(tek gün)* **Mehmet:** İyi akşamlar, Hasan Amca, Fatma Teyze. **Hasan Amca:** Gel, evladım, hoş geldin.
  - *(çift gün)* **Mehmet:** Hayırlı akşamlar. Nasılsınız bu sıcakta? **Fatma Teyze:** Şükür, oğlum, idare ediyoruz. Hoş geldin.
- **Yaşlı çift, veda:**
  - *(tek gün)* **Mehmet:** Ben kalkayım, annem bekler. Sağlıcakla kalın. **Hasan Amca:** Sen de sağlıcakla, oğlum. Annene selam söyle.
  - *(çift gün)* **Mehmet:** Allah'a emanet olun, Fatma Teyze. **Fatma Teyze:** Sen de, evladım. Karanlıkta bastığın yere dikkat et.
- **Muhtar, selam:**
  - *(tek gün)* **Mehmet:** İyi akşamlar, muhtar amca. Kolay gelsin. **Muhtar:** Sağ ol, evladım. Hoş geldin.
  - *(çift gün)* **Mehmet:** Selamünaleyküm, muhtar amca. **Muhtar:** Aleykümselam, Mehmet. Gel bakalım.
- **Muhtar, veda:**
  - *(tek gün)* **Mehmet:** Size iyi akşamlar, muhtar amca. **Muhtar:** Sana da, evladım. Doğru eve, dikkatli ol.
  - *(çift gün)* **Mehmet:** Sağlıcakla kalın, muhtar amca. **Muhtar:** Eyvallah, Mehmet. Güle güle.
- **Öğretmen, selam:**
  - *(tek gün)* **Mehmet:** İyi akşamlar, öğretmenim. **Zeynep Öğretmen:** İyi akşamlar, Mehmet. Işığı görüp mü geldin?
  - *(çift gün)* **Mehmet:** Merhaba, öğretmenim. Nasılsınız? **Zeynep Öğretmen:** Yorgunum ama iyiyim, Mehmet. Gel.
- **Öğretmen, veda:**
  - *(tek gün)* **Mehmet:** Sağlıcakla kalın, öğretmenim. **Zeynep Öğretmen:** Sen de, Mehmet. Görüşürüz.
  - *(çift gün)* **Mehmet:** Hoşça kalın, öğretmenim. **Zeynep Öğretmen:** Güle güle, Mehmet.
- **Rıza Amca, selam:**
  - *(tek gün)* **Mehmet:** İyi akşamlar, Rıza Amca. **Rıza Amca:** Hı.
  - *(çift gün)* **Mehmet:** Merhaba, Rıza Amca. Nasılsınız? **Rıza Amca:** Nasıl olayım. İşte.
  - *(gün 8, obruktan sonra)* **Mehmet:** İyi akşamlar, Rıza Amca. **Rıza Amca:** *(çukura bakar, dönmez)* Hı.
- **Rıza Amca, veda:**
  - *(tek gün)* **Mehmet:** Sağlıcakla kalın, Rıza Amca. **Rıza Amca:** (elini sallar)
  - *(çift gün)* **Mehmet:** Annem selam söyledi, Rıza Amca. **Rıza Amca:** Sağ olsun. Hadi git artık.

### Küçük sohbet (kişi başına bir kez; mekanik etkisi yok)
- **Yaşlı çift:** Annen nasıl, geçenlerde rahatsızlanmıştı, bu sıcakta uyuyabiliyor mu?
  - > Zor uyuyor, teyze. → Sıcak herkesi yoruyor. Söyle ona, bir akşam bize gelsin.
  - > İyi, şükür. → Allah'a şükür. Uyku en iyi ilaç, oğlum.
- **Muhtar (gün 8'den önce):** Sen söyle, köyde ne var ne yok?
  - > Yok, muhtar amca, duymadım. → İyi. Bu aralar duymamak daha hayırlı.
  - > Kuyu başında kavga çıkacak diyorlar. → Çıkmasın diye pay yazdım ya. Bakalım.
- **Öğretmen (gün 8'den önce):** Tatilde kitap okuyor musun bari?
  - > Okuyorum, öğretmenim, yavaş yavaş. → Aferin. Bitince gel, başkasını veririm.
  - > Vakit kalmıyor, su taşıyorum. → Biliyorum. Kitap kaçmaz, ama yine de okumaya çalış boş zamanında.
- **Rıza Amca:** Ne bakıyorsun öyle? Tarlamı mı merak ettin?
  - > Yok, selam vermeye geldim. → Selamı aldım.
  - > Mısırlar güzel olmuş. → Güzel tabii. Su çekince olur. Babamdan kalan toprak, kurutmam. Benim oğlanın okul masrafını çıkaracak inşallah.

### Kısa sohbetler (bilgisi henüz açılmamış kişi; herkes birbirini zaten tanır)
**Yaşlı çift (gün 1):**
- **Fatma Teyze:** Annen nasıl, oğlum? Bebek iyi uyuyor mu geceleri?
- **Mehmet:** Uyuyor, teyze, biraz.
- **Hasan Amca:** Bu sıcakta küçükler zor uyur. Sen de yorulma, otur biraz su iç.
- **Mehmet (iç ses):** Kaç yaşındalar bilmiyorum. Köyün en eskileri onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.

**Muhtar (gün 1-2):**
- **Muhtar:** Hayırdır, Mehmet? Annen bir şey mi istedi?
- **Mehmet:** Yok, muhtar amca, öyle uğradım.
- **Muhtar:** İyi etmişsin. Selam söyle eve.
- **Mehmet (iç ses):** Köyde birinin kâğıt işi mi var, önce bu kapı çalınır. Kimseye sesini yükseltmez, kimse de ona kolay kolay hayır demez. Rıza Amca hariç.

**Öğretmen (gün 1-2):**
- **Zeynep Öğretmen:** Mehmet, tatilde okulun yolunu unutmamışsın.
- **Mehmet:** Geçiyordum, öğretmenim.
- **Zeynep Öğretmen:** Geçerken bir kitap da al o zaman. Geri getirmeyi unutma.
- **Mehmet (iç ses):** Zeynep öğretmen şehirden geldi, gidenler gibi gitmedi. Yazın bile okulda. Cebindeki deftere her şeyi yazıyor, kuyuyla alakalı şeyleri bile.

**Rıza Amca (argüman öğrenilmeden):**
- **Rıza Amca:** Ne var, evlat? Annen mi gönderdi?
- **Mehmet:** Yok, Rıza Amca, geçiyordum.
- **Rıza Amca:** Geç o zaman.
- *(gün 8, obruktan sonra; üstteki üç satırın yerine)* **Rıza Amca:** Seyre mi geldin? Herkes geldi. **Mehmet:** Yok, Rıza Amca. **Rıza Amca:** Git o zaman.
- **Mehmet (iç ses):** Yalnız yaşıyor. Oğlu şehre gideli akşamları evinden motorun sesinden başka ses gelmez. Eskiden bize ceviz verirdi, şimdi selamı bile kısa.

### Yaşlı çift
- **A1 öğrenilmediyse:** **Fatma Teyze:** Otur, sana bir şey anlatayım. Bu köyde bir dere vardı, bilir misin? **Mehmet:** Hasan Amca da söylemişti. Gerçekten var mıydı? *(g2_a1'e bağlanır)*
- **İklim sözü (ek ziyaret):**
  - **Hasan Amca:** Bizim zamanımızda kar yerde haftalarca kalırdı. Şimdi düştüğü gibi eriyor.
  - **Fatma Teyze:** Kuyudaki su, bizim çocukluğumuzda yağan kar, yağmur. Biz çok içtik, hiç düşünmemiştik.
- *(ikinci ek ziyaret)* **Hasan Amca:** Eskiden kışın toprak doyardı. Yazın ne çekersen çek, ertesi yıl yerine gelirdi.
- *(ikinci ek ziyaret)* **Fatma Teyze:** Şimdi gelmiyor. Biz gideceğiz, sizin kuyunuz kalacak. Asıl ona üzülüyorum, oğlum.
- **Yardım 1 (kiler boşsa):** **Fatma Teyze:** Annen sofrayı zor kuruyordur tek başına. Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.
- **Yardım 2:** **Fatma Teyze:** Bu son, oğlum. Artık bize de zor yetiyor. Bir daha veremeyebiliriz, gücenme olur mu?

### Muhtar
- **A3 öğrenilmediyse (gün 3'ten):** **Muhtar:** Otur, Mehmet. Babandan haber var mı? **Mehmet:** *(gün 5'ten önce)* Yok henüz. Muhtar amca, kuyu başında hep Rıza Amca'nın motorunu konuşuyorlar. Siz neden konuşmuyorsunuz onunla? *(gün 5'ten sonra)* Aradı. "O adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca'yla neden konuşmuyorsunuz? *(g6_a3'e bağlanır)*
- **Genel:** **Muhtar:** Baban aradı dün, seni sordu. "Sözünü dinliyor mu?" dedi. Köyü dinliyor, dedim. **Muhtar:** Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev artık. Kuyu giderse köy de gider.

### Öğretmen
- **A2 öğrenilmediyse:** **Zeynep Öğretmen:** Ölçümü düşünüyordum da. Tek korktuğum kuyunun kuruması değil. *(g3_a2'ye bağlanır)*
- **A2 öğrenilmediyse, gün 8 akşamı (obruk açıldıktan sonra):**
  - **Mehmet:** Öğretmenim, o çukur neden açıldı?
  - **Zeynep Öğretmen:** Yer altı suyu çekildikçe toprağın altında boşluklar kalıyor. Kontrolsüz su kuyuları yer altı su seviyesini düşürerek obrukları tetikliyor. Bir gün tavan çöküyor.
  - **Zeynep Öğretmen:** Ovada yüzlerce obruk var artık. Bugün biri de bizim köyde açıldı.
  - **Mehmet:** Rıza Amca'nın motoru mu açtı?
  - **Zeynep Öğretmen:** *(önündeki defteri kapatır)* Tek motorun işi değil, Mehmet. Hepimiz çektik. Sıra onun tarlasına geldi. İnsanlar bazı şeyleri kendilerine olana kadar fark etmiyor.
  - **Ekran:** Deftere yazıldı: Obruk uyarısı
- **Ölçüm hâlâ cebindeyse (her ziyaretin başında):**
  - *(gün 5'e kadar)* **Zeynep Öğretmen:** Kâğıdı muhtara götürdün mü? Geç kalma, Mehmet.
  - *(gün 6'dan sonra)* **Zeynep Öğretmen:** Kâğıt cebinde kalmış, duydum. Olur öyle. Ben de sana bırakmamalıydım.
- **İklim sözü (ek ziyaret):**
  - **Zeynep Öğretmen:** Bu kuraklık yalnız bizim ovada değil, Mehmet. Gazetede okudum, İspanya'da da, Irak'ta da kuyular iniyor. Kavurucu sıcaklar var her yerde.
  - **Zeynep Öğretmen:** Büyük toplantılarda konuşuyorlar, iyi de, bizim kuyudan kaç kova çekileceğini orada bilmezler. Herkes kendi üzerine düşeni yapmalı.
  - *(ikinci ek ziyaret)* **Zeynep Öğretmen:** Ölçmek kolay, Mehmet. Zor olan, ölçtüğünü insanlara anlatabilmek.

### Aile vakti
Her durumda üç sürüm, gün sırasıyla döner.
- **Ev düşükken:**
  1. **Anne:** Gel otur yanıma, oğlum. Bir şey yapmasak da olur. (bebeği kucağına verir) **Mehmet:** (kardeşini sever ve sallar, bir süre konuşmazlar)
  2. **Anne:** Yoruldum, oğlum. Bu sıcaklarla baş etmek çok zor. Size kıyamıyorum, gel otur biraz. **Mehmet:** Uzan biraz, anne, kardeşime ben bakarım.
  3. **Anne:** Baban olsa "bu da geçer" derdi. Ben demeyeyim, neyse sen de gel uzan biraz. **Mehmet:** Benim umudum var, anne, geçecek, geçireceğiz.
- **Ev ortadayken:**
  1. **Anne:** Kardeşin bugün sana baktı baktı güldü, biliyor musun? **Mehmet:** Bana mı güldü? Ben ne yaptım ki?
  2. **Anne:** Baban küçükken bu avluda uyurmuş, yazın. Gel, biz de çıkalım. **Mehmet:** Yıldız sayarım. Bidon saymaktan iyidir.
  3. **Anne:** Baban gitmeden kapıyı onaracaktı. Döner dönmez sana da tutturacak, görürsün. **Mehmet:** Ben onarırım, anne, çivi versen yeter.
- **Ev yüksekken:**
  1. **Anne:** Baban gelince bu evi iyice bir temizleyelim, zor günde dağılmadık çok şükür. **Mehmet:** Olur, anne, babam gelsin, tekrar beraber olalım yeter. Dağılmayız.
  2. **Anne:** Bugün sana hiç "hadi" demedim, fark ettin mi? Her işe kendin yetiştin. **Mehmet:** Fark ettim. İyice alıştırdın beni, anne, ya.
  3. **Anne:** Babana anlatacağım, bu yaz kimin sayesinde ayakta kaldık. **Mehmet:** {keci} sayesinde de.
- **Ardından küçük sohbet (mekanik etkisi yok, gün sırasıyla):**
  - **Anne:** Bugün dışarıda kimleri gördün bakalım?
    - > Herkes ya kuyu başında bidon sayıyor ya da sıcakla boğuşuyor. → Saysınlar. Sayılacak su kaldıkça iyi demektir.
    - > Kimseyle konuşmadım. → Konuş, oğlum. Bu köyde herkes birbirine küsmüş zaten. Herkes kendi derdine düşmüş.
  - **Anne:** Baban aradığında ona ne anlatacaksın?
    - > {keci} iyi derim. → De tabii, sevinsin. Kesin onu da sorar zaten.
    - > Hiçbir şey, üzülmesin. → Üzülmez. Sesini duymak ister, ne desen olur.
  - **Anne:** Kardeşin büyüyünce seni ona nasıl anlatayım?
    - > Su taşıyan kaslı, güçlü abisi de. → (güler) Bir de inatçı diyeyim, eksik kalmasın.
    - > Anlatma, kendi görür. → Görür tabii. Sen yanında ol, yeter.
- **Kapanış:** *(tek gün)* **Mehmet:** İyi geceler, anne. **Anne:** İyi geceler, oğlum. Kardeşini uyandırma. *(çift gün)* **Mehmet:** Hayırlı geceler, anne. **Anne:** Sana da, yavrum. Yarın erken kalkacağız, uyuyalım hemen.

### Akşam bitişi (ziyaretten sonra, eve dönüş)
- **Mehmet (iç ses):** Hava iyice karardı. Eve dönmeliyim.

### Gece satırı (akşamın sonunda, yeni günün kartından önce; ilk tutan çıkar)
0. *(bu gece kiler boştu; üç sürüm, gün sırasıyla)* **Mehmet (iç ses):** Akşam sofrada yalnız ekmek vardı. Gece annem bidonla kuyuya indi. Görmedim sandı. / Annem kendi payını önüme itti. Sonra bidonu alıp karanlıkta kuyuya yürüdü. / Kiler boş. Annem yine gece kuyuya indi. Kimseye söylemiyor, ben de söylemiyorum.
1. *(bugün fazladan çekildiyse; üç sürüm, gün sırasıyla)* **Mehmet (iç ses):** Bugün kuyudan fazla çektik. Kimse bir şey demedi. Ben yine de kuyuya bakamadım. / Bir kez daha fazla çektik. Bu sefer elim titremedi. Ona üzüldüm. / Kuyunun önünden geçerken başımı çevirdim. Bir bidon daha diye diye.
2. *(son sepet bu akşam bittiyse)* **Mehmet (iç ses):** Son sepet de bitti. Annem "tokum" dedi. Tok değildi...
3. *(komşuya bugün su götürüldüyse)* **Mehmet (iç ses):** Yarın iki bidon eksik olacak. Annem sordu. "Rıza Amca'ya" dedim. Bir şey diyemedi, başını salladı.
4. *(keçi çok düşükse)* **Mehmet (iç ses):** Gece ağıla baktım. {keci} başını kaldırmadı.
5. *(gün sırasına göre)*
   - **Gün 1:** İlk gün bitti. Yarın yine aynı pay. Yine yetmeyecek.
   - **Gün 3:** Yarım metre. Yatağıma uzandım, kuyunun dibini düşündüm.
   - **Gün 4:** Sardunya hâlâ orada. Annem suyunu sormadı, ben de zaten söylemedim.
   - **Gün 5:** *(A3 öğrenilmediyse)* "O adamı bir tek muhtar..." Muhtarla Rıza Amca'nın arasında ne var? *(öğrenildiyse)* Babamın sesi kulağımda. Üç dakika konuştuk, tepeden inmesi bir saat sürdü.
   - **Gün 6:** Muhtar bana "dinletebilirsen dinlet" dedi. Bir çocuk Rıza Amca'ya ne dinletir?
   - **Gün 7:** Boş bidonla dönüşü gözümün önünden gitmiyor.
   - **Gün 8:** Yarın toplantı var. Herkes evine erken çekildi. O çukur gözümün önünden gitmiyor.

---

## Öğle eylemleri
Tek cümleli olanlar tekrar edince tuhaf kalıyordu, her birine birkaç sürüm eklendi; gün sırasına göre döner.

- **Komşuya su götür:** Yukarıda "Su götürünce".
- **Bahçede ek iş:**
  1. **Mehmet (iç ses):** Toprağın üstünü kuru otla örttüm. Fatma Teyze öyle derdi, su uçup gitmezmiş böyle olunca.
  2. **Mehmet (iç ses):** Otları ayıkladım, kuruyanları kopardım. Çapa elimi soydu.
  3. **Mehmet (iç ses):** Fatma Teyze'nin tohumları çıkmış. Küçücük ama yemyeşil.
- **Evde yardım:**
  1. **Mehmet (iç ses):** Bebeği salladım, biraz güldürmeye çalıştım ama başaramadım. Annem biraz uyudu. Endişeliyim...
  2. **Mehmet (iç ses):** Bulaşığı yıkadım, suyunu leğende biriktirdim. Biraz sabun var gibi ama neyse.
  3. **Anne:** Ne zaman büyüdün de böyle iş yapıyorsun sen, canım oğlum? **Mehmet:** *(cevap vermez, hafif tebessümle çamaşırı asmaya devam eder)*
- **Babayı ara (tepe):**
  - **Mehmet (iç ses):** Tepeye çıktım. Telefon çekiyor, babamı aradım. **Baba:** Efendim? Mehmet, sen misin? **Mehmet:** Benim, baba. Nasılsın?
  - *(gün 5'ten önce)* **Baba:** İyiyim, oğlum, iş arıyorum, bulursam çalışıyorum. Bu saatte tepede ne işin var?
    - > Sesini duyayım dedim. → İyi ettin, oğlum. Ben de seninkini duymak istiyordum.
    - > Annem sormamı istedi, ne zaman geleceksin? → *(bir an susar)* Bilmiyorum, oğlum. İş çıksın, bir yol bulacağım inşallah.
    - **Baba:** Annene söyle, bu hafta biraz para yollamaya çalışacağım. **Mehmet:** Tamam, baba. Allah'a emanet ol. **Baba:** Sen de, oğlum. Anneni ve kardeşini öp benim yerime. **Mehmet (iç ses):** Sesi yorgun. "Çalışacağım" dedi, "yollayacağım" demedi.
  - *(gün 5'ten sonra)* **Baba:** İyiyim, oğlum, şükür. Karnınız doyuyor mu orada?
    - > Doyy...uyor, baba, merak etme. → *(güler)* Yalan söylemeyi benden öğrenme. İyi, inandım.
    - > Zor gidiyor, baba, bazen annemi ağlarken görüyorum. → Biliyorum, oğlum. Bu hafta biraz para yollamaya çalışacağım.
    - **Mehmet:** Hat kesilmişti. "O adamı bir tek muhtar" diyordun. **Baba:** Ha, Rıza. Onu bir tek muhtar yumuşatır diyecektim. Kardeş gibiydiler. **Mehmet:** Ne oldu onlara? **Baba:** O ikisinin bileceği iş. Kontör bitiyor, sen anneni öp benim yerime. **Mehmet:** Tamam, baba. Allah'a emanet ol. **Baba:** Sen de, oğlum. **Mehmet (iç ses):** Sesi yorgun. Sormadım.
- **Çamurda serinle (tek sefer):** **Mehmet (iç ses):** Leğenin dibinde kalan suyla çamur yaptım, biraz oynadım, sonra ayaklarımı içine soktum. Kardeşim annemin kucağından beni görüp kahkaha attı. Annem kızmadı.
- **Hiçbir şey yapmadan geçerse:**
  1. **Mehmet (iç ses):** Bulabildiğim bir gölgede oturdum. Sıcak, kimseye bir şey yaptırmıyor.
  2. **Mehmet (iç ses):** Ağılın gölgesine oturdum. {keci} ile birbirimize baktık. O da bir şey yapmadı.
  3. **Mehmet (iç ses):** Bir süre yolu seyrettim. Geçen giden yok. Sıcak herkesi içeri almış.

## Haritadaki düşünceler (yapılacak bir şey olmayan yere tıklanınca; zaman geçmez, ilk tutan görünür)
| Yer | Durum | Mehmet (iç ses) |
|---|---|---|
| Yaşlı çift | Öğle | Öğlen sıcağında Hasan Amca uyur. Rahatsız etmeyeyim. |
| Yaşlı çift | Akşam | Işıkları sönmüş, uyumuşlar sanırım. Rahatsız etmeyeyim. |
| Muhtarlık | Öğle | Muhtarlığın kapısı kapalı. Muhtar akşamları burada olur. |
| Muhtarlık | Akşam | Muhtar içeride, başı kâğıtlarda. Şimdilik söyleyecek bir şeyim yok. |
| Okul | Öğle | Okul kilitli. Öğretmen sabahları kuyuda, akşamları burada olur. |
| Okul | Akşam | Okulun ışığı yanıyor ama defterlerine gömülmüştür. Şimdi bölmeyeyim. |
| Rıza Amca'nın evi | İkna olduysa | Rıza Amca "bakarız" dedi. Şimdi üstüne gitmeyeyim. |
| Rıza Amca'nın evi | Öğle, gün 7'den önce | Kapısını çalmak için bir bahanem yok. |
| Rıza Amca'nın evi | Öğle | Rıza Amca'nın kapısı kapalı. Bugün yeniden gitmenin anlamı yok. |
| Rıza Amca'nın evi | Akşam | Motorun sesinden başka ses yok. Kapısını çalacak bir sözüm yok şimdi. |
| Rıza Amca'nın tarlası | Gün 8'den, motor kapalıysa | Çukurun çevresine ip çekmişler. Motor susmuş. Yaklaşmayayım. |
| Rıza Amca'nın tarlası | Gün 8'den | Çukurun çevresine ip çekmişler. Motor yine çalışıyor. Yaklaşmayayım. |
| Rıza Amca'nın tarlası | Diğer | Motor gürül gürül çalışıyor. Başkasının tarlasında işim yok. |
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
- *(tek gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, kardeşimin bezi. Sonra ağıla, {keci} bekliyor.
- *(çift gün)* **Mehmet (iç ses):** Çamaşır, bulaşık, kardeşimin bezi. Sonra bahçeyle ilgilenirim.

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
2. *(A1 bilinmiyor)* Fatma Teyze'ye bir akşam uğra. Yaşlılar konuşacak birini arıyor.
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
- **Muhtar:** Hepiniz biliyorsunuz neden toplandığımızı. Kuyu suyu iyice dibe iniyor. Öğretmen hanım ölçtü, ben de gördüm, birçoğunuz da biliyor.
- **Zeynep Öğretmen:** Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve akşam serinde yapılacak.
- **Köylü:** Sayaç masrafını kim ödeyecek?
- **Başka bir köylü:** Benim tarlam kurursa çocuklarıma ne yediririm?
- **Köylü:** Rıza'nın ve diğerlerinin motoru dönerken benim sayacım neye yarar?
- *(anne gece kuyuya indiyse)* **Mehmet (iç ses):** Herkes Rıza Amca'nın motorunu sayıyor. Annemin gece indiği bidonları kimse saymıyor. Belki kendileri de iniyor...
- *(inmediyse, ama fazla çekildiyse)* **Mehmet (iç ses):** Herkes Rıza Amca'nın motorunu sayıyor. Bizim fazla çektiğimiz bidonları kimse saymıyor. Diğerleri de yapmıştır belki...
- **Muhtar:** Artık oylayalım. Kabul edenler...
- **Ekran:** Eller kalkıyor. Yarısı evet, yarısı hayır.
- **Mehmet (iç ses):** Herkes dönüp Rıza Amca'ya bakıyor.

**Komşu evet derse:**
- **Rıza Amca:** *(bir an Mehmet'e bakar, ağır ağır ayağa kalkar)* Benim tarlam çöktü. Çökmez diyordum ama çöktü, bir sonraki kimin tarlası? *(elini kaldırır)* Ben de varım. Motoruma da sayaç takılsın. Belki hâlâ şansımız vardır. Herkes üstüne düşeni yapsın...
- **Köylü:** (Sessizce mırıldanır) Daha iki gün önce sırayı kapattık ona. Ayıp ettik. Kıtlık insanlığımızı da yemeye başlamış.
- **Muhtar:** *(Bir an Rıza'ya bakar, buruk bir gülümsemeyle başını sallar)* Kabul edilmiştir.

**Komşu hayır derse:**
- **Rıza Amca:** Benim belgem var. Babamdan bir tarla kalmıştı, o da gitti. Elimde bir motor var. Sayaç takarsanız ne kalacak? Oğlumun okul masraflarını zor karşılıyorum zaten...
- *(su götürüldüyse)* **Rıza Amca:** *(çıkarken Mehmet'in önünde durur)* Suyun için sağ ol, evlat. ...Bu başka mesele.
- **Ekran:** Rıza Amca çıkıp gidiyor.
- **Muhtar:** Oylar eşit. Bu hâliyle plan geçmez.

---

## İyi son
- [sahne: sarnic_onarildi]
- **Kart:** Oylamadan birkaç hafta sonra
- **Kart:** Ekim - İlk Yağmur (müzik başlar)
- [ses: yağmur]
- **Mehmet (iç ses):** Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor, ikisi de ıslak ama önemsemiyor, ikisi de susuyor.
- **Muhtar:** En son gençliğimizde böyle durmuştuk, hatırlıyor musun?
- **Rıza Amca:** Hatırlıyorum. Sonra güç bela motoru aldım, sen de kâğıtlar düzgün değil diye peşime düştün.
- **Muhtar:** Kaç kere geldim kapına. "Rıza, bu iş böyle olmaz." "Rıza, ölçüsüz, habersiz çalıştırma, başına bir iş açacaksın."
- **Rıza Amca:** Ben de her seferinde "belgem var" dedim. Kapıyı yüzüne kapattım. Evleneceğim için para lazımdı, başka türlü kazanamam sandım.
- **Muhtar:** Bir yıl böyle gitti, aramız da iyice açıldı. Sonunda dayanamadım, şikâyet yazdım.
- **Rıza Amca:** Bütün köy duydu. Ona içerledim, kendi kendime yedirdim belki ama sonradan çok utandım, hata ettim.
- **Muhtar:** Haklıydım belki. Ama seni kaybetmeye değmezdi. Belki başka yol göstersem anlaşırdık.
- **Rıza Amca:** *(güler)* Benim inadım da değmezdi. Çekindim anlatmaya, pek konuşkan değilim, bilirsin.
- *(A3 iletildiyse)* **Rıza Amca:** *(Mehmet'e bakar)* Oluğu bana bu çocuk hatırlattı. Biraz da babasını anımsatıyor baksana...
- *(su götürüldüyse)* **Rıza Amca:** *(Mehmet'i gösterir)* Kuyuda sıraya geldim, önümü kapattılar, bana bidon getiren tek bu çocuk oldu. Babası da böyle bize su getirirdi. Biz hatamızdan döndük, daha geç olmadı, ama dünya böyle giderse Mehmet'in çocuğu su taşıyabilir mi emin değilim.
- **Zeynep Öğretmen:** Bir yağmurla bu sarnıç dolmaz. Yıllarca çektik, yıllarca bekleyeceğiz. Sorumsuz davrandık ama yetiştik, bir daha böyle şansımız olmayabilir. 
- [sahne: avlu]
- **Ekran:** Köy çeşmesinden ilk damla.
- **Mehmet (iç ses):** Az. Ama akıyor.
- *(A1 iletildiyse)* **Mehmet (iç ses):** Rıza Amca sarnıcın yanına bir söğüt dalı dikmiş.
- *(A2 iletildiyse)* **Mehmet (iç ses):** Öğretmen kuyuyu ölçerken ipi artık Rıza Amca tutuyor.
- *(keçi ≥5)* **Mehmet (iç ses):** {keci} sabah sağıldı. Annem peynir mayalıyor.
- *(keçi <5)* **Mehmet (iç ses):** {keci} ayağa kalktı. Yavaş yavaş toparlanıyor.
- *(ev düşükse)* **Mehmet (iç ses):** Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.
- *(kiler boşsa)* **Mehmet (iç ses):** Sofra hâlâ yoksul. Bu sabah kapıya bir tas bulgur bırakmışlar. Kimin bıraktığını sormadık.
- *(anne gece kuyuya indiyse)* **Mehmet (iç ses):** Annem artık geceleri kuyuya inmiyor. O geceleri hiç konuşmadık.
- **Mehmet (iç ses):** Pencere önündeki sardunya yeni yaprak vermiş. Annem hâlâ suyunu sormadı.
- [ses: kapı]
- **Baba:** (Heyecanlı ve hüzünlü bir sesle) Bugün yetişemeyeceğim sandım, sizi çok özledim.
- **Mehmet (iç ses):** Koştum, sarılıp gözlerimi kapattım. Bir şey diyemedim. Annem kardeşimi ona uzattı.
- **Baba:** Kocaman olmuşsunuz, iyi bakmışsın annene, Mehmet, koca adam olmuşsun. {keci} nasıl?
- *(keçi ≥5)* **Mehmet:** (Gururlu bir tebessümle) Süt veriyor, önceki haftalardan çok daha iyi, baba. Gel görmeye gidelim.
- *(keçi <5)* **Mehmet:** (Gururlu ama buruk bir tebessümle) Ayağa kalktı ama hâlâ zayıf, baba. Ağılda duruyor.
- **Baba:** Muhtar anlattı. Rıza'nın kapısına gitmişsin.
- **Mehmet:** Biri gitmeliydi, biri denemeliydi.
- **Baba:** Ben gidemedim. Yıllarca duvar duvara oturduk, birkaç kez kovdu diye gidemedim.
- **Mehmet (iç ses):** Babam gittiği şehirde düzgün bir iş bulamamış. Ama köyde iş var artık, tarlamızı az da olsa ekebileceğiz.
- [ses: bebeğin gülmesi]
- **Ekran:** Zor ama birlikte kaldık, geç kalsaydık ne biz kalacaktık ne de insanlığımız.

## Kötü son
- **Kart:** Oylamadan birkaç hafta sonra
- **Kart:** Ekim - Kolay Kararlar Zor Sonuçlar (müzik başlar)
- [sahne: avlu]
- *(komşu ikna edildiyse)* **Ekran:** Plan kabul edildi. Ama kuyu artık çok aşağılara inmişti.
- **Ekran:** Eylülde köy kuyusu dibini gösterdi.
- *(komşu ikna edilmediyse)* **Mehmet (iç ses):** Rıza Amca'nın motoru da o hafta sustu. Çünkü çekecek su kalmamıştı.
- **Anne:** Kamyon gelmiş. Eşyalar hazır mı?
- **Mehmet (iç ses):** Babam zor da olsa gittiği şehirde bir oda bulmuş. Hepimiz oraya gideceğiz.
- **Mehmet (iç ses):** Yol parası lazımdı. En iyi arkadaşımın ipini pazarcıya kendim uzattım. {keci} dönüp baktı. Ben bakamadım.
- **Mehmet (iç ses):** Annem sardunyayı pencerede bıraktı. Bir şey demedi. Belki köydeki umutlarını o çiçeğe bağlamıştı, köyle beraber umutlarımız da geride kaldı.
- *(ev düşükse)* **Mehmet (iç ses):** Annem günlerdir konuşmuyor. Bizim için endişeleniyor, kendisi de hiç iyi değil. Kardeşimin ağlamaları kesilmedi.
- *(kiler boşsa)* **Mehmet (iç ses):** Son günlerde sofrada ekmekten başka bir şey yoktu. Ben alıştım ama kardeşim daha ekmek yiyemiyor. Annem de iyi beslenemiyor...
- [sahne: koy_cikisi]
- [ses: kamyon motoru; bebeğin ağlaması kamyonla birlikte uzaklaşarak söner]
- **Mehmet (iç ses):** Fatma Teyze'yle Hasan Amca kapının önündeydi. El salladılar bize. Onlar gitmiyor. Nereye gitsinler köyden başka bir evleri yok?
- *(su götürüldüyse)* **Mehmet (iç ses):** Rıza Amca yol kenarındaydı, elinde bizim bidon. Kamyon geçerken başını eğdi.
- **Mehmet (iç ses):** Kardeşim ağlamaktan yoruldu; kamyon sallandıkça annemin kucağında uyudu.
- **Mehmet (iç ses):** Uzaktan şehir gözükmeye başladı. Dumanın altında karanlık ve gri.
- **Mehmet (iç ses):** Radyoda duydum, 'sıcaklık giderek yükseliyor, tüm dünyada katı önlemler alınacak'. Öğretmenim bize aylar önce söyledi ama dünyanın bile haberi yok muymuş anlaşılan. 
- **Mehmet (iç ses):** Babam otogarda bekleyecekmiş. "Her şey yoluna girecek" dedi telefonda. Sesi yine yorgundu. Bu sefer yalan söylediğini anladım.
- **Kart (büyük):** İlk yağmur
- [sahne: sarnic]
- *(komşu ikna edilmediyse)* **Ekran:** Kırık sarnıca ve boş avluya yağmur yağdı.
- *(komşu ikna edilmediyse)* **Ekran:** Yağmuru tutacak sarnıç kalmamıştı. Artık her şey için çok geç.
- *(ikna edildiyse: plan geçti ama kuyu yetmedi)* **Ekran:** Yarım kalan sarnıca ve boş avluya yağmur yağdı.
- *(ikna edildiyse)* **Ekran:** Köyde onarmayı yapabilecek kimse kalmamıştı. Artık her şey için çok geç.

### Neler eksik kaldı (mantığın ürettiği maddeler)
- **Komşu:** Plan oylamada eşit kaldı; Rıza Amca'yla bağlantı kurulamadı.
- **Kuyu:** Kuyudan çekilen su, yerine gelenden çoktu. Kuyu toparlanamayacak kadar düştü.
- **Geç ölçüm:** Öğretmenin ölçümü muhtara geç ulaştı; plan geç ve zayıf kuruldu.

## Final metni
Metin js/dil.js'te (finalBaslik, finalVeri, finalAna, finalDunya, finalMetni, finalKaynak).
- **Düğme:** Tekrar oyna
