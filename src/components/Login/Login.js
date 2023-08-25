import React, { useEffect } from "react";

import UnauthPage from "../UnauthPage/UnauthPage";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { UseCustomValidation } from "../../hooks/useCustomValidation";
import { UseCheckFormValidity } from "../../hooks/UseCheckFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./Login.css";

function Login({ submitHandler, isLoading, message, setMessage }) {
  const { values, errors, handleChange, isFormValid, setIsFormValid } =
    UseCustomValidation();
  const amountInputs = countInputs(".input");

  UseCheckFormValidity(values, errors, amountInputs, setIsFormValid);

  useEffect(() => setMessage(""), [setMessage]);

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(values["email"], values["password"]);

  };
  return (
    <UnauthPage title="Рады видеть!">
      <form className="login" name="login" onSubmit={onSubmit} noValidate>
        <div className="login__inputs">
          <Input
            name="email"
            label="E-mail"
            type="email"
            modifier="unauth"
            value={values["email"] || ""}
            error={errors["email"]}
            onChange={handleChange}
            autoComplete="off"
          />
          <Input
            name="password"
            label="Пароль" 
            type="password" 
            modifier="unauth"
            value={values["password"] || ""}
            error={errors["password"]}
            onChange={handleChange}
            maxlength="25"
            minlength="8"
            autoComplete="off"
          />
        </div>
        <p
          className={`unauth-page__message ${
            message ? "unauth-page__message_type_fail" : ""
          }`}
        >
          {message}
        </p>
        <div className="login__buttons">
        <Button
          className={`login__button button_type_blue button_type_submit ${
            !isFormValid && "button_type_disabled"
          }`}
          type="submit"
          disabled={!isFormValid}
        >
          {isLoading ? "Загрузка..." : "Войти"}
        </Button>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <a className="login__link" href="/signup">
            Регистрация
          </a>
        </p>
        </div>
      </form>
    </UnauthPage>
  );
}

export default Login;