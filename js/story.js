// story.js – Olaylar ve diyaloglar (veri). Kaynak: taslak/DIYALOGLAR.md. Metin yalnızca burada ve dil.js'te durur.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  // ---------- Koşul yardımcıları ----------
  function olcumYok(d) { return !d.bayraklar.olcumTeslim; }
  function olcumVar(d) { return d.bayraklar.olcumTeslim; }
  function bilmiyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) < 0; }; }
  function biliyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) >= 0; }; }
  function evDusuk(d) { return d.gosterge.ev <= KS.config.EV.dusukUst; }
  function evYuksek(d) { return d.gosterge.ev >= KS.config.EV.yuksekAlt; }
  function evOrta(d) { return !evDusuk(d) && !evYuksek(d); }
  function ciftGun(d) { return d.gun % 2 === 0; }
  function tekGun(d) { return d.gun % 2 === 1; }
  function sonGun(d) { return d.gun === KS.config.GUN_SAYISI; }
  function sonGunDegil(d) { return !sonGun(d); }
  function gunu(n) { return function (d) { return d.gun === n; }; }
  function obrukOncesi(d) { return d.gun < KS.config.OBRUK_GUNU; }
  function obrukSonrasi(d) { return d.gun >= KS.config.OBRUK_GUNU; }
  function ikna(d) { return d.komsu.ikna; }
  function iknaDegil(d) { return !d.komsu.ikna; }
  function kecidusuk(d) { return d.gosterge.keci < KS.config.KECI.sutEsigi; }
  function keciIyi(d) { return d.gosterge.keci >= KS.config.KECI.sutEsigi; }
  function kilerBos(d) { return d.gosterge.kiler === 0; }
  function fazlaCekildi(d) { return d.su.fazlaCekildi; }
  function sofraBos(d, r) { return r.kilerBos; }   // bu gece yiyecek yoktu (KS.gunBitir sonucu)
  function guclu(d) { return d.plan === 'guclu'; }
  function zayif(d) { return d.plan === 'zayif'; }
  // Tekrarlanan eylemlerde sürümler gün sırasıyla döner.
  function surum(i) { return function (d) { return d.gun % 3 === i; }; }
  function ve() {
    var kosullar = [].slice.call(arguments);
    return function (d, r) { return kosullar.every(function (k) { return k(d, r); }); };
  }
  function sohbet(d, r) { return r.sohbet; }
  function sohbetDegil(d, r) { return !r.sohbet; }
  function gorevDegil(d, r) { return !r.gorev; }

  // Anne ipucunu KS.anneIpucuAl seçer; aynısı iki kez söylenmez.
  function ipucu(ad) { return function (d, r) { return r.ipucu === ad; }; }
  function babaKonustu(d) { return d.gun >= KS.config.BABA_ARAMA_GUNU; }
  function babaKonusmadi(d) { return !babaKonustu(d); }
  // Ek ziyaretlerin metni tekrar etmesin: ziyaret hakkı düştükten sonra kalan sayıya göre.
  function kalanHak(kim, n) { return function (d) { return d.ziyaretKalan[kim] === n; }; }

  // Ağlama sesi ve yazısı aynı karardan gelsin (KS.gunBaslat sonucu).
  function agliyor(d, r) { return r.aglama; }
  function aglamiyor(d, r) { return !r.aglama; }

  // Argüman anlatımları hem gün olayında hem akşam ziyaretinde kullanılır.
  var A1_SATIRLAR = [
    { kim: 'dede', metin: 'Vardı ya. Muhtarlığın önünden akardı. Kıyısında koca bir söğüt vardı.' },
    { kim: 'nine', metin: 'Çocuklar yazın hep oradaydı. Rıza\'yla muhtar en önde. Söğüdün dalından suya atlarlardı.' },
    { kim: 'mehmet', metin: 'Rıza Amca mı? Suya mı atlardı?' },
    { kim: 'dede', metin: '(güler) O da çocuktu bir zaman. Motorlar çoğaldı, dere çekildi, söğüt de kurudu. O ağacı çok severdi.' },
    { kim: 'ic', metin: 'Rıza Amca\'yı hiç gülerken görmedim. Bunu aklımda tutayım.' },
    { kim: 'ekran', metin: 'Deftere yazıldı: Rıza Amca\'nın söğüdü' }
  ];
  // Son jest mekâna göre verilir: ip yalnızca kuyu başındaki ölçümde var.
  function a2Satirlari(sonJest) {
    return [
      { kim: 'ogretmen', metin: 'Yeraltı suyu çekildikçe toprağın altında boşluklar kalıyor. Bir gün tavan çöküyor.' },
      { kim: 'ogretmen', metin: 'Ovada yüzlerce obruk var artık. Motorların en çok çalıştığı tarlalarda da...' },
      { kim: 'mehmet', metin: 'Rıza Amca\'nın tarlası gibi mi?' },
      { kim: 'ogretmen', metin: sonJest },
      { kim: 'ekran', metin: 'Deftere yazıldı: Obruk uyarısı' }
    ];
  }
  var A3_SATIRLAR = [
    { kim: 'muhtar', metin: '(uzun süre susar) Biz Rıza\'yla askere beraber gittik. Döndüğümüzde köyün yukarısındaki sarnıcın oluğunu beraber çaktık.' },
    { kim: 'muhtar', metin: 'Kuraklık yılıydı, seksen dokuz. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı, Rıza.' },
    { kim: 'muhtar', metin: 'Baban da senin yaşındaydı. Yukarıya bidonla su taşırdı bize.' },
    { kim: 'muhtar', metin: 'Sonra motorlar geldi, laflar uzadı. Sonra... olan oldu. Neyse.' },
    { kim: 'ekran', metin: 'Deftere yazıldı: Muhtarla Rıza Amca\'nın sarnıcı' }
  ];

  // Geçici metin: kullanıcı sonra düzenleyecek.
  KS.GIRIS_METNI = [
    { metin: 'Konya Ovası\'nda küçük bir köy. Son altmış beş yılın en kurak günleri.' },
    { metin: 'Sen Mehmet\'sin, on iki yaşındasın. Baban şehirde iş arıyor. Evde annen, bebek kardeşin ve hasta keçiniz var.' },
    { metin: 'Köy, önündeki dokuz günün sonunda kuyunun geleceğini oylayacak. Her sabah evin suyunu sen bölüştüreceksin. Öğlen ve akşam ne yapacağına, kime gideceğine de sen karar vereceksin.' },
    { metin: 'Kuyu hepinizin. Bakalım köy ayakta kalabilecek mi?' }
  ];

  KS.SON_KARTLARI = {
    iyi: { metin: 'Ekim. İlk yağmur.' },
    kotu: { metin: 'Aylar geçti. Ekim.' }
  };

  KS.GUN_KARTLARI = [
    { metin: 'Ağustos 2025. Konya Ovası.' },
    { metin: 'Gün 2 – Sıcak, rüzgârsız.' },
    { metin: 'Gün 3 – Kuyu başında erken bir sıra.' },
    { metin: 'Gün 4 – Domatesler boynunu büktü.' },
    { metin: 'Gün 5 – Tepeye çıkan yol tozlu.' },
    { metin: 'Gün 6 – Muhtarlıkta toplantı var.' },
    { metin: 'Gün 7 – Köy sessiz.' },
    { metin: 'Gün 8 – Sıcak dalgası.' },
    { metin: 'Gün 9 – Cuma. Köy toplantısı.' }
  ];

  // Günün planı: mekân kimliği, 'serbest' ya da 'belirsiz' (gün 8 öğlesi önceden söylenmez).
  KS.GUN_PLANLARI = [
    { sabah: 'avlu', ogle: 'kuyu_basi', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'yasli_cift_evi', aksam: 'serbest' },
    { sabah: 'kuyu_basi', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'tepe', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'muhtarlik', aksam: 'serbest' },
    { sabah: 'kuyu_basi', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'belirsiz', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'serbest', aksam: 'muhtarlik' }
  ];

  KS.OLAYLAR = [
    // ---------- Gün olayları ----------
    { id: 'g1_acilis', gun: 1, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Kardeşim yine erkenden uyandı. Yani herkes uyandı.' },
      { kim: 'ic', metin: '{keci} ağılda yatıyor. Kalkmaya çalışıyor, kalkamıyor.' },
      { kim: 'anne', metin: 'Dün akşamdan beri böyle. Susuzluktan halsiz.' },
      { kim: 'mehmet', metin: 'Veteriner çağırsak?' },
      { kim: 'anne', metin: 'Veterinere para yok, oğlum. Su lazım, biraz da ilgi.' },
      { kim: 'mehmet', metin: 'Babam aradı mı?' },
      { kim: 'anne', metin: 'Aramadı. Şehirde iş bulursa arayacak.' },
      { kim: 'anne', metin: 'Muhtar her eve günlük pay yazdı. Bugün on bir bidon. Her geçen gün biraz daha azalacak.' },
      { kim: 'mehmet', metin: 'On bir bidon yeter mi?' },
      { kim: 'anne', metin: '(bir süre susar) Yetmez. Yine de bölüştüreceğiz.' }
    ], secenekler: [
      { metin: 'Keçiye ben bakarım, anne.', sonraki: 'g1_a' },
      { metin: 'Yetmezse ne yapacağız?', sonraki: 'g1_b' }
    ] },
    { id: 'g1_a', satirlar: [{ kim: 'anne', metin: 'Bak bakalım. Sen olmasan ne yapardım?' }] },
    { id: 'g1_b', satirlar: [{ kim: 'anne', metin: 'Yetireceğiz, oğlum. Başka çaremiz yok.' }] },
    { id: 'g1_tanima', gun: 1, dilim: 'ogle', mekan: 'kuyu_basi', giris: { metin: 'Annen seni bidonlarla kuyu başına yolladı.' }, satirlar: [
      { kim: 'ic', metin: 'Kuyu başı yine kalabalık. Bidonlar sıra sıra.' },
      { kim: 'mehmet', metin: 'Kolay gelsin.' },
      { kim: 'koylu', metin: 'Sağ ol evlat. Geç sıraya.' },
      { kim: 'koylu', metin: 'Eskiden bir kova yeterdi. Şimdi ip uzadıkça uzuyor.' },
      { kim: 'koylu', metin: 'Biz burada bidon sayıyoruz, Rıza\'nın motoru bütün gece çalıştı.' },
      { kim: 'koylu', metin: 'Sus. Rıza duyar.' },
      { kim: 'ic', metin: 'Rıza Amca bizim komşu. Motorunun sesi evimize kadar gelir. Kimse yüzüne bir şey demez, arkasından çok konuşur.' },
      { kim: 'ic', metin: 'Kuyuda ne kadar su kaldığını kimse bilmiyor. Bilen varsa da söylemiyor.' },
      { kim: 'ipucu', metin: 'Ekranın kenarındaki gösterge köy kuyusunun seviyesi. Her gün biraz iner. Oyunun sonunda her şey ona bağlı olacak.' }
    ] },
    { id: 'g2_grisu', gun: 2, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Dur, leğendeki suyu dökme. Bulaşık suyunu da.' },
      { kim: 'mehmet', metin: 'Kirli o.' },
      { kim: 'anne', metin: 'Domatesler kirli mirli bakmaz. Ninen de böyle yapardı. Dök bahçeye.' },
      { kim: 'ipucu', baslik: { metin: 'Gri su' }, metin: 'Evde kullanılan su artık boşa gitmiyor. Eve verdiğin her {griBolen} damladan 1\'i bahçeye döner. Dağıtım panelindeki "Gri su" satırında görürsün. Eve az verirsen bahçeye dönen de azalır. Gri su ertesi güne kalmaz.' }
    ] },
    { id: 'g2_yaslicift', gun: 2, dilim: 'ogle', mekan: 'yasli_cift_evi', giris: { metin: 'Fatma Teyze seni çağırtmış.' }, satirlar: [
      { kim: 'mehmet', metin: 'Hayırlı günler Fatma Teyze, Hasan Amca.' },
      { kim: 'nine', metin: 'Gel bakalım, Mehmet. Gölgeye otur. Gölge dediysem, çardağın gölgesi de kurudu ya.' },
      { kim: 'dede', metin: 'Bu asma kırk yıl üzüm verdi. İki yazdır yaprak bile zor tutuyor.' },
      { kim: 'mehmet', metin: 'Hasan Amca, eskiden de böyle kurak olur muydu?' },
      { kim: 'dede', metin: 'Kurak yıl çok gördük. Ama yeraltı dolardı, dere de akardı. Kuyuya on metre ip yeterdi.' },
      { kim: 'nine', metin: 'Seni bunun için çağırmadım, dinleme onu. Al şu tohumları. Bizim köyün tohumu bunlar, az suyla yetinir. Bahçenizin boş kalan yerine ek.' },
      { kim: 'ipucu', baslik: { metin: 'Dayanıklı tohum' }, metin: 'Yarından itibaren bahçe daha az su ister.' },
      { kim: 'dede', metin: 'Bir de köyün yukarısında eski bir sarnıç var. Yağmur suyunu orada toplardık. Kimse bakmadı, yıkıldı gitti.' }
    ], secenekler: [
      { metin: 'Dere mi vardı burada, Hasan Amca?', etkiler: { arguman: 'A1' }, sonraki: 'g2_a1' },
      { metin: 'Teşekkürler, Fatma Teyze. Annem bekler.' }
    ] },
    { id: 'g2_a1', satirlar: A1_SATIRLAR },
    { id: 'g3_olcum', gun: 3, dilim: 'sabah', mekan: 'kuyu_basi', giris: { metin: 'Su almaya indin. Öğretmen elinde iple kuyunun başında.' }, satirlar: [
      { kim: 'mehmet', metin: 'Günaydın öğretmenim.' },
      { kim: 'ogretmen', metin: 'Günaydın Mehmet, iyi ki geldin. Tut şu ipin ucunu. Bırakma ama.' },
      { kim: 'mehmet', metin: 'Ne yapıyorsunuz?' },
      { kim: 'ogretmen', metin: 'Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.' },
      { kim: 'ogretmen', metin: '(ipi işaretler) Bir ayda neredeyse bir buçuk metre inmiş.' },
      { kim: 'mehmet', metin: 'Bu çok mu?' },
      { kim: 'ogretmen', metin: 'Altmış beş yılın en kurak yıllarından birindeyiz. Bu hızla giderse sonbahara kuyu boşa döner.' },
      { kim: 'mehmet', metin: 'Rıza Amca\'nın kuyusu da bu suyu mu çekiyor?' },
      { kim: 'ogretmen', metin: 'Hepimizin kuyusu aynı suya iniyor. Biri çekince hepimizin ipi uzuyor.' },
      { kim: 'ogretmen', metin: 'Bunu muhtar görmeli. Ben anlatınca "öğretmen hanım yine hesap yapmış" diyor. Kâğıt senin elinden gitsin, köyün çocuğu getirdi desin.' },
      { kim: 'ogretmen', metin: '(kâğıdı katlayıp uzatır) Al. Cebinden düşürme. Muhtar akşamları muhtarlıkta olur.' }
    ], secenekler: [
      { metin: 'Kuyu tamamen kurursa ne olur?', etkiler: { arguman: 'A2' }, sonraki: 'g3_a2' },
      { metin: 'Tamam, götürürüm.', sonraki: 'g3_defter' }
    ] },
    { id: 'g3_a2', sonraki: 'g3_defter', satirlar: a2Satirlari('(cevap vermez, ipi sarar)') },
    { id: 'g3_defter', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Defter' }, metin: 'Görevlerin üstteki Defter\'de yazar. Ölçümü gün {sonGun} akşamına kadar muhtara götür. Geç kalırsan plan zayıf kalır.' }
    ] },
    { id: 'g4_cicek', gun: 4, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: olcumVar, metin: 'Muhtar kapı kapı dolaşıyor, suyu idareli kullanın diye. Öğretmen hanım da anlatıp duruyormuş.' },
      { kim: 'anne', kosul: olcumYok, metin: 'Öğretmen hanım kapı kapı dolaşıyor, suyu idareli kullanın diye. Muhtar da çağırmış köylüyü.' },
      { kim: 'ic', metin: 'Annemin pencere önündeki sardunyası. Kurumak üzere.' },
      { kim: 'anne', metin: 'Ona su verme, boş ver.' },
      { kim: 'mehmet', metin: '(bardağının dibinde kalan suyu sardunyaya döker)' },
      { kim: 'anne', metin: '(gülümser, bir şey demez)' }
    ] },
    { id: 'g4_hatirlatma', gun: 4, dilim: 'aksam', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Öğretmen hanım bir kâğıt vermiş sana, muhtara götürdün mü?' }
    ] },
    { id: 'g5_baba', gun: 5, dilim: 'sabah', mekan: 'tepe', giris: { metin: 'Babanın araması için tepeye çıktın.' }, satirlar: [
      { kim: 'ic', metin: 'Annemin telefonu yalnızca tepede çekiyor. Babam muhtarlığa haber bırakmış, bu sabah arayacakmış.' },
      { kim: 'baba', ses: 'telefon', metin: 'Mehmet? Sesim geliyor mu?' },
      { kim: 'mehmet', metin: 'Geliyor baba! Ne zaman geleceksin?' },
      { kim: 'baba', metin: '(bir an susar) İnşaatta bir iş var, belki. Çağırdıkları gün gidiyorum, çağırmadıkları gün bekliyorum.' },
      { kim: 'baba', metin: 'Annen nasıl? Uyuyor mu geceleri?' }
    ], secenekler: [
      { metin: 'Yorgun ama iyi, baba.', sonraki: 'g5_baba_a' },
      { metin: 'Sen nasılsın asıl?', sonraki: 'g5_baba_b' }
    ] },
    { id: 'g5_baba_a', sonraki: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: 'Yorgundur. Söyle ona, ben de burada pek uyumuyorum.' }
    ] },
    { id: 'g5_baba_b', sonraki: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: 'Ben mi? İyiyim. Burada su musluktan akıyor, içerken utanıyorum.' }
    ] },
    { id: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: '{keci} nasıl?' },
      { kim: 'mehmet', kosul: kecidusuk, metin: '{keci} hâlâ iyi değil. Kuyu da iniyor, öğretmen ölçtü.' },
      { kim: 'mehmet', kosul: keciIyi, metin: '{keci} toparlanıyor. Ama kuyu iniyor, öğretmen ölçtü.' },
      { kim: 'mehmet', metin: 'Bidonları artık ben taşıyorum.' },
      { kim: 'baba', metin: 'Ben de senin yaşındayken taşırdım. O zaman bu kadar ağır değildi.' },
      { kim: 'mehmet', metin: 'Rıza Amca\'nın motoru da hiç durmuyor.' },
      { kim: 'baba', metin: 'Rıza mı? Sen muhtarla konuş. O adamı bir tek muhtar...' },
      { kim: 'ic', ses: 'hat_kesilir', metin: 'Kesildi. Bir tek muhtar ne?' }
    ] },
    { id: 'g5_hatirlatma', gun: 5, dilim: 'sabah', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'O kâğıt hâlâ cebinde mi? Bu akşam götür, oğlum.' }
    ] },
    { id: 'g6_sabah', gun: 6, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Muhtar seni sormuş. Öğlen muhtarlığa uğra.' },
      { kim: 'mehmet', metin: 'Beni mi?' },
      { kim: 'anne', metin: 'Seni. Temiz gömleğini giy.' }
    ] },
    { id: 'g6_plan', gun: 6, dilim: 'ogle', mekan: 'muhtarlik', giris: { metin: 'Muhtar seni de muhtarlığa çağırdı.' }, satirlar: [
      { kim: 'mehmet', metin: 'Selamün aleyküm muhtar amca. Beni çağırmışsınız.' },
      { kim: 'muhtar', metin: 'Aleyküm selam. Gel, otur şöyle.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Öğretmen hanımla oturduk, bir yol çizdik. Sen de dinle, senin sayende.' },
      { kim: 'ogretmen', kosul: guclu, metin: 'Eski sarnıcı onarıyoruz. Yağmur gelince boşa akmasın, köy çeşmesine insin.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Kuyulara sayaç, motorlara saat. Yasada var zaten, bizde kimse takmamış. Herkes ne çektiğini bilecek.' },
      { kim: 'ogretmen', kosul: guclu, metin: 'Sulama sabah erken ya da akşam serinde, miktarı sayaç söyleyecek. Toprağın üstü saman ya da otla örtülecek, buharlaşmasın.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Hepsini cuma akşamı köy toplantısında oylayacağız.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Öğretmen hanım ölçümün bir örneğini getirdi sonunda. Ölçüm bize geç ulaştı.' },
      { kim: 'ic', kosul: zayif, metin: 'Kâğıt cebimde kalmıştı.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Keşke daha önce görseydim. Kuyu bu arada epey indi.' },
      { kim: 'ogretmen', kosul: zayif, metin: 'Sarnıç, sayaç, sulama saatleri... Bu kadar kısa sürede elimizden geleni yazdık.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Cuma akşamı köy toplantısında oylayacağız.' },
      { kim: 'ogretmen', metin: 'Sarnıcı Hasan Amca hatırlattı, toprağı otla örtmeyi Fatma Teyze\'den öğrendik. Ben yalnız ölçtüm.' },
      { kim: 'muhtar', metin: 'Rıza\'nın motoru durmazsa hiçbiri yetmez. Köy de ikiye bölünmüş, oylar eşit çıkarsa gözler ona döner. O da kimseyi dinlemez.' }
    ], secenekler: [
      { metin: 'Babam "o adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca\'yla neden konuşmuyorsunuz?', kosul: bilmiyor('A3'), etkiler: { arguman: 'A3' }, sonraki: 'g6_a3' },
      { metin: 'Ben konuşurum.', sonraki: 'g6_hedef' }
    ] },
    { id: 'g6_a3', sonraki: 'g6_hedef', satirlar: A3_SATIRLAR },
    { id: 'g6_hedef', satirlar: [
      { kim: 'ogretmen', metin: 'Bize kapısını açmaz. Sen çocuksun, sana bir şey demez belki.' },
      { kim: 'muhtar', metin: 'Zorla olmaz, Mehmet. Dinletebilirsen dinlet.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuyu ikna et' }, metin: 'Rıza Amca\'ya köyde öğrendiğin {gereken} şeyi söylersen toplantıda planı destekler. Bir konuşmada yalnız bir şey dinler, her şeye de hemen inanmaz. Ne söylediğin kadar nasıl söylediğin de önemli. Defter\'de görürsün.' }
    ] },
    { id: 'g7_komsu', gun: 7, dilim: 'sabah', mekan: 'kuyu_basi', giris: { metin: 'Su almaya indin. Bu sabah kuyu başında beklemediğin biri var.' }, satirlar: [
      { kim: 'ic', metin: 'Rıza Amca kuyu başında. Herkes onu görünce susmuş.' },
      { kim: 'komsu', metin: 'Damacanam bitti. Bir bidon alıp gideceğim.' },
      { kim: 'koylu', metin: 'Sıra sayılı, Rıza. Motorun yüzünden bidonlar yetmiyor.' },
      { kim: 'koylu', metin: 'Senin kuyun var ya. Ondan iç.' },
      { kim: 'komsu', metin: 'O su içilmez, biliyorsunuz.' },
      { kim: 'koylu', metin: 'Biliyoruz.' },
      { kim: 'komsu', metin: '(bir süre durur, boş bidonu alır, gider)' },
      { kim: 'ic', metin: 'Haksız da değiller. Ama bidon boş döndü.' },
      { kim: 'ic', metin: 'Bir şey diyemedim. Ama bir bidon taşıyabilirim.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuya su' }, metin: 'Artık öğlenleri haritadan Rıza Amca\'ya su götürebilirsin. Yarınki paydan {maliyet} damla gider, ama onunla konuşma fırsatı olur.' }
    ] },
    { id: 'g8_sabah', gun: 8, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ekran', metin: 'Sıcak dalgası. Gölgede kırk derece.' },
      { kim: 'anne', metin: 'Bugün dışarıda fazla kalma. Kardeşini de içeri alalım.' }
    ] },
    { id: 'g8_obruk', gun: 8, dilim: 'ogle', mekan: 'komsu_tarlasi', mekanSecenek: function () { return { obruk: true }; }, giris: { metin: 'Derinden bir gürültü geldi. Köylüler Rıza Amca\'nın tarlasına koşuyor.' }, satirlar: [
      { kim: 'ic', ses: 'gurultu', metin: 'Rıza Amca\'nın tarlası... Toprak yarılmış. Kocaman bir çukur.' },
      { kim: 'komsu', metin: '(çukurun kenarında, eli titreyerek) Dün burada pancar vardı.' },
      { kim: 'komsu', metin: 'Kırk yıldır bu toprağı sürüyorum. Kırk yıl!' },
      { kim: 'mehmet', metin: 'Rıza Amca, uzak durun, kenarı çöküyor.' },
      { kim: 'komsu', metin: '(geri çekilir, oturur) Motor şuradaydı. Bir metre öteye düşseydi...' }
    ] },
    { id: 'g9_sabah', gun: 9, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Bu akşam toplantı. Bütün köy orada olacak.' },
      { kim: 'anne', metin: 'Baban dün muhtarlığı aramış, toplantıyı sormuş. "Mehmet de gitsin, görsün" demiş.' },
      { kim: 'ic', kosul: iknaDegil, metin: 'Rıza Amca\'ya söyleyecek son bir şansım var. Öğlen gitmeliyim.' },
      { kim: 'ic', kosul: ikna, metin: '"Bakarız" dedi. Gelir mi, gelmez mi, akşam göreceğiz.' }
    ] },
    { id: 'g9_toplanti', gun: 9, dilim: 'aksam', mekan: 'muhtarlik', mekanSecenek: function () { return { toplanti: true }; }, giris: { metin: 'Bütün köy muhtarlığın önünde toplandı. Bugün oylama var.' }, satirlar: [
      { kim: 'muhtar', metin: 'Hepiniz biliyorsunuz neden toplandığımızı. Kuyu iniyor. Öğretmen hanım ölçtü, ben de gördüm.' },
      { kim: 'ogretmen', metin: 'Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve akşam serinde yapılacak.' },
      { kim: 'koylu', metin: 'Sayaç masrafını kim ödeyecek?' },
      { kim: 'koylu', metin: 'Benim tarlam kurursa çocuklarıma ne yediririm?' },
      { kim: 'muhtar', metin: 'Oylayalım. Kabul edenler...' },
      { kim: 'ekran', metin: 'Eller kalkıyor. Yarısı evet, yarısı hayır.' },
      { kim: 'ic', metin: 'Herkes dönüp Rıza Amca\'ya bakıyor.' },
      { kim: 'komsu', kosul: ikna, metin: '(bir an Mehmet\'e bakar, ağır ağır ayağa kalkar) Benim tarlam çöktü. Bir sonraki kimin tarlası? (elini kaldırır) Ben de varım. Motorum da sayaç taksın.' },
      { kim: 'koylu', kosul: ikna, metin: 'Daha iki gün önce sırayı kapattık ona. Ayıp ettik.' },
      { kim: 'muhtar', kosul: ikna, metin: '(bir an Rıza\'ya bakar, başını sallar) Kabul edilmiştir.' },
      { kim: 'komsu', kosul: iknaDegil, metin: 'Benim belgem var. Tarlam gitti, elimde bir motor kaldı. Sayaç takarsanız ona ne kalacak? (çıkıp gider)' },
      { kim: 'muhtar', kosul: iknaDegil, metin: 'Oylar eşit. Bu hâliyle plan geçmez.' }
    ] },

    // ---------- Gün 1 öğreticileri ----------
    { id: 'ogretici_dagitim', satirlar: [
      { kim: 'ipucu', metin: 'Bugünkü payın {pay} damla. Her damla bir bidon su. Evin, keçinin ve bahçenin ihtiyacı daha fazla.' },
      { kim: 'ipucu', metin: 'Kime ne kadar vereceğine sen karar ver. Tam su alan toparlanır, eksik kalan her damla çubuğu biraz daha düşürür.' },
      { kim: 'ipucu', metin: '"Kuyudan fazladan çek" {fazla} damla daha verir. Bunu kimse görmez, ama köyün kuyusu düşer.' }
    ] },
    { id: 'ogretici_keci', satirlar: [
      { kim: 'ipucu', metin: '{keci} seni bekliyor. Sırtını tara, su kabını göster, yemini ver. Bakım gördükçe toparlanır.' }
    ] },
    { id: 'ogretici_harita', satirlar: [
      { kim: 'ipucu', metin: 'Akşamları birine uğrayabilir ya da ailenle vakit geçirebilirsin. Ama yalnızca birini: akşam uzun değil.' },
      { kim: 'ipucu', metin: 'Haritada gitmek istediğin yere dokun. Soluk yerlerde şimdilik yapılacak bir şey yok.' }
    ] },
    { id: 'ogretici_kiler', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Kiler' }, metin: 'Sepetler evin yiyeceği. Her akşam iki sepet eksilir. Keçi "Toparlanıyor" olunca süt, bahçe "Yeşil" olunca sebze getirir, ikisi birer sepet. Gece ne geldiğini görürsün. Kiler boşalırsa ev zorlanır.' }
    ] },
    { id: 'kiler_yardim', satirlar: [
      { kim: 'ic', metin: 'Kiler yine boş. Birinden istesem verirler mi? Fatma Teyze annemi hep sorar.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuluk' }, metin: 'Kiler boşken akşam yaşlı çifte uğrarsan yiyecek verirler. Ama onlarda da sınırsız değil.' }
    ] },
    { id: 'ipucu_kiler_kuyu', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Boş kiler' }, metin: 'Kiler boş kaldığı her gece aile kuyudan gizlice su çeker, köyün kuyusu düşer. Keçi ve bahçe kileri doldurur.' }
    ] },

    // ---------- Sabah durum satırları (her sabah, gün 1 hariç) ----------
    { id: 'sabah_durum', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: ve(evDusuk, aglamiyor), metin: 'Annem gece yine uyumadı, sesinden anlıyorum.' },
      { kim: 'ic', kosul: ve(evDusuk, agliyor), metin: 'Kardeşim ağlıyor, annemin sesi kısık.' },
      { kim: 'ic', kosul: ve(evOrta, surum(0)), metin: 'Güneş daha doğmadan sıcak. Bugün de uzun bir gün.' },
      { kim: 'ic', kosul: ve(evOrta, surum(1)), metin: 'Kuyu başındaki sıraya erken gitmeliyim.' },
      { kim: 'ic', kosul: ve(evOrta, surum(2)), metin: 'Horozlar bile geç öttü. Sıcak herkesi susturuyor.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(0)), metin: 'Annem mutfakta türkü mırıldanıyor. Ne zamandır duymamıştım.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(1)), metin: 'Kardeşim annemin kucağında uyuyor. Ev bu sabah sessiz, iyi sessiz.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(2)), metin: 'Annem babamın gömleğini yamıyor. "Gelince giyer" diyor.' },
      { kim: 'anne', kosul: function (d, r) { return r.ilkSut; }, metin: '{keci} bu sabah süt verdi! Az ama verdi.' },
      { kim: 'ic', kosul: function (d, r) { return r.ilkSaglik; }, metin: '{keci} sabah beni görünce ayağa kalktı. Sırtını sürttü.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci <= KS.config.KECI.cokDusuk; }, metin: '{keci} bugün de yemine bakmadı bile.' }
    ] },

    // ---------- Akşam başı: anne ipucu (ev yüksekse) ----------
    { id: 'anne_ipucu', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: ipucu('dostluk'), metin: 'Rıza Amca\'yla muhtar eskiden can ciğerdi. Aralarına ne girdi, kimse açıp sormuyor.' },
      { kim: 'anne', kosul: ipucu('nine'), metin: 'Fatma Teyze\'ye bir akşam uğra. Yaşlılar konuşacak birini arıyor.' },
      { kim: 'anne', kosul: ipucu('ogretmen'), metin: 'Öğretmen hanım ölçümden beri bir şeye takılmış, yüzünden belli. Bir akşam sor bakalım.' },
      { kim: 'anne', kosul: ipucu('su'), metin: 'Rıza\'nın kapısı eli boş çalınmaz, oğlum. Bu sıcakta bir bidon su, bin selamdan iyidir.' },
      { kim: 'anne', kosul: ipucu('olcum'), metin: 'Öğretmen hanım akıllı kadın. Ama muhtar laftan çok kâğıda inanır.' },
      { kim: 'anne', kosul: ipucu('kuyu'), metin: 'Kuyudan fazla çekmek kolay. Yarın yine çekersin, öbür gün yine. Sonra?' }
    ] },

    // ---------- Öğle eylemleri (id: ogle_<eylem>) ----------
    { id: 'ogle_komsuyaSu', mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'mehmet', kosul: sonGunDegil, metin: 'Bidonunuz boştu. Biz paylaşırız.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: 'Benim kuyum var. Suyu tarlaya yarar, içilmez.' },
      { kim: 'mehmet', kosul: sonGunDegil, metin: 'Biliyorum.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: '(bir süre bakar, bidonları alır) Otur, bir çay iç.' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Size su getirdim, Rıza Amca.' },
      { kim: 'komsu', kosul: sonGun, metin: 'Bu köyde bana su getiren bir sen çıktın. (bir bardak uzatır) Otur.' },
      { kim: 'ekran', kosul: sonGunDegil, metin: 'Yarınki paydan {maliyet} damla eksilecek.' }
    ] },
    { id: 'ogle_bahceEkIs', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Toprağın üstünü kuru otla örttüm. Fatma Teyze öyle derdi, su buharlaşmasın diye.' },
      { kim: 'ic', kosul: surum(1), metin: 'Otları ayıkladım, kuruyanları kopardım. Çapa elimi soydu.' },
      { kim: 'ic', kosul: surum(2), metin: 'Fatma Teyze\'nin tohumları çıkmış. Küçücük, ama yeşil.' }
    ] },
    { id: 'ogle_evdeYardim', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Bebeği salladım, annem biraz uyudu.' },
      { kim: 'ic', kosul: surum(1), metin: 'Bulaşığı yıkadım, suyunu leğende biriktirdim.' },
      { kim: 'anne', kosul: surum(2), metin: 'Ne zaman büyüdün sen?' },
      { kim: 'mehmet', kosul: surum(2), metin: '(cevap vermez, çamaşırı asmaya devam eder)' }
    ] },
    { id: 'ogle_babayiAra', mekan: 'tepe', satirlar: [
      { kim: 'ic', ses: 'telefon', metin: 'Tepeye çıktım. Telefon çekiyor, aradım.' },
      { kim: 'baba', metin: 'Efendim? Mehmet, sen misin?' },
      { kim: 'mehmet', metin: 'Benim baba. Nasılsın?' },
      { kim: 'baba', kosul: babaKonusmadi, metin: 'İyiyim oğlum, iş arıyorum. Bu saatte tepede ne işin var?' },
      { kim: 'baba', kosul: babaKonustu, metin: 'İyiyim oğlum, şükür. Karnınız doyuyor mu orada?' }
    ], secenekler: [
      { metin: 'Sesini duyayım dedim.', kosul: babaKonusmadi, sonraki: 'baba_erken_a' },
      { metin: 'Annem soruyor, ne zaman geleceksin?', kosul: babaKonusmadi, sonraki: 'baba_erken_b' },
      { metin: 'Doyuyor baba, merak etme.', kosul: babaKonustu, sonraki: 'baba_gec_a' },
      { metin: 'Zor gidiyor.', kosul: babaKonustu, sonraki: 'baba_gec_b' }
    ] },
    { id: 'baba_erken_a', sonraki: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: 'İyi ettin. Ben de seninkini duymak istiyordum.' }
    ] },
    { id: 'baba_erken_b', sonraki: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: '(bir an susar) Bilmiyorum oğlum. İş çıksın, bir yol bulacağım.' }
    ] },
    { id: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: 'Annene söyle, bu hafta biraz para yollamaya çalışacağım.' },
      { kim: 'mehmet', metin: 'Tamam baba. Allah\'a emanet ol.' },
      { kim: 'baba', metin: 'Sen de oğlum. Anneni öp benim yerime.' },
      { kim: 'ic', metin: 'Sesi yorgun. "Çalışacağım" dedi, "yollayacağım" demedi.' }
    ] },
    { id: 'baba_gec_a', sonraki: 'baba_gec_son', satirlar: [
      { kim: 'baba', metin: '(güler) Yalan söylemeyi benden öğrenme. İyi, inandım.' }
    ] },
    { id: 'baba_gec_b', sonraki: 'baba_gec_son', satirlar: [
      { kim: 'baba', metin: 'Biliyorum oğlum. Bu hafta biraz para yollamaya çalışacağım.' }
    ] },
    { id: 'baba_gec_son', satirlar: [
      { kim: 'mehmet', metin: 'Hat kesilmişti. "O adamı bir tek muhtar" diyordun.' },
      { kim: 'baba', metin: 'Ha, Rıza. Onu bir tek muhtar yumuşatır diyecektim. Kardeş gibiydiler.' },
      { kim: 'mehmet', metin: 'Ne oldu onlara?' },
      { kim: 'baba', metin: 'O ikisinin bileceği iş. Kontör bitiyor, sen anneni öp benim yerime.' },
      { kim: 'mehmet', metin: 'Tamam baba. Allah\'a emanet ol.' },
      { kim: 'baba', metin: 'Sen de oğlum.' },
      { kim: 'ic', metin: 'Sesi yorgun. Sormadım.' }
    ] },
    { id: 'ogle_camur', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Leğenin dibindeki çamura ayaklarımı soktum. Kardeşim görüp kahkaha attı. Annem kızmadı.' }
    ] },
    { id: 'ogle_gec', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Gölgede oturdum. Sıcak, kimseye bir şey yaptırmıyor.' },
      { kim: 'ic', kosul: surum(1), metin: 'Ağılın gölgesine oturdum. {keci} ile birbirimize baktık. O da bir şey yapmadı.' },
      { kim: 'ic', kosul: surum(2), metin: 'Bir süre yolu seyrettim. Geçen yok. Sıcak herkesi içeri almış.' }
    ] },

    // ---------- Akşam ziyaretleri (ziyaret: kim). Koşulu tutanlar sırayla oynar. ----------
    // ---------- Selamlaşma: her ziyaretin başında ----------
    { id: 'selam_yasliCift', ziyaret: 'yasliCift', kosul: function () { return true; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar Hasan Amca, Fatma Teyze.' },
      { kim: 'dede', kosul: tekGun, metin: 'Gel evladım, hoş geldin.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hayırlı akşamlar. Nasılsınız bu sıcakta?' },
      { kim: 'nine', kosul: ciftGun, metin: 'Şükür oğlum, idare ediyoruz. Hoş geldin.' }
    ] },
    { id: 'selam_muhtar', ziyaret: 'muhtar', kosul: function () { return true; }, mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar muhtar amca, kolay gelsin.' },
      { kim: 'muhtar', kosul: tekGun, metin: 'Sağ ol evladım, hoş geldin.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Selamün aleyküm muhtar amca.' },
      { kim: 'muhtar', kosul: ciftGun, metin: 'Aleyküm selam Mehmet. Gel bakalım.' }
    ] },
    { id: 'selam_ogretmen', ziyaret: 'ogretmen', kosul: function () { return true; }, mekan: 'koy_yolu', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar öğretmenim.' },
      { kim: 'ogretmen', kosul: tekGun, metin: 'İyi akşamlar Mehmet, hoş geldin.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Merhaba öğretmenim, nasılsınız?' },
      { kim: 'ogretmen', kosul: ciftGun, metin: 'İyiyim Mehmet, sen nasılsın?' }
    ] },
    { id: 'selam_komsu', ziyaret: 'komsu', kosul: function () { return true; }, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar Rıza Amca.' },
      { kim: 'komsu', kosul: tekGun, metin: 'Hı.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Merhaba Rıza Amca, nasılsınız?' },
      { kim: 'komsu', kosul: ciftGun, metin: 'Nasıl olayım. İşte.' }
    ] },
    { id: 'sohbet_yasliCift', ziyaret: 'yasliCift', kosul: sohbet, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Annen nasıl, oğlum? Bebek uyuyor mu geceleri?' },
      { kim: 'mehmet', metin: 'Uyuyor teyze, biraz.' },
      { kim: 'dede', metin: 'Sıcağa dayanamaz o yaşta. Sen de dayanma, otur bir su iç. Az iç ama.' },
      { kim: 'ic', metin: 'Kaç yaşındalar bilmiyorum. Köyün en eskileri onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.' }
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
      { kim: 'nine', metin: 'Annen sofrayı kuramıyormuş, duydum. Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.' }
    ] },
    { id: 'ziyaret_yasliCift_yardim2', ziyaret: 'yasliCift', kosul: function (d, r) { return r.yardim === 2; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Bu son, oğlum. Artık bize de zor yetiyor. Bir daha getiremeyiz, gücenme.' }
    ] },
    { id: 'ziyaret_yasliCift_a1', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, bilmiyor('A1')), mekan: 'yasli_cift_evi', etkiler: { arguman: 'A1' }, satirlar: [
      { kim: 'nine', metin: 'Otur, sana bir şey anlatayım. Bu köyde bir dere vardı, bilir misin?' },
      { kim: 'mehmet', metin: 'Dere mi? Burada mı?' }
    ].concat(A1_SATIRLAR) },
    { id: 'ziyaret_yasliCift_iklim', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, biliyor('A1'), function (d, r) { return !r.yardim; }), mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'dede', kosul: kalanHak('yasliCift', 1), metin: 'Bizim zamanımızda kar yerde kırk gün kalırdı. Şimdi düştüğü gibi eriyor.' },
      { kim: 'nine', kosul: kalanHak('yasliCift', 1), metin: 'Kuyudaki su, bizim çocukluğumuzda yağan kar, yağmur. Biz çok içtik, hiç düşünmemiştik.' },
      { kim: 'dede', kosul: kalanHak('yasliCift', 0), metin: 'Eskiden kışın toprak doyardı. Yazın ne çekersen çek, ertesi yıl yerine gelirdi.' },
      { kim: 'nine', kosul: kalanHak('yasliCift', 0), metin: 'Şimdi gelmiyor. Biz gideceğiz, sizin kuyunuz kalacak. Asıl ona üzülüyorum, oğlum.' }
    ] },

    { id: 'ziyaret_muhtar_olcum', ziyaret: 'muhtar', kosul: function (d, r) { return r.gorev; }, mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', metin: 'Muhtar amca, öğretmen bunu gönderdi. Kuyunun ölçümü.' },
      { kim: 'muhtar', metin: '(kâğıda uzun uzun bakar) Bir buçuk metre ha...' },
      { kim: 'muhtar', metin: 'Ben de içten içe biliyordum. Ama kâğıda yazılınca başka oluyor.' },
      { kim: 'muhtar', metin: 'Öğretmen hanımla oturalım o zaman. Köyün işini köy konuşsun. Sen de eline sağlık.' },
      { kim: 'ekran', metin: 'Defter: Ölçüm muhtara ulaştı ✓' }
    ] },
    { id: 'ziyaret_muhtar_a3', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil, bilmiyor('A3')), mekan: 'muhtarlik', etkiler: { arguman: 'A3' }, satirlar: [
      { kim: 'muhtar', metin: 'Otur Mehmet. Babandan haber var mı?' },
      { kim: 'mehmet', kosul: babaKonusmadi, metin: 'Yok. Muhtar amca, siz Rıza Amca\'yla neden konuşmuyorsunuz?' },
      { kim: 'mehmet', kosul: babaKonustu, metin: 'Aradı. "O adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca\'yla neden konuşmuyorsunuz?' }
    ].concat(A3_SATIRLAR) },
    { id: 'ziyaret_muhtar_genel', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil, biliyor('A3')), mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', metin: 'Baban aradı dün, seni sordu. "Sözünü dinliyor mu?" dedi. Köyü dinliyor, dedim.' },
      { kim: 'muhtar', metin: 'Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev. Kuyu giderse köy de gider.' }
    ] },

    { id: 'ziyaret_ogretmen_a2', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, bilmiyor('A2')), mekan: 'koy_yolu', etkiler: { arguman: 'A2' }, satirlar: [
      { kim: 'ogretmen', metin: 'Ölçümü düşünüyordum da. Asıl korktuğum kuyunun kuruması değil.' }
    ].concat(a2Satirlari('(cevap vermez, önündeki defteri kapatır)')) },
    { id: 'ziyaret_ogretmen_iklim', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, biliyor('A2')), mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 1), metin: 'Bu kuraklık yalnız bizim köyde değil. Dünyanın her yerinde aynı dert konuşuluyor.' },
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 1), metin: 'Bunu büyük toplantılarda da konuşuyorlar. Ama kuyudan kaç kova çekeceğimiz bizim elimizde.' },
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 0), metin: 'Ölçmek kolay, Mehmet. Zor olan, ölçtüğünü insanlara kırmadan söylemek.' }
    ] },

    { id: 'ziyaret_komsu', ziyaret: 'komsu', kosul: sohbetDegil, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'komsu', metin: 'Bu saatte tarlada ne arıyorsun, evlat? Otur bakalım, madem geldin.' }
    ] },

    // ---------- Küçük sohbet (mekanik etkisi yok) ve vedalaşma ----------
    { id: 'kucuk_yasliCift', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, kalanHak('yasliCift', 1)), satirlar: [
      { kim: 'nine', metin: 'Annen bu sıcakta uyuyabiliyor mu?' }
    ], secenekler: [
      { metin: 'Zor uyuyor, teyze.', sonraki: 'kucuk_yasliCift_a' },
      { metin: 'İyi, şükür.', sonraki: 'kucuk_yasliCift_b' }
    ] },
    { id: 'kucuk_yasliCift_a', satirlar: [{ kim: 'nine', metin: 'Sıcak herkesi yorar. Söyle ona, bir akşam bize gelsin.' }] },
    { id: 'kucuk_yasliCift_b', satirlar: [{ kim: 'nine', metin: 'Allah\'a şükür. Uyku en iyi ilaç, oğlum.' }] },
    { id: 'kucuk_muhtar', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil), satirlar: [
      { kim: 'muhtar', metin: 'Köyde ne var ne yok, bir şey duydun mu?' }
    ], secenekler: [
      { metin: 'Yok muhtar amca, duymadım.', sonraki: 'kucuk_muhtar_a' },
      { metin: 'Kuyu başında herkes bidon sayıyor.', sonraki: 'kucuk_muhtar_b' }
    ] },
    { id: 'kucuk_muhtar_a', satirlar: [{ kim: 'muhtar', metin: 'İyi. Bazen duymamak da iyidir.' }] },
    { id: 'kucuk_muhtar_b', satirlar: [{ kim: 'muhtar', metin: 'Sayacak tabii. Sayılacak bidon da azaldı.' }] },
    { id: 'kucuk_ogretmen', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, kalanHak('ogretmen', 1)), satirlar: [
      { kim: 'ogretmen', metin: 'Tatilde kitap okuyor musun bari?' }
    ], secenekler: [
      { metin: 'Okuyorum öğretmenim, yavaş yavaş.', sonraki: 'kucuk_ogretmen_a' },
      { metin: 'Vakit kalmıyor, su taşıyorum.', sonraki: 'kucuk_ogretmen_b' }
    ] },
    { id: 'kucuk_ogretmen_a', satirlar: [{ kim: 'ogretmen', metin: 'Aferin. Bitince gel, başkasını veririm.' }] },
    { id: 'kucuk_ogretmen_b', satirlar: [{ kim: 'ogretmen', metin: 'Biliyorum. Kitap bekler, acele etme.' }] },
    { id: 'kucuk_komsu', ziyaret: 'komsu', kosul: ve(sohbetDegil, kalanHak('komsu', 0), obrukOncesi), satirlar: [
      { kim: 'komsu', metin: 'Ne bakıyorsun öyle? Tarlamı mı merak ettin?' }
    ], secenekler: [
      { metin: 'Yok, selam vermeye geldim.', sonraki: 'kucuk_komsu_a' },
      { metin: 'Pancarlar güzel olmuş.', sonraki: 'kucuk_komsu_b' }
    ] },
    { id: 'kucuk_komsu_a', satirlar: [{ kim: 'komsu', metin: 'Selamı aldım.' }] },
    { id: 'kucuk_komsu_b', satirlar: [{ kim: 'komsu', metin: 'Güzel olmuş. Su çekince olur.' }] },
    { id: 'veda_yasliCift', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Müsaadenizle. Sağlıcakla kalın.' },
      { kim: 'dede', kosul: tekGun, metin: 'Sen de sağlıcakla, oğlum. Annene selam söyle.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Allah\'a emanet olun, Fatma Teyze.' },
      { kim: 'nine', kosul: ciftGun, metin: 'Sen de, evladım. Karanlıkta taşlara dikkat et.' }
    ] },
    { id: 'veda_muhtar', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Size iyi akşamlar muhtar amca.' },
      { kim: 'muhtar', kosul: tekGun, metin: 'Sana da evladım. Annene selam söyle.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Sağlıcakla kalın muhtar amca.' },
      { kim: 'muhtar', kosul: ciftGun, metin: 'Eyvallah Mehmet. Güle güle.' }
    ] },
    { id: 'veda_ogretmen', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Sağlıcakla kalın öğretmenim.' },
      { kim: 'ogretmen', kosul: tekGun, metin: 'Sen de Mehmet. Görüşürüz.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hoşça kalın öğretmenim.' },
      { kim: 'ogretmen', kosul: ciftGun, metin: 'Güle güle. Annene selam söyle.' }
    ] },
    { id: 'veda_komsu', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Sağlıcakla kalın Rıza Amca.' },
      { kim: 'komsu', kosul: tekGun, metin: '(elini sallar)' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Annem selam söyledi Rıza Amca.' },
      { kim: 'komsu', kosul: ciftGun, metin: 'Sağ olsun. Hadi git artık.' }
    ] },

    { id: 'aile_vakti', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: ve(evDusuk, surum(0)), metin: 'Otur yanıma. Bir şey yapmasak da olur. (bebeği kucağına verir)' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(0)), metin: '(kardeşini sallar, bir süre konuşmazlar)' },
      { kim: 'anne', kosul: ve(evDusuk, surum(1)), metin: 'Yoruldum, oğlum. Sana söylemiyorum, kendime söylüyorum. Otur biraz.' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(1)), metin: 'Uzan biraz anne, kardeşime ben bakarım.' },
      { kim: 'anne', kosul: ve(evDusuk, surum(2)), metin: 'Baban olsa "bu da geçer" derdi. Ben demeyeyim, sen otur yeter.' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(2)), metin: 'Geçer anne.' },
      { kim: 'anne', kosul: ve(evOrta, surum(0)), metin: 'Kardeşin bugün sana baktı baktı güldü, biliyor musun?' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(0)), metin: 'Bana mı güldü? Ben ne yaptım ki?' },
      { kim: 'anne', kosul: ve(evOrta, surum(1)), metin: 'Baban küçükken bu avluda uyurmuş, yazın. Gel, biz de çıkalım.' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(1)), metin: 'Yıldızlar da görünür buradan.' },
      { kim: 'anne', kosul: ve(evOrta, surum(2)), metin: 'Baban gitmeden kapıyı onaracaktı. Döner dönmez sana da tutturacak, görürsün.' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(2)), metin: 'Ben onarırım anne, çivi versen yeter.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(0)), metin: 'Baban gelince bu evi görsün. Zor günde dağılmadık.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(0)), metin: 'Görür anne.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(1)), metin: 'Bugün sana hiç "hadi" demedim, fark ettin mi? Her işe kendin yetiştin.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(1)), metin: 'Fark ettim. Yine de deme, alışırım.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(2)), metin: 'Babana anlatacağım, bu yaz kimin sayesinde ayakta kaldık.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(2)), metin: '{keci} sayesinde de.' }
    ] },
    { id: 'aile_sohbet', satirlar: [
      { kim: 'anne', kosul: surum(0), metin: 'Bugün dışarıda kimleri gördün bakalım?' },
      { kim: 'anne', kosul: surum(1), metin: 'Baban aradığında ona ne anlatacaksın?' },
      { kim: 'anne', kosul: surum(2), metin: 'Kardeşin büyüyünce seni ona nasıl anlatayım?' }
    ], secenekler: [
      { metin: 'Herkes kuyu başında, bidon sayıyor.', kosul: surum(0), sonraki: 'aile_sohbet_0a' },
      { metin: 'Kimseyle konuşmadım.', kosul: surum(0), sonraki: 'aile_sohbet_0b' },
      { metin: '{keci} iyi derim.', kosul: surum(1), sonraki: 'aile_sohbet_1a' },
      { metin: 'Hiçbir şey, üzülmesin.', kosul: surum(1), sonraki: 'aile_sohbet_1b' },
      { metin: 'Su taşıyan abisi de.', kosul: surum(2), sonraki: 'aile_sohbet_2a' },
      { metin: 'Anlatma, kendi görür.', kosul: surum(2), sonraki: 'aile_sohbet_2b' }
    ] },
    { id: 'aile_sohbet_0a', satirlar: [{ kim: 'anne', metin: 'Saysınlar. Sayılacak su kaldıkça iyi.' }] },
    { id: 'aile_sohbet_0b', satirlar: [{ kim: 'anne', metin: 'Konuş, oğlum. Bu köyde herkes susarsa iş daha da zorlaşır.' }] },
    { id: 'aile_sohbet_1a', satirlar: [{ kim: 'anne', metin: 'De, sevinsin. Soracağı ilk şey de odur zaten.' }] },
    { id: 'aile_sohbet_1b', satirlar: [{ kim: 'anne', metin: 'Üzülmez. Sesini duymak ister, ne desen olur.' }] },
    { id: 'aile_sohbet_2a', satirlar: [{ kim: 'anne', metin: '(güler) Bir de inatçı diyeyim, eksik kalmasın.' }] },
    { id: 'aile_sohbet_2b', satirlar: [{ kim: 'anne', metin: 'Görür tabii. Sen yanında ol, yeter.' }] },
    { id: 'aile_gece', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi geceler anne.' },
      { kim: 'anne', kosul: tekGun, metin: 'İyi geceler, oğlum. Kardeşini uyandırma.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hayırlı geceler anne.' },
      { kim: 'anne', kosul: ciftGun, metin: 'Sana da, yavrum. Yarın erken kalkacağız.' }
    ] },
    { id: 'aksam_bitis', satirlar: [
      { kim: 'ic', metin: 'Hava karardı. Eve dönmeliyim.' }
    ] },

    // ---------- Gece: ilk tutan tek satır ----------
    { id: 'gece', tekSatir: true, satirlar: [
      { kim: 'ic', kosul: ve(sofraBos, surum(0)), metin: 'Akşam sofrada yalnız ekmek vardı. Gece annem bidonla kuyuya indi. Görmedim sandı.' },
      { kim: 'ic', kosul: ve(sofraBos, surum(1)), metin: 'Annem kendi payını önüme itti. Sonra bidonu alıp karanlıkta kuyuya yürüdü.' },
      { kim: 'ic', kosul: ve(sofraBos, surum(2)), metin: 'Kiler boş. Annem yine gece kuyuya indi. Kimseye söylemiyor, ben de söylemiyorum.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(0)), metin: 'Bugün kuyudan fazla çektik. Kimse bir şey demedi. Ben yine de kuyuya bakamadım.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(1)), metin: 'Bir kez daha fazla çektik. Alışıyorum, en kötüsü de bu.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(2)), metin: 'Kuyunun önünden geçerken başımı çevirdim. Bir bidon daha, diye diye.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Son sepet de bitti. Annem "tokum" dedi. Tok değildi.' },
      { kim: 'ic', kosul: function (d) { return d.su.ertesiGunKesinti > 0; }, metin: 'İki bidon eksildi. Annem sordu, "Rıza Amca\'ya" dedim. Bir şey demedi, başını salladı.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci <= KS.config.KECI.cokDusuk; }, metin: 'Gece ağıla baktım. {keci} başını kaldırmadı.' },
      { kim: 'ic', kosul: gunu(1), metin: 'İlk günü atlattık. Yarın pay yine aynı, ihtiyaç yine fazla.' },
      { kim: 'ic', kosul: gunu(2), metin: 'Tohumları cebimde buldum. Yarın sabah erken ekerim.' },
      { kim: 'ic', kosul: gunu(3), metin: 'Bir buçuk metre. Yatağıma uzandım, kuyunun dibini düşündüm.' },
      { kim: 'ic', kosul: gunu(4), metin: 'Sardunya hâlâ orada. Annem suyunu sormadı, ben de söylemedim.' },
      { kim: 'ic', kosul: gunu(5), metin: '"O adamı bir tek muhtar..." Bir tek muhtar ne?' },
      { kim: 'ic', kosul: gunu(6), metin: 'Muhtar bana "dinletebilirsen dinlet" dedi. Bir çocuk Rıza Amca\'ya ne dinletir?' },
      { kim: 'ic', kosul: gunu(7), metin: 'Boş bidonla dönüşü gözümün önünden gitmiyor.' },
      { kim: 'ic', kosul: gunu(8), metin: 'Yarın toplantı. Herkes evine erken çekildi. Köy ilk kez bu kadar sessiz.' }
    ] },

    // ---------- Komşuyla karşılaşma ----------
    { id: 'kars_ilk', satirlar: [
      { kim: 'mehmet', metin: 'Rıza Amca, bir şey söyleyecektim.' },
      { kim: 'komsu', metin: 'Muhtar mı gönderdi seni? Söyle ona, benim işime karışmasın.' }
    ] },
    { id: 'kars_sonraki', satirlar: [
      { kim: 'mehmet', metin: 'Rıza Amca, bir şey söyleyecektim.' },
      { kim: 'komsu', metin: 'Yine mi sen? Söyle bakalım.' }
    ] },
    { id: 'kars_bos', satirlar: [
      { kim: 'ic', metin: 'Ne desem bilemedim. Önce köydekilerle konuşmalıyım.' },
      { kim: 'komsu', kosul: aksam, metin: 'Söyleyecek bir şeyin yoksa git işine.' },
      { kim: 'komsu', kosul: ogle, metin: 'Çayını iç de git, evlat. Annen merak eder.' }
    ] },
    { id: 'kars_vazgec', satirlar: [
      { kim: 'ic', metin: 'Bugün ağzımı açamadım. Belki başka zaman.' }
    ] },
    { id: 'kars_bos_obruk', satirlar: [
      { kim: 'ic', metin: 'Şimdi ne desem boş.' },
      { kim: 'komsu', metin: 'Git evlat. Burası tehlikeli.' }
    ] },
    { id: 'kars_ikna_sonrasi', satirlar: [{ kim: 'komsu', metin: 'Bakarız dedim ya, evlat. Git şimdi.' }] },
    { id: 'kars_ikna_sonrasi_obruk', satirlar: [
      { kim: 'komsu', metin: '(başını kaldırmadan) Bakarız demiştim. Bakacak tarla da kalmadı. Git evlat.' }
    ] },
    { id: 'kars_ozur', satirlar: [
      { kim: 'komsu', metin: '(homurdanır) Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?' }
    ] },
    { id: 'kars_geri_al', satirlar: [
      { kim: 'komsu', metin: '(derin nefes alır) Bugün kimseyle kavga edecek hâlim yok. Söyle.' }
    ] },
    { id: 'kars_bir_arguman', satirlar: [
      { kim: 'komsu', metin: 'Laf çok, evlat. Bir laf ne değiştirir? Yeter bu kadar.' },
      { kim: 'ekran', metin: 'Defter: Komşuyu ikna et 1/{gereken}' }
    ] },
    { id: 'kars_ikna', satirlar: [
      { kim: 'komsu', metin: '(uzun süre susar) Muhtar mı gönderdi seni, doğru söyle.' },
      { kim: 'mehmet', metin: 'Muhtar amca dinletebilirsen dinlet dedi. Ama gelmek benim fikrimdi.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: 'Toplantı ne zaman?' },
      { kim: 'mehmet', kosul: gunu(KS.config.OBRUK_GUNU - 1), metin: 'Cuma akşamı, muhtarlıkta.' },
      { kim: 'mehmet', kosul: gunu(KS.config.OBRUK_GUNU), metin: 'Yarın akşam, muhtarlıkta.' },
      { kim: 'komsu', kosul: sonGun, metin: 'Toplantı bu akşam mı?' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Bu akşam, muhtarlıkta.' },
      { kim: 'komsu', metin: 'Bakarız. (arkasını döner, sonra durur) Bakarız dedim, git şimdi.' },
      { kim: 'ekran', metin: 'Defter: Komşuyu ikna et ✓' }
    ] },
    { id: 'ikna_A1_nazik', satirlar: [
      { kim: 'komsu', metin: '(bir an durur) Söğüt... Herkes "Rıza\'nın söğüdü" derdi. (yüzünü çevirir) O dere çoktan gitti.' },
      { kim: 'komsu', metin: 'Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde?' }
    ] },
    { id: 'ikna_A1_kaba', satirlar: [
      { kim: 'komsu', metin: 'İdareyi sen mi öğreteceksin bana? Benim belgem var, devletten aldım.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },
    { id: 'ikna_A2_nazik', satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Obruk ovanın öbür ucunda olur. Bizim burada olmaz. (ama gözünü tarlasından ayırmaz)' },
      { kim: 'ekran', kosul: obrukOncesi, metin: 'Rıza Amca buna şimdilik inanmıyor.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: '(çukura doğru bakar) Öğretmen söylemişti, değil mi? Ben dinlemedim.' }
    ] },
    { id: 'ikna_A2_kaba', satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Öyle mi? Başka emrin var mı, evlat?' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: 'Kırk yılın üstüne bir de senden mi dinleyeceğim? Git.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },
    { id: 'ikna_A3_nazik', satirlar: [
      { kim: 'komsu', metin: '(sesi yumuşar) Kırk gün taş taşıdık. Elimizde nasır kaldı. (güler) Muhtar mı anlattı bunu?' },
      { kim: 'komsu', metin: 'O sarnıç yıkıldı. Biz de... neyse.' }
    ] },
    { id: 'ikna_A3_kaba', satirlar: [
      { kim: 'komsu', metin: 'Benimle muhtarın arasına girme. Sen bilmezsin ne olduğunu.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.' }
    ] },

    // ---------- Ortak ----------
    { id: 'ev_isi', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: surum(0), metin: 'Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum.' },
      { kim: 'anne', kosul: surum(1), metin: 'Bu sabah da sana kaldı, oğlum. Elim ayağım tutmuyor.' },
      { kim: 'anne', kosul: surum(2), metin: 'Önce eve bak bugün, Mehmet. Gerisi bekler.' },
      { kim: 'ic', kosul: tekGun, metin: 'Çamaşır, bulaşık, bebeğin bezi. {keci} bugün bakımsız kaldı.' },
      { kim: 'ic', kosul: ciftGun, metin: 'Çamaşır, bulaşık, bebeğin bezi. Bahçeye bugün bakamadım.' }
    ] },
    { id: 'kuyu_uyari', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ogretmen', kosul: sonGunDegil, metin: 'Bu sabah ip yine uzadı. Böyle giderse eylüle kuyu dibi görünür.' },
      { kim: 'ogretmen', kosul: sonGun, metin: 'Bu sabah ip yine uzadı. Akşamki toplantı boşa gitmesin.' }
    ] },

    // ---------- Sonlar ----------
    { id: 'son_iyi_sarnic', mekan: 'sarnic', zaman: 'yagmur', mekanSecenek: function () { return { onarildi: true }; }, satirlar: [
      { kim: 'ic', ortam: 'yagmur', metin: 'Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor, ikisi de ıslak, ikisi de susuyor.' },
      { kim: 'muhtar', metin: 'Seksen dokuzda da böyle durmuştuk, hatırlıyor musun?' },
      { kim: 'komsu', metin: 'Hatırlıyorum. Sonra motoru aldım, sen de peşime düştün.' },
      { kim: 'muhtar', metin: 'Kaç kere geldim kapına. "Rıza, saati kıs." "Rıza, gece çalıştırma, kuyu iniyor."' },
      { kim: 'komsu', metin: 'Ben de her seferinde "belgem var" dedim. Kapıyı yüzüne kapattım.' },
      { kim: 'muhtar', metin: 'Bir yıl böyle gitti. Sonunda dayanamadım, şikâyet yazdım.' },
      { kim: 'komsu', metin: 'Bütün köy duydu. Ona içerledim.' },
      { kim: 'muhtar', metin: 'Haklıydım belki. Ama seni kaybetmeye değmezdi.' },
      { kim: 'komsu', metin: '(güler) Benim inadım da değmezdi.' },
      { kim: 'komsu', kosul: function (d) { return d.komsu.suGoturme > 0; }, metin: '(Mehmet\'i gösterir) Sırayı önümde kapattılar, bana bidon getiren bu çocuk oldu. Babası da böyle taşırdı.' },
      { kim: 'ogretmen', metin: 'Bir yağmurla dolmaz. Yıllarca çektik, yıllarca bekleyeceğiz.' }
    ] },
    { id: 'son_iyi_ev', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: true }; }, satirlar: [
      { kim: 'ekran', ortam: null, metin: 'Köy çeşmesinden ilk damla.' },
      { kim: 'ic', metin: 'Az. Ama akıyor.' },
      { kim: 'ic', kosul: function (d) { return d.komsu.iletilen.indexOf('A1') >= 0; }, metin: 'Rıza Amca sarnıcın yanına bir söğüt dalı dikmiş.' },
      { kim: 'ic', kosul: keciIyi, metin: '{keci} sabah sağıldı. Annem peynir mayalıyor.' },
      { kim: 'ic', kosul: kecidusuk, metin: '{keci} ayağa kalktı. Yavaş yavaş toparlanıyor.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Sofra hâlâ yoksul. Ama artık köyce paylaşıyoruz.' },
      { kim: 'baba', ses: 'kapi', metin: 'Ben geldim.' },
      { kim: 'ic', metin: 'Koştum. Bir şey diyemedim. Annem kardeşimi ona uzattı.' },
      { kim: 'baba', metin: 'Muhtar anlattı. Rıza\'nın kapısına gitmişsin.' },
      { kim: 'mehmet', metin: 'Biri gitmeliydi.' },
      { kim: 'baba', metin: 'Ben gidemedim. Yıllarca duvar duvara oturduk, gidemedim.' },
      { kim: 'ic', metin: 'Şehirde iş bulamamış. Ama köyde iş var artık: borular, sayaçlar.' },
      { kim: 'ekran', ses: 'bebek_gul', metin: 'Zor ama birlikte kaldık.' }
    ] },
    { id: 'son_kotu_avlu', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: false }; }, satirlar: [
      { kim: 'ekran', kosul: ikna, metin: 'Plan kabul edildi. Ama kuyu çok inmişti.' },
      { kim: 'ekran', metin: 'Eylülde köy kuyusu dibini gösterdi.' },
      { kim: 'anne', metin: 'Kamyon gelmiş. Eşyalar hazır mı?' },
      { kim: 'ic', metin: 'Babam şehirde bir oda bulmuş. Hepimiz oraya.' },
      { kim: 'ic', metin: 'Yol parası lazımdı. İpi pazarcıya kendim uzattım. {keci} dönüp baktı. Ben bakamadım.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem günlerdir konuşmuyor.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Son günlerde sofrada ekmekten başka bir şey yoktu.' }
    ] },
    { id: 'son_kotu_yol', mekan: 'koy_cikisi', zaman: 'ogle', satirlar: [
      { kim: 'ic', sesSoner: ['kamyon', 'bebek_agla'], metin: 'Fatma Teyze\'yle Hasan Amca kapının önündeydi. El salladılar. Onlar gitmiyor. Nereye gitsinler?' },
      { kim: 'ic', metin: 'Kardeşim ağlamaktan yoruldu; kamyon sallandıkça annemin kucağında uyudu.' },
      { kim: 'ic', metin: 'Uzakta şehir. Dumanın altında.' },
      { kim: 'ic', metin: 'Babam otogarda bekleyecekmiş. "Her şey yoluna girecek" dedi telefonda. Sesi yine yorgundu.' }
    ] },
    { id: 'son_kotu_sarnic', mekan: 'sarnic', zaman: 'yagmur', satirlar: [
      { kim: 'ekran', ortam: 'yagmur', metin: 'İlk yağmur.' },
      { kim: 'ekran', metin: 'Kırık sarnıca ve boş avluya yağmur yağdı.' },
      { kim: 'ekran', metin: 'Tutacak sarnıç kalmamıştı.' }
    ] }
  ];

  KS.SONLAR = {
    iyi: ['son_iyi_sarnic', 'son_iyi_ev'],
    kotu: ['son_kotu_avlu', 'son_kotu_yol', 'son_kotu_sarnic']
  };

  // Haritada yapılacak bir şey olmayan yerler: zaman harcamayan kısa düşünce. İlk tutan gösterilir.
  function ogle(d) { return d.dilim === 'ogle'; }
  function aksam(d) { return d.dilim === 'aksam'; }
  KS.YER_DUSUNCELERI = [
    { yer: 'yasliCift', kosul: ogle, metin: 'Öğlen sıcağında Hasan Amca uyur. Rahatsız etmeyeyim.' },
    { yer: 'yasliCift', metin: 'Işıkları sönmüş, uyumuşlar sanırım. Rahatsız etmeyeyim.' },
    { yer: 'muhtar', kosul: ogle, metin: 'Muhtarlığın kapısı kapalı. Muhtar akşamları burada olur.' },
    { yer: 'muhtar', metin: 'Muhtar içeride, başı kâğıtlarda. Şimdilik söyleyecek bir şeyim yok.' },
    { yer: 'ogretmen', kosul: ogle, metin: 'Okul kilitli. Öğretmen sabahları kuyuda, akşamları burada olur.' },
    { yer: 'ogretmen', metin: 'Okulun ışığı yanıyor ama defterlerine gömülmüştür. Şimdi bölmeyeyim.' },
    { yer: 'komsu', kosul: ikna, metin: 'Rıza Amca "bakarız" dedi. Şimdi üstüne gitmeyeyim.' },
    { yer: 'komsu', kosul: function (d) { return ogle(d) && d.gun < KS.config.KOMSUYA_SU.ilkGun; }, metin: 'Kapısını çalmak için bir bahanem yok.' },
    { yer: 'komsu', kosul: ogle, metin: 'Rıza Amca\'nın kapısı kapalı. Bugün yeniden gitmenin anlamı yok.' },
    { yer: 'komsu', metin: 'Motorun sesinden başka ses yok. Kapısını çalacak bir sözüm yok şimdi.' },
    { yer: 'komsuTarlasi', kosul: obrukSonrasi, metin: 'Çukurun çevresine ip çekmişler. Yaklaşmayayım.' },
    { yer: 'komsuTarlasi', metin: 'Motor gürül gürül çalışıyor. Başkasının tarlasında işim yok.' },
    { yer: 'kuyu', kosul: ogle, metin: 'Bugünkü payımızı aldık. Sırayı boşuna uzatmayayım.' },
    { yer: 'kuyu', metin: 'Kuyu başı boşaldı. Bu saatte su çekene iyi gözle bakmazlar.' },
    { yer: 'sarnic', kosul: function (d) { return d.plan; }, metin: 'Sarnıcın önüne taş yığmışlar. Büyükler çalışıyor, ayak altında dolaşmayayım.' },
    { yer: 'sarnic', kosul: aksam, metin: 'Karanlıkta oraya çıkılmaz.' },
    { yer: 'sarnic', metin: 'Yukarıdaki eski sarnıç. Bu sıcakta oraya kadar çıkmaya değmez.' },
    { yer: 'tepe', kosul: aksam, metin: 'Hava kararırken tepeye çıkılmaz.' },
    { yer: 'tepe', kosul: function (d) { return d.bayraklar.babaArandi; }, metin: 'Babamla konuştum. Bir daha aramaya kontör de yok.' },
    { yer: 'tepe', metin: 'Telefon burada çeker ama babam bu saatte iş peşindedir. Sonra denerim.' },
    { yer: '*', metin: 'Burada şimdilik işim yok.' }
  ];

  KS.yerDusuncesi = function (yer, d) {
    var bulunan = KS.YER_DUSUNCELERI.filter(function (o) {
      return (o.yer === yer || o.yer === '*') && (!o.kosul || o.kosul(d));
    })[0];
    return KS.metinSec(bulunan);
  };

  // Komşuya söylenecekler: her argümanın iki tonu. Sıra bilerek karışık; nazik hep önde olmasın.
  KS.IKNA_SECENEK = {
    A1: [
      { ton: 'kaba', metin: 'Eskiden dere vardı. Herkes biraz idareli olsaydı hâlâ akardı.' },
      { ton: 'nazik', metin: 'Hasan Amca anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.' }
    ],
    A2: [
      { ton: 'kaba', kosul: obrukOncesi, metin: 'En doğrusu motoru hemen kapatmanız.' },
      { ton: 'nazik', kosul: obrukOncesi, metin: 'Öğretmen ölçtü, kuyu bir ayda bir buçuk metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.' },
      { ton: 'nazik', kosul: obrukSonrasi, metin: 'Öğretmen tek motorun açmadığını söyledi. Ama hepimiz çektikçe sıra birinin tarlasına geliyor.' },
      { ton: 'kaba', kosul: obrukSonrasi, metin: 'Görüyorsunuz işte. En doğrusu artık motoru kapatmanız.' }
    ],
    A3: [
      { ton: 'nazik', metin: 'Muhtar amca anlattı. Seksen dokuzda sarnıcın oluğunu beraber çakmışsınız.' },
      { ton: 'kaba', metin: 'Muhtar amca sizi hâlâ düşünüyor. Gidip barışsanız herkes için iyi olur.' }
    ]
  };
  KS.IKNA_METIN = {
    soru: { kim: 'ic', metin: 'Ne diyeyim?' },
    gec: { metin: '(Bunu açmayayım.)' },
    ozurSoru: { kim: 'ic', metin: 'Geçen sefer ağzımdan çıkanı düzeltmeliyim.' },
    ozur: { metin: 'Geçen sefer yanlış konuştum, kusura bakmayın.' },
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
      if (o.sonraki && ids.indexOf(o.sonraki) < 0) uyarilar.push(o.id + ': eksik sonraki ' + o.sonraki);
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
