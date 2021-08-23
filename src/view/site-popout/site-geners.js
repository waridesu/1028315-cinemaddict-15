export const createSiteGeneresTemplate = (genres) => `${genres.length ?
  genres.map((element) => `<span class="film-details__genre">${element}</span>`).join('') :
  '<span class="film-details__genre">No specific genre</span>'}`;
