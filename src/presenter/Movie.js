import SiteFilmCardView from '../view/site-film-container/site-film-card/site-film-card';
import {remove, render, RenderPosition, replace} from '../view/utils/render';

export default class Movie {
  constructor(MovieListContainer, renderPopup, setAddToWatchList, setAlreadyWatched, setAddToFavorite ) {
    this._movieListContainer = MovieListContainer;
    this._renderPopup = renderPopup;

    this._movieComponent = null;
    this._prevMovieComponent = null;
    this._setAddToWatchList = setAddToWatchList;
    this._setAlreadyWatched = setAlreadyWatched;
    this._setAddToFavorite = setAddToFavorite;
  }

  init(movie) {
    this._movie = movie;

    this._prevMovieComponent = this._movieComponent;

    this._movieComponent = new SiteFilmCardView(movie);

    this._movieComponent.setClickHandler(() => this._renderPopup(this._movie));
    this._movieComponent.setAddToWatchListHandler(() => this._setAddToWatchList(this._movie));
    this._movieComponent.setAlreadyWatchedHandler(() => this._setAlreadyWatched(this._movie));
    this._movieComponent.setAddToFavoritesHandler(() => this._setAddToFavorite(this._movie));

    if(this._prevMovieComponent === null) {
      return render(this._movieListContainer, this._movieComponent, RenderPosition.BEFOREEND);
    }
    this._replaceMovie();
    remove(this._prevMovieComponent);
  }

  destroy() {
    remove(this._movieComponent);
  }

  _replaceMovie() {
    replace(this._movieComponent, this._prevMovieComponent);
  }

  resetView() {
    this._replaceMovie();
  }
}
