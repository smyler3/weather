/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./imperial.js":
/*!*********************!*\
  !*** ./imperial.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addImperialData)
/* harmony export */ });
function addImperialData(data, units) {
  const nonUnitTextData = [
  // Location details
  {
    selector: ".city-name",
    data: data.location.name.toUpperCase()
  }, {
    selector: ".country-name",
    data: data.location.country
  }, {
    selector: ".local-time",
    data: data.location.localtime.split(" ")[0]
  }, {
    selector: ".local-date",
    data: data.location.localtime.split(" ")[1]
  }, {
    selector: ".sunrise-time",
    data: data.forecast.forecastday[0].astro.sunrise
  }, {
    selector: ".sunset-time",
    data: data.forecast.forecastday[0].astro.sunset
  }, {
    selector: ".weather-rain-chance",
    data: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
  }, {
    selector: ".weather-snow-chance",
    data: `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`
  },
  // Current weather details
  {
    selector: ".current-weather-description",
    data: data.current.condition.text
  }, {
    selector: ".detail-uv",
    data: data.current.uv
  }, {
    selector: ".detail-humidity",
    data: `${data.current.humidity}%`
  }, {
    selector: ".detail-wind-direction",
    data: data.current.wind_dir
  },
  // Three day forecast details
  {
    selector: ".day-0-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
    data: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
  }, {
    selector: ".day-0-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
    data: `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`
  }, {
    selector: ".day-1-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
    data: `${data.forecast.forecastday[1].day.daily_chance_of_rain}%`
  }, {
    selector: ".day-1-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
    data: `${data.forecast.forecastday[1].day.daily_chance_of_snow}%`
  }, {
    selector: ".day-2-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
    data: `${data.forecast.forecastday[2].day.daily_chance_of_rain}%`
  }, {
    selector: ".day-2-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
    data: `${data.forecast.forecastday[2].day.daily_chance_of_snow}%`
  }];
  const unitTextData = [
  // Current forecast details
  {
    selector: ".current-temp",
    metric: data.current.temp_c,
    imperial: data.current.temp_f
  }, {
    selector: ".detail-feels-like",
    metric: `${data.current.feelslike_c}\u{B0}`,
    imperial: `${data.current.feelslike_f}\u{B0}`
  }, {
    selector: ".detail-precipitation",
    metric: `${data.current.precip_mm} mm`,
    imperial: `${data.current.precip_in} in`
  }, {
    selector: ".detail-wind-speed",
    metric: `${data.current.wind_kph} km/h`,
    imperial: `${data.current.wind_mph} mph`
  }, {
    selector: ".low-high-temp",
    metric: `${data.forecast.forecastday[0].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_f}\u{B0}`
  },
  // Three day forecast details
  {
    selector: ".day-0-forecast-card > .forecast-card-details > .forecast-low-high",
    metric: `${data.forecast.forecastday[0].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_f}\u{B0}`
  }, {
    selector: ".day-1-forecast-card > .forecast-card-details > .forecast-low-high",
    metric: `${data.forecast.forecastday[1].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[1].day.maxtemp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[1].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[1].day.maxtemp_f}\u{B0}`
  }, {
    selector: ".day-2-forecast-card > .forecast-card-details > .forecast-low-high",
    metric: `${data.forecast.forecastday[2].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[2].day.maxtemp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[2].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[2].day.maxtemp_f}\u{B0}`
  },
  // Hourly forecast details
  {
    selector: ".hour-0 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[0].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[0].temp_f}\u{B0}`
  }, {
    selector: ".hour-1 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[1].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[1].temp_f}\u{B0}`
  }, {
    selector: ".hour-2 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[2].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[2].temp_f}\u{B0}`
  }, {
    selector: ".hour-3 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[3].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[3].temp_f}\u{B0}`
  }, {
    selector: ".hour-4 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[4].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[4].temp_f}\u{B0}`
  }, {
    selector: ".hour-5 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[5].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[5].temp_f}\u{B0}`
  }, {
    selector: ".hour-6 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[6].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[6].temp_f}\u{B0}`
  }, {
    selector: ".hour-7 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[7].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[7].temp_f}\u{B0}`
  }, {
    selector: ".hour-8 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[8].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[8].temp_f}\u{B0}`
  }, {
    selector: ".hour-9 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[9].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[9].temp_f}\u{B0}`
  }, {
    selector: ".hour-10 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[10].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[10].temp_f}\u{B0}`
  }, {
    selector: ".hour-11 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[11].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[11].temp_f}\u{B0}`
  }, {
    selector: ".hour-12 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[12].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[12].temp_f}\u{B0}`
  }, {
    selector: ".hour-13 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[13].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[13].temp_f}\u{B0}`
  }, {
    selector: ".hour-14 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[14].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[14].temp_f}\u{B0}`
  }, {
    selector: ".hour-15 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[15].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[15].temp_f}\u{B0}`
  }, {
    selector: ".hour-16 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[16].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[16].temp_f}\u{B0}`
  }, {
    selector: ".hour-17 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[17].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[17].temp_f}\u{B0}`
  }, {
    selector: ".hour-18 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[18].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[18].temp_f}\u{B0}`
  }, {
    selector: ".hour-19 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[19].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[19].temp_f}\u{B0}`
  }, {
    selector: ".hour-20 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[20].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[20].temp_f}\u{B0}`
  }, {
    selector: ".hour-21 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[21].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[21].temp_f}\u{B0}`
  }, {
    selector: ".hour-22 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[22].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[22].temp_f}\u{B0}`
  }, {
    selector: ".hour-23 > .hourly-temperature",
    metric: `${data.forecast.forecastday[0].hour[23].temp_c}\u{B0}`,
    imperial: `${data.forecast.forecastday[0].hour[23].temp_f}\u{B0}`
  }];
  const iconData = [
  // Current weather icon
  {
    selector: ".weather-icon",
    data: data.current.condition.icon
  },
  // Three day forecast icons
  {
    selector: ".day-0-forecast-card > .forecast-icon",
    data: data.forecast.forecastday[0].day.condition.icon
  }, {
    selector: ".day-1-forecast-card > .forecast-icon",
    data: data.forecast.forecastday[1].day.condition.icon
  }, {
    selector: ".day-2-forecast-card > .forecast-icon",
    data: data.forecast.forecastday[2].day.condition.icon
  },
  // Hourly forecast icons
  {
    selector: ".hour-0 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[0].condition.icon
  }, {
    selector: ".hour-1 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[1].condition.icon
  }, {
    selector: ".hour-2 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[2].condition.icon
  }, {
    selector: ".hour-3 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[3].condition.icon
  }, {
    selector: ".hour-4 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[4].condition.icon
  }, {
    selector: ".hour-5 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[5].condition.icon
  }, {
    selector: ".hour-6 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[6].condition.icon
  }, {
    selector: ".hour-7 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[7].condition.icon
  }, {
    selector: ".hour-8 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[8].condition.icon
  }, {
    selector: ".hour-9 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[9].condition.icon
  }, {
    selector: ".hour-10 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[10].condition.icon
  }, {
    selector: ".hour-11 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[11].condition.icon
  }, {
    selector: ".hour-12 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[12].condition.icon
  }, {
    selector: ".hour-13 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[13].condition.icon
  }, {
    selector: ".hour-14 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[14].condition.icon
  }, {
    selector: ".hour-15 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[15].condition.icon
  }, {
    selector: ".hour-16 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[16].condition.icon
  }, {
    selector: ".hour-17 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[17].condition.icon
  }, {
    selector: ".hour-18 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[18].condition.icon
  }, {
    selector: ".hour-19 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[19].condition.icon
  }, {
    selector: ".hour-20 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[20].condition.icon
  }, {
    selector: ".hour-21 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[21].condition.icon
  }, {
    selector: ".hour-22 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[22].condition.icon
  }, {
    selector: ".hour-23 > .hourly-forecast-icon",
    data: data.forecast.forecastday[0].hour[23].condition.icon
  }];

  // Add data to the page
  nonUnitTextData.forEach(dataElem => {
    document.querySelector(dataElem.selector).textContent = dataElem.data;
  });
  if (units === "Metric") {
    unitTextData.forEach(dataElem => {
      document.querySelector(dataElem.selector).textContent = dataElem.metric;
    });
  } else {
    unitTextData.forEach(dataElem => {
      document.querySelector(dataElem.selector).textContent = dataElem.imperial;
    });
  }
  iconData.forEach(iconElem => {
    document.querySelector(iconElem.selector).src = iconElem.data;
  });
}

