export default function addImperialData(data, units) {
  const nonUnitTextData = [
    // Location details
    { selector: ".city-name", data: data.location.name.toUpperCase() },
    { selector: ".country-name", data: data.location.country },
    { selector: ".local-time", data: data.location.localtime.split(" ")[0] },
    { selector: ".local-date", data: data.location.localtime.split(" ")[1] },
    {
      selector: ".sunrise-time",
      data: data.forecast.forecastday[0].astro.sunrise,
    },
    {
      selector: ".sunset-time",
      data: data.forecast.forecastday[0].astro.sunset,
    },
    {
      selector: ".weather-rain-chance",
      data: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`,
    },
    {
      selector: ".weather-snow-chance",
      data: `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`,
    },
    // Current weather details
    {
      selector: ".current-weather-description",
      data: data.current.condition.text,
    },
    { selector: ".detail-uv", data: data.current.uv },
    { selector: ".detail-humidity", data: `${data.current.humidity}%` },
    { selector: ".detail-wind-direction", data: data.current.wind_dir },
    // Three day forecast details
    {
      selector:
        ".day-0-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
      data: `${data.forecast.forecastday[0].day.daily_chance_of_rain}%`,
    },
    {
      selector:
        ".day-0-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
      data: `${data.forecast.forecastday[0].day.daily_chance_of_snow}%`,
    },
    {
      selector:
        ".day-1-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
      data: `${data.forecast.forecastday[1].day.daily_chance_of_rain}%`,
    },
    {
      selector:
        ".day-1-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
      data: `${data.forecast.forecastday[1].day.daily_chance_of_snow}%`,
    },
    {
      selector:
        ".day-2-forecast-card > .forecast-chances > .icon-text-pair > .weather-rain-chance",
      data: `${data.forecast.forecastday[2].day.daily_chance_of_rain}%`,
    },
    {
      selector:
        ".day-2-forecast-card > .forecast-chances > .icon-text-pair > .weather-snow-chance",
      data: `${data.forecast.forecastday[2].day.daily_chance_of_snow}%`,
    },
  ];

  const unitTextData = [
    // Current forecast details
    {
      selector: ".current-temp",
      metric: data.current.temp_c,
      imperial: data.current.temp_f,
    },
    {
      selector: ".detail-feels-like",
      metric: `${data.current.feelslike_c}\u{B0}`,
      imperial: `${data.current.feelslike_f}\u{B0}`,
    },
    {
      selector: ".detail-precipitation",
      metric: `${data.current.precip_mm} mm`,
      imperial: `${data.current.precip_in} in`,
    },
    {
      selector: ".detail-wind-speed",
      metric: `${data.current.wind_kph} km/h`,
      imperial: `${data.current.wind_mph} mph`,
    },
    {
      selector: ".low-high-temp",
      metric: `${data.forecast.forecastday[0].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_f}\u{B0}`,
    },
    // Three day forecast details
    {
      selector:
        ".day-0-forecast-card > .forecast-card-details > .forecast-low-high",
      metric: `${data.forecast.forecastday[0].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[0].day.maxtemp_f}\u{B0}`,
    },
    {
      selector:
        ".day-1-forecast-card > .forecast-card-details > .forecast-low-high",
      metric: `${data.forecast.forecastday[1].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[1].day.maxtemp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[1].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[1].day.maxtemp_f}\u{B0}`,
    },
    {
      selector:
        ".day-2-forecast-card > .forecast-card-details > .forecast-low-high",
      metric: `${data.forecast.forecastday[2].day.mintemp_c}\u{B0} / ${data.forecast.forecastday[2].day.maxtemp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[2].day.mintemp_f}\u{B0} / ${data.forecast.forecastday[2].day.maxtemp_f}\u{B0}`,
    },
    // Hourly forecast details
    {
      selector: ".hour-0 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[0].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[0].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-1 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[1].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[1].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-2 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[2].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[2].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-3 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[3].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[3].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-4 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[4].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[4].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-5 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[5].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[5].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-6 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[6].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[6].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-7 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[7].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[7].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-8 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[8].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[8].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-9 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[9].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[9].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-10 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[10].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[10].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-11 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[11].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[11].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-12 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[12].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[12].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-13 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[13].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[13].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-14 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[14].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[14].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-15 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[15].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[15].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-16 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[16].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[16].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-17 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[17].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[17].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-18 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[18].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[18].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-19 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[19].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[19].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-20 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[20].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[20].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-21 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[21].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[21].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-22 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[22].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[22].temp_f}\u{B0}`,
    },
    {
      selector: ".hour-23 > .hourly-temperature",
      metric: `${data.forecast.forecastday[0].hour[23].temp_c}\u{B0}`,
      imperial: `${data.forecast.forecastday[0].hour[23].temp_f}\u{B0}`,
    },
  ];

  const iconData = [
    // Current weather icon
    { selector: ".weather-icon", data: data.current.condition.icon },
    // Three day forecast icons
    {
      selector: ".day-0-forecast-card > .forecast-icon",
      data: data.forecast.forecastday[0].day.condition.icon,
    },
    {
      selector: ".day-1-forecast-card > .forecast-icon",
      data: data.forecast.forecastday[1].day.condition.icon,
    },
    {
      selector: ".day-2-forecast-card > .forecast-icon",
      data: data.forecast.forecastday[2].day.condition.icon,
    },
    // Hourly forecast icons
    {
      selector: ".hour-0 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[0].condition.icon,
    },
    {
      selector: ".hour-1 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[1].condition.icon,
    },
    {
      selector: ".hour-2 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[2].condition.icon,
    },
    {
      selector: ".hour-3 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[3].condition.icon,
    },
    {
      selector: ".hour-4 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[4].condition.icon,
    },
    {
      selector: ".hour-5 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[5].condition.icon,
    },
    {
      selector: ".hour-6 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[6].condition.icon,
    },
    {
      selector: ".hour-7 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[7].condition.icon,
    },
    {
      selector: ".hour-8 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[8].condition.icon,
    },
    {
      selector: ".hour-9 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[9].condition.icon,
    },
    {
      selector: ".hour-10 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[10].condition.icon,
    },
    {
      selector: ".hour-11 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[11].condition.icon,
    },
    {
      selector: ".hour-12 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[12].condition.icon,
    },
    {
      selector: ".hour-13 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[13].condition.icon,
    },
    {
      selector: ".hour-14 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[14].condition.icon,
    },
    {
      selector: ".hour-15 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[15].condition.icon,
    },
    {
      selector: ".hour-16 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[16].condition.icon,
    },
    {
      selector: ".hour-17 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[17].condition.icon,
    },
    {
      selector: ".hour-18 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[18].condition.icon,
    },
    {
      selector: ".hour-19 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[19].condition.icon,
    },
    {
      selector: ".hour-20 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[20].condition.icon,
    },
    {
      selector: ".hour-21 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[21].condition.icon,
    },
    {
      selector: ".hour-22 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[22].condition.icon,
    },
    {
      selector: ".hour-23 > .hourly-forecast-icon",
      data: data.forecast.forecastday[0].hour[23].condition.icon,
    },
  ];

  // Add data to the page
  nonUnitTextData.forEach((dataElem) => {
    document.querySelector(dataElem.selector).textContent = dataElem.data;
  });

  if (units === "Metric") {
    unitTextData.forEach((dataElem) => {
      document.querySelector(dataElem.selector).textContent = dataElem.metric;
    });
  } else {
    unitTextData.forEach((dataElem) => {
      document.querySelector(dataElem.selector).textContent = dataElem.imperial;
    });
  }

  iconData.forEach((iconElem) => {
    document.querySelector(iconElem.selector).src = iconElem.data;
  });
}
