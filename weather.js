const weather = document.querySelector(".js-weather")

const API_KEY = "1354dbd1a47d1a59150c07ccbceea285";


const COORDS = "coords";

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){
        return response.json()
    })
    .then(function(json){
        console.log(json)
        const temperture = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperture}℃ at ${place}`
    
    });
}




function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}


function handleGeoSucces(position){
    // console.log(position);
    const latitude = (position.coords.latitude);
    const longitude = (position.coords.longitude);
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log("can't access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}


function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords ===null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        console.log(parsedCoords);
        getWeather(parsedCoords.latitude,parsedCoords.longitude);
    }
}

function init(){
loadCoords();
}

init();