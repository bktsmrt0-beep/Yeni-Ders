const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const archiveList = document.getElementById("archive-list");
const counter = document.getElementById("counter");

let tasks = loadTasks();

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

render();
