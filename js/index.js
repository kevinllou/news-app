import {
  fecthNews,
  fetchSingleNew,
  renderNews,
  useDebounce,
} from "./helpers.js";
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
const languageSelect = document.querySelector("#language");
const numberOfNews = document.querySelector("#numberOfNews");
const [{ results: newsData }, newsError] = await fecthNews();


if (!newsError) {
  renderNews(newsData, newContainer);
} else {
  let paragraph = document.createElement("p");
  newContainer.appendChild(paragraph);
  paragraph.innerText = "There is no data available.....";
  paragraph.style.textAlign = "center";
  paragraph.style.fontWeight = "700";
}

const searchInput = document.querySelector("#search");
const listOfSuggestions = document.querySelector(".header__listOptions");

searchInput.addEventListener(
  "input",
  useDebounce(async (event) => {
    if (event.target.value.length > 0) {
      const [{ results: filterNews }, filterError] = await fecthNews(
        event.target.value, numberOfNews.value, languageSelect.value
      );
      if (!filterError) {
        listOfSuggestions.style.display = "block";
        listOfSuggestions.innerHTML = filterNews
          .map(
            (element) => `
                <li data-id-search = ${element.id}>${element.webTitle}</li>
            `).join("");
        const lists = document.querySelectorAll("li");
        lists.forEach((list) =>
          list.addEventListener("click", async (event) => {
            console.log("click");
            const [{ content, relatedContent }, listDataError] =
              await fetchSingleNew(event.target.dataset.idSearch);
            const singleNewArray = [content, ...relatedContent];
            newContainer.innerHTML = "";
            renderNews(singleNewArray, newContainer);
          })
        );
      } else {
        console.log("We couldnt find it");
      }
    } else {
      listOfSuggestions.innerHTML = "";
      listOfSuggestions.style.display = "none";
    }
  }, 800)
);
