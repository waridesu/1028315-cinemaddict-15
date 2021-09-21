import AbstractObserver from '../view/utils/abstract-observer.js';
import {FilterType, SortType} from '../view/utils/const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeSort = SortType.DEFAULT;
    this._activeFilter = FilterType.ALL_MOVIES;
  }

  setSort(updateType, sort) {
    this._activeSort = sort;
    this._notify(updateType, sort);
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getSort() {
    return this._activeSort;
  }

  getFilter() {
    return this._activeFilter;
  }


}
