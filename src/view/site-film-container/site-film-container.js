import AbstractView from '../abstract.js';

const createSiteFilmContainerTemplate = () => '<section class="films"></section>';

export default class FilmContainer extends AbstractView {
  getTemplate() {
    return createSiteFilmContainerTemplate();
  }
}
