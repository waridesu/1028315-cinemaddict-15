import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../view/utils/render';

export default class siteMenu {
  constructor(menuContainer) {
    this._menuContainer = menuContainer;
    this._siteMenuComponent = null;
  }

  init(details) {
    this._siteMenuComponent = new SiteMenuView(details);
    render(this._menuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {}

  _renderMenu() {}

}
