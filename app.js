const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const archiveList = document.getElementById("archive-list");
const counter = document.getElementById("counter");

let tasks = loadTasks();
let filter = "all";

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render() {
  list.innerHTML = "";
  archiveList.innerHTML = "";

  for (const task of tasks) {
    if (filter === "active" && task.done) continue;
      if (filter === "done" && !task.done) continue;
    const li = document.createElement("li");
    li.textContent = task.text;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.addEventListener("change", () => {
      task.done = !task.done;
      saveTasks();
      render();
    });
    if (task.done) {
      li.classList.add("done");
    }
    li.prepend(checkbox);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Sil";
     deleteButton.addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      render();
    });
    li.appendChild(deleteButton);
    const archiveButton = document.createElement("button");
    archiveButton.textContent = task.archived ? "Geri al" : "Arşivle";
    archiveButton.addEventListener("click", () => {
      task.archived = !task.archived;
      saveTasks();
      render();
    });
    li.appendChild(archiveButton);
    if (task.archived) {
      archiveList.appendChild(li);
    } else {
      list.appendChild(li);
    }
  }
  const remaining = tasks.filter((t) => !t.done && !t.archived).length;
  if (remaining === 0) {
    counter.textContent = "Hepsi bitti! 🎉";
  } else {
    counter.textContent = remaining + " görev kaldı";
  }
  for (const button of document.querySelectorAll("#filters button")) {
    button.classList.toggle("active-filter", button.id === "filter-" + filter);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  render();

  input.value = "";
});

document.getElementById("filter-all").addEventListener("click", () => {
  filter = "all";
  render();
});
document.getElementById("filter-active").addEventListener("click", () => {
  filter = "active";
  render();
});
document.getElementById("filter-done").addEventListener("click", () => {
  filter = "done";
  render();
});

render();
