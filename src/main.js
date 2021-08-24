import {createUserAvatarTemplate} from './view/user-avatar.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/site-sort.js';
import {createFooterTemplate} from './view/site-fotter.js';
import {createSiteFilmContainerTemplate} from './view/site-film-container/site-film-container.js';
import {createSiteFilmCardTemplate} from './view/site-film-container/site-film-card/site-film-card.js';
import {createMoreButtonTemplate} from './view/site-more-button.js';
import {createSitePopUpTemplate} from './view/site-popout/site-popup.js';
import {generateCard} from './view/mock/card-data.js';

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const FILM_COUNT_PER_STEP = 5;
const dataArray = new Array(20).fill().map(generateCard);

const siteUserAvatarElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterSectionElement = document.querySelector('.footer__statistics');
const siteBodyElement = document.querySelector('body');

render(siteUserAvatarElement, createUserAvatarTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(dataArray.length, dataArray), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createSiteFilmContainerTemplate(), 'beforeend');

const siteFilmContainerElement = document.querySelectorAll('.films-list .films-list__container')[0];
const siteFilmTopContainerElement = document.querySelectorAll('.films-list .films-list__container')[1];
const siteFilmMostContainerElement = document.querySelectorAll('.films-list .films-list__container')[2];
const siteFilmButtonContainerElement = document.querySelector('.films-list');

const MORE_FILMS_COUNT = 2;
for (let index = 0; index<Math.min(dataArray.length, FILM_COUNT_PER_STEP); index++) {
  render(siteFilmContainerElement, createSiteFilmCardTemplate(dataArray[index]), 'beforeend');
}


if (dataArray.length > FILM_COUNT_PER_STEP) {
  let renderCardCount = FILM_COUNT_PER_STEP;

  render(siteFilmButtonContainerElement, createMoreButtonTemplate(), 'beforeend');

  const moreButton = document.querySelector('.films-list__show-more');

  if(moreButton) {
    moreButton.addEventListener('click', (event) => {
      event.preventDefault();
      dataArray
        .slice(renderCardCount, renderCardCount + FILM_COUNT_PER_STEP)
        .forEach((card) => render(siteFilmContainerElement, createSiteFilmCardTemplate(card), 'beforeend'));

      renderCardCount += FILM_COUNT_PER_STEP;
      if (renderCardCount >= dataArray.length) {
        moreButton.remove();
      }
    });
  }
}

for (let i = 0; i < MORE_FILMS_COUNT; i++) {
  render(siteFilmTopContainerElement, createSiteFilmCardTemplate(dataArray[i]), 'beforeend');
}
for (let i = 0; i < MORE_FILMS_COUNT; i++) {
  render(siteFilmMostContainerElement, createSiteFilmCardTemplate(dataArray[i]), 'beforeend');
}

render(siteFooterSectionElement, createFooterTemplate(dataArray.length), 'beforeend');
render(siteBodyElement, createSitePopUpTemplate(dataArray[Math.floor(Math.random()* (dataArray.length - 1) + 1)]), 'beforeend');
