# Ders Kaydı: Todo Uygulaması

## Kaldığımız yer

- **Son biten ders:** Ders 4 (Filtreleme)
- **Son commit:** `ebf1d87` Lesson 4: add all/active/done filter buttons with active highlight (GitHub'a push'landı)
- **Sıradaki ders:** Ders 5, kullanıcı seçecek:
  - **Görevi düzenleme:** göreve çift tıklayınca yazısını değiştirmek
  - Ya da kullanıcının kendi fikri

## Yeni oturum başlangıç kontrolü

Tüm kodu baştan taramak yerine sadece şunu çalıştır:

```
git status --short
git log --oneline -1 -- app.js index.html style.css
```

- `git status` çıktısı boşsa ve uygulama dosyalarının son commit'i yukarıdaki commit ise: durum bu dosyayla aynı, direkt sıradaki derse geç.
- Değişiklik varsa ya da commit farklıysa: sadece `git diff` / `git log` ile farka bak, bu dosyayı güncelle.
- Bir derse başlamadan önce yalnızca o dersin değişeceği dosyayı oku (satır numaralarını doğru vermek için).

## Uygulamanın şu anki hâli

- `index.html`: başlık, sayaç (`#counter`), form (`#task-form`, `#task-input`), filtre butonları (`#filters` içinde `#filter-all`, `#filter-active`, `#filter-done`), görev listesi (`#task-list`), Arşiv başlığı ve listesi (`#archive-list`)
- `style.css`: sade düzen, `.done` sınıfı üstü çizili ve gri gösterir, `.active-filter` seçili filtre butonunu koyu gösterir
- `app.js`:
  - Görev nesnesi: `{ id, text, done, archived }` (eski görevlerde `archived` yok, `undefined` = arşivlenmemiş)
  - `loadTasks()` / `saveTasks()`: localStorage, anahtar `"tasks"`
  - `filter` değişkeni: `"all"` / `"active"` / `"done"`, kaydedilmez (F5'te "all"a döner)
  - `render()`: iki listeyi temizler; filtreye uymayan görevi `continue` ile atlar (arşiv listesi de filtrelenir); her görev için kutucuk, yazı, Sil ve Arşivle/Geri al butonu çizer; görevi `archived` bilgisine göre listeye koyar; sayacı günceller (sayaç filtreden etkilenmez); seçili filtre butonuna `.active-filter` sınıfını verir
  - Form submit: görev ekler; dosyanın sonunda üç filtre butonunun tıklama kodu var
  - Bilinen görünüş kusurları (zararsız): `deleteButton.addEventListener` satırında ve filtre `continue` satırlarından ikincisinde fazladan girinti var; `index.html`'de `#filters` bloğunun girintisi kaymış. Kullanıcıya Shift+Alt+F ile düzeltebileceği söylendi.

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
