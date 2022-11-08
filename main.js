 // position starts
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
// position ends

// current date starts
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
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
//Current day ends

function showTemperature(response) {
  console.log(response)
  descriptionElement = response.data.weather[0].description;
  iconElement = response.data.weather[0].icon;
  centigradesTempeture = response.data.main.temp;
  let windValue = document.querySelector("#weather-wind");
  windValue.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = Math.round(centigradesTempeture);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = descriptionElement
  let dayAndTime = document.querySelector("#day-and-time");
  dayAndTime.innerHTML = currentDayAndTime(response.data.dt * 1000);
  let title = document.querySelector(".main-title");
  title.innerHTML = response.data.name;
  
  showIcon(iconElement);
  displayForecast(response.data.coord);
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
// input animation starts
function inputOnFocus() {
  document.querySelector(".header-button").style.display = "none";
  document.querySelector(".header-input-container").classList.add("header-input");
}
function inputOnBlur() {
  document.querySelector(".header-button").style.display = "block";
  document.querySelector(".header-input-container").classList.remove("header-input");
  if (input.value != "") {
      input.value = "";
  }
}
// input animation ends

// temperature convertion starts
function showCentigradesForecastTemp() {
  let temperaturesMin = [centigradesTempMin, centigradesTempMin1, centigradesTempMin2, centigradesTempMin3, centigradesTempMin4];
  let temperatiresMax = [centigradesTempMax, centigradesTempMax1, centigradesTempMax2, centigradesTempMax3, centigradesTempMax4];
  let spanTemperaturesMin = Array.from(document.querySelectorAll("#temperature-min"));
  let spanTemperaturesMax = Array.from(document.querySelectorAll("#temperature-max"));
  
  for (let i = 0; i < spanTemperaturesMax.length; i++) {
    spanTemperaturesMax[i].innerHTML = `${Math.round(temperatiresMax[i])}°`;
    spanTemperaturesMin[i].innerHTML = `${Math.round(temperaturesMin[i])}°`;
  }
}
function showCentigradesTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureValue = document.querySelector("#temperatureValue");
  temperatureValue.innerHTML = Math.round(centigradesTempeture);
 
  showCentigradesForecastTemp();
}
function showFahrenheitForecastTemp() {
  let temperaturesMin = [centigradesTempMin, centigradesTempMin1, centigradesTempMin2, centigradesTempMin3, centigradesTempMin4];
  let temperatiresMax = [centigradesTempMax, centigradesTempMax1, centigradesTempMax2, centigradesTempMax3, centigradesTempMax4];
  let spanTemperaturesMin = Array.from(document.querySelectorAll("#temperature-min"));
  let spanTemperaturesMax = Array.from(document.querySelectorAll("#temperature-max"));
  
  for (let i = 0; i < spanTemperaturesMax.length; i++) {
    spanTemperaturesMax[i].innerHTML = `${Math.round((temperatiresMax[i] * 9) / 5 + 32)}°`;
    spanTemperaturesMin[i].innerHTML = `${Math.round((temperaturesMin[i] * 9) / 5 + 32)}°`;
  }
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
  let temperatureValue = document.querySelector("#temperatureValue")
  temperatureValue.innerHTML = Math.round((centigradesTempeture * 9) / 5 + 32);

  showFahrenheitForecastTemp();
}
// temperature convertion ends

// show icon function starts
function showIcon(iconElement) {
  let icon = document.querySelector("#icon");
  switch (iconElement) {
    case "01d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/5voKSah9SNQSoi8ATt/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "02d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/v2O5pMeohuPtOYJ36Z/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "03d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/DIT8x5i77MOtJEBR1j/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "04d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/vyMjCPX81vt4389w2c/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "09d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/2evfKjqO4tUZee7Icb/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "10d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/m8i73on3nuIt2Tz6B7/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "11d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/w37vXgNYAeXdiMFnm3/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
     
      break;

    case "13d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/S0lcUmplWuLlPuOwf0/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "50d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/f9AN1R6YelF3HGB9JD/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "01n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/5voKSah9SNQSoi8ATt/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "02n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/v2O5pMeohuPtOYJ36Z/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "03n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/DIT8x5i77MOtJEBR1j/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "04n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/vyMjCPX81vt4389w2c/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "09n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/2evfKjqO4tUZee7Icb/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "10n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/m8i73on3nuIt2Tz6B7/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "11n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/w37vXgNYAeXdiMFnm3/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "13n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/S0lcUmplWuLlPuOwf0/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;

    case "50n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/f9AN1R6YelF3HGB9JD/giphy.gif"
      );
      icon.setAttribute("alt", descriptionElement);
      break;
  }
  showShowerRainAnimation(iconElement);
  showRainAnimation(iconElement);
  showThunderstormAnimation(iconElement);
  showSnowAnimation(iconElement);
  showMistAnimation(iconElement);
  screenWidth();
}
// show icon function ends

