export let projectList = [
    {
        projectName: "Default",
        todoList: []
    }
];
export function createProject(name) {
    const existing = projectList.find(p => p.projectName.toLowerCase() === name.toLowerCase());
    if (!existing && name.trim()) {
        projectList.push({projectName: name, todoList: []});
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
        const newProject = {
            projectName: project,
            todoList: [todoItem]
        };
        projectList.push(newProject);
    };
};