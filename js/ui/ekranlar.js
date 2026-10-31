// ui/ekranlar.js – Tam ekran kartlar: başlangıç, keçiye isim, gün geçişi.
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

  KS.ui.ekran = ekran;
  KS.ui.ekranDugmesi = dugme;

  KS.ui.baslangicAc = function (bitince) {
    var e = ekran();
    e.appendChild(KS.ui.el('h1', '', KS.t('oyunAdi')));
    e.appendChild(dugme(KS.t('basla'), bitince));
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
    e.appendChild(dugme(KS.t('devam'), bitince));
  };
})();
