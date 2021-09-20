import FilterView from '../view/site-sort';
import {render, RenderPosition, replace, remove} from '../view/utils/render';
import {SortType, UpdateType} from '../view/utils/const.js';
import {sort} from '../view/utils/sort';
import SiteMenuView from '../view/site-menu';

export default class Filter {
  constructor(filterContainer, moviesModel, filterModel) {
    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._siteMenuComponent= null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filter = this._getFilters();
    const prevFilterComponent = this._filterComponent;
    const prevMenuComponent = this._siteMenuComponent;
    this._siteMenuComponent = new SiteMenuView(this._moviesModel.getMovies());
    this._filterComponent = new FilterView(filter, this._filterModel.getFilter());

    this._filterComponent.setSortTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      render(this._filterContainer, this._siteMenuComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
    replace(this._siteMenuComponent, prevMenuComponent);
    remove(prevMenuComponent);
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

  _getFilters() {
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
}
