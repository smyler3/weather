import {
  fillLocationInfo,
  fillCurrentWeatherInfo,
  fill3DayForecast,
  fillHourlyForecast,
  addGif,
} from "./domManipulation";

async function getLocationWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`,
    );

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

export { getLocationWeatherData };
