function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiKey = "7b7fc85c1170821871baaac95758bc58";
  let degress = "&units=metric";

  axios.get(`${apiUrl}&appid=${apiKey}${degress}`).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(showPosition);

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
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let centigradesValue = document.querySelector("#centigradesVal");
  centigradesValue.innerHTML = temperature;
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

let form = document.querySelector("#form");
form.addEventListener("submit", searchCity);

function showTemperatureNow(response) {
  let title = document.querySelector(".main-title");
  title.innerHTML = response.data[0].name;
}
searchCity("New York");
