const apikey = 'ad1f85a258747a31c6c44625374552a7';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.getElementById('cityInput');
const searchButton = document.getElementById('searchBtn');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);
        if (!response.ok) {
            alert("City not found. Please enter a valid city name.");
            return;
        }

        const data = await response.json();
        document.querySelector('.city').innerHTML = data.name;
        document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°C';
        document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
        document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

        // Change weather icon based on API response
        if (data.weather[0].main === 'Clouds') {
            weatherIcon.src = 'assets/images/clouds.png';
        } else if (data.weather[0].main === 'Clear') {
            weatherIcon.src = 'assets/images/clear.png';
        } else if (data.weather[0].main === 'Rain') {
            weatherIcon.src = 'assets/images/rain.png';
        } else if (data.weather[0].main === 'Drizzle') {
            weatherIcon.src = 'assets/images/drizzle.png';
        } else if (data.weather[0].main === 'Mist') {
            weatherIcon.src = 'assets/images/mist.png';
        }

        document.querySelector('.weather').style.display = 'block';
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});