---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["app.js","style.css"]
---

# Surface brief: todo app (index.html)

## Scope

The whole single-screen app: task entry, open list, filters, archive, and the new motivation layer. Visitor mode: **Operate**. Code-led build (no image generation available).

## Audience and job

One user at their own desk, Windows, desktop browser, day and evening indoor light. Job: capture a task in seconds, finish it, and feel rewarded enough to keep coming back. User asked for: satisfying feel, visible progress, encouraging messages, and game-like points; completion celebration small and sweet, not loud. New look, all existing functions kept.

## Constraints

Fully offline at runtime: no CDN, no web fonts from the network (self-hosted files only). Keep `localStorage` key `"tasks"` and task shape readable; missing `archived` means false. Turkish UI copy. Reduced-motion users get the same state changes without flight.

## Direction contract

THESIS: A kumbara (Turkish coin bank). Every task you add drops a small coin in, every task you finish drops a gold one; the bank's weight is your progress. Refuses the category default of a white card list with a purple accent and checkbox confetti.

OWN-WORLD: Glazed cobalt ceramic field owns the bank panel; cool porcelain white ground for the list; blue-black tinted ink. Coin gold is reserved by law for earned coins and nothing else (raise from the arcade challenger's power-up palette law). One self-hosted display face for numerals and headings, system UI face for task text, tabular numerals everywhere a count appears.

STORY: The user sees how full the bank is, types a task into the slot, watches it land, ticks it off, and sees a coin fly into the bank with a short encouraging line.

FIRST VIEWPORT: Desktop: cobalt bank panel on the left third holding the coin total at display scale, level name with a row of coin slots toward the next level, today's finished count and the streak in days, and one encouraging line. Right two thirds: the entry slot at the top (the primary action), filters, then the open list. Mobile: the bank collapses to a compact cobalt band above the entry slot.

FORM: Kumbara, candidate 6 of 7 on the grounded list (1 loyalty stamp card, 2 okey tiles on a rack, 3 tea glass filling, 4 aferin star sticker chart, 5 tavla bearing off, 6 kumbara, 7 transit card top-up). Seed key d92030c2. Declined challengers and raises: oscilloscope (every count is an exact readout, tabular and aligned), racing livery (finished tasks drain to unpainted gray), orienteering map (the reward layer never covers task text), drawcord cape (the entry slot is both the accent and the control), tensegrity column (open, done, archived are three unmistakable states). Arcade cabinet: competitive, kept its palette law.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and motion

Completing a task launches one gold coin from the checkbox along an arc into the bank total, which ticks up with a short settle. Adding a task drops a small coin. Exponential ease-out, under 700 ms, no bounce. Nothing else animates on its own.

## Open decisions

Point values: add +1, finish +3, un-finish −3 (never below 0). Levels by coin total. Streak counts consecutive days with at least one finished task.
