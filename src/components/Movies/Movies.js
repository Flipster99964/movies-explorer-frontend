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
import { findOnlyShortMovies, filterMovies } from "../../utils/filters";
import { beatFilmApi } from "../../utils/MoviesApi";

function Movies() {
  const { onSavedPage, setOnSavedPage } = useContext(savedPageContext);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const queryData = localStorage.getItem("queryData");
  useEffect(() => setOnSavedPage(false), [setOnSavedPage]);

  useEffect(() => {
    if (queryData !== null) {
      setMovies(JSON.parse(queryData).filteredMovies);
            // setValues({
      //   ...values,
      //   ["film-query"]: JSON.parse(queryData).searchQuery,
      // });
    }
  }, [setMovies]);

  const checkboxHandler = (isOnlyShortFilms) => {
    if (queryData !== null) {
      const moviesFromStorage = JSON.parse(queryData).filteredMovies;
      if (isOnlyShortFilms) {
        setMovies(moviesFromStorage);
      } else {
        setMovies(findOnlyShortMovies(moviesFromStorage));
      }
    }
    return;
  };

  const submitHandler = async (isOnlyShortFilms, searchQuery) => {
    try {
      setIsLoading(true);
      const allMovies = await beatFilmApi.getMovies();
      const filteredMovies = await filterMovies(searchQuery, allMovies);
      const filteredShortMovies = findOnlyShortMovies(filteredMovies);
      const queryData = {
        allMovies,
        searchQuery: searchQuery,
        filteredMovies,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));

      isOnlyShortFilms
        ? setMovies(filteredShortMovies)
        : setMovies(filteredMovies);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };
  
  return (
    <>
        <section className="movies app__movies" aria-label="Фильмы">
        <Header className="header_type_white"/>
        <SearchForm
            checkboxHandler={checkboxHandler}
            submitHandler={submitHandler}
          />
          {isLoading ? <Preloader /> : <MoviesCardList data={movies} />}
          {!isLoading && movies.length === 0 && (
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