// ui/harita.js – Köy haritası: öğle eylemi ya da akşam ziyareti seçilir. Açık olan seçenekleri logic.js söyler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  // Öğle eylemlerinin haritadaki yerleri. Akşam ziyaretinde yer id'si kişi id'siyle aynıdır; aile vakti evdedir.
  var OGLE_YERLERI = { komsuyaSu: 'komsu', bahceEkIs: 'ev', evdeYardim: 'ev', camur: 'ev', babayiAra: 'tepe' };

  function ogleSecimleri(d) {
    var yerler = {};
    KS.ogleSecenekleri(d).filter(function (s) { return s.acik; }).forEach(function (s) {
      var yer = OGLE_YERLERI[s.id];
      yerler[yer] = yerler[yer] || [];
      var degerler = s.id === 'komsuyaSu' ? { n: KS.config.KOMSUYA_SU.maliyet } : null;
      var anahtar = s.id === 'komsuyaSu' && d.gun === KS.config.GUN_SAYISI ? 'eylem_komsuyaSonSu' : 'eylem_' + s.id;
      yerler[yer].push({ id: s.id, ad: KS.t(anahtar, degerler) });
    });
    return yerler;
  }

  function aksamSecimleri(d) {
    var yerler = {};
    KS.aksamSecenekleri(d).filter(function (s) { return s.acik; }).forEach(function (s) {
      if (s.id === 'aileVakti') {
        yerler.ev = [{ id: s.id, ad: KS.t('eylem_aileVakti') }];
      } else {
        yerler[s.id] = [{ id: s.id, ad: KS.t(s.gorev ? 'eylem_olcumGoturme' : 'eylem_ziyaret') }];
      }
    });
    return yerler;
  }

  // bitince(secilenId): öğlede eylem id'si, akşamda kişi id'si ya da 'aileVakti'.
  KS.ui.haritaAc = function (bitince) {
    var d = KS.state;
    var el = KS.ui.el;
    var katman = document.getElementById('katman');
    var secimler = d.dilim === 'ogle' ? ogleSecimleri(d) : aksamSecimleri(d);

    function sec(id) {
      katman.textContent = '';
      bitince(id);
    }

    function menuAc(yer) {
      var eski = katman.querySelector('.yer-menu');
      if (eski) eski.remove();
      var menu = el('div', 'panel yer-menu');
      menu.appendChild(el('h2', '', KS.yerAdi(yer)));
      secimler[yer.id].forEach(function (s) {
        var b = el('button', '', s.ad);
        b.onclick = function () { sec(s.id); };
        menu.appendChild(b);
      });
      var vazgec = el('button', 'vazgec', KS.t('vazgec'));
      vazgec.onclick = function () { menu.remove(); };
      menu.appendChild(vazgec);
      katman.appendChild(menu);
    }

    katman.textContent = '';
    var zemin = el('div', 'harita-zemin');
    zemin.innerHTML = KS.sahne('harita', d.dilim);
    katman.appendChild(zemin);
    KS.HARITA_YERLERI.forEach(function (yer) {
      var b = el('button', 'yer', KS.yerAdi(yer));
      b.style.left = yer.x + '%';
      b.style.top = yer.y + '%';
      b.dataset.yer = yer.id;
      b.disabled = !secimler[yer.id];
      b.onclick = function () { menuAc(yer); };
      katman.appendChild(b);
    });
    katman.appendChild(el('div', 'harita-soru', KS.t(d.dilim === 'ogle' ? 'haritaOgle' : 'haritaAksam')));
  };
})();
