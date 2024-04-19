class SearchView {
  _parentElement = document.querySelector(".search");

  /**
   * Get and return query what customer write in search input
   * @returns {string} query
   */
  getQuery() {
    const query = this._parentElement.querySelector(".search__input").value;
    this._clearInput();
    return query;
  }

  /**
   * Clear search input after sending by client
   */
  _clearInput() {
    this._parentElement.querySelector(".search__input").value = "";
  }

  /**
   * Event subscribe pattern for submit search form
   * @param {function} handler
   */
  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
