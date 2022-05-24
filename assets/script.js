var apiKey = "60febae823b8eccb276fbf44244f8a28";

var tableBody = document.getElementById('five-day-forecast');
var fetchButton = document.getElementById('search-btn');

var today = moment();

function getApi() {
  // fetch request gets coordinates based on city/user input
  var userInput = document.getElementById('location-search').value;
  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&appid=' + apiKey;
  console.log(requestUrl);
  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data)

      var lat = data[0].lat
      var lon = data[0].lon
      var name = data[0].name
      console.log(lon);
      console.log(lat);
      console.log(name);
      renderCity(name);

      // var weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&limit=1&appid=' + apiKey;
      var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&limit=1&appid=' + apiKey;
      console.log(weatherUrl);

      fetch(weatherUrl)
      .then(function (weatherResponse){
        console.log(weatherResponse);
        return weatherResponse.json();
      })
      .then(function(weatherData){
        console.log(weatherData);

        renderCurrent(weatherData);
        renderFuture(weatherData);
      })
    });
}

function renderCity(data){
  console.log(data);
  var userCity = document.getElementById('city-name');
  userCity.textContent = data;
}

function renderCurrent(data){
  console.log(data);

  var timeId = document.getElementById('current-day')
  timeId.textContent = '(' + (today.format("MMM Do, YYYY")) + ')';

  var iconId = document.getElementById('weather-icon');
  var weatherIcon = data.current.weather[0].icon;
  iconId.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';

  var tempData = data.current.temp;
  var windData = data.current.wind_speed;
  var humidityData = data.current.humidity;
  var uvData = data.current.uvi;
  console.log(tempData);
  console.log(windData);
  console.log(humidityData);
  console.log(uvData);

  var displayTemp = document.getElementById('temp');
  var displayWind = document.getElementById('wind');
  var displayHumidity = document.getElementById('humidity');
  var displayUv = document.getElementById('UV-Index');
  displayTemp.textContent = 'Temp: ' + tempData;
  displayWind.textContent = 'Wind: ' + windData + 'mph';
  displayHumidity.textContent = 'Humidity: ' + humidityData + '%';
  displayUv.textContent = 'UV Index: ' + uvData;
}

function renderFuture(data){
  console.log(data);
}

// function renderWeather(data) {
//   console.log(data[0].name);
//   var userCity = document.getElementById('city-name');
//   userCity.textContent = data.name;
  
//   var timeId = document.getElementById('current-day')
//   timeId.textContent = '(' + (today.format("MMM Do, YYYY")) + ')';

//   var iconId = document.getElementById('weather-icon');
//   var weatherIcon = data.weather[0].icon;
//   iconId.src = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';

//   var tempData = data.main.temp;
//   var windData = data.wind.speed;
//   var humidityData = data.main.humidity;
//   // var uvData = data.uvi;

//   console.log(tempData);
//   console.log(windData);
//   console.log(humidityData);
//   // console.log(uvData);

//   var displayTemp = document.getElementById('temp');
//   var displayWind = document.getElementById('wind');
//   var displayHumidity = document.getElementById('humidity');
//   // var displayUv = document.getElementById('temp');

//   displayTemp.textContent = 'Temp: ' + tempData;
//   displayWind.textContent = 'Wind: ' + windData + 'mph';
//   displayHumidity.textContent = 'Humidity: ' + humidityData + '%';
//   // displayUv.textContent = 'UV Index: ' + uvData;

//   var dt = data.dt;
//   console.log(dt);
//   var unixFormat = moment.unix(dt).format("MMM Do, YYYY, hh:mm:ss");
//   console.log(unixFormat)
// }

fetchButton.addEventListener('click', getApi);



// create recent search (how to save)
  // add recent searches to an array/object
  // local storage
  // render
// if saved an array, 

// javascript openweather map api isplay icon