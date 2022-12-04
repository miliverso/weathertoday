 // position
function showPosition(position) {
  let apiKey = "1a6432c5ca7b6f9b0bee45c98d54ea71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperatureToday);
}

function handleLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

// hourly temperature
function formatTime(timestamp) {
   let date = new Date(timestamp * 1000);
   let hour = date.getHours();
   if (hour < 10) {
    hour = `0${hour}`;
   }
   let minutes = date.getMinutes();
   if (minutes < 10) {
     minutes = `0${minutes}`;
   }

   return `${hour}:${minutes}`;
 }
function hourlyForecast(hourly) {
   hours = [hourly[1].temp, hourly[2].temp, hourly[3].temp, hourly[4].temp, hourly[5].temp];

   forecastContainer.classList.add("hourly-forecast-container");
   let forecastHtml = "";

   hourly.forEach(function (hour, index) {
     if (index > 0 && index < 6) {
       forecastHtml =
         forecastHtml +
         `<div class="hourly-forecast">
          <div class="hourly-forecast-time">${formatTime(hour.dt)}</div>
          <div class="hourly-forecast-img">${displayForecastIcon(
            hour.weather[0]
          )}</div>
          <div class="hourly-forecast-temperature"><span id="temperature">${Math.round(
            hour.temp
          )}°</span></div>
          <div class="hourly-forecast-humidity"><span class="humidity-span"></span>${
            hour.humidity
          }%</div>
          <div class="hourly-forecast-wind"><span class="wind-span"></span>${Math.round(
            hour.wind_speed
          )} km/h</div>
        </div>`;
     }
   });

   forecastContainer.innerHTML = forecastHtml;
 }
function showTemperatureHourly(response) {
   centigradesTempeture = Math.round(response.data.current.temp);

   document.querySelector("#temperatureValue").innerHTML = centigradesTempeture;
   document.querySelector("#weather-description").innerHTML =
     response.data.current.weather[0].description;
   document.querySelector("#weather-wind").innerHTML = `Wind: ${Math.round(
     response.data.current.wind_speed
   )} km/h`;
   document.querySelector("#day-and-time").innerHTML = currentDayAndTime(
     response.data.current.dt
   );
   document.querySelector(".main-title").innerHTML =
     document.querySelector(".main-title").textContent;

   hourlyForecast(response.data.hourly);
   showIcon(response.data.current.weather[0]);
 }
function showWeatherHourlyApiCall(coordinates) {
   let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

   axios.get(apiUrl).then(showTemperatureHourly);
 }
function showCoordinates(response) {
   showWeatherHourlyApiCall(response.data[0]);
 }
function searchCityHourly() {
   let city = document.querySelector(".main-title").textContent;

   let apiKey = "7b7fc85c1170821871baaac95758bc58";
   let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

   axios.get(apiUrl).then(showCoordinates);
 }
 function weatherHourly() {
   yesterdayAnchor.classList.remove("day-anchor");
   todayAnchor.classList.remove("day-anchor");
   hourlyAnchor.classList.add("day-anchor");
   daysForecastMax = null;
   daysForecastMin = null;
   searchCityHourly();
 }

