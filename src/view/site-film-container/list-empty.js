import {createElement} from '../utils/utils';

const createSiteListEmptyTemplate = (props) => `<h2 class="films-list__title">${props}</h2>`;

export default class ListEmpty {
  constructor(props) {
    this._props = props;
    this._element = null;
  }

  getTemplate() {
    return createSiteListEmptyTemplate(this._props);
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
