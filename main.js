const tasks = [
    // { title: "Name of work", completed: true },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(`#todo-form`);
const todoInput = document.querySelector(`#todo-input`);
function isDuplicateTask(newTitle, excludeIndex = -1) {
    const isDuplicate = tasks.some(
        (task, index) =>
            task.title.toLowerCase() === newTitle.toLowerCase() &&
            excludeIndex !== index
    );
    return isDuplicate;
}
function HandleTaskActions(e) {
    const taskItem = e.target.closest(`.task-item`);
    const taskIndex = +taskItem.getAttribute(`task-index`);
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
        Render();
        return;
    }
    if (e.target.closest(`.done`)) {
        task.completed = !task.completed;
        Render();
    }
    if (e.target.closest(`.delete`)) {
        if (confirm(`Delete ${task.title} ?`)) {
            tasks.splice(taskIndex, 1);
            Render();
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
    }" task-index="${index}">
    <span class="task-title">${task.title}</span>
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
