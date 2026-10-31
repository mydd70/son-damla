// logic.js – Oyun kuralları. DOM'a, sese ve zamana dokunmaz; durumu yalnızca bu dosya değiştirir.
// Her eylem { ok, hata?, degisimler: [{ ad, fark }], ... } döndürür; arayüz bunu okuyup gösterir.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  var c = function () { return KS.config; };

  // ---------- Yardımcılar ----------

  function sinirlar(ad) {
    var k = c();
    if (ad === 'kuyu') return [0, k.KUYU.baslangic];
    if (ad === 'kiler') return [0, k.KILER.max];
    if (ad === 'keci') return [k.KECI.min, k.GOSTERGE.max];
    return [k.GOSTERGE.min, k.GOSTERGE.max];
  }

  // Göstergeyi sınırlar içinde değiştirir, gerçekleşen farkı kaydeder.
  function degistir(d, ad, fark, degisimler) {
    if (!fark) return 0;
    var s = sinirlar(ad);
    var eski = d.gosterge[ad];
    var yeni = Math.max(s[0], Math.min(s[1], eski + fark));
    d.gosterge[ad] = yeni;
    var gercek = yeni - eski;
    if (gercek !== 0 && degisimler) degisimler.push({ ad: ad, fark: gercek });
    return gercek;
  }

  function gunlukYaz(d, metin) {
    d.gunluk.push('G' + d.gun + ' ' + d.dilim + ': ' + metin);
    if (d.gunluk.length > 50) d.gunluk.shift();
  }

  function sonuc(ok, ek) {
    var r = { ok: ok, degisimler: [] };
    if (ek) for (var k in ek) r[k] = ek[k];
    return r;
  }

  function hata(mesaj) {
    return { ok: false, hata: mesaj, degisimler: [] };
  }

  // Kuyu uyarı seviyesinin altına ilk inişte true döner (arayüz tek cümle gösterir).
  function kuyuUyariKontrol(d) {
    if (!d.bayraklar.kuyuUyari && d.gosterge.kuyu < c().KUYU.uyari) {
      d.bayraklar.kuyuUyari = true;
      return true;
    }
    return false;
  }

  KS.olayBul = function (gun, dilim) {
    var liste = c().SABIT_OLAYLAR;
    for (var i = 0; i < liste.length; i++) {
      if (liste[i].gun === gun && liste[i].dilim === dilim) return liste[i];
    }
    return null;
  };

  KS.durumEtiketi = function (ad, deger) {
    var tablo = c().DURUM_ETIKETLERI[ad];
    if (!tablo) return '';
    for (var i = 0; i < tablo.length; i++) if (deger <= tablo[i][0]) return tablo[i][1];
    return tablo[tablo.length - 1][1];
  };

  KS.bahceIhtiyaci = function (d) {
    var k = c();
    if (d.bayraklar.dayanikliTohum && d.gun >= k.TOHUM.etkiGunu) return k.TOHUM.bahceIhtiyaci;
    return k.IHTIYAC.bahce;
  };

  KS.ihtiyaclar = function (d) {
    var k = c();
    return { ev: k.IHTIYAC.ev, keci: k.IHTIYAC.keci, bahce: KS.bahceIhtiyaci(d) };
  };

  // Sabit olayın mekanik etkisini uygular (metni story.js gösterir).
  function olayEtkisiUygula(d, olay, degisimler) {
    var e = olay.etkiler || {};
    if (e.bayrak) for (var b in e.bayrak) d.bayraklar[b] = e.bayrak[b];
    ['ev', 'keci', 'bahce', 'kiler', 'kuyu'].forEach(function (ad) {
      if (e[ad]) degistir(d, ad, e[ad], degisimler);
    });
    if (olay.plan) KS.planKur(d);
    gunlukYaz(d, 'olay ' + olay.id);
  }

  // Evde kullanılan suyun bahçeye dönen kısmı (dağıtım paneli de bunu gösterir).
  KS.griSuMiktari = function (d, ev) {
    return d.bayraklar.griSu ? Math.floor(ev / c().GRI_SU.bolen) : 0;
  };

  // ---------- Oyun başı ve dilim ----------

  KS.keciAdiVer = function (d, ad) {
    d.keciAdi = (ad || '').trim() || c().KECI.varsayilanAd;
    gunlukYaz(d, 'keçi adı ' + d.keciAdi);
    return sonuc(true);
  };

  // "Tekrar oyna" ile başlayan oyunda mini oyunlarda "Hızlı geç" açılır.
  KS.tekrarOyunIsaretle = function (d) {
    d.tekrarOyun = true;
    return sonuc(true);
  };

  KS.dilimGec = function (d, dilim) {
    if (c().DILIMLER.indexOf(dilim) < 0) return hata('Bilinmeyen dilim: ' + dilim);
    d.dilim = dilim;
    return sonuc(true);
  };

  // Akşam duyurulan yarınki pay (komşuya götürülen su düşülmüş).
  KS.ertesiGunPayi = function (d) {
    var k = c();
    if (d.gun >= k.GUN_SAYISI) return 0;
    return Math.max(0, k.SU_PAYI[d.gun] - d.su.ertesiGunKesinti);
  };

  // Diyalogdaki seçeneğin etkisi (story.js: etkiler, bayraklar).
  KS.secimUygula = function (d, secenek) {
    var r = sonuc(true);
    var e = secenek.etkiler || {};
    ['ev', 'keci', 'bahce', 'kiler', 'kuyu'].forEach(function (ad) {
      if (e[ad]) degistir(d, ad, e[ad], r.degisimler);
    });
    if (e.arguman) KS.argumanOgren(d, e.arguman);
    if (secenek.bayraklar) for (var b in secenek.bayraklar) d.bayraklar[b] = secenek.bayraklar[b];
    return r;
  };

  // ---------- Gün akışı ----------

  // Yeni günü başlatır: su payı, motor, sabah olayı, zorunlu ev işi, ağlama.
  KS.gunBaslat = function (d) {
    var k = c();
    if (d.gun >= k.GUN_SAYISI) return hata('Oyun bitti.');
    d.gun += 1;
    d.dilim = 'sabah';
    d.su.pay = Math.max(0, k.SU_PAYI[d.gun - 1] - d.su.ertesiGunKesinti);
    d.su.ertesiGunKesinti = 0;
    d.su.fazlaCekildi = false;
    d.su.dagitildi = false;
    d.bayraklar.miniOyunYapildi = false;
    d.bayraklar.ogleKullanildi = false;
    d.bayraklar.aksamKullanildi = false;

    // İkna edilen komşu motorunu son gün sabahı durdurur.
    if (d.gun === k.GUN_SAYISI && d.komsu.ikna) d.bayraklar.motorKapali = true;

    var ilkSut = !d.bayraklar.ilkSut && d.gosterge.keci >= k.KECI.sutEsigi;
    if (ilkSut) d.bayraklar.ilkSut = true;

    var r = sonuc(true, {
      ilkSut: ilkSut,
      zorunluEvIsi: d.bayraklar.zorunluEvIsi,
      aglama: d.gun <= k.EV.aglamaHerSabahSonGun || d.gosterge.ev < k.EV.aglamaEsigi,
      olay: KS.olayBul(d.gun, 'sabah')
    });
    if (r.olay) olayEtkisiUygula(d, r.olay, r.degisimler);
    gunlukYaz(d, 'gün başladı, pay ' + d.su.pay);
    return r;
  };

  // Sabah dağıtımı. dagitim = { ev, keci, bahce } damla.
  KS.dagitimUygula = function (d, dagitim, fazlaCek) {
    var k = c();
    if (d.su.dagitildi) return hata('Bugünün suyu zaten dağıtıldı.');
    var ev = dagitim.ev | 0, keci = dagitim.keci | 0, bahce = dagitim.bahce | 0;
    if (ev < k.EV.enAzSu || keci < 0 || bahce < 0) return hata('Geçersiz dağıtım: eve en az ' + k.EV.enAzSu + ' damla.');
    var toplamPay = d.su.pay + (fazlaCek ? k.FAZLA_CEKME.damla : 0);
    if (ev + keci + bahce > toplamPay) return hata('Bu kadar su yok.');

    var r = sonuc(true, { griSu: 0, kuyuUyari: false });
    if (fazlaCek) {
      d.su.fazlaCekildi = true;
      d.su.toplamFazlaCekme += 1;
      degistir(d, 'kuyu', -k.FAZLA_CEKME.kuyuKaybi, r.degisimler);
    }

    // Gri su: evde kullanılan suyun bir kısmı bahçeye döner.
    var gri = KS.griSuMiktari(d, ev);
    r.griSu = gri;
    var bahceSu = bahce + gri;
    var ihtiyac = KS.ihtiyaclar(d);

    // Her gösterge için: yeterli su → iyi, biraz eksik → orta, çok eksik → kötü (config.SU_ETKISI)
    var etki = k.SU_ETKISI;
    degistir(d, 'keci', keci >= k.KECI.iyiSu ? etki.iyi : (keci >= k.KECI.ortaSu ? etki.orta : etki.kotu), r.degisimler);
    degistir(d, 'bahce', bahceSu >= ihtiyac.bahce ? etki.iyi : (bahceSu >= ihtiyac.bahce - 1 ? etki.orta : etki.kotu), r.degisimler);
    degistir(d, 'ev', ev >= k.EV.iyiSu ? etki.iyi : (ev >= k.EV.ortaSu ? etki.orta : etki.kotu), r.degisimler);

    d.su.dagitildi = true;
    r.kuyuUyari = kuyuUyariKontrol(d);
    gunlukYaz(d, 'dağıtım ev ' + ev + ' keçi ' + keci + ' bahçe ' + bahce + ' (+' + gri + ' gri)' + (fazlaCek ? ' FAZLA' : ''));
    return r;
  };

  // Mini oyun her zaman tamamlanır (başarısız olan tekrar dener).
  // Zorunlu ev işi varsa mini oyunun yerine geçer.
  KS.miniOyunTamamla = function (d) {
    var k = c();
    if (d.bayraklar.miniOyunYapildi) return hata('Bugünün sabah işi yapıldı.');
    var r = sonuc(true, { tur: null });
    if (d.bayraklar.zorunluEvIsi) {
      r.tur = 'evIsi';
      degistir(d, 'ev', k.EV.zorunluBonus, r.degisimler);
      d.bayraklar.zorunluEvIsi = false;
    } else if (d.gun % 2 === 1) {
      r.tur = 'keciBakimi';
      degistir(d, 'keci', k.KECI.bakim, r.degisimler);
    } else {
      r.tur = 'otYolma';
      degistir(d, 'bahce', k.BAHCE.otYolma, r.degisimler);
    }
    d.bayraklar.miniOyunYapildi = true;
    gunlukYaz(d, 'sabah işi ' + r.tur);
    return r;
  };

  KS.miniOyunTuru = function (d) {
    if (d.bayraklar.zorunluEvIsi) return 'evIsi';
    return d.gun % 2 === 1 ? 'keciBakimi' : 'otYolma';
  };

  // ---------- Öğle ----------

  // Serbest öğlede seçilebilecek eylemler. Öğle olayı varsa liste boştur.
  KS.ogleSecenekleri = function (d) {
    var k = c();
    if (KS.olayBul(d.gun, 'ogle')) return [];
    return [
      { id: 'komsuyaSu', acik: d.komsu.suGoturme < k.KOMSUYA_SU.sinir },   // gün 9'da da açık: son şans, bedelsiz
      { id: 'bahceEkIs', acik: true },
      { id: 'evdeYardim', acik: true },
      { id: 'babayiAra', acik: !d.bayraklar.babaArandi && d.gun >= k.BABAYI_ARA_ILK_GUN },
      { id: 'camur', acik: !d.bayraklar.camur && d.gun >= k.CAMUR_ILK_GUN }
    ];
  };

  KS.ogleEylemi = function (d, id) {
    var k = c();
    if (d.bayraklar.ogleKullanildi) return hata('Öğle zaten geçti.');
    var secenek = KS.ogleSecenekleri(d).filter(function (s) { return s.id === id; })[0];
    if (!secenek || !secenek.acik) return hata('Bu eylem şu an yapılamaz: ' + id);
    var r = sonuc(true, { karsilasma: false });
    if (id === 'komsuyaSu') {
      d.komsu.suGoturme += 1;
      d.su.ertesiGunKesinti += k.KOMSUYA_SU.maliyet;
      r.karsilasma = true;
    } else if (id === 'bahceEkIs') {
      degistir(d, 'bahce', k.BAHCE.ekIs, r.degisimler);
    } else if (id === 'evdeYardim') {
      degistir(d, 'ev', k.EV.evdeYardim, r.degisimler);
    } else if (id === 'babayiAra') {
      d.bayraklar.babaArandi = true;
      degistir(d, 'ev', k.EV.babayiAra, r.degisimler);
    } else if (id === 'camur') {
      d.bayraklar.camur = true;
      degistir(d, 'ev', k.EV.camur, r.degisimler);
    }
    d.bayraklar.ogleKullanildi = true;
    gunlukYaz(d, 'öğle ' + id);
    return r;
  };

  // Öğle olayı (yaşlı çift, plan, obruk...). Mekanik etkiyi uygular.
  KS.ogleOlayi = function (d) {
    var olay = KS.olayBul(d.gun, 'ogle');
    if (!olay) return hata('Bugün öğle olayı yok.');
    if (d.bayraklar.ogleKullanildi) return hata('Öğle zaten geçti.');
    var r = sonuc(true, { olay: olay, karsilasma: !!olay.karsilasma });
    olayEtkisiUygula(d, olay, r.degisimler);
    d.bayraklar.ogleKullanildi = true;
    return r;
  };

  KS.planKur = function (d) {
    d.plan = d.bayraklar.olcumTeslim ? 'guclu' : 'zayif';
    return d.plan;
  };

  // ---------- Akşam ----------

  // Görev ziyareti hak tüketmez: ölçümü muhtara götürmek.
  KS.gorevZiyaretiMi = function (d, kim) {
    var k = c();
    return kim === 'muhtar' && d.bayraklar.olcumElde && !d.bayraklar.olcumTeslim &&
      d.gun >= k.OLCUM.teslimIlkGun && d.gun <= k.OLCUM.teslimSonGun;
  };

  // Kişiden öğrenilecek bir şey henüz açılmadıysa ziyaret hakkı işlemez: kısa sohbet, kişi başına 1 kez.
  function bilgisiAcikMi(d, kim) {
    if (kim === 'yasliCift') return d.bayraklar.dayanikliTohum;
    if (kim === 'ogretmen') return d.bayraklar.olcumElde;
    if (kim === 'muhtar') return d.gun >= c().MUHTAR_ARGUMAN_ILK_GUN;
    return d.komsu.ogrenilen.length > 0;
  }

  KS.sohbetZiyaretiMi = function (d, kim) {
    return !bilgisiAcikMi(d, kim) && !d.sohbetEdildi[kim];
  };

  function ziyaretAcikMi(d, kim) {
    if (KS.gorevZiyaretiMi(d, kim) || KS.sohbetZiyaretiMi(d, kim)) return true;
    return bilgisiAcikMi(d, kim) && d.ziyaretKalan[kim] > 0;
  }

  KS.aksamSecenekleri = function (d) {
    if (KS.olayBul(d.gun, 'aksam')) return [];
    var liste = ['yasliCift', 'muhtar', 'ogretmen', 'komsu'].map(function (kim) {
      return { id: kim, acik: ziyaretAcikMi(d, kim), gorev: KS.gorevZiyaretiMi(d, kim) };
    });
    liste.push({ id: 'aileVakti', acik: true, gorev: false });
    return liste;
  };

  KS.aksamZiyaret = function (d, kim) {
    var k = c();
    if (d.bayraklar.aksamKullanildi) return hata('Akşam zaten geçti.');
    if (!ziyaretAcikMi(d, kim)) return hata('Bu eve ziyaret hakkı kalmadı: ' + kim);
    var gorev = KS.gorevZiyaretiMi(d, kim);
    var sohbet = !gorev && KS.sohbetZiyaretiMi(d, kim);
    var r = sonuc(true, { gorev: gorev, sohbet: sohbet, yardim: false, karsilasma: false });

    d.bayraklar.aksamKullanildi = true;
    if (sohbet) {
      d.sohbetEdildi[kim] = true;
      gunlukYaz(d, 'akşam sohbet ' + kim);
      return r;
    }
    if (gorev) {
      d.bayraklar.olcumTeslim = true;
    } else {
      d.ziyaretKalan[kim] -= 1;
    }
    if (kim === 'yasliCift' && d.gosterge.kiler === 0 && d.yasliCiftYardim < k.YASLI_CIFT.sinir) {
      d.yasliCiftYardim += 1;
      degistir(d, 'kiler', k.YASLI_CIFT.yardim, r.degisimler);
      r.yardim = d.yasliCiftYardim;   // 1 ya da 2 (2'de "bir daha getiremeyiz")
    }
    if (kim === 'komsu') r.karsilasma = true;
    gunlukYaz(d, 'akşam ziyaret ' + kim + (gorev ? ' (görev)' : ''));
    return r;
  };

  KS.aileVakti = function (d) {
    if (d.bayraklar.aksamKullanildi) return hata('Akşam zaten geçti.');
    var r = sonuc(true);
    degistir(d, 'ev', c().EV.aileVakti, r.degisimler);
    d.bayraklar.aksamKullanildi = true;
    gunlukYaz(d, 'aile vakti');
    return r;
  };

  // ---------- İkna ----------

  KS.argumanOgren = function (d, id) {
    if (c().ARGUMANLAR.indexOf(id) < 0) return hata('Bilinmeyen argüman: ' + id);
    if (d.komsu.ogrenilen.indexOf(id) < 0) d.komsu.ogrenilen.push(id);
    gunlukYaz(d, 'argüman öğrenildi ' + id);
    return sonuc(true);
  };

  KS.iletilebilirArgumanlar = function (d) {
    return d.komsu.ogrenilen.filter(function (a) {
      return d.komsu.iletilen.indexOf(a) < 0 && d.komsu.kilitli.indexOf(a) < 0;
    });
  };

  KS.karsilasmaBaslat = function (d) {
    d.komsu.karsilasma += 1;
    gunlukYaz(d, 'komşuyla karşılaşma #' + d.komsu.karsilasma);
    return sonuc(true, { ozurSecenegi: d.komsu.ozurBekliyor, iletilebilir: KS.iletilebilirArgumanlar(d) });
  };

  KS.argumanIlet = function (d, id) {
    if (KS.iletilebilirArgumanlar(d).indexOf(id) < 0) return hata('Bu argüman iletilemez: ' + id);
    d.komsu.iletilen.push(id);
    var ikna = d.komsu.iletilen.length >= c().IKNA.gerekenArguman;
    var yeniIkna = ikna && !d.komsu.ikna;
    d.komsu.ikna = ikna;
    gunlukYaz(d, 'argüman iletildi ' + id + (yeniIkna ? ' — İKNA' : ''));
    return sonuc(true, { ikna: d.komsu.ikna, yeniIkna: yeniIkna });
  };

  // Kaba seçim ilgili argümanı kilitler; özür sonraki karşılaşmada açar.
  KS.kabaSecim = function (d, id) {
    if (d.komsu.kilitli.indexOf(id) < 0) d.komsu.kilitli.push(id);
    d.komsu.ozurBekliyor = true;
    gunlukYaz(d, 'kaba seçim ' + id);
    return sonuc(true);
  };

  KS.ozurDile = function (d) {
    if (!d.komsu.ozurBekliyor) return hata('Özür gerektiren bir durum yok.');
    d.komsu.kilitli = [];
    d.komsu.ozurBekliyor = false;
    gunlukYaz(d, 'özür');
    return sonuc(true);
  };

  // Gün 8'de kaba seçim aynı konuşmada geri alınabilir.
  KS.kabaligiGeriAl = function (d, id) {
    d.komsu.kilitli = d.komsu.kilitli.filter(function (a) { return a !== id; });
    d.komsu.ozurBekliyor = d.komsu.kilitli.length > 0;
    gunlukYaz(d, 'kabalık geri alındı ' + id);
    return sonuc(true);
  };

  // ---------- Defter ----------

  // Defterde görünenler. Metinleri dil.js'te, durumu buradan.
  KS.defter = function (d) {
    var k = c();
    var gorevler = [];
    if (d.bayraklar.olcumElde) {
      var gecti = !d.bayraklar.olcumTeslim && d.gun > k.OLCUM.teslimSonGun;
      gorevler.push({ id: gecti ? 'olcumGec' : 'olcum', tamam: d.bayraklar.olcumTeslim });
    }
    if (d.plan || d.komsu.ogrenilen.length) {
      gorevler.push({ id: 'komsu', tamam: d.komsu.ikna, sayi: d.komsu.iletilen.length, gereken: k.IKNA.gerekenArguman });
    }
    var argumanlar = d.komsu.ogrenilen.map(function (a) {
      var durum = d.komsu.iletilen.indexOf(a) >= 0 ? 'iletildi' : (d.komsu.kilitli.indexOf(a) >= 0 ? 'kilitli' : 'hazir');
      return { id: a, durum: durum };
    });
    return { gorevler: gorevler, argumanlar: argumanlar };
  };

  // ---------- Gün sonu ve toplantı ----------

  // Kuyu düşüşü: doğal + motor − gönüllü tasarruf − plan.
  KS.kuyuGunlukDusus = function (d) {
    var k = c().KUYU;
    var dusus = k.dogalDusus;
    if (!d.bayraklar.motorKapali) dusus += k.motor;
    if (d.gun >= k.tasarrufGunleri[0] && d.gun <= k.tasarrufGunleri[1]) dusus -= k.tasarruf;
    if (d.plan) dusus -= k.plan[d.plan];
    return dusus;
  };

  function kuyuGunSonu(d, degisimler) {
    degistir(d, 'kuyu', -KS.kuyuGunlukDusus(d), degisimler);
  }

  // Akşamdan sonra: kiler üretim ve tüketim, kuyu, zorunlu ev işi işareti.
  KS.gunBitir = function (d) {
    var k = c();
    if (d.gun >= k.GUN_SAYISI) return hata('Son gün toplantıyla biter.');
    var r = sonuc(true, { kilerBos: false, kuyuUyari: false });
    if (d.gosterge.keci >= k.KECI.sutEsigi) degistir(d, 'kiler', k.KILER.sut, r.degisimler);
    if (d.gosterge.bahce >= k.BAHCE.sebzeEsigi) degistir(d, 'kiler', k.KILER.sebze, r.degisimler);
    if (d.gosterge.kiler >= k.KILER.tuketim) {
      degistir(d, 'kiler', -k.KILER.tuketim, r.degisimler);
    } else {
      r.kilerBos = true;
      degistir(d, 'ev', k.EV.kilerBos, r.degisimler);
    }
    kuyuGunSonu(d, r.degisimler);
    r.kuyuUyari = kuyuUyariKontrol(d);
    if (d.gosterge.ev < k.EV.zorunluEsik) d.bayraklar.zorunluEvIsi = true;
    gunlukYaz(d, 'gün bitti, kuyu ' + d.gosterge.kuyu);
    return r;
  };

  // Gün 9 akşamı: son kuyu düşüşü, sonra karar.
  KS.toplanti = function (d) {
    var k = c();
    if (d.gun !== k.GUN_SAYISI) return hata('Toplantı yalnızca son gün yapılır.');
    var r = sonuc(true);
    kuyuGunSonu(d, r.degisimler);
    var kuyuYeter = d.gosterge.kuyu >= k.KUYU.esik;
    var eksikler = [];
    if (!d.komsu.ikna) eksikler.push('komsu');
    if (!kuyuYeter) eksikler.push('kuyu');
    if (!kuyuYeter && d.plan === 'zayif') eksikler.push('olcum');
    d.sonuc = { iyi: d.komsu.ikna && kuyuYeter, eksikler: eksikler };
    r.sonuc = d.sonuc;
    gunlukYaz(d, 'toplantı: ' + (d.sonuc.iyi ? 'İYİ' : 'KÖTÜ') + ' ' + eksikler.join(','));
    return r;
  };

  // ---------- Hata ayıklama: ?gun=N ----------

  // N. günün başından başlamak için varsayılan durum: o güne kadarki olaylar yaşanmış,
  // ölçüm teslim edilmiş, göstergeler başlangıçta, kuyu doğal düşüşle inmiş sayılır.
  KS.gunIcinDurum = function (n) {
    var k = c();
    var d = KS.yeniDurum();
    d.keciAdi = k.KECI.varsayilanAd;
    n = Math.max(1, Math.min(k.GUN_SAYISI, n | 0));
    for (var g = 1; g < n; g++) {
      d.gun = g;
      if (g === 2) { d.bayraklar.griSu = true; d.bayraklar.dayanikliTohum = true; KS.argumanOgren(d, 'A1'); }
      if (g === 3) { d.bayraklar.olcumElde = true; d.bayraklar.olcumTeslim = true; KS.argumanOgren(d, 'A2'); }
      if (g === k.PLAN_GUNU) { KS.planKur(d); KS.argumanOgren(d, 'A3'); }
      kuyuGunSonu(d, null);
    }
    d.gun = n - 1;   // gunBaslat bir artıracak
    d.gunluk = ['?gun=' + n + ' ile başlatıldı'];
    return d;
  };
})();

if (typeof module !== 'undefined') module.exports = KS;