// temperature yesterday
function yesterdayforecast(response) {
  let days = response.data.daily;

  let forecastHtml = "";

  days.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div><div class="forecast-day">${formatDay(day.dt)}</div>
                      <div class="forecast-img">
                         ${displayForecastIcon(day.weather[0])}
                      </div>
                      <div class="forecast-temperature">
                          <span id="temperature-max">${Math.round(
                            day.temp.max
                          )}°</span>
                          <span id="temperature-min">${Math.round(
                            day.temp.min
                          )}°</span>
                      </div></div>`;
    }
  });

  forecastContainer.innerHTML = forecastHtml;
}
function displayYesterdayForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(yesterdayforecast);
}
function showTemperatureYesterday(response) {
  centigradesTempeture = Math.round(response.data.current.temp);

  document.querySelector("#temperatureValue").innerHTML = centigradesTempeture;
  document.querySelector("#weather-description").innerHTML = response.data.current.weather[0].description;
  document.querySelector("#weather-wind").innerHTML = `Wind: ${Math.round(response.data.current.wind_speed)} km/h`;
  document.querySelector("#day-and-time").innerHTML = currentDayAndTime(response.data.current.dt);

  displayYesterdayForecast(response.data);
  showIcon(response.data.current.weather[0]);
}
function showWeatherYesterdayApiCall(coordinates) {
  let time = Date.now();
  let timeToString = time.toString();
  let timeDt = "";

  for (let i = 0; i < timeToString.length - 3; i++) {
    timeDt = timeDt + timeToString[i];
  }
  timeDt = timeDt - 86400;
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${coordinates.lat}&lon=${coordinates.lon}&dt=${timeDt}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperatureYesterday);
}
function showCityCoordinates(response) {
  showWeatherYesterdayApiCall(response.data[0]);
}

function searchCityYesterday() {
  let city = document.querySelector(".main-title").textContent;

  let apiKey = "7b7fc85c1170821871baaac95758bc58";
  let apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

  axios.get(apiUrl).then(showCityCoordinates);
}
function weatherYesterday() {
  todayAnchor.classList.remove("day-anchor");
  hourlyAnchor.classList.remove("day-anchor");
  yesterdayAnchor.classList.add("day-anchor");
  forecastContainer.classList.remove("hourly-forecast-container");
  daysForecastMax = null;
  daysForecastMin = null;
  hours = null;
  searchCityYesterday();
}

// temperature today
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function forecast(response) {
  days = response.data.daily;
  daysForecastMax = [response.data.daily[1].temp.max, response.data.daily[2].temp.max, response.data.daily[3].temp.max, response.data.daily[4].temp.max, response.data.daily[5].temp.max];
  daysForecastMin = [response.data.daily[1].temp.min, response.data.daily[2].temp.min, response.data.daily[3].temp.min, response.data.daily[4].temp.min, response.data.daily[5].temp.min];

  let forecastHtml = "";

  days.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div><div class="forecast-day">${formatDay(day.dt)}</div>
                      <div class="forecast-img">
                         ${displayForecastIcon(day.weather[0])}
                      </div>
                      <div class="forecast-temperature">
                          <span id="temperature-max">${Math.round(
                            day.temp.max
                          )}°</span>
                          <span id="temperature-min">${Math.round(
                            day.temp.min
                          )}°</span>
                      </div></div>`;
    }
  });

  forecastContainer.innerHTML = forecastHtml;
}
function displayForecast(coordinates) {
  let apiKey = "4b3503b2f08a729413c4d33ef1186004";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(forecast);
}
function currentDayAndTime(timestamp) {
  let date = new Date(timestamp * 1000);
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
function showTemperatureToday(response) {
  todayAnchor.classList.add("day-anchor");
  yesterdayAnchor.classList.remove("day-anchor");
  hourlyAnchor.classList.remove("day-anchor");
  forecastContainer.classList.remove("hourly-forecast-container");
  centigradesTempeture = Math.round(response.data.main.temp);

  document.querySelector("#temperatureValue").innerHTML = centigradesTempeture;
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
  document.querySelector("#weather-wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  document.querySelector("#day-and-time").innerHTML = currentDayAndTime(response.data.dt);
  document.querySelector(".main-title").innerHTML = response.data.name;

  displayForecast(response.data.coord);
  showIcon(response.data.weather[0]);
}
function searchCityToday(city) {
  let apiKey = "7b7fc85c1170821871baaac95758bc58";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperatureToday);
}
function handleInput(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCityToday(city);
  }
function weatherToday() {
  if (document.querySelector(".main-title").textContent == "") {
    yesterdayAnchor.classList.remove("day-anchor");
    hourlyAnchor.classList.remove("day-anchor");
    todayAnchor.classList.add("day-anchor");
    forecastContainer.classList.remove("hourly-forecast-container");
    hours = null;
    searchCityToday("New York");
  } else {
    yesterdayAnchor.classList.remove("day-anchor");
    hourlyAnchor.classList.remove("day-anchor");
    todayAnchor.classList.add("day-anchor");
    forecastContainer.classList.remove("hourly-forecast-container");
    hours = null;
    searchCityToday(document.querySelector(".main-title").textContent);
  }
}

 // temperature convertion
function showCentigradesForecastTemp() {
  let spanTemperaturesMin = Array.from(document.querySelectorAll("#temperature-min"));
  let spanTemperaturesMax = Array.from(document.querySelectorAll("#temperature-max"));
  let spanHourlyTemperature = Array.from(document.querySelectorAll("#temperature"));
  

  if (daysForecastMax == null && daysForecastMin == null && hours == null) {
    for (let i = 0; i < 5; i++) {
      spanTemperaturesMax[i].innerHTML = `${Math.round(days[i].temp.max)}°`;
      spanTemperaturesMin[i].innerHTML = `${Math.round(days[i].temp.min)}°`;
    }
  } 
  else if (daysForecastMax !== null && daysForecastMin !== null && hours == null) {
    for (let i = 0; i < 5; i++) {
      spanTemperaturesMax[i].innerHTML = `${Math.round(daysForecastMax[i])}°`;
      spanTemperaturesMin[i].innerHTML = `${Math.round(daysForecastMin[i])}°`;
    }
  } 
  else {
    for (let i = 0; i < 5; i++) {
      spanHourlyTemperature[i].innerHTML = `${Math.round(hours[i])}°`;
    }
  }
}
function showCentigradesTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#temperatureValue").innerHTML = Math.round(centigradesTempeture);
 
  showCentigradesForecastTemp();
}
function showFahrenheitForecastTemp() {
  let spanTemperaturesMax = Array.from(document.querySelectorAll("#temperature-max"));
  let spanTemperaturesMin = Array.from(document.querySelectorAll("#temperature-min"));
  let spanHourlyTemperature = Array.from(document.querySelectorAll("#temperature"));
  
  if (daysForecastMax == null && daysForecastMin == null && hours == null) {
    for (let i = 0; i < 5; i++) {
      spanTemperaturesMax[i].innerHTML = `${Math.round((days[i].temp.max * 9) / 5 + 32)}°`;
      spanTemperaturesMin[i].innerHTML = `${Math.round((days[i].temp.min * 9) / 5 + 32)}°`;
    }
  } 
  else if (daysForecastMax !== null && daysForecastMin !== null && hours == null) {
     for (let i = 0; i < 5; i++) {
     spanTemperaturesMax[i].innerHTML = `${Math.round((daysForecastMax[i] * 9) / 5 + 32)}°`;
     spanTemperaturesMin[i].innerHTML = `${Math.round((daysForecastMin[i] * 9) / 5 + 32)}°`;
    }
  } else {
    for (let i = 0; i < 5; i++) {
      spanHourlyTemperature[i].innerHTML = `${Math.round((hours[i] * 9) / 5 + 32)}°`;
    }
  }
}
function showFahrenheitTemperature(event) {
  event.preventDefault();
  centigradesLink.classList.remove("active")
  fahrenheitLink.classList.add("active")
  document.querySelector("#temperatureValue").innerHTML = Math.round((centigradesTempeture * 9) / 5 + 32);

  showFahrenheitForecastTemp();
}
   
