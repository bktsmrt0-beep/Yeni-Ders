---
name: Kumbara
description: A single-screen Turkish todo app played as a glossy candy puzzle game, where every task is a jelly tile that pops into coins, stars, and a lit node on today's path.
colors:
  cherry: "#ff3d7a"
  cherry-light: "#ff8fb4"
  cherry-dark: "#c8134f"
  orange: "#ff8a1f"
  orange-light: "#ffb866"
  orange-dark: "#b34c00"
  lemon: "#ffcf1f"
  lemon-light: "#ffe680"
  lemon-dark: "#c99a00"
  apple: "#34c759"
  apple-light: "#7fe39a"
  apple-dark: "#17823a"
  blueberry: "#2f8cff"
  blueberry-light: "#82bbff"
  blueberry-dark: "#1a5fcc"
  grape: "#a14cf0"
  grape-light: "#cf9bff"
  grape-dark: "#7424c4"
  gold-light: "#fff0a0"
  gold: "#ffc21f"
  gold-deep: "#d18a00"
  sky-top: "#ffd6ea"
  sky-mid: "#f1d9ff"
  sky-low: "#d6c6ff"
  hill-back: "#ffb8d6"
  hill-front: "#b8efd6"
  ink: "#3a1450"
  ink-soft: "#6a4585"
  ink-done: "#7a6a8c"
  placeholder: "#8a6fa0"
  paper: "#ffffff"
  cream-card: "#fff7fd"
  wash: "#f6ecfb"
  track-casing: "#f3e2f7"
  locked-node: "#eadcf3"
  star-unlit: "#b89acb"
  danger: "#c8134f"
  porcelain: "#fffafd"
  blush: "#ff8fb4"
  mouth: "#ff3d7a"
  tear: "#7cc4ff"
  candy-cream: "#fffbd1"
typography:
  callout:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 9vw, 4.25rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.01em"
  score:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 800
    lineHeight: 1
    fontFeature: "tnum"
  reward:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.02em"
  title:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "0.01em"
  title-sm:
    fontFamily: "Candy Display, Nunito, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.01em"
  input:
    fontFamily: "Nunito, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.45
  task:
    fontFamily: "Nunito, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 800
    lineHeight: 1.45
  body:
    fontFamily: "Nunito, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.45
  label:
    fontFamily: "Nunito, Segoe UI, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 800
    lineHeight: 1.45
    fontFeature: "tnum"
  meta:
    fontFamily: "Nunito, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.45
    fontFeature: "tnum"
rounded:
  edit: "10px"
  well: "18px"
  bubble: "22px"
  tile: "26px"
  frame: "28px"
  pill: "999px"
  round: "50%"
  shard: "5px"
spacing:
  xs: "4px"
  sm: "10px"
  md: "12px"
  lg: "22px"
  xl: "30px"
  game-max: "700px"
components:
  button-primary:
    backgroundColor: "{colors.apple}"
    textColor: "{colors.paper}"
    typography: "{typography.title}"
    rounded: "{rounded.well}"
    padding: "0 26px"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  filter-pill-active:
    backgroundColor: "{colors.cherry}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
  button-secondary:
    backgroundColor: "{colors.blueberry}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  action-pill:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
  action-pill-hover:
    backgroundColor: "{colors.grape}"
    textColor: "{colors.paper}"
  action-pill-danger-hover:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.paper}"
  entry-input:
    backgroundColor: "{colors.cream-card}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.well}"
    padding: "12px 16px"
  candy-frame:
    backgroundColor: "{colors.blueberry}"
    rounded: "{rounded.frame}"
    padding: "12px"
  cream-well:
    backgroundColor: "{colors.cream-card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.well}"
    padding: "9px 14px"
  task-tile:
    backgroundColor: "{colors.grape}"
    textColor: "{colors.ink}"
    typography: "{typography.task}"
    rounded: "{rounded.tile}"
    padding: "8px 10px 10px"
  hud:
    backgroundColor: "{colors.grape}"
    textColor: "{colors.paper}"
    rounded: "{rounded.bubble}"
    padding: "10px 14px"
  speech-bubble:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.title}"
    rounded: "{rounded.bubble}"
    padding: "12px 16px"
  speed-chip:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.grape-dark}"
    typography: "{typography.meta}"
    rounded: "{rounded.pill}"
    padding: "2px 10px 2px 7px"
  path-node:
    textColor: "{colors.paper}"
    typography: "{typography.title-sm}"
    rounded: "{rounded.round}"
    size: "46px"
  inline-edit:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.task}"
    rounded: "{rounded.edit}"
    padding: "5px 8px"
