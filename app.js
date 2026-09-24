const TASKS_KEY = "tasks";
const BANK_KEY = "kumbara";
const ADD_REWARD = 1;
const DONE_REWARD = 3;
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const SPEED_TIERS = [
  { within: HOUR, bonus: 3, pow: "Şimşek!" },
  { within: DAY, bonus: 2, pow: "Muhteşem!" },
  { within: 3 * DAY, bonus: 1, pow: "Hızlı!" },
];
const CANDY_HUES = ["cherry", "orange", "lemon", "apple", "blueberry", "grape"];
const CALLOUTS = ["Tatlı!", "Leziz!", "Nefis!", "Enfes!"];
const PATH_MIN_NODES = 6;

const LEVELS = [
  { at: 0, name: "Bozuk para" },
  { at: 10, name: "Harçlık" },
  { at: 30, name: "Cep parası" },
  { at: 60, name: "Birikim" },
  { at: 100, name: "Dolu kumbara" },
  { at: 160, name: "Küçük hazine" },
  { at: 250, name: "Hazine" },
  { at: 400, name: "Büyük hazine" },
  { at: 600, name: "Define" },
  { at: 1000, name: "Efsane" },
];

const ADD_LINES = [
  "Kumbaraya girdi. Yazmak işin yarısı.",
  "Bir görev daha kayıtta.",
  "Aklından çıktı, listeye girdi.",
];

const DONE_LINES = [
  "Tık! Kumbara biraz daha ağırlaştı.",
  "Bitti. Kendine bir aferin.",
  "Bir altın daha içeride.",
  "Birer birer doluyor.",
  "İşte bu. Sıradaki?",
];

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const submitButton = document.getElementById("task-submit");
const list = document.getElementById("task-list");
const emptyNote = document.getElementById("empty");
const archive = document.getElementById("archive");
const archiveList = document.getElementById("archive-list");
const archiveCount = document.getElementById("archive-count");
const archiveEmpty = document.getElementById("archive-empty");
const counter = document.getElementById("counter");
const filterButtons = document.querySelectorAll("#filters button");

const bankSlot = document.getElementById("bank-slot");
const coinTotal = document.getElementById("coin-total");
const levelName = document.getElementById("level-name");
const levelBadge = document.getElementById("level-badge");
const starBar = document.getElementById("star-bar");
const starFill = document.getElementById("star-fill");
const starMarks = starBar.querySelectorAll(".star-mark");
const hearts = document.getElementById("hearts");
const soundToggle = document.getElementById("sound-toggle");
const dayPath = document.getElementById("day-path");
const celebrate = document.getElementById("celebrate");
const celebrateLevel = document.getElementById("celebrate-level");
const levelNext = document.getElementById("level-next");
const bankDay = document.getElementById("bank-day");
const bankStreak = document.getElementById("bank-streak");
const bankMessage = document.getElementById("bank-message");

let tasks = loadTasks();
let bank = loadBank();
let filter = "all";
let message = "";
let newTaskId = null;
let justDoneId = null;
let pathNewNode = false;
let shownCoins = bank.coins;

function loadTasks() {
  const saved = localStorage.getItem(TASKS_KEY);
  if (!saved) return [];
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // fall through to the backup below
  }
  // Keep unreadable data instead of overwriting it on the next save.
  localStorage.setItem(`${TASKS_KEY}-backup-${Date.now()}`, saved);
  return [];
}

function loadBank() {
  try {
    const saved = JSON.parse(localStorage.getItem(BANK_KEY));
    if (saved && typeof saved.coins === "number" && saved.days) return saved;
  } catch {
    // start a fresh bank below
  }
  const doneCount = tasks.filter((t) => t.done).length;
  return { coins: tasks.length * ADD_REWARD + doneCount * DONE_REWARD, days: {} };
}

function save() {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  localStorage.setItem(BANK_KEY, JSON.stringify(bank));
}

function dayKey(date = new Date()) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function streak() {
  const date = new Date();
  if (!bank.days[dayKey(date)]) date.setDate(date.getDate() - 1);
  let days = 0;
  while (bank.days[dayKey(date)] > 0) {
    days++;
    date.setDate(date.getDate() - 1);
  }
  return days;
}

function levelFor(coins) {
  let index = 0;
  while (index + 1 < LEVELS.length && coins >= LEVELS[index + 1].at) index++;
  return { index, ...LEVELS[index], next: LEVELS[index + 1] };
}

function pick(lines) {
  return lines[Math.floor(Math.random() * lines.length)];
}

// Task ids were Date.now() at creation, so older tasks still get a creation time.
function createdAt(task) {
  if (task.createdAt) return task.createdAt;
  return task.id > 1e12 ? task.id : null;
}

function speedBonus(task, now = Date.now()) {
  const created = createdAt(task);
  if (!created) return { bonus: 0 };
  const age = now - created;
  const tier = SPEED_TIERS.find((t) => age <= t.within);
  return tier ? { bonus: tier.bonus, left: tier.within - age, tier } : { bonus: 0 };
}

