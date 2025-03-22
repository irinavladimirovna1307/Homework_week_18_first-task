const taskInput = document.getElementById("task");
const addButton = document.querySelector(".add");
const taskList = document.querySelector(".list__point");
const clearButton = document.querySelector(".clear");
const emptyMessage = document.querySelector(".paragraph");

// Загружаем задачи при старте страницы
document.addEventListener("DOMContentLoaded", loadTasks);

// Функция загрузки списка задач из localStorage
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length > 0) {
    emptyMessage.style.display = "none";
    clearButton.disabled = false;
  } else {
    emptyMessage.style.display = "block";
    clearButton.disabled = true;
  }

  tasks.forEach((task) => addTaskToList(task.text, task.completed));
}

// Функция сохранения задач в localStorage
function saveTasks() {
  let tasks = [];
  document.querySelectorAll(".list__point li").forEach((li) => {
    const text = li.querySelector(".task-text").textContent;
    const completed = li.querySelector(".check").checked;
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Функция добавления задачи в список
function addTaskToList(taskText, isCompleted) {
  const listItem = document.createElement("li");

  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  taskSpan.classList.add("task-text");
  listItem.appendChild(taskSpan);

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check");
  checkbox.checked = isCompleted;
  checkbox.addEventListener("change", saveTasks);

  listItem.appendChild(checkbox);
  taskList.appendChild(listItem);

  emptyMessage.style.display = "none";
  clearButton.disabled = false;
}

// Функция создания новой задачи
function createTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  addTaskToList(taskText, false);
  saveTasks();

  taskInput.value = "";
}

// Функция очистки списка задач
function clearTasks() {
  taskList.innerHTML = "";
  localStorage.removeItem("tasks");
  emptyMessage.style.display = "block";
  clearButton.disabled = true;
}

// Назначаем обработчики событий
addButton.addEventListener("click", createTask);
clearButton.addEventListener("click", clearTasks);
