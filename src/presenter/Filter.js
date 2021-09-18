import FilterView from '../view/site-sort';
import {render, RenderPosition, replace, remove} from '../view/utils/render';
import {SortType, UpdateType} from '../view/utils/const.js';
import {sort} from '../view/utils/sort';

export default class Filter {
  constructor(filterContainer, filterModel, tasksModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._tasksModel = tasksModel;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._tasksModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._filterModel.getFilter());
    this._filterComponent.setSortTypeChangeHandler(this._handleFilterTypeChange);

    if (prevFilterComponent === null) {
      return render(this._filterContainer, this._filterComponent, RenderPosition.BEFOREEND);
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
    const tasks = this._tasksModel.getMovies();

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