/***/ }),

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getLocationWeatherData: () => (/* binding */ getLocationWeatherData)
/* harmony export */ });
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulation */ "./src/domManipulation.js");

async function getLocationWeatherData(location) {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not recognised!");
    }
    return response.json();
  } catch (error) {
    return Promise.reject(error);
  }
}

// async function getGifData(location, condition) {
//   const searchTerm = `${location}-${condition}`;
//   console.log(searchTerm);
//   const response = await fetch(
//     `https://api.giphy.com/v1/gifs/translate?api_key=${gifApiKey}&s=${searchTerm}`,
//   );
//   extractGifData(response);
// }

// async function extractGifData(response) {
//   const jsonData = await response.json();
//   console.log(jsonData);
//   console.log(jsonData.data.images.fixed_height_small.url);
//   addGif(jsonData.data.images.fixed_height_small.url);
// }

const weatherApiKey = "ed56e1bd01c548178dd145408242201";
// const gifApiKey = "TuqD2iuVA7pLwDtPdA9f5kV5rHttZKzx";



/***/ }),

/***/ "./src/domManipulation.js":
/*!********************************!*\
  !*** ./src/domManipulation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addIcons: () => (/* binding */ addIcons),
/* harmony export */   fill3DayForecast: () => (/* binding */ fill3DayForecast),
/* harmony export */   fillCurrentWeatherInfo: () => (/* binding */ fillCurrentWeatherInfo),
/* harmony export */   fillHourlyForecast: () => (/* binding */ fillHourlyForecast),
/* harmony export */   fillLocationInfo: () => (/* binding */ fillLocationInfo)
/* harmony export */ });
/* harmony import */ var _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/dayTime.png */ "./src/assets/dayTime.png");
/* harmony import */ var _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/nightTime.png */ "./src/assets/nightTime.png");
/* harmony import */ var _assets_rain_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/rain.png */ "./src/assets/rain.png");
/* harmony import */ var _assets_snow_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/snow.png */ "./src/assets/snow.png");





// Extract location information and add it to related elements of the page
function fillLocationInfo(locationData) {
  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const localTime = document.querySelector(".local-time");
  const localDate = document.querySelector(".local-date");
  cityName.textContent = locationData.name.toUpperCase();
  countryName.textContent = locationData.country;
  [localDate.textContent, localTime.textContent] = locationData.localtime.split(" ");
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
    let rainChance = document.querySelector(`${daySelector} > .forecast-chances > .icon-text-pair > .rain-icon`);
    let snowChance = document.querySelector(`${daySelector} > .forecast-chances > .icon-text-pair > .snow-icon`);
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
    let hourlyIcon = document.querySelector(`${hourSelector} > .hourly-forecast-icon`);
    let hourlyTemp = document.querySelector(`${hourSelector} > .hourly-temperature`);
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
  hourlyTimes.forEach(time => {
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
  LIGHTSNOW: "//cdn.weatherapi.com/weather/64x64/night/326.png"
};
function addIcons() {
  const sunriseIcon = document.querySelector(".sunrise-icon");
  const sunsetIcon = document.querySelector(".sunset-icon");
  const rainIcons = document.querySelectorAll(".rain-icon");
  const snowIcons = document.querySelectorAll(".snow-icon");
  sunriseIcon.src = _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__;
  sunsetIcon.src = _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__;
  rainIcons.forEach(icon => {
    icon.src = _assets_rain_png__WEBPACK_IMPORTED_MODULE_2__;
  });
  snowIcons.forEach(icon => {
    icon.src = _assets_snow_png__WEBPACK_IMPORTED_MODULE_3__;
  });
}


/***/ }),

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ initialiseSearchBar)
/* harmony export */ });
/* harmony import */ var _imperial__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../imperial */ "./imperial.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");



// Indicate an error in the search
function displaySearchError(searchBar, error) {
  const searchBarError = document.querySelector("#location + .error-message");
  searchBarError.textContent = error;
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError(searchBar) {
  searchBar.classList.remove("field-error");
}
function initialiseSearchBar() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";
      displaySearchError(searchBar, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      const data = await (0,_data__WEBPACK_IMPORTED_MODULE_1__.getLocationWeatherData)(searchBar.value).catch(error => {
        displaySearchError(searchBar, error);
      });
      console.log(data);
      removeSearchError(searchBar);
      (0,_imperial__WEBPACK_IMPORTED_MODULE_0__["default"])(data, units);
    }
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/*
 * ------------------------------------------------------------
 * General Styling
 * ------------------------------------------------------------
 */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100vw;
    height: 100vh;

    background-color: grey;

    color: white;
}

/*
 * ------------------------------------------------------------
 * Search Form Styling
 * ------------------------------------------------------------
 */

form {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem 2rem;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.30);
}

.form-field {
    display: grid;
    grid-template-rows: auto repeat(2, 1fr);
    gap: 8px;
    width: 100%;
    height: auto;
}

.searchbar {
    border: 1px solid black;
    padding: 8px;
}

.unit-option {
    display: flex;
    align-items: center;
}

.field-error {
    border-color: red;
    background-color: rgba(255, 0, 0, 0.041);
    outline: 1px solid red;
}

