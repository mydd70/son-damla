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
    kutu.appendChild(el('div', 'sepetler', sepet || KS.t('kilerBos')));
    return kutu;
  }

  KS.ui.kilerOzetMetni = function (ozet) {
    return KS.t('kilerOzet', { parcalar: [
      KS.t(ozet.sut ? 'kiler_sut' : 'kiler_sutYok'),
      KS.t(ozet.sebze ? 'kiler_sebze' : 'kiler_sebzeYok'),
      ozet.yetmedi ? KS.t('kiler_sofraYok') : KS.t('kiler_sofra', { n: ozet.sofra })
    ].join(' · ') });
  };

  // Aynı göstergedeki değişimler tek farka toplanır; yoksa yazılar üst üste biner.
  function netDegisimler(liste) {
    var net = [];
    (liste || []).forEach(function (dg) {
      var var_ = net.filter(function (n) { return n.ad === dg.ad; })[0];
      if (var_) var_.fark += dg.fark;
      else net.push({ ad: dg.ad, fark: dg.fark });
    });
    return net.filter(function (n) { return n.fark !== 0; });
  }

  // Gün ve dilim: Sabah · Öğle · Akşam, şu anki vurgulu, serbest olanlar farklı.
  function gunGosterge(d) {
    var kutu = el('div', 'gun-etiketi');
    kutu.appendChild(el('div', 'gun-no', KS.t('gun', { n: d.gun })));
    var plan = KS.GUN_PLANLARI[d.gun - 1] || {};
    var dilimler = el('div', 'dilimler');
    KS.config.DILIMLER.forEach(function (dilim) {
      var sinif = 'dilim-adi' + (dilim === d.dilim ? ' simdi' : '') + (plan[dilim] === 'serbest' ? ' serbest' : '');
      dilimler.appendChild(el('span', sinif, KS.t('dilim_' + dilim)));
    });
    kutu.appendChild(dilimler);
    return kutu;
  }

  KS.ui.gostergeCiz = function () {
    var d = KS.state;
    var ust = document.getElementById('ust');
    ust.hidden = false;
    ust.textContent = '';
    ust.appendChild(gunGosterge(d));
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
    netDegisimler(degisimler).forEach(function (dg) {
      if (dg.ad === 'kuyu') {
        if (dg.fark < 0) titret();
        return;
      }
      var kutu = document.querySelector('[data-gosterge="' + dg.ad + '"]');
      if (!kutu) return;
      // Çubuk yeniden çizilse de silinmesin diye yazı sahnenin kendisine eklenir.
      var oyun = document.getElementById('oyun');
      var alan = oyun.getBoundingClientRect(), yer = kutu.getBoundingClientRect();
      var fark = el('div', 'fark' + (dg.fark < 0 ? ' eksi' : ''), (dg.fark > 0 ? '+' : '−') + Math.abs(dg.fark));
      fark.style.left = (yer.left - alan.left + yer.width / 2) + 'px';
      fark.style.top = (yer.bottom - alan.top) + 'px';
      oyun.appendChild(fark);
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
