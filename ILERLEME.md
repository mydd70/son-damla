# İlerleme

Son güncelleme: 31 Ekim 2026 akşamı. Ayrıntılı devir notu ve açık konular: `YENI_OTURUM_BASLANGIC.md`.

| İş | Durum |
|---|---|
| Aşama 0: yerel kurulum | Bitti, `asama-0` |
| Aşama 1: sabitler, mantık, simülasyon | Bitti, `asama-1`, sonuçlar `sim/SONUC.md` |
| Veri doğrulama | Bitti: `referans/VERILER.md` |
| Aşama 2: ana iskelet, dil altyapısı | Bitti, `asama-2` |
| Aşama 3: mini oyunlar, zorunlu ev işi | Bitti, `asama-3` |
| İlk yayın | Bitti: https://mydd70.github.io/koyumun-suyu/ (depo mydd70/koyumun-suyu) |
| Aşama 4: olaylar, ikna, defter, toplantı, sonlar | Bitti, `asama-4` |
| Aşama 5: kayıt, öğretici, atlama, ses altyapısı, tam ekran, dil seçimi | Bitti, `asama-5` |
| Aşama 6: sahneler, renk filtresi | Bitti, `asama-6` |
| Oynanış paketi (dilim düğmesi, gün planı, gri su satırı, ipucu penceresi, harita düşünceleri, ikna kuralları, gün 7 sahnesi) | Bitti, etiketsiz |
| Denge ve akış paketi (kademeli su etkisi, kiler dengesi, sofra önizlemesi, her gün mini oyun, zaman kartı, selam ve sohbetler) | Bitti, etiketsiz, yayında (`0f2563f`) |
| Hikâye incelemesi (boşluklar, mısır tarlası, diyalog düzeltmeleri, su ipucu, öğle vedası) | Bitti ve yayında; **metin henüz kullanıcı onayından geçmedi**, değişebilir |
| Aşama 7: metin | **Devam ediyor.** Kullanıcı metni kesinleştirecek, sonra İngilizce çeviri |
| Aşama 8: görsel | **Devam ediyor.** 12 arka plan ve 8 portre bağlı (commit edildi); keçi, ot, ampul ve ikonlar bekleniyor |
| Sesler ve müzik | Bağlı, 25 dosya `assets/audio/`, commit edildi; 3 NC lisanslı ses şimdilik kalıyor, ödül ya da kâr amacı olursa değişecek |
| Aşama 9: test ve son yayın | Başlamadı |

Sıradaki: kullanıcı "metin hazır" der, farklar `js/story.js`'e aktarılır, commit ve yayın için onay alınır. Çeviriden önce kullanıcıya hatırlatılır: final metni, karakter adları, oyunun İngilizce adı kesinleşmeli. Sonra Aşama 7 çeviri, Aşama 8 görsel, Aşama 9 son testler.

## Görsel durumu
- Yeni görsel eklemek: WebP'ye çevir, `assets/img/` ya da `assets/portraits/` altına koy, `config.js`'te `GORSEL.dosyalar` / `PORTRE.dosyalar` listesine ekle, `KAYNAKLAR.md`'ye yaz.
- Kaynak PNG'ler `gptgörselleri/` altında, depoya girmez.

## Ses dosyaları
`assets/audio/<ad>.mp3` olarak konur; eksik olan sessiz geçer.
- Belgedekiler: `ruzgar`, `cirkir`, `yagmur`, `bebek_agla`, `bebek_gul`, `keci`, `kamyon`
- Taslaktaki ek ipuçları: `telefon`, `hat_kesilir`, `gurultu`, `kapi`
