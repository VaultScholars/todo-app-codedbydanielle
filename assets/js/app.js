// app.js
// This file controls what the app does.
// Students will fill in the logic for adding, updating, and deleting tasks.

// The array where all tasks will be stored
let tasks = [];

// ID counter for new tasks
let nextTaskId = 1;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("add-task-form");
  const taskList = document.getElementById("task-list");
  const emptyState = document.getElementById("empty-state");

  // When starting the app:
  // - Load tasks from localStorage
  // - Update nextTaskId so it doesn't conflict
  // - Show tasks on the page
  // TODO: Load tasks and render them
  tasks = loadTasks();
  // Update nextTaskId to avoid ID conflicts
  if (tasks.length > 0) {
  nextTaskId =
    Math.max(...tasks.map(task => Number(task.id) || 0)) + 1;
}
renderTasks(tasks, taskList, emptyState);

  // When the user submits the form to add a task:
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const titleInput = document.getElementById("task-title");
    const categoryInput = document.getElementById("task-category");
    const dueDateInput = document.getElementById("task-due-date");

    const title = titleInput.value.trim();
    const category = categoryInput.value.trim();
    const dueDate = dueDateInput.value; // "YYYY-MM-DD" or ""

    if (!title) {
      alert("Please enter a task title.");
      titleInput.focus();
      return;
  }

    const newTask = {
      id: nextTaskId++,
      title,
      category: category || "",
      dueDate: dueDate || "",
      completed: false,
    };

    tasks.push(newTask);

    saveTasks(tasks);
    renderTasks(tasks, taskList, emptyState);
    clearTaskForm(form);
  });

  // When clicking inside the task list (“event delegation”):
  taskList.addEventListener("click", (event) => {
    const target = event.target;
    const listItem = target.closest(".task-item");
    if (!listItem) return;

    const taskId = Number(listItem.dataset.id);

    // If the checkbox was clicked:
    if (target.classList.contains("task-checkbox")) {
      const task = tasks.find((t) => Number(t.id) === taskId);
      if (!task) return;

      task.completed = !task.completed;

      saveTasks(tasks);
      renderTasks(tasks, taskList, emptyState);
      return;
    }

    // If the delete button was clicked:
    if (target.classList.contains("task-delete-btn")) {
        tasks = tasks.filter((t) => Number(t.id) !== taskId);

      saveTasks(tasks);
      renderTasks(tasks, taskList, emptyState);
      return;
    }
  });
});
