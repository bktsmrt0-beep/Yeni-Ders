## Ders ilerlemesi

Bu repo derslerle başladı; artık kodu Claude yazıyor (bkz. `DERSLER.md`). Oturum başında önce `DERSLER.md` dosyasını oku ve oradaki "Yeni oturum başlangıç kontrolü" adımlarını uygula. Kodu baştan tarama. Her iş bitince `DERSLER.md` dosyasını güncelle.

Kullanıcı **"devam edelim"** yazınca: başlangıç kontrolünü çalıştır, durumu tek cümleyle söyle ("Kumbara tasarımında kalmıştık, her şey yerinde"), sonra `DERSLER.md`'deki "Sıradaki iş" ile devam et. Seçim bekleniyorsa seçenekleri sor; değilse işe direkt başla.

## Agent skills

### Issue tracker

GitHub Issues (bktsmrt0-beep/Yeni-Ders), via the `gh` CLI. See `docs/agents/issue-tracker.md`.

### Triage labels

Five canonical roles on GitHub Issues (bktsmrt0-beep/Yeni-Ders): `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context (`CONTEXT.md` + `docs/adr/` at repo root). See `docs/agents/domain.md`.
