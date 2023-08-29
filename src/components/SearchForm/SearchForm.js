import React, { useEffect, useState } from "react";

import Button from "../Button/Button";
import { UseCustomValidation } from "../../hooks/useCustomValidation";
import { UseCheckFormValidity } from "../../hooks/UseCheckFormValidity";
import { countInputs } from "../../utils/countInputs";

import "./SearchForm.css";


function SearchForm({ submitHandler, checkboxHandler, checkbox, setCheckbox, lastSearchQuery, isLoading }) {
  const [errorText, setErrorText] = useState("");
  const {
    values,
    errors,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = UseCustomValidation();
  const amountInputs = countInputs(".search-form__input");

  UseCheckFormValidity(values, errors, amountInputs, setIsFormValid);

  useEffect(() => {
    // отображаем последний запрос, если он есть
    if (lastSearchQuery) {
      setValues({ ...values, "film-query": lastSearchQuery });
    }
  }, [lastSearchQuery, setValues]);

  const onClickCheckBox = () => {
    setCheckbox(!checkbox);
    if (window.location.pathname == '/saved-movies')
    checkboxHandler(checkbox);
  }
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (values["film-query"] === undefined) {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    if (isFormValid) {
      submitHandler(checkbox, values["film-query"]);
      setErrorText("");
    }
    setErrorText(errors["film-query"]);
  };

  return (
    <section className="search-form__section">
    <form
      className="search-form app__search-form"
      name="search-movie"
      onSubmit={onSubmitForm}
      noValidate
    >
      <div className="search-form__string">
        <input
          className={`search-form__input ${
            isLoading ? "search-form__input_disabled" : ""
          }`}
          name="film-query"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={values["film-query"] || ""}
          autoComplete="off"
          disabled={isLoading}
        />
        <Button
          className={`button button_type_search button_type_blue ${
            isLoading && "button_type_disabled"
          }`}
          type="submit"
          isLoading={isLoading}
        >
          Поиск
        </Button>
      </div>
      <span className="search-form__error">{errorText}</span>
      <label className={`search-form__label ${isLoading && "search-form__label_disabled"}`} type="button" htmlFor="short-film">
        <input
          className="search-form__radio"
          type="checkbox"
          name="short-film-option"
          id="short-film"
          value="short-film"
          checked={checkbox}
          onChange={onClickCheckBox}
          disabled={isLoading}
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