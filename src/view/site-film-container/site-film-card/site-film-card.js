import AbstractView from '../../abstract.js';

const createSiteFilmCardTemplate = (card = {}) => {
  const {poster, filmName, rating, filmYear, filmLength, filmGenre = '', description, comments = ''} = card;
  let commentsNumber = 0;
  if (comments.length) {
    commentsNumber = comments.length;
  }
  return `<article class="film-card">
          <h3 class="film-card__title">${filmName}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmYear}</span>
            <span class="film-card__duration">${filmLength}</span>
            <span class="film-card__genre">${filmGenre.length ? filmGenre[0] : 'No specific genre'}</span>
          </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsNumber} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${card.user_details.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${card.user_details.alreadyWatched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${card.user_details.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard  extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickAddToWatchListHandler = this._clickAddToWatchListHandler.bind(this);
    this._clickAddAlreadyWatchedHandler = this._clickAddAlreadyWatchedHandler.bind(this);
    this._clickAddFavoritesHandler = this._clickAddFavoritesHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilmCardTemplate(this._card);
  }

  _clickHandler(event){
    event.preventDefault();
    this._callback.click();
  }

  _clickAddToWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchList();
  }

  _clickAddAlreadyWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.addToAlreadyWatched();
  }

  _clickAddFavoritesHandler(evt) {
    evt.preventDefault();
    this._callback.addToFavorite();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._clickAddToWatchListHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.addToAlreadyWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._clickAddAlreadyWatchedHandler);
  }

  setAddToFavoritesHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._clickAddFavoritesHandler);
  }
}
