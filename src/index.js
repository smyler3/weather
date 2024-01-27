import getWeatherData from "./apiCalls";
import { initialiseSearchErrors } from "./domManipulation/errorMessages";
import { intialiseLoadingBar } from "./domManipulation/loadingBar";
import fillPageData from "./domManipulation/renderPageInfo";
import addSearchBarEventListener from "./eventListeners";
import "./style.css";

intialiseLoadingBar();

// Initialise search bar
initialiseSearchErrors();
addSearchBarEventListener();

// Initial data call
getWeatherData("Odenville")
  .then((data) => {
    fillPageData(data, "metric");
  })
  .catch((error) => {
    console.error("Error in inital page load:", error);
  });
