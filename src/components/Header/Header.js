import './Header.css';
import Logo from "../Logo/Logo";
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

const Header = ({ isLogged }) => {
  const { pathname } = useLocation();

  return (
    <header className={ pathname === "/" ? "header header_type_promo" : "header"}>
      <Logo />
      <Navigation
        isLogged={isLogged}
      />
    </header>
  )
};

export default Header;
