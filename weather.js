const COORDS = "coords";

const API_KEY = '8d7afb9178db2ed139f420a47ea67e49';

const weather = document.querySelector(".js-weather");



function getweather(lat, lon) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);
        const temperature = json.main.temp;
        const name =  json.name;
        console.log(temperature);
        console.log(name);
        weather.innerText = `오늘의 온도: ${temperature}도(섭씨) and 장소: ${name}`;
    });

}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handlesuccess(position){
    console.log(position)
    const latitude = position.coords.latitude;
    const longitude = position.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getweather(latitude, longitude);
}

function handleerror(){
    console.log('error');
}

function askforPosition() {
    navigator.geolocation.getCurrentPosition(handlesuccess, handleerror);
}


function loadedCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    console.log(loadedCoords)
    if(loadedCoords === null){
        askforPosition();
    } else {
        const parsecoords = json.parse(loadedCoords);
        getweather(parsecoords.latitude , parsecoords.longitude);
    }

}


function init(){
    loadedCoords();
}

init();