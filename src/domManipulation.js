import dayTime from "./assets/dayTime.png";
import nightTime from "./assets/nightTime.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";

// Extract location information and add it to related elements of the page
function fillLocationInfo(locationData) {
  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const localTime = document.querySelector(".local-time");
  const localDate = document.querySelector(".local-date");

  cityName.textContent = locationData.name.toUpperCase();
  countryName.textContent = locationData.country;
  [localDate.textContent, localTime.textContent] =
    locationData.localtime.split(" ");

  markCurrentHour(localTime.textContent);
}

// Extract current weather information and add it to relevant elements of the page
function fillCurrentWeatherInfo(currentData) {
  const temp = document.querySelector(".current-temp");
  const description = document.querySelector(".current-weather-description");
  const weatherIcon = document.querySelector(".weather-icon");

  temp.textContent = currentData.temp_c;
  description.textContent = currentData.condition.text;
  weatherIcon.src = currentData.condition.icon;
  fillWeatherDetails(currentData);
}

// Extract 3 day forecast information and add it to relevant elements of the page
function fill3DayForecast(daysForecastData) {
  const maxDays = 2;
  for (let i = 0; i <= maxDays; i += 1) {
    let daySelector = `.day-${i}-forecast-card > div`;

    let weatherIcon = document.querySelector(`${daySelector} > .forecast-icon`);
    let lowHigh = document.querySelector(`${daySelector} > .forecast-low-high`);
    let rainChance = document.querySelector(
      `${daySelector} > .forecast-chances > .icon-text-pair > .rain-icon`,
    );
    let snowChance = document.querySelector(
      `${daySelector} > .forecast-chances > .icon-text-pair > .snow-icon`,
    );

    let dayData = daysForecastData[i];

    weatherIcon.src = daysForecastData[i].day.condition.icon;
    lowHigh.textContent = `${dayData.day.mintemp_c} / ${daysForecastData[i].day.maxtemp_c}`;
    rainChance.textContent = `${dayData.day.daily_chance_of_rain}%`;
    snowChance.textContent = `${dayData.day.daily_chance_of_snow}%`;

    if (i === 0) {
      const sunriseTime = document.querySelector(".sunrise-time");
      const sunsetTime = document.querySelector(".sunset-time");
      const currentLowHigh = document.querySelector(".low-high-temp");
      const currentRainChance = document.querySelector(".weather-rain-chance");
      const currentSnowChance = document.querySelector(".weather-snow-chance");

      sunriseTime.textContent = `${dayData.astro.sunrise}`;
      sunsetTime.textContent = `${dayData.astro.sunset}`;
      currentLowHigh.textContent = lowHigh.textContent;
      currentRainChance.textContent = rainChance.textContent;
      currentSnowChance.textContent = snowChance.textContent;
    }
  }
}

// Extract current weather details and add it to relevant elements of the page
function fillWeatherDetails(detailsData) {
  const feelsLike = document.querySelector(".detail-feels-like");
  const uv = document.querySelector(".detail-uv");
  const humidity = document.querySelector(".detail-humidity");
  const precipitation = document.querySelector(".detail-precipitation");
  const windSpeed = document.querySelector(".detail-wind-speed");
  const windDirection = document.querySelector(".detail-wind-direction");

  feelsLike.textContent = `${detailsData.feelslike_c}\u{B0}`;
  uv.textContent = detailsData.uv;
  humidity.textContent = `${detailsData.humidity}%`;
  precipitation.textContent = `${detailsData.precip_mm} mm`;
  windSpeed.textContent = `${detailsData.wind_kph} km/h`;
  windDirection.textContent = detailsData.wind_dir;
}

// Extract hourly forecast information and add it to relevant elements of the page
function fillHourlyForecast(hourlyForecastData) {
  const maxHour = 23;
  for (let i = 0; i <= maxHour; i += 1) {
    let hourSelector = `.hour-${i}`;

    let hourlyTime = document.querySelector(`${hourSelector} > .hourly-time`);
    let hourlyIcon = document.querySelector(
      `${hourSelector} > .hourly-forecast-icon`,
    );
    let hourlyTemp = document.querySelector(
      `${hourSelector} > .hourly-temperature`,
    );

    let hourData = hourlyForecastData.hour[i];

    hourlyTime.textContent = hourData.time.split(" ")[1];
    hourlyIcon.src = hourData.condition.icon;
    hourlyTemp.textContent = `${hourData.temp_c}\u{B0}`;
  }
}

// function addGif(url) {
//   const gif = document.querySelector(".gif-container > img");
//   gif.src = url;
// }

function markCurrentHour(currentTime) {
  const hourlyTimes = document.querySelectorAll(".hourly-time");

  hourlyTimes.forEach((time) => {
    const hourlyCard = time.parentElement;
    if (parseInt(time.textContent) === parseInt(currentTime)) {
      hourlyCard.classList.add("current-hour");
    } else {
      hourlyCard.classList.remove("current-hour");
    }
  });
}

const weatherIcons = {
  LIGHTRAIN: "//cdn.weatherapi.com/weather/64x64/night/296.png",
  MIST: "//cdn.weatherapi.com/weather/64x64/day/143.png",
  FOG: "//cdn.weatherapi.com/weather/64x64/night/248.png",
  SUNNY: "//cdn.weatherapi.com/weather/64x64/day/113.png",
  OVERCAST: "//cdn.weatherapi.com/weather/64x64/night/122.png",
  LIGHTDRIZZLE: "//cdn.weatherapi.com/weather/64x64/night/266.png",
  LIGHTSNOW: "//cdn.weatherapi.com/weather/64x64/night/326.png",
};

function addIcons() {
  const sunriseIcon = document.querySelector(".sunrise-icon");
  const sunsetIcon = document.querySelector(".sunset-icon");
  const rainIcons = document.querySelectorAll(".rain-icon");
  const snowIcons = document.querySelectorAll(".snow-icon");

  sunriseIcon.src = dayTime;
  sunsetIcon.src = nightTime;
  rainIcons.forEach((icon) => {
    icon.src = rain;
  });
  snowIcons.forEach((icon) => {
    icon.src = snow;
  });
}

export {
  fillLocationInfo,
  fillCurrentWeatherInfo,
  fill3DayForecast,
  fillHourlyForecast,
  addIcons,
};
