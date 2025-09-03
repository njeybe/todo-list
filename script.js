const taskInput = document.querySelector(`.task-input`);
const addBtn = document.querySelector(`.btn-add`);
const taskList = document.querySelector(`#task-list`);
const filterBtn = document.querySelector(`.filter button`);

let tasks = [];
let currentFilter = "active";

function renderTasks(){
    taskList.innerHTML = "";

    let filterTasks = tasks.filter(function (task){
        if (currentFilter === "active"){
            return !task.completed;
        }

        if (currentFilter === "completed"){
            return task.completed;
        }
        return true;
    });

    filterTasks.forEach((task, index) => {
        const li = document.createElement("li");

        li.classList.add("task");
        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
        <button class="delete">❌</button>
        `;

        li.querySelector("input").addEventListener("change", function (){
            task.completed = !task.completed;
            renderTasks();
        });

        li.querySelector(".delete").addEventListener("click", function(){
            tasks.splice(index, 1);
            renderTasks();
        });

        taskList.appendChild(li);
    });
}

addBtn.addEventListener("click", () =>{
    const text = taskInput.value.trim();
    if(text){
        tasks.push({text, completed: false});
        taskInput.value = "";
        renderTasks();
    }
});

filterBtn.forEach(filterBtn => {
    filterBtn.addEventListener("click", () =>{
        currentFilter = filterBtn.getAttribute("data-filter");
        renderTasks();
    });
});

renderTasks();