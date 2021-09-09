import AbstractView from './abstract.js';

const createSortTemplate = () => (
  `<ul class="sort">
    <li><button class="sort__button default sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button data">Sort by date</a></li>
    <li><a href="#" class="sort__button rating">Sort by rating</a></li>
  </ul>`
);

export default class Sort extends AbstractView {
  constructor() {
    super();
    this._clickSortByDefaultHandler = this._clickSortByDefaultHandler.bind(this);
    this._clickSortByDateHandler = this._clickSortByDateHandler.bind(this);
    this._clickSortByRatingHandler = this._clickSortByRatingHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _clickSortByDefaultHandler(event) {
    event.preventDefault();
    this._callback.sortByDefault();
  }

  _clickSortByDateHandler(event) {
    event.preventDefault();
    this._callback.sortByDate();
  }

  _clickSortByRatingHandler(event) {
    event.preventDefault();
    this._callback.sortByRating();
  }

  sortByDefault(callback) {
    this._callback.sortByDefault = callback;
    this.getElement().querySelector('.default').addEventListener('click', this._clickSortByDefaultHandler);
  }

  sortByDate(callback) {
    this._callback.sortByDate = callback;
    this.getElement().querySelector('.data').addEventListener('click', this._clickSortByDateHandler);
  }

  sortByRating(callback) {
    this._callback.sortByRating = callback;
    this.getElement().querySelector('.rating').addEventListener('click', this._clickSortByRatingHandler);
  }
}
