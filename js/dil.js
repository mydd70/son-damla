// dil.js – Arayüz metinleri (tr/en), karakter adları ve metin seçimi. Hikaye metni story.js'te.
var KS = globalThis.KS = globalThis.KS || {};

KS.dil = 'tr';

KS.METIN = {
  tr: {
    oyunAdi: 'Köyümün Suyu',
    basla: 'Başla',
    keciSoru: 'Keçimizin adı ne?',
    tamam: 'Tamam',
    devam: 'Devam',
    vazgec: 'Vazgeç',
    gun: 'Gün {n}',
    dilim_sabah: 'Sabah', dilim_ogle: 'Öğle', dilim_aksam: 'Akşam',
    gosterge_keci: 'Keçi', gosterge_ev: 'Ev', gosterge_bahce: 'Bahçe', gosterge_kiler: 'Kiler', gosterge_kuyu: 'Kuyu',
    dagitimBaslik: 'Bugünkü su payı',
    kalan: 'Kalan: {n} damla',
    ihtiyac: 'İhtiyaç: {n}',
    griSu: 'Gri su: +{n}',
    fazlaCek: 'Kuyudan fazladan çek (+{n})',
    fazlaGeriAl: 'Fazladan çekme (+{n})',
    haritaOgle: 'Öğle. Nereye gidiyorsun?',
    haritaAksam: 'Akşam. Kime uğruyorsun?',
    eylem_komsuyaSu: 'Komşuya su götür (yarınki paydan {n} damla düşer)',
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
    keciTara: '{keci}\'nin sırtını tara: üstünde basılı tutup sağa sola sürükle.',
    keciSu: 'Su kabını göster.',
    keciYem: 'Yemini ver.',
    suKabi: 'Su kabı',
    yem: 'Yem',
    ertesiPay: 'Yarınki su payı: {n} damla.',
    eksikBaslik: 'Neler eksik kaldı',
    eksik_komsu: 'Komşu planı desteklemedi, motoru çalışmaya devam etti.',
    eksik_kuyu: 'Kuyu çok düştü.',
    eksik_olcum: 'Ölçüm geç ulaştı, plan zayıf kaldı.',
    finalMetni: '[Final metni buraya gelecek.]',
    tekrarOyna: 'Tekrar oyna'
  },
  en: {
    oyunAdi: 'Water of My Village',
    basla: 'Start',
    keciSoru: "What is our goat's name?",
    tamam: 'OK',
    devam: 'Continue',
    vazgec: 'Back',
    gun: 'Day {n}',
    dilim_sabah: 'Morning', dilim_ogle: 'Noon', dilim_aksam: 'Evening',
    gosterge_keci: 'Goat', gosterge_ev: 'Home', gosterge_bahce: 'Garden', gosterge_kiler: 'Pantry', gosterge_kuyu: 'Well',
    dagitimBaslik: "Today's water share",
    kalan: 'Left: {n} drops',
    ihtiyac: 'Needs: {n}',
    griSu: 'Greywater: +{n}',
    fazlaCek: 'Draw extra from the well (+{n})',
    fazlaGeriAl: 'Do not draw extra (+{n})',
    haritaOgle: 'Noon. Where are you going?',
    haritaAksam: 'Evening. Who will you visit?',
    eylem_komsuyaSu: "Take water to the neighbor ({n} drops off tomorrow's share)",
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
    ertesiPay: "Tomorrow's water share: {n} drops.",
    eksikBaslik: 'What was missing',
    eksik_komsu: 'The neighbor did not back the plan; his motor kept running.',
    eksik_kuyu: 'The well dropped too far.',
    eksik_olcum: 'The measurement arrived late, so the plan stayed weak.',
    finalMetni: '[Final text will go here.]',
    tekrarOyna: 'Play again'
  }
};

// portre: assets/portraits/ dosya adı (Aşama 8). siluet: portresi olmayan karakter.
KS.KARAKTERLER = {
  ekran:    { tr: '', en: '' },
  mehmet:   { tr: 'Mehmet', en: 'Mehmet', portre: 'mehmet' },
  ic:       { tr: 'Mehmet (iç ses)', en: 'Mehmet (thinking)', portre: 'mehmet' },
  anne:     { tr: 'Anne', en: 'Mother', portre: 'anne' },
  baba:     { tr: 'Babam', en: 'Dad', portre: 'baba' },
  dede:     { tr: 'Hasan Dede', en: 'Grandpa Hasan', portre: 'yasli_cift' },
  nine:     { tr: 'Fatma Nine', en: 'Grandma Fatma', portre: 'yasli_cift' },
  komsu:    { tr: 'Rıza Amca', en: 'Uncle Rıza', portre: 'komsu' },
  muhtar:   { tr: 'Muhtar', en: 'Headman', portre: 'muhtar' },
  ogretmen: { tr: 'Zeynep Öğretmen', en: 'Ms. Zeynep', portre: 'ogretmen' },
  koylu:    { tr: 'Köylü', en: 'Villager', siluet: true }
};

// Gösterge durum kelimelerinin ve harita yer adlarının İngilizcesi (Türkçeleri config.js ve scenes.js'te).
KS.DURUM_EN = {
  'Hasta': 'Sick', 'Zayıf': 'Weak', 'Toparlanıyor': 'Recovering', 'Sağlıklı': 'Healthy',
  'Gergin': 'Tense', 'Yorgun': 'Tired', 'Sakin': 'Calm', 'Huzurlu': 'Peaceful',
  'Kurumuş': 'Dried up', 'Susuz': 'Thirsty', 'İdare eder': 'Getting by', 'Yeşil': 'Green'
};
KS.YER_EN = {
  ev: 'Home', yasliCift: 'Old couple', muhtar: "Headman's office", ogretmen: 'School',
  komsu: "Neighbor's house", komsuTarlasi: "Neighbor's field", kuyu: 'Village well', sarnic: 'Cistern', tepe: 'Hill'
};

// Eksik anahtarda Türkçeye düşer, o da yoksa anahtarı gösterir; oyun durmaz.
KS.t = function (anahtar, degerler) {
  var m = KS.METIN[KS.dil][anahtar];
  if (m === undefined) {
    console.warn('Eksik metin:', KS.dil, anahtar);
    m = KS.METIN.tr[anahtar];
    if (m === undefined) m = anahtar;
  }
  if (degerler) for (var k in degerler) m = m.replace('{' + k + '}', degerler[k]);
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
