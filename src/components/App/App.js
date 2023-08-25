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
import RequireAuth from "../ProtectedRoute/ProtectedRoute";
import currentUserContext from "../../context/currentUserContext";
import { mainApi } from "../../utils/MainApi";
import * as auth from "../../utils/auth";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [savedMovies, setSavedMovies] = useState([]);
  const [profileMessage, setProfileMessage] = useState({
    text: "",
    status: "",
  });
  const [popupError, setPopupError] = useState("");
  const [popupErrorStatus, setPopupErrorStatus] = useState(false);
  const token = localStorage.getItem("token");
  const history = useNavigate();
  const location = useLocation();

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
    if (isLoggedIn) {
      mainApi
        .getCurrentUserInfo(token)
        .then(([response]) => {
          setCurrentUser(response);
        })
        .catch((e) => console.log(e));
    }
  }, [token, isLoggedIn]);

  useEffect(() => {
    mainApi
      .getSavedMovies(token)
      .then((moviesData) => {
        const ownSavedMovies = moviesData.filter(
          (movie) => movie.owner === currentUser._id
        );
        setSavedMovies(ownSavedMovies);
      })
      .catch((e) => console.log(e));
  }, [currentUser._id, setSavedMovies, token]);

  function registerUser(name, email, password) {
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((res) => {
        if (res) {
          // автологин
          loginUser(email, password);
          // setIsSuccessReg(true);
        } else {
          console.log("Что-то пошло не так");
          // setIsSuccessReg(false);
        }
      })
      .catch((e) => {
        console.log(e);
        // setIsSuccessReg(false);
      })
      .finally(() => {
        // setIsInfoToolTipOpen(true);
        setIsLoading(false);
      });
  }

  function loginUser(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          setIsLoggedIn(true);
          history("/movies");
        }
      })
      .catch((e) => {
        console.log(e);
        setIsLoggedIn(false);
      })
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
        setProfileMessage({ text: "Изменения сохранены", status: "success", });
        setTimeout(() => setProfileMessage({text: "Изменения сохранены", status: ""}), 2000);
      })
      .catch((e) => {
        setProfileMessage({ text: e.message, status: "fail", });
        setTimeout(() => setProfileMessage({text: e.message, status: ""}), 2000);
        console.log(e);
      })
      .finally(() => setIsLoading(false));
  }

    return (
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
          <div className="app">
            <Routes>
              <Route exact path="/" element={<Main /> } />
              <Route path="/movies" element={<RequireAuth> <Movies /> </RequireAuth>} isLoggedIn={isLoggedIn} 
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies}/>
              <Route path="/saved-movies" element={<RequireAuth> <SavedMovies /> </RequireAuth>} isLoggedIn={isLoggedIn}
              savedMovies={savedMovies}
              setSavedMovies={setSavedMovies} />
              <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} submitHandler={updateUserInfo}
                message={profileMessage}
                isLoading={isLoading} />
              <Route path="/signup" element={<Register submitHandler={registerUser} isLoading={isLoading} />} />
              <Route path="/signin" element={<Login submitHandler={loginUser} isLoading={isLoading} />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<Main />} />
            </Routes>
          </div>
      </currentUserContext.Provider>
      );
}

export default App;