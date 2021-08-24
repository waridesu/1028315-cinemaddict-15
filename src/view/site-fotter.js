import {createElement} from './utils/utils';

const createFooterTemplate = (number) =>
  `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;

export default class createFooter {
  constructor(number) {
    this._number = number;
    this._element = null;
  }

  getTemplate() {
    return createFooterTemplate(this._number);
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