// input animation
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

// show icon function
function showIcon(iconInfo) {
  let iconElement = iconInfo.icon;
  let icon = document.querySelector("#icon");
  switch (iconElement) {
    case "01d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/5voKSah9SNQSoi8ATt/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "02d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/v2O5pMeohuPtOYJ36Z/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "03d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/DIT8x5i77MOtJEBR1j/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "04d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/vyMjCPX81vt4389w2c/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "09d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/2evfKjqO4tUZee7Icb/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "10d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/m8i73on3nuIt2Tz6B7/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "11d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/w37vXgNYAeXdiMFnm3/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
     
      break;

    case "13d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/S0lcUmplWuLlPuOwf0/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "50d":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/f9AN1R6YelF3HGB9JD/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "01n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/5BaA7rwHEYOgeziNGJ/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "02n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/2blvVuEhZf5rcElait/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "03n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/YiQmhnIuznLgkWWym8/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "04n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/JYrgtPM5KlnnVFGC2c/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "09n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/zl5p8SiO1e0X4uB89z/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "10n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/Y2C9a9qeVZwTUBDFok/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "11n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/WNEl7Z2TAsKDNNiIpT/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "13n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/S0lcUmplWuLlPuOwf0/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;

    case "50n":
      icon.setAttribute(
        "src",
        "https://media.giphy.com/media/O9353upjA6U7mZcLe7/giphy.gif"
      );
      icon.setAttribute("alt", iconInfo.description);
      break;
  }
  showShowerRainAnimation(iconInfo.icon);
  showRainAnimation(iconInfo.icon);
  showThunderstormAnimation(iconInfo.icon);
  showSnowAnimation(iconInfo.icon);
  showMistAnimation(iconInfo.icon);
  screenWidth(iconInfo.icon);
}
function displayForecastIcon(iconInformation) {
  let icon = iconInformation.icon;
  console.log(icon)
  let description = iconInformation.description;
  let dayClassNames = ["background-day", "background-day-rain", "background-day-snow", "mobile-background-d", "mobile-background-d-rain", "mobile-background-d-snow"];
  let isTheDayBackgroundInDesktop = dayClassNames.some((dayClassName) => dayClassName === desktopBackground.classList.value);
  let isTheDayBackgroundInMobile = dayClassNames.some((dayClassName) => dayClassName === mobileBackground.classList.value);
  let nightClassNames = ["background-night", "background-night-rain", "background-night-snow", "mobile-background-n", "mobile-background-n-rain", "mobile-background-n-snow"];
  let isTheNightbackgroundInDesktop = nightClassNames.some((dayClassName) => dayClassName === desktopBackground.classList.value);
  let isTheNightbackgroundInMobile = nightClassNames.some((dayClassName) => dayClassName === mobileBackground.classList.value);

  if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("01")
  ) {
    return `<img src="https://i.postimg.cc/3JQVLTQd/sun.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("02")
  ) {
    return `<img src="https://i.postimg.cc/mDv7cKdH/few-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("03")
  ) {
    return `<img src="https://i.postimg.cc/T1qNRwpH/scattered-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("04")
  ) {
    return `<img src="https://i.postimg.cc/FRJXSRgH/broken-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("09")
  ) {
    return `<img src="https://i.postimg.cc/dQHvZGmB/shower-rain.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("10")
  ) {
    return `<img src="https://i.postimg.cc/WbncMgvz/rain.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("11")
  ) {
    return `<img src="https://i.postimg.cc/ZqTxzSNV/thunderstorm.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("13")
  ) {
    return `<img src="https://i.postimg.cc/prGG9SJD/snow.png" alt="${description}"></img>`;
  } else if (
    isTheDayBackgroundInDesktop &&
    isTheDayBackgroundInMobile &&
    icon.startsWith("50")
  ) {
    return `<img src="https://i.postimg.cc/cLJwHHvt/mist.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("01")
  ) {
    return `<img src="https://i.postimg.cc/gcLPrjfm/forecast-moon.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("02")
  ) {
    return `<img src="https://i.postimg.cc/sXw8NdQj/forecast-night-few-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("03")
  ) {
    return `<img src="https://i.postimg.cc/7YNtLyYq/forecast-night-broken-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("04")
  ) {
    return `<img src="https://i.postimg.cc/7YNtLyYq/forecast-night-broken-clouds.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("09")
  ) {
    return `<img src="https://i.postimg.cc/bJZ9dhFB/forecast-night-shower-rain.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("10")
  ) {
    return `<img src="https://i.postimg.cc/kXq0jZrV/forecast-night-rain.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("11")
  ) {
    return `<img src="https://i.postimg.cc/3rp7wWvm/forecast-night-thunderstorm.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("13")
  ) {
    return `<img src="https://i.postimg.cc/prGG9SJD/snow.png" alt="${description}"></img>`;
  } else if (
    isTheNightbackgroundInDesktop &&
    isTheNightbackgroundInMobile &&
    icon.startsWith("50")
  ) {
    return `<img src="https://i.postimg.cc/qRSYTcLS/forecast-night-mist.png" alt="${description}"></img>`;
  }
}

// show precipitation animations
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

// show background
function screenWidth(iconElement) {
  if (window.matchMedia("(min-width: 432px)").matches) {
    backgroundDAndN(iconElement);
    backgroundPrecipitations(iconElement);
    keepBackgroundMobile(iconElement);
  } 
  else {
    mobileBackgroundDAndN(iconElement);
    mobileBackgroundPrecipitations(iconElement);
    keepBackgroundDesktop(iconElement);
  }
}

function backgroundDAndN(iconElement) {
  if (iconElement.endsWith("d")) {
    document.querySelector(".body-left").classList.remove("body-left-night");
    document.querySelector(".body-right").classList.remove("body-right-night");
    document.querySelector("#weather").classList.remove("main-weather-font-at-night");
    document.querySelector("#temp-convertion").classList.remove("span-temp-convertion");
    desktopBackground.classList.add("background-day");
    desktopBackground.classList.remove(
      "background-night",
      "background-day-rain",
      "background-night-rain",
      "background-day-snow",
      "background-night-snow"
    );
  } else if (iconElement.endsWith("n")) {
    document.querySelector(".body-left").classList.add("body-left-night");
    document.querySelector(".body-right").classList.add("body-right-night");
    document.querySelector("#weather").classList.add("main-weather-font-at-night");
    document.querySelector("#temp-convertion").classList.add("span-temp-convertion");
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
function backgroundPrecipitations(iconElement) {
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
    iconElement === "11n" ||
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
function mobileBackgroundDAndN(iconElement) {
    if (iconElement.endsWith("d")) {
      document.querySelector("#weather").classList.remove("main-weather-font-at-night");
      document.querySelector("#temp-convertion").classList.remove("span-temp-convertion");
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
      document.querySelector("#weather").classList.add("main-weather-font-at-night");
      document.querySelector("#temp-convertion").classList.add("span-temp-convertion");
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
 
function mobileBackgroundPrecipitations(iconElement) {
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

// keep the background display in desktop when device width changes
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

// keep the background display in mobile when device width changes
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

let hours = null;
let daysForecastMax = null;
let daysForecastMin = null;
let days = null;
let centigradesTempeture = null;
let forecastTemperatures = null;
let input = document.querySelector("#searchInput");
let inputLens = document.querySelector(".input-lens");
let buttonPosition = document.querySelector(".header-button");
let form = document.querySelector("#form");
let desktopBackground = document.querySelector("#background");
let mobileBackground = document.querySelector("#mobile-background");
let backgroundAnimation = document.querySelector("#main-weather-animation");
let fahrenheitLink = document.querySelector("#fahrenheit-link");
let centigradesLink = document.querySelector("#centigrades-link");
let todayAnchor = document.querySelector("#today");
let yesterdayAnchor = document.querySelector("#yesterday");
let hourlyAnchor = document.querySelector("#hourly");
let forecastContainer = document.querySelector(".forecast-container");

hourlyAnchor.addEventListener("click", weatherHourly);
yesterdayAnchor.addEventListener("click", weatherYesterday);
todayAnchor.addEventListener("click", weatherToday);
input.addEventListener("focus", inputOnFocus);
input.addEventListener("blur", inputOnBlur);
inputLens.addEventListener("click", handleInput);
buttonPosition.addEventListener("click", handleLocation);
form.addEventListener("submit", handleInput);
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
centigradesLink.addEventListener("click", showCentigradesTemperature);

weatherToday();