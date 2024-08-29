const  apiKey ="ab8e868dbdd3981fa5f95c5f67a44532";

const cityInput= document.getElementById('city');
const Searchbutton = document.getElementById('Searchbutton');
const celsius = document.getElementById('celsius');
const Fahrenheit = document.getElementById('Fahrenheit');
const cityname = document.getElementById('cityname');
const weatherdiscription = document.getElementById('weatherdiscription');
const temperature = document.getElementById('temperature');
const forecast = document.getElementById('forecast');
const weather = document.getElementById('weather');
const icons = document.getElementById('icons');

let unit='metric';


Searchbutton.addEventListener('click',() => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherData(city);
    }
});
celsius.addEventListener('click',()=>{
    unit = 'metric';
    toggleActiveUnit();
    fetchWeatherData(cityname.textContent);
});
Fahrenheit.addEventListener('click',()=>{
    unit = 'imperial';
    toggleActiveUnit();
    fetchWeatherData(cityname.textContent);
});
function toggleActiveUnit() {
    if (unit === 'metric') {
        celsius.classList.add('active');
        Fahrenheit.classList.remove('active');
    } else {
        celsius.classList.remove('active');
        Fahrenheit.classList.add('active');
    } 
}   

function fetchWeatherData(city) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => updateWeatherDisplay(data))
        .catch(error => console.error(error));

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => updateForecastDisplay(data))
        .catch(error => console.error(error));
}
// function updateWeatherDisplay(data) {
//     cityname.textContent = data.name;
//     weatherdiscription.textContent = data.weather[0].description;
//     temperature.textContent = `${Math.round(data.main.temp)}°`;

//     // Update background based on weather
//     weather.className = '';
//     const weatherCondition = data.weather[0].main.toLowerCase();
//     let iconURL='';
//     switch (weatherCondition) {
//         case 'clear':
//             // app.classList.add('clear');
//             iconURL = 'https://www.flaticon.com/free-icon/sun_4814268';
//             weather.className = 'clear';
//             break;
//         case 'clouds':
//             app.classList.add('clouds');
//             break;
//         case 'rain':
//             app.classList.add('rain');
//             break;
//         case 'snow':
//             app.classList.add('snow');
//             break;
//         case 'thunderstorm':
//             app.classList.add('thunderstorm');
//             break;
//         case 'drizzle':
//             app.classList.add('drizzle');
//             break;
//         case 'mist':
//             app.classList.add('mist');
//             break;
//         default:
//             app.classList.add('default');
//             break;
//         }
//     }
function updateWeatherDisplay(data) {
    cityname.textContent = data.name;
    weatherdiscription.textContent = data.weather[0].description;
    temperature.textContent = `${Math.round(data.main.temp)}°`;

    

    // Update background based on weather
    weather.className = ''; // Reset previous classes
    const weatherCondition = data.weather[0].main.toLowerCase();
    switch (weatherCondition) {
        case 'clear':
            icons.src = './clear.png';
            weather.className = 'clear';
            break;
        case 'clouds':
            icons.src = './clouds.png';
            weather.className = 'clouds';
            break;
        case 'rain':
            icons.src = './rain.png';
            weather.className = 'rain';
            break;
        case 'snow':
            icons.src = './snow.png';
            weather.className = 'snow';
            break;
        case 'thunderstorm':
            icons.src = './thunderstorm.png';
            weather.className = 'thunderstorm';
            break;
        case 'drizzle':
            icons.src = './drizzle.png';
            weather.className = 'drizzle';
            break;
        case 'mist':
            icons.src = './mist.png';
            weather.className = 'mist';
            break;
        default:
            icons.src = '';
            weather.className = 'default';
            break;
    }
}

    
    
    
    function updateForecastDisplay(data) {
        forecast.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const item = data.list[i * 8]; // 8 items per day
            const date = new Date(item.dt_txt).toLocaleDateString();
            const temp = Math.round(item.main.temp);
            const description = item.weather[0].description;
    
            const forecastItem = document.createElement('div');
            forecastItem.classList.add('forecast-item');
            forecastItem.innerHTML = `
            <p>${date}</p>
            <p>${temp}°</p>
            <p>${description}</p>
        `;

        forecast.appendChild(forecastItem);
    }
}