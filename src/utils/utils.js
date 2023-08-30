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

const movieFilters = {
  checkDuration: ({
    duration,
    includeShorts,
    shortsDurationCriteria = SHORTS_DURATION,
  }) => {
    return (
      (includeShorts && duration <= shortsDurationCriteria) ||
      (!includeShorts && duration > shortsDurationCriteria)
    );
  },
  filterByQuerry: ({ nameRU, querry }) => {
    const lowerQuerry = querry.toLowerCase();
    return nameRU.toLowerCase().includes(lowerQuerry);
  },
};

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (
    movieFilters.checkDuration({ ...movie, includeShorts }) &&
    movieFilters.filterByQuerry({ ...movie, querry })
  );
};
