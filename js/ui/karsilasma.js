// ui/karsilasma.js – Komşuyla karşılaşma: özür, argümanı nazik ya da kaba söyleme, gün 8'de geri alma. Kuralları logic.js uygular.
var KS = globalThis.KS = globalThis.KS || {};
KS.ui = KS.ui || {};

(function () {
  // tur: 'zorunlu' (gün 7) | 'obruk' (gün 8) | 'su' (öğle) | 'aksam'. Açılış sözü ona göre seçilir.
  KS.ui.karsilasmaOynat = function (tur, bitince) {
    var ui = KS.ui;
    var d = KS.state;
    var M = KS.IKNA_METIN;
    var bas = KS.karsilasmaBaslat(d);
    var gecilen = [];
    var buSeferIletilen = 0;

    function oyna(id, sonra) { ui.diyalogOynat(KS.olayGetir(id), null, sonra); }

    function acilis() {
      if (tur !== 'zorunlu') return [];
      return [d.komsu.karsilasma === 1 ? 'kars_ilk' : 'kars_sonraki'];
    }

    function bitir() {
      if (buSeferIletilen > 0 && !d.komsu.ikna) oyna('kars_bir_arguman', bitince);
      else bitince();
    }

    function kalanlar() {
      return KS.iletilebilirArgumanlar(d).filter(function (a) { return gecilen.indexOf(a) < 0; });
    }

    function nazik(a) {
      // Bir konuşmada bir argüman: söyledikten sonra konuşma biter.
      var r = KS.argumanIlet(d, a);
      if (!r.inanmadi) buSeferIletilen += 1;
      oyna('ikna_' + a + '_nazik', function () {
        ui.gostergeCiz();
        if (r.yeniIkna) oyna('kars_ikna', bitince);
        else bitir();
      });
    }

    // Kaba söz o konuyu kilitler ve konuşmayı bitirir; yalnızca obruk günü aynı konuşmada geri alınabilir.
    function kaba(a) {
      KS.kabaSecim(d, a);
      oyna('ikna_' + a + '_kaba', function () {
        ui.gostergeCiz();
        if (d.gun !== KS.config.OBRUK_GUNU) { bitir(); return; }
        ui.secimGoster(M.geriAlSoru, [
          { oge: M.geriAl, tikla: function () {
            KS.kabaligiGeriAl(d, a);
            oyna('kars_geri_al', adim);
          } },
          { oge: M.geriAlGec, tikla: bitir }
        ]);
      });
    }

    function adim() {
      var liste = kalanlar();
      if (!liste.length) { bitir(); return; }
      var a = liste[0];
      var uygun = KS.IKNA_SECENEK[a].filter(function (sc) { return !sc.kosul || sc.kosul(d); });
      var dugmeler = uygun.map(function (sc) {
        return { oge: sc, tikla: function () { if (sc.ton === 'nazik') nazik(a); else kaba(a); } };
      });
      dugmeler.push({ oge: M.gec, tikla: function () { gecilen.push(a); adim(); } });
      ui.secimGoster(M.soru, dugmeler);
    }

    function basla() {
      if (d.komsu.ikna) { oyna(tur === 'obruk' ? 'kars_ikna_sonrasi_obruk' : 'kars_ikna_sonrasi', bitince); return; }
      if (bas.ozurSecenegi) {
        ui.secimGoster(M.ozurSoru, [
          { oge: M.ozur, tikla: function () {
            KS.ozurDile(d);
            oyna('kars_ozur', adim);
          } },
          { oge: M.ozurGec, tikla: adim }
        ]);
        return;
      }
      if (!bas.iletilebilir.length) { oyna(tur === 'obruk' ? 'kars_bos_obruk' : 'kars_bos', bitince); return; }
      adim();
    }

    ui.olaylariOynat(acilis().map(KS.olayGetir), null, basla);
  };
})();
