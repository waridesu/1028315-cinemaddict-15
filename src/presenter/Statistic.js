import {remove, render, RenderPosition, replace} from '../view/utils/render';
import StatisticView from '../view/statistic';
import {SortType, UpdateType} from '../view/utils/const';
import {sort} from '../view/utils/sort';

export default class Statistic {
  constructor(statisticContainer, moviesModel, filterModel) {
    this._filterContainer = statisticContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._siteStatisticComponent= null;
  }

  init() {
    const prevSiteStatisticComponent = this._siteStatisticComponent;

    this._siteStatisticComponent = new StatisticView();
    if (prevSiteStatisticComponent === null) {
      return render(this._filterContainer, this._siteStatisticComponent, RenderPosition.AFTERBEGIN);
    }
    replace(this._siteStatisticComponent, prevSiteStatisticComponent);
    remove(prevSiteStatisticComponent);
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
