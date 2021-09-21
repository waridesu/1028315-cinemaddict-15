import {generateCard} from './view/mock/card-data.js';
import MoviePresenter from './presenter/MovieList.js';
import MoviesModel from './model/movies.js';
import FilterModel from './model/filter.js';
import Filter from './presenter/Filter.js';

const dataArray = new Array(20).fill().map(generateCard);
const moviesModel = new MoviesModel();
moviesModel.setMovies(dataArray);

const filterModel = new FilterModel();

const siteMainElement = document.querySelector('.main');

const movieListPresenter = new MoviePresenter(siteMainElement, moviesModel, filterModel);
const menuPresenter = new Filter(siteMainElement, moviesModel, filterModel);

/*const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ALL_MOVIES:
      remove(statisticsComponent);
      movieListPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      movieListPresenter.init();
      siteMenuComponent.getElement().querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.WATCHLIST:
      boardPresenter.init();
      remove(statisticsComponent);
      break;
    case MenuItem.HISTORY:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    case MenuItem.FAVORITES:
      boardPresenter.destroy();
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    case MenuItem.STATS:
      movieListPresenter.destroy();
      let statisticsComponent;
      statisticsComponent = new StatisticsView(tasksModel.getTasks());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
  }
};*/
menuPresenter.init();
movieListPresenter.init();
