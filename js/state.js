// state.js – Oyun durumunu oluşturur; kaydeder ve yükler (yalnızca son kayıt).
var KS = globalThis.KS = globalThis.KS || {};

KS.yeniDurum = function () {
  var c = KS.config;
  return {
    surum: c.KAYIT.surum,
    gun: 0,
    dilim: 'sabah',
    keciAdi: '',
    gosterge: {
      keci: c.KECI.baslangic,
      bahce: c.BAHCE.baslangic,
      kiler: c.KILER.baslangic,
      ev: c.EV.baslangic,
      kuyu: c.KUYU.baslangic
    },
    su: {
      pay: 0,                  // bugünkü pay
      ertesiGunKesinti: 0,     // komşuya su götürmenin bedeli
      fazlaCekildi: false,     // bugün fazladan çekildi mi
      toplamFazlaCekme: 0,
      dagitildi: false
    },
    bayraklar: {
      griSu: false,
      dayanikliTohum: false,
      olcumElde: false,
      olcumTeslim: false,
      kuyuUyari: false,
      kuyuUyariBekliyor: false,   // gün sonunda inildiyse uyarı ertesi sabah söylenir
      zorunluEvIsi: false,
      motorKapali: false,
      camur: false,
      babaArandi: false,
      ilkSut: false,
      ilkSaglik: false,
      kilerKuyuGoruldu: false,    // boş kilerin kuyuya etkisi bir kez ipucuyla anlatılır
      kilerYardimIpucu: false,    // kiler boşken yaşlı çifte gidilebileceği bir kez söylenir
      miniOyunYapildi: false,
      ogleKullanildi: false,
      aksamKullanildi: false
    },
    plan: null,                // null | 'guclu' | 'zayif'
    ziyaretKalan: Object.assign({}, c.ZIYARET_HAKKI),
    sohbetEdildi: {},          // bilgisi henüz açılmamış kişilerle yapılan kısa sohbet (kişi başına 1)
    komsu: {
      ogrenilen: [],           // Mehmet'in öğrendiği argümanlar
      iletilen: [],            // komşuya iletilenler
      kilitli: [],             // kabalık yüzünden kilitlenenler
      ozurBekliyor: false,
      ikna: false,
      buKonusmadaIletildi: false,   // bir konuşmada en fazla bir argüman
      karsilasma: 0,
      suGoturme: 0
    },
    yasliCiftYardim: 0,
    anneIpuclari: [],          // annenin söylediği ipuçları; aynısı tekrar edilmez
    tekrarOyun: false,         // "Hızlı geç" yalnızca tekrar oynayışta
    sonuc: null,               // toplantıdan sonra { iyi, eksikler }
    gunluk: []                 // hata ayıklama: son olaylar
  };
};

// Kayıt: localStorage yoksa (Node, gizli pencere) sessizce hiçbir şey yapmaz.
KS.kaydet = function (durum) {
  try {
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(KS.config.KAYIT.anahtar, JSON.stringify(durum));
    return true;
  } catch (e) {
    console.warn('Kayıt yazılamadı:', e);
    return false;
  }
};

// Kayıtta güncel durumun bütün alanları var mı?
function kayitYapisiUyumlu(durum) {
  var ornek = KS.yeniDurum();
  function alanlarVar(o, kayit) {
    return !!kayit && Object.keys(o).every(function (k) { return k in kayit; });
  }
  return alanlarVar(ornek, durum) && ['gosterge', 'su', 'bayraklar', 'komsu'].every(function (alan) {
    return alanlarVar(ornek[alan], durum[alan]);
  });
}

// Uyumsuz ya da bozuk kayıt yok sayılır; oyun çökmez.
KS.yukle = function () {
  try {
    if (typeof localStorage === 'undefined') return null;
    var ham = localStorage.getItem(KS.config.KAYIT.anahtar);
    if (!ham) return null;
    var durum = JSON.parse(ham);
    if (!durum || durum.surum !== KS.config.KAYIT.surum || !kayitYapisiUyumlu(durum)) return null;
    return durum;
  } catch (e) {
    console.warn('Kayıt okunamadı, yok sayıldı:', e);
    return null;
  }
};

KS.kaydiSil = function () {
  try {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(KS.config.KAYIT.anahtar);
  } catch (e) { /* önemsiz */ }
};

if (typeof module !== 'undefined') module.exports = { yeniDurum: KS.yeniDurum };
