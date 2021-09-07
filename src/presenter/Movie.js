import SiteFilmCardView from '../view/site-film-container/site-film-card/site-film-card';
import {remove, render, RenderPosition, replace} from '../view/utils/render';

export default class Movie {
  constructor(MovieListContainer, rerenderData, renderPopup) {
    this._movieListContainer = MovieListContainer;
    this._rerenderData = rerenderData;
    this._renderPopup = renderPopup;

    this._movieComponent = null;
    this._prevMovieComponent = null;
    this._setAddToWatchList = this._setAddToWatchList.bind(this);
    this._setAlreadyWatched = this._setAlreadyWatched.bind(this);
    this._setAddToFavorite = this._setAddToFavorite.bind(this);
    this._openPopup = this._openPopup.bind(this);
  }

  init(movie) {
    this._movie = movie;

    this._prevMovieComponent = this._movieComponent;

    this._movieComponent = new SiteFilmCardView(movie);

    this._movieComponent.setClickHandler(this._openPopup);
    this._movieComponent.setAddToWatchListHandler(this._setAddToWatchList);
    this._movieComponent.setAlreadyWatchedHandler(this._setAlreadyWatched);
    this._movieComponent.setAddToFavoritesHandler(this._setAddToFavorite);

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

  _openPopup () {
    this._renderPopup(this._movie, this._setAddToWatchList, this._setAlreadyWatched, this._setAddToFavorite);
  }

  _setAddToWatchList() {
    this._rerenderData(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: !this._movie.user_details.watchlist,
          alreadyWatched: this._movie.user_details.alreadyWatched,
          favorite: this._movie.user_details.favorite,
        },
      },
      ),
    );
  }

  _setAlreadyWatched() {
    this._rerenderData(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: this._movie.user_details.watchlist,
          alreadyWatched: !this._movie.user_details.alreadyWatched,
          favorite: this._movie.user_details.favorite,
        },
      },
      ),
    );
  }

  _setAddToFavorite() {
    this._rerenderData(
      Object.assign({}, this._movie, {
        'user_details': {
          watchlist: this._movie.user_details.watchlist,
          alreadyWatched: this._movie.user_details.alreadyWatched,
          favorite: !this._movie.user_details.favorite,
        },
      },
      ),
    );
  }
}
