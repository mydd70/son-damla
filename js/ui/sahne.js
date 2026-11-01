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

  KS.ui.gorselVar = function (ad) {
    return KS.config.GORSEL.dosyalar.indexOf(ad) >= 0 && !bozuk[ad];
  };

  // Durum farkı olan mekânların ayrı görseli var.
  function gorselAdi(mekan, secenek) {
    var ad = mekan;
    if (mekan === 'komsu_tarlasi' && secenek.obruk) ad = 'komsu_tarlasi_obruk';
    if (mekan === 'sarnic' && secenek.onarildi) ad = 'sarnic_onarildi';
    // Okul ve toplantı görseli varsa kullanılır; yoksa köy yolu ve muhtarlık kalır.
    if (mekan === 'koy_yolu' && secenek.okul && KS.ui.gorselVar('okul')) ad = 'okul';
    if (mekan === 'muhtarlik' && secenek.toplanti && KS.ui.gorselVar('toplanti')) ad = 'toplanti';
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
    var g = KS.config.ARAYUZ_GORSEL;
    g.dosyalar.forEach(function (ad) {
      var img = new Image();
      img.src = g.klasor + ad + g.uzanti;
      onYukleme.push(img);
    });
  };

  // Arayüz görseli: listede yoksa ya da yüklenemezse kutuda yedek içerik (SVG, emoji) kalır.
  KS.ui.arayuzGorseli = function (kutu, ad, yedek) {
    var g = KS.config.ARAYUZ_GORSEL;
    kutu.innerHTML = yedek;
    if (g.dosyalar.indexOf(ad) < 0) return;
    var img = document.createElement('img');
    img.alt = '';
    img.draggable = false;
    function yerlestir() { kutu.textContent = ''; kutu.appendChild(img); kutu.classList.add('resimli'); }
    img.onerror = function () { console.warn('Eksik arayüz görseli, yedek kullanılıyor:', ad); };
    img.src = g.klasor + ad + g.uzanti;
    if (img.complete && img.naturalWidth) yerlestir();   // baştan yüklendiyse titreme olmasın
    else img.onload = yerlestir;
  };

  // Düğme metninin önüne küçük görsel.
  KS.ui.ikonEkle = function (dugme, ad, yedek) {
    var ikon = KS.ui.el('span', 'ikon');
    KS.ui.arayuzGorseli(ikon, ad, yedek);
    dugme.insertBefore(ikon, dugme.firstChild);
  };

  // Karakterin portre dosyası: varsa ifadeli hâli, yoksa düz portre, o da yoksa null.
  // Köylülerin ortak adı var: hangi yüz olduğu satırın Türkçe metninden hesaplanır, aynı satır hep aynı köylüdür.
  function koyluPortresi(k, metin) {
    var toplam = 0;
    for (var i = 0; i < (metin || '').length; i++) toplam += metin.charCodeAt(i);
    return k.portreler[toplam % k.portreler.length];
  }

  KS.ui.portreYolu = function (kim, ifade, metin) {
    var k = KS.KARAKTERLER[kim];
    if (!k || (!k.portre && !k.portreler)) return null;
    var p = KS.config.PORTRE;
    var taban = k.portre || koyluPortresi(k, metin);
    var adaylar = ifade ? [taban + '_' + ifade, taban] : [taban];
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
