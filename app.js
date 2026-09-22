const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

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

  for (const task of tasks) {
    const li = document.createElement("li");
    li.textContent = task.text;
    list.appendChild(li);
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
