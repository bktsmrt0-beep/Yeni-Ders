// Animated scenes: every action in the app plays one scene picked from that action's pool.
// app.js calls Scenes.init once, then Scenes.play("add" | "done" | "undo" | ...).
// Scenes are decoration only: they never touch tasks, coins or saved data.

const Scenes = (() => {
  let H = null;
  let live = 0;
  const MAX_LIVE = 3;
  const HOLD_MS = 2800;
  const GLIDE = "cubic-bezier(0.16, 1, 0.3, 1)";
  const CAT_TINTS = ["orange", "lemon", "grape-light", "blueberry-light", "cherry-light"];

  const W = () => window.innerWidth;
  const VH = () => window.innerHeight;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pickOne = (items) => items[Math.floor(Math.random() * items.length)];
  const wait = (fn, ms) => setTimeout(fn, ms);
  const center = (r) => ({ x: r.left + r.width / 2, y: r.top + r.height / 2 });

  // Candy-styled SVG art. Fills come from the design tokens so scenes match the world.
  const S = (fill, w = 2.5) => `style="fill:var(--${fill});stroke:var(--paper);stroke-width:${w};stroke-linejoin:round"`;
  const N = (fill) => `style="fill:var(--${fill})"`;
  const LINE = (stroke, w) => `style="fill:none;stroke:var(--${stroke});stroke-width:${w};stroke-linecap:round"`;

  const parcelInner = (body, ribbon) =>
    `<rect x="5" y="14" width="30" height="22" rx="6" ${S(body)}/>` +
    `<rect x="17.5" y="14" width="5" height="22" ${N(ribbon)}/>` +
    `<path d="M20 14 C10 2 4 10 20 14 C36 10 30 2 20 14Z" ${S(ribbon, 2)}/>`;

  const art = {
    parcel: (body = "cherry", ribbon = "lemon") => `<svg viewBox="0 0 40 40">${parcelInner(body, ribbon)}</svg>`,
    plane: () =>
      `<svg viewBox="0 0 120 60"><path d="M22 30 L8 8 L30 10 L44 28Z" ${S("cherry-dark")}/>` +
      `<path d="M52 34 L38 56 L64 56 L80 34Z" ${S("blueberry")}/>` +
      `<ellipse cx="62" cy="32" rx="40" ry="13" ${S("cherry")}/>` +
      `<path d="M44 27 Q62 22 84 26" ${LINE("cherry-light", 3)}/>` +
      `<circle cx="76" cy="30" r="4.5" ${N("blueberry-light")}/><circle cx="62" cy="30" r="4.5" ${N("blueberry-light")}/>` +
      `<ellipse cx="103" cy="32" rx="3" ry="14" ${N("ink-soft")} opacity="0.45"/></svg>`,
    cat: (tint) =>
      `<svg viewBox="0 0 60 66"><path d="M46 52 C62 50 62 32 52 28" ${LINE(tint, 6)}/>` +
      `<path d="M11 26 L12 4 L27 16Z" ${S(tint)}/><path d="M49 26 L48 4 L33 16Z" ${S(tint)}/>` +
      `<path d="M15 20 L15 10 L23 16Z" ${N("blush")}/><path d="M45 20 L45 10 L37 16Z" ${N("blush")}/>` +
      `<ellipse cx="30" cy="40" rx="21" ry="20" ${S(tint)}/>` +
      `<ellipse cx="22" cy="37" rx="2.6" ry="3.4" ${N("ink")}/><ellipse cx="38" cy="37" rx="2.6" ry="3.4" ${N("ink")}/>` +
      `<circle cx="23" cy="35.6" r="1" ${N("paper")}/><circle cx="39" cy="35.6" r="1" ${N("paper")}/>` +
      `<ellipse cx="14.5" cy="44" rx="4" ry="2.4" ${N("blush")}/><ellipse cx="45.5" cy="44" rx="4" ry="2.4" ${N("blush")}/>` +
      `<path d="M26 45 Q28 48 30 45 Q32 48 34 45" ${LINE("ink", 1.8)}/>` +
      `<ellipse cx="20" cy="60" rx="7" ry="4.5" ${S(tint)}/><ellipse cx="40" cy="60" rx="7" ry="4.5" ${S(tint)}/></svg>`,
    balloon: (fill) =>
      `<svg viewBox="0 0 50 70"><path d="M25 46 C19 54 31 60 25 70" ${LINE("ink-soft", 1.6)}/>` +
      `<path d="M25 44 L21 50 L29 50Z" ${S(fill, 2)}/>` +
      `<ellipse cx="25" cy="23" rx="20" ry="23" ${S(fill)}/>` +
      `<path d="M13 16 Q16 8 24 6" ${LINE("paper", 3)} opacity="0.75"/></svg>`,
    rocket: () =>
      `<svg viewBox="0 0 40 90"><path class="flame" style="fill:var(--orange);transform-origin:20px 64px" d="M13 64 Q20 98 27 64Z"/>` +
      `<path d="M10 52 L0 76 L13 66Z" ${S("lemon")}/><path d="M30 52 L40 76 L27 66Z" ${S("lemon")}/>` +
      `<path d="M20 2 C34 16 34 46 30 66 L10 66 C6 46 6 16 20 2Z" ${S("cherry")}/>` +
      `<circle cx="20" cy="36" r="7" ${S("blueberry-light", 2.5)}/></svg>`,
    dolphin: () =>
      `<svg viewBox="0 0 90 50"><path d="M4 34 C14 8 52 2 74 20 C80 25 85 24 89 17 C89 31 83 37 76 37 C60 46 28 48 4 34Z" ${S("blueberry")}/>` +
      `<path d="M30 12 L40 -2 L46 12Z" ${S("blueberry-dark")}/>` +
      `<path d="M14 36 C34 44 58 42 72 34 C60 46 30 48 14 36Z" ${N("candy-cream")}/>` +
      `<circle cx="66" cy="21" r="2.6" ${N("ink")}/></svg>`,
    parachute: () =>
      `<svg viewBox="0 0 60 84"><path d="M8 28 L23 60 M30 28 L30 60 M52 28 L37 60" ${LINE("ink-soft", 1.5)}/>` +
      `<path d="M3 28 C3 2 57 2 57 28 C47 22 39 22 30 28 C21 22 13 22 3 28Z" ${S("cherry")}/>` +
      `<path d="M21 9 C19 18 22 24 26 26 M39 9 C41 18 38 24 34 26" ${LINE("lemon", 5)}/>` +
      `<svg x="16" y="54" width="28" height="28" viewBox="0 0 40 40">${parcelInner("lemon", "cherry")}</svg></svg>`,
    star: (fill) =>
      `<svg viewBox="0 0 24 24"><path d="M12 1.5 L15 8.6 L22.5 9.2 L16.8 14.1 L18.6 21.6 L12 17.6 L5.4 21.6 L7.2 14.1 L1.5 9.2 L9 8.6Z" ${S(fill, 2)}/></svg>`,
    heart: () => `<svg viewBox="0 0 24 24"><path d="M12 21 C-4 10 4 -1 12 6.5 C20 -1 28 10 12 21Z" ${S("cherry-light", 2)}/></svg>`,
    drop: (fill) =>
      `<svg viewBox="0 0 20 28"><path d="M10 1 C16 10 18 15 18 18 A8 8 0 0 1 2 18 C2 15 4 10 10 1Z" ${S(fill, 2)}/></svg>`,
    candy: (fill) =>
      `<svg viewBox="0 0 40 24"><path d="M9 12 L0 3 L0 21Z" ${S(fill, 2)}/><path d="M31 12 L40 3 L40 21Z" ${S(fill, 2)}/>` +
      `<ellipse cx="20" cy="12" rx="12" ry="9" ${S(fill, 2.5)}/><path d="M13 9 Q16 6 21 6" ${LINE("paper", 2)} opacity="0.7"/></svg>`,
    chest: () =>
      `<svg viewBox="0 0 84 64"><rect x="6" y="26" width="72" height="34" rx="7" ${S("orange-dark")}/>` +
      `<rect x="6" y="40" width="72" height="6" ${N("lemon")}/>` +
      `<rect x="37" y="36" width="10" height="14" rx="3" ${S("lemon", 2)}/>` +
      `<g class="lid" style="transform-origin:8px 26px"><path d="M6 26 C6 4 78 4 78 26Z" ${S("orange")}/>` +
      `<rect x="37" y="18" width="10" height="9" rx="2" ${N("lemon")}/></g></svg>`,
    giftBox: () =>
      `<svg viewBox="0 0 70 70"><rect x="8" y="30" width="54" height="36" rx="6" ${S("gold")}/><rect x="31" y="30" width="8" height="36" ${N("cherry")}/></svg>`,
    giftLid: () =>
      `<svg viewBox="0 0 70 30"><rect x="4" y="12" width="62" height="16" rx="6" ${S("gold-light")}/><rect x="31" y="12" width="8" height="16" ${N("cherry")}/>` +
      `<path d="M35 12 C22 -2 12 8 35 12 C58 8 48 -2 35 12Z" ${S("cherry", 2)}/></svg>`,
    pencil: () =>
      `<svg viewBox="0 0 40 40"><path d="M6 34 L10 24 L28 6 L34 12 L16 30Z" ${S("lemon")}/><path d="M6 34 L10 24 L16 30Z" ${S("blush", 2)}/>` +
      `<path d="M28 6 L32 2 L38 8 L34 12Z" ${S("cherry", 2)}/></svg>`,
  };

  function actor(html, w, h, className = "actor") {
    const el = document.createElement("span");
    el.className = className;
    if (w) el.style.width = `${w}px`;
    if (h) el.style.height = `${h}px`;
    if (html) el.innerHTML = html;
    document.body.append(el);
    return el;
  }

  function shard(color) {
    const el = actor("", 0, 0, "fx-shard");
    el.style.setProperty("--shard", `var(--${color})`);
    return el;
  }

  // stops: { x, y, at (0..1), r, s | sx/sy, o, ease }. The element is removed when the timeline ends.
  function fly(el, stops, duration, delay = 0) {
    const keyframes = stops.map((s) => ({
      transform:
        `translate(${s.x}px, ${s.y}px) translate(-50%, -50%) rotate(${s.r ?? 0}deg) ` +
        `scale(${s.sx ?? s.s ?? 1}, ${s.sy ?? s.s ?? 1})`,
      opacity: s.o ?? 1,
      offset: s.at,
      easing: s.ease ?? "linear",
    }));
    const run = el.animate(keyframes, { duration, delay, fill: "both", easing: "linear" });
    const done = () => el.remove();
    run.finished.then(done, done);
    return run;
  }

  // Points along a hop from a to b that peaks `lift` px above the straight line.
  function hop(a, b, lift, t0, t1, steps = 6, tilt = 0) {
    return Array.from({ length: steps + 1 }, (_, i) => {
      const u = i / steps;
      return {
        x: a.x + (b.x - a.x) * u,
        y: a.y + (b.y - a.y) * u - lift * 4 * u * (1 - u),
        r: tilt * Math.sin(u * Math.PI),
        at: t0 + (t1 - t0) * u,
      };
    });
  }

  function target() {
    const r = document.getElementById("mascot").getBoundingClientRect();
    if (r.bottom > 40 && r.top < VH() - 40) return { x: r.left + r.width / 2, y: r.top + r.height * 0.4, seen: true };
    return { ...H.coinPoint(), seen: false };
  }

  // A small parcel arcs into the bank slot; `lift` is how high it arcs over the way.
  function deliver(c, x, y, lift = 0) {
    const { T } = c;
    const box = actor(c.gold ? art.parcel("gold", "cherry") : art.parcel(), 34, 34);
    const mx = (x + T.x) / 2;
    const my = Math.min(y, T.y) - lift;
    H.sound("drop");
    fly(box, [
      { x, y, r: -20, s: 0.7, at: 0, ease: "ease-out" },
      { x: mx, y: my, r: 12, s: 1, at: 0.45, ease: "ease-in" },
      { x: T.x, y: T.y - 8, r: 0, s: 1, at: 0.85 },
      { x: T.x, y: T.y + 2, r: 0, s: 0.15, o: 0, at: 1 },
    ], 640);
    wait(() => landed(c), 560);
  }

  function landed(c) {
    const { T } = c;
    H.sparkle(T.x, T.y, c.gold ? 14 : 8, 70);
    H.cheer();
    if (c.gold) {
      H.sound("gift");
      H.word("Altın paket!", T.x, T.y + 44, -6, false);
    } else {
      H.sound("chime");
    }
  }

  function label(text, x, y, big = false) {
    H.word(text, x, y, big ? -6 : -12 + Math.random() * 8, big);
  }

  // ---- Add: a delivery reaches Kumbara-chan ------------------------------------------------

  function addPlane(c) {
    const { T } = c;
    const dur = 2100;
    const y = Math.max(70, T.y - 100);
    const plane = actor(art.plane(), 120, 60);
    fly(plane, [
      { x: -90, y: y + 40, r: -6, at: 0 },
      { x: T.x, y, r: 0, at: 0.46 },
      { x: W() + 110, y: y - 50, r: -10, at: 1 },
    ], dur);
    H.sound("whoosh");
    wait(() => deliver(c, T.x, y + 14), dur * 0.46);
  }
  addPlane.needsView = true;

  function addCat(c) {
    const { T } = c;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const dur = 2600;
    const vh = VH();
    const span = Math.max(120, vh - T.y);
    const p = [
      { x: T.x + dir * 150, y: vh + 50 },
      { x: T.x - dir * 70, y: T.y + span * 0.62 },
      { x: T.x + dir * 60, y: T.y + span * 0.3 },
      { x: T.x + dir * 44, y: T.y + 46 },
    ];
    const exit = { x: T.x + dir * 190, y: vh + 60 };
    const cat = actor(art.cat(pickOne(CAT_TINTS)), 62, 66);
    fly(cat, [
      ...hop(p[0], p[1], 46, 0, 0.18, 6, dir * 10),
      ...hop(p[1], p[2], 46, 0.18, 0.36, 6, -dir * 10),
      ...hop(p[2], p[3], 40, 0.36, 0.54, 6, dir * 10),
      { ...p[3], r: -dir * 14, at: 0.6 },
      { ...p[3], r: dir * 14, at: 0.66 },
      { ...p[3], r: 0, at: 0.72 },
      ...hop(p[3], exit, 30, 0.72, 1, 8, dir * 8),
    ], dur);
    wait(() => {
      H.sound("meow");
      deliver(c, p[3].x, p[3].y - 20, 36);
    }, dur * 0.56);
  }

  function addBalloon(c) {
    const { T } = c;
    const dur = 2400;
    const vh = VH();
    const x0 = T.x + rand(-70, 70);
    const endY = T.y - 34;
    const stops = Array.from({ length: 10 }, (_, i) => {
      const u = i / 9;
      const lift = 1 - (1 - u) ** 2;
      return {
        x: x0 + (T.x - x0) * u + Math.sin(u * Math.PI * 3) * 22,
        y: vh + 90 + (endY - vh - 90) * lift,
        r: Math.cos(u * Math.PI * 3) * 6,
        at: u * 0.74,
      };
    });
    const last = stops[stops.length - 1];
    const fill = pickOne(["grape-light", "blueberry-light", "cherry-light", "apple-light", "lemon-light"]);
    const balloon = actor(art.balloon(fill), 50, 70);
    const box = actor(art.parcel(), 34, 34);
    fly(balloon, [...stops, { ...last, s: 1.35, o: 0, at: 0.77 }, { ...last, o: 0, at: 1 }], dur);
    fly(box, [
      ...stops.map((s) => ({ ...s, y: s.y + 52, r: s.r * 1.4 })),
      { x: T.x, y: T.y - 4, s: 0.2, o: 0, at: 0.94 },
      { x: T.x, y: T.y - 4, s: 0.2, o: 0, at: 1 },
    ], dur);
    wait(() => {
      H.sound("pop");
      H.burst(last.x, last.y - 10, "grape", 12);
    }, dur * 0.74);
    wait(() => landed(c), dur * 0.93);
  }

  function addRocket(c) {
    const { T } = c;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const dur = 1600;
    const start = { x: T.x - dir * (W() * 0.5 + 80), y: VH() + 80 };
    const end = { x: T.x + (T.x - start.x) * 0.8, y: T.y + (T.y - start.y) * 0.8 };
    const angle = (Math.atan2(end.y - start.y, end.x - start.x) * 180) / Math.PI + 90;
    const rocket = actor(art.rocket(), 34, 76);
    rocket.querySelector(".flame").animate(
      [{ transform: "scaleY(0.7)" }, { transform: "scaleY(1.15)" }],
      { duration: 110, iterations: Infinity, direction: "alternate" },
    );
    fly(rocket, [
      { ...start, r: angle, at: 0, ease: "ease-in" },
      { x: T.x, y: T.y, r: angle, at: 0.55 },
      { ...end, r: angle, at: 1 },
    ], dur);
    H.sound("whoosh");
    for (let i = 1; i <= 4; i++) {
      const u = i / 5;
      wait(() => H.sparkle(start.x + (T.x - start.x) * u * 1.05, start.y + (T.y - start.y) * u * 1.05, 3, 40), dur * 0.55 * u);
    }
    wait(() => deliver(c, T.x, T.y - 50, 40), dur * 0.55);
  }

  function addDolphin(c) {
    const { T } = c;
    const dir = Math.random() < 0.5 ? -1 : 1;
    const dur = 2000;
    const a = { x: T.x - dir * 280, y: T.y + 110 };
    const b = { x: T.x + dir * 280, y: T.y + 110 };
    const stops = hop(a, b, 240, 0, 1, 14).map((s) => ({ ...s, r: dir * (-45 + 90 * s.at), sx: dir }));
    fly(actor(art.dolphin(), 90, 50), stops, dur);
    H.sound("whoosh");
    wait(() => deliver(c, T.x, T.y - 128, 60), dur * 0.5);
  }
  addDolphin.needsView = true;

  function addParachute(c) {
    const { T } = c;
    const dur = 2600;
    const x0 = T.x + rand(-80, 80);
    const stops = Array.from({ length: 11 }, (_, i) => {
      const u = i / 10;
      return {
        x: x0 + (T.x - x0) * u + Math.sin(u * Math.PI * 4) * 26 * (1 - u * 0.6),
        y: -70 + (T.y - 40 + 70) * u,
        r: Math.cos(u * Math.PI * 4) * 9 * (1 - u * 0.5),
        at: u * 0.88,
      };
    });
    fly(actor(art.parachute(), 60, 84), [
      ...stops,
      { x: T.x, y: T.y, s: 0.25, o: 0, at: 1 },
    ], dur);
    wait(() => landed(c), dur * 0.94);
  }
  addParachute.needsView = true;

  // ---- Done: a celebration, a gift when the speed bonus was earned ------------------------

  function doneFireworks(c) {
    const hues = ["lemon", "cherry", "blueberry", "apple", "grape", "orange"];
    for (let i = 0; i < 3; i++) {
      wait(() => {
        const x = rand(0.2, 0.8) * W();
        const y = rand(0.15, 0.4) * VH();
        fly(actor(art.star("lemon"), 14, 14), [
          { x, y: VH() + 10, at: 0, ease: "ease-out" },
          { x, y, s: 0.6, at: 1 },
        ], 520);
        wait(() => {
          H.sound("pop");
          H.burst(x, y, pickOne(hues), 22);
          H.sparkle(x, y, 10, 110);
        }, 520);
      }, i * 260);
    }
  }

  function fallingStars(count, colors) {
    for (let i = 0; i < count; i++) {
      const size = rand(16, 30);
      const x = rand(0.05, 0.95) * W();
      const x2 = x + rand(-40, 40);
      const y2 = VH() * rand(0.6, 0.95);
      fly(actor(art.star(pickOne(colors)), size, size), [
        { x, y: -30, at: 0, ease: "ease-in" },
        { x: x2, y: y2, r: rand(-240, 240), at: 0.85 },
        { x: x2, y: y2, r: rand(-260, 260), o: 0, at: 1 },
      ], rand(1200, 1900), i * 50);
    }
    H.sound("chime");
  }

  function doneStarRain() {
    fallingStars(18, ["lemon", "lemon-light", "cherry-light", "blueberry-light", "apple-light"]);
  }

  function doneCatDance(c) {
    const vh = VH();
    const x = Math.min(W() - 60, Math.max(60, center(c.from).x + rand(-1, 1) * c.from.width * 0.35));
    const up = vh - 52;
    const cat = actor(art.cat(pickOne(CAT_TINTS)), 62, 66);
    fly(cat, [
      { x, y: vh + 60, at: 0, ease: GLIDE },
      { x, y: up - 18, s: 1.12, at: 0.2 },
      { x, y: up, r: -14, at: 0.3 },
      { x, y: up - 14, r: 14, at: 0.4 },
      { x, y: up, r: -14, at: 0.5 },
      { x, y: up - 14, r: 14, at: 0.6 },
      { x, y: up, r: 0, at: 0.7 },
      { x, y: vh + 60, at: 0.92 },
      { x, y: vh + 60, at: 1 },
    ], 1700);
    H.sound("meow");
    wait(() => H.sparkle(x, up - 30, 8, 70), 380);
    wait(() => H.sparkle(x, up - 30, 8, 70), 900);
  }

  function doneHearts() {
    const T = target();
    H.sound("chime");
    for (let i = 0; i < 7; i++) {
      const x = T.x + rand(-50, 50);
      const size = rand(20, 32);
      fly(actor(art.heart(), size, size), [
        { x, y: T.y, s: 0.3, o: 0, at: 0 },
        { x: x + rand(-25, 25), y: T.y - 60, s: 1, at: 0.25 },
        { x: x + rand(-40, 40), y: T.y - 150 - rand(0, 40), o: 0, at: 1, r: rand(-20, 20) },
      ], rand(1300, 1800), i * 110);
    }
  }

  function doneGift(c) {
    const cx = W() / 2;
    const cy = VH() * 0.36;
    const box = actor(art.giftBox(), 70, 70);
    const lid = actor(art.giftLid(), 70, 30);
    const lidY = cy - 18;
    fly(box, [
      { x: cx, y: -60, at: 0, ease: "ease-in" },
      { x: cx, y: cy, at: 0.3 },
      { x: cx, y: cy, r: -8, at: 0.36 },
      { x: cx, y: cy, r: 8, at: 0.42 },
      { x: cx, y: cy, r: -8, at: 0.48 },
      { x: cx, y: cy, r: 0, at: 0.54 },
      { x: cx, y: cy, o: 1, at: 0.8 },
      { x: cx, y: cy, s: 0.6, o: 0, at: 1 },
    ], 1500);
    fly(lid, [
      { x: cx, y: -60 - 18, at: 0, ease: "ease-in" },
      { x: cx, y: lidY, at: 0.3 },
      { x: cx, y: lidY, r: -8, at: 0.36 },
      { x: cx, y: lidY, r: 8, at: 0.42 },
      { x: cx, y: lidY, r: -8, at: 0.48 },
      { x: cx, y: lidY, r: 0, at: 0.54, ease: "ease-out" },
      { x: cx + 60, y: lidY - 120, r: 50, o: 0, at: 0.8 },
      { x: cx + 60, y: lidY - 120, r: 50, o: 0, at: 1 },
    ], 1500);
    H.sound("drop");
    wait(() => {
      H.sound("gift");
      H.burst(cx, cy - 20, "lemon", 26);
      H.sparkle(cx, cy - 20, 14, 150);
      const coin = H.coinPoint();
      for (let i = 0; i < 7; i++) {
        fly(actor(art.star("lemon"), 24, 24), [
          { x: cx, y: cy - 20, s: 0.4, at: 0 },
          { x: cx + rand(-90, 90), y: cy - 90 - rand(0, 40), s: 1.1, at: 0.35, ease: "ease-in" },
          { x: coin.x, y: coin.y, s: 0.5, o: 0.9, at: 1 },
        ], 900, i * 70);
      }
    }, 1500 * 0.55);
  }

  function doneBalloon(c) {
    const x = W() * rand(0.3, 0.7);
    const y = VH() * 0.4;
    const balloon = actor(art.balloon("blueberry-light"), 62, 86);
    fly(balloon, [
      { x, y: VH() + 90, at: 0, ease: "ease-out" },
      { x: x + 18, y: y + 40, r: 5, at: 0.55 },
      { x, y, r: -4, at: 0.8 },
      { x, y, s: 1.4, o: 0, at: 0.86 },
      { x, y, o: 0, at: 1 },
    ], 1500);
    wait(() => {
      H.sound("pop");
      H.burst(x, y - 10, "blueberry", 14);
      const coin = H.coinPoint();
      fly(actor(art.star("lemon"), 28, 28), [
        { x, y: y - 10, s: 0.4, at: 0 },
        { x, y: y - 60, s: 1.2, at: 0.3, ease: "ease-in" },
        { x: coin.x, y: coin.y, s: 0.5, at: 1 },
      ], 800);
      wait(() => H.sound("chime"), 700);
    }, 1500 * 0.85);
  }

  function doneChocolate() {
    H.sound("chime");
    for (let i = 0; i < 14; i++) {
      const x = rand(0.05, 0.95) * W();
      const y2 = VH() * rand(0.55, 0.9);
      const w = rand(28, 42);
      fly(actor(art.candy(pickOne(["orange-dark", "orange-dark", "lemon-dark"])), w, w * 0.6), [
        { x, y: -30, r: rand(-30, 30), at: 0, ease: "ease-in" },
        { x: x + rand(-30, 30), y: y2, r: rand(-200, 200), at: 0.85 },
        { x: x + rand(-30, 30), y: y2 + 20, o: 0, at: 1 },
      ], rand(1200, 1700), i * 60);
    }
  }

  // ---- Undo: things flow backwards ---------------------------------------------------------

  function spiral(cx, cy, count, colors, inward = true, ms = 800) {
    for (let i = 0; i < count; i++) {
      const a0 = (i / count) * Math.PI * 2;
      const stops = Array.from({ length: 9 }, (_, k) => {
        const u = k / 8;
        const radius = 120 * (inward ? 1 - u : u);
        const angle = a0 + u * Math.PI * (inward ? 2.2 : -2.2);
        return {
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius * 0.8,
          s: inward ? 1 - 0.5 * u : 0.5 + 0.5 * u,
          o: k === 8 ? 0 : 1,
          at: u,
        };
      });
      fly(shard(pickOne(colors)), stops, ms, i * 35);
    }
  }

  function undoRewind(c) {
    const rc = center(c.from);
    H.sound("rewind");
    spiral(rc.x, rc.y, 12, [c.hue, "lemon", "paper"]);
    wait(() => label("Geri sar!", rc.x, rc.y - 14), 120);
  }

  function undoCoins(c) {
    const rc = center(c.from);
    const T = target();
    H.sound("rewind");
    const count = Math.max(1, Math.min(4, c.refund || 1));
    for (let i = 0; i < count; i++) {
      const coin = actor("", 0, 0, "flying-coin");
      fly(coin, [
        { x: T.x, y: T.y, s: 0.6, at: 0, ease: "ease-out" },
        { x: (T.x + rc.x) / 2 + rand(-40, 40), y: Math.min(T.y, rc.y) - 60, s: 1, at: 0.5, ease: "ease-in" },
        { x: rc.x, y: rc.y, s: 0.9, at: 0.92 },
        { x: rc.x, y: rc.y, s: 0.2, o: 0, at: 1 },
      ], 720, i * 110);
    }
    wait(() => {
      H.sparkle(rc.x, rc.y, 8, 70);
      label("Geri!", rc.x, rc.y - 14);
    }, 700);
  }

  function undoCat(c) {
    const rc = center(c.from);
    const T = target();
    const dur = 1900;
    const dir = rc.x > W() / 2 ? -1 : 1;
    const start = { x: T.x + dir * 30, y: T.y + 60 };
    const end = { x: rc.x + dir * 40, y: rc.y };
    const away = { x: rc.x + dir * 190, y: VH() + 60 };
    fly(actor(art.cat(pickOne(CAT_TINTS)), 62, 66), [
      ...hop(start, end, 60, 0, 0.5, 8, dir * 10),
      { ...end, r: dir * 14, at: 0.6 },
      { ...end, r: -dir * 14, at: 0.68 },
      { ...end, r: 0, at: 0.74 },
      ...hop(end, away, 30, 0.74, 1, 6, dir * 8),
    ], dur);
    H.sound("meow");
    wait(() => {
      H.sparkle(rc.x, rc.y, 8, 70);
      label("Geri!", rc.x, rc.y - 14);
    }, dur * 0.52);
  }

  // ---- Delete: melt, pop, a thief cat, a hole ----------------------------------------------

  function deleteMelt(c) {
    const R = c.from;
    H.sound("puff");
    for (let i = 0; i < 8; i++) {
      const x = R.left + R.width * ((i + 0.5) / 8) + rand(-8, 8);
      const y = R.bottom - 12;
      const size = rand(16, 24);
      fly(actor(art.drop(c.hue), size, size * 1.4), [
        { x, y, sy: 0.3, o: 0, at: 0 },
        { x, y: y + 6, sy: 1, at: 0.15 },
        { x, y: y + 150, sx: 0.8, sy: 1.5, at: 0.85, ease: "ease-in" },
        { x, y: y + 160, sx: 0.8, sy: 1.5, o: 0, at: 1 },
      ], rand(700, 1000), i * 50);
    }
    const rc = center(R);
    wait(() => label("Puf!", rc.x, rc.y), 120);
  }

  function deletePop(c) {
    const rc = center(c.from);
    H.sound("pop");
    H.burst(rc.x, rc.y, c.hue, 20);
    H.sparkle(rc.x, rc.y, 10, 100, true);
    label("Pat!", rc.x, rc.y);
  }

  function deleteThief(c) {
    const rc = center(c.from);
    const dir = Math.random() < 0.5 ? -1 : 1;
    const dur = 1500;
    const x0 = dir === 1 ? -50 : W() + 50;
    const x1 = dir === 1 ? W() + 60 : -60;
    const stops = Array.from({ length: 25 }, (_, i) => {
      const u = i / 24;
      return {
        x: x0 + (x1 - x0) * u,
        y: rc.y - Math.abs(Math.sin(u * Math.PI * 8)) * 12,
        r: Math.sin(u * Math.PI * 8) * 7,
        sx: dir,
        at: u,
      };
    });
    const grab = 0.5;
    fly(actor(art.cat(pickOne(CAT_TINTS)), 62, 66), stops, dur);
    fly(actor(art.parcel(c.hue, "lemon"), 34, 34), stops.map((s) => ({
      ...s,
      x: s.x + dir * 30,
      y: s.y + 10,
      sx: 1,
      r: 0,
      o: s.at < grab ? 0 : 1,
    })), dur);
    H.sound("whoosh");
    wait(() => {
      H.sound("pop");
      H.burst(rc.x, rc.y, c.hue, 10);
      label("Kaptı!", rc.x, rc.y - 20);
    }, dur * grab);
  }

  function deleteHole(c) {
    const rc = center(c.from);
    const orb = actor("", 0, 0, "fx-orb");
    fly(orb, [
      { ...rc, s: 0, at: 0 },
      { ...rc, s: 1.15, r: 120, at: 0.25, ease: "ease-out" },
      { ...rc, s: 1, r: 360, at: 0.7 },
      { ...rc, s: 0, r: 520, o: 0, at: 1 },
    ], 1000);
    H.sound("rewind");
    spiral(rc.x, rc.y, 12, [c.hue, "grape-light", "paper"], true, 800);
    wait(() => label("Vınn!", rc.x, rc.y - 40), 200);
  }

  // ---- Archive: a chest, or a cat carries the task away ------------------------------------

  function chestScene(c, into) {
    const dur = 1700;
    const x = W() / 2;
    const y = VH() - 52;
    const chest = actor(art.chest(), 84, 64);
    fly(chest, [
      { x, y: VH() + 60, s: 0.6, at: 0, ease: GLIDE },
      { x, y, s: 1, at: 0.2 },
      { x, y, at: 0.78, ease: "ease-in" },
      { x, y: VH() + 60, s: 0.6, at: 1 },
    ], dur);
    chest.querySelector(".lid").animate(
      [
        { transform: "rotate(0deg)", offset: 0 },
        { transform: "rotate(0deg)", offset: 0.2 },
        { transform: "rotate(-62deg)", offset: 0.32 },
        { transform: "rotate(-62deg)", offset: 0.6 },
        { transform: "rotate(0deg)", offset: 0.7 },
        { transform: "rotate(0deg)", offset: 1 },
      ],
      { duration: dur, easing: "ease-in-out" },
    );
    H.sound("drop");
    const rc = center(c.from);
    const list = H.listRect();
    const spot = { x: list.left + list.width / 2, y: Math.max(90, list.top + 30) };
    wait(() => {
      const card = actor(art.parcel(c.hue, "lemon"), 36, 36);
      const from = into ? rc : { x, y: y - 18 };
      const to = into ? { x, y: y - 20 } : spot;
      const mid = { x: (from.x + to.x) / 2, y: Math.min(from.y, to.y) - 80 };
      fly(card, [
        { ...from, r: -20, s: 1, at: 0, ease: "ease-out" },
        { ...mid, r: 15, s: 0.9, at: 0.5, ease: "ease-in" },
        { ...to, r: 0, s: into ? 0.35 : 1, o: into ? 0.4 : 1, at: 1 },
      ], 650);
      wait(() => {
        H.sound("chime");
        H.sparkle(to.x, to.y, 8, 70);
        label(into ? "Sakla!" : "Geri!", to.x, to.y - 20);
      }, 620);
    }, dur * 0.3);
  }

  function archiveIn(c) {
    chestScene(c, true);
  }

  function archiveOut(c) {
    chestScene(c, false);
  }

  function archiveCat(c) {
    const rc = center(c.from);
    const dir = rc.x > W() / 2 ? -1 : 1;
    const dur = 1700;
    const away = { x: rc.x + dir * 220, y: VH() + 60 };
    const start = { x: rc.x - dir * 150, y: rc.y + 30 };
    const at = { x: rc.x, y: rc.y };
    const stops = [
      ...hop(start, at, 40, 0, 0.35, 6, dir * 10),
      { ...at, r: dir * -12, at: 0.42 },
      { ...at, r: dir * 12, at: 0.48 },
      { ...at, r: 0, at: 0.52 },
      ...hop(at, away, 50, 0.52, 1, 8, dir * 8),
    ];
    fly(actor(art.cat(pickOne(CAT_TINTS)), 62, 66), stops, dur);
    fly(actor(art.parcel(c.hue, "lemon"), 34, 34), stops.map((s) => ({
      ...s,
      x: s.x + dir * 26,
      y: s.y + 8,
      r: 0,
      o: s.at < 0.5 ? 0 : 1,
    })), dur);
    H.sound("meow");
    wait(() => label("Sakla!", rc.x, rc.y - 24), dur * 0.5);
  }

  // ---- Edit, sample tasks -----------------------------------------------------------------

  function editPencil(c) {
    const R = c.from;
    const stops = Array.from({ length: 9 }, (_, i) => {
      const u = i / 8;
      return { x: R.left + 12 + (R.width - 24) * u, y: R.top + R.height / 2 + (i % 2 ? 9 : -5), r: -30, at: u };
    });
    fly(actor(art.pencil(), 36, 36), [
      { ...stops[0], s: 0.4, o: 0, at: 0 },
      ...stops.map((s, i) => ({ ...s, at: 0.08 + 0.72 * (i / 8) })),
      { ...stops[8], y: stops[8].y - 40, o: 0, at: 1 },
    ], 850);
    H.sound("chime");
    wait(() => {
      H.sparkle(R.left + R.width / 2, R.top + R.height / 2, 8, Math.min(120, R.width / 3));
      label("Güncel!", R.left + R.width / 2, R.top - 6);
    }, 720);
  }

  function demoOn() {
    for (let i = 0; i < 22; i++) {
      const x = rand(0.05, 0.95) * W();
      const w = rand(26, 40);
      const y2 = VH() * rand(0.5, 0.92);
      const fill = pickOne(["cherry", "orange", "lemon", "apple", "blueberry", "grape"]);
      fly(actor(art.candy(fill), w, w * 0.6), [
        { x, y: -30, r: rand(-30, 30), at: 0, ease: "ease-in" },
        { x: x + rand(-30, 30), y: y2, r: rand(-220, 220), at: 0.85 },
        { x, y: y2 + 20, o: 0, at: 1 },
      ], rand(1200, 1800), i * 55);
    }
    H.sound("chime");
  }

  function demoOff(c) {
    const R = c.from;
    const rc = center(R);
    H.sound("puff");
    H.burst(rc.x, Math.min(rc.y, R.top + 160), "grape", 18);
    H.sparkle(rc.x, Math.min(rc.y, R.top + 160), 10, 120);
  }

  // ---- Small effects called directly ------------------------------------------------------

  function wave(items) {
    if (!H || H.reduced()) return;
    [...items].slice(0, 14).forEach((el, i) => {
      el.animate(
        [{ transform: "translateX(-28px)", opacity: 0 }, { transform: "translateX(0)", opacity: 1 }],
        { duration: 380, delay: i * 45, easing: GLIDE, fill: "backwards" },
      );
    });
  }

  function heart(el) {
    if (!H || H.reduced() || !el) return;
    el.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.7) rotate(-10deg)", offset: 0.3 },
        { transform: "scale(0.9)", offset: 0.6 },
        { transform: "scale(1)" },
      ],
      { duration: 700, easing: "ease-out" },
    );
    const at = center(el.getBoundingClientRect());
    H.sparkle(at.x, at.y, 7, 46);
    for (let i = 0; i < 3; i++) {
      fly(actor(art.heart(), 16, 16), [
        { x: at.x, y: at.y, s: 0.3, o: 0, at: 0 },
        { x: at.x + rand(-18, 18), y: at.y + 24, s: 1, at: 0.3 },
        { x: at.x + rand(-30, 30), y: at.y + 70, o: 0, at: 1 },
      ], 1000, i * 120);
    }
  }

  function glow(hue) {
    const el = actor("", 0, 0, "fx-glow");
    el.style.setProperty("--glow", `var(--${hue})`);
    const run = el.animate([{ opacity: 0 }, { opacity: 0.75, offset: 0.25 }, { opacity: 0 }], { duration: 1100, easing: "ease-out" });
    run.finished.then(() => el.remove(), () => el.remove());
  }

  // ---- Pools ------------------------------------------------------------------------------

  const POOLS = {
    add: [addPlane, addCat, addBalloon, addRocket, addDolphin, addParachute],
    undo: [undoRewind, undoCoins, undoCat],
    delete: [deleteMelt, deletePop, deleteThief, deleteHole],
    archive: [archiveIn, archiveCat],
    unarchive: [archiveOut],
    edit: [editPencil],
    demoOn: [demoOn],
    demoOff: [demoOff],
  };
  const DONE_POOL = [doneFireworks, doneStarRain, doneCatDance, doneHearts];

  function chooseDone(c) {
    if (c.bonus >= 3) return doneGift;
    if (c.bonus === 2) return doneBalloon;
    if (c.bonus === 1) return doneChocolate;
    return pickOne(DONE_POOL);
  }

  function play(event, c = {}) {
    if (!H || H.reduced() || live >= MAX_LIVE) return;
    const T = target();
    const ctx = { ...c, T, seen: T.seen, gold: Math.random() < 0.1 };
    let scene;
    if (event === "done") {
      scene = chooseDone(ctx);
      if (c.combo >= 2) {
        glow(c.hue ?? "lemon");
        wait(() => H.word(c.comboWord, W() / 2, VH() * 0.26, -6, true), 350);
      }
    } else {
      const pool = event === "add" && !T.seen ? POOLS.add.filter((s) => !s.needsView) : POOLS[event];
      scene = pickOne(pool);
    }
    live++;
    wait(() => live--, HOLD_MS);
    scene(ctx);
  }

  function init(hooks) {
    H = hooks;
  }

  return { init, play, wave, heart };
})();
