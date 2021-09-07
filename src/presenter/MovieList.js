import SiteFilmContainerView from '../view/site-film-container/site-film-container.js';
import SiteMoreButtonView from '../view/site-more-button.js';
import SiteFilmListView from '../view/site-film-container/film-list/film-list.js';
import {remove, render, RenderPosition } from '../view/utils/render';
import SiteSortView from '../view/site-sort';
import FilmListTop from '../view/site-film-container/film-list-containers/film-section-top';
import FilmListMost from '../view/site-film-container/film-list-containers/film-section-most';
import FilmListSection from '../view/site-film-container/film-list-containers/film-section';
import {updateItem} from '../view/utils/common';
import MoviePresenter from './Movie.js';
import SitePopUpView from '../view/site-popout/site-popup';
import MenuPresenter from './Menu.js';

const FILM_COUNT_PER_STEP = 5;
const SUB_FILM_COUNT_PER_STEP = 2;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderMovieCount = FILM_COUNT_PER_STEP;
    this._renderSubMovieCount = SUB_FILM_COUNT_PER_STEP;
    this._moviePresenter = new Map();
    this._siteSortComponent = new SiteSortView();
    this._movieList = [];
    this._sitePopUp = null;
    this._prevSitePopUp = null;
    this._siteFilmContainerComponent = new SiteFilmContainerView();
    this._filmListSection = new FilmListSection();
    this._filmListMost = new FilmListMost();
    this._filmListTop = new FilmListTop();
    this._filmListSectionContainer = new SiteFilmListView();
    this._filmListMostContainer = new SiteFilmListView();
    this._filmListTopContainer = new SiteFilmListView();
    this._moreButton = new SiteMoreButtonView();
    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._renderPopUp = this._renderPopUp.bind(this);
    this._onEscKeyUp = this._onEscKeyUp.bind(this);
    this._closePopUp = this._closePopUp.bind(this);
    this._setAddToWatchList = this._setAddToWatchList.bind(this);
    this._setAlreadyWatched = this._setAlreadyWatched.bind(this);
    this._setAddToFavorite = this._setAddToFavorite.bind(this);
  }

  init(listMovies) {
    this._movieList = listMovies.slice();

    this._sourcedMovieList = listMovies.slice();

    new MenuPresenter(this._movieListContainer).init(this._movieList);
    render(this._movieListContainer, this._siteSortComponent, RenderPosition.BEFOREEND);
    render(this._movieListContainer, this._siteFilmContainerComponent, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListSection, RenderPosition.BEFOREEND);
    render(this._filmListSection, this._filmListSectionContainer, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListMost, RenderPosition.BEFOREEND);
    render(this._filmListMost, this._filmListMostContainer, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListTop, RenderPosition.BEFOREEND);
    render(this._filmListTop, this._filmListTopContainer, RenderPosition.BEFOREEND);

    this._renderList();
  }

  _handleMovieChange(updatedFilm) {
    this._movieList = updateItem(this._movieList, updatedFilm);
    this._sourcedMovieList = updateItem(this._sourcedMovieList, updatedFilm);
    this._moviePresenter.get(updatedFilm.id).init(updatedFilm);
    if (this._sitePopUp) {
      this._movie = updatedFilm;
      this._renderPopUp(updatedFilm, this._setAddToWatchList, this._setAlreadyWatched, this._setAddToFavorite);
    }
  }

  _setAddToWatchList() {
    this._handleMovieChange(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: !this._movie.user_details.watchlist,
          alreadyWatched: this._movie.user_details.alreadyWatched,
          favorite: this._movie.user_details.favorite,
        },
      },
      ),
    );
  }

  _setAlreadyWatched() {
    this._handleMovieChange(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: this._movie.user_details.watchlist,
          alreadyWatched: !this._movie.user_details.alreadyWatched,
          favorite: this._movie.user_details.favorite,
        },
      },
      ),
    );
  }

  _setAddToFavorite() {
    this._handleMovieChange(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: this._movie.user_details.watchlist,
          alreadyWatched: this._movie.user_details.alreadyWatched,
          favorite: !this._movie.user_details.favorite,
        },
      },
      ),
    );
  }

  _renderPopUp(movie, addToWatchList, alreadyWatched, addToFavorite) {
    if (this._sitePopUp) {
      this._closePopUp();
    }

    document.addEventListener('keyup', this._onEscKeyUp);
    document.body.classList.add('hide-overflow');
    this._prevSitePopUp = this._sitePopUp;

    this._sitePopUp = new SitePopUpView(movie);

    render(this._movieListContainer, this._sitePopUp, RenderPosition.BEFOREEND);

    this._sitePopUp.setAddToWatchListHandler(addToWatchList);
    this._sitePopUp.setAlreadyWatchedHandler(alreadyWatched);
    this._sitePopUp.setAddToFavoritesHandler(addToFavorite);

    this._sitePopUp.setCloseButtonHandler(this._closePopUp);

    if(this._prevSitePopUp === null) {
      return render(this._movieListContainer, this._sitePopUp, RenderPosition.BEFOREEND);
    }
    remove(this._prevSitePopUp);
  }

  _renderSort() {}

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._filmListSectionContainer, this._handleMovieChange, this._renderPopUp);
    const mostMoviePresenter = new MoviePresenter(this._filmListMostContainer, this._handleMovieChange, this._renderPopUp);
    const topMoviePresenter = new MoviePresenter(this._filmListTopContainer, this._handleMovieChange, this._renderPopUp);
    moviePresenter.init(movie);
    mostMoviePresenter.init(movie);
    topMoviePresenter.init(movie);
    this._moviePresenter.set(movie.id, moviePresenter);
  }

  _renderMovies(from, to) {
    this._movieList
      .slice(from, to)
      .forEach((boardTask) => this._renderMovie(boardTask));
  }

  _renderSubMovies(from, to) {
    this._movieList
      .slice(from, to)
      .forEach((boardTask) => this._renderMovie(boardTask));
  }

  _renderLoadMoreButton() {
    render(this._filmListSection, this._moreButton, RenderPosition.BEFOREEND);
  }

  _closePopUp() {
    remove(this._sitePopUp);
    document.body.classList.remove('hide-overflow');
    this._sitePopUp = null;
    document.removeEventListener('keydown', this._onEscKeyUp);
  }

  _onEscKeyUp(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._closePopUp();
    }
  }

  _renderList() {
    if (this._movieList.length > this._renderMovieCount) {
      let renderCardCount = this._renderMovieCount;

      if (this._moreButton) {
        this._moreButton.setClickHandler(() => {
          this._movieList
            .slice(renderCardCount, renderCardCount + this._renderMovieCount)
            .forEach((movie) => this._renderMovie(movie));

          renderCardCount += this._renderMovieCount;
          if (renderCardCount >= this._movieList.length) {
            remove(this._moreButton);
          }
        });
      }
    }
    this._renderSort();
    this._renderMovies(0, Math.min(this._movieList.length, this._renderMovieCount));
    this._renderSubMovies(0, Math.min(this._movieList.length, this._renderSubMovieCount));
    if(this._movieList.length > this._renderMovieCount) {
      this._renderLoadMoreButton();
    }
  }
}
