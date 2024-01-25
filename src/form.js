import addImperialData from "../imperial";
import { getLocationWeatherData } from "./data";

// Indicate an error in the search
function displaySearchError(searchBar, error) {
  const searchBarError = document.querySelector("#location + .error-message");

  searchBarError.textContent = error;
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError(searchBar) {
  searchBar.classList.remove("field-error");
}

export default function initialiseSearchBar() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";

      displaySearchError(searchBar, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      const data = await getLocationWeatherData(searchBar.value).catch(
        (error) => {
          displaySearchError(searchBar, error);
        },
      );

      console.log(data);
      removeSearchError(searchBar);
      addImperialData(data, units);
    }
  });
}
