export const createSiteMenuTemplate = (number) => (
  `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item">All movies<span class="main-navigation__item-count">${number}</span></a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${number/2}</span></a>
      <a href="#history" class="main-navigation__item main-navigation__item--active">History <span class="main-navigation__item-count">${number/4}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${number/5}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`
);
