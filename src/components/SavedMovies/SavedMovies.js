import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import './SavedMovies.css';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import { mainApi } from '../../utils/MainApi';
import { movieFilter } from '../../utils/utils';
import { useSavedMoviesContext } from '../../contexts/SavedMoviesContextProvider';
import Modal from '../Modal/Modal';
import ModalContent from '../Modal/ModalContent';
// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и
// их количеством.
// MoviesCard — компонент одной карточки фильма.

const SavedMovies = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchParams, setSearchParams] = useState({querry: '', includeShorts: false, alreadySeached: false});
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalText, setModalText] = useState('');

  const handleModalClose = () => {
    setIsModalOpened(false);
    setModalText('');
  }

  useEffect(() => {
    setIsLoading(true);
    mainApi.getSavedMovies()
      .then(res => {
        setSavedMovies(res);
      })
      .catch(err => {
        setIsModalOpened(true);
        setModalText(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [setSavedMovies])

  const handleSearchSubmit = (evt) => {
    evt.preventDefault();
    const {querry, shorts} = evt.target.elements;
    const currentSearch = {querry: querry.value, includeShorts: shorts.checked, alreadySeached: true};
    setSearchParams(currentSearch);
  }

  useEffect(() => {
    const currentSearchedMovies = savedMovies.filter(movie => movieFilter(movie, searchParams));
    setSearchedSavedMovies(currentSearchedMovies);
  }, [searchParams, savedMovies])

  return (
    <main className="saved-movies container">

      <Modal isOpen={isModalOpened}>
        <ModalContent onClose={handleModalClose} modalText={modalText} />
      </Modal>

      <SearchForm
        searchParams={searchParams}
        handleSubmit={handleSearchSubmit}
        setSearchParams={setSearchParams}
        isRequired={false}
      />
      {isLoadind
        ? <Preloader />
        : <MoviesCardList moviesData={searchedSavedMovies} isAlreadySeached={searchParams.alreadySeached} />
      }
    </main>
  )
};

export default SavedMovies;
