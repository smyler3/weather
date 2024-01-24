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
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillLocationInfo)(data.location);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillCurrentWeatherInfo)(data.current);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fill3DayForecast)(data.forecast.forecastday);
  (0,_domManipulation__WEBPACK_IMPORTED_MODULE_0__.fillHourlyForecast)(data.forecast.forecastday[0]);
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



// Extract location information and add it to related elements of the page
function fillLocationInfo(locationData) {
  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const localTime = document.querySelector(".local-time");
  const localDate = document.querySelector(".local-date");
  cityName.textContent = locationData.name.toUpperCase();
  countryName.textContent = locationData.country;
  [localDate.textContent, localTime.textContent] = locationData.localtime.split(" ");
}

// Extract current weather information and add it to relevant elements of the page
function fillCurrentWeatherInfo(currentData) {
  const temp = document.querySelector(".current-temp");
  const description = document.querySelector(".current-weather-description");
  const weatherIcon = document.querySelector(".weather-icon > img");
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
    let rain = document.querySelector(`${daySelector} > div > .forecast-rain-chance`);
    let snow = document.querySelector(`${daySelector} > div > .forecast-snow-chance`);
    let dayData = daysForecastData[i];
    lowHigh.textContent = `${dayData.day.mintemp_c} / ${daysForecastData[i].day.maxtemp_c}`;
    rain.textContent = `Rain: ${dayData.day.daily_chance_of_rain}%`;
    snow.textContent = `Snow: ${dayData.day.daily_chance_of_snow}%`;
    if (i === 0) {
      const sunriseTime = document.querySelector(".sunrise-time");
      const sunsetTime = document.querySelector(".sunset-time");
      const currentLowHigh = document.querySelector(".low-high-temp");
      const currentRainChance = document.querySelector(".weather-rain-chance");
      const currentSnowChance = document.querySelector(".weather-snow-chance");
      sunriseTime.textContent = `: ${dayData.astro.sunrise}`;
      sunsetTime.textContent = `: ${dayData.astro.sunset}`;
      currentLowHigh.textContent = lowHigh.textContent;
      currentRainChance.textContent = rain.textContent;
      currentSnowChance.textContent = snow.textContent;
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
const weatherIcons = {
  LIGHTRAIN: "//cdn.weatherapi.com/weather/64x64/night/296.png",
  MIST: "//cdn.weatherapi.com/weather/64x64/day/143.png",
  FOG: "//cdn.weatherapi.com/weather/64x64/night/248.png",
  SUNNY: "//cdn.weatherapi.com/weather/64x64/day/113.png",
  OVERCAST: "//cdn.weatherapi.com/weather/64x64/night/122.png",
  LIGHTDRIZZLE: "//cdn.weatherapi.com/weather/64x64/night/266.png",
  LIGHTSNOW: "//cdn.weatherapi.com/weather/64x64/night/326.png"
};
const dayNightIcons = {
  0: _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__,
  1: _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__
};
function addIcons() {
  const sunriseIcon = document.querySelector(".sunrise-icon > img");
  const sunsetIcon = document.querySelector(".sunset-icon > img");
  sunriseIcon.src = _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__;
  sunsetIcon.src = _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__;
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
    gap: 0.5rem;
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

.sunrise-icon,
.sunset-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 20px;
    width: 20px;

    overflow: hidden;
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

.weather-icon {
    height: 58px;
    width: 58px;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;EAIE;AACF;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,sBAAsB;;IAEtB,YAAY;AAChB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,kBAAkB;;IAElB,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,aAAa;IACb,uCAAuC;IACvC,QAAQ;IACR,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,wCAAwC;IACxC,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,2CAA2C;IAC3C,yCAAyC;IACzC,aAAa;IACb,gBAAgB;;IAEhB,WAAW;IACX,aAAa;;IAEb,aAAa;;IAEb,6BAA6B;;IAE7B,eAAe;AACnB;;AAEA,UAAU;AACV;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA;IACI,wBAAwB;AAC5B;;AAEA,UAAU;AACV;IACI,yBAAyB;AAC7B;;AAEA,UAAU;AACV;IACI,wBAAwB;AAC5B;;AAEA;IACI,yBAAyB;AAC7B;;AAEA,UAAU;AACV;IACI,0BAA0B;AAC9B;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;IAII,aAAa;IACb,mBAAmB;IACnB,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;;AAEA;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;;IAEvB,YAAY;IACZ,WAAW;;IAEX,gBAAgB;AACpB;;AAEA;;;;EAIE;;AAEF;AACA;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,sBAAsB;;IAEtB,eAAe;;IAEf,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;;AAEf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,YAAY;;IAEZ,mBAAmB;IACnB,qCAAqC;AACzC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;EAIE;;CAED;IACG,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;AACf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,mBAAmB;IACnB,qCAAqC;AACzC;AACA,uBAAuB;AACvB;IACI,2CAA2C;;IAE3C;AACJ;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: white;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 8px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.field-error {\r\n    border-color: red;\r\n    background-color: rgba(255, 0, 0, 0.041);\r\n    outline: 1px solid red;\r\n}\r\n\r\n.error-message {\r\n    color: rgb(252, 62, 62);\r\n    font-size: 0.8rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: grid;\r\n    grid-template-rows: repeat(2, auto) 2fr 1fr;\r\n    grid-template-columns: repeat(2, 3fr) 2fr;\r\n    row-gap: 1rem;\r\n    column-gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n    \r\n    /* border: 1px solid black; */\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n/* Row 1 */\r\n.location-info-container {\r\n    grid-area: 1 / 1 / 2 / 2;\r\n}\r\n\r\n.current-weather-container {\r\n    grid-area: 1 / 2 / 2 / 3;\r\n} \r\n\r\n.gif-container {\r\n    grid-area: 1 / 3 / 2 / 4;\r\n}\r\n\r\n/* Row 2 */\r\n.three-day-forecast-container {\r\n    grid-area: 2 / 1 / 3 / -1;\r\n}\r\n\r\n/* Row 3 */\r\n.current-details-container {\r\n    grid-area: 3 / 1 / 4 / 2;\r\n}\r\n\r\n.hourly-forecast-info-container {\r\n    grid-area: 3 / 2 / 4 / -1;\r\n}\r\n\r\n/* Row 4 */\r\nform {\r\n    grid-area: 4 / 1 / -1 / -1;\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 20px;\r\n    width: 20px;\r\n\r\n    overflow: hidden;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n\r\n    padding: 0 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n}\r\n\r\n.forecast-card-details {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(4, 1fr) / repeat(6, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(0, 0, 0, 0.30);\r\n}\r\n/* Marks current hour */\r\n.current-hour {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: black\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxtRkFBbUYsS0FBSyxLQUFLLFlBQVksV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxXQUFXLFdBQVcsYUFBYSxXQUFXLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLGNBQWMsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsYUFBYSxXQUFXLFdBQVcsV0FBVyxhQUFhLFdBQVcsT0FBTyxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFVBQVUsS0FBSyxZQUFZLE9BQU8sVUFBVSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxVQUFVLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLFFBQVEsVUFBVSxZQUFZLFdBQVcsTUFBTSxRQUFRLE1BQU0sTUFBTSxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLE1BQU0sVUFBVSxZQUFZLGNBQWMsV0FBVyxXQUFXLFlBQVksT0FBTyxRQUFRLE1BQU0sS0FBSyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxVQUFVLE1BQU0sUUFBUSxNQUFNLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxV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YS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9mb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgZmlsbExvY2F0aW9uSW5mbyxcclxuICBmaWxsQ3VycmVudFdlYXRoZXJJbmZvLFxyXG4gIGZpbGwzRGF5Rm9yZWNhc3QsXHJcbiAgZmlsbEhvdXJseUZvcmVjYXN0LFxyXG59IGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvblwiO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gZ2V0TG9jYXRpb25XZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxyXG4gICAgICBgaHR0cHM6Ly9hcGkud2VhdGhlcmFwaS5jb20vdjEvZm9yZWNhc3QuanNvbj9rZXk9JHthcGlLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcclxuICAgICk7XHJcblxyXG4gICAgLy8gSW52YWxpZCBsb2NhdGlvblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkxvY2F0aW9uIG5vdCByZWNvZ25pc2VkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBleHRyYWN0V2VhdGhlckRhdGEocmVzcG9uc2UpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gZXh0cmFjdFdlYXRoZXJEYXRhKHJlc3BvbnNlKSB7XHJcbiAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICBmaWxsTG9jYXRpb25JbmZvKGRhdGEubG9jYXRpb24pO1xyXG4gIGZpbGxDdXJyZW50V2VhdGhlckluZm8oZGF0YS5jdXJyZW50KTtcclxuICBmaWxsM0RheUZvcmVjYXN0KGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXkpO1xyXG4gIGZpbGxIb3VybHlGb3JlY2FzdChkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdKTtcclxufVxyXG5cclxuY29uc3QgYXBpS2V5ID0gXCJlZDU2ZTFiZDAxYzU0ODE3OGRkMTQ1NDA4MjQyMjAxXCI7XHJcblxyXG5leHBvcnQgeyBnZXRMb2NhdGlvbldlYXRoZXJEYXRhIH07XHJcbiIsImltcG9ydCBkYXlUaW1lIGZyb20gXCIuL2Fzc2V0cy9kYXlUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgbmlnaHRUaW1lIGZyb20gXCIuL2Fzc2V0cy9uaWdodFRpbWUucG5nXCI7XHJcblxyXG4vLyBFeHRyYWN0IGxvY2F0aW9uIGluZm9ybWF0aW9uIGFuZCBhZGQgaXQgdG8gcmVsYXRlZCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsTG9jYXRpb25JbmZvKGxvY2F0aW9uRGF0YSkge1xyXG4gIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XHJcbiAgY29uc3QgY291bnRyeU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdW50cnktbmFtZVwiKTtcclxuICBjb25zdCBsb2NhbFRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvY2FsLXRpbWVcIik7XHJcbiAgY29uc3QgbG9jYWxEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5sb2NhbC1kYXRlXCIpO1xyXG5cclxuICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGxvY2F0aW9uRGF0YS5uYW1lLnRvVXBwZXJDYXNlKCk7XHJcbiAgY291bnRyeU5hbWUudGV4dENvbnRlbnQgPSBsb2NhdGlvbkRhdGEuY291bnRyeTtcclxuICBbbG9jYWxEYXRlLnRleHRDb250ZW50LCBsb2NhbFRpbWUudGV4dENvbnRlbnRdID1cclxuICAgIGxvY2F0aW9uRGF0YS5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpO1xyXG59XHJcblxyXG4vLyBFeHRyYWN0IGN1cnJlbnQgd2VhdGhlciBpbmZvcm1hdGlvbiBhbmQgYWRkIGl0IHRvIHJlbGV2YW50IGVsZW1lbnRzIG9mIHRoZSBwYWdlXHJcbmZ1bmN0aW9uIGZpbGxDdXJyZW50V2VhdGhlckluZm8oY3VycmVudERhdGEpIHtcclxuICBjb25zdCB0ZW1wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jdXJyZW50LXRlbXBcIik7XHJcbiAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvblwiKTtcclxuICBjb25zdCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1pY29uID4gaW1nXCIpO1xyXG5cclxuICB0ZW1wLnRleHRDb250ZW50ID0gY3VycmVudERhdGEudGVtcF9jO1xyXG4gIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gY3VycmVudERhdGEuY29uZGl0aW9uLnRleHQ7XHJcbiAgd2VhdGhlckljb24uc3JjID0gY3VycmVudERhdGEuY29uZGl0aW9uLmljb247XHJcbiAgZmlsbFdlYXRoZXJEZXRhaWxzKGN1cnJlbnREYXRhKTtcclxufVxyXG5cclxuLy8gRXh0cmFjdCAzIGRheSBmb3JlY2FzdCBpbmZvcm1hdGlvbiBhbmQgYWRkIGl0IHRvIHJlbGV2YW50IGVsZW1lbnRzIG9mIHRoZSBwYWdlXHJcbmZ1bmN0aW9uIGZpbGwzRGF5Rm9yZWNhc3QoZGF5c0ZvcmVjYXN0RGF0YSkge1xyXG4gIGNvbnN0IG1heERheXMgPSAyO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDw9IG1heERheXM7IGkgKz0gMSkge1xyXG4gICAgbGV0IGRheVNlbGVjdG9yID0gYC5kYXktJHtpfS1mb3JlY2FzdC1jYXJkID4gZGl2YDtcclxuICAgIGxldCB3ZWF0aGVySWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7ZGF5U2VsZWN0b3J9ID4gLmZvcmVjYXN0LWljb25gKTtcclxuICAgIGxldCBsb3dIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtkYXlTZWxlY3Rvcn0gPiAuZm9yZWNhc3QtbG93LWhpZ2hgKTtcclxuICAgIGxldCByYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7ZGF5U2VsZWN0b3J9ID4gZGl2ID4gLmZvcmVjYXN0LXJhaW4tY2hhbmNlYCxcclxuICAgICk7XHJcbiAgICBsZXQgc25vdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAke2RheVNlbGVjdG9yfSA+IGRpdiA+IC5mb3JlY2FzdC1zbm93LWNoYW5jZWAsXHJcbiAgICApO1xyXG4gICAgbGV0IGRheURhdGEgPSBkYXlzRm9yZWNhc3REYXRhW2ldO1xyXG5cclxuICAgIGxvd0hpZ2gudGV4dENvbnRlbnQgPSBgJHtkYXlEYXRhLmRheS5taW50ZW1wX2N9IC8gJHtkYXlzRm9yZWNhc3REYXRhW2ldLmRheS5tYXh0ZW1wX2N9YDtcclxuICAgIHJhaW4udGV4dENvbnRlbnQgPSBgUmFpbjogJHtkYXlEYXRhLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYDtcclxuICAgIHNub3cudGV4dENvbnRlbnQgPSBgU25vdzogJHtkYXlEYXRhLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYDtcclxuXHJcbiAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICBjb25zdCBzdW5yaXNlVGltZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS10aW1lXCIpO1xyXG4gICAgICBjb25zdCBzdW5zZXRUaW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtdGltZVwiKTtcclxuICAgICAgY29uc3QgY3VycmVudExvd0hpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvdy1oaWdoLXRlbXBcIik7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRSYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53ZWF0aGVyLXJhaW4tY2hhbmNlXCIpO1xyXG4gICAgICBjb25zdCBjdXJyZW50U25vd0NoYW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1zbm93LWNoYW5jZVwiKTtcclxuXHJcbiAgICAgIHN1bnJpc2VUaW1lLnRleHRDb250ZW50ID0gYDogJHtkYXlEYXRhLmFzdHJvLnN1bnJpc2V9YDtcclxuICAgICAgc3Vuc2V0VGltZS50ZXh0Q29udGVudCA9IGA6ICR7ZGF5RGF0YS5hc3Ryby5zdW5zZXR9YDtcclxuICAgICAgY3VycmVudExvd0hpZ2gudGV4dENvbnRlbnQgPSBsb3dIaWdoLnRleHRDb250ZW50O1xyXG4gICAgICBjdXJyZW50UmFpbkNoYW5jZS50ZXh0Q29udGVudCA9IHJhaW4udGV4dENvbnRlbnQ7XHJcbiAgICAgIGN1cnJlbnRTbm93Q2hhbmNlLnRleHRDb250ZW50ID0gc25vdy50ZXh0Q29udGVudDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEV4dHJhY3QgY3VycmVudCB3ZWF0aGVyIGRldGFpbHMgYW5kIGFkZCBpdCB0byByZWxldmFudCBlbGVtZW50cyBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiBmaWxsV2VhdGhlckRldGFpbHMoZGV0YWlsc0RhdGEpIHtcclxuICBjb25zdCBmZWVsc0xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbC1mZWVscy1saWtlXCIpO1xyXG4gIGNvbnN0IHV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtdXZcIik7XHJcbiAgY29uc3QgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbC1odW1pZGl0eVwiKTtcclxuICBjb25zdCBwcmVjaXBpdGF0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWwtcHJlY2lwaXRhdGlvblwiKTtcclxuICBjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbC13aW5kLXNwZWVkXCIpO1xyXG4gIGNvbnN0IHdpbmREaXJlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbC13aW5kLWRpcmVjdGlvblwiKTtcclxuXHJcbiAgZmVlbHNMaWtlLnRleHRDb250ZW50ID0gYCR7ZGV0YWlsc0RhdGEuZmVlbHNsaWtlX2N9XFx1e0IwfWA7XHJcbiAgdXYudGV4dENvbnRlbnQgPSBkZXRhaWxzRGF0YS51djtcclxuICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke2RldGFpbHNEYXRhLmh1bWlkaXR5fSVgO1xyXG4gIHByZWNpcGl0YXRpb24udGV4dENvbnRlbnQgPSBgJHtkZXRhaWxzRGF0YS5wcmVjaXBfbW19IG1tYDtcclxuICB3aW5kU3BlZWQudGV4dENvbnRlbnQgPSBgJHtkZXRhaWxzRGF0YS53aW5kX2twaH0ga20vaGA7XHJcbiAgd2luZERpcmVjdGlvbi50ZXh0Q29udGVudCA9IGRldGFpbHNEYXRhLndpbmRfZGlyO1xyXG59XHJcblxyXG4vLyBFeHRyYWN0IGhvdXJseSBmb3JlY2FzdCBpbmZvcm1hdGlvbiBhbmQgYWRkIGl0IHRvIHJlbGV2YW50IGVsZW1lbnRzIG9mIHRoZSBwYWdlXHJcbmZ1bmN0aW9uIGZpbGxIb3VybHlGb3JlY2FzdChob3VybHlGb3JlY2FzdERhdGEpIHtcclxuICBjb25zdCBtYXhIb3VyID0gMjM7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPD0gbWF4SG91cjsgaSArPSAxKSB7XHJcbiAgICBsZXQgaG91clNlbGVjdG9yID0gYC5ob3VyLSR7aX1gO1xyXG4gICAgbGV0IGhvdXJseVRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke2hvdXJTZWxlY3Rvcn0gPiAuaG91cmx5LXRpbWVgKTtcclxuICAgIGxldCBob3VybHlJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCR7aG91clNlbGVjdG9yfSA+IC5ob3VybHktZm9yZWNhc3QtaWNvbmAsXHJcbiAgICApO1xyXG4gICAgbGV0IGhvdXJseVRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICBgJHtob3VyU2VsZWN0b3J9ID4gLmhvdXJseS10ZW1wZXJhdHVyZWAsXHJcbiAgICApO1xyXG4gICAgbGV0IGhvdXJEYXRhID0gaG91cmx5Rm9yZWNhc3REYXRhLmhvdXJbaV07XHJcblxyXG4gICAgaG91cmx5VGltZS50ZXh0Q29udGVudCA9IGhvdXJEYXRhLnRpbWUuc3BsaXQoXCIgXCIpWzFdO1xyXG4gICAgaG91cmx5VGVtcC50ZXh0Q29udGVudCA9IGAke2hvdXJEYXRhLnRlbXBfY31cXHV7QjB9YDtcclxuXHJcbiAgICAvLyBUT0RPOiBNYXJrIGN1cnJlbnQgaG91clxyXG4gIH1cclxufVxyXG5cclxuY29uc3Qgd2VhdGhlckljb25zID0ge1xyXG4gIExJR0hUUkFJTjogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzI5Ni5wbmdcIixcclxuICBNSVNUOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvZGF5LzE0My5wbmdcIixcclxuICBGT0c6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9uaWdodC8yNDgucG5nXCIsXHJcbiAgU1VOTlk6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9kYXkvMTEzLnBuZ1wiLFxyXG4gIE9WRVJDQVNUOiBcIi8vY2RuLndlYXRoZXJhcGkuY29tL3dlYXRoZXIvNjR4NjQvbmlnaHQvMTIyLnBuZ1wiLFxyXG4gIExJR0hURFJJWlpMRTogXCIvL2Nkbi53ZWF0aGVyYXBpLmNvbS93ZWF0aGVyLzY0eDY0L25pZ2h0LzI2Ni5wbmdcIixcclxuICBMSUdIVFNOT1c6IFwiLy9jZG4ud2VhdGhlcmFwaS5jb20vd2VhdGhlci82NHg2NC9uaWdodC8zMjYucG5nXCIsXHJcbn07XHJcblxyXG5jb25zdCBkYXlOaWdodEljb25zID0ge1xyXG4gIDA6IG5pZ2h0VGltZSxcclxuICAxOiBkYXlUaW1lLFxyXG59O1xyXG5cclxuZnVuY3Rpb24gYWRkSWNvbnMoKSB7XHJcbiAgY29uc3Qgc3VucmlzZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtaWNvbiA+IGltZ1wiKTtcclxuICBjb25zdCBzdW5zZXRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtaWNvbiA+IGltZ1wiKTtcclxuXHJcbiAgc3VucmlzZUljb24uc3JjID0gZGF5VGltZTtcclxuICBzdW5zZXRJY29uLnNyYyA9IG5pZ2h0VGltZTtcclxufVxyXG5cclxuZXhwb3J0IHtcclxuICBmaWxsTG9jYXRpb25JbmZvLFxyXG4gIGZpbGxDdXJyZW50V2VhdGhlckluZm8sXHJcbiAgZmlsbDNEYXlGb3JlY2FzdCxcclxuICBmaWxsSG91cmx5Rm9yZWNhc3QsXHJcbiAgYWRkSWNvbnMsXHJcbn07XHJcbiIsImltcG9ydCB7IGdldExvY2F0aW9uV2VhdGhlckRhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbml0aWFsaXNlU2VhcmNoQmFyKCkge1xyXG4gIGNvbnN0IHN1Ym1pdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJidXR0b25cIik7XHJcbiAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvblwiKTtcclxuICBjb25zdCBzZWFyY2hCYXJFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb24gKyAuZXJyb3ItbWVzc2FnZVwiKTtcclxuXHJcbiAgZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKGVycm9yKSB7XHJcbiAgICBzZWFyY2hCYXJFcnJvci50ZXh0Q29udGVudCA9IGVycm9yO1xyXG4gICAgc2VhcmNoQmFyLmNsYXNzTGlzdC5hZGQoXCJmaWVsZC1lcnJvclwiKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHJlbW92ZVNlYXJjaEVycm9yKCkge1xyXG4gICAgc2VhcmNoQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaWVsZC1lcnJvclwiKTtcclxuICB9XHJcblxyXG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIERhdGEgaXMgdmFsaWRcclxuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XHJcbiAgICAgIC8vIERpc3BsYXkgYW4gZXJyb3JcclxuICAgICAgY29uc3QgZXJyb3IgPSBcIlBsZWFzZSBlbnRlciBhIHZhbHVlIVwiO1xyXG4gICAgICBkaXNwbGF5U2VhcmNoRXJyb3IoZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVtb3ZlU2VhcmNoRXJyb3IoKTtcclxuICAgICAgZ2V0TG9jYXRpb25XZWF0aGVyRGF0YShzZWFyY2hCYXIudmFsdWUpLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2VuZXJhbCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuKiB7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG5cclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzApO1xyXG59XHJcblxyXG4uZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnNlYXJjaGJhciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLnVuaXQtb3B0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZmllbGQtZXJyb3Ige1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC4wNDEpO1xyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJlZDtcclxufVxyXG5cclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gICAgY29sb3I6IHJnYigyNTIsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFdlYXRoZXIgSW5mb3JtYXRpb24gTGF5b3V0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLndlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCBhdXRvKSAyZnIgMWZyO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgM2ZyKSAyZnI7XHJcbiAgICByb3ctZ2FwOiAxcmVtO1xyXG4gICAgY29sdW1uLWdhcDogMXJlbTtcclxuXHJcbiAgICB3aWR0aDogODB2dztcclxuICAgIGhlaWdodDogMTAwdmg7XHJcblxyXG4gICAgcGFkZGluZzogMXJlbTtcclxuICAgIFxyXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgYmxhY2s7ICovXHJcblxyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcblxyXG4vKiBSb3cgMSAqL1xyXG4ubG9jYXRpb24taW5mby1jb250YWluZXIge1xyXG4gICAgZ3JpZC1hcmVhOiAxIC8gMSAvIDIgLyAyO1xyXG59XHJcblxyXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XHJcbiAgICBncmlkLWFyZWE6IDEgLyAyIC8gMiAvIDM7XHJcbn0gXHJcblxyXG4uZ2lmLWNvbnRhaW5lciB7XHJcbiAgICBncmlkLWFyZWE6IDEgLyAzIC8gMiAvIDQ7XHJcbn1cclxuXHJcbi8qIFJvdyAyICovXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY29udGFpbmVyIHtcclxuICAgIGdyaWQtYXJlYTogMiAvIDEgLyAzIC8gLTE7XHJcbn1cclxuXHJcbi8qIFJvdyAzICovXHJcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcclxuICAgIGdyaWQtYXJlYTogMyAvIDEgLyA0IC8gMjtcclxufVxyXG5cclxuLmhvdXJseS1mb3JlY2FzdC1pbmZvLWNvbnRhaW5lciB7XHJcbiAgICBncmlkLWFyZWE6IDMgLyAyIC8gNCAvIC0xO1xyXG59XHJcblxyXG4vKiBSb3cgNCAqL1xyXG5mb3JtIHtcclxuICAgIGdyaWQtYXJlYTogNCAvIDEgLyAtMSAvIC0xO1xyXG59XHJcblxyXG4uc3Vic2VjdGlvbi1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRldGFpbHMsXHJcbi5zdW4taW5mbyxcclxuLndlYXRoZXItZGVzY3JpcHRpb24sXHJcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcclxuXHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLnN1bnJpc2UtaWNvbixcclxuLnN1bnNldC1pY29uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcblxyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxufSBcclxuXHJcbi5jdXJyZW50LXRlbXAge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLndlYXRoZXItaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDU4cHg7XHJcbiAgICB3aWR0aDogNThweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdpZiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaHJlZSBEYXkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuXHJcbiAgICBwYWRkaW5nOiAwIDFyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgRGV0YWlscyBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uZGV0YWlsLWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG5cclxufVxyXG5cclxuLmRldGFpbC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIGhlaWdodDogMTAwJTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcclxufVxyXG5cclxuLmRldGFpbC1jYXJkID4gaDQge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDQsIDFmcikgLyByZXBlYXQoNiwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zMCk7XHJcbn1cclxuLyogTWFya3MgY3VycmVudCBob3VyICovXHJcbi5jdXJyZW50LWhvdXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgwKTtcclxuXHJcbiAgICBjb2xvcjogYmxhY2tcclxufVxyXG5cclxuLmhvdXJseS10aW1lIHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7Ozs7RUFJRTtBQUNGO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjs7SUFFbkIsWUFBWTtJQUNaLGFBQWE7O0lBRWIsc0JBQXNCOztJQUV0QixZQUFZO0FBQ2hCOztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjs7SUFFbkIsa0JBQWtCOztJQUVsQixtQkFBbUI7SUFDbkIscUNBQXFDO0FBQ3pDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHVDQUF1QztJQUN2QyxRQUFRO0lBQ1IsV0FBVztJQUNYLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx1QkFBdUI7SUFDdkIsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSxpQkFBaUI7SUFDakIsd0NBQXdDO0lBQ3hDLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixpQkFBaUI7QUFDckI7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsZUFBZTtBQUNuQjs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLDJDQUEyQztJQUMzQyx5Q0FBeUM7SUFDekMsYUFBYTtJQUNiLGdCQUFnQjs7SUFFaEIsV0FBVztJQUNYLGFBQWE7O0lBRWIsYUFBYTs7SUFFYiw2QkFBNkI7O0lBRTdCLGVBQWU7QUFDbkI7O0FBRUEsVUFBVTtBQUNWO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBO0lBQ0ksd0JBQXdCO0FBQzVCOztBQUVBLFVBQVU7QUFDVjtJQUNJLHlCQUF5QjtBQUM3Qjs7QUFFQSxVQUFVO0FBQ1Y7SUFDSSx3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSx5QkFBeUI7QUFDN0I7O0FBRUEsVUFBVTtBQUNWO0lBQ0ksMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksZ0JBQWdCO0FBQ3BCOztBQUVBOzs7O0lBSUksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQixXQUFXO0FBQ2Y7O0FBRUE7Ozs7RUFJRTs7QUFFRjs7QUFFQTs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBOztJQUVJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsdUJBQXVCOztJQUV2QixZQUFZO0lBQ1osV0FBVzs7SUFFWCxnQkFBZ0I7QUFDcEI7O0FBRUE7Ozs7RUFJRTs7QUFFRjtBQUNBOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBOzs7O0VBSUU7O0FBRUY7Ozs7RUFJRTs7QUFFRjtJQUNJLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCOztJQUV0QixlQUFlOztJQUVmLG1CQUFtQjtJQUNuQixxQ0FBcUM7QUFDekM7O0FBRUE7SUFDSSxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLDhCQUE4QjtBQUNsQzs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7O0FBRWY7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix1QkFBdUI7O0lBRXZCLFlBQVk7O0lBRVosbUJBQW1CO0lBQ25CLHFDQUFxQztBQUN6Qzs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTs7OztFQUlFOztDQUVEO0lBQ0csYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1CO0lBQ25CLHVCQUF1Qjs7SUFFdkIsbUJBQW1CO0lBQ25CLHFDQUFxQztBQUN6QztBQUNBLHVCQUF1QjtBQUN2QjtJQUNJLDJDQUEyQzs7SUFFM0M7QUFDSjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEdlbmVyYWwgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcbioge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcm0tZmllbGQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gcmVwZWF0KDIsIDFmcik7XFxyXFxuICAgIGdhcDogOHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VhcmNoYmFyIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjA0MSk7XFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tZXNzYWdlIHtcXHJcXG4gICAgY29sb3I6IHJnYigyNTIsIDYyLCA2Mik7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLndlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMiwgYXV0bykgMmZyIDFmcjtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgM2ZyKSAyZnI7XFxyXFxuICAgIHJvdy1nYXA6IDFyZW07XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxuXFxyXFxuICAgIHdpZHRoOiA4MHZ3O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBwYWRkaW5nOiAxcmVtO1xcclxcbiAgICBcXHJcXG4gICAgLyogYm9yZGVyOiAxcHggc29saWQgYmxhY2s7ICovXFxyXFxuXFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLyogUm93IDEgKi9cXHJcXG4ubG9jYXRpb24taW5mby1jb250YWluZXIge1xcclxcbiAgICBncmlkLWFyZWE6IDEgLyAxIC8gMiAvIDI7XFxyXFxufVxcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAxIC8gMiAvIDIgLyAzO1xcclxcbn0gXFxyXFxuXFxyXFxuLmdpZi1jb250YWluZXIge1xcclxcbiAgICBncmlkLWFyZWE6IDEgLyAzIC8gMiAvIDQ7XFxyXFxufVxcclxcblxcclxcbi8qIFJvdyAyICovXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jb250YWluZXIge1xcclxcbiAgICBncmlkLWFyZWE6IDIgLyAxIC8gMyAvIC0xO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBSb3cgMyAqL1xcclxcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMSAvIDQgLyAyO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiAzIC8gMiAvIDQgLyAtMTtcXHJcXG59XFxyXFxuXFxyXFxuLyogUm93IDQgKi9cXHJcXG5mb3JtIHtcXHJcXG4gICAgZ3JpZC1hcmVhOiA0IC8gMSAvIC0xIC8gLTE7XFxyXFxufVxcclxcblxcclxcbi5zdWJzZWN0aW9uLWhlYWRlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XFxyXFxufVxcclxcblxcclxcbi5sb2NhdGlvbi1kZXRhaWxzLFxcclxcbi5zdW4taW5mbyxcXHJcXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogTG9jYXRpb24gSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5sb2NhdGlvbi1pbmZvLWNvbnRhaW5lciB7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5jaXR5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDgwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb3VudHJ5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5zdW5yaXNlLWljb24sXFxyXFxuLnN1bnNldC1pY29uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxuXFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBXZWF0aGVyIEluZm9ybWF0aW9uIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxufSBcXHJcXG5cXHJcXG4uY3VycmVudC10ZW1wIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ud2VhdGhlci1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA1OHB4O1xcclxcbiAgICB3aWR0aDogNThweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHaWYgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogVGhyZWUgRGF5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDAgMXJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBEZXRhaWxzIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkID4gaDQge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDQsIDFmcikgLyByZXBlYXQoNiwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMzApO1xcclxcbn1cXHJcXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cXHJcXG4uY3VycmVudC1ob3VyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgwKTtcXHJcXG5cXHJcXG4gICAgY29sb3I6IGJsYWNrXFxyXFxufVxcclxcblxcclxcbi5ob3VybHktdGltZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IGdldExvY2F0aW9uV2VhdGhlckRhdGEgfSBmcm9tIFwiLi9kYXRhXCI7XHJcbmltcG9ydCBpbml0aWFsaXNlU2VhcmNoQmFyLCB7IGluaXRhbGlzZVNlYXJjaEJhciB9IGZyb20gXCIuL2Zvcm1cIjtcclxuaW1wb3J0IHsgYWRkSWNvbnMgfSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmluaXRpYWxpc2VTZWFyY2hCYXIoKTtcclxuYWRkSWNvbnMoKTtcclxuIl0sIm5hbWVzIjpbImZpbGxMb2NhdGlvbkluZm8iLCJmaWxsQ3VycmVudFdlYXRoZXJJbmZvIiwiZmlsbDNEYXlGb3JlY2FzdCIsImZpbGxIb3VybHlGb3JlY2FzdCIsImdldExvY2F0aW9uV2VhdGhlckRhdGEiLCJsb2NhdGlvbiIsInJlc3BvbnNlIiwiZmV0Y2giLCJhcGlLZXkiLCJzdGF0dXMiLCJQcm9taXNlIiwicmVqZWN0IiwiZXh0cmFjdFdlYXRoZXJEYXRhIiwiZXJyb3IiLCJkYXRhIiwianNvbiIsImNvbnNvbGUiLCJsb2ciLCJjdXJyZW50IiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImRheVRpbWUiLCJuaWdodFRpbWUiLCJsb2NhdGlvbkRhdGEiLCJjaXR5TmFtZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvdW50cnlOYW1lIiwibG9jYWxUaW1lIiwibG9jYWxEYXRlIiwidGV4dENvbnRlbnQiLCJuYW1lIiwidG9VcHBlckNhc2UiLCJjb3VudHJ5IiwibG9jYWx0aW1lIiwic3BsaXQiLCJjdXJyZW50RGF0YSIsInRlbXAiLCJkZXNjcmlwdGlvbiIsIndlYXRoZXJJY29uIiwidGVtcF9jIiwiY29uZGl0aW9uIiwidGV4dCIsInNyYyIsImljb24iLCJmaWxsV2VhdGhlckRldGFpbHMiLCJkYXlzRm9yZWNhc3REYXRhIiwibWF4RGF5cyIsImkiLCJkYXlTZWxlY3RvciIsImxvd0hpZ2giLCJyYWluIiwic25vdyIsImRheURhdGEiLCJkYXkiLCJtaW50ZW1wX2MiLCJtYXh0ZW1wX2MiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93Iiwic3VucmlzZVRpbWUiLCJzdW5zZXRUaW1lIiwiY3VycmVudExvd0hpZ2giLCJjdXJyZW50UmFpbkNoYW5jZSIsImN1cnJlbnRTbm93Q2hhbmNlIiwiYXN0cm8iLCJzdW5yaXNlIiwic3Vuc2V0IiwiZGV0YWlsc0RhdGEiLCJmZWVsc0xpa2UiLCJ1diIsImh1bWlkaXR5IiwicHJlY2lwaXRhdGlvbiIsIndpbmRTcGVlZCIsIndpbmREaXJlY3Rpb24iLCJmZWVsc2xpa2VfYyIsInByZWNpcF9tbSIsIndpbmRfa3BoIiwid2luZF9kaXIiLCJob3VybHlGb3JlY2FzdERhdGEiLCJtYXhIb3VyIiwiaG91clNlbGVjdG9yIiwiaG91cmx5VGltZSIsImhvdXJseUljb24iLCJob3VybHlUZW1wIiwiaG91ckRhdGEiLCJob3VyIiwidGltZSIsIndlYXRoZXJJY29ucyIsIkxJR0hUUkFJTiIsIk1JU1QiLCJGT0ciLCJTVU5OWSIsIk9WRVJDQVNUIiwiTElHSFREUklaWkxFIiwiTElHSFRTTk9XIiwiZGF5TmlnaHRJY29ucyIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwiaW5pdGlhbGlzZVNlYXJjaEJhciIsInN1Ym1pdEJ0biIsInNlYXJjaEJhciIsInNlYXJjaEJhckVycm9yIiwiZGlzcGxheVNlYXJjaEVycm9yIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlU2VhcmNoRXJyb3IiLCJyZW1vdmUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsaWRpdHkiLCJ2YWx1ZU1pc3NpbmciLCJ2YWx1ZSIsImNhdGNoIiwiaW5pdGFsaXNlU2VhcmNoQmFyIl0sInNvdXJjZVJvb3QiOiIifQ==