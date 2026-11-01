// ui/son.js – Son ekranı: (kötü sonda) eksik kalanlar, final metni, tekrar oyna.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

KS.ui.sonAc = function (sonuc, tekrar) {
  var el = KS.ui.el;
  var e = KS.ui.ekran();
  if (!sonuc.iyi) {
    e.appendChild(el('h2', '', KS.t('eksikBaslik')));
    var liste = el('ul', 'eksikler');
    sonuc.eksikler.forEach(function (ad) { liste.appendChild(el('li', '', KS.t('eksik_' + ad))); });
    e.appendChild(liste);
  }
  e.appendChild(el('div', 'kart-metin', KS.t('finalMetni')));
  e.appendChild(KS.ui.ekranDugmesi(KS.t('tekrarOyna'), tekrar));
  e.appendChild(KS.ui.kaynakDugmesi());
};
