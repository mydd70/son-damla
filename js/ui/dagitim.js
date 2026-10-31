// ui/dagitim.js – Sabah su dağıtım paneli. Seçim "Tamam"a kadar geri alınabilir; kuralı logic.js uygular.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var SATIRLAR = ['keci', 'ev', 'bahce'];   // gri su satırı ev ile bahçe arasına girer

  // bitince(dagitim, fazlaCek)
  KS.ui.dagitimAc = function (bitince) {
    var d = KS.state;
    var ek = KS.config.FAZLA_CEKME.damla;
    var enAzEv = KS.config.EV.enAzSu;
    var verilen = { ev: enAzEv, keci: 0, bahce: 0 };
    var fazla = false;
    var bosaUyarildi = false;   // boşa gidecek damla varsa "Tamam" önce uyarır
    var katman = document.getElementById('katman');

    function degisti() { bosaUyarildi = false; ciz(); }

    // Kalan damla bir satıra hâlâ sığıyorsa oyuncu onu unutmuş olabilir.
    function bosaGidiyor() {
      return kalan() > 0 && SATIRLAR.some(function (ad) { return verilen[ad] < KS.dagitimUstSinir(d, ad, verilen); });
    }

    function enAz(ad) { return ad === 'ev' ? enAzEv : 0; }
    function toplam() { return d.su.pay + (fazla ? ek : 0); }
    function kalan() { return toplam() - verilen.ev - verilen.keci - verilen.bahce; }

    // Fazla çekme geri alınınca sığmayan damlalar sondan geri alınır;
    // eve su artınca gri su bahçenin ihtiyacını düşürür, fazlası kalana döner.
    function sigdir() {
      verilen.bahce = Math.min(verilen.bahce, KS.dagitimUstSinir(d, 'bahce', verilen));
      for (var i = SATIRLAR.length - 1; i >= 0 && kalan() < 0; i--) {
        var ad = SATIRLAR[i];
        verilen[ad] = Math.max(enAz(ad), verilen[ad] + kalan());
      }
    }

    function satirCiz(ad, ihtiyaclar) {
      var el = KS.ui.el;
      var satir = el('div', 'dagitim-satir');
      satir.appendChild(el('div', '', KS.t('gosterge_' + ad)));
      var durum = KS.dagitimDurumu(d, ad, verilen);
      satir.appendChild(el('div', 'su-durum ' + durum, KS.t('suDurum_' + durum)));
      var eksi = el('button', '', '−');
      eksi.disabled = verilen[ad] <= enAz(ad);
      eksi.onclick = function () { verilen[ad] -= 1; degisti(); };
      satir.appendChild(eksi);

      // İhtiyaç kadar damla yuvası: dolu olanlar verilen, gri olanlar evden dönen su.
      var damlalar = el('div', 'damlalar');
      var gri = ad === 'bahce' ? KS.griSuMiktari(d, verilen.ev) : 0;
      var dolu = verilen[ad] + gri;
      for (var i = 0; i < ihtiyaclar[ad]; i++) {
        damlalar.appendChild(el('div', 'damla' + (i < gri ? ' gri' : (i < dolu ? ' dolu' : ''))));
      }
      satir.appendChild(damlalar);

      var arti = el('button', '', '+');
      arti.disabled = kalan() <= 0 || verilen[ad] >= KS.dagitimUstSinir(d, ad, verilen);
      arti.onclick = function () { verilen[ad] += 1; degisti(); };
      satir.appendChild(arti);
      return satir;
    }

    // Gri su ayrı bir su kaynağı gibi görünür: evden dönen damlalar ve bahçeye gittiği.
    function griSatiri() {
      var el = KS.ui.el;
      var satir = el('div', 'dagitim-satir gri-satir' + (d.gun === KS.config.GRI_SU.ilkGun ? ' vurgu' : ''));
      var gri = KS.griSuMiktari(d, verilen.ev);
      satir.appendChild(el('div', '', KS.t('griSatir')));
      var damlalar = el('div', 'damlalar');
      for (var i = 0; i < gri; i++) damlalar.appendChild(el('div', 'damla gri'));
      satir.appendChild(damlalar);
      var eksik = KS.config.GRI_SU.bolen - (verilen.ev % KS.config.GRI_SU.bolen);
      satir.appendChild(el('div', 'gri-aciklama', gri ? KS.t('griVar', { n: gri }) : KS.t('griYok', { n: eksik })));
      return satir;
    }

    function ciz() {
      var el = KS.ui.el;
      sigdir();
      katman.textContent = '';
      var panel = el('div', 'panel');
      panel.appendChild(el('h2', '', KS.t('dagitimBaslik')));
      var ihtiyaclar = KS.ihtiyaclar(d);
      SATIRLAR.forEach(function (ad) {
        if (ad === 'bahce' && d.bayraklar.griSu) panel.appendChild(griSatiri());
        panel.appendChild(satirCiz(ad, ihtiyaclar));
      });
      panel.appendChild(el('div', 'gri-not', KS.t('icmeSuyu', { n: enAzEv })));

      var alt = el('div', 'dagitim-alt');
      alt.appendChild(el('div', 'kalan', KS.t('kalan', { n: kalan() })));
      var fazlaBtn = el('button', fazla ? 'fazla-acik' : '', KS.t(fazla ? 'fazlaGeriAl' : 'fazlaCek', { n: ek }));
      fazlaBtn.onclick = function () { fazla = !fazla; degisti(); };
      alt.appendChild(fazlaBtn);
      var tamam = el('button', '', KS.t(bosaUyarildi ? 'tamamBosa' : 'tamam'));
      tamam.onclick = function () {
        if (bosaGidiyor() && !bosaUyarildi) { bosaUyarildi = true; ciz(); return; }
        katman.textContent = '';
        bitince(verilen, fazla);
      };
      alt.appendChild(tamam);
      panel.appendChild(alt);
      if (bosaUyarildi) panel.appendChild(el('div', 'gri-not', KS.t('bosaGider', { n: kalan() })));
      katman.appendChild(panel);
    }

    ciz();
  };
})();
