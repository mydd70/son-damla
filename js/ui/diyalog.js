// ui/diyalog.js – Arka plan ve diyalog kutusu: konuşan, portre yer tutucusu, metin, seçenekler.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  // Boşluk ve Enter sonraki satıra geçer; basılı tutmak diyaloğu hızlandırır, seçeneklerde durur.
  document.addEventListener('keydown', function (e) {
    if (e.key !== ' ' && e.key !== 'Enter') return;
    if (!document.getElementById('defter').hidden) return;
    var gecis = document.getElementById('gecis');
    if (!gecis.hidden) { e.preventDefault(); if (!e.repeat) gecis.onclick(); return; }
    var ilerle = document.getElementById('ilerle');
    if (!ilerle.hidden) { e.preventDefault(); if (!e.repeat) ilerle.click(); return; }
    var kutu = document.getElementById('diyalog');
    if (kutu.hidden || !kutu.onclick) return;
    e.preventDefault();
    kutu.onclick();
  });

  // Yer kartı: oyuncu nereye geldiğini görsün. Sebep (giris) yazılıysa tıklanana kadar bekler, basılı tuşla geçilmez.
  function gecisKarti(olay, sonra) {
    var el = KS.ui.el;
    var kart = document.getElementById('gecis');
    var zaman = null;
    kart.textContent = '';
    kart.hidden = false;
    var bant = el('div', 'gecis-bant');
    bant.appendChild(el('div', 'gecis-baslik', KS.t('dilim_' + KS.state.dilim) + ' · ' + KS.t('yer_' + olay.mekan)));
    if (olay.giris) {
      bant.appendChild(el('div', 'gecis-giris', metinHazirla(olay.giris)));
      bant.appendChild(el('div', 'sonraki-isaret', '▼'));
    }
    kart.appendChild(bant);
    kart.onclick = function () {
      clearTimeout(zaman);
      kart.hidden = true;
      kart.onclick = null;
      sonra();
    };
    if (!olay.giris) zaman = setTimeout(kart.onclick, KS.config.GECIS.otomatikSure);
  }

  function metinHazirla(oge) {
    var k = KS.config;
    return KS.metinSec(oge)
      .replace(/\{keci\}/g, KS.state.keciAdi)
      .replace(/\{pay\}/g, KS.state.su.pay)
      .replace(/\{fazla\}/g, k.FAZLA_CEKME.damla)
      .replace(/\{maliyet\}/g, k.KOMSUYA_SU.maliyet)
      .replace(/\{sonGun\}/g, k.OLCUM.teslimSonGun)
      .replace(/\{griBolen\}/g, k.GRI_SU.bolen)
      .replace(/\{gereken\}/g, k.IKNA.gerekenArguman);
  }

  function satirSesi(satir) {
    if ('ortam' in satir) KS.ses.ortamCal(satir.ortam);
    if (satir.ses) KS.ses.cal(satir.ses);
    (satir.sesSoner || []).forEach(KS.ses.calSonerek);
  }

  function portreCiz(kim, ifade) {
    var k = KS.KARAKTERLER[kim] || {};
    var kutu = KS.ui.el('div', 'portre' + (k.siluet ? ' siluet' : ''));
    var yerTutucu = KS.ui.el('span', '', KS.karakterAdi(kim).charAt(0));
    var dosya = KS.ui.portreYolu(kim, ifade);
    if (!dosya) { kutu.appendChild(yerTutucu); return kutu; }
    var img = document.createElement('img');
    img.alt = '';
    img.onerror = function () {
      KS.ui.portreBozuk(dosya.ad);
      img.remove();
      kutu.appendChild(yerTutucu);
    };
    img.src = dosya.yol;
    kutu.appendChild(img);
    return kutu;
  }

  function satirCiz(kutu, satir) {
    kutu.textContent = '';
    kutu.classList.toggle('ipucu-penceresi', satir.kim === 'ipucu');
    if (satir.kim === 'ipucu') {
      kutu.appendChild(KS.ui.el('div', 'ipucu-ikon', '💡'));
      var ipucuGovde = KS.ui.el('div', 'diyalog-govde');
      ipucuGovde.appendChild(KS.ui.el('div', 'konusan', satir.baslik ? KS.metinSec(satir.baslik) : KS.t('ipucu')));
      ipucuGovde.appendChild(KS.ui.el('div', 'satir', metinHazirla(satir)));
      kutu.appendChild(ipucuGovde);
      return ipucuGovde;
    }
    var ekran = satir.kim === 'ekran';
    if (!ekran) kutu.appendChild(portreCiz(satir.kim, satir.ifade));
    var govde = KS.ui.el('div', 'diyalog-govde');
    if (!ekran) govde.appendChild(KS.ui.el('div', 'konusan', KS.karakterAdi(satir.kim)));
    govde.appendChild(KS.ui.el('div', 'satir' + (ekran ? ' ekran' : '') + (satir.kim === 'ic' ? ' ic' : ''), metinHazirla(satir)));
    kutu.appendChild(govde);
    return govde;
  }

  // olay: story.js biçimi. r: satır koşullarına verilen eylem sonucu. bitince: diyalog kapanınca çağrılır.
  KS.ui.diyalogOynat = function (olay, r, bitince) {
    var d = KS.state;
    // Öğreticiler tekrar oynayışta çıkmaz.
    var satirlar = olay.satirlar.filter(function (s) {
      return (!s.kosul || s.kosul(d, r || {})) && !(s.kim === 'ipucu' && d.tekrarOyun);
    });
    if (olay.tekSatir) satirlar = satirlar.slice(0, 1);
    if (!satirlar.length) { bitince(); return; }

    // Yer değişince ya da olayın sebebi yazılıysa önce yer kartı. Sonlarda kart yok, kendi metinleri var.
    var kartGerekli = olay.mekan && !olay.zaman && (olay.giris || olay.mekan !== KS.ui.sonMekan());
    if (olay.mekan) KS.ui.sahneGoster(olay.mekan, olay.mekanSecenek ? olay.mekanSecenek(d) : {}, olay.zaman);

    var kutu = document.getElementById('diyalog');
    var i;

    var secenekler = (olay.secenekler || []).filter(function (sc) { return !sc.kosul || sc.kosul(d, r || {}); });

    function kapat() {
      kutu.hidden = true;
      kutu.onclick = null;
      kutu.classList.remove('ipucu-penceresi');
      if (olay.etkiler) KS.ui.degisimGoster(KS.secimUygula(KS.state, olay).degisimler);
      if (olay.sonraki) KS.ui.diyalogOynat(KS.olayGetir(olay.sonraki), r, bitince);
      else bitince();
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

    function baslat() {
      i = 0;
      kutu.hidden = false;
      kutu.onclick = function () {
        if (i >= satirlar.length - 1) { kapat(); return; }
        i += 1;
        goster();
      };
      goster();
    }

    if (kartGerekli) gecisKarti(olay, baslat);
    else baslat();
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
