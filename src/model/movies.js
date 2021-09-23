import AbstractObserver from '../view/utils/abstract-observer';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies){
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies(){
    return this._movies;
  }

  _getIndex(update) {
    return this._movies.findIndex((task) => task.id === update.id);
  }

  updateMovie(updateType, update) {
    const index = this._getIndex(update);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  // I know that wrong, but dont know how right
  addCommentary(updateType, update) {
    const index = this._getIndex(update);

    if (index === -1) {
      throw new Error('Can\'t addComment unExisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  // same here
  deleteCommentary(updateType, update) {
    const index = this._getIndex(update);

    if (index === -1) {
      throw new Error('Can\'t addComment unExisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];
    this._notify(updateType);
  }

  static adaptToServer(movie) {
    const adaptedMovie = Object.assign(
      {},
      movie.user_details,
      {
        'watchlist': movie.user_details.watchlist,
        'already_watched': movie.user_details.watchlist.already_watched,
        'watching_date': movie.user_details.watching_date instanceof Date ? movie.user_details.watching_date.toISOString() : null, // На сервере дата хранится в ISO формате
        'favorite': movie.user_details.favorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedMovie.user_details.watchlist;
    delete adaptedMovie.user_details.watchlist.already_watched;
    delete adaptedMovie.user_details.watching_date;
    delete adaptedMovie.user_details.favorite;

    return adaptedMovie;
  }
}
