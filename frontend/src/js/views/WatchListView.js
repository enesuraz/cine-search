import icons from "url:../../assets/icons.svg";
import View from "./View";

class WatchListView extends View {
  _parentElement = document.querySelector(".sidebar__list--bookmarks");
  _errorMessage = "No films found in watch list yet!!!";

  /**
   * Event subscribe pattern for load bookmark when application start
   * @param {function} handler
   */
  addHandlerRender(handler) {
    handler();
  }

  /**
   * Return markup for render in the dom based on sending data
   * @returns {object} markup
   */
  _generateHTML() {
    const id = window.location.hash.slice(1);
    return this._data
      .map((result) => {
        return `<li class="sidebar__item ${
          id === result.id ? "sidebar__item--active" : ""
        }">
        <a href="#${result.id}" class="sidebar__link">
          <img
            src="${result.poster}"
            alt="${result.title}"
            class="sidebar__photo"
          />
          <div class="sidebar__details">
            <h2 class="sidebar__title">${result.title}</h2>
            <p class="sidebar__description">
              ${result.plot}
            </p>
          </div>
        </a>
      </li> `;
      })
      .join("");
  }
}

export default new WatchListView();
