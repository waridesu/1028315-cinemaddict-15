import {createUserAvatarTemplate} from './view/user-avatar.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/site-sort.js';
import {createFooterTemplate} from './view/site-fotter.js';
import {createSiteFilmContainerTemplate} from './view/site-film-container/site-film-container.js';
import {createSiteFilmCardTemplate} from './view/site-film-container/site-film-card/site-film-card.js';
import {createMoreButtonTemplate} from './view/site-more-button.js';
import {createSitePopUpTemplate} from './view/site-popup.js';

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteUserAvatarElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterSectionElement = document.querySelector('.footer__statistics');
const siteBodyElement = document.querySelector('body');

render(siteUserAvatarElement, createUserAvatarTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createSiteFilmContainerTemplate(), 'beforeend');

const siteFilmContainerElement = document.querySelectorAll('.films-list .films-list__container')[0];
const siteFilmTopContainerElement = document.querySelectorAll('.films-list .films-list__container')[1];
const siteFilmMostContainerElement = document.querySelectorAll('.films-list .films-list__container')[2];
const siteFilmButtonContainerElement = document.querySelector('.films-list');


const FILMS_COUNT = 5;
const MORE_FILMS_COUNT = 2;
for (let i = 0; i < FILMS_COUNT ; i++) {
  render(siteFilmContainerElement, createSiteFilmCardTemplate(), 'beforeend');
}

render(siteFilmButtonContainerElement, createMoreButtonTemplate(), 'beforeend');

for (let i = 0; i < MORE_FILMS_COUNT ; i++) {
  render(siteFilmTopContainerElement, createSiteFilmCardTemplate(), 'beforeend');
}
for (let i = 0; i < MORE_FILMS_COUNT ; i++) {
  render(siteFilmMostContainerElement, createSiteFilmCardTemplate(), 'beforeend');
}

render(siteFooterSectionElement, createFooterTemplate(), 'beforeend');
render(siteBodyElement, createSitePopUpTemplate(), 'beforeend');
