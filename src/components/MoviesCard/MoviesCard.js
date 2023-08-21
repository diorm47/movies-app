import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIES_IMAGES_BASE_URL } from '../../constants/constants';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';
import { mainApi } from '../../utils/MainApi';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
import MovieCardButton from './MovieCardButton/MovieCardButton';
import './MoviesCard.css';

const MoviesCard = ({ movieData }) => {
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleModalClose = () => {
    setIsModalOpened(false);
    setModalText('');
  }

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  const saveMovieHandler = () => {
    const savingMovieData = {
      ...movieData,
      movieId: movieData.id,
      image: `${MOVIES_IMAGES_BASE_URL}${movieData.image.url}`,
      thumbnail: `${MOVIES_IMAGES_BASE_URL}${movieData.image.formats.thumbnail.url}`,
    };
    delete savingMovieData.id;
    delete savingMovieData.created_at;
    delete savingMovieData.updated_at;

    mainApi.saveMovie(savingMovieData)
      .then(movie => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch(err => {
        setIsModalOpened(true);
        setModalText(err);
      })
  }

  const onDeleteMovie = () => {
    const deleteParam = pathname === '/movies'
      ? movieData.id
      : movieData.movieId;
    const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);

    mainApi.deleteMovie(movieToDelete._id)
      .then(deletedMovieData => {
        setSavedMovies(savedMovies.filter(movie => movie._id !== deletedMovieData._id));
      })
      .catch(err => {
        setIsModalOpened(true);
        setModalText(err);
      })
  }

  return (
    <li className="movie-card">

      <Modal isOpen={isModalOpened}>
        <ModalContent onClose={handleModalClose} modalText={modalText} />
      </Modal>
      <div className="movie-card__description">
        <h2 className="movie-card__name">
          {movieData.nameRU}
        </h2>
        <span className="movie-card__duration">
        {movieData.duration} минут
        </span>
      </div>
      <a
        className="movie-card__trailer"
        href={movieData.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movie-card__image"
          src={
            pathname === "/movies"
              ? `${MOVIES_IMAGES_BASE_URL}/${movieData.image.url}`
              : movieData.image
          }
          alt={movieData.nameRU}
        />
      </a>

      <MovieCardButton
        onClickHandler={isMovieSaved ? onDeleteMovie : saveMovieHandler}
        typeClass={isMovieSaved && pathname === "/movies"}
      >
        {pathname === "/movies" ? 'Сохранить' : 'X'}
      </MovieCardButton>
  
    </li>
  )
};

export default MoviesCard;
