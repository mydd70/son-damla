// dil.js – Arayüz metinleri (tr/en), karakter adları ve metin seçimi. Hikaye metni story.js'te.
var KS = globalThis.KS = globalThis.KS || {};

KS.dil = 'tr';

KS.METIN = {
  tr: {
    oyunAdi: 'Köyümün Suyu',
    basla: 'Başla',
    devamEt: 'Devam et',
    yeniOyun: 'Yeni oyun',
    atla: 'Atla',
    sesDugmesi: 'Sesi aç ya da kapat',
    yonUyari: 'Cihazını yatay çevir',
    keciSoru: 'Keçimizin adı ne?',
    tamam: 'Tamam',
    devam: 'Devam',
    ipucu: 'İpucu',
    gecis_ogle: 'Öğleye geç →', gecis_aksam: 'Akşama geç →', gecis_eveDon: 'Eve dön →', gecis_gunuBitir: 'Günü bitir →',
    pas_ogle: 'Bu öğle bir şey yapma', pas_aksam: 'Bu akşam bir şey yapma',
    geriDon: 'Geri dön',
    planBaslik: 'Günün planı',
    plan_serbest: 'serbest', plan_belirsiz: '?',
    gunPayi: 'Bugünkü su payı: {n} damla.',
    gunPayiKesinti: '({n} damlası Rıza Amca\'ya gitti.)',
    griSatir: 'Gri su',
    griYok: 'Eve {n} damla daha ver, bahçeye su dönsün.',
    griVar: 'Evden dönen {n} damla bahçeye gidiyor.',
    vazgec: 'Vazgeç',
    gun: 'Gün {n}',
    dilim_sabah: 'Sabah', dilim_ogle: 'Öğle', dilim_aksam: 'Akşam',
    kilerBos: 'boş',
    kilerOzet: 'Kiler: {parcalar}',
    kiler_sut: 'keçiden süt +1', kiler_sutYok: 'keçi süt vermedi',
    kiler_sebze: 'bahçeden sebze +1', kiler_sebzeYok: 'bahçe sebze vermedi',
    kiler_sofra: 'sofra −{n}', kiler_sofraYok: 'sofraya yetmedi, annen kuyuya indi',
    sofraOnizleme: 'Bu akşamki sofra (şimdilik): kilerde {k} · {sut} · {sebze} → {sonuc}',
    sofraYeter: 'yeter', sofraYetmez: 'yetmez, annen kuyuya iner',
    gosterge_keci: 'Keçi', gosterge_ev: 'Ev', gosterge_bahce: 'Bahçe', gosterge_kiler: 'Kiler', gosterge_kuyu: 'Kuyu',
    dagitimBaslik: 'Bugünkü su payı',
    kalan: 'Kalan: {n} damla',
    bosaGider: 'Kalan {n} damla boşa gidecek. Hâlâ su isteyen bir satır var.',
    tamamBosa: 'Yine de tamam',
    suDurum_iyi: 'Yeterli', suDurum_orta: 'Biraz eksik', suDurum_eksik: 'Eksik', suDurum_kotu: 'Çok eksik',
    yer_avlu: 'Ev', yer_koy_yolu: 'Köy yolu', yer_kuyu_basi: 'Kuyu başı', yer_yasli_cift_evi: 'Yaşlı çiftin evi',
    yer_tepe: 'Tepe', yer_komsu_tarlasi: 'Rıza Amca\'nın tarlası', yer_muhtarlik: 'Muhtarlık', yer_sarnic: 'Sarnıç', yer_koy_cikisi: 'Köy çıkışı',
    icmeSuyu: 'Evin {n} damlası içme suyu, ondan vazgeçilmez.',
    fazlaCek: 'Kuyudan fazladan çek (+{n})',
    fazlaGeriAl: 'Fazladan çekme (+{n})',
    haritaOgle: 'Öğle. Nereye gidiyorsun?',
    haritaAksam: 'Akşam. Kime uğruyorsun?',
    eylem_komsuyaSu: 'Komşuya su götür (yarınki paydan {n} damla düşer)',
    eylem_komsuyaSonSu: 'Komşuya su götür (son fırsat)',
    eylem_bahceEkIs: 'Bahçede ek iş',
    eylem_evdeYardim: 'Evde yardım',
    eylem_babayiAra: 'Babayı ara',
    eylem_camur: 'Çamurda serinle',
    eylem_aileVakti: 'Ailenle vakit geçir',
    eylem_ziyaret: 'Ziyaret et',
    eylem_olcumGoturme: 'Ölçümü muhtara götür',
    miniOyun_keciBakimi: 'Keçi bakımı',
    miniOyun_otYolma: 'Ot yolma',
    hizliGec: 'Hızlı geç',
    yenidenDene: 'Yeniden dene',
    otYonerge: 'Otların üstüne dokunarak yol. {n} saniyen var.',
    otSureBitti: 'Süre bitti, bahçede ot kaldı.',
    keciTara: '{keci} seni bekliyor. Sırtını tara: üstünde basılı tutup sağa sola sürükle.',
    keciSu: 'Su kabını göster.',
    keciYem: 'Yemini ver.',
    suKabi: 'Su kabı',
    yem: 'Yem',
    eksikBaslik: 'Neler eksik kaldı',
    eksik_komsu: 'Plan oylamada eşit kaldı; Rıza Amca\'yla köprü kurulamadı.',
    eksik_kuyu: 'Kuyudan çekilen su, yerine gelenden çoktu. Kuyu toparlanamayacak kadar düştü.',
    eksik_olcum: 'Öğretmenin ölçümü muhtara geç ulaştı; plan geç ve zayıf kuruldu.',
    defter: 'Defter',
    defterBaslik: 'Mehmet\'in Defteri',
    defterGorevler: 'Yapılacaklar',
    defterArgumanlar: 'Rıza Amca\'ya söylenebilecekler',
    defterBos: 'Henüz not yok.',
    kapat: 'Kapat',
    gorev_olcum: 'Öğretmenin ölçümünü muhtara götür (gün {gun} akşamına kadar)',
    gorev_olcumGec: 'Ölçüm muhtara zamanında ulaşmadı',
    gorev_komsu: 'Komşuyu ikna et: {sayi}/{gereken}',
    arguman_A1: 'Rıza Amca\'nın söğüdü',
    arguman_A2: 'Obruk uyarısı',
    arguman_A3: 'Muhtarla Rıza Amca\'nın sarnıcı',
    argumanDurum_iletildi: 'söylendi',
    argumanDurum_kilitli: 'artık dinlemiyor',
    argumanDurum_inanmaz: 'şimdilik inanmaz',
    argumanDurum_hazir: '',
    finalMetni: '[Final metni buraya gelecek.]',
    tekrarOyna: 'Tekrar oyna',
    kaynaklar: 'Kaynaklar',
    kaynaklarBaslik: 'Kaynaklar ve lisanslar',
    kaynak_ses: 'Sesler',
    kaynak_muzik: 'Müzik',
    kaynak_gorsel: 'Görseller',
    kaynak_kod: 'Kod ve metin',
    kaynakGorselSatir: 'Portreler: Stable Diffusion, Pixel Art Diffusion XL (YamerOfficial, CreativeML Open RAIL++-M). Sahneler: Claude ile SVG siluet, ChatGPT ile görsele dönüştürme.',
    kaynakKodSatir: 'Claude (Anthropic) ile üretildi.',
    kaynakDegisiklik: 'Sesler kırpıldı, filtrelendi ya da seviyesi ayarlandı. Beautiful Piano değiştirilmedi.'
  },
  en: {
    oyunAdi: 'Water of My Village',
    basla: 'Start',
    devamEt: 'Continue',
    yeniOyun: 'New game',
    atla: 'Skip',
    sesDugmesi: 'Turn sound on or off',
    yonUyari: 'Rotate your device to landscape',
    keciSoru: "What is our goat's name?",
    tamam: 'OK',
    devam: 'Continue',
    ipucu: 'Tip',
    gecis_ogle: 'On to noon →', gecis_aksam: 'On to evening →', gecis_eveDon: 'Go home →', gecis_gunuBitir: 'End the day →',
    pas_ogle: 'Do nothing this noon', pas_aksam: 'Do nothing this evening',
    geriDon: 'Go back',
    planBaslik: "Today's plan",
    plan_serbest: 'free', plan_belirsiz: '?',
    gunPayi: "Today's water share: {n} drops.",
    gunPayiKesinti: '({n} of them went to Uncle Rıza.)',
    griSatir: 'Greywater',
    griYok: 'Give home {n} more drops so water returns to the garden.',
    griVar: '{n} drops from home go to the garden.',
    vazgec: 'Back',
    gun: 'Day {n}',
    dilim_sabah: 'Morning', dilim_ogle: 'Noon', dilim_aksam: 'Evening',
    kilerBos: 'empty',
    kilerOzet: 'Pantry: {parcalar}',
    kiler_sut: 'milk from the goat +1', kiler_sutYok: 'no milk from the goat',
    kiler_sebze: 'vegetables from the garden +1', kiler_sebzeYok: 'no vegetables from the garden',
    kiler_sofra: 'table −{n}', kiler_sofraYok: 'not enough for the table, your mother went to the well',
    sofraOnizleme: "Tonight's table (for now): {k} in the pantry · {sut} · {sebze} → {sonuc}",
    sofraYeter: 'enough', sofraYetmez: 'not enough, your mother will go to the well',
    gosterge_keci: 'Goat', gosterge_ev: 'Home', gosterge_bahce: 'Garden', gosterge_kiler: 'Pantry', gosterge_kuyu: 'Well',
    dagitimBaslik: "Today's water share",
    kalan: 'Left: {n} drops',
    bosaGider: 'The {n} drops left will go to waste. A row still needs water.',
    tamamBosa: 'OK anyway',
    suDurum_iyi: 'Enough', suDurum_orta: 'Slightly short', suDurum_eksik: 'Short', suDurum_kotu: 'Far too little',
    yer_avlu: 'Home', yer_koy_yolu: 'Village road', yer_kuyu_basi: 'The well', yer_yasli_cift_evi: "The old couple's house",
    yer_tepe: 'The hill', yer_komsu_tarlasi: "Uncle Rıza's field", yer_muhtarlik: "Headman's office", yer_sarnic: 'The cistern', yer_koy_cikisi: 'Edge of the village',
    icmeSuyu: "{n} of the home's drops are drinking water and cannot be given up.",
    fazlaCek: 'Draw extra from the well (+{n})',
    fazlaGeriAl: 'Do not draw extra (+{n})',
    haritaOgle: 'Noon. Where are you going?',
    haritaAksam: 'Evening. Who will you visit?',
    eylem_komsuyaSu: "Take water to the neighbor ({n} drops off tomorrow's share)",
    eylem_komsuyaSonSu: 'Take water to the neighbor (last chance)',
    eylem_bahceEkIs: 'Extra work in the garden',
    eylem_evdeYardim: 'Help at home',
    eylem_babayiAra: 'Call Dad',
    eylem_camur: 'Cool off in the mud',
    eylem_aileVakti: 'Spend time with family',
    eylem_ziyaret: 'Visit',
    eylem_olcumGoturme: 'Take the measurement to the headman',
    miniOyun_keciBakimi: 'Goat care',
    miniOyun_otYolma: 'Weeding',
    hizliGec: 'Skip',
    yenidenDene: 'Try again',
    otYonerge: 'Tap the weeds to pull them. You have {n} seconds.',
    otSureBitti: 'Time is up, weeds are still left in the garden.',
    keciTara: "Brush {keci}'s back: press and drag from side to side.",
    keciSu: 'Show the water bowl.',
    keciYem: 'Give the feed.',
    suKabi: 'Water bowl',
    yem: 'Feed',
    eksikBaslik: 'What was missing',
    eksik_komsu: 'The vote stayed tied; no bridge was built to Uncle Rıza.',
    eksik_kuyu: 'More water was drawn from the well than came back. It fell too low to recover.',
    eksik_olcum: "The teacher's measurement reached the headman late; the plan came late and stayed weak.",
    defter: 'Notebook',
    defterBaslik: "Mehmet's Notebook",
    defterGorevler: 'To do',
    defterArgumanlar: 'Things to tell Uncle Rıza',
    defterBos: 'No notes yet.',
    kapat: 'Close',
    gorev_olcum: "Take the teacher's measurement to the headman (by the evening of day {gun})",
    gorev_olcumGec: 'The measurement did not reach the headman in time',
    gorev_komsu: 'Persuade the neighbor: {sayi}/{gereken}',
    arguman_A1: "Uncle Rıza's willow",
    arguman_A2: 'Sinkhole warning',
    arguman_A3: 'The cistern of the headman and Uncle Rıza',
    argumanDurum_iletildi: 'told',
    argumanDurum_kilitli: 'no longer listening',
    argumanDurum_inanmaz: "won't believe it yet",
    argumanDurum_hazir: '',
    finalMetni: '[Final text will go here.]',
    tekrarOyna: 'Play again',
    kaynaklar: 'Credits',
    kaynaklarBaslik: 'Credits and licenses',
    kaynak_ses: 'Sound',
    kaynak_muzik: 'Music',
    kaynak_gorsel: 'Images',
    kaynak_kod: 'Code and text',
    kaynakGorselSatir: 'Portraits: Stable Diffusion, Pixel Art Diffusion XL (YamerOfficial, CreativeML Open RAIL++-M). Scenes: SVG silhouettes with Claude, converted with ChatGPT.',
    kaynakKodSatir: 'Made with Claude (Anthropic).',
    kaynakDegisiklik: 'Sounds were trimmed, filtered or leveled. Beautiful Piano is unmodified.'
  }
};

