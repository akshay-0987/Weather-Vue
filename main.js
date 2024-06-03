document.getElementById('search-button').addEventListener('click', fetchWeather);

function fetchWeather() {
    const cityInput = document.getElementById('city-input').value.trim();
    if (cityInput === '') {
        displayAlert('Please enter a city name.');
        return;
    }
    
    const apiKey = '8721e7b88b91d39c565618f848239923';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    if (data.cod !== 200) {
        displayAlert('City not found.');
        return;
    }

    const weatherDisplay = document.getElementById('weather-display');
    weatherDisplay.style.display = 'flex';

    const { name, main, weather } = data;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherDisplay.innerHTML = `
        <h2>${name}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}.png" alt="${description}" style="width: 100px; height: 100px;">
        <p style="font-size: 1.5em;">${description}</p>
        <p style="font-size: 1.2em;">Temperature: ${temp} &deg;C</p>
        <p style="font-size: 1.2em;">Humidity: ${humidity}%</p>
    `;
}


function displayAlert(message) {
    const alertContainer = document.createElement('div');
    alertContainer.classList.add('alert');
    alertContainer.textContent = message;
    document.body.appendChild(alertContainer);
    setTimeout(() => {
        alertContainer.remove();
    }, 3000);
}
