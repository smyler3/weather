import { getLocationWeatherData } from "./data";

export default function initialiseSearchBar() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  const searchBarError = document.querySelector("#location + .error-message");

  function displaySearchError(error) {
    searchBarError.textContent = error;
    searchBar.classList.add("field-error");
  }

  function removeSearchError() {
    searchBar.classList.remove("field-error");
  }

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Data is valid
    if (searchBar.validity.valueMissing) {
      // Display an error
      const error = "Please enter a value!";
      displaySearchError(error);
    } else {
      removeSearchError();
      getLocationWeatherData(searchBar.value).catch((error) => {
        displaySearchError(error);
      });
    }
  });
}
