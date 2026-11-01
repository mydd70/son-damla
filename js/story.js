// story.js – Olaylar ve diyaloglar (veri). Kaynak: taslak/DIYALOGLAR.md. Metin yalnızca burada ve dil.js'te durur.
var KS = globalThis.KS = globalThis.KS || {};

(function () {
  // ---------- Koşul yardımcıları ----------
  function olcumYok(d) { return !d.bayraklar.olcumTeslim; }
  function olcumVar(d) { return d.bayraklar.olcumTeslim; }
  function bilmiyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) < 0; }; }
  function biliyor(a) { return function (d) { return d.komsu.ogrenilen.indexOf(a) >= 0; }; }
  function evDusuk(d) { return d.gosterge.ev <= KS.config.EV.dusukUst; }
  function evYuksek(d) { return d.gosterge.ev >= KS.config.EV.yuksekAlt; }
  function evOrta(d) { return !evDusuk(d) && !evYuksek(d); }
  function ciftGun(d) { return d.gun % 2 === 0; }
  function tekGun(d) { return d.gun % 2 === 1; }
  function sonGun(d) { return d.gun === KS.config.GUN_SAYISI; }
  function sonGunDegil(d) { return !sonGun(d); }
  function gunu(n) { return function (d) { return d.gun === n; }; }
  function obrukOncesi(d) { return d.gun < KS.config.OBRUK_GUNU; }
  function obrukSonrasi(d) { return d.gun >= KS.config.OBRUK_GUNU; }
  function ikna(d) { return d.komsu.ikna; }
  function iknaDegil(d) { return !d.komsu.ikna; }
  function kecidusuk(d) { return d.gosterge.keci < KS.config.KECI.sutEsigi; }
  function keciIyi(d) { return d.gosterge.keci >= KS.config.KECI.sutEsigi; }
  function kilerBos(d) { return d.gosterge.kiler === 0; }
  function fazlaCekildi(d) { return d.su.fazlaCekildi; }
  function sofraBos(d, r) { return r.kilerBos; }   // bu gece yiyecek yoktu (KS.gunBitir sonucu)
  function guclu(d) { return d.plan === 'guclu'; }
  function zayif(d) { return d.plan === 'zayif'; }
  // Tekrarlanan eylemlerde sürümler gün sırasıyla döner.
  function surum(i) { return function (d) { return d.gun % 3 === i; }; }
  function ve() {
    var kosullar = [].slice.call(arguments);
    return function (d, r) { return kosullar.every(function (k) { return k(d, r); }); };
  }
  function sohbet(d, r) { return r.sohbet; }
  function sohbetDegil(d, r) { return !r.sohbet; }
  function gorevDegil(d, r) { return !r.gorev; }

  // Anne ipucunu KS.anneIpucuAl seçer; aynısı iki kez söylenmez.
  function ipucu(ad) { return function (d, r) { return r.ipucu === ad; }; }
  function babaKonustu(d) { return d.gun >= KS.config.BABA_ARAMA_GUNU; }
  function babaKonusmadi(d) { return !babaKonustu(d); }
  // Ek ziyaretlerin metni tekrar etmesin: ziyaret hakkı düştükten sonra kalan sayıya göre.
  function kalanHak(kim, n) { return function (d) { return d.ziyaretKalan[kim] === n; }; }
  // Rıza'ya daha önce bir şey anlatıldı mı, su götürüldü mü; annenin gece inişi ya da fazla çekme oldu mu.
  function iletti(a) { return function (d) { return d.komsu.iletilen.indexOf(a) >= 0; }; }
  function konustu(d) { return d.komsu.iletilen.length > 0; }
  function konusmadi(d) { return !konustu(d); }
  function suGoturdu(d) { return d.komsu.suGoturme > 0; }
  function anneIndi(d) { return d.bayraklar.kilerKuyuGoruldu; }
  function bizFazlaCektik(d) { return !anneIndi(d) && d.su.toplamFazlaCekme > 0; }
  function planVar(d) { return !!d.plan; }
  function olcumSuresiVar(d) { return d.gun <= KS.config.OLCUM.teslimSonGun; }

  // Ağlama sesi ve yazısı aynı karardan gelsin (KS.gunBaslat sonucu).
  function agliyor(d, r) { return r.aglama; }
  function aglamiyor(d, r) { return !r.aglama; }

  // Argüman anlatımları hem gün olayında hem akşam ziyaretinde kullanılır.
  var A1_SATIRLAR = [
    { kim: 'dede', metin: 'Vardı ya tabii. Muhtarlığın önünden akardı. Kıyısında koca bir söğüt vardı.', en: 'There was indeed. It ran past the headman\'s office. With a huge willow on its bank.' },
    { kim: 'nine', metin: 'Çocuklar yazın hep oradaydı. Rıza\'yla muhtar en önde. Söğüdün dalından suya atlarlardı.', en: 'The children spent all summer there. Rıza and the headman at the front. They\'d jump into the water from the willow\'s branch.' },
    { kim: 'mehmet', metin: 'Rıza Amca mı? Suya mı atlardı?', en: 'Uncle Rıza? Jumping into water?' },
    { kim: 'dede', metin: '(güler) O da çocuktu bir zaman. Motorlar çoğaldı, dere çekildi, söğüt de kurudu. O ağacı çok severdi.', en: '(laughs) He was a child once too. The motors multiplied, the stream drew back, and the willow dried up. He loved that tree.' },
    { kim: 'ic', metin: 'Rıza Amca\'yı hiç gülerken görmedim. Suya atlarken nasıl gülüyordu acaba? Umarım büyüyünce ben de öyle olmam.', en: 'I\'ve never seen Uncle Rıza laugh. I wonder how he laughed when he jumped. I hope I don\'t end up like him when I grow up.' },
    { kim: 'ekran', metin: 'Deftere yazıldı: Rıza Amca\'nın söğüdü', en: 'Written in the notebook: Uncle Rıza\'s willow' }
  ];
  // Son jest mekâna göre verilir: ip yalnızca kuyu başındaki ölçümde var.
  function a2Satirlari(sonJest, sonJestEn) {
    return [
      { kim: 'ogretmen', metin: 'Yer altı suyu çekildikçe toprağın altında boşluklar kalıyor. Kontrolsüz su kuyuları yer altı su seviyesini düşürerek obrukları tetikliyor. Bir gün tavan çöküyor.', en: 'As groundwater is drawn, hollows are left under the soil. Uncontrolled wells lower the water table and trigger sinkholes. One day the roof caves in.' },
      { kim: 'ogretmen', kosul: obrukOncesi, metin: 'Ovada yüzlerce obruk var artık. Motorların kontrolsüz ve en çok çalıştığı tarlalarda da...', en: 'There are hundreds of sinkholes on the plain now. In the fields where the motors run most, and unchecked...' },
      { kim: 'mehmet', kosul: obrukOncesi, metin: 'Rıza Amca\'nın tarlası gibi mi?', en: 'Like Uncle Rıza\'s field?' },
      { kim: 'ogretmen', kosul: obrukOncesi, metin: sonJest + ' Tek motorun işi değil, Mehmet. Hepimiz çekiyoruz. Sıra kimin tarlasına gelir, kimse bilmez.', en: sonJestEn + ' It\'s not one motor\'s doing, Mehmet. We all draw. Nobody knows whose field is next.' },
      { kim: 'ogretmen', kosul: obrukSonrasi, metin: 'Ovada yüzlerce obruk var artık. Bugün biri de bizim köyde açıldı.', en: 'There are hundreds of sinkholes on the plain now. Today one opened in our village.' },
      { kim: 'mehmet', kosul: obrukSonrasi, metin: 'Rıza Amca\'nın motoru mu açtı?', en: 'Did Uncle Rıza\'s motor open it?' },
      { kim: 'ogretmen', kosul: obrukSonrasi, metin: sonJest + ' Tek motorun işi değil, Mehmet. Hepimiz çektik. Sıra onun tarlasına geldi. İnsanlar bazı şeyleri kendilerine olana kadar fark etmiyor.', en: sonJestEn + ' It\'s not one motor\'s doing, Mehmet. We all drew. His field\'s turn came. People don\'t notice some things until they happen to them.' },
      { kim: 'ekran', metin: 'Deftere yazıldı: Obruk uyarısı', en: 'Written in the notebook: Sinkhole warning' }
    ];
  }
  var A3_SATIRLAR = [
    { kim: 'muhtar', metin: '(uzun süre susar) Biz Rıza\'yla askere beraber gittik. Döndüğümüzde köyün yukarısındaki sarnıcın oluğunu beraber çaktık.', en: '(silent for a long time) Rıza and I went off to the army together. When we came back, we laid the gutter of the cistern above the village, the two of us.' },
    { kim: 'muhtar', metin: 'Şimdiki kadar kötü olmasa da kuraklık yılıydı. Gece gündüz taş taşıdık. Yağmur yağınca sarnıcın başında sevinçten ağladı Rıza.', en: 'It wasn\'t as bad as now, but it was a drought year. We hauled stone day and night. When the rain came, Rıza wept for joy at the cistern.' },
    { kim: 'muhtar', metin: 'Hatta baban da senin yaşlarındaydı. Yukarıya bidonla su taşırdı bize.', en: 'Your father was about your age, in fact. He carried water up to us in jerrycans.' },
    { kim: 'muhtar', metin: 'Sonra motorlar geldi, laflar karıştı. Sonra... olan oldu. Neyse.', en: 'Then the motors came, and the words got tangled. Then... what happened, happened. Anyway.' },
    { kim: 'ekran', metin: 'Deftere yazıldı: Muhtarla Rıza Amca\'nın sarnıcı', en: 'Written in the notebook: The headman and Uncle Rıza\'s cistern' }
  ];

  // Geçici metin: kullanıcı sonra düzenleyecek.
  KS.GIRIS_METNI = [
    { metin: 'İç Anadolu\'da Konya Ovası\'nda küçük bir köy. Son altmış beş yılın en kurak günleri.', en: 'A small village on the Konya Plain in Central Anatolia. The driest days in sixty-five years.' },
    { metin: 'Sen Mehmet\'sin, on iki yaşındasın. Baban köydeki kuraklık yüzünden tarla işlerini yapamıyor, şehirde iş arıyor. Evde annen, bebek kardeşin ve hasta keçiniz var.', en: 'You are Mehmet, twelve years old. The drought stopped your father working the fields, so he is looking for work in the city. At home are your mother, your baby sibling and your sick goat.' },
    { metin: 'Önünde dokuz gün var. Her sabah evin suyunu sen bölüştüreceksin. Öğlen ve akşam ne yapacağına, kime gideceğine de sen karar vereceksin.', en: 'You have nine days ahead. Each morning you\'ll share out the home\'s water. At noon and in the evening you\'ll also decide what to do and who to see.' },
    { metin: 'Yetişkinlerin inatçılıklarını ve alışkanlıklarını değiştirmek zor ama bazen bir çocuğun umudu bize kim olduğumuzu ve neyi unuttuğumuzu hatırlatabilir.', en: 'It\'s hard to change grown-ups\' stubbornness and habits, but sometimes a child\'s hope can remind us who we are and what we\'ve forgotten.' },
    { metin: 'Kuyu hepinizin ama zor şartlar, zor kararlar gerektiriyor. Bakalım köy ayakta kalabilecek mi?', en: 'The well belongs to all of you, but hard times call for hard decisions. Let\'s see if the village can stay on its feet.' }
  ];

  KS.SON_KARTLARI = {
    iyi: { metin: 'Ekim - İlk Yağmur', en: 'October - The First Rain' },
    kotu: { metin: 'Ekim - Kolay Kararlar Zor Sonuçlar', en: 'October - Easy Choices, Hard Consequences' },
    kotuYagmur: { metin: 'İlk yağmur.', en: 'The first rain.' }
  };

  KS.GUN_KARTLARI = [
    { metin: 'Ağustos 2029 - Konya Ovası.', en: 'August 2029 - The Konya Plain.' },
    { metin: 'Gün 2 – Sıcak, rüzgârsız.', en: 'Day 2 – Hot, no wind.' },
    { metin: 'Gün 3 – Kuyu başında erken bir sıra.', en: 'Day 3 – An early line at the well.' },
    { metin: 'Gün 4 – Bahçe boynunu büktü.', en: 'Day 4 – The garden hangs its head.' },
    { metin: 'Gün 5 – Tepeye çıkan yol tozlu.', en: 'Day 5 – The road up the hill is dusty.' },
    { metin: 'Gün 6 – Muhtarlıkta toplantı var.', en: 'Day 6 – A meeting at the headman\'s office.' },
    { metin: 'Gün 7 – Köy sessiz.', en: 'Day 7 – The village is quiet.' },
    { metin: 'Gün 8 – Sıcak dalgası.', en: 'Day 8 – Heat wave.' },
    { metin: 'Gün 9 – Cuma. Köy toplantısı.', en: 'Day 9 – Friday. Village meeting.' }
  ];

  // Günün planı: mekân kimliği, 'serbest' ya da 'belirsiz' (gün 8 öğlesi önceden söylenmez).
  KS.GUN_PLANLARI = [
    { sabah: 'avlu', ogle: 'kuyu_basi', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'yasli_cift_evi', aksam: 'serbest' },
    { sabah: 'kuyu_basi', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'tepe', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'muhtarlik', aksam: 'serbest' },
    { sabah: 'kuyu_basi', ogle: 'serbest', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'belirsiz', aksam: 'serbest' },
    { sabah: 'avlu', ogle: 'serbest', aksam: 'muhtarlik' }
  ];

  KS.OLAYLAR = [
    // ---------- Gün olayları ----------
    { id: 'g1_acilis', gun: 1, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Kardeşim yine erkenden uyandı. Yani herkes uyandı.', en: 'The baby\'s up early again. Which means everyone\'s up.' },
      { kim: 'ic', metin: '{keci} ağılda yatıyor. Bu günlerde iyice zayıfladı. Umarım yakında bir çözüm bulabiliriz.', en: '{keci} is lying in the pen. She\'s grown so weak these days. I hope we find a way soon.' },
      { kim: 'mehmet', metin: 'Günaydın, anne. Ağıla baktın mı?', en: 'Morning, Mum. Have you looked in the pen?' },
      { kim: 'anne', metin: 'Baktım, çöküp kalmış hayvancağız. Dün geceden beri böyle. Susuzluktan halsiz.', en: 'I have. Collapsed there, poor thing. Like this since last night. Weak with thirst.' },
      { kim: 'mehmet', metin: 'Veteriner çağıralım, anne, böyle giderse {keci} dayanamayacak.', en: 'Let\'s call a vet, Mum, or {keci} won\'t make it.' },
      { kim: 'anne', metin: 'Veterinere verecek kadar paramız yok, oğlum. Babanın gönderdiği son parayı da erzağa verdik. {keci} için su lazım, biraz da ilgi. Gerçi herkese su lazım...', en: 'We don\'t have money for a vet, son. The last of what your father sent went on food. {keci} needs water, and a little care. Then again, everyone needs water...' },
      { kim: 'mehmet', metin: 'Babam aradı mı?', en: 'Has Dad called?' },
      { kim: 'anne', metin: 'Aramadı. Birkaç güne araması lazım. Bu kadar uzun habersiz kalmazdık. Faturaya para yetişmedi belki de. Neyse.', en: 'No. He should call in a few days. We\'ve never gone this long without news. Maybe there wasn\'t money for the bill. Anyway.' },
      { kim: 'anne', metin: 'Muhtar kendince her eve günlük pay yazdı. Bugün on bir bidon. Günden güne azalacakmış. Sanki öncesinde çok vardı da!', en: 'The headman has set a daily share for every house, in his own way. Eleven jerrycans today. Less each day, they say. As if there were plenty before!' },
      { kim: 'mehmet', metin: 'On bir bidon yeter mi?', en: 'Will eleven be enough?' },
      { kim: 'anne', metin: '(bir süre susar) Yetmez. Yine de bölüştüreceğiz, oğlum, olduğu kadar.', en: '(silent for a moment) No. We\'ll share it out anyway, son, as far as it goes.' }
    ], secenekler: [
      { metin: 'Keçiye ben bakarım, anne.', en: 'I\'ll look after the goat, Mum.', sonraki: 'g1_a' },
      { metin: 'Yetmezse ne yapacağız?', en: 'What do we do if it isn\'t enough?', sonraki: 'g1_b' }
    ] },
    { id: 'g1_a', satirlar: [{ kim: 'anne', metin: 'Bak bakalım. Sen olmasan ne yapardım?', en: 'Go on, then. What would I do without you?' }] },
    { id: 'g1_b', satirlar: [{ kim: 'anne', metin: 'Yettireceğiz, oğlum. Başka çaremiz yok.', en: 'We\'ll make it enough, son. There\'s no other way.' }] },
    { id: 'g1_tanima', gun: 1, dilim: 'ogle', mekan: 'kuyu_basi', giris: { metin: 'Annen seni bidonlarla kuyu başına yolladı.', en: 'Your mother sent you to the well with the jerrycans.' }, satirlar: [
      { kim: 'ic', metin: 'Kuyu başı yine kalabalık. Bidonlar sıra sıra.', en: 'The well is crowded again. Jerrycans in rows.' },
      { kim: 'mehmet', metin: 'Kolay gelsin.', en: 'Hello, everyone.' },
      { kim: 'koylu', metin: 'Sağ ol, evlat. Geç sıraya.', en: 'Thanks, lad. Get in line.' },
      { kim: 'koylu', ses: 'kova', metin: 'Eskiden kovayı salardın, suyu duyardın. Şimdi ip uzadıkça uzuyor.', en: 'You used to drop the bucket and hear the water. Now the rope just gets longer.' },
      { kim: 'koylu', metin: 'Biz burada bidon sayıyoruz, Rıza\'nın motoru bütün gece çalıştı.', en: 'Here we are counting jerrycans, and Rıza\'s motor ran all night.' },
      { kim: 'koylu', metin: 'Sus sus. Rıza duyar.', en: 'Hush, hush. Rıza will hear.' },
      { kim: 'ic', metin: 'Rıza Amca bizim komşu. Motorunun sesi evimize kadar gelir. Kimse yüzüne bir şey demez, arkasından çok konuşur.', en: 'Uncle Rıza is our neighbor. You can hear his motor from our house. Nobody says a word to his face, and everyone talks behind his back.' },
      { kim: 'ic', metin: 'Bize yakın olmasına rağmen pek görüşmeyiz, arada bir selam sabah o kadar... Zaten pek de görüşmek ister gibi hali yok.', en: 'He lives close by, but we hardly see each other, a hello now and then and that\'s all... Not that he looks keen to see anyone.' },
      { kim: 'ic', metin: 'Kuyuda ne kadar su kaldığını kimse bilmiyor. Endişelenenler de var, vurdumduymaz olanlar da.', en: 'Nobody knows how much water is left in the well. Some people are worried, others couldn\'t care less.' },
      { kim: 'ipucu', metin: 'Ekranın sağ kenarındaki mavi gösterge köy kuyusunun seviyesi. Her gün biraz iner. Oyunun sonuna etki eden önemli bir faktör. Fazla düşmesine izin verme.', en: 'The blue gauge at the right edge of the screen is the village well\'s level. It drops a little every day. It matters a lot for how the game ends. Don\'t let it fall too far.' }
    ] },
    { id: 'g2_grisu', gun: 2, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Dur, leğendeki suyu dökme. Bulaşık suyunu da.', en: 'Wait, don\'t pour out the basin. Or the dishwater.' },
      { kim: 'mehmet', metin: 'Ama kirli o.', en: 'But it\'s dirty.' },
      { kim: 'anne', metin: 'Domatesler kirli mirli bakmaz. Deterjan sabun olmasın yeter. Ninen de böyle yapardı. Dök bahçeye.', en: 'Tomatoes don\'t care about dirt. As long as there\'s no detergent or soap in it. Your grandmother did the same. Pour it on the garden.' },
      { kim: 'ipucu', baslik: { metin: 'Gri su', en: 'Greywater' }, metin: 'Evde kullanılan su artık boşa gitmiyor. Eve verdiğin her {griBolen} damladan 1\'i bahçeye döner. Dağıtım panelindeki "Gri su" satırında görürsün. Eve az verirsen bahçeye dönen de azalır. Gri su ertesi güne kalmaz.', en: 'Water used at home no longer goes to waste. For every {griBolen} drops you give the home, 1 returns to the garden. You\'ll see it in the "Greywater" row of the panel. Give the home less, and less comes back. Greywater doesn\'t carry over to the next day.' }
    ] },
    { id: 'g2_yaslicift', gun: 2, dilim: 'ogle', mekan: 'yasli_cift_evi', giris: { metin: 'Fatma Teyze seni çağırtmış.', en: 'Aunt Fatma has sent for you.' }, satirlar: [
      { kim: 'mehmet', metin: 'Hayırlı günler, Fatma Teyze, Hasan Amca.', en: 'Good day, Aunt Fatma, Uncle Hasan.' },
      { kim: 'nine', metin: 'Gel bakalım, Mehmet. Gölgeye otur. Gölge dediysem, asmada yaprak kalmadı ya.', en: 'Come here, Mehmet. Sit in the shade. Not that there\'s any shade, the vine has no leaves left.' },
      { kim: 'dede', metin: 'Bu asmayı babam dikti. İki yazdır yaprak bile zor tutuyor.', en: 'My father planted this vine. For two summers it has barely held a leaf.' },
      { kim: 'mehmet', metin: 'Hasan Amca, eskiden de böyle kurak olur muydu?', en: 'Uncle Hasan, was it ever this dry before?' },
      { kim: 'dede', metin: 'Kurak yıl çok gördük. Ama yer altı dolardı, dere de akardı. Kuyuya on metre ip yeterdi.', en: 'We saw plenty of dry years. But the ground filled up again, and the stream ran. Ten meters of rope reached the water.' },
      { kim: 'nine', metin: 'Seni bunun için çağırmadım, dinleme onu. Al şu tohumları. Bizim köyün eski tohumu bunlar, az suyla yetinir. Bahçenizin boş kalan yerine ek.', en: 'That\'s not why I called you, don\'t listen to him. Take these seeds. They\'re our village\'s old seeds, they get by on little water. Plant them in the empty part of your garden.' },
      { kim: 'ipucu', baslik: { metin: 'Dayanıklı tohum', en: 'Hardy seeds' }, metin: 'Yarından itibaren bahçe daha az su ister.', en: 'From tomorrow the garden needs less water.' },
      { kim: 'dede', metin: 'Haa, bir de köyün yukarısında eski bir sarnıç var. Yağmur suyunu orada toplardık. Motorlar gelince kimse bakmadı, yıkıldı gitti.', en: 'Oh, and there\'s an old cistern above the village. We used to collect rainwater there. When the motors came nobody looked after it, and it fell apart.' }
    ], secenekler: [
      { metin: 'Burada bir de dere mi vardı, Hasan Amca?', en: 'There was a stream here too, Uncle Hasan?', etkiler: { arguman: 'A1' }, sonraki: 'g2_a1' },
      { metin: 'Teşekkürler. Ben artık gideyim, geç oldu. Annem bekler.', en: 'Thank you. I\'d better go, it\'s late. Mum\'s waiting.' }
    ] },
    { id: 'g2_a1', satirlar: A1_SATIRLAR },
    { id: 'g2_tohum', gun: 2, dilim: 'aksam', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Fatma Teyze\'nin tohumları cebimde. Yarın sabah erken ekerim.', en: 'Aunt Fatma\'s seeds are in my pocket. I\'ll plant them early tomorrow.' }
    ] },
    { id: 'g3_olcum', gun: 3, dilim: 'sabah', mekan: 'kuyu_basi', giris: { metin: 'Su almaya indin. Öğretmen elinde iple kuyunun başında duruyor.', en: 'You went down for water. The teacher is standing at the well with a rope in her hand.' }, satirlar: [
      { kim: 'mehmet', metin: 'Günaydın, öğretmenim.', en: 'Good morning, Miss.' },
      { kim: 'ogretmen', ses: 'ip', metin: 'Günaydın, Mehmet. İyi ki geldin. Tut şu ipin ucunu. Sıkı tut ve bırakma.', en: 'Good morning, Mehmet. Glad you came. Hold the end of this rope. Hold tight and don\'t let go.' },
      { kim: 'mehmet', metin: 'Ne yapıyorsunuz, öğretmenim?', en: 'What are you doing, Miss?' },
      { kim: 'ogretmen', metin: 'Suya kaç metrede ulaşıyoruz, ona bakıyorum. Geçen ay da ölçmüştüm.', en: 'Checking how many meters down the water is. I measured last month too.' },
      { kim: 'ogretmen', metin: '(ipi işaretler) Bir ayda neredeyse yarım metre inmiş.', en: '(marks the rope) Nearly half a meter lower in one month.' },
      { kim: 'mehmet', metin: 'Bu çok mu?', en: 'Is that a lot?' },
      { kim: 'ogretmen', metin: 'Çok. Eskiden bir yılda bu kadar inerdi. Yağmur yok ki yerine gelsin. Bu gidişle sonbahara kuyuda su kalmaz.', en: 'It is. It used to take a whole year to drop that much. There\'s no rain to replace it. At this rate there\'ll be no water in the well by autumn.' },
      { kim: 'mehmet', metin: 'Rıza Amca\'nın kuyusu da bu suyu mu çekiyor?', en: 'Does Uncle Rıza\'s well draw this water too?' },
      { kim: 'ogretmen', metin: 'Hepimizin kuyusu aynı kaynağa iniyor, onun ama çektiği kısım biraz daha farklı yapıda. Biri çekince hepimizin suyu azalıyor.', en: 'All our wells reach down to the same source, though the part he draws from is a little different. When one draws, everyone has less water.' },
      { kim: 'ogretmen', metin: 'Bunu muhtar görmeli. Ben anlatınca "öğretmen hanım yine hesap yapmış" diyor. Kâğıt senin elinden gitsin, köyün çocuğu getirdi desin.', en: 'The headman should see this. When I explain, he says "the teacher\'s been doing sums again." Let the paper come from you. Let him say a village child brought it.' },
      { kim: 'ogretmen', metin: '(kâğıdı katlayıp uzatır) Al. Cebinden düşürme. Muhtar akşamları muhtarlıkta olur.', en: '(folds the paper and hands it over) Here. Don\'t lose it. The headman is at his office in the evenings.' }
    ], secenekler: [
      { metin: 'Kuyu tamamen kurursa ne olur?', en: 'What happens if the well dries up completely?', etkiler: { arguman: 'A2' }, sonraki: 'g3_a2' },
      { metin: 'Tamam, götürürüm.', en: 'All right, I\'ll take it.', sonraki: 'g3_defter' }
    ] },
    { id: 'g3_a2', sonraki: 'g3_defter', satirlar: a2Satirlari('(ipi sarar)', '(winds up the rope)') },
    { id: 'g3_defter', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Defter', en: 'Notebook' }, metin: 'Görevlerin üstteki Defter\'de yazar. Ölçümü gün {sonGun} akşamına kadar muhtara götür. Geç kalırsan plan zayıf kalır.', en: 'Your tasks are in the Notebook at the top. Take the measurement to the headman by the evening of day {sonGun}. If you\'re late, the plan will be weak.' }
    ] },
    { id: 'g4_cicek', gun: 4, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: olcumVar, metin: 'Muhtar kapı kapı dolaşıyor, suyu idareli kullanın diye. Öğretmen hanım da anlatıp duruyormuş.', en: 'The headman is going door to door, telling people to use water sparingly. The teacher keeps explaining too, they say.' },
      { kim: 'anne', kosul: olcumYok, metin: 'Öğretmen hanım kapı kapı dolaşıyor, suyu idareli kullanın diye. Muhtar da kendi bildiği gibi söylemiş köylüye.', en: 'The teacher is going door to door, telling people to use water sparingly. The headman has told people too, in his own way.' },
      { kim: 'ic', metin: 'Annemin pencere önünde çok sevdiği sardunyası. Yaprakları iyice kıvrılmış.', en: 'Mum\'s beloved geranium on the windowsill. Its leaves have curled up badly.' },
      { kim: 'anne', metin: 'Ona su verme, boş ver.', en: 'Don\'t give it water, never mind.' },
      { kim: 'mehmet', metin: '(Bardağının dibinde kalan suyu sardunyaya döker)', en: '(Pours the last of his glass onto the geranium)' },
      { kim: 'anne', metin: '(Buruk şekilde gülümser, bir şey demez)', en: '(Smiles sadly, says nothing)' }
    ] },
    { id: 'g4_hatirlatma', gun: 4, dilim: 'aksam', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Öğretmen hanım bir kâğıt vermişti sana, muhtara götürdün mü?', en: 'The teacher gave you a paper. Did you take it to the headman?' }
    ] },
    { id: 'g5_baba', gun: 5, dilim: 'sabah', mekan: 'tepe', giris: { metin: 'Babanın araması için tepeye çıktın.', en: 'You climbed the hill for your father\'s call.' }, satirlar: [
      { kim: 'ic', metin: 'Annemin telefonu yalnızca tepede çekiyor. Babam muhtarlığa haber bırakmış, bu sabah arayacakmış.', en: 'Mum\'s phone only gets a signal on the hill. Dad left word at the headman\'s office that he\'d call this morning.' },
      { kim: 'baba', metin: 'Mehmet? Sesim geliyor mu?', en: 'Mehmet? Can you hear me?' },
      { kim: 'mehmet', metin: 'Geliyor, baba! Ne zaman geleceksin?', en: 'I can, Dad! When are you coming?' },
      { kim: 'baba', metin: '(bir an susar) İnşaatta birkaç iş var. Çağırdıkları gün gidiyorum, çağırmadıkları bekliyorum.', en: '(silent for a moment) There are a few jobs at a building site. I go the days they call me, and wait the days they don\'t.' },
      { kim: 'baba', metin: 'Annen nasıl? İyi uyuyor mu geceleri?', en: 'How\'s your mother? Is she sleeping well at night?' }
    ], secenekler: [
      { metin: 'Yorgun biraz ama iyi sayılır, baba.', en: 'A bit tired, but fine, more or less, Dad.', sonraki: 'g5_baba_a' },
      { metin: 'Sen nasılsın ya?', en: 'How are you, though?', sonraki: 'g5_baba_b' }
    ] },
    { id: 'g5_baba_a', sonraki: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: 'Yorgundur tabii ya. Söyle ona, biraz daha sabretsin.', en: 'She would be. Tell her to hold on a little longer.' }
    ] },
    { id: 'g5_baba_b', sonraki: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: 'Ben mi? İyiyim. Burada su musluktan akıyor, kötü de olsa, içerken utanıyorum.', en: 'Me? Fine. Water runs from the tap here, bad as it is. I feel ashamed drinking it.' }
    ] },
    { id: 'g5_baba_devam', satirlar: [
      { kim: 'baba', metin: '{keci} nasıl?', en: 'How\'s {keci}?' },
      { kim: 'mehmet', kosul: kecidusuk, metin: '{keci} hâlâ iyi değil. Kuyu da iniyor, öğretmen ölçtü.', en: '{keci} still isn\'t well. And the well is dropping, the teacher measured it.' },
      { kim: 'mehmet', kosul: keciIyi, metin: '{keci} toparlanıyor. Ama kuyu iniyor, öğretmen ölçtü.', en: '{keci} is recovering. But the well is dropping, the teacher measured it.' },
      { kim: 'mehmet', metin: 'Bidonları artık ben taşıyorum.', en: 'I carry the jerrycans now.' },
      { kim: 'baba', metin: 'Ben de senin yaşındayken taşırdım. O zaman bu kadar sorunlu değildi.', en: 'I carried them at your age too. It wasn\'t this much trouble then.' },
      { kim: 'mehmet', metin: 'Rıza Amca\'nın motoru da hiç durmuyor. Sadece onun da değil aslında, başkaları da var ama gözümün gördüğü o...', en: 'And Uncle Rıza\'s motor never stops. It\'s not just his, really, there are others, but his is the one I see...' },
      { kim: 'baba', metin: 'Rıza mı? Sen muhtarla konuş. O adamı bir tek muhtar...', en: 'Rıza? You talk to the headman. Only the headman can...' },
      { kim: 'ic', metin: 'Kesildi. Bir tek muhtar ne?', en: 'Cut off. Only the headman can what?' }
    ] },
    { id: 'g5_hatirlatma', gun: 5, dilim: 'sabah', kosul: olcumYok, mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'O öğretmenin kâğıdı hâlâ cebinde mi? Bu akşam götür, oğlum.', en: 'Is that teacher\'s paper still in your pocket? Take it this evening, son.' }
    ] },
    { id: 'g6_sabah', gun: 6, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Muhtar seni sormuş. Öğlen muhtarlığa uğra.', en: 'The headman asked for you. Stop by his office at noon.' },
      { kim: 'mehmet', metin: 'Beni mi?', en: 'Me?' },
      { kim: 'anne', metin: 'Evet, seni. Temiz gömleğini giy.', en: 'Yes, you. Put on your clean shirt.' }
    ] },
    { id: 'g6_plan', gun: 6, dilim: 'ogle', mekan: 'muhtarlik', giris: { metin: 'Muhtar seni de muhtarlığa çağırdı.', en: 'The headman has called you to his office too.' }, satirlar: [
      { kim: 'mehmet', metin: 'Selamünaleyküm, muhtar amca. Beni çağırmışsınız.', en: 'Peace be with you, Headman. You asked for me.' },
      { kim: 'muhtar', metin: 'Aleykümselam. Gel, otur şöyle.', en: 'And with you. Come, sit here.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Öğretmen hanımla oturduk, bir yol çizdik. Kâğıdı sen getirdin, sen de dinle.', en: 'The teacher and I sat down and drew up a way forward. You brought the paper, so you listen too.' },
      { kim: 'ogretmen', kosul: guclu, metin: 'Eski sarnıcı onarıyoruz. Yağmur gelince boşa akmasın, köy çeşmesine insin.', en: 'We\'re repairing the old cistern. When the rain comes it won\'t run off, it\'ll go down to the village fountain.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Kuyulara sayaç, motorlara saat taktıracağız. Yasada var zaten ama bizde kimse takmamış. Herkes ne çektiğini bilecek.', en: 'We\'ll fit meters on the wells and timers on the motors. It\'s already the law, but nobody here ever fitted them. Everyone will know what they draw.' },
      { kim: 'ogretmen', metin: 'Yetkililer geldiğinde bir de yer altı kaynaklarımıza baksalar iyi olur, ama sıra bize gelene kadar çok köy var daha...', en: 'When the officials come they should look at our groundwater too, but there are many villages ahead of us...' },
      { kim: 'ogretmen', kosul: guclu, metin: 'Sulama sabah erken ya da akşam serinde, ne kadar olacağını sayaç söyleyecek. Toprağın üstü uygun zamanda saman ya da otla örtülecek, buharlaşmasın.', en: 'Watering early in the morning or in the cool of the evening, the meter will say how much. At the right time the soil gets covered with straw or grass so it doesn\'t evaporate.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Gerekirse tarlalara az ekin ekeceğiz. Bir de damla sulama borusu var, ilçeden istedik. Sırayla kullanacağız.', en: 'We\'ll plant less in the fields if we have to. And there\'s drip irrigation pipe, we\'ve asked the district for it. We\'ll take turns.' },
      { kim: 'muhtar', kosul: guclu, metin: 'Hepsini cuma akşamı köy toplantısında oylayacağız.', en: 'We\'ll vote on all of it at the village meeting on Friday evening.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Öğretmen hanım ölçümün bir örneğini getirdi sonunda. "Aslını Mehmet\'e vermiştim" dedi.', en: 'The teacher finally brought a copy of the measurement. "I gave the original to Mehmet," she said.' },
      { kim: 'ic', kosul: zayif, metin: 'Eyvah, kâğıt cebimde kaldı, aklımdan çıkmış.', en: 'Oh no, the paper stayed in my pocket, I forgot all about it.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Keşke daha önce görseydim. Kuyu bu arada epey indi. Kızmıyorum, zaten ben de hatalıyım, otur da dinle.', en: 'I wish I\'d seen it sooner. The well has dropped a good deal since. I\'m not angry, I\'m to blame as well, sit and listen.' },
      { kim: 'ogretmen', kosul: zayif, metin: 'Sarnıç, sayaç, sulama saatleri... Bu kadar kısa sürede elimizden geleni yazdık.', en: 'Cistern, meters, watering hours... We wrote down what we could in so little time.' },
      { kim: 'muhtar', kosul: zayif, metin: 'Cuma akşamı köy toplantısında oylayacağız.', en: 'We\'ll vote at the village meeting on Friday evening.' },
      { kim: 'ogretmen', metin: 'Sarnıcı Hasan Amca hatırlattı, toprağı otla örtmeyi Fatma Teyze\'den öğrendik. Bazıları hâlâ umursamıyor, gözleriyle görseler de inanmıyorlar resmen.', en: 'Uncle Hasan reminded us of the cistern, and we learned covering the soil from Aunt Fatma. Some still don\'t care, they won\'t believe it even when they see it.' },
      { kim: 'muhtar', metin: 'Bazıları kendi kuyularını kullanıyor ama havalar böyle giderse onlar da tükenecek, farkında değiller.', en: 'Some use their own wells, but if the weather goes on like this those will run dry too, they don\'t realize.' },
      { kim: 'ogretmen', metin: 'Kuyular derinleştikçe derinleşiyor, on belki yüz yıllarca biriken sular bilinçsiz kullanımla aylar içinde eriyor.', en: 'Wells go deeper and deeper. Water gathered over decades, maybe centuries, melts away in months with careless use.' },
      { kim: 'muhtar', metin: 'Rıza\'nın motoru durmazsa ortak kuyudaki su hiçbirimize yetmez. Köy de ikiye bölündü, bazılarının tuzu kuru tabii. Oylar eşit çıkarsa herkes Rıza\'ya bakacak.', en: 'If Rıza\'s motor doesn\'t stop, the shared well won\'t be enough for any of us. The village is split in two, and some have nothing to lose, of course. If the vote ties, everyone will look at Rıza.' },
      { kim: 'muhtar', metin: 'Rıza da kimseyi dinlemez. Biz de onu pek dinlemedik açıkçası...', en: 'And Rıza listens to no one. To be fair, we haven\'t listened much to him either...' }
    ], secenekler: [
      { metin: 'Babam "o adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca\'yla neden konuşmuyorsunuz?', en: 'Dad said "only the headman can" and the line cut off. Why don\'t you talk to Uncle Rıza?', kosul: bilmiyor('A3'), etkiler: { arguman: 'A3' }, sonraki: 'g6_a3' },
      { metin: 'Ben konuşurum.', en: 'I\'ll talk to him.', kosul: konusmadi, sonraki: 'g6_hedef' },
      { metin: 'Ben onunla konuştum. Benimle az da olsa konuşuyor. Yine giderim.', en: 'I\'ve talked to him. He does talk to me, a little. I\'ll go again.', kosul: konustu, sonraki: 'g6_hedef' }
    ] },
    { id: 'g6_a3', sonraki: 'g6_hedef', satirlar: A3_SATIRLAR },
    { id: 'g6_hedef', satirlar: [
      { kim: 'ogretmen', kosul: konusmadi, metin: 'Seni bunun için de çağırdık. Bize kapısını açmaz. Sen çocuksun, sana bir şey demez belki.', en: 'That\'s partly why we called you. He won\'t open his door to us. You\'re a child, maybe he won\'t snap at you.' },
      { kim: 'ogretmen', kosul: konustu, metin: 'Demek sana kapısını açıyor. Bize açmaz.', en: 'So he opens his door to you. He doesn\'t to us.' },
      { kim: 'muhtar', metin: 'Zorla kabul ettiremeyiz, konuşmaya gideni de hep kaçırıyor bir şekilde. Dinletebilirsen kendini dinlet, Mehmet.', en: 'We can\'t force him to accept, and he drives off anyone who comes to talk. Get him to listen to you if you can, Mehmet.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuyu ikna et', en: 'Persuade the neighbor' }, metin: 'Rıza Amca\'ya köyde öğrendiğin {gereken} şeyi söylersen toplantıda planı destekler. Bir konuşmada yalnız bir şey dinler, her şeye de hemen inanmaz. Ne söylediğin kadar nasıl söylediğin de önemli. Defter\'de görebilirsin.', en: 'If you tell Uncle Rıza {gereken} things you\'ve learned in the village, he\'ll back the plan at the meeting. He\'ll hear only one thing per talk, and he doesn\'t believe everything right away. How you say it matters as much as what you say. You can check the Notebook.' }
    ] },
    { id: 'g7_komsu', gun: 7, dilim: 'sabah', mekan: 'kuyu_basi', giris: { metin: 'Yine su almaya indin. Bu sabah kuyu başında beklemediğin biri var.', en: 'You went down for water again. There\'s someone at the well this morning you didn\'t expect.' }, satirlar: [
      { kim: 'ic', metin: 'Rıza Amca kuyunun başında. Herkes onu görünce susmuş.', en: 'Uncle Rıza is at the well. Everyone fell silent when they saw him.' },
      { kim: 'komsu', metin: 'Damacanam bitti. Payımı alıp gideceğim.', en: 'My water\'s run out. I\'ll take my share and go.' },
      { kim: 'koylu', metin: 'Sıra sayılı, Rıza. Motorun yüzünden bidonlar yetmiyor.', en: 'We count turns here, Rıza. Jerrycans are running short because of your motor.' },
      { kim: 'koylu', metin: 'Senin kuyun var ya. Ondan iç.', en: 'You\'ve got your own well. Drink from that.' },
      { kim: 'komsu', metin: 'O su içilmez, geçen içine ilaç karıştı, biliyorsunuz.', en: 'You know that water isn\'t fit to drink, chemicals got into it not long ago.' },
      { kim: 'koylu', metin: 'Biliyoruz.', en: 'We know.' },
      { kim: 'komsu', metin: '(bir süre durur, boş bidonu alır, gider)', en: '(stands a moment, picks up the empty jerrycan, leaves)' },
      { kim: 'ic', metin: 'Haksız da değiller ama eli boş döndü.', en: 'They\'re not exactly wrong, but he left empty-handed.' },
      { kim: 'ic', metin: 'Bir şey diyemedim. Ama belki bidon taşıyabilirim.', en: 'I couldn\'t say anything. But maybe I can carry a jerrycan.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuya su', en: 'Water for the neighbor' }, metin: 'Artık öğlenleri haritadan Rıza Amca\'ya su götürebilirsin. Yarınki paydan {maliyet} damla gider ama onunla konuşma fırsatı olur.', en: 'You can now take water to Uncle Rıza at noon, from the map. It takes {maliyet} drops from tomorrow\'s share, but gives you a chance to talk to him.' }
    ] },
    { id: 'g8_sabah', gun: 8, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'ekran', metin: 'Sıcak dalgası. Gölgede kırk derece.', en: 'Heat wave. Forty degrees in the shade.' },
      { kim: 'anne', metin: 'Bugün dışarıda fazla kalma, yavrum, yine o sıcak rüzgârların kavurduğu günlerden birindeyiz. Kardeşin ve senin için endişeleniyorum.', en: 'Don\'t stay out long today, love, it\'s another of those days scorched by hot winds. I worry about you and the baby.' },
      { kim: 'anne', metin: 'Bizim çocukluğumuzda hiç böyle değildi, yine sıcaktı ama ne olduysa iklimler değişti resmen. Sizin geleceğinizde nasıl olacak... Allah korusun.', en: 'It was never like this when we were children. It was hot then too, but somehow the climate has changed. What will your future be like... God forbid.' }
    ] },
    { id: 'g8_obruk', gun: 8, dilim: 'ogle', mekan: 'komsu_tarlasi', mekanSecenek: function () { return { obruk: true }; }, giris: { metin: 'Derinden bir gürültü geldi. Köylüler Rıza Amca\'nın tarlasına doğru koşuyor.', en: 'A rumble from deep below. Villagers are running toward Uncle Rıza\'s field.' }, satirlar: [
      { kim: 'ic', ses: 'gurultu', metin: 'Rıza Amca\'nın tarlası... Toprak yarılmış. Kocaman bir çukur.', en: 'Uncle Rıza\'s field... The ground has split open. A huge pit.' },
      { kim: 'komsu', metin: '(çukurun kenarında, eli titreyerek) Dün burada mısır vardı.', en: '(at the edge of the pit, hands shaking) There was corn here yesterday.' },
      { kim: 'komsu', metin: 'Kırk yıldır bu toprağı sürüyorum. Kırk yıl!', en: 'Forty years I\'ve worked this land. Forty years!' },
      { kim: 'koylu', metin: '(alçak sesle) Benim tarla da iki tarla ötede.', en: '(quietly) My field is only two fields over too.' },
      { kim: 'mehmet', metin: 'Rıza Amca, orda durma, kenarı çöküyor!', en: 'Uncle Rıza, don\'t stand there, the edge is crumbling!' },
      { kim: 'komsu', metin: '(geri çekilir, oturur) Motor da hemen şurada. Bir metre öteye açılsaydı...', en: '(steps back, sits down) The motor\'s right there too. One meter over, and...' }
    ] },
    { id: 'g9_sabah', gun: 9, dilim: 'sabah', mekan: 'avlu', satirlar: [
      { kim: 'anne', metin: 'Bu akşam toplantı var, oğlum. Bütün köy orada olacak, sen de gelmeyi unutma.', en: 'There\'s a meeting this evening, son. The whole village will be there, don\'t forget to come.' },
      { kim: 'anne', metin: 'Babanla dün konuştuk, selamı var. Toplantıyı o da merak etti.', en: 'I talked to your father yesterday, he sends his love. He wants to know how the meeting goes too.' },
      { kim: 'ic', kosul: iknaDegil, metin: 'Motor bu sabah da çalışıyor. Rıza Amca\'ya gideceksem bugün gitmeliyim. Öğlen.', en: 'The motor is running this morning too. If I\'m going to Uncle Rıza, it has to be today. At noon.' },
      { kim: 'ic', kosul: ikna, metin: 'Bu sabah motorun sesi gelmiyor. Uzun zamandır ilk kez. "Bakarız" dedi ama gelir mi, gelmez mi, akşam göreceğiz.', en: 'No sound from the motor this morning. For the first time in ages. "We\'ll see," he said, but will he come or won\'t he? We\'ll know tonight.' }
    ] },
    { id: 'g9_toplanti', gun: 9, dilim: 'aksam', mekan: 'muhtarlik', mekanSecenek: function () { return { toplanti: true }; }, giris: { metin: 'Bütün köy muhtarlığın önünde toplandı. Bugün oylama var.', en: 'The whole village has gathered outside the headman\'s office. Today is the vote.' }, satirlar: [
      { kim: 'muhtar', ortam: 'kalabalik', metin: 'Hepiniz biliyorsunuz neden toplandığımızı. Kuyu suyu iyice dibe iniyor. Öğretmen hanım ölçtü, ben de gördüm, birçoğunuz da biliyor.', en: 'You all know why we\'re here. The well is dropping toward the bottom. The teacher measured it, I saw it myself, and many of you know it too.' },
      { kim: 'ogretmen', metin: 'Sarnıç onarılacak, kuyulara sayaç takılacak, sulama sabah erken ve akşam serinde yapılacak.', en: 'The cistern will be repaired, wells will get meters, watering will be early morning and cool evening.' },
      { kim: 'koylu', metin: 'Sayaç masrafını kim ödeyecek?', en: 'Who pays for the meters?' },
      { kim: 'koylu', metin: 'Benim tarlam kurursa çocuklarıma ne yediririm?', en: 'If my field dries up, what do I feed my children?' },
      { kim: 'koylu', metin: 'Rıza\'nın ve diğerlerinin motoru dönerken benim sayacım neye yarar?', en: 'What good is my meter while Rıza\'s motor and all the others are running?' },
      { kim: 'ic', kosul: anneIndi, metin: 'Herkes Rıza Amca\'nın motorunu sayıyor. Annemin gece indiği bidonları kimse saymıyor. Belki kendileri de iniyor...', en: 'Everyone is counting Uncle Rıza\'s motor. Nobody counts the jerrycans Mum carried at night. Maybe they go down themselves...' },
      { kim: 'ic', kosul: bizFazlaCektik, metin: 'Herkes Rıza Amca\'nın motorunu sayıyor. Bizim fazla çektiğimiz bidonları kimse saymıyor. Diğerleri de yapmıştır belki...', en: 'Everyone is counting Uncle Rıza\'s motor. Nobody counts the extra jerrycans we drew. Others have probably done it too...' },
      { kim: 'muhtar', metin: 'Artık oylayalım. Kabul edenler...', en: 'Time to vote. All in favor...' },
      { kim: 'ekran', metin: 'Eller kalkıyor. Yarısı evet, yarısı hayır.', en: 'Hands go up. Half yes, half no.' },
      { kim: 'ic', ortam: null, metin: 'Herkes dönüp Rıza Amca\'ya bakıyor.', en: 'Everyone turns to look at Uncle Rıza.' },
      { kim: 'komsu', kosul: ikna, metin: '(bir an Mehmet\'e bakar, ağır ağır ayağa kalkar) Benim tarlam çöktü. Çökmez diyordum ama çöktü, bir sonraki kimin tarlası? (elini kaldırır) Ben de varım. Motoruma da sayaç takılsın. Belki hâlâ şansımız vardır. Herkes üstüne düşeni yapsın...', en: '(glances at Mehmet, slowly stands) My field caved in. I said it wouldn\'t, but it did. Whose field is next? (raises his hand) Count me in. Put a meter on my motor too. Maybe we still have a chance. Let everyone do their part...' },
      { kim: 'koylu', kosul: ikna, metin: '(Sessizce mırıldanır) Daha iki gün önce sırayı kapattık ona. Ayıp ettik. Kıtlık insanlığımızı da yemeye başlamış.', en: '(mutters quietly) Only two days ago we shut him out of the line. Shame on us. Scarcity has started eating our humanity too.' },
      { kim: 'muhtar', kosul: ikna, metin: '(Bir an Rıza\'ya bakar, buruk bir gülümsemeyle başını sallar) Kabul edilmiştir.', en: '(looks at Rıza a moment, nods with a sad smile) It passes.' },
      { kim: 'komsu', kosul: iknaDegil, metin: 'Benim belgem var. Babamdan bir tarla kalmıştı, o da gitti. Elimde bir motor var. Sayaç takarsanız ne kalacak? Oğlumun okul masraflarını zor karşılıyorum zaten...', en: 'I have my permit. My father left me a field, and that\'s gone too. All I have is a motor. Put a meter on it, and what\'s left? I can barely pay for my son\'s schooling as it is...' },
      { kim: 'komsu', kosul: ve(iknaDegil, suGoturdu), metin: '(çıkarken Mehmet\'in önünde durur) Suyun için sağ ol, evlat. ...Bu başka mesele.', en: '(stops in front of Mehmet on his way out) Thanks for the water, lad. ...This is a different matter.' },
      { kim: 'ekran', kosul: iknaDegil, metin: 'Rıza Amca çıkıp gidiyor.', en: 'Uncle Rıza walks out.' },
      { kim: 'muhtar', kosul: iknaDegil, metin: 'Oylar eşit. Bu hâliyle plan geçmez.', en: 'The vote is tied. As it stands, the plan doesn\'t pass.' }
    ] },

    // ---------- Gün 1 öğreticileri ----------
    { id: 'ogretici_dagitim', satirlar: [
      { kim: 'ipucu', metin: 'Bugünkü payın {pay} damla. Her damla bir bidon su. Evin, keçinin ve bahçenin ihtiyacı payından daha fazla.', en: 'Today\'s share is {pay} drops. Each drop is one jerrycan of water. The home, the goat and the garden need more than your share.' },
      { kim: 'ipucu', metin: 'Kime ne kadar vereceğine sen karar vermelisin. Tam su alan toparlanır, eksik kalan her damla çubuğu biraz daha düşürür.', en: 'You have to decide who gets how much. Whatever gets its full water recovers, and every missing drop lowers its bar a little more.' },
      { kim: 'ipucu', metin: '"Kuyudan fazladan çek" {fazla} damla daha verir. Bunu kimse görmez ama köyün kuyusunda su seviyesi düşer.', en: '"Draw extra from the well" gives {fazla} more drops. Nobody sees it, but the water level in the village well drops.' }
    ] },
    { id: 'ogretici_keci', satirlar: [
      { kim: 'ipucu', metin: '{keci} seni bekliyor. Sırtını tara, su kabını koy, yemini ver. Bakım gördükçe biraz toparlanır.', en: '{keci} is waiting for you. Brush her back, put down the water bowl, give the feed. Care helps her recover a little.' }
    ] },
    { id: 'ogretici_harita', satirlar: [
      { kim: 'ipucu', metin: 'Akşamları birine uğrayabilir ya da ailenle vakit geçirebilirsin. Ama yalnızca birini yapabilirsin. Akşam uzun değil.', en: 'In the evening you can visit someone or spend time with your family. But you can only do one. Evenings aren\'t long.' },
      { kim: 'ipucu', metin: 'Haritada gitmek istediğin yere dokun. Bazı yerlerde her zaman yapılacak bir şey olmayabilir.', en: 'Tap where you want to go on the map. Some places may not always have something to do.' }
    ] },
    { id: 'ogretici_kiler', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Kiler', en: 'Pantry' }, metin: 'Sepetler evin yiyeceği. Her akşam iki sepet eksilir. Keçi "Toparlanıyor" olunca süt, bahçe "Yeşil" olunca sebze getirir, ikisi birer sepet. Gece ne geldiğini görürsün. Kiler boşalırsa ev zorlanır.', en: 'Baskets are the home\'s food. Two baskets go every evening. When the goat is "Recovering" she gives milk, and when the garden is "Green" it gives vegetables, one basket each. You\'ll see what came in at night. If the pantry empties, the home suffers.' }
    ] },
    { id: 'kiler_yardim', satirlar: [
      { kim: 'ic', metin: 'Kiler yine boş. Birinden istesem verirler mi? Fatma Teyze annemi hep sorar.', en: 'The pantry is empty again. Would anyone give us something if I asked? Aunt Fatma always asks after Mum.' },
      { kim: 'ipucu', baslik: { metin: 'Komşuluk', en: 'Neighbors' }, metin: 'Kiler boşken akşam yaşlı çifte uğrarsan yiyecek verebilirler. Ama onlarda da sınırsız değil.', en: 'If you visit the old couple in the evening while the pantry is empty, they may give you food. But they don\'t have endless food either.' }
    ] },
    { id: 'ipucu_kiler_kuyu', satirlar: [
      { kim: 'ipucu', baslik: { metin: 'Boş kiler', en: 'Empty pantry' }, metin: 'Kiler boş kaldığı her gece annen, yarın sofraya bir şey çıksın diye kuyudan gizlice su çeker. Köyün su seviyesi düşer. Keçi ve bahçe kileri doldurur.', en: 'Every night the pantry is empty, your mother secretly draws water from the well so there will be something on the table tomorrow. The village\'s water level drops. The goat and the garden fill the pantry.' }
    ] },

    // ---------- Sabah durum satırları (her sabah, gün 1 hariç) ----------
    { id: 'sabah_durum', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: ve(evDusuk, aglamiyor), metin: 'Annem gece yine uyumadı, sesinden anlıyorum.', en: 'Mum didn\'t sleep again last night, I can tell from her voice.' },
      { kim: 'ic', kosul: ve(evDusuk, agliyor), metin: 'Kardeşim ağlıyor, annemin sesi kısık.', en: 'The baby\'s crying, Mum\'s voice is hoarse.' },
      { kim: 'ic', kosul: ve(evOrta, surum(0)), metin: 'Güneş daha doğmadan sıcak. Bugün de uzun bir gün.', en: 'Hot before the sun\'s even up. Another long day.' },
      { kim: 'ic', kosul: ve(evOrta, surum(1)), metin: 'Kuyu başındaki sıraya erken gitmeliyim.', en: 'I should get to the line at the well early.' },
      { kim: 'ic', kosul: ve(evOrta, surum(2)), metin: 'Horozlar bile geç öttü. Sıcak herkesi susturuyor.', en: 'Even the roosters crowed late. The heat silences everyone.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(0)), metin: 'Annem mutfakta türkü mırıldanıyor. Ne zamandır duymamıştım.', en: 'Mum is humming a folk song in the kitchen. I haven\'t heard that in ages.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(1)), metin: 'Kardeşim annemin kucağında uyuyor. Ev bu sabah sessiz, iyi sessiz.', en: 'The baby is asleep in Mum\'s arms. The house is quiet this morning, the good kind of quiet.' },
      { kim: 'ic', kosul: ve(evYuksek, surum(2)), metin: 'Annem babamın gömleğini yamıyor. "Gelince giyer" diyor.', en: 'Mum is patching Dad\'s shirt. "He\'ll wear it when he comes," she says.' },
      { kim: 'anne', kosul: function (d, r) { return r.ilkSut; }, metin: '{keci} bu sabah süt verdi! Az ama verdi.', en: '{keci} gave milk this morning! Not much, but she did.' },
      { kim: 'ic', kosul: function (d, r) { return r.ilkSaglik; }, metin: '{keci} sabah beni görünce ayağa kalktı. Sırtını sürttü.', en: '{keci} got up when she saw me this morning. Rubbed her back against me.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci <= KS.config.KECI.cokDusuk; }, metin: '{keci} bugün de yemine bakmadı bile.', en: '{keci} didn\'t even look at her feed again today.' }
    ] },

    // ---------- Akşam başı: anne ipucu (ev yüksekse) ----------
    { id: 'anne_ipucu', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: ipucu('dostluk'), metin: 'Rıza Amca\'yla muhtar eskiden can ciğerdi. Aralarına ne girdi, kimse açıp sormuyor.', en: 'Uncle Rıza and the headman used to be inseparable. What came between them, nobody dares ask.' },
      { kim: 'anne', kosul: ipucu('nine'), metin: 'Fatma Teyze\'ye bir akşam uğra. Yaşlılar konuşacak birini arıyor.', en: 'Stop by Aunt Fatma\'s some evening. Old people want someone to talk to.' },
      { kim: 'anne', kosul: ipucu('ogretmen'), metin: 'Öğretmen hanım ölçümden beri bir şeye takılmış, yüzünden belli. Bir akşam sor bakalım.', en: 'The teacher has had something on her mind since the measuring, it shows on her face. Ask her some evening.' },
      { kim: 'anne', kosul: ipucu('su'), metin: 'Rıza\'nın kapısı eli boş çalınmaz, oğlum. Bu sıcakta bir bidon su, bin selamdan iyidir.', en: 'You don\'t knock on Rıza\'s door empty-handed, son. In this heat, a jerrycan of water beats a thousand greetings.' },
      { kim: 'anne', kosul: ipucu('olcum'), metin: 'Öğretmen hanım akıllı kadın. Ama muhtar laftan çok kâğıda inanır.', en: 'The teacher\'s a clever woman. But the headman trusts paper more than talk.' },
      { kim: 'anne', kosul: ipucu('kuyu'), metin: 'Kuyudan fazla çekmek kolay. Yarın yine çekersin, öbür gün yine. Sonra?', en: 'Drawing extra from the well is easy. Tomorrow you draw again, the next day again. And then?' }
    ] },

    // ---------- Öğle eylemleri (id: ogle_<eylem>) ----------
    { id: 'ogle_komsuyaSu', mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'mehmet', kosul: sonGunDegil, metin: 'Bidonunuz boştu. Biz paylaşmak istedik, amca.', en: 'Your jerrycan was empty. We wanted to share, Uncle.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: 'Benim kuyum var, evlat.', en: 'I have a well, lad.' },
      { kim: 'mehmet', kosul: sonGunDegil, metin: 'O su içilmez. Duydum geçenlerde, biliyorum.', en: 'That water isn\'t fit to drink. I heard about it, I know.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: '(bir süre bakar, çekinerek bidonları alır) Çay yaptım, birazdan olur, iç sen de.', en: '(looks at him a moment, shyly takes the jerrycans) I\'ve made tea, it\'ll be ready soon, have some.' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Size su getirdim, Rıza Amca.', en: 'I brought you water, Uncle Rıza.' },
      { kim: 'komsu', kosul: sonGun, metin: 'Bu köyde bana su getiren bir sen çıktın. (bir bardak çay koyup uzatır) Otur.', en: 'You\'re the only one in this village who ever brought me water. (pours a glass of tea and hands it over) Sit.' },
      { kim: 'ekran', kosul: sonGunDegil, metin: 'Yarınki paydan {maliyet} damla eksilecek.', en: '{maliyet} drops will come off tomorrow\'s share.' }
    ] },
    { id: 'veda_su', satirlar: [
      { kim: 'mehmet', kosul: sonGunDegil, metin: 'Çay için sağ olun, Rıza Amca.', en: 'Thanks for the tea, Uncle Rıza.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: '(elini sallar) Boş bidonları sonra alırsın.', en: '(waves a hand) Pick up the empty jerrycans later.' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Akşam görüşürüz, Rıza Amca.', en: 'See you this evening, Uncle Rıza.' },
      { kim: 'komsu', kosul: sonGun, metin: '(elini sallar)', en: '(waves a hand)' }
    ] },
    { id: 'ogle_bahceEkIs', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Toprağın üstünü kuru otla örttüm. Fatma Teyze öyle derdi, su uçup gitmezmiş böyle olunca.', en: 'I covered the soil with dry grass. Aunt Fatma always says the water won\'t escape that way.' },
      { kim: 'ic', kosul: surum(1), metin: 'Otları ayıkladım, kuruyanları kopardım. Çapa elimi soydu.', en: 'I weeded and pulled off the dead stems. The hoe skinned my hand.' },
      { kim: 'ic', kosul: surum(2), metin: 'Fatma Teyze\'nin tohumları çıkmış. Küçücük ama yemyeşil.', en: 'Aunt Fatma\'s seeds have come up. Tiny but bright green.' }
    ] },
    { id: 'ogle_evdeYardim', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Bebeği salladım, biraz güldürmeye çalıştım ama başaramadım. Annem biraz uyudu. Endişeliyim...', en: 'I rocked the baby and tried to get a laugh, but couldn\'t. Mum got a little sleep. I\'m worried...' },
      { kim: 'ic', kosul: surum(1), metin: 'Bulaşığı yıkadım, suyunu leğende biriktirdim. Biraz sabun var gibi ama neyse.', en: 'I washed the dishes and saved the water in the basin. There\'s a bit of soap in it, but never mind.' },
      { kim: 'anne', kosul: surum(2), metin: 'Ne zaman büyüdün de böyle iş yapıyorsun sen, canım oğlum?', en: 'When did you grow up and start doing all this, my dear boy?' },
      { kim: 'mehmet', kosul: surum(2), metin: '(cevap vermez, hafif tebessümle çamaşırı asmaya devam eder)', en: '(doesn\'t answer, keeps hanging the laundry with a faint smile)' }
    ] },
    { id: 'ogle_babayiAra', mekan: 'tepe', satirlar: [
      { kim: 'ic', metin: 'Tepeye çıktım. Telefon çekiyor, babamı aradım.', en: 'I climbed the hill. There\'s a signal, so I called Dad.' },
      { kim: 'baba', metin: 'Efendim? Mehmet, sen misin?', en: 'Hello? Mehmet, is that you?' },
      { kim: 'mehmet', metin: 'Benim, baba. Nasılsın?', en: 'It\'s me, Dad. How are you?' },
      { kim: 'baba', kosul: babaKonusmadi, metin: 'İyiyim, oğlum, iş arıyorum, bulursam çalışıyorum. Bu saatte tepede ne işin var?', en: 'I\'m fine, son, looking for work, and working when I find it. What are you doing on the hill at this hour?' },
      { kim: 'baba', kosul: babaKonustu, metin: 'İyiyim, oğlum, şükür. Karnınız doyuyor mu orada?', en: 'I\'m fine, son, thank God. Are you all eating enough?' }
    ], secenekler: [
      { metin: 'Sesini duyayım dedim.', en: 'I wanted to hear your voice.', kosul: babaKonusmadi, sonraki: 'baba_erken_a' },
      { metin: 'Annem sormamı istedi, ne zaman geleceksin?', en: 'Mum asked me to ask, when are you coming?', kosul: babaKonusmadi, sonraki: 'baba_erken_b' },
      { metin: 'Doyy...uyor, baba, merak etme.', en: 'We a...are, Dad, don\'t worry.', kosul: babaKonustu, sonraki: 'baba_gec_a' },
      { metin: 'Zor gidiyor, baba, bazen annemi ağlarken görüyorum.', en: 'It\'s hard, Dad, sometimes I see Mum crying.', kosul: babaKonustu, sonraki: 'baba_gec_b' }
    ] },
    { id: 'baba_erken_a', sonraki: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: 'İyi ettin, oğlum. Ben de seninkini duymak istiyordum.', en: 'Good, son. I wanted to hear yours too.' }
    ] },
    { id: 'baba_erken_b', sonraki: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: '(bir an susar) Bilmiyorum, oğlum. İş çıksın, bir yol bulacağım inşallah.', en: '(silent for a moment) I don\'t know, son. Let a job turn up, I\'ll find a way, God willing.' }
    ] },
    { id: 'baba_erken_son', satirlar: [
      { kim: 'baba', metin: 'Annene söyle, bu hafta biraz para yollamaya çalışacağım.', en: 'Tell your mother I\'ll try to send some money this week.' },
      { kim: 'mehmet', metin: 'Tamam, baba. Allah\'a emanet ol.', en: 'All right, Dad. Take care.' },
      { kim: 'baba', metin: 'Sen de, oğlum. Anneni ve kardeşini öp benim yerime.', en: 'You too, son. Give your mother and the baby a kiss from me.' },
      { kim: 'ic', metin: 'Sesi yorgun. "Çalışacağım" dedi, "yollayacağım" demedi.', en: 'He sounds tired. "I\'ll try," he said, not "I\'ll send."' }
    ] },
    { id: 'baba_gec_a', sonraki: 'baba_gec_son', satirlar: [
      { kim: 'baba', metin: '(güler) Yalan söylemeyi benden öğrenme. İyi, inandım.', en: '(laughs) Don\'t learn lying from me. Fine, I believe you.' }
    ] },
    { id: 'baba_gec_b', sonraki: 'baba_gec_son', satirlar: [
      { kim: 'baba', metin: 'Biliyorum, oğlum. Bu hafta biraz para yollamaya çalışacağım.', en: 'I know, son. I\'ll try to send some money this week.' }
    ] },
    { id: 'baba_gec_son', satirlar: [
      { kim: 'mehmet', metin: 'Hat kesilmişti. "O adamı bir tek muhtar" diyordun.', en: 'The line cut off. You were saying "only the headman can."' },
      { kim: 'baba', metin: 'Ha, Rıza. Onu bir tek muhtar yumuşatır diyecektim. Kardeş gibiydiler.', en: 'Ah, Rıza. Only the headman can soften him, I was going to say. They were like brothers.' },
      { kim: 'mehmet', metin: 'Ne oldu onlara?', en: 'What happened to them?' },
      { kim: 'baba', metin: 'O ikisinin bileceği iş. Kontör bitiyor, sen anneni öp benim yerime.', en: 'That\'s between the two of them. My credit\'s running out, give your mother a kiss from me.' },
      { kim: 'mehmet', metin: 'Tamam, baba. Allah\'a emanet ol.', en: 'All right, Dad. Take care.' },
      { kim: 'baba', metin: 'Sen de, oğlum.', en: 'You too, son.' },
      { kim: 'ic', metin: 'Sesi yorgun. Sormadım.', en: 'He sounds tired. I didn\'t ask.' }
    ] },
    { id: 'ogle_camur', mekan: 'avlu', satirlar: [
      { kim: 'ic', metin: 'Leğenin dibinde kalan suyla çamur yaptım, biraz oynadım, sonra ayaklarımı içine soktum. Kardeşim annemin kucağından beni görüp kahkaha attı. Annem kızmadı.', en: 'I made mud with the water left in the basin, played a little, then stuck my feet in. From Mum\'s arms the baby saw me and burst out laughing. Mum didn\'t get cross.' }
    ] },
    { id: 'ogle_gec', mekan: 'avlu', satirlar: [
      { kim: 'ic', kosul: surum(0), metin: 'Bulabildiğim bir gölgede oturdum. Sıcak, kimseye bir şey yaptırmıyor.', en: 'I sat in what shade I could find. The heat stops anyone doing anything.' },
      { kim: 'ic', kosul: surum(1), metin: 'Ağılın gölgesine oturdum. {keci} ile birbirimize baktık. O da bir şey yapmadı.', en: 'I sat in the shade of the pen. {keci} and I looked at each other. She didn\'t do anything either.' },
      { kim: 'ic', kosul: surum(2), metin: 'Bir süre yolu seyrettim. Geçen giden yok. Sıcak herkesi içeri almış.', en: 'I watched the road for a while. Nobody coming or going. The heat has driven everyone indoors.' }
    ] },

    // ---------- Akşam ziyaretleri (ziyaret: kim). Koşulu tutanlar sırayla oynar. ----------
    // ---------- Selamlaşma: her ziyaretin başında ----------
    { id: 'selam_yasliCift', ziyaret: 'yasliCift', kosul: function () { return true; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar, Hasan Amca, Fatma Teyze.', en: 'Good evening, Uncle Hasan, Aunt Fatma.' },
      { kim: 'dede', kosul: tekGun, metin: 'Gel, evladım, hoş geldin.', en: 'Come in, my boy, welcome.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hayırlı akşamlar. Nasılsınız bu sıcakta?', en: 'Good evening. How are you in this heat?' },
      { kim: 'nine', kosul: ciftGun, metin: 'Şükür, oğlum, idare ediyoruz. Hoş geldin.', en: 'Thank God, son, we\'re getting by. Welcome.' }
    ] },
    { id: 'selam_muhtar', ziyaret: 'muhtar', kosul: function () { return true; }, mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar, muhtar amca. Kolay gelsin.', en: 'Good evening, Headman. Don\'t work too hard.' },
      { kim: 'muhtar', kosul: tekGun, metin: 'Sağ ol, evladım. Hoş geldin.', en: 'Thanks, my boy. Welcome.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Selamünaleyküm, muhtar amca.', en: 'Peace be with you, Headman.' },
      { kim: 'muhtar', kosul: ciftGun, metin: 'Aleykümselam, Mehmet. Gel bakalım.', en: 'And with you, Mehmet. Come in.' }
    ] },
    { id: 'selam_ogretmen', ziyaret: 'ogretmen', kosul: function () { return true; }, mekan: 'koy_yolu', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar, öğretmenim.', en: 'Good evening, Miss.' },
      { kim: 'ogretmen', kosul: tekGun, metin: 'İyi akşamlar, Mehmet. Işığı görüp mü geldin?', en: 'Good evening, Mehmet. Did you see the light?' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Merhaba, öğretmenim. Nasılsınız?', en: 'Hello, Miss. How are you?' },
      { kim: 'ogretmen', kosul: ciftGun, metin: 'Yorgunum ama iyiyim, Mehmet. Gel.', en: 'Tired but fine, Mehmet. Come.' }
    ] },
    { id: 'selam_komsu', ziyaret: 'komsu', kosul: function () { return true; }, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi akşamlar, Rıza Amca.', en: 'Good evening, Uncle Rıza.' },
      { kim: 'komsu', kosul: tekGun, metin: 'Hı.', en: 'Hm.' },
      { kim: 'mehmet', kosul: ve(ciftGun, obrukOncesi), metin: 'Merhaba, Rıza Amca. Nasılsınız?', en: 'Hello, Uncle Rıza. How are you?' },
      { kim: 'komsu', kosul: ve(ciftGun, obrukOncesi), metin: 'Nasıl olayım. İşte.', en: 'How should I be. Like this.' },
      { kim: 'mehmet', kosul: obrukSonrasi, metin: 'İyi akşamlar, Rıza Amca.', en: 'Good evening, Uncle Rıza.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: '(çukura bakar, dönmez) Hı.', en: '(looks at the pit, doesn\'t turn) Hm.' }
    ] },
    { id: 'sohbet_yasliCift', ziyaret: 'yasliCift', kosul: sohbet, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Annen nasıl, oğlum? Bebek iyi uyuyor mu geceleri?', en: 'How\'s your mother, son? Does the baby sleep well at night?' },
      { kim: 'mehmet', metin: 'Uyuyor, teyze, biraz.', en: 'A bit, Auntie.' },
      { kim: 'dede', metin: 'Bu sıcakta küçükler zor uyur. Sen de yorulma, otur biraz su iç.', en: 'Little ones sleep badly in this heat. Don\'t wear yourself out either, sit and have some water.' },
      { kim: 'ic', metin: 'Kaç yaşındalar bilmiyorum. Köyün en eskileri onlar. Çocukları artık ziyarete gelmiyor, şehrin kalabalığındalar.', en: 'I don\'t know how old they are. The oldest people in the village. Their children don\'t visit anymore, they\'re lost in the crowds of the city.' }
    ] },
    { id: 'sohbet_muhtar', ziyaret: 'muhtar', kosul: sohbet, mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', metin: 'Hayırdır, Mehmet? Annen bir şey mi istedi?', en: 'What\'s up, Mehmet? Did your mother want something?' },
      { kim: 'mehmet', metin: 'Yok, muhtar amca, öyle uğradım.', en: 'No, Headman, I just dropped by.' },
      { kim: 'muhtar', metin: 'İyi etmişsin. Selam söyle eve.', en: 'Good of you. Say hello at home.' },
      { kim: 'ic', metin: 'Köyde birinin kâğıt işi mi var, önce bu kapı çalınır. Kimseye sesini yükseltmez, kimse de ona kolay kolay hayır demez. Rıza Amca hariç.', en: 'If anyone in the village has paperwork, this is the first door. He never raises his voice, and nobody finds it easy to say no to him. Except Uncle Rıza.' }
    ] },
    { id: 'sohbet_ogretmen', ziyaret: 'ogretmen', kosul: sohbet, mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', metin: 'Mehmet, tatilde okulun yolunu unutmamışsın.', en: 'Mehmet, you haven\'t forgotten the way to school over the summer.' },
      { kim: 'mehmet', metin: 'Geçiyordum, öğretmenim.', en: 'I was passing by, Miss.' },
      { kim: 'ogretmen', metin: 'Geçerken bir kitap da al o zaman. Geri getirmeyi unutma.', en: 'Then take a book as you pass. Don\'t forget to bring it back.' },
      { kim: 'ic', metin: 'Zeynep öğretmen şehirden geldi, gidenler gibi gitmedi. Yazın bile okulda. Cebindeki deftere her şeyi yazıyor, kuyuyla alakalı şeyleri bile.', en: 'Ms. Zeynep came from the city, and didn\'t leave like the others. At school even in summer. She writes everything in the notebook in her pocket, even things about the well.' }
    ] },
    { id: 'sohbet_komsu', ziyaret: 'komsu', kosul: sohbet, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Ne var, evlat? Annen mi gönderdi?', en: 'What is it, lad? Did your mother send you?' },
      { kim: 'mehmet', kosul: obrukOncesi, metin: 'Yok, Rıza Amca, geçiyordum.', en: 'No, Uncle Rıza, I was passing by.' },
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Geç o zaman.', en: 'Then pass.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: 'Seyre mi geldin? Herkes geldi.', en: 'Come to gawk? Everyone has.' },
      { kim: 'mehmet', kosul: obrukSonrasi, metin: 'Yok, Rıza Amca.', en: 'No, Uncle Rıza.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: 'Git o zaman.', en: 'Then go.' },
      { kim: 'ic', metin: 'Yalnız yaşıyor. Oğlu şehre gideli akşamları evinden motorun sesinden başka ses gelmez. Eskiden bize ceviz verirdi, şimdi selamı bile kısa.', en: 'He lives alone. Since his son left for the city, the only sound from his house in the evening is the motor. He used to give us walnuts. Now even his hello is short.' }
    ] },

    { id: 'ziyaret_yasliCift_yardim1', ziyaret: 'yasliCift', kosul: function (d, r) { return r.yardim === 1; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Annen sofrayı zor kuruyordur tek başına. Al şu bulguru, bir de yarım peynir. Hayır deme, ayıp olur.', en: 'Your mother must struggle to set a table on her own. Take this bulgur, and half a cheese. Don\'t say no, it\'s rude.' }
    ] },
    { id: 'ziyaret_yasliCift_yardim2', ziyaret: 'yasliCift', kosul: function (d, r) { return r.yardim === 2; }, mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'nine', metin: 'Bu son, oğlum. Artık bize de zor yetiyor. Bir daha veremeyebiliriz, gücenme olur mu?', en: 'This is the last, son. Even we barely have enough now. We may not be able to give more, don\'t be hurt, all right?' }
    ] },
    { id: 'ziyaret_yasliCift_a1', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, bilmiyor('A1')), mekan: 'yasli_cift_evi', etkiler: { arguman: 'A1' }, satirlar: [
      { kim: 'nine', metin: 'Otur, sana bir şey anlatayım. Bu köyde bir dere vardı, bilir misin?', en: 'Sit, let me tell you something. There was a stream in this village, did you know?' },
      { kim: 'mehmet', metin: 'Hasan Amca da söylemişti. Gerçekten var mıydı?', en: 'Uncle Hasan mentioned it. Was there really?' }
    ].concat(A1_SATIRLAR) },
    { id: 'ziyaret_yasliCift_iklim', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, biliyor('A1'), function (d, r) { return !r.yardim; }), mekan: 'yasli_cift_evi', satirlar: [
      { kim: 'dede', kosul: kalanHak('yasliCift', 1), metin: 'Bizim zamanımızda kar yerde haftalarca kalırdı. Şimdi düştüğü gibi eriyor.', en: 'In our day the snow lay on the ground for weeks. Now it melts as it falls.' },
      { kim: 'nine', kosul: kalanHak('yasliCift', 1), metin: 'Kuyudaki su, bizim çocukluğumuzda yağan kar, yağmur. Biz çok içtik, hiç düşünmemiştik.', en: 'The water in the well is the snow and rain of our childhood. We drank a lot, and never gave it a thought.' },
      { kim: 'dede', kosul: kalanHak('yasliCift', 0), metin: 'Eskiden kışın toprak doyardı. Yazın ne çekersen çek, ertesi yıl yerine gelirdi.', en: 'The soil used to fill up in winter. However much you drew in summer, it came back the next year.' },
      { kim: 'nine', kosul: kalanHak('yasliCift', 0), metin: 'Şimdi gelmiyor. Biz gideceğiz, sizin kuyunuz kalacak. Asıl ona üzülüyorum, oğlum.', en: 'Now it doesn\'t. We\'ll go, and your well will remain. That\'s what grieves me most, son.' }
    ] },

    { id: 'ziyaret_muhtar_olcum', ziyaret: 'muhtar', kosul: function (d, r) { return r.gorev; }, mekan: 'muhtarlik', satirlar: [
      { kim: 'mehmet', metin: 'Muhtar amca, öğretmenim bunu gönderdi. Kuyunun ölçümü.', en: 'Headman, my teacher sent this. The well\'s measurement.' },
      { kim: 'muhtar', metin: '(kâğıda uzun uzun bakar) Yarım metre ha...', en: '(studies the paper for a long time) Half a meter, eh...' },
      { kim: 'muhtar', metin: 'Ben de içten içe biliyordum. Ama somutlaşınca başka oluyor. Sorunları görmezden gelmek hep daha kolay, alışmışız...', en: 'I knew it deep down. But it\'s different once it\'s real. Ignoring problems is always easier, we\'ve got used to it...' },
      { kim: 'muhtar', metin: 'Öğretmen hanımla oturup konuşsam iyi olur o zaman. Köyün işini de köylüye sormak lazım illa. Senin de eline sağlık yeğenim.', en: 'Then I\'d better sit down and talk with the teacher. And the village\'s business has to be put to the villagers. Well done, my boy.' },
      { kim: 'ekran', metin: 'Defter: Ölçüm muhtara ulaştı ✓', en: 'Notebook: Measurement delivered to the headman ✓' }
    ] },
    { id: 'ziyaret_muhtar_a3', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil, bilmiyor('A3')), mekan: 'muhtarlik', etkiler: { arguman: 'A3' }, satirlar: [
      { kim: 'muhtar', metin: 'Otur, Mehmet. Babandan haber var mı?', en: 'Sit, Mehmet. Any news of your father?' },
      { kim: 'mehmet', kosul: babaKonusmadi, metin: 'Yok henüz. Muhtar amca, kuyu başında hep Rıza Amca\'nın motorunu konuşuyorlar. Siz neden konuşmuyorsunuz onunla?', en: 'Not yet. Headman, at the well they keep talking about Uncle Rıza\'s motor. Why don\'t you talk to him?' },
      { kim: 'mehmet', kosul: babaKonustu, metin: 'Aradı. "O adamı bir tek muhtar" dedi, hat kesildi. Siz Rıza Amca\'yla neden konuşmuyorsunuz?', en: 'He called. "Only the headman can," he said, and the line cut off. Why don\'t you talk to Uncle Rıza?' }
    ].concat(A3_SATIRLAR) },
    { id: 'ziyaret_muhtar_genel', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil, biliyor('A3')), mekan: 'muhtarlik', satirlar: [
      { kim: 'muhtar', metin: 'Baban aradı dün, seni sordu. "Sözünü dinliyor mu?" dedi. Köyü dinliyor, dedim.', en: 'Your father called yesterday, asked about you. "Does he listen to you?" he said. He listens to the village, I said.' },
      { kim: 'muhtar', metin: 'Köy dediğin, bir kuyunun etrafına toplanmış birkaç ev artık. Kuyu giderse köy de gider.', en: 'What\'s a village now? A few houses gathered round a well. If the well goes, the village goes.' }
    ] },

    { id: 'ziyaret_ogretmen_olcum', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, olcumYok), mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', kosul: olcumSuresiVar, metin: 'Kâğıdı muhtara götürdün mü? Geç kalma, Mehmet.', en: 'Did you take the paper to the headman? Don\'t be late, Mehmet.' },
      { kim: 'ogretmen', kosul: function (d) { return !olcumSuresiVar(d); }, metin: 'Kâğıt cebinde kalmış, duydum. Olur öyle. Ben de sana bırakmamalıydım.', en: 'I heard the paper stayed in your pocket. It happens. I shouldn\'t have left it all to you.' }
    ] },
    { id: 'ziyaret_ogretmen_a2', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, bilmiyor('A2')), mekan: 'koy_yolu', etkiler: { arguman: 'A2' }, satirlar: [
      { kim: 'ogretmen', kosul: obrukOncesi, metin: 'Ölçümü düşünüyordum da. Tek korktuğum kuyunun kuruması değil.', en: 'I\'ve been thinking about the measurement. The well drying up isn\'t my only fear.' },
      { kim: 'mehmet', kosul: obrukSonrasi, metin: 'Öğretmenim, o çukur neden açıldı?', en: 'Miss, why did that pit open?' }
    ].concat(a2Satirlari('(önündeki defteri kapatır)', '(closes the notebook in front of her)')) },
    { id: 'ziyaret_ogretmen_iklim', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, biliyor('A2')), mekan: 'koy_yolu', satirlar: [
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 1), metin: 'Bu kuraklık yalnız bizim ovada değil, Mehmet. Gazetede okudum, İspanya\'da da, Irak\'ta da kuyular iniyor. Kavurucu sıcaklar var her yerde.', en: 'This drought isn\'t only on our plain, Mehmet. I read it in the paper: wells are dropping in Spain and in Iraq too. There\'s scorching heat everywhere.' },
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 1), metin: 'Büyük toplantılarda konuşuyorlar, iyi de, bizim kuyudan kaç kova çekileceğini orada bilmezler. Herkes kendi üzerine düşeni yapmalı.', en: 'They talk about it at big conferences, and that\'s good, but they can\'t know there how many buckets to draw from our well. Everyone has to do their own part.' },
      { kim: 'ogretmen', kosul: kalanHak('ogretmen', 0), metin: 'Ölçmek kolay, Mehmet. Zor olan, ölçtüğünü insanlara anlatabilmek.', en: 'Measuring is easy, Mehmet. The hard part is making people understand what you measured.' }
    ] },

    { id: 'ziyaret_komsu', ziyaret: 'komsu', kosul: sohbetDegil, mekan: 'komsu_tarlasi', mekanSecenek: function (d) { return { obruk: d.gun >= KS.config.OBRUK_GUNU }; }, satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Bu saatte tarlada ne arıyorsun, evlat? Otur bakalım, madem geldin.', en: 'What are you doing in the field at this hour, lad? Sit, since you\'ve come.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: 'Bu saatte burada ne arıyorsun, evlat? Çukura yaklaşma. Otur şöyle, madem geldin.', en: 'What are you doing here at this hour, lad? Keep away from the pit. Sit here, since you\'ve come.' }
    ] },

    // ---------- Küçük sohbet (mekanik etkisi yok) ve vedalaşma ----------
    { id: 'kucuk_yasliCift', ziyaret: 'yasliCift', kosul: ve(sohbetDegil, kalanHak('yasliCift', 1)), satirlar: [
      { kim: 'nine', metin: 'Annen nasıl, geçenlerde rahatsızlanmıştı, bu sıcakta uyuyabiliyor mu?', en: 'How\'s your mother? She was unwell not long ago. Can she sleep in this heat?' }
    ], secenekler: [
      { metin: 'Zor uyuyor, teyze.', en: 'Barely, Auntie.', sonraki: 'kucuk_yasliCift_a' },
      { metin: 'İyi, şükür.', en: 'She\'s fine, thank God.', sonraki: 'kucuk_yasliCift_b' }
    ] },
    { id: 'kucuk_yasliCift_a', satirlar: [{ kim: 'nine', metin: 'Sıcak herkesi yoruyor. Söyle ona, bir akşam bize gelsin.', en: 'The heat is wearing everyone out. Tell her to come to us some evening.' }] },
    { id: 'kucuk_yasliCift_b', satirlar: [{ kim: 'nine', metin: 'Allah\'a şükür. Uyku en iyi ilaç, oğlum.', en: 'Thank God. Sleep\'s the best medicine, son.' }] },
    { id: 'kucuk_muhtar', ziyaret: 'muhtar', kosul: ve(sohbetDegil, gorevDegil, obrukOncesi), satirlar: [
      { kim: 'muhtar', metin: 'Sen söyle, köyde ne var ne yok?', en: 'You tell me, what\'s new in the village?' }
    ], secenekler: [
      { metin: 'Yok, muhtar amca, duymadım.', en: 'Nothing, Headman, I haven\'t heard anything.', sonraki: 'kucuk_muhtar_a' },
      { metin: 'Kuyu başında kavga çıkacak diyorlar.', en: 'They say a fight will break out at the well.', sonraki: 'kucuk_muhtar_b' }
    ] },
    { id: 'kucuk_muhtar_a', satirlar: [{ kim: 'muhtar', metin: 'İyi. Bu aralar duymamak daha hayırlı.', en: 'Good. Better not to hear these days.' }] },
    { id: 'kucuk_muhtar_b', satirlar: [{ kim: 'muhtar', metin: 'Çıkmasın diye pay yazdım ya. Bakalım.', en: 'That\'s why I set the shares. We\'ll see.' }] },
    { id: 'kucuk_ogretmen', ziyaret: 'ogretmen', kosul: ve(sohbetDegil, kalanHak('ogretmen', 1), obrukOncesi), satirlar: [
      { kim: 'ogretmen', metin: 'Tatilde kitap okuyor musun bari?', en: 'Are you at least reading over the summer?' }
    ], secenekler: [
      { metin: 'Okuyorum, öğretmenim, yavaş yavaş.', en: 'I am, Miss, slowly.', sonraki: 'kucuk_ogretmen_a' },
      { metin: 'Vakit kalmıyor, su taşıyorum.', en: 'No time, I\'m carrying water.', sonraki: 'kucuk_ogretmen_b' }
    ] },
    { id: 'kucuk_ogretmen_a', satirlar: [{ kim: 'ogretmen', metin: 'Aferin. Bitince gel, başkasını veririm.', en: 'Good. When you finish, come and I\'ll give you another.' }] },
    { id: 'kucuk_ogretmen_b', satirlar: [{ kim: 'ogretmen', metin: 'Biliyorum. Kitap kaçmaz, ama yine de okumaya çalış boş zamanında.', en: 'I know. The book won\'t run away, but still, try to read when you have time.' }] },
    { id: 'kucuk_komsu', ziyaret: 'komsu', kosul: ve(sohbetDegil, kalanHak('komsu', 0), obrukOncesi), satirlar: [
      { kim: 'komsu', metin: 'Ne bakıyorsun öyle? Tarlamı mı merak ettin?', en: 'What are you staring at? Curious about my field?' }
    ], secenekler: [
      { metin: 'Yok, selam vermeye geldim.', en: 'No, I came to say hello.', sonraki: 'kucuk_komsu_a' },
      { metin: 'Mısırlar güzel olmuş.', en: 'The corn looks good.', sonraki: 'kucuk_komsu_b' }
    ] },
    { id: 'kucuk_komsu_a', satirlar: [{ kim: 'komsu', metin: 'Selamı aldım.', en: 'Hello received.' }] },
    { id: 'kucuk_komsu_b', satirlar: [{ kim: 'komsu', metin: 'Güzel tabii. Su çekince olur. Babamdan kalan toprak, kurutmam. Benim oğlanın okul masrafını çıkaracak inşallah.', en: 'Of course it does. That\'s what drawing water gets you. It\'s land my father left me, I won\'t let it dry. It\'ll pay for my boy\'s schooling, God willing.' }] },
    { id: 'veda_yasliCift', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Ben kalkayım, annem bekler. Sağlıcakla kalın.', en: 'I\'ll be going, Mum\'s waiting. Take care.' },
      { kim: 'dede', kosul: tekGun, metin: 'Sen de sağlıcakla, oğlum. Annene selam söyle.', en: 'You too, son. Say hello to your mother.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Allah\'a emanet olun, Fatma Teyze.', en: 'God keep you, Aunt Fatma.' },
      { kim: 'nine', kosul: ciftGun, metin: 'Sen de, evladım. Karanlıkta bastığın yere dikkat et.', en: 'You too, my boy. Watch where you step in the dark.' }
    ] },
    { id: 'veda_muhtar', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Size iyi akşamlar, muhtar amca.', en: 'Good evening to you, Headman.' },
      { kim: 'muhtar', kosul: tekGun, metin: 'Sana da, evladım. Doğru eve, dikkatli ol.', en: 'You too, my boy. Straight home, be careful.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Sağlıcakla kalın, muhtar amca.', en: 'Take care, Headman.' },
      { kim: 'muhtar', kosul: ciftGun, metin: 'Eyvallah, Mehmet. Güle güle.', en: 'All right, Mehmet. Off you go.' }
    ] },
    { id: 'veda_ogretmen', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Sağlıcakla kalın, öğretmenim.', en: 'Take care, Miss.' },
      { kim: 'ogretmen', kosul: tekGun, metin: 'Sen de, Mehmet. Görüşürüz.', en: 'You too, Mehmet. See you.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hoşça kalın, öğretmenim.', en: 'Goodbye, Miss.' },
      { kim: 'ogretmen', kosul: ciftGun, metin: 'Güle güle, Mehmet.', en: 'Goodbye, Mehmet.' }
    ] },
    { id: 'veda_komsu', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'Sağlıcakla kalın, Rıza Amca.', en: 'Take care, Uncle Rıza.' },
      { kim: 'komsu', kosul: tekGun, metin: '(elini sallar)', en: '(waves a hand)' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Annem selam söyledi, Rıza Amca.', en: 'Mum sends her regards, Uncle Rıza.' },
      { kim: 'komsu', kosul: ciftGun, metin: 'Sağ olsun. Hadi git artık.', en: 'Thank her. Now go on.' }
    ] },

    { id: 'aile_vakti', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: ve(evDusuk, surum(0)), metin: 'Gel otur yanıma, oğlum. Bir şey yapmasak da olur. (bebeği kucağına verir)', en: 'Come sit by me, son. We don\'t have to do anything. (hands him the baby)' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(0)), metin: '(kardeşini sever ve sallar, bir süre konuşmazlar)', en: '(cuddles and rocks the baby, they don\'t talk for a while)' },
      { kim: 'anne', kosul: ve(evDusuk, surum(1)), metin: 'Yoruldum, oğlum. Bu sıcaklarla baş etmek çok zor. Size kıyamıyorum, gel otur biraz.', en: 'I\'m tired, son. This heat is so hard to cope with. It breaks my heart for you both, come sit a while.' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(1)), metin: 'Uzan biraz, anne, kardeşime ben bakarım.', en: 'Lie down a bit, Mum, I\'ll watch the baby.' },
      { kim: 'anne', kosul: ve(evDusuk, surum(2)), metin: 'Baban olsa "bu da geçer" derdi. Ben demeyeyim, neyse sen de gel uzan biraz.', en: 'Your father would say "this too shall pass." I won\'t say it. Anyway, come and lie down a bit too.' },
      { kim: 'mehmet', kosul: ve(evDusuk, surum(2)), metin: 'Benim umudum var, anne, geçecek, geçireceğiz.', en: 'I have hope, Mum. It\'ll pass, we\'ll get through it.' },
      { kim: 'anne', kosul: ve(evOrta, surum(0)), metin: 'Kardeşin bugün sana baktı baktı güldü, biliyor musun?', en: 'The baby kept looking at you today and laughing, did you know?' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(0)), metin: 'Bana mı güldü? Ben ne yaptım ki?', en: 'At me? What did I do?' },
      { kim: 'anne', kosul: ve(evOrta, surum(1)), metin: 'Baban küçükken bu avluda uyurmuş, yazın. Gel, biz de çıkalım.', en: 'Your father slept in this yard in summer when he was small. Come, let\'s go out too.' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(1)), metin: 'Yıldız sayarım. Bidon saymaktan iyidir.', en: 'I\'ll count stars. Better than counting jerrycans.' },
      { kim: 'anne', kosul: ve(evOrta, surum(2)), metin: 'Baban gitmeden kapıyı onaracaktı. Döner dönmez sana da tutturacak, görürsün.', en: 'Your father meant to fix the door before he left. He\'ll have you at it the moment he\'s back, you\'ll see.' },
      { kim: 'mehmet', kosul: ve(evOrta, surum(2)), metin: 'Ben onarırım, anne, çivi versen yeter.', en: 'I can fix it, Mum, just give me nails.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(0)), metin: 'Baban gelince bu evi iyice bir temizleyelim, zor günde dağılmadık çok şükür.', en: 'When your father comes, let\'s give this house a good clean. We didn\'t fall apart when it got hard, thank God.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(0)), metin: 'Olur, anne, babam gelsin, tekrar beraber olalım yeter. Dağılmayız.', en: 'All right, Mum. Let Dad come, let\'s be together again, that\'s all. We won\'t fall apart.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(1)), metin: 'Bugün sana hiç "hadi" demedim, fark ettin mi? Her işe kendin yetiştin.', en: 'I didn\'t say "come on" to you once today, did you notice? You got to everything on your own.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(1)), metin: 'Fark ettim. İyice alıştırdın beni, anne, ya.', en: 'I noticed. You\'ve got me well trained, Mum.' },
      { kim: 'anne', kosul: ve(evYuksek, surum(2)), metin: 'Babana anlatacağım, bu yaz kimin sayesinde ayakta kaldık.', en: 'I\'ll tell your father who kept us on our feet this summer.' },
      { kim: 'mehmet', kosul: ve(evYuksek, surum(2)), metin: '{keci} sayesinde de.', en: '{keci} too.' }
    ] },
    { id: 'aile_sohbet', satirlar: [
      { kim: 'anne', kosul: surum(0), metin: 'Bugün dışarıda kimleri gördün bakalım?', en: 'Who did you see out there today?' },
      { kim: 'anne', kosul: surum(1), metin: 'Baban aradığında ona ne anlatacaksın?', en: 'What will you tell your father when he calls?' },
      { kim: 'anne', kosul: surum(2), metin: 'Kardeşin büyüyünce seni ona nasıl anlatayım?', en: 'When the baby grows up, how shall I describe you?' }
    ], secenekler: [
      { metin: 'Herkes ya kuyu başında bidon sayıyor ya da sıcakla boğuşuyor.', en: 'Everyone\'s either at the well counting jerrycans or wrestling with the heat.', kosul: surum(0), sonraki: 'aile_sohbet_0a' },
      { metin: 'Kimseyle konuşmadım.', en: 'I didn\'t talk to anyone.', kosul: surum(0), sonraki: 'aile_sohbet_0b' },
      { metin: '{keci} iyi derim.', en: 'I\'ll say {keci} is well.', kosul: surum(1), sonraki: 'aile_sohbet_1a' },
      { metin: 'Hiçbir şey, üzülmesin.', en: 'Nothing, so he won\'t worry.', kosul: surum(1), sonraki: 'aile_sohbet_1b' },
      { metin: 'Su taşıyan kaslı, güçlü abisi de.', en: 'The big strong brother who carried water.', kosul: surum(2), sonraki: 'aile_sohbet_2a' },
      { metin: 'Anlatma, kendi görür.', en: 'Don\'t. The baby will see.', kosul: surum(2), sonraki: 'aile_sohbet_2b' }
    ] },
    { id: 'aile_sohbet_0a', satirlar: [{ kim: 'anne', metin: 'Saysınlar. Sayılacak su kaldıkça iyi demektir.', en: 'Let them count. It means there\'s still water left to count.' }] },
    { id: 'aile_sohbet_0b', satirlar: [{ kim: 'anne', metin: 'Konuş, oğlum. Bu köyde herkes birbirine küsmüş zaten. Herkes kendi derdine düşmüş.', en: 'Talk, son. Everyone in this village has fallen out with everyone already. Everyone\'s caught up in their own troubles.' }] },
    { id: 'aile_sohbet_1a', satirlar: [{ kim: 'anne', metin: 'De tabii, sevinsin. Kesin onu da sorar zaten.', en: 'Of course, say it, it\'ll cheer him. He\'s sure to ask anyway.' }] },
    { id: 'aile_sohbet_1b', satirlar: [{ kim: 'anne', metin: 'Üzülmez. Sesini duymak ister, ne desen olur.', en: 'He won\'t worry. He wants to hear your voice, say anything.' }] },
    { id: 'aile_sohbet_2a', satirlar: [{ kim: 'anne', metin: '(güler) Bir de inatçı diyeyim, eksik kalmasın.', en: '(laughs) And stubborn, I\'ll say, to be complete.' }] },
    { id: 'aile_sohbet_2b', satirlar: [{ kim: 'anne', metin: 'Görür tabii. Sen yanında ol, yeter.', en: 'Of course. Just be there, that\'s all.' }] },
    { id: 'aile_gece', satirlar: [
      { kim: 'mehmet', kosul: tekGun, metin: 'İyi geceler, anne.', en: 'Good night, Mum.' },
      { kim: 'anne', kosul: tekGun, metin: 'İyi geceler, oğlum. Kardeşini uyandırma.', en: 'Good night, son. Don\'t wake the baby.' },
      { kim: 'mehmet', kosul: ciftGun, metin: 'Hayırlı geceler, anne.', en: 'Sleep well, Mum.' },
      { kim: 'anne', kosul: ciftGun, metin: 'Sana da, yavrum. Yarın erken kalkacağız, uyuyalım hemen.', en: 'You too, love. We\'re up early tomorrow, let\'s get to sleep.' }
    ] },
    { id: 'aksam_bitis', satirlar: [
      { kim: 'ic', metin: 'Hava iyice karardı. Eve dönmeliyim.', en: 'It\'s gotten very dark. I should go home.' }
    ] },

    // ---------- Gece: ilk tutan tek satır ----------
    { id: 'gece', tekSatir: true, satirlar: [
      { kim: 'ic', kosul: ve(sofraBos, surum(0)), metin: 'Akşam sofrada yalnız ekmek vardı. Gece annem bidonla kuyuya indi. Görmedim sandı.', en: 'There was only bread on the table tonight. In the night Mum went down to the well with a jerrycan. She thought I didn\'t see.' },
      { kim: 'ic', kosul: ve(sofraBos, surum(1)), metin: 'Annem kendi payını önüme itti. Sonra bidonu alıp karanlıkta kuyuya yürüdü.', en: 'Mum pushed her share toward me. Then she took the jerrycan and walked to the well in the dark.' },
      { kim: 'ic', kosul: ve(sofraBos, surum(2)), metin: 'Kiler boş. Annem yine gece kuyuya indi. Kimseye söylemiyor, ben de söylemiyorum.', en: 'The pantry\'s empty. Mum went down to the well again tonight. She tells no one, and neither do I.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(0)), metin: 'Bugün kuyudan fazla çektik. Kimse bir şey demedi. Ben yine de kuyuya bakamadım.', en: 'We drew extra from the well today. Nobody said anything. I still couldn\'t look at the well.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(1)), metin: 'Bir kez daha fazla çektik. Bu sefer elim titremedi. Ona üzüldüm.', en: 'We drew extra again. This time my hand didn\'t shake. That\'s what upset me.' },
      { kim: 'ic', kosul: ve(fazlaCekildi, surum(2)), metin: 'Kuyunun önünden geçerken başımı çevirdim. Bir bidon daha diye diye.', en: 'I turned my head as I passed the well. One more jerrycan, I keep saying.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Son sepet de bitti. Annem "tokum" dedi. Tok değildi...', en: 'The last basket is gone too. "I\'m full," Mum said. She wasn\'t...' },
      { kim: 'ic', kosul: function (d) { return d.su.ertesiGunKesinti > 0; }, metin: 'Yarın iki bidon eksik olacak. Annem sordu. "Rıza Amca\'ya" dedim. Bir şey diyemedi, başını salladı.', en: 'Tomorrow we\'ll be two jerrycans short. Mum asked. "For Uncle Rıza," I said. She couldn\'t say anything, just nodded.' },
      { kim: 'ic', kosul: function (d) { return d.gosterge.keci <= KS.config.KECI.cokDusuk; }, metin: 'Gece ağıla baktım. {keci} başını kaldırmadı.', en: 'I checked the pen at night. {keci} didn\'t lift her head.' },
      { kim: 'ic', kosul: gunu(1), metin: 'İlk gün bitti. Yarın yine aynı pay. Yine yetmeyecek.', en: 'The first day is over. The same share tomorrow. It won\'t be enough again.' },
      { kim: 'ic', kosul: gunu(3), metin: 'Yarım metre. Yatağıma uzandım, kuyunun dibini düşündüm.', en: 'Half a meter. I lay in bed and thought about the bottom of the well.' },
      { kim: 'ic', kosul: gunu(4), metin: 'Sardunya hâlâ orada. Annem suyunu sormadı, ben de zaten söylemedim.', en: 'The geranium is still there. Mum didn\'t ask about the water, and I didn\'t say anyway.' },
      { kim: 'ic', kosul: ve(gunu(5), bilmiyor('A3')), metin: '"O adamı bir tek muhtar..." Muhtarla Rıza Amca\'nın arasında ne var?', en: '"Only the headman can..." What is there between the headman and Uncle Rıza?' },
      { kim: 'ic', kosul: gunu(5), metin: 'Babamın sesi kulağımda. Üç dakika konuştuk, tepeden inmesi bir saat sürdü.', en: 'Dad\'s voice is still in my ears. We talked three minutes, and it took an hour to get down the hill.' },
      { kim: 'ic', kosul: gunu(6), metin: 'Muhtar bana "dinletebilirsen dinlet" dedi. Bir çocuk Rıza Amca\'ya ne dinletir?', en: 'The headman told me "get him to listen if you can." What can a child get Uncle Rıza to listen to?' },
      { kim: 'ic', kosul: gunu(7), metin: 'Boş bidonla dönüşü gözümün önünden gitmiyor.', en: 'I can\'t stop seeing him going back with that empty jerrycan.' },
      { kim: 'ic', kosul: gunu(8), metin: 'Yarın toplantı var. Herkes evine erken çekildi. O çukur gözümün önünden gitmiyor.', en: 'There\'s a meeting tomorrow. Everyone went home early. I can\'t stop seeing that pit.' }
    ] },

    // ---------- Komşuyla karşılaşma ----------
    { id: 'kars_ilk', satirlar: [
      { kim: 'mehmet', metin: 'Rıza Amca, bir şey söyleyecektim.', en: 'Uncle Rıza, there\'s something I wanted to say.' },
      { kim: 'komsu', metin: 'Muhtar mı gönderdi seni? Söyle ona, benim işime karışmasın.', en: 'Did the headman send you? Tell him to stay out of my business.' }
    ] },
    { id: 'kars_bos', satirlar: [
      { kim: 'ic', metin: 'Ne desem bilemedim. Önce köydekilerle konuşmalıyım.', en: 'I didn\'t know what to say. I should talk to people in the village first.' },
      { kim: 'komsu', kosul: aksam, metin: 'Söyleyecek bir şeyin yoksa git işine.', en: 'If you\'ve got nothing to say, be on your way.' },
      { kim: 'komsu', kosul: ogle, metin: 'Çayını iç de git, evlat. Annen merak eder.', en: 'Drink your tea and go, lad. Your mother will worry.' }
    ] },
    { id: 'kars_vazgec', satirlar: [
      { kim: 'ic', metin: 'Bugün bir şey söylemedim. Belki başka zaman.', en: 'I didn\'t say anything today. Another time, maybe.' }
    ] },
    { id: 'kars_bos_obruk', satirlar: [
      { kim: 'ic', metin: 'Şimdi ne desem boş.', en: 'Whatever I say now is pointless.' },
      { kim: 'komsu', metin: 'Git, evlat. Burası tehlikeli.', en: 'Go, lad. It\'s dangerous here.' }
    ] },
    { id: 'kars_ikna_sonrasi', satirlar: [{ kim: 'komsu', metin: 'Bakarız dedim ya, evlat. Git şimdi.', en: 'I said we\'ll see, lad. Go now.' }] },
    { id: 'kars_ikna_sonrasi_obruk', satirlar: [
      { kim: 'komsu', metin: '(başını kaldırmadan) Bakarız demiştim. Bakacak tarla da kalmadı. Git, evlat.', en: '(without looking up) I said we\'ll see. There\'s no field left to see about. Go, lad.' }
    ] },
    { id: 'kars_ozur', satirlar: [
      { kim: 'komsu', metin: '(homurdanır) Bizim zamanımızda büyüğe öyle konuşulmazdı. Neyse. Ne diyecektin?', en: '(grumbles) In our day nobody talked to their elders like that. Anyway. What were you going to say?' }
    ] },
    { id: 'kars_geri_al', satirlar: [
      { kim: 'komsu', metin: '(derin nefes alır) Bugün kimseyle kavga edecek hâlim yok. Söyle.', en: '(takes a deep breath) I\'m in no state to fight with anyone today. Say it.' }
    ] },
    { id: 'kars_bir_arguman', satirlar: [
      { kim: 'komsu', metin: 'Laf çok, evlat. Bir laf ne değiştirir? Yeter bu kadar.', en: 'Words are cheap, lad. What does one word change? Enough.' },
      { kim: 'ekran', kosul: planVar, metin: 'Defter: Komşuyu ikna et 1/{gereken}', en: 'Notebook: Persuade the neighbor 1/{gereken}' }
    ] },
    { id: 'kars_ikna', satirlar: [
      { kim: 'komsu', metin: '(uzun süre susar) Muhtar mı gönderdi seni, doğru söyle.', en: '(silent for a long time) Did the headman send you, tell me straight.' },
      { kim: 'mehmet', metin: 'Muhtar amca "dinletebilirsen dinlet" dedi. O kimseyi dinlemez dedi. Ama bunları söylemek benim fikrimdi.', en: 'The headman said "get him to listen if you can." He said you listen to no one. But saying these things was my own idea.' },
      { kim: 'komsu', kosul: sonGunDegil, metin: 'Toplantı ne zaman?', en: 'When is the meeting?' },
      { kim: 'mehmet', kosul: gunu(KS.config.OBRUK_GUNU - 1), metin: 'Cuma akşamı, muhtarlıkta.', en: 'Friday evening, at the headman\'s office.' },
      { kim: 'mehmet', kosul: gunu(KS.config.OBRUK_GUNU), metin: 'Yarın akşam, muhtarlıkta.', en: 'Tomorrow evening, at the headman\'s office.' },
      { kim: 'komsu', kosul: sonGun, metin: 'Toplantı bu akşam mı?', en: 'The meeting\'s this evening?' },
      { kim: 'mehmet', kosul: sonGun, metin: 'Bu akşam, muhtarlıkta.', en: 'This evening, at the headman\'s office.' },
      { kim: 'komsu', metin: 'Bakarız. (arkasını döner, sonra durur) Bakarız dedim, git şimdi.', en: 'We\'ll see. (turns away, then stops) I said we\'ll see, now go.' },
      { kim: 'ekran', metin: 'Defter: Komşuyu ikna et ✓', en: 'Notebook: Persuade the neighbor ✓' }
    ] },
    { id: 'ikna_A1_nazik', satirlar: [
      { kim: 'komsu', metin: '(bir an durur) Söğüt... Herkes "Rıza\'nın söğüdü" derdi. (yüzünü çevirir) O dere çoktan gitti.', en: '(pauses) The willow... Everyone called it "Rıza\'s willow." (turns his face away) That stream is long gone.' },
      { kim: 'komsu', metin: 'Su gidince ağaç da gidiyor, insan da. Ne kaldı ki bu köyde tarlamdan başka?', en: 'When water goes, the trees go, and the people too. What\'s left in this village but my field?' }
    ] },
    { id: 'ikna_A1_kaba', satirlar: [
      { kim: 'komsu', metin: 'İdareyi sen mi öğreteceksin bana? Benim belgem var, devletten aldım. Kendi tarlamda kendi motorum var, istediğimi yaparım.', en: 'You\'re going to teach me to be sparing? I have a permit, from the state. My own motor in my own field, I\'ll do as I please.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.', en: 'Uncle Rıza won\'t listen on this anymore.' }
    ] },
    { id: 'ikna_A2_nazik', satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Obruk ovanın öbür ucunda olur. Bizim burada olmaz. (ama gözünü tarlasından ayıramaz)', en: 'Sinkholes happen at the other end of the plain. Not here. (but can\'t take his eyes off his field)' },
      { kim: 'ekran', kosul: obrukOncesi, metin: 'Rıza Amca buna şimdilik inanmıyor.', en: 'Uncle Rıza doesn\'t believe this yet.' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: '(çukura doğru bakar) Öğretmen söylemişti, değil mi? Ben dinlemedim.', en: '(looks toward the pit) The teacher said so, didn\'t she? I didn\'t listen.' }
    ] },
    { id: 'ikna_A2_kaba', satirlar: [
      { kim: 'komsu', kosul: obrukOncesi, metin: 'Öyle mi? Başka emrin var mı, velet?', en: 'Is that so? Any other orders, brat?' },
      { kim: 'komsu', kosul: obrukSonrasi, metin: 'Kırk yılın üstüne bir de senden mi dinleyeceğim? Defol.', en: 'Forty years, and now I\'m to hear it from you too? Get out.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.', en: 'Uncle Rıza won\'t listen on this anymore.' }
    ] },
    { id: 'ikna_A3_nazik', satirlar: [
      { kim: 'komsu', metin: '(sesi yumuşar) Neredeyse kırk gün taş taşıdık. Ellerimiz parçalandı resmen. (güler) Muhtar mı anlattı bunu?', en: '(his voice softens) Nearly forty days we hauled stone. Our hands were torn to pieces. (laughs) The headman told you that?' },
      { kim: 'komsu', kosul: function (d) { return !d.plan; }, metin: 'O sarnıç yıkıldı. Biz de... neyse.', en: 'That cistern fell apart. And we... anyway.' },
      { kim: 'komsu', kosul: planVar, metin: 'O sarnıç yıkıldı. Şimdi onaracaklarmış, duydum. Taş onarılır da... neyse.', en: 'That cistern fell apart. They\'re going to repair it now, I hear. Stone can be repaired, but... anyway.' }
    ] },
    { id: 'ikna_A3_kaba', satirlar: [
      { kim: 'komsu', metin: 'Benimle muhtarın arasına girme. Sen bilmezsin ne olduğunu. Senden eski konular bunlar.', en: 'Don\'t get between me and the headman. You don\'t know what happened. This is older than you.' },
      { kim: 'ekran', metin: 'Rıza Amca bu konuyu artık dinlemiyor.', en: 'Uncle Rıza won\'t listen on this anymore.' }
    ] },

    // ---------- Ortak ----------
    { id: 'ev_isi', mekan: 'avlu', satirlar: [
      { kim: 'anne', kosul: surum(0), metin: 'Mehmet, bugün bana yardım et. Tek başıma yetişemiyorum.', en: 'Mehmet, help me today. I can\'t manage alone.' },
      { kim: 'anne', kosul: surum(1), metin: 'Bu sabah da sana kaldı, oğlum. Elim ayağım tutmuyor.', en: 'It\'s on you again this morning, son. I can\'t lift a finger.' },
      { kim: 'anne', kosul: surum(2), metin: 'Önce eve bak bugün, Mehmet. Gerisi bekler.', en: 'See to the house first today, Mehmet. The rest can wait.' },
      { kim: 'ic', kosul: tekGun, metin: 'Çamaşır, bulaşık, kardeşimin bezi. Sonra ağıla, {keci} bekliyor.', en: 'Laundry, dishes, the baby\'s nappies. Then to the pen, {keci} is waiting.' },
      { kim: 'ic', kosul: ciftGun, metin: 'Çamaşır, bulaşık, kardeşimin bezi. Sonra bahçeyle ilgilenirim.', en: 'Laundry, dishes, the baby\'s nappies. Then I\'ll see to the garden.' }
    ] },
    { id: 'kuyu_uyari', mekan: 'kuyu_basi', satirlar: [
      { kim: 'ogretmen', ses: 'ip', kosul: sonGunDegil, metin: 'Bu sabah ip yine uzadı. Böyle giderse eylüle kuyu dibi görünür.', en: 'The rope got longer again this morning. At this rate we\'ll see the bottom by September.' },
      { kim: 'ogretmen', ses: 'ip', kosul: sonGun, metin: 'Bu sabah ip yine uzadı. Akşamki toplantı boşa gitmesin.', en: 'The rope got longer again this morning. Don\'t let tonight\'s meeting go to waste.' }
    ] },

    // ---------- Sonlar ----------
    { id: 'son_iyi_sarnic', mekan: 'sarnic', zaman: 'yagmur', mekanSecenek: function () { return { onarildi: true }; }, satirlar: [
      { kim: 'ic', ortam: 'yagmur', ses: 'oluk', metin: 'Sarnıcın oluğundan su akıyor. Muhtarla Rıza Amca yan yana duruyor, ikisi de ıslak ama önemsemiyor, ikisi de susuyor.', en: 'Water is running from the cistern\'s gutter. The headman and Uncle Rıza stand side by side, both wet and not minding, both silent.' },
      { kim: 'muhtar', metin: 'En son gençliğimizde böyle durmuştuk, hatırlıyor musun?', en: 'The last time we stood like this we were young, remember?' },
      { kim: 'komsu', metin: 'Hatırlıyorum. Sonra güç bela motoru aldım, sen de kâğıtlar düzgün değil diye peşime düştün.', en: 'I remember. Then I scraped together for the motor, and you came after me saying the papers weren\'t right.' },
      { kim: 'muhtar', metin: 'Kaç kere geldim kapına. "Rıza, bu iş böyle olmaz." "Rıza, ölçüsüz, habersiz çalıştırma, başına bir iş açacaksın."', en: 'How many times I came to your door. "Rıza, this won\'t do." "Rıza, don\'t run it unmetered and unreported, you\'ll bring trouble on yourself."' },
      { kim: 'komsu', metin: 'Ben de her seferinde "belgem var" dedim. Kapıyı yüzüne kapattım. Evleneceğim için para lazımdı, başka türlü kazanamam sandım.', en: 'And every time I said "I have a permit." I shut the door in your face. I was getting married and needed money, I thought there was no other way.' },
      { kim: 'muhtar', metin: 'Bir yıl böyle gitti, aramız da iyice açıldı. Sonunda dayanamadım, şikâyet yazdım.', en: 'A year it went on, and the gap between us grew. In the end I couldn\'t take it, and I filed a complaint.' },
      { kim: 'komsu', metin: 'Bütün köy duydu. Ona içerledim, kendi kendime yedirdim belki ama sonradan çok utandım, hata ettim.', en: 'The whole village heard. That stung, I swallowed it maybe, but later I was deeply ashamed. I was wrong.' },
      { kim: 'muhtar', metin: 'Haklıydım belki. Ama seni kaybetmeye değmezdi. Belki başka yol göstersem anlaşırdık.', en: 'Maybe I was right. But it wasn\'t worth losing you. Maybe if I\'d shown another way, we\'d have come to terms.' },
      { kim: 'komsu', metin: '(güler) Benim inadım da değmezdi. Çekindim anlatmaya, pek konuşkan değilim, bilirsin.', en: '(laughs) Nor was my stubbornness. I was too shy to explain, I\'m not much of a talker, you know.' },
      { kim: 'komsu', kosul: iletti('A3'), metin: '(Mehmet\'e bakar) Oluğu bana bu çocuk hatırlattı. Biraz da babasını anımsatıyor baksana...', en: '(glances at Mehmet) This boy reminded me of the gutter. He looks a bit like his father too, doesn\'t he...' },
      { kim: 'komsu', kosul: function (d) { return d.komsu.suGoturme > 0; }, metin: '(Mehmet\'i gösterir) Kuyuda sıraya geldim, önümü kapattılar, bana bidon getiren tek bu çocuk oldu. Babası da böyle bize su getirirdi. Biz hatamızdan döndük, daha geç olmadı, ama dünya böyle giderse Mehmet\'in çocuğu su taşıyabilir mi emin değilim.', en: '(points at Mehmet) I came to the well and they shut the line in front of me. This boy was the only one who brought me a jerrycan. His father brought us water the same way. We\'ve turned back from our mistake, it\'s not too late yet, but if the world goes on like this, I\'m not sure Mehmet\'s children will have water to carry.' },
      { kim: 'ogretmen', metin: 'Bir yağmurla bu sarnıç dolmaz. Yıllarca çektik, yıllarca bekleyeceğiz. Sorumsuz davrandık ama yetiştik, bir daha böyle şansımız olmayabilir.', en: 'One rain won\'t fill this cistern. We drew for years, we\'ll wait for years. We were irresponsible but we made it in time, we may not get another chance.' }
    ] },
    { id: 'son_iyi_ev', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: true }; }, satirlar: [
      { kim: 'ekran', ortam: 'damlama', muzik: 'iyi', metin: 'Köy çeşmesinden ilk damla.', en: 'The first drop from the village fountain.' },
      { kim: 'ic', metin: 'Az. Ama akıyor.', en: 'Not much. But it\'s flowing.' },
      { kim: 'ic', kosul: function (d) { return d.komsu.iletilen.indexOf('A1') >= 0; }, metin: 'Rıza Amca sarnıcın yanına bir söğüt dalı dikmiş.', en: 'Uncle Rıza has planted a willow cutting by the cistern.' },
      { kim: 'ic', kosul: iletti('A2'), metin: 'Öğretmen kuyuyu ölçerken ipi artık Rıza Amca tutuyor.', en: 'When the teacher measures the well now, Uncle Rıza holds the rope.' },
      { kim: 'ic', kosul: keciIyi, metin: '{keci} sabah sağıldı. Annem peynir mayalıyor.', en: '{keci} was milked this morning. Mum is making cheese.' },
      { kim: 'ic', kosul: kecidusuk, metin: '{keci} ayağa kalktı. Yavaş yavaş toparlanıyor.', en: '{keci} is on her feet. Recovering little by little.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem hâlâ yorgun. Ama bu sabah ilk kez gülümsedi.', en: 'Mum is still tired. But this morning she smiled for the first time.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Sofra hâlâ yoksul. Bu sabah kapıya bir tas bulgur bırakmışlar. Kimin bıraktığını sormadık.', en: 'The table is still poor. This morning someone left a bowl of bulgur at the door. We didn\'t ask who.' },
      { kim: 'ic', kosul: anneIndi, metin: 'Annem artık geceleri kuyuya inmiyor. O geceleri hiç konuşmadık.', en: 'Mum doesn\'t go down to the well at night anymore. We never talked about those nights.' },
      { kim: 'ic', metin: 'Pencere önündeki sardunya yeni yaprak vermiş. Annem hâlâ suyunu sormadı.', en: 'The geranium on the windowsill has a new leaf. Mum still hasn\'t asked about the water.' },
      { kim: 'baba', ses: 'kapi', metin: '(Heyecanlı ve hüzünlü bir sesle) Bugün yetişemeyeceğim sandım, sizi çok özledim.', en: '(in an excited, tearful voice) I thought I wouldn\'t make it today, I\'ve missed you all so much.' },
      { kim: 'ic', metin: 'Koştum, sarılıp gözlerimi kapattım. Bir şey diyemedim. Annem kardeşimi ona uzattı.', en: 'I ran, hugged him and shut my eyes. I couldn\'t say a thing. Mum held the baby out to him.' },
      { kim: 'baba', metin: 'Kocaman olmuşsunuz, iyi bakmışsın annene, Mehmet, koca adam olmuşsun. {keci} nasıl?', en: 'You\'ve grown so big, you\'ve looked after your mother well, Mehmet, you\'re a grown man. How\'s {keci}?' },
      { kim: 'mehmet', kosul: keciIyi, metin: '(Gururlu bir tebessümle) Süt veriyor, önceki haftalardan çok daha iyi, baba. Gel görmeye gidelim.', en: '(with a proud smile) She\'s giving milk, far better than the last few weeks, Dad. Let\'s go and see her.' },
      { kim: 'mehmet', kosul: kecidusuk, metin: '(Gururlu ama buruk bir tebessümle) Ayağa kalktı ama hâlâ zayıf, baba. Ağılda duruyor.', en: '(with a proud but sad smile) She\'s on her feet but still weak, Dad. She\'s in the pen.' },
      { kim: 'baba', metin: 'Muhtar anlattı. Rıza\'nın kapısına gitmişsin.', en: 'The headman told me. You went to Rıza\'s door.' },
      { kim: 'mehmet', metin: 'Biri gitmeliydi, biri denemeliydi.', en: 'Someone had to go, someone had to try.' },
      { kim: 'baba', metin: 'Ben gidemedim. Yıllarca duvar duvara oturduk, birkaç kez kovdu diye gidemedim.', en: 'I couldn\'t. Years living wall to wall, and I couldn\'t, because he\'d sent me away a few times.' },
      { kim: 'ic', metin: 'Babam gittiği şehirde düzgün bir iş bulamamış. Ama köyde iş var artık, tarlamızı az da olsa ekebileceğiz.', en: 'Dad didn\'t find a decent job in the city. But there\'s work in the village now, and we can plant our field, even if only a little.' },
      { kim: 'ekran', ses: 'bebek_gul', metin: 'Zor ama birlikte kaldık, geç kalsaydık ne biz kalacaktık ne de insanlığımız.', en: 'Hard, but we stayed together. If we\'d been too late, neither we nor our humanity would have remained.' }
    ] },
    { id: 'son_kotu_avlu', mekan: 'avlu', zaman: 'sabah', mekanSecenek: function () { return { yesil: false }; }, satirlar: [
      { kim: 'ekran', kosul: ikna, metin: 'Plan kabul edildi. Ama kuyu artık çok aşağılara inmişti.', en: 'The plan passed. But the well had already dropped too far.' },
      { kim: 'ekran', metin: 'Eylülde köy kuyusu dibini gösterdi.', en: 'In September the village well showed its bottom.' },
      { kim: 'ic', kosul: iknaDegil, metin: 'Rıza Amca\'nın motoru da o hafta sustu. Çünkü çekecek su kalmamıştı.', en: 'Uncle Rıza\'s motor fell silent that same week. Because there was no water left to draw.' },
      { kim: 'anne', metin: 'Kamyon gelmiş. Eşyalar hazır mı?', en: 'The truck\'s here. Are the things ready?' },
      { kim: 'ic', metin: 'Babam zor da olsa gittiği şehirde bir oda bulmuş. Hepimiz oraya gideceğiz.', en: 'Dad has barely managed to find a room in the city. All of us are going there.' },
      { kim: 'ic', metin: 'Yol parası lazımdı. En iyi arkadaşımın ipini pazarcıya kendim uzattım. {keci} dönüp baktı. Ben bakamadım.', en: 'We needed the fare. I handed my best friend\'s rope to the market trader myself. {keci} looked back. I couldn\'t look.' },
      { kim: 'ic', metin: 'Annem sardunyayı pencerede bıraktı. Bir şey demedi. Belki köydeki umutlarını o çiçeğe bağlamıştı, köyle beraber umutlarımız da geride kaldı.', en: 'Mum left the geranium on the windowsill. She said nothing. Maybe she had tied her hopes for the village to that flower. Our hopes stayed behind with the village.' },
      { kim: 'ic', kosul: evDusuk, metin: 'Annem günlerdir konuşmuyor. Bizim için endişeleniyor, kendisi de hiç iyi değil. Kardeşimin ağlamaları kesilmedi.', en: 'Mum hasn\'t spoken for days. She worries about us, and she isn\'t well herself. The baby won\'t stop crying.' },
      { kim: 'ic', kosul: kilerBos, metin: 'Son günlerde sofrada ekmekten başka bir şey yoktu. Ben alıştım ama kardeşim daha ekmek yiyemiyor. Annem de iyi beslenemiyor...', en: 'These last days there was nothing on the table but bread. I got used to it, but the baby can\'t eat bread yet. Mum isn\'t eating well either...' }
    ] },
    { id: 'son_kotu_yol', mekan: 'koy_cikisi', zaman: 'ogle', satirlar: [
      { kim: 'ic', muzik: 'kotu', sesSoner: ['kamyon', 'bebek_agla'], metin: 'Fatma Teyze\'yle Hasan Amca kapının önündeydi. El salladılar bize. Onlar gitmiyor. Nereye gitsinler köyden başka bir evleri yok?', en: 'Aunt Fatma and Uncle Hasan were at their door. They waved to us. They aren\'t leaving. Where would they go, with no home but the village?' },
      { kim: 'ic', kosul: suGoturdu, metin: 'Rıza Amca yol kenarındaydı, elinde bizim bidon. Kamyon geçerken başını eğdi.', en: 'Uncle Rıza was by the road with our jerrycan in his hand. He bowed his head as the truck passed.' },
      { kim: 'ic', metin: 'Kardeşim ağlamaktan yoruldu; kamyon sallandıkça annemin kucağında uyudu.', en: 'The baby cried until worn out, and fell asleep in Mum\'s arms as the truck swayed.' },
      { kim: 'ic', metin: 'Uzaktan şehir gözükmeye başladı. Dumanın altında karanlık ve gri.', en: 'The city came into view in the distance. Dark and gray under the smoke.' },
      { kim: 'ic', metin: 'Radyoda duydum, \'sıcaklık giderek yükseliyor, katı önlemler uygulanacak\'. Öğretmenim aylar öncesinden söylemişti, neden şimdi uygulanıyor?', en: 'I heard on the radio, "temperatures keep rising, strict measures will be taken." My teacher said so months ago, why are they doing it only now?' },
      { kim: 'ic', metin: 'Babam otogarda bekleyecekmiş. "Her şey yoluna girecek" dedi telefonda. Sesi yine yorgundu. Bu sefer yalan söylediğini anladım.', en: 'Dad will wait at the bus station. "Everything will work out," he said on the phone. He sounded tired again. This time I knew he was lying.' }
    ] },
    { id: 'son_kotu_sarnic', mekan: 'sarnic', zaman: 'yagmur', satirlar: [
      { kim: 'ekran', kosul: iknaDegil, metin: 'Kırık sarnıca ve boş avluya yağmur yağdı.', en: 'Rain fell on the broken cistern and the empty yard.' },
      { kim: 'ekran', kosul: iknaDegil, metin: 'Yağmuru tutacak sarnıç kalmamıştı. Artık her şey için çok geç.', en: 'There was no cistern left to hold the rain. It\'s too late for everything now.' },
      { kim: 'ekran', kosul: ikna, metin: 'Yarım kalan sarnıca ve boş avluya yağmur yağdı.', en: 'Rain fell on the half-repaired cistern and the empty yard.' },
      { kim: 'ekran', kosul: ikna, metin: 'Köyde onarmayı yapabilecek kimse kalmamıştı. Artık her şey için çok geç.', en: 'There was no one left in the village to repair it. It\'s too late for everything now.' }
    ] }
  ];

  KS.SONLAR = {
    iyi: ['son_iyi_sarnic', 'son_iyi_ev'],
    kotu: ['son_kotu_avlu', 'son_kotu_yol'],
    kotuYagmur: ['son_kotu_sarnic']   // "İlk yağmur" kartından sonra
  };

  // Haritada yapılacak bir şey olmayan yerler: zaman harcamayan kısa düşünce. İlk tutan gösterilir.
  function ogle(d) { return d.dilim === 'ogle'; }
  function aksam(d) { return d.dilim === 'aksam'; }
  KS.YER_DUSUNCELERI = [
    { yer: 'yasliCift', kosul: ogle, metin: 'Öğlen sıcağında Hasan Amca uyur. Rahatsız etmeyeyim.', en: 'At midday Uncle Hasan naps. I won\'t disturb him.' },
    { yer: 'yasliCift', metin: 'Işıkları sönmüş, uyumuşlar sanırım. Rahatsız etmeyeyim.', en: 'Their lights are out, they must be asleep. I won\'t disturb them.' },
    { yer: 'muhtar', kosul: ogle, metin: 'Muhtarlığın kapısı kapalı. Muhtar akşamları burada olur.', en: 'The office door is closed. The headman is here in the evenings.' },
    { yer: 'muhtar', metin: 'Muhtar içeride, başı kâğıtlarda. Şimdilik söyleyecek bir şeyim yok.', en: 'The headman\'s inside, buried in papers. I\'ve nothing to say to him for now.' },
    { yer: 'ogretmen', kosul: ogle, metin: 'Okul kilitli. Öğretmen sabahları kuyuda, akşamları burada olur.', en: 'The school is locked. The teacher is at the well in the mornings, here in the evenings.' },
    { yer: 'ogretmen', metin: 'Okulun ışığı yanıyor ama defterlerine gömülmüştür. Şimdi bölmeyeyim.', en: 'The school light is on, but she\'ll be deep in her notebooks. I won\'t interrupt.' },
    { yer: 'komsu', kosul: ikna, metin: 'Rıza Amca "bakarız" dedi. Şimdi üstüne gitmeyeyim.', en: 'Uncle Rıza said "we\'ll see." I won\'t push him now.' },
    { yer: 'komsu', kosul: function (d) { return ogle(d) && d.gun < KS.config.KOMSUYA_SU.ilkGun; }, metin: 'Kapısını çalmak için bir bahanem yok.', en: 'I have no excuse to knock on his door.' },
    { yer: 'komsu', kosul: ogle, metin: 'Rıza Amca\'nın kapısı kapalı. Bugün yeniden gitmenin anlamı yok.', en: 'Uncle Rıza\'s door is closed. No point going again today.' },
    { yer: 'komsu', metin: 'Motorun sesinden başka ses yok. Kapısını çalacak bir sözüm yok şimdi.', en: 'Nothing but the sound of the motor. I\'ve got no reason to knock right now.' },
    { yer: 'komsuTarlasi', kosul: function (d) { return obrukSonrasi(d) && d.bayraklar.motorKapali; }, metin: 'Çukurun çevresine ip çekmişler. Motor susmuş. Yaklaşmayayım.', en: 'They\'ve strung a rope around the pit. The motor has stopped. I\'ll keep away.' },
    { yer: 'komsuTarlasi', kosul: obrukSonrasi, metin: 'Çukurun çevresine ip çekmişler. Motor yine çalışıyor. Yaklaşmayayım.', en: 'They\'ve strung a rope around the pit. The motor is still running. I\'ll keep away.' },
    { yer: 'komsuTarlasi', metin: 'Motor gürül gürül çalışıyor. Başkasının tarlasında işim yok.', en: 'The motor is roaring. I\'ve no business in someone else\'s field.' },
    { yer: 'kuyu', kosul: ogle, metin: 'Bugünkü payımızı aldık. Sırayı boşuna uzatmayayım.', en: 'We\'ve had our share today. No use making the line longer.' },
    { yer: 'kuyu', metin: 'Kuyu başı boşaldı. Bu saatte su çekene iyi gözle bakmazlar.', en: 'The well\'s deserted. They don\'t look kindly on anyone drawing water at this hour.' },
    { yer: 'sarnic', kosul: function (d) { return d.plan; }, metin: 'Sarnıcın önüne taş yığmışlar. Büyükler çalışıyor, ayak altında dolaşmayayım.', en: 'They\'ve piled stones by the cistern. The grown-ups are working, I won\'t get underfoot.' },
    { yer: 'sarnic', kosul: aksam, metin: 'Karanlıkta oraya çıkılmaz.', en: 'Nobody goes up there in the dark.' },
    { yer: 'sarnic', metin: 'Yukarıdaki eski sarnıç. Bu sıcakta oraya kadar çıkmaya değmez.', en: 'The old cistern up there. Not worth the climb in this heat.' },
    { yer: 'tepe', kosul: aksam, metin: 'Hava kararırken tepeye çıkılmaz.', en: 'Nobody climbs the hill as it gets dark.' },
    { yer: 'tepe', kosul: function (d) { return d.bayraklar.babaArandi; }, metin: 'Babamla konuştum. Bir daha aramaya kontör de yok.', en: 'I\'ve talked to Dad. There\'s no credit to call again anyway.' },
    { yer: 'tepe', metin: 'Telefon burada çeker ama babam bu saatte iş peşindedir. Sonra denerim.', en: 'There\'s a signal here, but Dad will be out looking for work at this hour. I\'ll try later.' },
    { yer: '*', metin: 'Burada şimdilik işim yok.', en: 'Nothing for me here for now.' }
  ];

  KS.yerDusuncesi = function (yer, d) {
    var bulunan = KS.YER_DUSUNCELERI.filter(function (o) {
      return (o.yer === yer || o.yer === '*') && (!o.kosul || o.kosul(d));
    })[0];
    return KS.metinSec(bulunan);
  };

  // Komşuya söylenecekler: her argümanın iki tonu. Sıra bilerek karışık; nazik hep önde olmasın.
  KS.IKNA_SECENEK = {
    A1: [
      { ton: 'kaba', metin: 'Eskiden dere vardı. Herkes biraz idareli olsaydı hâlâ akardı.', en: 'There used to be a stream. If everyone had been a bit sparing, it would still run.' },
      { ton: 'nazik', metin: 'Hasan Amca anlattı, eskiden muhtarlığın önünden dere akarmış. Siz söğüdün dalından atlarmışsınız.', en: 'Uncle Hasan told me a stream used to run past the headman\'s office. And that you jumped from the willow\'s branch.' }
    ],
    A2: [
      { ton: 'kaba', kosul: obrukOncesi, metin: 'En doğrusu şu motoru hemen kapatmanız.', en: 'The best thing is to shut that motor off right now.' },
      { ton: 'nazik', kosul: obrukOncesi, metin: 'Zeynep Öğretmen ölçtü, kuyu bir ayda yarım metre inmiş. Toprağın altı boşalıyormuş, obruk açılabilirmiş.', en: 'Ms. Zeynep measured it, the well dropped half a meter in a month. The ground below is hollowing out, a sinkhole could open.' },
      { ton: 'nazik', kosul: obrukSonrasi, metin: 'Öğretmen "Tek motorun işi değil" dedi. Hepimiz çektikçe sıra birinin tarlasına geliyormuş. İklim değişiyor, bir de bilinçsiz kaynak harcamasıyla dünya iyice kötüye gidiyormuş.', en: 'The teacher said "it\'s not one motor\'s doing." As we all draw, it comes to someone\'s field. The climate is changing, and careless use of resources is making the world much worse.' },
      { ton: 'kaba', kosul: obrukSonrasi, metin: 'Görüyorsunuz işte olanı. En doğrusu artık motoru kapatmanız.', en: 'See what happened? The best thing now is to shut the motor off.' }
    ],
    A3: [
      { ton: 'nazik', metin: 'Muhtar amca anlattı. Gençliğinizde sarnıcın oluğunu beraber çakmışsınız.', en: 'The headman told me. When you were young you laid the cistern\'s gutter together.' },
      { ton: 'kaba', metin: 'Muhtar amca sizi hâlâ düşünüyor. Gidip tekrar konuşsanız ne olur?', en: 'The headman still thinks of you. What if you went and talked again?' }
    ]
  };
  KS.IKNA_METIN = {
    soru: { kim: 'ic', metin: 'Ne diyeyim?', en: 'What should I say?' },
    gec: { metin: '(Bu konuyu açmayayım.)', en: '(I won\'t bring this up.)' },
    ozurSoru: { kim: 'ic', metin: 'Geçen sefer ağzımdan çıkanı düzeltmeliyim.', en: 'I should take back what I said last time.' },
    ozur: { metin: 'Geçen sefer yanlış konuştum, kusura bakmayın.', en: 'I spoke wrongly last time, please forgive me.' },
    ozurGec: { metin: '(Bir şey demeyeyim.)', en: '(I\'ll say nothing.)' },
    geriAlSoru: { kim: 'ic', metin: 'Bugün olmaz. Onca şeyden sonra bugün olmaz.', en: 'Not today. After all that, not today.' },
    geriAl: { metin: 'Dur, öyle demek istemedim. Özür dilerim, Rıza Amca.', en: 'Wait, I didn\'t mean that. I\'m sorry, Uncle Rıza.' },
    geriAlGec: { metin: '(Sus.)', en: '(Keep quiet.)' }
  };

  KS.olayGetir = function (id) {
    for (var i = 0; i < KS.OLAYLAR.length; i++) if (KS.OLAYLAR[i].id === id) return KS.OLAYLAR[i];
    console.warn('Olay yok:', id);
    return null;
  };

  // O gün ve dilimde gösterilecek olaylar, tablodaki sırayla.
  KS.olaylariGetir = function (gun, dilim, d) {
    return KS.OLAYLAR.filter(function (o) {
      return o.gun === gun && o.dilim === dilim && (!o.kosul || o.kosul(d));
    });
  };

  // Akşam ziyaretinde oynayacak olaylar. r: KS.aksamZiyaret sonucu.
  KS.ziyaretOlaylari = function (kim, d, r) {
    return KS.OLAYLAR.filter(function (o) { return o.ziyaret === kim && o.kosul(d, r); });
  };

  KS.sonOlaylari = function (ad) {
    return KS.SONLAR[ad].map(KS.olayGetir);
  };

  // Yüklenirken çalışır: eksik sonraki hedefi, tanımsız bayrak, eksik karakter, metni olmayan sabit olay.
  KS.storyDogrula = function () {
    var uyarilar = [];
    var ids = KS.OLAYLAR.map(function (o) { return o.id; });
    var bayraklar = KS.yeniDurum().bayraklar;
    function etkiDenetle(kaynak, oge) {
      for (var b in oge.bayraklar || {}) if (!(b in bayraklar)) uyarilar.push(kaynak + ': tanımsız bayrak ' + b);
      var e = oge.etkiler || {};
      if (e.arguman && KS.config.ARGUMANLAR.indexOf(e.arguman) < 0) uyarilar.push(kaynak + ': bilinmeyen argüman ' + e.arguman);
    }
    KS.OLAYLAR.forEach(function (o) {
      if (o.sonraki && ids.indexOf(o.sonraki) < 0) uyarilar.push(o.id + ': eksik sonraki ' + o.sonraki);
      o.satirlar.forEach(function (s) {
        if (!KS.KARAKTERLER[s.kim]) uyarilar.push(o.id + ': tanımsız karakter ' + s.kim);
        [s.ses, s.ortam].concat(s.sesSoner || []).forEach(function (id) {
          if (id && !KS.config.SES.liste[id]) uyarilar.push(o.id + ': tanımsız ses ' + id);
        });
      });
      etkiDenetle(o.id, o);
      (o.secenekler || []).forEach(function (sc) {
        if (sc.sonraki && ids.indexOf(sc.sonraki) < 0) uyarilar.push(o.id + ': eksik sonraki ' + sc.sonraki);
        etkiDenetle(o.id, sc);
      });
    });
    KS.config.SABIT_OLAYLAR.forEach(function (o) {
      if (ids.indexOf(o.id) < 0) uyarilar.push('metni olmayan sabit olay: ' + o.id);
    });
    KS.config.ARGUMANLAR.forEach(function (a) {
      ['nazik', 'kaba'].forEach(function (ton) {
        if (ids.indexOf('ikna_' + a + '_' + ton) < 0) uyarilar.push('eksik ikna olayı: ' + a + ' ' + ton);
      });
    });
    Object.keys(KS.SONLAR).forEach(function (s) {
      KS.SONLAR[s].forEach(function (id) { if (ids.indexOf(id) < 0) uyarilar.push('eksik son olayı: ' + id); });
    });
    uyarilar.forEach(function (u) { console.warn('story.js:', u); });
    return uyarilar;
  };
  KS.storyDogrula();
})();

if (typeof module !== 'undefined') module.exports = KS;
