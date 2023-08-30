import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UserDataProvider } from "../../contexts/UserDataProvider";
import { BookmarkedMoviesProvider } from "../../contexts/BookmarkedMoviesProvider";
import { mainApi } from "../../utils/MainApi";
import Header from "../Header/Header";
import MainLayout from "../MainLayout/MainLayout";
import Login from "../Login/Login";
import Main from "../Main/Main";
import ModalOverlay from "../Modal/ModalOverlay";
import ModalContent from "../Modal/ModalContent";
import Movies from "../Movies/Movies";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import Preloader from "../Preloader/Preloader";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../../utils/ProtectedRoute";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import "./App.css";
// App — корневой компонент приложения, его создаёт CRA.

const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  const [tokenVerified, setTokenVerified] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const closeModalHandler = () => {
    setModalVisible(false);
    setModalMessage("");
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      mainApi
        .reEnter()
        .then((userData) => {
          setCurrentUser(userData);
          setUserAuthenticated(true);
        })
        .finally(() => {
          setTokenVerified(true);
        })
        .catch((error) => {
          setModalVisible(true);
          setModalMessage(error.message || "Ошибка авторизации");
        });
    } else {
      setTokenVerified(true);
      setUserAuthenticated(false);
    }
  }, []);

  return (
    <div className="app">
      {tokenVerified ? (
        <UserDataProvider context={{ currentUser, setCurrentUser }}>
          <BookmarkedMoviesProvider context={{ savedMovies, setSavedMovies }}>
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout isLogged={userAuthenticated}>
                    <Main />
                  </MainLayout>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute isLogged={!userAuthenticated}>
                    <Register setLoginStatus={setUserAuthenticated} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signin"
                element={
                  <ProtectedRoute isLogged={!userAuthenticated}>
                    <Login setLoginStatus={setUserAuthenticated} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/movies"
                element={
                  <ProtectedRoute isLogged={userAuthenticated}>
                    <MainLayout isLogged={userAuthenticated}>
                      <Movies />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute isLogged={userAuthenticated}>
                    <MainLayout isLogged={userAuthenticated}>
                      <SavedMovies />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLogged={userAuthenticated}>
                    <>
                      <Header isLogged={userAuthenticated} />
                      <Profile setLoginStatus={setUserAuthenticated} />
                    </>
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/404" replace />} />
              <Route path="/404" element={<NotFoundPage />} />
            </Routes>

            <ModalOverlay isModalOpened={modalVisible}>
              <ModalContent
                onClose={closeModalHandler}
                modalText={modalMessage}
              />
            </ModalOverlay>
          </BookmarkedMoviesProvider>
        </UserDataProvider>
      ) : (
        <div className="preloader-wrapper">
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default App;
