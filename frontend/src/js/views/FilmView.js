import icons from "url:../../assets/icons.svg";
import View from "./View";

class FilmView extends View {
  _parentElement = document.querySelector(".film-container");
  _errorMessage =
    "We could not find any film for this query,please try another one!!!";

  /**
   * Event subscribe pattern for load application first or change url
   * @param {function} handler
   */
  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
  }

  /**
   * Event subscribe pattern for  add star
   * @param {function} handler
   */
  addHandlerStar(controller) {
    this._parentElement.addEventListener("click", function (e) {
      const starBtn = e.target.closest(".details-stars__star");
      if (!starBtn) return;
      const starNum = +starBtn.id.split("--")[1];
      controller(starNum);
    });
  }

  /**
   * Event subscribe pattern for add bookmark
   * @param {function} handler
   */
  addHandlerBookmark(controller) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".bookmark-btn");
      if (!btn) return;
      controller();
    });
  }

  /**
   * Return markup for render in the dom based on sending data
   * @returns {object} markup
   */
  _generateHTML() {
    return `
    <button class='bookmark-btn'>
        <svg>
            <use href="${icons}#icon-bookmark${
      !this._data.bookmarked ? "-outline" : ""
    }"></use>
          </svg>
        </button>
    <figure class="film-image">
                <img
                src="${this._data.poster}"
                alt="${this._data.title}"
                class="film-image__photo"
                />
                <span class="film-image__name">${this._data.title}</span>
            </figure>
            <div class="film-details">
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-star"></use>
                </svg>
                <span>${this._data.imdbRating}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-calendar"></use>
                </svg>
                <span>${new Date(this._data.released)
                  .toISOString()
                  .substring(0, 10)}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-stopwatch"></use>
                </svg>
                <span>${this._data.runtime} min</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-clapperboard"></use>
                </svg>
                <span>${this._data.genre}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-video-camera"></use>
                </svg>
                <span>${this._data.director}</span>
                </div>
                <div class="film-details__detail">
                <svg>
                    <use href="${icons}#icon-calendar"></use>
                </svg>
                <span>${this._data.year}</span>
                </div>
            </div>
            <div class="details-stars">
            ${Array.from(
              { length: this._data.userReview || 0 },
              (_, i) => i + 1
            )
              .map(
                (
                  starNum
                ) => `<span class='details-stars__star' id='star--${starNum}'><svg>
        <use href="${icons}#icon-star"></use>
      </svg></span>`
              )
              .join("")}
         ${Array.from(
           { length: 10 - (this._data.userReview || 0) },
           (_, i) => i + (this._data.userReview || 0) + 1
         )
           .map(
             (
               starNum
             ) => `<span class='details-stars__star' id='star--${starNum}'><svg>
        <use href="${icons}#icon-star-outlined"></use>
      </svg></span>`
           )
           .join("")}
            </div>
            <div class="details-plot">
                <p>
                ${this._data.plot}
                </p>
            </div>
            <div class="details-actors">
            ${this._data.actors
              .map(
                (actor) => `<div class="details-actors__actor">
            <svg>
                <use href="${icons}#icon-person_pin_circle"></use>
            </svg>
            <span>${actor}</span>
            </div>`
              )
              .join("")}
            </div>
            <div class="details-button">
                <a href="https://www.imdb.com/title/${
                  this._data.imdbID
                }" class="details-button__link">Get Details</a>
            </div>
    `;
  }
}

export default new FilmView();
