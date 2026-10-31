# İlerleme

Son güncelleme: 31 Ekim 2026, Aşama 6 bitti.

| İş | Durum |
|---|---|
| Aşama 0: yerel kurulum (GitHub yok) | Bitti, etiket `asama-0` |
| Aşama 1: sabitler, mantık, simülasyon | Bitti, etiket `asama-1`, sonuçlar `sim/SONUC.md` |
| SVG referans sahneleri + PNG + promptlar | Bitti: `js/scenes.js`, `referans/sahneler/`, `referans/PROMPTLAR.md` |
| Veri doğrulama | Bitti: `referans/VERILER.md` |
| Diyalog taslağı | Bitti: `taslak/DIYALOGLAR.md` |
| Aşama 2: ana iskelet, dil altyapısı | Bitti, etiket `asama-2` |
| Aşama 3: ot yolma, keçi bakımı, zorunlu ev işi, Hızlı geç | Bitti, etiket `asama-3` |
| İlk yayın | Bitti: https://mydd70.github.io/koyumun-suyu/ (depo: mydd70/koyumun-suyu) |
| Aşama 4: tüm olaylar, ikna, defter, toplantı, iki son | Bitti, etiket `asama-4` |
| Aşama 5: kayıt, öğretici, atlama, ses altyapısı, tam ekran, yön uyarısı, dil seçimi | Bitti, etiket `asama-5` |
| Aşama 6: sahneler oyun durumuna bağlandı, harita ve yağmur ışığı | Bitti, etiket `asama-6` |
| Aşama 8 (devam ediyor): yükleme kodu ve 9 arka plan | Bağlandı |

Sıradaki: Aşama 7 (son metinler, ardından İngilizce çeviri), kullanıcının okumasıyla.

## Görsel durumu
- Bekleyen arka planlar: `sarnic`, `sarnic_onarildi` (güneşsiz), `koy_yolu` (eksik). Gelene kadar SVG.
- Yeniden üretilecekler: `yasli_cift_evi` (üzümsüz), isteğe bağlı `koy_cikisi` (piksel tarzı).
- Portreler bekleniyor. Yeni görsel eklemek: WebP'ye çevir, `assets/img/` ya da `assets/portraits/` altına koy, `config.js`'te `GORSEL.dosyalar` / `PORTRE.dosyalar` listesine ekle, `KAYNAKLAR.md`'ye yaz.
- Kaynak PNG'ler `gptgörselleri/` altında, depoya girmez.

## Ses dosyaları
`assets/audio/<ad>.mp3` olarak konur; eksik olan sessiz geçer.
- Belgedekiler: `ruzgar`, `cirkir`, `yagmur`, `bebek_agla`, `bebek_gul`, `keci`, `kamyon`
- Taslaktaki ek ipuçları: `telefon`, `hat_kesilir`, `gurultu`, `kapi`

## Kullanıcının karar vereceği konular
- Metin hacmi yaklaşık 1.900 kelime, hedef 4-5 bindi: uzatılsın mı?

## Bilinen küçük konular
- Anne ipucu duruma göre seçiliyor; aynı cümle ardışık akşamlarda tekrar edebilir.
- `d.gun % 2` (tek gün keçi, çift gün ot) `logic.js` içinde kaldı: oyunun yapısı, denge sayısı değil.
