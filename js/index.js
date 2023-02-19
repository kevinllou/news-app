import { fecthNews } from "./helpers.js";
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
let newContainer = document.querySelector(".newsContainer");
const [{ results: newsData }, newsError] = await fecthNews();
console.log(newsData);

/*  RENDER CARDS NEWS */
newContainer.innerHTML = newsData
  ? newsData.map(
        (newElement) => `     
<article class="newsContainer__card">
  <a target="_blank" href=${newElement.webUrl}>
     <figure class="newsContainer__cardImage">
     <img src=${
    newElement.fields.thumbnail || "https://via.placeholder.com/500x300.png"
     } alt=${newElement.sectionName}>
     </figure>
     </a>
<div class="newsContainer__cardContet">
  <span class="newsContainer__sectionName">${newElement.sectionName}</span>
  <a class="newsContainer__cardTitle" target="_blank" href=${newElement.webUrl}>${newElement.webTitle}</a>
  <p class="newsContainer__cardAdditionalInfo">${new Date(
    newElement.fields.lastModified
  ).toLocaleDateString()}</p>
  <p class="newsContainer__cardAdditionalInfo">By ${
    newElement.fields.byline || "Unkown"
  }</p>
  </div>
 </article>
`
      )
      .join("")
  : `<h1>${newsError}</h1>`;
