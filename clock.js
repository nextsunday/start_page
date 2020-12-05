const clockContainer = document.querySelector(".js-clock"), 
  clockTitle = clockContainer.querySelector("h1");
const dateTitle = document.querySelector(".js-date");
  

const weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']


function getTime() {
  const date = new Date();
  const week = weeks[date.getDay()];
  year = date.getFullYear();
  month = date.getMonth();
  day = date.getDate();
  hour = date.getHours();
  minute = date.getMinutes();
  second = date.getSeconds();

  dateTitle.innerText = `${year} ${month} ${day}, ${week}`
  clockTitle.innerHTML = `${hour >= 10 ? hour: `0${hour}` }:${minute >= 10 ? minute: `0${minute}`}:${second >= 10 ? second : `0${second}`}`
  clockTitle.style.cursor = 'pointer'
  console.log(year, month, day, week, hour, minute)
}


function handleClick(e){
  letters = '0123456789ABCDEF'
  color = '#'
  for (let i=0; i<6; i++){
    color += letters[Math.floor(Math.random()*16)]
  }
  console.log(color);
  clockTitle.style.color = color;
}

function init() {
  setInterval(getTime, 1000)
  clockContainer.addEventListener("click", handleClick)
}

init();