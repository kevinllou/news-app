const fecthNews = async () => {
  try {
    const data = await fetch(
      "https://content.guardianapis.com/search?api-key=test&page=1&page-size=10&show-fields=thumbnail,lastModified,byline"
    );
    const { response } = await data.json();
    return [response, undefined];
  } catch (error) {
    return [undefined, error.message];
  }
};

export { fecthNews };