// portre: assets/portraits/ dosya adı (Aşama 8). siluet: portresi olmayan karakter.
KS.KARAKTERLER = {
  ekran:    { tr: '', en: '' },
  ipucu:    { tr: '', en: '' },
  mehmet:   { tr: 'Mehmet', en: 'Mehmet', portre: 'mehmet' },
  ic:       { tr: 'Mehmet (iç ses)', en: 'Mehmet (thinking)', portre: 'mehmet' },
  anne:     { tr: 'Anne', en: 'Mother', portre: 'anne' },
  baba:     { tr: 'Baba', en: 'Dad', portre: 'baba' },
  dede:     { tr: 'Hasan Amca', en: 'Uncle Hasan', portre: 'dede' },
  nine:     { tr: 'Fatma Teyze', en: 'Aunt Fatma', portre: 'nine' },
  komsu:    { tr: 'Rıza Amca', en: 'Uncle Rıza', portre: 'komsu' },
  muhtar:   { tr: 'Muhtar', en: 'Headman', portre: 'muhtar' },
  ogretmen: { tr: 'Zeynep Öğretmen', en: 'Ms. Zeynep', portre: 'ogretmen' },
  koylu:    { tr: 'Köylü', en: 'Villager', siluet: true }
};

// Oyun içi atıf: eser, sahibi, lisans (özel ad, çevrilmez). Ayrıntılı liste KAYNAKLAR.md'de.
KS.KAYNAK_LISTESI = {
  ses: [
    'summer ambience, waweee, CC BY-NC 4.0', 'Ambience, Night Wildlife, A, InspectorJ, CC BY 4.0', 'babycry, jamesmbock, CC0',
    'Istanbul Grand Bazaar, RTB45, CC BY 4.0', 'Water pump motor close recording, felix.blume, CC0', 'Small metal bucket being picked up, melle_teich, CC0',
    'rope twist, Rinaldobowles56, CC0', 'Water Drips, Zwecker, CC0', 'Rain with drip sound, eaglechopper, CC0', 'rain.gutter, andriala, CC BY-NC 3.0',
    'Button Click 1, Mellau, CC BY-NC 4.0', 'hint, dland, CC0', 'Desert Ambient LOOP, Imjeax, CC BY 4.0', 'drip, Nightflame, CC0',
    'Large truck idling then driving away, TheFlyFishingFilmmaker, CC BY 4.0', 'smile 2 jo girl, klankbeeld, CC BY 4.0', 'Goat Sound 2, Erokia, CC0',
    'Door, Front, Opening, A, InspectorJ, CC BY 4.0', 'Weather & Nature SFX Free, heyheythere, CC BY 4.0'
  ],
  muzik: ['Beautiful Piano, Lite Saturation, CC BY-ND 4.0', "El's Entrance (Classic Version), Mr Smith, CC BY 4.0", 'Angel Dream, Mr Smith, CC BY 4.0']
};

