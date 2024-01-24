import {
  fillLocationInfo,
  fillCurrentWeatherInfo,
  fill3DayForecast,
  fillHourlyForecast,
} from "./domManipulation";

async function getLocationWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`,
    );

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
  fillLocationInfo(data.location);
  fillCurrentWeatherInfo(data.current);
  fill3DayForecast(data.forecast.forecastday);
  fillHourlyForecast(data.forecast.forecastday[0]);
}

const apiKey = "ed56e1bd01c548178dd145408242201";

export { getLocationWeatherData };
