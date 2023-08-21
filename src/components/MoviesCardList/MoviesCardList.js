import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css'
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
const MoviesCardList = ({ moviesData, isAlreadySeached }) => {
  const { pathname } = useLocation();

  return (
    <section className="movies-section">
      {
        moviesData.length > 0
          ? <ul className="movies-list">
              {
                moviesData.map((movie) => (
                  <MoviesCard
                    key={
                      pathname === "/movies"
                        ? movie.id
                        : movie._id
                    }
                    movieData={movie}
                  />
                ))
              }
            </ul>
          : <span
              className="movies-section__empty"
            >
              {
                isAlreadySeached
                  ? "Ничего не найдено"
                  : ""
              }
            </span>
      }
    </section>
  )
};

export default MoviesCardList;
