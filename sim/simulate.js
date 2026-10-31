// simulate.js – Denge simülasyonu. Çalıştırma: node sim/simulate.js
// Oyunun gerçek kurallarını (js/logic.js) oyuncu profilleriyle baştan sona oynatır.
globalThis.KS = {};
require('../js/config.js');
require('../js/state.js');
require('../js/logic.js');
var KS = globalThis.KS;
var C = KS.config;

// ---------- Dağıtım stratejileri ----------

// Bir dağıtımın göstergelere net etkisini tahmin eder (yalnızca puanlama için).
function dagitimPuani(d, ev, keci, bahce) {
  var ih = KS.ihtiyaclar(d);
  var gri = d.bayraklar.griSu ? Math.floor(ev / C.GRI_SU.bolen) : 0;
  var b = bahce + gri;
  var p = 0;
  p += 1.2 * KS.suEtkisi(keci, ih.keci);
  p += KS.suEtkisi(b, ih.bahce);
  p += KS.suEtkisi(ev, ih.ev);
  return p;
}

// En iyi puanlı dağıtımı dener (dikkatli oyuncu yaklaşımı).
function akilliDagitim(d, toplam) {
  var en = null;
  for (var ev = C.EV.enAzSu; ev <= toplam; ev++) {
    for (var keci = 0; keci <= toplam - ev; keci++) {
      var bahce = toplam - ev - keci;
      var p = dagitimPuani(d, ev, keci, bahce);
      if (!en || p > en.p) en = { p: p, ev: ev, keci: keci, bahce: bahce };
    }
  }
  return en;
}

function esitDagitim(toplam) {
  var x = Math.floor(toplam / 3);
  return { ev: toplam - 2 * x, keci: x, bahce: x };
}

// ---------- Profiller ----------
// Her profil: fazlaCek(d), dagit(d, toplam), argumanOgrenir, olcumTeslim, ogle(d), aksam(d), karsilasma(d)

// Bir konuşmada bir argüman; akıllı oyuncu inanılmayacak olanı o gün söylemez.
function sayilanlar(d) {
  return KS.iletilebilirArgumanlar(d).filter(function (a) { return KS.argumanSayilirMi(d, a); });
}

function standartKarsilasma(d, kabaOlacak) {
  var r = KS.karsilasmaBaslat(d);
  if (r.ozurSecenegi) KS.ozurDile(d);
  var liste = sayilanlar(d);
  if (kabaOlacak && kabaOlacak.kalan > 0 && liste.length) {
    kabaOlacak.kalan -= 1;
    KS.kabaSecim(d, liste[0]);
    if (d.gun !== C.OBRUK_GUNU) return;   // kaba söz konuşmayı bitirir; gün 8'de geri alınabilir
    KS.kabaligiGeriAl(d, liste[0]);
    liste = sayilanlar(d);
  }
  if (liste.length) KS.argumanIlet(d, liste[0]);
}

function dikkatliProfil(ad, ayar) {
  ayar = ayar || {};
  var kaba = { kalan: ayar.kaba || 0 };
  return {
    ad: ad,
    fazlaCek: function (d) { return (ayar.fazlaGunleri || []).indexOf(d.gun) >= 0; },
    dagit: function (d, toplam) { return akilliDagitim(d, toplam); },
    argumanOgrenir: true,
    olcumTeslim: ayar.olcumTeslim !== false,
    ogle: function (d) {
      var acik = KS.ogleSecenekleri(d).filter(function (s) { return s.acik; }).map(function (s) { return s.id; });
      if (acik.indexOf('komsuyaSu') >= 0 && sayilanlar(d).length) return 'komsuyaSu';
      if (acik.indexOf('babayiAra') >= 0 && d.gosterge.ev < 6) return 'babayiAra';
      if (d.gosterge.ev < 5) return 'evdeYardim';
      if (d.gosterge.bahce < 6) return 'bahceEkIs';
      return 'evdeYardim';
    },
    aksam: function (d) {
      if (KS.gorevZiyaretiMi(d, 'muhtar') && this.olcumTeslim) return 'muhtar';
      if (d.gosterge.kiler === 0 && d.ziyaretKalan.yasliCift > 0) return 'yasliCift';
      if (d.gosterge.ev < 5) return 'aileVakti';
      var muhtarUygun = this.olcumTeslim || !KS.gorevZiyaretiMi(d, 'muhtar');
      if (muhtarUygun && d.komsu.ogrenilen.indexOf('A3') < 0 && d.gun >= 3 && d.ziyaretKalan.muhtar > 0) return 'muhtar';
      if (!d.komsu.ikna && sayilanlar(d).length && d.ziyaretKalan.komsu > 0) return 'komsu';
      return 'aileVakti';
    },
    karsilasma: function (d) { standartKarsilasma(d, kaba); }
  };
}

