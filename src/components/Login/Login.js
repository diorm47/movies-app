import "./Login.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { useCustomFormValidation } from "../../hooks/useCustomFormValidation";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { useUserDetails } from "../../contexts/UserDataProvider";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import { EMAIL_REGEX_PATTERN } from "../../constants/constants";

const Login = ({ setLoginStatus }) => {
  const { setCurrentUser } = useUserDetails();
  const {
    values,
    handleInputChange,
    errors,
    isFormValid,
    resetForm,
    inputStatuses,
  } = useCustomFormValidation();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setLoaderStatus] = useState(false);

  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    setApiError("");

    setLoaderStatus(true);
    mainApi
      .signin(values)
      .then((userData) => {
        localStorage.setItem("token", userData.token);
        setCurrentUser(userData);
        setLoginStatus(true);
        resetForm();
        navigate("/movies", { replace: true });
      })
      .then(() => {
        mainApi.reEnter().then((userData) => {
          setCurrentUser(userData);
        });
      })
      .catch((err) => {
        setApiError(err);
      })
      .finally(() => {
        setLoaderStatus(false);
      });
  };

  return (
    <main className="auth container login_form">
      <NavLink to="/" className="login__link">
        <Logo />
      </NavLink>
      <h1 className="auth__title">Рады видеть!</h1>
      <form
        action="#"
        className="auth__form"
        name="login"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="email" className="auth__field">
          E-mail
          <input
            type="email"
            className={
              inputStatuses.email === undefined || inputStatuses.email
                ? "auth__input"
                : "auth__input auth__input_type_error"
            }
            name="email"
            required
            id="email"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            onChange={handleInputChange}
            value={values.email || ""}
            pattern={EMAIL_REGEX_PATTERN}
          />
          <span className="auth__error">{errors.email}</span>
        </label>
        <label htmlFor="password" className="auth__field">
          Пароль
          <input
            type="password"
            className={
              inputStatuses.password === undefined || inputStatuses.password
                ? "auth__input"
                : "auth__input auth__input_type_error"
            }
            name="password"
            required
            id="password"
            autoComplete="off"
            minLength="2"
            maxLength="200"
            onChange={handleInputChange}
            value={values.password || ""}
          />
          <span className="auth__error">{errors.password}</span>
        </label>

        <span className="auth__api-error">{apiError}</span>

        {isLoading ? (
          <Preloader />
        ) : (
          <button
            className={
              isFormValid
                ? "register__submit"
                : "register__submit register__submit_disabled"
            }
            type="submit"
            disabled={!isFormValid}
          >
            Войти
          </button>
        )}
        <p className="auth__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="auth__link">
            Регистрация
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Login;
