export let projectList = [];
export function createProject(name) {
    projectList.push(name);
    return {name};
};
export function createTodo(title, description, dueDate, priority, notes, project) {
    if (project = "") {
        project = "default";
    }
    return {title, description, dueDate, priority, notes}
}