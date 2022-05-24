function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function cityChange(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchInput");
  let h3 = document.querySelector("h3");
  h3.innerHTML = searchInput.value;
}

//function fahrenheitTemperature(event) {
// event.preventDefault();
// let temperature = document.querySelector("#circle");
// temperature.innerHTML = 59; }

//function celciusTemperature(event) {
// event.preventDefault();
// let temperature = document.querySelector("#circle");
// temperature.innerHTML = 15; }

// convert to fahrenheit
//let fahrenheitLink = document.querySelector("#fahrenheit");
//fahrenheitLink.addEventListener("click", fahrenheitTemperature);

// convert to celcius
//let celciusLink = document.querySelector("#celcius");
//celciusLink.addEventListener("click", celciusTemperature);

function displayWeather(response) {
  let temp = Math.round(response.data.main.temp);
  document.querySelector("#city").innerHTML = `${response.data.name}`;
  document.querySelector("#temperature").innerHTML = `${temp}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector(
    "#description"
  ).innerHTML = `${response.data.weather[0].main}`;
}

function searchCity(city) {
  let apiKey = "445c7163cebd4264ef3f8436bcb8200c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let city = document.querySelector("#searchInput").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "445c7163cebd4264ef3f8436bcb8200c";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(displayWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", currentLocation);

// Time change
let date = document.querySelector("#date");
let now = new Date();
date.innerHTML = formatDate(now);

// City change
let form = document.querySelector("form");
form.addEventListener("submit", handleSearch);

searchCity("New York");