// Komşuya ilk argümanı obruk günü, ikincisini gün 9 öğlesinde söyleyen oyuncu.
function sonSansProfili(ad, ayar) {
  var p = dikkatliProfil(ad, ayar);
  var eskiOgle = p.ogle;
  var eskiAksam = p.aksam;
  p.ogle = function (d) {
    if (d.gun === C.GUN_SAYISI) return 'komsuyaSu';
    var sec = eskiOgle.call(p, d);
    return sec === 'komsuyaSu' ? 'evdeYardim' : sec;
  };
  p.aksam = function (d) {
    var sec = eskiAksam.call(p, d);
    return sec === 'komsu' ? 'aileVakti' : sec;
  };
  p.karsilasma = function (d) {
    KS.karsilasmaBaslat(d);
    var liste = sayilanlar(d);
    if (d.gun >= C.OBRUK_GUNU && liste.length) KS.argumanIlet(d, liste[0]);
  };
  return p;
}

var pasifProfil = {
  ad: 'Pasif',
  fazlaCek: function () { return false; },
  dagit: function (d, toplam) { return esitDagitim(toplam); },
  argumanOgrenir: false,
  olcumTeslim: false,
  ogle: function () { return 'evdeYardim'; },
  aksam: function () { return 'aileVakti'; },
  karsilasma: function (d) { standartKarsilasma(d); }
};

// ---------- Oyun döngüsü ----------

function oyna(profil, ayrinti) {
  var d = KS.yeniDurum();
  d.keciAdi = 'Pamuk';
  var satirlar = [];
  for (var g = 1; g <= C.GUN_SAYISI; g++) {
    var bas = KS.gunBaslat(d);
    if (bas.olay && bas.olay.arguman && profil.argumanOgrenir) KS.argumanOgren(d, bas.olay.arguman);
    if (bas.olay && bas.olay.karsilasma) profil.karsilasma(d);

    var fazla = profil.fazlaCek(d);
    var toplam = d.su.pay + (fazla ? C.FAZLA_CEKME.damla : 0);
    var dg = profil.dagit(d, toplam);
    var r = KS.dagitimUygula(d, dg, fazla);
    if (!r.ok) throw new Error(profil.ad + ' gün ' + g + ': ' + r.hata);
    KS.miniOyunTamamla(d);

    d.dilim = 'ogle';
    if (KS.olayBul(d.gun, 'ogle')) {
      var o = KS.ogleOlayi(d);
      if (o.olay.arguman && profil.argumanOgrenir) KS.argumanOgren(d, o.olay.arguman);
      if (o.karsilasma) profil.karsilasma(d);
    } else {
      var oe = KS.ogleEylemi(d, profil.ogle(d));
      if (!oe.ok) throw new Error(profil.ad + ' gün ' + g + ' öğle: ' + oe.hata);
      if (oe.karsilasma) profil.karsilasma(d);
    }

    d.dilim = 'aksam';
    if (g === C.GUN_SAYISI) {
      KS.toplanti(d);
    } else {
      var a = profil.aksam(d);
      var ar = a === 'aileVakti' ? KS.aileVakti(d) : KS.aksamZiyaret(d, a);
      if (!ar.ok) throw new Error(profil.ad + ' gün ' + g + ' akşam: ' + ar.hata);
      if (ar.karsilasma) profil.karsilasma(d);
      KS.gunBitir(d);
    }
    satirlar.push({
      gun: g, pay: d.su.pay, dagitim: dg.ev + '/' + dg.keci + '/' + dg.bahce + (fazla ? ' +F' : ''),
      kuyu: d.gosterge.kuyu, keci: d.gosterge.keci, bahce: d.gosterge.bahce,
      kiler: d.gosterge.kiler, ev: d.gosterge.ev
    });
  }
  return { d: d, satirlar: satirlar };
}

// ---------- Rastgele oyuncular ----------

function rastgeleProfil(rnd) {
  var p = dikkatliProfil('Rastgele', {
    olcumTeslim: rnd() < 0.7,
    kaba: rnd() < 0.3 ? 1 : 0
  });
  var fazlaOlasilik = rnd() * 0.6;
  p.argumanOgrenir = rnd() < 0.8;
  p.fazlaCek = function () { return rnd() < fazlaOlasilik; };
  p.dagit = function (d, toplam) { return rnd() < 0.5 ? akilliDagitim(d, toplam) : esitDagitim(toplam); };
  var eskiAksam = p.aksam;
  p.aksam = function (d) {
    if (rnd() < 0.4) return 'aileVakti';
    var sec = eskiAksam.call(p, d);
    return sec;
  };
  return p;
}

