import AbstractView from '../../abstract.js';
import dayjs from 'dayjs';
const localizedFormat = require('dayjs/plugin/localizedFormat');
dayjs.extend(localizedFormat);

const createSiteFilmCardTemplate = (movie) =>
  `<article class="film-card">
          <h3 class="film-card__title">${movie.film_info.title}</h3>
          <p class="film-card__rating">${movie.film_info.total_rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${dayjs(movie.film_info.release.date).format('YYYY')}</span>
            <span class="film-card__duration">${movie.film_info.runtime} minutes</span>
            <span class="film-card__genre">${movie.film_info.genre[0]}</span>
          </p>
          <img src="${movie.film_info.poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${movie.film_info.description}</p>
          <a class="film-card__comments">${movie.comments.length} comments</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${movie.user_details.watchlist ? 'film-card__controls-item--active' : ''}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${movie.user_details.already_watched ? 'film-card__controls-item--active' : ''}" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite ${movie.user_details.favorite ? 'film-card__controls-item--active' : ''}" type="button">Mark as favorite</button>
          </div>
        </article>`;


export default class FilmCard  extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickAddToWatchListHandler = this._clickAddToWatchListHandler.bind(this);
    this._clickAddAlreadyWatchedHandler = this._clickAddAlreadyWatchedHandler.bind(this);
    this._clickAddFavoritesHandler = this._clickAddFavoritesHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilmCardTemplate(this._movie);
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
