import AbstractObserver from '../view/utils/abstract-observer';

export default class Movies extends AbstractObserver {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(movies){
    this._movies = movies.slice();
  }

  getMovies(){
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((task) => task.id === update.id);

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
    this._movies = [
      update,
      ...this._movies,
    ];

    this._notify(updateType, update);
  }

  // same here
  deleteCommentary(updateType, update) {
    const index = this._movies.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this._movies = [
      ...this._movies.slice(0, index),
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
