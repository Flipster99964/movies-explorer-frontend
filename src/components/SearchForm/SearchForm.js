import React, { useState } from "react";

import Button from "../Button/Button";
import useCustomValidation from "../../hooks/useCustomValidation";
import { beatFilmApi } from "../../utils/MoviesApi";

import "./SearchForm.css";


function SearchForm({ setMovies, setIsLoading, onSavedPage }) {
  const [errorText, setErrorText] = useState("");
  const { values, setValues, errors, handleChange, isFormValid } =
    useCustomValidation();

  const filterMovies = async (searchQuery) => {
    setIsLoading(true);
    const movies = await beatFilmApi
      .getMovies()
      .then((data) => data)
      .catch((e) => console.log(e))
      .finally(() => setIsLoading(false));

    const filteredMovies = movies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMovies(filteredMovies);
  };

  const handleSubmitFrom = (e) => {
    e.preventDefault();
    if (values["film-query"] === undefined) {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    if (isFormValid) {
      console.log("Запрос на сервер");
      filterMovies(values["film-query"]);
    }
    setErrorText(errors["film-query"]);
  };

  return (
    <section className="search-form__section">
    <form
      className="search-form app__search-form"
      name="search-movie"
      onSubmit={handleSubmitFrom}
      noValidate
    >
      <div className="search-form__string">
        <input
          name="film-query"
          className="search-form__input"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={values["film-query"] || ""}
          autocomplete="off"
        />
        <Button
          className="button button_type_search button_type_blue"
          type="submit"
        >
          Поиск
        </Button>
      </div>
      <span className="search-form__error">{errorText}</span>
      <label className="search-form__label" htmlFor="short-film">
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
        />
        <div className="search-form__pseudo-item">
          <span className="search-form__circle"></span>
        </div>
        <span className="search-form__label-text">Короткометражки</span>
      </label>
    </form>
    </section>
  );
}

export default SearchForm;