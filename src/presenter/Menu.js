import SiteMenuView from '../view/site-menu';
import {render, RenderPosition} from '../view/utils/render';

export default class MovieList {
  constructor(menuContainer, lenght, array) {
    this._menuContainer = menuContainer;
    this._siteMenuComponent = new SiteMenuView(lenght, array); // dataArray.length, dataArray
  }

  init(listMovies) {
    this._movieListContainer = listMovies.slice();
    render(this._menuContainer, this._siteMenuComponent, RenderPosition.BEFOREEND);
    render(this._menuContainer, this._siteSortComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {}

  _renderMenu() {}

}
