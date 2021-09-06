import SiteFilmCardView from '../view/site-film-container/site-film-card/site-film-card';
import {remove, render, RenderPosition, replace} from '../view/utils/render';

export default class Movie {
  constructor(MovieListContainer, rerenderData, renderPopup) {
    this._movieListContainer = MovieListContainer;
    this._rerenderData = rerenderData;
    this._renderPopup = renderPopup;

    this._movieComponent = null;
    this._prevMovieComponent = null;
    this._addToWatchList = this._addToWatchList.bind(this);
    this._alreadyWatched = this._alreadyWatched.bind(this);
    this._addToFavorite = this._addToFavorite.bind(this);
    this._openPopup = this._openPopup.bind(this);
  }

  init(movie) {
    this._movie = movie;

    this._prevMovieComponent = this._movieComponent;

    this._movieComponent = new SiteFilmCardView(movie);

    this._movieComponent.setClickHandler(this._openPopup);
    this._movieComponent.setAddToWatchListHandler(this._addToWatchList);
    this._movieComponent.setAlreadyWatchedHandler(this._alreadyWatched);
    this._movieComponent.setAddToFavoritesHandler(this._addToFavorite);

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
    this._renderPopup(this._movie, this._addToWatchList, this._alreadyWatched, this._addToFavorite);
  }

  _addToWatchList() {
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

  _alreadyWatched() {
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

  _addToFavorite() {
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
