import React from "react";

import Button from "../Button/Button";
import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search-form_section">
    <form className="search-form app__search-form">
      <div className="search-form__string">
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
        ></input>
        <Button
          className="button button_type_search button_type_blue"
          type="submit"
        >
          Поиск
        </Button>
      </div>
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