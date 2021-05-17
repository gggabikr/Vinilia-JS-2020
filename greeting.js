const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

/*
여기서 querySelectorAll을 써도 되지만, 그경우는 결과값을 
Array(list)로 가져옴. 심지어는 해당되는 값이 하나뿐일때도 
array로 가져옴. 그럼 또 그 결과에서 하나의 값을 꺼내는 작업을 해야함.
그게 더 일이 많아져서 그냥 이렇게 쓰는것. 
*/

const USER_LS = "currentUser";
    SHOWING_CLASSNAME = "showing";

function saveName(text){
    localStorage.setItem(USER_LS, text);
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue)
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CLASSNAME)
    form.addEventListener("submit", handleSubmit)
}


function paintGreeting(text){
    form.classList.remove(SHOWING_CLASSNAME);
    greeting.classList.add(SHOWING_CLASSNAME);
    greeting.innerText = `Hello, ${text} !`;
}

function loadName(){
    const currentUser = localStorage.getItem(USER_LS);

    if(currentUser ===null){
        //when user is not exist
        askForName();
    }
    else{
        //when user is exist
        paintGreeting(currentUser);
    }
}




function init(){
    loadName();
}

init();