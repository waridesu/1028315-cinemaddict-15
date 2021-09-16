import {nanoid} from 'nanoid';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomArrayElement = (arr) => {
  const randomIndex = getRandomInteger(0, arr.length - 1);
  return arr[randomIndex];
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

  return getRandomArrayElement(posterUrls);
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

  return getRandomArrayElement(filmNames);
};

const generateRating = () => getRandomInteger(0, 10);

dayjs.extend(localizedFormat);

const generateFilmYear = () => {
  const filmYears = [
    dayjs().year(1990).format('YYYY'),
    dayjs().year(1992).format('YYYY'),
    dayjs().year(1994).format('YYYY'),
    dayjs().year(1996).format('YYYY'),
    dayjs().year(1998).format('YYYY'),
    dayjs().year(2000).format('YYYY'),
    dayjs().year(2002).format('YYYY'),
  ];

  return getRandomArrayElement(filmYears);
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

  return getRandomArrayElement(filmLengths);
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

  return filmGenres.slice(0, randomIndex);
};

const generateDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'Fusce tristique felis at fermentum pharetra.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  ];

  return getRandomArrayElement(descriptions);
};

const generateComments = () => {
  const comments = [
    {text: 'Not good, not bad', emoji: '', author: 'Don Joe', commentaryDate: dayjs('2020-01-25').format('LLL')},
    {text: 'Film boring', emoji: './images/emoji/sleeping.png', author: 'Anthony Joe', commentaryDate: dayjs('2020-04-25').format('LLL')},
    {text: 'Afoul film', emoji: './images/emoji/angry.png', author: 'Don Willis', commentaryDate: dayjs('2019-07-25').format('LLL')},
    {text: 'Funny plot', emoji: './images/emoji/smile.png', author: 'Adam Kennedy', commentaryDate: dayjs('2019-09-25').format('LLL')},
    {text: 'For no one ', emoji: './images/emoji/puke.png', author: 'Selina Goes', commentaryDate: dayjs('2019-11-25').format('LLL')},
  ];

  const randomIndex = getRandomInteger(0, comments.length - 1);

  return comments.slice(0, randomIndex);
};

export const generateCard = () => ({
  id: nanoid(),
  poster: generatePosterUrl(),
  filmName: generateFilmName(),
  rating: generateRating(),
  filmYear: generateFilmYear(),
  filmLength: generateFilmLength(),
  filmGenre: generateFilmGenre(),
  description: generateDescription(),
  comments: generateComments(),
  'user_details': {
    'watchlist': !Math.round(Math.random()),
    'alreadyWatched': !Math.round(Math.random()),
    'favorite': !Math.round(Math.random()),
  },
});
