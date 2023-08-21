import "./Login.css";
import Logo from "../Logo/Logo";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { Link, useNavigate } from "react-router-dom";
import { mainApi } from "../../utils/MainApi";
import { useCurrentUserContext } from "../../contexts/CurrentUserContextProvider";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import { PATTERN_EMAIL } from "../../constants/constants";

const Login = ({ setLoginStatus }) => {
  const { setCurrentUser } = useCurrentUserContext();
  const { values, handleChange, errors, isValid, resetForm, inputVilidities } =
    useFormWithValidation();
  const navigate = useNavigate();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoadind, setIsLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setApiErrorMessage("");

    setIsLoading(true);
    mainApi
      .signin(values)
      .then((userData) => {
        localStorage.setItem("token", userData.token);
        setCurrentUser(userData);
        setLoginStatus(true);
        localStorage.setItem("currentId", userData._id);
        resetForm();
        navigate("/movies", { replace: true });
      })
      .then(() => {
        mainApi.reEnter().then((userData) => {
          setCurrentUser(userData);
        });
      })
      .catch((err) => {
        setApiErrorMessage(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <main className="auth container login_form">
      <Logo />
      <h1 className="auth__title">Рады видеть!</h1>
      <form
        action="#"
        className="auth__form"
        name="login"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="email" className="auth__field">
          E-mail
          <input
            type="email"
            className={
              inputVilidities.email === undefined || inputVilidities.email
                ? "auth__input"
                : "auth__input auth__input_type_error"
            }
            name="email"
            required
            id="email"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.email || ""}
            pattern={PATTERN_EMAIL}
          />
          <span className="auth__error">{errors.email}</span>
        </label>
        <label htmlFor="password" className="auth__field">
          Пароль
          <input
            type="password"
            className={
              inputVilidities.password === undefined || inputVilidities.password
                ? "auth__input"
                : "auth__input auth__input_type_error"
            }
            name="password"
            required
            id="password"
            autoComplete="off"
            minLength="2"
            maxLength="200"
            onChange={handleChange}
            value={values.password || ""}
          />
          <span className="auth__error">{errors.password}</span>
        </label>

        <span className="auth__api-error">{apiErrorMessage}</span>

        {isLoadind ? (
          <Preloader />
        ) : (
          <button
            className={
              isValid
                ? "register__submit"
                : "register__submit register__submit_disabled"
            }
            type="submit"
            disabled={!isValid}
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
