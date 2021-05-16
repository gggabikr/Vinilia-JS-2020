


const COORDS = "coords";


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
        //getWeather
    }
}

function init(){
loadCoords();
}

init();