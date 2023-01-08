const body = document.querySelector("body");
const toggleBtn = document.querySelector(".dashboard__toggle-btn");

// Set Theme in Local Storage to check if it True or False
function localStore(value) {
  localStorage.setItem("lightMode", value);
}

// Local Storage Load
function localStorageLoad() {
  const lightMode = localStorage.getItem("lightMode");

  if (!lightMode) {
    localStore(false);
  } else if (lightMode === "true") {
    body.classList.add("lightMode");
  }
}

localStorageLoad();

toggleBtn.addEventListener("click", () => {
  body.classList.toggle("lightMode");
  // Checking If it True or False
  localStore(body.classList.contains("lightMode"));
});
