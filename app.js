const hourly = document.querySelector(".hourly");
const more = document.getElementById("more");
more.style.display = "none";
hourly.style.display = "none";

const primaryIcon = document.querySelector(".weather-icon");
const place = document.querySelector(".wplace");
const temp = document.querySelector(".wtemp");
const desc = document.querySelector(".wdesc");
const other = document.querySelector(".wother");
let lat, lon;

function makeIcon(IconID, iconName) {
  let icons = new Skycons({ color: "#fff" });
  icons.set(IconID, iconName);
  icons.play();
}

function populateMoreInfo(weatherObj) {
  const { data } = weatherObj.hourly;
  more.innerHTML = `For the next 3 hours... <br> `;
  hourly.innerHTML = `
   <div class=heythere> <canvas class="daywiseIcon1" width="64vh" height="64vh"></canvas> 
   <br>${data[1].summary} 
   <br> ${data[1].temperature}°C</div>
   <div class=heythere> <canvas class="daywiseIcon2" width="64vh" height="64vh"></canvas> 
   <br>${data[2].summary} 
   <br> ${data[2].temperature}°C</div>
   <div class=heythere> <canvas class="daywiseIcon3" width="64vh" height="64vh"></canvas> 
   <br>${data[3].summary} 
   <br> ${data[3].temperature}°C</div>`;
  const daywiseIcon1 = document.querySelector(".daywiseIcon1");
  const daywiseIcon2 = document.querySelector(".daywiseIcon2");
  const daywiseIcon3 = document.querySelector(".daywiseIcon3");
  makeIcon(daywiseIcon1, `${data[1].icon}`);
  makeIcon(daywiseIcon2, `${data[2].icon}`);
  makeIcon(daywiseIcon3, `${data[3].icon}`);
}

async function getIpLocandWeather() {
  const response = await fetch("https://ipapi.co/json");
  const data = await response.json();
  lat = data.latitude;
  lon = data.longitude;
  weather = await getWeather(lat, lon);
  humidity = Number(weather.currently.humidity) * 100;
  place.textContent = data.city;
  desc.textContent = weather.currently.summary;
  other.innerHTML = `<h3>Humidity: ${humidity}%</h3>`;
  temp.textContent = weather.currently.temperature + "°C";
  makeIcon(primaryIcon, `${weather.currently.icon}`);
  populateMoreInfo(weather);
  more.style.display = "";
  hourly.style.display = "";
}

async function getWeather(_lat, _lon) {
  const response = await fetch(
    `https://darksky-api-endpoint.now.sh/${_lat},${_lon}`
  );
  const data = await response.json();
  return data;
}
getIpLocandWeather();
makeIcon();
