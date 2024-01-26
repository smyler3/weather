// Indicate an error in the search
function displaySearchError(searchBar, searchBarError, error) {
  searchBarError.textContent = error;
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.2)";
  searchBar.style.backgroundColor = "#ffc0cb";
  searchBar.classList.add("field-error");
}

// Indicate no error in the search
function removeSearchError(searchBar, searchBarError) {
  searchBarError.textContent = "";
  searchBarError.style.backgroundColor = "rgba(0, 0, 0, 0.0)";
  searchBarError.style.outlineColor = "rgba(0, 0, 0, 0.0)";
  searchBar.style.backgroundColor = "#ffffff";
  searchBar.classList.remove("field-error");
}

export { displaySearchError, removeSearchError };
