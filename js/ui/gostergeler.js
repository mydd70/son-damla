// ui/gostergeler.js – Üst çubuk, kuyu ve değişim geri bildirimi. Durumu yalnızca okur.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  function el(etiket, sinif, metin) {
    var e = document.createElement(etiket);
    if (sinif) e.className = sinif;
    if (metin !== undefined) e.textContent = metin;
    return e;
  }

  function cubukGosterge(ad, deger) {
    var kutu = el('div', 'gosterge');
    kutu.dataset.gosterge = ad;
    var baslik = el('div', 'gosterge-ad');
    baslik.appendChild(el('span', '', KS.t('gosterge_' + ad)));
    baslik.appendChild(el('span', 'gosterge-durum', KS.durumMetni(ad, deger)));
    kutu.appendChild(baslik);
    var cubuk = el('div', 'cubuk');
    for (var i = 1; i <= KS.config.GOSTERGE.max; i++) cubuk.appendChild(el('div', 'dilim' + (i <= deger ? ' dolu' : '')));
    kutu.appendChild(cubuk);
    return kutu;
  }

  function kilerGosterge(deger) {
    var kutu = el('div', 'gosterge');
    kutu.dataset.gosterge = 'kiler';
    kutu.appendChild(el('div', 'gosterge-ad', KS.t('gosterge_kiler')));
    var sepet = '';
    for (var i = 0; i < deger; i++) sepet += '🧺';
    kutu.appendChild(el('div', 'sepetler', sepet));
    return kutu;
  }

  KS.ui.gostergeCiz = function () {
    var d = KS.state;
    var ust = document.getElementById('ust');
    ust.hidden = false;
    ust.textContent = '';
    ust.appendChild(el('div', 'gun-etiketi', KS.t('gun', { n: d.gun }) + ' · ' + KS.t('dilim_' + d.dilim)));
    ['keci', 'ev', 'bahce'].forEach(function (ad) { ust.appendChild(cubukGosterge(ad, d.gosterge[ad])); });
    ust.appendChild(kilerGosterge(d.gosterge.kiler));
    var defter = el('button', 'defter-dugme', KS.t('defter'));
    defter.onclick = KS.ui.defterAc;
    ust.appendChild(defter);

    var kuyu = document.getElementById('kuyu');
    kuyu.hidden = false;
    var su = kuyu.querySelector('.kuyu-su');
    if (!su) {
      kuyu.appendChild(el('div', '', KS.t('gosterge_kuyu')));
      var kap = el('div', 'kuyu-kap');
      su = el('div', 'kuyu-su');
      kap.appendChild(su);
      kuyu.appendChild(kap);
    }
    su.style.height = (100 * d.gosterge.kuyu / KS.config.KUYU.baslangic) + '%';
    kuyu.classList.toggle('uyari', d.gosterge.kuyu < KS.config.KUYU.uyari);
    KS.ui.debugYenile();
  };

  // Mantığın döndürdüğü değişimleri gösterir: "+2 / −1"; kuyuda sayı yok, düşünce titrer.
  KS.ui.degisimGoster = function (degisimler) {
    KS.ui.gostergeCiz();
    (degisimler || []).forEach(function (dg) {
      if (dg.ad === 'kuyu') {
        if (dg.fark < 0) titret();
        return;
      }
      var kutu = document.querySelector('[data-gosterge="' + dg.ad + '"]');
      if (!kutu) return;
      var fark = el('div', 'fark' + (dg.fark < 0 ? ' eksi' : ''), (dg.fark > 0 ? '+' : '−') + Math.abs(dg.fark));
      kutu.appendChild(fark);
      fark.addEventListener('animationend', function () { fark.remove(); });
    });
  };

  function titret() {
    var kuyu = document.getElementById('kuyu');
    kuyu.classList.remove('titre');
    void kuyu.offsetWidth;   // animasyonu yeniden başlatır
    kuyu.classList.add('titre');
  }

  KS.ui.el = el;
})();
