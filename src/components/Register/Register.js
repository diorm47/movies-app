import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCustomFormValidation } from "../../hooks/useCustomFormValidation";
import "./Register.css";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { mainApi } from "../../utils/MainApi";
import { useUserDetails } from "../../contexts/UserDataProvider";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import { EMAIL_REGEX_PATTERN } from "../../constants/constants";

const Register = ({ setLoginStatus }) => {
  const {
    values,
    handleInputChange,
    errors,
    isFormValid,
    resetForm,
    inputStatuses,
  } = useCustomFormValidation();
  const navigate = useNavigate();
  const { setCurrentUser } = useUserDetails();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoadind, setIsLoading] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setApiErrorMessage("");

    setIsLoading(true);
    mainApi
      .signup(values)
      .then(() => {
        const { email, password } = values;
        resetForm();
        return mainApi.signin({ email, password });
      })
      .then((userData) => {
        setCurrentUser(userData);
        setLoginStatus(true);
        localStorage.setItem("token", userData.token);
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
    <main className="register container">
      <NavLink to="/" className="login__link">
        <Logo />
      </NavLink>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form
        action="#"
        className="register__form"
        name="register"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="name" className="register__field">
          Имя
          <input
            type="text"
            className={
              inputStatuses.name === undefined || inputStatuses.name
                ? "register__input"
                : "register__input register__input_type_error"
            }
            name="name"
            required
            id="name"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            onChange={handleInputChange}
            value={values.name || ""}
          />
          <span className="register__error">{errors.name}</span>
        </label>
        <label htmlFor="email" className="register__field">
          E-mail
          <input
            type="email"
            className={
              inputStatuses.email === undefined || inputStatuses.email
                ? "register__input"
                : "register__input register__input_type_error"
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
          <span className="register__error">{errors.email}</span>
        </label>
        <label htmlFor="password" className="register__field">
          Пароль
          <input
            type="password"
            className={
              inputStatuses.password === undefined || inputStatuses.password
                ? "register__input"
                : "register__input register__input_type_error"
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
          <span className="register__error">{errors.password}</span>
        </label>

        <span className="register__api-error">{apiErrorMessage}</span>

        {isLoadind ? (
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
            Зарегистрироваться
          </button>
        )}
        <p className="register__text">
          Уже зарегистрированы?{" "}
          <Link to="/signin" className="register__link">
            Войти
          </Link>
        </p>
      </form>
    </main>
  );
};

export default Register;
