/* Button for dropdown container */
const btnDrowpDown = document.querySelector(".header__burguerIcon");
const dropdownContainer = document.querySelector(
  ".header__filterOptionsContainer"
);

btnDrowpDown.addEventListener("click", (event) => {
  const iconOpen = document.querySelector(".header__burguerIcon > i");
  if (iconOpen.className.includes("fa-bars")) {
    iconOpen.classList.remove("fa-bars");
    iconOpen.classList.add("fa-xmark");
    dropdownContainer.style.display = "flex";
  } else {
    iconOpen.classList.remove("fa-xmark");
    iconOpen.classList.add("fa-bars");
    dropdownContainer.style.display = "none";
  }
});
