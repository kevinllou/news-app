import { fecthNews, renderNews } from "./helpers.js";
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

/* ------------------------------------------------------------- */
/*          RENDERING CARDS BY WHEN DOCUMENT IS LOADEAD         */
/* ------------------------------------------------------------- */
let newContainer = document.querySelector(".newsContainer");
const [{ results: newsData }, newsError] = await fecthNews();

console.log(newsData);
if (!newsError) {
  renderNews(newsData, newContainer);
} else {
  let paragraph = document.createElement("p");
  newContainer.appendChild(paragraph);
  paragraph.innerText = "There is no data available.....";
  paragraph.style.textAlign = "center";
  paragraph.style.fontWeight = "700";
}

