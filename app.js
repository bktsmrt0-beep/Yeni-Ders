const TASKS_KEY = "tasks";
const BANK_KEY = "kumbara";
const ADD_REWARD = 1;
const DONE_REWARD = 3;
const STACK_MAX = 40;
const COIN_UNITS = [1, 2, 5, 10, 25];

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
const coinStack = document.getElementById("coin-stack");
const levelNext = document.getElementById("level-next");
const bankDay = document.getElementById("bank-day");
const bankStreak = document.getElementById("bank-streak");
const bankMessage = document.getElementById("bank-message");

let tasks = loadTasks();
let bank = loadBank();
let filter = "all";
let message = "";
let newTaskId = null;
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

function earn(amount, line, fromRect, small) {
  const before = levelFor(bank.coins);
  bank.coins += amount;
  const after = levelFor(bank.coins);
  message = after.index > before.index ? `Yeni seviye: ${after.name}!` : line;
  flyCoin(fromRect, small);
}

function flyCoin(fromRect, small) {
  if (reduceMotion.matches || !fromRect) {
    shownCoins = bank.coins;
    return;
  }

  const target = (bankSlot.offsetParent ? bankSlot : coinTotal).getBoundingClientRect();
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
  flight.onfinish = () => {
    coin.remove();
    shownCoins = bank.coins;
    coinTotal.textContent = shownCoins;
    coinTotal.animate(
      [{ transform: "scale(1.08)" }, { transform: "scale(1)" }],
      { duration: 380, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  };
}

function addTask(text) {
  const task = { id: Date.now(), text, done: false, archived: false };
  tasks.push(task);
  newTaskId = task.id;
  earn(ADD_REWARD, pick(ADD_LINES), submitButton.getBoundingClientRect(), true);
  save();
  render();
}

function toggleDone(task, box) {
  const fromRect = box.getBoundingClientRect();
  task.done = !task.done;
  if (task.done) {
    task.doneOn = dayKey();
    bank.days[task.doneOn] = (bank.days[task.doneOn] || 0) + 1;
    earn(DONE_REWARD, pick(DONE_LINES), fromRect, false);
  } else {
    if (task.doneOn && bank.days[task.doneOn] > 0) bank.days[task.doneOn]--;
    delete task.doneOn;
    bank.coins = Math.max(0, bank.coins - DONE_REWARD);
    shownCoins = bank.coins;
    message = "Geri aldın, o altın kumbaradan çıktı.";
  }
  newTaskId = null;
  save();
  render();
}

function toggleArchive(task) {
  task.archived = !task.archived;
  newTaskId = null;
  save();
  render();
}

function deleteTask(task) {
  tasks = tasks.filter((t) => t.id !== task.id);
  if (!task.done) {
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

function taskItem(task) {
  const li = document.createElement("li");
  li.className = "task";
  if (task.done) li.classList.add("is-done");
  if (task.id === newTaskId) li.classList.add("is-new");

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

  li.append(box, text, actions);
  return li;
}

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
  emptyNote.textContent = note;
  emptyNote.hidden = note === "";

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

function renderStack(level) {
  const span = level.next ? level.next.at - level.at : STACK_MAX;
  const unit = COIN_UNITS.find((u) => span / u <= STACK_MAX);
  const slots = Math.ceil(span / unit);
  const filled = level.next ? Math.floor((bank.coins - level.at) / unit) : slots;
  const rows = [8, 10, 6, 9, 5].find((r) => slots % r === 0 && slots / r <= 5) || 8;
  coinStack.style.gridTemplateRows = `repeat(${rows}, 11px)`;
  coinStack.style.gridTemplateColumns = `repeat(${Math.ceil(slots / rows)}, 46px)`;

  coinStack.replaceChildren(
    ...Array.from({ length: slots }, (_, i) => {
      const coin = document.createElement("span");
      coin.className = i < filled ? "stack-coin is-filled" : "stack-coin";
      return coin;
    }),
  );
  return unit;
}

function renderBank() {
  const level = levelFor(bank.coins);
  coinTotal.textContent = shownCoins;
  levelName.textContent = level.name;

  const unit = renderStack(level);
  const toNext = level.next ? level.next.at - bank.coins : 0;
  const unitNote = unit > 1 ? `Her para ${unit} altın. ` : "";
  levelNext.textContent = level.next
    ? `${unitNote}${level.next.name} için ${toNext} altın daha`
    : "En yüksek seviye. Efsanesin.";
  coinStack.setAttribute("aria-label", level.next ? `Sonraki seviyeye ${toNext} altın kaldı` : "Kumbara tamamen dolu");

  const today = bank.days[dayKey()] || 0;
  bankDay.textContent = `Bugün ${today} görev bitirdin`;
  bankStreak.textContent = streakText(today, streak());
  bankMessage.textContent = message || "Görev eklemek 1, bitirmek 3 altın.";
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

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    filter = button.id.replace("filter-", "");
    newTaskId = null;
    render();
  });
}

if (!localStorage.getItem(BANK_KEY)) save();
render();
