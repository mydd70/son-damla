// main.js – Başlatma ve oyun akışı: gün → sabah → öğle → akşam → gün sonu → ... → toplantı → son.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var ui = KS.ui;

  function yeniOyun(tekrar) {
    KS.state = KS.yeniDurum();
    if (tekrar) KS.tekrarOyunIsaretle(KS.state);
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
      var olaylar = KS.state.gun > 1 ? [KS.olayGetir('sabah_durum')] : [];
      olaylar = olaylar.concat(KS.olaylariGetir(KS.state.gun, 'sabah', KS.state));
      ui.olaylariOynat(olaylar, r, function () {
        if (r.olay && r.olay.karsilasma) ui.karsilasmaOynat('zorunlu', dagitim);
        else dagitim();
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
    function tamamla() {
      var r = KS.miniOyunTamamla(KS.state);
      ui.degisimGoster(r.degisimler);
      ogle();
    }
    if (KS.miniOyunTuru(KS.state) === 'evIsi') ui.diyalogOynat(KS.olayGetir('ev_isi'), null, tamamla);
    else ui.miniOyunAc(tamamla);
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
        if (r.karsilasma) ui.karsilasmaOynat('obruk', aksam);
        else aksam();
      });
      return;
    }
    ui.haritaAc(function (id) {
      var r = KS.ogleEylemi(KS.state, id);
      ui.degisimGoster(r.degisimler);
      ui.diyalogOynat(KS.olayGetir('ogle_' + id), r, function () {
        if (r.karsilasma) ui.karsilasmaOynat('su', aksam);
        else aksam();
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
    var olaylar = KS.olaylariGetir(d.gun, 'aksam', d);
    if (d.gosterge.ev >= KS.config.EV.yuksekAlt) olaylar.push(KS.olayGetir('anne_ipucu'));
    ui.olaylariOynat(olaylar, null, function () {
      ui.haritaAc(aksamSecimi);
    });
  }

  function aksamSecimi(id) {
    var aile = id === 'aileVakti';
    var r = aile ? KS.aileVakti(KS.state) : KS.aksamZiyaret(KS.state, id);
    ui.degisimGoster(r.degisimler);
    var olaylar = aile ? [KS.olayGetir('aile_vakti')] : KS.ziyaretOlaylari(id, KS.state, r);
    ui.olaylariOynat(olaylar, r, function () {
      if (r.karsilasma) ui.karsilasmaOynat('aksam', gunSonu);
      else gunSonu();
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
    ui.olaylariOynat(KS.sonOlaylari(r.sonuc.iyi), r, function () {
      ui.sonAc(r.sonuc, function () { yeniOyun(true); });
    });
  }

  // ---------- Ortak adımlar ----------

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
