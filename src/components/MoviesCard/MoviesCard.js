import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FILMS_BASE_URL } from "../../constants/constants";
import { useBookmarkedMovies } from "../../contexts/BookmarkedMoviesProvider";
import { mainApi } from "../../utils/MainApi";
import ModalOverlay from "../Modal/ModalOverlay";
import ModalContent from "../Modal/ModalContent";
import ButtonInsideFilmCard from "./MovieCardButton/MovieCardButton";
import "./MoviesCard.css";

const MoviesCard = ({ filmDetail }) => {
  const { savedMovies, setSavedMovies } = useBookmarkedMovies();
  const { pathname } = useLocation();
  const [isFilmStored, setIsFilmStored] = useState(false);
  const [isPopupShown, setIsPopupShown] = useState(false);
  const [popupText, setPopupText] = useState("");

  const closeModalAction = () => {
    setIsPopupShown(false);
    setPopupText("");
  };

  useEffect(() => {
    setIsFilmStored(
      savedMovies.some(
        (film) =>
          film.movieId === filmDetail.id || film.movieId === filmDetail.movieId
      )
    );
  }, [savedMovies, filmDetail]);

  const handleFilmSave = () => {
    const savingFilmDetail = {
      ...filmDetail,
      movieId: filmDetail.id,
      image: `${FILMS_BASE_URL}${filmDetail.image.url}`,
      thumbnail: `${FILMS_BASE_URL}${filmDetail.image.formats.thumbnail.url}`,
    };
    delete savingFilmDetail.id;
    delete savingFilmDetail.created_at;
    delete savingFilmDetail.updated_at;

    mainApi
      .saveMovie(savingFilmDetail)
      .then((film) => {
        setSavedMovies([...savedMovies, film]);
      })
      .catch((err) => {
        setIsPopupShown(true);
        setPopupText(err);
      });
  };

  const handleFilmDelete = () => {
    const deleteParam =
      pathname === "/movies" ? filmDetail.id : filmDetail.movieId;
    const filmToDelete = savedMovies.find(
      (film) => film.movieId === deleteParam
    );

    mainApi
      .deleteMovie(filmToDelete._id)
      .then((deletedFilmData) => {
        setSavedMovies(
          savedMovies.filter((film) => film._id !== deletedFilmData._id)
        );
      })
      .catch((err) => {
        setIsPopupShown(true);
        setPopupText(err);
      });
  };

  return (
    <li className="movie-card">
      <ModalOverlay isModalOpened={isPopupShown}>
        <ModalContent onClose={closeModalAction} modalText={popupText} />
      </ModalOverlay>
      <div className="movie-card__description">
        <h2 className="movie-card__name">{filmDetail.nameRU}</h2>
        <span className="movie-card__duration">
          {filmDetail.duration} минут
        </span>
      </div>
      <a
        className="movie-card__trailer"
        href={filmDetail.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={
            pathname === "/movies"
              ? `${FILMS_BASE_URL}/${filmDetail.image.url}`
              : filmDetail.image
          }
          alt={filmDetail.nameRU}
        />
      </a>

      <ButtonInsideFilmCard
        onClickHandler={isFilmStored ? handleFilmDelete : handleFilmSave}
        typeClass={isFilmStored && pathname === "/movies"}
      >
        {pathname === "/movies" ? "Сохранить" : "X"}
      </ButtonInsideFilmCard>
    </li>
  );
};

export default MoviesCard;
