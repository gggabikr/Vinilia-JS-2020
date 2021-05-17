const locationName = document.querySelector(".js-location")
const weather = document.querySelector(".js-weather")
const temp = document.querySelector(".js-temp")
let locationIcon = document.querySelector('.weather-icon');

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
        locationName.innerText = `${place}`
        temp.innerText = `${temperture.toFixed(1)}℃`


        const icon = json.weather[0].icon;
        locationIcon.innerHTML = `<img src="icons/${icon}.png">`;

        // if (json.weather[0].main ==="Clouds"){
        //     const icon = document.querySelector("#icon");
        //     icon.classList.add("fa")
        //     icon.classList.add("fa-cloud");
        // }
        // else if(json.weather[0].main ==="Rain"){
        //     const icon = document.querySelector("#icon");
        //     icon.classList.add("fa")
        //     icon.classList.add("fa-umbrella");
        // }
        // else if(json.weather[0].main ==="Clear"){
        //     const icon = document.querySelector("#icon");
        //     icon.classList.add("fa")
        //     icon.classList.add("fa-fa-sun-o");
        // }


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