// Gösterge durum kelimelerinin ve harita yer adlarının İngilizcesi (Türkçeleri config.js ve scenes.js'te).
KS.DURUM_EN = {
  'Hasta': 'Sick', 'Zayıf': 'Weak', 'Toparlanıyor': 'Recovering', 'Sağlıklı': 'Healthy',
  'Gergin': 'Tense', 'Yorgun': 'Tired', 'Sakin': 'Calm', 'Huzurlu': 'Peaceful',
  'Kurumuş': 'Dried up', 'Susuz': 'Thirsty', 'İdare eder': 'Getting by', 'Yeşil': 'Green'
};
KS.YER_EN = {
  ev: 'Home', yasliCift: 'Old couple', muhtar: "Headman's office", ogretmen: 'School',
  komsu: "Uncle Rıza's house", komsuTarlasi: "Uncle Rıza's field", kuyu: 'Village well', sarnic: 'Cistern', tepe: 'Hill'
};

// Dil tercihi: başlangıç ekranında seçilir, hatırlanır.
KS.dilSec = function (dil) {
  if (!KS.METIN[dil]) return;
  KS.dil = dil;
  try { localStorage.setItem(KS.config.DIL_ANAHTAR, dil); } catch (e) { /* önemsiz */ }
};

KS.dilYukle = function () {
  try {
    var kayitli = localStorage.getItem(KS.config.DIL_ANAHTAR);
    if (kayitli && KS.METIN[kayitli]) KS.dil = kayitli;
  } catch (e) { /* önemsiz */ }
};

