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
  const TIMEOUT_DURATION = 1000;
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
    console.log(response);

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
        console.log(data);
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
    --important-text: #ffffff;
    --context-text: #F5F7F7; /*#f8f8f8; #fafafa*/
    --dark-important-text: #000000;
    --dark-context-text: #333333;

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
 * Search Form Styling
 * ------------------------------------------------------------
 */

form {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 1rem 2rem;

    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.20);
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
    border-color: #ff0000;
    outline: 1px solid #ff0000;
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

    background-color: rgba(255, 255, 255, 0.20);
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
 * Current Weather Information Styling
 * ------------------------------------------------------------
 */

.current-weather-container {
    padding: 0.5rem 1rem;

    background-color: rgba(255, 255, 255, 0.20);
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
    background-color: rgba(255, 255, 255, 0.20);
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
    background-color: rgba(255, 255, 255, 0.20);
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
    background-color: rgba(255, 255, 255, 0.20);
}
/* Marks current hour */
.current-hour-card {
    background-color: rgba(255, 255, 255, 0.80);

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

    background-color: rgba(0, 0, 0, 0.8);
} 

.loading-container {
    display: grid;
    grid-template-rows: repeat(2, auto);

    width: calc(var(--loading-square) * 13);

    padding: var(--loading-square);

    background-color: #a0a0a0;
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n    --important-text: #ffffff;\r\n    --context-text: #F5F7F7; /*#f8f8f8; #fafafa*/\r\n    --dark-important-text: #000000;\r\n    --dark-context-text: #333333;\r\n\r\n    --loading-square: 20px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: var(--important-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 4px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.2rem;\r\n}\r\n\r\n.unit-option > * {\r\n    cursor: pointer;\r\n}\r\n\r\n.field-error {\r\n    border-color: #ff0000;\r\n    outline: 1px solid #ff0000;\r\n}\r\n\r\n.error-message {\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    padding-left: 10px;\r\n\r\n    outline: 1px solid rgba(0, 0, 0, 0);\r\n\r\n    color: white;\r\n    font-weight: bolder;\r\n    font-size: 1rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n.low-high-temp,\r\n.precipitation-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-rain-chance,\r\n.weather-snow-chance {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n/* Marks current hour */\r\n.current-hour-card {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: var(--dark-important-text);\r\n}\r\n.current-hour-card > .hourly-time {\r\n    color: var(--dark-contrast-text);\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Load Bar Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.modal {\r\n    display: none;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    position: fixed;\r\n    z-index: 2;\r\n    overflow: auto;\r\n\r\n    width: 100%;\r\n    height: 100%;\r\n\r\n    background-color: rgba(0, 0, 0, 0.8);\r\n} \r\n\r\n.loading-container {\r\n    display: grid;\r\n    grid-template-rows: repeat(2, auto);\r\n\r\n    width: calc(var(--loading-square) * 13);\r\n\r\n    padding: var(--loading-square);\r\n\r\n    background-color: #a0a0a0;\r\n} \r\n\r\n.loading-text-container {\r\n    width: 100%;\r\n}\r\n\r\n.loading-bar {\r\n    align-self: center;\r\n    display: flex;\r\n    flex-direction: row-reverse;\r\n\r\n    width: calc(var(--loading-square) * 11);\r\n    height: var(--loading-square);\r\n\r\n    background-color: white;\r\n    outline: 1px solid black;\r\n} \r\n\r\n.load-square {\r\n    width: var(--loading-square);\r\n    height: var(--loading-square);\r\n\r\n    background-color: white;\r\n}\r\n.load-square-1 {\r\n    background-color: rgba(0, 102, 255, 1);\r\n}\r\n.load-square-2 {\r\n    background-color: rgba(0, 102, 255, 0.9);\r\n}\r\n.load-square-3 {\r\n    background-color: rgba(0, 102, 255, 0.8);\r\n}\r\n.load-square-4 {\r\n    background-color: rgba(0, 102, 255, 0.7);\r\n}\r\n.load-square-5 {\r\n    background-color: rgba(0, 102, 255, 0.6);\r\n}\r\n.load-square-6 {\r\n    background-color: rgba(0, 102, 255, 0.5);\r\n}\r\n.load-square-7 {\r\n    background-color: rgba(0, 102, 255, 0.4);\r\n}\r\n.load-square-8 {\r\n    background-color: rgba(0, 102, 255, 0.3);\r\n}\r\n.load-square-9 {\r\n    background-color: rgba(0, 102, 255, 0.2);\r\n}\r\n.load-square-10 {\r\n    background-color: rgba(0, 102, 255, 0.1);\r\n}"],"sourceRoot":""}]);
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

// // Initial data call
// getWeatherData("Odenville")
//   .then((data) => {
//     console.log(data);
//     fillPageData(data, "metric");
//   })
//   .catch((error) => {
//     console.error("Error in inital page load:", error);
//   });
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLE9BQU8sZ0ZBQWdGLFlBQVkseUJBQXlCLGFBQWEsY0FBYyxhQUFhLE9BQU8sUUFBUSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLGFBQWEsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsYUFBYSxjQUFjLGNBQWMsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxZQUFZLFVBQVUsV0FBVyxXQUFXLFVBQVUsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLE1BQU0sTUFBTSxLQUFLLFlBQVksT0FBTyxRQUFRLFVBQVUsWUFBWSxXQUFXLE1BQU0sUUFBUSxNQUFNLFFBQVEsVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sUUFBUSxNQUFNLEtBQUssYUFBYSxhQUFhLGFBQWEsT0FBTyxNQUFNLFlBQVksT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxNQUFNLFlBQVksT0FBTyxRQUFRLE1BQU0sS0FBSyxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLE1BQU0sWUFBWSxPQUFPLFFBQVEsTUFBTSxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxjQUFjLGNBQWMsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLE1BQU0sWUFBWSxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksWUFBWSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsY0FBYyxZQUFZLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxjQUFjLGFBQWEsYUFBYSxNQUFNLFlBQVksTUFBTSxhQUFhLGFBQWEsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsVUFBVSxXQUFXLFVBQVUsV0FBVyxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsY0FBYyxjQUFjLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxhQUFhLGFBQWEsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksY0FBYyxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLGlDQUFpQyxrQ0FBa0MsaUNBQWlDLFdBQVcsZ0RBQWdELHFDQUFxQyxtQ0FBbUMsS0FBSyxvTEFBb0wsK0JBQStCLGtCQUFrQixtQkFBbUIsS0FBSyxjQUFjLHNCQUFzQiwrQkFBK0IsNEJBQTRCLHlCQUF5QixzQkFBc0IsbUNBQW1DLHlDQUF5QyxLQUFLLCtMQUErTCxzQkFBc0IsK0JBQStCLDRCQUE0QiwrQkFBK0IsZ0NBQWdDLG9EQUFvRCxLQUFLLHFCQUFxQixzQkFBc0IsZ0RBQWdELGlCQUFpQixvQkFBb0IscUJBQXFCLEtBQUssb0JBQW9CLGdDQUFnQyxxQkFBcUIsS0FBSyxzQkFBc0Isc0JBQXNCLDRCQUE0QixvQkFBb0IsS0FBSywwQkFBMEIsd0JBQXdCLEtBQUssc0JBQXNCLDhCQUE4QixtQ0FBbUMsS0FBSyx3QkFBd0Isc0JBQXNCLDRCQUE0QiwrQkFBK0IsZ0RBQWdELHlCQUF5Qiw0QkFBNEIsd0JBQXdCLEtBQUssZ0JBQWdCLDJCQUEyQix3QkFBd0IsS0FBSyw0TkFBNE4sc0JBQXNCLCtCQUErQixrQkFBa0Isd0JBQXdCLHNCQUFzQiwwQkFBMEIsNEJBQTRCLEtBQUssZ0JBQWdCLHNCQUFzQix1Q0FBdUMseUJBQXlCLEtBQUssZ0JBQWdCLHNCQUFzQix1Q0FBdUMseUJBQXlCLEtBQUssZ0JBQWdCLFNBQVMsNEJBQTRCLHlCQUF5QixLQUFLLG1HQUFtRyxzQkFBc0IsNEJBQTRCLGtCQUFrQixLQUFLLGdQQUFnUCxxQkFBcUIsb0JBQW9CLEtBQUsseUJBQXlCLHNCQUFzQiw0QkFBNEIsdUNBQXVDLG9CQUFvQixLQUFLLHVCQUF1QixxQkFBcUIsb0JBQW9CLEtBQUssd0JBQXdCLHFCQUFxQixvQkFBb0IsS0FBSywrQkFBK0IscUJBQXFCLG9CQUFvQixLQUFLLDROQUE0Tiw2QkFBNkIsd0RBQXdELDRCQUE0QixLQUFLLHNDQUFzQyx5QkFBeUIsS0FBSyxvQkFBb0Isd0JBQXdCLEtBQUssdUJBQXVCLHdCQUF3QixLQUFLLGtEQUFrRCxtQ0FBbUMsS0FBSyxxT0FBcU8sNkJBQTZCLHdEQUF3RCw0QkFBNEIsTUFBTSx1QkFBdUIsd0JBQXdCLEtBQUssc0NBQXNDLHdCQUF3QixLQUFLLGdEQUFnRCxtQ0FBbUMsS0FBSyx3WUFBd1ksc0JBQXNCLHFDQUFxQyxvQkFBb0IsTUFBTSx1Q0FBdUMsc0JBQXNCLDhDQUE4QywyQkFBMkIsS0FBSyxrQ0FBa0Msc0JBQXNCLDJDQUEyQyw0QkFBNEIsaUNBQWlDLGdDQUFnQyxvREFBb0QsS0FBSyw4QkFBOEIsMkJBQTJCLHlCQUF5QixtQ0FBbUMsS0FBSyxnQ0FBZ0Msc0JBQXNCLHFDQUFxQyw4QkFBOEIsb0JBQW9CLEtBQUssdURBQXVELG1DQUFtQyxLQUFLLHlOQUF5TixzQkFBc0IscUNBQXFDLG9CQUFvQixNQUFNLDJCQUEyQixzQkFBc0IsOENBQThDLG9CQUFvQixTQUFTLHNCQUFzQixzQkFBc0IsK0JBQStCLDRCQUE0QixnQ0FBZ0MseUJBQXlCLGdDQUFnQyxvREFBb0QsS0FBSywyQkFBMkIseUJBQXlCLG1DQUFtQyxLQUFLLCtOQUErTixzQkFBc0IscUNBQXFDLG9CQUFvQixNQUFNLG9DQUFvQyxzQkFBc0IsOENBQThDLG9CQUFvQixLQUFLLCtCQUErQixzQkFBc0IsMENBQTBDLDhCQUE4Qiw0QkFBNEIsZ0NBQWdDLG9EQUFvRCxLQUFLLG9EQUFvRCxvREFBb0QsOENBQThDLEtBQUssdUNBQXVDLHlDQUF5QyxLQUFLLHNCQUFzQix5QkFBeUIsbUNBQW1DLEtBQUssOExBQThMLHNCQUFzQiw0QkFBNEIsZ0NBQWdDLDRCQUE0QixtQkFBbUIsdUJBQXVCLHdCQUF3QixxQkFBcUIsaURBQWlELE1BQU0sNEJBQTRCLHNCQUFzQiw0Q0FBNEMsb0RBQW9ELDJDQUEyQyxzQ0FBc0MsTUFBTSxpQ0FBaUMsb0JBQW9CLEtBQUssc0JBQXNCLDJCQUEyQixzQkFBc0Isb0NBQW9DLG9EQUFvRCxzQ0FBc0Msb0NBQW9DLGlDQUFpQyxNQUFNLHNCQUFzQixxQ0FBcUMsc0NBQXNDLG9DQUFvQyxLQUFLLG9CQUFvQiwrQ0FBK0MsS0FBSyxvQkFBb0IsaURBQWlELEtBQUssb0JBQW9CLGlEQUFpRCxLQUFLLG9CQUFvQixpREFBaUQsS0FBSyxvQkFBb0IsaURBQWlELEtBQUssb0JBQW9CLGlEQUFpRCxLQUFLLG9CQUFvQixpREFBaUQsS0FBSyxvQkFBb0IsaURBQWlELEtBQUssb0JBQW9CLGlEQUFpRCxLQUFLLHFCQUFxQixpREFBaUQsS0FBSyxtQkFBbUI7QUFDdHFZO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDMWMxQjs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLHFGQUFxRjtBQUNyRjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaUJBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0ZBQXNGLHFCQUFxQjtBQUMzRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsaURBQWlELHFCQUFxQjtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Ysc0RBQXNELHFCQUFxQjtBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZEEsTUFBK0Y7QUFDL0YsTUFBcUY7QUFDckYsTUFBNEY7QUFDNUYsTUFBK0c7QUFDL0csTUFBd0c7QUFDeEcsTUFBd0c7QUFDeEcsTUFBbUc7QUFDbkc7QUFDQTs7QUFFQTs7QUFFQSw0QkFBNEIscUdBQW1CO0FBQy9DLHdCQUF3QixrSEFBYTs7QUFFckMsdUJBQXVCLHVHQUFhO0FBQ3BDO0FBQ0EsaUJBQWlCLCtGQUFNO0FBQ3ZCLDZCQUE2QixzR0FBa0I7O0FBRS9DLGFBQWEsMEdBQUcsQ0FBQyxzRkFBTzs7OztBQUk2QztBQUNyRSxPQUFPLGlFQUFlLHNGQUFPLElBQUksc0ZBQU8sVUFBVSxzRkFBTyxtQkFBbUIsRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsNEJBQTRCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkJBQTZCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbkZhOztBQUViOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ2pDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNUYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRjtBQUNqRjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQzVEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBd0M7QUFDaUM7QUFDTjtBQUNQO0FBQ0g7QUFDcEM7QUFFckJnQixnRkFBbUIsQ0FBQyxDQUFDOztBQUVyQjtBQUNBZCxzRkFBc0IsQ0FBQyxDQUFDO0FBQ3hCK0YsMkRBQXlCLENBQUMsQ0FBQzs7QUFFM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvYXBpQ2FsbHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbU1hbmlwdWxhdGlvbi9lcnJvck1lc3NhZ2VzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kb21NYW5pcHVsYXRpb24vbG9hZGluZ0Jhci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uL3JlbmRlclBhZ2VJbmZvLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIGhpZGVMb2FkaW5nQmFyLFxyXG4gIG1vdmVMb2FkaW5nQmFyLFxyXG4gIHJlbmRlckxvYWRpbmdCYXIsXHJcbn0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uL2xvYWRpbmdCYXJcIjtcclxuXHJcbi8vIFF1ZXJ5IHRvIHRoZSB3ZWF0aGVyYXBpIHNlcnZlclxyXG5hc3luYyBmdW5jdGlvbiBxdWVyeVdlYXRoZXJBcGkobG9jYXRpb24pIHtcclxuICBjb25zdCB3ZWF0aGVyQXBpS2V5ID0gXCJlZDU2ZTFiZDAxYzU0ODE3OGRkMTQ1NDA4MjQyMjAxXCI7XHJcblxyXG4gIC8vIERlbGF5IGZvciB0ZXN0aW5nXHJcbiAgYXdhaXQgbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgMjAwMDApKTtcclxuXHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3dlYXRoZXJBcGlLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcclxuICApO1xyXG5cclxuICByZXR1cm4gcmVzcG9uc2U7XHJcbn1cclxuXHJcbi8vIFRpbWVyIHRvIHByZXZlbnQgaGFuZ2luZyBhd2FpdCBvcGVyYXRpb25zXHJcbmFzeW5jIGZ1bmN0aW9uIHRpbWVvdXRQcm9taXNlKCkge1xyXG4gIGNvbnN0IFRJTUVPVVRfRFVSQVRJT04gPSAxMDAwO1xyXG5cclxuICBjb25zdCB0aW1lb3V0ID0gYXdhaXQgbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT4ge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHJlamVjdChcIlNlcnZlciByZXNwb25zZSB0aW1lZCBvdXQhXCIpO1xyXG4gICAgfSwgVElNRU9VVF9EVVJBVElPTik7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiB0aW1lb3V0O1xyXG59XHJcblxyXG4vLyBUcnkgdG8gcmVjaWV2ZSBkYXRhIGZyb20gdGhlIHdlYXRoZXJhcGkgc2VydmVyXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XHJcbiAgLy8gU3RhcnQgbG9hZGluZyBiYXIgYW5pbWF0aW9uXHJcbiAgcmVuZGVyTG9hZGluZ0JhcigpO1xyXG4gIGNvbnN0IGxvYWRpbmdCYXJJbnRlcnZhbCA9IHNldEludGVydmFsKG1vdmVMb2FkaW5nQmFyLCAxMDApO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBQcm9taXNlLnJhY2UoW1xyXG4gICAgICBxdWVyeVdlYXRoZXJBcGkobG9jYXRpb24pLFxyXG4gICAgICB0aW1lb3V0UHJvbWlzZSgpLFxyXG4gICAgXSk7XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cclxuICAgIC8vIEludmFsaWQgbG9jYXRpb25cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBub3QgZm91bmQhXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcbiAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiB3ZWF0aGVyYXBpIGZldGNoOlwiLCBlcnJvcik7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICAvLyBSZW1vdmUgbG9hZGluZyBiYXIgYW5pbWF0aW9uXHJcbiAgICBoaWRlTG9hZGluZ0JhcigpO1xyXG4gICAgY2xlYXJJbnRlcnZhbChsb2FkaW5nQmFySW50ZXJ2YWwpO1xyXG4gIH1cclxufVxyXG4iLCJmdW5jdGlvbiBpbml0aWFsaXNlU2VhcmNoRXJyb3JzKCkge1xyXG4gIHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcbiAgc2VhcmNoQmFyRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uICsgLmVycm9yLW1lc3NhZ2VcIik7XHJcbn1cclxuXHJcbi8vIEluZGljYXRlIGFuIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKGVycm9yKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBlcnJvcjtcclxuICBzZWFyY2hCYXJFcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC4yKVwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLm91dGxpbmVDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjIpXCI7XHJcbiAgc2VhcmNoQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmYzBjYlwiO1xyXG4gIHNlYXJjaEJhci5jbGFzc0xpc3QuYWRkKFwiZmllbGQtZXJyb3JcIik7XHJcbn1cclxuXHJcbi8vIEluZGljYXRlIG5vIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gcmVtb3ZlU2VhcmNoRXJyb3IoKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjApXCI7XHJcbiAgc2VhcmNoQmFyRXJyb3Iuc3R5bGUub3V0bGluZUNvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuMClcIjtcclxuICBzZWFyY2hCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgc2VhcmNoQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaWVsZC1lcnJvclwiKTtcclxufVxyXG5cclxubGV0IHNlYXJjaEJhciA9IG51bGw7XHJcbmxldCBzZWFyY2hCYXJFcnJvciA9IG51bGw7XHJcblxyXG5leHBvcnQgeyBpbml0aWFsaXNlU2VhcmNoRXJyb3JzLCBkaXNwbGF5U2VhcmNoRXJyb3IsIHJlbW92ZVNlYXJjaEVycm9yIH07XHJcbiIsIi8vIFNldCB1cCBsb2FkaW5nIGJhclxyXG5mdW5jdGlvbiBpbnRpYWxpc2VMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKTtcclxufVxyXG5cclxuLy8gU2hvdyB0aGUgbG9hZGluZyBiYXIgb24gdGhlIHNjcmVlblxyXG5mdW5jdGlvbiByZW5kZXJMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcclxufVxyXG5cclxuLy8gUmVtb3ZlIHRoZSBsb2FkaW5nIGJhciBvbiB0aGUgc2NyZWVuXHJcbmZ1bmN0aW9uIGhpZGVMb2FkaW5nQmFyKCkge1xyXG4gIG1vZGFsLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxufVxyXG5cclxuLy8gTW92ZSB0aGUgbG9hZGluZyBiYXIgdGhyb3VnaCBhIHN0ZXAgaW4gdGhlIGxvYWRpbmcgYW5pbWF0aW9uXHJcbmZ1bmN0aW9uIG1vdmVMb2FkaW5nQmFyKCkge1xyXG4gIGNvbnN0IExvYWRpbmdCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxvYWRpbmctYmFyXCIpO1xyXG4gIGNvbnN0IGxhc3RTcXVhcmUgPSBMb2FkaW5nQmFyLmZpcnN0RWxlbWVudENoaWxkO1xyXG5cclxuICBMb2FkaW5nQmFyLmFwcGVuZENoaWxkKGxhc3RTcXVhcmUpO1xyXG59XHJcblxyXG5sZXQgbW9kYWwgPSBudWxsO1xyXG5cclxuZXhwb3J0IHtcclxuICBpbnRpYWxpc2VMb2FkaW5nQmFyLFxyXG4gIHJlbmRlckxvYWRpbmdCYXIsXHJcbiAgaGlkZUxvYWRpbmdCYXIsXHJcbiAgbW92ZUxvYWRpbmdCYXIsXHJcbn07XHJcbiIsImltcG9ydCBkYXlUaW1lIGZyb20gXCIuLi9hc3NldHMvZGF5VGltZS5wbmdcIjtcclxuaW1wb3J0IG5pZ2h0VGltZSBmcm9tIFwiLi4vYXNzZXRzL25pZ2h0VGltZS5wbmdcIjtcclxuaW1wb3J0IHJhaW4gZnJvbSBcIi4uL2Fzc2V0cy9yYWluLnBuZ1wiO1xyXG5pbXBvcnQgc25vdyBmcm9tIFwiLi4vYXNzZXRzL3Nub3cucG5nXCI7XHJcblxyXG4vLyBNYXBwaW5nIG9mIHdlYXRoZXIgY29uZGl0aW9ucyB0byBjb2xvdXJzIHRoYXQgcmVwcmVzZW50IHRoZW1cclxuY29uc3Qgd2VhdGhlckNvbG9yTWFwcGluZyA9IFtcclxuICB7IGNvbmRpdGlvbnM6IFtcIlN1bm55XCJdLCBjb2xvdXI6IFwiIzUxOTZkN1wiIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJDbGVhclwiXSwgY29sb3VyOiBcIiMwZDE3MzBcIiB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiUGFydGx5IGNsb3VkeVwiXSwgY29sb3VyOiBcIiM4OWExYjhcIiB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJDbG91ZHlcIixcclxuICAgICAgXCJPdmVyY2FzdFwiLFxyXG4gICAgICBcIk1pc3RcIixcclxuICAgICAgXCJQYXRjaHkgcmFpbiBwb3NzaWJsZVwiLFxyXG4gICAgICBcIlBhdGNoeSBzbm93IHBvc3NpYmxlXCIsXHJcbiAgICAgIFwiUGF0Y2h5IHNsZWV0IHBvc3NpYmxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM2ZjgwOWRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGVcIixcclxuICAgICAgXCJCbG93aW5nIHNub3dcIixcclxuICAgICAgXCJCbGl6emFyZFwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGZvZ1wiLFxyXG4gICAgICBcIlBhdGNoeSBsaWdodCBkcml6emxlXCIsXHJcbiAgICAgIFwiTGlnaHQgZHJpenpsZVwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGRyaXp6bGVcIixcclxuICAgICAgXCJIZWF2eSBmcmVlemluZyBkcml6emxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiMxMjE4MjRcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiRm9nXCJdLCBjb2xvdXI6IFwiIzZmODA5ZFwiIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IGZyZWV6aW5nIHJhaW5cIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBmcmVlemluZyByYWluXCIsXHJcbiAgICAgIFwiTGlnaHQgc2xlZXRcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbGVldFwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3dcIixcclxuICAgICAgXCJMaWdodCBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IG1vZGVyYXRlIHNub3dcIixcclxuICAgICAgXCJNb2RlcmF0ZSBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IGhlYXZ5IHNub3dcIixcclxuICAgICAgXCJIZWF2eSBzbm93XCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiSWNlIHBlbGxldHNcIl0sIGNvbG91cjogXCIjNmY4MDlkXCIgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgcmFpblwiLFxyXG4gICAgICBcIk1vZGVyYXRlIHJhaW4gYXQgdGltZXNcIixcclxuICAgICAgXCJNb2RlcmF0ZSByYWluXCIsXHJcbiAgICAgIFwiSGVhdnkgcmFpbiBhdCB0aW1lc1wiLFxyXG4gICAgICBcIkhlYXZ5IHJhaW5cIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzU0NjE3NFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IHJhaW4gc2hvd2VyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiBzaG93ZXJcIixcclxuICAgICAgXCJUb3JyZW50aWFsIHJhaW4gc2hvd2VyXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM1NDYxNzRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCBzbGVldCBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQgc2hvd2Vyc1wiLFxyXG4gICAgICBcIkxpZ2h0IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgc2hvd2VycyBvZiBpY2UgcGVsbGV0c1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNob3dlcnMgb2YgaWNlIHBlbGxldHNcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzdhODdhYVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIlBhdGNoeSBsaWdodCByYWluIHdpdGggdGh1bmRlclwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3cgd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc25vdyB3aXRoIHRodW5kZXJcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzEyMTgyNFwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG4vLyBDb2xvdXIgdGhlIHBhZ2UgYmFja2dyb3VuZCBiYXNlZCBvbiBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xyXG5mdW5jdGlvbiBjb2xvdXJCYWNrZ3JvdW5kKGNvbmRpdGlvbikge1xyXG4gIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHJcbiAgd2VhdGhlckNvbG9yTWFwcGluZy5mb3JFYWNoKCh3ZWF0aGVyR3JvdXApID0+IHtcclxuICAgIGlmICh3ZWF0aGVyR3JvdXAuY29uZGl0aW9ucy5pbmNsdWRlcyhjb25kaXRpb24pKSB7XHJcbiAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gd2VhdGhlckdyb3VwLmNvbG91cjtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gTWFyayB0aGUgY3VycmVudCB0aW1lIG9uIHRoZSBob3VybHkgZm9yZWNhc3QgY2FyZHNcclxuZnVuY3Rpb24gbWFya0N1cnJlbnRIb3VyKGN1cnJlbnRUaW1lKSB7XHJcbiAgY29uc3QgaG91cmx5VGltZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdXJseS10aW1lXCIpO1xyXG5cclxuICBob3VybHlUaW1lcy5mb3JFYWNoKCh0aW1lKSA9PiB7XHJcbiAgICBjb25zdCBob3VybHlDYXJkID0gdGltZS5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKHBhcnNlSW50KHRpbWUudGV4dENvbnRlbnQpID09PSBwYXJzZUludChjdXJyZW50VGltZSkpIHtcclxuICAgICAgaG91cmx5Q2FyZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1ob3VyLWNhcmRcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBob3VybHlDYXJkLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50LWhvdXItY2FyZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gQWRkIHBlcnNpc3RlbnQgaWNvbnMgdG8gdGhlIHBhZ2VcclxuZnVuY3Rpb24gYWRkSWNvbnMoKSB7XHJcbiAgY29uc3Qgc3VucmlzZUljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnJpc2UtaWNvblwiKTtcclxuICBjb25zdCBzdW5zZXRJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdW5zZXQtaWNvblwiKTtcclxuICBjb25zdCByYWluSWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnJhaW4taWNvblwiKTtcclxuICBjb25zdCBzbm93SWNvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNub3ctaWNvblwiKTtcclxuXHJcbiAgc3VucmlzZUljb24uc3JjID0gZGF5VGltZTtcclxuICBzdW5zZXRJY29uLnNyYyA9IG5pZ2h0VGltZTtcclxuICByYWluSWNvbnMuZm9yRWFjaCgoaWNvbikgPT4ge1xyXG4gICAgaWNvbi5zcmMgPSByYWluO1xyXG4gIH0pO1xyXG4gIHNub3dJY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHNub3c7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIEZpbGwgdGhlIHBhZ2Ugd2l0aCB3ZWF0aGVyIGluZm9ybWF0aW9uXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZpbGxQYWdlRGF0YShkYXRhLCB1bml0cykge1xyXG4gIGNvbnN0IG5vblVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIExvY2F0aW9uIGRldGFpbHNcclxuICAgIHsgc2VsZWN0b3I6IFwiLmNpdHktbmFtZVwiLCBkYXRhOiBkYXRhLmxvY2F0aW9uLm5hbWUudG9VcHBlckNhc2UoKSB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuY291bnRyeS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24uY291bnRyeSB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIubG9jYWwtdGltZVwiLFxyXG4gICAgICBkYXRhOlxyXG4gICAgICAgIHBhcnNlSW50KGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXSkgPCAxMlxyXG4gICAgICAgICAgPyBgJHtkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV19IEFNYFxyXG4gICAgICAgICAgOiBgJHtwYXJzZUludChkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCI6XCIpWzBdKSAtIDEyfToke2RhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIjpcIilbMV19IFBNYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb2NhbC1kYXRlXCIsXHJcbiAgICAgIGRhdGE6IG5ldyBEYXRlKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVswXSkudG9Mb2NhbGVEYXRlU3RyaW5nKFxyXG4gICAgICAgIFwiZW4tVUtcIixcclxuICAgICAgICB7IHllYXI6IFwibnVtZXJpY1wiLCBtb250aDogXCJzaG9ydFwiLCBkYXk6IFwibnVtZXJpY1wiIH0sXHJcbiAgICAgICksXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuc3VucmlzZS10aW1lXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3VucmlzZSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5zdW5zZXQtdGltZVwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnNldCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gICAgLy8gQ3VycmVudCB3ZWF0aGVyIGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQsXHJcbiAgICB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLXV2XCIsIGRhdGE6IGRhdGEuY3VycmVudC51diB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLWh1bWlkaXR5XCIsIGRhdGE6IGAke2RhdGEuY3VycmVudC5odW1pZGl0eX0lYCB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIuZGV0YWlsLXdpbmQtZGlyZWN0aW9uXCIsIGRhdGE6IGRhdGEuY3VycmVudC53aW5kX2RpciB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCB1bml0VGV4dERhdGEgPSBbXHJcbiAgICAvLyBDdXJyZW50IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmN1cnJlbnQtdGVtcFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuY3VycmVudC50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQudGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC1mZWVscy1saWtlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LmZlZWxzbGlrZV9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC1wcmVjaXBpdGF0aW9uXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9tbX0gbW1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LnByZWNpcF9pbn0gaW5gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRldGFpbC13aW5kLXNwZWVkXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LndpbmRfa3BofSBrbS9oYCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC53aW5kX21waH0gbXBoYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb3ctaGlnaC10ZW1wXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIC8vIEhvdXJseSBmb3JlY2FzdCBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTAgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTMgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci00ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzVdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTYgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci03ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbN10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzhdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTkgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzExXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEyID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTQgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE0XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE1ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTZdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTcgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE3XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE4ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTldLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjAgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIwXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIxID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjJdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjMgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIzXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgaWNvbkRhdGEgPSBbXHJcbiAgICAvLyBDdXJyZW50IHdlYXRoZXIgaWNvblxyXG4gICAgeyBzZWxlY3RvcjogXCIud2VhdGhlci1pY29uXCIsIGRhdGE6IGRhdGEuY3VycmVudC5jb25kaXRpb24uaWNvbiB9LFxyXG4gICAgLy8gVGhyZWUgZGF5IGZvcmVjYXN0IGljb25zXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICAvLyBIb3VybHkgZm9yZWNhc3QgaWNvbnNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzJdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci00ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTUgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzVdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci03ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTggPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzhdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzExXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEyID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTQgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE0XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE1ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTZdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTcgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE3XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE4ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTldLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjAgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIwXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIxID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjJdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjMgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIzXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgLy8gQWRkIGRhdGEgdG8gdGhlIHBhZ2VcclxuICBub25Vbml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUVsZW0uc2VsZWN0b3IpLnRleHRDb250ZW50ID0gZGF0YUVsZW0uZGF0YTtcclxuICB9KTtcclxuXHJcbiAgaWYgKHVuaXRzID09PSBcIk1ldHJpY1wiKSB7XHJcbiAgICB1bml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5tZXRyaWM7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgdW5pdFRleHREYXRhLmZvckVhY2goKGRhdGFFbGVtKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUVsZW0uc2VsZWN0b3IpLnRleHRDb250ZW50ID0gZGF0YUVsZW0uaW1wZXJpYWw7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGljb25EYXRhLmZvckVhY2goKGljb25FbGVtKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGljb25FbGVtLnNlbGVjdG9yKS5zcmMgPSBpY29uRWxlbS5kYXRhO1xyXG4gIH0pO1xyXG5cclxuICBtYXJrQ3VycmVudEhvdXIoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdKTtcclxuICBhZGRJY29ucygpO1xyXG4gIGNvbG91ckJhY2tncm91bmQoZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0KTtcclxufVxyXG5cclxuLy8gZnVuY3Rpb24gYWRkR2lmKHVybCkge1xyXG4vLyAgIGNvbnN0IGdpZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2lmLWNvbnRhaW5lciA+IGltZ1wiKTtcclxuLy8gICBnaWYuc3JjID0gdXJsO1xyXG4vLyB9XHJcbiIsImltcG9ydCBnZXRXZWF0aGVyRGF0YSBmcm9tIFwiLi9hcGlDYWxsc1wiO1xyXG5pbXBvcnQgZmlsbFBhZ2VEYXRhIGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi9yZW5kZXJQYWdlSW5mb1wiO1xyXG5pbXBvcnQge1xyXG4gIGRpc3BsYXlTZWFyY2hFcnJvcixcclxuICByZW1vdmVTZWFyY2hFcnJvcixcclxufSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24vZXJyb3JNZXNzYWdlc1wiO1xyXG5cclxuLy8gUXVlcnkgd2VhdGhlcmFwaSBiYXNlZCBvbiBzZWFyY2hiYXIgaW5wdXQgbG9jYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpIHtcclxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcblxyXG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSFcIjtcclxuXHJcbiAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB1bml0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ1bml0c1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaEJhci52YWx1ZSlcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICByZW1vdmVTZWFyY2hFcnJvcigpO1xyXG4gICAgICAgICAgZmlsbFBhZ2VEYXRhKGRhdGEsIHVuaXRzKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBpbiBnZXRXZWF0aGVyRGF0YTpcIiwgZXJyb3IpO1xyXG4gICAgICAgICAgZGlzcGxheVNlYXJjaEVycm9yKGVycm9yKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgOnJvb3Qge1xyXG4gICAgLS1pbXBvcnRhbnQtdGV4dDogI2ZmZmZmZjtcclxuICAgIC0tY29udGV4dC10ZXh0OiAjRjVGN0Y3OyAvKiNmOGY4Zjg7ICNmYWZhZmEqL1xyXG4gICAgLS1kYXJrLWltcG9ydGFudC10ZXh0OiAjMDAwMDAwO1xyXG4gICAgLS1kYXJrLWNvbnRleHQtdGV4dDogIzMzMzMzMztcclxuXHJcbiAgICAtLWxvYWRpbmctc3F1YXJlOiAyMHB4O1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2VuZXJhbCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuKiB7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG5cclxuICAgIGNvbG9yOiB2YXIoLS1pbXBvcnRhbnQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmZvcm0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG5cclxuLmZvcm0tZmllbGQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5zZWFyY2hiYXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi51bml0LW9wdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC4ycmVtO1xyXG59XHJcblxyXG4udW5pdC1vcHRpb24gPiAqIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmZpZWxkLWVycm9yIHtcclxuICAgIGJvcmRlci1jb2xvcjogI2ZmMDAwMDtcclxuICAgIG91dGxpbmU6IDFweCBzb2xpZCAjZmYwMDAwO1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcblxyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFdlYXRoZXIgSW5mb3JtYXRpb24gTGF5b3V0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLndlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLnJvdy0xIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ucm93LTMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcclxuICAgIGNvbHVtbi1nYXA6IDFyZW07XHJcbn1cclxuXHJcbi5yb3ctMyB7XHJcblxyXG59XHJcblxyXG4uc3Vic2VjdGlvbi1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXHJcbi5zdW4taW5mbyxcclxuLndlYXRoZXItZGVzY3JpcHRpb24sXHJcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBJY29uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLnJhaW4taWNvbixcclxuLnNub3ctaWNvbixcclxuLnN1bnJpc2UtaWNvbixcclxuLnN1bnNldC1pY29uIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG59XHJcblxyXG4uaWNvbi10ZXh0LXBhaXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLndlYXRoZXItaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDU4cHg7XHJcbiAgICB3aWR0aDogNThweDtcclxufVxyXG5cclxuLmZvcmVjYXN0LWljb24ge1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgd2lkdGg6IDQ2cHg7XHJcbn1cclxuXHJcbi5ob3VybHktZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB3aWR0aDogMzBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG4uY2l0eS1uYW1lLFxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXHJcbi5zdW4taW5mbyB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59IFxyXG5cclxuLmN1cnJlbnQtdGVtcCB7XHJcbiAgICBmb250LXNpemU6IDgwcHg7XHJcbn1cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xyXG4gICAgZm9udC1zaXplOiA1MHB4O1xyXG59XHJcblxyXG4ubG93LWhpZ2gtdGVtcCxcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdpZiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaHJlZSBEYXkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgNWZyIDFmcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMC4ycmVtIDFyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4ud2VhdGhlci1yYWluLWNoYW5jZSxcclxuLndlYXRoZXItc25vdy1jaGFuY2Uge1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDdXJyZW50IERldGFpbHMgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLmRldGFpbC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDIsIDFmcik7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuXHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCA+IGg0IHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuLyogTWFya3MgY3VycmVudCBob3VyICovXHJcbi5jdXJyZW50LWhvdXItY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xyXG5cclxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWltcG9ydGFudC10ZXh0KTtcclxufVxyXG4uY3VycmVudC1ob3VyLWNhcmQgPiAuaG91cmx5LXRpbWUge1xyXG4gICAgY29sb3I6IHZhcigtLWRhcmstY29udHJhc3QtdGV4dCk7XHJcbn1cclxuXHJcbi5ob3VybHktdGltZSB7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBMb2FkIEJhciBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5tb2RhbCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHotaW5kZXg6IDI7XHJcbiAgICBvdmVyZmxvdzogYXV0bztcclxuXHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogMTAwJTtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XHJcbn0gXHJcblxyXG4ubG9hZGluZy1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIGF1dG8pO1xyXG5cclxuICAgIHdpZHRoOiBjYWxjKHZhcigtLWxvYWRpbmctc3F1YXJlKSAqIDEzKTtcclxuXHJcbiAgICBwYWRkaW5nOiB2YXIoLS1sb2FkaW5nLXNxdWFyZSk7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2EwYTBhMDtcclxufSBcclxuXHJcbi5sb2FkaW5nLXRleHQtY29udGFpbmVyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubG9hZGluZy1iYXIge1xyXG4gICAgYWxpZ24tc2VsZjogY2VudGVyO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTtcclxuXHJcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1sb2FkaW5nLXNxdWFyZSkgKiAxMSk7XHJcbiAgICBoZWlnaHQ6IHZhcigtLWxvYWRpbmctc3F1YXJlKTtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIG91dGxpbmU6IDFweCBzb2xpZCBibGFjaztcclxufSBcclxuXHJcbi5sb2FkLXNxdWFyZSB7XHJcbiAgICB3aWR0aDogdmFyKC0tbG9hZGluZy1zcXVhcmUpO1xyXG4gICAgaGVpZ2h0OiB2YXIoLS1sb2FkaW5nLXNxdWFyZSk7XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTEge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMSk7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC45KTtcclxufVxyXG4ubG9hZC1zcXVhcmUtMyB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjgpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS00IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNyk7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTUge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC42KTtcclxufVxyXG4ubG9hZC1zcXVhcmUtNiB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjUpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS03IHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNCk7XHJcbn1cclxuLmxvYWQtc3F1YXJlLTgge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4zKTtcclxufVxyXG4ubG9hZC1zcXVhcmUtOSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjIpO1xyXG59XHJcbi5sb2FkLXNxdWFyZS0xMCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjEpO1xyXG59YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0lBQ0kseUJBQXlCO0lBQ3pCLHVCQUF1QixFQUFFLG1CQUFtQjtJQUM1Qyw4QkFBOEI7SUFDOUIsNEJBQTRCOztJQUU1QixzQkFBc0I7QUFDMUI7O0FBRUE7Ozs7RUFJRTtBQUNGO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjs7SUFFbkIsWUFBWTtJQUNaLGFBQWE7O0lBRWIsc0JBQXNCOztJQUV0Qiw0QkFBNEI7QUFDaEM7O0FBRUE7Ozs7RUFJRTs7QUFFRjtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1COztJQUVuQixrQkFBa0I7O0lBRWxCLG1CQUFtQjtJQUNuQiwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLFFB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Qjs7SUFFbkIsbUJBQW1CO0lBQ25CLDJDQUEyQztBQUMvQztBQUNBLHVCQUF1QjtBQUN2QjtJQUNJLDJDQUEyQzs7SUFFM0MsaUNBQWlDO0FBQ3JDO0FBQ0E7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsMEJBQTBCO0FBQzlCOztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0lBQ25CLHVCQUF1Qjs7SUFFdkIsZUFBZTtJQUNmLFVBQVU7SUFDVixjQUFjOztJQUVkLFdBQVc7SUFDWCxZQUFZOztJQUVaLG9DQUFvQztBQUN4Qzs7QUFFQTtJQUNJLGFBQWE7SUFDYixtQ0FBbUM7O0lBRW5DLHVDQUF1Qzs7SUFFdkMsOEJBQThCOztJQUU5Qix5QkFBeUI7QUFDN0I7O0FBRUE7SUFDSSxXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxrQkFBa0I7SUFDbEIsYUFBYTtJQUNiLDJCQUEyQjs7SUFFM0IsdUNBQXVDO0lBQ3ZDLDZCQUE2Qjs7SUFFN0IsdUJBQXVCO0lBQ3ZCLHdCQUF3QjtBQUM1Qjs7QUFFQTtJQUNJLDRCQUE0QjtJQUM1Qiw2QkFBNkI7O0lBRTdCLHVCQUF1QjtBQUMzQjtBQUNBO0lBQ0ksc0NBQXNDO0FBQzFDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDO0FBQ0E7SUFDSSx3Q0FBd0M7QUFDNUM7QUFDQTtJQUNJLHdDQUF3QztBQUM1QztBQUNBO0lBQ0ksd0NBQXdDO0FBQzVDXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gICAgLS1pbXBvcnRhbnQtdGV4dDogI2ZmZmZmZjtcXHJcXG4gICAgLS1jb250ZXh0LXRleHQ6ICNGNUY3Rjc7IC8qI2Y4ZjhmODsgI2ZhZmFmYSovXFxyXFxuICAgIC0tZGFyay1pbXBvcnRhbnQtdGV4dDogIzAwMDAwMDtcXHJcXG4gICAgLS1kYXJrLWNvbnRleHQtdGV4dDogIzMzMzMzMztcXHJcXG5cXHJcXG4gICAgLS1sb2FkaW5nLXNxdWFyZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHZW5lcmFsIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG4qIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0taW1wb3J0YW50LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS1maWVsZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiA0cHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5zZWFyY2hiYXIge1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udW5pdC1vcHRpb24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDAuMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uID4gKiB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwO1xcclxcbiAgICBvdXRsaW5lOiAxcHggc29saWQgI2ZmMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmVycm9yLW1lc3NhZ2Uge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuXFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDApO1xcclxcblxcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogV2VhdGhlciBJbmZvcm1hdGlvbiBMYXlvdXQgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGdhcDogMXJlbTtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDgwdnc7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuXFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdy0xIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTMge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAzZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zdWJzZWN0aW9uLWhlYWRlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XFxyXFxufVxcclxcblxcclxcbi5sb2NhdGlvbi1kYXRldGltZS1kZXRhaWxzLFxcclxcbi5zdW4taW5mbyxcXHJcXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEljb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5yYWluLWljb24sXFxyXFxuLnNub3ctaWNvbixcXHJcXG4uc3VucmlzZS1pY29uLFxcclxcbi5zdW5zZXQtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5pY29uLXRleHQtcGFpciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi53ZWF0aGVyLWljb24ge1xcclxcbiAgICBoZWlnaHQ6IDU4cHg7XFxyXFxuICAgIHdpZHRoOiA1OHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNDZweDtcXHJcXG4gICAgd2lkdGg6IDQ2cHg7XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogTG9jYXRpb24gSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5sb2NhdGlvbi1pbmZvLWNvbnRhaW5lciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2l0eS1uYW1lLFxcclxcbi5jb3VudHJ5LW5hbWUge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uY2l0eS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY291bnRyeS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubG9jYXRpb24tZGF0ZXRpbWUtZGV0YWlscyxcXHJcXG4uc3VuLWluZm8ge1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBDdXJyZW50IFdlYXRoZXIgSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufSBcXHJcXG5cXHJcXG4uY3VycmVudC10ZW1wIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubG93LWhpZ2gtdGVtcCxcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogR2lmIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtY2FyZC1kZXRhaWxzIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItcmFpbi1jaGFuY2UsXFxyXFxuLndlYXRoZXItc25vdy1jaGFuY2Uge1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBDdXJyZW50IERldGFpbHMgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufSBcXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQtZ3JpZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDIsIDFmcik7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQgPiBoNCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cXHJcXG4uY3VycmVudC1ob3VyLWNhcmQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0tZGFyay1pbXBvcnRhbnQtdGV4dCk7XFxyXFxufVxcclxcbi5jdXJyZW50LWhvdXItY2FyZCA+IC5ob3VybHktdGltZSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWNvbnRyYXN0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5LXRpbWUge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBMb2FkIEJhciBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLm1vZGFsIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBvc2l0aW9uOiBmaXhlZDtcXHJcXG4gICAgei1pbmRleDogMjtcXHJcXG4gICAgb3ZlcmZsb3c6IGF1dG87XFxyXFxuXFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44KTtcXHJcXG59IFxcclxcblxcclxcbi5sb2FkaW5nLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDIsIGF1dG8pO1xcclxcblxcclxcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1sb2FkaW5nLXNxdWFyZSkgKiAxMyk7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IHZhcigtLWxvYWRpbmctc3F1YXJlKTtcXHJcXG5cXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2EwYTBhMDtcXHJcXG59IFxcclxcblxcclxcbi5sb2FkaW5nLXRleHQtY29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbi5sb2FkaW5nLWJhciB7XFxyXFxuICAgIGFsaWduLXNlbGY6IGNlbnRlcjtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlO1xcclxcblxcclxcbiAgICB3aWR0aDogY2FsYyh2YXIoLS1sb2FkaW5nLXNxdWFyZSkgKiAxMSk7XFxyXFxuICAgIGhlaWdodDogdmFyKC0tbG9hZGluZy1zcXVhcmUpO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIGJsYWNrO1xcclxcbn0gXFxyXFxuXFxyXFxuLmxvYWQtc3F1YXJlIHtcXHJcXG4gICAgd2lkdGg6IHZhcigtLWxvYWRpbmctc3F1YXJlKTtcXHJcXG4gICAgaGVpZ2h0OiB2YXIoLS1sb2FkaW5nLXNxdWFyZSk7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtMSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDEpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtMiB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuOSk7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS0zIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC44KTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjcpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtNSB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuNik7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS02IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC41KTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTcge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDEwMiwgMjU1LCAwLjQpO1xcclxcbn1cXHJcXG4ubG9hZC1zcXVhcmUtOCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMTAyLCAyNTUsIDAuMyk7XFxyXFxufVxcclxcbi5sb2FkLXNxdWFyZS05IHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4yKTtcXHJcXG59XFxyXFxuLmxvYWQtc3F1YXJlLTEwIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAxMDIsIDI1NSwgMC4xKTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IGdldFdlYXRoZXJEYXRhIGZyb20gXCIuL2FwaUNhbGxzXCI7XHJcbmltcG9ydCB7IGluaXRpYWxpc2VTZWFyY2hFcnJvcnMgfSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24vZXJyb3JNZXNzYWdlc1wiO1xyXG5pbXBvcnQgeyBpbnRpYWxpc2VMb2FkaW5nQmFyIH0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uL2xvYWRpbmdCYXJcIjtcclxuaW1wb3J0IGZpbGxQYWdlRGF0YSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb24vcmVuZGVyUGFnZUluZm9cIjtcclxuaW1wb3J0IGFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmludGlhbGlzZUxvYWRpbmdCYXIoKTtcclxuXHJcbi8vIEluaXRpYWxpc2Ugc2VhcmNoIGJhclxyXG5pbml0aWFsaXNlU2VhcmNoRXJyb3JzKCk7XHJcbmFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIoKTtcclxuXHJcbi8vIC8vIEluaXRpYWwgZGF0YSBjYWxsXHJcbi8vIGdldFdlYXRoZXJEYXRhKFwiT2RlbnZpbGxlXCIpXHJcbi8vICAgLnRoZW4oKGRhdGEpID0+IHtcclxuLy8gICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4vLyAgICAgZmlsbFBhZ2VEYXRhKGRhdGEsIFwibWV0cmljXCIpO1xyXG4vLyAgIH0pXHJcbi8vICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGluaXRhbCBwYWdlIGxvYWQ6XCIsIGVycm9yKTtcclxuLy8gICB9KTtcclxuIl0sIm5hbWVzIjpbImhpZGVMb2FkaW5nQmFyIiwibW92ZUxvYWRpbmdCYXIiLCJyZW5kZXJMb2FkaW5nQmFyIiwicXVlcnlXZWF0aGVyQXBpIiwibG9jYXRpb24iLCJ3ZWF0aGVyQXBpS2V5IiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwicmVzcG9uc2UiLCJmZXRjaCIsInRpbWVvdXRQcm9taXNlIiwiVElNRU9VVF9EVVJBVElPTiIsInRpbWVvdXQiLCJfIiwicmVqZWN0IiwiZ2V0V2VhdGhlckRhdGEiLCJsb2FkaW5nQmFySW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsInJhY2UiLCJjb25zb2xlIiwibG9nIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwiY2xlYXJJbnRlcnZhbCIsImluaXRpYWxpc2VTZWFyY2hFcnJvcnMiLCJzZWFyY2hCYXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hCYXJFcnJvciIsImRpc3BsYXlTZWFyY2hFcnJvciIsInRleHRDb250ZW50Iiwic3R5bGUiLCJiYWNrZ3JvdW5kQ29sb3IiLCJvdXRsaW5lQ29sb3IiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmVTZWFyY2hFcnJvciIsInJlbW92ZSIsImludGlhbGlzZUxvYWRpbmdCYXIiLCJtb2RhbCIsImRpc3BsYXkiLCJMb2FkaW5nQmFyIiwibGFzdFNxdWFyZSIsImZpcnN0RWxlbWVudENoaWxkIiwiYXBwZW5kQ2hpbGQiLCJkYXlUaW1lIiwibmlnaHRUaW1lIiwicmFpbiIsInNub3ciLCJ3ZWF0aGVyQ29sb3JNYXBwaW5nIiwiY29uZGl0aW9ucyIsImNvbG91ciIsImNvbG91ckJhY2tncm91bmQiLCJjb25kaXRpb24iLCJwYWdlIiwiZm9yRWFjaCIsIndlYXRoZXJHcm91cCIsImluY2x1ZGVzIiwibWFya0N1cnJlbnRIb3VyIiwiY3VycmVudFRpbWUiLCJob3VybHlUaW1lcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0aW1lIiwiaG91cmx5Q2FyZCIsInBhcmVudEVsZW1lbnQiLCJwYXJzZUludCIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwicmFpbkljb25zIiwic25vd0ljb25zIiwic3JjIiwiaWNvbiIsImZpbGxQYWdlRGF0YSIsImRhdGEiLCJ1bml0cyIsIm5vblVuaXRUZXh0RGF0YSIsInNlbGVjdG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInllYXIiLCJtb250aCIsImRheSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY3VycmVudCIsInRleHQiLCJ1diIsImh1bWlkaXR5Iiwid2luZF9kaXIiLCJ1bml0VGV4dERhdGEiLCJtZXRyaWMiLCJ0ZW1wX2MiLCJpbXBlcmlhbCIsInRlbXBfZiIsImZlZWxzbGlrZV9jIiwiZmVlbHNsaWtlX2YiLCJwcmVjaXBfbW0iLCJwcmVjaXBfaW4iLCJ3aW5kX2twaCIsIndpbmRfbXBoIiwibWludGVtcF9jIiwibWF4dGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9mIiwiaG91ciIsImljb25EYXRhIiwiZGF0YUVsZW0iLCJpY29uRWxlbSIsImFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIiLCJzdWJtaXRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsaWRpdHkiLCJ2YWx1ZU1pc3NpbmciLCJ2YWx1ZSIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=