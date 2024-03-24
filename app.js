const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const li = createTaskElement(task);
        listContainer.appendChild(li);
    });
}

function createTaskElement(taskContent) {
    const li = document.createElement("li");
    li.textContent = taskContent;
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "\u00d7";
    li.appendChild(deleteButton);
    return li;
}

function addItem() {
    const taskContent = inputBox.value.trim();
    if (taskContent === '') {
        alert("Please add a task.");
        return;
    }
    const li = createTaskElement(taskContent);
    listContainer.appendChild(li);
    inputBox.value = '';
    saveTasks(getTasks());
    alert(`Added: ${taskContent}`);
}

function getTasks() {
    return Array.from(listContainer.querySelectorAll("li")).map(li => li.textContent);
}

function handleListClick(e) {
    const target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked");
    } else if (target.tagName === "SPAN") {
        if (confirm("Are you sure you want to delete this task?")) {
            target.parentElement.remove();
        }
    }
    saveTasks(getTasks());
}

loadTasks();
listContainer.addEventListener("click", handleListClick);
