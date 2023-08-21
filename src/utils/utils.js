import {
  MOBILE_SCREEN_WIDTH,
  TABLET_SCREEN_WIDTH,
  DESKTOP_CARDS_AMOUNT,
  TABLET_CARDS_AMOUNT,
  MOBILE_CARDS_AMOUNT,
  SHORTS_DURATION,
} from "../constants/constants";

export const getCardsAmount = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= MOBILE_SCREEN_WIDTH) {
    return MOBILE_CARDS_AMOUNT;
  } else if (screenWidth <= TABLET_SCREEN_WIDTH) {
    return TABLET_CARDS_AMOUNT;
  }

  return DESKTOP_CARDS_AMOUNT;
};

// Фильтрация фильмов
const checkMovieDuration = (
  movieDuration,
  isShortsIncluded,
  shortsDurationCriteria = SHORTS_DURATION
) => {
  return (
    (isShortsIncluded && movieDuration <= shortsDurationCriteria) ||
    (!isShortsIncluded && movieDuration > shortsDurationCriteria)
  );
};

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
};

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (
    checkMovieDuration(movie.duration, includeShorts) &&
    filterMovieByQuerry(movie, querry)
  );
};
