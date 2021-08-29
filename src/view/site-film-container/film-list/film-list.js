import AbstractView from '../../abstract.js';

const createFilmListTemplate = () => '<div class="films-list__container"></div>';

export default class FilmList extends AbstractView{
  getTemplate() {
    return createFilmListTemplate();
  }
}
