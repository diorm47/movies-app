import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { NavLink, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../images/logo.svg";
//Header — компонент, который отрисовывает шапку сайта на страницу. Шапка на главной странице, как и на
//других страницах, должна менять отображение, если пользователь авторизован или не авторизован  Такое
//поведение нужно сразу предусмотреть в вёрстке, даже несмотря на то, что сама авторизация ещё
//не реализована.

const Header = ({ isLogged }) => {
  const { pathname } = useLocation();

  return (
    <header
      className={pathname === "/" ? "header header_type_promo" : "header"}
    >
      <NavLink to="/" className="login__link">
        <Logo />
      </NavLink>
      <Navigation isLogged={isLogged} />
    </header>
  );
};

export default Header;
