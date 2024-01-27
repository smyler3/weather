function initialiseSearchErrors() {
  searchBar = document.querySelector("#location");
  searchBarError = document.querySelector("#location + .error-message");
}

// Indicate an error in the search
function displaySearchError(error) {
  searchBarError.textContent = error;
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.2)";
  searchBar.style.backgroundColor = "#ffc0cb";
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError() {
  searchBarError.textContent = "";
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.0)";
  searchBar.style.backgroundColor = "#ffffff";
  searchBar.classList.remove("field-error");
}

let searchBar = null;
let searchBarError = null;

export { initialiseSearchErrors, displaySearchError, removeSearchError };
