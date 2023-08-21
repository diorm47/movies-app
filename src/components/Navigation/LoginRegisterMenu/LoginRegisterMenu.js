import { useNavigate } from 'react-router-dom';
import './LoginRegisterMenu.css';

const LoginRegisterMenu = () => {
  const navigate = useNavigate();

  return (
    <ul className="login-register-menu">
      <li className="login-register-menu__item">
        <button
          type="button"
          onClick={() => navigate("/signup")}
          className="login-register-menu__link"
        >
          Регистрация
        </button>
      </li>
      <li className="login-register-menu__item">
        <button
          type="button"
          onClick={() => navigate("/signin")}
          className="login-register-menu__link login-register-menu__link_type_login"
        >
          Войти
        </button>
      </li>
    </ul>
  )
};

export default LoginRegisterMenu;
