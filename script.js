const inputElement = document.getElementById('city-name-input');
const searchButton = document.getElementById('seach-button');


async function weather() {
    try{
        const cityName = inputElement.value;
        const apiKey = '6a0482c5a266f6ab473688f8d4a33af8';

        if(cityName === '') return alert('Please enter a location.')
        
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
        if(!response.ok){
            alert('Invalid city name.')
            throw new Error('No weather information available');
        }
        const weather = await response.json();
        
        renderApp(weather)
    }catch(error){
        console.error('It was no possible to fetch')
    };
};

function renderApp(weather){
    const containerElement = document.querySelector('.output');

    const {name, main:{temp, temp_min, temp_max,feels_like,humidity,pressure}, visibility, wind, weather:[arr]} =weather;
    const degrees = convertKelvinToDegress(temp)
    const windsSpeed = windVelocity(wind)
    console.log(weather);

    const html = `
    <div class="main-details">
        <h1 id="city-name">${name}</h1>
        <img src="https://openweathermap.org/img/wn/${arr.icon}@2x.png" alt="">
        <h2>${convertKelvinToDegress(temp)}º</h2>
        <p>${convertKelvinToDegress(temp_max)}º/${convertKelvinToDegress(temp_min)}º</p>
        <p> Thermal sensation : ${convertKelvinToDegress(feels_like)}º</p>
    </div>

    <div class="details">
        <div class="humidity">
            <p>Humidity</p>
            <h3>${humidity}%</h3>
        </div>
        <div class="wind">
            <p>Wind</p>
            <h3>${windVelocity(wind.speed).toFixed(2)} Km/h</h3>
        </div>
        <div class="pressure">
            <p>Pressure</p>
            <h3>${pressure}Mb</h3>
        </div>
        <div class="visibility">
            <p>Visibility</p>
            <h3>${visibility/1000}Km</h3>
        </div>
    </div>
    `
    containerElement.innerHTML = html;
};

function convertKelvinToDegress(temp){
    return parseInt(temp -273.15)
}

function windVelocity(wind){
    return windSpeedKmh = wind * 3.6.toFixed(2); // Convertido a km/h
}

searchButton.addEventListener('click', weather)
