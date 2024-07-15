// 유저가 할일을 입력한다.
// + 버튼을 누르면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일에 밑줄이 생긴다.
// 1. check 버튼을 클릭하는 순간 true false
// 2. true이면 끝난걸로 간주하고 밑줄 보여주기
// 3. false이면 안끝난걸로 간주하고 그대로

// All, not Done, Done 탭을 누르면 언더바가 이동한다.
// not Done 탭에는 진행중인 아이템만, Done 탭에는 끝난 아이템만 보여준다.
// All 탭을 누르면 다시 전체 아이템을 보여준다.

let underLine = document.getElementById("under-line");
let menus = document.querySelectorAll(".task-tabs > div")
let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = [];
let mode = "all";
let filterList = [];

document.addEventListener("DOMContentLoaded", () => {
    menus.forEach((menu) => menu.addEventListener("click", (e) => underLineIndicator(e.currentTarget)));

    const initialMenu = menus[1];
    underLineIndicator(initialMenu);
});

for (let i = 1; i < menus.length; i++) {
    menus[i].addEventListener("click", (e) => filter(e));
}

taskInput.addEventListener("focus", function () {taskInput.value="";});
addButton.addEventListener("click", addTask);

function addTask() {
    if (taskInput.value.length == 0){
         return alert("할 일을 입력해주세요")
    }
    for (let i=0; i<taskList.length; i++){
        if(taskList[i].taskContent == taskInput.value)
            return alert("이 할 일은 이미 추가되었습니다!")
    }
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false,
        isPinned: false
    };
    taskList.push(task);
    render()
}

function render() {
    // 내가 선택한 탭에 따라서 리스트를 달리 보여준다. all, ongoing, done
    let list = [];
    if (mode === "all"){
        list = taskList;
    }else if (mode === "ongoing" || mode === "done"){
        list = filterList;
    }

    let resultHTML = "";
        for(let i=0; i<list.length; i++){
            let task = list[i];
            let isComplete = task.isComplete? "task-done": "";
            let checkIcon = task.isComplete? '<i class="fa-solid fa-square-check fa-xl"></i>': '<i class="fa-regular fa-square-check fa-xl"></i>'
            let pinIcon = task.isPinned? "pinned": "pin";

            resultHTML += `
            <div class="task ${isComplete}"> 
                <div class="task-content-area">
                    <div class=${pinIcon} onclick="pinMarker('${list[i].id}')"></div>
                    <div>
                        ${list[i].taskContent}
                    </div> 
                </div>

                <div class="task-button-area">
                    <button onclick="toggleComplete('${list[i].id}')">${checkIcon}</button>
                    <button onclick="deleteTask('${list[i].id}')"><i class="fa-regular fa-square-minus fa-xl"></i></button>
                </div>
            </div>`
        }

        document.getElementById("task-board").innerHTML = resultHTML;
        taskInput.value = "";
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter()
}

function deleteTask(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList.splice(i,1);
            break;
        }
    }
    filter()
}

function pinMarker(id){
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isPinned = !taskList[i].isPinned;
            
            let pinTask = taskList.splice(i,1)[0];
            console.log(pinTask)
            taskList.unshift(pinTask)
            break;
        }
    }
    filter()
}

function filter(e){
    if (e){
        mode = e.target.id;
    }else{
        mode = mode;
    }

    filterList = [];

    if (mode === "all"){
        render();
    }else if (mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else{
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}

function underLineIndicator(menu) {
    underLine.style.left = menu.offsetLeft + "px";
    underLine.style.width = menu.offsetWidth + "px";
    underLine.style.top = menu.offsetTop + menu.offsetHeight + "px";
}

function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function enterkey() {
    if(window.event.keyCode == 13){
        addTask()
    }
}
