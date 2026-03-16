
// API URL template (note: API key is embedded for demo purposes)
const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=CITY_NAME&appid=5746bfd0bf2ee13c7055aee20e68de19&units=metric";

// DOM elements
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-button");
const weatherInfo = document.getElementById("weather-info");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperatureSpan = document.querySelector("#temperature span");
const descriptionSpan = document.querySelector("#description span");
const humiditySpan = document.querySelector("#humidity span");
const windSpeedSpan = document.querySelector("#wind-speed span");
const errorMessage = document.getElementById("error-message");
const errorText = document.getElementById("error-text");
const loading = document.getElementById("loading");

// Event listeners
searchButton.addEventListener("click", handleSearch);
cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});

function handleSearch() {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
        cityInput.value = ""; // Clear input after search
    }
}

function fetchWeatherData(city) {
    // Show loading, hide others
    showLoading();

    const url = API_URL.replace("CITY_NAME", city);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("City not found. Please check the spelling and try again.");
                } else {
                    throw new Error("Unable to fetch weather data. Please try again later.");
                }
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            displayError(error.message);
        });
}

function displayWeather(data) {
    // Hide loading and error
    hideLoading();
    hideError();

    // Update weather info
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperatureSpan.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionSpan.textContent = capitalizeFirstLetter(data.weather[0].description);
    humiditySpan.textContent = `${data.main.humidity}%`;
    windSpeedSpan.textContent = `${data.wind.speed} m/s`;

    // Set weather icon based on description
    const icon = getWeatherIcon(data.weather[0].main);
    weatherIcon.textContent = icon;

    // Show weather info
    weatherInfo.style.display = "block";
}

function displayError(message) {
    hideLoading();
    hideWeather();
    errorText.textContent = message;
    errorMessage.style.display = "block";
}

function showLoading() {
    loading.style.display = "block";
    weatherInfo.style.display = "none";
    errorMessage.style.display = "none";
}

function hideLoading() {
    loading.style.display = "none";
}

function hideError() {
    errorMessage.style.display = "none";
}

function hideWeather() {
    weatherInfo.style.display = "none";
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getWeatherIcon(main) {
    const icons = {
        Clear: "☀️",
        Clouds: "☁️",
        Rain: "🌧️",
        Drizzle: "🌦️",
        Thunderstorm: "⛈️",
        Snow: "❄️",
        Mist: "🌫️",
        Smoke: "🌫️",
        Haze: "🌫️",
        Dust: "🌫️",
        Fog: "🌫️",
        Sand: "🌫️",
        Ash: "🌫️",
        Squall: "🌬️",
        Tornado: "🌪️"
    };
    return icons[main] || "🌤️";
}


    
    