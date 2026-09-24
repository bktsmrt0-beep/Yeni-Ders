---
version: 1
slug: "index-html"
primary_target: "index.html"
related_targets: ["app.js","style.css"]
---

# Surface brief: todo app (index.html)

## Scope

The whole single-screen app, redesigned from the cobalt kumbara world into a candy-puzzle-game world. Visitor mode: **Operate** (the user completes tasks), with game-grade feedback. Code-led build (no image generation available).

## Audience and job

One adult user at their own desk (and sometimes phone width) who wants their todo list to feel like a childlike, very fun casual game: "her bölüm bir oyun tadında", "candy crush gibi olmalı". They add and finish their own tasks. Every existing function stays: add, edit, delete, complete/undo, archive/restore, filters, coins, speed bonus, levels, streak, Kumbara-chan, task creatures, sample tasks, times.

## Constraints

Fully offline at runtime: fonts self-hosted and inlined, sounds synthesized with Web Audio, no network. Keep `localStorage` keys `"tasks"` and `"kumbara"` readable. Turkish UI. Never use Candy Crush's name, logo, candy art, characters, or sounds: style reference only. Reduced motion keeps state changes and drops flight, bursts, and loops. Sound is opt-out with a visible toggle and only plays on user actions.

## Direction contract

THESIS: A glossy candy puzzle game where every task is a candy tile: finishing one pops it with a burst, a big centered callout, and stars. Refuses the flat productivity list and its pastel "cute app" cousin with timid feedback.

OWN-WORLD: Sugar-sky ground (pink to lilac gradient with rolling candy hills), jelly surfaces everywhere: saturated candy fills with a white top gloss, a darker bottom lip, and a soft colored drop shadow. Six candy hues (cherry, orange, lemon, apple, blueberry, grape) plus plum ink for text. Chunky rounded display face (Lilita One) with white outline for headings and callouts; rounded UI face (Nunito) for tasks.

STORY: The user sees their level, score, stars, and hearts at a glance, types a task into the big candy slot, taps it done, and gets a pop, a "Leziz!" callout, flying coins, and a lit node on today's path.

FIRST VIEWPORT: A centered game frame (max 680px). Top: sticky HUD bar with level badge, score with coin and a three-star progress bar, hearts for the streak, and a sound toggle. Under it: Kumbara-chan on a candy pedestal with her speech bubble, then "Bugünün yolu", a winding path of numbered nodes lit by today's finished tasks. Then the entry slot with a big apple-green jelly button as the primary action, candy pill filters, and the task tiles.

FORM: Pinned by the user ("candy crush gibi olmalı"); the brief-pinned direction beats the roll. Seed key da333642 was run and its assignment (candidate 5) was overridden by the pin, disclosed here. Carried from the previous world: Kumbara-chan, task creatures, coin flight, speed bonus.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Signature interaction and motion

Finishing a task: the tile squashes and pops, candy shards burst from it in its hue, coins fly to the HUD score, the day path lights its next node with 1–3 stars (3 for a first-hour finish), and a big outlined callout ("Tatlı!", "Leziz!", "Nefis!", "Muhteşem!", "Şimşek!") lands center screen with a short synthesized chime. Level up: full-screen "Şeker Patlaması!" with rays and stars for about 1.8s.

## Open decisions

None blocking. Sound defaults on with a toggle stored in localStorage.
