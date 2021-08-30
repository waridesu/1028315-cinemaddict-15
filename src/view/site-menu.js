import AbstractView from './abstract.js';

const createSiteMenuTemplate = (number, details) => {
  let watchList = 0;
  let history = 0;
  let favorite = 0;
  details.forEach((element) => {
    if (element.user_details.watchlist) {
      watchList += 1;
    }
    if (element.user_details.already_watched) {
      history += 1;
    }
    if (element.user_details.favorite) {
      favorite += 1;
    }
  });

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies<span class="main-navigation__item-count">${number}</span></a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchList}</span></a>
      <a href="#history" class="main-navigation__item main-navigation__item--active">History <span class="main-navigation__item-count">${history}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Menu extends AbstractView {
  constructor(number, details) {
    super();
    this._number = number;
    this._details = details;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._number, this._details);
  }
}
