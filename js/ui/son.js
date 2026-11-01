// ui/son.js – Son ekranı: (kötü sonda) eksik kalanlar, final metni, tekrar oyna.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

KS.ui.sonAc = function (sonuc, tekrar) {
  var el = KS.ui.el;
  var e = KS.ui.ekran();
  e.classList.add('final');
  if (sonuc.iyi) {
    var arka = el('div', 'baslangic-gorsel son-gorsel');
    KS.ui.arayuzGorseli(arka, 'final', '');
    e.appendChild(arka);
  }
  e.appendChild(el('div', 'final-baslik', KS.t('finalBaslik')));
  ['finalVeri', 'finalKuresel', 'finalAna', 'finalDunya'].forEach(function (k) { e.appendChild(el('p', 'final-veri', KS.t(k))); });
  e.appendChild(el('div', 'kart-metin', KS.t('finalMetni')));
  e.appendChild(el('p', 'final-kaynak', KS.t('finalKaynak')));
  e.appendChild(KS.ui.ekranDugmesi(KS.t('tekrarOyna'), tekrar));
  if (!sonuc.iyi) {
    e.appendChild(el('h2', '', KS.t('eksikBaslik')));
    var liste = el('ul', 'eksikler');
    sonuc.eksikler.forEach(function (ad) { liste.appendChild(el('li', '', KS.t('eksik_' + ad))); });
    e.appendChild(liste);
  }
  e.appendChild(KS.ui.yapimciYazisi());
  e.appendChild(KS.ui.kaynakDugmesi());
};
