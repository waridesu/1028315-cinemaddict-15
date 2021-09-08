import AbstractView from '../../abstract.js';

const createFilmListTemplate = () => `<section class="films-list films-list--extra">
<h2 class="films-list__title">Most commented</h2>
</section>`;

export default class FilmListMost extends AbstractView {
  getTemplate() {
    return createFilmListTemplate();
  }
}
