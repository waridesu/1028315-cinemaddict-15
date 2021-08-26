import {createElement} from './utils/utils';

const createMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class Button {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMoreButtonTemplate();
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
