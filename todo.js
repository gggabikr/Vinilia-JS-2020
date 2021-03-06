const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");



const TODOS_LS = "toDOs";

let toDos = [];


function deleteToDo(event){
// console.log(event.target.parentNode);
const btn = event.target;
const li = btn.parentNode;
toDoList.removeChild(li);
const cleanToDos = toDos.filter(function(toDo){
    return toDo.id !== parseInt(li.id);
});
toDos = cleanToDos;
saveToDos();
};





function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

let newId = 0;

function paintToDo(text){
    // console.log(text);
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    delBtn.innerHTML = "❌" 
    delBtn.addEventListener("click", deleteToDo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {text:text, id:newId};
    toDos.push(toDoObj);
    saveToDos();
    newId++;
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        // console.log(loadedToDos);
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){paintToDo(toDo.text)});
    }

}


function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();