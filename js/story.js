// story.js – Olaylar ve diyaloglar (veri). Aşama 2: kısaltılmış taslak; tam metin Aşama 4'te taslak/DIYALOGLAR.md'den gelir.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  function olcumYok(d) { return !d.bayraklar.olcumTeslim; }

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
      { kim: 'ic', metin: '{keci} ağılda yatıyor. Kalkmaya çalışıyor, kalkamıyor.' },
      { kim: 'anne', metin: 'Dün akşamdan beri böyle. Susuzluktan halsiz.' },
      { kim: 'anne', metin: 'Kuyudan her eve günlük pay veriyorlar. Her gün biraz daha azalıyor.' },
      { kim: 'ic', metin: 'Bir yolu olmalı. Köyün hepsi birden bir şey yapsa?' }
    ] },
    { id: 'g1_tanima', gun: 1, dilim: 'ogle', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ic', metin: 'Kuyu başı yine kalabalık. Bidonlar sıra sıra.' },
      { kim: 'koylu', metin: 'Eskiden bir kovada yeterdi. Şimdi ip uzadıkça uzuyor.' },
      { kim: 'ekran', metin: 'Köy kuyusunun seviyesi ekranın kenarında. Her gün biraz iner.' }
    ] },
    { id: 'g2_grisu', gun: 2, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Leğendeki suyu dökme. Bulaşık suyunu da.' },
      { kim: 'mehmet', metin: 'Kirli o.' },
      { kim: 'anne', metin: 'Domatesler kirli mirli bakmaz. Ninen de böyle yapardı.' },
      { kim: 'ekran', metin: 'Artık evde kullanılan suyun bir kısmı bahçeye dönüyor.' }
    ] },
    { id: 'g2_yaslicift', gun: 2, dilim: 'ogle', mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Sen bu tohumları al. Bunlar bizim köyün tohumu, az suyla yetinir.' },
      { kim: 'ekran', metin: 'Dayanıklı tohum alındı. Bahçe artık daha az su istiyor.' },
      { kim: 'dede', metin: 'Bir de köyün yukarısında eski bir sarnıç var. Kimse bakmadı, yıkıldı gitti.' }
    ], secenekler: [
      { metin: 'Dere ne zaman kurudu, dede?', etkiler: { arguman: 'A1' }, sonraki: 'g2_a1' },
      { metin: 'Teşekkürler, Nine. Annem bekler.' }
    ] },
    { id: 'g2_a1', satirlar: [
      { kim: 'dede', metin: 'Motorlar çoğaldı, dere çekildi. Söğüt de kurudu. Rıza o söğüdü çok severdi.' }
    ] },
    { id: 'g3_olcum', gun: 3, dilim: 'sabah', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ogretmen', metin: 'Bir ayda neredeyse bir buçuk metre inmiş.' },
      { kim: 'ogretmen', metin: 'Bunu muhtara götürmek lazım. Senin elinden alsın.' },
      { kim: 'ekran', metin: 'Görev: Öğretmenin ölçümünü muhtara götür (gün 5 akşamına kadar).' }
    ], secenekler: [
      { metin: 'Kuyu tamamen kurursa ne olur?', etkiler: { arguman: 'A2' }, sonraki: 'g3_a2' },
      { metin: 'Tamam, götürürüm.' }
    ] },
    { id: 'g3_a2', satirlar: [
      { kim: 'ogretmen', metin: 'Yeraltı suyu çekildikçe toprağın altında boşluklar kalıyor. Bir gün tavan çöküyor.' }
    ] },
    { id: 'g4_cicek', gun: 4, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Annemin pencere önündeki sardunyası. Kurumak üzere.' },
      { kim: 'mehmet', metin: '(bardağın dibindeki suyu döker)' },
      { kim: 'anne', metin: '(gülümser, bir şey demez)' }
    ] },
    { id: 'g4_hatirlatma', gun: 4, dilim: 'aksam', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Öğretmen hanım bir kâğıt vermiş sana, muhtara götürdün mü?' }
    ] },
    { id: 'g5_baba', gun: 5, dilim: 'sabah', mekan: 'tepe', satirlar: [
      { kim: 'baba', metin: 'Mehmet? Sesin geliyor mu?' },
      { kim: 'mehmet', metin: 'Geliyor baba! Ne zaman geleceksin?' },
      { kim: 'baba', metin: 'Sen muhtarla konuş. O adamı bir tek muhtar...' },
      { kim: 'ic', metin: 'Kesildi. "O adam" kim?' }
    ] },
    { id: 'g5_hatirlatma', gun: 5, dilim: 'sabah', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'O kâğıt hâlâ cebinde mi? Muhtar akşamları muhtarlıkta olur.' }
    ] },
    { id: 'g6_plan', gun: 6, dilim: 'ogle', mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'guclu'; }, metin: 'Öğretmen hanımla oturduk, bir yol çizdik. Senin sayende.' },
      { kim: 'muhtar', kosul: function (d) { return d.plan === 'zayif'; }, metin: 'Öğretmen hanım ölçümünü getirdi sonunda. Geç kaldık ama.' },
      { kim: 'ogretmen', metin: 'Eski sarnıcı onarıyoruz, kuyulara sayaç takıyoruz.' },
      { kim: 'muhtar', metin: 'Rıza\'nın motoru durmazsa hiçbiri yetmez. Cuma günü köy toplantısında oylayacağız.' }
    ] },
    { id: 'g7_komsu', gun: 7, dilim: 'sabah', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ic', metin: 'Rıza Amca kuyu başında. Kendi kuyusu varken buraya ne işi var?' },
      { kim: 'komsu', metin: 'Ne bakıyorsun? Motor arıza yaptı, bir kova alıp gideceğim.' }
    ] },
    { id: 'g8_sabah', gun: 8, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ekran', metin: 'Sıcak dalgası. Gölgede kırk derece.' },
      { kim: 'anne', metin: 'Bugün dışarıda fazla kalma.' }
    ] },
    { id: 'g8_obruk', gun: 8, dilim: 'ogle', mekan: 'komsu_tarlasi', mekanSecenek: function () { return { obruk: true }; }, satirlar: [
      { kim: 'ic', metin: 'Rıza Amca\'nın tarlası... Toprak yarılmış. Kocaman bir çukur.' },
      { kim: 'komsu', metin: 'Dün burada pancar vardı. Kırk yıldır bu toprağı sürüyorum!' }
    ] },
    { id: 'g9_toplanti', gun: 9, dilim: 'aksam', mekan: 'muhtarlik', mekanSecenek: function () { return { toplanti: true }; }, satirlar: [
      { kim: 'muhtar', metin: 'Hepiniz biliyorsunuz neden toplandığımızı. Oylayalım.' },
      { kim: 'ekran', metin: 'Yarısı evet. Yarısı hayır.' },
      { kim: 'ic', metin: 'Herkes dönüp Rıza Amca\'ya bakıyor.' },
      { kim: 'komsu', kosul: function (d) { return d.komsu.ikna; }, metin: 'Benim tarlam çöktü. Bir sonraki kimin tarlası? Ben de varım.' },
      { kim: 'komsu', kosul: function (d) { return !d.komsu.ikna; }, metin: 'Benim belgem var. Kimse bana ne kadar su çekeceğimi söyleyemez.' }
    ] },

    // ---------- Öğle eylemleri (id: ogle_<eylem>) ----------
    { id: 'ogle_komsuyaSu', mekan: 'komsu_tarlasi', satirlar: [
      { kim: 'mehmet', metin: 'Annem gönderdi, iki bidon su.' },
      { kim: 'komsu', metin: 'Benim kuyum var. (bidonları yine de alır) Otur, bir çay iç.' }
    ] },
    { id: 'ogle_bahceEkIs', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Toprağın üstünü kuru otla örttüm. Su buharlaşmasın diye.' }
    ] },
    { id: 'ogle_evdeYardim', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Bebeği salladım, annem biraz uyudu.' }
    ] },
    { id: 'ogle_babayiAra', mekan: 'tepe', satirlar: [
      { kim: 'baba', metin: 'Mehmet! Ben iyiyim, iş arıyorum. Anneni öp benim yerime.' }
    ] },
    { id: 'ogle_camur', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Leğenin dibindeki çamura ayaklarımı soktum. Kardeşim görüp kahkaha attı.' }
    ] },

    // ---------- Akşam (id: ziyaret_<kim>) ----------
    { id: 'ziyaret_yasliCift', mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', kosul: function (d, r) { return r.yardim === 1; }, metin: 'Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.' },
      { kim: 'nine', kosul: function (d, r) { return r.yardim === 2; }, metin: 'Bu son, oğlum. Artık bize de zor yetiyor. Bir daha getiremeyiz, gücenme.' },
      { kim: 'dede', kosul: function (d, r) { return !r.yardim; }, metin: 'Bizim zamanımızda kar yerde kırk gün kalırdı. Şimdi düştüğü gibi eriyor.' }
    ] },
    { id: 'ziyaret_muhtar', mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', kosul: function (d, r) { return r.gorev; }, metin: 'Muhtar amca, öğretmen bunu gönderdi. Kuyunun ölçümü.' },
      { kim: 'muhtar', kosul: function (d, r) { return r.gorev; }, metin: 'Bir buçuk metre ha... Öğretmen hanımla oturalım o zaman.' },
      { kim: 'muhtar', kosul: function (d, r) { return !r.gorev; }, metin: 'Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev. Kuyu giderse köy de gider.' }
    ] },
    { id: 'ziyaret_ogretmen', mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', metin: 'Büyük kararları büyükler verecek. Ama kuyudan kaç kova çekeceğimize biz karar veriyoruz.' }
    ] },
    { id: 'ziyaret_komsu', mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'komsu', metin: 'Bu saatte kapı çalınmaz, evlat. Gir bakalım, madem geldin.' }
    ] },
    { id: 'aile_vakti', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Otur yanıma. Bir şey yapmasak da olur.' }
    ] },

    // ---------- Ortak ----------
    { id: 'karsilasma', satirlar: [
      { kim: 'ic', metin: 'Ne desem bilemedim. Önce köydekilerle konuşmalıyım.' },
      { kim: 'komsu', metin: 'Söyleyecek bir şeyin yoksa git işine.' }
    ] },
    { id: 'ev_isi', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum.' },
      { kim: 'ic', kosul: function (d) { return d.gun % 2 === 1; }, metin: 'Çamaşır, bulaşık, bebeğin bezi. {keci}\'ye bugün bakamadım.' },
      { kim: 'ic', kosul: function (d) { return d.gun % 2 === 0; }, metin: 'Çamaşır, bulaşık, bebeğin bezi. Bahçeye bugün bakamadım.' }
    ] },
    { id: 'kuyu_uyari', satirlar: [
      { kim: 'ogretmen', metin: 'Bu sabah ip yine uzadı. Böyle giderse cumaya kuyu dibi görecek.' }
    ] },

    // ---------- Sonlar ----------
    { id: 'son_iyi', mekan: 'sarnic', mekanSecenek: function () { return { onarildi: true }; }, satirlar: [
      { kim: 'ekran', metin: 'Ekim. İlk yağmur.' },
      { kim: 'ic', metin: 'Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor.' },
      { kim: 'ekran', metin: 'Zor ama birlikte kaldık.' }
    ] },
    { id: 'son_kotu', mekan: 'koy_cikisi', satirlar: [
      { kim: 'ic', metin: '{keci}\'yi pazarda sattık. Yol parası lazımdı.' },
      { kim: 'ekran', metin: 'Ekim. İlk yağmur.' },
      { kim: 'ekran', metin: 'Kırık sarnıca ve boş avluya yağmur yağdı.' }
    ] }
  ];

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

  // Yüklenirken çalışır: eksik sonraki hedefi, tanımsız bayrak, eksik karakter, metni olmayan sabit olay.
  KS.storyDogrula = function () {
    var uyarilar = [];
    var ids = KS.OLAYLAR.map(function (o) { return o.id; });
    var bayraklar = KS.yeniDurum().bayraklar;
    KS.OLAYLAR.forEach(function (o) {
      o.satirlar.forEach(function (s) {
        if (!KS.KARAKTERLER[s.kim]) uyarilar.push(o.id + ': tanımsız karakter ' + s.kim);
      });
      (o.secenekler || []).forEach(function (sc) {
        if (sc.sonraki && ids.indexOf(sc.sonraki) < 0) uyarilar.push(o.id + ': eksik sonraki ' + sc.sonraki);
        for (var b in sc.bayraklar || {}) if (!(b in bayraklar)) uyarilar.push(o.id + ': tanımsız bayrak ' + b);
        var e = sc.etkiler || {};
        if (e.arguman && KS.config.ARGUMANLAR.indexOf(e.arguman) < 0) uyarilar.push(o.id + ': bilinmeyen argüman ' + e.arguman);
      });
    });
    KS.config.SABIT_OLAYLAR.forEach(function (o) {
      if (ids.indexOf(o.id) < 0) uyarilar.push('metni olmayan sabit olay: ' + o.id);
    });
    uyarilar.forEach(function (u) { console.warn('story.js:', u); });
    return uyarilar;
  };
  KS.storyDogrula();
})();

if (typeof module !== 'undefined') module.exports = KS;
