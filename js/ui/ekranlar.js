// ui/ekranlar.js – Tam ekran kartlar (başlangıç, keçiye isim, gün geçişi), ses düğmesi, dile bağlı sabit metinler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  function ekran() {
    var e = document.getElementById('tamEkran');
    e.textContent = '';
    e.hidden = false;
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
    b.textContent = KS.ses.acikMi() ? '🔊' : '🔇';
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
    e.appendChild(KS.ui.el('h1', '', KS.t('oyunAdi')));

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
    e.appendChild(KS.ui.gunPlaniCiz(gun));
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
