import { useState } from 'react';
import Burger from './Burger/Burger';
import BurgerMenu from './BurgerMenu/BurgerMenu';
import LoggedUserNavigation from './LoggedUserNavigation/LoggedUserNavigation';
import LoginRegisterMenu from './LoginRegisterMenu/LoginRegisterMenu';
import './Navigation.css';

const Navigation = ({ isLogged, isBurger = true }) => {
  const [isBurgerOpened, setIsBurgerOpened] = useState(false);

  const handleOpenBurgerMenu = () => {
    setIsBurgerOpened(true);
  }

  const handleCloseBurgerMenu = () => {
    setIsBurgerOpened(false);
  }

  return (
    <nav className={isLogged && !isBurger ? "navigation navigation_logged" : "navigation"}>

    {
      isLogged
        ? <>
          <Burger onClick={handleOpenBurgerMenu}/>
          <LoggedUserNavigation />
        </>
        : <LoginRegisterMenu />
    }

    <BurgerMenu
      isOpened={isBurgerOpened}
      closeBurger={handleCloseBurgerMenu}
    />

    </nav>
  )
};

export default Navigation;
