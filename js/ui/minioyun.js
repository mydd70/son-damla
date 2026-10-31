// ui/minioyun.js – Sabah işi. Aşama 2: yer tutucu; gerçek mini oyunlar Aşama 3'te.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

KS.ui.miniOyunAc = function (bitince) {
  var el = KS.ui.el;
  var katman = document.getElementById('katman');
  katman.textContent = '';
  var panel = el('div', 'panel');
  panel.appendChild(el('h2', '', KS.t('miniOyun_' + KS.miniOyunTuru(KS.state))));
  panel.appendChild(el('p', '', KS.t('miniOyunYerTutucu')));
  var b = el('button', '', KS.t('bitir'));
  b.onclick = function () { katman.textContent = ''; bitince(); };
  panel.appendChild(b);
  katman.appendChild(panel);
};
