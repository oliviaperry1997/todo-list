import { createTodo } from "./app";
import { createProject } from "./app";
import { projectList } from "./app";

const newTodoBtn = document.createElement("button");
newTodoBtn.textContent = "New Todo";
document.body.appendChild(newTodoBtn);

const newProjectBtn = document.createElement("button");
newProjectBtn.textContent = "New Project";
document.body.appendChild(newProjectBtn);

newProjectBtn.addEventListener("click", () => {
    const newProjectForm = document.createElement("dialog");
    newProjectForm.innerHTML = `
        <form id="project-form">
            <label for='name'>Name:</label>
            <input id='name' name='name'>
            <button id='project-submit' type='button'>Submit</button>
        </form>
    `;
    document.body.appendChild(newProjectForm);
    newProjectForm.showModal();

    const formElement = newProjectForm.querySelector("#project-form");
    formElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    const newProjectName = document.querySelector("#name");
    newProjectForm.querySelector("#project-submit").addEventListener("click", () => {
        const name = newProjectName.value.trim();
        if (!name) {
            newProjectForm.close();
            newProjectForm.remove();
            return;
        }

        createProject(name);

        newProjectForm.close();
        newProjectForm.remove();
        updateDisplay();
    })
})

newTodoBtn.addEventListener("click", () => {
    const newTodoForm = document.createElement("dialog");
    newTodoForm.innerHTML = `
        <form id="todo-form">
            <label for='title'>Title:</label>
            <input id='title' name='title'>
            <label for='desc'>Description:</label>
            <input id='desc' name='desc'>
            <label for='deadline'>Due By:</label>
            <input id='deadline' type='date' name='deadline'>
            <label for='priority'>High Priority?</label>
            <input id='priority' type='checkbox' name='priority'>
            <label for='notes'>Notes:</label>
            <input id='notes' name='notes'>
            <label for='project'>Project:</label>
            <input id='project' name='project'>
            <button id='todo-submit' type='button'>Submit</button>
        </form>
    `;
    document.body.appendChild(newTodoForm);
    newTodoForm.showModal();

    const formElement = newTodoForm.querySelector("#todo-form");
    formElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    const newTodoTitle = document.querySelector("#title");
    const newTodoDesc = document.querySelector("#desc");
    const newTodoDeadline = document.querySelector("#deadline");
    const newTodoPriority = document.querySelector("#priority");
    const newTodoNotes = document.querySelector("#notes");
    const newTodoProject = document.querySelector("#project")
    newTodoForm.querySelector("#todo-submit").addEventListener("click", () => {
        const projectName = newTodoProject.value.trim().toLowerCase();
        let todoProject = projectList.find(p => p.projectName.toLowerCase() === projectName);
        if (!todoProject) {
            alert("Project not found, placing item in Default.");
            todoProject = document.querySelector("#project-default");
        }

        createTodo(newTodoTitle.value, newTodoDesc.value, newTodoDeadline.value, newTodoPriority.checked, newTodoNotes.value, newTodoProject.value)

        newTodoForm.close();
        newTodoForm.remove();
        updateDisplay();
    });
});

function updateDisplay() {
    document.querySelector("#todo-container").innerHTML = '';

    for (var i=0; i<projectList.length; i++) {
        const projectDiv = document.createElement('div');
        projectDiv.id = `project-${projectList[i].projectName.toLowerCase()}`;
        projectDiv.innerHTML = `<h2>${projectList[i].projectName}</h2>`;
        for (var j=0; j<projectList[i].todoList.length; j++) {
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = `
            <h3>${projectList[i].todoList[j].title}</h3>
            <p>${projectList[i].todoList[j].description}</p>
            <p>${projectList[i].todoList[j].dueDate}</p>
            <p>${projectList[i].todoList[j].priority}</p>
            <p>${projectList[i].todoList[j].notes}</p>
            `;
            projectDiv.appendChild(todoDiv);
        }
        document.querySelector("#todo-container").appendChild(projectDiv);
    }
}

updateDisplay();