import { useState } from "react";

import MobileBurgerMenu from "./MobileBurgerMenu/MobileBurgerMenu";
import LoggedUserNavigation from "./LoggedUserNavigation/LoggedUserNavigation";
import LoginMenu from "./LoginMenu/LoginMenu";
import "./Navigation.css";

const Navigation = ({ isLogged, isMobBurger = true }) => {
  const [isMobBurgerOpened, setisMobBurgerOpened] = useState(false);

  const handleOpenMobileBurgerMenu = () => {
    setisMobBurgerOpened(true);
  };

  const handleCloseMobileBurgerMenu = () => {
    setisMobBurgerOpened(false);
  };

  return (
    <nav
      className={
        isLogged && !isMobBurger ? "navigation navigation_logged" : "navigation"
      }
    >
      {isLogged ? (
        <>
          <button
            className="burger-button"
            type="button"
            onClick={handleOpenMobileBurgerMenu}
          />

          <LoggedUserNavigation />
        </>
      ) : (
        <LoginMenu />
      )}

      <MobileBurgerMenu
        isOpened={isMobBurgerOpened}
        closeBurger={handleCloseMobileBurgerMenu}
      />
    </nav>
  );
};

export default Navigation;
