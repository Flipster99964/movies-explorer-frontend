import React, { useEffect, useState } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import MoviesCard from "../MoviesCard/MoviesCard";
import Button from "../Button/Button";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import { findOnlyShortMovies, filterMovies } from "../../utils/filters";
import { beatFilmApi } from "../../utils/MoviesApi";
import { getOneIdByAnother } from "../../utils/getOneIdByAnother";
import { UseGetWidthBrowser } from "../../hooks/UseGetWidthBrowse";
import { DEFAULT_ERROR_MESSAGE } from "../../utils/constants";
import { mainApi } from "../../utils/MainApi";
import {
  LARGE,
  MEDIUM,
  SMALL,
  MOBILE_WIDTH,
  LAPTOP_WIDTH,
} from "../../utils/paginationConfig";
import "./Movies.css";

function Movies({ savedMovies, setSavedMovies, cardErrorHandler }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsAmount, setInitialCards] = useState(0);
  const [cardsPage, setCardsPage] = useState(0);
  const [cardsInBundle, setCardsInBundle] = useState(0);
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [lastSearchQuery, setLastSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const cardsCount = initialCardsAmount + cardsInBundle * cardsPage;
  const width = UseGetWidthBrowser();
  const queryData = localStorage.getItem("queryData");
  const token = localStorage.getItem("token");
  let allMovies = localStorage.getItem("allMoviesData");
  
  // меняет отрисовку карточек от ширины экрана
  useEffect(() => {
    if (width >= LAPTOP_WIDTH) {
      setInitialCards(LARGE.firstPageCount);
      setCardsInBundle(LARGE.nextPageCount);
    } else if (width > MOBILE_WIDTH && width < LAPTOP_WIDTH) {
      setInitialCards(MEDIUM.firstPageCount);
      setCardsInBundle(MEDIUM.nextPageCount);
    } else if (width <= MOBILE_WIDTH) {
      setInitialCards(SMALL.firstPageCount);
      setCardsInBundle(SMALL.nextPageCount);
    }
  }, [width]);

  let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];
  let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];

  // получаем последний запрос и состояние чекбокса
  useEffect(() => {
    if (queryData) {
      setLastSearchQuery(JSON.parse(queryData)?.searchQuery);
      setShortFilmsCheck(JSON.parse(queryData)?.isOnlyShortFilms);
    }
  }, []);

  // если нет ошибок, меняем блок результатов в зависимости от чекбокса
  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setMovies(filteredShortMovies.slice(0, cardsCount))
        : setMovies(filteredMovies.slice(0, cardsCount));
    }

  }, [shortFilmsCheck, cardsCount, errorMessage]);


  // сохраняем состояние чекбокса при его изменении
  useEffect(() => {
    if (queryData) {
      const updatedQueryData = JSON.parse(queryData);
      updatedQueryData.isOnlyShortFilms = shortFilmsCheck;
      localStorage.setItem("queryData", JSON.stringify(updatedQueryData));
    }
  }, [shortFilmsCheck, queryData]);

    // удаляем данные о всех фильмах при обновлении страницы
    useEffect(() => {
      window.addEventListener("beforeunload", removeAllMoviesData);
      return () => {
        window.removeEventListener("beforeunload", removeAllMoviesData);
      };
    }, []);
  
    const removeAllMoviesData = () => localStorage.removeItem("allMoviesData");

  const submitHandler = async (isOnlyShortFilms, searchQuery) => {
    try {
      setIsLoading(true);
      // получаем все фильмы
      if (!allMovies) {
        const allMoviesData = await beatFilmApi.getMovies();
        localStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
        allMovies = localStorage.getItem("allMoviesData");
      }
      // фильтруем
      filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
      filteredShortMovies = findOnlyShortMovies(filteredMovies);
      // создаем объект для сохранения в localStorage
      const queryData = {
        filteredMovies,
        filteredShortMovies,
        searchQuery,
        isOnlyShortFilms,
      };
      localStorage.setItem("queryData", JSON.stringify(queryData));

      // следим за чекбоксом выводим результат
      if (isOnlyShortFilms) {
        // отображаем только первоначальное кол-во карточек, используя slice
        setMovies(filteredShortMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage("Ничего не найдено");
        }
      } else {
        setMovies(filteredMovies.slice(0, initialCardsAmount));
        if (filteredShortMovies.length === 0) {
          setResultMessage("Ничего не найдено");
        }
      }

      setErrorMessage("");
      setIsLoading(false);
    } catch (e) {
      setMovies([]);
      setErrorMessage(DEFAULT_ERROR_MESSAGE);
      console.log(e);
      setIsLoading(false);
    }
  };

  const moreButtonHandler = () => setCardsPage((prev) => prev + 1);

  const MoreButton = ({ displayed }) => (
    <Button
      className={`button_type_more ${displayed ? "button_type_hidden" : ""}`}
      handler={moreButtonHandler}
    >
      Ещё
    </Button>
  );

  const saveMovie = (movie, likeHandler) => {
    mainApi
      .createMovie(movie, token)
      .then((newMovie) => {
        // после ответа добавляем новый фильм в стейт
        setSavedMovies([...savedMovies, newMovie]);
        // меняем кнопку
        likeHandler(true);
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  const deleteMovie = (movieId, likeHandler) => {
    console.dir("тест")
    const idInSavedMovies = getOneIdByAnother(movieId, savedMovies);
    mainApi
      .removeMovie(idInSavedMovies, token)
      .then(() => {
        console.dir("тест")
        likeHandler(false);
        setSavedMovies((state) =>
          state.filter((m) => m._id !== idInSavedMovies)
        );
      })
      .catch((e) => e.json())
      .then((e) => {
        if (e?.message) {
          cardErrorHandler(e.message);
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
        <section className="movies app__movies" aria-label="Фильмы">
        <Header className="header_type_white"/>
        <SearchForm
            submitHandler={submitHandler}
            checkbox={shortFilmsCheck}
            lastSearchQuery={lastSearchQuery}
            setCheckbox={setShortFilmsCheck}
            isLoading={isLoading}
          />
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              allMovies={movies}
              savedMovies={savedMovies}
              onSaveHandler={saveMovie}
              onDeleteHandler={deleteMovie}
              onSavedPage={false}
            />
          )}
          {!isLoading && movies.length === 0 && (
            <p className="movies__message">
            {errorMessage || "Ничего не найдено"}
          </p>
          )}
          <div className="movies__footer">
            {shortFilmsCheck
              ? cardsCount < filteredShortMovies.length &&
                !isLoading && <MoreButton displayed={errorMessage} />
              : cardsCount < filteredMovies.length &&
                !isLoading && <MoreButton displayed={errorMessage} />}
          </div>
        </section>
      <Footer />
    </>
  );
}

export default Movies;