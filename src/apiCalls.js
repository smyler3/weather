import { displaySearchError } from "./domManipulation/errorMessages";
import {
  hideLoadingBar,
  moveLoadingBar,
  renderLoadingBar,
} from "./domManipulation/loadingBar";

// Try to recieve data from the weatherapi server
export default async function getWeatherData(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";

  // Start loading bar animation
  renderLoadingBar();
  const loadingBarInterval = setInterval(moveLoadingBar, 100);

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`,
    );
    console.log(response);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not found!");
    }

    // Slow down data collection to show off loading bar XD
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return response.json();
  } catch (error) {
    const searchBar = document.querySelector("#location");
    const searchBarError = document.querySelector("#location + .error-message");

    console.error("Error in weatherapi fetch:", error);
    displaySearchError(searchBar, searchBarError, error);
  } finally {
    // Remove loading bar animation
    hideLoadingBar();
    clearInterval(loadingBarInterval);
  }
}
