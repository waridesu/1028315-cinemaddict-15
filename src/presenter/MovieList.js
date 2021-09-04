import SiteFilmContainerView from '../view/site-film-container/site-film-container.js';
import SiteMoreButtonView from '../view/site-more-button.js';
import SiteFilmListView from '../view/site-film-container/film-list/film-list.js';
import {remove, render, RenderPosition} from '../view/utils/render';
import SiteSortView from '../view/site-sort';
import FilmListTop from '../view/site-film-container/film-list-containers/film-section-top';
import FilmListMost from '../view/site-film-container/film-list-containers/film-section-most';
import FilmListSection from '../view/site-film-container/film-list-containers/film-section';
import {updateItem} from '../view/utils/common';
import MoviePresenter from './Movie';

const FILM_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._renderMovieCount = FILM_COUNT_PER_STEP;
    this._moviePresenter = new Map();
    this._siteSortComponent = new SiteSortView();
    this._movieList = [];
    this._siteFilmContainerComponent = new SiteFilmContainerView();
    this._filmListSection = new FilmListSection();
    this._filmListMost = new FilmListMost();
    this._filmListTop = new FilmListTop();
    this._filmListSectionContainer = new SiteFilmListView();
    this._filmListMostContainer = new SiteFilmListView();
    this._filmListTopContainer = new SiteFilmListView();
    this._moreButton = new SiteMoreButtonView();
    this._handleTaskChange = this._handleTaskChange.bind(this);
  }

  init(listMovies) {
    this._movieList = listMovies.slice();

    this._sourcedMovieList = listMovies.slice();
    render(this._movieListContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
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

  _handleTaskChange(updatedFilm) {
    this._movieList = updateItem(this._movieList, updatedFilm);
    this._sourcedMovieList = updateItem(this._sourcedMovieList, updatedFilm);
    this._moviePresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _renderSort() {}

  _renderMovie(movie) {
    const taskPresenter = new MoviePresenter(this._filmListSectionContainer, this._handleTaskChange);
    taskPresenter.init(movie);
    this._moviePresenter.set(movie.id, taskPresenter);
  }

  _renderMovies(from, to) {
    this._movieList
      .slice(from, to)
      .forEach((boardTask) => this._renderMovie(boardTask));
  }

  _renderLoadMoreButton() {
    render(this._filmListSection, this._moreButton, RenderPosition.BEFOREEND);
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
    if(this._movieList.length > this._renderMovieCount) {
      this._renderLoadMoreButton();
    }
  }
}
