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
        let projectName = newTodoProject.value.trim();
        if (projectName === "") {
            projectName = "Default";
        }

        const normalizedProjectName = projectName.toLowerCase();
        let todoProject = projectList.find(p => p.projectName.toLowerCase() === normalizedProjectName);

        if (!todoProject) {
            if (projectName === "Default") {
                createProject("Default");
                todoProject = projectList.find(p => p.projectName === "Default");
            } else {
                alert("Project not found, creating new project.");
                createProject(projectName);
                todoProject = projectList.find(p => p.projectName === projectName);
            }
        }

        createTodo(
            newTodoTitle.value,
            newTodoDesc.value,
            newTodoDeadline.value,
            newTodoPriority.checked,
            newTodoNotes.value,
            projectName
        );

        newTodoForm.close();
        newTodoForm.remove();
        updateDisplay();
    });
});

function updateDisplay() {
    const container = document.querySelector("#todo-container");
    container.innerHTML = '';

    for (let i=0; i<projectList.length; i++) {
        const project = projectList[i];

        const projectDiv = document.createElement('div');
        projectDiv.id = `project-${project.projectName.toLowerCase().replace(/\s+/g, '-')}`;
        projectDiv.classList.add('project');

        const projectTitle = document.createElement("h2");
        projectTitle.textContent = project.projectName;

        projectTitle.addEventListener("click", () => showProject(project));

        projectDiv.appendChild(projectTitle);
        container.appendChild(projectDiv);
    }
}

function showProject(selectedProject) {
    const container = document.querySelector("#todo-container");

    const projectDivs = container.querySelectorAll('.project');
    projectDivs.forEach(div => {
        div.querySelectorAll('.todo-item').forEach(item => item.remove());
    });

    const selectedProjectDiv = document.querySelector(
        `#project-${selectedProject.projectName.toLowerCase().replace(/\s+/g, '-')}`
    );

    selectedProject.todoList.forEach((todo, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-item');

        const summary = document.createElement('div');
        summary.innerHTML = `
            <h3>${todo.title}</h3>
            <p>Due: ${todo.dueDate}</p>
        `;
        summary.style.cursor = "pointer";

        const details = document.createElement('div');
        details.style.display = "none";
        details.innerHTML = `
            <p>${todo.description}</p>
            <p>${todo.priority ? "High Priority" : "Normal Priority"}</p>
            <p>${todo.notes}</p>
        `;

        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => {
            openEditForm(selectedProject, index);
        });

        summary.addEventListener("click", () => {
            details.style.display = details.style.display === "none" ? "block" : "none";
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this todo?")) {
                selectedProject.todoList.splice(index, 1);
                updateDisplay();
                showProject(selectedProject);
            }
        });

        todoDiv.appendChild(summary);
        todoDiv.appendChild(details);
        todoDiv.appendChild(editBtn);
        todoDiv.appendChild(deleteBtn);
        selectedProjectDiv.appendChild(todoDiv);
    });
}

function openEditForm(project, todoIndex) {
    const todo = project.todoList[todoIndex];
    const editForm = document.createElement("dialog");
    editForm.innerHTML = `
        <form id="edit-form">
            <label for='edit-title'>Title:</label>
            <input id='edit-title' name='title' value="${todo.title}">
            <label for='edit-desc'>Description:</label>
            <input id='edit-desc' name='desc' value="${todo.description}">
            <label for='edit-deadline'>Due By:</label>
            <input id='edit-deadline' type='date' name='deadline' value="${todo.dueDate}">
            <label for='edit-priority'>High Priority?</label>
            <input id='edit-priority' type='checkbox' name='priority' ${todo.priority ? "checked" : ""}>
            <label for='edit-notes'>Notes:</label>
            <input id='edit-notes' name='notes' value="${todo.notes}">
            <button type='button' id='edit-submit'>Save</button>
        </form>
    `;
    document.body.appendChild(editForm);
    editForm.showModal();

    editForm.querySelector("#edit-submit").addEventListener("click", () => {
        todo.title = editForm.querySelector("#edit-title").value;
        todo.description = editForm.querySelector("#edit-desc").value;
        todo.dueDate = editForm.querySelector("#edit-deadline").value;
        todo.priority = editForm.querySelector("#edit-priority").checked;
        todo.notes = editForm.querySelector("#edit-notes").value;

        editForm.close();
        editForm.remove();
        updateDisplay();
        showProject(project);
    });
}

updateDisplay();
const defaultProject = projectList.find(p => p.projectName.toLowerCase() === "default");
if (defaultProject) {
    showProject(defaultProject);
}