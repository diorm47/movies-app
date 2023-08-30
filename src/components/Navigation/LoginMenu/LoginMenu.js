import { useNavigate } from 'react-router-dom';
import './LoginMenu.css';

const LoginMenu = () => {
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

export default LoginMenu;
