function fillLocationInfo(locationData) {
  const cityName = document.querySelector(".city-name");
  const countryName = document.querySelector(".country-name");
  const localTime = document.querySelector(".local-time");
  const localDate = document.querySelector(".local-date");

  cityName.textContent = locationData.name.toUpperCase();
  countryName.textContent = locationData.country;
  [localDate.textContent, localTime.textContent] =
    locationData.localtime.split(" ");
}

function fillCurrentWeatherInfo(currentData) {
  //   fillWeatherDetails(jsonData);
}

function fill3DayForecast(daysForecastData) {}

function fillWeatherDetails(detailsData) {}

function fillHourlyForecast(hourlyForecastData) {}

export {
  fillLocationInfo,
  fillCurrentWeatherInfo,
  fill3DayForecast,
  fillHourlyForecast,
};
