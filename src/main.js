import SiteAvatarView from './view/user-avatar.js';
import SiteMenuView from './view/site-menu.js';
import SiteSortView from './view/site-sort.js';
import SiteFooterView from './view/site-fotter.js';
import SiteFilmContainerView from './view/site-film-container/site-film-container.js';
import SiteFilmCardView from './view/site-film-container/site-film-card/site-film-card.js';
import SiteMoreButtonView from './view/site-more-button.js';
import SiteSitePopUpView from './view/site-popout/site-popup.js';
import SiteFilmListView from './view/site-film-container/film-list/film-list.js';
import { generateCard } from './view/mock/card-data.js';
import { renderElement, RenderPosition } from './view/utils/utils.js';
import ListEmptyView from './view/site-film-container/list-empty.js';

const siteBodyElement = document.querySelector('body');

let popUpComponent;

const closePopUpComponent = ()=> {
  popUpComponent.getElement().remove();
  document.body.classList.remove('hide-overflow');
  popUpComponent = null;
};
document.addEventListener('keyup', closePopUpComponent);
const openPopUpComponent = (task) => {
  if (popUpComponent) {
    closePopUpComponent();
  }
  document.body.classList.add('hide-overflow');
  popUpComponent = new SiteSitePopUpView(task);
  renderElement(siteBodyElement, popUpComponent.getElement(), RenderPosition.BEFOREEND);
  popUpComponent.getElement().querySelector('.film-details__close-btn')
    .addEventListener('click', closePopUpComponent);
};
const renderTask = (filmListElement, task) => {
  const filmComponent = new SiteFilmCardView(task);

  filmComponent.getElement().addEventListener('click', ()=> {
    openPopUpComponent(task);
  });

  renderElement(filmListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);

};
const FILM_COUNT_PER_STEP = 5;
const dataArray = new Array(20).fill().map(generateCard);

const siteUserAvatarElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterSectionElement = document.querySelector('.footer__statistics');

renderElement(siteUserAvatarElement, new SiteAvatarView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteMenuView(dataArray.length, dataArray).getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteSortView().getElement(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new SiteFilmContainerView().getElement(), RenderPosition.BEFOREEND);

const siteFilmTopContainerElement = document.querySelectorAll('.films-list .films-list__container')[0];
const siteFilmMostContainerElement = document.querySelectorAll('.films-list .films-list__container')[1];
const siteFilmButtonContainerElement = document.querySelector('.films-list');

const filmListComponent = new SiteFilmListView();
renderElement(siteFilmButtonContainerElement, filmListComponent.getElement(), RenderPosition.BEFOREEND);

const MORE_FILMS_COUNT = 2;
for (let index = 0; index<Math.min(dataArray.length, FILM_COUNT_PER_STEP); index++) {
  renderTask(filmListComponent.getElement(), dataArray[index]);
}

document.querySelector('.main-navigation').addEventListener('click', (event) => event.forEach((element)=>{
  if(element.target === document.querySelector('.main-navigation__item')) {
    filmListComponent.getElement().remove();
    renderElement(this, new ListEmptyView(element.target.value).getElement(), RenderPosition.BEFOREEND);
  }
}));

if (dataArray.length > FILM_COUNT_PER_STEP) {
  let renderCardCount = FILM_COUNT_PER_STEP;

  renderElement(siteFilmButtonContainerElement, new SiteMoreButtonView().getElement(), RenderPosition.BEFOREEND);

  const moreButton = document.querySelector('.films-list__show-more');

  if(moreButton) {
    moreButton.addEventListener('click', (event) => {
      event.preventDefault();
      dataArray
        .slice(renderCardCount, renderCardCount + FILM_COUNT_PER_STEP)
        .forEach((card) => renderTask(filmListComponent.getElement(), card));

      renderCardCount += FILM_COUNT_PER_STEP;
      if (renderCardCount >= dataArray.length) {
        moreButton.remove();
      }
    });
  }
}

for (let i = 0; i < MORE_FILMS_COUNT; i++) {
  renderTask(siteFilmTopContainerElement, dataArray[i]);
}
for (let i = 0; i < MORE_FILMS_COUNT; i++) {
  renderTask(siteFilmMostContainerElement, dataArray[i]);
}

renderElement(siteFooterSectionElement, new SiteFooterView(dataArray.length).getElement(), RenderPosition.BEFOREEND);
