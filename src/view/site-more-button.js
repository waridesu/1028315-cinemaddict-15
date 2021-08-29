import AbstractView from './abstract.js';

const createMoreButtonTemplate = () =>
  '<button class="films-list__show-more">Show more</button>';

export default class Button extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createMoreButtonTemplate();
  }

  _clickHandler(event){
    event.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
