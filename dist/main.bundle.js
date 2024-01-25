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
async function getWeatherData(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";
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
  console.log(currentTime);
  const hourlyTimes = document.querySelectorAll(".hourly-time");
  hourlyTimes.forEach(time => {
    console.log(time.textContent);
    const hourlyCard = time.parentElement;
    if (parseInt(time.textContent) === parseInt(currentTime)) {
      hourlyCard.classList.add("current-hour");
    } else {
      hourlyCard.classList.remove("current-hour");
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
  markCurrentHour(data.location.localtime.split(" ")[1]);
  addIcons();
  colourBackground(data.current.condition.text);
}

// const backgroundColours = [
//   { codes: [1000], values: ["Sunny", "Clear"], colour: "" },
//   {
//     codes: [1003, 1006, 1009],
//     values: ["Partly Cloudy", "Cloudy", "Overcast"],
//     colour: "",
//   },
//   { codes: [1030], values: ["Mist"], colour: "" },
//   {
//     codes: [1063, 1066, 1069, 1072],
//     values: [
//       "Patchy rain possible",
//       "Patchy snow possible",
//       "Patchy sleet possible",
//       "Patchy freezing drizzle possible",
//     ],
//     colour: "",
//   },
//   { codes: [1087], values: ["Thundery outbreaks possible"], colour: "" },
//   { codes: [1114, 1117], values: ["Blowing snow", "Blizzard"], colour: "" },
//   { codes: [1135], values: ["Fog"], colour: "" },
//   {
//     codes: [1147, 1150, 1153],
//     values: ["Freezing fog", "Patchy light drizzle", "Light drizzle"],
//     colour: "",
//   },
//   {
//     codes: [1168, 1171],
//     values: ["Freezing drizzle", "Heavy freezing drizzle"],
//     colour: "",
//   },
// ];

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
/* harmony import */ var _domManipulation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domManipulation */ "./src/domManipulation.js");



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

// Try to add data to page based on searchbar result
function addSearchBarEventListener() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  submitBtn.addEventListener("click", async e => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";
      displaySearchError(searchBar, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      const data = await (0,_apiCalls__WEBPACK_IMPORTED_MODULE_0__["default"])(searchBar.value).catch(error => {
        displaySearchError(searchBar, error);
      });
      console.log(data);
      removeSearchError(searchBar);
      (0,_domManipulation__WEBPACK_IMPORTED_MODULE_1__["default"])(data, units);
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
    background-color: rgba(255, 255, 255, 0.20);
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
    background-color: rgba(255, 255, 255, 0.20);
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
    background-color: rgba(255, 255, 255, 0.20);
}
/* Marks current hour */
.current-hour {
    background-color: rgba(255, 255, 255, 0.80);

    color: black
}

.hourly-time {
    font-size: small;
}`, "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;;;;EAIE;AACF;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;AACd;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,sBAAsB;;IAEtB,YAAY;AAChB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;;IAEnB,kBAAkB;;IAElB,mBAAmB;IACnB,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,uCAAuC;IACvC,QAAQ;IACR,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,uBAAuB;IACvB,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,mBAAmB;AACvB;;AAEA;IACI,iBAAiB;IACjB,wCAAwC;IACxC,sBAAsB;AAC1B;;AAEA;IACI,uBAAuB;IACvB,iBAAiB;AACrB;;AAEA;IACI,kBAAkB;IAClB,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,WAAW;IACX,aAAa;;IAEb,aAAa;;IAEb,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,gBAAgB;AACpB;;AAEA;;AAEA;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;IAII,aAAa;IACb,mBAAmB;IACnB,SAAS;AACb;;AAEA;;;;EAIE;;AAEF;;;;IAII,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;IAC9B,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;IACI,oBAAoB;;IAEpB,2CAA2C;IAC3C,mBAAmB;AACvB;;AAEA;;IAEI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;IACI,oBAAoB;;IAEpB,2CAA2C;IAC3C,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;;;;EAIE;;AAEF;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,kBAAkB;AACtB;;AAEA;IACI,aAAa;IACb,kCAAkC;IAClC,mBAAmB;;IAEnB,oBAAoB;;IAEpB,mBAAmB;IACnB,2CAA2C;AAC/C;;AAEA;IACI,kBAAkB;IAClB,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,4BAA4B;IAC5B,qBAAqB;IACrB,WAAW;AACf;;AAEA;;;;EAIE;;AAEF;IACI,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;;AAEf;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,uBAAuB;;IAEvB,YAAY;;IAEZ,mBAAmB;IACnB,2CAA2C;AAC/C;;AAEA;IACI,gBAAgB;AACpB;;AAEA;;;;EAIE;;CAED;IACG,aAAa;IACb,4BAA4B;IAC5B,WAAW;AACf;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,WAAW;AACf;;AAEA;IACI,aAAa;IACb,iCAAiC;IACjC,qBAAqB;IACrB,mBAAmB;;IAEnB,mBAAmB;IACnB,2CAA2C;AAC/C;AACA,uBAAuB;AACvB;IACI,2CAA2C;;IAE3C;AACJ;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["/*\r\n * ------------------------------------------------------------\r\n * General Styling\r\n * ------------------------------------------------------------\r\n */\r\n* {\r\n    box-sizing: border-box;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\nbody {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    width: 100vw;\r\n    height: 100vh;\r\n\r\n    background-color: grey;\r\n\r\n    color: white;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Search Form Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\nform {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n\r\n    padding: 1rem 2rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.form-field {\r\n    display: grid;\r\n    grid-template-rows: auto repeat(2, 1fr);\r\n    gap: 8px;\r\n    width: 100%;\r\n    height: auto;\r\n}\r\n\r\n.searchbar {\r\n    border: 1px solid black;\r\n    padding: 8px;\r\n}\r\n\r\n.unit-option {\r\n    display: flex;\r\n    align-items: center;\r\n}\r\n\r\n.field-error {\r\n    border-color: red;\r\n    background-color: rgba(255, 0, 0, 0.041);\r\n    outline: 1px solid red;\r\n}\r\n\r\n.error-message {\r\n    color: rgb(252, 62, 62);\r\n    font-size: 0.8rem;\r\n}\r\n\r\nbutton {\r\n    padding: 10px 20px;\r\n    cursor: pointer;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Weather Information Layout Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.weather-container {\r\n    display: flex;\r\n    flex-direction: column;\r\n    gap: 1rem;\r\n\r\n    width: 80vw;\r\n    height: 100vh;\r\n\r\n    padding: 1rem;\r\n\r\n    font-size: 20px;\r\n}\r\n\r\n.row-1 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n    display: grid;\r\n    grid-template-columns: 1fr 3fr;\r\n    column-gap: 1rem;\r\n}\r\n\r\n.row-3 {\r\n\r\n}\r\n\r\n.subsection-header {\r\n    font-size: large;\r\n}\r\n\r\n.location-details,\r\n.sun-info,\r\n.weather-description,\r\n.precipitation-info {\r\n    display: flex;\r\n    align-items: center;\r\n    gap: 1rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Icon Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.rain-icon,\r\n.snow-icon,\r\n.sunrise-icon,\r\n.sunset-icon {\r\n    height: 20px;\r\n    width: 20px;\r\n}\r\n\r\n.icon-text-pair {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: space-between;\r\n    gap: 0.5rem;\r\n}\r\n\r\n.weather-icon {\r\n    height: 58px;\r\n    width: 58px;\r\n}\r\n\r\n.forecast-icon {\r\n    height: 46px;\r\n    width: 46px;\r\n}\r\n\r\n.hourly-forecast-icon {\r\n    height: 30px;\r\n    width: 30px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Location Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.location-info-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n}\r\n\r\n.city-name,\r\n.country-name {\r\n    overflow: hidden;\r\n}\r\n\r\n.city-name {\r\n    font-size: 80px;\r\n}\r\n\r\n.country-name {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Weather Information Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-weather-container {\r\n    padding: 0.5rem 1rem;\r\n\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n    border-radius: 10px;\r\n} \r\n\r\n.current-temp {\r\n    font-size: 80px;\r\n}\r\n\r\n.current-weather-description {\r\n    font-size: 50px;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Gif Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Three Day Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.three-day-forecast-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.three-day-forecast-card-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(3, 1fr);\r\n    column-gap: 0.5rem;\r\n}\r\n\r\n.three-day-forecast-card {\r\n    display: grid;\r\n    grid-template-columns: 1fr 5fr 1fr;\r\n    align-items: center;\r\n\r\n    padding: 0.2rem 1rem;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.forecast-card-title {\r\n    text-align: center;\r\n    font-size: small;\r\n}\r\n\r\n.forecast-card-details {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    justify-items: center;\r\n    gap: 0.5rem;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Current Details Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n.current-details-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.detail-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(2, 1fr);\r\n    gap: 0.5rem;\r\n\r\n}\r\n\r\n.detail-card {\r\n    display: flex;\r\n    flex-direction: column;\r\n    align-items: center;\r\n    justify-content: center;\r\n\r\n    height: 100%;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n\r\n.detail-card > h4 {\r\n    font-size: small;\r\n}\r\n\r\n/*\r\n * ------------------------------------------------------------\r\n * Hourly Forecast Styling\r\n * ------------------------------------------------------------\r\n */\r\n\r\n .hourly-forecast-info-container {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr;\r\n    gap: 0.5rem;\r\n} \r\n\r\n.hourly-forecast-card-grid {\r\n    display: grid;\r\n    grid: repeat(3, 1fr) / repeat(8, 1fr);\r\n    gap: 0.5rem;\r\n}\r\n\r\n.hourly-forecast-card {\r\n    display: grid;\r\n    grid-template-rows: auto 1fr auto;\r\n    justify-items: center;\r\n    align-items: center;\r\n\r\n    border-radius: 10px;\r\n    background-color: rgba(255, 255, 255, 0.20);\r\n}\r\n/* Marks current hour */\r\n.current-hour {\r\n    background-color: rgba(255, 255, 255, 0.80);\r\n\r\n    color: black\r\n}\r\n\r\n.hourly-time {\r\n    font-size: small;\r\n}"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZSxlQUFlQSxjQUFjQSxDQUFDQyxRQUFRLEVBQUU7RUFDckQsTUFBTUMsYUFBYSxHQUFHLGlDQUFpQztFQUV2RCxJQUFJO0lBQ0YsTUFBTUMsUUFBUSxHQUFHLE1BQU1DLEtBQUssQ0FDekIsbURBQWtERixhQUFjLE1BQUtELFFBQVMsU0FDakYsQ0FBQzs7SUFFRDtJQUNBLElBQUlFLFFBQVEsQ0FBQ0UsTUFBTSxLQUFLLEdBQUcsRUFBRTtNQUMzQixPQUFPQyxPQUFPLENBQUNDLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQztJQUNuRDtJQUVBLE9BQU9KLFFBQVEsQ0FBQ0ssSUFBSSxDQUFDLENBQUM7RUFDeEIsQ0FBQyxDQUFDLE9BQU9DLEtBQUssRUFBRTtJQUNkLE9BQU9ILE9BQU8sQ0FBQ0MsTUFBTSxDQUFDRSxLQUFLLENBQUM7RUFDOUI7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkMyQztBQUNJO0FBQ1Y7QUFDQTs7QUFFckM7QUFDQSxNQUFNSyxtQkFBbUIsR0FBRyxDQUMxQjtFQUFFQyxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7RUFBRUMsTUFBTSxFQUFFO0FBQVUsQ0FBQyxFQUM1QztFQUFFRCxVQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUM7RUFBRUMsTUFBTSxFQUFFO0FBQVUsQ0FBQyxFQUM1QztFQUFFRCxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUM7RUFBRUMsTUFBTSxFQUFFO0FBQVUsQ0FBQyxFQUNwRDtFQUNFRCxVQUFVLEVBQUUsQ0FDVixRQUFRLEVBQ1IsVUFBVSxFQUNWLE1BQU0sRUFDTixzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLHVCQUF1QixDQUN4QjtFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFDRUQsVUFBVSxFQUFFLENBQ1YsNkJBQTZCLEVBQzdCLGNBQWMsRUFDZCxVQUFVLEVBQ1YsY0FBYyxFQUNkLHNCQUFzQixFQUN0QixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLHdCQUF3QixDQUN6QjtFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFBRUQsVUFBVSxFQUFFLENBQUMsS0FBSyxDQUFDO0VBQUVDLE1BQU0sRUFBRTtBQUFVLENBQUMsRUFDMUM7RUFDRUQsVUFBVSxFQUFFLENBQ1YscUJBQXFCLEVBQ3JCLGlDQUFpQyxFQUNqQyxhQUFhLEVBQ2IseUJBQXlCLENBQzFCO0VBQ0RDLE1BQU0sRUFBRTtBQUNWLENBQUMsRUFDRDtFQUNFRCxVQUFVLEVBQUUsQ0FDVixtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLHNCQUFzQixFQUN0QixlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLFlBQVksQ0FDYjtFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFBRUQsVUFBVSxFQUFFLENBQUMsYUFBYSxDQUFDO0VBQUVDLE1BQU0sRUFBRTtBQUFVLENBQUMsRUFDbEQ7RUFDRUQsVUFBVSxFQUFFLENBQ1YsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixlQUFlLEVBQ2YscUJBQXFCLEVBQ3JCLFlBQVksQ0FDYjtFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFDRUQsVUFBVSxFQUFFLENBQ1YsbUJBQW1CLEVBQ25CLCtCQUErQixFQUMvQix3QkFBd0IsQ0FDekI7RUFDREMsTUFBTSxFQUFFO0FBQ1YsQ0FBQyxFQUNEO0VBQ0VELFVBQVUsRUFBRSxDQUNWLHFCQUFxQixFQUNyQixpQ0FBaUMsRUFDakMsb0JBQW9CLEVBQ3BCLGdDQUFnQyxDQUNqQztFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFDRUQsVUFBVSxFQUFFLENBQ1YsOEJBQThCLEVBQzlCLDBDQUEwQyxDQUMzQztFQUNEQyxNQUFNLEVBQUU7QUFDVixDQUFDLEVBQ0Q7RUFDRUQsVUFBVSxFQUFFLENBQ1YsZ0NBQWdDLEVBQ2hDLHFDQUFxQyxFQUNyQyxnQ0FBZ0MsRUFDaEMscUNBQXFDLENBQ3RDO0VBQ0RDLE1BQU0sRUFBRTtBQUNWLENBQUMsQ0FDRjs7QUFFRDtBQUNBLFNBQVNDLGdCQUFnQkEsQ0FBQ0MsU0FBUyxFQUFFO0VBQ25DLE1BQU1DLElBQUksR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsTUFBTSxDQUFDO0VBRTNDUCxtQkFBbUIsQ0FBQ1EsT0FBTyxDQUFFQyxZQUFZLElBQUs7SUFDNUMsSUFBSUEsWUFBWSxDQUFDUixVQUFVLENBQUNTLFFBQVEsQ0FBQ04sU0FBUyxDQUFDLEVBQUU7TUFDL0NDLElBQUksQ0FBQ00sS0FBSyxDQUFDQyxlQUFlLEdBQUdILFlBQVksQ0FBQ1AsTUFBTTtJQUNsRDtFQUNGLENBQUMsQ0FBQztBQUNKOztBQUVBO0FBQ0EsU0FBU1csZUFBZUEsQ0FBQ0MsV0FBVyxFQUFFO0VBQ3BDQyxPQUFPLENBQUNDLEdBQUcsQ0FBQ0YsV0FBVyxDQUFDO0VBQ3hCLE1BQU1HLFdBQVcsR0FBR1gsUUFBUSxDQUFDWSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUM7RUFFN0RELFdBQVcsQ0FBQ1QsT0FBTyxDQUFFVyxJQUFJLElBQUs7SUFDNUJKLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDRyxJQUFJLENBQUNDLFdBQVcsQ0FBQztJQUM3QixNQUFNQyxVQUFVLEdBQUdGLElBQUksQ0FBQ0csYUFBYTtJQUNyQyxJQUFJQyxRQUFRLENBQUNKLElBQUksQ0FBQ0MsV0FBVyxDQUFDLEtBQUtHLFFBQVEsQ0FBQ1QsV0FBVyxDQUFDLEVBQUU7TUFDeERPLFVBQVUsQ0FBQ0csU0FBUyxDQUFDQyxHQUFHLENBQUMsY0FBYyxDQUFDO0lBQzFDLENBQUMsTUFBTTtNQUNMSixVQUFVLENBQUNHLFNBQVMsQ0FBQ0UsTUFBTSxDQUFDLGNBQWMsQ0FBQztJQUM3QztFQUNGLENBQUMsQ0FBQztBQUNKOztBQUVBO0FBQ0EsU0FBU0MsUUFBUUEsQ0FBQSxFQUFHO0VBQ2xCLE1BQU1DLFdBQVcsR0FBR3RCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGVBQWUsQ0FBQztFQUMzRCxNQUFNc0IsVUFBVSxHQUFHdkIsUUFBUSxDQUFDQyxhQUFhLENBQUMsY0FBYyxDQUFDO0VBQ3pELE1BQU11QixTQUFTLEdBQUd4QixRQUFRLENBQUNZLGdCQUFnQixDQUFDLFlBQVksQ0FBQztFQUN6RCxNQUFNYSxTQUFTLEdBQUd6QixRQUFRLENBQUNZLGdCQUFnQixDQUFDLFlBQVksQ0FBQztFQUV6RFUsV0FBVyxDQUFDSSxHQUFHLEdBQUdwQyxnREFBTztFQUN6QmlDLFVBQVUsQ0FBQ0csR0FBRyxHQUFHbkMsa0RBQVM7RUFDMUJpQyxTQUFTLENBQUN0QixPQUFPLENBQUV5QixJQUFJLElBQUs7SUFDMUJBLElBQUksQ0FBQ0QsR0FBRyxHQUFHbEMsNkNBQUk7RUFDakIsQ0FBQyxDQUFDO0VBQ0ZpQyxTQUFTLENBQUN2QixPQUFPLENBQUV5QixJQUFJLElBQUs7SUFDMUJBLElBQUksQ0FBQ0QsR0FBRyxHQUFHakMsNkNBQUk7RUFDakIsQ0FBQyxDQUFDO0FBQ0o7O0FBRUE7QUFDZSxTQUFTbUMsWUFBWUEsQ0FBQ0MsSUFBSSxFQUFFQyxLQUFLLEVBQUU7RUFDaEQsTUFBTUMsZUFBZSxHQUFHO0VBQ3RCO0VBQ0E7SUFBRUMsUUFBUSxFQUFFLFlBQVk7SUFBRUgsSUFBSSxFQUFFQSxJQUFJLENBQUNoRCxRQUFRLENBQUNvRCxJQUFJLENBQUNDLFdBQVcsQ0FBQztFQUFFLENBQUMsRUFDbEU7SUFBRUYsUUFBUSxFQUFFLGVBQWU7SUFBRUgsSUFBSSxFQUFFQSxJQUFJLENBQUNoRCxRQUFRLENBQUNzRDtFQUFRLENBQUMsRUFDMUQ7SUFBRUgsUUFBUSxFQUFFLGFBQWE7SUFBRUgsSUFBSSxFQUFFQSxJQUFJLENBQUNoRCxRQUFRLENBQUN1RCxTQUFTLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQUUsQ0FBQyxFQUN4RTtJQUFFTCxRQUFRLEVBQUUsYUFBYTtJQUFFSCxJQUFJLEVBQUVBLElBQUksQ0FBQ2hELFFBQVEsQ0FBQ3VELFNBQVMsQ0FBQ0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7RUFBRSxDQUFDLEVBQ3hFO0lBQ0VMLFFBQVEsRUFBRSxlQUFlO0lBQ3pCSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQ0M7RUFDM0MsQ0FBQyxFQUNEO0lBQ0VULFFBQVEsRUFBRSxjQUFjO0lBQ3hCSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNDLEtBQUssQ0FBQ0U7RUFDM0MsQ0FBQyxFQUNEO0lBQ0VWLFFBQVEsRUFBRSxzQkFBc0I7SUFDaENILElBQUksRUFBRyxHQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNDLG9CQUFxQjtFQUNqRSxDQUFDLEVBQ0Q7SUFDRVosUUFBUSxFQUFFLHNCQUFzQjtJQUNoQ0gsSUFBSSxFQUFHLEdBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ0Usb0JBQXFCO0VBQ2pFLENBQUM7RUFDRDtFQUNBO0lBQ0ViLFFBQVEsRUFBRSw4QkFBOEI7SUFDeENILElBQUksRUFBRUEsSUFBSSxDQUFDaUIsT0FBTyxDQUFDaEQsU0FBUyxDQUFDaUQ7RUFDL0IsQ0FBQyxFQUNEO0lBQUVmLFFBQVEsRUFBRSxZQUFZO0lBQUVILElBQUksRUFBRUEsSUFBSSxDQUFDaUIsT0FBTyxDQUFDRTtFQUFHLENBQUMsRUFDakQ7SUFBRWhCLFFBQVEsRUFBRSxrQkFBa0I7SUFBRUgsSUFBSSxFQUFHLEdBQUVBLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ0csUUFBUztFQUFHLENBQUMsRUFDbkU7SUFBRWpCLFFBQVEsRUFBRSx3QkFBd0I7SUFBRUgsSUFBSSxFQUFFQSxJQUFJLENBQUNpQixPQUFPLENBQUNJO0VBQVMsQ0FBQztFQUNuRTtFQUNBO0lBQ0VsQixRQUFRLEVBQ04sbUZBQW1GO0lBQ3JGSCxJQUFJLEVBQUcsR0FBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDQyxvQkFBcUI7RUFDakUsQ0FBQyxFQUNEO0lBQ0VaLFFBQVEsRUFDTixtRkFBbUY7SUFDckZILElBQUksRUFBRyxHQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNFLG9CQUFxQjtFQUNqRSxDQUFDLEVBQ0Q7SUFDRWIsUUFBUSxFQUNOLG1GQUFtRjtJQUNyRkgsSUFBSSxFQUFHLEdBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ0Msb0JBQXFCO0VBQ2pFLENBQUMsRUFDRDtJQUNFWixRQUFRLEVBQ04sbUZBQW1GO0lBQ3JGSCxJQUFJLEVBQUcsR0FBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDRSxvQkFBcUI7RUFDakUsQ0FBQyxFQUNEO0lBQ0ViLFFBQVEsRUFDTixtRkFBbUY7SUFDckZILElBQUksRUFBRyxHQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNDLG9CQUFxQjtFQUNqRSxDQUFDLEVBQ0Q7SUFDRVosUUFBUSxFQUNOLG1GQUFtRjtJQUNyRkgsSUFBSSxFQUFHLEdBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ0Usb0JBQXFCO0VBQ2pFLENBQUMsQ0FDRjtFQUVELE1BQU1NLFlBQVksR0FBRztFQUNuQjtFQUNBO0lBQ0VuQixRQUFRLEVBQUUsZUFBZTtJQUN6Qm9CLE1BQU0sRUFBRXZCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ08sTUFBTTtJQUMzQkMsUUFBUSxFQUFFekIsSUFBSSxDQUFDaUIsT0FBTyxDQUFDUztFQUN6QixDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUJvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ1UsV0FBWSxRQUFPO0lBQzNDRixRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ1csV0FBWTtFQUN4QyxDQUFDLEVBQ0Q7SUFDRXpCLFFBQVEsRUFBRSx1QkFBdUI7SUFDakNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ1ksU0FBVSxLQUFJO0lBQ3RDSixRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2EsU0FBVTtFQUN0QyxDQUFDLEVBQ0Q7SUFDRTNCLFFBQVEsRUFBRSxvQkFBb0I7SUFDOUJvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2MsUUFBUyxPQUFNO0lBQ3ZDTixRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2UsUUFBUztFQUNyQyxDQUFDLEVBQ0Q7SUFDRTdCLFFBQVEsRUFBRSxnQkFBZ0I7SUFDMUJvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ21CLFNBQVUsWUFBV2pDLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ29CLFNBQVUsUUFBTztJQUNuSFQsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNxQixTQUFVLFlBQVduQyxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNzQixTQUFVO0VBQ2hILENBQUM7RUFDRDtFQUNBO0lBQ0VqQyxRQUFRLEVBQ04sb0VBQW9FO0lBQ3RFb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNtQixTQUFVLFlBQVdqQyxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNvQixTQUFVLFFBQU87SUFDbkhULFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDcUIsU0FBVSxZQUFXbkMsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDc0IsU0FBVTtFQUNoSCxDQUFDLEVBQ0Q7SUFDRWpDLFFBQVEsRUFDTixvRUFBb0U7SUFDdEVvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ21CLFNBQVUsWUFBV2pDLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ29CLFNBQVUsUUFBTztJQUNuSFQsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNxQixTQUFVLFlBQVduQyxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDSSxHQUFHLENBQUNzQixTQUFVO0VBQ2hILENBQUMsRUFDRDtJQUNFakMsUUFBUSxFQUNOLG9FQUFvRTtJQUN0RW9CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDbUIsU0FBVSxZQUFXakMsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDb0IsU0FBVSxRQUFPO0lBQ25IVCxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ3FCLFNBQVUsWUFBV25DLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNJLEdBQUcsQ0FBQ3NCLFNBQVU7RUFDaEgsQ0FBQztFQUNEO0VBQ0E7SUFDRWpDLFFBQVEsRUFBRSwrQkFBK0I7SUFDekNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUM5REMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDWCxNQUFPO0VBQzNELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLCtCQUErQjtJQUN6Q29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQzlEQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNYLE1BQU87RUFDM0QsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsK0JBQStCO0lBQ3pDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDOURDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ1gsTUFBTztFQUMzRCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSwrQkFBK0I7SUFDekNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUM5REMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDWCxNQUFPO0VBQzNELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLCtCQUErQjtJQUN6Q29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQzlEQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNYLE1BQU87RUFDM0QsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsK0JBQStCO0lBQ3pDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDOURDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ1gsTUFBTztFQUMzRCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSwrQkFBK0I7SUFDekNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUM5REMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDWCxNQUFPO0VBQzNELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLCtCQUErQjtJQUN6Q29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQzlEQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNYLE1BQU87RUFDM0QsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsK0JBQStCO0lBQ3pDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDOURDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ1gsTUFBTztFQUMzRCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSwrQkFBK0I7SUFDekNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUM5REMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDWCxNQUFPO0VBQzNELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLGdDQUFnQztJQUMxQ29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQy9EQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNYLE1BQU87RUFDNUQsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDL0RDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ1gsTUFBTztFQUM1RCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSxnQ0FBZ0M7SUFDMUNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUMvREMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDWCxNQUFPO0VBQzVELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLGdDQUFnQztJQUMxQ29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQy9EQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNYLE1BQU87RUFDNUQsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDL0RDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ1gsTUFBTztFQUM1RCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSxnQ0FBZ0M7SUFDMUNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUMvREMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDWCxNQUFPO0VBQzVELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLGdDQUFnQztJQUMxQ29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQy9EQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNYLE1BQU87RUFDNUQsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDL0RDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ1gsTUFBTztFQUM1RCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSxnQ0FBZ0M7SUFDMUNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUMvREMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDWCxNQUFPO0VBQzVELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLGdDQUFnQztJQUMxQ29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQy9EQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNYLE1BQU87RUFDNUQsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDL0RDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ1gsTUFBTztFQUM1RCxDQUFDLEVBQ0Q7SUFDRXZCLFFBQVEsRUFBRSxnQ0FBZ0M7SUFDMUNvQixNQUFNLEVBQUcsR0FBRXZCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNiLE1BQU8sUUFBTztJQUMvREMsUUFBUSxFQUFHLEdBQUV6QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDWCxNQUFPO0VBQzVELENBQUMsRUFDRDtJQUNFdkIsUUFBUSxFQUFFLGdDQUFnQztJQUMxQ29CLE1BQU0sRUFBRyxHQUFFdkIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ2IsTUFBTyxRQUFPO0lBQy9EQyxRQUFRLEVBQUcsR0FBRXpCLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNYLE1BQU87RUFDNUQsQ0FBQyxFQUNEO0lBQ0V2QixRQUFRLEVBQUUsZ0NBQWdDO0lBQzFDb0IsTUFBTSxFQUFHLEdBQUV2QixJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDYixNQUFPLFFBQU87SUFDL0RDLFFBQVEsRUFBRyxHQUFFekIsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ1gsTUFBTztFQUM1RCxDQUFDLENBQ0Y7RUFFRCxNQUFNWSxRQUFRLEdBQUc7RUFDZjtFQUNBO0lBQUVuQyxRQUFRLEVBQUUsZUFBZTtJQUFFSCxJQUFJLEVBQUVBLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2hELFNBQVMsQ0FBQzZCO0VBQUssQ0FBQztFQUNoRTtFQUNBO0lBQ0VLLFFBQVEsRUFBRSx1Q0FBdUM7SUFDakRILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDN0MsU0FBUyxDQUFDNkI7RUFDbkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSx1Q0FBdUM7SUFDakRILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDN0MsU0FBUyxDQUFDNkI7RUFDbkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSx1Q0FBdUM7SUFDakRILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksR0FBRyxDQUFDN0MsU0FBUyxDQUFDNkI7RUFDbkQsQ0FBQztFQUNEO0VBQ0E7SUFDRUssUUFBUSxFQUFFLGlDQUFpQztJQUMzQ0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDdkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxpQ0FBaUM7SUFDM0NILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3ZELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsaUNBQWlDO0lBQzNDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN2RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGlDQUFpQztJQUMzQ0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDdkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxpQ0FBaUM7SUFDM0NILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3ZELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsaUNBQWlDO0lBQzNDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN2RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGlDQUFpQztJQUMzQ0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDdkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxpQ0FBaUM7SUFDM0NILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3ZELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsaUNBQWlDO0lBQzNDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN2RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGlDQUFpQztJQUMzQ0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDdkQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUNILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3hELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN4RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGtDQUFrQztJQUM1Q0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDeEQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUNILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3hELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN4RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGtDQUFrQztJQUM1Q0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDeEQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUNILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3hELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN4RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGtDQUFrQztJQUM1Q0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDeEQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUNILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3hELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN4RCxDQUFDLEVBQ0Q7SUFDRUssUUFBUSxFQUFFLGtDQUFrQztJQUM1Q0gsSUFBSSxFQUFFQSxJQUFJLENBQUNTLFFBQVEsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDMkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDcEUsU0FBUyxDQUFDNkI7RUFDeEQsQ0FBQyxFQUNEO0lBQ0VLLFFBQVEsRUFBRSxrQ0FBa0M7SUFDNUNILElBQUksRUFBRUEsSUFBSSxDQUFDUyxRQUFRLENBQUNDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzJCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQ3BFLFNBQVMsQ0FBQzZCO0VBQ3hELENBQUMsRUFDRDtJQUNFSyxRQUFRLEVBQUUsa0NBQWtDO0lBQzVDSCxJQUFJLEVBQUVBLElBQUksQ0FBQ1MsUUFBUSxDQUFDQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMyQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUNwRSxTQUFTLENBQUM2QjtFQUN4RCxDQUFDLENBQ0Y7O0VBRUQ7RUFDQUksZUFBZSxDQUFDN0IsT0FBTyxDQUFFa0UsUUFBUSxJQUFLO0lBQ3BDcEUsUUFBUSxDQUFDQyxhQUFhLENBQUNtRSxRQUFRLENBQUNwQyxRQUFRLENBQUMsQ0FBQ2xCLFdBQVcsR0FBR3NELFFBQVEsQ0FBQ3ZDLElBQUk7RUFDdkUsQ0FBQyxDQUFDO0VBRUYsSUFBSUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtJQUN0QnFCLFlBQVksQ0FBQ2pELE9BQU8sQ0FBRWtFLFFBQVEsSUFBSztNQUNqQ3BFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDbUUsUUFBUSxDQUFDcEMsUUFBUSxDQUFDLENBQUNsQixXQUFXLEdBQUdzRCxRQUFRLENBQUNoQixNQUFNO0lBQ3pFLENBQUMsQ0FBQztFQUNKLENBQUMsTUFBTTtJQUNMRCxZQUFZLENBQUNqRCxPQUFPLENBQUVrRSxRQUFRLElBQUs7TUFDakNwRSxRQUFRLENBQUNDLGFBQWEsQ0FBQ21FLFFBQVEsQ0FBQ3BDLFFBQVEsQ0FBQyxDQUFDbEIsV0FBVyxHQUFHc0QsUUFBUSxDQUFDZCxRQUFRO0lBQzNFLENBQUMsQ0FBQztFQUNKO0VBRUFhLFFBQVEsQ0FBQ2pFLE9BQU8sQ0FBRW1FLFFBQVEsSUFBSztJQUM3QnJFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDb0UsUUFBUSxDQUFDckMsUUFBUSxDQUFDLENBQUNOLEdBQUcsR0FBRzJDLFFBQVEsQ0FBQ3hDLElBQUk7RUFDL0QsQ0FBQyxDQUFDO0VBRUZ0QixlQUFlLENBQUNzQixJQUFJLENBQUNoRCxRQUFRLENBQUN1RCxTQUFTLENBQUNDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN0RGhCLFFBQVEsQ0FBQyxDQUFDO0VBQ1Z4QixnQkFBZ0IsQ0FBQ2dDLElBQUksQ0FBQ2lCLE9BQU8sQ0FBQ2hELFNBQVMsQ0FBQ2lELElBQUksQ0FBQztBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMWlCd0M7QUFDSzs7QUFFN0M7QUFDQSxTQUFTdUIsa0JBQWtCQSxDQUFDQyxTQUFTLEVBQUVsRixLQUFLLEVBQUU7RUFDNUMsTUFBTW1GLGNBQWMsR0FBR3hFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLDRCQUE0QixDQUFDO0VBRTNFdUUsY0FBYyxDQUFDMUQsV0FBVyxHQUFHekIsS0FBSztFQUNsQ2tGLFNBQVMsQ0FBQ3JELFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGFBQWEsQ0FBQztBQUN4Qzs7QUFFQTtBQUNBLFNBQVNzRCxpQkFBaUJBLENBQUNGLFNBQVMsRUFBRTtFQUNwQ0EsU0FBUyxDQUFDckQsU0FBUyxDQUFDRSxNQUFNLENBQUMsYUFBYSxDQUFDO0FBQzNDOztBQUVBO0FBQ2UsU0FBU3NELHlCQUF5QkEsQ0FBQSxFQUFHO0VBQ2xELE1BQU1DLFNBQVMsR0FBRzNFLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFFBQVEsQ0FBQztFQUNsRCxNQUFNc0UsU0FBUyxHQUFHdkUsUUFBUSxDQUFDQyxhQUFhLENBQUMsV0FBVyxDQUFDO0VBRXJEMEUsU0FBUyxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBT0MsQ0FBQyxJQUFLO0lBQy9DQSxDQUFDLENBQUNDLGNBQWMsQ0FBQyxDQUFDO0lBQ2xCLElBQUlQLFNBQVMsQ0FBQ1EsUUFBUSxDQUFDQyxZQUFZLEVBQUU7TUFDbkMsTUFBTTNGLEtBQUssR0FBRyx1QkFBdUI7TUFFckNpRixrQkFBa0IsQ0FBQ0MsU0FBUyxFQUFFbEYsS0FBSyxDQUFDO0lBQ3RDLENBQUMsTUFBTTtNQUNMLE1BQU15QyxLQUFLLEdBQUc5QixRQUFRLENBQUNDLGFBQWEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDZ0YsS0FBSztNQUN6RSxNQUFNcEQsSUFBSSxHQUFHLE1BQU1qRCxxREFBYyxDQUFDMkYsU0FBUyxDQUFDVSxLQUFLLENBQUMsQ0FBQ0MsS0FBSyxDQUFFN0YsS0FBSyxJQUFLO1FBQ2xFaUYsa0JBQWtCLENBQUNDLFNBQVMsRUFBRWxGLEtBQUssQ0FBQztNQUN0QyxDQUFDLENBQUM7TUFFRm9CLE9BQU8sQ0FBQ0MsR0FBRyxDQUFDbUIsSUFBSSxDQUFDO01BQ2pCNEMsaUJBQWlCLENBQUNGLFNBQVMsQ0FBQztNQUM1QjNDLDREQUFZLENBQUNDLElBQUksRUFBRUMsS0FBSyxDQUFDO0lBQzNCO0VBQ0YsQ0FBQyxDQUFDO0FBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RDQTtBQUMwRztBQUNqQjtBQUN6Riw4QkFBOEIsbUZBQTJCLENBQUMsNEZBQXFDO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxPQUFPLG1GQUFtRixLQUFLLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxjQUFjLFdBQVcsV0FBVyxhQUFhLFdBQVcsT0FBTyxRQUFRLE1BQU0sS0FBSyxVQUFVLFlBQVksY0FBYyxjQUFjLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsVUFBVSxVQUFVLE9BQU8sS0FBSyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLE9BQU8sUUFBUSxNQUFNLEtBQUssVUFBVSxZQUFZLFlBQVksVUFBVSxXQUFXLFdBQVcsVUFBVSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sTUFBTSxN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QUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2xCQTs7Ozs7Ozs7Ozs7OztBQ0F5RDtBQUNwQztBQUVyQjRDLDJEQUF5QixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9hcGlDYWxscy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZG9tTWFuaXB1bGF0aW9uLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9ldmVudExpc3RlbmVycy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBnZXRXZWF0aGVyRGF0YShsb2NhdGlvbikge1xyXG4gIGNvbnN0IHdlYXRoZXJBcGlLZXkgPSBcImVkNTZlMWJkMDFjNTQ4MTc4ZGQxNDU0MDgyNDIyMDFcIjtcclxuXHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbiAgICAgIGBodHRwczovL2FwaS53ZWF0aGVyYXBpLmNvbS92MS9mb3JlY2FzdC5qc29uP2tleT0ke3dlYXRoZXJBcGlLZXl9JnE9JHtsb2NhdGlvbn0mZGF5cz0zYCxcclxuICAgICk7XHJcblxyXG4gICAgLy8gSW52YWxpZCBsb2NhdGlvblxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAwKSB7XHJcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkxvY2F0aW9uIG5vdCByZWNvZ25pc2VkIVwiKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xyXG4gIH1cclxufVxyXG5cclxuLy8gYXN5bmMgZnVuY3Rpb24gZ2V0R2lmRGF0YShsb2NhdGlvbiwgY29uZGl0aW9uKSB7XHJcbi8vICAgY29uc3Qgc2VhcmNoVGVybSA9IGAke2xvY2F0aW9ufS0ke2NvbmRpdGlvbn1gO1xyXG4vLyAgIGNvbnNvbGUubG9nKHNlYXJjaFRlcm0pO1xyXG4vLyAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXHJcbi8vICAgICBgaHR0cHM6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvdHJhbnNsYXRlP2FwaV9rZXk9JHtnaWZBcGlLZXl9JnM9JHtzZWFyY2hUZXJtfWAsXHJcbi8vICAgKTtcclxuLy8gICBleHRyYWN0R2lmRGF0YShyZXNwb25zZSk7XHJcbi8vIH1cclxuXHJcbi8vIGFzeW5jIGZ1bmN0aW9uIGV4dHJhY3RHaWZEYXRhKHJlc3BvbnNlKSB7XHJcbi8vICAgY29uc3QganNvbkRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XHJcbi8vICAgY29uc29sZS5sb2coanNvbkRhdGEpO1xyXG4vLyAgIGNvbnNvbGUubG9nKGpzb25EYXRhLmRhdGEuaW1hZ2VzLmZpeGVkX2hlaWdodF9zbWFsbC51cmwpO1xyXG4vLyAgIGFkZEdpZihqc29uRGF0YS5kYXRhLmltYWdlcy5maXhlZF9oZWlnaHRfc21hbGwudXJsKTtcclxuLy8gfVxyXG5cclxuLy8gY29uc3QgZ2lmQXBpS2V5ID0gXCJUdXFEMml1VkE3cEx3RHRQZEE5ZjVrVjVySHR0Wkt6eFwiO1xyXG4iLCJpbXBvcnQgZGF5VGltZSBmcm9tIFwiLi9hc3NldHMvZGF5VGltZS5wbmdcIjtcclxuaW1wb3J0IG5pZ2h0VGltZSBmcm9tIFwiLi9hc3NldHMvbmlnaHRUaW1lLnBuZ1wiO1xyXG5pbXBvcnQgcmFpbiBmcm9tIFwiLi9hc3NldHMvcmFpbi5wbmdcIjtcclxuaW1wb3J0IHNub3cgZnJvbSBcIi4vYXNzZXRzL3Nub3cucG5nXCI7XHJcblxyXG4vLyBNYXBwaW5nIG9mIHdlYXRoZXIgY29uZGl0aW9ucyB0byBjb2xvdXJzIHRoYXQgcmVwcmVzZW50IHRoZW1cclxuY29uc3Qgd2VhdGhlckNvbG9yTWFwcGluZyA9IFtcclxuICB7IGNvbmRpdGlvbnM6IFtcIlN1bm55XCJdLCBjb2xvdXI6IFwiIzUxOTZkN1wiIH0sXHJcbiAgeyBjb25kaXRpb25zOiBbXCJDbGVhclwiXSwgY29sb3VyOiBcIiMwZDE3MzBcIiB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiUGFydGx5IGNsb3VkeVwiXSwgY29sb3VyOiBcIiM4OWExYjhcIiB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJDbG91ZHlcIixcclxuICAgICAgXCJPdmVyY2FzdFwiLFxyXG4gICAgICBcIk1pc3RcIixcclxuICAgICAgXCJQYXRjaHkgcmFpbiBwb3NzaWJsZVwiLFxyXG4gICAgICBcIlBhdGNoeSBzbm93IHBvc3NpYmxlXCIsXHJcbiAgICAgIFwiUGF0Y2h5IHNsZWV0IHBvc3NpYmxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM2ZjgwOWRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGVcIixcclxuICAgICAgXCJCbG93aW5nIHNub3dcIixcclxuICAgICAgXCJCbGl6emFyZFwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGZvZ1wiLFxyXG4gICAgICBcIlBhdGNoeSBsaWdodCBkcml6emxlXCIsXHJcbiAgICAgIFwiTGlnaHQgZHJpenpsZVwiLFxyXG4gICAgICBcIkZyZWV6aW5nIGRyaXp6bGVcIixcclxuICAgICAgXCJIZWF2eSBmcmVlemluZyBkcml6emxlXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiMxMjE4MjRcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiRm9nXCJdLCBjb2xvdXI6IFwiIzZmODA5ZFwiIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IGZyZWV6aW5nIHJhaW5cIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBmcmVlemluZyByYWluXCIsXHJcbiAgICAgIFwiTGlnaHQgc2xlZXRcIixcclxuICAgICAgXCJNb2RlcmF0ZSBvciBoZWF2eSBzbGVldFwiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3dcIixcclxuICAgICAgXCJMaWdodCBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IG1vZGVyYXRlIHNub3dcIixcclxuICAgICAgXCJNb2RlcmF0ZSBzbm93XCIsXHJcbiAgICAgIFwiUGF0Y2h5IGhlYXZ5IHNub3dcIixcclxuICAgICAgXCJIZWF2eSBzbm93XCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM3YTg3YWFcIixcclxuICB9LFxyXG4gIHsgY29uZGl0aW9uczogW1wiSWNlIHBlbGxldHNcIl0sIGNvbG91cjogXCIjNmY4MDlkXCIgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgcmFpblwiLFxyXG4gICAgICBcIk1vZGVyYXRlIHJhaW4gYXQgdGltZXNcIixcclxuICAgICAgXCJNb2RlcmF0ZSByYWluXCIsXHJcbiAgICAgIFwiSGVhdnkgcmFpbiBhdCB0aW1lc1wiLFxyXG4gICAgICBcIkhlYXZ5IHJhaW5cIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzU0NjE3NFwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIkxpZ2h0IHJhaW4gc2hvd2VyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgcmFpbiBzaG93ZXJcIixcclxuICAgICAgXCJUb3JyZW50aWFsIHJhaW4gc2hvd2VyXCIsXHJcbiAgICBdLFxyXG4gICAgY29sb3VyOiBcIiM1NDYxNzRcIixcclxuICB9LFxyXG4gIHtcclxuICAgIGNvbmRpdGlvbnM6IFtcclxuICAgICAgXCJMaWdodCBzbGVldCBzaG93ZXJzXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc2xlZXQgc2hvd2Vyc1wiLFxyXG4gICAgICBcIkxpZ2h0IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNub3cgc2hvd2Vyc1wiLFxyXG4gICAgXSxcclxuICAgIGNvbG91cjogXCIjN2E4N2FhXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBjb25kaXRpb25zOiBbXHJcbiAgICAgIFwiTGlnaHQgc2hvd2VycyBvZiBpY2UgcGVsbGV0c1wiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHNob3dlcnMgb2YgaWNlIHBlbGxldHNcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzdhODdhYVwiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgY29uZGl0aW9uczogW1xyXG4gICAgICBcIlBhdGNoeSBsaWdodCByYWluIHdpdGggdGh1bmRlclwiLFxyXG4gICAgICBcIk1vZGVyYXRlIG9yIGhlYXZ5IHJhaW4gd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiUGF0Y2h5IGxpZ2h0IHNub3cgd2l0aCB0aHVuZGVyXCIsXHJcbiAgICAgIFwiTW9kZXJhdGUgb3IgaGVhdnkgc25vdyB3aXRoIHRodW5kZXJcIixcclxuICAgIF0sXHJcbiAgICBjb2xvdXI6IFwiIzEyMTgyNFwiLFxyXG4gIH0sXHJcbl07XHJcblxyXG4vLyBDb2xvdXIgdGhlIHBhZ2UgYmFja2dyb3VuZCBiYXNlZCBvbiBjdXJyZW50IHdlYXRoZXIgY29uZGl0aW9uc1xyXG5mdW5jdGlvbiBjb2xvdXJCYWNrZ3JvdW5kKGNvbmRpdGlvbikge1xyXG4gIGNvbnN0IHBhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcclxuXHJcbiAgd2VhdGhlckNvbG9yTWFwcGluZy5mb3JFYWNoKCh3ZWF0aGVyR3JvdXApID0+IHtcclxuICAgIGlmICh3ZWF0aGVyR3JvdXAuY29uZGl0aW9ucy5pbmNsdWRlcyhjb25kaXRpb24pKSB7XHJcbiAgICAgIHBhZ2Uuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gd2VhdGhlckdyb3VwLmNvbG91cjtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuLy8gTWFyayB0aGUgY3VycmVudCB0aW1lIG9uIHRoZSBob3VybHkgZm9yZWNhc3QgY2FyZHNcclxuZnVuY3Rpb24gbWFya0N1cnJlbnRIb3VyKGN1cnJlbnRUaW1lKSB7XHJcbiAgY29uc29sZS5sb2coY3VycmVudFRpbWUpO1xyXG4gIGNvbnN0IGhvdXJseVRpbWVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3VybHktdGltZVwiKTtcclxuXHJcbiAgaG91cmx5VGltZXMuZm9yRWFjaCgodGltZSkgPT4ge1xyXG4gICAgY29uc29sZS5sb2codGltZS50ZXh0Q29udGVudCk7XHJcbiAgICBjb25zdCBob3VybHlDYXJkID0gdGltZS5wYXJlbnRFbGVtZW50O1xyXG4gICAgaWYgKHBhcnNlSW50KHRpbWUudGV4dENvbnRlbnQpID09PSBwYXJzZUludChjdXJyZW50VGltZSkpIHtcclxuICAgICAgaG91cmx5Q2FyZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudC1ob3VyXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaG91cmx5Q2FyZC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudC1ob3VyXCIpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBBZGQgcGVyc2lzdGVudCBpY29ucyB0byB0aGUgcGFnZVxyXG5mdW5jdGlvbiBhZGRJY29ucygpIHtcclxuICBjb25zdCBzdW5yaXNlSWNvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3VucmlzZS1pY29uXCIpO1xyXG4gIGNvbnN0IHN1bnNldEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN1bnNldC1pY29uXCIpO1xyXG4gIGNvbnN0IHJhaW5JY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucmFpbi1pY29uXCIpO1xyXG4gIGNvbnN0IHNub3dJY29ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc25vdy1pY29uXCIpO1xyXG5cclxuICBzdW5yaXNlSWNvbi5zcmMgPSBkYXlUaW1lO1xyXG4gIHN1bnNldEljb24uc3JjID0gbmlnaHRUaW1lO1xyXG4gIHJhaW5JY29ucy5mb3JFYWNoKChpY29uKSA9PiB7XHJcbiAgICBpY29uLnNyYyA9IHJhaW47XHJcbiAgfSk7XHJcbiAgc25vd0ljb25zLmZvckVhY2goKGljb24pID0+IHtcclxuICAgIGljb24uc3JjID0gc25vdztcclxuICB9KTtcclxufVxyXG5cclxuLy8gRmlsbCB0aGUgcGFnZSB3aXRoIHdlYXRoZXIgaW5mb3JtYXRpb25cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmlsbFBhZ2VEYXRhKGRhdGEsIHVuaXRzKSB7XHJcbiAgY29uc3Qgbm9uVW5pdFRleHREYXRhID0gW1xyXG4gICAgLy8gTG9jYXRpb24gZGV0YWlsc1xyXG4gICAgeyBzZWxlY3RvcjogXCIuY2l0eS1uYW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24ubmFtZS50b1VwcGVyQ2FzZSgpIH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5jb3VudHJ5LW5hbWVcIiwgZGF0YTogZGF0YS5sb2NhdGlvbi5jb3VudHJ5IH0sXHJcbiAgICB7IHNlbGVjdG9yOiBcIi5sb2NhbC10aW1lXCIsIGRhdGE6IGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVswXSB9LFxyXG4gICAgeyBzZWxlY3RvcjogXCIubG9jYWwtZGF0ZVwiLCBkYXRhOiBkYXRhLmxvY2F0aW9uLmxvY2FsdGltZS5zcGxpdChcIiBcIilbMV0gfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLnN1bnJpc2UtdGltZVwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmFzdHJvLnN1bnJpc2UsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuc3Vuc2V0LXRpbWVcIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5hc3Ryby5zdW5zZXQsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICAgIC8vIEN1cnJlbnQgd2VhdGhlciBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb25cIixcclxuICAgICAgZGF0YTogZGF0YS5jdXJyZW50LmNvbmRpdGlvbi50ZXh0LFxyXG4gICAgfSxcclxuICAgIHsgc2VsZWN0b3I6IFwiLmRldGFpbC11dlwiLCBkYXRhOiBkYXRhLmN1cnJlbnQudXYgfSxcclxuICAgIHsgc2VsZWN0b3I6IFwiLmRldGFpbC1odW1pZGl0eVwiLCBkYXRhOiBgJHtkYXRhLmN1cnJlbnQuaHVtaWRpdHl9JWAgfSxcclxuICAgIHsgc2VsZWN0b3I6IFwiLmRldGFpbC13aW5kLWRpcmVjdGlvblwiLCBkYXRhOiBkYXRhLmN1cnJlbnQud2luZF9kaXIgfSxcclxuICAgIC8vIFRocmVlIGRheSBmb3JlY2FzdCBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXJhaW4tY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmRhaWx5X2NoYW5jZV9vZl9yYWlufSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItc25vdy1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkuZGFpbHlfY2hhbmNlX29mX3Nub3d9JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1yYWluLWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5kYWlseV9jaGFuY2Vfb2ZfcmFpbn0lYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2hhbmNlcyA+IC5pY29uLXRleHQtcGFpciA+IC53ZWF0aGVyLXNub3ctY2hhbmNlXCIsXHJcbiAgICAgIGRhdGE6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5LmRhaWx5X2NoYW5jZV9vZl9zbm93fSVgLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jaGFuY2VzID4gLmljb24tdGV4dC1wYWlyID4gLndlYXRoZXItcmFpbi1jaGFuY2VcIixcclxuICAgICAgZGF0YTogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuZGFpbHlfY2hhbmNlX29mX3JhaW59JWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNoYW5jZXMgPiAuaWNvbi10ZXh0LXBhaXIgPiAud2VhdGhlci1zbm93LWNoYW5jZVwiLFxyXG4gICAgICBkYXRhOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5kYWlseV9jaGFuY2Vfb2Zfc25vd30lYCxcclxuICAgIH0sXHJcbiAgXTtcclxuXHJcbiAgY29uc3QgdW5pdFRleHREYXRhID0gW1xyXG4gICAgLy8gQ3VycmVudCBmb3JlY2FzdCBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5jdXJyZW50LXRlbXBcIixcclxuICAgICAgbWV0cmljOiBkYXRhLmN1cnJlbnQudGVtcF9jLFxyXG4gICAgICBpbXBlcmlhbDogZGF0YS5jdXJyZW50LnRlbXBfZixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kZXRhaWwtZmVlbHMtbGlrZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuY3VycmVudC5mZWVsc2xpa2VfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC5mZWVsc2xpa2VfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kZXRhaWwtcHJlY2lwaXRhdGlvblwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuY3VycmVudC5wcmVjaXBfbW19IG1tYCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuY3VycmVudC5wcmVjaXBfaW59IGluYCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kZXRhaWwtd2luZC1zcGVlZFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuY3VycmVudC53aW5kX2twaH0ga20vaGAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmN1cnJlbnQud2luZF9tcGh9IG1waGAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIubG93LWhpZ2gtdGVtcFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIC8vIFRocmVlIGRheSBmb3JlY2FzdCBkZXRhaWxzXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOlxyXG4gICAgICAgIFwiLmRheS0wLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtY2FyZC1kZXRhaWxzID4gLmZvcmVjYXN0LWxvdy1oaWdoXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5kYXkubWludGVtcF9jfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1heHRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5Lm1pbnRlbXBfZn1cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmRheS5tYXh0ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjpcclxuICAgICAgICBcIi5kYXktMS1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWNhcmQtZGV0YWlscyA+IC5mb3JlY2FzdC1sb3ctaGlnaFwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMV0uZGF5Lm1pbnRlbXBfY31cXHV7QjB9IC8gJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5tYXh0ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5taW50ZW1wX2Z9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsxXS5kYXkubWF4dGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6XHJcbiAgICAgICAgXCIuZGF5LTItZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1jYXJkLWRldGFpbHMgPiAuZm9yZWNhc3QtbG93LWhpZ2hcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzJdLmRheS5taW50ZW1wX2N9XFx1e0IwfSAvICR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWF4dGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkubWludGVtcF9mfVxcdXtCMH0gLyAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMl0uZGF5Lm1heHRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICAvLyBIb3VybHkgZm9yZWNhc3QgZGV0YWlsc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0wID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clswXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzFdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzJdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0zID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clszXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbM10udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzRdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTUgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzVdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls1XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci02ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls2XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNyA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbN10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzddLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTggPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzhdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls4XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci05ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls5XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbOV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTAgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEwXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTBdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTExID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMV0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzExXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMiA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTJdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMl0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTMgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEzXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTNdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE0ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE0XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTVdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTYgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE2XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTZdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE3ID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxN10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE3XS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOCA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMThdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxOF0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTkgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE5XS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTldLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIwID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMF0udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIwXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMSA+IC5ob3VybHktdGVtcGVyYXR1cmVcIixcclxuICAgICAgbWV0cmljOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjFdLnRlbXBfY31cXHV7QjB9YCxcclxuICAgICAgaW1wZXJpYWw6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMV0udGVtcF9mfVxcdXtCMH1gLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjIgPiAuaG91cmx5LXRlbXBlcmF0dXJlXCIsXHJcbiAgICAgIG1ldHJpYzogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIyXS50ZW1wX2N9XFx1e0IwfWAsXHJcbiAgICAgIGltcGVyaWFsOiBgJHtkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjJdLnRlbXBfZn1cXHV7QjB9YCxcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIzID4gLmhvdXJseS10ZW1wZXJhdHVyZVwiLFxyXG4gICAgICBtZXRyaWM6IGAke2RhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyM10udGVtcF9jfVxcdXtCMH1gLFxyXG4gICAgICBpbXBlcmlhbDogYCR7ZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIzXS50ZW1wX2Z9XFx1e0IwfWAsXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IGljb25EYXRhID0gW1xyXG4gICAgLy8gQ3VycmVudCB3ZWF0aGVyIGljb25cclxuICAgIHsgc2VsZWN0b3I6IFwiLndlYXRoZXItaWNvblwiLCBkYXRhOiBkYXRhLmN1cnJlbnQuY29uZGl0aW9uLmljb24gfSxcclxuICAgIC8vIFRocmVlIGRheSBmb3JlY2FzdCBpY29uc1xyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuZGF5LTAtZm9yZWNhc3QtY2FyZCA+IC5mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uZGF5LmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmRheS0xLWZvcmVjYXN0LWNhcmQgPiAuZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzFdLmRheS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5kYXktMi1mb3JlY2FzdC1jYXJkID4gLmZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVsyXS5kYXkuY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAgLy8gSG91cmx5IGZvcmVjYXN0IGljb25zXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTAgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzBdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTMgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzNdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbNF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci01ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls1XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTYgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzZdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItNyA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbN10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci04ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91cls4XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTkgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzldLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTAgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEwXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTExID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxMV0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xMiA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTJdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTMgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzEzXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE0ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxNF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xNSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMTVdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTYgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE2XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTE3ID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsxN10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0xOCA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMThdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMTkgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzE5XS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIwID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyMF0uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBzZWxlY3RvcjogXCIuaG91ci0yMSA+IC5ob3VybHktZm9yZWNhc3QtaWNvblwiLFxyXG4gICAgICBkYXRhOiBkYXRhLmZvcmVjYXN0LmZvcmVjYXN0ZGF5WzBdLmhvdXJbMjFdLmNvbmRpdGlvbi5pY29uLFxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgc2VsZWN0b3I6IFwiLmhvdXItMjIgPiAuaG91cmx5LWZvcmVjYXN0LWljb25cIixcclxuICAgICAgZGF0YTogZGF0YS5mb3JlY2FzdC5mb3JlY2FzdGRheVswXS5ob3VyWzIyXS5jb25kaXRpb24uaWNvbixcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIHNlbGVjdG9yOiBcIi5ob3VyLTIzID4gLmhvdXJseS1mb3JlY2FzdC1pY29uXCIsXHJcbiAgICAgIGRhdGE6IGRhdGEuZm9yZWNhc3QuZm9yZWNhc3RkYXlbMF0uaG91clsyM10uY29uZGl0aW9uLmljb24sXHJcbiAgICB9LFxyXG4gIF07XHJcblxyXG4gIC8vIEFkZCBkYXRhIHRvIHRoZSBwYWdlXHJcbiAgbm9uVW5pdFRleHREYXRhLmZvckVhY2goKGRhdGFFbGVtKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFFbGVtLnNlbGVjdG9yKS50ZXh0Q29udGVudCA9IGRhdGFFbGVtLmRhdGE7XHJcbiAgfSk7XHJcblxyXG4gIGlmICh1bml0cyA9PT0gXCJNZXRyaWNcIikge1xyXG4gICAgdW5pdFRleHREYXRhLmZvckVhY2goKGRhdGFFbGVtKSA9PiB7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZGF0YUVsZW0uc2VsZWN0b3IpLnRleHRDb250ZW50ID0gZGF0YUVsZW0ubWV0cmljO1xyXG4gICAgfSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHVuaXRUZXh0RGF0YS5mb3JFYWNoKChkYXRhRWxlbSkgPT4ge1xyXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGRhdGFFbGVtLnNlbGVjdG9yKS50ZXh0Q29udGVudCA9IGRhdGFFbGVtLmltcGVyaWFsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBpY29uRGF0YS5mb3JFYWNoKChpY29uRWxlbSkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihpY29uRWxlbS5zZWxlY3Rvcikuc3JjID0gaWNvbkVsZW0uZGF0YTtcclxuICB9KTtcclxuXHJcbiAgbWFya0N1cnJlbnRIb3VyKGRhdGEubG9jYXRpb24ubG9jYWx0aW1lLnNwbGl0KFwiIFwiKVsxXSk7XHJcbiAgYWRkSWNvbnMoKTtcclxuICBjb2xvdXJCYWNrZ3JvdW5kKGRhdGEuY3VycmVudC5jb25kaXRpb24udGV4dCk7XHJcbn1cclxuXHJcbi8vIGNvbnN0IGJhY2tncm91bmRDb2xvdXJzID0gW1xyXG4vLyAgIHsgY29kZXM6IFsxMDAwXSwgdmFsdWVzOiBbXCJTdW5ueVwiLCBcIkNsZWFyXCJdLCBjb2xvdXI6IFwiXCIgfSxcclxuLy8gICB7XHJcbi8vICAgICBjb2RlczogWzEwMDMsIDEwMDYsIDEwMDldLFxyXG4vLyAgICAgdmFsdWVzOiBbXCJQYXJ0bHkgQ2xvdWR5XCIsIFwiQ2xvdWR5XCIsIFwiT3ZlcmNhc3RcIl0sXHJcbi8vICAgICBjb2xvdXI6IFwiXCIsXHJcbi8vICAgfSxcclxuLy8gICB7IGNvZGVzOiBbMTAzMF0sIHZhbHVlczogW1wiTWlzdFwiXSwgY29sb3VyOiBcIlwiIH0sXHJcbi8vICAge1xyXG4vLyAgICAgY29kZXM6IFsxMDYzLCAxMDY2LCAxMDY5LCAxMDcyXSxcclxuLy8gICAgIHZhbHVlczogW1xyXG4vLyAgICAgICBcIlBhdGNoeSByYWluIHBvc3NpYmxlXCIsXHJcbi8vICAgICAgIFwiUGF0Y2h5IHNub3cgcG9zc2libGVcIixcclxuLy8gICAgICAgXCJQYXRjaHkgc2xlZXQgcG9zc2libGVcIixcclxuLy8gICAgICAgXCJQYXRjaHkgZnJlZXppbmcgZHJpenpsZSBwb3NzaWJsZVwiLFxyXG4vLyAgICAgXSxcclxuLy8gICAgIGNvbG91cjogXCJcIixcclxuLy8gICB9LFxyXG4vLyAgIHsgY29kZXM6IFsxMDg3XSwgdmFsdWVzOiBbXCJUaHVuZGVyeSBvdXRicmVha3MgcG9zc2libGVcIl0sIGNvbG91cjogXCJcIiB9LFxyXG4vLyAgIHsgY29kZXM6IFsxMTE0LCAxMTE3XSwgdmFsdWVzOiBbXCJCbG93aW5nIHNub3dcIiwgXCJCbGl6emFyZFwiXSwgY29sb3VyOiBcIlwiIH0sXHJcbi8vICAgeyBjb2RlczogWzExMzVdLCB2YWx1ZXM6IFtcIkZvZ1wiXSwgY29sb3VyOiBcIlwiIH0sXHJcbi8vICAge1xyXG4vLyAgICAgY29kZXM6IFsxMTQ3LCAxMTUwLCAxMTUzXSxcclxuLy8gICAgIHZhbHVlczogW1wiRnJlZXppbmcgZm9nXCIsIFwiUGF0Y2h5IGxpZ2h0IGRyaXp6bGVcIiwgXCJMaWdodCBkcml6emxlXCJdLFxyXG4vLyAgICAgY29sb3VyOiBcIlwiLFxyXG4vLyAgIH0sXHJcbi8vICAge1xyXG4vLyAgICAgY29kZXM6IFsxMTY4LCAxMTcxXSxcclxuLy8gICAgIHZhbHVlczogW1wiRnJlZXppbmcgZHJpenpsZVwiLCBcIkhlYXZ5IGZyZWV6aW5nIGRyaXp6bGVcIl0sXHJcbi8vICAgICBjb2xvdXI6IFwiXCIsXHJcbi8vICAgfSxcclxuLy8gXTtcclxuXHJcbi8vIGZ1bmN0aW9uIGFkZEdpZih1cmwpIHtcclxuLy8gICBjb25zdCBnaWYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdpZi1jb250YWluZXIgPiBpbWdcIik7XHJcbi8vICAgZ2lmLnNyYyA9IHVybDtcclxuLy8gfVxyXG4iLCJpbXBvcnQgZ2V0V2VhdGhlckRhdGEgZnJvbSBcIi4vYXBpQ2FsbHNcIjtcclxuaW1wb3J0IGZpbGxQYWdlRGF0YSBmcm9tIFwiLi9kb21NYW5pcHVsYXRpb25cIjtcclxuXHJcbi8vIEluZGljYXRlIGFuIGVycm9yIGluIHRoZSBzZWFyY2hcclxuZnVuY3Rpb24gZGlzcGxheVNlYXJjaEVycm9yKHNlYXJjaEJhciwgZXJyb3IpIHtcclxuICBjb25zdCBzZWFyY2hCYXJFcnJvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb24gKyAuZXJyb3ItbWVzc2FnZVwiKTtcclxuXHJcbiAgc2VhcmNoQmFyRXJyb3IudGV4dENvbnRlbnQgPSBlcnJvcjtcclxuICBzZWFyY2hCYXIuY2xhc3NMaXN0LmFkZChcImZpZWxkLWVycm9yXCIpO1xyXG59XHJcblxyXG4vLyBJbmRpY2F0ZSBubyBlcnJvciBpbiB0aGUgc2VhcmNoXHJcbmZ1bmN0aW9uIHJlbW92ZVNlYXJjaEVycm9yKHNlYXJjaEJhcikge1xyXG4gIHNlYXJjaEJhci5jbGFzc0xpc3QucmVtb3ZlKFwiZmllbGQtZXJyb3JcIik7XHJcbn1cclxuXHJcbi8vIFRyeSB0byBhZGQgZGF0YSB0byBwYWdlIGJhc2VkIG9uIHNlYXJjaGJhciByZXN1bHRcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYWRkU2VhcmNoQmFyRXZlbnRMaXN0ZW5lcigpIHtcclxuICBjb25zdCBzdWJtaXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uXCIpO1xyXG4gIGNvbnN0IHNlYXJjaEJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbG9jYXRpb25cIik7XHJcblxyXG4gIHN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmIChzZWFyY2hCYXIudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yID0gXCJQbGVhc2UgZW50ZXIgYSB2YWx1ZSFcIjtcclxuXHJcbiAgICAgIGRpc3BsYXlTZWFyY2hFcnJvcihzZWFyY2hCYXIsIGVycm9yKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHVuaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cInVuaXRzXCJdOmNoZWNrZWQnKS52YWx1ZTtcclxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGdldFdlYXRoZXJEYXRhKHNlYXJjaEJhci52YWx1ZSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgZGlzcGxheVNlYXJjaEVycm9yKHNlYXJjaEJhciwgZXJyb3IpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICByZW1vdmVTZWFyY2hFcnJvcihzZWFyY2hCYXIpO1xyXG4gICAgICBmaWxsUGFnZURhdGEoZGF0YSwgdW5pdHMpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGAvKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2VuZXJhbCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuKiB7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxufVxyXG5cclxuYm9keSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgd2lkdGg6IDEwMHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmV5O1xyXG5cclxuICAgIGNvbG9yOiB3aGl0ZTtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFNlYXJjaCBGb3JtIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuZm9ybSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcblxyXG4gICAgcGFkZGluZzogMXJlbSAycmVtO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xyXG59XHJcblxyXG4uZm9ybS1maWVsZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLnNlYXJjaGJhciB7XHJcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcclxuICAgIHBhZGRpbmc6IDhweDtcclxufVxyXG5cclxuLnVuaXQtb3B0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4uZmllbGQtZXJyb3Ige1xyXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC4wNDEpO1xyXG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJlZDtcclxufVxyXG5cclxuLmVycm9yLW1lc3NhZ2Uge1xyXG4gICAgY29sb3I6IHJnYigyNTIsIDYyLCA2Mik7XHJcbiAgICBmb250LXNpemU6IDAuOHJlbTtcclxufVxyXG5cclxuYnV0dG9uIHtcclxuICAgIHBhZGRpbmc6IDEwcHggMjBweDtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFdlYXRoZXIgSW5mb3JtYXRpb24gTGF5b3V0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLndlYXRoZXItY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxcmVtO1xyXG5cclxuICAgIHdpZHRoOiA4MHZ3O1xyXG4gICAgaGVpZ2h0OiAxMDB2aDtcclxuXHJcbiAgICBwYWRkaW5nOiAxcmVtO1xyXG5cclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxufVxyXG5cclxuLnJvdy0xIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgICBjb2x1bW4tZ2FwOiAxcmVtO1xyXG59XHJcblxyXG4ucm93LTMge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcclxuICAgIGNvbHVtbi1nYXA6IDFyZW07XHJcbn1cclxuXHJcbi5yb3ctMyB7XHJcblxyXG59XHJcblxyXG4uc3Vic2VjdGlvbi1oZWFkZXIge1xyXG4gICAgZm9udC1zaXplOiBsYXJnZTtcclxufVxyXG5cclxuLmxvY2F0aW9uLWRldGFpbHMsXHJcbi5zdW4taW5mbyxcclxuLndlYXRoZXItZGVzY3JpcHRpb24sXHJcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDFyZW07XHJcbn1cclxuXHJcbi8qXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKiBJY29uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLnJhaW4taWNvbixcclxuLnNub3ctaWNvbixcclxuLnN1bnJpc2UtaWNvbixcclxuLnN1bnNldC1pY29uIHtcclxuICAgIGhlaWdodDogMjBweDtcclxuICAgIHdpZHRoOiAyMHB4O1xyXG59XHJcblxyXG4uaWNvbi10ZXh0LXBhaXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLndlYXRoZXItaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDU4cHg7XHJcbiAgICB3aWR0aDogNThweDtcclxufVxyXG5cclxuLmZvcmVjYXN0LWljb24ge1xyXG4gICAgaGVpZ2h0OiA0NnB4O1xyXG4gICAgd2lkdGg6IDQ2cHg7XHJcbn1cclxuXHJcbi5ob3VybHktZm9yZWNhc3QtaWNvbiB7XHJcbiAgICBoZWlnaHQ6IDMwcHg7XHJcbiAgICB3aWR0aDogMzBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIExvY2F0aW9uIEluZm9ybWF0aW9uIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59XHJcblxyXG4uY2l0eS1uYW1lLFxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbn1cclxuXHJcbi5jaXR5LW5hbWUge1xyXG4gICAgZm9udC1zaXplOiA4MHB4O1xyXG59XHJcblxyXG4uY291bnRyeS1uYW1lIHtcclxuICAgIGZvbnQtc2l6ZTogNTBweDtcclxufVxyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIEN1cnJlbnQgV2VhdGhlciBJbmZvcm1hdGlvbiBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItY29udGFpbmVyIHtcclxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xyXG5cclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG59IFxyXG5cclxuLmN1cnJlbnQtdGVtcCB7XHJcbiAgICBmb250LXNpemU6IDgwcHg7XHJcbn1cclxuXHJcbi5jdXJyZW50LXdlYXRoZXItZGVzY3JpcHRpb24ge1xyXG4gICAgZm9udC1zaXplOiA1MHB4O1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogR2lmIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLypcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqIFRocmVlIERheSBGb3JlY2FzdCBTdHlsaW5nXHJcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG4gKi9cclxuXHJcbi50aHJlZS1kYXktZm9yZWNhc3QtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn0gXHJcblxyXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNhcmQtZ3JpZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcclxuICAgIGNvbHVtbi1nYXA6IDAuNXJlbTtcclxufVxyXG5cclxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciA1ZnIgMWZyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBwYWRkaW5nOiAwLjJyZW0gMXJlbTtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtdGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxufVxyXG5cclxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmcjtcclxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcclxuICAgIGdhcDogMC41cmVtO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogQ3VycmVudCBEZXRhaWxzIFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuLmN1cnJlbnQtZGV0YWlscy1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufSBcclxuXHJcbi5kZXRhaWwtY2FyZC1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcblxyXG59XHJcblxyXG4uZGV0YWlsLWNhcmQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG5cclxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xyXG59XHJcblxyXG4uZGV0YWlsLWNhcmQgPiBoNCB7XHJcbiAgICBmb250LXNpemU6IHNtYWxsO1xyXG59XHJcblxyXG4vKlxyXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICogSG91cmx5IEZvcmVjYXN0IFN0eWxpbmdcclxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAqL1xyXG5cclxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xyXG4gICAgZGlzcGxheTogZ3JpZDtcclxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XHJcbiAgICBnYXA6IDAuNXJlbTtcclxufSBcclxuXHJcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCg4LCAxZnIpO1xyXG4gICAgZ2FwOiAwLjVyZW07XHJcbn1cclxuXHJcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XHJcbiAgICBkaXNwbGF5OiBncmlkO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBhdXRvIDFmciBhdXRvO1xyXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuXHJcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcclxufVxyXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cclxuLmN1cnJlbnQtaG91ciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODApO1xyXG5cclxuICAgIGNvbG9yOiBibGFja1xyXG59XHJcblxyXG4uaG91cmx5LXRpbWUge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxufWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7OztFQUlFO0FBQ0Y7SUFDSSxzQkFBc0I7SUFDdEIsU0FBUztJQUNULFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1COztJQUVuQixZQUFZO0lBQ1osYUFBYTs7SUFFYixzQkFBc0I7O0lBRXRCLFlBQVk7QUFDaEI7O0FBRUE7Ozs7RUFJRTs7QUFFRjtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsbUJBQW1COztJQUVuQixrQkFBa0I7O0lBRWxCLG1CQUFtQjtJQUNuQiwyQ0FBMkM7QUFDL0M7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsdUNBQXVDO0lBQ3ZDLFFBQVE7SUFDUixXQUFXO0lBQ1gsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLHVCQUF1QjtJQUN2QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGlCQUFpQjtJQUNqQix3Q0FBd0M7SUFDeEMsc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGlCQUFpQjtBQUNyQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixlQUFlO0FBQ25COztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLFNBQVM7O0lBRVQsV0FBVztJQUNYLGFBQWE7O0lBRWIsYUFBYTs7SUFFYixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLDhCQUE4QjtJQUM5QixnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLGdCQUFnQjtBQUNwQjs7QUFFQTs7QUFFQTs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTs7OztJQUlJLGFBQWE7SUFDYixtQkFBbUI7SUFDbkIsU0FBUztBQUNiOztBQUVBOzs7O0VBSUU7O0FBRUY7Ozs7SUFJSSxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtJQUNiLG1CQUFtQjtJQUNuQiw4QkFBOEI7SUFDOUIsV0FBVztBQUNmOztBQUVBO0lBQ0ksWUFBWTtJQUNaLFdBQVc7QUFDZjs7QUFFQTtJQUNJLFlBQVk7SUFDWixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxZQUFZO0lBQ1osV0FBVztBQUNmOztBQUVBOzs7O0VBSUU7O0FBRUY7SUFDSSxvQkFBb0I7O0lBRXBCLDJDQUEyQztJQUMzQyxtQkFBbUI7QUFDdkI7O0FBRUE7O0lBRUksZ0JBQWdCO0FBQ3BCOztBQUVBO0lBQ0ksZUFBZTtBQUNuQjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7Ozs7RUFJRTs7QUFFRjtJQUNJLG9CQUFvQjs7SUFFcEIsMkNBQTJDO0lBQzNDLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGVBQWU7QUFDbkI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBOzs7O0VBSUU7O0FBRUY7Ozs7RUFJRTs7QUFFRjtJQUNJLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIsV0FBVztBQUNmOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHFDQUFxQztJQUNyQyxrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isa0NBQWtDO0lBQ2xDLG1CQUFtQjs7SUFFbkIsb0JBQW9COztJQUVwQixtQkFBbUI7SUFDbkIsMkNBQTJDO0FBQy9DOztBQUVBO0lBQ0ksa0JBQWtCO0lBQ2xCLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw0QkFBNEI7SUFDNUIscUJBQXFCO0lBQ3JCLFdBQVc7QUFDZjs7QUFFQTs7OztFQUlFOztBQUVGO0lBQ0ksYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7O0FBRWY7O0FBRUE7SUFDSSxhQUFhO0lBQ2Isc0JBQXNCO0lBQ3RCLG1CQUFtQjtJQUNuQix1QkFBdUI7O0lBRXZCLFlBQVk7O0lBRVosbUJBQW1CO0lBQ25CLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTs7OztFQUlFOztDQUVEO0lBQ0csYUFBYTtJQUNiLDRCQUE0QjtJQUM1QixXQUFXO0FBQ2Y7O0FBRUE7SUFDSSxhQUFhO0lBQ2IscUNBQXFDO0lBQ3JDLFdBQVc7QUFDZjs7QUFFQTtJQUNJLGFBQWE7SUFDYixpQ0FBaUM7SUFDakMscUJBQXFCO0lBQ3JCLG1CQUFtQjs7SUFFbkIsbUJBQW1CO0lBQ25CLDJDQUEyQztBQUMvQztBQUNBLHVCQUF1QjtBQUN2QjtJQUNJLDJDQUEyQzs7SUFFM0M7QUFDSjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIvKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEdlbmVyYWwgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcbioge1xcclxcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgICBtYXJnaW46IDA7XFxyXFxuICAgIHBhZGRpbmc6IDA7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICB3aWR0aDogMTAwdnc7XFxyXFxuICAgIGhlaWdodDogMTAwdmg7XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IGdyZXk7XFxyXFxuXFxyXFxuICAgIGNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBTZWFyY2ggRm9ybSBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuZm9ybSB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDFyZW0gMnJlbTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcm0tZmllbGQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gcmVwZWF0KDIsIDFmcik7XFxyXFxuICAgIGdhcDogOHB4O1xcclxcbiAgICB3aWR0aDogMTAwJTtcXHJcXG4gICAgaGVpZ2h0OiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uc2VhcmNoYmFyIHtcXHJcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxyXFxuICAgIHBhZGRpbmc6IDhweDtcXHJcXG59XFxyXFxuXFxyXFxuLnVuaXQtb3B0aW9uIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLmZpZWxkLWVycm9yIHtcXHJcXG4gICAgYm9yZGVyLWNvbG9yOiByZWQ7XFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAwLCAwLCAwLjA0MSk7XFxyXFxuICAgIG91dGxpbmU6IDFweCBzb2xpZCByZWQ7XFxyXFxufVxcclxcblxcclxcbi5lcnJvci1tZXNzYWdlIHtcXHJcXG4gICAgY29sb3I6IHJnYigyNTIsIDYyLCA2Mik7XFxyXFxuICAgIGZvbnQtc2l6ZTogMC44cmVtO1xcclxcbn1cXHJcXG5cXHJcXG5idXR0b24ge1xcclxcbiAgICBwYWRkaW5nOiAxMHB4IDIwcHg7XFxyXFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBXZWF0aGVyIEluZm9ybWF0aW9uIExheW91dCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLndlYXRoZXItY29udGFpbmVyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgZ2FwOiAxcmVtO1xcclxcblxcclxcbiAgICB3aWR0aDogODB2dztcXHJcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXHJcXG5cXHJcXG4gICAgcGFkZGluZzogMXJlbTtcXHJcXG5cXHJcXG4gICAgZm9udC1zaXplOiAyMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucm93LTEge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XFxyXFxuICAgIGNvbHVtbi1nYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi5yb3ctMyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDNmcjtcXHJcXG4gICAgY29sdW1uLWdhcDogMXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLnJvdy0zIHtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLnN1YnNlY3Rpb24taGVhZGVyIHtcXHJcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmxvY2F0aW9uLWRldGFpbHMsXFxyXFxuLnN1bi1pbmZvLFxcclxcbi53ZWF0aGVyLWRlc2NyaXB0aW9uLFxcclxcbi5wcmVjaXBpdGF0aW9uLWluZm8ge1xcclxcbiAgICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgICBnYXA6IDFyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogSWNvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLnJhaW4taWNvbixcXHJcXG4uc25vdy1pY29uLFxcclxcbi5zdW5yaXNlLWljb24sXFxyXFxuLnN1bnNldC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAyMHB4O1xcclxcbiAgICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmljb24tdGV4dC1wYWlyIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLndlYXRoZXItaWNvbiB7XFxyXFxuICAgIGhlaWdodDogNThweDtcXHJcXG4gICAgd2lkdGg6IDU4cHg7XFxyXFxufVxcclxcblxcclxcbi5mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiA0NnB4O1xcclxcbiAgICB3aWR0aDogNDZweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhvdXJseS1mb3JlY2FzdC1pY29uIHtcXHJcXG4gICAgaGVpZ2h0OiAzMHB4O1xcclxcbiAgICB3aWR0aDogMzBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBMb2NhdGlvbiBJbmZvcm1hdGlvbiBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuLmxvY2F0aW9uLWluZm8tY29udGFpbmVyIHtcXHJcXG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XFxyXFxuXFxyXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yMCk7XFxyXFxuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5jaXR5LW5hbWUsXFxyXFxuLmNvdW50cnktbmFtZSB7XFxyXFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5jaXR5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDgwcHg7XFxyXFxufVxcclxcblxcclxcbi5jb3VudHJ5LW5hbWUge1xcclxcbiAgICBmb250LXNpemU6IDUwcHg7XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBXZWF0aGVyIEluZm9ybWF0aW9uIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC13ZWF0aGVyLWNvbnRhaW5lciB7XFxyXFxuICAgIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xcclxcblxcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbn0gXFxyXFxuXFxyXFxuLmN1cnJlbnQtdGVtcCB7XFxyXFxuICAgIGZvbnQtc2l6ZTogODBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmN1cnJlbnQtd2VhdGhlci1kZXNjcmlwdGlvbiB7XFxyXFxuICAgIGZvbnQtc2l6ZTogNTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLypcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKiBHaWYgU3R5bGluZ1xcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqL1xcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogVGhyZWUgRGF5IEZvcmVjYXN0IFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4udGhyZWUtZGF5LWZvcmVjYXN0LWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLnRocmVlLWRheS1mb3JlY2FzdC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xcclxcbiAgICBjb2x1bW4tZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi50aHJlZS1kYXktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDVmciAxZnI7XFxyXFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIHBhZGRpbmc6IDAuMnJlbSAxcmVtO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9yZWNhc3QtY2FyZC10aXRsZSB7XFxyXFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXHJcXG4gICAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvcmVjYXN0LWNhcmQtZGV0YWlscyB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGp1c3RpZnktaXRlbXM6IGNlbnRlcjtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi8qXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICogQ3VycmVudCBEZXRhaWxzIFN0eWxpbmdcXHJcXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cXHJcXG4gKi9cXHJcXG5cXHJcXG4uY3VycmVudC1kZXRhaWxzLWNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnI7XFxyXFxuICAgIGdhcDogMC41cmVtO1xcclxcbn0gXFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkLWdyaWQge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkOiByZXBlYXQoMywgMWZyKSAvIHJlcGVhdCgyLCAxZnIpO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG5cXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkIHtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXHJcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxuXFxyXFxuICAgIGhlaWdodDogMTAwJTtcXHJcXG5cXHJcXG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmRldGFpbC1jYXJkID4gaDQge1xcclxcbiAgICBmb250LXNpemU6IHNtYWxsO1xcclxcbn1cXHJcXG5cXHJcXG4vKlxcclxcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxcclxcbiAqIEhvdXJseSBGb3JlY2FzdCBTdHlsaW5nXFxyXFxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXFxyXFxuICovXFxyXFxuXFxyXFxuIC5ob3VybHktZm9yZWNhc3QtaW5mby1jb250YWluZXIge1xcclxcbiAgICBkaXNwbGF5OiBncmlkO1xcclxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IGF1dG8gMWZyO1xcclxcbiAgICBnYXA6IDAuNXJlbTtcXHJcXG59IFxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZC1ncmlkIHtcXHJcXG4gICAgZGlzcGxheTogZ3JpZDtcXHJcXG4gICAgZ3JpZDogcmVwZWF0KDMsIDFmcikgLyByZXBlYXQoOCwgMWZyKTtcXHJcXG4gICAgZ2FwOiAwLjVyZW07XFxyXFxufVxcclxcblxcclxcbi5ob3VybHktZm9yZWNhc3QtY2FyZCB7XFxyXFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxyXFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogYXV0byAxZnIgYXV0bztcXHJcXG4gICAganVzdGlmeS1pdGVtczogY2VudGVyO1xcclxcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcblxcclxcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xcclxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjApO1xcclxcbn1cXHJcXG4vKiBNYXJrcyBjdXJyZW50IGhvdXIgKi9cXHJcXG4uY3VycmVudC1ob3VyIHtcXHJcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgwKTtcXHJcXG5cXHJcXG4gICAgY29sb3I6IGJsYWNrXFxyXFxufVxcclxcblxcclxcbi5ob3VybHktdGltZSB7XFxyXFxuICAgIGZvbnQtc2l6ZTogc21hbGw7XFxyXFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTtcblxuICAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTtcblxuICAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBhZGRTZWFyY2hCYXJFdmVudExpc3RlbmVyIGZyb20gXCIuL2V2ZW50TGlzdGVuZXJzXCI7XHJcbmltcG9ydCBcIi4vc3R5bGUuY3NzXCI7XHJcblxyXG5hZGRTZWFyY2hCYXJFdmVudExpc3RlbmVyKCk7XHJcbiJdLCJuYW1lcyI6WyJnZXRXZWF0aGVyRGF0YSIsImxvY2F0aW9uIiwid2VhdGhlckFwaUtleSIsInJlc3BvbnNlIiwiZmV0Y2giLCJzdGF0dXMiLCJQcm9taXNlIiwicmVqZWN0IiwianNvbiIsImVycm9yIiwiZGF5VGltZSIsIm5pZ2h0VGltZSIsInJhaW4iLCJzbm93Iiwid2VhdGhlckNvbG9yTWFwcGluZyIsImNvbmRpdGlvbnMiLCJjb2xvdXIiLCJjb2xvdXJCYWNrZ3JvdW5kIiwiY29uZGl0aW9uIiwicGFnZSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvckVhY2giLCJ3ZWF0aGVyR3JvdXAiLCJpbmNsdWRlcyIsInN0eWxlIiwiYmFja2dyb3VuZENvbG9yIiwibWFya0N1cnJlbnRIb3VyIiwiY3VycmVudFRpbWUiLCJjb25zb2xlIiwibG9nIiwiaG91cmx5VGltZXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGltZSIsInRleHRDb250ZW50IiwiaG91cmx5Q2FyZCIsInBhcmVudEVsZW1lbnQiLCJwYXJzZUludCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImFkZEljb25zIiwic3VucmlzZUljb24iLCJzdW5zZXRJY29uIiwicmFpbkljb25zIiwic25vd0ljb25zIiwic3JjIiwiaWNvbiIsImZpbGxQYWdlRGF0YSIsImRhdGEiLCJ1bml0cyIsIm5vblVuaXRUZXh0RGF0YSIsInNlbGVjdG9yIiwibmFtZSIsInRvVXBwZXJDYXNlIiwiY291bnRyeSIsImxvY2FsdGltZSIsInNwbGl0IiwiZm9yZWNhc3QiLCJmb3JlY2FzdGRheSIsImFzdHJvIiwic3VucmlzZSIsInN1bnNldCIsImRheSIsImRhaWx5X2NoYW5jZV9vZl9yYWluIiwiZGFpbHlfY2hhbmNlX29mX3Nub3ciLCJjdXJyZW50IiwidGV4dCIsInV2IiwiaHVtaWRpdHkiLCJ3aW5kX2RpciIsInVuaXRUZXh0RGF0YSIsIm1ldHJpYyIsInRlbXBfYyIsImltcGVyaWFsIiwidGVtcF9mIiwiZmVlbHNsaWtlX2MiLCJmZWVsc2xpa2VfZiIsInByZWNpcF9tbSIsInByZWNpcF9pbiIsIndpbmRfa3BoIiwid2luZF9tcGgiLCJtaW50ZW1wX2MiLCJtYXh0ZW1wX2MiLCJtaW50ZW1wX2YiLCJtYXh0ZW1wX2YiLCJob3VyIiwiaWNvbkRhdGEiLCJkYXRhRWxlbSIsImljb25FbGVtIiwiZGlzcGxheVNlYXJjaEVycm9yIiwic2VhcmNoQmFyIiwic2VhcmNoQmFyRXJyb3IiLCJyZW1vdmVTZWFyY2hFcnJvciIsImFkZFNlYXJjaEJhckV2ZW50TGlzdGVuZXIiLCJzdWJtaXRCdG4iLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidmFsaWRpdHkiLCJ2YWx1ZU1pc3NpbmciLCJ2YWx1ZSIsImNhdGNoIl0sInNvdXJjZVJvb3QiOiIifQ==