const clock = new Intl.DateTimeFormat("tr-TR", { hour: "2-digit", minute: "2-digit" });
const shortDate = new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" });

function stamp(ms) {
  const date = new Date(ms);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const key = dayKey(date);
  const day = key === dayKey() ? "Bugün" : key === dayKey(yesterday) ? "Dün" : shortDate.format(date);
  return `${day} ${clock.format(date)}`;
}

function timeLeft(ms) {
  const minutes = Math.max(1, Math.ceil(ms / MINUTE));
  if (minutes < 60) return `${minutes} dk`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} sa`;
  return `${Math.floor(hours / 24)} gün`;
}

function earn(amount, line, fromRect, small, bonus = 0) {
  const before = levelFor(bank.coins);
  bank.coins += amount;
  const after = levelFor(bank.coins);
  const leveled = after.index > before.index;
  message = leveled ? `Yeni seviye: ${after.name}!` : line;
  flyCoin(fromRect, small, leveled ? "level" : small ? "add" : "done", bonus);
}

function launchCoin(fromRect, small) {
  const slotRect = bankSlot.getBoundingClientRect();
  const target = slotRect.width > 0 ? slotRect : coinTotal.getBoundingClientRect();
  const sx = fromRect.left + fromRect.width / 2;
  const sy = fromRect.top + fromRect.height / 2;
  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;
  const cx = (sx + tx) / 2;
  const cy = Math.max(16, Math.min(sy, ty) - Math.min(180, Math.abs(tx - sx) * 0.3 + 70));

  const frames = [];
  const steps = 16;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (1 - t) ** 2 * sx + 2 * (1 - t) * t * cx + t ** 2 * tx;
    const y = (1 - t) ** 2 * sy + 2 * (1 - t) * t * cy + t ** 2 * ty;
    const scale = 1 - 0.45 * t;
    frames.push({ transform: `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${scale})` });
  }

  const coin = document.createElement("span");
  coin.className = small ? "flying-coin is-small" : "flying-coin";
  document.body.append(coin);

  const flight = coin.animate(frames, { duration: small ? 520 : 680, easing: "cubic-bezier(0.16, 1, 0.3, 1)" });
  flight.finished.then(() => coin.remove());
  return flight;
}

function flyCoin(fromRect, small, kind, bonus) {
  if (reduceMotion.matches || !fromRect) {
    shownCoins = bank.coins;
    react(kind, bonus);
    return;
  }

  // Speed bonus coins trail the main coin; they are visual only.
  for (let i = 1; i <= bonus; i++) {
    setTimeout(() => launchCoin(fromRect, true), i * 110);
  }

  launchCoin(fromRect, small).finished.then(() => {
    shownCoins = bank.coins;
    coinTotal.textContent = shownCoins;
    coinTotal.animate(
      [{ transform: "scale(1.08)" }, { transform: "scale(1)" }],
      { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    react(kind, bonus);
  });
}

// Kumbara-chan: moods, hops, sparkles and manga sound words

const mascot = document.getElementById("mascot");
const POW_ADD = ["Hop!", "Tamam!"];
let moodTimer = null;

function restMood() {
  return (bank.days[dayKey()] || 0) > 0 ? "idle" : "sleepy";
}

function setMood(mood, ms) {
  clearTimeout(moodTimer);
  mascot.dataset.mood = mood;
  moodTimer = setTimeout(() => {
    moodTimer = null;
    mascot.dataset.mood = restMood();
  }, ms);
}

function replay(element, className) {
  element.classList.remove(className);
  void element.offsetWidth;
  element.classList.add(className);
}

mascot.addEventListener("animationend", (event) => {
  if (event.target === mascot) mascot.classList.remove("is-hop", "is-nod");
  else mascot.classList.remove("is-burst");
});

function sparkle(x, y, count, spread, ink) {
  if (reduceMotion.matches) return;
  for (let i = 0; i < count; i++) {
    const spark = document.createElement("span");
    spark.className = ink ? "fx-spark is-ink" : "fx-spark";
    document.body.append(spark);
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.6;
    const dist = spread * (0.7 + Math.random() * 0.5);
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist;
    const size = 0.6 + Math.random() * 0.7;
    const at = (px, py, scale, turn) =>
      `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${scale}) rotate(${turn}deg)`;
    spark.animate(
      [
        { transform: at(x, y, 0, 0) },
        { transform: at(x + dx * 0.7, y + dy * 0.7, size, 45), offset: 0.45 },
        { transform: at(x + dx, y + dy, 0, 90) },
      ],
      { duration: 700 + Math.random() * 200, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    ).onfinish = () => spark.remove();
  }
}

function pow(text, big) {
  if (reduceMotion.matches) return;
  const word = document.createElement("span");
  word.className = big ? "fx-pow is-big" : "fx-pow";
  word.textContent = text;
  document.body.append(word);

  const r = mascot.getBoundingClientRect();
  const half = word.offsetWidth / 2;
  const x = Math.min(window.innerWidth - half - 8, Math.max(half + 8, r.left + r.width * (big ? 0.95 : 0.85)));
  const y = r.bottom + 4;
  const tilt = big ? -6 : -12 + Math.random() * 8;
  const at = (py, scale) => `translate(${x}px, ${py}px) translate(-50%, -50%) rotate(${tilt}deg) scale(${scale})`;
  word.animate(
    [
      { transform: at(y, 0.3), opacity: 0 },
      { transform: at(y, 1.15), opacity: 1, offset: 0.18 },
      { transform: at(y, 1), opacity: 1, offset: 0.2 },
      { transform: at(y - 6, 1), opacity: 1, offset: 0.65 },
      { transform: at(y - 26, 1), opacity: 0 },
    ],
    { duration: big ? 1900 : 1400, easing: "ease-out" },
  ).onfinish = () => word.remove();
}

// Candy shards burst out of a finished tile in its hue.
function burst(x, y, hue, count) {
  if (reduceMotion.matches) return;
  const colors = [hue, hue, "lemon", "cherry", "blueberry"];
  for (let i = 0; i < count; i++) {
    const shard = document.createElement("span");
    shard.className = i % 3 === 0 ? "fx-shard is-wrap" : "fx-shard";
    shard.style.setProperty("--shard", `var(--${colors[i % colors.length]})`);
    document.body.append(shard);
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 60 + Math.random() * 70;
    const dx = Math.cos(angle) * dist;
    const dy = Math.sin(angle) * dist - 30;
    const spin = (Math.random() - 0.5) * 540;
    const at = (px, py, scale, turn) =>
      `translate(${px}px, ${py}px) translate(-50%, -50%) scale(${scale}) rotate(${turn}deg)`;
    shard.animate(
      [
        { transform: at(x, y, 0.4, 0), opacity: 1 },
        { transform: at(x + dx * 0.75, y + dy * 0.75, 1.1, spin * 0.6), opacity: 1, offset: 0.5 },
        { transform: at(x + dx, y + dy + 50, 0.6, spin), opacity: 0 },
      ],
      { duration: 800 + Math.random() * 300, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    ).onfinish = () => shard.remove();
  }
}

// The big centered word after a finished task, like a puzzle game's combo callout.
function callout(text) {
  if (reduceMotion.matches) return;
  const word = document.createElement("span");
  word.className = "fx-callout";
  word.textContent = text;
  word.dataset.text = text;
  document.body.append(word);
  const at = (scale, turn, lift) => `translate(-50%, calc(-50% - ${lift}px)) rotate(${turn}deg) scale(${scale})`;
  word.animate(
    [
      { transform: at(0.2, -12, 0), opacity: 0 },
      { transform: at(1.2, -4, 0), opacity: 1, offset: 0.2 },
      { transform: at(1, -4, 0), opacity: 1, offset: 0.32 },
      { transform: at(1, -4, 8), opacity: 1, offset: 0.75 },
      { transform: at(1.1, -4, 40), opacity: 0 },
    ],
    { duration: 1300, easing: "ease-out" },
  ).onfinish = () => word.remove();
}

let celebrateTimer = null;
function showCelebration(name) {
  celebrateLevel.textContent = `Yeni seviye: ${name}`;
  celebrate.hidden = false;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.46;
  burst(cx, cy, "lemon", 26);
  setTimeout(() => burst(cx, cy, "cherry", 20), 250);
  sparkle(cx, cy, 14, Math.min(window.innerWidth, 600) * 0.45);
  clearTimeout(celebrateTimer);
  celebrateTimer = setTimeout(() => {
    celebrate.hidden = true;
  }, 2200);
}

celebrate.addEventListener("click", () => {
  celebrate.hidden = true;
});

// Sounds are synthesized on the spot so the app stays offline.
let audio = null;
let soundOn = true;
try {
  soundOn = localStorage.getItem("sound") !== "off";
} catch {
  // keep sound on
}

function tone(freq, at, length, type, volume) {
  const osc = audio.createOscillator();
  const gain = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, at);
  gain.gain.setValueAtTime(0.0001, at);
  gain.gain.exponentialRampToValueAtTime(volume, at + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, at + length);
  osc.connect(gain).connect(audio.destination);
  osc.start(at);
  osc.stop(at + length + 0.02);
}

function playSound(kind) {
  if (!soundOn || !window.AudioContext) return;
  audio ??= new AudioContext();
  const t = audio.currentTime + 0.01;
  if (kind === "add") {
    tone(660, t, 0.09, "triangle", 0.12);
    tone(990, t + 0.07, 0.12, "triangle", 0.1);
  } else if (kind === "done") {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.06, 0.18, "sine", 0.14));
    tone(1568, t + 0.26, 0.25, "triangle", 0.06);
  } else if (kind === "level") {
    [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, t + i * 0.07, 0.3, "triangle", 0.12));
    [1047, 1319, 1568].forEach((f) => tone(f, t + 0.5, 0.6, "sine", 0.08));
  } else if (kind === "undo") {
    tone(440, t, 0.12, "sine", 0.1);
    tone(330, t + 0.1, 0.16, "sine", 0.08);
  }
}

function renderSoundToggle() {
  soundToggle.setAttribute("aria-pressed", String(soundOn));
  soundToggle.title = soundOn ? "Sesi kapat" : "Sesi aç";
}

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  try {
    localStorage.setItem("sound", soundOn ? "on" : "off");
  } catch {
    // the toggle still works for this visit
  }
  renderSoundToggle();
  playSound("add");
});
renderSoundToggle();

function react(kind, bonus = 0) {
  const r = mascot.getBoundingClientRect();
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height * 0.45;
  const moving = !reduceMotion.matches;

  if (kind === "level") {
    setMood("excited", 2600);
    if (moving) {
      replay(mascot, "is-hop");
      replay(mascot, "is-burst");
    }
    sparkle(cx, cy, 10, r.width * 0.75);
    playSound("level");
    showCelebration(levelFor(bank.coins).name);
  } else if (kind === "done") {
    setMood("happy", 1800);
    if (moving) replay(mascot, "is-hop");
    sparkle(cx, cy, 6 + bonus * 2, r.width * 0.6);
    const tier = SPEED_TIERS.find((t) => t.bonus === bonus);
    pow(`+${DONE_REWARD + bonus}`);
    callout(tier ? tier.pow : pick(CALLOUTS));
  } else {
    setMood("happy", 1000);
    if (moving) replay(mascot, "is-nod");
    pow(pick(POW_ADD));
  }
}

function addTask(text) {
  const now = Date.now();
  const task = { id: now, text, done: false, archived: false, createdAt: now };
  tasks.push(task);
  newTaskId = task.id;
  playSound("add");
  earn(ADD_REWARD, pick(ADD_LINES), submitButton.getBoundingClientRect(), true);
  save();
  render();
}

function toggleDone(task, box) {
  const fromRect = box.getBoundingClientRect();
  const tile = box.closest(".task").getBoundingClientRect();
  const popTile = () => {
    burst(tile.left + tile.width / 2, tile.top + tile.height / 2, hueFor(task.id), 16);
    playSound("done");
  };
  task.done = !task.done;
  if (task.demo) {
    if (task.done) {
      task.doneAt = Date.now();
      justDoneId = task.id;
      popTile();
      callout(pick(CALLOUTS));
    } else {
      delete task.doneAt;
    }
    message = "Örnek görev, altın vermez.";
    save();
    render();
    justDoneId = null;
    return;
  }
  if (task.done) {
    const { bonus } = speedBonus(task);
    task.doneOn = dayKey();
    task.doneAt = Date.now();
    task.earned = DONE_REWARD + bonus;
    bank.days[task.doneOn] = (bank.days[task.doneOn] || 0) + 1;
    justDoneId = task.id;
    pathNewNode = true;
    popTile();
    const line = bonus > 0 ? `Hız bonusu! ${task.earned} altın kazandın.` : pick(DONE_LINES);
    earn(task.earned, line, fromRect, false, bonus);
  } else {
    if (task.doneOn && bank.days[task.doneOn] > 0) bank.days[task.doneOn]--;
    const refund = task.earned ?? DONE_REWARD;
    delete task.doneOn;
    delete task.doneAt;
    delete task.earned;
    bank.coins = Math.max(0, bank.coins - refund);
    shownCoins = bank.coins;
    playSound("undo");
    message = `Geri aldın, ${refund} altın kumbaradan çıktı.`;
  }
  newTaskId = null;
  save();
  render();
  justDoneId = null;
}

function toggleArchive(task) {
  task.archived = !task.archived;
  newTaskId = null;
  save();
  render();
}

function deleteTask(task) {
  tasks = tasks.filter((t) => t.id !== task.id);
  if (!task.done && !task.demo) {
    bank.coins = Math.max(0, bank.coins - ADD_REWARD);
    shownCoins = bank.coins;
    message = "Silinen görevin altını kumbaradan çıktı.";
  }
  newTaskId = null;
  save();
  render();
}

function startEdit(task, li, text) {
  const field = document.createElement("input");
  field.type = "text";
  field.className = "task-edit";
  field.value = task.text;
  field.maxLength = 200;
  field.setAttribute("aria-label", "Görevi düzenle");

  li.classList.add("is-editing");
  text.replaceWith(field);
  field.focus();
  field.select();

  let finished = false;
  const finish = (keep) => {
    if (finished) return;
    finished = true;
    const value = field.value.trim();
    if (keep && value !== "" && value !== task.text) {
      task.text = value;
      message = "Görev güncellendi.";
      save();
    }
    newTaskId = null;
    render();
  };

  field.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      finish(true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finish(false);
    }
  });
  field.addEventListener("blur", () => finish(true));
}

function actionButton(label, onClick, extraClass) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = extraClass ? `action ${extraClass}` : "action";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

// Task sprites: a small anime creature per task whose face shows how the task is doing

const SPRITE_EARS = {
  cat: '<path class="sp-ear" d="M8.5 16 L10 4.5 L18.5 11.5 Z"/><path class="sp-ear" d="M31.5 16 L30 4.5 L21.5 11.5 Z"/>',
  bunny:
    '<ellipse class="sp-ear" cx="14" cy="9" rx="3.6" ry="8" transform="rotate(-14 14 9)"/>' +
    '<ellipse class="sp-ear" cx="26" cy="9" rx="3.6" ry="8" transform="rotate(14 26 9)"/>',
  bear: '<circle class="sp-ear" cx="9.5" cy="13" r="5"/><circle class="sp-ear" cx="30.5" cy="13" r="5"/>',
};
const SP_BLUSH =
  '<ellipse class="sp-blush" cx="11.5" cy="28.5" rx="2.4" ry="1.4"/><ellipse class="sp-blush" cx="28.5" cy="28.5" rx="2.4" ry="1.4"/>';
const SP_DOT_EYES =
  '<ellipse class="sp-eye" cx="15" cy="23.5" rx="2" ry="2.6"/><ellipse class="sp-eye" cx="25" cy="23.5" rx="2" ry="2.6"/>';
const SPRITE_FACES = {
  sparkle:
    '<ellipse class="sp-eye" cx="15" cy="23" rx="2.7" ry="3.4"/><ellipse class="sp-eye" cx="25" cy="23" rx="2.7" ry="3.4"/>' +
    '<circle class="sp-shine" cx="16" cy="21.6" r="1.1"/><circle class="sp-shine" cx="26" cy="21.6" r="1.1"/>' +
    SP_BLUSH +
    '<path class="sp-mouth" d="M17.2 28 L22.8 28 Q22.4 31.6 20 31.6 Q17.6 31.6 17.2 28 Z"/>' +
    '<path class="sp-twinkle" d="M34.5 1 Q35.2 4.8 39 5.5 Q35.2 6.2 34.5 10 Q33.8 6.2 30 5.5 Q33.8 4.8 34.5 1 Z"/>',
  normal: SP_DOT_EYES + '<path class="sp-line" d="M17.5 28.5 Q20 30.8 22.5 28.5"/>',
  worried:
    SP_DOT_EYES +
    '<path class="sp-line" d="M12.3 19.2 L16.8 18 M27.7 19.2 L23.2 18"/>' +
    '<path class="sp-line" d="M16.5 30 Q18.2 28.4 20 30 Q21.8 31.6 23.5 30"/>' +
    '<path class="sp-drop sp-sweat" d="M33.5 11 Q36.1 15.4 33.5 17 Q30.9 15.4 33.5 11 Z"/>',
  sad:
    '<path class="sp-line" d="M12.8 23.8 Q15 21.6 17.2 23.8 M22.8 23.8 Q25 21.6 27.2 23.8"/>' +
    '<path class="sp-line" d="M17 30.6 Q20 27.8 23 30.6"/>' +
    '<ellipse class="sp-drop sp-tear" cx="14.6" cy="27" rx="1.2" ry="1.9"/>',
  proud:
    '<path class="sp-line" d="M12.6 24.2 Q15 20.6 17.4 24.2 M22.6 24.2 Q25 20.6 27.4 24.2"/>' +
    SP_BLUSH +
    '<path class="sp-line" d="M17.5 28.3 Q20 31 22.5 28.3"/>',
  sleep:
    '<path class="sp-line" d="M12.6 23.6 L17.2 23.6 M22.8 23.6 L27.4 23.6"/>' +
    '<circle class="sp-line" cx="20" cy="29" r="1.3"/>' +
    '<path class="sp-line sp-z" d="M31 2.5 h4.5 l-4.5 4.5 h4.5"/>',
};

function hashSeed(seed) {
  let h = 7;
  for (const c of String(seed)) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

function hueFor(seed) {
  return CANDY_HUES[Math.floor(hashSeed(seed) / 3) % CANDY_HUES.length];
}

function sprite(seed, mood) {
  const n = hashSeed(seed);
  const kinds = Object.keys(SPRITE_EARS);
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 40 40");
  svg.setAttribute("class", `sprite is-${mood}`);
  svg.setAttribute("aria-hidden", "true");
  svg.style.setProperty("--tint", `var(--${hueFor(seed)})`);
  svg.style.setProperty("--bob-delay", `${-(n % 7) * 0.4}s`);
  svg.innerHTML =
    SPRITE_EARS[kinds[n % kinds.length]] + '<circle class="sp-body" cx="20" cy="25" r="14"/>' + SPRITE_FACES[mood];
  return svg;
}

function taskMood(task, now) {
  if (task.archived) return "sleep";
  if (task.done) return "proud";
  const created = createdAt(task);
  if (!created) return "normal";
  const age = now - created;
  if (age <= HOUR) return "sparkle";
  if (age <= DAY) return "normal";
  if (age <= 3 * DAY) return "worried";
  return "sad";
}

function metaSpan(className, text) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function taskMeta(task, now) {
  const meta = document.createElement("div");
  meta.className = "task-meta";

  const created = createdAt(task);
  const times = [];
  if (created) times.push(stamp(created));
  if (task.done && task.doneAt) {
    const sameDay = created && dayKey(new Date(created)) === dayKey(new Date(task.doneAt));
    times.push(`bitti ${sameDay ? clock.format(new Date(task.doneAt)) : stamp(task.doneAt)}`);
  } else if (task.done) {
    times.push("bitti");
  }
  if (times.length > 0) meta.append(metaSpan("task-time", times.join(" · ")));

  if (task.done && task.earned) meta.append(metaSpan("task-earned", `+${task.earned} altın`));

  if (!task.done && !task.archived) {
    const speed = speedBonus(task, now);
    if (speed.bonus > 0) {
      const chip = metaSpan("speed-chip", `+${speed.bonus} hız bonusu · ${timeLeft(speed.left)}`);
      if (speed.bonus === 3) chip.classList.add("is-hot");
      meta.append(chip);
    }
  }
  return meta;
}

function taskItem(task) {
  const now = Date.now();
  const li = document.createElement("li");
  li.className = `task hue-${hueFor(task.id)}`;
  if (task.done) li.classList.add("is-done");
  if (task.id === newTaskId) li.classList.add("is-new");
  if (task.id === justDoneId) li.classList.add("is-just-done");

  const box = document.createElement("input");
  box.type = "checkbox";
  box.className = "task-check";
  box.checked = task.done;
  box.setAttribute("aria-label", task.text);
  box.addEventListener("change", () => toggleDone(task, box));

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task.text;
  text.title = "Düzenlemek için çift tıkla";
  text.addEventListener("dblclick", () => startEdit(task, li, text));

  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(
    actionButton("Düzenle", () => startEdit(task, li, text)),
    actionButton(task.archived ? "Geri al" : "Arşivle", () => toggleArchive(task)),
    actionButton("Sil", () => deleteTask(task), "danger"),
  );

  const body = document.createElement("div");
  body.className = "task-body";
  body.append(text);
  const meta = taskMeta(task, now);
  if (meta.childElementCount > 0) body.append(meta);

  li.append(box, sprite(task.id, taskMood(task, now)), body, actions);
  return li;
}

const LEGEND = [
  { mood: "sparkle", title: "Yeni eklendi", note: "İlk 1 saat · +3 hız bonusu" },
  { mood: "normal", title: "Bugün eklendi", note: "1 saat – 1 gün · +2 bonus" },
  { mood: "worried", title: "Bekliyor", note: "1 – 3 gün · +1 bonus, ter döküyor" },
  { mood: "sad", title: "Unutulmuş", note: "3 günden eski · bonus yok, ağlıyor" },
  { mood: "proud", title: "Bitti", note: "Gururlu, ^ ^" },
  { mood: "sleep", title: "Arşivde", note: "Uyuyor" },
];

const legendGrid = document.getElementById("legend-grid");
const legendDemo = document.getElementById("legend-demo");

legendGrid.replaceChildren(
  ...LEGEND.map((entry, i) => {
    const item = document.createElement("li");
    const label = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = entry.title;
    const note = document.createElement("span");
    note.textContent = entry.note;
    label.replaceChildren(title, note);
    item.append(sprite(`legend-${i}`, entry.mood), label);
    return item;
  }),
);

function toggleDemoTasks() {
  if (tasks.some((t) => t.demo)) {
    tasks = tasks.filter((t) => !t.demo);
    message = "Örnek görevler kaldırıldı.";
  } else {
    const now = Date.now();
    const demos = [
      { text: "Örnek: yeni eklendi, parlak gözlü", createdAt: now - 5 * MINUTE },
      { text: "Örnek: bugün eklendi, normal", createdAt: now - 5 * HOUR },
      { text: "Örnek: 2 gündür bekliyor, endişeli", createdAt: now - 2 * DAY },
      { text: "Örnek: 4 gündür bekliyor, ağlıyor", createdAt: now - 4 * DAY },
      { text: "Örnek: bitti, gururlu", createdAt: now - 3 * HOUR, done: true, doneAt: now - HOUR },
      { text: "Örnek: arşivde, uyuyor", createdAt: now - DAY, archived: true },
    ];
    tasks.push(...demos.map((d, i) => ({ id: now + i, done: false, archived: false, demo: true, ...d })));
    filter = "all";
    archive.open = true;
    message = "Örnek görevler eklendi. Altın vermezler.";
  }
  newTaskId = null;
  save();
  render();
}

legendDemo.addEventListener("click", toggleDemoTasks);

function matchesFilter(task) {
  if (filter === "active") return !task.done;
  if (filter === "done") return task.done;
  return true;
}

function emptyText(openTasks, shownOpen) {
  if (tasks.length === 0) return "Liste boş. İlk görevi yaz, kumbaraya ilk parayı at.";
  if (shownOpen > 0) return "";
  if (filter === "active") return openTasks.length > 0 ? "Yapılacak görev kalmadı. Hepsi bitti!" : "Yapılacak görev yok.";
  if (filter === "done") return "Henüz tamamlanan görev yok.";
  return "Açık görev yok. Yenisini yaz ya da arşive bak.";
}

function renderLists() {
  const openTasks = tasks.filter((t) => !t.archived);
  const archivedTasks = tasks.filter((t) => t.archived);
  const shownOpen = openTasks.filter(matchesFilter);
  const shownArchived = archivedTasks.filter(matchesFilter);

  list.replaceChildren(...shownOpen.map(taskItem));
  archiveList.replaceChildren(...shownArchived.map(taskItem));

  const note = emptyText(openTasks, shownOpen.length);
  emptyNote.replaceChildren(sprite("empty", tasks.length === 0 ? "sparkle" : "proud"), note);
  emptyNote.hidden = note === "";

  legendDemo.textContent = tasks.some((t) => t.demo) ? "Örnek görevleri kaldır" : "Örnek görevleri ekle";

  archive.hidden = archivedTasks.length === 0;
  archiveCount.textContent = archivedTasks.length;
  archiveEmpty.hidden = shownArchived.length > 0;

  const remaining = openTasks.filter((t) => !t.done).length;
  if (openTasks.length === 0) {
    counter.textContent = "";
  } else if (remaining === 0) {
    counter.textContent = "Hepsi bitti!";
  } else {
    counter.textContent = `${remaining} görev kaldı`;
  }

  for (const button of filterButtons) {
    const selected = button.id === `filter-${filter}`;
    button.classList.toggle("active-filter", selected);
    button.setAttribute("aria-pressed", String(selected));
  }
}

function streakText(today, days) {
  if (days === 0) return "Seri: 0 gün";
  if (today === 0) return `Seri: ${days} gün, bugün bir görevle sürer`;
  return `Seri: ${days} gün`;
}

function renderStars(level) {
  const progress = level.next ? (bank.coins - level.at) / (level.next.at - level.at) : 1;
  starFill.style.transform = `scaleX(${progress.toFixed(3)})`;
  starMarks.forEach((mark, i) => {
    const lit = progress >= (i + 1) / 3 - 0.001;
    if (lit !== mark.classList.contains("is-lit")) mark.classList.toggle("is-lit", lit);
  });
  const toNext = level.next ? level.next.at - bank.coins : 0;
  starBar.setAttribute(
    "aria-label",
    level.next ? `${level.next.name} seviyesine ${toNext} altın kaldı` : "En yüksek seviye",
  );
  levelNext.textContent = level.next ? `${level.next.name} için ${toNext} altın` : "En yüksek seviye!";
}

function renderHearts(days) {
  hearts.setAttribute("aria-label", `Seri: ${days} gün`);
  hearts.replaceChildren(
    ...Array.from({ length: 5 }, (_, i) => {
      const heart = document.createElement("span");
      heart.className = i < days ? "heart is-full" : "heart";
      return heart;
    }),
  );
}

function starsFor(task) {
  const bonus = (task.earned ?? DONE_REWARD) - DONE_REWARD;
  return bonus >= 3 ? 3 : bonus === 2 ? 2 : 1;
}

function renderPath() {
  const today = dayKey();
  const done = tasks
    .filter((t) => t.done && !t.demo && t.doneOn === today)
    .sort((a, b) => (a.doneAt ?? 0) - (b.doneAt ?? 0));
  // Enough locked nodes ahead to run the path across the whole well.
  const fits = Math.floor((dayPath.clientWidth - 36 + 24) / 70);
  const total = Math.max(PATH_MIN_NODES, done.length + 2, fits);

  const nodes = Array.from({ length: total }, (_, i) => {
      const node = document.createElement("li");
      const finished = done[i];
      node.textContent = i + 1;
      node.style.setProperty("--y", `${Math.round(Math.sin(i * 1.15) * 15)}px`);
      if (finished) {
        node.className = `path-node jelly hue-${hueFor(finished.id)}`;
        node.style.setProperty("--fill", "var(--hue)");
        node.style.setProperty("--fill-light", "var(--hue-light)");
        node.style.setProperty("--fill-dark", "var(--hue-dark)");
        if (pathNewNode && i === done.length - 1) node.classList.add("is-new");
        const stars = document.createElement("span");
        stars.className = "node-stars";
        const count = starsFor(finished);
        for (let s = 0; s < 3; s++) {
          const star = document.createElement("span");
          star.className = s < count ? "node-star is-lit" : "node-star";
          stars.append(star);
        }
        node.append(stars);
        node.setAttribute("aria-label", `${i + 1}. görev bitti, ${count} yıldız`);
      } else if (i === done.length) {
        node.className = "path-node is-next";
        node.setAttribute("aria-label", `Sıradaki: ${i + 1}. görev`);
      } else {
        node.className = "path-node is-locked";
        node.setAttribute("aria-hidden", "true");
      }
      return node;
    });

  const trackItem = document.createElement("li");
  trackItem.className = "path-track-item";
  trackItem.setAttribute("aria-hidden", "true");
  dayPath.replaceChildren(trackItem, ...nodes);
  drawTrack(trackItem, nodes, done.length);
  pathNewNode = false;
}

// A candy-cane track that winds through the node centres and stops at the last node.
function drawTrack(trackItem, nodes, doneCount) {
  const points = nodes.map((node) => [
    node.offsetLeft + node.offsetWidth / 2,
    node.offsetTop + node.offsetHeight / 2 + parseFloat(node.style.getPropertyValue("--y")),
  ]);
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)];
    const [p1, p2] = [points[i], points[i + 1]];
    const p3 = points[Math.min(points.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${p2[0]} ${p2[1]}`;
  }

  const width = dayPath.scrollWidth;
  trackItem.style.width = `${width}px`;
  trackItem.innerHTML =
    `<svg class="path-track" viewBox="0 0 ${width} ${dayPath.clientHeight}">` +
    `<path class="track-casing" d="${d}"/><path class="track-candy" d="${d}"/></svg>`;

  const scrollable = width > dayPath.clientWidth + 1;
  dayPath.classList.toggle("is-scrollable", scrollable);
  if (scrollable) {
    const next = nodes[Math.min(doneCount, nodes.length - 1)];
    dayPath.scrollLeft = Math.max(0, next.offsetLeft - dayPath.clientWidth / 2);
  }
}

