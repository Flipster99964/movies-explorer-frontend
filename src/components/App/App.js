import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import Login from "../Login/Login";

function App() {
    return (
        <div className="app">
	      {/*<Header />
        <Main />
        <Movies />
        <SavedMovies />
        <Login />*/}
        <Register />
        </div>
      );
}

export default App;