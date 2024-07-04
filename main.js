//유저가 값을 입력한다
//플러스 버튼을 클릭하면, 할일이 추가된다
//딜리트 버튼을 누르면 할일이 삭제된다
//체크버튼을 누르면 할일이 끝나면서 밑줄이 간다
//1. 체크버튼을 클릭하면  false -> true
//2. true 이면 끝난 걸로 간주하고 밑줄 보여주기
//3. false 이면 안끝난걸로 간주하고 그대로
//진행중 끝남 탭을 누르면 언더바가 이동한다
//끝남탭은, 끝난 아이탬만. 진행중탭은 진행중인 아이템만
//전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = 'all';
let filterList = [];
let underLine = document.getElementById("under-line");

for(let i=1; i<tabs.length;i++) {
    tabs[i].addEventListener("click", function(event){
        filter(event);
    });
}

addButton.addEventListener("click",addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

function addTask () {
    let taskValue = taskInput.value;

    if (taskValue === "") {
        return alert("Please enter a task");
        return;
    }

    let task = {
        id : randomIDGenerate(),
        taskContent : taskValue,
        isComplete : false
    };

    taskList.push(task);
    taskInput.value = "";
    render();
}

function render () {
    let list=[];
    if(mode==="all"){
        list = taskList;
    }else if(mode ==="ongoing" || mode==="done") {
        list = filterList;
    }else if (mode === "priority") {
        list = filterList;
    }

    let resultHTML = '';
    for(let i=0;i<list.length;i++) {

        let task = list[i];
        let importantIcon = task.isImportant ? 'fa-solid' : 'fa-regular';

        if(list[i].isComplete) {
            resultHTML+= `<div class="task" style="background-color:#FFF0F5;">
                    <div class = "task-done">${list[i].taskContent}</div>
                    <div class="buttons">
                        <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left fa-lg" style="color: #a2bfad;"></i></button>
                        <button onclick="importantTask('${list[i].id}')"><i class="${importantIcon} fa-star fa-lg" style="color: #fb655e;"></i></button>
                        <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square fa-lg" style="color: #299e5e;"></i></button>
                        <button onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #849acb;"></i></button>
                    </div>
                </div>`;
        }else {
            resultHTML += `<div class="task">
                    <div>${list[i].taskContent}</div>
                    <div class="buttons">
                        <button onclick = "toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #DB7093;"></i></button>
                        <button onclick="importantTask('${list[i].id}')"><i class="${importantIcon} fa-star fa-lg" style="color: #fb655e;"></i></button>
                        <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square fa-lg" style="color: #299e5e;"></i></button>
                        <button onclick = "deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #849acb;"></i></button>
                    </div>
                </div>`;
            }
        }
    document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}

function importantTask(id){
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isImportant = !taskList[i].isImportant;
            break;
        }
    }
    filter();
}

function editTask(id) {
    let newContent = prompt("Please edit your task");
    if (newContent) {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].taskContent = newContent;
                break;
            }
        }
        render();
    }
}





function deleteTask(id) {
    for(let i=0;i<taskList.length;i++) {
        if(taskList[i].id == id) {
            taskList.splice(i,1);
            //break;
        }
    }
    filter();
}

function filter(event) {
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        //underLine.style.top =
            //event.target.offsetTop + event.target.offsetHeight + "px";
    }
    
    filterList = [];

    

    if (mode === "all") {
        filterList = taskList; // Show all tasks
    } else if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete); // Filter ongoing tasks
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete); // Filter completed tasks
    } else if (mode === "priority") {
        filterList = taskList.filter(task => task.isImportant); // Filter tasks marked as important
    }
    render();
}


function randomIDGenerate () {
    return '_' + Math.random().toString(36).substr(2, 9);
}