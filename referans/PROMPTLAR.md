# Görsel üretim promptları

## Nasıl kullanılır
1. ChatGPT'de **tek bir sohbet** aç ve bütün mekânları aynı sohbette üret. Yeni sohbet açarsan tutarlılık düşer.
2. İlk mesajda iki görsel yükle: anne portresi (tarz ve palet için) ve `sahneler/avlu.png` (düzen için). Ortak tarz bloğunu ve avlu promptunu yapıştır.
3. Sonraki mekânlarda yalnızca o mekânın PNG'sini yükle ve "Aynı köy, aynı tarz ve palet. Şimdi:" diye başlayıp mekân promptunu yapıştır.
4. Yalnızca öğle ışığında üret. Sabah ve akşam tonlarını oyun kodla ekliyor (`sahneler/ornek_avlu_sabah.png` ve `ornek_avlu_aksam.png` örnek).
5. **Güncel:** Ham PNG'yi `gptgörselleri/` klasörüne koy, Claude inceleyip WebP'ye çevirerek `assets/img/` altına tablodaki adla yerleştirir ve `config.js`'teki listeye ekler. Listede olmayan mekân SVG ile çizilir.
6. Her görsel için KAYNAKLAR.md'ye bir satır ekle (araç: ChatGPT, tarih).

## Ortak tarz bloğu (ilk mesajda bir kez)
```
I am making a small narrative web game set in a drought-stricken village on the Konya plain,
Turkey, in August 2025. I will give you reference images: the first shows the art style and
color palette (a pixel art character portrait), the second shows the scene layout.
For every scene: keep the layout of my layout image (positions of buildings and objects),
match the art style and warm earthy palette of the portrait (dusty ochre, terracotta, faded
olive, muted brown, soft cream), flat-roofed mud-brick village architecture, cracked dry soil,
dusty hazy sky, flat midday light, calm and quiet mood. Wide 16:9 game background.
No people, no animals, no text, no logos, no watermark.
```

## Mekânlar
| Dosya adı | Referans PNG | Prompt |
|---|---|---|
| `avlu.png` | sahneler/avlu.png | The family's courtyard: a flat-roofed mud-brick house on the left with two small windows and a wooden door, a low stone wall, a small goat pen with a wooden fence on the right, a clothesline with a few clothes, a water jug and an empty metal basin, a small dried-out vegetable patch in front, a bare dead tree on the far right. |
| `koy_yolu.png` | sahneler/koy_yolu.png | A dirt road running through the village between small flat-roofed mud-brick houses, wooden electricity poles with sagging wires, patches of dry grass. |
| `kuyu_basi.png` | sahneler/kuyu_basi.png | The village's shared old stone well with a wooden frame, pulley and bucket in the center, a row of empty plastic water jerry cans waiting beside it, a dry stone animal trough on the left, houses on both sides, a bare tree. |
| `yasli_cift_evi.png` | sahneler/yasli_cift_evi.png | An elderly couple's old stone house with a wooden door, a wooden pergola with a dried grapevine and a bench under it, a small wooden seed chest and a clay jug in front, one small olive tree. |
| `tepe.png` | sahneler/tepe.png | View from a low hill above the village: the small village and striped dry fields of the wide plain below, a bare dead tree and an old wooden post on the hilltop. |
| `komsu_tarlasi.png` | sahneler/komsu_tarlasi.png | A neighbor's dry field with furrows of withered crops, a small concrete pump house with a metal water pipe running along the field, his small house on the left, electricity poles. |
| `komsu_tarlasi_obruk.png` | sahneler/komsu_tarlasi_obruk.png | Same field as before, but now a large sinkhole has opened in the middle of the field: a deep dark crater with broken, cracked edges. Dramatic but not gory. |
| `muhtarlik.png` | sahneler/muhtarlik.png | The village headman's office: a larger plastered single-story building with a blank sign board above the door, a Turkish flag on a pole, wooden benches arranged in the small square in front for a village meeting, one olive tree. |
| `sarnic.png` | sahneler/sarnic.png | An old forgotten stone rainwater cistern with a domed roof, part of the dome collapsed and fallen stones around it, a broken wooden gutter leading to it, a bare tree. |
| `sarnic_onarildi.png` | sahneler/sarnic_onarildi.png | The same stone cistern, now repaired: dome intact, new wooden gutter, a little water at the base, the tree beside it has a few green leaves. Hopeful mood. |
| `koy_cikisi.png` | sahneler/koy_cikisi.png | A long dirt road leaving the village toward the horizon, the last mud-brick house on the left, electricity poles, and a distant hazy grey city skyline with smoke far away on the horizon. Melancholic mood. |
| `harita.png` | sahneler/harita_etiketli.png | Top-down bird's-eye map of the same village, keep every building, road and field exactly where they are in my layout image. Flat roofs seen from above, dirt roads, dry fields, the well, the round cistern, a low hill in the top-right corner. Do not write any labels or text. |

## PixelLab karakter promptları (hatırlatma)
Ortak blok, her promptun başına:
```
Pixel art character portrait, bust shot from chest up, 3/4 view facing right,
Anatolian village in Konya, Turkey, summer drought, 2025. Warm earthy palette:
dusty ochre, terracotta, faded olive, muted brown, soft cream. Soft warm side
light, clean readable pixel shapes, limited colors, realistic proportions,
dignified and natural, not caricature, not cartoonish, no text.
```
Anne portresini her üretimde **Style image** olarak yükle.

