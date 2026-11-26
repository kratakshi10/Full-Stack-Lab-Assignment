function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    let span = document.createElement("span");
    span.textContent = task;

    checkbox.onchange = function() {
        span.classList.toggle("completed", checkbox.checked);
    };

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "delete";

    delBtn.onclick = function() {
        li.remove();
    };

    let upBtn = document.createElement("button");
    upBtn.textContent = "↑";
    upBtn.className = "move";

    upBtn.onclick = function() {
        if (li.previousElementSibling) {
            li.parentNode.insertBefore(li, li.previousElementSibling);
        }
    };

    let downBtn = document.createElement("button");
    downBtn.textContent = "↓";
    downBtn.className = "move";

    downBtn.onclick = function() {
        if (li.nextElementSibling) {
            li.parentNode.insertBefore(li.nextElementSibling, li);
        }
    };

    li.append(checkbox, span, delBtn, upBtn, downBtn);

    document.getElementById("taskList").appendChild(li);

    input.value = "";
}