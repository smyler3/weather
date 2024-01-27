import getWeatherData from "./apiCalls";
import fillPageData from "./domManipulation/renderPageInfo";
import {
  displaySearchError,
  removeSearchError,
} from "./domManipulation/errorMessages";

// Query weatherapi based on searchbar input location
export default function addSearchBarEventListener() {
  const submitBtn = document.querySelector("button");
  const searchBar = document.querySelector("#location");
  const searchBarError = document.querySelector("#location + .error-message");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (searchBar.validity.valueMissing) {
      const error = "Please enter a value!";

      displaySearchError(searchBar, searchBarError, error);
    } else {
      const units = document.querySelector('input[name="units"]:checked').value;
      getWeatherData(searchBar.value)
        .then((data) => {
          console.log(data);
          removeSearchError(searchBar, searchBarError);
          fillPageData(data, units);
        })
        .catch((error) => {
          console.error("Error in getWeatherData:", error);
          displaySearchError(searchBar, searchBarError, error);
        });
    }
  });
}