function renderBank() {
  const level = levelFor(bank.coins);
  coinTotal.textContent = shownCoins;
  levelName.textContent = level.name;
  levelBadge.textContent = level.index + 1;
  renderStars(level);

  const today = bank.days[dayKey()] || 0;
  const days = streak();
  bankDay.textContent = `Bugün ${today} görev`;
  bankStreak.textContent = streakText(today, days);
  renderHearts(days);
  renderPath();
  const idleLine = today === 0
    ? "Kumbara-chan uyukluyor. Bir görev bitir, uyansın!"
    : "Görev eklemek 1, bitirmek 3 altın.";
  const line = message || idleLine;
  if (bankMessage.textContent !== line) {
    bankMessage.textContent = line;
    if (!reduceMotion.matches) replay(bankMessage, "is-pop");
  }
  if (!moodTimer) mascot.dataset.mood = restMood();
}

function render() {
  renderLists();
  renderBank();
  refreshTrays();
}

const canHover = window.matchMedia("(hover: hover)");
const trays = [...document.querySelectorAll(".list-wrap")].map((wrap) => ({
  wrap,
  tray: wrap.querySelector(".tray"),
  row: null,
}));
let pointer = null;

function liftRow(slot, row) {
  if (slot.row === row) return;
  slot.row?.classList.remove("is-lifted");
  slot.row = row;

  const { tray } = slot;
  if (!row) {
    tray.classList.remove("is-visible");
    return;
  }

  row.classList.add("is-lifted");
  const place = () => {
    tray.style.transform = `translateY(${row.offsetTop}px)`;
    tray.style.height = `${row.offsetHeight}px`;
  };

  if (tray.classList.contains("is-visible")) {
    place();
    return;
  }
  // Appear in place instead of sliding in from wherever the tray was last hidden.
  tray.classList.add("is-placing");
  place();
  tray.getBoundingClientRect();
  tray.classList.remove("is-placing");
  tray.classList.add("is-visible");
}

