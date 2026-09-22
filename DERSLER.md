# Ders Kaydı: Todo Uygulaması

## Kaldığımız yer

- **Son biten ders:** Ders 3 (Sayaç)
- **Son commit:** `2a626a0` Lesson 3: add remaining-tasks counter (GitHub'a push'landı)
- **Sıradaki ders:** Ders 4, kullanıcı seçecek:
  - **Filtreleme:** "Hepsi / Yapılacaklar / Tamamlananlar" butonları
  - **Görevi düzenleme:** göreve çift tıklayınca yazısını değiştirmek

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

- `index.html`: başlık, sayaç (`#counter`), form (`#task-form`, `#task-input`), görev listesi (`#task-list`), Arşiv başlığı ve listesi (`#archive-list`)
- `style.css`: sade düzen, `.done` sınıfı üstü çizili ve gri gösterir
- `app.js`:
  - Görev nesnesi: `{ id, text, done, archived }` (eski görevlerde `archived` yok, `undefined` = arşivlenmemiş)
  - `loadTasks()` / `saveTasks()`: localStorage, anahtar `"tasks"`
  - `render()`: iki listeyi temizler; her görev için kutucuk, yazı, Sil ve Arşivle/Geri al butonu çizer; görevi `archived` bilgisine göre listeye koyar; en sonda sayacı günceller
  - Form submit: görev ekler
  - Bilinen görünüş kusuru: 38. satır civarında `deleteButton.addEventListener` satırında fazladan 1 boşluk var (zararsız)

## Biten dersler

| Ders | Konu | Commit | Öğrenilenler |
| ---- | ---- | ------ | ------------ |
| 0 | İskelet (ekle + kaydet) | `9b48125` | HTML/CSS/JS ayrımı, localStorage, `render()` kalıbı |
| 1 | Sil + Tamamla | `d925dbd` | `createElement`, `appendChild`/`prepend`, `addEventListener`, `filter`, `!`, `if`, CSS sınıfı |
| 2 | Arşiv | `6d5efab` | `<h2>`, üçlü operatör `? :`, `if ... else`, aşağıdan yukarı düzenleme |
| 3 | Sayaç | `2a626a0` | `&&`, `.length`, yazı birleştirme `+`, `===` ile `=` farkı |

## Ders anlatım kuralları

- Türkçe anlat. Ekrandaki yazılar Türkçe, kod İngilizce.
- Nokta atışı tarif et: satır numarası, imlecin nereye tıklanacağı, yazılacak kodun tamamı, sonrasında satırların nasıl görüneceği.
- Birden fazla yere ekleme yapılacaksa aşağıdan yukarıya git ki satır numaraları kaymasın.
- Satır değiştirirken: yeni kodu altına yapıştır, eski satırı Ctrl+Shift+K ile sil.
- Her adımdan sonra tarayıcıda somut bir kontrol ver (F5, ne görülmeli). Kullanıcı "tamam" deyince dosyayı okuyup doğrula.
- Kavramları adım çalıştıktan sonra "Ne yaptık?" bölümünde açıkla.
- Ders bitince commit at, bu dosyayı güncelle. Push sadece kullanıcı isteyince.
