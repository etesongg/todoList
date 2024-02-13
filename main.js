// 유저가 할일을 입력한다.
// + 버튼을 누르면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일에 밑줄이 생긴다.
// All, not Done, Done 탭을 누르면 언더바가 이동한다.
// not Done 탭에는 진행중인 아이템만, Done 탭에는 끝난 아이템만 보여준다.
// All 탭을 누르면 다시 전체 아이템을 보여준다.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let taskList = []
addButton.addEventListener("click", addTask)

function addTask() {
    let taskContent = taskInput.value;
    taskList.push(taskContent);
    render()
}

function render() {
    let resultHTML = '';

    for(let i=0; i<taskList.length; i++){
        resultHTML += `
        <div class="task">
            <div>${taskList[i]}</div>
            <div>
                <button>Check</button>
                <button>Delete</button>
            </div>
        </div>`;
    }

    document.getElementById("task-board").innerHTML = resultHTML;
}