function refreshTrays() {
  const hovered = pointer && document.elementFromPoint(pointer.x, pointer.y)?.closest(".task");
  const focused = document.activeElement?.closest(".task");
  for (const slot of trays) {
    slot.row = null;
    const row = [hovered, focused].find((r) => r && slot.wrap.contains(r)) || null;
    liftRow(slot, row);
  }
}

for (const slot of trays) {
  slot.wrap.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" && !canHover.matches) return;
    pointer = { x: event.clientX, y: event.clientY };
    liftRow(slot, event.target.closest(".task"));
  });
  slot.wrap.addEventListener("pointerleave", () => {
    pointer = null;
    liftRow(slot, null);
  });
  slot.wrap.addEventListener("focusin", (event) => liftRow(slot, event.target.closest(".task")));
  slot.wrap.addEventListener("focusout", (event) => {
    if (!slot.wrap.contains(event.relatedTarget)) liftRow(slot, null);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    input.focus();
    return;
  }
  input.value = "";
  addTask(text);
});

input.addEventListener("focus", () => {
  mascot.dataset.look = "board";
});
input.addEventListener("blur", () => {
  delete mascot.dataset.look;
});

let resizeFrame = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeFrame);
  resizeFrame = requestAnimationFrame(renderPath);
});

// Ages, speed bonuses and sprite moods change with time.
setInterval(() => {
  if (document.hidden || document.querySelector(".task-edit")) return;
  newTaskId = null;
  render();
}, 30 * 1000);

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    filter = button.id.replace("filter-", "");
    newTaskId = null;
    render();
  });
}

if (!localStorage.getItem(BANK_KEY)) save();
render();
