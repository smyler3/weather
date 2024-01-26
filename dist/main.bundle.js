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
/* harmony import */ var _errorMessages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errorMessages */ "./src/errorMessages.js");

async function getWeatherData(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`);
    console.log(response);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not recognised!");
    }
    return response.json();
  } catch (error) {
    const searchBar = document.querySelector("#location");
    const searchBarError = document.querySelector("#location + .error-message");
    console.error("Error in weatherapi fetch:", error);
    (0,_errorMessages__WEBPACK_IMPORTED_MODULE_0__.displaySearchError)(searchBar, searchBarError, error);
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

// const gifApiKey = "TuqD2iuVA7pLwDtPdA9f5kV5rHttZKzx";

/***/ }),

/***/ "./src/domManipulation.js":
/*!********************************!*\
  !*** ./src/domManipulation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ fillPageData)
/* harmony export */ });
/* harmony import */ var _assets_dayTime_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/dayTime.png */ "./src/assets/dayTime.png");
/* harmony import */ var _assets_nightTime_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets/nightTime.png */ "./src/assets/nightTime.png");
/* harmony import */ var _assets_rain_png__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets/rain.png */ "./src/assets/rain.png");
/* harmony import */ var _assets_snow_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets/snow.png */ "./src/assets/snow.png");





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

/***/ "./src/errorMessages.js":
/*!******************************!*\
  !*** ./src/errorMessages.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displaySearchError: () => (/* binding */ displaySearchError),
/* harmony export */   removeSearchError: () => (/* binding */ removeSearchError)
/* harmony export */ });
// Indicate an error in the search
function displaySearchError(searchBar, searchBarError, error) {
  searchBarError.textContent = error;
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.2)";
  searchBar.style.backgroundColor = "#ffc0cb";
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError(searchBar, searchBarError) {
  searchBarError.textContent = "";
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.0)";
  searchBar.style.backgroundColor = "#ffffff";
  searchBar.classList.remove("field-error");
}


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
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManipulation */ "./src/domManipulation.js");
/* harmony import */ var _errorMessages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorMessages */ "./src/errorMessages.js");




// Try to add data to page based on searchbar result
function addSearchBarEventListener() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  const searchBarError = document.querySelector("#location + .error-message");
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";
      (0,_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(searchBar, searchBarError, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])(searchBar.value).then(data => {
        console.log(data);
        (0,_errorMessages__WEBPACK_IMPORTED_MODULE_2__.removeSearchError)(searchBar, searchBarError);
        (0,_domManipulation__WEBPACK_IMPORTED_MODULE_1__["default"])(data, units);
      }).catch(error => {
        console.error("Error in getWeatherData:", error);
        (0,_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(searchBar, searchBarError, error);
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n    --important-text: #ffffff;\r\n    --context-text: #F5F7F7; /*#f8f8f8; #fafafa*/\r\n    --dark-important-text: #000000;\r\n    --dark-context-text: #333333;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: var(--important-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 4px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.field-error {\r\n    border-color: #ff0000;\r\n    outline: 1px solid #ff0000;\r\n}\r\n\r\n.error-message {\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    padding-left: 10px;\r\n\r\n    outline: 1px solid rgba(0, 0, 0, 0);\r\n\r\n    color: white;\r\n    font-weight: bolder;\r\n    font-size: 1rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n.low-high-temp,\r\n.precipitation-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-rain-chance,\r\n.weather-snow-chance {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n/* Marks current hour */\r\n.current-hour-card {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: var(--dark-important-text);\r\n}\r\n.current-hour-card > .hourly-time {\r\n    color: var(--dark-contrast-text);\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _eventListeners__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./eventListeners */ "./src/eventListeners.js");
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.css */ "./src/style.css");


(0,_eventListeners__WEBPACK_IMPORTED_MODULE_0__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsT0FBTyxnRkFBZ0YsWUFBWSx5QkFBeUIsYUFBYSxhQUFhLE9BQU8sUUFBUSxLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLGFBQWEsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLGFBQWEsY0FBYyxjQUFjLFdBQVcsWUFBWSxXQUFXLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksWUFBWSxVQUFVLFdBQVcsV0FBVyxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxNQUFNLE1BQU0sS0FBSyxZQUFZLE9BQU8sUUFBUSxVQUFVLFlBQVksV0FBVyxNQUFNLFFBQVEsTUFBTSxRQUFRLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLFFBQVEsTUFBTSxLQUFLLGFBQWEsYUFBYSxhQUFhLE9BQU8sTUFBTSxZQUFZLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sTUFBTSxZQUFZLE9BQU8sUUFBUSxNQUFNLEtBQUssYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsT0FBTyxLQUFLLFVBQVUsT0FBTyxNQUFNLFlBQVksT0FBTyxRQUFRLE1BQU0sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxNQUFNLFlBQVksT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFlBQVksTUFBTSxLQUFLLFVBQVUsWUFB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Ozs7OztBQ0F5RDtBQUNwQztBQUVyQnVGLDJEQUF5QixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9lcnJvck1lc3NhZ2VzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkaXNwbGF5U2VhcmNoRXJyb3IgfSBmcm9tIFwiLi9lcnJvck1lc3NhZ2VzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIGNvbnN0IHdlYXRoZXJBcGlLZXkgPSBcImVkNTZlMWJkMDFjNTQ4MTc4ZGQxNDU0MDgyNDIyMDFcIjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3dlYXRoZXJBcGlLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcclxuICAgICk7XHJcblxyXG4gICAgY29uc29sZS5sb2cocmVzcG9uc2UpO1xyXG5cclxuICAgIC8vIEludmFsaWQgbG9jYXRpb25cclxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDQwMCkge1xyXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJMb2NhdGlvbiBub3QgcmVjb2duaXNlZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvblwiKTtcclxuICAgIGNvbnN0IHNlYXJjaEJhckVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbiArIC5lcnJvci1tZXNzYWdlXCIpO1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIHdlYXRoZXJhcGkgZmV0Y2g6XCIsIGVycm9yKTtcclxuICAgIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhc3luYyBmdW5jdGlvbiBnZXRHaWZEYXRhKGxvY2F0aW9uLCBjb25kaXRpb24pIHtcclxuLy8gICBjb25zdCBzZWFyY2hUZXJtID0gYCR7bG9jYXRpb259LSR7Y29uZGl0aW9ufWA7XHJcbi8vICAgY29uc29sZS5sb2coc2VhcmNoVGVybSk7XHJcbi8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuLy8gICAgIGBodHRwczovL2FwaS5naXBoeS5jb20vdjEvZ2lmcy90cmFuc2xhdGU/YXBpX2tleT0ke2dpZkFwaUtleX0mcz0ke3NlYXJjaFRlcm19YCxcclxuLy8gICApO1xyXG4vLyAgIGV4dHJhY3RHaWZEYXRhKHJlc3BvbnNlKTtcclxuLy8gfVxyXG5cclxuLy8gYXN5bmMgZnVuY3Rpb24gZXh0cmFjdEdpZkRhdGEocmVzcG9uc2UpIHtcclxuLy8gICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICBjb25zb2xlLmxvZyhqc29uRGF0YSk7XHJcbi8vICAgY29uc29sZS5sb2coanNvbkRhdGEuZGF0YS5pbWFnZXMuZml4ZWRfaGVpZ2h0X3NtYWxsLnVybCk7XHJcbi8vICAgYWRkR2lmKGpzb25EYXRhLmRhdGEuaW1hZ2VzLmZpeGVkX2hlaWdodF9zbWFsbC51cmwpO1xyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBnaWZBcGlLZXkgPSBcIlR1cUQyaXVWQTdwTHdEdFBkQTlmNWtWNXJIdHRaS3p4XCI7XHJcbiIsImltcG9ydCBkYXlUaW1lIGZyb20gXCIuL2Fzc2V0cy9kYXlUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgbmlnaHRUaW1lIGZyb20gXCIuL2Fzc2V0cy9uaWdodFRpbWUucG5nXCI7XHJcbmltcG9ydCByYWluIGZyb20gXCIuL2Fzc2V0cy9yYWluLnBuZ1wiO1xyXG5pbXBvcnQgc25vdyBmcm9tIFwiLi9hc3NldHMvc25vdy5wbmdcIjtcclxuXHJcbi8vIE1hcHBpbmcgb2Ygd2VhdGhlciBjb25kaXRpb25zIHRvIGNvbG91cnMgdGhhdCByZXByZXNlbnQgdGhlbVxyXG5jb25zdCB3ZWF0aGVyQ29sb3JNYXBwaW5nID0gW1xyXG4gIHsgY29uZGl0aW9uczogW1wiU3VubnlcIl0sIGNvbG91cjogXCIjNTE5NmQ3XCIgfSxcclxuICB7IGNvbmRpdGlvbnM6IFtcIkNsZWFyXCJdLCBjb2xvdXI6IFwiIzBkMTczMFwiIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJQYXJ0bHkgY2xvdWR5XCJdLCBjb2xvdXI6IFwiIzg5YTFiOFwiIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkNsb3VkeVwiLFxyXG4gICAgICBcIk92ZXJjYXN0XCIsXHJcbiAgICAgIFwiTWlzdFwiLFxyXG4gICAgICBcIlBhdGNoeSByYWluIHBvc3NpYmxlXCIsXHJcbiAgICAgIFwiUGF0Y2h5IHNub3cgcG9zc2libGVcIixcclxuICAgICAgXCJQYXRjaHkgc2xlZXQgcG9zc2libGVcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzZmODA5ZFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIlRodW5kZXJ5IG91dGJyZWFrcyBwb3NzaWJsZVwiLFxyXG4gICAgICBcIkJsb3dpbmcgc25vd1wiLFxyXG4gICAgICBcIkJsaXp6YXJkXCIsXHJcbiAgICAgIFwiRnJlZXppbmcgZm9nXCIsXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IGRyaXp6bGVcIixcclxuICAgICAgXCJMaWdodCBkcml6emxlXCIsXHJcbiAgICAgIFwiRnJlZXppbmcgZHJpenpsZVwiLFxyXG4gICAgICBcIkhlYXZ5IGZyZWV6aW5nIGRyaXp6bGVcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzEyMTgyNFwiLFxyXG4gIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJGb2dcIl0sIGNvbG91cjogXCIjNmY4MDlkXCIgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgZnJlZXppbmcgcmFpblwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IGZyZWV6aW5nIHJhaW5cIixcclxuICAgICAgXCJMaWdodCBzbGVldFwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNsZWV0XCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJQYXRjaHkgbGlnaHQgc25vd1wiLFxyXG4gICAgICBcIkxpZ2h0IHNub3dcIixcclxuICAgICAgXCJQYXRjaHkgbW9kZXJhdGUgc25vd1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIHNub3dcIixcclxuICAgICAgXCJQYXRjaHkgaGVhdnkgc25vd1wiLFxyXG4gICAgICBcIkhlYXZ5IHNub3dcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzdhODdhYVwiLFxyXG4gIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJJY2UgcGVsbGV0c1wiXSwgY29sb3VyOiBcIiM2ZjgwOWRcIiB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCByYWluXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgcmFpbiBhdCB0aW1lc1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIHJhaW5cIixcclxuICAgICAgXCJIZWF2eSByYWluIGF0IHRpbWVzXCIsXHJcbiAgICAgIFwiSGVhdnkgcmFpblwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjNTQ2MTc0XCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgcmFpbiBzaG93ZXJcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSByYWluIHNob3dlclwiLFxyXG4gICAgICBcIlRvcnJlbnRpYWwgcmFpbiBzaG93ZXJcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzU0NjE3NFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IHNsZWV0IHNob3dlcnNcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbGVldCBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTGlnaHQgc25vdyBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc25vdyBzaG93ZXJzXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCBzaG93ZXJzIG9mIGljZSBwZWxsZXRzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc2hvd2VycyBvZiBpY2UgcGVsbGV0c1wiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHJhaW4gd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiB3aXRoIHRodW5kZXJcIixcclxuICAgICAgXCJQYXRjaHkgbGlnaHQgc25vdyB3aXRoIHRodW5kZXJcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHdpdGggdGh1bmRlclwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjMTIxODI0XCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbi8vIENvbG91ciB0aGUgcGFnZSBiYWNrZ3JvdW5kIGJhc2VkIG9uIGN1cnJlbnQgd2VhdGhlciBjb25kaXRpb25zXHJcbmZ1bmN0aW9uIGNvbG91ckJhY2tncm91bmQoY29uZGl0aW9uKSB7XHJcbiAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5cclxuICB3ZWF0aGVyQ29sb3JNYXBwaW5nLmZvckVhY2goKHdlYXRoZXJHcm91cCkgPT4ge1xyXG4gICAgaWYgKHdlYXRoZXJHcm91cC5jb25kaXRpb25zLmluY2x1ZGVzKGNvbmRpdGlvbikpIHtcclxuICAgICAgcGFnZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB3ZWF0aGVyR3JvdXAuY29sb3VyO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBNYXJrIHRoZSBjdXJyZW50IHRpbWUgb24gdGhlIGhvdXJseSBmb3JlY2FzdCBjYXJkc1xyXG5mdW5jdGlvbiBtYXJrQ3VycmVudEhvdXIoY3VycmVudFRpbWUpIHtcclxuICBjb25zdCBob3VybHlUaW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG91cmx5LXRpbWVcIik7XHJcblxyXG4gIGhvdXJseVRpbWVzLmZvckVhY2goKHRpbWUpID0+IHtcclxuICAgIGNvbnN0IGhvdXJseUNhcmQgPSB0aW1lLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAocGFyc2VJbnQodGltZS50ZXh0Q29udGVudCkgPT09IHBhcnNlSW50KGN1cnJlbnRUaW1lKSkge1xyXG4gICAgICBob3VybHlDYXJkLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50LWhvdXItY2FyZFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhvdXJseUNhcmQuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnQtaG91ci1jYXJkXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBBZGQgcGVyc2lzdGVudCBpY29ucyB0byB0aGUgcGFnZVxyXG5mdW5jdGlvbiBhZGRJY29ucygpIHtcclxuICBjb25zdCBzdW5yaXNlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS1pY29uXCIpO1xyXG4gIGNvbnN0IHN1bnNldEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC1pY29uXCIpO1xyXG4gIGNvbnN0IHJhaW5JY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFpbi1pY29uXCIpO1xyXG4gIGNvbnN0IHNub3dJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc25vdy1pY29uXCIpO1xyXG5cclxuICBzdW5yaXNlSWNvbi5zcmMgPSBkYXlUaW1lO1xyXG4gIHN1bnNldEljb24uc3JjID0gbmlnaHRUaW1lO1xyXG4gIHJhaW5JY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHJhaW47XHJcbiAgfSk7XHJcbiAgc25vd0ljb25zLmZvckVhY2goKGljb24pID0+IHtcclxuICAgIGljb24uc3JjID0gc25vdztcclxuICB9KTtcclxufVxyXG5cclxuLy8gRmlsbCB0aGUgcGFnZSB3aXRoIHdlYXRoZXIgaW5mb3JtYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmlsbFBhZ2VEYXRhKGRhdGEsIHVuaXRzKSB7XHJcbiAgY29uc3Qgbm9uVW5pdFRleHREYXRhID0gW1xyXG4gICAgLy8gTG9jYXRpb24gZGV0YWlsc1xyXG4gICAgeyBzZWxlY3RvcjogXCIuY2l0eS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24ubmFtZS50b1VwcGVyQ2FzZSgpIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5jb3VudHJ5LW5hbWVcIiwgZGF0YTogZGF0YS5sb2NhdGlvbi5jb3VudHJ5IH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb2NhbC10aW1lXCIsXHJcbiAgICAgIGRhdGE6XHJcbiAgICAgICAgcGFyc2VJbnQoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdKSA8IDEyXHJcbiAgICAgICAgICA/IGAke2RhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXX0gQU1gXHJcbiAgICAgICAgICA6IGAke3BhcnNlSW50KGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIjpcIilbMF0pIC0gMTJ9OiR7ZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiOlwiKVsxXX0gUE1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmxvY2FsLWRhdGVcIixcclxuICAgICAgZGF0YTogbmV3IERhdGUoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzBdKS50b0xvY2FsZURhdGVTdHJpbmcoXHJcbiAgICAgICAgXCJlbi1VS1wiLFxyXG4gICAgICAgIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcInNob3J0XCIsIGRheTogXCJudW1lcmljXCIgfSxcclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5zdW5yaXNlLXRpbWVcIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLnN1bnNldC10aW1lXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICAvLyBDdXJyZW50IHdlYXRoZXIgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcclxuICAgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtdXZcIiwgZGF0YTogZGF0YS5jdXJyZW50LnV2IH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtaHVtaWRpdHlcIiwgZGF0YTogYCR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fSVgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtd2luZC1kaXJlY3Rpb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LndpbmRfZGlyIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC10ZW1wXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLWZlZWxzLWxpa2VcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXByZWNpcGl0YXRpb25cIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX21tfSBtbWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX2lufSBpbmAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXdpbmQtc3BlZWRcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9IGttL2hgLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LndpbmRfbXBofSBtcGhgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmxvdy1oaWdoLXRlbXBcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAgLy8gSG91cmx5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci01ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci04ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEwXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEzXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTVdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE2XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxN10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMThdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE5XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBpY29uRGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgd2VhdGhlciBpY29uXHJcbiAgICB7IHNlbGVjdG9yOiBcIi53ZWF0aGVyLWljb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgaWNvbnNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIC8vIEhvdXJseSBmb3JlY2FzdCBpY29uc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0wID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0zID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci02ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci05ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICAvLyBBZGQgZGF0YSB0byB0aGUgcGFnZVxyXG4gIG5vblVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5kYXRhO1xyXG4gIH0pO1xyXG5cclxuICBpZiAodW5pdHMgPT09IFwiTWV0cmljXCIpIHtcclxuICAgIHVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFFbGVtLnNlbGVjdG9yKS50ZXh0Q29udGVudCA9IGRhdGFFbGVtLm1ldHJpYztcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1bml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5pbXBlcmlhbDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWNvbkRhdGEuZm9yRWFjaCgoaWNvbkVsZW0pID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWNvbkVsZW0uc2VsZWN0b3IpLnNyYyA9IGljb25FbGVtLmRhdGE7XHJcbiAgfSk7XHJcblxyXG4gIG1hcmtDdXJyZW50SG91cihkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV0pO1xyXG4gIGFkZEljb25zKCk7XHJcbiAgY29sb3VyQmFja2dyb3VuZChkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQpO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBhZGRHaWYodXJsKSB7XHJcbi8vICAgY29uc3QgZ2lmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5naWYtY29udGFpbmVyID4gaW1nXCIpO1xyXG4vLyAgIGdpZi5zcmMgPSB1cmw7XHJcbi8vIH1cclxuIiwiLy8gSW5kaWNhdGUgYW4gZXJyb3IgaW4gdGhlIHNlYXJjaFxyXG5mdW5jdGlvbiBkaXNwbGF5U2VhcmNoRXJyb3Ioc2VhcmNoQmFyLCBzZWFyY2hCYXJFcnJvciwgZXJyb3IpIHtcclxuICBzZWFyY2hCYXJFcnJvci50ZXh0Q29udGVudCA9IGVycm9yO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjIpXCI7XHJcbiAgc2VhcmNoQmFyRXJyb3Iuc3R5bGUub3V0bGluZUNvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuMilcIjtcclxuICBzZWFyY2hCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZjMGNiXCI7XHJcbiAgc2VhcmNoQmFyLmNsYXNzTGlzdC5hZGQoXCJmaWVsZC1lcnJvclwiKTtcclxufVxyXG5cclxuLy8gSW5kaWNhdGUgbm8gZXJyb3IgaW4gdGhlIHNlYXJjaFxyXG5mdW5jdGlvbiByZW1vdmVTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjApXCI7XHJcbiAgc2VhcmNoQmFyRXJyb3Iuc3R5bGUub3V0bGluZUNvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuMClcIjtcclxuICBzZWFyY2hCYXIuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjZmZmZmZmXCI7XHJcbiAgc2VhcmNoQmFyLmNsYXNzTGlzdC5yZW1vdmUoXCJmaWVsZC1lcnJvclwiKTtcclxufVxyXG5cclxuZXhwb3J0IHsgZGlzcGxheVNlYXJjaEVycm9yLCByZW1vdmVTZWFyY2hFcnJvciB9O1xyXG4iLCJpbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpQ2FsbHNcIjtcclxuaW1wb3J0IGZpbGxQYWdlRGF0YSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcclxuaW1wb3J0IHsgZGlzcGxheVNlYXJjaEVycm9yLCByZW1vdmVTZWFyY2hFcnJvciB9IGZyb20gXCIuL2Vycm9yTWVzc2FnZXNcIjtcclxuXHJcbi8vIFRyeSB0byBhZGQgZGF0YSB0byBwYWdlIGJhc2VkIG9uIHNlYXJjaGJhciByZXN1bHRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpIHtcclxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcbiAgY29uc3Qgc2VhcmNoQmFyRXJyb3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uICsgLmVycm9yLW1lc3NhZ2VcIik7XHJcblxyXG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSFcIjtcclxuXHJcbiAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yLCBlcnJvcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCB1bml0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJ1bml0c1wiXTpjaGVja2VkJykudmFsdWU7XHJcbiAgICAgIGdldFdlYXRoZXJEYXRhKHNlYXJjaEJhci52YWx1ZSlcclxuICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICByZW1vdmVTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yKTtcclxuICAgICAgICAgIGZpbGxQYWdlRGF0YShkYXRhLCB1bml0cyk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgaW4gZ2V0V2VhdGhlckRhdGE6XCIsIGVycm9yKTtcclxuICAgICAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yLCBlcnJvcik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcclxuICAgIC0taW1wb3J0YW50LXRleHQ6ICNmZmZmZmY7XHJcbiAgICAtLWNvbnRleHQtdGV4dDogI0Y1RjdGNzsgLyojZjhmOGY4OyAjZmFmYWZhKi9cclxuICAgIC0tZGFyay1pbXBvcnRhbnQtdGV4dDogIzAwMDAwMDtcclxuICAgIC0tZGFyay1jb250ZXh0LXRleHQ6ICMzMzMzMzM7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBHZW5lcmFsIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG4qIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbiAgICBtYXJnaW46IDA7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG59XHJcblxyXG5ib2R5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICB3aWR0aDogMTAwdnc7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XHJcblxyXG4gICAgY29sb3I6IHZhcigtLWltcG9ydGFudC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xyXG59XHJcblxyXG4uZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiA0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnNlYXJjaGJhciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLnVuaXQtb3B0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZmllbGQtZXJyb3Ige1xyXG4gICAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwO1xyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkICNmZjAwMDA7XHJcbn1cclxuXHJcbi5lcnJvci1tZXNzYWdlIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcclxuXHJcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmdiYSgwLCAwLCAwLCAwKTtcclxuXHJcbiAgICBjb2xvcjogd2hpdGU7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG4gICAgZm9udC1zaXplOiAxcmVtO1xyXG59XHJcblxyXG5idXR0b24ge1xyXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogV2VhdGhlciBJbmZvcm1hdGlvbiBMYXlvdXQgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ud2VhdGhlci1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDFyZW07XHJcblxyXG4gICAgd2lkdGg6IDgwdnc7XHJcbiAgICBoZWlnaHQ6IDEwMHZoO1xyXG5cclxuICAgIHBhZGRpbmc6IDFyZW07XHJcblxyXG4gICAgZm9udC1zaXplOiAyMHB4O1xyXG59XHJcblxyXG4ucm93LTEge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcclxuICAgIGNvbHVtbi1nYXA6IDFyZW07XHJcbn1cclxuXHJcbi5yb3ctMyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgM2ZyO1xyXG4gICAgY29sdW1uLWdhcDogMXJlbTtcclxufVxyXG5cclxuLnJvdy0zIHtcclxuXHJcbn1cclxuXHJcbi5zdWJzZWN0aW9uLWhlYWRlciB7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG59XHJcblxyXG4ubG9jYXRpb24tZGF0ZXRpbWUtZGV0YWlscyxcclxuLnN1bi1pbmZvLFxyXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMXJlbTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEljb24gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ucmFpbi1pY29uLFxyXG4uc25vdy1pY29uLFxyXG4uc3VucmlzZS1pY29uLFxyXG4uc3Vuc2V0LWljb24ge1xyXG4gICAgaGVpZ2h0OiAyMHB4O1xyXG4gICAgd2lkdGg6IDIwcHg7XHJcbn1cclxuXHJcbi5pY29uLXRleHQtcGFpciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4ud2VhdGhlci1pY29uIHtcclxuICAgIGhlaWdodDogNThweDtcclxuICAgIHdpZHRoOiA1OHB4O1xyXG59XHJcblxyXG4uZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDQ2cHg7XHJcbiAgICB3aWR0aDogNDZweDtcclxufVxyXG5cclxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcclxuICAgIGhlaWdodDogMzBweDtcclxuICAgIHdpZHRoOiAzMHB4O1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogTG9jYXRpb24gSW5mb3JtYXRpb24gU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4ubG9jYXRpb24taW5mby1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn1cclxuXHJcbi5jaXR5LW5hbWUsXHJcbi5jb3VudHJ5LW5hbWUge1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcclxufVxyXG5cclxuLmNpdHktbmFtZSB7XHJcbiAgICBmb250LXNpemU6IDgwcHg7XHJcbn1cclxuXHJcbi5jb3VudHJ5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA1MHB4O1xyXG59XHJcblxyXG4ubG9jYXRpb24tZGF0ZXRpbWUtZGV0YWlscyxcclxuLnN1bi1pbmZvIHtcclxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQ3VycmVudCBXZWF0aGVyIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmN1cnJlbnQtd2VhdGhlci1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XHJcblxyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbn0gXHJcblxyXG4uY3VycmVudC10ZW1wIHtcclxuICAgIGZvbnQtc2l6ZTogODBweDtcclxufVxyXG5cclxuLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvbiB7XHJcbiAgICBmb250LXNpemU6IDUwcHg7XHJcbn1cclxuXHJcbi5sb3ctaGlnaC10ZW1wLFxyXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcclxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2lmIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xyXG59XHJcblxyXG4uZm9yZWNhc3QtY2FyZC1kZXRhaWxzIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi53ZWF0aGVyLXJhaW4tY2hhbmNlLFxyXG4ud2VhdGhlci1zbm93LWNoYW5jZSB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgRGV0YWlscyBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uZGV0YWlsLWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG5cclxufVxyXG5cclxuLmRldGFpbC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG5cclxuICAgIGhlaWdodDogMTAwJTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG5cclxuLmRldGFpbC1jYXJkID4gaDQge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSG91cmx5IEZvcmVjYXN0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufSBcclxuXHJcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCg4LCAxZnIpO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cclxuLmN1cnJlbnQtaG91ci1jYXJkIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MCk7XHJcblxyXG4gICAgY29sb3I6IHZhcigtLWRhcmstaW1wb3J0YW50LXRleHQpO1xyXG59XHJcbi5jdXJyZW50LWhvdXItY2FyZCA+IC5ob3VybHktdGltZSB7XHJcbiAgICBjb2xvcjogdmFyKC0tZGFyay1jb250cmFzdC10ZXh0KTtcclxufVxyXG5cclxuLmhvdXJseS10aW1lIHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLHlCQUF5QjtJQUN6Qix1QkFBdUIsRUFBRSxtQkFBbUI7SUFDNUMsOEJBQThCO0lBQzlCLDRCQUE0QjtBQUNoQzs7QUFFQTs7OztFQUlFO0FBQ0Y7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1COztJQUVuQixZQUFZO0lBQ1osYUFBYTs7SUFFYixzQkFBc0I7O0lBRXRCLDRCQUE0QjtBQUNoQzs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixtQkFBbUI7O0lBRW5CLGtCQUFrQjs7SUFFbEIsbUJBQW1CO0lBQ25CLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1Q0FBdUM7SUFDdkMsUUFBUTtJQUNSLFdBQVc7SUFDWCxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsbUJBQW1CO0FBQ3ZCOztBQUVBO0lBQ0kscUJBQXFCO0lBQ3JCLDBCQUEwQjtBQUM5Qjs7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Ijpyb290IHtcXHJcXG4gICAgLS1pbXBvcnRhbnQtdGV4dDogI2ZmZmZmZjtcXHJcXG4gICAgLS1jb250ZXh0LXRleHQ6ICNGNUY3Rjc7IC8qI2Y4ZjhmODsgI2ZhZmFmYSovXFxyXFxuICAgIC0tZGFyay1pbXBvcnRhbnQtdGV4dDogIzAwMDAwMDtcXHJcXG4gICAgLS1kYXJrLWNvbnRleHQtdGV4dDogIzMzMzMzMztcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHZW5lcmFsIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG4qIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0taW1wb3J0YW50LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS1maWVsZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiA0cHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5zZWFyY2hiYXIge1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udW5pdC1vcHRpb24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uZmllbGQtZXJyb3Ige1xcclxcbiAgICBib3JkZXItY29sb3I6ICNmZjAwMDA7XFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCAjZmYwMDAwO1xcclxcbn1cXHJcXG5cXHJcXG4uZXJyb3ItbWVzc2FnZSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmctbGVmdDogMTBweDtcXHJcXG5cXHJcXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMCk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcXHJcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLndlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgICB3aWR0aDogODB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG5cXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTEge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcXHJcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdy0zIHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnN1YnNlY3Rpb24taGVhZGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXFxyXFxuLnN1bi1pbmZvLFxcclxcbi53ZWF0aGVyLWRlc2NyaXB0aW9uLFxcclxcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogSWNvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnJhaW4taWNvbixcXHJcXG4uc25vdy1pY29uLFxcclxcbi5zdW5yaXNlLWljb24sXFxyXFxuLnN1bnNldC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tdGV4dC1wYWlyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNThweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA0NnB4O1xcclxcbiAgICB3aWR0aDogNDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBMb2NhdGlvbiBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5jaXR5LW5hbWUsXFxyXFxuLmNvdW50cnktbmFtZSB7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5jaXR5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDgwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb3VudHJ5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5sb2NhdGlvbi1kYXRldGltZS1kZXRhaWxzLFxcclxcbi5zdW4taW5mbyB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmN1cnJlbnQtd2VhdGhlci1jb250YWluZXIge1xcclxcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXHJcXG5cXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG59IFxcclxcblxcclxcbi5jdXJyZW50LXRlbXAge1xcclxcbiAgICBmb250LXNpemU6IDgwcHg7XFxyXFxufVxcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi5sb3ctaGlnaC10ZW1wLFxcclxcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHaWYgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogVGhyZWUgRGF5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDVmciAxZnI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDAuMnJlbSAxcmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtY2FyZC10aXRsZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1jYXJkLWRldGFpbHMge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ud2VhdGhlci1yYWluLWNoYW5jZSxcXHJcXG4ud2VhdGhlci1zbm93LWNoYW5jZSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEN1cnJlbnQgRGV0YWlscyBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmN1cnJlbnQtZGV0YWlscy1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5kZXRhaWwtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5kZXRhaWwtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcclxcblxcclxcbiAgICBoZWlnaHQ6IDEwMCU7XFxyXFxuXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxufVxcclxcblxcclxcbi5kZXRhaWwtY2FyZCA+IGg0IHtcXHJcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogSG91cmx5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4gLmhvdXJseS1mb3JlY2FzdC1pbmZvLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCg4LCAxZnIpO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1jYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xcclxcbiAgICBqdXN0aWZ5LWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxufVxcclxcbi8qIE1hcmtzIGN1cnJlbnQgaG91ciAqL1xcclxcbi5jdXJyZW50LWhvdXItY2FyZCB7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44MCk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWltcG9ydGFudC10ZXh0KTtcXHJcXG59XFxyXFxuLmN1cnJlbnQtaG91ci1jYXJkID4gLmhvdXJseS10aW1lIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWRhcmstY29udHJhc3QtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktdGltZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG4gIGNzcyArPSBvYmouY3NzO1xuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9XG5cbiAgLy8gRm9yIG9sZCBJRVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICBpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge30sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfVxuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCJpbXBvcnQgYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lciBmcm9tIFwiLi9ldmVudExpc3RlbmVyc1wiO1xyXG5pbXBvcnQgXCIuL3N0eWxlLmNzc1wiO1xyXG5cclxuYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpO1xyXG4iXSwibmFtZXMiOlsiZGlzcGxheVNlYXJjaEVycm9yIiwiZ2V0V2VhdGhlckRhdGEiLCJsb2NhdGlvbiIsIndlYXRoZXJBcGlLZXkiLCJyZXNwb25zZSIsImZldGNoIiwiY29uc29sZSIsImxvZyIsInN0YXR1cyIsIlByb21pc2UiLCJyZWplY3QiLCJqc29uIiwiZXJyb3IiLCJzZWFyY2hCYXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJzZWFyY2hCYXJFcnJvciIsImRheVRpbWUiLCJuaWdodFRpbWUiLCJyYWluIiwic25vdyIsIndlYXRoZXJDb2xvck1hcHBpbmciLCJjb25kaXRpb25zIiwiY29sb3VyIiwiY29sb3VyQmFja2dyb3VuZCIsImNvbmRpdGlvbiIsInBhZ2UiLCJmb3JFYWNoIiwid2VhdGhlckdyb3VwIiwiaW5jbHVkZXMiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIm1hcmtDdXJyZW50SG91ciIsImN1cnJlbnRUaW1lIiwiaG91cmx5VGltZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGltZSIsImhvdXJseUNhcmQiLCJwYXJlbnRFbGVtZW50IiwicGFyc2VJbnQiLCJ0ZXh0Q29udGVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwicmFpbkljb25zIiwic25vd0ljb25zIiwic3JjIiwiaWNvbiIsImZpbGxQYWdlRGF0YSIsImRhdGEiLCJ1bml0cyIsIm5vblVuaXRUZXh0RGF0YSIsInNlbGVjdG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInllYXIiLCJtb250aCIsImRheSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY3VycmVudCIsInRleHQiLCJ1diIsImh1bWlkaXR5Iiwid2luZF9kaXIiLCJ1bml0VGV4dERhdGEiLCJtZXRyaWMiLCJ0ZW1wX2MiLCJpbXBlcmlhbCIsInRlbXBfZiIsImZlZWxzbGlrZV9jIiwiZmVlbHNsaWtlX2YiLCJwcmVjaXBfbW0iLCJwcmVjaXBfaW4iLCJ3aW5kX2twaCIsIndpbmRfbXBoIiwibWludGVtcF9jIiwibWF4dGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9mIiwiaG91ciIsImljb25EYXRhIiwiZGF0YUVsZW0iLCJpY29uRWxlbSIsIm91dGxpbmVDb2xvciIsInJlbW92ZVNlYXJjaEVycm9yIiwiYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lciIsInN1Ym1pdEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJlIiwicHJldmVudERlZmF1bHQiLCJ2YWxpZGl0eSIsInZhbHVlTWlzc2luZyIsInZhbHVlIiwidGhlbiIsImNhdGNoIl0sInNvdXJjZVJvb3QiOiIifQ==