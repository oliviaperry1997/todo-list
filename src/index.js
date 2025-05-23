import { createTodo } from "./app";

const newTodoBtn = document.createElement("button");
newTodoBtn.textContent = "New Todo";
document.body.appendChild(newTodoBtn);

newTodoBtn.addEventListener("click", () => {
    const newTodoForm = document.createElement("dialog");
    newTodoForm.innerHTML = "<form><label for='title'>Title:</label><input id='title' name='title'><label for='desc'>Description:</label><input id='desc' name='desc'><label for='deadline'>Due By:</label><input id='deadline' type='date' name='deadline'><label for='priority'>High Priority?</label><input id='priority' type='checkbox' name='priority'><label for='notes'>Notes:</label><input id='notes' name='notes'><button id='submit' type='button'>Submit</button></form>";
    document.body.appendChild(newTodoForm);
    newTodoForm.showModal();
    const newTodoTitle = document.querySelector("#title");
    const newTodoDesc = document.querySelector("#desc");
    const newTodoDeadline = document.querySelector("#deadline");
    const newTodoPriority = document.querySelector("#priority");
    const newTodoNotes = document.querySelector("#notes");
    document.querySelector("#submit").addEventListener("click", () => {
        const newTodo = createTodo(newTodoTitle.value, newTodoDesc.value, newTodoDeadline.value, newTodoPriority.checked, newTodoNotes.value)
        console.log(newTodo);
        newTodoForm.close();
    });
});