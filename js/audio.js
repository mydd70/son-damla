// audio.js – Ses çalma ve ses düğmesinin durumu. Eksik dosya oyunu durdurmaz: sessiz geçilir, konsola bir kez uyarı yazılır.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var onbellek = {}, eksik = {};
  var kanal = { ortam: null, muzik: null };   // sürekli çalan sesler
  var acik = true;

  function ayar() { return KS.config.SES; }

  function sesAl(id) {
    var c = ayar().liste[id];
    if (!c) { console.warn('Tanımsız ses:', id); return null; }
    if (eksik[id]) return null;
    if (!onbellek[id]) {
      var a = new Audio(ayar().klasor + id + (c.uzanti || ayar().uzanti));
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
    clearInterval(a.gecisZaman);
    a.volume = ayar().liste[id].seviye;
    a.muted = !acik;
    a.currentTime = 0;
    var p = a.play();
    if (p) p.catch(function () { /* eksik dosya ya da tarayıcı engeli: sessiz geç */ });
    return a;
  }

  // Sesi verilen sürede hedef seviyeye götürür; 0'a inince durdurur.
  function gecis(a, hedef, sure) {
    var adim = 0, s = ayar().sonmeAdim, bas = a.volume;
    clearInterval(a.gecisZaman);
    a.gecisZaman = setInterval(function () {
      adim += 1;
      a.volume = Math.max(0, Math.min(1, bas + (hedef - bas) * adim / s));
      if (adim >= s) {
        clearInterval(a.gecisZaman);
        if (hedef === 0) a.pause();
      }
    }, sure / s);
  }

  // Kanalın sesini değiştirir; null susturur. Aynı ses zaten çalıyorsa dokunmaz.
  function kanalCal(ad, id) {
    if (id === kanal[ad]) return;
    if (kanal[ad] && onbellek[kanal[ad]]) gecis(onbellek[kanal[ad]], 0, ayar().gecisSure);
    kanal[ad] = id;
    if (!id) return;
    var a = baslat(id);
    if (!a) return;
    clearInterval(a.gecisZaman);
    a.volume = 0;
    gecis(a, ayar().liste[id].seviye, ayar().gecisSure);
  }

  // Sekme arka plana geçince sürekli sesler durur, dönünce sürer (telefonda uygulama değiştirme).
  document.addEventListener('visibilitychange', function () {
    ['ortam', 'muzik'].forEach(function (ad) {
      var a = kanal[ad] && onbellek[kanal[ad]];
      if (!a) return;
      if (document.hidden) a.pause();
      else if (a.loop) { var p = a.play(); if (p) p.catch(function () { /* önemsiz */ }); }
    });
  });

  KS.ses = {
    // Kısa efektler ilk tıklamada gecikmesin diye baştan yüklenir.
    hazirla: function () {
      Object.keys(ayar().liste).forEach(function (id) {
        if (!ayar().liste[id].dongu && id.indexOf('muzik') !== 0) sesAl(id);
      });
    },

    cal: function (id) { baslat(id); },

    // Uzaklaşarak söner (kötü sonda kamyon ve bebek).
    calSonerek: function (id) {
      var a = baslat(id);
      if (a) gecis(a, 0, ayar().sonmeSure);
    },

    ortamCal: function (id) { kanalCal('ortam', id); },
    muzikCal: function (id) { kanalCal('muzik', id); },

    // Son ekranda müzik kesilmez, kısılarak sürer.
    muzikKis: function () {
      var id = kanal.muzik;
      if (id && onbellek[id]) gecis(onbellek[id], ayar().liste[id].seviye * ayar().finalOran, ayar().gecisSure);
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
