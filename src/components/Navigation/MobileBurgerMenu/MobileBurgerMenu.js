import { NavLink } from 'react-router-dom';
import './MobileBurgerMenu.css';

const MobileBurgerMenu = ({ isOpened, closeBurger }) => {
  return (
    <div className={isOpened ? "burger burger_opened" : "burger"}>
      <button
        className="burger__close"
        type="button"
        onClick={closeBurger}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="7.16016" y="9.28249" width="3" height="22" transform="rotate(-45 7.16016 9.28249)" fill="white"/>
          <rect x="22.7168" y="7.16117" width="3" height="22" transform="rotate(45 22.7168 7.16117)" fill="white"/>
        </svg>
      </button>
      <ul className="burger__list">
        <li className="burger__item">
          <NavLink to="/" className="burger__link burger__link_type_home">Главная</NavLink>
        </li>
        <li className="burger__item">
          <NavLink to="/movies" className="burger__link">Фильмы</NavLink>
        </li>
        <li className="burger__item">
          <NavLink to="/saved-movies" className="burger__link burger__link_type_saved-movies">Сохранённые фильмы</NavLink>
        </li>
      </ul>
      <NavLink to="/profile" className="burger__link burger__link_type_profile">Аккаунт</NavLink>
    </div>
  )
};

export default MobileBurgerMenu;
