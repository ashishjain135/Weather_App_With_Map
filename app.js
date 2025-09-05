const target = "Pune";
const temperatureField = document.querySelector(".temp");
const cityField = document.querySelector(".time_location p");
const dateField = document.querySelector(".time_location span");
const emojiField = document.querySelector(".weather_condition img");
const weatherField = document.querySelector(".weather_condition span");
const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

async function fetchData(target) {
  try {
    const url =
      `http://api.weatherapi.com/v1/current.json?key=95e2c67a980e4043a2e95219250209&q=${target}&aqi=yes`;
    const response = await fetch(url);
    const data = await response.json();

    const currentTemp = data.current.temp_c;
    const currentCondition = data.current.condition.text;
    const locationName = data.location.name;
    const localTime = data.location.localtime;
    const conditionEmoji = data.current.condition.icon;
    const lat = data.location.lat;
    const lon = data.location.lon;

    updateDOM(currentTemp, locationName, localTime, conditionEmoji, currentCondition);
    showMap(lat, lon, locationName); // 🔥 map update

  } catch (error) {
    console.log(error);
  }
}

fetchData(target);

form.addEventListener("submit", search);

function search(e) {
  e.preventDefault();
  fetchData(searchField.value);
}

function updateDOM(temp, locationName, time, emoji, condition) {
  temperatureField.innerText = `${temp}°C`;
  cityField.innerText = locationName;
  emojiField.src = emoji;
  weatherField.innerText = condition;
  const exactTime = time.split(" ")[1];
  const exactdate = time.split(" ")[0];
  const exactDay = getDayFullName(new Date(exactdate).getDay());
  dateField.innerText = `${exactTime} ${exactDay} ${exactdate}`;
}

function getDayFullName(num) {
  switch (num) {
    case 0: return "Sunday";
    case 1: return "Monday";
    case 2: return "Tuesday";
    case 3: return "Wednesday";
    case 4: return "Thursday";
    case 5: return "Friday";
    case 6: return "Saturday";
    default: return "Don't know";
  }
}
