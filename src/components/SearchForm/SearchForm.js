import React, { useState } from "react";

import Button from "../Button/Button";
import { UseCustomValidation } from "../../hooks/useCustomValidation";
import { UseCheckFormValidity } from "../../hooks/UseCheckFormValidity";
import { countInputs } from "../../utils/countInputs";

import "./SearchForm.css";


function SearchForm({ submitHandler, checkbox, setCheckbox }) {
  const [errorText, setErrorText] = useState("");
  const { values, errors, handleChange, isFormValid, setIsFormValid } =
    UseCustomValidation();
  const amountInputs = countInputs(".search-form__input");

  UseCheckFormValidity(values, errors, amountInputs, setIsFormValid);

  const onClickCheckBox = () => setCheckbox(!checkbox);

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
          name="film-query"
          className="search-form__input"
          placeholder="Фильм"
          required
          onChange={handleChange}
          value={values["film-query"] || ""}
          autoComplete="off"
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
          checked={checkbox}
          onChange={onClickCheckBox}
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