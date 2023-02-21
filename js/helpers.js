const fecthNews = async (
  querySearch,
  pageSize = 10,
  language = "all",
  sectionName
) => {
  try {
    const data = await fetch(
      `https://content.guardianapis.com/search?${
        querySearch ? `q="${querySearch}"` : ""
      }&api-key=test&page=1&page-size=${pageSize}&show-fields=thumbnail,lastModified,byline${
        language !== "all" && language !== "null" ? `&lang=${language}` : ""
      }${sectionName && sectionName !== "all" ? `&section=${sectionName}` : ""}`
    );
    const { response } = await data.json();
    return [response, null];
  } catch (error) {
    return [null, error.message];
  }
};
const fetchSingleNew = async (idSearch, pageSize = 10, language = "all") => {
  try {
    const data = await fetch(
      `https://content.guardianapis.com/${idSearch}?api-key=test&page=1&show-related=true&page-size=${pageSize}&show-fields=thumbnail,lastModified,byline${
        language !== "all" && language !== "null" ? `&lang=${language}` : ""
      }`
    );
    const { response } = await data.json();
    return [response, null];
  } catch (error) {
    return [null, error.message];
  }
};

const renderNews = (newElements, HTMLContainer) => {
  HTMLContainer.innerHTML = newElements
    .map(
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
  <a class="newsContainer__cardTitle" target="_blank" href=${
    newElement.webUrl
  }>${newElement.webTitle}</a>
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
    .join("");
};

const showErrorNews = (HTMLContainer) => {
  let paragraph = document.createElement("p");
  HTMLContainer.appendChild(paragraph);
  paragraph.innerText = "There is no data available.....";
  paragraph.style.textAlign = "center";
  paragraph.style.fontWeight = "700";
};

const useDebounce = (getData, delay) => {
  let timeoutID;
  return function (...args) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    timeoutID = setTimeout(() => getData(...args), delay);
  };
};
export { fecthNews, fetchSingleNew, renderNews, showErrorNews, useDebounce };
