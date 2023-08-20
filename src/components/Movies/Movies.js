import React, { useContext, useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Icons from "../Icons/Icons";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./Movies.css";
import Button from "../Button/Button";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import savedPageContext from "../../context/saved-page-context";
import Preloader from "../Preloader/Preloader";

function Movies() {
  const { onSavedPage, setOnSavedPage } = useContext(savedPageContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryData = localStorage.getItem("queryData");
  useEffect(() => setOnSavedPage(false), [setOnSavedPage]);

  useEffect(() => {
    if (queryData) {
      setMovies(JSON.parse(queryData).filteredMovies);
    }
  }, [queryData]);
  
  return (
    <>
        <section className="movies app__movies" aria-label="Фильмы">
        <Header className="header_type_white"/>
        <SearchForm
            setMovies={setMovies}
            setIsLoading={setIsLoading}
            onSavedPage={onSavedPage}
          />
          {isLoading ? <Preloader /> : <MoviesCardList data={movies} />}
          {!isLoading && movies && (
            <p className="movies__message">Ничего не найдено</p>
          )}
          {/* <div className="movies__footer">
            <Button className="button_type_more">Ещё</Button>
          </div> */}
        </section>
      <Footer />
    </>
  );
}

export default Movies;