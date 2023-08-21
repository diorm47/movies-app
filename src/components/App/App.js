import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CurrentUserContextProvider } from "../../contexts/CurrentUserContextProvider";
import { SavedMoviesContextProvider } from "../../contexts/SavedMoviesContextProvider";
import { mainApi } from "../../utils/MainApi";
import Header from "../Header/Header";
import Layout from "../Layout/Layout";
import Login from "../Login/Login";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";
import ModalContent from "../Modal/ModalContent";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";
// App — корневой компонент приложения, его создаёт CRA.

const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [isModalOpened, setIsModalOpened] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleModalClose = () => {
    setIsModalOpened(false);
    setModalText("");
  };

  useEffect(() => {
    const id = localStorage.getItem("currentId");

    if (id) {
      mainApi
        .reEnter()
        .then((userData) => {
          setCurrentUser(userData);
          setIsLogged(true);
        })
        .catch((error) => {
          setIsModalOpened(true);
          setModalText(error);
        })
        .finally(() => {
          setIsTokenChecked(true);
        });
    } else {
      setIsTokenChecked(true);
      setIsLogged(false);
    }
  }, []);

  return (
    <div className="app">
      {isTokenChecked ? (
        <CurrentUserContextProvider context={{ currentUser, setCurrentUser }}>
          <SavedMoviesContextProvider context={{ savedMovies, setSavedMovies }}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout isLogged={isLogged}>
                    <Main />
                  </Layout>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute isLogged={!isLogged}>
                    <Register setLoginStatus={setIsLogged} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <ProtectedRoute isLogged={!isLogged}>
                    <Login setLoginStatus={setIsLogged} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute isLogged={isLogged}>
                    <Layout isLogged={isLogged}>
                      <Movies />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute isLogged={isLogged}>
                    <Layout isLogged={isLogged}>
                      <SavedMovies />
                    </Layout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLogged={isLogged}>
                    <>
                      <Header isLogged={isLogged} />
                      <Profile setLoginStatus={setIsLogged} />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>

            <Modal isOpen={isModalOpened}>
              <ModalContent onClose={handleModalClose} modalText={modalText} />
            </Modal>
          </SavedMoviesContextProvider>
        </CurrentUserContextProvider>
      ) : (
        <div className="preloader-wrapper">
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default App;
