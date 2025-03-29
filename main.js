// const tasks = [
//     // { title: "Name of work", completed: true },
// ];
const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(`#todo-form`);
const todoInput = document.querySelector(`#todo-input`);

// Prevent XSS Attack
function EscapeHTML(html) {
    const div = document.createElement(`div`);
    div.innerText = html;
    return div.innerHTML;
}

function isDuplicateTask(newTitle, excludeIndex = -1) {
    const isDuplicate = tasks.some(
        (task, index) =>
            task.title.toLowerCase() === newTitle.toLowerCase() &&
            excludeIndex !== index
    );
    return isDuplicate;
}

function SaveTasks() {
    localStorage.setItem(`tasks`, JSON.stringify(tasks));
}
function HandleTaskActions(e) {
    const taskItem = e.target.closest(`.task-item`);
    if (!taskItem) return;
    const taskIndex = +taskItem.getAttribute(`data-index`);
    const task = tasks[taskIndex];

    if (e.target.closest(`.edit`)) {
        let newTitle = prompt("Enter your new work:", task.title);
        if (newTitle === null) return;

        newTitle = newTitle.trim();
        if (!newTitle) {
            alert("Task title can not be emtpy");
            return;
        }

        if (isDuplicateTask(newTitle, taskIndex)) {
            alert("Task with this title already exist!");
            return;
        }

        task.title = newTitle;
        SaveTasks();
        Render();
        return;
    }
    if (e.target.closest(`.done`)) {
        task.completed = !task.completed;
        Render();
        SaveTasks();
    }
    if (e.target.closest(`.delete`)) {
        if (confirm(`Delete ${task.title} ?`)) {
            tasks.splice(taskIndex, 1);
            Render();
            SaveTasks();
        }
    }
}

function AddTask(e) {
    e.preventDefault();

    const value = todoInput.value.trim();
    if (!value) {
        return alert(`No work to add`);
    }

    if (isDuplicateTask(value)) {
        return alert("Task with this title already exist!");
    }
    tasks.push({
        title: value,
        completed: false,
    });
    Render();
    SaveTasks();
    todoInput.value = ``;
}
function Render() {
    if (!tasks.length) {
        taskList.innerHTML = `<li class="empty-message">Nothing to do</li>`;
        return;
    }
    const html = tasks
        .map(
            (task, index) => `
    <li class="task-item ${
        task.completed ? `completed` : ``
    }" data-index="${index}">
    <span class="task-title">${EscapeHTML(task.title)}</span>
    <div class="task-action">
        <button class="task-btn edit">Edit</button>
        <button class="task-btn done">${
            task.completed ? `Mark as undone` : `Mark as done`
        }</button>
        <button class="task-btn delete">Delete</button>
    </div>
</li>
`
        )
        .join(``);

    taskList.innerHTML = html;
}
todoForm.addEventListener(`submit`, AddTask);
taskList.addEventListener(`click`, HandleTaskActions);
Render();
