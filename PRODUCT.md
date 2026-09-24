# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS: `index.html`, `style.css`, `app.js`. No framework, no build step, no package manager. Opens by double-clicking `index.html` in a desktop browser. Confirmed by the user on 2026-09-24.

## Users

One user: the owner of this repo, on their own Windows computer. A personal tool, not shared with family, colleagues, or the public. The user chose "just a tool" over "tool plus learning project": the code no longer has to stay simple enough for them to write by hand, it has to work and feel good to use.

## Product Purpose

A personal todo list for capturing and finishing everyday tasks. The user wants the app to make them *want* to add tasks, not just store them. Success means the user keeps coming back to it instead of abandoning it after a few days.

## Operating Context

- Used alone, at the user's own desk, in a desktop browser.
- Interface language is Turkish ("Ekle", "Sil", "Arşivle", "Hepsi bitti!"). Code identifiers stay in English.
- Started as a step-by-step lesson series (see `DERSLER.md`); features were added one lesson at a time.

## Capabilities and Constraints

Current capabilities:
- Add a task, delete it, mark it done (strikethrough) or undo that.
- Archive a task to a separate "Arşiv" list and restore it.
- Filter the main and archive lists by Hepsi / Yapılacaklar / Tamamlananlar. The filter is not saved; it resets to Hepsi on reload.
- Counter of open, non-archived tasks, with "Hepsi bitti! 🎉" at zero.

Constraints:
- **Fully offline, permanently.** No server, no cloud sync, no accounts, no network requests. Data lives only in the browser's `localStorage` under the key `"tasks"`.
- Task shape is `{ id, text, done, archived }`. Older saved tasks lack `archived`; treat missing as `false`. Any change must keep existing saved tasks readable.

## Evidence on Hand

None. There are no users besides the owner, no testimonials, no metrics. Do not invent any.

## Product Principles

1. **Never lose a task silently.** Saved data must survive every change to the app; deleting is always an explicit user action.
2. **Offline and private by construction.** Nothing leaves the browser.
3. **Adding a task should feel rewarding.** Reducing friction and giving satisfying feedback on add and complete is the core job, not decoration.
4. **Stay a single-person tool.** Features that only make sense for teams or sharing are out of scope.
