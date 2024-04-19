import View from "./View";

class AddFilmView extends View {
  _parentElement = document.querySelector(".add-form");
  _overlay = document.querySelector(".add-popup");
  _showButton = document.querySelector("#show-popup");

  constructor() {
    super();
    this.addHandlerShow();
    this.addHandlerClose();
  }

  /**
   * Toggle add-form parent container when click show or close button
   */
  _togglePopup() {
    this._overlay.classList.toggle("target");
    this._parentElement.querySelector(".message").remove();
  }

  /**
   * Handle click to the show button
   */
  addHandlerShow() {
    this._showButton.addEventListener("click", this._togglePopup.bind(this));
  }

  /**
   * Handle click to the close button or outside the form
   */
  addHandlerClose() {
    this._overlay.addEventListener("click", function (e) {
      if (
        !e.target.closest(".add-form") ||
        e.target.classList.contains("add-form__close")
      ) {
        document.querySelector(".add-popup").classList.remove("target");
      }
    });
  }

  /**
   * Event subscribe pattern for upload film
   * @param {function} handler
   */
  addHandlerUpload(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }

  /**
   * Override render message to customize for addfilm container
   * @param {string} [message = customMessage]
   */
  renderMessage(message = this._errorMessage) {
    const markup = `
    <div class="message">
        <div class="message-box">
            <span>${message}</span>
        </div>
    </div>
    <span class="add-form__close">&times;</span>
    `;
    this._parentElement.insertAdjacentHTML("beforeend", markup);
    window.setTimeout(() => {
      this._parentElement.querySelector(".message")?.remove();
    }, 5000);
  }
}

export default new AddFilmView();