// show animations start
function showShowerRainAnimation(iconElement) {
  if (iconElement === "09d" || iconElement === "09n") {
      backgroundAnimation.classList.add('shower-rain');
  } else {
      backgroundAnimation.classList.remove("shower-rain");
  }
}

function showRainAnimation(iconElement) {
  if (iconElement === "10d" || iconElement === "10n") {
    backgroundAnimation.classList.add("light-rain");
  } else {
    backgroundAnimation.classList.remove("light-rain");
  }
}
function showThunderstormAnimation(iconElement) {
  if (iconElement === "11d" || iconElement === "11n") {
    backgroundAnimation.classList.add("thunderstorm");
  } else {
    backgroundAnimation.classList.remove("thunderstorm");
  }
}
function showSnowAnimation(iconElement) {
  if (iconElement === "13d" || iconElement === "13n") {
    backgroundAnimation.classList.add("snow-falling");
  } else {
    backgroundAnimation.classList.remove("snow-falling");
  }
}
function showMistAnimation(iconElement) {
  if (iconElement === "50d" || iconElement === "50n") {
    backgroundAnimation.classList.add("mist");
  } else {
    backgroundAnimation.classList.remove("mist");
  }
}
// show animations end

// show background starts
function screenWidth() {
  if (window.matchMedia("(min-width: 432px)").matches) {
    backgroundDAndN();
    backgroundPrecipitations();
    keepBackgroundMobile();
  } 
  else {
    mobileBackgroundDAndN();
    mobileBackgroundPrecipitations();
    keepBackgroundDesktop();
  }
}

function backgroundDAndN() {
  if (iconElement.endsWith("d")) {
    desktopBackground.classList.add("background-day");
    desktopBackground.classList.remove(
      "background-night",
      "background-day-rain",
      "background-night-rain",
      "background-day-snow",
      "background-night-snow"
    );
  } else if (iconElement.endsWith("n")) {
    desktopBackground.classList.add("background-night");
    desktopBackground.classList.remove(
      "background-day",
      "background-day-rain",
      "background-night-rain",
      "background-day-snow",
      "background-night-snow"
    );
  }
}
function backgroundPrecipitations() {
  if (
    iconElement === "09d" ||
    iconElement === "10d" ||
    iconElement === "11d" ||
    iconElement === "50d"
  ) {
    desktopBackground.classList.add("background-day-rain");
    desktopBackground.classList.remove(
      "background-day",
      "background-night-rain",
      "background-night",
      "background-day-snow",
      "background-night-snow"
    );
  } else if (
    iconElement === "09n" ||
    iconElement === "10n" ||
    iconElement === "11d" ||
    iconElement === "50n"
  ) {
    desktopBackground.classList.add("background-night-rain");
    desktopBackground.classList.remove(
      "background-day",
      "background-day-rain",
      "background-night",
      "background-day-snow",
      "background-night-snow"
    );
  } else if (iconElement === "13d") {
    desktopBackground.classList.add("background-day-snow");
    desktopBackground.classList.remove(
      "background-day",
      "background-day-rain",
      "background-night",
      "background-night-rain",
      "background-night-snow"
    );
  } else if (iconElement === "13n") {
    desktopBackground.classList.add("background-night-snow");
    desktopBackground.classList.remove(
      "background-day",
      "background-day-rain",
      "background-night",
      "background-night-rain",
      "background-day-snow"
    );
  }
}
function mobileBackgroundDAndN() {
    if (iconElement.endsWith("d")) {
      mobileBackground.classList.add("mobile-background-d");
      mobileBackground.classList.remove(
        "mobile-background-n",
        "mobile-background-d-rain",
        "mobile-background-n-rain",
        "mobile-background-d-snow",
        "mobile-background-n-snow"
      );
    }
    else if (iconElement.endsWith("n")) {
      mobileBackground.classList.add("mobile-background-n");
      mobileBackground.classList.remove(
        "mobile-background-d",
        "mobile-background-d-rain",
        "mobile-background-n-rain",
        "mobile-background-d-snow",
        "mobile-background-n-snow"
      );
    }
 }
 
function mobileBackgroundPrecipitations() {
  if (
    iconElement === "09d" ||
    iconElement === "10d" ||
    iconElement === "11d" ||
    iconElement === "50d"
  ) {
    mobileBackground.classList.add("mobile-background-d-rain");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-n-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
      );
  }
  else if (
    iconElement === "09n" ||
    iconElement === "10n" ||
    iconElement === "11n" ||
    iconElement === "50n") {
      mobileBackground.classList.add("mobile-background-n-rain");
      mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-d-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
      );
    }
    else if (iconElement === "13d") {
      mobileBackground.classList.add("mobile-background-d-snow");
      mobileBackground.classList.remove(
        "mobile-background-d",
        "mobile-background-n",
        "mobile-background-d-rain",
        "mobile-background-n-rain",
        "mobile-background-n-snow"
      );
    }
    else if (iconElement === "13n") {
      mobileBackground.classList.add("mobile-background-n-snow")
      mobileBackground.classList.remove(
        "mobile-background-d",
        "mobile-background-n",
        "mobile-background-d-rain",
        "mobile-background-n-rain",
        "mobile-background-d-snow"
      );
    }
}
   
