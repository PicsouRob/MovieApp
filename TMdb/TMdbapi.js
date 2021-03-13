import API_KEY from "../Helpers/Api_key";

export function getSearchFilm(text, page) {
  const url =
    "https://api.themoviedb.org/3/search/movie?api_key=" +
    API_KEY +
    "&language=fr&query=" +
    text +
    "&page=" +
    page;
  return fetch(url)
    .then((response) => response.json())
    .catch((err) => {
      console.error(err);
    });
}

// Récupération du détail d'un film
export function getFilmDetailFromApi(id) {
  return fetch(
    "https://api.themoviedb.org/3/movie/" +
      id +
      "?api_key=" +
      API_KEY +
      "&language=fr"
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
}

export function getImageApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}
