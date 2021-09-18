import {SortType} from './const';

export const sort = {
  [SortType.DEFAULT]: (movie) => movie,
  [SortType.DATE]: (movie) => movie.sort((a, b) => a.filmYear < b.filmYear && 1 || -1),
  [SortType.RATING]: (movie) => movie.sort((a, b) => a.rating < b.rating && 1 || -1),
};
