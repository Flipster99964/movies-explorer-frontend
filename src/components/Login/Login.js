import React, { useState } from "react";

import UnauthPage from "../UnauthPage/UnauthPage";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Login.css";

function Login({ submitHandler, isLoading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    submitHandler(email, password, setEmail, setPassword);

  };
  return (
    <UnauthPage title="Рады видеть!">
      <form className="login" name="login" onSubmit={onSubmit}>
        <div className="login__inputs">
        <Input
          label="E-mail"
          type="email"
          modifier="unauth"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Пароль" 
          type="password" 
          modifier="unauth"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxlength="25"
          minlength="8"
          required
        />
        </div>
        <div className="login__buttons">
        <Button className="button_type_blue button_type_submit login__button" type="submit">
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