# Ders Kaydı: Todo Uygulaması

## Kaldığımız yer

- **Çalışma şekli değişti (2026-09-24):** Kullanıcı "ben yazmayacağım" dedi. Ders modu bitti; kodu artık Claude yazıyor ve ne değiştiğini Türkçe anlatıyor. Aşağıdaki "Ders anlatım kuralları" sadece kullanıcı tekrar kendisi yazmak isterse geçerli.
- **Son büyük iş:** Uygulama Impeccable ile **kumbara** temasına yeniden tasarlandı (puan, seviye, seri, uçan altın animasyonu). Son değerlendirme kararı: ship. Tasarım sistemi `DESIGN.md`'de, yön sözleşmesi `.impeccable/surfaces/index-html.md`'de.
- **Sıradaki iş:** kullanıcı seçecek. Önceden konuşulan fikir: **görevi düzenleme** (çift tıklayınca yazıyı değiştirmek).

## Impeccable

- ✅ Plugin kurulu (`impeccable@impeccable`, v4.3.1). `PRODUCT.md` ve `DESIGN.md` var.
- Tasarım değişikliklerinde önce `impeccable context` çalışır; yeni işler kumbara dünyasını (DESIGN.md) miras alır.
- `side-tab` denetim kuralı `style.css` ve `index.html` için susturuldu (yığındaki paranın alt kenarı yanlış alarm veriyordu), `.impeccable/config.json`'da.

## Yeni oturum başlangıç kontrolü

Tüm kodu baştan taramak yerine sadece şunu çalıştır:

```
git status --short
git log --oneline -1 -- app.js index.html style.css
```

- `git status` çıktısı boşsa: durum bu dosyayla aynı, direkt sıradaki işe geç.
- Değişiklik varsa: sadece `git diff` ile farka bak, bu dosyayı güncelle.
- Bir işe başlamadan önce yalnızca o işin değişeceği dosyayı oku.

## Uygulamanın şu anki hâli

Kumbara yeniden tasarımından sonra (ayrıntılı görsel kurallar `DESIGN.md`'de):

- `index.html`: solda kumbara paneli (`.bank`: para ağzı, toplam altın, seviye, para yığını, bugün/seri, mesaj), sağda görev yazma kutusu (`#task-form`), "Görevler" başlığı + sayaç, filtreler, liste, açılır Arşiv (`<details>`)
- `fonts/fonts.css`: Bricolage Grotesque gömülü (OFL), internet gerekmez
- `app.js`:
  - Görev nesnesi: `{ id, text, done, archived, doneOn? }`. Eski görevler aynen okunur
  - Kumbara: localStorage `"kumbara"` = `{ coins, days: { "YYYY-MM-DD": bitenSayısı } }`. Yoksa eski görevlerden doldurulur (görev × 1 + biten × 3)
  - Puan: ekle +1, bitir +3, bitirmeyi geri al −3, bitmemiş görevi sil −1
  - Seviyeler `LEVELS` dizisinde (Bozuk para → Efsane); yığında her para 1/2/5/10 altın
  - Uçan altın animasyonu `flyCoin()`, hareket azaltma tercihinde kapalı
  - `tasks` okunamazsa veri silinmez, `tasks-backup-<zaman>` anahtarına yedeklenir

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
