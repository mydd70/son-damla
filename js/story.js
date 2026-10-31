// story.js – Olaylar ve diyaloglar (veri). Kaynak: taslak/DIYALOGLAR.md. Metin yalnızca burada ve dil.js'te durur.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  // ---------- Koşul yardımcıları ----------
  function olcumYok(d) { return !d.bayraklar.olcumTeslim; }
  function bilmiyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) < 0; }; }
  function biliyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) >= 0; }; }
  function evDusuk(d) { return d.gosterge.ev <= KS.config.EV.dusukUst; }
  function evYuksek(d) { return d.gosterge.ev >= KS.config.EV.yuksekAlt; }
  function evOrta(d) { return !evDusuk(d) && !evYuksek(d); }
  function ciftGun(d) { return d.gun % 2 === 0; }
  function tekGun(d) { return d.gun % 2 === 1; }
  function sonGun(d) { return d.gun === KS.config.GUN_SAYISI; }
  function ve() {
    var kosullar = [].slice.call(arguments);
    return function (d, r) { return kosullar.every(function (k) { return k(d, r); }); };
  }
  function sohbet(d, r) { return r.sohbet; }
  function sohbetDegil(d, r) { return !r.sohbet; }

  // Anne o an işe yarayacak ipucunu verir: önce geciken ölçüm, sonra öğrenilmemiş anılar, sonunda kuyu.
  function anneIpucu(d) {
    if (d.bayraklar.olcumElde && KS.gorevZiyaretiMi(d, 'muhtar')) return 'olcum';
    if (bilmiyor('A1')(d)) return 'nine';
    if (bilmiyor('A3')(d)) return 'dostluk';
    return 'kuyu';
  }
  function ipucu(ad) { return function (d) { return anneIpucu(d) === ad; }; }

  // Ağlama sesi ve yazısı aynı karardan gelsin (KS.gunBaslat sonucu).
  function agliyor(d, r) { return r.aglama; }
  function aglamiyor(d, r) { return !r.aglama; }

  // Argüman anlatımları hem gün olayında hem akşam ziyaretinde kullanılır.
  var A1_SATIRLAR = [
    { kim: 'dede', metin: 'Ah, o dere... Muhtarlığın önünden akardı. Kıyısında koca bir söğüt vardı.' },
    { kim: 'nine', metin: 'Çocuklar yazın hep oradaydı. Rıza\'yla muhtar en önde. Söğüdün dalından suya atlarlardı.' },
    { kim: 'dede', metin: 'Motorlar çoğaldı, dere çekildi. Söğüt de kurudu. Rıza o söğüdü çok severdi.' },
    { kim: 'ekran', metin: 'Defter: "Rıza Amca\'nın söğüdü" (komşuya söylenebilir).' }
  ];
  var A2_SATIRLAR = [
    { kim: 'ogretmen', metin: 'Yeraltı suyu çekildikçe toprağın altında boşluklar kalıyor. Bir gün tavan çöküyor.' },
    { kim: 'ogretmen', metin: 'Ovada yüzlerce obruk var artık. Bir de motorların en çok çalıştığı tarlalar...' },
    { kim: 'mehmet', metin: 'Rıza Amca\'nın tarlası gibi mi?' },
    { kim: 'ogretmen', metin: '(cevap vermez, ipi sarar)' },
    { kim: 'ekran', metin: 'Defter: "Obruk uyarısı" (komşuya söylenebilir).' }
  ];
  var A3_SATIRLAR = [
    { kim: 'muhtar', metin: '(uzun süre susar) Biz Rıza\'yla askere beraber gittik. Döndüğümüzde o sarnıcın oluğunu beraber çaktık.' },
    { kim: 'muhtar', metin: 'Kuraklık yılıydı, seksen dokuz. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı, Rıza.' },
    { kim: 'muhtar', metin: 'Sonra motorlar geldi, laflar uzadı. Sonra... olan oldu. Neyse.' },
    { kim: 'ekran', metin: 'Defter: "Muhtarla Rıza Amca\'nın sarnıcı" (komşuya söylenebilir).' }
  ];

  KS.GUN_KARTLARI = [
    { metin: 'Ağustos 2025. Konya Ovası.' },
    { metin: 'Gün 2 – Sıcak, rüzgârsız.' },
    { metin: 'Gün 3 – Kuyu başında erken bir sıra.' },
    { metin: 'Gün 4 – Mehmet bahçede çalıştı.' },
    { metin: 'Gün 5 – Tepeye çıkan yol tozlu.' },
    { metin: 'Gün 6 – Muhtarlıkta toplantı var.' },
    { metin: 'Gün 7 – Köy sessiz.' },
    { metin: 'Gün 8 – Sıcak dalgası.' },
    { metin: 'Gün 9 – Cuma. Köy toplantısı.' }
  ];

  KS.OLAYLAR = [
    // ---------- Gün olayları ----------
    { id: 'g1_acilis', gun: 1, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Kardeşim yine erkenden uyandı. Herkes uyandı yani.' },
      { kim: 'ic', metin: '{keci} ağılda yatıyor. Kalkmaya çalışıyor, kalkamıyor.' },
      { kim: 'anne', metin: 'Dün akşamdan beri böyle. Susuzluktan halsiz.' },
      { kim: 'mehmet', metin: 'Veteriner çağırsak?' },
      { kim: 'anne', metin: 'Veterinere para yok oğlum. Su lazım, biraz da ilgi.' },
      { kim: 'anne', metin: 'Kuyudan her eve günlük pay veriyorlar. Her gün biraz daha azalıyor.' },
      { kim: 'mehmet', metin: 'Baban aradı mı?' },
      { kim: 'anne', metin: 'Aramadı. Şehirde iş bulursa arayacak.' },
      { kim: 'anne', metin: '(bir süre susar) Bu böyle gitmez, Mehmet. Herkes kendi kovasını dolduruyor, kuyu kimsenin değilmiş gibi.' },
      { kim: 'ic', metin: 'Bir yolu olmalı. Köyün hepsi birden bir şey yapsa?' }
    ] },
    { id: 'g1_tanima', gun: 1, dilim: 'ogle', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ic', metin: 'Kuyu başı yine kalabalık. Bidonlar sıra sıra.' },
      { kim: 'koylu', metin: 'Eskiden bir kovada yeterdi. Şimdi ip uzadıkça uzuyor.' },
      { kim: 'ic', metin: 'Kuyudaki suyun ne kadar kaldığını kimse bilmiyor. Bilse de söylemiyor.' },
      { kim: 'ekran', metin: 'Köy kuyusunun seviyesi ekranın kenarında. Her gün biraz iner.' }
    ] },
    { id: 'g2_grisu', gun: 2, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Leğendeki suyu dökme. Bulaşık suyunu da.' },
      { kim: 'mehmet', metin: 'Kirli o.' },
      { kim: 'anne', metin: 'Domatesler kirli mirli bakmaz. Ninen de böyle yapardı.' },
      { kim: 'ekran', metin: 'Artık evde kullanılan suyun bir kısmı bahçeye dönüyor.' }
    ] },
    { id: 'g2_yaslicift', gun: 2, dilim: 'ogle', mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Gel bakalım, Mehmet. Gölgeye otur. Gölge dediysem, çardağın gölgesi de kurudu ya.' },
      { kim: 'dede', metin: 'Bu asma kırk yıl üzüm verdi. İki yazdır yaprak bile zor tutuyor.' },
      { kim: 'mehmet', metin: 'Dede, eskiden de böyle kurak olur muydu?' },
      { kim: 'dede', metin: 'Kurak yıllar olurdu. Ama yeraltı dolardı, kuyuya on metre ip yeterdi.' },
      { kim: 'nine', metin: 'Sen bu tohumları al. Annen ekmesin, sen ek. Bunlar bizim köyün tohumu, az suyla yetinir.' },
      { kim: 'ekran', metin: 'Dayanıklı tohum alındı. Bahçe artık daha az su istiyor.' },
      { kim: 'dede', metin: 'Bir de köyün yukarısında eski bir sarnıç var. Yağmur suyunu toplardık. Kimse bakmadı, yıkıldı gitti.' }
    ], secenekler: [
      { metin: 'Dere ne zaman kurudu, dede?', etkiler: { arguman: 'A1' }, sonraki: 'g2_a1' },
      { metin: 'Teşekkürler, Nine. Annem bekler.' }
    ] },
    { id: 'g2_a1', satirlar: A1_SATIRLAR },
    { id: 'g3_olcum', gun: 3, dilim: 'sabah', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ogretmen', metin: 'Mehmet, tut şu ipin ucunu. Bırakma ama.' },
      { kim: 'mehmet', metin: 'Ne yapıyorsunuz?' },
      { kim: 'ogretmen', metin: 'Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.' },
      { kim: 'ogretmen', metin: '(ipi işaretler) Bir ayda neredeyse bir buçuk metre inmiş.' },
      { kim: 'mehmet', metin: 'Bu çok mu?' },
      { kim: 'ogretmen', metin: 'Bu hızla giderse kış gelmeden kuyu boşa döner.' },
      { kim: 'ogretmen', metin: 'Bunu muhtara götürmek lazım. Benden duyunca "öğretmen hanım yine hesap yapmış" diyor. Senin elinden alsın.' },
      { kim: 'ogretmen', metin: '(kâğıdı katlayıp uzatır) Al. Cebinden düşürme.' },
      { kim: 'ekran', metin: 'Defter: "Öğretmenin ölçümünü muhtara götür (gün {sonGun} akşamına kadar)."' }
    ], secenekler: [
      { metin: 'Kuyu tamamen kurursa ne olur?', etkiler: { arguman: 'A2' }, sonraki: 'g3_a2' },
      { metin: 'Tamam, götürürüm.' }
    ] },
    { id: 'g3_a2', satirlar: A2_SATIRLAR },
    { id: 'g4_cicek', gun: 4, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Muhtar kapı kapı dolaşıyor, suyu idareli kullanın diye. Öğretmen hanım da anlatıp duruyormuş.' },
      { kim: 'ic', metin: 'Annemin pencere önündeki sardunyası. Kurumak üzere.' },
      { kim: 'anne', metin: 'Ona su verme, boş ver.' },
      { kim: 'mehmet', metin: '(bardağın dibindeki suyu döker)' },
      { kim: 'anne', metin: '(gülümser, bir şey demez)' }
    ] },
    { id: 'g4_hatirlatma', gun: 4, dilim: 'aksam', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Öğretmen hanım bir kâğıt vermiş sana, muhtara götürdün mü?' }
    ] },
    { id: 'g5_baba', gun: 5, dilim: 'sabah', mekan: 'tepe', satirlar: [
      { kim: 'ic', metin: 'Telefon yalnızca tepede çekiyor. Babam bugün arayacağım demişti.' },
      { kim: 'baba', ses: 'telefon', metin: 'Mehmet? Sesin geliyor mu?' },
      { kim: 'mehmet', metin: 'Geliyor baba! Ne zaman geleceksin?' },
      { kim: 'baba', metin: 'İnşaatta bir iş var, belki... Annen nasıl? {keci} nasıl?' },
      { kim: 'mehmet', metin: '{keci} hasta. Kuyu da azalıyor. Öğretmen ölçtü.' },
      { kim: 'baba', metin: 'Sen muhtarla konuş. O adamı bir tek muhtar...' },
      { kim: 'ic', ses: 'hat_kesilir', metin: 'Kesildi. "O adam" kim?' }
    ] },
    { id: 'g5_hatirlatma', gun: 5, dilim: 'sabah', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'O kâğıt hâlâ cebinde mi? Muhtar akşamları muhtarlıkta olur.' }
    ] },
    { id: 'g6_plan', gun: 6, dilim: 'ogle', mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Öğretmen hanımla oturduk, bir yol çizdik. Sen de dinle, senin sayende.' },
      { kim: 'ogretmen', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Eski sarnıcı onarıyoruz, yağmur gelince boşa akmasın.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Kuyulara sayaç, motorlara saat. Herkes ne çektiğini bilecek.' },
      { kim: 'ogretmen', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Sulama sabah erken ya da gece. Toprağın üstü saman ya da otla örtülecek, buharlaşmasın.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Hepsini cuma günü köy toplantısında oylayacağız.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'zayif'; }, metin: 'Öğretmen hanım ölçümünü getirdi sonunda. Keşke daha önce görseydim.' },
      { kim: 'ogretmen', kosul: function (d) { return d.plan === 'zayif'; }, metin: 'Sarnıç, sayaç, sulama saatleri... Elimizden geleni yazdık.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'zayif'; }, metin: 'Geç kaldık ama. Kuyu bu arada epey indi.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'zayif'; }, metin: 'Cuma günü köy toplantısında oylayacağız.' },
      { kim: 'muhtar', metin: 'Rıza\'nın motoru durmazsa hiçbiri yetmez. O da kimseyi dinlemez.' }
    ], secenekler: [
      { metin: 'Rıza Amca\'yla neden konuşmuyorsunuz?', kosul: bilmiyor('A3'), etkiler: { arguman: 'A3' }, sonraki: 'g6_a3' },
      { metin: 'Ben de yardım ederim.' }
    ] },
    { id: 'g6_a3', satirlar: A3_SATIRLAR },
    { id: 'g7_komsu', gun: 7, dilim: 'sabah', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ic', metin: 'Rıza Amca kuyu başında. Kendi kuyusu varken buraya ne işi var?' },
      { kim: 'komsu', metin: 'Ne bakıyorsun? Motor arıza yaptı, bir kova alıp gideceğim.' }
    ] },
    { id: 'g8_sabah', gun: 8, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ekran', metin: 'Sıcak dalgası. Gölgede kırk derece.' },
      { kim: 'anne', metin: 'Bugün dışarıda fazla kalma.' }
    ] },
    { id: 'g8_obruk', gun: 8, dilim: 'ogle', mekan: 'komsu_tarlasi', mekanSecenek: function () { return { obruk: true }; }, satirlar: [
      { kim: 'ic', ses: 'gurultu', metin: 'Rıza Amca\'nın tarlası... Toprak yarılmış. Kocaman bir çukur.' },
      { kim: 'komsu', metin: '(çukurun kenarında, eli titreyerek) Dün burada pancar vardı.' },
      { kim: 'komsu', metin: 'Kırk yıldır bu toprağı sürüyorum. Kırk yıl!' },
      { kim: 'mehmet', metin: 'Rıza Amca, uzak durun, kenarı çöküyor.' },
      { kim: 'komsu', metin: '(geri çekilir, oturur) Motor şuradaydı. Bir metre öteye düşseydi...' }
    ] },
    { id: 'g9_toplanti', gun: 9, dilim: 'aksam', mekan: 'muhtarlik', mekanSecenek: function () { return { toplanti: true }; }, satirlar: [
      { kim: 'muhtar', metin: 'Hepiniz biliyorsunuz neden toplandığımızı. Kuyu iniyor. Öğretmen hanım ölçtü, ben de gördüm.' },
      { kim: 'ogretmen', metin: 'Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve gece yapılacak.' },
      { kim: 'koylu', metin: 'Sayaç masrafını kim ödeyecek?' },
      { kim: 'koylu', metin: 'Benim tarlam kurursa çocuklarıma ne yediririm?' },
      { kim: 'muhtar', metin: 'Oylayalım. Kabul edenler...' },
      { kim: 'ekran', metin: '(eller kalkar) Yarısı evet. Yarısı hayır.' },
      { kim: 'ic', metin: 'Herkes dönüp Rıza Amca\'ya bakıyor.' },
      { kim: 'komsu', kosul: function (d) { return d.komsu.ikna; }, metin: '(ağır ağır ayağa kalkar) Benim tarlam çöktü. Bir sonraki kimin tarlası? (elini kaldırır) Ben de varım. Motorum da sayaç taksın.' },
      { kim: 'muhtar', kosul: function (d) { return d.komsu.ikna; }, metin: '(bir an Rıza\'ya bakar, başını sallar)' },
      { kim: 'komsu', kosul: function (d) { return !d.komsu.ikna; }, metin: 'Benim belgem var. Kimse bana ne kadar su çekeceğimi söyleyemez. (çıkıp gider)' }
    ] },

    // ---------- Gün 1 öğreticileri ----------
    { id: 'ogretici_dagitim', satirlar: [
      { kim: 'ekran', metin: 'Bugünkü payımız: {pay} damla. Evin, keçinin ve bahçenin ihtiyacı daha fazla.' },
      { kim: 'ekran', metin: 'Kime ne kadar vereceğine sen karar ver. Yetmeyen gösterge düşer.' },
      { kim: 'ekran', metin: '"Kuyudan fazladan çek" düğmesi {fazla} damla daha verir. Ama kuyu bundan etkilenir.' }
    ] },
    { id: 'ogretici_keci', satirlar: [
      { kim: 'ekran', metin: '{keci} seni bekliyor: sırtını tara, su kabını göster, yemini ver.' }
    ] },
    { id: 'ogretici_harita', satirlar: [
      { kim: 'ekran', metin: 'Akşamları bir eve uğrayabilir ya da ailenle vakit geçirebilirsin.' },
      { kim: 'ekran', metin: 'Haritada gitmek istediğin yere dokun.' }
    ] },

    // ---------- Sabah durum satırları (her sabah, gün 1 hariç) ----------
    { id: 'sabah_durum', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: ve(evDusuk, aglamiyor), metin: 'Annem gece yine uyumadı, sesinden anlıyorum.' },
      { kim: 'ic', kosul: ve(evDusuk, agliyor), metin: 'Kardeşim ağlıyor, annemin sesi kısık.' },
      { kim: 'ic', kosul: ve(evOrta, tekGun), metin: 'Güneş daha doğmadan sıcak. Bugün de uzun bir gün.' },
      { kim: 'ic', kosul: ve(evOrta, ciftGun), metin: 'Kuyu başındaki sıraya erken gitmeliyim.' },
      { kim: 'ic', kosul: evYuksek, metin: 'Annem mutfakta türkü mırıldanıyor. Ne zamandır duymamıştım.' },
      { kim: 'anne', kosul: function (d, r) { return r.ilkSut; }, metin: '{keci} bu sabah süt verdi! Az ama verdi.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci <= KS.config.KECI.cokDusuk; }, metin: '{keci} bugün de yemine bakmadı bile.' }
    ] },

    // ---------- Akşam başı: anne ipucu (ev yüksekse) ----------
    { id: 'anne_ipucu', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: ipucu('dostluk'), metin: 'Rıza Amca\'yla muhtar eskiden can ciğerdi. Ne oldu bilmiyorum.' },
      { kim: 'anne', kosul: ipucu('nine'), metin: 'Fatma Nine\'yi ziyaret et. Yaşlılar konuşacak birini arıyor.' },
      { kim: 'anne', kosul: ipucu('olcum'), metin: 'Öğretmen hanım akıllı kadın. Ama muhtar laftan çok kâğıda inanır.' },
      { kim: 'anne', kosul: ipucu('kuyu'), metin: 'Kuyudan fazla çekmek kolay. Yarın yine çekersin, öbür gün yine. Sonra?' }
    ] },

    // ---------- Öğle eylemleri (id: ogle_<eylem>) ----------
    { id: 'ogle_komsuyaSu', mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'mehmet', metin: 'Annem gönderdi, iki bidon su.' },
      { kim: 'komsu', metin: 'Benim kuyum var. (bidonları yine de alır) Otur, bir çay iç.' },
      { kim: 'ekran', kosul: function (d) { return !sonGun(d); }, metin: 'Yarınki paydan {maliyet} damla eksilecek.' }
    ] },
    { id: 'ogle_bahceEkIs', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Toprağın üstünü kuru otla örttüm. Öğretmen öyle demişti, su buharlaşmasın diye.' }
    ] },
    { id: 'ogle_evdeYardim', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Bebeği salladım, annem biraz uyudu.' }
    ] },
    { id: 'ogle_babayiAra', mekan: 'tepe', satirlar: [
      { kim: 'baba', metin: 'Mehmet! Ben iyiyim, iş arıyorum. Anneni öp benim yerime.' }
    ] },
    { id: 'ogle_camur', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Leğenin dibindeki çamura ayaklarımı soktum. Kardeşim görüp kahkaha attı. Annem kızmadı.' }
    ] },

    // ---------- Akşam ziyaretleri (ziyaret: kim). Koşulu tutanlar sırayla oynar. ----------
    { id: 'sohbet_yasliCift', ziyaret: 'yasliCift', kosul: sohbet, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Mehmet! Gel oğlum, annen nasıl? Bebek uyuyor mu geceleri?' },
      { kim: 'mehmet', metin: 'Uyuyor Nine, biraz.' },
      { kim: 'dede', metin: 'Sıcağa dayanamaz o yaşta. Sen de dayanma, otur bir su iç. Az iç ama.' },
      { kim: 'ic', metin: 'Kaç yaşındalar bilmiyorum. Bu köyde en çok zaman geçiren onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.' }
    ] },
    { id: 'sohbet_muhtar', ziyaret: 'muhtar', kosul: sohbet, mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', metin: 'Hayırdır Mehmet? Annen bir şey mi istedi?' },
      { kim: 'mehmet', metin: 'Yok muhtar amca, öyle uğradım.' },
      { kim: 'muhtar', metin: 'İyi etmişsin. Selam söyle eve.' },
      { kim: 'ic', metin: 'Köyde bir kâğıt işi mi var, önce bu kapı çalınır. Kimseye sesini yükseltmez, kimse de ona kolay kolay hayır demez. Rıza Amca hariç.' }
    ] },
    { id: 'sohbet_ogretmen', ziyaret: 'ogretmen', kosul: sohbet, mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', metin: 'Mehmet, tatilde okulun yolunu unutmamışsın.' },
      { kim: 'mehmet', metin: 'Geçiyordum öğretmenim.' },
      { kim: 'ogretmen', metin: 'Geçerken bir kitap da al o zaman. Geri getirmeyi unutma.' },
      { kim: 'ic', metin: 'Şehirden geldi, gidenler gibi gitmedi. Yazın bile okulda. Cebindeki deftere her şeyi yazıyor, kuyuyu bile.' }
    ] },
    { id: 'sohbet_komsu', ziyaret: 'komsu', kosul: sohbet, mekan: 'komsu_tarlasi', satirlar: [
      { kim: 'komsu', metin: 'Ne var evlat? Annen mi gönderdi?' },
      { kim: 'mehmet', metin: 'Yok Rıza Amca, geçiyordum.' },
      { kim: 'komsu', metin: 'Geç o zaman.' },
      { kim: 'ic', metin: 'Yalnız yaşıyor. Akşamları evinden motorun sesinden başka ses gelmez. Eskiden bize ceviz verirdi, şimdi selamı bile kısa.' }
    ] },

    { id: 'ziyaret_yasliCift_yardim1', ziyaret: 'yasliCift', kosul: function (d, r) { return r.yardim === 1; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.' }
    ] },
    { id: 'ziyaret_yasliCift_yardim2', ziyaret: 'yasliCift', kosul: function (d, r) { return r.yardim === 2; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Bu son, oğlum. Artık bize de zor yetiyor. Bir daha getiremeyiz, gücenme.' }
    ] },
    { id: 'ziyaret_yasliCift_a1', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, bilmiyor('A1')), mekan: 'yasli_cift_evi', etkiler: { arguman: 'A1' }, satirlar: [
      { kim: 'nine', metin: 'Otur, sana bir şey anlatayım.' }
    ].concat(A1_SATIRLAR) },
    { id: 'ziyaret_yasliCift_iklim', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, biliyor('A1'), function (d, r) { return !r.yardim; }), mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'dede', metin: 'Bizim zamanımızda kar yerde kırk gün kalırdı. Şimdi düştüğü gibi eriyor.' },
      { kim: 'nine', metin: 'Yerin altındaki su, yağmurun ve karın birikimi. Bizim çocukluğumuzdan kalma su bu. Siz ne bırakacaksınız, ona bakın.' }
    ] },

    { id: 'ziyaret_muhtar_olcum', ziyaret: 'muhtar', kosul: function (d, r) { return r.gorev; }, mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', metin: 'Muhtar amca, öğretmen bunu gönderdi. Kuyunun ölçümü.' },
      { kim: 'muhtar', metin: '(kâğıda uzun uzun bakar) Bir buçuk metre ha...' },
      { kim: 'muhtar', metin: 'Ben de içten içe biliyordum. Ama kâğıda yazılınca başka oluyor.' },
      { kim: 'muhtar', metin: 'Öğretmen hanımla oturalım o zaman. Köyün işini köy konuşsun.' },
      { kim: 'ekran', metin: 'Defter: "Ölçüm muhtara ulaştı."' }
    ] },
    { id: 'ziyaret_muhtar_a3', ziyaret: 'muhtar', kosul: ve(sohbetDegil, function (d, r) { return !r.gorev; }, bilmiyor('A3')), mekan: 'muhtarlik', etkiler: { arguman: 'A3' }, satirlar: [
      { kim: 'muhtar', metin: 'Otur Mehmet. Babandan haber var mı?' },
      { kim: 'mehmet', metin: 'Yok. Muhtar amca, siz Rıza Amca\'yla neden konuşmuyorsunuz?' }
    ].concat(A3_SATIRLAR) },
    { id: 'ziyaret_muhtar_genel', ziyaret: 'muhtar', kosul: ve(sohbetDegil, function (d, r) { return !r.gorev; }, biliyor('A3')), mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', metin: 'Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev. Kuyu giderse köy de gider.' }
    ] },

    { id: 'ziyaret_ogretmen_a2', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, bilmiyor('A2')), mekan: 'koy_yolu', etkiler: { arguman: 'A2' }, satirlar: [
      { kim: 'ogretmen', metin: 'Ölçümü düşünüyordum da.' }
    ].concat(A2_SATIRLAR) },
    { id: 'ziyaret_ogretmen_iklim', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, biliyor('A2')), mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', metin: 'Bu kuraklık yalnız bizim köyde değil. Dünyanın her yerinde aynı dert konuşuluyor.' },
      { kim: 'ogretmen', metin: 'Büyük kararları büyükler verecek. Ama kuyudan kaç kova çekeceğimize biz karar veriyoruz.' }
    ] },

    { id: 'ziyaret_komsu', ziyaret: 'komsu', kosul: sohbetDegil, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'komsu', metin: 'Bu saatte kapı çalınmaz, evlat. Gir bakalım, madem geldin.' }
    ] },

    { id: 'aile_vakti', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: evDusuk, metin: 'Otur yanıma. Bir şey yapmasak da olur. (bebeği kucağına verir)' },
      { kim: 'anne', kosul: evOrta, metin: 'Kardeşin bugün sana baktı baktı güldü, biliyor musun?' },
      { kim: 'anne', kosul: evYuksek, metin: 'Baban gelince bu evi görsün. Zor günde dağılmadık.' }
    ] },

    // ---------- Komşuyla karşılaşma ----------
    { id: 'kars_ilk', satirlar: [{ kim: 'komsu', metin: 'Muhtar mı gönderdi seni? Söyle ona, benim işime karışmasın.' }] },
    { id: 'kars_sonraki', satirlar: [{ kim: 'komsu', metin: 'Yine mi sen? Ne var?' }] },
    { id: 'kars_bos', satirlar: [
      { kim: 'ic', metin: 'Ne desem bilemedim. Önce köydekilerle konuşmalıyım.' },
      { kim: 'komsu', metin: 'Söyleyecek bir şeyin yoksa git işine.' }
    ] },
    { id: 'kars_ikna_sonrasi', satirlar: [{ kim: 'komsu', metin: 'Bakarız dedim ya, evlat. Git şimdi.' }] },
    { id: 'kars_ozur', satirlar: [
      { kim: 'komsu', metin: '(homurdanır) Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?' }
    ] },
    { id: 'kars_geri_al', satirlar: [
      { kim: 'komsu', metin: '(derin nefes alır) Bugün kimseyle kavga edecek hâlim yok. Söyle.' }
    ] },
    { id: 'kars_bir_arguman', satirlar: [
      { kim: 'komsu', metin: 'Laf çok, evlat. Bir laf ne değiştirir?' },
      { kim: 'ekran', metin: 'Defter: "Komşuyu ikna et: 1/{gereken}"' }
    ] },
    { id: 'kars_ikna', satirlar: [
      { kim: 'komsu', metin: '(uzun süre susar)' },
      { kim: 'komsu', kosul: function (d) { return !sonGun(d); }, metin: 'Toplantı cuma mı?' },
      { kim: 'mehmet', kosul: function (d) { return !sonGun(d); }, metin: 'Cuma akşamı, muhtarlıkta.' },
      { kim: 'komsu', kosul: sonGun, metin: 'Toplantı bu akşam mı?' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Bu akşam, muhtarlıkta.' },
      { kim: 'komsu', metin: 'Bakarız. (kapıya döner, sonra durur) Bakarız dedim, git şimdi.' },
      { kim: 'ekran', metin: 'Defter: "Komşuyu ikna et" ✓' }
    ] },
    { id: 'ikna_A1_nazik', satirlar: [
      { kim: 'komsu', metin: '(bir an durur) Söğüt... Herkes "Rıza\'nın söğüdü" derdi. (yüzünü çevirir) O dere çoktan gitti.' },
      { kim: 'komsu', metin: 'Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde?' }
    ] },
    { id: 'ikna_A1_kaba', satirlar: [
      { kim: 'komsu', metin: 'Bana bak! Benim belgem var, devletten aldım! Sen kimsin de bana hesap soruyorsun?' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },
    { id: 'ikna_A2_nazik', satirlar: [
      { kim: 'komsu', kosul: function (d) { return d.gun < KS.config.OBRUK_GUNU; }, metin: 'Obruk ovanın öbür ucunda olur. Bizim burada olmaz.' },
      { kim: 'komsu', kosul: function (d) { return d.gun >= KS.config.OBRUK_GUNU; }, metin: '(çukura bakar) Öğretmen söylemişti, değil mi? Ben dinlemedim.' }
    ] },
    { id: 'ikna_A2_kaba', satirlar: [
      { kim: 'komsu', metin: 'Beni korkutacak senin gibi velet mi kaldı? Defol!' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },
    { id: 'ikna_A3_nazik', satirlar: [
      { kim: 'komsu', metin: '(sesi yumuşar) Kırk gün taş taşıdık. Elimizde nasır kaldı. (güler) Muhtar mı anlattı bunu?' },
      { kim: 'komsu', metin: 'O sarnıç yıkıldı. Biz de... neyse.' }
    ] },
    { id: 'ikna_A3_kaba', satirlar: [
      { kim: 'komsu', metin: 'Benimle muhtarın arasına girme! Kimse bilmiyor ne olduğunu!' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },

    // ---------- Ortak ----------
    { id: 'ev_isi', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum.' },
      { kim: 'ic', kosul: tekGun, metin: 'Çamaşır, bulaşık, bebeğin bezi. {keci} bugün bakımsız kaldı.' },
      { kim: 'ic', kosul: ciftGun, metin: 'Çamaşır, bulaşık, bebeğin bezi. Bahçeye bugün bakamadım.' }
    ] },
    { id: 'kuyu_uyari', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ogretmen', kosul: function (d) { return !sonGun(d); }, metin: 'Bu sabah ip yine uzadı. Böyle giderse cumaya kuyu dibi görecek.' },
      { kim: 'ogretmen', kosul: sonGun, metin: 'Bu sabah ip yine uzadı. Akşamki toplantı boşa gitmesin.' }
    ] },

    // ---------- Sonlar ----------
    { id: 'son_iyi_sarnic', mekan: 'sarnic', zaman: 'yagmur', mekanSecenek: function () { return { onarildi: true }; }, satirlar: [
      { kim: 'ekran', ortam: 'yagmur', metin: 'Ekim. İlk yağmur.' },
      { kim: 'ic', metin: 'Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor, ikisi de ıslak, ikisi de susuyor.' },
      { kim: 'muhtar', metin: 'Seksen dokuzda da böyle durmuştuk, hatırlıyor musun?' },
      { kim: 'komsu', metin: 'Hatırlıyorum. Sonra motoru aldım, sen de peşime düştün.' },
      { kim: 'muhtar', metin: 'Kaç kere geldim kapına. "Rıza, saati kıs." "Rıza, gece çalıştırma, kuyu iniyor."' },
      { kim: 'komsu', metin: 'Ben de her seferinde "belgem var" dedim. Kapıyı yüzüne kapattım.' },
      { kim: 'muhtar', metin: 'Bir yıl böyle gitti. Sonunda dayanamadım, şikâyet yazdım.' },
      { kim: 'komsu', metin: 'Bütün köy duydu. Ona içerledim.' },
      { kim: 'muhtar', metin: 'Haklıydım belki. Ama seni kaybetmeye değmezdi.' },
      { kim: 'komsu', metin: '(güler) Benim inadım da değmezdi.' }
    ] },
    { id: 'son_iyi_ev', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: true }; }, satirlar: [
      { kim: 'ekran', ortam: null, metin: 'Köy çeşmesinden ilk damla.' },
      { kim: 'ic', metin: 'Az. Ama akıyor.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci >= KS.config.KECI.sutEsigi; }, metin: '{keci} sabah sağıldı. Annem peynir mayalıyor.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci < KS.config.KECI.sutEsigi; }, metin: '{keci} ayağa kalktı. Yavaş yavaş toparlanıyor.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.kiler === 0; }, metin: 'Sofra hâlâ yoksul. Ama artık köyce paylaşıyoruz.' },
      { kim: 'baba', ses: 'kapi', metin: 'Ben geldim.' },
      { kim: 'ic', metin: 'Babam şehirde iş bulamamış. Ama köyde iş var artık. Sarnıç, borular, sayaçlar.' },
      { kim: 'ekran', ses: 'bebek_gul', metin: 'Zor ama birlikte kaldık.' }
    ] },
    { id: 'son_kotu_avlu', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: false }; }, satirlar: [
      { kim: 'ekran', kosul: function (d) { return d.komsu.ikna; }, metin: 'Plan kabul edildi. Ama kuyuya yetişemedi.' },
      { kim: 'ekran', metin: 'Ekim.' },
      { kim: 'anne', metin: 'Kamyon gelmiş. Eşyalar hazır mı?' },
      { kim: 'ic', metin: 'Keçimiz {keci} pazarda satıldı. Yol parası lazımdı.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem günlerdir konuşmuyor.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.kiler === 0; }, metin: 'Son günlerde sofrada ekmekten başka bir şey yoktu.' }
    ] },
    { id: 'son_kotu_yol', mekan: 'koy_cikisi', zaman: 'ogle', satirlar: [
      { kim: 'ic', sesSoner: ['kamyon', 'bebek_agla'], metin: 'Fatma Nine\'yle Hasan Dede kapının önündeydi. El salladılar. Onlar gitmiyor. Nereye gitsinler?' },
      { kim: 'ic', metin: 'Uzakta şehir. Dumanın altında.' }
    ] },
    { id: 'son_kotu_sarnic', mekan: 'sarnic', zaman: 'yagmur', satirlar: [
      { kim: 'ekran', ortam: 'yagmur', metin: 'Ekim. İlk yağmur.' },
      { kim: 'ekran', metin: 'Kırık sarnıca ve boş avluya yağmur yağdı.' },
      { kim: 'ekran', metin: 'İş işten geçti.' }
    ] }
  ];

  KS.SONLAR = {
    iyi: ['son_iyi_sarnic', 'son_iyi_ev'],
    kotu: ['son_kotu_avlu', 'son_kotu_yol', 'son_kotu_sarnic']
  };

  // Komşuya söylenecekler: her argümanın iki tonu. Sıra bilerek karışık; nazik hep önde olmasın.
  KS.IKNA_SECENEK = {
    A1: [
      { ton: 'nazik', metin: 'Hasan Dede anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.' },
      { ton: 'kaba', metin: 'Dereyi de sizin motorlar kuruttu zaten.' }
    ],
    A2: [
      { ton: 'kaba', metin: 'Böyle çekmeye devam ederseniz tarlanız çökecek, benden söylemesi.' },
      { ton: 'nazik', metin: 'Öğretmen ölçtü, kuyu bir ayda bir buçuk metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.' }
    ],
    A3: [
      { ton: 'nazik', metin: 'Muhtar amca anlattı. Seksen dokuzda sarnıcın oluğunu beraber çakmışsınız.' },
      { ton: 'kaba', metin: 'Muhtarla küsmüşsünüz, köy sizin yüzünüzden bir araya gelemiyor.' }
    ]
  };
  KS.IKNA_METIN = {
    soru: { kim: 'ic', metin: 'Ne diyeyim?' },
    gec: { metin: '(Bunu açmayayım.)' },
    ozurSoru: { kim: 'ic', metin: 'Geçen sefer ağzımdan çıkanı düzeltmeliyim.' },
    ozur: { metin: 'Geçen sefer kırıcı konuştum, kusura bakmayın.' },
    ozurGec: { metin: '(Bir şey demeyeyim.)' },
    geriAlSoru: { kim: 'ic', metin: 'Bugün olmaz. Onca şeyden sonra bugün olmaz.' },
    geriAl: { metin: 'Dur, öyle demek istemedim. Özür dilerim, Rıza Amca.' },
    geriAlGec: { metin: '(Sus.)' }
  };

  KS.olayGetir = function (id) {
    for (var i = 0; i < KS.OLAYLAR.length; i++) if (KS.OLAYLAR[i].id === id) return KS.OLAYLAR[i];
    console.warn('Olay yok:', id);
    return null;
  };

  // O gün ve dilimde gösterilecek olaylar, tablodaki sırayla.
  KS.olaylariGetir = function (gun, dilim, d) {
    return KS.OLAYLAR.filter(function (o) {
      return o.gun === gun && o.dilim === dilim && (!o.kosul || o.kosul(d));
    });
  };

  // Akşam ziyaretinde oynayacak olaylar. r: KS.aksamZiyaret sonucu.
  KS.ziyaretOlaylari = function (kim, d, r) {
    return KS.OLAYLAR.filter(function (o) { return o.ziyaret === kim && o.kosul(d, r); });
  };

  KS.sonOlaylari = function (iyi) {
    return KS.SONLAR[iyi ? 'iyi' : 'kotu'].map(KS.olayGetir);
  };

  // Yüklenirken çalışır: eksik sonraki hedefi, tanımsız bayrak, eksik karakter, metni olmayan sabit olay.
  KS.storyDogrula = function () {
    var uyarilar = [];
    var ids = KS.OLAYLAR.map(function (o) { return o.id; });
    var bayraklar = KS.yeniDurum().bayraklar;
    function etkiDenetle(kaynak, oge) {
      for (var b in oge.bayraklar || {}) if (!(b in bayraklar)) uyarilar.push(kaynak + ': tanımsız bayrak ' + b);
      var e = oge.etkiler || {};
      if (e.arguman && KS.config.ARGUMANLAR.indexOf(e.arguman) < 0) uyarilar.push(kaynak + ': bilinmeyen argüman ' + e.arguman);
    }
    KS.OLAYLAR.forEach(function (o) {
      o.satirlar.forEach(function (s) {
        if (!KS.KARAKTERLER[s.kim]) uyarilar.push(o.id + ': tanımsız karakter ' + s.kim);
        [s.ses, s.ortam].concat(s.sesSoner || []).forEach(function (id) {
          if (id && !KS.config.SES.liste[id]) uyarilar.push(o.id + ': tanımsız ses ' + id);
        });
      });
      etkiDenetle(o.id, o);
      (o.secenekler || []).forEach(function (sc) {
        if (sc.sonraki && ids.indexOf(sc.sonraki) < 0) uyarilar.push(o.id + ': eksik sonraki ' + sc.sonraki);
        etkiDenetle(o.id, sc);
      });
    });
    KS.config.SABIT_OLAYLAR.forEach(function (o) {
      if (ids.indexOf(o.id) < 0) uyarilar.push('metni olmayan sabit olay: ' + o.id);
    });
    KS.config.ARGUMANLAR.forEach(function (a) {
      ['nazik', 'kaba'].forEach(function (ton) {
        if (ids.indexOf('ikna_' + a + '_' + ton) < 0) uyarilar.push('eksik ikna olayı: ' + a + ' ' + ton);
      });
    });
    Object.keys(KS.SONLAR).forEach(function (s) {
      KS.SONLAR[s].forEach(function (id) { if (ids.indexOf(id) < 0) uyarilar.push('eksik son olayı: ' + id); });
    });
    uyarilar.forEach(function (u) { console.warn('story.js:', u); });
    return uyarilar;
  };
  KS.storyDogrula();
})();

if (typeof module !== 'undefined') module.exports = KS;
