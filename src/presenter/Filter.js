import SortView from '../view/site-sort';
import {render, RenderPosition, replace, remove} from '../view/utils/render';
import {FilterType, SortType, UpdateType} from '../view/utils/const.js';
import {filter, sort} from '../view/utils/sort';
import FilterView from '../view/site-filter';

export default class Filter {
  constructor(filterContainer, moviesModel, filterModel) {
    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._filterComponent = null;
    this._sortComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const prevSortComponent = this._sortComponent;
    const prevFilterComponent = this._filterComponent;
    this._filterComponent = new FilterView(this._moviesModel.getMovies(), this._getFilter(), this._filterModel.getFilter());
    this._sortComponent = new SortView(this._getSorts(), this._filterModel.getFilter());

    this._sortComponent.setSortTypeChangeHandler(this._handleFilterTypeChange);

    if (prevSortComponent === null) {
      render(this._filterContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._sortComponent, prevSortComponent);
    remove(prevSortComponent);
    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._filterModel.getFilter() === filterType) {
      return;
    }
    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getSorts() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: SortType.DEFAULT,
        name: 'DEFAULT',
        count: sort[SortType.DEFAULT](movies).length,
      },
      {
        type: SortType.DATE,
        name: 'DATE',
        count: sort[SortType.DATE](movies).length,
      },      {
        type: SortType.RATING,
        name: 'RATING',
        count: sort[SortType.RATING](movies).length,
      },
    ];
  }

  _getFilter() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL_MOVIES,
        name: 'ALL_MOVIES',
        count: filter[FilterType.ALL_MOVIES](movies).length,
      },
      {
        type: FilterType.WATCHLIST,
        name: 'WATCHLIST',
        count: filter[FilterType.WATCHLIST](movies).length,
      },      {
        type: FilterType.HISTORY,
        name: 'HISTORY',
        count: filter[FilterType.HISTORY](movies).length,
      },      {
        type: FilterType.FAVORITES,
        name: 'FAVORITES',
        count: filter[FilterType.FAVORITES](movies).length,
      },
    ];
  }
}
