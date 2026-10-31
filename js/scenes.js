// scenes.js – Kodla çizilmiş SVG sahneler. Hem oyunun yedek arka planı hem de YZ görselleri için düzen referansı.
// KS.sahne(id, zaman, secenek) → SVG metni. zaman: 'sabah' | 'ogle' | 'aksam'.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var G = 960, Y = 540;   // 16:9

  // Toprak tonlu temel palet (öğle). Sabah ve akşam, üstüne konan ışık katmanıyla elde edilir.
  var P = {
    gok: '#EADDB8', gokAlt: '#F3E8CC', gunes: '#FFF6DA',
    tepe1: '#CDB088', tepe2: '#B9966A', tepe3: '#A57F57',
    zemin: '#D6B47E', zeminKoyu: '#C39C64', catlak: '#9C7446',
    duvar: '#C98E5E', duvarKoyu: '#A96F45', dam: '#8A5A3A', damKoyu: '#6E4529',
    kapi: '#5A3B26', pencere: '#3E2A1D', cerceve: '#E9D3AE',
    tas: '#B7A58A', tasKoyu: '#8E7D63', ahsap: '#7A5233', ahsapKoyu: '#563720',
    zeytin: '#8C8C4E', zeytinKoyu: '#6B6B38', kuruOt: '#C2A86E',
    golge: 'rgba(60,35,20,0.25)', su: '#7FA3A8', karanlik: '#2B1A12',
    kumas: '#B85C3C', krem: '#EFE0C2'
  };

  // Günün saatine göre ışık katmanı ve güneş konumu.
  var ZAMAN = {
    sabah: { renk: '#FFC98A', saydam: 0.22, karis: 'multiply', gunesX: 170, gunesY: 120, gunesR: 34 },
    ogle:  { renk: '#FFFFFF', saydam: 0,    karis: 'normal',   gunesX: 480, gunesY: 60,  gunesR: 30 },
    aksam: { renk: '#C2552E', saydam: 0.45, karis: 'multiply', gunesX: 800, gunesY: 200, gunesR: 40 }
  };

  // ---------- Yapı taşları ----------

  function gok(z) {
    var t = ZAMAN[z];
    return '<rect width="' + G + '" height="' + Y + '" fill="' + P.gok + '"/>' +
      '<rect y="200" width="' + G + '" height="140" fill="' + P.gokAlt + '" opacity="0.7"/>' +
      '<circle cx="' + t.gunesX + '" cy="' + t.gunesY + '" r="' + (t.gunesR + 18) + '" fill="' + P.gunes + '" opacity="0.35"/>' +
      '<circle cx="' + t.gunesX + '" cy="' + t.gunesY + '" r="' + t.gunesR + '" fill="' + P.gunes + '"/>';
  }

  function uzakTepeler(y) {
    return '<path d="M0 ' + (y - 40) + ' Q120 ' + (y - 90) + ' 260 ' + (y - 50) + ' T520 ' + (y - 60) + ' T780 ' + (y - 45) + ' T960 ' + (y - 70) + ' V' + Y + ' H0Z" fill="' + P.tepe1 + '"/>' +
      '<path d="M0 ' + (y - 10) + ' Q160 ' + (y - 45) + ' 340 ' + (y - 15) + ' T700 ' + (y - 25) + ' T960 ' + (y - 15) + ' V' + Y + ' H0Z" fill="' + P.tepe2 + '"/>';
  }

  function zemin(y, catlakSayisi) {
    var s = '<rect y="' + y + '" width="' + G + '" height="' + (Y - y) + '" fill="' + P.zemin + '"/>';
    s += '<rect y="' + y + '" width="' + G + '" height="6" fill="' + P.zeminKoyu + '" opacity="0.6"/>';
    // Kuraklık çatlakları: sabit düzen (her çizimde aynı)
    var n = catlakSayisi === undefined ? 9 : catlakSayisi;
    for (var i = 0; i < n; i++) {
      var x = 60 + (i * 211) % 860, yy = y + 30 + (i * 67) % (Y - y - 40);
      s += '<polyline points="' + x + ',' + yy + ' ' + (x + 18) + ',' + (yy + 6) + ' ' + (x + 30) + ',' + (yy - 3) + ' ' + (x + 48) + ',' + (yy + 4) +
        '" fill="none" stroke="' + P.catlak + '" stroke-width="2" stroke-linecap="round"/>';
      s += '<line x1="' + (x + 30) + '" y1="' + (yy - 3) + '" x2="' + (x + 34) + '" y2="' + (yy + 12) + '" stroke="' + P.catlak + '" stroke-width="1.5"/>';
    }
    return s;
  }

  function kuruOtlar(x, y, adet) {
    var s = '';
    for (var i = 0; i < adet; i++) {
      var xx = x + i * 9, h = 10 + (i * 7) % 12;
      s += '<line x1="' + xx + '" y1="' + y + '" x2="' + (xx + (i % 2 ? 4 : -3)) + '" y2="' + (y - h) + '" stroke="' + P.kuruOt + '" stroke-width="2" stroke-linecap="round"/>';
    }
    return s;
  }

  // Düz damlı kerpiç ev (Konya köy evi).
  function kerpicEv(x, y, w, h, o) {
    o = o || {};
    var s = '<rect x="' + (x + 8) + '" y="' + (y + h - 4) + '" width="' + w + '" height="10" fill="' + P.golge + '"/>';
    s += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (o.renk || P.duvar) + '"/>';
    s += '<rect x="' + x + '" y="' + (y + h - 18) + '" width="' + w + '" height="18" fill="' + P.duvarKoyu + '" opacity="0.5"/>';
    // dam ve parapet
    s += '<rect x="' + (x - 8) + '" y="' + (y - 12) + '" width="' + (w + 16) + '" height="14" fill="' + P.dam + '"/>';
    s += '<rect x="' + (x - 8) + '" y="' + (y - 2) + '" width="' + (w + 16) + '" height="4" fill="' + P.damKoyu + '"/>';
    // dam üstü ağaç kirişlerin uçları
    for (var i = 0; i < Math.floor(w / 26); i++) {
      s += '<rect x="' + (x + 6 + i * 26) + '" y="' + (y + 2) + '" width="6" height="5" fill="' + P.ahsapKoyu + '"/>';
    }
    // kapı
    if (o.kapi !== false) {
      var kx = x + (o.kapiX !== undefined ? o.kapiX : w * 0.62);
      s += '<rect x="' + kx + '" y="' + (y + h - 58) + '" width="34" height="58" fill="' + P.kapi + '"/>';
      s += '<rect x="' + (kx - 4) + '" y="' + (y + h - 62) + '" width="42" height="5" fill="' + P.ahsap + '"/>';
    }
    // pencereler
    var pencereler = o.pencereler || [w * 0.18];
    pencereler.forEach(function (px) {
      s += '<rect x="' + (x + px - 3) + '" y="' + (y + 22) + '" width="34" height="32" fill="' + P.cerceve + '"/>';
      s += '<rect x="' + (x + px) + '" y="' + (y + 25) + '" width="28" height="26" fill="' + (o.isik ? '#F2B65A' : P.pencere) + '"/>';
      s += '<line x1="' + (x + px + 14) + '" y1="' + (y + 25) + '" x2="' + (x + px + 14) + '" y2="' + (y + 51) + '" stroke="' + P.cerceve + '" stroke-width="2"/>';
    });
    // soba borusu
    if (o.boru !== false) s += '<rect x="' + (x + w - 26) + '" y="' + (y - 34) + '" width="8" height="24" fill="' + P.karanlik + '"/>';
    // sıva dökülmesi
    s += '<path d="M' + (x + w * 0.4) + ' ' + (y + h * 0.35) + ' l14 -4 l6 10 l-12 6 z" fill="' + P.duvarKoyu + '" opacity="0.6"/>';
    return s;
  }

  function agac(x, y, olcek, kuru) {
    var k = olcek || 1;
    var s = '<path d="M' + x + ' ' + y + ' L' + (x - 4 * k) + ' ' + (y - 70 * k) + ' L' + (x + 4 * k) + ' ' + (y - 70 * k) + ' L' + (x + 8 * k) + ' ' + y + 'Z" fill="' + P.ahsapKoyu + '"/>';
    var dallar = [[-4, -60, -40, -100], [2, -55, 36, -96], [0, -70, -10, -120], [2, -68, 22, -118], [-30, -88, -50, -104], [28, -86, 46, -100]];
    dallar.forEach(function (dl) {
      s += '<line x1="' + (x + dl[0] * k) + '" y1="' + (y + dl[1] * k) + '" x2="' + (x + dl[2] * k) + '" y2="' + (y + dl[3] * k) + '" stroke="' + P.ahsapKoyu + '" stroke-width="' + (4 * k) + '" stroke-linecap="round"/>';
    });
    if (!kuru) {
      s += '<ellipse cx="' + (x - 20 * k) + '" cy="' + (y - 105 * k) + '" rx="' + (34 * k) + '" ry="' + (22 * k) + '" fill="' + P.zeytin + '"/>';
      s += '<ellipse cx="' + (x + 22 * k) + '" cy="' + (y - 108 * k) + '" rx="' + (32 * k) + '" ry="' + (20 * k) + '" fill="' + P.zeytinKoyu + '"/>';
      s += '<ellipse cx="' + x + '" cy="' + (y - 125 * k) + '" rx="' + (30 * k) + '" ry="' + (20 * k) + '" fill="' + P.zeytin + '"/>';
    }
    return s;
  }

  function tasDuvar(x, y, w, h) {
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + P.tas + '"/>';
    for (var r = 0; r < Math.floor(h / 12); r++) {
      for (var c = 0; c < Math.floor(w / 22); c++) {
        var ox = (r % 2) * 11;
        s += '<rect x="' + (x + c * 22 + ox + 1) + '" y="' + (y + r * 12 + 1) + '" width="19" height="10" rx="3" fill="' + P.tasKoyu + '" opacity="0.35"/>';
      }
    }
    return s;
  }

  // Köy kuyusu: taş bilezik, ahşap çatkı, makara, kova.
  function kuyu(x, y, o) {
    o = o || {};
    var s = '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="78" ry="12" fill="' + P.golge + '"/>';
    s += '<rect x="' + (x - 60) + '" y="' + (y - 48) + '" width="120" height="50" fill="' + P.tas + '"/>';
    for (var i = 0; i < 5; i++) s += '<rect x="' + (x - 58 + i * 24) + '" y="' + (y - 44) + '" width="20" height="14" rx="3" fill="' + P.tasKoyu + '" opacity="0.4"/>';
    for (var j = 0; j < 4; j++) s += '<rect x="' + (x - 46 + j * 24) + '" y="' + (y - 26) + '" width="20" height="14" rx="3" fill="' + P.tasKoyu + '" opacity="0.4"/>';
    s += '<ellipse cx="' + x + '" cy="' + (y - 48) + '" rx="60" ry="11" fill="' + P.tasKoyu + '"/>';
    s += '<ellipse cx="' + x + '" cy="' + (y - 48) + '" rx="48" ry="7" fill="' + P.karanlik + '"/>';
    s += '<rect x="' + (x - 54) + '" y="' + (y - 140) + '" width="8" height="94" fill="' + P.ahsap + '"/>';
    s += '<rect x="' + (x + 46) + '" y="' + (y - 140) + '" width="8" height="94" fill="' + P.ahsap + '"/>';
    s += '<rect x="' + (x - 62) + '" y="' + (y - 146) + '" width="124" height="9" fill="' + P.ahsapKoyu + '"/>';
    s += '<circle cx="' + x + '" cy="' + (y - 128) + '" r="9" fill="' + P.ahsapKoyu + '"/>';
    s += '<line x1="' + x + '" y1="' + (y - 120) + '" x2="' + x + '" y2="' + (y - 86) + '" stroke="' + P.karanlik + '" stroke-width="2"/>';
    s += '<path d="M' + (x - 11) + ' ' + (y - 86) + ' h22 l-3 20 h-16 z" fill="' + P.kapi + '"/>';
    // sıra bekleyen bidonlar
    if (o.bidonlar) {
      for (var b = 0; b < o.bidonlar; b++) {
        var bx = x + 90 + b * 30;
        s += '<rect x="' + bx + '" y="' + (y - 30) + '" width="22" height="30" rx="3" fill="' + (b % 2 ? '#C9C2A6' : '#5E7F86') + '"/>';
        s += '<rect x="' + (bx + 7) + '" y="' + (y - 36) + '" width="8" height="6" fill="' + P.karanlik + '"/>';
      }
    }
    return s;
  }

  function sarnic(x, y, onarildi) {
    var s = '<ellipse cx="' + x + '" cy="' + (y + 4) + '" rx="120" ry="14" fill="' + P.golge + '"/>';
    s += '<rect x="' + (x - 105) + '" y="' + (y - 40) + '" width="210" height="44" fill="' + P.tas + '"/>';
    s += '<path d="M' + (x - 105) + ' ' + (y - 40) + ' Q' + x + ' ' + (y - 150) + ' ' + (x + 105) + ' ' + (y - 40) + 'Z" fill="' + P.tasKoyu + '"/>';
    s += '<path d="M' + (x - 80) + ' ' + (y - 48) + ' Q' + x + ' ' + (y - 128) + ' ' + (x + 80) + ' ' + (y - 48) + '" fill="none" stroke="' + P.tas + '" stroke-width="3" opacity="0.6"/>';
    s += '<rect x="' + (x - 20) + '" y="' + (y - 34) + '" width="40" height="38" rx="2" fill="' + P.karanlik + '"/>';
    if (!onarildi) {
      // kırık kubbe ve dökülmüş taşlar
      s += '<path d="M' + (x + 20) + ' ' + (y - 118) + ' l26 6 l-6 22 l18 8 l-34 4 z" fill="' + P.gok + '"/>';
      s += '<polyline points="' + (x + 30) + ',' + (y - 92) + ' ' + (x + 44) + ',' + (y - 70) + ' ' + (x + 38) + ',' + (y - 52) + '" fill="none" stroke="' + P.karanlik + '" stroke-width="2"/>';
      [[140, 0], [158, -6], [176, 2], [-150, 2]].forEach(function (t) {
        s += '<rect x="' + (x + t[0]) + '" y="' + (y - 12 + t[1]) + '" width="16" height="11" rx="3" fill="' + P.tasKoyu + '"/>';
      });
    } else {
      s += '<rect x="' + (x + 90) + '" y="' + (y - 18) + '" width="70" height="8" fill="' + P.ahsap + '"/>';
      s += '<rect x="' + (x + 150) + '" y="' + (y - 18) + '" width="8" height="22" fill="' + P.ahsap + '"/>';
    }
    // oluk
    s += '<rect x="' + (x - 170) + '" y="' + (y - 60) + '" width="70" height="8" fill="' + P.ahsap + '" transform="rotate(10 ' + (x - 135) + ' ' + (y - 56) + ')"/>';
    return s;
  }

  function elektrikDiregi(x, y) {
    return '<rect x="' + (x - 3) + '" y="' + (y - 150) + '" width="7" height="150" fill="' + P.ahsapKoyu + '"/>' +
      '<rect x="' + (x - 22) + '" y="' + (y - 140) + '" width="45" height="5" fill="' + P.ahsapKoyu + '"/>';
  }

  function teller(x1, x2, y) {
    return '<path d="M' + x1 + ' ' + y + ' Q' + ((x1 + x2) / 2) + ' ' + (y + 22) + ' ' + x2 + ' ' + y + '" fill="none" stroke="' + P.karanlik + '" stroke-width="1.2"/>';
  }

  // Komşunun motor kulübesi ve boru hattı.
  function motorKulubesi(x, y) {
    var s = '<rect x="' + x + '" y="' + (y - 70) + '" width="90" height="70" fill="#A7A08C"/>';
    s += '<path d="M' + (x - 8) + ' ' + (y - 70) + ' L' + (x + 45) + ' ' + (y - 92) + ' L' + (x + 98) + ' ' + (y - 70) + 'Z" fill="#7B7464"/>';
    s += '<rect x="' + (x + 30) + '" y="' + (y - 46) + '" width="30" height="46" fill="' + P.karanlik + '"/>';
    s += '<rect x="' + (x + 90) + '" y="' + (y - 18) + '" width="260" height="9" fill="#5F6E70"/>';
    s += '<rect x="' + (x + 345) + '" y="' + (y - 22) + '" width="12" height="16" fill="#4C595B"/>';
    return s;
  }

  function obruk(x, y) {
    var s = '<ellipse cx="' + x + '" cy="' + y + '" rx="150" ry="44" fill="' + P.catlak + '"/>';
    s += '<path d="M' + (x - 140) + ' ' + y + ' l14 -10 l12 6 l18 -12 l20 4 l16 -10 l22 6 l20 -8 l24 8 l18 -6 l20 10 l14 10 l-18 30 l-60 14 l-80 0 l-60 -16 z" fill="' + P.karanlik + '"/>';
    s += '<ellipse cx="' + x + '" cy="' + (y + 6) + '" rx="96" ry="22" fill="#170D08"/>';
    // kenar çatlakları
    [[-170, -6, -200, -20], [160, -4, 196, -18], [-60, -38, -80, -60], [70, -36, 96, -58]].forEach(function (c) {
      s += '<line x1="' + (x + c[0]) + '" y1="' + (y + c[1]) + '" x2="' + (x + c[2]) + '" y2="' + (y + c[3]) + '" stroke="' + P.karanlik + '" stroke-width="2"/>';
    });
    return s;
  }

  function tarlaSiralari(y1, y2) {
    var s = '';
    for (var i = 0; i < 7; i++) {
      var yy = y1 + i * (y2 - y1) / 7;
      s += '<line x1="0" y1="' + yy + '" x2="' + G + '" y2="' + (yy + 10) + '" stroke="' + P.zeminKoyu + '" stroke-width="3"/>';
      for (var k = 0; k < 14; k++) {
        s += '<line x1="' + (30 + k * 68 + (i % 2) * 20) + '" y1="' + (yy + 2) + '" x2="' + (34 + k * 68 + (i % 2) * 20) + '" y2="' + (yy - 7) + '" stroke="' + P.kuruOt + '" stroke-width="2"/>';
      }
    }
    return s;
  }

  function bank(x, y, w) {
    return '<rect x="' + x + '" y="' + (y - 22) + '" width="' + w + '" height="7" fill="' + P.ahsap + '"/>' +
      '<rect x="' + (x + 6) + '" y="' + (y - 15) + '" width="6" height="15" fill="' + P.ahsapKoyu + '"/>' +
      '<rect x="' + (x + w - 12) + '" y="' + (y - 15) + '" width="6" height="15" fill="' + P.ahsapKoyu + '"/>';
  }

  // ---------- Sahneler ----------

  var SAHNELER = {
    // Ailenin evi ve avlusu
    avlu: function (o) {
      var s = uzakTepeler(300) + zemin(330);
      s += kerpicEv(70, 190, 330, 160, { pencereler: [40, 120], kapiX: 230, isik: o.isik });
      s += tasDuvar(400, 290, 300, 50);
      s += tasDuvar(0, 310, 70, 30);
      // keçi ağılı
      s += '<rect x="720" y="270" width="150" height="70" fill="' + P.duvarKoyu + '"/>';
      s += '<rect x="712" y="262" width="166" height="10" fill="' + P.dam + '"/>';
      for (var i = 0; i < 6; i++) s += '<rect x="' + (726 + i * 24) + '" y="300" width="6" height="40" fill="' + P.ahsap + '"/>';
      s += '<rect x="720" y="310" width="150" height="5" fill="' + P.ahsap + '"/>';
      // çamaşır ipi
      s += '<line x1="410" y1="230" x2="690" y2="240" stroke="' + P.karanlik + '" stroke-width="1.5"/>';
      s += '<rect x="440" y="231" width="34" height="40" fill="' + P.kumas + '"/><rect x="490" y="232" width="26" height="30" fill="' + P.krem + '"/><rect x="530" y="233" width="40" height="22" fill="#6F8A7E"/>';
      s += '<rect x="404" y="225" width="6" height="70" fill="' + P.ahsapKoyu + '"/><rect x="688" y="235" width="6" height="60" fill="' + P.ahsapKoyu + '"/>';
      // bahçe: kuru sebze tarhı
      s += '<rect x="460" y="380" width="300" height="90" fill="' + P.zeminKoyu + '"/>';
      for (var r = 0; r < 3; r++) for (var c = 0; c < 9; c++) {
        s += '<path d="M' + (478 + c * 32) + ' ' + (400 + r * 28) + ' l-6 -12 m6 12 l6 -12" stroke="' + (o.yesil ? P.zeytin : P.kuruOt) + '" stroke-width="3" fill="none"/>';
      }
      // su testisi ve leğen
      s += '<path d="M150 410 q-14 -20 0 -40 h20 q14 20 0 40 z" fill="' + P.duvarKoyu + '"/><rect x="152" y="362" width="16" height="10" fill="' + P.duvarKoyu + '"/>';
      s += '<ellipse cx="230" cy="410" rx="40" ry="10" fill="#8F9A98"/>';
      s += agac(890, 470, 1.1, true);
      return s;
    },

    // Köy içi toprak yol
    koy_yolu: function () {
      var s = uzakTepeler(290) + zemin(320, 5);
      s += '<path d="M380 540 L470 320 L520 320 L700 540 Z" fill="' + P.zeminKoyu + '"/>';
      s += kerpicEv(20, 220, 220, 120, { pencereler: [30], kapiX: 140 });
      s += kerpicEv(250, 250, 140, 90, { pencereler: [20], kapiX: 90, boru: false });
      s += kerpicEv(600, 240, 180, 100, { pencereler: [30, 110], kapiX: 72 });
      s += kerpicEv(800, 210, 160, 130, { pencereler: [20], kapiX: 100 });
      s += elektrikDiregi(560, 330) + elektrikDiregi(880, 360) + teller(560, 880, 194) + teller(0, 560, 200);
      s += kuruOtlar(90, 420, 8) + kuruOtlar(760, 450, 10) + kuruOtlar(300, 500, 6);
      return s;
    },

    // Köyün ortak kuyusu
    kuyu_basi: function (o) {
      var s = uzakTepeler(300) + zemin(330);
      s += kerpicEv(40, 220, 180, 120, { pencereler: [30], kapiX: 110 });
      s += kerpicEv(760, 230, 180, 110, { pencereler: [110], kapiX: 30 });
      s += kuyu(450, 420, { bidonlar: o.bidonlar === undefined ? 5 : o.bidonlar });
      // yalak (hayvan suluğu), kuru
      s += '<rect x="170" y="430" width="150" height="34" fill="' + P.tasKoyu + '"/><rect x="178" y="434" width="134" height="12" fill="' + P.catlak + '"/>';
      s += agac(700, 360, 0.9, true);
      return s;
    },

    // Yaşlı çiftin taş evi ve kuru asma çardağı
    yasli_cift_evi: function (o) {
      var s = uzakTepeler(300) + zemin(330);
      s += tasDuvar(120, 180, 360, 160);
      s += '<rect x="112" y="168" width="376" height="14" fill="' + P.dam + '"/>';
      s += '<rect x="330" y="270" width="36" height="70" fill="' + P.kapi + '"/>';
      s += '<rect x="170" y="210" width="38" height="36" fill="' + P.cerceve + '"/><rect x="173" y="213" width="32" height="30" fill="' + (o.isik ? '#F2B65A' : P.pencere) + '"/>';
      // çardak
      s += '<rect x="500" y="200" width="8" height="150" fill="' + P.ahsap + '"/><rect x="760" y="200" width="8" height="150" fill="' + P.ahsap + '"/>';
      for (var i = 0; i < 7; i++) s += '<rect x="' + (490 + i * 44) + '" y="196" width="6" height="10" fill="' + P.ahsapKoyu + '"/>';
      s += '<rect x="480" y="192" width="300" height="8" fill="' + P.ahsapKoyu + '"/>';
      s += '<path d="M500 200 q30 30 60 0 q30 30 60 0 q30 30 60 0 q30 30 60 0 q20 20 40 0" fill="none" stroke="' + P.zeytinKoyu + '" stroke-width="4"/>';
      s += bank(540, 350, 160);
      // ahşap sandık (tohum)
      s += '<rect x="230" y="372" width="70" height="44" fill="' + P.ahsap + '"/><rect x="230" y="372" width="70" height="8" fill="' + P.ahsapKoyu + '"/>';
      s += '<path d="M420 410 q-12 -18 0 -36 h18 q12 18 0 36 z" fill="' + P.duvarKoyu + '"/>';
      s += agac(860, 460, 1, false);
      return s;
    },

    // Telefon çekmek için çıkılan tepe; aşağıda ova ve köy
    tepe: function () {
      var s = '<rect y="250" width="' + G + '" height="290" fill="' + P.tepe1 + '"/>';
      // aşağıdaki küçük köy
      for (var i = 0; i < 9; i++) {
        var x = 120 + i * 46, h = 14 + (i * 5) % 10;
        s += '<rect x="' + x + '" y="' + (300 - h) + '" width="34" height="' + h + '" fill="' + P.duvarKoyu + '"/>';
      }
      // ova: tarla şeritleri
      for (var j = 0; j < 5; j++) s += '<rect y="' + (310 + j * 18) + '" width="' + G + '" height="9" fill="' + (j % 2 ? P.tepe2 : P.zeminKoyu) + '" opacity="0.6"/>';
      // tepe yamacı
      s += '<path d="M380 540 Q560 330 760 360 Q880 380 960 330 V540Z" fill="' + P.tepe3 + '"/>';
      s += '<path d="M420 540 Q600 380 780 400 Q900 410 960 380 V540Z" fill="' + P.zeminKoyu + '"/>';
      s += agac(760, 390, 1.15, true);
      s += kuruOtlar(560, 470, 12) + kuruOtlar(840, 440, 8);
      s += '<rect x="640" y="340" width="7" height="60" fill="' + P.ahsapKoyu + '"/>';   // eski işaret direği
      return s;
    },

    // Komşunun tarlası; o.obruk=true ise gün 8'deki obruk
    komsu_tarlasi: function (o) {
      var s = uzakTepeler(280) + zemin(300, 4);
      s += tarlaSiralari(330, 540);
      s += kerpicEv(40, 200, 170, 110, { pencereler: [24], kapiX: 104 });
      s += motorKulubesi(300, 320);
      if (o.obruk) s += obruk(620, 430);
      s += elektrikDiregi(250, 310) + elektrikDiregi(900, 320) + teller(250, 900, 174);
      return s;
    },

    // Muhtarlık ve önündeki meydan (toplantı yeri)
    muhtarlik: function (o) {
      var s = uzakTepeler(290) + zemin(320, 5);
      s += kerpicEv(280, 170, 400, 170, { pencereler: [40, 120, 300], kapiX: 210, renk: '#D4A378', isik: o.isik });
      s += '<rect x="440" y="186" width="90" height="22" fill="' + P.krem + '"/>';          // tabela (yazısız)
      // bayrak direği
      s += '<rect x="730" y="120" width="5" height="220" fill="#8B8B8B"/>';
      s += '<rect x="735" y="124" width="60" height="40" fill="#C8352B"/>';
      s += '<circle cx="756" cy="144" r="10" fill="#F4EDE0"/><circle cx="760" cy="144" r="8" fill="#C8352B"/>';
      s += '<polygon points="770,139 772,144 777,144 773,147 774,152 770,149 766,152 767,147 763,144 768,144" fill="#F4EDE0"/>';
      // toplantı bankları
      s += bank(120, 420, 160) + bank(330, 450, 160) + bank(560, 450, 160) + bank(770, 420, 160);
      s += agac(110, 350, 1, false);
      if (o.toplanti) s += '<rect x="440" y="380" width="80" height="40" fill="' + P.ahsap + '"/>';   // masa
      return s;
    },

    // Eski taş sarnıç; o.onarildi=true iyi son sürümü
    sarnic: function (o) {
      var s = uzakTepeler(300) + zemin(330);
      s += sarnic(480, 430, !!o.onarildi);
      s += agac(180, 440, 1, !o.onarildi);
      s += kuruOtlar(700, 470, 10) + kuruOtlar(90, 500, 7);
      if (o.onarildi) s += '<rect x="560" y="440" width="90" height="10" fill="' + P.su + '" opacity="0.7"/>';
      return s;
    },

    // Köyden çıkan yol; uzakta dumanlı şehir (kötü son)
    koy_cikisi: function () {
      var s = '<rect y="260" width="' + G + '" height="280" fill="' + P.tepe1 + '"/>';
      // uzak şehir siluetleri ve duman
      for (var i = 0; i < 12; i++) {
        var x = 560 + i * 30, h = 30 + (i * 17) % 50;
        s += '<rect x="' + x + '" y="' + (262 - h) + '" width="24" height="' + h + '" fill="#8C8578" opacity="0.8"/>';
      }
      s += '<ellipse cx="700" cy="200" rx="200" ry="40" fill="#9C958A" opacity="0.45"/>';
      s += '<ellipse cx="820" cy="180" rx="140" ry="30" fill="#9C958A" opacity="0.35"/>';
      s += zemin(290, 6);
      s += '<path d="M300 540 L600 290 L640 290 L760 540 Z" fill="' + P.zeminKoyu + '"/>';
      s += '<line x1="620" y1="300" x2="620" y2="540" stroke="' + P.zemin + '" stroke-width="3" stroke-dasharray="20 18"/>';
      s += kerpicEv(40, 230, 160, 100, { pencereler: [24], kapiX: 100 });
      s += elektrikDiregi(820, 360) + elektrikDiregi(520, 330) + teller(520, 820, 194);
      s += agac(250, 470, 0.9, true);
      return s;
    }
  };

  // ---------- Köy haritası (kuşbakışı) ----------
  // Tıklama noktaları yüzdeyle; arayüz bu listeyi kullanır.
  KS.HARITA_YERLERI = [
    { id: 'ev',            ad: 'Evimiz',         x: 30, y: 62 },
    { id: 'yasliCift',     ad: 'Yaşlı çift',     x: 16, y: 34 },
    { id: 'muhtar',        ad: 'Muhtarlık',      x: 50, y: 38 },
    { id: 'ogretmen',      ad: 'Okul',           x: 68, y: 22 },
    { id: 'komsu',         ad: 'Komşunun evi',   x: 74, y: 58 },
    { id: 'komsuTarlasi',  ad: 'Komşunun tarlası', x: 88, y: 80 },
    { id: 'kuyu',          ad: 'Köy kuyusu',     x: 47, y: 60 },
    { id: 'sarnic',        ad: 'Sarnıç',         x: 30, y: 16 },
    { id: 'tepe',          ad: 'Tepe',           x: 88, y: 14 }
  ];

  function harita(o) {
    o = o || {};
    var s = '<rect width="' + G + '" height="' + Y + '" fill="' + P.zemin + '"/>';
    // tarla parselleri
    var parseller = [[600, 360, 360, 180, P.zeminKoyu], [0, 420, 220, 120, P.tepe1], [760, 260, 200, 110, P.tepe2], [0, 0, 160, 110, P.tepe1]];
    parseller.forEach(function (p) { s += '<rect x="' + p[0] + '" y="' + p[1] + '" width="' + p[2] + '" height="' + p[3] + '" fill="' + p[4] + '"/>'; });
    for (var i = 0; i < 8; i++) s += '<line x1="600" y1="' + (380 + i * 20) + '" x2="960" y2="' + (380 + i * 20) + '" stroke="' + P.catlak + '" stroke-width="1.5" opacity="0.6"/>';
    // tepe (eş yükselti eğrileri)
    s += '<ellipse cx="845" cy="75" rx="120" ry="70" fill="' + P.tepe2 + '"/><ellipse cx="845" cy="75" rx="80" ry="45" fill="' + P.tepe3 + '"/><ellipse cx="845" cy="75" rx="40" ry="22" fill="' + P.duvarKoyu + '"/>';
    // yollar
    s += '<path d="M0 330 C200 320 300 340 480 330 S760 300 960 320" fill="none" stroke="' + P.zeminKoyu + '" stroke-width="26"/>';
    s += '<path d="M450 540 C460 420 470 300 480 200 S560 100 650 120" fill="none" stroke="' + P.zeminKoyu + '" stroke-width="20"/>';
    s += '<path d="M480 200 C380 160 300 100 290 60" fill="none" stroke="' + P.zeminKoyu + '" stroke-width="14"/>';
    s += '<path d="M650 120 C720 100 780 90 820 80" fill="none" stroke="' + P.zeminKoyu + '" stroke-width="10" stroke-dasharray="14 8"/>';
    // evler (kuşbakışı düz damlar)
    function dam(x, y, w, h, renk) {
      return '<rect x="' + (x + 5) + '" y="' + (y + 5) + '" width="' + w + '" height="' + h + '" fill="' + P.golge + '"/>' +
        '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + (renk || P.dam) + '"/>' +
        '<rect x="' + (x + 4) + '" y="' + (y + 4) + '" width="' + (w - 8) + '" height="' + (h - 8) + '" fill="none" stroke="' + P.damKoyu + '" stroke-width="2"/>';
    }
    var bos = [[360, 250, 50, 40], [560, 250, 60, 40], [600, 400, 40, 30], [120, 260, 50, 36], [380, 420, 46, 34], [250, 400, 40, 30], [540, 160, 44, 30]];
    bos.forEach(function (b) { s += dam(b[0], b[1], b[2], b[3], P.duvarKoyu); });
    s += dam(255, 300, 80, 60);                        // ev
    s += '<rect x="340" y="320" width="60" height="40" fill="' + P.zeminKoyu + '"/>';   // bahçe
    s += dam(120, 160, 70, 50, P.tasKoyu);             // yaşlı çift
    s += dam(445, 180, 90, 50, '#B98B62');             // muhtarlık
    s += dam(610, 90, 90, 50, '#9E7A5A');              // okul
    s += dam(680, 290, 70, 46);                        // komşu evi
    s += '<rect x="800" y="400" width="30" height="24" fill="#7B7464"/>';               // motor kulübesi
    // kuyu
    s += '<circle cx="451" cy="324" r="16" fill="' + P.tas + '"/><circle cx="451" cy="324" r="9" fill="' + P.karanlik + '"/>';
    // sarnıç
    s += '<circle cx="288" cy="86" r="26" fill="' + P.tasKoyu + '"/><circle cx="288" cy="86" r="14" fill="' + P.tas + '"/>';
    // kuru ağaçlar
    [[220, 230], [560, 470], [720, 200], [90, 360], [900, 200]].forEach(function (a) {
      s += '<circle cx="' + a[0] + '" cy="' + a[1] + '" r="12" fill="' + P.zeytinKoyu + '" opacity="0.8"/>';
    });
    // Etiketler yalnızca referans görseli için; oyunda adları arayüz yazar.
    if (o.etiketler) {
      KS.HARITA_YERLERI.forEach(function (y) {
        var x = y.x * G / 100, yy = y.y * Y / 100 + 34;
        s += '<rect x="' + (x - 62) + '" y="' + (yy - 15) + '" width="124" height="22" rx="4" fill="' + P.krem + '" opacity="0.9"/>';
        s += '<text x="' + x + '" y="' + yy + '" font-family="sans-serif" font-size="14" text-anchor="middle" fill="' + P.karanlik + '">' + y.ad + '</text>';
      });
    }
    return s;
  }

  // ---------- Dışa açık ----------

  KS.SAHNE_LISTESI = Object.keys(SAHNELER).concat(['harita']);

  // Günün saati ışık katmanı: YZ görsellerinin üstüne de aynı katman konur (arayüzde CSS ile).
  KS.ZAMAN_KATMANI = ZAMAN;

  KS.sahne = function (id, zaman, secenek) {
    zaman = ZAMAN[zaman] ? zaman : 'ogle';
    secenek = secenek || {};
    var govde;
    if (id === 'harita') govde = harita(secenek);
    else if (SAHNELER[id]) govde = gok(zaman) + SAHNELER[id](secenek);
    else {
      console.warn('Bilinmeyen sahne:', id);
      govde = gok(zaman) + zemin(330);
    }
    var t = ZAMAN[zaman];
    var isik = t.saydam > 0 && id !== 'harita'
      ? '<rect width="' + G + '" height="' + Y + '" fill="' + t.renk + '" opacity="' + t.saydam + '" style="mix-blend-mode:' + t.karis + '"/>'
      : '';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + G + ' ' + Y + '" preserveAspectRatio="xMidYMid slice" role="img" aria-label="' + id + '">' +
      govde + isik + '</svg>';
  };
})();

if (typeof module !== 'undefined') module.exports = KS;
