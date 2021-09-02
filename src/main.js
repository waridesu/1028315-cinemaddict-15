import {generateCard} from './view/mock/card-data.js';
import MovieList from './presenter/MovieList';
/*
const siteBodyElement = document.querySelector('body');

let popUpComponent;

const closePopUpComponent = () => {
  remove(popUpComponent);
  document.body.classList.remove('hide-overflow');
  popUpComponent = null;
};

const onEscKeyUp = (event) => {
  if (event.key === 'Escape' || event.key === 'Esc') {
    event.preventDefault();
    closePopUpComponent();
    document.removeEventListener('keyup', onEscKeyUp);
  }
};

const openPopUpComponent = (task) => {
  if (popUpComponent) {
    closePopUpComponent();
  }
  document.addEventListener('keyup', onEscKeyUp);
  document.body.classList.add('hide-overflow');
  popUpComponent = new SiteSitePopUpView(task);
  render(siteBodyElement, popUpComponent, RenderPosition.BEFOREEND);
  popUpComponent.setCloseButtonHandler(() => {
    document.removeEventListener('keyup', onEscKeyUp);
    closePopUpComponent();
  });
};

const renderTask = (filmListElement, task) => {
  const filmComponent = new SiteFilmCardView(task);

  filmComponent.setClickHandler(() => {
    openPopUpComponent(task);
  });

  render(filmListElement, filmComponent, RenderPosition.BEFOREEND);
};

const FILM_COUNT_PER_STEP = 5;
const dataArray = new Array(20).fill().map(generateCard);

const siteUserAvatarElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterSectionElement = document.querySelector('.footer__statistics');

render(siteUserAvatarElement, new SiteAvatarView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteMenuView(dataArray.length, dataArray), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteSortView(), RenderPosition.BEFOREEND);
render(siteMainElement, new SiteFilmContainerView(), RenderPosition.BEFOREEND);

const siteFilmTopContainerElement = document.querySelectorAll('.films-list .films-list__container')[0];
const siteFilmMostContainerElement = document.querySelectorAll('.films-list .films-list__container')[1];
const siteFilmButtonContainerElement = document.querySelector('.films-list');

const filmListComponent = new SiteFilmListView();
render(siteFilmButtonContainerElement, filmListComponent, RenderPosition.BEFOREEND);

const MORE_FILMS_COUNT = 2;

if (dataArray.length) {
  for (let index = 0; index < Math.min(dataArray.length, FILM_COUNT_PER_STEP); index++) {
    renderTask(filmListComponent, dataArray[index]);
  }
  for (let i = 0; i < MORE_FILMS_COUNT; i++) {
    renderTask(siteFilmTopContainerElement, dataArray[i]);
  }

  for (let i = 0; i < MORE_FILMS_COUNT; i++) {
    renderTask(siteFilmMostContainerElement, dataArray[i]);
  }
} else {
  render(siteFilmButtonContainerElement, new ListEmptyView('There are no movies in our database'), RenderPosition.BEFOREEND);
}


if (dataArray.length > FILM_COUNT_PER_STEP) {
  let renderCardCount = FILM_COUNT_PER_STEP;
  const moreButton = new SiteMoreButtonView();

  render(siteFilmButtonContainerElement, moreButton, RenderPosition.BEFOREEND);

  if (moreButton) {
    moreButton.setClickHandler(() => {
      dataArray
        .slice(renderCardCount, renderCardCount + FILM_COUNT_PER_STEP)
        .forEach((card) => renderTask(filmListComponent, card));

      renderCardCount += FILM_COUNT_PER_STEP;
      if (renderCardCount >= dataArray.length) {
        remove(moreButton);
      }
    });
  }
}

render(siteFooterSectionElement, new SiteFooterView(dataArray.length), RenderPosition.BEFOREEND);*/
const siteMainElement = document.querySelector('.main');
const dataArray = new Array(20).fill().map(generateCard);

const MovieListPresenter = new MovieList(siteMainElement);

MovieListPresenter.init(dataArray);
