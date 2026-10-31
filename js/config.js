// config.js – Tüm sabitler. Oyundaki her sayı yalnızca burada yazılır (tasarim_v4.md, bölüm 7).
var KS = globalThis.KS = globalThis.KS || {};

KS.config = {
  GUN_SAYISI: 9,
  DILIMLER: ['sabah', 'ogle', 'aksam'],

  // --- Su ---
  SU_PAYI: [11, 11, 10, 10, 9, 9, 8, 8, 7],        // gün 1..9
  IHTIYAC: { ev: 6, keci: 4, bahce: 4 },
  TOHUM: { bahceIhtiyaci: 3, etkiGunu: 3 },          // dayanıklı tohum, gün 3'ten
  FAZLA_CEKME: { damla: 4, kuyuKaybi: 5, gunlukSinir: 1 },
  GRI_SU: { bolen: 3 },                               // her 3 ev damlasına 1 bahçe damlası
  KOMSUYA_SU: { maliyet: 2, sinir: 2 },               // ertesi günün payından düşer
  // Dağıtımın göstergelere etkisi: yeterli / biraz eksik (1 damla) / çok eksik
  SU_ETKISI: { iyi: 1, orta: -1, kotu: -2 },

  // --- Göstergeler (0-10) ---
  GOSTERGE: { min: 0, max: 10 },
  KECI: { baslangic: 2, min: 1, sutEsigi: 5, iyiSu: 4, ortaSu: 3, bakim: 1, cokDusuk: 2, varsayilanAd: 'Pamuk', adUzunluk: 14 },
  BAHCE: { baslangic: 3, otYolma: 1, ekIs: 1, sebzeEsigi: 6 },
  KILER: { baslangic: 3, max: 6, tuketim: 1, sut: 1, sebze: 1 },
  EV: {
    baslangic: 4, iyiSu: 6, ortaSu: 5, enAzSu: 2,   // enAzSu: içme suyu, dağıtımda bunun altına inilmez
    aileVakti: 1, kilerBos: -2, evdeYardim: 1, camur: 1, babayiAra: 1,
    zorunluEsik: 3,        // altına inerse ertesi sabah zorunlu ev işi
    zorunluBonus: 2,
    aglamaEsigi: 4,        // gün 3'ten sonra ağlama yalnızca bunun altında
    aglamaHerSabahSonGun: 2,
    dusukUst: 4, yuksekAlt: 8   // iç ses, aile vakti, anne ipucu: ≤ dusukUst düşük, ≥ yuksekAlt yüksek
  },

  // --- Kuyu (gün sonunda uygulanır; gün 9'da toplantıdan önce) ---
  KUYU: {
    baslangic: 100,
    dogalDusus: 6,
    motor: 3,
    tasarruf: 1, tasarrufGunleri: [3, 5],   // gönüllü tasarruf, gün 3-5 (dahil)
    plan: { guclu: 5, zayif: 3 },
    esik: 35,                               // gizli; toplantıda kontrol
    uyari: 50
  },

  // --- Mini oyunlar ---
  MINI_OYUN: {
    otAdet: 9, otSure: 10,               // saniye
    otSutun: 5, otSatir: 3, otSarsinti: 0.3,   // otların dağılımı: ızgara ve hücre içi kayma oranı
    taramaTur: 4,                        // keçinin genişliği kadar kaç kez sürtülecek
    bitisBekleme: 600                    // milisaniye: son hamle görünsün diye
  },

  // --- Olaylar ve sistemler ---
  OLCUM: { teslimIlkGun: 3, teslimSonGun: 5 },
  PLAN_GUNU: 6,
  OBRUK_GUNU: 8,
  MUHTAR_ARGUMAN_ILK_GUN: 3,
  IKNA: { gerekenArguman: 2 },
  ARGUMANLAR: ['A1', 'A2', 'A3'],
  YASLI_CIFT: { yardim: 2, sinir: 2 },
  ZIYARET_HAKKI: { yasliCift: 2, muhtar: 1, ogretmen: 2, komsu: 1 },
  BABAYI_ARA_ILK_GUN: 3,
  CAMUR_ILK_GUN: 4,

  // Mekanik etkisi olan sabit olaylar (metinleri story.js'te, aynı id ile)
  SABIT_OLAYLAR: [
    { id: 'g1_acilis',     gun: 1, dilim: 'sabah', etkiler: {} },
    { id: 'g1_tanima',     gun: 1, dilim: 'ogle',  etkiler: {} },
    { id: 'g2_grisu',      gun: 2, dilim: 'sabah', etkiler: { bayrak: { griSu: true } } },
    { id: 'g2_yaslicift',  gun: 2, dilim: 'ogle',  etkiler: { bayrak: { dayanikliTohum: true } }, arguman: 'A1' },
    { id: 'g3_olcum',      gun: 3, dilim: 'sabah', etkiler: { bayrak: { olcumElde: true } }, arguman: 'A2' },
    { id: 'g4_cicek',      gun: 4, dilim: 'sabah', etkiler: { ev: 1 } },
    { id: 'g5_baba',       gun: 5, dilim: 'sabah', etkiler: { ev: 1 } },
    { id: 'g6_plan',       gun: 6, dilim: 'ogle',  etkiler: {}, plan: true, arguman: 'A3' },
    { id: 'g7_komsu',      gun: 7, dilim: 'sabah', etkiler: {}, karsilasma: true },
    { id: 'g8_obruk',      gun: 8, dilim: 'ogle',  etkiler: {}, karsilasma: true },
    { id: 'g9_toplanti',   gun: 9, dilim: 'aksam', etkiler: {}, toplanti: true }
  ],

  // Gösterge durum kelimeleri: [üst sınır, kelime]
  DURUM_ETIKETLERI: {
    keci:  [[2, 'Hasta'],   [4, 'Zayıf'],  [7, 'Toparlanıyor'], [10, 'Sağlıklı']],
    ev:    [[2, 'Gergin'],  [4, 'Yorgun'], [7, 'Sakin'],        [10, 'Huzurlu']],
    bahce: [[2, 'Kurumuş'], [4, 'Susuz'],  [7, 'İdare eder'],   [10, 'Yeşil']]
  },

  KAYIT: { anahtar: 'koyumun-suyu-kayit', surum: 2 },   // durum yapısı değişince artırılır
  DIL_ANAHTAR: 'koyumun-suyu-dil',

  // --- Ses: dosyalar assets/audio/<id>.mp3; yoksa sessiz geçilir ---
  SES: {
    anahtar: 'koyumun-suyu-ses',
    klasor: 'assets/audio/', uzanti: '.mp3',
    sonmeSure: 4000, sonmeAdim: 20,      // milisaniye, adım: uzaklaşarak sönme
    ortam: { sabah: 'ruzgar', ogle: 'ruzgar', aksam: 'cirkir' },
    liste: {
      ruzgar:      { seviye: 0.25, dongu: true },
      cirkir:      { seviye: 0.25, dongu: true },
      yagmur:      { seviye: 0.5,  dongu: true },
      bebek_agla:  { seviye: 0.3 },
      bebek_gul:   { seviye: 0.5 },
      keci:        { seviye: 0.5 },
      kamyon:      { seviye: 0.6 },
      telefon:     { seviye: 0.5 },
      hat_kesilir: { seviye: 0.5 },
      gurultu:     { seviye: 0.7 },
      kapi:        { seviye: 0.5 }
    }
  }
};

if (typeof module !== 'undefined') module.exports = KS.config;
