// use DOM to change values


let unitType = "METRIC";
let currentLocation = "London";
const APIKEY = 'a9366d859998200dc02f8084b3c3954e';
const openWeatherAPIKEY = '';

const docElements = {
    imgElement : document.getElementById("img-icon"),
    tempreature : document.getElementById("img-tempreature"),
    location : document.getElementById("location"),
    description : document.getElementById("description"),
    highTemp : document.getElementById("high-temp"),
    lowTemp : document.getElementById("low-temp"),
    feelsLike : document.getElementById("actual-temp"),
    humidity : document.getElementById("humidity"),
    windSpeed : document.getElementById("speed"),
    preassure : document.getElementById("pressure")
}

// const geocodeURL = a9366d859998200dc02f8084b3c3954e;
// take input from the form

const inputLocation = document.getElementById("search-bar");

inputLocation.addEventListener("keydown",(event)=>{
    if(event.key === "Enter"){
        event.preventDefault(); 
        currentLocation = inputLocation.value;
        console.log(currentLocation);
        updateWeatherDetails(currentLocation);
    }
});

// Detect in which mode by default in metric system

const inputUnit = document.getElementById("unitType");

inputUnit.addEventListener("click",()=>{
    if(unitType === "METRIC") unitType = "IMPERIAL";
    else unitType = "METRIC";
    getWeatherData(currentLocation);
    updateWeatherDetails(currentLocation);
});

// Use geocode api to find lat and long 

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}

async function getLocationName(query){
    try{
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${APIKEY}`;
        const response = await fetch(url);
        if(!response.ok){
            throw new Error('Location fetching response not ok');
        }
        const data = await response.json();
        const lat = data[0].lat;
        const lon = data[0].lon;
        console.log(`${lat} ${lon}`);
        // getWeatherData(lat,lon);
        console.log(data);
    }catch(error){
        console.log('Fetch operation unsucceful');
    }
}

// getLocationName('Jhalwa');

// use openwheather api to get details

async function getWeatherData(location){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKEY}&units=${unitType}`;
    const response = await fetch(url);
    try{    
        if(!response.ok){
            throw new Error('Weather fetching response not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    }catch(error){
        console.log('Fetch operation unsucceful');
    }
}

// getWeatherData('Uttar pradesh');

async function updateWeatherDetails(currentLocation) {
    const data = await getWeatherData(currentLocation);
    if (data) {
        // console.log(data.weather[0].icon);
        docElements.location.innerHTML = data.name;
        docElements.tempreature.innerHTML = data.main.temp;
        docElements.description.innerHTML = data.weather[0].description;
        docElements.highTemp.innerHTML = data.main.temp_max;
        docElements.lowTemp.innerHTML = data.main.temp_min;
        docElements.feelsLike.innerHTML = data.main.feels_like;
        docElements.humidity.innerHTML = data.main.humidity;
        docElements.preassure.innerHTML = data.main.pressure;
        docElements.windSpeed.innerHTML = data.wind.speed;
    }
}
