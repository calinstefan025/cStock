const details = document.getElementById("dt1");
const popUp = document.getElementById("popup");

details.addEventListener("mouseover", () => {
  openPopUp();
});

details.addEventListener("mouseleave", () => {
  closePopUp();
});

function openPopUp() {
  popUp.classList.add("active");
}

function closePopUp() {
  popUp.classList.remove("active");
}
