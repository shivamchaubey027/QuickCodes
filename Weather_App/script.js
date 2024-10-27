document.addEventListener('DOMContentLoaded', function() {

  const cityInput = document.getElementById('city-input');
  const getWeather = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const tempratureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessageDisplay = document.getElementById('error-message');

  const API_KEY = 'd346eadfda4c11e6a2e22a7c85e84c68';

  getWeather.addEventListener('click', async function() {
    const city= cityInput.value.trim()  
    if(!city) return;
     
    try {
      const weatherData= await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      displayError();
    }

  })
  async  function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response =await fetch(url);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    return data;
  }
  function displayWeatherData(data) {
    console.log(data)
    const {name,main, weather}= data;
    cityNameDisplay.textContent = name;
    tempratureDisplay.textContent = `${main.temp}°C`;
    descriptionDisplay.textContent = weather[0].description;

    weatherInfo.classList.remove('hidden');
    errorMessageDisplay.classList.add('hidden');
    console.log(cityNameDisplay, tempratureDisplay, descriptionDisplay);


  }

  function displayError(error) {
    weatherInfo.classList.add('hidden');
    errorMessageDisplay.classList.remove('hidden');
  }

}
)