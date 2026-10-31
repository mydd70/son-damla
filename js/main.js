// main.js – Başlatma ve oyun akışı: gün → sabah → öğle → akşam → gün sonu → ... → toplantı → son.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var ui = KS.ui;

  function yeniOyun() {
    KS.state = KS.yeniDurum();
    ui.baslangicAc(function () {
      ui.keciIsmiAc(function (ad) {
        KS.keciAdiVer(KS.state, ad);
        gunBasla();
      });
    });
  }

  // ---------- Sabah ----------

  function gunBasla() {
    var r = KS.gunBaslat(KS.state);
    ui.gostergeCiz();
    ui.sahneGoster('avlu');
    ui.gunKartiAc(KS.state.gun, function () {
      ui.degisimGoster(r.degisimler);
      var olaylar = KS.olaylariGetir(KS.state.gun, 'sabah', KS.state);
      ui.olaylariOynat(olaylar, r, function () {
        karsilasmaVarsa(r.olay && r.olay.karsilasma, dagitim);
      });
    });
  }

  function dagitim() {
    ui.sahneGoster('avlu');
    ui.dagitimAc(function (secim, fazla) {
      var r = KS.dagitimUygula(KS.state, secim, fazla);
      ui.degisimGoster(r.degisimler);
      kuyuUyarisiVarsa(r.kuyuUyari, sabahIsi);
    });
  }

  function sabahIsi() {
    ui.miniOyunAc(function () {
      var r = KS.miniOyunTamamla(KS.state);
      ui.degisimGoster(r.degisimler);
      ogle();
    });
  }

  // ---------- Öğle ----------

  function ogle() {
    KS.dilimGec(KS.state, 'ogle');
    ui.gostergeCiz();
    ui.sahneYenile();
    if (KS.olayBul(KS.state.gun, 'ogle')) {
      var r = KS.ogleOlayi(KS.state);
      ui.degisimGoster(r.degisimler);
      ui.olaylariOynat(KS.olaylariGetir(KS.state.gun, 'ogle', KS.state), r, function () {
        karsilasmaVarsa(r.karsilasma, aksam);
      });
      return;
    }
    ui.haritaAc(function (id) {
      var r = KS.ogleEylemi(KS.state, id);
      ui.degisimGoster(r.degisimler);
      ui.diyalogOynat(KS.olayGetir('ogle_' + id), r, function () {
        karsilasmaVarsa(r.karsilasma, aksam);
      });
    });
  }

  // ---------- Akşam ----------

  function aksam() {
    KS.dilimGec(KS.state, 'aksam');
    ui.gostergeCiz();
    ui.sahneYenile();
    var d = KS.state;
    if (d.gun === KS.config.GUN_SAYISI) {
      ui.olaylariOynat(KS.olaylariGetir(d.gun, 'aksam', d), null, toplanti);
      return;
    }
    ui.olaylariOynat(KS.olaylariGetir(d.gun, 'aksam', d), null, function () {
      ui.haritaAc(aksamSecimi);
    });
  }

  function aksamSecimi(id) {
    var aile = id === 'aileVakti';
    var r = aile ? KS.aileVakti(KS.state) : KS.aksamZiyaret(KS.state, id);
    ui.degisimGoster(r.degisimler);
    ui.diyalogOynat(KS.olayGetir(aile ? 'aile_vakti' : 'ziyaret_' + id), r, function () {
      karsilasmaVarsa(r.karsilasma, gunSonu);
    });
  }

  function gunSonu() {
    ui.duyuru(KS.t('ertesiPay', { n: KS.ertesiGunPayi(KS.state) }), function () {
      var r = KS.gunBitir(KS.state);
      ui.degisimGoster(r.degisimler);
      kuyuUyarisiVarsa(r.kuyuUyari, gunBasla);
    });
  }

  // ---------- Son ----------

  function toplanti() {
    var r = KS.toplanti(KS.state);
    ui.degisimGoster(r.degisimler);
    ui.diyalogOynat(KS.olayGetir(r.sonuc.iyi ? 'son_iyi' : 'son_kotu'), r, function () {
      ui.sonAc(r.sonuc, yeniOyun);
    });
  }

  // ---------- Ortak adımlar ----------

  // Aşama 2: karşılaşma sayılır ama argüman iletilemez; ikna Aşama 4'te.
  function karsilasmaVarsa(gerekli, sonraki) {
    if (!gerekli) { sonraki(); return; }
    KS.karsilasmaBaslat(KS.state);
    ui.diyalogOynat(KS.olayGetir('karsilasma'), null, sonraki);
  }

  function kuyuUyarisiVarsa(gerekli, sonraki) {
    if (!gerekli) { sonraki(); return; }
    ui.diyalogOynat(KS.olayGetir('kuyu_uyari'), null, sonraki);
  }

  // ---------- Başlatma ----------

  function baslat() {
    var p = new URLSearchParams(location.search);
    if (p.get('dil') && KS.METIN[p.get('dil')]) KS.dil = p.get('dil');
    KS.state = KS.yeniDurum();
    if (p.get('debug') === '1') ui.debugBaslat();
    if (p.get('gun')) {
      KS.state = KS.gunIcinDurum(parseInt(p.get('gun'), 10));
      gunBasla();
    } else {
      yeniOyun();
    }
  }

  baslat();
})();
