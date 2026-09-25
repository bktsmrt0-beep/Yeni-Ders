# Ders Kaydı: Todo Uygulaması

## Kaldığımız yer

- **Çalışma şekli değişti (2026-09-24):** Kullanıcı "ben yazmayacağım" dedi. Ders modu bitti; kodu artık Claude yazıyor ve ne değiştiğini Türkçe anlatıyor. Aşağıdaki "Ders anlatım kuralları" sadece kullanıcı tekrar kendisi yazmak isterse geçerli.
- **Son büyük iş:** Uygulama Impeccable ile **kumbara** temasına yeniden tasarlandı (puan, seviye, seri, uçan altın animasyonu). Son değerlendirme kararı: ship. Tasarım sistemi `DESIGN.md`'de, yön sözleşmesi `.impeccable/surfaces/index-html.md`'de.
- **Ardından (2026-09-24):** görevlerin üzerinde gezinirken altta kayan porselen tepsi ve öne çıkan satır eklendi (kullanıcı "ölü, akışkanlık yok" dedi). `DESIGN.md`'deki One Floating Thing kuralı buna göre güncellendi.
- **Ardından:** tasarım kuralları toparlandı. 16 dağınık yazı boyutu, `--text-xs` … `--text-display` adlı 10 basamaklı tek ölçeğe indirildi, sır rengi `--glaze-foot` oldu. `DESIGN.md` ve `design.json` güncellendi, Impeccable denetimi 0 bulgu. Telefonda sayfanın 12px yana taşması ve Düzenle butonuyla sıkışan satırlar da düzeltildi (butonlar dar ekranda yazının altına iner).
- **Ardından:** görevi düzenleme eklendi (çift tık ya da Düzenle butonu; Enter/dışarı tıklama kaydeder, Esc iptal, boş bırakınca eski yazı kalır, altın kazandırmaz).
- **Ardından:** kullanıcı "daha anime, eğlenceli" istedi (anime/manga tarzı, kumbaraya karakter). Kumbara **Kumbara-chan** adlı kedi kulaklı anime karaktere dönüştü: ruh hâlleri (uykulu/normal/mutlu/heyecanlı), zıplama, parıltılar, manga ses yazıları, konuşma balonu. `DESIGN.md`'de Kumbara-chan bölümü var. `design.json` yan dosyası karakter için güncellenmedi, gerekirse `/impeccable document` ile yenilenebilir.
- **Ardından:** görevlere tarih/saat, hız bonusu (1 saat +3, 1 gün +2, 3 gün +1; geri alınca kazanılan kadar düşer) ve her göreve anime karakter (yaşına göre parlak/normal/endişeli/ağlayan, biten gururlu, arşivdeki uyuyor) eklendi. "Karakterler ne anlatıyor?" kutusu + altın vermeyen örnek görevler butonu var. Görev nesnesine `createdAt`, `doneAt`, `earned`, `demo` alanları eklendi; eski görevlerin eklenme zamanı `id`'den çıkarılıyor.
- **Ardından (2026-09-24, büyük iş):** Kullanıcı "çocuklar için eğlenceli, her bölüm oyun gibi, Candy Crush gibi" istedi (kullanan yine kendisi). Uygulama şeker oyunu dünyasına yeniden tasarlandı: mor jöle üst gösterge (seviye yıldızı, altın, 3 yıldızlı çubuk, seri kalpleri, ses düğmesi), Kumbara-chan şeker kaidede, kıvrılan "Bugünün yolu" (bugün bitenler durak yakar, hız = 1–3 yıldız), renkli jöle görev kartları + krem oyuk, renkli çerçeveli paneller, şeker patlaması parçacıkları, ortada "Leziz!/Şimşek!" yazıları, Web Audio sesleri. Seviye atlayınca tam ekran kutlama: kullanıcı isteğiyle yazı **"Fikret Hocam, emeğinize sağlık!" + "Teşekkürler!"**. Yazı tipleri: Lilita One (başlık) + Nunito, `fonts/fonts.css` içine gömülü. `PRODUCT.md` güncellendi (Candy Crush sadece stil referansı, adı/logosu kullanılmaz).
- **Değerlendirme durumu (2026-09-25): tamamlandı, karar "ship".** Üç açık iş bitti: başlık yazı tipi Lilita One yerine **Baloo 2 ExtraBold ("Candy Display")** oldu (ğ/ş/İ eksikti; `fonts/fonts.css` yeniden üretildi), kutlama arkası opak koyu üzüm diski oldu, `DESIGN.md` + `.impeccable/design.json` şeker dünyasına göre baştan yazıldı. Parıltı/patlama animasyonları `fill: "forwards"` aldı.
- **Küçük açık notlar (istenirse):**
  - Denetim 10 bulgu veriyor: 3 bilinçli yanlış alarm (seviye rozeti rakamı sarı yıldız üstünde, "Teşekkürler!" koyu hale + kontur üstünde, lejant krem oyuğu "kart içinde kart") + 7 küçük `DESIGN.md` sapması (siyah gölge tonları, `#fffbd1` açık sarı, 5px köşe). `/impeccable document` ya da `extract` ile toparlanabilir.
  - `.impeccable/config.json`: `side-tab` istisnası eski `.stack-coin`'e atıfta bulunuyor (artık yok), `bounce-easing` istisnasının gerekçesi sadece maskot zıplaması/balonu sayıyor ama `--ease-jelly` artık kartları, durakları, yıldızları, karakterleri ve başlığı da sürüyor. İkisi de yeniden kapsamlanmalı.
  - Yer tutucu rengi (`#8a6fa0` krem üstünde 4.1:1) ve aksiyon hapı hover'ı (beyaz/üzüm 4.37:1) AA sınırının hafif altında.
- **Sıradaki iş:** kullanıcı seçecek (küçük açık notlar isteğe bağlı). Önceden konuşulan fikir: **görevi düzenleme** (çift tıklayınca yazıyı değiştirmek).

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
