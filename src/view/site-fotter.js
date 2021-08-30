import AbstractView from './abstract.js';

const createFooterTemplate = (number) =>
  `<section class="footer__statistics">
    <p>${number} movies inside</p>
  </section>`;

export default class Footer extends  AbstractView {
  constructor(number) {
    super();
    this._number = number;
  }

  getTemplate() {
    return createFooterTemplate(this._number);
  }
}


