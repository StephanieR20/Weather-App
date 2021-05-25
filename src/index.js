function formatDate(date) {
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[dayIndex];

  return `${day}`;
}
let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function formatTime(time) {
  let currentHour = time.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = time.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  return `${currentHour}:${currentMinute}`;
}

let timeElement = document.querySelector("#time");
let currentHour = new Date();
timeElement.innerHTML = formatTime(currentHour);


//function displayForecast(){

  //let forecastElement = document.querySelector("#forecast");

  //let days = ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  
  
  //let forecastHTML= `<div class="row">`; 
  //days.forEach(function(day) {

     //forecastHTML =  forecastHTML + 
     //`<div class="weather-forecast" id="forecast">
        // <div class="col-2">
        //<div class="weather-forecast-date">${day}</div>
        //<img src="https://openweathermap.org/weather-conditions/icons/01d.png" alt=""/>
        // <div class="weather-forecast-temperature"> 
         // <span class="weather-forecast-temperature-max">18°</span>
       // <span class="weather-forecast-temperature-min"> 12° </span>
      // </div>
      // </div>`;

 // });

  // forecastHTML = forecastHTML + `</div>`;
  //forecastElement.innerHTML= forecastHTML;

 // console.log(forecastHTML);
//}



function getForecast(coordinates) {
  let apiKey = "e8354e1f3a17775f04c6aee104fac2d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  
}


function searchCity(city) {
  let apiKey = "e8354e1f3a17775f04c6aee104fac2d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let city = document.querySelector("#search-text-input").value;

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function searchLocation(position) {
  let apiKey = "e8354e1f3a17775f04c6aee104fac2d4";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
  
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  celsiusTemperature = response.data.main.temp;

   let iconElement= document.querySelector("#icon");
   iconElement.setAttribute(`src`,`icons/${response.data.weather[0].icon}.png`);
    
}

function displayFahrenheitTemperature (event){
 event.preventDefault();
 let temperatureElement = document.querySelector("#temperature");

 celsiusLink.classList.remove("active");
 fahrenheitLink.classList.add("active");
 let fahrenheitTemperature=(celsiusTemperature * 9) / 5 + 32;
 temperatureElement.innerHTML= Math.round(fahrenheitTemperature);

 
}

function displayCelsiusTemperature (event){
 event.preventDefault();
 celsiusLink.classList.add("active");
 fahrenheitLink.classList.remove("active");
 let temperatureElement = document.querySelector("#temperature");
 temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


searchCity("Washington DC");

displayForecast();
