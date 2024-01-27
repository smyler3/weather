import getWeatherData from "./apiCalls";
import { intialiseLoadingBar } from "./domManipulation/loadingBar";
import fillPageData from "./domManipulation/renderPageInfo";
import addSearchBarEventListener from "./eventListeners";
import "./style.css";

intialiseLoadingBar();

getWeatherData("Odenville")
  .then((data) => {
    console.log(data);
    fillPageData(data, "metric");
  })
  .catch((error) => {
    console.error("Error in inital page load:", error);
  });

addSearchBarEventListener();
