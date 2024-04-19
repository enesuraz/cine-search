import FilmView from "./views/FilmView";
import * as model from "./models/filmModel";
import SearchView from "./views/SearchView";
import ResultView from "./views/ResultView";
import PaginationView from "./views/PaginationView";
import WatchListView from "./views/WatchListView";
import AddFilmView from "./views/AddFilmView";

import "core-js/stable";
import "regenerator-runtime/runtime";

/**
 * Render film to the dom, sidebar result view and watchlist view update every load or chnage hash
 */
async function controlFilm() {
  try {
    const filmId = window.location.hash.slice(1);

    if (!filmId) return;

    FilmView.renderSpinner();

    WatchListView.update(model.state.bookmarks);

    ResultView.update(model.resultsPerPage());

    await model.loadFilm(filmId);

    FilmView.render(model.state.film);
  } catch (err) {
    FilmView.renderMessage();
  }
}

/**
 * Render sidebar result and pagination view
 */
async function controlSearch() {
  try {
    ResultView.renderSpinner();
    const query = SearchView.getQuery();
    await model.searchFilm(query);

    ResultView.render(model.resultsPerPage());
  } catch (err) {
    ResultView.renderMessage(err.message);
  } finally {
    PaginationView.render(model.state.search);
  }
}

/**
 * Update result and pagination view when clicking pagination button
 */
function controlPaginate(goTo) {
  ResultView.update(model.resultsPerPage(goTo));

  PaginationView.render(model.state.search);
}

/**
 * Update imdbRating based on user review
 * @param {number} numStar
 */
function controlStar(numStar) {
  model.updateImdbRating(numStar);

  FilmView.update(model.state.film);
}

/**
 * Render watchlistview and update bookmark button in filmview
 */
function controlBookmark() {
  if (!model.state.film.bookmarked) model.addBookmark(model.state.film);
  else model.deleteBookmark(model.state.film.id);

  FilmView.update(model.state.film);
  WatchListView.render(model.state.bookmarks);
}

function controlInitializeBookmark() {
  WatchListView.render(model.state.bookmarks);
}

/**
 * Upload data and update filmview
 * @param {object} data
 */
async function controlAddFilm(data) {
  try {
    await model.uploadFilm(data);

    AddFilmView.renderMessage("Uploaded successfully!");

    FilmView.render(model.state.film);

    window.setTimeout(() => {
      AddFilmView._togglePopup();
    }, 2500);
  } catch (err) {
    AddFilmView.renderMessage(err.message);
  }
}

/**
 * Event-subscireber pattern
 */
function init() {
  FilmView.addHandlerRender(controlFilm);
  SearchView.addHandlerSubmit(controlSearch);
  PaginationView.addHandlerRender(controlPaginate);
  FilmView.addHandlerStar(controlStar);
  FilmView.addHandlerBookmark(controlBookmark);
  WatchListView.addHandlerRender(controlInitializeBookmark);
  AddFilmView.addHandlerUpload(controlAddFilm);
}

init();
