import {createSiteCommentTemplate} from './site-comment';
import {createSiteGeneresTemplate} from './site-geners';
import Smart from '../smart';
import dayjs from 'dayjs';
import he from 'he';
import {nanoid} from 'nanoid';

const createSitePopUpTemplate = (movie, state) => {
  const {poster, filmName, rating, filmYear, filmLength, filmGenre, description, comments} = movie;
  let commentsNumber = 0;
  if (comments.length) {
    commentsNumber = comments.length;
  }
  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">18+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmName}</h3>
              <p class="film-details__title-original">Original: The Great Flamarion</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">Anthony Mann</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">Anne Wigton, Heinz Herald, Richard Weil</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">Erich von Stroheim, Mary Beth Hughes, Dan Duryea</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${filmYear}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmLength}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">USA</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Genres</td>
              <td class="film-details__cell">
                ${createSiteGeneresTemplate(filmGenre)}
            </tr>
          </table>

          <p class="film-details__film-description">
            ${description}
            </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist ${movie.user_details.watchlist ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--watched ${movie.user_details.alreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite ${movie.user_details.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsNumber}</span></h3>

        <ul class="film-details__comments-list">
        ${comments.map((comment)=> createSiteCommentTemplate(comment)).join('')}
        </ul>

        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
          ${state.emoji ? `<img src="${state.emoji}" width="100%" height="100%" alt="emoji"/>` : ''}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${he.encode(state.text)}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji" >
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji" >
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji" >
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji" >
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class PopUp extends Smart {
  constructor(card) {
    super();
    this._card = card;
    this._data = {
      id: nanoid(),
      emoji: '',
      text: '',
      author: 'Don Joe',
      commentaryDate: dayjs().format('LLL'),
    };
    this._scrollPositon = 0;
    this._clickHandler = this._clickHandler.bind(this);
    this._clickAddToWatchListHandler = this._clickAddToWatchListHandler.bind(this);
    this._clickAddAlreadyWatchedHandler = this._clickAddAlreadyWatchedHandler.bind(this);
    this._clickAddFavoritesHandler = this._clickAddFavoritesHandler.bind(this);
    this._clickAddEmojiHandler = this._clickAddEmojiHandler.bind(this);
    this._clickSendHandler = this._clickSendHandler.bind(this);
    this._descriptionTextAreaHandler = this._descriptionTextAreaHandler.bind(this);
  }

  getTemplate() {
    return createSitePopUpTemplate(this._card, this._data);
  }

  restoreHandlers() {
    this.setCloseButtonHandler(this._callback.click);
    this.setAddToWatchListHandler(this._callback.addToWatchList);
    this.setAlreadyWatchedHandler(this._callback.addToAlreadyWatched);
    this.setAddToFavoritesHandler(this._callback.addToFavorite);
    this.setAddEmojiHandler(this._callback.addEmojiChange);
    this.setDescriptionTextareaHandler(this._callback.descriptionTextarea);
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.getElement().scrollTo(0, this._scrollPositon);
  }

  getFilmId() {
    return this._card.id;
  }

  setFilm(film) {
    this._card = film;
  }

  _descriptionTextAreaHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    evt.preventDefault();
    this.updateData({
      text: evt.target.value,
    }, true);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _clickAddToWatchListHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    evt.preventDefault();
    this._callback.addToWatchList(this._card);

  }

  _clickAddAlreadyWatchedHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    evt.preventDefault();
    this._callback.addToAlreadyWatched(this._card);
  }

  _clickAddFavoritesHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    evt.preventDefault();
    this._callback.addToFavorite(this._card);
  }

  _clickAddEmojiHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    evt.preventDefault();
    this.updateData({emoji: `./images/emoji/${evt.target.value}.png`});
  }

  _clickSendHandler(evt) {
    this._scrollPositon = this.getElement().scrollTop;
    if(evt.ctrlKey && (evt.keyCode === 13 || evt.keyCode === 10)) {
      this._callback.formSubmit(this._card, this._data);
      this.updateData({emoji: '', text: ''});
    }
  }

  setCloseButtonHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._clickHandler);
  }

  setAddToWatchListHandler(callback) {
    this._callback.addToWatchList = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._clickAddToWatchListHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.addToAlreadyWatched = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._clickAddAlreadyWatchedHandler);
  }

  setAddToFavoritesHandler(callback) {
    this._callback.addToFavorite = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._clickAddFavoritesHandler);
  }


  setAddEmojiHandler(callback) {
    this._callback.addEmojiChange = callback;
    this.getElement().querySelector('.film-details__emoji-list').addEventListener('click', this._clickAddEmojiHandler);
  }

  setDescriptionTextareaHandler(callback) {
    this._callback.descriptionTextarea = callback;
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._descriptionTextAreaHandler);

  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('keyup', this._clickSendHandler);
  }
}
