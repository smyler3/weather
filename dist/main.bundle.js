/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/apiCalls.js":
/*!*************************!*\
  !*** ./src/apiCalls.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWeatherData)
/* harmony export */ });
/* harmony import */ var _domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulation/loadingBar */ "./src/domManipulation/loadingBar.js");


// Query to the weatherapi server
async function queryWeatherApi(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";

  // Delay for testing
  await new Promise(resolve => setTimeout(resolve, 20000));
  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`);
  return response;
}

// Timer to prevent hanging await operations
async function timeoutPromise() {
  const TIMEOUT_DURATION = 10000;
  const timeout = await new Promise((_, reject) => {
    setTimeout(() => {
      reject("Server response timed out!");
    }, TIMEOUT_DURATION);
  });
  return timeout;
}

// Try to recieve data from the weatherapi server
async function getWeatherData(location) {
  // Start loading bar animation
  (0,_domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_0__.renderLoadingBar)();
  const loadingBarInterval = setInterval(_domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_0__.moveLoadingBar, 100);
  try {
    const response = await Promise.race([queryWeatherApi(location), timeoutPromise()]);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not found!");
    }
    return response.json();
  } catch (error) {
    console.error("Error in weatherapi fetch:", error);
    return Promise.reject(error);
  } finally {
    // Remove loading bar animation
    (0,_domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_0__.hideLoadingBar)();
    clearInterval(loadingBarInterval);
  }
}

/***/ }),

/***/ "./src/domManipulation/errorMessages.js":
/*!**********************************************!*\
  !*** ./src/domManipulation/errorMessages.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displaySearchError: () => (/* binding */ displaySearchError),
/* harmony export */   initialiseSearchErrors: () => (/* binding */ initialiseSearchErrors),
/* harmony export */   removeSearchError: () => (/* binding */ removeSearchError)
/* harmony export */ });
function initialiseSearchErrors() {
  searchBar = document.querySelector("#location");
  searchBarError = document.querySelector("#location + .error-message");
}

// Indicate an error in the search
function displaySearchError(error) {
  searchBarError.textContent = error;
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.2)";
  searchBar.style.backgroundColor = "#ffc0cb";
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError() {
  searchBarError.textContent = "";
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.0)";
  searchBar.style.backgroundColor = "#ffffff";
  searchBar.classList.remove("field-error");
}
let searchBar = null;
let searchBarError = null;


/***/ }),

/***/ "./src/domManipulation/loadingBar.js":
/*!*******************************************!*\
  !*** ./src/domManipulation/loadingBar.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hideLoadingBar: () => (/* binding */ hideLoadingBar),
/* harmony export */   intialiseLoadingBar: () => (/* binding */ intialiseLoadingBar),
/* harmony export */   moveLoadingBar: () => (/* binding */ moveLoadingBar),
/* harmony export */   renderLoadingBar: () => (/* binding */ renderLoadingBar)
/* harmony export */ });
// Set up loading bar
function intialiseLoadingBar() {
  modal = document.querySelector(".modal");
}

// Show the loading bar on the screen
function renderLoadingBar() {
  modal.style.display = "flex";
}

// Remove the loading bar on the screen
function hideLoadingBar() {
  modal.style.display = "none";
}

// Move the loading bar through a step in the loading animation
function moveLoadingBar() {
  const LoadingBar = document.querySelector(".loading-bar");
  const lastSquare = LoadingBar.firstElementChild;
  LoadingBar.appendChild(lastSquare);
}
let modal = null;


/***/ }),

/***/ "./src/domManipulation/renderPageInfo.js":
/*!***********************************************!*\
  !*** ./src/domManipulation/renderPageInfo.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fillPageData)
/* harmony export */ });
/* harmony import */ var _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assets/dayTime.png */ "./src/assets/dayTime.png");
/* harmony import */ var _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/nightTime.png */ "./src/assets/nightTime.png");
/* harmony import */ var _assets_rain_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../assets/rain.png */ "./src/assets/rain.png");
/* harmony import */ var _assets_snow_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../assets/snow.png */ "./src/assets/snow.png");





// Mapping of weather conditions to colours that represent them
const weatherColorMapping = [{
  conditions: ["Sunny"],
  colour: "#5196d7"
}, {
  conditions: ["Clear"],
  colour: "#0d1730"
}, {
  conditions: ["Partly cloudy"],
  colour: "#89a1b8"
}, {
  conditions: ["Cloudy", "Overcast", "Mist", "Patchy rain possible", "Patchy snow possible", "Patchy sleet possible"],
  colour: "#6f809d"
}, {
  conditions: ["Thundery outbreaks possible", "Blowing snow", "Blizzard", "Freezing fog", "Patchy light drizzle", "Light drizzle", "Freezing drizzle", "Heavy freezing drizzle"],
  colour: "#121824"
}, {
  conditions: ["Fog"],
  colour: "#6f809d"
}, {
  conditions: ["Light freezing rain", "Moderate or heavy freezing rain", "Light sleet", "Moderate or heavy sleet"],
  colour: "#7a87aa"
}, {
  conditions: ["Patchy light snow", "Light snow", "Patchy moderate snow", "Moderate snow", "Patchy heavy snow", "Heavy snow"],
  colour: "#7a87aa"
}, {
  conditions: ["Ice pellets"],
  colour: "#6f809d"
}, {
  conditions: ["Light rain", "Moderate rain at times", "Moderate rain", "Heavy rain at times", "Heavy rain"],
  colour: "#546174"
}, {
  conditions: ["Light rain shower", "Moderate or heavy rain shower", "Torrential rain shower"],
  colour: "#546174"
}, {
  conditions: ["Light sleet showers", "Moderate or heavy sleet showers", "Light snow showers", "Moderate or heavy snow showers"],
  colour: "#7a87aa"
}, {
  conditions: ["Light showers of ice pellets", "Moderate or heavy showers of ice pellets"],
  colour: "#7a87aa"
}, {
  conditions: ["Patchy light rain with thunder", "Moderate or heavy rain with thunder", "Patchy light snow with thunder", "Moderate or heavy snow with thunder"],
  colour: "#121824"
}];

// Colour the page background based on current weather conditions
function colourBackground(condition) {
  const page = document.querySelector("body");
  weatherColorMapping.forEach(weatherGroup => {
    if (weatherGroup.conditions.includes(condition)) {
      page.style.backgroundColor = weatherGroup.colour;
    }
  });
}

// Mark the current time on the hourly forecast cards
function markCurrentHour(currentTime) {
  const hourlyTimes = document.querySelectorAll(".hourly-time");
  hourlyTimes.forEach(time => {
    const hourlyCard = time.parentElement;
    if (parseInt(time.textContent) === parseInt(currentTime)) {
      hourlyCard.classList.add("current-hour-card");
    } else {
      hourlyCard.classList.remove("current-hour-card");
    }
  });
}

// Add persistent icons to the page
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

// Fill the page with weather information
function fillPageData(data, units) {
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
    data: parseInt(data.location.localtime.split(" ")[1]) < 12 ? `${data.location.localtime.split(" ")[1]} AM` : `${parseInt(data.location.localtime.split(" ")[1].split(":")[0]) - 12}:${data.location.localtime.split(" ")[1].split(":")[1]} PM`
  }, {
    selector: ".local-date",
    data: new Date(data.location.localtime.split(" ")[0]).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "short",
      day: "numeric"
    })
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
    metric: `${data.current.temp_c}\u{B0}`,
    imperial: `${data.current.temp_f}\u{B0}`
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
  markCurrentHour(data.location.localtime.split(" ")[1]);
  addIcons();
  colourBackground(data.current.condition.text);
}

// function addGif(url) {
//   const gif = document.querySelector(".gif-container > img");
//   gif.src = url;
// }

/***/ }),

/***/ "./src/eventListeners.js":
/*!*******************************!*\
  !*** ./src/eventListeners.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ addSearchBarEventListener)
/* harmony export */ });
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiCalls */ "./src/apiCalls.js");
/* harmony import */ var _domManipulation_renderPageInfo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManipulation/renderPageInfo */ "./src/domManipulation/renderPageInfo.js");
/* harmony import */ var _domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domManipulation/errorMessages */ "./src/domManipulation/errorMessages.js");




// Query weatherapi based on searchbar input location
function addSearchBarEventListener() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";
      (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])(searchBar.value).then(data => {
        (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.removeSearchError)();
        (0,_domManipulation_renderPageInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(data, units);
      }).catch(error => {
        console.error("Error in getWeatherData:", error);
        (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(error);
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
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    /* Colours */
    --important-text: #ffffff;
    --context-text: #F5F7F7;
    --dark-important-text: #000000;
    --dark-context-text: #333333;
    --error-red: #ff0000;
    --loading-container-background: #494949;
    --info-card-background: rgba(255, 255, 255, 0.20);
    --highlight-info-card-background: rgba(255, 255, 255, 0.80);
    --dark-shadow: rgba(0, 0, 0, 0.8);

    /* Loading bar square size */
    --loading-square: 20px;
}

/*
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

    color: var(--important-text);
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

.subsection-header {
    font-size: large;
}

.location-datetime-details,
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
    padding: 0.5rem 1rem;

    background-color: var(--info-card-background);
    border-radius: 10px;
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

.location-datetime-details,
.sun-info {
    color: var(--context-text);
}

/*
 * ------------------------------------------------------------
 * Current Weather Forecast Styling
 * ------------------------------------------------------------
 */

.current-weather-container {
    padding: 0.5rem 1rem;

    background-color: var(--info-card-background);
    border-radius: 10px;
} 

.current-temp {
    font-size: 80px;
}

.current-weather-description {
    font-size: 50px;
}

.low-high-temp,
.precipitation-info {
    color: var(--context-text);
}

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
    background-color: var(--info-card-background);
}

.forecast-card-title {
    text-align: center;
    font-size: small;
    color: var(--context-text);
}

.forecast-card-details {
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    gap: 0.5rem;
}

.weather-rain-chance,
.weather-snow-chance {
    color: var(--context-text);
}

/*
 * ------------------------------------------------------------
 * Current Forecast Details Styling
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
    background-color: var(--info-card-background);
}

.detail-card > h4 {
    font-size: small;
    color: var(--context-text);
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
    background-color: var(--info-card-background);
}
/* Marks current hour */
.current-hour-card {
    background-color: var(--highlight-info-card-background);

    color: var(--dark-important-text);
}
.current-hour-card > .hourly-time {
    color: var(--dark-contrast-text);
}

.hourly-time {
    font-size: small;
    color: var(--context-text);
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
    background-color: var(--info-card-background);
}

.form-field {
    display: grid;
    grid-template-rows: auto repeat(2, 1fr);
    gap: 4px;
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
    gap: 0.2rem;
}

.unit-option > * {
    cursor: pointer;
}

.field-error {
    border-color: var(--error-red);
    outline: 1px solid var(--error-red);
}

.error-message {
    display: flex;
    align-items: center;

    padding-left: 10px;

    outline: 1px solid rgba(0, 0, 0, 0);

    color: white;
    font-weight: bolder;
    font-size: 1rem;
}

button {
    padding: 10px 20px;
    cursor: pointer;
}

/*
 * ------------------------------------------------------------
 * Load Bar Styling
 * ------------------------------------------------------------
 */

.modal {
    display: none;
    align-items: center;
    justify-content: center;

    position: fixed;
    z-index: 2;
    overflow: auto;

    width: 100%;
    height: 100%;

    background-color: var(--dark-shadow);
} 

.loading-container {
    display: grid;
    grid-template-rows: repeat(2, auto);

    padding: calc(var(--loading-square) * 1) calc(var(--loading-square) * 4);

    background-color: var(--loading-container-background);
} 

.loading-text-container {
    width: 100%;
}

.loading-bar {
    align-self: center;
    display: flex;
    flex-direction: row-reverse;

    width: calc(var(--loading-square) * 11);
    height: var(--loading-square);

    background-color: white;
    outline: 1px solid black;
} 

.load-square {
    width: var(--loading-square);
    height: var(--loading-square);

    background-color: white;
}
/* Styles the loading bar to appear to fade over time */
.load-square-1 {
    background-color: rgba(0, 102, 255, 1);
}
.load-square-2 {
    background-color: rgba(0, 102, 255, 0.9);
}
.load-square-3 {
    background-color: rgba(0, 102, 255, 0.8);
}
.load-square-4 {
    background-color: rgba(0, 102, 255, 0.7);
}
.load-square-5 {
    background-color: rgba(0, 102, 255, 0.6);
}
.load-square-6 {
    background-color: rgba(0, 102, 255, 0.5);
}
.load-square-7 {
    background-color: rgba(0, 102, 255, 0.4);
}
.load-square-8 {
    background-color: rgba(0, 102, 255, 0.3);
}
.load-square-9 {
    background-color: rgba(0, 102, 255, 0.2);
}
.load-square-10 {
    background-color: rgba(0, 102, 255, 0.1);
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n    /* Colours */\r\n    --important-text: #ffffff;\r\n    --context-text: #F5F7F7;\r\n    --dark-important-text: #000000;\r\n    --dark-context-text: #333333;\r\n    --error-red: #ff0000;\r\n    --loading-container-background: #494949;\r\n    --info-card-background: rgba(255, 255, 255, 0.20);\r\n    --highlight-info-card-background: rgba(255, 255, 255, 0.80);\r\n    --dark-shadow: rgba(0, 0, 0, 0.8);\r\n\r\n    /* Loading bar square size */\r\n    --loading-square: 20px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: var(--important-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: var(--info-card-background);\r\n    border-radius: 10px;\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: var(--info-card-background);\r\n    border-radius: 10px;\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n.low-high-temp,\r\n.precipitation-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: var(--info-card-background);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-rain-chance,\r\n.weather-snow-chance {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Forecast Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: var(--info-card-background);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: var(--info-card-background);\r\n}\r\n/* Marks current hour */\r\n.current-hour-card {\r\n    background-color: var(--highlight-info-card-background);\r\n\r\n    color: var(--dark-important-text);\r\n}\r\n.current-hour-card > .hourly-time {\r\n    color: var(--dark-contrast-text);\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n form {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: var(--info-card-background);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 4px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.2rem;\r\n}\r\n\r\n.unit-option > * {\r\n    cursor: pointer;\r\n}\r\n\r\n.field-error {\r\n    border-color: var(--error-red);\r\n    outline: 1px solid var(--error-red);\r\n}\r\n\r\n.error-message {\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    padding-left: 10px;\r\n\r\n    outline: 1px solid rgba(0, 0, 0, 0);\r\n\r\n    color: white;\r\n    font-weight: bolder;\r\n    font-size: 1rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Load Bar Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.modal {\r\n    display: none;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    position: fixed;\r\n    z-index: 2;\r\n    overflow: auto;\r\n\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    background-color: var(--dark-shadow);\r\n} \r\n\r\n.loading-container {\r\n    display: grid;\r\n    grid-template-rows: repeat(2, auto);\r\n\r\n    padding: calc(var(--loading-square) * 1) calc(var(--loading-square) * 4);\r\n\r\n    background-color: var(--loading-container-background);\r\n} \r\n\r\n.loading-text-container {\r\n    width: 100%;\r\n}\r\n\r\n.loading-bar {\r\n    align-self: center;\r\n    display: flex;\r\n    flex-direction: row-reverse;\r\n\r\n    width: calc(var(--loading-square) * 11);\r\n    height: var(--loading-square);\r\n\r\n    background-color: white;\r\n    outline: 1px solid black;\r\n} \r\n\r\n.load-square {\r\n    width: var(--loading-square);\r\n    height: var(--loading-square);\r\n\r\n    background-color: white;\r\n}\r\n/* Styles the loading bar to appear to fade over time */\r\n.load-square-1 {\r\n    background-color: rgba(0, 102, 255, 1);\r\n}\r\n.load-square-2 {\r\n    background-color: rgba(0, 102, 255, 0.9);\r\n}\r\n.load-square-3 {\r\n    background-color: rgba(0, 102, 255, 0.8);\r\n}\r\n.load-square-4 {\r\n    background-color: rgba(0, 102, 255, 0.7);\r\n}\r\n.load-square-5 {\r\n    background-color: rgba(0, 102, 255, 0.6);\r\n}\r\n.load-square-6 {\r\n    background-color: rgba(0, 102, 255, 0.5);\r\n}\r\n.load-square-7 {\r\n    background-color: rgba(0, 102, 255, 0.4);\r\n}\r\n.load-square-8 {\r\n    background-color: rgba(0, 102, 255, 0.3);\r\n}\r\n.load-square-9 {\r\n    background-color: rgba(0, 102, 255, 0.2);\r\n}\r\n.load-square-10 {\r\n    background-color: rgba(0, 102, 255, 0.1);\r\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./apiCalls */ "./src/apiCalls.js");
/* harmony import */ var _domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManipulation/errorMessages */ "./src/domManipulation/errorMessages.js");
/* harmony import */ var _domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./domManipulation/loadingBar */ "./src/domManipulation/loadingBar.js");
/* harmony import */ var _domManipulation_renderPageInfo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domManipulation/renderPageInfo */ "./src/domManipulation/renderPageInfo.js");
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./style.css */ "./src/style.css");






(0,_domManipulation_loadingBar__WEBPACK_IMPORTED_MODULE_2__.intialiseLoadingBar)();

// Initialise search bar
(0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_1__.initialiseSearchErrors)();
(0,_eventListeners__WEBPACK_IMPORTED_MODULE_4__["default"])();

// Initial data call
(0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])("Odenville").then(data => {
  (0,_domManipulation_renderPageInfo__WEBPACK_IMPORTED_MODULE_3__["default"])(data, "metric");
}).catch(error => {
  console.error("Error in inital page load:", error);
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsYUFBYSxhQUFhLE9BQU8sUUFBUSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLGFBQWEsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksWUFBWSxVQUFVLFdBQVcsV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxRQUFRLFVBQVUsWUFBWSxXQUFXLE1BQU0sUUFBUSxNQUFNLFFBQVEsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sUUFBUSxNQUFNLEtBQUssYUFBYSxhQUFhLGFBQWEsT0FBTyxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxNQUFNLFlBQVksT0FBTyxRQUFRLE1BQU0sS0FBSyxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLE1BQU0sWUFBWSxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGNBQWMsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sTUFBTSxZQUFZLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxZQUFZLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLFlBQVksWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLGNBQWMsYUFBYSxhQUFhLE1BQU0sWUFBWSxNQUFNLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLGNBQWMsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFVBQVUsVUFBVSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLGFBQWEsY0FBYyxjQUFjLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxXQUFXLFVBQVUsV0FBVyxVQUFVLFdBQVcsWUFBWSxPQUFPLEtBQUssVUFBVSxhQUFhLGNBQWMsYUFBYSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxXQUFXLGFBQWEsYUFBYSxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxjQUFjLGFBQWEsTUFBTSxZQUFZLE1BQU0sWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUss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QUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBd0M7QUFDaUM7QUFDTjtBQUNQO0FBQ0g7QUFDcEM7QUFFckJpQixnRkFBbUIsQ0FBQyxDQUFDOztBQUVyQjtBQUNBZCxzRkFBc0IsQ0FBQyxDQUFDO0FBQ3hCK0YsMkRBQXlCLENBQUMsQ0FBQzs7QUFFM0I7QUFDQXhHLHFEQUFjLENBQUMsV0FBVyxDQUFDLENBQ3hCZ0gsSUFBSSxDQUFFckQsSUFBSSxJQUFLO0VBQ2RELDJFQUFZLENBQUNDLElBQUksRUFBRSxRQUFRLENBQUM7QUFDOUIsQ0FBQyxDQUFDLENBQ0RzRCxLQUFLLENBQUUzRyxLQUFLLElBQUs7RUFDaEJDLE9BQU8sQ0FBQ0QsS0FBSyxDQUFDLDRCQUE0QixFQUFFQSxLQUFLLENBQUM7QUFDcEQsQ0FBQyxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBpQ2FsbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbU1hbmlwdWxhdGlvbi9lcnJvck1lc3NhZ2VzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21NYW5pcHVsYXRpb24vbG9hZGluZ0Jhci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uL3JlbmRlclBhZ2VJbmZvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGhpZGVMb2FkaW5nQmFyLFxyXG4gIG1vdmVMb2FkaW5nQmFyLFxyXG4gIHJlbmRlckxvYWRpbmdCYXIsXHJcbn0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uL2xvYWRpbmdCYXJcIjtcclxuXHJcbi8vIFF1ZXJ5IHRvIHRoZSB3ZWF0aGVyYXBpIHNlcnZlclxyXG5hc3luYyBmdW5jdGlvbiBxdWVyeVdlYXRoZXJBcGkobG9jYXRpb24pIHtcclxuICBjb25zdCB3ZWF0aGVyQXBpS2V5ID0gXCJlZDU2ZTFiZDAxYzU0ODE3OGRkMTQ1NDA4MjQyMjAxXCI7XHJcblxyXG4gIC8vIERlbGF5IGZvciB0ZXN0aW5nXHJcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMDApKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3dlYXRoZXJBcGlLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcclxuICApO1xyXG5cclxuICByZXR1cm4gcmVzcG9uc2U7XHJcbn1cclxuXHJcbi8vIFRpbWVyIHRvIHByZXZlbnQgaGFuZ2luZyBhd2FpdCBvcGVyYXRpb25zXHJcbmFzeW5jIGZ1bmN0aW9uIHRpbWVvdXRQcm9taXNlKCkge1xyXG4gIGNvbnN0IFRJTUVPVVRfRFVSQVRJT04gPSAxMDAwMDtcclxuXHJcbiAgY29uc3QgdGltZW91dCA9IGF3YWl0IG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICByZWplY3QoXCJTZXJ2ZXIgcmVzcG9uc2UgdGltZWQgb3V0IVwiKTtcclxuICAgIH0sIFRJTUVPVVRfRFVSQVRJT04pO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGltZW91dDtcclxufVxyXG5cclxuLy8gVHJ5IHRvIHJlY2lldmUgZGF0YSBmcm9tIHRoZSB3ZWF0aGVyYXBpIHNlcnZlclxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIC8vIFN0YXJ0IGxvYWRpbmcgYmFyIGFuaW1hdGlvblxyXG4gIHJlbmRlckxvYWRpbmdCYXIoKTtcclxuICBjb25zdCBsb2FkaW5nQmFySW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChtb3ZlTG9hZGluZ0JhciwgMTAwKTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtcclxuICAgICAgcXVlcnlXZWF0aGVyQXBpKGxvY2F0aW9uKSxcclxuICAgICAgdGltZW91dFByb21pc2UoKSxcclxuICAgIF0pO1xyXG5cclxuICAgIC8vIEludmFsaWQgbG9jYXRpb25cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBub3QgZm91bmQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiB3ZWF0aGVyYXBpIGZldGNoOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICAvLyBSZW1vdmUgbG9hZGluZyBiYXIgYW5pbWF0aW9uXHJcbiAgICBoaWRlTG9hZGluZ0JhcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChsb2FkaW5nQmFySW50ZXJ2YWwpO1xyXG4gIH1cclxufVxyXG4iLCJmdW5jdGlvbiBpbml0aWFsaXNlU2VhcmNoRXJyb3JzKCkge1xyXG4gIHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcbiAgc2VhcmNoQmFyRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uICsgLmVycm9yLW1lc3NhZ2VcIik7XHJcbn1cclxuXHJcbi8vIEluZGljYXRlIGFuIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKGVycm9yKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBlcnJvcjtcclxuICBzZWFyY2hCYXJFcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC4yKVwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLm91dGxpbmVDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjIpXCI7XHJcbiAgc2VhcmNoQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmYzBjYlwiO1xyXG4gIHNlYXJjaEJhci5jbGFzc0xpc3QuYWRkKFwiZmllbGQtZXJyb3JcIik7XHJcbn1cclxuXHJcbi8vIEluZGljYXRlIG5vIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gcmVtb3ZlU2VhcmNoRXJyb3IoKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjApXCI7XHJcbiAgc2VhcmNoQmFyRXJyb3Iuc3R5bGUub3V0bGluZUNvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuMClcIjtcclxuICBzZWFyY2hCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgc2VhcmNoQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaWVsZC1lcnJvclwiKTtcclxufVxyXG5cclxubGV0IHNlYXJjaEJhciA9IG51bGw7XHJcbmxldCBzZWFyY2hCYXJFcnJvciA9IG51bGw7XHJcblxyXG5leHBvcnQgeyBpbml0aWFsaXNlU2VhcmNoRXJyb3JzLCBkaXNwbGF5U2VhcmNoRXJyb3IsIHJlbW92ZVNlYXJjaEVycm9yIH07XHJcbiIsIi8vIFNldCB1cCBsb2FkaW5nIGJhclxyXG5mdW5jdGlvbiBpbnRpYWxpc2VMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKTtcclxufVxyXG5cclxuLy8gU2hvdyB0aGUgbG9hZGluZyBiYXIgb24gdGhlIHNjcmVlblxyXG5mdW5jdGlvbiByZW5kZXJMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxufVxyXG5cclxuLy8gUmVtb3ZlIHRoZSBsb2FkaW5nIGJhciBvbiB0aGUgc2NyZWVuXHJcbmZ1bmN0aW9uIGhpZGVMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxufVxyXG5cclxuLy8gTW92ZSB0aGUgbG9hZGluZyBiYXIgdGhyb3VnaCBhIHN0ZXAgaW4gdGhlIGxvYWRpbmcgYW5pbWF0aW9uXHJcbmZ1bmN0aW9uIG1vdmVMb2FkaW5nQmFyKCkge1xyXG4gIGNvbnN0IExvYWRpbmdCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRpbmctYmFyXCIpO1xyXG4gIGNvbnN0IGxhc3RTcXVhcmUgPSBMb2FkaW5nQmFyLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuICBMb2FkaW5nQmFyLmFwcGVuZENoaWxkKGxhc3RTcXVhcmUpO1xyXG59XHJcblxyXG5sZXQgbW9kYWwgPSBudWxsO1xyXG5cclxuZXhwb3J0IHtcclxuICBpbnRpYWxpc2VMb2FkaW5nQmFyLFxyXG4gIHJlbmRlckxvYWRpbmdCYXIsXHJcbiAgaGlkZUxvYWRpbmdCYXIsXHJcbiAgbW92ZUxvYWRpbmdCYXIsXHJcbn07XHJcbiIsImltcG9ydCBkYXlUaW1lIGZyb20gXCIuLi9hc3NldHMvZGF5VGltZS5wbmdcIjtcclxuaW1wb3J0IG5pZ2h0VGltZSBmcm9tIFwiLi4vYXNzZXRzL25pZ2h0VGltZS5wbmdcIjtcclxuaW1wb3J0IHJhaW4gZnJvbSBcIi4uL2Fzc2V0cy9yYWluLnBuZ1wiO1xyXG5pbXBvcnQgc25vdyBmcm9tIFwiLi4vYXNzZXRzL3Nub3cucG5nXCI7XHJcblxyXG4vLyBNYXBwaW5nIG9mIHdlYXRoZXIgY29uZGl0aW9ucyB0byBjb2xvdXJzIHRoYXQgcmVwcmVzZW50IHRoZW1cclxuY29uc3Qgd2VhdGhlckNvbG9yTWFwcGluZyA9IFtcclxuICB7IGNvbmRpdGlvbnM6IFtcIlN1bm55XCJdLCBjb2xvdXI6IFwiIzUxOTZkN1wiIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJDbGVhclwiXSwgY29sb3VyOiBcIiMwZDE3MzBcIiB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiUGFydGx5IGNsb3VkeVwiXSwgY29sb3VyOiBcIiM4OWExYjhcIiB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJDbG91ZHlcIixcclxuICAgICAgXCJPdmVyY2FzdFwiLFxyXG4gICAgICBcIk1pc3RcIixcclxuICAgICAgXCJQYXRjaHkgcmFpbiBwb3NzaWJsZVwiLFxyXG4gICAgICBcIlBhdGNoeSBzbm93IHBvc3NpYmxlXCIsXHJcbiAgICAgIFwiUGF0Y2h5IHNsZWV0IHBvc3NpYmxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM2ZjgwOWRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGVcIixcclxuICAgICAgXCJCbG93aW5nIHNub3dcIixcclxuICAgICAgXCJCbGl6emFyZFwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGZvZ1wiLFxyXG4gICAgICBcIlBhdGNoeSBsaWdodCBkcml6emxlXCIsXHJcbiAgICAgIFwiTGlnaHQgZHJpenpsZVwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGRyaXp6bGVcIixcclxuICAgICAgXCJIZWF2eSBmcmVlemluZyBkcml6emxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiMxMjE4MjRcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiRm9nXCJdLCBjb2xvdXI6IFwiIzZmODA5ZFwiIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IGZyZWV6aW5nIHJhaW5cIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBmcmVlemluZyByYWluXCIsXHJcbiAgICAgIFwiTGlnaHQgc2xlZXRcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbGVldFwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3dcIixcclxuICAgICAgXCJMaWdodCBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IG1vZGVyYXRlIHNub3dcIixcclxuICAgICAgXCJNb2RlcmF0ZSBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IGhlYXZ5IHNub3dcIixcclxuICAgICAgXCJIZWF2eSBzbm93XCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiSWNlIHBlbGxldHNcIl0sIGNvbG91cjogXCIjNmY4MDlkXCIgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgcmFpblwiLFxyXG4gICAgICBcIk1vZGVyYXRlIHJhaW4gYXQgdGltZXNcIixcclxuICAgICAgXCJNb2RlcmF0ZSByYWluXCIsXHJcbiAgICAgIFwiSGVhdnkgcmFpbiBhdCB0aW1lc1wiLFxyXG4gICAgICBcIkhlYXZ5IHJhaW5cIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzU0NjE3NFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IHJhaW4gc2hvd2VyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiBzaG93ZXJcIixcclxuICAgICAgXCJUb3JyZW50aWFsIHJhaW4gc2hvd2VyXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM1NDYxNzRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCBzbGVldCBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQgc2hvd2Vyc1wiLFxyXG4gICAgICBcIkxpZ2h0IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgc2hvd2VycyBvZiBpY2UgcGVsbGV0c1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNob3dlcnMgb2YgaWNlIHBlbGxldHNcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzdhODdhYVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIlBhdGNoeSBsaWdodCByYWluIHdpdGggdGh1bmRlclwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3cgd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc25vdyB3aXRoIHRodW5kZXJcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzEyMTgyNFwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG4vLyBDb2xvdXIgdGhlIHBhZ2UgYmFja2dyb3VuZCBiYXNlZCBvbiBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xyXG5mdW5jdGlvbiBjb2xvdXJCYWNrZ3JvdW5kKGNvbmRpdGlvbikge1xyXG4gIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHJcbiAgd2VhdGhlckNvbG9yTWFwcGluZy5mb3JFYWNoKCh3ZWF0aGVyR3JvdXApID0+IHtcclxuICAgIGlmICh3ZWF0aGVyR3JvdXAuY29uZGl0aW9ucy5pbmNsdWRlcyhjb25kaXRpb24pKSB7XHJcbiAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gd2VhdGhlckdyb3VwLmNvbG91cjtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gTWFyayB0aGUgY3VycmVudCB0aW1lIG9uIHRoZSBob3VybHkgZm9yZWNhc3QgY2FyZHNcclxuZnVuY3Rpb24gbWFya0N1cnJlbnRIb3VyKGN1cnJlbnRUaW1lKSB7XHJcbiAgY29uc3QgaG91cmx5VGltZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdXJseS10aW1lXCIpO1xyXG5cclxuICBob3VybHlUaW1lcy5mb3JFYWNoKCh0aW1lKSA9PiB7XHJcbiAgICBjb25zdCBob3VybHlDYXJkID0gdGltZS5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKHBhcnNlSW50KHRpbWUudGV4dENvbnRlbnQpID09PSBwYXJzZUludChjdXJyZW50VGltZSkpIHtcclxuICAgICAgaG91cmx5Q2FyZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1ob3VyLWNhcmRcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBob3VybHlDYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50LWhvdXItY2FyZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gQWRkIHBlcnNpc3RlbnQgaWNvbnMgdG8gdGhlIHBhZ2VcclxuZnVuY3Rpb24gYWRkSWNvbnMoKSB7XHJcbiAgY29uc3Qgc3VucmlzZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtaWNvblwiKTtcclxuICBjb25zdCBzdW5zZXRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtaWNvblwiKTtcclxuICBjb25zdCByYWluSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhaW4taWNvblwiKTtcclxuICBjb25zdCBzbm93SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNub3ctaWNvblwiKTtcclxuXHJcbiAgc3VucmlzZUljb24uc3JjID0gZGF5VGltZTtcclxuICBzdW5zZXRJY29uLnNyYyA9IG5pZ2h0VGltZTtcclxuICByYWluSWNvbnMuZm9yRWFjaCgoaWNvbikgPT4ge1xyXG4gICAgaWNvbi5zcmMgPSByYWluO1xyXG4gIH0pO1xyXG4gIHNub3dJY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHNub3c7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIEZpbGwgdGhlIHBhZ2Ugd2l0aCB3ZWF0aGVyIGluZm9ybWF0aW9uXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbGxQYWdlRGF0YShkYXRhLCB1bml0cykge1xyXG4gIGNvbnN0IG5vblVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIExvY2F0aW9uIGRldGFpbHNcclxuICAgIHsgc2VsZWN0b3I6IFwiLmNpdHktbmFtZVwiLCBkYXRhOiBkYXRhLmxvY2F0aW9uLm5hbWUudG9VcHBlckNhc2UoKSB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuY291bnRyeS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24uY291bnRyeSB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIubG9jYWwtdGltZVwiLFxyXG4gICAgICBkYXRhOlxyXG4gICAgICAgIHBhcnNlSW50KGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXSkgPCAxMlxyXG4gICAgICAgICAgPyBgJHtkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV19IEFNYFxyXG4gICAgICAgICAgOiBgJHtwYXJzZUludChkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCI6XCIpWzBdKSAtIDEyfToke2RhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIjpcIilbMV19IFBNYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb2NhbC1kYXRlXCIsXHJcbiAgICAgIGRhdGE6IG5ldyBEYXRlKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVswXSkudG9Mb2NhbGVEYXRlU3RyaW5nKFxyXG4gICAgICAgIFwiZW4tVUtcIixcclxuICAgICAgICB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCBkYXk6IFwibnVtZXJpY1wiIH0sXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuc3VucmlzZS10aW1lXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5zdW5zZXQtdGltZVwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gICAgLy8gQ3VycmVudCB3ZWF0aGVyIGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXHJcbiAgICB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLXV2XCIsIGRhdGE6IGRhdGEuY3VycmVudC51diB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLWh1bWlkaXR5XCIsIGRhdGE6IGAke2RhdGEuY3VycmVudC5odW1pZGl0eX0lYCB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLXdpbmQtZGlyZWN0aW9uXCIsIGRhdGE6IGRhdGEuY3VycmVudC53aW5kX2RpciB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCB1bml0VGV4dERhdGEgPSBbXHJcbiAgICAvLyBDdXJyZW50IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmN1cnJlbnQtdGVtcFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuY3VycmVudC50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQudGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC1mZWVscy1saWtlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC1wcmVjaXBpdGF0aW9uXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9tbX0gbW1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9pbn0gaW5gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC13aW5kLXNwZWVkXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LndpbmRfa3BofSBrbS9oYCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC53aW5kX21waH0gbXBoYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb3ctaGlnaC10ZW1wXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIC8vIEhvdXJseSBmb3JlY2FzdCBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTAgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTMgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci00ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzVdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTYgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci03ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbN10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzhdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTkgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzExXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEyID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTQgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE0XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE1ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTZdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTcgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE3XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE4ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTldLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjAgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIwXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIxID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjJdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjMgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIzXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgaWNvbkRhdGEgPSBbXHJcbiAgICAvLyBDdXJyZW50IHdlYXRoZXIgaWNvblxyXG4gICAgeyBzZWxlY3RvcjogXCIud2VhdGhlci1pY29uXCIsIGRhdGE6IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbiB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGljb25zXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICAvLyBIb3VybHkgZm9yZWNhc3QgaWNvbnNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzJdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci00ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTUgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzVdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci03ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTggPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzhdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzExXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEyID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTQgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE0XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE1ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTZdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTcgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE3XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE4ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTldLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjAgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIwXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIxID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjJdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjMgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIzXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgLy8gQWRkIGRhdGEgdG8gdGhlIHBhZ2VcclxuICBub25Vbml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUVsZW0uc2VsZWN0b3IpLnRleHRDb250ZW50ID0gZGF0YUVsZW0uZGF0YTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHVuaXRzID09PSBcIk1ldHJpY1wiKSB7XHJcbiAgICB1bml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5tZXRyaWM7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgdW5pdFRleHREYXRhLmZvckVhY2goKGRhdGFFbGVtKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUVsZW0uc2VsZWN0b3IpLnRleHRDb250ZW50ID0gZGF0YUVsZW0uaW1wZXJpYWw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGljb25EYXRhLmZvckVhY2goKGljb25FbGVtKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGljb25FbGVtLnNlbGVjdG9yKS5zcmMgPSBpY29uRWxlbS5kYXRhO1xyXG4gIH0pO1xyXG5cclxuICBtYXJrQ3VycmVudEhvdXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdKTtcclxuICBhZGRJY29ucygpO1xyXG4gIGNvbG91ckJhY2tncm91bmQoZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gYWRkR2lmKHVybCkge1xyXG4vLyAgIGNvbnN0IGdpZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2lmLWNvbnRhaW5lciA+IGltZ1wiKTtcclxuLy8gICBnaWYuc3JjID0gdXJsO1xyXG4vLyB9XHJcbiIsImltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tIFwiLi9hcGlDYWxsc1wiO1xyXG5pbXBvcnQgZmlsbFBhZ2VEYXRhIGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi9yZW5kZXJQYWdlSW5mb1wiO1xyXG5pbXBvcnQge1xyXG4gIGRpc3BsYXlTZWFyY2hFcnJvcixcclxuICByZW1vdmVTZWFyY2hFcnJvcixcclxufSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24vZXJyb3JNZXNzYWdlc1wiO1xyXG5cclxuLy8gUXVlcnkgd2VhdGhlcmFwaSBiYXNlZCBvbiBzZWFyY2hiYXIgaW5wdXQgbG9jYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpIHtcclxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcblxyXG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSFcIjtcclxuXHJcbiAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB1bml0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ1bml0c1wiXTpjaGVja2VkJykudmFsdWU7XHJcblxyXG4gICAgICBnZXRXZWF0aGVyRGF0YShzZWFyY2hCYXIudmFsdWUpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIHJlbW92ZVNlYXJjaEVycm9yKCk7XHJcbiAgICAgICAgICBmaWxsUGFnZURhdGEoZGF0YSwgdW5pdHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldFdlYXRoZXJEYXRhOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICBkaXNwbGF5U2VhcmNoRXJyb3IoZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XHJcbiAgICAvKiBDb2xvdXJzICovXHJcbiAgICAtLWltcG9ydGFudC10ZXh0OiAjZmZmZmZmO1xyXG4gICAgLS1jb250ZXh0LXRleHQ6ICNGNUY3Rjc7XHJcbiAgICAtLWRhcmstaW1wb3J0YW50LXRleHQ6ICMwMDAwMDA7XHJcbiAgICAtLWRhcmstY29udGV4dC10ZXh0OiAjMzMzMzMzO1xyXG4gICAgLS1lcnJvci1yZWQ6ICNmZjAwMDA7XHJcbiAgICAtLWxvYWRpbmctY29udGFpbmVyLWJhY2tncm91bmQ6ICM0OTQ5NDk7XHJcbiAgICAtLWluZm8tY2FyZC1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xyXG4gICAgLS1oaWdobGlnaHQtaW5mby1jYXJkLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MCk7XHJcbiAgICAtLWRhcmstc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuOCk7XHJcblxyXG4gICAgLyogTG9hZGluZyBiYXIgc3F1YXJlIHNpemUgKi9cclxuICAgIC0tbG9hZGluZy1zcXVhcmU6IDIwcHg7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBHZW5lcmFsIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG4qIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcblxyXG4gICAgY29sb3I6IHZhcigtLWltcG9ydGFudC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFdlYXRoZXIgSW5mb3JtYXRpb24gTGF5b3V0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLndlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLnJvdy0xIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ucm93LTMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcclxuICAgIGNvbHVtbi1nYXA6IDFyZW07XHJcbn1cclxuXHJcbi5zdWJzZWN0aW9uLWhlYWRlciB7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG59XHJcblxyXG4ubG9jYXRpb24tZGF0ZXRpbWUtZGV0YWlscyxcclxuLnN1bi1pbmZvLFxyXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEljb24gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ucmFpbi1pY29uLFxyXG4uc25vdy1pY29uLFxyXG4uc3VucmlzZS1pY29uLFxyXG4uc3Vuc2V0LWljb24ge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbn1cclxuXHJcbi5pY29uLXRleHQtcGFpciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4ud2VhdGhlci1pY29uIHtcclxuICAgIGhlaWdodDogNThweDtcclxuICAgIHdpZHRoOiA1OHB4O1xyXG59XHJcblxyXG4uZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICB3aWR0aDogNDZweDtcclxufVxyXG5cclxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTG9jYXRpb24gSW5mb3JtYXRpb24gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ubG9jYXRpb24taW5mby1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1jYXJkLWJhY2tncm91bmQpO1xyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxufVxyXG5cclxuLmNpdHktbmFtZSxcclxuLmNvdW50cnktbmFtZSB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG4uY2l0eS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogODBweDtcclxufVxyXG5cclxuLmNvdW50cnktbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDUwcHg7XHJcbn1cclxuXHJcbi5sb2NhdGlvbi1kYXRldGltZS1kZXRhaWxzLFxyXG4uc3VuLWluZm8ge1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDdXJyZW50IFdlYXRoZXIgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XHJcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59IFxyXG5cclxuLmN1cnJlbnQtdGVtcCB7XHJcbiAgICBmb250LXNpemU6IDgwcHg7XHJcbn1cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xyXG4gICAgZm9udC1zaXplOiA1MHB4O1xyXG59XHJcblxyXG4ubG93LWhpZ2gtdGVtcCxcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1jYXJkLWJhY2tncm91bmQpO1xyXG59XHJcblxyXG4uZm9yZWNhc3QtY2FyZC10aXRsZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLndlYXRoZXItcmFpbi1jaGFuY2UsXHJcbi53ZWF0aGVyLXNub3ctY2hhbmNlIHtcclxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQ3VycmVudCBGb3JlY2FzdCBEZXRhaWxzIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmN1cnJlbnQtZGV0YWlscy1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufSBcclxuXHJcbi5kZXRhaWwtY2FyZC1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcblxyXG59XHJcblxyXG4uZGV0YWlsLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCA+IGg0IHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWluZm8tY2FyZC1iYWNrZ3JvdW5kKTtcclxufVxyXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cclxuLmN1cnJlbnQtaG91ci1jYXJkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodC1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XHJcblxyXG4gICAgY29sb3I6IHZhcigtLWRhcmstaW1wb3J0YW50LXRleHQpO1xyXG59XHJcbi5jdXJyZW50LWhvdXItY2FyZCA+IC5ob3VybHktdGltZSB7XHJcbiAgICBjb2xvcjogdmFyKC0tZGFyay1jb250cmFzdC10ZXh0KTtcclxufVxyXG5cclxuLmhvdXJseS10aW1lIHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuIGZvcm0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1jYXJkLWJhY2tncm91bmQpO1xyXG59XHJcblxyXG4uZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnNlYXJjaGJhciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLnVuaXQtb3B0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjJyZW07XHJcbn1cclxuXHJcbi51bml0LW9wdGlvbiA+ICoge1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4uZmllbGQtZXJyb3Ige1xyXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1lcnJvci1yZWQpO1xyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHZhcigtLWVycm9yLXJlZCk7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuXHJcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwKTtcclxuXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTG9hZCBCYXIgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ubW9kYWwge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICB6LWluZGV4OiAyO1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcblxyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay1zaGFkb3cpO1xyXG59IFxyXG5cclxuLmxvYWRpbmctY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCBhdXRvKTtcclxuXHJcbiAgICBwYWRkaW5nOiBjYWxjKHZhcigtLWxvYWRpbmctc3F1YXJlKSAqIDEpIGNhbGModmFyKC0tbG9hZGluZy1zcXVhcmUpICogNCk7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbG9hZGluZy1jb250YWluZXItYmFja2dyb3VuZCk7XHJcbn0gXHJcblxyXG4ubG9hZGluZy10ZXh0LWNvbnRhaW5lciB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLmxvYWRpbmctYmFyIHtcclxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XHJcblxyXG4gICAgd2lkdGg6IGNhbGModmFyKC0tbG9hZGluZy1zcXVhcmUpICogMTEpO1xyXG4gICAgaGVpZ2h0OiB2YXIoLS1sb2FkaW5nLXNxdWFyZSk7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbiAgICBvdXRsaW5lOiAxcHggc29saWQgYmxhY2s7XHJcbn0gXHJcblxyXG4ubG9hZC1zcXVhcmUge1xyXG4gICAgd2lkdGg6IHZhcigtLWxvYWRpbmctc3F1YXJlKTtcclxuICAgIGhlaWdodDogdmFyKC0tbG9hZGluZy1zcXVhcmUpO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xyXG59XHJcbi8qIFN0eWxlcyB0aGUgbG9hZGluZyBiYXIgdG8gYXBwZWFyIHRvIGZhZGUgb3ZlciB0aW1lICovXHJcbi5sb2FkLXNxdWFyZS0xIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDEpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS0yIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuOSk7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTMge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC44KTtcclxufVxyXG4ubG9hZC1zcXVhcmUtNCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjcpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS01IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNik7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTYge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC41KTtcclxufVxyXG4ubG9hZC1zcXVhcmUtNyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjQpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS04IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuMyk7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTkge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4yKTtcclxufVxyXG4ubG9hZC1zcXVhcmUtMTAge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4xKTtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFlBQVk7SUFDWix5QkFBeUI7SUFDekIsdUJBQXVCO0lBQ3ZCLDhCQUE4QjtJQUM5Qiw0QkFBNEI7SUFDNUIsb0JBQW9CO0lBQ3BCLHVDQUF1QztJQUN2QyxpREFBaUQ7SUFDakQsMkRBQTJEO0lBQzNELGlDQUFpQzs7SUFFakMsNEJBQTRCO0lBQzVCLHNCQUFzQjtBQUMxQjs7QUFFQTs7OztFQUlFO0FBQ0Y7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1COztJQUVuQixZQUFZO0lBQ1osYUFBYTs7SUFFYixzQkFBc0I7O0lBRXRCLDRCQUE0QjtBQUNoQzs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixTQUFTOztJQUVULFdBQVc7SUFDWCxhQUFhOztJQUViLGFBQWE7O0lBRWIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw4QkFBOEI7SUFDOUIsZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7Ozs7SUFJSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFNBQVM7QUFDYjs7QUFFQTs7OztFQUlFOztBQUVGOzs7O0lBSUksWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsOEJBQThCO0lBQzlCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksb0JBQW9COztJQUVwQiw2Q0FBNkM7SUFDN0MsbUJBQW1CO0FBQ3ZCOztBQUVBOztJQUVJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBOztJQUVJLDBCQUEwQjtBQUM5Qjs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksb0JBQW9COztJQUVwQiw2Q0FBNkM7SUFDN0MsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7O0lBRUksMEJBQTBCO0FBQzlCOztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2IsNEJBQTRCO0lBQzVCLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixxQ0FBcUM7SUFDckMsa0JBQWtCO0FBQ3RCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLGtDQUFrQztJQUNsQyxtQkFBbUI7O0lBRW5CLG9CQUFvQjs7SUFFcEIsbUJBQW1CO0lBQ25CLDZDQUE2QztBQUNqRDs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixnQkFBZ0I7SUFDaEIsMEJBQTBCO0FBQzlCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixxQkFBcUI7SUFDckIsV0FBVztBQUNmOztBQUVBOztJQUVJLDBCQUEwQjtBQUM5Qjs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7O0FBRWY7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix1QkFBdUI7O0lBRXZCLFlBQVk7O0lBRVosbUJBQW1CO0lBQ25CLDZDQUE2QztBQUNqRDs7QUFFQTtJQUNJLGdCQUFnQjtJQUNoQiwwQkFBMEI7QUFDOUI7O0FBRUE7Ozs7RUFJRTs7Q0FFRDtJQUNHLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsaUNBQWlDO0lBQ2pDLHFCQUFxQjtJQUNyQixtQkFBbUI7O0lBRW5CLG1CQUFtQjtJQUNuQiw2Q0FBNkM7QUFDakQ7QUFDQSx1QkFBdUI7QUFDdkI7SUFDSSx1REFBdUQ7O0lBRXZELGlDQUFpQztBQUNyQztBQUNBO0lBQ0ksZ0NBQWdDO0FBQ3BDOztBQUVBO0lBQ0ksZ0JBQWdCO0lBQ2hCLDBCQUEwQjtBQUM5Qjs7QUFFQTs7OztFQUlFOztDQUVEO0lBQ0csYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7O0lBRW5CLGtCQUFrQjs7SUFFbEIsbUJBQW1CO0lBQ25CLDZDQUE2QztBQUNqRDs7QUFFQTtJQUNJLGFBQWE7SUFDYix1Q0FBdUM7SUFDdkMsUUFBUTtJQUNSLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSw4QkFBOEI7SUFDOUIsbUNBQW1DO0FBQ3ZDOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjs7SUFFbkIsa0JBQWtCOztJQUVsQixtQ0FBbUM7O0lBRW5DLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1Qjs7SUFFdkIsZUFBZTtJQUNmLFVBQVU7SUFDVixjQUFjOztJQUVkLFdBQVc7SUFDWCxZQUFZOztJQUVaLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQ0FBbUM7O0lBRW5DLHdFQUF3RTs7SUFFeEUscURBQXFEO0FBQ3pEOztBQUVBO0lBQ0ksV0FBVztBQUNmOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGFBQWE7SUFDYiwyQkFBMkI7O0lBRTNCLHVDQUF1QztJQUN2Qyw2QkFBNkI7O0lBRTdCLHVCQUF1QjtJQUN2Qix3QkFBd0I7QUFDNUI7O0FBRUE7SUFDSSw0QkFBNEI7SUFDNUIsNkJBQTZCOztJQUU3Qix1QkFBdUI7QUFDM0I7QUFDQSx1REFBdUQ7QUFDdkQ7SUFDSSxzQ0FBc0M7QUFDMUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUNcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcclxcbiAgICAvKiBDb2xvdXJzICovXFxyXFxuICAgIC0taW1wb3J0YW50LXRleHQ6ICNmZmZmZmY7XFxyXFxuICAgIC0tY29udGV4dC10ZXh0OiAjRjVGN0Y3O1xcclxcbiAgICAtLWRhcmstaW1wb3J0YW50LXRleHQ6ICMwMDAwMDA7XFxyXFxuICAgIC0tZGFyay1jb250ZXh0LXRleHQ6ICMzMzMzMzM7XFxyXFxuICAgIC0tZXJyb3ItcmVkOiAjZmYwMDAwO1xcclxcbiAgICAtLWxvYWRpbmctY29udGFpbmVyLWJhY2tncm91bmQ6ICM0OTQ5NDk7XFxyXFxuICAgIC0taW5mby1jYXJkLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxuICAgIC0taGlnaGxpZ2h0LWluZm8tY2FyZC1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xcclxcbiAgICAtLWRhcmstc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxyXFxuXFxyXFxuICAgIC8qIExvYWRpbmcgYmFyIHNxdWFyZSBzaXplICovXFxyXFxuICAgIC0tbG9hZGluZy1zcXVhcmU6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogR2VuZXJhbCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuKiB7XFxyXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICAgIG1hcmdpbjogMDtcXHJcXG4gICAgcGFkZGluZzogMDtcXHJcXG59XFxyXFxuXFxyXFxuYm9keSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHdpZHRoOiAxMDB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogZ3JleTtcXHJcXG5cXHJcXG4gICAgY29sb3I6IHZhcigtLWltcG9ydGFudC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLndlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgICB3aWR0aDogODB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG5cXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTEge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcXHJcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnN1YnNlY3Rpb24taGVhZGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXFxyXFxuLnN1bi1pbmZvLFxcclxcbi53ZWF0aGVyLWRlc2NyaXB0aW9uLFxcclxcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogSWNvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnJhaW4taWNvbixcXHJcXG4uc25vdy1pY29uLFxcclxcbi5zdW5yaXNlLWljb24sXFxyXFxuLnN1bnNldC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tdGV4dC1wYWlyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNThweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA0NnB4O1xcclxcbiAgICB3aWR0aDogNDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBMb2NhdGlvbiBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWluZm8tY2FyZC1iYWNrZ3JvdW5kKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNpdHktbmFtZSxcXHJcXG4uY291bnRyeS1uYW1lIHtcXHJcXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmNpdHktbmFtZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogODBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvdW50cnktbmFtZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXFxyXFxuLnN1bi1pbmZvIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBXZWF0aGVyIEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufSBcXHJcXG5cXHJcXG4uY3VycmVudC10ZW1wIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubG93LWhpZ2gtdGVtcCxcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogVGhyZWUgRGF5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDVmciAxZnI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDAuMnJlbSAxcmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcXHJcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi53ZWF0aGVyLXJhaW4tY2hhbmNlLFxcclxcbi53ZWF0aGVyLXNub3ctY2hhbmNlIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBGb3JlY2FzdCBEZXRhaWxzIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1jYXJkLWJhY2tncm91bmQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQgPiBoNCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XFxyXFxufVxcclxcbi8qIE1hcmtzIGN1cnJlbnQgaG91ciAqL1xcclxcbi5jdXJyZW50LWhvdXItY2FyZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhpZ2hsaWdodC1pbmZvLWNhcmQtYmFja2dyb3VuZCk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWltcG9ydGFudC10ZXh0KTtcXHJcXG59XFxyXFxuLmN1cnJlbnQtaG91ci1jYXJkID4gLmhvdXJseS10aW1lIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWRhcmstY29udHJhc3QtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktdGltZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4gZm9ybSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW5mby1jYXJkLWJhY2tncm91bmQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS1maWVsZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiA0cHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5zZWFyY2hiYXIge1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udW5pdC1vcHRpb24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDAuMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uID4gKiB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1lcnJvci1yZWQpO1xcclxcbiAgICBvdXRsaW5lOiAxcHggc29saWQgdmFyKC0tZXJyb3ItcmVkKTtcXHJcXG59XFxyXFxuXFxyXFxuLmVycm9yLW1lc3NhZ2Uge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuXFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDApO1xcclxcblxcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogTG9hZCBCYXIgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5tb2RhbCB7XFxyXFxuICAgIGRpc3BsYXk6IG5vbmU7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICAgIHotaW5kZXg6IDI7XFxyXFxuICAgIG92ZXJmbG93OiBhdXRvO1xcclxcblxcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kYXJrLXNoYWRvdyk7XFxyXFxufSBcXHJcXG5cXHJcXG4ubG9hZGluZy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgyLCBhdXRvKTtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogY2FsYyh2YXIoLS1sb2FkaW5nLXNxdWFyZSkgKiAxKSBjYWxjKHZhcigtLWxvYWRpbmctc3F1YXJlKSAqIDQpO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1sb2FkaW5nLWNvbnRhaW5lci1iYWNrZ3JvdW5kKTtcXHJcXG59IFxcclxcblxcclxcbi5sb2FkaW5nLXRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5sb2FkaW5nLWJhciB7XFxyXFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcclxcblxcclxcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1sb2FkaW5nLXNxdWFyZSkgKiAxMSk7XFxyXFxuICAgIGhlaWdodDogdmFyKC0tbG9hZGluZy1zcXVhcmUpO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcclxcbn0gXFxyXFxuXFxyXFxuLmxvYWQtc3F1YXJlIHtcXHJcXG4gICAgd2lkdGg6IHZhcigtLWxvYWRpbmctc3F1YXJlKTtcXHJcXG4gICAgaGVpZ2h0OiB2YXIoLS1sb2FkaW5nLXNxdWFyZSk7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG4vKiBTdHlsZXMgdGhlIGxvYWRpbmcgYmFyIHRvIGFwcGVhciB0byBmYWRlIG92ZXIgdGltZSAqL1xcclxcbi5sb2FkLXNxdWFyZS0xIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMSk7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS0yIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC45KTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTMge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjgpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtNCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNyk7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS01IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC42KTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTYge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjUpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtNyB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNCk7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS04IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4zKTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTkge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjIpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtMTAge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjEpO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpQ2FsbHNcIjtcclxuaW1wb3J0IHsgaW5pdGlhbGlzZVNlYXJjaEVycm9ycyB9IGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi9lcnJvck1lc3NhZ2VzXCI7XHJcbmltcG9ydCB7IGludGlhbGlzZUxvYWRpbmdCYXIgfSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24vbG9hZGluZ0JhclwiO1xyXG5pbXBvcnQgZmlsbFBhZ2VEYXRhIGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi9yZW5kZXJQYWdlSW5mb1wiO1xyXG5pbXBvcnQgYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lciBmcm9tIFwiLi9ldmVudExpc3RlbmVyc1wiO1xyXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5cclxuaW50aWFsaXNlTG9hZGluZ0JhcigpO1xyXG5cclxuLy8gSW5pdGlhbGlzZSBzZWFyY2ggYmFyXHJcbmluaXRpYWxpc2VTZWFyY2hFcnJvcnMoKTtcclxuYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpO1xyXG5cclxuLy8gSW5pdGlhbCBkYXRhIGNhbGxcclxuZ2V0V2VhdGhlckRhdGEoXCJPZGVudmlsbGVcIilcclxuICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgZmlsbFBhZ2VEYXRhKGRhdGEsIFwibWV0cmljXCIpO1xyXG4gIH0pXHJcbiAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGluaXRhbCBwYWdlIGxvYWQ6XCIsIGVycm9yKTtcclxuICB9KTtcclxuIl0sIm5hbWVzIjpbImhpZGVMb2FkaW5nQmFyIiwibW92ZUxvYWRpbmdCYXIiLCJyZW5kZXJMb2FkaW5nQmFyIiwicXVlcnlXZWF0aGVyQXBpIiwibG9jYXRpb24iLCJ3ZWF0aGVyQXBpS2V5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwicmVzcG9uc2UiLCJmZXRjaCIsInRpbWVvdXRQcm9taXNlIiwiVElNRU9VVF9EVVJBVElPTiIsInRpbWVvdXQiLCJfIiwicmVqZWN0IiwiZ2V0V2VhdGhlckRhdGEiLCJsb2FkaW5nQmFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInJhY2UiLCJzdGF0dXMiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwiY2xlYXJJbnRlcnZhbCIsImluaXRpYWxpc2VTZWFyY2hFcnJvcnMiLCJzZWFyY2hCYXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hCYXJFcnJvciIsImRpc3BsYXlTZWFyY2hFcnJvciIsInRleHRDb250ZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJvdXRsaW5lQ29sb3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmVTZWFyY2hFcnJvciIsInJlbW92ZSIsImludGlhbGlzZUxvYWRpbmdCYXIiLCJtb2RhbCIsImRpc3BsYXkiLCJMb2FkaW5nQmFyIiwibGFzdFNxdWFyZSIsImZpcnN0RWxlbWVudENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJkYXlUaW1lIiwibmlnaHRUaW1lIiwicmFpbiIsInNub3ciLCJ3ZWF0aGVyQ29sb3JNYXBwaW5nIiwiY29uZGl0aW9ucyIsImNvbG91ciIsImNvbG91ckJhY2tncm91bmQiLCJjb25kaXRpb24iLCJwYWdlIiwiZm9yRWFjaCIsIndlYXRoZXJHcm91cCIsImluY2x1ZGVzIiwibWFya0N1cnJlbnRIb3VyIiwiY3VycmVudFRpbWUiLCJob3VybHlUaW1lcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0aW1lIiwiaG91cmx5Q2FyZCIsInBhcmVudEVsZW1lbnQiLCJwYXJzZUludCIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwicmFpbkljb25zIiwic25vd0ljb25zIiwic3JjIiwiaWNvbiIsImZpbGxQYWdlRGF0YSIsImRhdGEiLCJ1bml0cyIsIm5vblVuaXRUZXh0RGF0YSIsInNlbGVjdG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInllYXIiLCJtb250aCIsImRheSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY3VycmVudCIsInRleHQiLCJ1diIsImh1bWlkaXR5Iiwid2luZF9kaXIiLCJ1bml0VGV4dERhdGEiLCJtZXRyaWMiLCJ0ZW1wX2MiLCJpbXBlcmlhbCIsInRlbXBfZiIsImZlZWxzbGlrZV9jIiwiZmVlbHNsaWtlX2YiLCJwcmVjaXBfbW0iLCJwcmVjaXBfaW4iLCJ3aW5kX2twaCIsIndpbmRfbXBoIiwibWludGVtcF9jIiwibWF4dGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9mIiwiaG91ciIsImljb25EYXRhIiwiZGF0YUVsZW0iLCJpY29uRWxlbSIsImFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIiLCJzdWJtaXRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsaWRpdHkiLCJ2YWx1ZU1pc3NpbmciLCJ2YWx1ZSIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=