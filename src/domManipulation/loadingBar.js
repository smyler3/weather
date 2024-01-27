function renderLoadbar() {
  modal.style.display = "flex";
}

function hideLoadbar() {
  modal.style.display = "none";
}

function moveLoadBar() {
  const loadBar = document.querySelector(".loading-bar");
  const lastSquare = loadBar.firstElementChild;

  loadBar.appendChild(lastSquare);
  console.log(loadBar);
  console.log("loading");
}

const modal = document.querySelector(".modal");

export { renderLoadbar, hideLoadbar, moveLoadBar };
