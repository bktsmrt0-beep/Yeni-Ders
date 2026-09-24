---
name: Kumbara
description: A single-screen Turkish todo app where every task drops a coin into a glazed cobalt coin bank.
colors:
  cobalt: "#1e3aa6"
  cobalt-deep: "#142a7c"
  cobalt-glaze: "#3053d4"
  cobalt-well: "#0b1a52"
  on-cobalt: "#eef2ff"
  on-cobalt-soft: "#bccaff"
  gold-light: "#ffe08a"
  gold: "#f4b92c"
  gold-deep: "#a8740c"
  gold-ink: "#5a3d00"
  ground: "#f2f5fa"
  paper: "#ffffff"
  line: "#dde3ee"
  wash: "#e6ebf4"
  ink: "#111c3a"
  ink-soft: "#4b5878"
  ink-done: "#5d667c"
  placeholder: "#66708a"
  danger: "#b42318"
  danger-wash: "#fdecea"
  glaze-foot: "rgb(6 14 52 / 0.55)"
typography:
  display:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(4rem, 6.5vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  display-compact:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "3.25rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.035em"
    fontFeature: "tnum"
  headline:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 650
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  message:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  subtitle:
    fontFamily: "Bricolage Grotesque, Segoe UI Variable Display, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 650
    lineHeight: 1.2
  entry:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.5
  ui:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label-small:
    fontFamily: "Segoe UI Variable Text, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "8px"
  md: "10px"
  lg: "14px"
  pill: "999px"
  round: "50%"
spacing:
  xs: "8px"
  sm: "14px"
  md: "28px"
  lg: "48px"
  xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.md}"
    padding: "0 22px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-deep}"
  button-action:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "6px 10px"
  button-action-hover:
    backgroundColor: "{colors.wash}"
    textColor: "{colors.ink}"
  button-action-danger-hover:
    backgroundColor: "{colors.danger-wash}"
    textColor: "{colors.danger}"
  input-entry:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "8px"
  chip-filter:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.sm}"
    padding: "6px 12px"
  chip-filter-active:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  filter-track:
    backgroundColor: "{colors.wash}"
    rounded: "{rounded.md}"
    padding: "3px"
  checkbox:
    backgroundColor: "{colors.paper}"
    rounded: "{rounded.round}"
    size: "26px"
  checkbox-checked:
    backgroundColor: "{colors.ink-done}"
  bank-panel:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.on-cobalt}"
    padding: "44px 36px 40px"
  bank-slot:
    backgroundColor: "{colors.cobalt-well}"
    rounded: "{rounded.pill}"
    width: "120px"
    height: "20px"
  stack-coin-filled:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.round}"
    width: "46px"
    height: "11px"
  flying-coin:
    backgroundColor: "{colors.gold}"
    rounded: "{rounded.round}"
    size: "28px"
---

# Design System: Kumbara

## Overview

**Creative North Star: "The Glazed Kumbara"**

The whole screen is a Turkish ceramic coin bank and the desk it sits on. A tall panel of glazed cobalt holds the savings: a recessed coin slot, the coin total at display scale, the current level, a stack of coin slots toward the next level, today's count and streak, and one short encouraging line. Beside it, a cool porcelain ground carries the working list in blue-black ink. The bank is the only rich surface; the list stays quiet so task text is always the clearest thing on the page.

Reward is physical and small. Finishing a task launches one gold coin on an arc into the bank total, which settles with a slight scale; adding a task drops a smaller coin. Nothing else moves on its own. Gold means earned money and nothing else, so its appearance always carries meaning.

The system rejects the category default of a white card list with a purple accent and checkbox confetti.

**Key Characteristics:**
- Two-field composition: glazed cobalt bank panel plus porcelain work surface.
- Gold reserved exclusively for earned coins.
- One display face (Bricolage Grotesque) for numerals and headings; system UI face for task text.
- Tabular numerals everywhere a count appears.
- Finished work drains to gray; open, done, and archived read as three distinct states.
- One signature motion (coin flight), exponential ease-out, no bounce, under 700ms. One supporting motion: the porcelain tray that glides under the hovered or focused row.

## Colors

A cool, high-contrast palette: saturated cobalt ceramic, cool porcelain neutrals with blue-black ink, and a single warm gold held back for reward.

### Primary
- **Kumbara Cobalt** (cobalt): the bank panel field, the primary "Kumbaraya at" button, unchecked checkbox rings, focus outlines, caret, and selection. The one interactive accent.
- **Deep Glaze Cobalt** (cobalt-deep): the bottom of the bank panel's vertical gradient and the primary button hover.
- **Glaze Highlight** (cobalt-glaze): the radial light at the top-left shoulder of the bank panel.
- **Slot Well** (cobalt-well): the darkest cobalt, for the inside of the recessed coin slot.
- **Porcelain on Cobalt** (on-cobalt) and **Pale Cobalt Text** (on-cobalt-soft): primary and secondary text on the bank panel and on cobalt buttons.