.error-message {
    color: rgb(252, 62, 62);
    font-size: 0.8rem;
}

button {
    padding: 10px 20px;
    cursor: pointer;
}

/*
 * ------------------------------------------------------------
 * Weather Information Layout Styling
 * ------------------------------------------------------------
 */

.weather-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 80vw;
    height: 100vh;

    padding: 1rem;

    font-size: 20px;
}

.row-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
}

.row-3 {
    display: grid;
    grid-template-columns: 1fr 3fr;
    column-gap: 1rem;
}

.row-3 {

}

.subsection-header {
    font-size: large;
}

.location-details,
.sun-info,
.weather-description,
.precipitation-info {
    display: flex;
    align-items: center;
    gap: 1rem;
}

/*
 * ------------------------------------------------------------
 * Icon Styling
 * ------------------------------------------------------------
 */

.rain-icon,
.snow-icon,
.sunrise-icon,
.sunset-icon {
    height: 20px;
    width: 20px;
}

.icon-text-pair {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
}

.weather-icon {
    height: 58px;
    width: 58px;
}

.forecast-icon {
    height: 46px;
    width: 46px;
}

.hourly-forecast-icon {
    height: 30px;
    width: 30px;
}

/*
 * ------------------------------------------------------------
 * Location Information Styling
 * ------------------------------------------------------------
 */

.location-info-container {

}

.city-name,
.country-name {
    overflow: hidden;
}

.city-name {
    font-size: 80px;
}

.country-name {
    font-size: 50px;
}

/*
 * ------------------------------------------------------------
 * Current Weather Information Styling
 * ------------------------------------------------------------
 */

.current-weather-container {
} 

.current-temp {
    font-size: 80px;
}

.current-weather-description {
    font-size: 50px;
}

/*
 * ------------------------------------------------------------
 * Gif Styling
 * ------------------------------------------------------------
 */

/*
 * ------------------------------------------------------------
 * Three Day Forecast Styling
 * ------------------------------------------------------------
 */

.three-day-forecast-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0.5rem;
} 

.three-day-forecast-card-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 0.5rem;
}

.three-day-forecast-card {
    display: grid;
    grid-template-columns: 1fr 5fr 1fr;
    align-items: center;

    padding: 0.2rem 1rem;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.30);
}

.forecast-card-title {
    text-align: center;
    font-size: small;
}

.forecast-card-details {
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    gap: 0.5rem;
}

/*
 * ------------------------------------------------------------
 * Current Details Styling
 * ------------------------------------------------------------
 */

.current-details-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0.5rem;
} 

.detail-card-grid {
    display: grid;
    grid: repeat(3, 1fr) / repeat(2, 1fr);
    gap: 0.5rem;

}

.detail-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100%;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.30);
}

.detail-card > h4 {
    font-size: small;
}

/*
 * ------------------------------------------------------------
 * Hourly Forecast Styling
 * ------------------------------------------------------------
 */

 .hourly-forecast-info-container {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0.5rem;
} 

.hourly-forecast-card-grid {
    display: grid;
    grid: repeat(3, 1fr) / repeat(8, 1fr);
    gap: 0.5rem;
}

.hourly-forecast-card {
    display: grid;
    grid-template-rows: auto 1fr auto;
    justify-items: center;
    align-items: center;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.30);
}
/* Marks current hour */
.current-hour {
    background-color: rgba(255, 255, 255, 0.80);

    color: black
}

.hourly-time {
    font-size: small;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;EAIE;AACF;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,sBAAsB;;IAEtB,YAAY;AAChB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,kBAAkB;;IAElB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,uCAAuC;IACvC,QAAQ;IACR,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,wCAAwC;IACxC,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,WAAW;IACX,aAAa;;IAEb,aAAa;;IAEb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;;AAEA;;AAEA;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;IAII,aAAa;IACb,mBAAmB;IACnB,SAAS;AACb;;AAEA;;;;EAIE;;AAEF;;;;IAII,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;;AAEA;;AAEA;;IAEI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;AACA;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,kCAAkC;IAClC,mBAAmB;;IAEnB,oBAAoB;;IAEpB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,qBAAqB;IACrB,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;;AAEf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,YAAY;;IAEZ,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;EAIE;;CAED;IACG,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;AACf;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,qBAAqB;IACrB,mBAAmB;;IAEnB,mBAAmB;IACnB,qCAAqC;AACzC;AACA,uBAAuB;AACvB;IACI,2CAA2C;;IAE3C;AACJ;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: white;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 8px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.field-error {\r\n    border-color: red;\r\n    background-color: rgba(255, 0, 0, 0.041);\r\n    outline: 1px solid red;\r\n}\r\n\r\n.error-message {\r\n    color: rgb(252, 62, 62);\r\n    font-size: 0.8rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n/* Marks current hour */\r\n.current-hour {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: black\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/dayTime.png":
/*!********************************!*\
  !*** ./src/assets/dayTime.png ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4da241f3f8acaf6327a4.png";

/***/ }),

/***/ "./src/assets/nightTime.png":
/*!**********************************!*\
  !*** ./src/assets/nightTime.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "dac00f0ea249d435a15b.png";

/***/ }),

/***/ "./src/assets/rain.png":
/*!*****************************!*\
  !*** ./src/assets/rain.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "376d0ff54e952f9656ca.png";

/***/ }),

/***/ "./src/assets/snow.png":
/*!*****************************!*\
  !*** ./src/assets/snow.png ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0a2ce977cd55f8861243.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");
/* harmony import */ var _form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./form */ "./src/form.js");
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domManipulation */ "./src/domManipulation.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./style.css */ "./src/style.css");




