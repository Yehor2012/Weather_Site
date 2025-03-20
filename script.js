const apiKey = "f2d4d3ee946155c8c494de33f5be6780";
const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherResult = document.getElementById("weatherResult");
const getLocationBtn = document.getElementById("getLocationBtn");

// Функція для отримання погоди за координатами
async function getWeatherByCoords(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=uk`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            // Вводимо назву міста в поле ввода
            cityInput.value = data.name;
            // Показуємо погоду
            const weather = `
                <p>Місто: ${data.name}</p>
                <p>Температура: ${data.main.temp}°C</p>
                <p>Погода: ${data.weather[0].description}</p>
                <p>Вологість: ${data.main.humidity}%</p>
                <p>Вітер: ${data.wind.speed} м/с</p>
            `;
            weatherResult.innerHTML = weather;
        } else {
            weatherResult.innerHTML = `<p>Місто не знайдено</p>`;
        }
    } catch (error) {
        console.error("Помилка:", error);
        weatherResult.innerHTML = `<p>Сталася помилка при запиті</p>`;
    }
}

// Обробник кнопки "Моя геолокація"
getLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
        // Запитуємо геолокацію
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                getWeatherByCoords(latitude, longitude);
            },
            (error) => {
                console.error("Помилка при отриманні геолокації:", error);
                alert("Не вдалося отримати ваше місцезнаходження.");
            }
        );
    } else {
        alert("Геолокація не підтримується вашим браузером.");
    }
});

// Обробник кнопки "Дізнатися погоду"
getWeatherBtn.addEventListener("click", () => {
    console.log("нажав");
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert("Введіть місто");
    }
});

// Функція для отримання погоди за містом
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=uk`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weather = `
                <p>Місто: ${data.name}</p>
                <p>Температура: ${data.main.temp}°C</p>
                <p>Погода: ${data.weather[0].description}</p>
                <p>Вологість: ${data.main.humidity}%</p>
                <p>Вітер: ${data.wind.speed} м/с</p>
            `;
            weatherResult.innerHTML = weather;
        } else {
            weatherResult.innerHTML = `<p>Ми не змогли знайти це місто :(</p>`;
        }
    } catch (error) {
        console.error("Помилка:", error);
        weatherResult.innerHTML = `<p>Помилка</p>`;
    }
}