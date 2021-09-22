import {remove, render, RenderPosition, replace} from '../view/utils/render';
import StatisticView from '../view/statistic';


export default class Statistic {
  constructor(statisticContainer, moviesModel, filterModel) {
    this._statisticContainer = statisticContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._siteStatisticComponent= null;
  }

  init() {
    const prevSiteStatisticComponent = this._siteStatisticComponent;
    this._siteStatisticComponent = new StatisticView();
    if (prevSiteStatisticComponent === null) {
      return render(this._statisticContainer, this._siteStatisticComponent, RenderPosition.BEFOREEND);
    }
    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    replace(this._siteStatisticComponent, prevSiteStatisticComponent);
    remove(prevSiteStatisticComponent);
  }

  destroy() {
    remove(this._siteStatisticComponent);
  }
}