| Dosya adı | Karakter satırı |
|---|---|
| `anne.png` | (hazır) |
| `mehmet.png` | 12-year-old boy, short dark hair, sun-tanned skin, worn faded t-shirt, thin, determined but worried expression. |
| `yasli_cift.png` | Elderly couple side by side, man with white mustache and flat cap, woman with white headscarf and kind wrinkled face, both in their 70s, calm and warm. |
| `komsu.png` | Man in his 60s, grey stubble, stern closed expression, lonely, old work vest over a buttoned shirt, weathered hands. |
| `muhtar.png` | Man in his 50s, neat dark mustache, plain shirt with an old jacket, calm and respected, slightly tired. |
| `ogretmen.png` | Woman in her early 30s, hair tied back, simple blouse, practical and modest, attentive thoughtful expression. |
| `baba.png` | Man in his late 30s, short beard, dusty work clothes, worn out, looking slightly away. |

Portreleri `assets/portraits/` klasörüne bu adlarla koy. İfade varyantları için ad sonuna ifade ekle: `anne_uzgun.png`, `komsu_kizgin.png` gibi. Oyun varyant yoksa düz portreyi gösterir.

---

# Detay görselleri (1 Kasım)

Araç: Automatic1111 + Pixel Art Diffusion XL, portrelerle aynı ayarlar. Dosyaları `gorseldeneme/` klasörüne bu adlarla koy; Claude küçültüp saydamlaştırır ve bağlar.

**Ortak başlangıç** (portreler hariç her promptun başına):
```
pixel art game sprite, single object centered, full object visible, flat solid pure green background, warm earthy palette, dusty ochre, terracotta, muted brown, clean outline,
```
**Ortak negatif:**
```
text, letters, watermark, logo, signature, frame, border, gradient background, scenery, multiple objects, cropped, blurry, 3d render, photo
```

## Önce bunlar
| Dosya | Boyut | Prompt |
|---|---|---|
| `koylu1.png` | 512×512 | (ortak başlangıç yok) `pixel art character portrait, middle-aged Turkish village farmer man, flat cap, sunburned tired face, stubble, worn collared shirt, plain dusty beige background, bust shot, front view` |
| `koylu2.png` | 512×512 | (ortak başlangıç yok) `pixel art character portrait, middle-aged Turkish village woman, patterned white headscarf, weathered face, stern expression, faded floral dress, plain dusty beige background, bust shot, front view` |
| `keci_hasta.png` | 768×512 | `thin sick Anatolian black goat, side view facing right, lying down weakly, head low, dull scruffy fur` |
| `keci_saglikli.png` | 768×512 | `healthy Anatolian black goat, side view facing right, standing, head up, small curved horns, glossy long fur, four legs visible` |
| `ot1.png` | 256×256 | `small tuft of dry weeds, yellow-green thin grass blades, seen from the side` |
| `ot2.png` | 256×256 | `small thorny dry weed, brown-green stems with a few tiny leaves, seen from the side` |
| `ot3.png` | 256×256 | `small round clump of dusty green weeds, seen from the side` |
| `ampul.png` | 256×256 | `glowing vintage light bulb icon, warm yellow glow, simple shape` |

## Sonra bunlar
| Dosya | Boyut | Prompt |
|---|---|---|
| `kova.png` | 256×256 | `old dented metal water bucket with handle, a little water inside, item icon` |
| `yem.png` | 256×256 | `small open burlap sack full of golden grain feed, item icon` |
| `sepet.png` | 256×256 | `small woven wicker basket holding bread, tomatoes and a piece of cheese, item icon` |
| `damla.png` | 128×128 | `single round blue water drop, bright highlight, simple icon` |
| `defter.png` | 128×128 | `small worn school notebook with brown cover and a pencil, simple icon` |
| `ses_acik.png` | 128×128 | `simple speaker icon with sound waves, cream color` |
| `ses_kapali.png` | 128×128 | `simple speaker icon with a cross next to it, cream color` |
| `sekme.png` | 128×128 | `single blue water drop above a small stone well, simple icon` |

## ChatGPT ile (önce anne portresini yükle, tarz bloğu yukarıda)
| Dosya | Prompt |
|---|---|
| `baslangic.png` | `Same village, same art style and palette. Wide 16:9 title screen background: a stone village well in the foreground center with a coiled rope and an old bucket, cracked dry earth, mud-brick houses behind it, low hills, huge pale hazy sky filling the upper half, left empty for a title. Late afternoon light, quiet and hopeful. No people, no animals, no text.` |
| `okul.png` | `Same village, same art style and palette. Wide 16:9: front of a small one-story village primary school, whitewashed walls with peeling paint, a flagpole, a dry schoolyard, one lit window, a bench beside the door. No people, no text.` |
| `toplanti.png` | Muhtarlık görselini de yükle. `Keep this exact layout and style. Add a crowd of dark villager silhouettes seen from behind, sitting on benches and standing in front of the building, evening light. No faces, no text.` |
| `sunum_karakterler.png` | Bütün portreleri yükle. `Group image for a game presentation: these eight characters standing together in front of a village well, same pixel art style and palette, keep their faces and clothes. No text.` |

## En sona (zaman kalırsa)
| Dosya | Prompt |
|---|---|
| `komsu_tarlasi_misir.png` | `komsutarlagpt.png` dosyasını yükle. `Keep this exact layout, house, motor hut, pipe and poles. Replace the dry sparse plants with rows of tall healthy green corn on dark irrigated soil, the only green field in a dry landscape. No people, no text.` |
| `komsu_tarlasi_obruk_misir.png` | `komsutarlaobrukgpt.png` dosyasını yükle. Aynı metin, sonuna: `Keep the large sinkhole exactly where it is, with broken corn stalks at its edge.` |
