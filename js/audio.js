// audio.js – Ses çalma ve ses düğmesinin durumu. Eksik dosya oyunu durdurmaz: sessiz geçilir, konsola bir kez uyarı yazılır.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var onbellek = {}, eksik = {};
  var ortamId = null;
  var acik = true;

  function ayar() { return KS.config.SES; }

  function sesAl(id) {
    var c = ayar().liste[id];
    if (!c) { console.warn('Tanımsız ses:', id); return null; }
    if (eksik[id]) return null;
    if (!onbellek[id]) {
      var a = new Audio(ayar().klasor + id + ayar().uzanti);
      a.loop = !!c.dongu;
      a.addEventListener('error', function () {
        eksik[id] = true;
        console.warn('Eksik ses, sessiz geçiliyor:', id);
      });
      onbellek[id] = a;
    }
    return onbellek[id];
  }

  function baslat(id) {
    var a = sesAl(id);
    if (!a) return null;
    a.volume = ayar().liste[id].seviye;
    a.muted = !acik;
    a.currentTime = 0;
    var p = a.play();
    if (p) p.catch(function () { /* eksik dosya ya da tarayıcı engeli: sessiz geç */ });
    return a;
  }

  function sondur(a, seviye) {
    var adim = 0, s = ayar().sonmeAdim;
    var zaman = setInterval(function () {
      adim += 1;
      a.volume = Math.max(0, seviye * (1 - adim / s));
      if (adim >= s) { clearInterval(zaman); a.pause(); }
    }, ayar().sonmeSure / s);
  }

  KS.ses = {
    cal: function (id) { baslat(id); },

    // Uzaklaşarak söner (kötü sonda kamyon ve bebek).
    calSonerek: function (id) {
      var a = baslat(id);
      if (a) sondur(a, ayar().liste[id].seviye);
    },

    // Sürekli ortam sesi; null susturur. Aynı ses zaten çalıyorsa dokunmaz.
    ortamCal: function (id) {
      if (id === ortamId) return;
      if (ortamId && onbellek[ortamId]) onbellek[ortamId].pause();
      ortamId = id;
      if (id) baslat(id);
    },

    acikMi: function () { return acik; },

    degistir: function () {
      acik = !acik;
      Object.keys(onbellek).forEach(function (id) { onbellek[id].muted = !acik; });
      try { localStorage.setItem(ayar().anahtar, acik ? '1' : '0'); } catch (e) { /* önemsiz */ }
    },

    tercihYukle: function () {
      try { acik = localStorage.getItem(ayar().anahtar) !== '0'; } catch (e) { acik = true; }
    }
  };
})();
