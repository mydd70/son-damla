// ui/minioyun.js – Sabah mini oyunları: ot yolma ve keçi bakımı. Bonusu main.js, logic.js üzerinden uygular.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var KECI_SVG = '<svg viewBox="0 0 200 140" aria-hidden="true"><path fill="currentColor" d="M152 34 L146 10 L158 28 L170 12 L168 36 C180 42 186 52 184 60 C182 68 172 68 164 64 L156 62 C154 74 148 82 140 86 L140 130 L128 130 L126 94 L74 94 L70 130 L58 130 L56 88 L50 130 L38 130 L36 78 C28 70 24 58 26 46 L14 36 L30 38 C40 40 60 44 80 44 C100 44 124 44 136 40 C140 36 146 34 152 34 Z"/></svg>';
  var OT_SVG = '<svg viewBox="0 0 40 40" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" d="M20 38 C20 26 18 14 10 6 M20 38 C20 24 21 12 22 2 M20 38 C21 28 25 18 32 10 M20 38 C16 32 10 28 4 26 M20 38 C24 33 30 30 36 28"/></svg>';

  function panelAc(baslik, bitince) {
    var el = KS.ui.el;
    var katman = document.getElementById('katman');
    katman.textContent = '';
    var panel = el('div', 'panel mini');
    panel.appendChild(el('h2', '', baslik));
    if (KS.state.tekrarOyun) {
      var gec = el('button', 'hizli-gec', KS.t('hizliGec'));
      gec.onclick = function () { bitir(); };
      panel.appendChild(gec);
    }
    katman.appendChild(panel);
    document.body.classList.add('mini-acik');

    var bitti = false, temizle = null;
    function bitir() {
      if (bitti) return;
      bitti = true;
      document.body.classList.remove('mini-acik');
      if (temizle) temizle();
      katman.textContent = '';
      bitince();
    }
    return {
      panel: panel,
      bitir: bitir,
      bekleyipBitir: function () { setTimeout(bitir, KS.config.MINI_OYUN.bitisBekleme); },
      temizleyici: function (f) { temizle = f; }
    };
  }

  // Otların yeri: ızgaradan rastgele hücreler, hücre içinde küçük kayma.
  function otKonumlari() {
    var m = KS.config.MINI_OYUN;
    var hucreler = [];
    for (var i = 0; i < m.otSutun * m.otSatir; i++) hucreler.push(i);
    var konumlar = [];
    for (var n = 0; n < m.otAdet; n++) {
      var h = hucreler.splice(Math.floor(Math.random() * hucreler.length), 1)[0];
      var kayX = (Math.random() - 0.5) * m.otSarsinti, kayY = (Math.random() - 0.5) * m.otSarsinti;
      konumlar.push({
        x: 100 * ((h % m.otSutun) + 0.5 + kayX) / m.otSutun,
        y: 100 * (Math.floor(h / m.otSutun) + 0.5 + kayY) / m.otSatir
      });
    }
    return konumlar;
  }

  function otYolma(kontrol) {
    var el = KS.ui.el;
    var m = KS.config.MINI_OYUN;
    var icerik = el('div', 'mini-icerik');
    kontrol.panel.appendChild(icerik);
    var raf = null;
    kontrol.temizleyici(function () { cancelAnimationFrame(raf); });

    function hazirlik(mesaj, dugmeMetni) {
      icerik.textContent = '';
      icerik.appendChild(el('p', 'mini-yonerge', mesaj));
      var b = el('button', 'mini-basla', dugmeMetni);
      b.onclick = oyna;
      icerik.appendChild(b);
    }

    function oyna() {
      icerik.textContent = '';
      var sure = el('div', 'mini-sure');
      var sureDolu = el('div');
      sure.appendChild(sureDolu);
      icerik.appendChild(sure);
      var tarla = el('div', 'tarla');
      icerik.appendChild(tarla);
      var zemin = el('div', 'tarla-zemin');
      KS.ui.arayuzGorseli(zemin, 'tarla_zemin', '');
      tarla.appendChild(zemin);

      var kalan = m.otAdet;
      otKonumlari().forEach(function (k) {
        var ot = el('button', 'ot');
        KS.ui.arayuzGorseli(ot, 'ot' + (1 + Math.floor(Math.random() * m.otGorsel)), OT_SVG);
        ot.style.left = k.x + '%';
        ot.style.top = k.y + '%';
        ot.onclick = function () {
          KS.ses.cal('ot_yol');
          ot.remove();
          kalan -= 1;
          if (kalan === 0) { cancelAnimationFrame(raf); kontrol.bekleyipBitir(); }
        };
        tarla.appendChild(ot);
      });

      var bas = performance.now();
      raf = requestAnimationFrame(function tik(simdi) {
        var oran = (simdi - bas) / (m.otSure * 1000);
        sureDolu.style.width = Math.max(0, 100 * (1 - oran)) + '%';
        if (oran >= 1) hazirlik(KS.t('otSureBitti'), KS.t('yenidenDene'));
        else raf = requestAnimationFrame(tik);
      });
    }

    hazirlik(KS.t('otYonerge', { n: m.otSure }), KS.t('basla'));
  }

  function keciBakimi(kontrol) {
    var el = KS.ui.el;
    var m = KS.config.MINI_OYUN;
    var icerik = el('div', 'mini-icerik');
    kontrol.panel.appendChild(icerik);
    var yonerge = el('p', 'mini-yonerge', KS.t('keciTara', { keci: KS.state.keciAdi }));
    icerik.appendChild(yonerge);

    var alan = el('div', 'bakim');
    var keci = el('div', 'keci-siluet');
    KS.ui.arayuzGorseli(keci, KS.state.gosterge.keci >= KS.config.KECI.sutEsigi ? 'keci_saglikli' : 'keci_hasta', KECI_SVG);
    alan.appendChild(keci);
    var esyalar = el('div', 'bakim-esya');
    var su = el('button', '', ' ' + KS.t('suKabi'));
    KS.ui.ikonEkle(su, 'kova', '🪣');
    var yem = el('button', '', ' ' + KS.t('yem'));
    KS.ui.ikonEkle(yem, 'yem', '🌾');
    su.disabled = yem.disabled = true;
    esyalar.appendChild(su);
    esyalar.appendChild(yem);
    alan.appendChild(esyalar);
    icerik.appendChild(alan);
    var cubuk = el('div', 'mini-sure tarama');
    var cubukDolu = el('div');
    cubukDolu.style.width = '0';
    cubuk.appendChild(cubukDolu);
    icerik.appendChild(cubuk);

    // Tarama: basılıyken yatay sürtme mesafesi çubuğu doldurur.
    var surtme = 0, sonX = null, tarandi = false;
    keci.onpointerdown = function (e) {
      if (tarandi) return;
      sonX = e.clientX;
      keci.setPointerCapture(e.pointerId);
    };
    keci.onpointermove = function (e) {
      if (tarandi || sonX === null) return;
      surtme += Math.abs(e.clientX - sonX);
      sonX = e.clientX;
      var oran = surtme / (keci.getBoundingClientRect().width * m.taramaTur);
      cubukDolu.style.width = Math.min(100, 100 * oran) + '%';
      if (oran >= 1) {
        tarandi = true;
        sonX = null;
        yonerge.textContent = KS.t('keciSu');
        su.disabled = false;
      }
    };
    keci.onpointerup = keci.onpointercancel = function () { sonX = null; };

    su.onclick = function () {
      KS.ses.cal('su_dok');
      su.disabled = true;
      yonerge.textContent = KS.t('keciYem');
      yem.disabled = false;
    };
    yem.onclick = function () {
      yem.disabled = true;
      KS.ses.cal('keci');
      kontrol.bekleyipBitir();
    };
  }

  // bitince: oyun başarıyla bitince ya da "Hızlı geç" ile çağrılır.
  KS.ui.miniOyunAc = function (bitince) {
    var tur = KS.miniOyunTuru(KS.state);
    var kontrol = panelAc(KS.t('miniOyun_' + tur), bitince);
    if (tur === 'otYolma') otYolma(kontrol);
    else keciBakimi(kontrol);
  };
})();
