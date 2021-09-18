import {generateCard} from './view/mock/card-data.js';
import MoviePresenter from './presenter/MovieList.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import FilterPresenter from  './presenter/Filter';

const dataArray = new Array(20).fill().map(generateCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(dataArray);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');
const siteNavigationElement = document.querySelector('.main-navigation');

const movieListPresenter = new MoviePresenter(siteMainElement, moviesModel, filterModel);
const filterPresenter = new FilterPresenter(siteNavigationElement, filterModel, moviesModel);
movieListPresenter.init();
filterPresenter.init();
