// ui/debug.js – ?debug=1: durum paneli, KS.log, yakalanmayan hatalar için kırmızı uyarı.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var acik = false;

  KS.ui.debugBaslat = function () {
    acik = true;
    Object.defineProperty(KS, 'log', { get: function () { return KS.state.gunluk; } });
    window.addEventListener('error', function (e) {
      var kutu = document.getElementById('debugHata');
      if (!kutu) {
        kutu = KS.ui.el('div');
        kutu.id = 'debugHata';
        document.body.appendChild(kutu);
      }
      kutu.textContent = e.message;
    });
    var panel = KS.ui.el('div');
    panel.id = 'debugPanel';
    document.body.appendChild(panel);
  };

  KS.ui.debugYenile = function () {
    if (!acik) return;
    var d = KS.state;
    var bayraklar = Object.keys(d.bayraklar).filter(function (b) { return d.bayraklar[b]; }).join(' ');
    document.getElementById('debugPanel').textContent =
      'G' + d.gun + ' ' + d.dilim + ' pay ' + d.su.pay + ' plan ' + d.plan + '\n' +
      JSON.stringify(d.gosterge) + '\n' +
      'ziyaret ' + JSON.stringify(d.ziyaretKalan) + '\n' +
      'argüman ' + d.komsu.ogrenilen.join(',') + ' ikna ' + d.komsu.ikna + '\n' +
      bayraklar;
  };
})();
