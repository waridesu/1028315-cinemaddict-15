import AbstractObserver from '../view/utils/abstract-observer.js';
import {SortType} from '../view/utils/const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = SortType.DEFAULT;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }
}
