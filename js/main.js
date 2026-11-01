// main.js – Başlatma ve oyun akışı: gün → sabah → öğle → akşam → gün sonu → ... → toplantı → son.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var ui = KS.ui;
  var kayitAcik = true;   // ?gun=N denemeleri asıl kaydı ezmesin

  function ortamSesi() {
    KS.ses.ortamCal(KS.ui.ortamAdi(KS.ui.sonMekan()));
  }

  function yeniOyun(tekrar) {
    KS.state = KS.yeniDurum();
    if (tekrar) KS.tekrarOyunIsaretle(KS.state);
    var kayit = KS.yukle();
    KS.ses.muzikCal(null);
    ui.baslangicAc(function () {
      KS.ses.muzikCal(KS.config.SES.muzik.giris);
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
    var ilkGiris = KS.state.gun === 1 && !KS.state.tekrarOyun;
    (ilkGiris ? ui.girisAc : function (sonra) { sonra(); })(function () { ui.gunKartiAc(KS.state.gun, function () {
      KS.ses.muzikCal(null);
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
    }); });
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
      ui.ilerleGoster('gecis_ogle', ogle);
    }
    function miniOyun() {
      ilkGunOgretici('ogretici_keci', function () { ui.miniOyunAc(tamamla); });
    }
    if (KS.state.bayraklar.zorunluEvIsi) ui.diyalogOynat(KS.olayGetir('ev_isi'), null, miniOyun);
    else miniOyun();
  }

  // ---------- Öğle ----------

  function ogle() {
    KS.dilimGec(KS.state, 'ogle');
    ui.gostergeCiz();
    ui.sahneYenile();
    ortamSesi();
    function ogleSonu() { ui.ilerleGoster('gecis_aksam', aksam); }
    if (KS.olayBul(KS.state.gun, 'ogle')) {
      var r = KS.ogleOlayi(KS.state);
      ui.degisimGoster(r.degisimler);
      ui.olaylariOynat(KS.olaylariGetir(KS.state.gun, 'ogle', KS.state), r, function () {
        if (r.karsilasma) ui.karsilasmaOynat('obruk', ogleSonu);
        else ogleSonu();
      });
      return;
    }
    ui.haritaAc(function (id) {
      if (id === 'gec') {
        KS.ogleGec(KS.state);
        ui.diyalogOynat(KS.olayGetir('ogle_gec'), null, ogleSonu);
        return;
      }
      var r = KS.ogleEylemi(KS.state, id);
      ui.degisimGoster(r.degisimler);
      ui.diyalogOynat(KS.olayGetir('ogle_' + id), r, function () {
        if (r.karsilasma) ui.karsilasmaOynat('su', function () {
          ui.diyalogOynat(KS.olayGetir('veda_su'), null, ogleSonu);
        });
        else ogleSonu();
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
    if (d.gun < KS.config.GUN_SAYISI && KS.kilerYardimIpucuAl(d)) olaylar.push(KS.olayGetir('kiler_yardim'));
    var ipucu = null;
    if (d.gosterge.ev >= KS.config.EV.yuksekAlt) {
      ipucu = KS.anneIpucuAl(d);
      if (ipucu.ipucu) olaylar.push(KS.olayGetir('anne_ipucu'));
    }
    ui.olaylariOynat(olaylar, ipucu, function () {
      ilkGunOgretici('ogretici_harita', function () { ui.haritaAc(aksamSecimi); });
    });
  }

  function aksamSecimi(id) {
    if (id === 'gec') {
      KS.aksamGec(KS.state);
      ui.ilerleGoster('gecis_gunuBitir', gunSonu);
      return;
    }
    var aile = id === 'aileVakti';
    var r = aile ? KS.aileVakti(KS.state) : KS.aksamZiyaret(KS.state, id);
    ui.degisimGoster(r.degisimler);
    var olaylar = aile ? [KS.olayGetir('aile_vakti'), KS.olayGetir('aile_sohbet'), KS.olayGetir('aile_gece')] : KS.ziyaretOlaylari(id, KS.state, r);
    function ziyaretSonu() {
      if (aile) { ui.ilerleGoster('gecis_gunuBitir', gunSonu); return; }
      ui.olaylariOynat([KS.olayGetir('veda_' + id), KS.olayGetir('aksam_bitis')], null, function () {
        ui.ilerleGoster('gecis_eveDon', gunSonu);
      });
    }
    ui.olaylariOynat(olaylar, r, function () {
      if (r.karsilasma) ui.karsilasmaOynat('aksam', ziyaretSonu);
      else ziyaretSonu();
    });
  }

  // Gece evde biter: değişimler görünür, tek satır düşünce, sonra yeni günün kartı.
  function gunSonu() {
    var r = KS.gunBitir(KS.state);
    ui.sahneGoster('avlu');
    ui.degisimGoster(r.degisimler);
    ui.diyalogOynat(KS.olayGetir('gece'), r, function () {
      // Kilere ne geldiği her gece yazılır: üstteki sepetlerden tek başına anlaşılmıyor.
      ui.diyalogOynat({ satirlar: [{ kim: 'ekran', metin: ui.kilerOzetMetni(r.kilerOzet) }] }, null, function () {
        ilkGunOgretici('ogretici_kiler', function () {
          if (r.ilkKilerKuyu) ui.diyalogOynat(KS.olayGetir('ipucu_kiler_kuyu'), null, gunBasla);
          else gunBasla();
        });
      });
    });
  }

  // ---------- Son ----------

  function toplanti() {
    // Kuyunun son düşüşü toplantıdan önce uygulanır (belge bölüm 7).
    var r = KS.toplanti(KS.state);
    if (kayitAcik) KS.kaydiSil();
    ui.degisimGoster(r.degisimler);
    ui.olaylariOynat(KS.olaylariGetir(KS.state.gun, 'aksam', KS.state), r, function () {
      KS.ses.ortamCal(null);
      ui.zamanKartiAc(KS.SON_KARTLARI[r.sonuc.iyi ? 'iyi' : 'kotu'], function () {
        function sonEkran() {
          KS.ses.muzikCal(KS.config.SES.muzik[r.sonuc.iyi ? 'iyi' : 'kotu']);
          KS.ses.muzikKis();
          KS.ses.ortamCal(null);
          ui.sonAc(r.sonuc, function () {
            KS.ses.ortamCal(null);
            yeniOyun(true);
          });
        }
        ui.olaylariOynat(KS.sonOlaylari(r.sonuc.iyi ? 'iyi' : 'kotu'), r, function () {
          if (r.sonuc.iyi) { sonEkran(); return; }
          KS.ses.ortamCal('yagmur');
          ui.zamanKartiAc(KS.SON_KARTLARI.kotuYagmur, function () {
            ui.olaylariOynat(KS.sonOlaylari('kotuYagmur'), r, sonEkran);
          });
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

  // Kendi sesi olmayan düğmeler tık sesi çıkarır. Yakalama aşamasında: seçenek düğmeleri tıklamayı yayılmadan keser.
  function dugmeSesi(e) {
    var b = e.target.closest && e.target.closest('button');
    if (b && !b.matches('.ot, .damla-arti, .bakim-esya button')) KS.ses.cal('tik');
  }

  function baslat() {
    document.addEventListener('click', dugmeSesi, true);
    var p = new URLSearchParams(location.search);
    KS.dilYukle();
    KS.ses.tercihYukle();
    KS.ses.hazirla();
    if (p.get('dil') && KS.METIN[p.get('dil')]) KS.dil = p.get('dil');
    ui.dilYenile();
    ui.gorselleriHazirla();
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
