import SiteFilmCardView from '../view/site-film-container/site-film-card/site-film-card';
import {remove, render, RenderPosition, replace} from '../view/utils/render';
import SiteSitePopUpView from '../view/site-popout/site-popup';


export default class Movie {
  constructor(MovieListContainer, changeDate) {
    this._movieListContainer = MovieListContainer;
    this._changeData = changeDate;

    this._movieComponent = null;
    this._prevMovieComponent = null;
    this._sitePopUp = null;
    this._addToWatchList = this._addToWatchList.bind(this);
    this._alreadyWatched = this._alreadyWatched.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._onEscKeyUp = this._onEscKeyUp.bind(this);
    this._renderPopUp = this._renderPopUp.bind(this);
  }

  init(movie) {
    this._movie = movie;

    this._prevMovieComponent = this._movieComponent;

    this._movieComponent = new SiteFilmCardView(movie);

    this._movieComponent.setClickHandler(this._renderPopUp);
    this._movieComponent.setAddToWatchListHandler(this._addToWatchList);
    this._movieComponent.setAlreadyWatchedHandler(this._alreadyWatched);
    this._movieComponent.setAddToFavoritesHandler(this._addToFavorite);

    if(this._prevMovieComponent === null) {
      return render(this._movieListContainer, this._movieComponent, RenderPosition.BEFOREEND);
    }
    this._replaceMovie();
    remove(this._prevMovieComponent);
  }

  destroy() {
    remove(this._movieComponent);
  }

  _renderPopUp() {
    if (document.querySelector('.film-details')) {
      this._closePopUp();
    }
    document.addEventListener('keyup', this._onEscKeyUp);
    document.body.classList.add('hide-overflow');
    this._sitePopUp = new SiteSitePopUpView(this._movie);
    render(this._movieListContainer, this._sitePopUp, RenderPosition.BEFOREEND);

    this._sitePopUp.setAddToWatchListHandler(()=> this._addToWatchList);
    this._sitePopUp.setAlreadyWatchedHandler(()=> this._alreadyWatched);
    this._sitePopUp.setAddToFavoritesHandler(()=> this._addToFavorite);

    this._sitePopUp.setCloseButtonHandler(() => {
      document.removeEventListener('keyup', this._onEscKeyUp);
      this._closePopUp();
    });
  }

  _replaceMovie() {
    replace(this._movieComponent, this._prevMovieComponent);
    document.removeEventListener('keydown', this._onEscKeyUp);
  }

  resetView() {
    this._replaceMovie();
  }

  _closePopUp() {
    remove(this._sitePopUp);
    document.body.classList.remove('hide-overflow');
    this._sitePopUp = null;
  }

  _onEscKeyUp(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopUp();
    }
  }

  _addToWatchList() {
    this._changeData(
      Object.assign({}, this._movie.user_details.watchlist =!this._movie.user_details.watchlist,
      ),
    );
  }

  _alreadyWatched() {
    this._changeData(
      Object.assign({}, this._movie.user_details, {
        alreadyWatched: !this._movie.user_details.alreadyWatched,
      },
      ),
    );
  }

  _addToFavorite() {
    this._changeData(
      Object.assign({}, this._movie.user_details, {
        alreadyWatched: !this._movie.user_details.alreadyWatched,
      },
      ),
    );
  }
}
