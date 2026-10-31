// ui/dagitim.js – Sabah su dağıtım paneli. Seçim "Tamam"a kadar geri alınabilir; kuralı logic.js uygular.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var SATIRLAR = ['ev', 'keci', 'bahce'];

  // bitince(dagitim, fazlaCek)
  KS.ui.dagitimAc = function (bitince) {
    var d = KS.state;
    var ek = KS.config.FAZLA_CEKME.damla;
    var enAzEv = KS.config.EV.enAzSu;
    var verilen = { ev: enAzEv, keci: 0, bahce: 0 };
    var fazla = false;
    var katman = document.getElementById('katman');

    function enAz(ad) { return ad === 'ev' ? enAzEv : 0; }

    function toplam() { return d.su.pay + (fazla ? ek : 0); }
    function kalan() { return toplam() - verilen.ev - verilen.keci - verilen.bahce; }

    // Fazla çekme geri alınınca sığmayan damlalar sondan geri alınır.
    function sigdir() {
      for (var i = SATIRLAR.length - 1; i >= 0 && kalan() < 0; i--) {
        var ad = SATIRLAR[i];
        verilen[ad] = Math.max(enAz(ad), verilen[ad] + kalan());
      }
    }

    function satirCiz(ad, ihtiyaclar) {
      var el = KS.ui.el;
      var satir = el('div', 'dagitim-satir');
      satir.appendChild(el('div', '', KS.t('gosterge_' + ad)));
      satir.appendChild(el('div', 'ihtiyac', KS.t('ihtiyac', { n: ihtiyaclar[ad] })));
      var eksi = el('button', '', '−');
      eksi.disabled = verilen[ad] <= enAz(ad);
      eksi.onclick = function () { verilen[ad] -= 1; ciz(); };
      satir.appendChild(eksi);

      var damlalar = el('div', 'damlalar');
      var gri = ad === 'bahce' ? KS.griSuMiktari(d, verilen.ev) : 0;
      var dolu = verilen[ad] + gri;
      for (var i = 0; i < Math.max(ihtiyaclar[ad], dolu); i++) {
        damlalar.appendChild(el('div', 'damla' + (i < gri ? ' gri' : (i < dolu ? ' dolu' : ''))));
      }
      satir.appendChild(damlalar);

      var arti = el('button', '', '+');
      arti.disabled = kalan() <= 0;
      arti.onclick = function () { verilen[ad] += 1; ciz(); };
      satir.appendChild(arti);
      return satir;
    }

    function ciz() {
      var el = KS.ui.el;
      katman.textContent = '';
      var panel = el('div', 'panel');
      panel.appendChild(el('h2', '', KS.t('dagitimBaslik')));
      var ihtiyaclar = KS.ihtiyaclar(d);
      SATIRLAR.forEach(function (ad) { panel.appendChild(satirCiz(ad, ihtiyaclar)); });
      var gri = KS.griSuMiktari(d, verilen.ev);
      panel.appendChild(el('div', 'gri-not', gri ? KS.t('griSu', { n: gri }) : ''));
      panel.appendChild(el('div', 'gri-not', KS.t('icmeSuyu', { n: enAzEv })));

      var alt = el('div', 'dagitim-alt');
      alt.appendChild(el('div', 'kalan', KS.t('kalan', { n: kalan() })));
      var fazlaBtn = el('button', fazla ? 'fazla-acik' : '', KS.t(fazla ? 'fazlaGeriAl' : 'fazlaCek', { n: ek }));
      fazlaBtn.onclick = function () { fazla = !fazla; sigdir(); ciz(); };
      alt.appendChild(fazlaBtn);
      var tamam = el('button', '', KS.t('tamam'));
      tamam.onclick = function () { katman.textContent = ''; bitince(verilen, fazla); };
      alt.appendChild(tamam);
      panel.appendChild(alt);
      katman.appendChild(panel);
    }

    ciz();
  };
})();
