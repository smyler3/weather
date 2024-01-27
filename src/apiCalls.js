import {
  hideLoadingBar,
  moveLoadingBar,
  renderLoadingBar,
} from "./domManipulation/loadingBar";

// Query to the weatherapi server
async function queryWeatherApi(location) {
  const weatherApiKey = "ed56e1bd01c548178dd145408242201";

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=3`,
  );

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
export default async function getWeatherData(location) {
  // Start loading bar animation
  renderLoadingBar();
  const loadingBarInterval = setInterval(moveLoadingBar, 100);

  try {
    const response = await Promise.race([
      queryWeatherApi(location),
      timeoutPromise(),
    ]);

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
    hideLoadingBar();
    clearInterval(loadingBarInterval);
  }
}
