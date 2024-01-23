async function getLocationWeatherData(location) {
  const data = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`,
  );
  console.log(data);
  extractWeatherData(data);
}

async function extractWeatherData(data) {
  const jsonData = await data.json();
  console.log(jsonData);
}

const apiKey = "ed56e1bd01c548178dd145408242201";

export { getLocationWeatherData };