(0,_form__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_domManipulation__WEBPACK_IMPORTED_MODULE_2__.addIcons)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLG1GQUFtRixLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLFdBQVcsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFlBQVksVUFBVSxXQUFXLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLFFBQVEsVUFBVSxZQUFZLFdBQVcsTUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxRQUFRLE1BQU0sTUFBTSxNQUFNLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLFFBQVEsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sUUFBUSxNQUFNLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGNBQWMsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxhQUFhLGFBQWEsTUFBTSxZQUFZLE1BQU0sYUFBYSxNQUFNLE1BQU0sS0FBSyxZQUFZLHNNQUFzTSwrQkFBK0Isa0JBQWtCLG1CQUFtQixLQUFLLGNBQWMsc0JBQXNCLCtCQUErQiw0QkFBNEIseUJBQXlCLHNCQUFzQixtQ0FBbUMseUJBQXlCLEtBQUssK0xBQStMLHNCQUFzQiwrQkFBK0IsNEJBQTRCLCtCQUErQixnQ0FBZ0MsOENBQThDLEtBQUsscUJBQXFCLHNCQUFzQixnREFBZ0QsaUJBQWlCLG9CQUFvQixxQkFBcUIsS0FBSyxvQkFBb0IsZ0NBQWdDLHFCQUFxQixLQUFLLHNCQUFzQixzQkFBc0IsNEJBQTRCLEtBQUssc0JBQXNCLDBCQUEwQixpREFBaUQsK0JBQStCLEtBQUssd0JBQXdCLGdDQUFnQywwQkFBMEIsS0FBSyxnQkFBZ0IsMkJBQTJCLHdCQUF3QixLQUFLLDROQUE0TixzQkFBc0IsK0JBQStCLGtCQUFrQix3QkFBd0Isc0JBQXNCLDBCQUEwQiw0QkFBNEIsS0FBSyxnQkFBZ0Isc0JBQXNCLHVDQUF1Qyx5QkFBeUIsS0FBSyxnQkFBZ0Isc0JBQXNCLHVDQUF1Qyx5QkFBeUIsS0FBSyxnQkFBZ0IsU0FBUyw0QkFBNEIseUJBQXlCLEtBQUssMEZBQTBGLHNCQUFzQiw0QkFBNEIsa0JBQWtCLEtBQUssZ1BBQWdQLHFCQUFxQixvQkFBb0IsS0FBSyx5QkFBeUIsc0JBQXNCLDRCQUE0Qix1Q0FBdUMsb0JBQW9CLEtBQUssdUJBQXVCLHFCQUFxQixvQkFBb0IsS0FBSyx3QkFBd0IscUJBQXFCLG9CQUFvQixLQUFLLCtCQUErQixxQkFBcUIsb0JBQW9CLEtBQUssNE5BQTROLFNBQVMsc0NBQXNDLHlCQUF5QixLQUFLLG9CQUFvQix3QkFBd0IsS0FBSyx1QkFBdUIsd0JBQXdCLEtBQUsscU9BQXFPLE1BQU0sdUJBQXVCLHdCQUF3QixLQUFLLHNDQUFzQyx3QkFBd0IsS0FBSyx3WUFBd1ksc0JBQXNCLHFDQUFxQyxvQkFBb0IsTUFBTSx1Q0FBdUMsc0JBQXNCLDhDQUE4QywyQkFBMkIsS0FBSyxrQ0FBa0Msc0JBQXNCLDJDQUEyQyw0QkFBNEIsaUNBQWlDLGdDQUFnQyw4Q0FBOEMsS0FBSyw4QkFBOEIsMkJBQTJCLHlCQUF5QixLQUFLLGdDQUFnQyxzQkFBc0IscUNBQXFDLDhCQUE4QixvQkFBb0IsS0FBSyx5TkFBeU4sc0JBQXNCLHFDQUFxQyxvQkFBb0IsTUFBTSwyQkFBMkIsc0JBQXNCLDhDQUE4QyxvQkFBb0IsU0FBUyxzQkFBc0Isc0JBQXNCLCtCQUErQiw0QkFBNEIsZ0NBQWdDLHlCQUF5QixnQ0FBZ0MsOENBQThDLEtBQUssMkJBQTJCLHlCQUF5QixLQUFLLCtOQUErTixzQkFBc0IscUNBQXFDLG9CQUFvQixNQUFNLG9DQUFvQyxzQkFBc0IsOENBQThDLG9CQUFvQixLQUFLLCtCQUErQixzQkFBc0IsMENBQTBDLDhCQUE4Qiw0QkFBNEIsZ0NBQWdDLDhDQUE4QyxLQUFLLCtDQUErQyxvREFBb0QsNkJBQTZCLHNCQUFzQix5QkFBeUIsS0FBSyxtQkFBbUI7QUFDM3RRO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDcFUxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksc0ZBQU8sVUFBVSxzRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7Ozs7O0FDQWdEO0FBQ2lCO0FBQ3BCO0FBQ3hCO0FBRXJCaUksaURBQW1CLENBQUMsQ0FBQztBQUNyQlQsMERBQVEsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9pbXBlcmlhbC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZEltcGVyaWFsRGF0YShkYXRhLCB1bml0cykge1xyXG4gIGNvbnN0IG5vblVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIExvY2F0aW9uIGRldGFpbHNcclxuICAgIHsgc2VsZWN0b3I6IFwiLmNpdHktbmFtZVwiLCBkYXRhOiBkYXRhLmxvY2F0aW9uLm5hbWUudG9VcHBlckNhc2UoKSB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuY291bnRyeS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24uY291bnRyeSB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIubG9jYWwtdGltZVwiLCBkYXRhOiBkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMF0gfSxcclxuICAgIHsgc2VsZWN0b3I6IFwiLmxvY2FsLWRhdGVcIiwgZGF0YTogZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5zdW5yaXNlLXRpbWVcIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLnN1bnNldC10aW1lXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICAvLyBDdXJyZW50IHdlYXRoZXIgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcclxuICAgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtdXZcIiwgZGF0YTogZGF0YS5jdXJyZW50LnV2IH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtaHVtaWRpdHlcIiwgZGF0YTogYCR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fSVgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtd2luZC1kaXJlY3Rpb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LndpbmRfZGlyIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC10ZW1wXCIsXHJcbiAgICAgIG1ldHJpYzogZGF0YS5jdXJyZW50LnRlbXBfYyxcclxuICAgICAgaW1wZXJpYWw6IGRhdGEuY3VycmVudC50ZW1wX2YsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLWZlZWxzLWxpa2VcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXByZWNpcGl0YXRpb25cIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX21tfSBtbWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX2lufSBpbmAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXdpbmQtc3BlZWRcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9IGttL2hgLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LndpbmRfbXBofSBtcGhgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmxvdy1oaWdoLXRlbXBcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAgLy8gSG91cmx5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci01ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci04ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEwXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEzXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTVdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE2XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxN10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMThdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE5XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBpY29uRGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgd2VhdGhlciBpY29uXHJcbiAgICB7IHNlbGVjdG9yOiBcIi53ZWF0aGVyLWljb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgaWNvbnNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIC8vIEhvdXJseSBmb3JlY2FzdCBpY29uc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0wID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0zID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci02ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci05ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICAvLyBBZGQgZGF0YSB0byB0aGUgcGFnZVxyXG4gIG5vblVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5kYXRhO1xyXG4gIH0pO1xyXG5cclxuICBpZiAodW5pdHMgPT09IFwiTWV0cmljXCIpIHtcclxuICAgIHVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFFbGVtLnNlbGVjdG9yKS50ZXh0Q29udGVudCA9IGRhdGFFbGVtLm1ldHJpYztcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1bml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5pbXBlcmlhbDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWNvbkRhdGEuZm9yRWFjaCgoaWNvbkVsZW0pID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWNvbkVsZW0uc2VsZWN0b3IpLnNyYyA9IGljb25FbGVtLmRhdGE7XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBmaWxsTG9jYXRpb25JbmZvLFxyXG4gIGZpbGxDdXJyZW50V2VhdGhlckluZm8sXHJcbiAgZmlsbDNEYXlGb3JlY2FzdCxcclxuICBmaWxsSG91cmx5Rm9yZWNhc3QsXHJcbiAgYWRkR2lmLFxyXG59IGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvblwiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25XZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHt3ZWF0aGVyQXBpS2V5fSZxPSR7bG9jYXRpb259JmRheXM9M2AsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEludmFsaWQgbG9jYXRpb25cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBub3QgcmVjb2duaXNlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIGdldEdpZkRhdGEobG9jYXRpb24sIGNvbmRpdGlvbikge1xyXG4vLyAgIGNvbnN0IHNlYXJjaFRlcm0gPSBgJHtsb2NhdGlvbn0tJHtjb25kaXRpb259YDtcclxuLy8gICBjb25zb2xlLmxvZyhzZWFyY2hUZXJtKTtcclxuLy8gICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4vLyAgICAgYGh0dHBzOi8vYXBpLmdpcGh5LmNvbS92MS9naWZzL3RyYW5zbGF0ZT9hcGlfa2V5PSR7Z2lmQXBpS2V5fSZzPSR7c2VhcmNoVGVybX1gLFxyXG4vLyAgICk7XHJcbi8vICAgZXh0cmFjdEdpZkRhdGEocmVzcG9uc2UpO1xyXG4vLyB9XHJcblxyXG4vLyBhc3luYyBmdW5jdGlvbiBleHRyYWN0R2lmRGF0YShyZXNwb25zZSkge1xyXG4vLyAgIGNvbnN0IGpzb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4vLyAgIGNvbnNvbGUubG9nKGpzb25EYXRhKTtcclxuLy8gICBjb25zb2xlLmxvZyhqc29uRGF0YS5kYXRhLmltYWdlcy5maXhlZF9oZWlnaHRfc21hbGwudXJsKTtcclxuLy8gICBhZGRHaWYoanNvbkRhdGEuZGF0YS5pbWFnZXMuZml4ZWRfaGVpZ2h0X3NtYWxsLnVybCk7XHJcbi8vIH1cclxuXHJcbmNvbnN0IHdlYXRoZXJBcGlLZXkgPSBcImVkNTZlMWJkMDFjNTQ4MTc4ZGQxNDU0MDgyNDIyMDFcIjtcclxuLy8gY29uc3QgZ2lmQXBpS2V5ID0gXCJUdXFEMml1VkE3cEx3RHRQZEE5ZjVrVjVySHR0Wkt6eFwiO1xyXG5cclxuZXhwb3J0IHsgZ2V0TG9jYXRpb25XZWF0aGVyRGF0YSB9O1xyXG4iLCJpbXBvcnQgZGF5VGltZSBmcm9tIFwiLi9hc3NldHMvZGF5VGltZS5wbmdcIjtcclxuaW1wb3J0IG5pZ2h0VGltZSBmcm9tIFwiLi9hc3NldHMvbmlnaHRUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgcmFpbiBmcm9tIFwiLi9hc3NldHMvcmFpbi5wbmdcIjtcclxuaW1wb3J0IHNub3cgZnJvbSBcIi4vYXNzZXRzL3Nub3cucG5nXCI7XHJcblxyXG4vLyBFeHRyYWN0IGxvY2F0aW9uIGluZm9ybWF0aW9uIGFuZCBhZGQgaXQgdG8gcmVsYXRlZCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsTG9jYXRpb25JbmZvKGxvY2F0aW9uRGF0YSkge1xyXG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XHJcbiAgY29uc3QgY291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnktbmFtZVwiKTtcclxuICBjb25zdCBsb2NhbFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2FsLXRpbWVcIik7XHJcbiAgY29uc3QgbG9jYWxEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhbC1kYXRlXCIpO1xyXG5cclxuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0YS5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgY291bnRyeU5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGEuY291bnRyeTtcclxuICBbbG9jYWxEYXRlLnRleHRDb250ZW50LCBsb2NhbFRpbWUudGV4dENvbnRlbnRdID1cclxuICAgIGxvY2F0aW9uRGF0YS5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuICBtYXJrQ3VycmVudEhvdXIobG9jYWxUaW1lLnRleHRDb250ZW50KTtcclxufVxyXG5cclxuLy8gRXh0cmFjdCBjdXJyZW50IHdlYXRoZXIgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsQ3VycmVudFdlYXRoZXJJbmZvKGN1cnJlbnREYXRhKSB7XHJcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10ZW1wXCIpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItaWNvblwiKTtcclxuXHJcbiAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhLnRlbXBfYztcclxuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbi50ZXh0O1xyXG4gIHdlYXRoZXJJY29uLnNyYyA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbi5pY29uO1xyXG4gIGZpbGxXZWF0aGVyRGV0YWlscyhjdXJyZW50RGF0YSk7XHJcbn1cclxuXHJcbi8vIEV4dHJhY3QgMyBkYXkgZm9yZWNhc3QgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsM0RheUZvcmVjYXN0KGRheXNGb3JlY2FzdERhdGEpIHtcclxuICBjb25zdCBtYXhEYXlzID0gMjtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBtYXhEYXlzOyBpICs9IDEpIHtcclxuICAgIGxldCBkYXlTZWxlY3RvciA9IGAuZGF5LSR7aX0tZm9yZWNhc3QtY2FyZCA+IGRpdmA7XHJcblxyXG4gICAgbGV0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtkYXlTZWxlY3Rvcn0gPiAuZm9yZWNhc3QtaWNvbmApO1xyXG4gICAgbGV0IGxvd0hpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2RheVNlbGVjdG9yfSA+IC5mb3JlY2FzdC1sb3ctaGlnaGApO1xyXG4gICAgbGV0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgJHtkYXlTZWxlY3Rvcn0gPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC5yYWluLWljb25gLFxyXG4gICAgKTtcclxuICAgIGxldCBzbm93Q2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7ZGF5U2VsZWN0b3J9ID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAuc25vdy1pY29uYCxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IGRheURhdGEgPSBkYXlzRm9yZWNhc3REYXRhW2ldO1xyXG5cclxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGRheXNGb3JlY2FzdERhdGFbaV0uZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgbG93SGlnaC50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5Lm1pbnRlbXBfY30gLyAke2RheXNGb3JlY2FzdERhdGFbaV0uZGF5Lm1heHRlbXBfY31gO1xyXG4gICAgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xyXG4gICAgc25vd0NoYW5jZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgO1xyXG5cclxuICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHN1bnJpc2VUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5yaXNlLXRpbWVcIik7XHJcbiAgICAgIGNvbnN0IHN1bnNldFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC10aW1lXCIpO1xyXG4gICAgICBjb25zdCBjdXJyZW50TG93SGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG93LWhpZ2gtdGVtcFwiKTtcclxuICAgICAgY29uc3QgY3VycmVudFJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItcmFpbi1jaGFuY2VcIik7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTbm93Q2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXNub3ctY2hhbmNlXCIpO1xyXG5cclxuICAgICAgc3VucmlzZVRpbWUudGV4dENvbnRlbnQgPSBgJHtkYXlEYXRhLmFzdHJvLnN1bnJpc2V9YDtcclxuICAgICAgc3Vuc2V0VGltZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuYXN0cm8uc3Vuc2V0fWA7XHJcbiAgICAgIGN1cnJlbnRMb3dIaWdoLnRleHRDb250ZW50ID0gbG93SGlnaC50ZXh0Q29udGVudDtcclxuICAgICAgY3VycmVudFJhaW5DaGFuY2UudGV4dENvbnRlbnQgPSByYWluQ2hhbmNlLnRleHRDb250ZW50O1xyXG4gICAgICBjdXJyZW50U25vd0NoYW5jZS50ZXh0Q29udGVudCA9IHNub3dDaGFuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBFeHRyYWN0IGN1cnJlbnQgd2VhdGhlciBkZXRhaWxzIGFuZCBhZGQgaXQgdG8gcmVsZXZhbnQgZWxlbWVudHMgb2YgdGhlIHBhZ2VcclxuZnVuY3Rpb24gZmlsbFdlYXRoZXJEZXRhaWxzKGRldGFpbHNEYXRhKSB7XHJcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtZmVlbHMtbGlrZVwiKTtcclxuICBjb25zdCB1diA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsLXV2XCIpO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtaHVtaWRpdHlcIik7XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsLXByZWNpcGl0YXRpb25cIik7XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtd2luZC1zcGVlZFwiKTtcclxuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtd2luZC1kaXJlY3Rpb25cIik7XHJcblxyXG4gIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGAke2RldGFpbHNEYXRhLmZlZWxzbGlrZV9jfVxcdXtCMH1gO1xyXG4gIHV2LnRleHRDb250ZW50ID0gZGV0YWlsc0RhdGEudXY7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtkZXRhaWxzRGF0YS5odW1pZGl0eX0lYDtcclxuICBwcmVjaXBpdGF0aW9uLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsc0RhdGEucHJlY2lwX21tfSBtbWA7XHJcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsc0RhdGEud2luZF9rcGh9IGttL2hgO1xyXG4gIHdpbmREaXJlY3Rpb24udGV4dENvbnRlbnQgPSBkZXRhaWxzRGF0YS53aW5kX2RpcjtcclxufVxyXG5cclxuLy8gRXh0cmFjdCBob3VybHkgZm9yZWNhc3QgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsSG91cmx5Rm9yZWNhc3QoaG91cmx5Rm9yZWNhc3REYXRhKSB7XHJcbiAgY29uc3QgbWF4SG91ciA9IDIzO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IG1heEhvdXI7IGkgKz0gMSkge1xyXG4gICAgbGV0IGhvdXJTZWxlY3RvciA9IGAuaG91ci0ke2l9YDtcclxuXHJcbiAgICBsZXQgaG91cmx5VGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7aG91clNlbGVjdG9yfSA+IC5ob3VybHktdGltZWApO1xyXG4gICAgbGV0IGhvdXJseUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgJHtob3VyU2VsZWN0b3J9ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uYCxcclxuICAgICk7XHJcbiAgICBsZXQgaG91cmx5VGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAke2hvdXJTZWxlY3Rvcn0gPiAuaG91cmx5LXRlbXBlcmF0dXJlYCxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IGhvdXJEYXRhID0gaG91cmx5Rm9yZWNhc3REYXRhLmhvdXJbaV07XHJcblxyXG4gICAgaG91cmx5VGltZS50ZXh0Q29udGVudCA9IGhvdXJEYXRhLnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgaG91cmx5SWNvbi5zcmMgPSBob3VyRGF0YS5jb25kaXRpb24uaWNvbjtcclxuICAgIGhvdXJseVRlbXAudGV4dENvbnRlbnQgPSBgJHtob3VyRGF0YS50ZW1wX2N9XFx1e0IwfWA7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBhZGRHaWYodXJsKSB7XHJcbi8vICAgY29uc3QgZ2lmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5naWYtY29udGFpbmVyID4gaW1nXCIpO1xyXG4vLyAgIGdpZi5zcmMgPSB1cmw7XHJcbi8vIH1cclxuXHJcbmZ1bmN0aW9uIG1hcmtDdXJyZW50SG91cihjdXJyZW50VGltZSkge1xyXG4gIGNvbnN0IGhvdXJseVRpbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3VybHktdGltZVwiKTtcclxuXHJcbiAgaG91cmx5VGltZXMuZm9yRWFjaCgodGltZSkgPT4ge1xyXG4gICAgY29uc3QgaG91cmx5Q2FyZCA9IHRpbWUucGFyZW50RWxlbWVudDtcclxuICAgIGlmIChwYXJzZUludCh0aW1lLnRleHRDb250ZW50KSA9PT0gcGFyc2VJbnQoY3VycmVudFRpbWUpKSB7XHJcbiAgICAgIGhvdXJseUNhcmQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnQtaG91clwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhvdXJseUNhcmQuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnQtaG91clwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuY29uc3Qgd2VhdGhlckljb25zID0ge1xyXG4gIExJR0hUUkFJTjogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzI5Ni5wbmdcIixcclxuICBNSVNUOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvZGF5LzE0My5wbmdcIixcclxuICBGT0c6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9uaWdodC8yNDgucG5nXCIsXHJcbiAgU1VOTlk6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9kYXkvMTEzLnBuZ1wiLFxyXG4gIE9WRVJDQVNUOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvbmlnaHQvMTIyLnBuZ1wiLFxyXG4gIExJR0hURFJJWlpMRTogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzI2Ni5wbmdcIixcclxuICBMSUdIVFNOT1c6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9uaWdodC8zMjYucG5nXCIsXHJcbn07XHJcblxyXG5mdW5jdGlvbiBhZGRJY29ucygpIHtcclxuICBjb25zdCBzdW5yaXNlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS1pY29uXCIpO1xyXG4gIGNvbnN0IHN1bnNldEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC1pY29uXCIpO1xyXG4gIGNvbnN0IHJhaW5JY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFpbi1pY29uXCIpO1xyXG4gIGNvbnN0IHNub3dJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc25vdy1pY29uXCIpO1xyXG5cclxuICBzdW5yaXNlSWNvbi5zcmMgPSBkYXlUaW1lO1xyXG4gIHN1bnNldEljb24uc3JjID0gbmlnaHRUaW1lO1xyXG4gIHJhaW5JY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHJhaW47XHJcbiAgfSk7XHJcbiAgc25vd0ljb25zLmZvckVhY2goKGljb24pID0+IHtcclxuICAgIGljb24uc3JjID0gc25vdztcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBmaWxsTG9jYXRpb25JbmZvLFxyXG4gIGZpbGxDdXJyZW50V2VhdGhlckluZm8sXHJcbiAgZmlsbDNEYXlGb3JlY2FzdCxcclxuICBmaWxsSG91cmx5Rm9yZWNhc3QsXHJcbiAgYWRkSWNvbnMsXHJcbn07XHJcbiIsImltcG9ydCBhZGRJbXBlcmlhbERhdGEgZnJvbSBcIi4uL2ltcGVyaWFsXCI7XHJcbmltcG9ydCB7IGdldExvY2F0aW9uV2VhdGhlckRhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcblxyXG4vLyBJbmRpY2F0ZSBhbiBlcnJvciBpbiB0aGUgc2VhcmNoXHJcbmZ1bmN0aW9uIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIGVycm9yKSB7XHJcbiAgY29uc3Qgc2VhcmNoQmFyRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uICsgLmVycm9yLW1lc3NhZ2VcIik7XHJcblxyXG4gIHNlYXJjaEJhckVycm9yLnRleHRDb250ZW50ID0gZXJyb3I7XHJcbiAgc2VhcmNoQmFyLmNsYXNzTGlzdC5hZGQoXCJmaWVsZC1lcnJvclwiKTtcclxufVxyXG5cclxuLy8gSW5kaWNhdGUgbm8gZXJyb3IgaW4gdGhlIHNlYXJjaFxyXG5mdW5jdGlvbiByZW1vdmVTZWFyY2hFcnJvcihzZWFyY2hCYXIpIHtcclxuICBzZWFyY2hCYXIuY2xhc3NMaXN0LnJlbW92ZShcImZpZWxkLWVycm9yXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXNlU2VhcmNoQmFyKCkge1xyXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XHJcbiAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvblwiKTtcclxuXHJcbiAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHNlYXJjaEJhci52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcclxuICAgICAgY29uc3QgZXJyb3IgPSBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIVwiO1xyXG5cclxuICAgICAgZGlzcGxheVNlYXJjaEVycm9yKHNlYXJjaEJhciwgZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdW5pdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidW5pdHNcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0TG9jYXRpb25XZWF0aGVyRGF0YShzZWFyY2hCYXIudmFsdWUpLmNhdGNoKFxyXG4gICAgICAgIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgZGlzcGxheVNlYXJjaEVycm9yKHNlYXJjaEJhciwgZXJyb3IpO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgcmVtb3ZlU2VhcmNoRXJyb3Ioc2VhcmNoQmFyKTtcclxuICAgICAgYWRkSW1wZXJpYWxEYXRhKGRhdGEsIHVuaXRzKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdlbmVyYWwgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcbioge1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbn1cclxuXHJcbmJvZHkge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHdpZHRoOiAxMDB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcclxuXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmZvcm0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcclxufVxyXG5cclxuLmZvcm0tZmllbGQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogOHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5zZWFyY2hiYXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi51bml0LW9wdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxufVxyXG5cclxuLmZpZWxkLWVycm9yIHtcclxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDAsIDAsIDAuMDQxKTtcclxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGNvbG9yOiByZ2IoMjUyLCA2MiwgNjIpO1xyXG4gICAgZm9udC1zaXplOiAwLjhyZW07XHJcbn1cclxuXHJcbmJ1dHRvbiB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi53ZWF0aGVyLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMXJlbTtcclxuXHJcbiAgICB3aWR0aDogODB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcblxyXG4gICAgcGFkZGluZzogMXJlbTtcclxuXHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbi5yb3ctMSB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xyXG4gICAgY29sdW1uLWdhcDogMXJlbTtcclxufVxyXG5cclxuLnJvdy0zIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAzZnI7XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ucm93LTMge1xyXG5cclxufVxyXG5cclxuLnN1YnNlY3Rpb24taGVhZGVyIHtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XHJcbn1cclxuXHJcbi5sb2NhdGlvbi1kZXRhaWxzLFxyXG4uc3VuLWluZm8sXHJcbi53ZWF0aGVyLWRlc2NyaXB0aW9uLFxyXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSWNvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5yYWluLWljb24sXHJcbi5zbm93LWljb24sXHJcbi5zdW5yaXNlLWljb24sXHJcbi5zdW5zZXQtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDIwcHg7XHJcbiAgICB3aWR0aDogMjBweDtcclxufVxyXG5cclxuLmljb24tdGV4dC1wYWlyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi53ZWF0aGVyLWljb24ge1xyXG4gICAgaGVpZ2h0OiA1OHB4O1xyXG4gICAgd2lkdGg6IDU4cHg7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1pY29uIHtcclxuICAgIGhlaWdodDogNDZweDtcclxuICAgIHdpZHRoOiA0NnB4O1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWljb24ge1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgd2lkdGg6IDMwcHg7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMb2NhdGlvbiBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5sb2NhdGlvbi1pbmZvLWNvbnRhaW5lciB7XHJcblxyXG59XHJcblxyXG4uY2l0eS1uYW1lLFxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxufSBcclxuXHJcbi5jdXJyZW50LXRlbXAge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdpZiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaHJlZSBEYXkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgNWZyIDFmcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMC4ycmVtIDFyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgRGV0YWlscyBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uZGV0YWlsLWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG5cclxufVxyXG5cclxuLmRldGFpbC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIGhlaWdodDogMTAwJTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcclxufVxyXG5cclxuLmRldGFpbC1jYXJkID4gaDQge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuLyogTWFya3MgY3VycmVudCBob3VyICovXHJcbi5jdXJyZW50LWhvdXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgwKTtcclxuXHJcbiAgICBjb2xvcjogYmxhY2tcclxufVxyXG5cclxuLmhvdXJseS10aW1lIHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7RUFJRTtBQUNGO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjs7SUFFbkIsWUFBWTtJQUNaLGFBQWE7O0lBRWIsc0JBQXNCOztJQUV0QixZQUFZO0FBQ2hCOztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2Is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LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEdlbmVyYWwgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcbioge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcm0tZmllbGQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gcmVwZWF0KDIsIDFmcik7XFxyXFxuICAgIGdhcDogOHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VhcmNoYmFyIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjA0MSk7XFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tZXNzYWdlIHtcXHJcXG4gICAgY29sb3I6IHJnYigyNTIsIDYyLCA2Mik7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLndlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgICB3aWR0aDogODB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG5cXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTEge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcXHJcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdy0zIHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnN1YnNlY3Rpb24taGVhZGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxvY2F0aW9uLWRldGFpbHMsXFxyXFxuLnN1bi1pbmZvLFxcclxcbi53ZWF0aGVyLWRlc2NyaXB0aW9uLFxcclxcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogSWNvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnJhaW4taWNvbixcXHJcXG4uc25vdy1pY29uLFxcclxcbi5zdW5yaXNlLWljb24sXFxyXFxuLnN1bnNldC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tdGV4dC1wYWlyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNThweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA0NnB4O1xcclxcbiAgICB3aWR0aDogNDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBMb2NhdGlvbiBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmNpdHktbmFtZSxcXHJcXG4uY291bnRyeS1uYW1lIHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmNpdHktbmFtZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogODBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvdW50cnktbmFtZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBDdXJyZW50IFdlYXRoZXIgSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcXHJcXG59IFxcclxcblxcclxcbi5jdXJyZW50LXRlbXAge1xcclxcbiAgICBmb250LXNpemU6IDgwcHg7XFxyXFxufVxcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogR2lmIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEN1cnJlbnQgRGV0YWlscyBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmN1cnJlbnQtZGV0YWlscy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5kZXRhaWwtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5kZXRhaWwtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XFxyXFxufVxcclxcblxcclxcbi5kZXRhaWwtY2FyZCA+IGg0IHtcXHJcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBIb3VybHkgRm9yZWNhc3QgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufSBcXHJcXG5cXHJcXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDgsIDFmcik7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyIGF1dG87XFxyXFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuLyogTWFya3MgY3VycmVudCBob3VyICovXFxyXFxuLmN1cnJlbnQtaG91ciB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MCk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiBibGFja1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5LXRpbWUge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgeyBnZXRMb2NhdGlvbldlYXRoZXJEYXRhIH0gZnJvbSBcIi4vZGF0YVwiO1xyXG5pbXBvcnQgaW5pdGlhbGlzZVNlYXJjaEJhciwgeyBpbml0YWxpc2VTZWFyY2hCYXIgfSBmcm9tIFwiLi9mb3JtXCI7XHJcbmltcG9ydCB7IGFkZEljb25zIH0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uXCI7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5pbml0aWFsaXNlU2VhcmNoQmFyKCk7XHJcbmFkZEljb25zKCk7XHJcbiJdLCJuYW1lcyI6WyJhZGRJbXBlcmlhbERhdGEiLCJkYXRhIiwidW5pdHMiLCJub25Vbml0VGV4dERhdGEiLCJzZWxlY3RvciIsImxvY2F0aW9uIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImFzdHJvIiwic3VucmlzZSIsInN1bnNldCIsImRheSIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwiZGFpbHlfY2hhbmNlX29mX3Nub3ciLCJjdXJyZW50IiwiY29uZGl0aW9uIiwidGV4dCIsInV2IiwiaHVtaWRpdHkiLCJ3aW5kX2RpciIsInVuaXRUZXh0RGF0YSIsIm1ldHJpYyIsInRlbXBfYyIsImltcGVyaWFsIiwidGVtcF9mIiwiZmVlbHNsaWtlX2MiLCJmZWVsc2xpa2VfZiIsInByZWNpcF9tbSIsInByZWNpcF9pbiIsIndpbmRfa3BoIiwid2luZF9tcGgiLCJtaW50ZW1wX2MiLCJtYXh0ZW1wX2MiLCJtaW50ZW1wX2YiLCJtYXh0ZW1wX2YiLCJob3VyIiwiaWNvbkRhdGEiLCJpY29uIiwiZm9yRWFjaCIsImRhdGFFbGVtIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGV4dENvbnRlbnQiLCJpY29uRWxlbSIsInNyYyIsImZpbGxMb2NhdGlvbkluZm8iLCJmaWxsQ3VycmVudFdlYXRoZXJJbmZvIiwiZmlsbDNEYXlGb3JlY2FzdCIsImZpbGxIb3VybHlGb3JlY2FzdCIsImFkZEdpZiIsImdldExvY2F0aW9uV2VhdGhlckRhdGEiLCJyZXNwb25zZSIsImZldGNoIiwid2VhdGhlckFwaUtleSIsInN0YXR1cyIsIlByb21pc2UiLCJyZWplY3QiLCJqc29uIiwiZXJyb3IiLCJkYXlUaW1lIiwibmlnaHRUaW1lIiwicmFpbiIsInNub3ciLCJsb2NhdGlvbkRhdGEiLCJjaXR5TmFtZSIsImNvdW50cnlOYW1lIiwibG9jYWxUaW1lIiwibG9jYWxEYXRlIiwibWFya0N1cnJlbnRIb3VyIiwiY3VycmVudERhdGEiLCJ0ZW1wIiwiZGVzY3JpcHRpb24iLCJ3ZWF0aGVySWNvbiIsImZpbGxXZWF0aGVyRGV0YWlscyIsImRheXNGb3JlY2FzdERhdGEiLCJtYXhEYXlzIiwiaSIsImRheVNlbGVjdG9yIiwibG93SGlnaCIsInJhaW5DaGFuY2UiLCJzbm93Q2hhbmNlIiwiZGF5RGF0YSIsInN1bnJpc2VUaW1lIiwic3Vuc2V0VGltZSIsImN1cnJlbnRMb3dIaWdoIiwiY3VycmVudFJhaW5DaGFuY2UiLCJjdXJyZW50U25vd0NoYW5jZSIsImRldGFpbHNEYXRhIiwiZmVlbHNMaWtlIiwicHJlY2lwaXRhdGlvbiIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJob3VybHlGb3JlY2FzdERhdGEiLCJtYXhIb3VyIiwiaG91clNlbGVjdG9yIiwiaG91cmx5VGltZSIsImhvdXJseUljb24iLCJob3VybHlUZW1wIiwiaG91ckRhdGEiLCJ0aW1lIiwiY3VycmVudFRpbWUiLCJob3VybHlUaW1lcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJob3VybHlDYXJkIiwicGFyZW50RWxlbWVudCIsInBhcnNlSW50IiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwid2VhdGhlckljb25zIiwiTElHSFRSQUlOIiwiTUlTVCIsIkZPRyIsIlNVTk5ZIiwiT1ZFUkNBU1QiLCJMSUdIVERSSVpaTEUiLCJMSUdIVFNOT1ciLCJhZGRJY29ucyIsInN1bnJpc2VJY29uIiwic3Vuc2V0SWNvbiIsInJhaW5JY29ucyIsInNub3dJY29ucyIsImRpc3BsYXlTZWFyY2hFcnJvciIsInNlYXJjaEJhciIsInNlYXJjaEJhckVycm9yIiwicmVtb3ZlU2VhcmNoRXJyb3IiLCJpbml0aWFsaXNlU2VhcmNoQmFyIiwic3VibWl0QnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInZhbGlkaXR5IiwidmFsdWVNaXNzaW5nIiwidmFsdWUiLCJjYXRjaCIsImNvbnNvbGUiLCJsb2ciLCJpbml0YWxpc2VTZWFyY2hCYXIiXSwic291cmNlUm9vdCI6IiJ9