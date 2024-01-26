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
/* harmony import */ var _domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domManipulation/errorMessages */ "./src/domManipulation/errorMessages.js");

async function getWeatherData(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`);
    console.log(response);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not found!");
    }
    return response.json();
  } catch (error) {
    const searchBar = document.querySelector("#location");
    const searchBarError = document.querySelector("#location + .error-message");
    console.error("Error in weatherapi fetch:", error);
    (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_0__.displaySearchError)(searchBar, searchBarError, error);
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

/***/ "./src/domManipulation/errorMessages.js":
/*!**********************************************!*\
  !*** ./src/domManipulation/errorMessages.js ***!
  \**********************************************/
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




// Try to add data to page based on searchbar result
function addSearchBarEventListener() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  const searchBarError = document.querySelector("#location + .error-message");
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";
      (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(searchBar, searchBarError, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])(searchBar.value).then(data => {
        console.log(data);
        (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.removeSearchError)(searchBar, searchBarError);
        (0,_domManipulation_renderPageInfo__WEBPACK_IMPORTED_MODULE_1__["default"])(data, units);
      }).catch(error => {
        console.error("Error in getWeatherData:", error);
        (0,_domManipulation_errorMessages__WEBPACK_IMPORTED_MODULE_2__.displaySearchError)(searchBar, searchBarError, error);
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
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"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","sourcesContent":[":root {\r\n    --important-text: #ffffff;\r\n    --context-text: #F5F7F7; /*#f8f8f8; #fafafa*/\r\n    --dark-important-text: #000000;\r\n    --dark-context-text: #333333;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: var(--important-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 4px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 0.2rem;\r\n}\r\n\r\n.unit-option > * {\r\n    cursor: pointer;\r\n}\r\n\r\n.field-error {\r\n    border-color: #ff0000;\r\n    outline: 1px solid #ff0000;\r\n}\r\n\r\n.error-message {\r\n    display: flex;\r\n    align-items: center;\r\n\r\n    padding-left: 10px;\r\n\r\n    outline: 1px solid rgba(0, 0, 0, 0);\r\n\r\n    color: white;\r\n    font-weight: bolder;\r\n    font-size: 1rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n.location-datetime-details,\r\n.sun-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n.low-high-temp,\r\n.precipitation-info {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-rain-chance,\r\n.weather-snow-chance {\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n/* Marks current hour */\r\n.current-hour-card {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: var(--dark-important-text);\r\n}\r\n.current-hour-card > .hourly-time {\r\n    color: var(--dark-contrast-text);\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n    color: var(--context-text);\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLGdGQUFnRixZQUFZLHlCQUF5QixhQUFhLGFBQWEsT0FBTyxRQUFRLEtBQUssS0FBSyxZQUFZLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGNBQWMsV0FBVyxXQUFXLGFBQWEsYUFBYSxPQUFPLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLGNBQWMsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFVBQVUsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxhQUFhLGNBQWMsY0FBYyxXQUFXLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFlBQVksVUFBVSxXQUFXLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sTUFBTSxNQUFNLEtBQUssWUFBWSxPQUFPLFFBQVEsVUFBVSxZQUFZLFdBQVcsTUFBTSxRQUFRLE1BQU0sUUFBUSxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsTUFBTSxLQUFLLFVBQVUsVUFBVSxNQUFNLEtBQUssVUFBVSxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxRQUFRLE1BQU0sS0FBSyxhQUFhLGFBQWEsYUFBYSxPQUFPLE1BQU0sWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssVUFBVSxPQUFPLE1BQU0sWUFBWSxPQUFPLFFBQVEsTUFBTSxLQUFLLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLE9BQU8sS0FBSyxVQUFVLE9BQU8sTUFBTSxZQUFZLE9BQU8sUUFBUSxNQUFNLFFBQVEsTUFBTSxLQUFLLFVBQVUsWUFBWSxXQUFXLE1BQU0sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGNBQWMsY0FBYyxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sTUFBTSxZQUFZLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxL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O1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7OztBQ0F5RDtBQUNwQztBQUVyQnVGLDJEQUF5QixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uL2Vycm9yTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2RvbU1hbmlwdWxhdGlvbi9yZW5kZXJQYWdlSW5mby5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZXZlbnRMaXN0ZW5lcnMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGlzcGxheVNlYXJjaEVycm9yIH0gZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uL2Vycm9yTWVzc2FnZXNcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGxvY2F0aW9uKSB7XHJcbiAgY29uc3Qgd2VhdGhlckFwaUtleSA9IFwiZWQ1NmUxYmQwMWM1NDgxNzhkZDE0NTQwODI0MjIwMVwiO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuICAgICAgYGh0dHBzOi8vYXBpLndlYXRoZXJhcGkuY29tL3YxL2ZvcmVjYXN0Lmpzb24/a2V5PSR7d2VhdGhlckFwaUtleX0mcT0ke2xvY2F0aW9ufSZkYXlzPTNgLFxyXG4gICAgKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XHJcblxyXG4gICAgLy8gSW52YWxpZCBsb2NhdGlvblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkxvY2F0aW9uIG5vdCBmb3VuZCFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvblwiKTtcclxuICAgIGNvbnN0IHNlYXJjaEJhckVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbiArIC5lcnJvci1tZXNzYWdlXCIpO1xyXG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIHdlYXRoZXJhcGkgZmV0Y2g6XCIsIGVycm9yKTtcclxuICAgIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIHNlYXJjaEJhckVycm9yLCBlcnJvcik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyBhc3luYyBmdW5jdGlvbiBnZXRHaWZEYXRhKGxvY2F0aW9uLCBjb25kaXRpb24pIHtcclxuLy8gICBjb25zdCBzZWFyY2hUZXJtID0gYCR7bG9jYXRpb259LSR7Y29uZGl0aW9ufWA7XHJcbi8vICAgY29uc29sZS5sb2coc2VhcmNoVGVybSk7XHJcbi8vICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcclxuLy8gICAgIGBodHRwczovL2FwaS5naXBoeS5jb20vdjEvZ2lmcy90cmFuc2xhdGU/YXBpX2tleT0ke2dpZkFwaUtleX0mcz0ke3NlYXJjaFRlcm19YCxcclxuLy8gICApO1xyXG4vLyAgIGV4dHJhY3RHaWZEYXRhKHJlc3BvbnNlKTtcclxuLy8gfVxyXG5cclxuLy8gYXN5bmMgZnVuY3Rpb24gZXh0cmFjdEdpZkRhdGEocmVzcG9uc2UpIHtcclxuLy8gICBjb25zdCBqc29uRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcclxuLy8gICBjb25zb2xlLmxvZyhqc29uRGF0YSk7XHJcbi8vICAgY29uc29sZS5sb2coanNvbkRhdGEuZGF0YS5pbWFnZXMuZml4ZWRfaGVpZ2h0X3NtYWxsLnVybCk7XHJcbi8vICAgYWRkR2lmKGpzb25EYXRhLmRhdGEuaW1hZ2VzLmZpeGVkX2hlaWdodF9zbWFsbC51cmwpO1xyXG4vLyB9XHJcblxyXG4vLyBjb25zdCBnaWZBcGlLZXkgPSBcIlR1cUQyaXVWQTdwTHdEdFBkQTlmNWtWNXJIdHRaS3p4XCI7XHJcbiIsIi8vIEluZGljYXRlIGFuIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKHNlYXJjaEJhciwgc2VhcmNoQmFyRXJyb3IsIGVycm9yKSB7XHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBlcnJvcjtcclxuICBzZWFyY2hCYXJFcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC4yKVwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLm91dGxpbmVDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjIpXCI7XHJcbiAgc2VhcmNoQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmYzBjYlwiO1xyXG4gIHNlYXJjaEJhci5jbGFzc0xpc3QuYWRkKFwiZmllbGQtZXJyb3JcIik7XHJcbn1cclxuXHJcbi8vIEluZGljYXRlIG5vIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gcmVtb3ZlU2VhcmNoRXJyb3Ioc2VhcmNoQmFyLCBzZWFyY2hCYXJFcnJvcikge1xyXG4gIHNlYXJjaEJhckVycm9yLnRleHRDb250ZW50ID0gXCJcIjtcclxuICBzZWFyY2hCYXJFcnJvci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC4wKVwiO1xyXG4gIHNlYXJjaEJhckVycm9yLnN0eWxlLm91dGxpbmVDb2xvciA9IFwicmdiYSgwLCAwLCAwLCAwLjApXCI7XHJcbiAgc2VhcmNoQmFyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gIHNlYXJjaEJhci5jbGFzc0xpc3QucmVtb3ZlKFwiZmllbGQtZXJyb3JcIik7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRpc3BsYXlTZWFyY2hFcnJvciwgcmVtb3ZlU2VhcmNoRXJyb3IgfTtcclxuIiwiaW1wb3J0IGRheVRpbWUgZnJvbSBcIi4uL2Fzc2V0cy9kYXlUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgbmlnaHRUaW1lIGZyb20gXCIuLi9hc3NldHMvbmlnaHRUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgcmFpbiBmcm9tIFwiLi4vYXNzZXRzL3JhaW4ucG5nXCI7XHJcbmltcG9ydCBzbm93IGZyb20gXCIuLi9hc3NldHMvc25vdy5wbmdcIjtcclxuXHJcbi8vIE1hcHBpbmcgb2Ygd2VhdGhlciBjb25kaXRpb25zIHRvIGNvbG91cnMgdGhhdCByZXByZXNlbnQgdGhlbVxyXG5jb25zdCB3ZWF0aGVyQ29sb3JNYXBwaW5nID0gW1xyXG4gIHsgY29uZGl0aW9uczogW1wiU3VubnlcIl0sIGNvbG91cjogXCIjNTE5NmQ3XCIgfSxcclxuICB7IGNvbmRpdGlvbnM6IFtcIkNsZWFyXCJdLCBjb2xvdXI6IFwiIzBkMTczMFwiIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJQYXJ0bHkgY2xvdWR5XCJdLCBjb2xvdXI6IFwiIzg5YTFiOFwiIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkNsb3VkeVwiLFxyXG4gICAgICBcIk92ZXJjYXN0XCIsXHJcbiAgICAgIFwiTWlzdFwiLFxyXG4gICAgICBcIlBhdGNoeSByYWluIHBvc3NpYmxlXCIsXHJcbiAgICAgIFwiUGF0Y2h5IHNub3cgcG9zc2libGVcIixcclxuICAgICAgXCJQYXRjaHkgc2xlZXQgcG9zc2libGVcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzZmODA5ZFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIlRodW5kZXJ5IG91dGJyZWFrcyBwb3NzaWJsZVwiLFxyXG4gICAgICBcIkJsb3dpbmcgc25vd1wiLFxyXG4gICAgICBcIkJsaXp6YXJkXCIsXHJcbiAgICAgIFwiRnJlZXppbmcgZm9nXCIsXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IGRyaXp6bGVcIixcclxuICAgICAgXCJMaWdodCBkcml6emxlXCIsXHJcbiAgICAgIFwiRnJlZXppbmcgZHJpenpsZVwiLFxyXG4gICAgICBcIkhlYXZ5IGZyZWV6aW5nIGRyaXp6bGVcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzEyMTgyNFwiLFxyXG4gIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJGb2dcIl0sIGNvbG91cjogXCIjNmY4MDlkXCIgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgZnJlZXppbmcgcmFpblwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IGZyZWV6aW5nIHJhaW5cIixcclxuICAgICAgXCJMaWdodCBzbGVldFwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNsZWV0XCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJQYXRjaHkgbGlnaHQgc25vd1wiLFxyXG4gICAgICBcIkxpZ2h0IHNub3dcIixcclxuICAgICAgXCJQYXRjaHkgbW9kZXJhdGUgc25vd1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIHNub3dcIixcclxuICAgICAgXCJQYXRjaHkgaGVhdnkgc25vd1wiLFxyXG4gICAgICBcIkhlYXZ5IHNub3dcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzdhODdhYVwiLFxyXG4gIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJJY2UgcGVsbGV0c1wiXSwgY29sb3VyOiBcIiM2ZjgwOWRcIiB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCByYWluXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgcmFpbiBhdCB0aW1lc1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIHJhaW5cIixcclxuICAgICAgXCJIZWF2eSByYWluIGF0IHRpbWVzXCIsXHJcbiAgICAgIFwiSGVhdnkgcmFpblwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjNTQ2MTc0XCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgcmFpbiBzaG93ZXJcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSByYWluIHNob3dlclwiLFxyXG4gICAgICBcIlRvcnJlbnRpYWwgcmFpbiBzaG93ZXJcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzU0NjE3NFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IHNsZWV0IHNob3dlcnNcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbGVldCBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTGlnaHQgc25vdyBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc25vdyBzaG93ZXJzXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCBzaG93ZXJzIG9mIGljZSBwZWxsZXRzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc2hvd2VycyBvZiBpY2UgcGVsbGV0c1wiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHJhaW4gd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiB3aXRoIHRodW5kZXJcIixcclxuICAgICAgXCJQYXRjaHkgbGlnaHQgc25vdyB3aXRoIHRodW5kZXJcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbm93IHdpdGggdGh1bmRlclwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjMTIxODI0XCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbi8vIENvbG91ciB0aGUgcGFnZSBiYWNrZ3JvdW5kIGJhc2VkIG9uIGN1cnJlbnQgd2VhdGhlciBjb25kaXRpb25zXHJcbmZ1bmN0aW9uIGNvbG91ckJhY2tncm91bmQoY29uZGl0aW9uKSB7XHJcbiAgY29uc3QgcGFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpO1xyXG5cclxuICB3ZWF0aGVyQ29sb3JNYXBwaW5nLmZvckVhY2goKHdlYXRoZXJHcm91cCkgPT4ge1xyXG4gICAgaWYgKHdlYXRoZXJHcm91cC5jb25kaXRpb25zLmluY2x1ZGVzKGNvbmRpdGlvbikpIHtcclxuICAgICAgcGFnZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSB3ZWF0aGVyR3JvdXAuY29sb3VyO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBNYXJrIHRoZSBjdXJyZW50IHRpbWUgb24gdGhlIGhvdXJseSBmb3JlY2FzdCBjYXJkc1xyXG5mdW5jdGlvbiBtYXJrQ3VycmVudEhvdXIoY3VycmVudFRpbWUpIHtcclxuICBjb25zdCBob3VybHlUaW1lcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG91cmx5LXRpbWVcIik7XHJcblxyXG4gIGhvdXJseVRpbWVzLmZvckVhY2goKHRpbWUpID0+IHtcclxuICAgIGNvbnN0IGhvdXJseUNhcmQgPSB0aW1lLnBhcmVudEVsZW1lbnQ7XHJcbiAgICBpZiAocGFyc2VJbnQodGltZS50ZXh0Q29udGVudCkgPT09IHBhcnNlSW50KGN1cnJlbnRUaW1lKSkge1xyXG4gICAgICBob3VybHlDYXJkLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50LWhvdXItY2FyZFwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGhvdXJseUNhcmQuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnQtaG91ci1jYXJkXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBBZGQgcGVyc2lzdGVudCBpY29ucyB0byB0aGUgcGFnZVxyXG5mdW5jdGlvbiBhZGRJY29ucygpIHtcclxuICBjb25zdCBzdW5yaXNlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS1pY29uXCIpO1xyXG4gIGNvbnN0IHN1bnNldEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC1pY29uXCIpO1xyXG4gIGNvbnN0IHJhaW5JY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFpbi1pY29uXCIpO1xyXG4gIGNvbnN0IHNub3dJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc25vdy1pY29uXCIpO1xyXG5cclxuICBzdW5yaXNlSWNvbi5zcmMgPSBkYXlUaW1lO1xyXG4gIHN1bnNldEljb24uc3JjID0gbmlnaHRUaW1lO1xyXG4gIHJhaW5JY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHJhaW47XHJcbiAgfSk7XHJcbiAgc25vd0ljb25zLmZvckVhY2goKGljb24pID0+IHtcclxuICAgIGljb24uc3JjID0gc25vdztcclxuICB9KTtcclxufVxyXG5cclxuLy8gRmlsbCB0aGUgcGFnZSB3aXRoIHdlYXRoZXIgaW5mb3JtYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmlsbFBhZ2VEYXRhKGRhdGEsIHVuaXRzKSB7XHJcbiAgY29uc3Qgbm9uVW5pdFRleHREYXRhID0gW1xyXG4gICAgLy8gTG9jYXRpb24gZGV0YWlsc1xyXG4gICAgeyBzZWxlY3RvcjogXCIuY2l0eS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24ubmFtZS50b1VwcGVyQ2FzZSgpIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5jb3VudHJ5LW5hbWVcIiwgZGF0YTogZGF0YS5sb2NhdGlvbi5jb3VudHJ5IH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5sb2NhbC10aW1lXCIsXHJcbiAgICAgIGRhdGE6XHJcbiAgICAgICAgcGFyc2VJbnQoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdKSA8IDEyXHJcbiAgICAgICAgICA/IGAke2RhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXX0gQU1gXHJcbiAgICAgICAgICA6IGAke3BhcnNlSW50KGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIjpcIilbMF0pIC0gMTJ9OiR7ZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiOlwiKVsxXX0gUE1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmxvY2FsLWRhdGVcIixcclxuICAgICAgZGF0YTogbmV3IERhdGUoZGF0YS5sb2NhdGlvbi5sb2NhbHRpbWUuc3BsaXQoXCIgXCIpWzBdKS50b0xvY2FsZURhdGVTdHJpbmcoXHJcbiAgICAgICAgXCJlbi1VS1wiLFxyXG4gICAgICAgIHsgeWVhcjogXCJudW1lcmljXCIsIG1vbnRoOiBcInNob3J0XCIsIGRheTogXCJudW1lcmljXCIgfSxcclxuICAgICAgKSxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5zdW5yaXNlLXRpbWVcIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5yaXNlLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLnN1bnNldC10aW1lXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uYXN0cm8uc3Vuc2V0LFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICAvLyBDdXJyZW50IHdlYXRoZXIgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCxcclxuICAgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtdXZcIiwgZGF0YTogZGF0YS5jdXJyZW50LnV2IH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtaHVtaWRpdHlcIiwgZGF0YTogYCR7ZGF0YS5jdXJyZW50Lmh1bWlkaXR5fSVgIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5kZXRhaWwtd2luZC1kaXJlY3Rpb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LndpbmRfZGlyIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IHVuaXRUZXh0RGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuY3VycmVudC10ZW1wXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5jdXJyZW50LnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLWZlZWxzLWxpa2VcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQuZmVlbHNsaWtlX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXByZWNpcGl0YXRpb25cIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX21tfSBtbWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQucHJlY2lwX2lufSBpbmAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGV0YWlsLXdpbmQtc3BlZWRcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmN1cnJlbnQud2luZF9rcGh9IGttL2hgLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5jdXJyZW50LndpbmRfbXBofSBtcGhgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmxvdy1oaWdoLXRlbXBcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMC1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTEtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0yLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAgLy8gSG91cmx5IGZvcmVjYXN0IGRldGFpbHNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls0XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci01ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls3XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci04ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEwXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEzXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTVdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE2XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxN10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMThdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE5XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICBjb25zdCBpY29uRGF0YSA9IFtcclxuICAgIC8vIEN1cnJlbnQgd2VhdGhlciBpY29uXHJcbiAgICB7IHNlbGVjdG9yOiBcIi53ZWF0aGVyLWljb25cIiwgZGF0YTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi5pY29uIH0sXHJcbiAgICAvLyBUaHJlZSBkYXkgZm9yZWNhc3QgaWNvbnNcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIC8vIEhvdXJseSBmb3JlY2FzdCBpY29uc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0wID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0zID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTQgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci02ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTcgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItOCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci05ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEwID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEyXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTEzID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTRdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTUgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE1XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE2ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTddLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTggPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE4XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE5ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjEgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIxXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIyID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMl0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICBdO1xyXG5cclxuICAvLyBBZGQgZGF0YSB0byB0aGUgcGFnZVxyXG4gIG5vblVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5kYXRhO1xyXG4gIH0pO1xyXG5cclxuICBpZiAodW5pdHMgPT09IFwiTWV0cmljXCIpIHtcclxuICAgIHVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFFbGVtLnNlbGVjdG9yKS50ZXh0Q29udGVudCA9IGRhdGFFbGVtLm1ldHJpYztcclxuICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB1bml0VGV4dERhdGEuZm9yRWFjaCgoZGF0YUVsZW0pID0+IHtcclxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihkYXRhRWxlbS5zZWxlY3RvcikudGV4dENvbnRlbnQgPSBkYXRhRWxlbS5pbXBlcmlhbDtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgaWNvbkRhdGEuZm9yRWFjaCgoaWNvbkVsZW0pID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWNvbkVsZW0uc2VsZWN0b3IpLnNyYyA9IGljb25FbGVtLmRhdGE7XHJcbiAgfSk7XHJcblxyXG4gIG1hcmtDdXJyZW50SG91cihkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV0pO1xyXG4gIGFkZEljb25zKCk7XHJcbiAgY29sb3VyQmFja2dyb3VuZChkYXRhLmN1cnJlbnQuY29uZGl0aW9uLnRleHQpO1xyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBhZGRHaWYodXJsKSB7XHJcbi8vICAgY29uc3QgZ2lmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5naWYtY29udGFpbmVyID4gaW1nXCIpO1xyXG4vLyAgIGdpZi5zcmMgPSB1cmw7XHJcbi8vIH1cclxuIiwiaW1wb3J0IGdldFdlYXRoZXJEYXRhIGZyb20gXCIuL2FwaUNhbGxzXCI7XHJcbmltcG9ydCBmaWxsUGFnZURhdGEgZnJvbSBcIi4vZG9tTWFuaXB1bGF0aW9uL3JlbmRlclBhZ2VJbmZvXCI7XHJcbmltcG9ydCB7XHJcbiAgZGlzcGxheVNlYXJjaEVycm9yLFxyXG4gIHJlbW92ZVNlYXJjaEVycm9yLFxyXG59IGZyb20gXCIuL2RvbU1hbmlwdWxhdGlvbi9lcnJvck1lc3NhZ2VzXCI7XHJcblxyXG4vLyBUcnkgdG8gYWRkIGRhdGEgdG8gcGFnZSBiYXNlZCBvbiBzZWFyY2hiYXIgcmVzdWx0XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIoKSB7XHJcbiAgY29uc3Qgc3VibWl0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImJ1dHRvblwiKTtcclxuICBjb25zdCBzZWFyY2hCYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2xvY2F0aW9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhckVycm9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2NhdGlvbiArIC5lcnJvci1tZXNzYWdlXCIpO1xyXG5cclxuICBzdWJtaXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoc2VhcmNoQmFyLnZhbGlkaXR5LnZhbHVlTWlzc2luZykge1xyXG4gICAgICBjb25zdCBlcnJvciA9IFwiUGxlYXNlIGVudGVyIGEgdmFsdWUhXCI7XHJcblxyXG4gICAgICBkaXNwbGF5U2VhcmNoRXJyb3Ioc2VhcmNoQmFyLCBzZWFyY2hCYXJFcnJvciwgZXJyb3IpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdW5pdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwidW5pdHNcIl06Y2hlY2tlZCcpLnZhbHVlO1xyXG4gICAgICBnZXRXZWF0aGVyRGF0YShzZWFyY2hCYXIudmFsdWUpXHJcbiAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgcmVtb3ZlU2VhcmNoRXJyb3Ioc2VhcmNoQmFyLCBzZWFyY2hCYXJFcnJvcik7XHJcbiAgICAgICAgICBmaWxsUGFnZURhdGEoZGF0YSwgdW5pdHMpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGluIGdldFdlYXRoZXJEYXRhOlwiLCBlcnJvcik7XHJcbiAgICAgICAgICBkaXNwbGF5U2VhcmNoRXJyb3Ioc2VhcmNoQmFyLCBzZWFyY2hCYXJFcnJvciwgZXJyb3IpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XHJcbiAgICAtLWltcG9ydGFudC10ZXh0OiAjZmZmZmZmO1xyXG4gICAgLS1jb250ZXh0LXRleHQ6ICNGNUY3Rjc7IC8qI2Y4ZjhmODsgI2ZhZmFmYSovXHJcbiAgICAtLWRhcmstaW1wb3J0YW50LXRleHQ6ICMwMDAwMDA7XHJcbiAgICAtLWRhcmstY29udGV4dC10ZXh0OiAjMzMzMzMzO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2VuZXJhbCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuKiB7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG5cclxuICAgIGNvbG9yOiB2YXIoLS1pbXBvcnRhbnQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbmZvcm0ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG5cclxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG5cclxuLmZvcm0tZmllbGQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcclxuICAgIGdhcDogNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbn1cclxuXHJcbi5zZWFyY2hiYXIge1xyXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbn1cclxuXHJcbi51bml0LW9wdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC4ycmVtO1xyXG59XHJcblxyXG4udW5pdC1vcHRpb24gPiAqIHtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLmZpZWxkLWVycm9yIHtcclxuICAgIGJvcmRlci1jb2xvcjogI2ZmMDAwMDtcclxuICAgIG91dGxpbmU6IDFweCBzb2xpZCAjZmYwMDAwO1xyXG59XHJcblxyXG4uZXJyb3ItbWVzc2FnZSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XHJcblxyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMCk7XHJcblxyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcclxuICAgIGZvbnQtc2l6ZTogMXJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFdlYXRoZXIgSW5mb3JtYXRpb24gTGF5b3V0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLndlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLnJvdy0xIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ucm93LTMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcclxuICAgIGNvbHVtbi1nYXA6IDFyZW07XHJcbn1cclxuXHJcbi5yb3ctMyB7XHJcblxyXG59XHJcblxyXG4uc3Vic2VjdGlvbi1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXHJcbi5zdW4taW5mbyxcclxuLndlYXRoZXItZGVzY3JpcHRpb24sXHJcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBJY29uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLnJhaW4taWNvbixcclxuLnNub3ctaWNvbixcclxuLnN1bnJpc2UtaWNvbixcclxuLnN1bnNldC1pY29uIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG59XHJcblxyXG4uaWNvbi10ZXh0LXBhaXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLndlYXRoZXItaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDU4cHg7XHJcbiAgICB3aWR0aDogNThweDtcclxufVxyXG5cclxuLmZvcmVjYXN0LWljb24ge1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgd2lkdGg6IDQ2cHg7XHJcbn1cclxuXHJcbi5ob3VybHktZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB3aWR0aDogMzBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG4uY2l0eS1uYW1lLFxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRhdGV0aW1lLWRldGFpbHMsXHJcbi5zdW4taW5mbyB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59IFxyXG5cclxuLmN1cnJlbnQtdGVtcCB7XHJcbiAgICBmb250LXNpemU6IDgwcHg7XHJcbn1cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xyXG4gICAgZm9udC1zaXplOiA1MHB4O1xyXG59XHJcblxyXG4ubG93LWhpZ2gtdGVtcCxcclxuLnByZWNpcGl0YXRpb24taW5mbyB7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEdpZiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBUaHJlZSBEYXkgRm9yZWNhc3QgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XHJcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgNWZyIDFmcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMC4ycmVtIDFyZW07XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuXHJcbi5mb3JlY2FzdC1jYXJkLXRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4ud2VhdGhlci1yYWluLWNoYW5jZSxcclxuLndlYXRoZXItc25vdy1jaGFuY2Uge1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBDdXJyZW50IERldGFpbHMgU3R5bGluZ1xyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICovXHJcblxyXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59IFxyXG5cclxuLmRldGFpbC1jYXJkLWdyaWQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDIsIDFmcik7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxuXHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuXHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuXHJcbi5kZXRhaWwtY2FyZCA+IGg0IHtcclxuICAgIGZvbnQtc2l6ZTogc21hbGw7XHJcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbiAuaG91cmx5LWZvcmVjYXN0LWluZm8tY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4uaG91cmx5LWZvcmVjYXN0LWNhcmQge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbn1cclxuLyogTWFya3MgY3VycmVudCBob3VyICovXHJcbi5jdXJyZW50LWhvdXItY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xyXG5cclxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWltcG9ydGFudC10ZXh0KTtcclxufVxyXG4uY3VycmVudC1ob3VyLWNhcmQgPiAuaG91cmx5LXRpbWUge1xyXG4gICAgY29sb3I6IHZhcigtLWRhcmstY29udHJhc3QtdGV4dCk7XHJcbn1cclxuXHJcbi5ob3VybHktdGltZSB7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XHJcbn1gLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSx5QkFBeUI7SUFDekIsdUJBQXVCLEVBQUUsbUJBQW1CO0lBQzVDLDhCQUE4QjtJQUM5Qiw0QkFBNEI7QUFDaEM7O0FBRUE7Ozs7RUFJRTtBQUNGO0lBQ0ksc0JBQXNCO0lBQ3RCLFNBQVM7SUFDVCxVQUFVO0FBQ2Q7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjs7SUFFbkIsWUFBWTtJQUNaLGFBQWE7O0lBRWIsc0JBQXNCOztJQUV0Qiw0QkFBNEI7QUFDaEM7O0FBRUE7Ozs7RUFJRTs7QUFFRjtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFD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RUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixpQ0FBaUM7SUFDakMscUJBQXFCO0lBQ3JCLG1CQUFtQjs7SUFFbkIsbUJBQW1CO0lBQ25CLDJDQUEyQztBQUMvQztBQUNBLHVCQUF1QjtBQUN2QjtJQUNJLDJDQUEyQzs7SUFFM0MsaUNBQWlDO0FBQ3JDO0FBQ0E7SUFDSSxnQ0FBZ0M7QUFDcEM7O0FBRUE7SUFDSSxnQkFBZ0I7SUFDaEIsMEJBQTBCO0FBQzlCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXHJcXG4gICAgLS1pbXBvcnRhbnQtdGV4dDogI2ZmZmZmZjtcXHJcXG4gICAgLS1jb250ZXh0LXRleHQ6ICNGNUY3Rjc7IC8qI2Y4ZjhmODsgI2ZhZmFmYSovXFxyXFxuICAgIC0tZGFyay1pbXBvcnRhbnQtdGV4dDogIzAwMDAwMDtcXHJcXG4gICAgLS1kYXJrLWNvbnRleHQtdGV4dDogIzMzMzMzMztcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHZW5lcmFsIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG4qIHtcXHJcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG4gICAgbWFyZ2luOiAwO1xcclxcbiAgICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDEwMHZ3O1xcclxcbiAgICBoZWlnaHQ6IDEwMHZoO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0taW1wb3J0YW50LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG5mb3JtIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9ybS1maWVsZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byByZXBlYXQoMiwgMWZyKTtcXHJcXG4gICAgZ2FwOiA0cHg7XFxyXFxuICAgIHdpZHRoOiAxMDAlO1xcclxcbiAgICBoZWlnaHQ6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5zZWFyY2hiYXIge1xcclxcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXHJcXG4gICAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4udW5pdC1vcHRpb24ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDAuMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uID4gKiB7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiAjZmYwMDAwO1xcclxcbiAgICBvdXRsaW5lOiAxcHggc29saWQgI2ZmMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuLmVycm9yLW1lc3NhZ2Uge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nLWxlZnQ6IDEwcHg7XFxyXFxuXFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZ2JhKDAsIDAsIDAsIDApO1xcclxcblxcclxcbiAgICBjb2xvcjogd2hpdGU7XFxyXFxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuYnV0dG9uIHtcXHJcXG4gICAgcGFkZGluZzogMTBweCAyMHB4O1xcclxcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogV2VhdGhlciBJbmZvcm1hdGlvbiBMYXlvdXQgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi53ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGdhcDogMXJlbTtcXHJcXG5cXHJcXG4gICAgd2lkdGg6IDgwdnc7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW07XFxyXFxuXFxyXFxuICAgIGZvbnQtc2l6ZTogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdy0xIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTMge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAzZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuXFxyXFxufVxcclxcblxcclxcbi5zdWJzZWN0aW9uLWhlYWRlciB7XFxyXFxuICAgIGZvbnQtc2l6ZTogbGFyZ2U7XFxyXFxufVxcclxcblxcclxcbi5sb2NhdGlvbi1kYXRldGltZS1kZXRhaWxzLFxcclxcbi5zdW4taW5mbyxcXHJcXG4ud2VhdGhlci1kZXNjcmlwdGlvbixcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEljb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5yYWluLWljb24sXFxyXFxuLnNub3ctaWNvbixcXHJcXG4uc3VucmlzZS1pY29uLFxcclxcbi5zdW5zZXQtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogMjBweDtcXHJcXG4gICAgd2lkdGg6IDIwcHg7XFxyXFxufVxcclxcblxcclxcbi5pY29uLXRleHQtcGFpciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi53ZWF0aGVyLWljb24ge1xcclxcbiAgICBoZWlnaHQ6IDU4cHg7XFxyXFxuICAgIHdpZHRoOiA1OHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNDZweDtcXHJcXG4gICAgd2lkdGg6IDQ2cHg7XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtaWNvbiB7XFxyXFxuICAgIGhlaWdodDogMzBweDtcXHJcXG4gICAgd2lkdGg6IDMwcHg7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogTG9jYXRpb24gSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5sb2NhdGlvbi1pbmZvLWNvbnRhaW5lciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY2l0eS1uYW1lLFxcclxcbi5jb3VudHJ5LW5hbWUge1xcclxcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbn1cXHJcXG5cXHJcXG4uY2l0eS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY291bnRyeS1uYW1lIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubG9jYXRpb24tZGF0ZXRpbWUtZGV0YWlscyxcXHJcXG4uc3VuLWluZm8ge1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBDdXJyZW50IFdlYXRoZXIgSW5mb3JtYXRpb24gU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufSBcXHJcXG5cXHJcXG4uY3VycmVudC10ZW1wIHtcXHJcXG4gICAgZm9udC1zaXplOiA4MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWRlc2NyaXB0aW9uIHtcXHJcXG4gICAgZm9udC1zaXplOiA1MHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ubG93LWhpZ2gtdGVtcCxcXHJcXG4ucHJlY2lwaXRhdGlvbi1pbmZvIHtcXHJcXG4gICAgY29sb3I6IHZhcigtLWNvbnRleHQtdGV4dCk7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogR2lmIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcXHJcXG4gICAgY29sdW1uLWdhcDogMC41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xcclxcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtY2FyZC1kZXRhaWxzIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItcmFpbi1jaGFuY2UsXFxyXFxuLndlYXRoZXItc25vdy1jaGFuY2Uge1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBDdXJyZW50IERldGFpbHMgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi5jdXJyZW50LWRldGFpbHMtY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufSBcXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQtZ3JpZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQ6IHJlcGVhdCgzLCAxZnIpIC8gcmVwZWF0KDIsIDFmcik7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcblxcclxcbn1cXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG5cXHJcXG4gICAgaGVpZ2h0OiAxMDAlO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZGV0YWlsLWNhcmQgPiBoNCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1jb250ZXh0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cXHJcXG4uY3VycmVudC1ob3VyLWNhcmQge1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xcclxcblxcclxcbiAgICBjb2xvcjogdmFyKC0tZGFyay1pbXBvcnRhbnQtdGV4dCk7XFxyXFxufVxcclxcbi5jdXJyZW50LWhvdXItY2FyZCA+IC5ob3VybHktdGltZSB7XFxyXFxuICAgIGNvbG9yOiB2YXIoLS1kYXJrLWNvbnRyYXN0LXRleHQpO1xcclxcbn1cXHJcXG5cXHJcXG4uaG91cmx5LXRpbWUge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbiAgICBjb2xvcjogdmFyKC0tY29udGV4dC10ZXh0KTtcXHJcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgIXNjcmlwdFVybCkgc2NyaXB0VXJsID0gc2NyaXB0c1tpLS1dLnNyYztcblx0XHR9XG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IGFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIgZnJvbSBcIi4vZXZlbnRMaXN0ZW5lcnNcIjtcclxuaW1wb3J0IFwiLi9zdHlsZS5jc3NcIjtcclxuXHJcbmFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIoKTtcclxuIl0sIm5hbWVzIjpbImRpc3BsYXlTZWFyY2hFcnJvciIsImdldFdlYXRoZXJEYXRhIiwibG9jYXRpb24iLCJ3ZWF0aGVyQXBpS2V5IiwicmVzcG9uc2UiLCJmZXRjaCIsImNvbnNvbGUiLCJsb2ciLCJzdGF0dXMiLCJQcm9taXNlIiwicmVqZWN0IiwianNvbiIsImVycm9yIiwic2VhcmNoQmFyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwic2VhcmNoQmFyRXJyb3IiLCJ0ZXh0Q29udGVudCIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwib3V0bGluZUNvbG9yIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlU2VhcmNoRXJyb3IiLCJyZW1vdmUiLCJkYXlUaW1lIiwibmlnaHRUaW1lIiwicmFpbiIsInNub3ciLCJ3ZWF0aGVyQ29sb3JNYXBwaW5nIiwiY29uZGl0aW9ucyIsImNvbG91ciIsImNvbG91ckJhY2tncm91bmQiLCJjb25kaXRpb24iLCJwYWdlIiwiZm9yRWFjaCIsIndlYXRoZXJHcm91cCIsImluY2x1ZGVzIiwibWFya0N1cnJlbnRIb3VyIiwiY3VycmVudFRpbWUiLCJob3VybHlUaW1lcyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0aW1lIiwiaG91cmx5Q2FyZCIsInBhcmVudEVsZW1lbnQiLCJwYXJzZUludCIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwicmFpbkljb25zIiwic25vd0ljb25zIiwic3JjIiwiaWNvbiIsImZpbGxQYWdlRGF0YSIsImRhdGEiLCJ1bml0cyIsIm5vblVuaXRUZXh0RGF0YSIsInNlbGVjdG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiRGF0ZSIsInRvTG9jYWxlRGF0ZVN0cmluZyIsInllYXIiLCJtb250aCIsImRheSIsImZvcmVjYXN0IiwiZm9yZWNhc3RkYXkiLCJhc3RybyIsInN1bnJpc2UiLCJzdW5zZXQiLCJkYWlseV9jaGFuY2Vfb2ZfcmFpbiIsImRhaWx5X2NoYW5jZV9vZl9zbm93IiwiY3VycmVudCIsInRleHQiLCJ1diIsImh1bWlkaXR5Iiwid2luZF9kaXIiLCJ1bml0VGV4dERhdGEiLCJtZXRyaWMiLCJ0ZW1wX2MiLCJpbXBlcmlhbCIsInRlbXBfZiIsImZlZWxzbGlrZV9jIiwiZmVlbHNsaWtlX2YiLCJwcmVjaXBfbW0iLCJwcmVjaXBfaW4iLCJ3aW5kX2twaCIsIndpbmRfbXBoIiwibWludGVtcF9jIiwibWF4dGVtcF9jIiwibWludGVtcF9mIiwibWF4dGVtcF9mIiwiaG91ciIsImljb25EYXRhIiwiZGF0YUVsZW0iLCJpY29uRWxlbSIsImFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIiLCJzdWJtaXRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsaWRpdHkiLCJ2YWx1ZU1pc3NpbmciLCJ2YWx1ZSIsInRoZW4iLCJjYXRjaCJdLCJzb3VyY2VSb290IjoiIn0=