const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";
const TODO_ITEMID = "itemId";

function makeTodo(data , author, Year , isCompleted ) {

    const textTitle = document.createElement("h2");
    textTitle.innerText = data.toUpperCase();
    
    const textAuthot = document.createElement("h5");
    textAuthot.innerText = 'Penulis : ' + author;

    const textYear = document.createElement("p");
    textYear.innerText = 'Tahun : ' + Year;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle,textAuthot, textYear);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if (isCompleted) {
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else {
        container.append(
            createCheckButton(),
            createTrashButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function (event) {
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function (event) {
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function (event) {
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass , eventListener ) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        event.stopPropagation();
    });
    return button;
}

function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const completedTODOList = document.getElementById(COMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").value;
    const authTodo = document.getElementById("author").value;
    const Year = document.getElementById("year").value;
    const checkBox = document.getElementById("complete");

    if(checkBox.checked) {
        const todo = makeTodo(textTodo,authTodo, Year, true);
        const todoObject = composeTodoObject(textTodo,  authTodo, Year, true);
        
        todo[TODO_ITEMID] = todoObject.id;
        todos.push(todoObject);
        completedTODOList.append(todo);
    } else {
        const todo = makeTodo(textTodo,authTodo, Year, false);
        const todoObject = composeTodoObject(textTodo,  authTodo, Year, false);
        
        todo[TODO_ITEMID] = todoObject.id;
        todos.push(todoObject);
        uncompletedTODOList.append(todo);
    }
    
    updateDataToStorage();
}

function addTaskToCompleted(taskElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h5").innerText;
    const taskYear = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskAuthor, taskYear, true);
    

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = true;
    newTodo[TODO_ITEMID] = todo.id;

    listCompleted.append(newTodo);
    taskElement.remove();

    updateDataToStorage();
}

function removeTaskFromCompleted(taskElement) {

    const todoPosition = findTodoIndex(taskElement[TODO_ITEMID]);
    todos.splice(todoPosition, 1);

    taskElement.remove();
    updateDataToStorage();
}

function undoTaskFromCompleted(taskElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskAuthor = taskElement.querySelector(".inner > h5").innerText;
    const taskYear = taskElement.querySelector(".inner > p").innerText;
    
    const newTodo = makeTodo(taskTitle,taskAuthor, taskYear, false);

    const todo = findTodo(taskElement[TODO_ITEMID]);
    todo.isCompleted = false;
    newTodo[TODO_ITEMID] = todo.id;

    listUncompleted.append(newTodo);
    taskElement.remove();
    
    updateDataToStorage();
}

function refreshDataFromTodos() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);

    for(todo of todos){
        const newTodo = makeTodo(todo.task, todo.author, todo.year, todo.isCompleted);
        newTodo[TODO_ITEMID] = todo.id;

        if(todo.isCompleted){
            listCompleted.append(newTodo);
        } else {
            listUncompleted.append(newTodo);
        }
    }
}

function searchbook(){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const title = document.getElementById("search").value;
    listCompleted.innerHTML = '';
    listUncompleted.innerHTML = '';
    for(todo of todos){
        if(title==""){
            location.reload();
        }else if(todo.task.includes(title)) {
            const newTodo = makeTodo(todo.task, todo.author, todo.year, todo.isCompleted);
            newTodo[TODO_ITEMID] = todo.id;
    
            if(todo.isCompleted){
                listCompleted.append(newTodo);
            } else {
                listUncompleted.append(newTodo);
            }
        }
    }
}