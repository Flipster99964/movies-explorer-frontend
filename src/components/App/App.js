import { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";

import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import RequireAuth from "../ProtectedRoute/ProtectedRoute";
import currentUserContext from "../../context/currentUserContext";
import { mainApi } from "../../utils/MainApi";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constants";
import { NOTIFICATION_DURATION } from "../../utils/constants";
import * as auth from "../../utils/auth";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileMessage, setProfileMessage] = useState("");
  const [profileMessageModifier, setProfileMessageModifier] = useState(false);
  const [savedMoviesMessage, setSavedMoviesMessage] = useState("");
  const [unauthPageMessage, setUnauthPageMessage] = useState("");
  const [popupError, setPopupError] = useState("");
  const [popupErrorStatus, setPopupErrorStatus] = useState(false);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const location = useLocation();

  function showProfileMessage(text, modifier) {
    setProfileMessage(text);
    setProfileMessageModifier(modifier);
    setTimeout(() => setProfileMessageModifier(""), NOTIFICATION_DURATION);
  }

  function showPopupError(text = "Что-то пошло не так") {
    setPopupError(text);
    setPopupErrorStatus(true);
    setTimeout(() => setPopupErrorStatus(false), NOTIFICATION_DURATION);
  }

  useEffect(() => {
    if (token && !popupErrorStatus) {
      setIsLoggedIn(true);
      if (location.pathname === "/signup" || location.pathname === "/signin") {
        history("/movies");
      } else {
        history(location.pathname);
      }
    }
  }, [token, isLoggedIn, history, location.pathname]);

  
    useEffect(() => {
      if (isLoggedIn && !popupErrorStatus) {
    mainApi
      .getSavedMovies(token)
      .then((res) => {
        const moviesData = res.data
        const ownSavedMovies = moviesData.filter(
          (movie) => movie.owner === currentUser._id
        );

        localStorage.setItem("savedMovies", JSON.stringify(ownSavedMovies));
        setSavedMovies(ownSavedMovies);
        setSavedMoviesMessage("");
      })
      .catch((e) => {
        setSavedMoviesMessage(DEFAULT_ERROR_MESSAGE);
        console.log(e);
      });
    }
  }, [currentUser._id, setSavedMovies, token, popupErrorStatus]);

  function registerUser(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          loginUser(email, password);
          setUnauthPageMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setUnauthPageMessage(e.message);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function loginUser(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          history("/movies");
          setUnauthPageMessage("");
        }
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          setUnauthPageMessage(e.message);
        }
        setIsLoggedIn(false);
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }

  function updateUserInfo(userDataFromForm) {
    setIsLoading(true);
    mainApi
      .editCurrentUserInfo(userDataFromForm, token)
      .then((userDataUpdated) => {
        setCurrentUser({
          name: userDataUpdated.name,
          email: userDataUpdated.email,
        });
        showProfileMessage("Изменения сохранены", "success");
      })
      .catch((e) => showProfileMessage(e.message, "fail"))
      .finally(() => setIsLoading(false));
  }

    return (
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="app">
          <ErrorPopup text={popupError} isVisible={popupErrorStatus} />
            <Routes>
              <Route exact path="/" element={<Main /> } />
              <Route path="/movies" element={<RequireAuth> <Movies /> </RequireAuth>} isLoggedIn={isLoggedIn} 
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              cardErrorHandler={showPopupError}
              />
              <Route path="/saved-movies" element={<RequireAuth> <SavedMovies /> </RequireAuth>} isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}
              message={savedMoviesMessage}
              cardErrorHandler={showPopupError}
               />
              <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} submitHandler={updateUserInfo}
                isLoading={isLoading}
                message={profileMessage}
                messageModifier={profileMessageModifier}
                setIsLoggedIn={setIsLoggedIn}
                 />
              <Route path="/signup"
                element={
                <Register message={unauthPageMessage}
                setMessage={setUnauthPageMessage}
                submitHandler={registerUser} isLoading={isLoading}
              />} />
              <Route path="/signin" element=
              {<Login 
              submitHandler={loginUser} 
              isLoading={isLoading} 
              message={unauthPageMessage}
              setMessage={setUnauthPageMessage}
              />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<Main />} />
            </Routes>
          </div>
      </currentUserContext.Provider>
      );
}

export default App;