// show background ends

// keep the background display in desktop when device width changes *starts*
function keepBackgroundDesktop() {
    if (mobileBackground.classList.contains("mobile-background-d")) {
      desktopBackground.classList.add("background-day");
      desktopBackground.classList.remove(
        "background-night",
        "background-day-rain",
        "background-night-rain",
        "background-day-snow",
        "background-night-snow"
      );
    } else if (mobileBackground.classList.contains("mobile-background-n")) {
      desktopBackground.classList.add("background-night");
      desktopBackground.classList.remove(
        "background-day",
        "background-day-rain",
        "background-night-rain",
        "background-day-snow",
        "background-night-snow"
      );
    } else if (
      mobileBackground.classList.contains("mobile-background-d-rain")
    ) {
      desktopBackground.classList.add("background-day-rain");
      desktopBackground.classList.remove(
        "background-day",
        "background-night",
        "background-night-rain",
        "background-day-snow",
        "background-night-snow"
      );
    } else if (
      mobileBackground.classList.contains("mobile-background-n-rain")
    ) {
      desktopBackground.classList.add("background-night-rain");
      desktopBackground.classList.remove(
        "background-day",
        "background-night",
        "background-day-rain",
        "background-day-snow",
        "background-night-snow"
      );
    } else if (
      mobileBackground.classList.contains("mobile-background-d-snow")
    ) {
      desktopBackground.classList.add("background-day-snow");
      desktopBackground.classList.remove(
        "background-day",
        "background-night",
        "background-day-rain",
        "background-night-rain",
        "background-night-snow"
      );
    } else if (
      mobileBackground.classList.contains("mobile-background-n-snow")
    ) {
      desktopBackground.classList.add("background-night-snow");
      desktopBackground.classList.remove(
        "background-day",
        "background-night",
        "background-day-rain",
        "background-night-rain",
        "background-day-snow"
      );
    }
}
// keep the background display in desktop when device width changes *ends*

// keep the background display in mobile when device width changes *starts*
function keepBackgroundMobile() {
  if (desktopBackground.classList.contains("background-day")) {
    mobileBackground.classList.add("mobile-background-d");
    mobileBackground.classList.remove(
      "mobile-background-n",
      "mobile-background-d-rain",
      "mobile-background-n-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
    );
  } else if (desktopBackground.classList.contains("background-night")) {
    mobileBackground.classList.add("mobile-background-n");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-d-rain",
      "mobile-background-n-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
    );
  } else if (desktopBackground.classList.contains("background-day-rain")) {
    mobileBackground.classList.add("mobile-background-d-rain");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-n-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
    );
  } else if (desktopBackground.classList.contains("background-night-rain")) {
    mobileBackground.classList.add("mobile-background-n-rain");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-d-rain",
      "mobile-background-d-snow",
      "mobile-background-n-snow"
    );
  } else if (desktopBackground.classList.contains("background-day-snow")) {
    mobileBackground.classList.add("mobile-background-d-snow");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-d-rain",
      "mobile-background-n-rain",
      "mobile-background-n-snow"
    );
  } else if (desktopBackground.classList.contains("background-night-snow")) {
    mobileBackground.classList.add("mobile-background-n-snow");
    mobileBackground.classList.remove(
      "mobile-background-d",
      "mobile-background-n",
      "mobile-background-d-rain",
      "mobile-background-n-rain",
      "mobile-background-d-snow"
    );
  }
}
// keep the background display in mobile when device width changes *ends*

