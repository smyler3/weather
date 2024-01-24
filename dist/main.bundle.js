/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not recognised!");
    }
    extractWeatherData(response);
  } catch (error) {
    return Promise.reject(error);
  }
}
async function extractWeatherData(response) {
  const data = await response.json();
  console.log(data);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillHourlyForecast)(data.forecast.forecastday[0]);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillLocationInfo)(data.location);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillCurrentWeatherInfo)(data.current);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fill3DayForecast)(data.forecast.forecastday);
}
const apiKey = "ed56e1bd01c548178dd145408242201";


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
    hourlyTemp.textContent = `${hourData.temp_c}\u{B0}`;

    // TODO: Mark current hour
  }
}
function markCurrentHour(currentTime) {
  const hourlyTimes = document.querySelectorAll(".hourly-time");
  hourlyTimes.forEach(time => {
    const hourlyCard = time.parentElement;
    console.log(parseInt(time.textContent) === parseInt(currentTime));
    if (parseInt(time.textContent) === parseInt(currentTime)) {
      hourlyCard.classList.add("current-hour");
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
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ "./src/data.js");

function initialiseSearchBar() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  const searchBarError = document.querySelector("#location + .error-message");
  function displaySearchError(error) {
    searchBarError.textContent = error;
    searchBar.classList.add("field-error");
  }
  function removeSearchError() {
    searchBar.classList.remove("field-error");
  }
  submitBtn.addEventListener("click", e => {
    e.preventDefault();
    // Data is valid
    if (searchBar.validity.valueMissing) {
      // Display an error
      const error = "Please enter a value!";
      displaySearchError(error);
    } else {
      removeSearchError();
      (0,_data__WEBPACK_IMPORTED_MODULE_0__.getLocationWeatherData)(searchBar.value).catch(error => {
        displaySearchError(error);
      });
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
    display: grid;
    grid-template-rows: repeat(2, auto) 2fr 1fr;
    grid-template-columns: repeat(2, 3fr) 2fr;
    row-gap: 1rem;
    column-gap: 1rem;

    width: 80vw;
    height: 100vh;

    padding: 1rem;
    
    /* border: 1px solid black; */

    font-size: 20px;
}

/* Row 1 */
.location-info-container {
    grid-area: 1 / 1 / 2 / 2;
}

.current-weather-container {
    grid-area: 1 / 2 / 2 / 3;
} 

.gif-container {
    grid-area: 1 / 3 / 2 / 4;
}

/* Row 2 */
.three-day-forecast-container {
    grid-area: 2 / 1 / 3 / -1;
}

/* Row 3 */
.current-details-container {
    grid-area: 3 / 1 / 4 / 2;
}

.hourly-forecast-info-container {
    grid-area: 3 / 2 / 4 / -1;
}

/* Row 4 */
form {
    grid-area: 4 / 1 / -1 / -1;
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

/*
 * ------------------------------------------------------------
 * Location Information Styling
 * ------------------------------------------------------------
 */

.location-info-container {

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
    display: flex;
    flex-direction: column;

    padding: 0 1rem;

    border-radius: 10px;
    background-color: rgba(0, 0, 0, 0.30);
}

.forecast-card-title {
    text-align: center;
    font-size: small;
}

.forecast-card-details {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    grid: repeat(4, 1fr) / repeat(6, 1fr);
    gap: 0.5rem;
}

.hourly-forecast-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;EAIE;AACF;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,sBAAsB;;IAEtB,YAAY;AAChB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,kBAAkB;;IAElB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,uCAAuC;IACvC,QAAQ;IACR,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,wCAAwC;IACxC,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,2CAA2C;IAC3C,yCAAyC;IACzC,aAAa;IACb,gBAAgB;;IAEhB,WAAW;IACX,aAAa;;IAEb,aAAa;;IAEb,6BAA6B;;IAE7B,eAAe;AACnB;;AAEA,UAAU;AACV;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA,UAAU;AACV;IACI,yBAAyB;AAC7B;;AAEA,UAAU;AACV;IACI,wBAAwB;AAC5B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,UAAU;AACV;IACI,0BAA0B;AAC9B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;IAII,aAAa;IACb,mBAAmB;IACnB,SAAS;AACb;;AAEA;;;;EAIE;;AAEF;;;;IAII,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;;AAEA;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;AACA;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;;IAEtB,eAAe;;IAEf,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;;AAEf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,YAAY;;IAEZ,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;EAIE;;CAED;IACG,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;AACf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,mBAAmB;IACnB,qCAAqC;AACzC;AACA,uBAAuB;AACvB;IACI,2CAA2C;;IAE3C;AACJ;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: white;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 8px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.field-error {\r\n    border-color: red;\r\n    background-color: rgba(255, 0, 0, 0.041);\r\n    outline: 1px solid red;\r\n}\r\n\r\n.error-message {\r\n    color: rgb(252, 62, 62);\r\n    font-size: 0.8rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: grid;\r\n    grid-template-rows: repeat(2, auto) 2fr 1fr;\r\n    grid-template-columns: repeat(2, 3fr) 2fr;\r\n    row-gap: 1rem;\r\n    column-gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n    \r\n    /* border: 1px solid black; */\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n/* Row 1 */\r\n.location-info-container {\r\n    grid-area: 1 / 1 / 2 / 2;\r\n}\r\n\r\n.current-weather-container {\r\n    grid-area: 1 / 2 / 2 / 3;\r\n} \r\n\r\n.gif-container {\r\n    grid-area: 1 / 3 / 2 / 4;\r\n}\r\n\r\n/* Row 2 */\r\n.three-day-forecast-container {\r\n    grid-area: 2 / 1 / 3 / -1;\r\n}\r\n\r\n/* Row 3 */\r\n.current-details-container {\r\n    grid-area: 3 / 1 / 4 / 2;\r\n}\r\n\r\n.hourly-forecast-info-container {\r\n    grid-area: 3 / 2 / 4 / -1;\r\n}\r\n\r\n/* Row 4 */\r\nform {\r\n    grid-area: 4 / 1 / -1 / -1;\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n\r\n    padding: 0 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n}\r\n\r\n.forecast-card-details {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(4, 1fr) / repeat(6, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n/* Marks current hour */\r\n.current-hour {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: black\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLG1GQUFtRixLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLFdBQVcsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxhQUFhLFdBQVcsV0FBVyxXQUFXLGFBQWEsV0FBVyxPQUFPLFVBQVUsS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sVUFBVSxLQUFLLFlBQVksT0FBTyxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFVBQVUsS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sUUFBUSxVQUFVLFlBQVksV0FBVyxNQUFNLFFBQVEsTUFBTSxRQUFRLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxRQUFRLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLFFBQVEsTUFBTSxLQUFLLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sUUFBUSxNQUFNLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlB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ckJMLDBEQUFRLENBQUMsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbU1hbmlwdWxhdGlvbi5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGZpbGxMb2NhdGlvbkluZm8sXHJcbiAgZmlsbEN1cnJlbnRXZWF0aGVySW5mbyxcclxuICBmaWxsM0RheUZvcmVjYXN0LFxyXG4gIGZpbGxIb3VybHlGb3JlY2FzdCxcclxufSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGdldExvY2F0aW9uV2VhdGhlckRhdGEobG9jYXRpb24pIHtcclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7YXBpS2V5fSZxPSR7bG9jYXRpb259JmRheXM9M2AsXHJcbiAgICApO1xyXG5cclxuICAgIC8vIEludmFsaWQgbG9jYXRpb25cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBub3QgcmVjb2duaXNlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgZXh0cmFjdFdlYXRoZXJEYXRhKHJlc3BvbnNlKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICB9XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RXZWF0aGVyRGF0YShyZXNwb25zZSkge1xyXG4gIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbiAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgZmlsbEhvdXJseUZvcmVjYXN0KGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0pO1xyXG4gIGZpbGxMb2NhdGlvbkluZm8oZGF0YS5sb2NhdGlvbik7XHJcbiAgZmlsbEN1cnJlbnRXZWF0aGVySW5mbyhkYXRhLmN1cnJlbnQpO1xyXG4gIGZpbGwzRGF5Rm9yZWNhc3QoZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheSk7XHJcbn1cclxuXHJcbmNvbnN0IGFwaUtleSA9IFwiZWQ1NmUxYmQwMWM1NDgxNzhkZDE0NTQwODI0MjIwMVwiO1xyXG5cclxuZXhwb3J0IHsgZ2V0TG9jYXRpb25XZWF0aGVyRGF0YSB9O1xyXG4iLCJpbXBvcnQgZGF5VGltZSBmcm9tIFwiLi9hc3NldHMvZGF5VGltZS5wbmdcIjtcclxuaW1wb3J0IG5pZ2h0VGltZSBmcm9tIFwiLi9hc3NldHMvbmlnaHRUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgcmFpbiBmcm9tIFwiLi9hc3NldHMvcmFpbi5wbmdcIjtcclxuaW1wb3J0IHNub3cgZnJvbSBcIi4vYXNzZXRzL3Nub3cucG5nXCI7XHJcblxyXG4vLyBFeHRyYWN0IGxvY2F0aW9uIGluZm9ybWF0aW9uIGFuZCBhZGQgaXQgdG8gcmVsYXRlZCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsTG9jYXRpb25JbmZvKGxvY2F0aW9uRGF0YSkge1xyXG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XHJcbiAgY29uc3QgY291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnktbmFtZVwiKTtcclxuICBjb25zdCBsb2NhbFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2FsLXRpbWVcIik7XHJcbiAgY29uc3QgbG9jYWxEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhbC1kYXRlXCIpO1xyXG5cclxuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0YS5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgY291bnRyeU5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGEuY291bnRyeTtcclxuICBbbG9jYWxEYXRlLnRleHRDb250ZW50LCBsb2NhbFRpbWUudGV4dENvbnRlbnRdID1cclxuICAgIGxvY2F0aW9uRGF0YS5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpO1xyXG5cclxuICBtYXJrQ3VycmVudEhvdXIobG9jYWxUaW1lLnRleHRDb250ZW50KTtcclxufVxyXG5cclxuLy8gRXh0cmFjdCBjdXJyZW50IHdlYXRoZXIgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsQ3VycmVudFdlYXRoZXJJbmZvKGN1cnJlbnREYXRhKSB7XHJcbiAgY29uc3QgdGVtcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY3VycmVudC10ZW1wXCIpO1xyXG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb25cIik7XHJcbiAgY29uc3Qgd2VhdGhlckljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItaWNvblwiKTtcclxuXHJcbiAgdGVtcC50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhLnRlbXBfYztcclxuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbi50ZXh0O1xyXG4gIHdlYXRoZXJJY29uLnNyYyA9IGN1cnJlbnREYXRhLmNvbmRpdGlvbi5pY29uO1xyXG4gIGZpbGxXZWF0aGVyRGV0YWlscyhjdXJyZW50RGF0YSk7XHJcbn1cclxuXHJcbi8vIEV4dHJhY3QgMyBkYXkgZm9yZWNhc3QgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsM0RheUZvcmVjYXN0KGRheXNGb3JlY2FzdERhdGEpIHtcclxuICBjb25zdCBtYXhEYXlzID0gMjtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8PSBtYXhEYXlzOyBpICs9IDEpIHtcclxuICAgIGxldCBkYXlTZWxlY3RvciA9IGAuZGF5LSR7aX0tZm9yZWNhc3QtY2FyZCA+IGRpdmA7XHJcblxyXG4gICAgbGV0IHdlYXRoZXJJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtkYXlTZWxlY3Rvcn0gPiAuZm9yZWNhc3QtaWNvbmApO1xyXG4gICAgbGV0IGxvd0hpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2RheVNlbGVjdG9yfSA+IC5mb3JlY2FzdC1sb3ctaGlnaGApO1xyXG4gICAgbGV0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgJHtkYXlTZWxlY3Rvcn0gPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC5yYWluLWljb25gLFxyXG4gICAgKTtcclxuICAgIGxldCBzbm93Q2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7ZGF5U2VsZWN0b3J9ID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAuc25vdy1pY29uYCxcclxuICAgICk7XHJcblxyXG4gICAgbGV0IGRheURhdGEgPSBkYXlzRm9yZWNhc3REYXRhW2ldO1xyXG5cclxuICAgIHdlYXRoZXJJY29uLnNyYyA9IGRheXNGb3JlY2FzdERhdGFbaV0uZGF5LmNvbmRpdGlvbi5pY29uO1xyXG4gICAgbG93SGlnaC50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5Lm1pbnRlbXBfY30gLyAke2RheXNGb3JlY2FzdERhdGFbaV0uZGF5Lm1heHRlbXBfY31gO1xyXG4gICAgcmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgO1xyXG4gICAgc25vd0NoYW5jZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgO1xyXG5cclxuICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgIGNvbnN0IHN1bnJpc2VUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5yaXNlLXRpbWVcIik7XHJcbiAgICAgIGNvbnN0IHN1bnNldFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC10aW1lXCIpO1xyXG4gICAgICBjb25zdCBjdXJyZW50TG93SGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubG93LWhpZ2gtdGVtcFwiKTtcclxuICAgICAgY29uc3QgY3VycmVudFJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndlYXRoZXItcmFpbi1jaGFuY2VcIik7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTbm93Q2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXNub3ctY2hhbmNlXCIpO1xyXG5cclxuICAgICAgc3VucmlzZVRpbWUudGV4dENvbnRlbnQgPSBgJHtkYXlEYXRhLmFzdHJvLnN1bnJpc2V9YDtcclxuICAgICAgc3Vuc2V0VGltZS50ZXh0Q29udGVudCA9IGAke2RheURhdGEuYXN0cm8uc3Vuc2V0fWA7XHJcbiAgICAgIGN1cnJlbnRMb3dIaWdoLnRleHRDb250ZW50ID0gbG93SGlnaC50ZXh0Q29udGVudDtcclxuICAgICAgY3VycmVudFJhaW5DaGFuY2UudGV4dENvbnRlbnQgPSByYWluQ2hhbmNlLnRleHRDb250ZW50O1xyXG4gICAgICBjdXJyZW50U25vd0NoYW5jZS50ZXh0Q29udGVudCA9IHNub3dDaGFuY2UudGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBFeHRyYWN0IGN1cnJlbnQgd2VhdGhlciBkZXRhaWxzIGFuZCBhZGQgaXQgdG8gcmVsZXZhbnQgZWxlbWVudHMgb2YgdGhlIHBhZ2VcclxuZnVuY3Rpb24gZmlsbFdlYXRoZXJEZXRhaWxzKGRldGFpbHNEYXRhKSB7XHJcbiAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtZmVlbHMtbGlrZVwiKTtcclxuICBjb25zdCB1diA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsLXV2XCIpO1xyXG4gIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtaHVtaWRpdHlcIik7XHJcbiAgY29uc3QgcHJlY2lwaXRhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsLXByZWNpcGl0YXRpb25cIik7XHJcbiAgY29uc3Qgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtd2luZC1zcGVlZFwiKTtcclxuICBjb25zdCB3aW5kRGlyZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtd2luZC1kaXJlY3Rpb25cIik7XHJcblxyXG4gIGZlZWxzTGlrZS50ZXh0Q29udGVudCA9IGAke2RldGFpbHNEYXRhLmZlZWxzbGlrZV9jfVxcdXtCMH1gO1xyXG4gIHV2LnRleHRDb250ZW50ID0gZGV0YWlsc0RhdGEudXY7XHJcbiAgaHVtaWRpdHkudGV4dENvbnRlbnQgPSBgJHtkZXRhaWxzRGF0YS5odW1pZGl0eX0lYDtcclxuICBwcmVjaXBpdGF0aW9uLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsc0RhdGEucHJlY2lwX21tfSBtbWA7XHJcbiAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsc0RhdGEud2luZF9rcGh9IGttL2hgO1xyXG4gIHdpbmREaXJlY3Rpb24udGV4dENvbnRlbnQgPSBkZXRhaWxzRGF0YS53aW5kX2RpcjtcclxufVxyXG5cclxuLy8gRXh0cmFjdCBob3VybHkgZm9yZWNhc3QgaW5mb3JtYXRpb24gYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsSG91cmx5Rm9yZWNhc3QoaG91cmx5Rm9yZWNhc3REYXRhKSB7XHJcbiAgY29uc3QgbWF4SG91ciA9IDIzO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IG1heEhvdXI7IGkgKz0gMSkge1xyXG4gICAgbGV0IGhvdXJTZWxlY3RvciA9IGAuaG91ci0ke2l9YDtcclxuICAgIGxldCBob3VybHlUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtob3VyU2VsZWN0b3J9ID4gLmhvdXJseS10aW1lYCk7XHJcbiAgICBsZXQgaG91cmx5SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAke2hvdXJTZWxlY3Rvcn0gPiAuaG91cmx5LWZvcmVjYXN0LWljb25gLFxyXG4gICAgKTtcclxuICAgIGxldCBob3VybHlUZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7aG91clNlbGVjdG9yfSA+IC5ob3VybHktdGVtcGVyYXR1cmVgLFxyXG4gICAgKTtcclxuICAgIGxldCBob3VyRGF0YSA9IGhvdXJseUZvcmVjYXN0RGF0YS5ob3VyW2ldO1xyXG5cclxuICAgIGhvdXJseVRpbWUudGV4dENvbnRlbnQgPSBob3VyRGF0YS50aW1lLnNwbGl0KFwiIFwiKVsxXTtcclxuICAgIGhvdXJseVRlbXAudGV4dENvbnRlbnQgPSBgJHtob3VyRGF0YS50ZW1wX2N9XFx1e0IwfWA7XHJcblxyXG4gICAgLy8gVE9ETzogTWFyayBjdXJyZW50IGhvdXJcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcmtDdXJyZW50SG91cihjdXJyZW50VGltZSkge1xyXG4gIGNvbnN0IGhvdXJseVRpbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3VybHktdGltZVwiKTtcclxuXHJcbiAgaG91cmx5VGltZXMuZm9yRWFjaCgodGltZSkgPT4ge1xyXG4gICAgY29uc3QgaG91cmx5Q2FyZCA9IHRpbWUucGFyZW50RWxlbWVudDtcclxuICAgIGNvbnNvbGUubG9nKHBhcnNlSW50KHRpbWUudGV4dENvbnRlbnQpID09PSBwYXJzZUludChjdXJyZW50VGltZSkpO1xyXG4gICAgaWYgKHBhcnNlSW50KHRpbWUudGV4dENvbnRlbnQpID09PSBwYXJzZUludChjdXJyZW50VGltZSkpIHtcclxuICAgICAgaG91cmx5Q2FyZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1ob3VyXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG5jb25zdCB3ZWF0aGVySWNvbnMgPSB7XHJcbiAgTElHSFRSQUlOOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvbmlnaHQvMjk2LnBuZ1wiLFxyXG4gIE1JU1Q6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9kYXkvMTQzLnBuZ1wiLFxyXG4gIEZPRzogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzI0OC5wbmdcIixcclxuICBTVU5OWTogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L2RheS8xMTMucG5nXCIsXHJcbiAgT1ZFUkNBU1Q6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9uaWdodC8xMjIucG5nXCIsXHJcbiAgTElHSFREUklaWkxFOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvbmlnaHQvMjY2LnBuZ1wiLFxyXG4gIExJR0hUU05PVzogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzMyNi5wbmdcIixcclxufTtcclxuXHJcbmZ1bmN0aW9uIGFkZEljb25zKCkge1xyXG4gIGNvbnN0IHN1bnJpc2VJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5yaXNlLWljb25cIik7XHJcbiAgY29uc3Qgc3Vuc2V0SWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3Vuc2V0LWljb25cIik7XHJcbiAgY29uc3QgcmFpbkljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5yYWluLWljb25cIik7XHJcbiAgY29uc3Qgc25vd0ljb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zbm93LWljb25cIik7XHJcblxyXG4gIHN1bnJpc2VJY29uLnNyYyA9IGRheVRpbWU7XHJcbiAgc3Vuc2V0SWNvbi5zcmMgPSBuaWdodFRpbWU7XHJcbiAgcmFpbkljb25zLmZvckVhY2goKGljb24pID0+IHtcclxuICAgIGljb24uc3JjID0gcmFpbjtcclxuICB9KTtcclxuICBzbm93SWNvbnMuZm9yRWFjaCgoaWNvbikgPT4ge1xyXG4gICAgaWNvbi5zcmMgPSBzbm93O1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQge1xyXG4gIGZpbGxMb2NhdGlvbkluZm8sXHJcbiAgZmlsbEN1cnJlbnRXZWF0aGVySW5mbyxcclxuICBmaWxsM0RheUZvcmVjYXN0LFxyXG4gIGZpbGxIb3VybHlGb3JlY2FzdCxcclxuICBhZGRJY29ucyxcclxufTtcclxuIiwiaW1wb3J0IHsgZ2V0TG9jYXRpb25XZWF0aGVyRGF0YSB9IGZyb20gXCIuL2RhdGFcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGluaXRpYWxpc2VTZWFyY2hCYXIoKSB7XHJcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcclxuICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhckVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbiArIC5lcnJvci1tZXNzYWdlXCIpO1xyXG5cclxuICBmdW5jdGlvbiBkaXNwbGF5U2VhcmNoRXJyb3IoZXJyb3IpIHtcclxuICAgIHNlYXJjaEJhckVycm9yLnRleHRDb250ZW50ID0gZXJyb3I7XHJcbiAgICBzZWFyY2hCYXIuY2xhc3NMaXN0LmFkZChcImZpZWxkLWVycm9yXCIpO1xyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gcmVtb3ZlU2VhcmNoRXJyb3IoKSB7XHJcbiAgICBzZWFyY2hCYXIuY2xhc3NMaXN0LnJlbW92ZShcImZpZWxkLWVycm9yXCIpO1xyXG4gIH1cclxuXHJcbiAgc3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgLy8gRGF0YSBpcyB2YWxpZFxyXG4gICAgaWYgKHNlYXJjaEJhci52YWxpZGl0eS52YWx1ZU1pc3NpbmcpIHtcclxuICAgICAgLy8gRGlzcGxheSBhbiBlcnJvclxyXG4gICAgICBjb25zdCBlcnJvciA9IFwiUGxlYXNlIGVudGVyIGEgdmFsdWUhXCI7XHJcbiAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZW1vdmVTZWFyY2hFcnJvcigpO1xyXG4gICAgICBnZXRMb2NhdGlvbldlYXRoZXJEYXRhKHNlYXJjaEJhci52YWx1ZSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgZGlzcGxheVNlYXJjaEVycm9yKGVycm9yKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYC8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBHZW5lcmFsIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG4qIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcblxyXG4gICAgY29sb3I6IHdoaXRlO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogU2VhcmNoIEZvcm0gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG5mb3JtIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtIDJyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuXHJcbi5mb3JtLWZpZWxkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gcmVwZWF0KDIsIDFmcik7XHJcbiAgICBnYXA6IDhweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uc2VhcmNoYmFyIHtcclxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG59XHJcblxyXG4udW5pdC1vcHRpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5maWVsZC1lcnJvciB7XHJcbiAgICBib3JkZXItY29sb3I6IHJlZDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjA0MSk7XHJcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmVkO1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZSB7XHJcbiAgICBjb2xvcjogcmdiKDI1MiwgNjIsIDYyKTtcclxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogV2VhdGhlciBJbmZvcm1hdGlvbiBMYXlvdXQgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ud2VhdGhlci1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIGF1dG8pIDJmciAxZnI7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAzZnIpIDJmcjtcclxuICAgIHJvdy1nYXA6IDFyZW07XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG5cclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG4gICAgXHJcbiAgICAvKiBib3JkZXI6IDFweCBzb2xpZCBibGFjazsgKi9cclxuXHJcbiAgICBmb250LXNpemU6IDIwcHg7XHJcbn1cclxuXHJcbi8qIFJvdyAxICovXHJcbi5sb2NhdGlvbi1pbmZvLWNvbnRhaW5lciB7XHJcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XHJcbn1cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGdyaWQtYXJlYTogMSAvIDIgLyAyIC8gMztcclxufSBcclxuXHJcbi5naWYtY29udGFpbmVyIHtcclxuICAgIGdyaWQtYXJlYTogMSAvIDMgLyAyIC8gNDtcclxufVxyXG5cclxuLyogUm93IDIgKi9cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jb250YWluZXIge1xyXG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIDMgLyAtMTtcclxufVxyXG5cclxuLyogUm93IDMgKi9cclxuLmN1cnJlbnQtZGV0YWlscy1jb250YWluZXIge1xyXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAyO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGdyaWQtYXJlYTogMyAvIDIgLyA0IC8gLTE7XHJcbn1cclxuXHJcbi8qIFJvdyA0ICovXHJcbmZvcm0ge1xyXG4gICAgZ3JpZC1hcmVhOiA0IC8gMSAvIC0xIC8gLTE7XHJcbn1cclxuXHJcbi5zdWJzZWN0aW9uLWhlYWRlciB7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG59XHJcblxyXG4ubG9jYXRpb24tZGV0YWlscyxcclxuLnN1bi1pbmZvLFxyXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEljb24gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ucmFpbi1pY29uLFxyXG4uc25vdy1pY29uLFxyXG4uc3VucmlzZS1pY29uLFxyXG4uc3Vuc2V0LWljb24ge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbn1cclxuXHJcbi5pY29uLXRleHQtcGFpciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4ud2VhdGhlci1pY29uIHtcclxuICAgIGhlaWdodDogNThweDtcclxuICAgIHdpZHRoOiA1OHB4O1xyXG59XHJcblxyXG4uZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICB3aWR0aDogNDZweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcclxuXHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxufSBcclxuXHJcbi5jdXJyZW50LXRlbXAge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdpZiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaHJlZSBEYXkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICBwYWRkaW5nOiAwIDFyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDdXJyZW50IERldGFpbHMgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLmRldGFpbC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDIsIDFmcik7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuXHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCA+IGg0IHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBIb3VybHkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4gLmhvdXJseS1mb3JlY2FzdC1pbmZvLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLmhvdXJseS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQ6IHJlcGVhdCg0LCAxZnIpIC8gcmVwZWF0KDYsIDFmcik7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLmhvdXJseS1mb3JlY2FzdC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzApO1xyXG59XHJcbi8qIE1hcmtzIGN1cnJlbnQgaG91ciAqL1xyXG4uY3VycmVudC1ob3VyIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MCk7XHJcblxyXG4gICAgY29sb3I6IGJsYWNrXHJcbn1cclxuXHJcbi5ob3VybHktdGltZSB7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBOzs7O0VBSUU7QUFDRjtJQUNJLHNCQUFzQjtJQUN0QixTQUFTO0lBQ1QsVUFBVTtBQUNkOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7O0lBRW5CLFlBQVk7SUFDWixhQUFhOztJQUViLHNCQUFzQjs7SUFFdEIsWUFBWTtBQUNoQjs7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MkM7O0lBRTNDO0FBQ0o7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHZW5lcmFsIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG4qIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcblxcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogU2VhcmNoIEZvcm0gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbmZvcm0ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nOiAxcmVtIDJyZW07XFxyXFxuXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XFxyXFxufVxcclxcblxcclxcbi5mb3JtLWZpZWxkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIHJlcGVhdCgyLCAxZnIpO1xcclxcbiAgICBnYXA6IDhweDtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxuICAgIGhlaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnNlYXJjaGJhciB7XFxyXFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgICBwYWRkaW5nOiA4cHg7XFxyXFxufVxcclxcblxcclxcbi51bml0LW9wdGlvbiB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5maWVsZC1lcnJvciB7XFxyXFxuICAgIGJvcmRlci1jb2xvcjogcmVkO1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC4wNDEpO1xcclxcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmVkO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3ItbWVzc2FnZSB7XFxyXFxuICAgIGNvbG9yOiByZ2IoMjUyLCA2MiwgNjIpO1xcclxcbiAgICBmb250LXNpemU6IDAuOHJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogV2VhdGhlciBJbmZvcm1hdGlvbiBMYXlvdXQgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIGF1dG8pIDJmciAxZnI7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDNmcikgMmZyO1xcclxcbiAgICByb3ctZ2FwOiAxcmVtO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgICB3aWR0aDogODB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG4gICAgXFxyXFxuICAgIC8qIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrOyAqL1xcclxcblxcclxcbiAgICBmb250LXNpemU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi8qIFJvdyAxICovXFxyXFxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIGdyaWQtYXJlYTogMSAvIDIgLyAyIC8gMztcXHJcXG59IFxcclxcblxcclxcbi5naWYtY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMyAvIDIgLyA0O1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSb3cgMiAqL1xcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAyIC8gMSAvIDMgLyAtMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogUm93IDMgKi9cXHJcXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XFxyXFxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMjtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1pbmZvLWNvbnRhaW5lciB7XFxyXFxuICAgIGdyaWQtYXJlYTogMyAvIDIgLyA0IC8gLTE7XFxyXFxufVxcclxcblxcclxcbi8qIFJvdyA0ICovXFxyXFxuZm9ybSB7XFxyXFxuICAgIGdyaWQtYXJlYTogNCAvIDEgLyAtMSAvIC0xO1xcclxcbn1cXHJcXG5cXHJcXG4uc3Vic2VjdGlvbi1oZWFkZXIge1xcclxcbiAgICBmb250LXNpemU6IGxhcmdlO1xcclxcbn1cXHJcXG5cXHJcXG4ubG9jYXRpb24tZGV0YWlscyxcXHJcXG4uc3VuLWluZm8sXFxyXFxuLndlYXRoZXItZGVzY3JpcHRpb24sXFxyXFxuLnByZWNpcGl0YXRpb24taW5mbyB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBJY29uIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4ucmFpbi1pY29uLFxcclxcbi5zbm93LWljb24sXFxyXFxuLnN1bnJpc2UtaWNvbixcXHJcXG4uc3Vuc2V0LWljb24ge1xcclxcbiAgICBoZWlnaHQ6IDIwcHg7XFxyXFxuICAgIHdpZHRoOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uaWNvbi10ZXh0LXBhaXIge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ud2VhdGhlci1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA1OHB4O1xcclxcbiAgICB3aWR0aDogNThweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWljb24ge1xcclxcbiAgICBoZWlnaHQ6IDQ2cHg7XFxyXFxuICAgIHdpZHRoOiA0NnB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4ubG9jYXRpb24taW5mby1jb250YWluZXIge1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uY2l0eS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY291bnRyeS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmN1cnJlbnQtd2VhdGhlci1jb250YWluZXIge1xcclxcbn0gXFxyXFxuXFxyXFxuLmN1cnJlbnQtdGVtcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogODBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHaWYgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogVGhyZWUgRGF5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDAgMXJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBEZXRhaWxzIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkID4gaDQge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDQsIDFmcikgLyByZXBlYXQoNiwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzApO1xcclxcbn1cXHJcXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cXHJcXG4uY3VycmVudC1ob3VyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgwKTtcXHJcXG5cXHJcXG4gICAgY29sb3I6IGJsYWNrXFxyXFxufVxcclxcblxcclxcbi5ob3VybHktdGltZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGdldExvY2F0aW9uV2VhdGhlckRhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCBpbml0aWFsaXNlU2VhcmNoQmFyLCB7IGluaXRhbGlzZVNlYXJjaEJhciB9IGZyb20gXCIuL2Zvcm1cIjtcclxuaW1wb3J0IHsgYWRkSWNvbnMgfSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmluaXRpYWxpc2VTZWFyY2hCYXIoKTtcclxuYWRkSWNvbnMoKTtcclxuIl0sIm5hbWVzIjpbImZpbGxMb2NhdGlvbkluZm8iLCJmaWxsQ3VycmVudFdlYXRoZXJJbmZvIiwiZmlsbDNEYXlGb3JlY2FzdCIsImZpbGxIb3VybHlGb3JlY2FzdCIsImdldExvY2F0aW9uV2VhdGhlckRhdGEiLCJsb2NhdGlvbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJhcGlLZXkiLCJzdGF0dXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZXh0cmFjdFdlYXRoZXJEYXRhIiwiZXJyb3IiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJmb3JlY2FzdCIsImZvcmVjYXN0ZGF5IiwiY3VycmVudCIsImRheVRpbWUiLCJuaWdodFRpbWUiLCJyYWluIiwic25vdyIsImxvY2F0aW9uRGF0YSIsImNpdHlOYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY291bnRyeU5hbWUiLCJsb2NhbFRpbWUiLCJsb2NhbERhdGUiLCJ0ZXh0Q29udGVudCIsIm5hbWUiLCJ0b1VwcGVyQ2FzZSIsImNvdW50cnkiLCJsb2NhbHRpbWUiLCJzcGxpdCIsIm1hcmtDdXJyZW50SG91ciIsImN1cnJlbnREYXRhIiwidGVtcCIsImRlc2NyaXB0aW9uIiwid2VhdGhlckljb24iLCJ0ZW1wX2MiLCJjb25kaXRpb24iLCJ0ZXh0Iiwic3JjIiwiaWNvbiIsImZpbGxXZWF0aGVyRGV0YWlscyIsImRheXNGb3JlY2FzdERhdGEiLCJtYXhEYXlzIiwiaSIsImRheVNlbGVjdG9yIiwibG93SGlnaCIsInJhaW5DaGFuY2UiLCJzbm93Q2hhbmNlIiwiZGF5RGF0YSIsImRheSIsIm1pbnRlbXBfYyIsIm1heHRlbXBfYyIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwiZGFpbHlfY2hhbmNlX29mX3Nub3ciLCJzdW5yaXNlVGltZSIsInN1bnNldFRpbWUiLCJjdXJyZW50TG93SGlnaCIsImN1cnJlbnRSYWluQ2hhbmNlIiwiY3VycmVudFNub3dDaGFuY2UiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJkZXRhaWxzRGF0YSIsImZlZWxzTGlrZSIsInV2IiwiaHVtaWRpdHkiLCJwcmVjaXBpdGF0aW9uIiwid2luZFNwZWVkIiwid2luZERpcmVjdGlvbiIsImZlZWxzbGlrZV9jIiwicHJlY2lwX21tIiwid2luZF9rcGgiLCJ3aW5kX2RpciIsImhvdXJseUZvcmVjYXN0RGF0YSIsIm1heEhvdXIiLCJob3VyU2VsZWN0b3IiLCJob3VybHlUaW1lIiwiaG91cmx5SWNvbiIsImhvdXJseVRlbXAiLCJob3VyRGF0YSIsImhvdXIiLCJ0aW1lIiwiY3VycmVudFRpbWUiLCJob3VybHlUaW1lcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiaG91cmx5Q2FyZCIsInBhcmVudEVsZW1lbnQiLCJwYXJzZUludCIsImNsYXNzTGlzdCIsImFkZCIsIndlYXRoZXJJY29ucyIsIkxJR0hUUkFJTiIsIk1JU1QiLCJGT0ciLCJTVU5OWSIsIk9WRVJDQVNUIiwiTElHSFREUklaWkxFIiwiTElHSFRTTk9XIiwiYWRkSWNvbnMiLCJzdW5yaXNlSWNvbiIsInN1bnNldEljb24iLCJyYWluSWNvbnMiLCJzbm93SWNvbnMiLCJpbml0aWFsaXNlU2VhcmNoQmFyIiwic3VibWl0QnRuIiwic2VhcmNoQmFyIiwic2VhcmNoQmFyRXJyb3IiLCJkaXNwbGF5U2VhcmNoRXJyb3IiLCJyZW1vdmVTZWFyY2hFcnJvciIsInJlbW92ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWxpZGl0eSIsInZhbHVlTWlzc2luZyIsInZhbHVlIiwiY2F0Y2giLCJpbml0YWxpc2VTZWFyY2hCYXIiXSwic291cmNlUm9vdCI6IiJ9