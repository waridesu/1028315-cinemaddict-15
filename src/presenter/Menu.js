import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../view/utils/render';
import SiteSortView from '../view/site-sort';

export default class siteMenu {
  constructor(menuContainer, sortDefault, sortDate, sortRating) {
    this._menuContainer = menuContainer;
    this._siteSortComponent = new SiteSortView();
    this._siteMenuComponent = null;
    this._sortDefault = sortDefault;
    this._sortDate = sortDate;
    this._sortRating = sortRating;
  }

  init(details) {
    this._siteMenuComponent = new SiteMenuView(details);
    render(this._menuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._menuContainer, this._siteSortComponent, RenderPosition.BEFOREEND);

    this._siteSortComponent.sortByDefault(() => this._sortDefault());
    this._siteSortComponent.sortByDate(() => this._sortDate());
    this._siteSortComponent.sortByRating(() => this._sortRating());
  }
}
