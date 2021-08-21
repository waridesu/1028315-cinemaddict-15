const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generatePosterUrl = () => {
  const posterUrls = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posterUrls.length - 1);

  return posterUrls[randomIndex];
};

const generateFilmName = () => {
  const filmNames = [
    'Made for each other',
    'Popeye meet sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden-arm',
  ];

  const randomIndex = getRandomInteger(0, filmNames.length - 1);

  return filmNames[randomIndex];
};

const generateRating = () => getRandomInteger(0, 10);

const generateFilmYear = () => {
  const filmYears = [
    '1936',
    '1937',
    '1940',
    '1925',
    '1955',
    '1945',
    '1964',
  ];

  const randomIndex = getRandomInteger(0, filmYears.length - 1);

  return filmYears[randomIndex];
};

const generateFilmLength = () => {
  const filmLengths = [
    '16m',
    '54m',
    '1h 55m',
    '1h 59m',
    '1h 32m',
    '1h 18m',
    '1h 21m',
  ];

  const randomIndex = getRandomInteger(0, filmLengths.length - 1);

  return filmLengths[randomIndex];
};

const generateFilmGenre = () => {
  const filmGenres = [
    'Cartoon',
    'Western',
    'Musical',
    'Drama',
    'Mystery',
    'Comedy',
    'Fantasy',
  ];

  const randomIndex = getRandomInteger(0, filmGenres.length - 1);

  return filmGenres [randomIndex];
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'Fusce tristique felis at fermentum pharetra.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  ];

  const randomIndex = getRandomInteger(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateComments = () => {
  const comments = [
    {text: 'Not good, not bad', emoji: '', author: 'Don Joe', commentaryDate: '2019/12/31 1:59'},
    {text: 'Film boring', emoji: './images/emoji/sleeping.png', author: 'Anthony Joe', commentaryDate: '2019/12/31 3:50'},
    {text: 'Afoul film', emoji: './images/emoji/angry.png', author: 'Don Willis', commentaryDate: '2019/12/31 18:42'},
    {text: 'Funny plot', emoji: './images/emoji/smile.png', author: 'Adam Kennedy', commentaryDate: '2019/12/31 10:20'},
    {text: 'For no one ', emoji: './images/emoji/puke.png', author: 'Selina Goes', commentaryDate: '2019/12/31 12:11'},
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments.slice(0, randomIndex);
};

export const generateCard = () => ({
  poster: generatePosterUrl(),
  filmName: generateFilmName(),
  rating: generateRating(),
  filmYear: generateFilmYear(),
  filmLength: generateFilmLength(),
  filmGenre: generateFilmGenre(),
  description: generateDescription(),
  comments: generateComments(),
});
