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
      searchHistory(name);

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
  timeId.textContent = '(' + (today.format("M/D/YYYY")) + ')';

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
  for (var i = 1; i < 6; i++){
    var displayDate = document.getElementById('time' + i)
    var dt = data.daily[0 + i].dt;
    console.log(dt);
    var unixFormat = moment.unix(dt).format("M/D/YYYY");
    console.log(unixFormat)
    displayDate.textContent = unixFormat;

    var displayIcon1 = document.getElementById('icon' + i)
    var futureIcon = data.daily[i].weather[0].icon;
    displayIcon1.src = 'http://openweathermap.org/img/w/' + futureIcon + '.png';

    var displayTemp1 = document.getElementById('temp' + i)
    var futureTemp = data.daily[i].temp.max;
    displayTemp1.textContent = 'Temp: ' + futureTemp;

    var displayWind1 = document.getElementById('wind' + i)
    var futureWind = data.daily[i].wind_speed;
    displayWind1.textContent = 'Wind: ' + futureWind;

    var displayHumidity1 = document.getElementById('humidity' + i)
    var futureHumidity = data.daily[i].humidity;
    displayHumidity1.textContent = 'Humidity: ' + futureHumidity;
  }
}

function searchHistory(city){
  console.log(city);
  var cityBtn = document.createElement('button');
  var cityList = document.getElementById('search-list');
  cityBtn.textContent = city;
  cityList.append(cityBtn);

  cityBtn.addEventListener('click', function(e){
  var selectedCity = e.target.textContent;
  console.log(selectedCity);

  var requestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + selectedCity + '&appid=' + apiKey;
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
})
}

fetchButton.addEventListener('click', getApi);



// create recent search (how to save)
  // add recent searches to an array/object
  // local storage
  // render
// if saved an array, 

// javascript openweather map api isplay icon