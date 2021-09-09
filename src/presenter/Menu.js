import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../view/utils/render';
import SiteSortView from '../view/site-sort';

export default class SiteMenu {
  constructor(menuContainer, handel) {
    this._menuContainer = menuContainer;
    this._siteSortComponent = new SiteSortView();
    this._siteMenuComponent = null;
    this._handleSortTypeChange = handel;

  }

  init(details) {
    this._siteMenuComponent = new SiteMenuView(details);
    render(this._menuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._menuContainer, this._siteSortComponent, RenderPosition.BEFOREEND);

    this._siteSortComponent.setSortTypeChangeHandler(() => this._handleSortTypeChange);
  }
}