---

# Design System: Kumbara

## Overview

**Creative North Star: "The Sugar-Sky Puzzle Board"**

Kumbara is a personal todo list played as a casual candy puzzle game. The page is a single centered game column under a pink-to-lilac sugar sky with two rolling candy hills. Everything the user touches is jelly: a saturated candy fill with a white gloss on top, a darker lip underneath, a 3px white rim, and a soft drop shadow tinted in its own dark tone. Every task is a candy tile in one of six hues. Finishing one squashes and pops it, sprays candy shards in its hue, flies coins to the score, lights a node on today's winding path, and drops a big outlined callout in the middle of the screen. The feedback is the product (PRODUCT.md principle 3), so it is loud on purpose.

The world is dense and bright but never at the expense of reading. Content sits in recessed cream wells set inside the candy frames, set in plum ink, so task text on any tile reads the same whatever the hue (PRODUCT.md principle 4). Two anime characters carry the personality: Kumbara-chan, the porcelain coin-bank cat on a cherry pedestal who talks in a speech bubble, and one small gummy creature per task whose face shows the task's age and state. They stay from the previous world. The candy-puzzle look is a style reference pinned by the user ("candy crush gibi olmalı"); the product never uses that game's name, logo, candy art, characters, or sounds.

The app runs fully offline. Both faces are inlined as data URIs, sounds are synthesized with Web Audio, and every ornament (stars, hearts, badge, checkmark, bolt, sparkles) is inline SVG or CSS. The level-up screen is fixed, user-requested copy: "Fikret Hocam, emeğinize sağlık!" / "Teşekkürler!".

**Key Characteristics:**
- Six candy hues, each a fill / light / dark triple; plum ink for every word on cream or white.
- Jelly material on every raised surface, and a 3px white rim on every candy edge.
- Candy frames in fixed hues around cream wells: path blueberry, entry cherry, archive orange, legend apple, HUD grape.
- Chunky rounded display face with sticker strokes for headings, numbers, and rewards; rounded Nunito for everything the user typed.
- Squash-and-stretch motion with overshoot, synthesized chimes, and a quiet static version under reduced motion.

## Colors

A saturated six-candy palette on a pastel sugar sky, anchored by plum ink and cream wells.

### Primary
- **Grape Jelly** (grape / grape-light / grape-dark): the HUD bar, focus rings, text selection, the "next" node on the path, the inline-edit ring, and the level-up disc behind the words. Grape is the chrome of the game.
- **Apple Jelly** (apple / apple-light / apple-dark): the primary action only, the "Ekle!" button, plus apple task tiles and the legend frame.

### Secondary
- **Cherry Jelly** (cherry / cherry-light / cherry-dark): the entry frame, the active filter pill, Kumbara-chan's pedestal and ear lining, full hearts, and the candy-cane stripes on the day path.
- **Blueberry Jelly** (blueberry / blueberry-light / blueberry-dark): the "Bugünün yolu" frame and the secondary "Örnek görevleri ekle" button.
- **Orange Jelly** (orange / orange-light / orange-dark): the archive frame, the lower stop of every callout gradient and of the star bar, and the hot speed chip.
- **Lemon Jelly** (lemon / lemon-light / lemon-dark): the star-bar fill, the hover-tray ring, the entry focus outline, and the middle stop of callout gradients. Text on lemon is always plum ink.

### Tertiary
- **Coin Gold** (gold-light / gold / gold-deep): coins, lit stars, the level star badge, and the rim of the bank's slot.

