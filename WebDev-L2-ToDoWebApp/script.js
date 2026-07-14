// ─── State ───
let tasks = [];
let currentFilter = "all";

// ─── DOM refs ───
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompletedBtn = document.getElementById("clearCompleted");
const filterBtns = document.querySelectorAll(".filter-btn");

// ─── Load from localStorage ───
function loadTasks() {
  try {
    const stored = localStorage.getItem("todoTasks");
    tasks = stored ? JSON.parse(stored) : [];
  } catch {
    tasks = [];
  }
}

// ─── Save to localStorage ───
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// ─── Render ───
function render() {
  const filtered = tasks.filter((t) => {
    if (currentFilter === "active") return !t.completed;
    if (currentFilter === "completed") return t.completed;
    return true;
  });

  if (filtered.length === 0) {
    taskList.innerHTML =
      '<li class="empty-msg">No tasks yet — add one above!</li>';
  } else {
    taskList.innerHTML = filtered
      .map(
        (t) => `
      <li class="task-item" data-id="${t.id}">
        <span class="checkbox ${t.completed ? "checked" : ""}">✓</span>
        <span class="task-text ${t.completed ? "completed" : ""}">${escapeHtml(t.text)}</span>
        <button class="delete-btn" title="Delete task">✕</button>
      </li>`
      )
      .join("");
  }

  const activeCount = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${activeCount} task${activeCount !== 1 ? "s" : ""} left`;
}

// ─── Escape HTML to prevent XSS ───
function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// ─── Add task ───
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return;

  tasks.push({
    id: Date.now() + Math.random(),
    text,
    completed: false,
  });

  taskInput.value = "";
  taskInput.focus();
  saveTasks();
  render();
}

// ─── Toggle complete ───
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    render();
  }
}

// ─── Delete task ───
function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  render();
}

// ─── Clear completed ───
function clearCompleted() {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  render();
}

// ─── Set filter ───
function setFilter(filter) {
  currentFilter = filter;
  filterBtns.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
  render();
}

// ─── Event listeners ───
addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// Delegate clicks on task list (for checkbox & delete)
taskList.addEventListener("click", (e) => {
  const item = e.target.closest(".task-item");
  if (!item) return;
  const id = Number(item.dataset.id);

  if (e.target.classList.contains("checkbox")) {
    toggleTask(id);
  } else if (e.target.classList.contains("delete-btn")) {
    deleteTask(id);
  }
});

// ─── Init ───
loadTasks();
render();
