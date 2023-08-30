import { useEffect, useState } from "react";
import { useBookmarkedMovies } from "../../contexts/BookmarkedMoviesProvider";
import { useDelayedFunction } from "../../hooks/useDelayedFunction";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { getCardsAmount, movieFilter } from "../../utils/utils";
import ModalContent from "../Modal/ModalContent";
import ModalOverlay from "../Modal/ModalOverlay";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

const Movies = () => {
  const [searchParams, setSearchParams] = useState({
    querry: "",
    includeShorts: false,
    alreadySeached: false,
  });
  const [isLoading, setLoadingStatus] = useState(false);
  const [movieList, updateMovieList] = useState([]);
  const [shownMovies, updateShownMovies] = useState([]);
  const [amountOfCards, updateAmountOfCards] = useState(getCardsAmount());
  const [moreBtnVisibility, updateMoreBtnVisibility] = useState(true);
  const [serachedMovies, setSearchedMovies] = useState([]);
  const {setSavedMovies } = useBookmarkedMovies();
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalText, setModalText] = useState("");
  const [isEmptyQuerry, setIsEmptyQuerry] = useState(false);

  useEffect(() => {
    setLoadingStatus(true);
    mainApi
      .getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        setIsModalOpened(true);
        setModalText(err);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, [setSavedMovies]);
  useEffect(() => {
    if (!searchParams.querry) return;

    const currentSearchedMovies = movieList.filter((movie) =>
      movieFilter(movie, searchParams)
    );
    setSearchedMovies(currentSearchedMovies);
  }, [searchParams, movieList]);

  const handleResize = () => {
    updateAmountOfCards(getCardsAmount());
  };

  const debouncedResize = useDelayedFunction(handleResize);

  const handleModalClose = () => {
    setIsModalOpened(false);
    setModalText("");
  };

  useEffect(() => {
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, [debouncedResize]);

  useEffect(() => {
    const search = JSON.parse(localStorage.getItem("search"));
    if (search) setSearchParams(search);

    const storageMovies = JSON.parse(localStorage.getItem("movies"));
    if (storageMovies) {
      updateMovieList(storageMovies);
      return;
    }

    setLoadingStatus(true);
    moviesApi
      .getAllMovies()
      .then((movies) => {
        updateMovieList(movies);
        localStorage.setItem("movies", JSON.stringify(movies));
      })
      .catch((err) => {
        setIsModalOpened(true);
        setModalText(err);
      })
      .finally(() => {
        setLoadingStatus(false);
      });
  }, []);

  useEffect(() => {
    updateShownMovies(serachedMovies.slice(0, amountOfCards.totalCards));
  }, [amountOfCards, serachedMovies]);

  const handleMoreButtonClick = () => {
    const moviesToShow = serachedMovies.slice(
      shownMovies.length,
      shownMovies.length + amountOfCards.extraCards
    );

    updateShownMovies([...shownMovies, ...moviesToShow]);
  };

  useEffect(() => {
    updateMoreBtnVisibility(shownMovies.length < serachedMovies.length);
  }, [shownMovies, serachedMovies]);

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const { querry, shorts } = evt.target.elements;

    if (!querry.value) {
      setIsEmptyQuerry(true);
      return;
    }

    setIsEmptyQuerry(false);

    const currentSearch = {
      querry: querry.value,
      includeShorts: shorts.checked,
      alreadySeached: true,
    };
    localStorage.setItem("search", JSON.stringify(currentSearch));
    setSearchParams(currentSearch);
  };

  return (
    <main className="movies container">
      <SearchForm
        searchParams={searchParams}
        handleSubmit={handleSearchSubmit}
        setSearchParams={setSearchParams}
        isEmptyQuerry={isEmptyQuerry}
      />

      <ModalOverlay isModalOpened={isModalOpened}>
        <ModalContent onClose={handleModalClose} modalText={modalText} />
      </ModalOverlay>

      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesData={shownMovies}
          isAlreadySeached={searchParams.alreadySeached}
        />
      )}

      {moreBtnVisibility ? (
        <button
          className="movies__more"
          type="button"
          onClick={handleMoreButtonClick}
        >
          Ещё
        </button>
      ) : null}
    </main>
  );
};

export default Movies;
