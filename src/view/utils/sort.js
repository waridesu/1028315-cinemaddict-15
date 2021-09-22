import {SortType} from './const';

export const sort = {
  [SortType.DEFAULT]: (movies) => movies,
  [SortType.DATE]: (movies) => movies.sort((a, b) => a.filmYear < b.filmYear && 1 || -1),
  [SortType.RATING]: (movies) => movies.sort((a, b) => a.rating < b.rating && 1 || -1),
};


