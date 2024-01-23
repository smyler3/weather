import { getLocationWeatherData } from "./data";
import "./style.css";

const submitBtn = document.querySelector("button");
const searchBar = document.querySelector("#location");
const searchBarError = document.querySelector("#location + .error-message");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (searchBar.validity.valueMissing) {
    searchBarError.textContent = "Please enter a value!";
    searchBar.classList.add("field-error");
  } else {
    getLocationWeatherData(searchBar.value); // Add await?
  }
});
