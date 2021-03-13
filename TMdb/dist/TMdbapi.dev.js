"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSearchFilm = getSearchFilm;
exports.getFilmDetailFromApi = getFilmDetailFromApi;
exports.getImageApi = getImageApi;

var _Api_key = _interopRequireDefault(require("../Helpers/Api_key"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getSearchFilm(text, page) {
  var url = "https://api.themoviedb.org/3/search/movie?api_key=" + _Api_key["default"] + "&language=fr&query=" + text + "&page=" + page;
  return fetch(url).then(function (response) {
    return response.json();
  })["catch"](function (err) {
    console.error(err);
  });
} // Récupération du détail d'un film


function getFilmDetailFromApi(id) {
  return fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=" + _Api_key["default"] + "&language=fr").then(function (response) {
    return response.json();
  })["catch"](function (error) {
    return console.error(error);
  });
}

function getImageApi(name) {
  return "https://image.tmdb.org/t/p/w300" + name;
}