### Secondary
- **Coin Gold** (gold), with **Gold Light** (gold-light), **Gold Deep** (gold-deep), and **Gold Ink** (gold-ink): only the filled coins in the bank stack and the flying coin. Gold Deep draws the coin rim and lower edge; Gold Ink tints the flying coin's drop shadow.

### Neutral
- **Porcelain Ground** (ground): page background behind the list.
- **Paper White** (paper): the entry slot, active filter, and checkbox fill.
- **Hairline** (line): task row dividers and the archive top rule.
- **Wash** (wash): filter track and action-button hover.
- **Blue-Black Ink** (ink): headings, task text, active states.
- **Soft Ink** (ink-soft): counts, filter labels, action buttons, archived task text, empty states.
- **Done Gray** (ink-done): finished task text and the checked checkbox fill.
- **Placeholder** (placeholder): entry placeholder text only.
- **Danger** (danger) on **Danger Wash** (danger-wash): the delete action's hover state only.

### Named Rules
**The Earned Gold Rule.** Gold appears only on coins the user has earned: filled stack coins and the coin in flight. Never on buttons, checkmarks, badges, highlights, or text.

**The Drain to Gray Rule.** A finished task loses color: its checkbox fills Done Gray, its text goes Done Gray with a strikethrough. Completion is celebrated in the bank, not in the list.

## Typography

**Display Font:** Bricolage Grotesque (self-hosted variable, 200-800, OFL; falls back to Segoe UI Variable Display, Segoe UI, system-ui)
**Body Font:** Segoe UI Variable Text (with Segoe UI, system-ui, -apple-system)

**Character:** A chunky, slightly quirky grotesque for coin numerals and headings against a plain system face for the tasks themselves, so the reward layer has a voice and the working text stays neutral.

### Hierarchy
One ramp, exposed as `--text-*` custom properties in style.css; every font-size uses a step, never a literal.

| Step | Size | Use |
|---|---|---|
| `--text-display` | clamp(4rem, 6.5vw, 5.75rem) | Display (700, 0.95): the coin total only |
| `--text-display-compact` | 3.25rem | the coin total in the mobile band |
| `--text-3xl` | 1.85rem | Headline (700, 1.15): the page h1 "Görevler" |
| `--text-2xl` | 1.5rem | Title (650, 1.2): the bank level name; the h1 on mobile |
| `--text-xl` | 1.25rem | Message (600, 1.3, balanced wrap): the encouraging line; the "altın" unit (500) |
| `--text-lg` | 1.125rem | entry input; archive summary (display, 650); level name and message in the mobile band |
| `--text-body` | 1.0625rem | Body (400, 1.5): task text and the inline edit field |
| `--text-base` | 1rem | page base; primary button label (display, 650); today/streak record; the unit on mobile |
| `--text-sm` | 0.9375rem | Label: filters, counts, next-level line, the record on mobile. Active filter goes 600 |
| `--text-xs` | 0.875rem | row actions; next-level line on mobile |

### Named Rules
**The Readout Rule.** Every count (coin total, next level, today, streak, task counters) uses tabular numerals.

**The Two Voices Rule.** Display face for numbers, headings, and reward copy; system face for anything the user typed.

## Layout

Desktop is a two-column grid: the bank panel is a sticky, full-height left column (minmax(300px, 380px)); the board fills the rest with a centered column capped at 760px and padding 56px clamp(20px, 5vw, 72px) 80px. Order in the board: entry slot, then heading row (h1 with count left, segmented filters right, wrapping), then the open list, then the collapsible archive 48px below.

At 820px and below the grid collapses to one column. The bank becomes a compact cobalt band above the entry: total spanning two rows on the left, level and next-level beside it, record and message full width beneath. The coin slot and coin stack are hidden on mobile. Filters stretch to full width with equal segments; task actions wrap to their own line under the task text (always visible on touch, shown on hover or focus otherwise). The grid column is `minmax(0, 1fr)` so nothing can widen the page past the viewport.

Rhythm is loose around the bank (28px between groups) and tighter in the list (rows min 60px, 14px internal gap, 1px hairline dividers).

## Elevation & Depth

Depth is material, not layered UI chrome. The bank panel gets its depth from glaze: a cobalt gradient, pooled radial highlights on the upper shoulder, and a darkening at the foot. The coin slot is carved in with inset shadow and a lighter rim. Coins carry small physical shadows. On the porcelain side, the entry slot floats at rest; everything else is flat and separated by hairlines until the pointer or keyboard focus rests on a row, which lifts onto a Paper tray.

### Shadow Vocabulary
- **Entry float** (`box-shadow: 0 8px 22px -12px rgb(17 28 58 / 0.35)`): the entry slot at rest.
- **Entry focus** (`box-shadow: 0 0 0 3px rgb(30 58 166 / 0.16), 0 8px 22px -12px rgb(17 28 58 / 0.35)`): with a cobalt border when the input is focused.
- **Active segment** (`box-shadow: 0 1px 3px rgb(17 28 58 / 0.18)`): the selected filter lifted off its wash track.
- **Slot recess** (`box-shadow: inset 0 5px 7px rgb(0 0 0 / 0.7), 0 0 0 3px rgb(96 128 240 / 0.55), 0 3px 2px 3px rgb(200 214 255 / 0.28)`): the bank's coin mouth.
- **Coin in flight** (`box-shadow: inset 0 0 0 2px rgb(168 116 12 / 0.7), 0 6px 12px rgb(90 61 0 / 0.35)`).
- **Row tray** (`box-shadow: 0 14px 28px -16px rgb(17 28 58 / 0.45), 0 3px 8px -3px rgb(17 28 58 / 0.14)`): the Paper tray under the hovered or focused task row.

