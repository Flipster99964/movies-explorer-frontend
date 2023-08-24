import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

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

function App() {
  const [onSavedPage, setOnSavedPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
      <div className="app">
        <Routes>
          <Route exact path="/" element={<RequireAuth> <Main /> </RequireAuth>} isLoggedIn={isLoggedIn}/>
          <Route path="/movies" element={<RequireAuth> <Movies /> </RequireAuth>} isLoggedIn={isLoggedIn}/>
          <Route path="/saved-movies" element={<RequireAuth> <SavedMovies /> </RequireAuth>} isLoggedIn={isLoggedIn} />
          <Route path="/profile" element={<RequireAuth> <Profile /> </RequireAuth>} isLoggedIn={isLoggedIn} />
          <Route path="/signup" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </div>
      );
}

export default App;