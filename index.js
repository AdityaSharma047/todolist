const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let spanEdit = document.createElement("span");
        spanEdit.innerHTML = "\uD83D\uDD89";
        spanEdit.classList.add("edit");
        li.appendChild(spanEdit);
        let spanDelete = document.createElement("span");
        spanDelete.innerHTML = "\u00d7";
        spanDelete.classList.add("delete");
        li.appendChild(spanDelete);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("edit")) {
        let listItem = e.target.parentElement;
        if (!listItem.classList.contains("checked")) { // Check if task is not completed
            let taskText = listItem.firstChild.textContent.trim();
            let newText = prompt("Edit your task:", taskText);
            if (newText !== null && newText.trim() !== '') { // Check for non-empty string
                listItem.firstChild.textContent = newText;
                saveData();
            } else if (newText !== null) {
                alert("Task cannot be empty!");
            }
        } else {
            alert("Completed tasks cannot be edited!");
        }
    } else if (e.target.classList.contains("delete")) {
        if (confirm("Are you sure you want to delete this task?")) {
            e.target.parentElement.remove();
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