### Named Rules
**The Glaze Not Texture Rule.** The bank's ceramic look comes from gradients and pooled light only: no noise, grain, or image texture.

**The One Floating Thing Rule.** On the porcelain side at most one thing floats at a time besides the entry slot: the row under the pointer or keyboard focus, on its tray. Resting rows stay flat on hairlines. (Changed 2026-09-24 at the user's request: rows should come forward when hovered.)

## Shapes

Soft rectangles for controls (8px for small buttons and filter segments, 10px for the primary button and filter track, 14px for the entry slot), full circles for checkboxes and coins, and a pill for the coin slot. Stack coins are flattened ellipses (46 x 11px) seen edge-on; empty slots show a dashed pale-cobalt outline. The bank panel itself is a square-cornered full-height field.

## Components

### Buttons
- **Shape:** gently rounded (10px primary, 8px secondary).
- **Primary ("Kumbaraya at"):** cobalt fill, porcelain text, display face 650, padding 0 22px (0 14px on mobile), sits inside the entry slot. Hover darkens to Deep Glaze Cobalt.
- **Action (Düzenle, Arşivle / Geri al, Sil):** transparent, Soft Ink, 0.875rem; hover fills Wash and goes Ink. Delete hovers to Danger on Danger Wash. Actions are hidden until row hover or focus, always visible on touch.
- **Focus:** 2px cobalt outline, 2px offset, everywhere.

### Chips (segmented filters)
- **Style:** Wash track (3px padding, 10px radius) holding transparent segments in Soft Ink.
- **State:** the active segment turns Paper with Ink text, 600 weight, and the Active segment shadow.

### Inputs / Fields
- **Entry slot:** Paper container, 14px radius, 8px padding, Entry float shadow, transparent border; input text 1.125rem, no inner outline.
- **Focus:** the container takes a cobalt border and a soft cobalt ring.

### Task Row
- Flex row: round checkbox, text, actions; min-height 60px, hairline bottom divider. New rows slide in from 10px above over 420ms ease-out.
- **Checkbox:** 26px circle, 2px cobalt ring on Paper; hover tints to on-cobalt; checked fills Done Gray with a white SVG tick.
- **Archived rows:** text in Soft Ink inside a collapsible "Arşiv" section with a rotating chevron drawn from two borders.
- **Editing:** double-click on the text or the Düzenle action swaps the text for an inline Paper field with a 2px cobalt ring, same size as the task text, actions hidden. Enter or blur saves, Escape cancels, an empty value keeps the old text. Editing earns no coins.
- **Lifted row:** one Paper tray per list (14px radius, bleeding 14px past the row on both sides, Row tray shadow) glides to the row under the pointer or keyboard focus: transform and height over 340ms on cubic-bezier(0.16, 1, 0.3, 1). It fades in over 160ms where it first appears, never slides in from off-row. The lifted row scales to 1.018 from its left third, and its own and its upper neighbour's hairlines go transparent. The tray follows re-renders so a click never drops it. Touch-only devices get no tray; reduced motion keeps the tray but moves it instantly and drops the scale.

### Bank Panel (signature)
Glazed cobalt column: recessed slot, display-scale total with "altın" unit, level name, coin stack, next-level line, today and streak (always shown), and one balanced encouraging line (aria-live). The coin stack is flipped so coins fill bottom-up, one slot per coin unit, arranged in whole columns.

### Coin Flight (signature motion)
A 28px gold coin (16px for the small "add" coin) travels a quadratic arc from the checkbox or add button into the total, shrinking to 55%, over 680ms (520ms small) on cubic-bezier(0.16, 1, 0.3, 1). The total then settles from scale 1.08 to 1 over 380ms. Reduced-motion users get the state change without flight or transitions.

## Do's and Don'ts

### Do:
- **Do** keep gold on earned coins only (stack coins and the flying coin).
- **Do** fill checked checkboxes and finished text with Done Gray (ink-done), never cobalt or gold.
- **Do** use tabular numerals on every count.
- **Do** build ceramic depth from gradients and pooled radial light, darkening toward the foot.
- **Do** keep motion to the coin flight, total settle, and the gliding row tray: exponential ease-out, no bounce, under 700ms.
- **Do** collapse the bank into a compact cobalt band above the entry at 820px and below.

### Don't:
- **Don't** use gold for buttons, badges, checkmarks, or highlights.
- **Don't** add confetti, bouncing, or ambient animation.
- **Don't** add grain, noise, or image textures to the bank glaze.
- **Don't** set user-typed task text in the display face.
- **Don't** place persistent reward elements over task text; only the coin in flight may cross the list.
