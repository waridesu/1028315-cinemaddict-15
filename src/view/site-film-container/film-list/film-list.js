import {createElement} from '../../utils/utils';

const createFilmListTemplate = () => '<div class="films-list__container"></div>';

export default class createFilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmListTemplate();
  }

  getElement() {
    if(!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element= null;
  }
}
