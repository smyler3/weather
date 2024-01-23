async function getLocationWeatherData(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
    );

    console.log(response);

    // Invalid location
    if (response.status === 400) {
      return Promise.reject("Location not recognised!");
    }

    extractWeatherData(response);
  } catch (error) {
    return Promise.reject(error);
  }
}

async function extractWeatherData(data) {
  const jsonData = await data.json();
  console.log(jsonData);
}

const apiKey = "ed56e1bd01c548178dd145408242201";

export { getLocationWeatherData };
