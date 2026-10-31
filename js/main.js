// main.js – Başlatma ve oyun akışı: gün → sabah → öğle → akşam → gün sonu → ... → toplantı → son.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var ui = KS.ui;
  var kayitAcik = true;   // ?gun=N denemeleri asıl kaydı ezmesin

  function ortamSesi() {
    KS.ses.ortamCal(KS.config.SES.ortam[KS.state.dilim]);
  }

  function yeniOyun(tekrar) {
    KS.state = KS.yeniDurum();
    if (tekrar) KS.tekrarOyunIsaretle(KS.state);
    var kayit = KS.yukle();
    ui.baslangicAc(function () {
      ui.keciIsmiAc(function (ad) {
        KS.keciAdiVer(KS.state, ad);
        gunBasla();
      });
    }, kayit ? function () {
      KS.state = kayit;
      gunBasla();
    } : null);
  }

  // ---------- Sabah ----------

  // Kayıt, günün başından önceki durumu tutar; "Devam et" o günü baştan başlatır.
  function gunBasla() {
    if (kayitAcik) KS.kaydet(KS.state);
    var r = KS.gunBaslat(KS.state);
    ui.gostergeCiz();
    ui.sahneGoster('avlu');
    ui.gunKartiAc(KS.state.gun, function () {
      ui.degisimGoster(r.degisimler);
      ortamSesi();
      if (r.aglama) KS.ses.cal('bebek_agla');
      var olaylar = KS.state.gun > 1 ? [KS.olayGetir('sabah_durum')] : [];
      olaylar = olaylar.concat(KS.olaylariGetir(KS.state.gun, 'sabah', KS.state));
      if (r.kuyuUyari) olaylar.push(KS.olayGetir('kuyu_uyari'));
      ui.olaylariOynat(olaylar, r, function () {
        if (r.olay && r.olay.karsilasma) ui.karsilasmaOynat('zorunlu', dagitim);
        else dagitim();
      });
    });
  }

  function ilkGunOgretici(id, sonraki) {
    if (KS.state.gun === 1) ui.diyalogOynat(KS.olayGetir(id), null, sonraki);
    else sonraki();
  }

  function dagitim() {
    ui.sahneGoster('avlu');
    ilkGunOgretici('ogretici_dagitim', function () {
      ui.dagitimAc(function (secim, fazla) {
        var r = KS.dagitimUygula(KS.state, secim, fazla);
        ui.degisimGoster(r.degisimler);
        kuyuUyarisiVarsa(r.kuyuUyari, sabahIsi);
      });
    });
  }

  function sabahIsi() {
    ui.sahneGoster('avlu');
    function tamamla() {
      var r = KS.miniOyunTamamla(KS.state);
      ui.degisimGoster(r.degisimler);
      ogle();
    }
    if (KS.miniOyunTuru(KS.state) === 'evIsi') ui.diyalogOynat(KS.olayGetir('ev_isi'), null, tamamla);
    else ilkGunOgretici('ogretici_keci', function () { ui.miniOyunAc(tamamla); });
  }

  // ---------- Öğle ----------

  function ogle() {
    KS.dilimGec(KS.state, 'ogle');
    ui.gostergeCiz();
    ui.sahneYenile();
    ortamSesi();
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
    ortamSesi();
    var d = KS.state;
    if (d.gun === KS.config.GUN_SAYISI) {
      toplanti();
      return;
    }
    var olaylar = KS.olaylariGetir(d.gun, 'aksam', d);
    if (d.gosterge.ev >= KS.config.EV.yuksekAlt) olaylar.push(KS.olayGetir('anne_ipucu'));
    ui.olaylariOynat(olaylar, null, function () {
      ilkGunOgretici('ogretici_harita', function () { ui.haritaAc(aksamSecimi); });
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
    // Gün sonu değişimleri (kiler, kuyu) gün kartından önce görünsün diye duyurudan önce uygulanır.
    var r = KS.gunBitir(KS.state);
    ui.degisimGoster(r.degisimler);
    ui.duyuru(KS.t('ertesiPay', { n: KS.ertesiGunPayi(KS.state) }), gunBasla);
  }

  // ---------- Son ----------

  function toplanti() {
    // Kuyunun son düşüşü toplantıdan önce uygulanır (belge bölüm 7).
    var r = KS.toplanti(KS.state);
    if (kayitAcik) KS.kaydiSil();
    ui.degisimGoster(r.degisimler);
    ui.olaylariOynat(KS.olaylariGetir(KS.state.gun, 'aksam', KS.state), r, function () {
      KS.ses.ortamCal(null);
      ui.olaylariOynat(KS.sonOlaylari(r.sonuc.iyi), r, function () {
        ui.sonAc(r.sonuc, function () {
          KS.ses.ortamCal(null);
          yeniOyun(true);
        });
      });
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
    KS.dilYukle();
    KS.ses.tercihYukle();
    if (p.get('dil') && KS.METIN[p.get('dil')]) KS.dil = p.get('dil');
    ui.dilYenile();
    KS.state = KS.yeniDurum();
    if (p.get('debug') === '1') ui.debugBaslat();
    if (p.get('gun')) {
      kayitAcik = false;
      KS.state = KS.gunIcinDurum(parseInt(p.get('gun'), 10));
      gunBasla();
    } else {
      yeniOyun();
    }
  }

  baslat();
})();
