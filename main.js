const tasks = [
    // { title: "Name of work", completed: true },
];

const taskList = document.querySelector("#task-list");
const todoForm = document.querySelector(`#todo-form`);
const todoInput = document.querySelector(`#todo-input`);

function HandleTaskActions(e) {
    const taskItem = e.target.closest(`.task-item`);
    const taskIndex = +taskItem.getAttribute(`task-index`);
    const task = tasks[taskIndex];
    if (e.target.closest(`.edit`)) {
        const newTitle = prompt("Enter your new work:", task.title);
        task.title = newTitle;
        Render();
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
    tasks.push({
        title: value,
        completed: false,
    });
    Render();

    todoInput.value = ``;
}

function Render() {
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
