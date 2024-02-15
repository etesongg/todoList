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

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let underLine = document.getElementById("under-line");
let tabs = document.querySelectorAll(".task-taps div");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("click", addTask);
tabs.forEach(tabs=>tabs.addEventListener("click", (e)=>underLineIndicator(e)))


for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function (event) {
        filter(event);
    });
}

function underLineIndicator(e){
    underLine.style.left = e.currentTarget.offsetLeft + "px";
    underLine.style.width = e.currentTarget.offsetWidth + "px";
    underLine.style.top = e.currentTarget.offsetHeight + "px";
}

function addTask() {
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    if(taskInput.value == ""){
        window.alert("내용을 입력해주세요.")
    }else{
    taskList.push(task);
    render()
    }
}

function render() {
    // 1. 내가 선택한 탭에 따라서
    // 2. 리스트를 달리 보여준다
    let list = []
    let resultHTML = '';
    
    if(mode === "all"){
        list = taskList
    }else if(mode == "ongoing" || mode === "done"){
        list = filterList
    }

    for(let i=0; i<list.length; i++) {
        if(list[i].isComplete == true) {
            resultHTML +=`
            <div class="task">
                <div class="task-done">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }else {
            resultHTML += `
            <div class="task">
                <div>${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')">Check</button>
                    <button onclick="deleteTask('${list[i].id}')">Delete</button>
                </div>
            </div>`;
        }  
    }

    document.getElementById("task-board").innerHTML = resultHTML;
    taskInput.value = ""
}

function toggleComplete(id) {
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete; // isComplete의 원래의 값의 반대로 입력함
            break;
        }
    }
    render() // 값이 업데이트 되면 ui도 업데이트 돼야 하기때문에 해줘야함(자동으로 ui도 업데이트 해주는건 리액트)
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){ 
        if(taskList[i].id == id){
            taskList.splice(i, 1)
            break;
        }
    }
    filter()
}

function filter(event){
    mode = event.target.id
    filterList = []
    if(mode === "all"){
        render()
    }else if(mode === "ongoing"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == false){
                filterList.push(taskList[i])
            }
        }
        render();
    }else if(mode === "done"){
        for(let i=0; i<taskList.length; i++){
            if(taskList[i].isComplete == true){
                filterList.push(taskList[i])
            }
        }
        render();
    }
}



function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
    // 출처 https://gist.github.com/CoralSilver/afd60a5a423168d0d4a0f996ad021384
}