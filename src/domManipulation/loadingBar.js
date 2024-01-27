// Set up loading bar
function intialiseLoadingBar() {
  modal = document.querySelector(".modal");
}

// Show the loading bar on the screen
function renderLoadingBar() {
  modal.style.display = "flex";
}

// Remove the loading bar on the screen
function hideLoadingBar() {
  modal.style.display = "none";
}

// Move the loading bar through a step in the loading animation
function moveLoadingBar() {
  const LoadingBar = document.querySelector(".loading-bar");
  const lastSquare = LoadingBar.firstElementChild;

  LoadingBar.appendChild(lastSquare);
  console.log(LoadingBar);
  console.log("loading");
}

let modal = null;

export {
  intialiseLoadingBar,
  renderLoadingBar,
  hideLoadingBar,
  moveLoadingBar,
};
