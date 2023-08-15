import React from "react";

import Search from "../Icons/Search";
import "./SearchForm.css";

function SearchForm() {
  return (
    <form className="search-form app__search-form">
      <div className="search-form__string">
        <input
          className="search-form__input"
          placeholder="Фильм"
          required
        ></input>
        <button className="button button_type_search button_type_blue">
          Поиск
        </button>
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
  );
}

export default SearchForm;