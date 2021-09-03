import SiteFilmContainerView from '../view/site-film-container/site-film-container.js';
import SiteFilmCardView from '../view/site-film-container/site-film-card/site-film-card.js';
import SiteMoreButtonView from '../view/site-more-button.js';
import SiteFilmListView from '../view/site-film-container/film-list/film-list.js';
import {remove, render, RenderPosition} from '../view/utils/render';
import SiteSortView from '../view/site-sort';
import FilmListTop from '../view/site-film-container/film-list-containers/film-section-top';
import FilmListMost from '../view/site-film-container/film-list-containers/film-section-most';
import FilmListSection from '../view/site-film-container/film-list-containers/film-section';
import SiteSitePopUpView from '../view/site-popout/site-popup';

const FILM_COUNT_PER_STEP = 5;
const siteBodyElement = document.querySelector('body');

export default class MovieList {
  constructor(movieListContainer) {
    this._movieListContainer = movieListContainer;
    this._siteSortComponent = new SiteSortView();
    this._movieList = [];
    this._siteFilmContainerComponent = new SiteFilmContainerView();
    this._filmListSection = new FilmListSection();
    this._filmListMost = new FilmListMost();
    this._filmListTop = new FilmListTop();
    this._filmListSectionContainer = new SiteFilmListView();
    this._filmListMostContainer = new SiteFilmListView();
    this._filmListTopContainer = new SiteFilmListView();
    this._sitePopUp = null;
    this._closePopUp = this._closePopUp.bind(this);
    this._onEscKeyUp = this._onEscKeyUp.bind(this);
  }

  init(listMovies) {
    this._movieList = listMovies.slice();
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

  _renderSort() {}

  _renderPopUp(movie) {
    if (this._sitePopUp) {
      this._closePopUp();
    }
    document.addEventListener('keyup', this._onEscKeyUp);
    document.body.classList.add('hide-overflow');
    this._sitePopUp = new SiteSitePopUpView(movie);
    render(siteBodyElement, this._sitePopUp, RenderPosition.BEFOREEND);
    this._sitePopUp.setCloseButtonHandler(() => {
      document.removeEventListener('keyup', this._onEscKeyUp);
      this._closePopUp();
    });
  }

  _closePopUp() {
    remove(this._sitePopUp);
    document.body.classList.remove('hide-overflow');
    this._sitePopUp = null;
  }

  _onEscKeyUp(event) {
    if (event.key === 'Escape' || event.key === 'Esc') {
      event.preventDefault();
      this._closePopUp();
      document.removeEventListener('keyup', this._onEscKeyUp);
    }
  }

  _renderMovie(movie) {
    const filmComponent = new SiteFilmCardView(movie);

    filmComponent.setClickHandler(() => {
      this._renderPopUp(movie);
    });

    render(this._filmListSectionContainer, filmComponent, RenderPosition.BEFOREEND);

  }

  _renderMovies(from, to) {
    this._movieList
      .slice(from, to)
      .forEach((boardTask) => this._renderMovie(boardTask));
  }

  _renderNoMovie() {}

  _renderLoadMoreButton() {}

  _renderList() {
    if (this._movieList.length > FILM_COUNT_PER_STEP) {
      let renderCardCount = FILM_COUNT_PER_STEP;
      const moreButton = new SiteMoreButtonView();

      render(this._filmListSection, moreButton, RenderPosition.BEFOREEND);

      if (moreButton) {
        moreButton.setClickHandler(() => {
          this._movieList
            .slice(renderCardCount, renderCardCount + FILM_COUNT_PER_STEP)
            .forEach((card) => this._renderMovie(card));

          renderCardCount += FILM_COUNT_PER_STEP;
          if (renderCardCount >= this._movieList.length) {
            remove(moreButton);
          }
        });
      }
    }
    this._renderSort();
    this._renderMovies(0, Math.min(this._movieList.length, FILM_COUNT_PER_STEP));
    if(this._movieList.length > FILM_COUNT_PER_STEP) {
      this._renderLoadMoreButton();
    }
  }
}
