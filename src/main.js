import {generateCard} from './view/mock/card-data.js';
import MoviePresenter from './presenter/MovieList.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/Filter.js';
import StatisticPresenter from './presenter/Statistic';
import {FilterType} from './view/utils/const';


const dataArray = new Array(20).fill().map(generateCard);
const moviesModel = new MoviesModel();
moviesModel.setMovies(dataArray);
const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');
const statisticPresenter = new StatisticPresenter(siteMainElement, moviesModel, filterModel);
const menuPresenter = new Filter(siteMainElement, moviesModel, filterModel);

const movieListPresenter = new MoviePresenter(siteMainElement, moviesModel, filterModel);
const backToList = (isEmpty) => {
  if(isEmpty) {
    movieListPresenter.init();
    menuPresenter.init();
    statisticPresenter.destroy();
  }
};

export const filter = {

  [FilterType.ALL_MOVIES]: (movies) => {
    backToList(!movieListPresenter._siteFilmContainerComponent._element);
    return movies;},
  [FilterType.WATCHLIST]: (movies) => {
    backToList(!movieListPresenter._siteFilmContainerComponent._element);
    return movies.filter((movie)=> movie.user_details.watchlist);},
  [FilterType.HISTORY]: (movies) => {
    backToList(!movieListPresenter._siteFilmContainerComponent._element);
    return movies.filter((movie)=> movie.user_details.alreadyWatched);},
  [FilterType.FAVORITES]: (movies) => {
    backToList(!movieListPresenter._siteFilmContainerComponent._element);
    return movies.filter((movie)=> movie.user_details.favorite);},
  [FilterType.STATS]: ((movies) => {
    movieListPresenter.destroy();
    menuPresenter.destroy();
    statisticPresenter.init();
    return movies;
  }),
};

menuPresenter.init();
movieListPresenter.init();


/*document.querySelector('.main-navigation__additional')
  .addEventListener('click', ()=> {
    movieListPresenter.destroy();
    menuPresenter.destroy();
    statisticPresenter.init();
  });*/

/*document.querySelector('.main-navigation__items')
  .addEventListener('click', (evt) => {
    if(evt.target.tagName !=='A'){
      return;
    }
    menuPresenter.init();
    movieListPresenter.init();
  });*/
