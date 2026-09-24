# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS: `index.html`, `style.css`, `app.js`, self-hosted fonts in `fonts/`. No framework, no build step, no package manager. Opens by double-clicking `index.html` in a desktop browser. Confirmed by the user on 2026-09-24.

## Users

One user: the owner of this repo, on their own Windows computer, adding and finishing their own tasks. A personal tool, not shared. On 2026-09-24 the user asked for it to feel childlike and very fun ("çocuklar için oldukça eğlenceli", "her bölüm bir oyun tadında") while confirming the user is still themselves, not a child, and that they add their own tasks.

## Product Purpose

A personal todo list that feels like a casual mobile puzzle game. The user wants the app to make them *want* to add and finish tasks. Success means the user keeps coming back to it instead of abandoning it after a few days.

## Operating Context

- Used alone, at the user's own desk, in a desktop browser; also checked at phone width.
- Interface language is Turkish ("Ekle", "Sil", "Arşivle", "Hepsi bitti!"). Code identifiers stay in English.
- Started as a step-by-step lesson series (see `DERSLER.md`); the user no longer writes code, Claude implements.

## Capabilities and Constraints

Current capabilities:
- Add, edit (double-click or "Düzenle"), delete, complete, and undo tasks; archive and restore.
- Filter by Hepsi / Yapılacaklar / Tamamlananlar (not saved; resets on reload).
- Coin economy: adding a task +1, finishing +3, plus a speed bonus (+3 within 1 hour, +2 within 1 day, +1 within 3 days). Undo refunds what was earned; deleting an unfinished task takes back its 1 coin. Levels by coin total, daily count, and a streak of days with at least one finished task.
- Characters: Kumbara-chan (the coin bank as an anime character) and one small creature per task whose face shows the task's age and state. Six sample tasks (`demo: true`) can be added and removed; they never earn coins.
- Creation and completion times shown per task.

Constraints:
- **Fully offline, permanently.** No server, no cloud sync, no accounts, no network requests at runtime. Data lives only in the browser's `localStorage` under `"tasks"` and `"kumbara"`.
- Task shape is `{ id, text, done, archived, createdAt?, doneOn?, doneAt?, earned?, demo? }`. Older tasks lack the optional fields; a missing `createdAt` falls back to `id` when it is a timestamp. Any change must keep existing saved tasks readable.

## Brand Commitments

- **Candy Crush-like feel, pinned by the user on 2026-09-24:** a glossy, saturated candy-puzzle-game look and "juicy" feedback. This is a style reference only: never use that game's name, logo, characters, candy art, or sounds in the product.
- Anime characters stay (Kumbara-chan and the task creatures), per the user's earlier request.

## Evidence on Hand

None. There are no users besides the owner, no testimonials, no metrics. Do not invent any.

## Product Principles

1. **Never lose a task silently.** Saved data must survive every change to the app; deleting is always an explicit user action.
2. **Offline and private by construction.** Nothing leaves the browser.
3. **Every action should feel like a game move.** Adding and finishing tasks get immediate, satisfying, playful feedback; that is the core job, not decoration.
4. **Fun never hides the task.** However playful the surface, task text stays the easiest thing to read and every control stays obvious.
5. **Stay a single-person tool.** Features that only make sense for teams or sharing are out of scope.