### Neutral
- **Plum Ink** (ink): all body text, the heading "Görevler", the character outlines, and the outline under callouts.
- **Soft Plum** (ink-soft): secondary text, task metadata, and inactive filters.
- **Done Plum** (ink-done): finished task text and its metadata, struck through.
- **Placeholder Plum** (placeholder): input placeholder only. It measures 4.1:1 on cream, below AA for text this size, so it is not a model for any other text.
- **Cream Card** (cream-card): every recessed well: the task text well, the entry input, the path well, the archive and legend wells, and the floating task actions.
- **Paper** (paper): the white rim on every candy surface, sticker-text fill, the speech bubble, and the inline editor.
- **Wash** (wash): resting action pills and the calm speed chip.
- **Sugar Sky** (sky-top → sky-mid → sky-low, hill-back, hill-front): the fixed page ground, a vertical gradient with two white radial glows and two SVG hills.
- **Path neutrals** (track-casing, locked-node, star-unlit): the path's pale casing, locked nodes, and unlit stars in the HUD. Unlit stars on the path use a paler lilac (#d9c4e6).
- **Candy cream** (candy-cream, #fffbd1): the top stop of every callout and level-up title fill, before it turns lemon.
- **Character tones** (porcelain, blush, mouth, tear): the bodies, cheeks, open mouths, and teardrops of Kumbara-chan and the task creatures. Creature ears take their task's candy hue.
- **Danger** (danger): the hover fill of the delete action only.

### Named Rules
**The Six Candies Rule.** Every jelly surface takes exactly one of the six hue triples (fill, light, dark). There is no seventh hue and no mix between two. A task's hue comes from a hash of its id, so it keeps that hue for life, and its creature's ears, path node, and burst shards match it.

**The Plum Ink Rule.** Text on cream or white is always plum ink (ink, ink-soft, ink-done), never black or grey. White text sits only on a jelly fill, and only with a stroke or lip in that fill's dark tone. Lemon never carries white text.

**The Earned Gold Rule.** Gold is only for things the user earned: coins, lit stars, and the level star badge. Unlit stars are lilac and buttons are never gold.

**The Kept Hue Rule.** A finished tile keeps its candy hue. It turns paler (a 55% to 20% white veil) and flatter (a shallower lip and shadow), and never turns grey. Only the text changes, to Done Plum with a 2px strikethrough.

## Typography

**Display Font:** Candy Display = Baloo 2 ExtraBold (OFL, inlined; with Nunito, system-ui fallback)
**Body Font:** Nunito variable (OFL, inlined; with Segoe UI, system-ui fallback)

**Character:** A chunky, soft-cornered display face that looks like it was squeezed out of a piping bag, paired with a rounded, heavy-set UI face (base weight 600, emphasis 800) so even the metadata feels friendly. Candy Display is one ExtraBold file mapped across the whole weight range, so any declared weight renders ExtraBold. It was chosen over Lilita One, which the brief named, because Lilita lacks ğ, ş, and İ.

### Hierarchy
- **Callout** (clamp(2.6rem, 9vw, 4.25rem), 1.25, 0.02em): the centered combo words ("Tatlı!", "Leziz!", "Nefis!", "Enfes!", and the speed words "Şimşek!", "Muhteşem!", "Hızlı!") and the level-up title.
- **Headline** (1.85rem, 1.5rem under 640px, 1.1): "Görevler" in plum ink with an 8px white sticker stroke and a grape lip.
- **Score** (1.85rem, 1.5rem under 640px, 1): the HUD coin total and "Teşekkürler!" on the level-up screen. Tabular.
- **Reward** (1.5rem): the "+N" and "Hop!" pow words by Kumbara-chan and the "Yeni seviye" line.
- **Title** (1.25rem, 1rem in the bubble under 640px): frame headings, the "Ekle!" button, and Kumbara-chan's bubble.
- **Title small** (1.125rem): the level name, the badge number, fold summaries, and path node numbers.
- **Input** (Nunito 700, 1.125rem): the entry field.
- **Task** (Nunito 800, 1.0625rem): task text and the inline editor.
- **Body** (Nunito 600, 1rem, 1.45): the base, empty states.
- **Label** (Nunito 800, 0.9375rem): filters, path stats, fold counts, legend names, secondary button.
- **Meta** (Nunito 700–800, 0.875rem): task times, earned coins, speed chips, action pills, "next level" line.

### Named Rules
**The Two Voices Rule.** Candy Display is for the game's voice: headings, HUD and path numbers, rewards, buttons, and Kumbara-chan's lines. Nunito is for anything the user typed and all metadata. User task text never appears in the display face.

**The Sticker Text Rule.** Display text on a candy fill or on the sky is white (or plum ink) with a thick stroke painted beneath the fill (`paint-order: stroke fill`). On a frame the stroke is the frame's dark tone, on the sky it is paper, and on callouts it is ink. Stroke width grows with size: 5–6px on titles, 7px on reward words, 8px on the headline, 9px on "Teşekkürler!", 12px on callouts.

**The Readout Rule.** Every count uses tabular numerals: the score, the next-level line, path stats, fold counts, task times, earned coins, and speed chips.

**The Turkish Glyph Rule.** A display face ships only after ğ, ş, İ, ı, ç, ö, and ü have been checked in it. Missing Turkish glyphs are why Lilita One was replaced.

## Layout

A single centered column, 700px max, with 16px top, 20px side, and 72px bottom padding (10 / 12 / 56px under 640px). From top to bottom: a sticky HUD (10px from the top), Kumbara-chan's stage (a 132px character on a pedestal, with the speech bubble beside her taking the rest of the row), the day-path frame, the entry frame, the board head ("Görevler" plus the filter pills, wrapping), the tile list, then the archive and legend folds. Sections are spaced 18–30px apart (stage 18, path and board 22, folds 26, board head 30 above). Tiles are stacked 12px apart. Frames have 12px padding and 3px rims.

The HUD is a three-column grid (level | score and star bar | hearts and sound). Under 640px it becomes two columns and the score row moves to a full-width second line. Under 640px the mascot shrinks to 96px, filter pills stretch to full width, creatures shrink to 42px, and task actions wrap to a full-width row indented past the check and creature. The legend is an auto-fill grid of 200px minimum columns. The day path scrolls horizontally when it overflows, with a mask fading both edges.

## Elevation & Depth

Depth is candy: layered gradients and inset lips, not ambient grey shadow. Every raised surface uses the jelly recipe. Every piece of content sits in a recessed cream well cut into that surface. Drop shadows are vertical only (x offset 0), blurred, pulled in with a negative spread, and tinted with the surface's own dark tone. Hard 0-blur shadows appear only as the jelly's bottom lip (an inset) and as short vertical text lips under sticker text.

### Shadow Vocabulary
- **Jelly** (`inset 0 -4px 0 rgb(0 0 0 / 0.14), inset 0 2px 0 rgb(255 255 255 / 0.6), 0 8px 16px -8px <dark>`): buttons and path nodes. Frames and tiles use a deeper 5px lip and a 10–12px tinted drop.
- **Frame** (`inset 0 -5px 0 rgb(0 0 0 / 0.16), inset 0 2px 0 rgb(255 255 255 / 0.55), 0 12px 22px -12px <frame-dark>`): the four candy frames.
- **Cream well** (`inset 0 3px 6px rgb(58 20 80 / 0.16)`): every recessed well and the entry input.
- **Hover tray** (`0 0 0 4px lemon-light, 0 18px 30px -14px rgb(116 36 196 / 0.55)`): the white tray that glides under the hovered or focused tile.
- **Bubble** (`0 8px 18px -10px rgb(58 20 80 / 0.5)`): Kumbara-chan's speech bubble.

### Named Rules
**The Jelly Rule.** A raised candy surface always has all five layers: a white top gloss (45% fading to 0 by 34–48%), a fill gradient (light → fill → dark), a dark inset bottom lip, a white inset top hairline, and a drop shadow tinted in its dark tone. Never a neutral black drop shadow.

**The Cream Well Rule.** Readable content lives in a cream well (cream-card, 18px radius, inset plum shadow) inside its frame or tile. The only text that sits directly on a fill is sticker-stroked display text and small white pills.

## Shapes

Everything is round, and every candy edge has a 3px white rim. Frames take 28px corners, tiles 26px, the HUD, bubble, and empty state 22px, wells, inputs, and the primary button 18px, and the inline editor 10px. Filters, chips, stats, actions, the star bar, and the secondary button are full pills. Path nodes, the checkbox, coins, and the sound toggle are circles. Stars, hearts, the badge, the bolt, and the sparkle are inline SVG with white strokes and rounded joins. The speech bubble has a triangular tail on its left, drawn as two stacked border triangles (ink outline, paper fill). The day path's track is a thick pale casing with a dashed cherry-light center stroke (candy cane), bending up and down between nodes. The empty state is the only dashed box (3px white dashes on a translucent white fill).

## Components

### Buttons
Squishy and loud, they grow on hover and squash on press.
- **Shape:** 18px corners on the primary, full pill on the secondary, both with a 3px white rim.
- **Primary ("Ekle!"):** apple jelly, white Candy Display at 1.25rem with a 6px apple-dark sticker stroke, 26px side padding (16px under 640px). Hover scales to 1.05 and press to 0.95 over 150ms.
- **Secondary ("Örnek görevleri ekle"):** blueberry jelly pill, white Nunito 800 at 0.9375rem with a blueberry-dark lip, and a 1.04 scale on hover.
- **Sound toggle:** a 40px circle with a 70% white ring and a 20% white fill on the HUD, with a stroked SVG speaker. It shows waves when on and an x when off, uses `aria-pressed`, and saves its state under `localStorage "sound"`.

### Chips
- **Filter pills:** sit in a white 60% track with a 3px white rim. Inactive pills are soft plum text on transparent. The active pill is cherry jelly with white text and a cherry-dark lip.
- **Speed chip:** a wash pill with a grape-dark bolt and "+N hız bonusu · time left". The first-hour tier goes hot: a lemon-to-orange-light jelly, ink text and bolt, and a 1.4s glow ring pulse.
- **Stats pills:** 92% white pills with plum text on the path frame and archive summary.
- **Action pills ("Düzenle", "Arşivle", "Sil"):** wash pills in soft plum that fill grape on hover. Delete fills danger. With a pointer they are hidden until hover or focus and float in a cream capsule over the right end of the well, feathered with a cream shadow. On touch they are always visible.

### Cards / Containers
- **Candy frames:** every panel is a jelly frame (28px corners, 12px padding) around a cream well. Hues are fixed: the path is blueberry, the entry is cherry, the archive is orange, the legend is apple. A frame's heading or summary is Candy Display with the Sticker Text Rule in the frame's dark tone. The folds use a white chevron that rotates from −45° to 45° when opened.
- **HUD:** a grape jelly bar (22px corners, 3px rim), sticky. On the left, a gold star badge with the level number and the level name, plus the next-level line. In the middle, a gold coin with the score, and a star bar (a sunken plum track, a lemon-to-orange fill scaling over 600ms, and three stars that light gold with a jelly pop). On the right, five hearts for the streak (full hearts are cherry with a staggered heartbeat) and the sound toggle.

### Inputs / Fields
- **Entry slot:** a cream well inside the cherry frame, with plum 700 text at 1.125rem, a placeholder "Ne yapacaksın?", and a cherry caret. Focus moves to the frame as a 4px lemon-light outline; the input itself shows no ring.
- **Inline edit:** double-click or "Düzenle" swaps the task text for a white field in the same type, with a 3px grape ring. The action pills hide while editing.
- **Focus (global):** 3px grape outline, 3px offset.

### Task Tile (signature)
Each task is a jelly tile in its hue (minimum 76px tall, 26px corners, 3px rim). From left to right: a 36px round check (a cream socket ringed in the hue-light; when checked it fills with the hue and shows a white SVG tick), the 50px creature, and a cream text well with the task text and a meta line (times, earned coins with a small gold coin, speed chip). New tiles drop in (520ms). A finished tile squash-pops (600ms), its creature does a joy flip, and it follows the Kept Hue Rule. Archived creatures sit at 80% opacity.

### Hover Tray
With a pointer, one white tray (90% white, a 4px lemon-light ring, a grape-tinted shadow) glides under the hovered or focused tile (340ms, ease-glide), and the tile scales to 1.02. The tray appears in place rather than sliding in from where it last hid. One tray per list.

### Day Path ("Bugünün yolu")
A horizontal winding row of 46px numbered nodes in a cream well, joined by the candy-cane track. Each node finished today is a jelly in that task's hue with white stroked numbers (plum ink on lemon), and 1–3 gold stars beneath it (3 for a finish within the first hour). The next node is white with a grape ring and pulses. Locked nodes are flat lilac. The row shows at least 6 nodes and scrolls when it runs longer.

### Characters
- **Kumbara-chan:** a porcelain cat-shaped coin bank drawn in SVG with 4px plum outlines, cherry ear lining and glaze, a gloss stroke, a gold-rimmed coin slot, and blush. Moods are idle, happy, sleepy, and excited (star eyes). She breathes (3.6s), blinks (5.2s), and glances at the board while the user types. She hops when a task is finished, nods when one is added, and gets a lemon ray burst on level up. Her speech bubble (white, 3px ink border, Candy Display) pops on each new line.
- **Task creatures:** 50px gummy critters in porcelain with 2.2px ink outlines and ears in the task's hue. Their faces show the task's age and state (new, today, waiting with sweat, forgotten and crying, done and proud, archived and sleeping). They bob on staggered delays. The legend fold explains each face.

### Rewards and Effects
- **Coin flight:** a gold coin flies from the tile to the bank's slot (680ms, 520ms for the small add coin, ease-glide), with extra speed-bonus coins trailing behind. The score then settles.
- **Shards and sparkles:** 16 candy shards per finished tile (round drops and 5px-radius wrapped squares with a white rim) in the tile's hue, plus lemon, cherry, and blueberry. White four-point sparkles burst from Kumbara-chan.
- **Pow words:** white Candy Display at 1.5rem with a 7px ink stroke that pops up tilted beside Kumbara-chan ("+N", "Hop!", "Tamam!").
- **Callouts:** one centered word per finish that slams in tilted −4° and floats away (1300ms). It is built from two layers: the element carries a 12px ink outline and a plum drop, and a `::after` holding `data-text` carries the lemon-to-orange gradient fill with no stroke.

### Level-Up Overlay
A full-screen, opaque candy burst (a radial gradient from lemon-light through lemon, orange, cherry, and grape to grape-dark) with white conic rays turning every 6s. A grape-dark elliptical disc (44% × 22%) sits behind the words so they always read against the burst. The title "Fikret Hocam, emeğinize sağlık!" is callout-size, two-layer, and fills lemon to cherry. It slams in and rests at −3°. Below it are "Teşekkürler!" and then "Yeni seviye: <name>", each in white on a solid grape-dark pill with a 3px white rim. It fires with two shard bursts, sparkles, and the level chime, closes on its own after 2.2s, and closes on click. This copy is user-requested and fixed.

### Sound and Reduced Motion
Sounds are Web Audio tones synthesized on the spot: a two-note add blip, a four-note rising done arpeggio with a sparkle, a six-note level fanfare, and a falling undo. They are on by default, play only in response to user actions, and are behind the HUD toggle. Under `prefers-reduced-motion: reduce`, CSS switches off every animation and transition except the tray's opacity fade, and the script skips coin flight, shards, sparkles, pow words, and callouts. State still changes: the score updates immediately, nodes and stars light, and the level-up overlay still appears, without motion.

## Do's and Don'ts

### Do:
- **Do** build every raised candy surface from the full Jelly Rule recipe in one hue triple, with a 3px white rim.
- **Do** put readable content in cream wells (cream-card, 18px, inset plum shadow) inside candy frames and tiles.
- **Do** keep the frame hues fixed: path blueberry, entry cherry, archive orange, legend apple, HUD grape; apple is the primary action.
- **Do** keep a finished tile in its hue, paler and flatter, with Done Plum struck-through text.
- **Do** paint sticker strokes under the fill (`paint-order: stroke fill`) in the surface's dark tone.
- **Do** build gradient callouts as two layers: the ink outline on the element, the gradient fill in a `::after` reading `data-text`.
- **Do** use tabular numerals on every count.
- **Do** keep state changes under reduced motion and drop only flights, bursts, callouts, and loops.
- **Do** synthesize sounds with Web Audio, play them only on user actions, and keep the visible HUD toggle.
- **Do** check ğ, ş, İ, ı, ç, ö, ü in any display face before shipping it.

### Don't:
- **Don't** use Candy Crush's name, logo, candy art, characters, or sounds; it is a style reference only.
- **Don't** turn a finished task grey or strip its hue.
- **Don't** set user-typed task text in Candy Display.
- **Don't** put white text on lemon, or white text on any fill without a dark-tone stroke or lip.
- **Don't** use neutral black or diagonal drop shadows under candy; tint them in the dark tone and keep them vertical.
- **Don't** use gold for anything the user has not earned.
- **Don't** add a seventh candy hue or blend two hues on one surface.
- **Don't** put a text stroke on the same layer as clipped gradient text; the stroke covers the fill.
- **Don't** load fonts, images, or sounds from the network.

### Sanctioned detector exceptions
These are recorded in `.impeccable/config.json`. Everything else the detector reports is either fixed or absent; the current run reports zero findings.
- **gradient-text** (style.css, index.html): outlined, gradient-filled callout words are native to the pinned candy-puzzle world, limited to the `.fx-callout` and `.celebrate-title` `::after` fill layers.
- **repeating-stripes-gradient** (index.html): the day path's candy-cane track is a functional path, not decoration.
- **ai-color-palette** (index.html): plum ink (#3a1450) is the world's text color, chosen for contrast on candy fills.
- **bounce-easing** `cubic-bezier(0.3, 1.4, 0.5, 1)` (`--ease-jelly`) and `cubic-bezier(0.3, 1.5, 0.5, 1)` (style.css): squash-and-stretch overshoot is the game's jelly motion. It drives tile drop and pop, creature cheer and joy, node pop, star lighting, the mascot hop, the speech-bubble pop, and the level-up title slam. All of it is disabled under `prefers-reduced-motion`.
- **nested-cards** (index.html): a candy frame around a cream well is the panel structure of this world (Jelly + Cream Well); the flagged `p` is the archive empty-state text inside the archive fold's well.
