import {generateCard} from './view/mock/card-data.js';
import MovieList from './presenter/MovieList';

const siteMainElement = document.querySelector('.main');
const dataArray = new Array(20).fill().map(generateCard);

const MovieListPresenter = new MovieList(siteMainElement);

MovieListPresenter.init(dataArray);