// forecast starts//
function displayForecastIcon(iconInformation) {
  let icon = iconInformation.icon;
  let description = iconInformation.description;
  
  switch (icon) {
    case "01d":
        return `<img src="https://i.postimg.cc/3JQVLTQd/sun.png" alt="${description}"></img>`;
      break;

    case "02d":
      return `<img src="https://i.postimg.cc/mDv7cKdH/few-clouds.png" alt="${description}"></img>`;
      break;

    case "03d":
      return `<img src="https://i.postimg.cc/T1qNRwpH/scattered-clouds.png" alt="${description}"></img>`;
      break;

    case "04d":
      return `<img src="https://i.postimg.cc/FRJXSRgH/broken-clouds.png" alt="${description}"></img>`;
      break;

    case "09d":
      return `<img src="https://i.postimg.cc/dQHvZGmB/shower-rain.png" alt="${description}"></img>`;
      break;

    case "10d":
      return `<img src="https://i.postimg.cc/WbncMgvz/rain.png" alt="${description}"></img>`;
      break;

    case "11d":
      return `<img src="https://i.postimg.cc/ZqTxzSNV/thunderstorm.png" alt="${description}"></img>`;
      break;

    case "13d":
      return `<img src="https://i.postimg.cc/prGG9SJD/snow.png" alt="${description}"></img>`;
      break;

    case "50d":
      return `<img src="https://i.postimg.cc/cLJwHHvt/mist.png" alt="${description}"></img>`;
      break;

    case "01n":
      return `<img src="https://i.postimg.cc/3JQVLTQd/sun.png" alt="${description}"></img>`;
      break;

    case "02n":
      return `<img src="https://i.postimg.cc/mDv7cKdH/few-clouds.png" alt="${description}"></img>`;
      break;

    case "03n":
      return `<img src="https://i.postimg.cc/T1qNRwpH/scattered-clouds.png" alt="${description}"></img>`;
      break;

    case "04n":
      return `<img src="https://i.postimg.cc/FRJXSRgH/broken-clouds.png" alt="${description}"></img>`;
      break;

    case "09n":
      return `<img src="https://i.postimg.cc/dQHvZGmB/shower-rain.png" alt="${description}"></img>`;
      break;

    case "10n":
      return `<img src="https://i.postimg.cc/WbncMgvz/rain.png" alt="${description}"></img>`;
      break;

    case "11n":
      return `<img src="https://i.postimg.cc/ZqTxzSNV/thunderstorm.png" alt="${description}"></img>`;
      break;

    case "13n":
      return `<img src="https://i.postimg.cc/prGG9SJD/snow.png" alt="${description}"></img>`;
      break;

    case "50n":
      return `<img src="https://i.postimg.cc/cLJwHHvt/mist.png" alt="${description}"></img>`;
      break;
  }
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  
  return days[day]

}
function forecast(response) {
    console.log(response)
    let forecastElement = document.querySelector(".forecast-container");

    let days = response.data.daily;
    centigradesTempMin = response.data.daily[0].temp.min;
    centigradesTempMin1 = response.data.daily[1].temp.min;
    centigradesTempMin2 = response.data.daily[2].temp.min;
    centigradesTempMin3 = response.data.daily[3].temp.min;
    centigradesTempMin4 = response.data.daily[4].temp.min;
    centigradesTempMax = response.data.daily[0].temp.max;
    centigradesTempMax1 = response.data.daily[1].temp.max;
    centigradesTempMax2 = response.data.daily[2].temp.max;
    centigradesTempMax3 = response.data.daily[3].temp.max;
    centigradesTempMax4 = response.data.daily[4].temp.max;

    let forecastHtml = "";

    days.forEach(function(day, index) {
      if (index < 5) {
        forecastHtml =
          forecastHtml +
          `<div><div class="forecast-day">${formatDay(day.dt)}</div>
                      <div class="forecast-img">
                         ${displayForecastIcon(day.weather[0])}
                      </div>
                      <div class="forecast-temperature">
                          <span id="temperature-min">${Math.round(day.temp.max)}°</span>
                          <span id="temperature-max">${Math.round(day.temp.min)}°</span>
                      </div></div>`;
      }
    })

     forecastElement.innerHTML = forecastHtml;

}
function displayForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(forecast);
}
// forecast ends//

let centigradesTempMin = null;
let centigradesTempMin1 = null;
let centigradesTempMin2 = null;
let centigradesTempMin3 = null;
let centigradesTempMin4 = null;
let centigradesTempMax = null;
let centigradesTempMax1 = null;
let centigradesTempMax2 = null;
let centigradesTempMax3 = null;
let centigradesTempMax4 = null;
let iconElement = null;
let descriptionElement = null;
let centigradesTempeture = null;
let input = document.querySelector("#searchInput");
input.addEventListener("focus", inputOnFocus);
input.addEventListener("blur", inputOnBlur);
let inputLens = document.querySelector(".input-lens");
inputLens.addEventListener("click", handleInput);
let buttonPosition = document.querySelector(".header-button");
buttonPosition.addEventListener("click", handleLocation);
let form = document.querySelector("#form");
form.addEventListener("submit", handleInput);
let desktopBackground = document.querySelector("#background")
let mobileBackground = document.querySelector("#mobile-background")
let backgroundAnimation = document.querySelector("#main-weather-animation");
let fahrenheitLink = document.querySelector("#fahrenheit-link")
fahrenheitLink.addEventListener("click", showFahrenheitTemperature)
let centigradesLink = document.querySelector("#centigrades-link")
centigradesLink.addEventListener("click", showCentigradesTemperature)

searchCity("New York");
