import View from "./View";
import icons from "url:../../assets/icons.svg";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  /**
   * Event subscribe pattern for click pagination button
   * @param {function} handler
   */
  addHandlerRender(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const button = e.target.closest(".pagination__btn");

      if (!button) return;

      const goToPage = +button.dataset.goto;

      handler(goToPage);
    });
  }

  /**
   * Return pagination button based on calulated page values
   * @returns {object} markup
   */
  _generateHTML() {
    const numPages = Math.ceil(this._data.result.length / this._data.perPage);

    const currentPage = this._data.page;

    if (currentPage === 1 && numPages > 1) {
      return this._generateNextButton(currentPage);
    }

    if (currentPage === numPages && numPages > 1) {
      return this._generatePrevButton(currentPage);
    }

    if (currentPage < numPages) {
      return [
        this._generatePrevButton(currentPage),
        this._generateNextButton(currentPage),
      ].join("");
    }

    return "";
  }

  _generatePrevButton(curPage) {
    return `
    <button data-goto="${
      curPage - 1
    }" class="pagination__btn pagination__btn--prev">
        <svg>
          <use href="${icons}#icon-arrow-with-circle-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
        `;
  }
  _generateNextButton(curPage) {
    return `
    <button data-goto="${
      curPage + 1
    }" class="pagination__btn pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg>
          <use href="${icons}#icon-arrow-with-circle-right"></use>
        </svg>
      </button>
        `;
  }
}

export default new PaginationView();
