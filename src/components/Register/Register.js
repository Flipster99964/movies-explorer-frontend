import React from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import UnauthPage from "../UnauthPage/UnauthPage";
import Header from "../Header/Header";

import "./Register.css";

function Register() {
  return (
    <UnauthPage 
      title="Добро пожаловать! "
      text="Уже зарегистрированы?"
      link="/signin"
      linkText="Войти">
      <form className="register" name="register">
      <fieldset className="register__inputs">
          <Input
            name="name"
            label="Имя"
            modifier="unauth"
            type="text"
            required
          />
          <Input
            name="email"
            label="E-mail"
            modifier="unauth"
            type="email"
            required
          />
          <Input
            name="password"
            label="Пароль"
            type="password"
            modifier="unauth"
            required
          />
        </fieldset>
        <Button className="button_type_blue button_type_submit register__button" type="submit">
          Зарегистрироваться
        </Button>
        <p className="register__text">
          Уже зарегистрированы?{" "}
          <a className="register__link" href="/signin">
            Войти
          </a>
        </p>
      </form>
    </UnauthPage>
  );
}

export default Register;