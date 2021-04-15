const weather = {};
const serverUrl = 'https://serverweather.herokuapp.com';
const weatherCity = '/weather/city?';
const weatherCoords = '/weather/coordinates?';
const favorites = '/favorites'

weather.temperature = {
  unit: 'celsius',
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Добавление и вывод информации о геолокации
function displayWeatheByCoords(data) {

  const cityElement = document.querySelector('.location-info-city h1');
  const iconElement = document.querySelector('.picture_weather');
  const tempElement = document.querySelector('.temperature-picture_weather p');
  const windElement = document.querySelector('.wind p');
  const desc = document.querySelector('.description p');
  const presElement = document.querySelector('.pressure p');
  const humElement = document.querySelector('.humidity p');
  const coordElement = document.querySelector('.coords p');

  cityElement.innerHTML = data.name;
  iconElement.innerHTML = `<img src="png/${data.icon}.png"/>`;
  tempElement.innerHTML = data.temp;

  windElement.innerHTML = data.wind;

  //desc.innerHTML = data.description.charAt(0).toUpperCase() + data.description.slice(1);

  presElement.innerHTML = data.pressure;
  humElement.innerHTML = data.humidity;

  coordElement.innerHTML = `[${data.coord.lat.toFixed(2)};${data.coord.lon.toFixed(2)}]`;
}

//Добавление и вывод информации о избанном городе
function displayWeatherByCity() {
  const template = document.querySelector('#location-info-weather-grid');

  const favcityElement = template.content.querySelector('.location-info-favorites-city h3');
  const faviconElement = template.content.querySelector('.picture_weather-favorites');
  const favtempElement = template.content.querySelector('.location-info-favorites-city p');
  const favwindElement = template.content.querySelector('.favcity_wind p');
  const favdesc = template.content.querySelector('.favcity_description p');
  const favpresElement = template.content.querySelector('.favcity_pressure p');
  const favhumElement = template.content.querySelector('.favcity_humidity p');
  const favcoordElement = template.content.querySelector('.favcity_coords p');

  favcityElement.innerHTML = weather.city;
  faviconElement.innerHTML = `<img src="png/${weather.iconId}.png"/>`;
  favtempElement.innerHTML = `${weather.temperature.value}°C`;

  favwindElement.innerHTML = `${weather.speed} m/s, ${weather.deg}`;

  favdesc.innerHTML = weather.description.charAt(0).toUpperCase() + weather.description.slice(1);

  favpresElement.innerHTML = `${weather.pressure} hpa`;
  favhumElement.innerHTML = `${weather.humidity} %`;

  favcoordElement.innerHTML = `[${weather.lat.toFixed(2)};${weather.lon.toFixed(2)}]`;

  const clone = template.content.querySelector('.clone').cloneNode(true);
  const gridLocation = document.querySelector('.grid-favorites-location');

  gridLocation.appendChild(clone);

  const loaderGrid =clone.querySelector('.loader-city');
  const div = clone.querySelector('.location-info-favorites-city')
  const ul = clone.querySelector('ul');

  loaderGrid.style.display = 'flex';
  ul.style.display = 'none';
  div.style.display ='none';
  
  sleep(1000).then(() => {
    ul.style.display = 'block'
    div.style.display ='flex';
    loaderGrid.style.display = 'none';
  })

  clone.querySelector('.location-info-favorites-city button').onclick = () => {
    
    localStorage.removeItem(clone.querySelector('.location-info-favorites-city h3').innerHTML);
    gridLocation.removeChild(clone);
  };
}

//Обращение к апи по координатам
async function getResponseByCoords(latitude, longitude){
  const response = await( await fetch(serverUrl + weatherCoords + `lat=${latitude}&lon=${longitude}`, {
    method: 'GET'
  })).json();
  return response;
}

//Обращение к апи по городу
async function getResponseByCity(city){
  const response = await( await fetch(serverUrl + weatherCity + `q=${city}`, {
    method: 'GET'
  })).json();
  return response;
}

//Получение данных по координатам
async function getDatabyCoords(latitude, longitude){
  const data = await getResponseByCoords(latitude, longitude);
  console.log(data);
  // if (data.cod == "404") window.alert(data.message);
  // else await getWeather(data);
  displayWeatheByCoords(data);
}

//Получение данных по городу
async function getDatabyCity(city){
  const data = await getResponseByCity(city);

  console.log(data);

  // if(data.id != localStorage.getItem(data.name) ){
  //   if (data.cod == "404") window.alert(data.message);
  //   else await getWeather(data);

  //   displayWeatherByCity();
  // }
  // else if(data.cod == "404") window.alert(data.message);
  //     else window.alert("Такой город уже указан")
}

// Добавление избранных городов
// function addFavorites() {
//   const city = document.querySelector('.add-favorite-location input').value;
//   const result = await (await fetch(serverUrl + favorites + `?q=${city}`, {
//           method: 'POST'
//         })).json();
//   getDatabyCity(result);
// }

//Заставка на загрузку данных
function loadingCity() {
  const loaderLocation = document.querySelector('.location-weather');
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';
  loaderLocation.style.display = 'grid';
}

function loading(){
  const loaderLocation = document.querySelector('.location-weather');
  const loader = document.querySelector('.loader');

  loader.style.display = 'flex';
  loaderLocation.style.display = 'none';
  
}

//Случай разрешения доступа геолокации
async function setPosition(position) {
  const { latitude } = position.coords;
  const { longitude } = position.coords;
  await getDatabyCoords(latitude, longitude);
  loadingCity();
}

//Случай блокировки геолокации
async function showError() {
  const defLatitude = 55.753215;
  const defLongitude = 37.622504;
  await getDatabyCoords(defLatitude, defLongitude);
  loadingCity();
}

// Добавление часто встречаемыхь городов
async function defaultAdd() {
  const defCity = ['Moscow', 'Madrid', 'London', 'New York'];
  const defKey = ['524901', '3117735', '2643743', '5128581']

  const data = await (await fetch(serverURL + favorites, {
      method: 'GET'
    })).json();

  for (let i = 0; i < data.length; i+=1){
      getWeather(data[i]);
      await displayWeatherByCity();
  }
}

// function pressEnter() {

//   document.querySelector('.input').addEventListener('keypress',
//       function (e) {
//         if (e.key === 'Enter' && document.querySelector('.input').value !== "") {
//           addFavorites();
//         }
//       });
// }

async function main(){
  //defaultAdd();
  navigator.geolocation.getCurrentPosition(setPosition, showError);
  //pressEnter();

  //document.querySelector('.add-favorite-location button').onclick = addFavorites;
  document.querySelector('.header button').onclick = () => {
    loading();
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  };
}

main();

