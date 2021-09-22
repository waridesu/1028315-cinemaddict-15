import AbstractView from './abstract.js';
import {FilterType} from './utils/const';

const createSiteMenuTemplate = (details, currentFilterType) => {
  let watchList = 0;
  let history = 0;
  let favorite = 0;
  details.forEach((element) => {
    if (element.user_details.watchlist) {
      watchList += 1;
    }
    if (element.user_details.alreadyWatched) {
      history += 1;
    }
    if (element.user_details.favorite) {
      favorite += 1;
    }
  });

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${ currentFilterType === FilterType.ALL_MOVIES ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.ALL_MOVIES}">All movies<span class="main-navigation__item-count">${details.length}</span></a>
      <a href="#watchlist" class="main-navigation__item ${ currentFilterType === FilterType.WATCHLIST ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">${watchList}</span></a>
      <a href="#history" class="main-navigation__item ${ currentFilterType === FilterType.HISTORY ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item ${ currentFilterType === FilterType.FAVORITES ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional ${ currentFilterType === FilterType.STATS ? 'main-navigation__item--active' : ''}" data-filter-type="${FilterType.STATS}">Stats</a>
  </nav>`;
};

export default class Filter extends AbstractView {
  constructor( filter, currentFilterType, details) {
    super();
    this._details = details;

    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);

  }

  getTemplate() {
    return createSiteMenuTemplate(this._details, this._currentFilterType);
  }

  _filterTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'A') {
      return;
    }
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
