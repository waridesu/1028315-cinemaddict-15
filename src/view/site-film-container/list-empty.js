import AbstractView from '../abstract.js';

const createSiteListEmptyTemplate = (props) => `<h2 class="films-list__title">${props}</h2>`;

export default class ListEmpty extends AbstractView {
  constructor(props) {
    super();
    this._props = props;
  }

  getTemplate() {
    return createSiteListEmptyTemplate(this._props);
  }
}
