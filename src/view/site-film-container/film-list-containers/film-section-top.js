import AbstractView from '../../abstract.js';

const createFilmListTemplate = () => `<section class="films-list films-list--extra">
<h2 class="films-list__title">Top rated</h2>
</section>`;

export default class FilmListTop extends AbstractView {
  getTemplate() {
    return createFilmListTemplate();
  }
}
