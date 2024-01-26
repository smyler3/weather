import { displaySearchError } from "./errorMessages";

export default async function getWeatherData(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`,
    );

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
    displaySearchError(searchBar, searchBarError, error);
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
