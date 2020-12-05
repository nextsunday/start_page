const weather = document.querySelector(".js-weather");

const API_KEY = "7497ce8d98c10abf3579b26fdfcf603b";
const COORDS = 'coords';

function getWeather(lat, lon){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response) {
    return response.json()
  }).then(function(json) {
    const temperature = json.main.temp;
    const humidity = json.main.humidity;
    const place = json.name;
    const description = json.weather[0].main;
    weather.innerText = `Weather of ${place}
    ${temperature}°C, ${humidity}%
    ${description}`
  })
};

function saveCoords(coordsObj){
  localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucess(position){
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };
  saveCoords(coordsObj)
  getWeather(latitude, longitude)
}

function handleGeoError(){
  console.log('Cant access')
}


function askForCoords(){
  navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError)
}


function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null){
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}


function init() {
  loadCoords();
}


init()