function tohumluRastgele(tohum) {
  var s = tohum >>> 0;
  return function () {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// Her şeyi doğru yapan ama suyu damla damla rastgele dağıtan oyuncu: dağıtım sonu etkiliyor mu?
function rastgeleDagitim(d, toplam, rnd) {
  var v = { ev: C.EV.enAzSu, keci: 0, bahce: 0 };
  var kalan = toplam - v.ev;
  while (kalan > 0) {
    var uygun = ['ev', 'keci', 'bahce'].filter(function (ad) { return v[ad] < KS.dagitimUstSinir(d, ad, v); });
    if (!uygun.length) break;
    v[uygun[Math.floor(rnd() * uygun.length)]] += 1;
    kalan -= 1;
  }
  return v;
}

// ---------- Çalıştır ve raporla ----------

function tabloYaz(baslik, satirlar) {
  console.log('\n### ' + baslik);
  console.log('| Gün | Pay | Dağıtım ev/keçi/bahçe | Kuyu | Keçi | Bahçe | Kiler | Ev |');
  console.log('|---|---|---|---|---|---|---|---|');
  satirlar.forEach(function (s) {
    console.log('| ' + [s.gun, s.pay, s.dagitim, s.kuyu, s.keci, s.bahce, s.kiler, s.ev].join(' | ') + ' |');
  });
}

var profiller = [
  dikkatliProfil('Dikkatli (güçlü plan, fazla çekme yok)'),
  dikkatliProfil('Dikkatli + 2 fazla çekme (gün 1-2)', { fazlaGunleri: [1, 2] }),
  dikkatliProfil('Dikkatli + 3 fazla çekme (gün 1-3)', { fazlaGunleri: [1, 2, 3] }),
  dikkatliProfil('Gecikmeli plan (ölçüm teslim edilmedi)', { olcumTeslim: false }),
  dikkatliProfil('Gecikmeli plan + 1 fazla çekme', { olcumTeslim: false, fazlaGunleri: [1] }),
  dikkatliProfil('Dikkatli + 1 kabalık', { kaba: 1 }),
  dikkatliProfil('Açgözlü (her gün fazla çekme)', { fazlaGunleri: [1, 2, 3, 4, 5, 6, 7, 8, 9] }),
  pasifProfil,
  sonSansProfili('Son şans (gün 9 ikna, güçlü plan)'),
  sonSansProfili('Son şans (gün 9 ikna, gecikmeli plan)', { olcumTeslim: false })
];

var ayrinti = process.argv.indexOf('--ayrinti') >= 0;
console.log('# Denge simülasyonu sonuçları\n');
console.log('Eşik: ' + C.KUYU.esik + ' · Uyarı: ' + C.KUYU.uyari + '\n');
console.log('| Profil | Kuyu | Komşu | Plan | Keçi | Bahçe | Kiler | Ev | Sonuç | Eksikler |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
var sonuclar = profiller.map(function (p) {
  var o = oyna(p);
  var d = o.d;
  console.log('| ' + [p.ad, d.gosterge.kuyu, d.komsu.ikna ? 'evet' : 'hayır', d.plan,
    d.gosterge.keci, d.gosterge.bahce, d.gosterge.kiler, d.gosterge.ev,
    d.sonuc.iyi ? 'İYİ' : 'kötü', d.sonuc.eksikler.join(', ') || '—'].join(' | ') + ' |');
  return { p: p, o: o };
});

// Gün gün tablolar
tabloYaz(sonuclar[0].p.ad, sonuclar[0].o.satirlar);
tabloYaz(sonuclar[3].p.ad, sonuclar[3].o.satirlar);
tabloYaz(sonuclar[7].p.ad, sonuclar[7].o.satirlar);
if (ayrinti) sonuclar.forEach(function (s, i) { if ([0, 3, 7].indexOf(i) < 0) tabloYaz(s.p.ad, s.o.satirlar); });

// Rastgele oyuncular
var N = 2000, iyi = 0, sebep = { komsu: 0, kuyu: 0, olcum: 0 }, evDusuk = 0, keciIyi = 0;
for (var i = 0; i < N; i++) {
  var rnd = tohumluRastgele(i + 1);
  var o = oyna(rastgeleProfil(rnd));
  if (o.d.sonuc.iyi) iyi++;
  o.d.sonuc.eksikler.forEach(function (e) { sebep[e]++; });
  if (o.d.gosterge.ev < 3) evDusuk++;
  if (o.d.gosterge.keci >= 5) keciIyi++;
}
console.log('\n### ' + N + ' rastgele oyuncu');
console.log('- İyi son: %' + Math.round(100 * iyi / N));
console.log('- Kötü son sebepleri: komşu %' + Math.round(100 * sebep.komsu / N) +
  ', kuyu %' + Math.round(100 * sebep.kuyu / N) + ', geç ölçüm %' + Math.round(100 * sebep.olcum / N));
console.log('- Sonda ev < 3: %' + Math.round(100 * evDusuk / N) + ' · keçi ≥ 5: %' + Math.round(100 * keciIyi / N));

var rd = { iyi: 0, kuyu: 0 };
for (var j = 0; j < N; j++) {
  (function (rnd) {
    var p = dikkatliProfil('Rastgele dağıtım');
    p.dagit = function (d, toplam) { return rastgeleDagitim(d, toplam, rnd); };
    var s = oyna(p).d;
    if (s.sonuc.iyi) rd.iyi++;
    rd.kuyu += s.gosterge.kuyu;
  })(tohumluRastgele(j + 1));
}
console.log('\n### ' + N + ' rastgele dağıtım (ölçüm ve ikna doğru, fazla çekme yok)');
console.log('- İyi son: %' + Math.round(100 * rd.iyi / N) + ' · ortalama kuyu: ' + Math.round(rd.kuyu / N));
