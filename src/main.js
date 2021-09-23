import MoviePresenter from './presenter/MovieList.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/Filter.js';
import StatisticPresenter from './presenter/Statistic';
import {FilterType, UpdateType} from './view/utils/const';
import Api from './api.js';

const AUTHORIZATION = 'Basic hS3sfS14qjl2sa7j';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict/';
const api = new Api(END_POINT, AUTHORIZATION);


const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');
const statisticPresenter = new StatisticPresenter(siteMainElement, moviesModel, filterModel);
const menuPresenter = new Filter(siteMainElement, moviesModel, filterModel, api);

const movieListPresenter = new MoviePresenter(siteMainElement, moviesModel, filterModel, api);
const backToList = () => {
  if(!document.querySelector('.films')) {
    movieListPresenter.init();
    menuPresenter.init();
    statisticPresenter.destroy();
  }
};

export const filter = {
  [FilterType.ALL_MOVIES]: (movies) => {
    backToList();
    return movies;},
  [FilterType.WATCHLIST]: (movies) => {
    backToList();
    return movies.filter((movie)=> movie.user_details.watchlist);},
  [FilterType.HISTORY]: (movies) => {
    backToList();
    return movies.filter((movie)=> movie.user_details.alreadyWatched);},
  [FilterType.FAVORITES]: (movies) => {
    backToList();
    return movies.filter((movie)=> movie.user_details.favorite);},
  [FilterType.STATS]: (()=> {
    movieListPresenter.destroy();
    menuPresenter.destroy();
    statisticPresenter.init();
  }),
};
movieListPresenter.init();


api.getMovies()
  .then((tasks) => {
    moviesModel.setMovies(UpdateType.INIT, tasks);

    menuPresenter.init();
  })
  .catch(() => {
    moviesModel.setMovies(UpdateType.INIT, []);
  });
