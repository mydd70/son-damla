// ui/sahne.js – Arka plan çizimi: görsel varsa görsel + ışık katmanı, yoksa SVG sahne. Portre görseli de burada seçilir.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  var sonMekan = 'avlu', sonSecenek = {}, sonZaman = null;
  var bozuk = {};        // yüklenemeyen görseller: bir daha denenmez, SVG'ye düşülür
  var onYukleme = [];

  function gorselYolu(ad) {
    return KS.config.GORSEL.klasor + ad + KS.config.GORSEL.uzanti;
  }

  // Durum farkı olan mekânların ayrı görseli var.
  function gorselAdi(mekan, secenek) {
    var ad = mekan;
    if (mekan === 'komsu_tarlasi' && secenek.obruk) ad = 'komsu_tarlasi_obruk';
    if (mekan === 'sarnic' && secenek.onarildi) ad = 'sarnic_onarildi';
    if (KS.config.GORSEL.dosyalar.indexOf(ad) < 0 || bozuk[ad]) return null;
    return ad;
  }

  // Sahneyi verilen kutuya çizer. Görsel yüklenemezse aynı kutuya SVG çizilir.
  KS.ui.sahneCiz = function (kutu, mekan, zaman, secenek) {
    secenek = secenek || {};
    var ad = gorselAdi(mekan, secenek);
    if (!ad) { kutu.innerHTML = KS.sahne(mekan, zaman, secenek); return; }

    kutu.textContent = '';
    var img = document.createElement('img');
    img.className = 'sahne-gorsel';
    img.alt = '';
    img.onerror = function () {
      bozuk[ad] = true;
      console.warn('Eksik görsel, SVG kullanılıyor:', ad);
      KS.ui.sahneCiz(kutu, mekan, zaman, secenek);
    };
    img.src = gorselYolu(ad);
    kutu.appendChild(img);

    var t = KS.ZAMAN_KATMANI[zaman];
    if (t && t.saydam > 0 && KS.config.GORSEL.kendiHavasi.indexOf(ad) < 0) {
      var isik = document.createElement('div');
      isik.className = 'sahne-isik';
      isik.style.background = t.renk;
      isik.style.opacity = t.saydam;
      isik.style.mixBlendMode = t.karis;
      kutu.appendChild(isik);
    }
    if (zaman === 'yagmur') kutu.insertAdjacentHTML('beforeend', KS.yagmurKatmani());
  };

  // zaman verilmezse günün dilimi kullanılır. Akşam pencereler yanar, sulanan bahçe yeşerir (yalnızca SVG sahnelerde).
  KS.ui.sahneGoster = function (mekan, secenek, zaman) {
    sonMekan = mekan;
    sonSecenek = secenek || {};
    sonZaman = zaman || null;
    var d = KS.state;
    var ciz = Object.assign({
      isik: d.dilim === 'aksam' && !zaman,
      yesil: d.gosterge.bahce >= KS.config.BAHCE.sebzeEsigi
    }, sonSecenek);
    KS.ui.sahneCiz(document.getElementById('arkaplan'), mekan, zaman || d.dilim, ciz);
    if (!zaman) KS.ses.ortamCal(KS.ui.ortamAdi(mekan));   // sonların kendi ortam satırları var
  };

  // Mekânın kendi sesi varsa o, yoksa dilimin sesi.
  KS.ui.ortamAdi = function (mekan) {
    var s = KS.config.SES;
    var d = KS.state;
    return s.mekanOrtam[mekan] || (d.dilim !== 'aksam' && s.gunOrtam[d.gun]) || s.ortam[d.dilim];
  };

  KS.ui.sonMekan = function () { return sonMekan; };

  // Dilim değişince aynı mekânı yeni ışıkla çizer.
  KS.ui.sahneYenile = function () {
    KS.ui.sahneGoster(sonMekan, sonSecenek, sonZaman);
  };

  // Sahne değişirken boşluk görünmesin diye görseller baştan yüklenir.
  KS.ui.gorselleriHazirla = function () {
    KS.config.GORSEL.dosyalar.forEach(function (ad) {
      var img = new Image();
      img.src = gorselYolu(ad);
      onYukleme.push(img);
    });
  };

  // Karakterin portre dosyası: varsa ifadeli hâli, yoksa düz portre, o da yoksa null.
  KS.ui.portreYolu = function (kim, ifade) {
    var k = KS.KARAKTERLER[kim];
    if (!k || !k.portre) return null;
    var p = KS.config.PORTRE;
    var adaylar = ifade ? [k.portre + '_' + ifade, k.portre] : [k.portre];
    for (var i = 0; i < adaylar.length; i++) {
      if (p.dosyalar.indexOf(adaylar[i]) >= 0 && !bozuk['p:' + adaylar[i]]) return { ad: adaylar[i], yol: p.klasor + adaylar[i] + p.uzanti };
    }
    return null;
  };

  KS.ui.portreBozuk = function (ad) {
    bozuk['p:' + ad] = true;
    console.warn('Eksik portre, yer tutucu kullanılıyor:', ad);
  };
})();
