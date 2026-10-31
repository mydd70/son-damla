# Sabah raporu – 31 Ekim 2026

Gece planlanan beş işin hepsi bitti. Her iş ayrı commit'te; geri almak istediğin olursa git geçmişinden dönülebilir.

## Bitenler
| İş | Nerede |
|---|---|
| Aşama 0: proje iskeleti (yerel, GitHub yok) | kök klasör, etiket `asama-0` |
| Aşama 1: sabitler, durum, kurallar, simülasyon | `js/config.js`, `js/state.js`, `js/logic.js`, `sim/`, etiket `asama-1` |
| SVG sahneler (9 mekân + harita) | `js/scenes.js` |
| ChatGPT için referans PNG'ler ve promptlar | `referans/sahneler/`, `referans/PROMPTLAR.md` |
| Veri doğrulama | `referans/VERILER.md` |
| Diyalog taslağı (~2.700 kelime) | `taslak/DIYALOGLAR.md` |

## Simülasyon özeti
Tam tablo `sim/SONUC.md` dosyasında. Yeniden çalıştırmak için: `node sim/simulate.js`

| Profil | Kuyu (eşik 35) | Sonuç |
|---|---|---|
| Dikkatli, güçlü plan | 45 | İyi |
| Dikkatli + 2 fazla çekme | 35 | İyi (sınırda) |
| Dikkatli + 3 fazla çekme | 30 | Kötü |
| Gecikmeli plan | 37 | İyi (sınırda) |
| Gecikmeli plan + 1 fazla çekme | 32 | Kötü |
| Dikkatli + 1 kabalık (özürle) | 45 | İyi |
| Her gün fazla çeken | 0 | Kötü |
| Pasif | 34 | Kötü (komşu, kuyu, geç ölçüm) |

2000 rastgele oyuncunun %29'u iyi sona ulaşıyor. Pasif oyuncuda keçi hasta kalıyor, kiler boşalıyor, ev düşüyor; dikkatli oyuncuda hepsi toparlanıyor.

## Gözden geçirmeni istediğim yorum kararları
Tasarım kararlarını değiştirmedim; aşağıdakiler belgenin taslak bıraktığı ya da belirsiz kalan yerlerde verdiğim kararlar. Uymayan varsa söyle, geri alınması kolay.

1. **Sayılar sertleştirildi.** İlk simülasyonda pasif oyuncu bile her göstergeyi 10'a çıkarıyordu, yani ekonomide hiç gerilim yoktu. Yapılanlar:
   - Su payları 1'er damla azaltıldı (11 → 7).
   - Su yetmezse göstergeler artık düşüyor: 1 damla eksik −1, daha fazlası −2. Önceki kuralda biraz eksik kalınca hiçbir şey olmuyordu.
   - Aile vakti +2'den +1'e indi.

   Kuyu sayıları değişmedi; belgedeki kontrol tablosu aynen tutuyor. Tasarım belgesi buna göre güncellendi (bölüm 5 ve 7).
2. **Kuyu düşüşü gün sonunda uygulanıyor,** belgede "her sabah" yazıyordu. Plan gün 6 öğle kurulduğu için o günün düşüşüne ancak böyle yansıyabiliyor. Sonuçlar aynı.
3. **Ölçüm teslimi:** Gün 3-5 arasında ölçüm elindeyken muhtarı ziyaret etmek otomatik olarak teslim sayılıyor ve ziyaret hakkı harcanmıyor.
4. **Geçici isimler:** Hasan Dede, Fatma Nine, Rıza Amca (komşu), Zeynep Öğretmen. İstersen değiştir.
5. **COP31 adı diyalogda geçmiyor.** Oyun Ağustos 2025'te geçiyor ve o tarihte ev sahibi henüz belli değildi. Öğretmen "dünyanın her yerinde aynı dert konuşuluyor" diyor; COP31 bağlantısı final metninde ve sunumda kurulabilir.
6. **İki veri düzeltmesi** (`referans/VERILER.md`):
   - "Son 65 yılın en kurak dönemi" Türkiye geneli için söylenmiş (Ağustos 2024 – Temmuz 2025), Konya için değil. Diyalogda buna uygun ifade kullanıldı.
   - Obrukların ana nedeni jeolojik; yeraltı suyunun düşmesi önemli bir etken. Öğretmenin cümlesi buna göre yazıldı.
7. **İki son da "Ekim. İlk yağmur." zaman atlamasıyla başlıyor.** Ağustosta yağmur yağması tuhaf kaçıyordu; bu atlama yağmur sahnelerini doğal kılıyor.
8. **Küslüğün sebebi** iyi sonda açılıyor: muhtar seksen dokuzdan sonra Rıza'nın kuyusu için şikâyet yazmış.

## Senin yapacakların
1. `koyumun-suyu.zip` dosyasını aç. İçindeki `koyumun-suyu` klasörü projenin kendisi; gizli `.git` klasörü dahil. Bundan sonra Claude Code'u bu klasörde çalıştır.
2. `taslak/DIYALOGLAR.md` dosyasını boş anlarında oku; düzeltmelerini doğrudan dosyaya yaz.
3. Görseller: `referans/PROMPTLAR.md` dosyasındaki adımları izle. Dosyaları belirtilen adlarla `assets/img/` ve `assets/portraits/` klasörlerine koy.
4. Claude Code'da `YENI_OTURUM_BASLANGIC.md` içindeki başlangıç mesajını yapıştır. GitHub deposu ve yayın Aşama 2'nin sonunda senin onayınla yapılacak.

## Bilinen sınırlar
- `js/scenes.js` hazır, ama oyunda henüz kullanılmıyor; arayüz Aşama 2'de bağlanacak.
- Diyaloglar düz metin; story.js'e Aşama 4'te aktarılacak.
- 6111 sayılı kanunun yılı (2011) dolaylı olarak doğrulandı; sunumda kullanmadan önce Resmî Gazete tarihine bir kez bakılmalı.
