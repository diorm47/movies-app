import { Link, useNavigate } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "./Register.css";
import Logo from "../Logo/Logo";
import { mainApi } from "../../utils/MainApi";
import { useCurrentUserContext } from "../../contexts/CurrentUserContextProvider";
import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import { PATTERN_EMAIL } from "../../constants/constants";

const Register = ({ setLoginStatus }) => {
  const { values, handleChange, errors, isValid, resetForm, inputVilidities } =
    useFormWithValidation();
  const navigate = useNavigate();
  const { setCurrentUser } = useCurrentUserContext();
  const [apiErrorMessage, setApiErrorMessage] = useState("");
  const [isLoadind, setIsLoading] = useState(false);
  const defaultRegisterInputClassName = "register__input";
  const errorRegisterInputClassName =
    "register__input register__input_type_error";

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
  
        localStorage.setItem("currentId", userData._id);
        navigate("/movies", { replace: true });
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
      <Logo />
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
              inputVilidities.name === undefined || inputVilidities.name
                ? defaultRegisterInputClassName
                : errorRegisterInputClassName
            }
            name="name"
            required
            id="name"
            autoComplete="off"
            minLength="2"
            maxLength="40"
            onChange={handleChange}
            value={values.name || ""}
          />
          <span className="register__error">{errors.name}</span>
        </label>
        <label htmlFor="email" className="register__field">
          E-mail
          <input
            type="email"
            className={
              inputVilidities.email === undefined || inputVilidities.email
                ? defaultRegisterInputClassName
                : errorRegisterInputClassName
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
          <span className="register__error">{errors.email}</span>
        </label>
        <label htmlFor="password" className="register__field">
          Пароль
          <input
            type="password"
            className={
              inputVilidities.password === undefined || inputVilidities.password
                ? defaultRegisterInputClassName
                : errorRegisterInputClassName
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
          <span className="register__error">{errors.password}</span>
        </label>

        <span className="register__api-error">{apiErrorMessage}</span>

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
