// ui/diyalog.js – Arka plan ve diyalog kutusu: konuşan, portre yer tutucusu, metin, seçenekler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var sonMekan = 'avlu', sonSecenek = {};

  KS.ui.sahneGoster = function (mekan, secenek) {
    sonMekan = mekan;
    sonSecenek = secenek || {};
    document.getElementById('arkaplan').innerHTML = KS.sahne(mekan, KS.state.dilim, sonSecenek);
  };

  // Dilim değişince aynı mekânı yeni ışıkla çizer.
  KS.ui.sahneYenile = function () {
    KS.ui.sahneGoster(sonMekan, sonSecenek);
  };

  function metinHazirla(oge) {
    return KS.metinSec(oge).replace(/\{keci\}/g, KS.state.keciAdi);
  }

  function portreCiz(kim) {
    var k = KS.KARAKTERLER[kim] || {};
    var kutu = KS.ui.el('div', 'portre' + (k.siluet ? ' siluet' : ''));
    kutu.appendChild(KS.ui.el('span', '', KS.karakterAdi(kim).charAt(0)));
    return kutu;
  }

  function satirCiz(kutu, satir) {
    kutu.textContent = '';
    var ekran = satir.kim === 'ekran';
    if (!ekran) kutu.appendChild(portreCiz(satir.kim));
    var govde = KS.ui.el('div', 'diyalog-govde');
    if (!ekran) govde.appendChild(KS.ui.el('div', 'konusan', KS.karakterAdi(satir.kim)));
    govde.appendChild(KS.ui.el('div', 'satir' + (ekran ? ' ekran' : '') + (satir.kim === 'ic' ? ' ic' : ''), metinHazirla(satir)));
    kutu.appendChild(govde);
    return govde;
  }

  // olay: story.js biçimi. r: satır koşullarına verilen eylem sonucu. bitince: diyalog kapanınca çağrılır.
  KS.ui.diyalogOynat = function (olay, r, bitince) {
    var d = KS.state;
    if (olay.mekan) KS.ui.sahneGoster(olay.mekan, olay.mekanSecenek ? olay.mekanSecenek(d) : {});
    var satirlar = olay.satirlar.filter(function (s) { return !s.kosul || s.kosul(d, r || {}); });
    var kutu = document.getElementById('diyalog');
    var i = 0;

    function kapat() {
      kutu.hidden = true;
      kutu.onclick = null;
      bitince();
    }

    function seceneklerCiz(govde) {
      kutu.onclick = null;
      kutu.style.cursor = 'default';
      var liste = KS.ui.el('div', 'secenekler');
      olay.secenekler.forEach(function (sc) {
        var b = KS.ui.el('button', '', metinHazirla(sc));
        b.onclick = function () {
          kutu.style.cursor = '';
          var sonuc = KS.secimUygula(KS.state, sc);
          KS.ui.degisimGoster(sonuc.degisimler);
          if (sc.sonraki) KS.ui.diyalogOynat(KS.olayGetir(sc.sonraki), r, bitince);
          else kapat();
        };
        liste.appendChild(b);
      });
      govde.appendChild(liste);
    }

    function goster() {
      var son = i === satirlar.length - 1;
      var govde = satirCiz(kutu, satirlar[i]);
      if (son && olay.secenekler) seceneklerCiz(govde);
      else govde.appendChild(KS.ui.el('div', 'sonraki-isaret', '▼'));
    }

    if (!satirlar.length) { bitince(); return; }
    kutu.hidden = false;
    kutu.onclick = function () {
      if (i >= satirlar.length - 1) { kapat(); return; }
      i += 1;
      goster();
    };
    goster();
  };

  // Olay listesini sırayla oynatır.
  KS.ui.olaylariOynat = function (liste, r, bitince) {
    var i = 0;
    (function sonraki() {
      if (i >= liste.length) { bitince(); return; }
      KS.ui.diyalogOynat(liste[i++], r, sonraki);
    })();
  };

  // Tek satırlık duyuru (ertesi günün payı gibi).
  KS.ui.duyuru = function (metin, bitince) {
    KS.ui.diyalogOynat({ satirlar: [{ kim: 'ekran', metin: metin }] }, null, bitince);
  };
})();
