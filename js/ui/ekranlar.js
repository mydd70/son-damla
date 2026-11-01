// ui/ekranlar.js – Tam ekran kartlar (başlangıç, keçiye isim, gün geçişi), ses düğmesi, dile bağlı sabit metinler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  function ekran() {
    var e = document.getElementById('tamEkran');
    e.textContent = '';
    e.hidden = false;
    e.classList.remove('final');
    return e;
  }

  function dugme(metin, tiklaninca) {
    var b = KS.ui.el('button', '', metin);
    b.onclick = function () {
      document.getElementById('tamEkran').hidden = true;
      tiklaninca();
    };
    return b;
  }

  // Destekleyen cihazlarda tam ekran; reddedilirse oyun aynen sürer.
  function tamEkranIste() {
    var kok = document.documentElement;
    if (!kok.requestFullscreen) return;
    var p = kok.requestFullscreen();
    if (p) p.catch(function () { /* önemsiz */ });
  }

  KS.ui.ekran = ekran;
  KS.ui.ekranDugmesi = dugme;

  // Sayfa başlığı, dil etiketi, yön uyarısı ve ses düğmesi seçili dile göre.
  KS.ui.dilYenile = function () {
    document.documentElement.lang = KS.dil;
    document.title = KS.t('oyunAdi');
    document.getElementById('yonUyari').textContent = KS.t('yonUyari');
    sesDugmesiCiz();
  };

  function sesDugmesiCiz() {
    var b = document.getElementById('sesDugme');
    b.classList.remove('resimli');
    KS.ui.arayuzGorseli(b, KS.ses.acikMi() ? 'ses_acik' : 'ses_kapali', KS.ses.acikMi() ? '🔊' : '🔇');
    b.title = KS.t('sesDugmesi');
    b.setAttribute('aria-label', KS.t('sesDugmesi'));
    b.onclick = function () {
      KS.ses.degistir();
      sesDugmesiCiz();
    };
  }

  // devam: kayıt varsa "Devam et" için işlev, yoksa null.
  KS.ui.baslangicAc = function (yeni, devam) {
    var e = ekran();
    var arka = KS.ui.el('div', 'baslangic-gorsel');
    KS.ui.arayuzGorseli(arka, 'baslangic', '');
    e.appendChild(arka);
    var baslik = KS.ui.el('h1');
    // Logo Türkçe adı taşır; başka dilde yazı kalır.
    if (KS.dil === 'tr') KS.ui.arayuzGorseli(baslik, 'logo', KS.t('oyunAdi'));
    else baslik.textContent = KS.t('oyunAdi');
    e.appendChild(baslik);

    var diller = KS.ui.el('div', 'dil-secimi');
    [['tr', 'Türkçe'], ['en', 'English']].forEach(function (d) {
      var b = KS.ui.el('button', KS.dil === d[0] ? 'secili' : '', d[1]);
      b.onclick = function () {
        KS.dilSec(d[0]);
        KS.ui.dilYenile();
        KS.ui.baslangicAc(yeni, devam);
      };
      diller.appendChild(b);
    });
    e.appendChild(diller);

    if (devam) e.appendChild(dugme(KS.t('devamEt'), function () { tamEkranIste(); devam(); }));
    e.appendChild(dugme(KS.t(devam ? 'yeniOyun' : 'basla'), function () { tamEkranIste(); yeni(); }));
    e.appendChild(KS.ui.kaynakDugmesi());
  };

  // bitince(ad): boş bırakılırsa varsayılanı logic.js verir.
  KS.ui.keciIsmiAc = function (bitince) {
    var e = ekran();
    e.appendChild(KS.ui.el('div', 'kart-metin', KS.t('keciSoru')));
    var girdi = document.createElement('input');
    girdi.maxLength = KS.config.KECI.adUzunluk;
    girdi.placeholder = KS.config.KECI.varsayilanAd;
    e.appendChild(girdi);
    e.appendChild(dugme(KS.t('tamam'), function () { bitince(girdi.value); }));
    girdi.focus();
  };

  KS.ui.gunKartiAc = function (gun, bitince) {
    var e = ekran();
    e.appendChild(KS.ui.el('div', 'kart-metin', KS.metinSec(KS.GUN_KARTLARI[gun - 1])));
    e.appendChild(KS.ui.el('div', 'plan-baslik', KS.t('planBaslik')));
    e.appendChild(KS.ui.gunPlaniCiz(gun));
    var kesinti = KS.payKesintisi(KS.state);
    e.appendChild(KS.ui.el('div', 'gun-payi', KS.t('gunPayi', { n: KS.state.su.pay }) + (kesinti > 0 ? ' ' + KS.t('gunPayiKesinti', { n: kesinti }) : '')));
    e.appendChild(dugme(KS.t('devam'), bitince));
  };

  // İlk girişte hikâyeyi ve oyunun kapsamını anlatan metin.
  KS.ui.girisAc = function (bitince) {
    var e = ekran();
    var kutu = KS.ui.el('div', 'giris-metni');
    KS.GIRIS_METNI.forEach(function (p) { kutu.appendChild(KS.ui.el('p', '', KS.metinSec(p))); });
    e.appendChild(kutu);
    e.appendChild(dugme(KS.t('devam'), bitince));
  };

  // Başlangıç ve son ekranındaki küçük düğme: atıf listesi defterin katmanında açılır.
  KS.ui.kaynakDugmesi = function () {
    var b = KS.ui.el('button', 'kaynak-dugme', KS.t('kaynaklar'));
    b.onclick = kaynaklarAc;
    return b;
  };

  function kaynaklarAc() {
    var el = KS.ui.el;
    var kutu = document.getElementById('defter');
    kutu.textContent = '';
    kutu.hidden = false;
    var panel = el('div', 'panel kaynak-panel');
    panel.appendChild(el('h2', '', KS.t('kaynaklarBaslik')));
    function bolum(baslik, satirlar) {
      panel.appendChild(el('h3', '', KS.t(baslik)));
      var liste = el('ul', 'defter-liste');
      satirlar.forEach(function (s) { liste.appendChild(el('li', '', s)); });
      panel.appendChild(liste);
    }
    bolum('kaynak_ses', KS.KAYNAK_LISTESI.ses);
    panel.appendChild(el('p', '', KS.t('kaynakDegisiklik')));
    bolum('kaynak_muzik', KS.KAYNAK_LISTESI.muzik);
    bolum('kaynak_gorsel', [KS.t('kaynakGorselSatir')]);
    bolum('kaynak_kod', [KS.t('kaynakKodSatir')]);
    var kapat = el('button', '', KS.t('kapat'));
    kapat.onclick = function () { kutu.hidden = true; };
    panel.appendChild(kapat);
    kutu.appendChild(panel);
  }

  // Sonlara geçerken zaman atlaması: diyalog kutusunda değil, kendi kartında.
  KS.ui.zamanKartiAc = function (oge, bitince) {
    var e = ekran();
    e.appendChild(KS.ui.el('div', 'kart-metin buyuk', KS.metinSec(oge)));
    e.appendChild(dugme(KS.t('devam'), bitince));
  };

  // Sabah · Öğle · Akşam: o dilimde nereye gidileceği ya da serbest olduğu.
  KS.ui.gunPlaniCiz = function (gun) {
    var plan = KS.GUN_PLANLARI[gun - 1];
    var kutu = KS.ui.el('div', 'gun-plani');
    KS.config.DILIMLER.forEach(function (dilim) {
      var deger = plan[dilim];
      var serbest = deger === 'serbest';
      var hucre = KS.ui.el('div', 'plan-hucre' + (serbest ? ' serbest' : ''));
      hucre.appendChild(KS.ui.el('div', 'plan-dilim', KS.t('dilim_' + dilim)));
      hucre.appendChild(KS.ui.el('div', 'plan-yer', KS.t(serbest || deger === 'belirsiz' ? 'plan_' + deger : 'yer_' + deger)));
      kutu.appendChild(hucre);
    });
    return kutu;
  };

  // Dilim sonunda oyuncu sahneye bakar, hazır olunca düğmeyle geçer.
  KS.ui.ilerleGoster = function (anahtar, sonra) {
    var b = document.getElementById('ilerle');
    b.textContent = KS.t(anahtar);
    b.hidden = false;
    b.onclick = function () {
      b.hidden = true;
      b.onclick = null;
      sonra();
    };
  };
})();
