function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiKey = "7b7fc85c1170821871baaac95758bc58";
  let degress = "&units=metric";

  axios.get(`${apiUrl}&appid=${apiKey}${degress}`).then(showTemperature);
}

function handleLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function currentDayAndTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function showTemperature(response) {
  centigradesTempeture = response.data.main.temp;
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = Math.round(centigradesTempeture);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let dayAndTime = document.querySelector("#day-and-time");
  dayAndTime.innerHTML = currentDayAndTime(response.data.dt * 1000);
  let title = document.querySelector(".main-title");
  title.innerHTML = response.data.name;
}
function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  let apiKey = "7b7fc85c1170821871baaac95758bc58";

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function handleInput(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function inputOnFocus() {
  document.querySelector(".header-button").style.display = "none";
  document
    .querySelector(".header-input-container")
    .classList.add("header-input");
}
function inputOnBlur() {
  document.querySelector(".header-button").style.display = "block";
  document
    .querySelector(".header-input-container")
    .classList.remove("header-input");
  if (input.value != "") {
    input.value = "";
  }
}

function showCentigradesTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = Math.round(centigradesTempeture);
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = Math.round((centigradesTempeture * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let centigradesLink = document.querySelector("#centigrades-link");
centigradesLink.addEventListener("click", showCentigradesTemperature);

let centigradesTempeture = null;
let form = document.querySelector("#form");
form.addEventListener("submit", handleInput);
let input = document.querySelector("#searchInput");
input.addEventListener("focus", inputOnFocus);
input.addEventListener("blur", inputOnBlur);
let inputLens = document.querySelector(".input-lens");
inputLens.addEventListener("click", handleInput);
let buttonPosition = document.querySelector(".header-button");
buttonPosition.addEventListener("click", handleLocation);

searchCity("New York");
