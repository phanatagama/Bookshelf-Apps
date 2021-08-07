const STORAGE_KEY = "BOOKSHELF_APPS";

let todos = [];

 function isStorageExist()  {
    if(typeof(Storage) === undefined){
        alert("Browser kamu tidak mendukung local storage");
        return false
    } 
    return true;
}

function saveData() {
    const parsed = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);
    
    let data = JSON.parse(serializedData);
    
    if(data !== null)
        todos = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if(isStorageExist())
        saveData();
}

function composeTodoObject(task, author, year, isCompleted) {
    return {
        id: +new Date(),
        task,
        author,
        year,
        isCompleted
    };
}

function findTodo(todoId) {

    for(todo of todos){
        if(todo.id === todoId)
            return todo;
    }

    return null;
}

function findTodoIndex(todoId) {
    
    let index = 0
    for (todo of todos) {
        if(todo.id === todoId)
            return index;

        index++;
    }

    return -1;
}