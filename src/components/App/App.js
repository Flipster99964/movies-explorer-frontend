import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
    return (
        <div className="app">
	      {/*<Header />
        <Main />
        <Movies />*/}
        <SavedMovies />
        </div>
      );
}

export default App;