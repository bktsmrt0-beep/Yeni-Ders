# Ders Kaydı: Todo Uygulaması

## Kaldığımız yer (son güncelleme: 2026-09-25)

**Durum:** Her şey commit'li ve GitHub'a gönderildi (son commit `f5e2ab8`). Bekleyen iş yok.

- **Uygulama:** Candy Crush havasında şeker oyunu gibi bir todo (yalnız kullanıcı kullanıyor, tamamen çevrimdışı, düz HTML/CSS/JS). Kod artık **Claude yazıyor**, ne değiştiğini Türkçe anlatıyor. (Kullanıcı Ders 0–4'ü kendisi yazdı, sonra "ben yazmayacağım" dedi.)
- **Kalite:** Impeccable tasarım denetimi **0 bulgu**. Bağımsız değerlendirici karar: "ship".
- **Sıradaki iş:** kullanıcı belirleyecek. Bilinen küçük not: yer tutucu rengi (`#8a6fa0` krem üstünde 4.1:1) ve aksiyon hapı hover'ı (beyaz/üzüm 4.37:1) AA sınırının hafif altında, denetim yakalamıyor.

### Neler var (özet)

- **Görev işlemleri:** ekle, düzenle (çift tık ya da Düzenle butonu; Enter/dışarı tık kaydeder, Esc iptal), sil, bitir/geri al, arşivle/geri al, filtreler (Hepsi/Yapılacaklar/Tamamlananlar), örnek görevler (altın vermez).
- **Puan:** görev eklemek +1, bitirmek +3 + **hız bonusu** (1 saat +3, 1 gün +2, 3 gün +1). Geri almak kazanılan kadar düşer; bitmemiş görevi silmek 1 altın geri alır. Seviyeler, günlük sayaç, seri (5 kalp).
- **Oyun ekranı:** mor jöle üst gösterge (seviye yıldızı, altın, 3 yıldızlı çubuk, kalpler, ses düğmesi), Kumbara-chan (kedi kulaklı anime kumbara, ruh hâlleri), kıvrılan **"Bugünün yolu"** (bitirilen her görev bir durak yakar, hız = yıldız), her görev bir **jöle şeker kartı** + görev başına bir anime karakter (yaşına göre yüzü değişir), şeker patlaması parçacıkları, ortada "Leziz!/Şimşek!" yazıları, Web Audio sesleri.
- **Seviye atlayınca:** tam ekran kutlama, kullanıcı isteğiyle yazı **"Fikret Hocam, emeğinize sağlık!" + "Teşekkürler!"** (sabit metin, değiştirme).
- **Yazı tipleri:** başlık "Candy Display" = **Baloo 2 ExtraBold** (Lilita One'da ğ/ş/İ yoktu), metin Nunito. İkisi `fonts/fonts.css` içine gömülü, internet gerekmez.

### Dosyalar

- `index.html`, `style.css`, `app.js`, `fonts/` — uygulama. `PRODUCT.md` (ürün bilgisi, Candy Crush sadece stil referansı: adı/logosu/görselleri/sesleri kullanılmaz), `DESIGN.md` + `.impeccable/design.json` (görsel sistem), `.impeccable/surfaces/index-html.md` (yön sözleşmesi), `.impeccable/config.json` (denetim istisnaları, gerekçeleriyle).
- **Veri (localStorage):** `"tasks"` = `[{ id, text, done, archived, createdAt?, doneOn?, doneAt?, earned?, demo? }]` (eski görevler aynen okunur, `createdAt` yoksa `id`'den), `"kumbara"` = `{ coins, days: { "YYYY-MM-DD": bitenSayısı } }`, `"sound"` = `"on"|"off"`. Okunamayan `tasks` silinmez, `tasks-backup-<zaman>` anahtarına yedeklenir.

### Çalışma kuralları (bu proje için)

- Tasarım değişikliği yapmadan önce `PRODUCT.md` ve `DESIGN.md`'yi oku, `impeccable context` çalıştır. Değişiklikten sonra denetimi çalıştır: `"<skill-klasörü>/scripts/impeccable" detect --json index.html style.css app.js` (0 bulgu hedeflenir). Yeni bir yanlış alarm çıkarsa önce gerçekten düzelt, ancak sonra en dar kapsamla `hooks ignore-value` ile gerekçeli kaydet.
- Büyük tasarım işlerinde bitmiş işi `impeccable:impeccable-finish-reviewer` alt ajanına inceletip, sonra `impeccable:impeccable-documenter` ile `DESIGN.md`'yi güncelle.
- Test için: `python -m http.server 8765` (klasörde) ve Playwright; `file://` çalışmaz. Ekran görüntüleri `.impeccable/review/` altında (git dışı). Görüntü alırken kaydırma çubuğunu gizle, ekran boyutu = görüntü genişliği olsun.
- Kullanıcı Türkçe konuşur; kısa, net, sonuç odaklı yanıt ver. Kodu kullanıcı yazmıyor, uzun soru turlarından hoşlanmıyor ("soru bitsin, yap").
- "commit push" = commit et ve GitHub'a gönder. Push'u sadece kullanıcı isterse yap.

## Yeni oturum başlangıç kontrolü

Tüm kodu baştan taramak yerine sadece şunu çalıştır:

```
git status --short
git log --oneline -1
```

- Çıktı boşsa ve son commit yukarıdakiyle aynıysa: durum bu dosyayla aynı, direkt sıradaki işe geç.
- Değişiklik varsa: sadece `git diff` ile farka bak, bu dosyayı güncelle.
- Bir işe başlamadan önce yalnızca o işin değişeceği dosyayı oku.

## Biten dersler

| Ders | Konu | Commit | Öğrenilenler |
| ---- | ---- | ------ | ------------ |
| 0 | İskelet (ekle + kaydet) | `9b48125` | HTML/CSS/JS ayrımı, localStorage, `render()` kalıbı |
| 1 | Sil + Tamamla | `d925dbd` | `createElement`, `appendChild`/`prepend`, `addEventListener`, `filter`, `!`, `if`, CSS sınıfı |
| 2 | Arşiv | `6d5efab` | `<h2>`, üçlü operatör `? :`, `if ... else`, aşağıdan yukarı düzenleme |
| 3 | Sayaç | `2a626a0` | `&&`, `.length`, yazı birleştirme `+`, `===` ile `=` farkı |
| 4 | Filtreleme | `ebf1d87` | `<div>`, form dışı buton, `continue`, `let` ile `const` farkı, kaydedilmeyen durum. Adım 1–2'yi kullanıcı yazdı; mantığı anladığını söyleyip Adım 3 (buton bağlama) ile seçili buton vurgusunu Claude'a yaptırdı. Vurguda kullanılan `querySelectorAll` ve `classList.toggle` sadece kısaca anlatıldı |

## Ders anlatım kuralları

- Türkçe anlat. Ekrandaki yazılar Türkçe, kod İngilizce.
- Nokta atışı tarif et: satır numarası, imlecin nereye tıklanacağı, yazılacak kodun tamamı, sonrasında satırların nasıl görüneceği.
- Birden fazla yere ekleme yapılacaksa aşağıdan yukarıya git ki satır numaraları kaymasın.
- Satır değiştirirken: yeni kodu altına yapıştır, eski satırı Ctrl+Shift+K ile sil.
- Her adımdan sonra tarayıcıda somut bir kontrol ver (F5, ne görülmeli). Kullanıcı "tamam" deyince dosyayı okuyup doğrula.
- Kavramları adım çalıştıktan sonra "Ne yaptık?" bölümünde açıkla.
- Ders bitince commit at, bu dosyayı güncelle. Push sadece kullanıcı isteyince.
