const taskInput = document.getElementById("taskInput");
const dueDateInput = document.getElementById("dueDateInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function updateProgressBar() {
  const completed = tasks.filter(task => task.completed).length;
  const total = tasks.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressText").textContent =
    `${completed} of ${total} tasks completed (${percent}%)`;
  document.getElementById("progressBar").style.width = `${percent}%`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks
    .map((task, originalIndex) => ({ ...task, originalIndex }))
    .filter(task => {
      if (currentFilter === "active") return !task.completed;
      if (currentFilter === "completed") return task.completed;
      return true;
    })
    .sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date(8640000000000000);
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date(8640000000000000);
      return dateA - dateB;
    })
    .forEach(task => {
      const li = document.createElement("li");
      li.className = "task-item" + (task.completed ? " completed" : "");

      const span = document.createElement("span");
      span.textContent = task.text;
      span.addEventListener("click", () => toggleTask(task.originalIndex));

      const dateSpan = document.createElement("span");
      dateSpan.className = "task-date";
      if (task.dueDate) {
        dateSpan.textContent = `Due: ${task.dueDate}`;
      }

      const buttons = document.createElement("div");
      buttons.className = "task-buttons";

      const editBtn = document.createElement("button");
      editBtn.innerHTML = "✏️";
      editBtn.onclick = () => editTask(task.originalIndex);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "🗑️";
      deleteBtn.onclick = () => deleteTask(task.originalIndex);

      buttons.appendChild(editBtn);
      buttons.appendChild(deleteBtn);

      const contentWrapper = document.createElement("div");
      contentWrapper.style.flex = "1";
      contentWrapper.appendChild(span);
      contentWrapper.appendChild(dateSpan);

      li.appendChild(contentWrapper);
      li.appendChild(buttons);
      taskList.appendChild(li);
    });

  updateProgressBar();
}

function addTask() {
  const text = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  if (text === "") return;
  tasks.push({ text, completed: false, dueDate });
  taskInput.value = "";
  dueDateInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    const newDate = prompt("Edit due date (YYYY-MM-DD):", tasks[index].dueDate || "");
    tasks[index].text = newText.trim();
    tasks[index].dueDate = newDate;
    saveTasks();
    renderTasks();
  }
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

filters.forEach(btn => {
  btn.addEventListener("click", () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

renderTasks();

