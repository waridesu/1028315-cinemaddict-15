import {createElement} from '../../utils/utils';

const createSiteFilmCardTemplate = (card) => {
  const {poster, filmName, rating, filmYear, filmLength, filmGenre, description, comments} = card;
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
            <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
            <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
            <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
          </div>
        </article>`;
};

export default class FilmCard {
  constructor(card) {
    this._card = card;
    this._element = null;
  }

  getTemplate() {
    return createSiteFilmCardTemplate(this._card);
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element= null;
  }
}
