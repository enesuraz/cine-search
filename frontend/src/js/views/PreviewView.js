import icons from "url:../../assets/icons.svg";
import View from "./View";

class PreviewView extends View {
  /**
   * Return markup for render in the dom based on sending data
   * @returns {object} markup
   */
  _generateHTML() {
    const id = window.location.hash.slice(1);

    return `<li class="sidebar__item ${
      id === this._data.id ? "sidebar__item--active" : ""
    }">
      <a href="#${this._data.id}" class="sidebar__link">
        <img
          src="${this._data.poster}"
          alt="${this._data.title}"
          class="sidebar__photo"
        />
        <div class="sidebar__details">
          <h2 class="sidebar__title">${this._data.title}</h2>
          <p class="sidebar__description">
            ${this._data.plot}
          </p>
        </div>
      </a>
    </li> `;
  }
}

export default new PreviewView();
