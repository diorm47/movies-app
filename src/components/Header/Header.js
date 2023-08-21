import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";
import { useLocation } from "react-router-dom";
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
      <Logo />
      <Navigation isLogged={isLogged} />
    </header>
  );
};

export default Header;
