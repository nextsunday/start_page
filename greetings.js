const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";


function saveName(text) {
  localStorage.setItem(USER_LS, text);
}


function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  console.log(currentValue);
  saveName(currentValue)
  paintGreeting(currentValue);
}


function askForName() {
  form.classList.add(SHOWING_CN)
  form.addEventListener("submit", handleSubmit)
}


function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.innerText = `Hello ${text}`;
  greeting.classList.add(SHOWING_CN);
}


function loadName() {
  const currentUser = localStorage.getItem(USER_LS)
  if(currentUser === null){
    askForName();

  } else {
    paintGreeting(currentUser);
  }

}


function init() {
  loadName()
}

init();
