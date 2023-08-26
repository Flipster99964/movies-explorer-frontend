import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import currentUserContext from "../../context/currentUserContext";
import { UseCustomValidation } from "../../hooks/useCustomValidation";
import { UseCheckFormValidity } from "../../hooks/UseCheckFormValidity";
import { countInputs } from "../../utils/countInputs";
import "./Profile.css";

function Profile({ setIsLoggedIn, submitHandler, message, isLoading }) {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  const currentUserData = { name: currentUser.name, email: currentUser.email };
  console.dir(currentUser)
  const {
    values,
    errors,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = UseCustomValidation(currentUser.name, currentUser.email);
  const history = useNavigate();
  const amountInputs = countInputs(".input");

  UseCheckFormValidity(
    values,
    errors,
    amountInputs,
    setIsFormValid,
    currentUserData
  );

  useEffect(() => {
    console.dir(currentUser.name)
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email, setValues]);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("queryData");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("allMoviesData");
    setIsLoggedIn(false);
    history("/");
    setCurrentUser({
      name: "",
      email: "",
    });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    submitHandler({ name: values["name"], email: values["email"] });
  };

  return (
    <section className="profile">
      <Header className="header_type_white"/>
      <div className="profile__container">
      <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__form" onSubmit={onSubmitForm} noValidate>
          <Input
            label="Имя" 
            type="name" 
            modifier="profile" 
            maxlength="20"
            minlength="2"
            onChange={handleChange}
            value={values["name"] || ""}
            error={errors["name"]}
            autoComplete="off"
            required
            disabled={isLoading}
          />
          <Input 
          label="E-mail" 
          type="email" 
          modifier="profile" 
          required
          onChange={handleChange}
          value={values["email"] || ""}
          error={errors["email"]}
          autoComplete="off"
          disabled={isLoading}
          />
        </form>
        {/*<p
            className={`profile__error-message ${
              message.status
                ? `profile__error-message_type_${message.status}`
                : ""
            }`}
          >
            {message.text}
          </p>*/}
        <div className="profile__buttons">
          <Button
            className={`button_type_profile ${
              (!isFormValid || isLoading) && "button_type_disabled"
            }`}
            type="submit"
            isFormValid={isFormValid}
            isLoading={isLoading}
          >
              {isLoading ? "Сохраняем..." : "Редактировать"}
          </Button>
          <Link to="/" className="button_type_profile">
          <Button type="button" className="button_type_profile button_type_red-text" handler={signOut}>
            Выйти из аккаунта
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;