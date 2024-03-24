const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("list-container");

function saveTask() {
    localStorage.setItem("task", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("task")
}
showTask()

function addItem() {
    if(inputBox.value === ''){
        alert("Please add an Item / Task");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"
        li.appendChild(span)
        alert(`Added: ${inputBox.value}`);
    }
    inputBox.value = '';
    saveTask();
}


listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveTask();
    }
    else if(e.target.tagName === "SPAN"){
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.remove();
            saveTask();
        }
    }
}, false);





