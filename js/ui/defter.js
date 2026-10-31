// ui/defter.js – Mehmet'in Defteri: görevler ve öğrenilen argümanlar. Durumu yalnızca okur.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

KS.ui.defterAc = function () {
  var el = KS.ui.el;
  var kutu = document.getElementById('defter');
  var icerik = KS.defter(KS.state);
  kutu.textContent = '';
  kutu.hidden = false;

  var panel = el('div', 'panel defter-panel');
  panel.appendChild(el('h2', '', KS.t('defterBaslik')));

  if (!icerik.gorevler.length && !icerik.argumanlar.length) panel.appendChild(el('p', '', KS.t('defterBos')));

  if (icerik.gorevler.length) {
    panel.appendChild(el('h3', '', KS.t('defterGorevler')));
    var gorevler = el('ul', 'defter-liste');
    icerik.gorevler.forEach(function (g) {
      gorevler.appendChild(el('li', g.tamam ? 'tamam' : '', (g.tamam ? '✓ ' : '') + KS.t('gorev_' + g.id, { sayi: g.sayi, gereken: g.gereken })));
    });
    panel.appendChild(gorevler);
  }

  if (icerik.argumanlar.length) {
    panel.appendChild(el('h3', '', KS.t('defterArgumanlar')));
    var argumanlar = el('ul', 'defter-liste');
    icerik.argumanlar.forEach(function (a) {
      var durum = KS.t('argumanDurum_' + a.durum);
      argumanlar.appendChild(el('li', a.durum === 'iletildi' ? 'tamam' : '', KS.t('arguman_' + a.id) + (durum ? ' (' + durum + ')' : '')));
    });
    panel.appendChild(argumanlar);
  }

  var kapat = el('button', '', KS.t('kapat'));
  kapat.onclick = function () { kutu.hidden = true; };
  panel.appendChild(kapat);
  kutu.appendChild(panel);
};
