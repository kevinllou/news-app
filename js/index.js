import {
  fecthNews,
  fetchSingleNew,
  renderNews,
  showErrorNews,
  useDebounce,
} from "./helpers.js";

let newContainer = document.querySelector(".newsContainer");
const btnDrowpDown = document.querySelector(".header__burguerIcon");
const languageSelect = document.querySelector("#language");
const numberOfNews = document.querySelector("#numberOfNews");
const searchInput = document.querySelector("#search");
const listOfSuggestions = document.querySelector(".header__listOptions");
const dropdownContainer = document.querySelector(
  ".header__filterOptionsContainer"
);
const form = document.querySelector(".header__formContainer");
const filterButtons = document.querySelectorAll(".filterButtons > button");
let lastButton = document.querySelector("#all");

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

/* Check if there is an object set in the localStorage*/

if (localStorage.getItem("filters") !== null) {
  const { query, pageSize, language } = JSON.parse(
    localStorage.getItem("filters")
  );
  searchInput.value = query;
  numberOfNews.value = pageSize;
  languageSelect.value = language === "null" ? "all" : language;
  console.log(numberOfNews.value);
} 

/* Get initial data from the API to render news in cards */
const [{ results: newsData }, newsError] = await fecthNews();
if (!newsError) {
  renderNews(newsData, newContainer);
} else {
  showErrorNews(newContainer);
}

/*Search news whenever the value of the input search changes */
searchInput.addEventListener(
  "input",
  useDebounce(async (event) => {
    if (event.target.value.length > 0) {
      /* Get data from the API to render information in a list tag */
      const [{ results: filterNews }, filterError] = await fecthNews(
        event.target.value,
        numberOfNews.value,
        languageSelect.value
      );
      /* Set object in the localStorage */
      localStorage.setItem(
        "filters",
        JSON.stringify({
          query: event.target.value,
          pageSize: numberOfNews.value,
          language: languageSelect.value,
        })
      );
      /* Check if there wasn't an unexpected error */
      if (!filterError && filterNews.length > 0) {
        listOfSuggestions.style.display = "block";
        listOfSuggestions.innerHTML = filterNews
          .map(
            (element) => `
                <li data-id-search = ${element.id}>${element.webTitle}</li>
            `
          )
          .join("");
        /*Get all list from the ul tag  */
        const lists = document.querySelectorAll("header__listOptions > li");
        /* Add an event listener to each list tag to trigger an event */
        lists.forEach((list) =>
          list.addEventListener("click", async (event) => {
            console.log("click");
            const [{ content, relatedContent }, listDataError] =
              await fetchSingleNew(
                event.target.dataset.idSearch,
                numberOfNews.value,
                languageSelect.value
              );
            const singleNewArray = [content, ...relatedContent];
            newContainer.innerHTML = "";
            !listDataError
              ? renderNews(singleNewArray, newContainer)
              : showErrorNews(newContainer);
          })
        );
      } else {
        listOfSuggestions.innerHTML = "<li>There was an unexpected error</li>";
      }
    } else {
      listOfSuggestions.innerHTML = "";
      listOfSuggestions.style.display = "none";
    }
  }, 800)
);

/* Event listener to the form whenever an user submits to request the new */

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (searchInput.value.length > 0) {
    const [{ results: newsData }, newsError] = await fecthNews(
      searchInput.value,
      numberOfNews.value,
      languageSelect.value
    );
     /* Set object in the localStorage */
    localStorage.setItem(
      "filters",
      JSON.stringify({
        query: searchInput.value,
        pageSize: numberOfNews.value,
        language: languageSelect.value,
      })
    );
    newContainer.innerHTML = "";
    if (!newsError && newsData.length > 0) {
      renderNews(newsData, newContainer);
    } else {
      showErrorNews(newContainer);
    }
  }
});

/*  Filter buttons */
filterButtons.forEach((button) => {
  /* Add an event listener to each button to render sections based on the button id */
  button.addEventListener("click", async () => {
    lastButton.classList.remove("filterButtons--active");
    button.classList.add("filterButtons--active");

    const [{ results: newsData }, newsError] = await fecthNews(
      "",
      numberOfNews.value,
      languageSelect.value,
      button.id
    );
    newContainer.innerHTML = "";
    if (!newsError && newsData.length > 0) {
      renderNews(newsData, newContainer);
    } else {
      showErrorNews(newContainer);
    }
    lastButton = button;
  });
});
