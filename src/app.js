export let projectList = loadProjectList();

function loadProjectList() {
    const data = localStorage.getItem("projectList");
    return data ? JSON.parse(data) : [
        {
            projectName: "Default",
            todoList: []
        }
    ];
}

function saveProjectList() {
    localStorage.setItem("projectList", JSON.stringify(projectList));
}

export function createProject(name) {
    const existing = projectList.find(p => p.projectName.toLowerCase() === name.toLowerCase());
    if (!existing && name.trim()) {
        projectList.push({projectName: name, todoList: []});
        saveProjectList();
    }
};
export function createTodo(title, description, dueDate, priority, notes, project) {
    if (!project || project.trim() === "") {
        project = "default";
    }

    const todoItem = {
        title,
        description,
        dueDate,
        priority,
        notes
    }

    const targetProject = projectList.find(p => p.projectName.toLowerCase() === project.toLowerCase());
    
    if (targetProject) {
        targetProject.todoList.push(todoItem)
    } else {
        projectList.push({
            projectName: project,
            todoList: [todoItem]
        });
    };

    saveProjectList();
};