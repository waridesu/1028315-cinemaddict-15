import SiteFilmContainerView from '../view/site-film-container/site-film-container.js';
import SiteMoreButtonView from '../view/site-more-button.js';
import SiteFilmListView from '../view/site-film-container/film-list/film-list.js';
import {remove, render, RenderPosition } from '../view/utils/render';
import FilmListTop from '../view/site-film-container/film-list-containers/film-section-top';
import FilmListMost from '../view/site-film-container/film-list-containers/film-section-most';
import FilmListSection from '../view/site-film-container/film-list-containers/film-section';
import MoviePresenter from './Movie.js';
import SitePopUpView from '../view/site-popout/site-popup';
import {SortType, UpdateType, UserAction} from '../view/utils/const';
import SiteMenuView from '../view/site-menu';
import SiteSortView from '../view/site-sort';
import NoMovies from '../view/site-film-container/list-empty.js';
import {sort} from '../view/utils/sort';
const FILM_COUNT_PER_STEP = 5;
// const SUB_FILM_COUNT_PER_STEP = 2;

export default class MovieList {
  constructor(movieListContainer, moviesModel, filterModel) {
    this._moviesModel = moviesModel;
    this._movieListContainer = movieListContainer;
    this._renderMovieCount = FILM_COUNT_PER_STEP;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = new Map();
    this._sitePopUp = null;
    this._prevSitePopUp = null;
    this._siteFilmContainerComponent = new SiteFilmContainerView();
    this._filmListSection = new FilmListSection();
    this._filmListMost = new FilmListMost();
    this._filmListTop = new FilmListTop();
    this._filmListSectionContainer = new SiteFilmListView();
    this._filmListMostContainer = new SiteFilmListView();
    this._filmListTopContainer = new SiteFilmListView();
    this._filterType = SortType.DEFAULT;
    this._filterModel = filterModel;
    this._moreButtonComponent = null;
    this._siteSortComponent = null;
    this._noMovieComponent = null;

    this._popUpPosition = 0;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._renderPopUp = this._renderPopUp.bind(this);
    this._onEscKeyUp = this._onEscKeyUp.bind(this);
    this._closePopUp = this._closePopUp.bind(this);
    this._setAddToWatchList = this._setAddToWatchList.bind(this);
    this._setAlreadyWatched = this._setAlreadyWatched.bind(this);
    this._setAddToFavorite = this._setAddToFavorite.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._siteMenuComponent = new SiteMenuView(this._getMovies());

    render(this._movieListContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);

    render(this._movieListContainer, this._siteFilmContainerComponent, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListSection, RenderPosition.BEFOREEND);
    render(this._filmListSection, this._filmListSectionContainer, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListMost, RenderPosition.BEFOREEND);
    render(this._filmListMost, this._filmListMostContainer, RenderPosition.BEFOREEND);

    render(this._siteFilmContainerComponent, this._filmListTop, RenderPosition.BEFOREEND);
    render(this._filmListTop, this._filmListTopContainer, RenderPosition.BEFOREEND);

    this._renderList();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this._moviesModel.updateMovie(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComentary(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComentary(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearList();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._clearList({resetRenderedMovieCount: true, resetSortType: true});
        this._renderList();
        break;
    }
  }

  _getMovies() {
    this._filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredTasks = sort[this._filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE:
        return movies.sort((a, b) => a.filmYear < b.filmYear && 1 || -1);
      case SortType.RATING:
        return movies.sort((a, b) => a.rating < b.rating && 1 || -1);
    }

    return filteredTasks;
  }

  _setAddToWatchList(movie) {
    this._handleViewAction(
      Object.assign({}, movie, {
        'user_details': {
          watchlist: !movie.user_details.watchlist,
          alreadyWatched: movie.user_details.alreadyWatched,
          favorite: movie.user_details.favorite,
        },
      },
      ),
    );
    this._sitePopUp.getElement().scrollTo(0, this._popUpPosition);
  }

  _setAlreadyWatched(movie) {
    this._handleViewAction(
      Object.assign({}, movie, {
        'user_details': {
          watchlist: movie.user_details.watchlist,
          alreadyWatched: !movie.user_details.alreadyWatched,
          favorite: movie.user_details.favorite,
        },
      },
      ),
    );
    this._sitePopUp.getElement().scrollTo(0, this._popUpPosition);
  }

  _setAddToFavorite(movie) {
    this._handleViewAction(
      Object.assign({}, movie, {
        'user_details': {
          watchlist: movie.user_details.watchlist,
          alreadyWatched: movie.user_details.alreadyWatched,
          favorite: !movie.user_details.favorite,
        },
      },
      ),
    );
    this._sitePopUp.getElement().scrollTo(0, this._popUpPosition);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList({resetRenderedTaskCount: true});
    this._renderList();
  }

  _renderSort() {
    if (this._siteSortComponent !== null) {
      this._siteSortComponent = null;
    }

    this._siteSortComponent = new SiteSortView(this._currentSortType);
    this._siteSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._movieListContainer, this._siteSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPopUp(movie) {
    if (this._sitePopUp) {
      this._closePopUp();
    }
    document.addEventListener('keyup', this._onEscKeyUp);
    document.body.classList.add('hide-overflow');
    this._prevSitePopUp = this._sitePopUp;

    this._sitePopUp = new SitePopUpView(movie);

    render(this._movieListContainer, this._sitePopUp, RenderPosition.BEFOREEND);

    this._sitePopUp.setAddToWatchListHandler(() => this._setAddToWatchList(movie));
    this._sitePopUp.setAlreadyWatchedHandler(() => this._setAlreadyWatched(movie));
    this._sitePopUp.setAddToFavoritesHandler(() => this._setAddToFavorite(movie));

    this._sitePopUp.setCloseButtonHandler(this._closePopUp);
    this._sitePopUp.setAddEmojiHandler();
    this._sitePopUp.setFormSubmitHandler();
    this._sitePopUp.setDescriptionTextareaHandler();

    if(this._prevSitePopUp === null) {
      return render(this._movieListContainer, this._sitePopUp, RenderPosition.BEFOREEND);
    }
    remove(this._prevSitePopUp);
  }

  _renderMovie(movie) {
    const moviePresenter = new MoviePresenter(this._filmListSectionContainer, this._renderPopUp, this._setAddToWatchList, this._setAlreadyWatched, this._setAddToFavorite);
    moviePresenter.init(movie);
    this._moviePresenter.set(movie.id, moviePresenter);
  }

  _renderMovies(movies) {
    movies.forEach((movie) => this._renderMovie(movie));
  }

  _renderNoMovies() {
    this._noMovieComponent = new NoMovies(this._filterType);
    render(this._filmListSectionContainer, this._noMovieComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoadMoreButton() {
    if (this._moreButtonComponent !== null) {
      this._moreButtonComponent = null;
    }

    this._moreButtonComponent = new SiteMoreButtonView();
    this._moreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);

    render(this._filmListSection, this._moreButtonComponent, RenderPosition.BEFOREEND);
  }

  _closePopUp() {
    this._popUpPosition = this._sitePopUp._scrollPositon;
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

  _handleLoadMoreButtonClick() {
    const movieCount = this._getMovies().length;
    const newRenderedMovieCount = Math.min(movieCount, this._renderMovieCount + FILM_COUNT_PER_STEP);
    const movies = this._getMovies().slice(this._renderMovieCount, newRenderedMovieCount);

    this._renderMovies(movies);
    this._renderMovieCount = newRenderedMovieCount;
    if(this._renderMovieCount>= movieCount) {
      remove(this._moreButtonComponent);
    }
  }

  _clearList({resetRenderedMovieCount = false, resetSortType = false} = {}) {
    const movieCount = this._getMovies().length;

    this._moviePresenter.forEach((presenter) => presenter.destroy());
    this._moviePresenter.clear();

    remove(this._siteSortComponent);
    remove(this._moreButtonComponent);

    if (this._noMovieComponent) {
      remove(this._noMovieComponent);
    }

    if (resetRenderedMovieCount) {
      this._renderMovieCount = FILM_COUNT_PER_STEP;
    } else {
      // На случай, если перерисовка доски вызвана
      // уменьшением количества задач (например, удаление или перенос в архив)
      // нужно скорректировать число показанных задач
      this._renderMovieCount = Math.min(movieCount, this._renderMovieCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderList() {
    const movies = this._getMovies();
    const movieCount = movies.length;

    if (movieCount === 0) {
      return this._renderNoMovies();
    }

    this._renderSort();

    this._renderMovies(movies.slice(0, Math.min(movieCount, this._renderMovieCount)));

    if (movieCount > this._renderMovieCount) {
      this._renderLoadMoreButton();
    }
  }
}
