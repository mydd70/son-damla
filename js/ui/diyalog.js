// ui/diyalog.js – Arka plan ve diyalog kutusu: konuşan, portre yer tutucusu, metin, seçenekler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var sonMekan = 'avlu', sonSecenek = {}, sonZaman = null;

  // Boşluk ve Enter sonraki satıra geçer; basılı tutmak diyaloğu hızlandırır, seçeneklerde durur.
  document.addEventListener('keydown', function (e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    var kutu = document.getElementById('diyalog');
    if (kutu.hidden || !kutu.onclick || !document.getElementById('defter').hidden) return;
    e.preventDefault();
    kutu.onclick();
  });

  // zaman verilmezse günün dilimi kullanılır. Akşam pencereler yanar, sulanan bahçe yeşerir.
  KS.ui.sahneGoster = function (mekan, secenek, zaman) {
    sonMekan = mekan;
    sonSecenek = secenek || {};
    sonZaman = zaman || null;
    var d = KS.state;
    var ciz = Object.assign({
      isik: d.dilim === 'aksam' && !zaman,
      yesil: d.gosterge.bahce >= KS.config.BAHCE.sebzeEsigi
    }, sonSecenek);
    document.getElementById('arkaplan').innerHTML = KS.sahne(mekan, zaman || d.dilim, ciz);
  };

  // Dilim değişince aynı mekânı yeni ışıkla çizer.
  KS.ui.sahneYenile = function () {
    KS.ui.sahneGoster(sonMekan, sonSecenek, sonZaman);
  };

  function metinHazirla(oge) {
    return KS.metinSec(oge).replace(/\{keci\}/g, KS.state.keciAdi).replace(/\{pay\}/g, KS.state.su.pay);
  }

  function satirSesi(satir) {
    if ('ortam' in satir) KS.ses.ortamCal(satir.ortam);
    if (satir.ses) KS.ses.cal(satir.ses);
    (satir.sesSoner || []).forEach(KS.ses.calSonerek);
  }

  function portreCiz(kim) {
    var k = KS.KARAKTERLER[kim] || {};
    var kutu = KS.ui.el('div', 'portre' + (k.siluet ? ' siluet' : ''));
    kutu.appendChild(KS.ui.el('span', '', KS.karakterAdi(kim).charAt(0)));
    return kutu;
  }

  function satirCiz(kutu, satir) {
    kutu.textContent = '';
    var ekran = satir.kim === 'ekran';
    if (!ekran) kutu.appendChild(portreCiz(satir.kim));
    var govde = KS.ui.el('div', 'diyalog-govde');
    if (!ekran) govde.appendChild(KS.ui.el('div', 'konusan', KS.karakterAdi(satir.kim)));
    govde.appendChild(KS.ui.el('div', 'satir' + (ekran ? ' ekran' : '') + (satir.kim === 'ic' ? ' ic' : ''), metinHazirla(satir)));
    kutu.appendChild(govde);
    return govde;
  }

  // olay: story.js biçimi. r: satır koşullarına verilen eylem sonucu. bitince: diyalog kapanınca çağrılır.
  KS.ui.diyalogOynat = function (olay, r, bitince) {
    var d = KS.state;
    if (olay.mekan) KS.ui.sahneGoster(olay.mekan, olay.mekanSecenek ? olay.mekanSecenek(d) : {}, olay.zaman);
    var satirlar = olay.satirlar.filter(function (s) { return !s.kosul || s.kosul(d, r || {}); });
    var kutu = document.getElementById('diyalog');
    var i = 0;

    var secenekler = (olay.secenekler || []).filter(function (sc) { return !sc.kosul || sc.kosul(d, r || {}); });

    function kapat() {
      kutu.hidden = true;
      kutu.onclick = null;
      if (olay.etkiler) KS.ui.degisimGoster(KS.secimUygula(KS.state, olay).degisimler);
      bitince();
    }

    function seceneklerCiz(govde) {
      kutu.onclick = null;
      kutu.style.cursor = 'default';
      var liste = KS.ui.el('div', 'secenekler');
      secenekler.forEach(function (sc) {
        var b = KS.ui.el('button', '', metinHazirla(sc));
        b.onclick = function () {
          kutu.style.cursor = '';
          var sonuc = KS.secimUygula(KS.state, sc);
          KS.ui.degisimGoster(sonuc.degisimler);
          if (sc.sonraki) KS.ui.diyalogOynat(KS.olayGetir(sc.sonraki), r, bitince);
          else kapat();
        };
        liste.appendChild(b);
      });
      govde.appendChild(liste);
    }

    function goster() {
      var son = i === satirlar.length - 1;
      var govde = satirCiz(kutu, satirlar[i]);
      satirSesi(satirlar[i]);
      if (son && secenekler.length) { seceneklerCiz(govde); return; }
      govde.appendChild(KS.ui.el('div', 'sonraki-isaret', '▼'));
      if (!son) kutu.appendChild(atlaDugmesi());
    }

    // Olayın sonuna atlar: seçenek varsa onu gösterir, etkiler kapanışta yine uygulanır.
    function atlaDugmesi() {
      var b = KS.ui.el('button', 'atla', KS.t('atla'));
      b.onclick = function (e) {
        e.stopPropagation();
        i = satirlar.length - 1;
        if (secenekler.length) goster();
        else kapat();
      };
      return b;
    }

    if (!satirlar.length) { bitince(); return; }
    kutu.hidden = false;
    kutu.onclick = function () {
      if (i >= satirlar.length - 1) { kapat(); return; }
      i += 1;
      goster();
    };
    goster();
  };

  // Olay listesini sırayla oynatır.
  KS.ui.olaylariOynat = function (liste, r, bitince) {
    var i = 0;
    (function sonraki() {
      if (i >= liste.length) { bitince(); return; }
      KS.ui.diyalogOynat(liste[i++], r, sonraki);
    })();
  };

  // Tek satır ve düğmeler; seçim hemen karşılaşma akışına döner. dugmeler: [{ oge, tikla }]
  KS.ui.secimGoster = function (satir, dugmeler) {
    var kutu = document.getElementById('diyalog');
    kutu.hidden = false;
    kutu.onclick = null;
    kutu.style.cursor = 'default';
    var govde = satirCiz(kutu, satir);
    var liste = KS.ui.el('div', 'secenekler');
    dugmeler.forEach(function (d) {
      var b = KS.ui.el('button', '', metinHazirla(d.oge));
      b.onclick = function () {
        kutu.style.cursor = '';
        kutu.hidden = true;
        d.tikla();
      };
      liste.appendChild(b);
    });
    govde.appendChild(liste);
  };

  // Tek satırlık duyuru (ertesi günün payı gibi).
  KS.ui.duyuru = function (metin, bitince) {
    KS.ui.diyalogOynat({ satirlar: [{ kim: 'ekran', metin: metin }] }, null, bitince);
  };
})();
