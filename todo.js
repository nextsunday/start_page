const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  pendingList = document.querySelector(".js-pendingList"),
  finishedList = document.querySelector(".js-finishedList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let pendingToDos = [];
let finishedToDos = [];

function saveToDos(loc, obj) {
  localStorage.setItem(loc, JSON.stringify(obj));
}

function reArrangeId(toDos, LS) {
  const pendingItems = pendingList.querySelectorAll("li");
  const finishedItems = finishedList.querySelectorAll("li");

  for (let i = 0; i < toDos.length; i++) {
    toDos[i].id = i + 1;
    if (LS === PENDING_LS) pendingItems[i].id = i + 1;
    else finishedItems[i].id = i + 1;
  }
  return toDos;
}


function makeMoveToPendingBtn () {
  const moveToPendingBtn = document.createElement("button");
  moveToPendingBtn.innerText = "⏮";
  moveToPendingBtn.addEventListener("click", moveToPending);
  return moveToPendingBtn;
}

function makeMoveToFinishedBtn() {
  const moveToFinishedBtn = document.createElement("button");
  moveToFinishedBtn.innerText = "✔";
  moveToFinishedBtn.addEventListener("click", moveToFinished);
  return moveToFinishedBtn
}


function deleteTodo(event) {
  const delBtn = event.target;
  const li = delBtn.parentNode;
  const ul = li.parentNode;
  ul.removeChild(li);

  if (ul === pendingList) {
    let cleanToDos = pendingToDos.filter(function (toDo) {
      if (toDo.id !== parseInt(li.id)) {
        return toDo;
      }
    });
    pendingToDos = cleanToDos;
    pendingToDos = reArrangeId(pendingToDos, PENDING_LS);
    saveToDos(PENDING_LS, pendingToDos);
  } else {
    let cleanToDos = finishedToDos.filter(function (toDo) {
      if (toDo.id !== parseInt(li.id)) {
        return toDo;
      }
    });
    finishedToDos = cleanToDos;
    finishedToDos = reArrangeId(finishedToDos, FINISHED_LS);
    saveToDos(FINISHED_LS, finishedToDos);
  }
}

function moveToFinished(event) {
  const toFinishBtn = event.target;
  const li = toFinishBtn.parentNode;
  li.removeChild(toFinishBtn);

  moveToPendingBtn = makeMoveToPendingBtn()  
  li.appendChild(moveToPendingBtn);
  const cleanToDos = pendingToDos.filter(function (toDo) {
    if (toDo.id === parseInt(li.id)) {
      pendingList.removeChild(li);
      paintTodos(toDo.text, FINISHED_LS);
    } else {
      return toDo;
    }
  });

  pendingToDos = cleanToDos;
  pendingToDos = reArrangeId(pendingToDos, PENDING_LS);
  saveToDos(PENDING_LS, pendingToDos);
}

function moveToPending(event) {
  const toPendingBtn = event.target;
  const li = toPendingBtn.parentNode;
  li.removeChild(toPendingBtn);

  moveToFinishedBtn = makeMoveToFinishedBtn()  
  li.appendChild(moveToFinishedBtn);

  const cleanToDos = finishedToDos.filter(function (toDo) {
    if (toDo.id === parseInt(li.id)) {
      finishedList.removeChild(li);
      paintTodos(toDo.text, PENDING_LS);
    } else {
      return toDo;
    }
  });

  finishedToDos = cleanToDos;
  finishedToDos = reArrangeId(finishedToDos, FINISHED_LS);
  saveToDos(FINISHED_LS, finishedToDos);
}

function paintTodos(text, LS) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId =
    LS === PENDING_LS ? pendingToDos.length + 1 : finishedToDos.length + 1;

  span.innerText = text;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteTodo);

  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;

  const toDoObj = {
    text: text,
    id: newId
  };

  if (LS === PENDING_LS) {
    moveToFinishedBtn = makeMoveToFinishedBtn();
    li.appendChild(moveToFinishedBtn);
    pendingList.appendChild(li);
    pendingToDos.push(toDoObj);
    saveToDos(LS, pendingToDos);
  } else if (LS == FINISHED_LS) {
    moveToPendingBtn = makeMoveToPendingBtn();    
    li.appendChild(moveToPendingBtn);
    finishedList.appendChild(li);
    finishedToDos.push(toDoObj);
    saveToDos(LS, finishedToDos);
  }

}

function submitHandler(event) {
  event.preventDefault();
  const currentToDo = toDoInput.value;
  paintTodos(currentToDo, PENDING_LS);
  toDoInput.value = "";
  console.log(pendingToDos, finishedToDos);
}

function loadToDo(LS) {
  const loadedToDo = localStorage.getItem(LS);
  if (loadedToDo !== null) {
    const parsedToDo = JSON.parse(loadedToDo);
    parsedToDo.forEach(function (toDo) {
      paintTodos(toDo.text, LS);
    });
  }
}

function init() {
  loadToDo(PENDING_LS);
  loadToDo(FINISHED_LS);
  toDoForm.addEventListener("submit", submitHandler);
}

init();