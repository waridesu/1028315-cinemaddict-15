import {FilterType, SortType} from './const';

export const sort = {
  [SortType.DEFAULT]: (movies) => movies,
  [SortType.DATE]: (movies) => movies.sort((a, b) => a.filmYear < b.filmYear && 1 || -1),
  [SortType.RATING]: (movies) => movies.sort((a, b) => a.rating < b.rating && 1 || -1),
};

export const filter = {
  [FilterType.ALL_MOVIES]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie)=> movie.user_details.watchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie)=> movie.user_details.alreadyWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie)=> movie.user_details.favorite),
};
