import {createUserAvatarTemplate} from './view/user-avatar.js';
import {createSiteMenuTemplate} from './view/site-menu.js';
import {createSortTemplate} from './view/site-sort.js';
import {createSiteContentTemplate} from './view/site-content.js';
import {createFotterTemplate} from './view/site-fotter.js';
import {createSitePopUpTemplate} from './view/site-popup.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteUserAvatarElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterSectionElement = document.querySelector('.footer__statistics');
const siteBodyElement = document.querySelector('body');

render(siteUserAvatarElement, createUserAvatarTemplate(), 'beforeend');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createSortTemplate(), 'beforeend');
render(siteMainElement, createSiteContentTemplate(), 'beforeend');
render(siteFooterSectionElement, createFotterTemplate(), 'beforeend');
render(siteBodyElement, createSitePopUpTemplate(), 'beforeend');
