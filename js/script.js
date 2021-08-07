document.addEventListener("DOMContentLoaded", function () {

    const submitForm = document.getElementById("form");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        addTodo();
    });
    const submitForm2 = document.getElementById("form2");

    submitForm2.addEventListener("submit", function (event) {
        event.preventDefault();
        searchbook();
    });

    if(isStorageExist()){
        loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
    console.log("Data berhasil di simpan.");
});

document.addEventListener("ondataloaded", () => {
    refreshDataFromTodos();
});
