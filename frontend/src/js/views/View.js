import icons from "url:../../assets/icons.svg";

export default class View {
  _data;

  /**
   * Render film to the DOM based on the provided film data.
   * @param {object | Object} data
   * @param {boolean} [render = true]
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateHTML();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  /**
   * Updates film data in the DOM based on changed values.
   * @param {object | Object} data
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateHTML();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll("*"));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll("*")
    );

    newElements.forEach((newEl, idx) => {
      const curEl = currentElements[idx];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue?.trim() !== ""
      ) {
        curEl.innerHTML = newEl.innerHTML;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  /**
   * Clear inside html element before writing actual data
   */
  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
    <svg>
        <use href="${icons}#icon-loader"></use>
    </svg>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }

  /**
   * Render message when something went wrong or true
   * @param {string} [message = customErrorMessage]
   */
  renderMessage(message = this._errorMessage) {
    const markup = `
    <div class="message">
        <div class="message-box">
            <span>${message}</span>
        </div>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML("beforeend", markup);
  }
}
