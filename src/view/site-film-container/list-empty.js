import AbstractView from '../abstract.js';
import {SortType} from '../utils/const';

const NoMovieTextType = {
  [SortType.DATE]: 'No film by date',
  [SortType.RATING]: 'No film be rating',
};

const createSiteListEmptyTemplate = (filterType) => {
  const noMovieTextValue = NoMovieTextType[filterType];

  return `<h2 class="films-list__title">${noMovieTextValue}</h2>`;
};

export default class NoMovies extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createSiteListEmptyTemplate(this._data);
  }
}
