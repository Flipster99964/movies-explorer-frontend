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
import savedPageContext from "../../context/saved-page-context";
import RequireAuth from "../ProtectedRoute/ProtectedRoute";
import currentUserContext from "../../context/currentUserContext";
import { mainApi } from "../../utils/MainApi";
import * as auth from "../../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [onSavedPage, setOnSavedPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      })
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));
  }
  console.dir(currentUser)
    return (
      <currentUserContext.Provider value={{ currentUser, setCurrentUser }}>
        <savedPageContext.Provider value={{ onSavedPage, setOnSavedPage }}>
          <div className="app">
            <Routes>
              <Route exact path="/" element={<Main /> } />
              <Route path="/movies" element={<RequireAuth> <Movies /> </RequireAuth>} isLoggedIn={isLoggedIn} />
              <Route path="/saved-movies" element={<RequireAuth> <SavedMovies /> </RequireAuth>} isLoggedIn={isLoggedIn} />
              <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} submitHandler={updateUserInfo} isLoggedIn={isLoggedIn} />
              <Route path="/signup" element={<Register submitHandler={registerUser} isLoading={isLoading} />} />
              <Route path="/signin" element={<Login submitHandler={loginUser} isLoading={isLoading} />} />
              <Route path="/404" element={<NotFound />} />
              <Route path="/*" element={<Main />} />
            </Routes>
          </div>
        </savedPageContext.Provider>
      </currentUserContext.Provider>
      );
}

export default App;