// Eksik anahtarda Türkçeye düşer, o da yoksa anahtarı gösterir; oyun durmaz.
KS.t = function (anahtar, degerler) {
  var m = KS.METIN[KS.dil][anahtar];
  if (m === undefined) {
    console.warn('Eksik metin:', KS.dil, anahtar);
    m = KS.METIN.tr[anahtar];
    if (m === undefined) m = anahtar;
  }
  if (degerler) for (var k in degerler) m = m.split('{' + k + '}').join(degerler[k]);
  return m;
};

// Hikaye satırı ya da seçeneği: İngilizcede `en` varsa onu, yoksa `metin` alanını verir.
KS.metinSec = function (oge) {
  return (KS.dil === 'en' && oge.en) || oge.metin;
};

KS.karakterAdi = function (kim) {
  var k = KS.KARAKTERLER[kim];
  return k ? k[KS.dil] : kim;
};

KS.durumMetni = function (ad, deger) {
  var kelime = KS.durumEtiketi(ad, deger);
  return KS.dil === 'en' ? KS.DURUM_EN[kelime] : kelime;
};

KS.yerAdi = function (yer) {
  return KS.dil === 'en' ? KS.YER_EN[yer.id] : yer.ad;
};

if (typeof module !== 'undefined') module.exports = KS;
