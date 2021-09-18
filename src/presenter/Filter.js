import FilterView from '../view/site-sort';
import {render, RenderPosition, replace, remove} from '../view/utils/render';
import {SortType, UpdateType} from '../view/utils/const.js';
import {sort} from '../view/utils/sort';
import SiteMenuView from '../view/site-menu';

export default class Filter {
  constructor(filterContainer, moviesModel, filterModel,siteMenuData, sortHandler) {
    this._filterContainer = filterContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._menuData = siteMenuData;
    this._sortTypeHandler = sortHandler;

    this._siteMenuComponent= null;
    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._menuData;
    const prevFilterComponent = this._filterComponent;
    this._siteMenuComponent = new SiteMenuView(this._menuData);
    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    // don't know with all this filtering and it's still filtering watchlist, history, favorites and all
    this._filterComponent.setSortTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      render(this._filterContainer, this._siteMenuComponent, RenderPosition.AFTERBEGIN);
      return;
    }

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

  _getFilters() {
    const tasks = this._moviesModel.getMovies();

    return [
      {
        type: SortType.DEFAULT,
        name: 'DEFAULT',
        count: sort[SortType.DEFAULT](tasks).length,
      },
      {
        type: SortType.DATE,
        name: 'DATE',
        count: sort[SortType.DATE](tasks).length,
      },      {
        type: SortType.RATING,
        name: 'RATING',
        count: sort[SortType.RATING](tasks).length,
      },
    ];
  }
}
