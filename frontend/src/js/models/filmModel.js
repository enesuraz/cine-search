import { API_KEY, API_ENDPOINT, PER_PAGE } from "../utils/config";
import { getJSON, sendJSON } from "../utils/helpers";

export const state = {
  film: {},
  search: {
    query: "",
    result: [],
    page: 1,
    perPage: PER_PAGE,
  },
  bookmarks: [],
};

function scrappedData(film) {
  state.film = {
    id: film._id,
    title: film.title,
    year: film.year,
    released: film.released,
    runtime: film.runtime,
    genre: film.genre.join(","),
    director: film.director,
    actors: film.actors,
    plot: film.plot,
    poster: film.poster,
    imdbRating: film.imdbRating,
    imdbID: film.imdbId,
  };
}

/**
 * Load film data to the state.film and check bookmarked or not
 * @param {string} id
 */
export async function loadFilm(id) {
  try {
    const data = await getJSON(`${API_ENDPOINT}/${id}/?api_key=${API_KEY}`);

    const { film } = data.data;

    scrappedData(film);

    if (state.bookmarks.some((bookmark) => bookmark.id === id))
      state.film.bookmarked = true;
    else state.film.bookmarked = false;
  } catch (err) {
    throw err;
  }
}

/**
 * Load state.search values for render the search result
 * @param {string} query
 */
export async function searchFilm(query) {
  try {
    state.query = query;
    const data = await getJSON(
      `${API_ENDPOINT}/?api_key=${API_KEY}&q=${query}`
    );
    const { films } = data.data;

    state.search.result = films.map((film) => {
      return {
        id: film._id,
        title: film.title,
        plot: film.plot,
        poster: film.poster,
      };
    });
  } catch (err) {
    throw err;
  }
}

/**
 * Return data based on custom page
 * @param {number} [page = state.search.page]
 * @returns {object} resultData
 */
export function resultsPerPage(page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.perPage;
  const end = page * state.search.perPage;

  return state.search.result.slice(start, end);
}

/**
 * Change imdbRating based on user review
 * @param {number} star
 */
export const updateImdbRating = function (star) {
  state.film.userReview = star;
  state.film.imdbRating = (
    (star + parseFloat(state.film.imdbRating)) /
    2
  ).toFixed(1);
};

/**
 * Store the bookmarks in local storage
 */
function persistBokmark() {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

/**
 * Add film to the state.bookmarks
 * @param {object} film
 */
export const addBookmark = function (film) {
  state.bookmarks.push(film);

  if (film.id === state.film.id) state.film.bookmarked = true;
  persistBokmark();
};

/**
 * Delete film in state.bookmarks
 * @param {object} film
 */
export const deleteBookmark = function (id) {
  const filmIndex = state.bookmarks.findIndex((el) => el.id === id);
  state.bookmarks.splice(filmIndex, 1);

  if (id === state.film.id) state.film.bookmarked = false;

  persistBokmark();
};

/**
 * Upload film to the server after arranging data
 * @param {object} newFilm
 */
export async function uploadFilm(newFilm) {
  try {
    newFilm.actors = newFilm.actors.split(",");
    newFilm.genre = newFilm.genre.replaceAll(" ", "").split(",");
    newFilm.imdbRating = +newFilm.imdbRating;

    const data = await sendJSON(`${API_ENDPOINT}/?api_key=${API_KEY}`, newFilm);
    const { film } = data.data;

    scrappedData(film);
  } catch (err) {
    throw err;
  }
}

/**
 * Load localstorage data
 */
const init = function () {
  const persistBookmarks = localStorage.getItem("bookmarks");
  if (persistBookmarks) state.bookmarks = JSON.parse(persistBookmarks);
};

init();
