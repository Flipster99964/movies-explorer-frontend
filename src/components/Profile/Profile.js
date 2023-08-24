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

function Profile({ setIsLoggedIn, submitHandler }) {
  const { currentUser, setCurrentUser } = useContext(currentUserContext);
  
  const {
    values,
    errors,
    setValues,
    handleChange,
    isFormValid,
    setIsFormValid,
  } = UseCustomValidation();
  const history = useNavigate();
  const amountInputs = countInputs(".input");

  UseCheckFormValidity(values, errors, amountInputs, setIsFormValid);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser.name, currentUser.email, setValues]);

  const signOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history("/signin");
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
          />
        </form>
        <div className="profile__buttons">
          <Button
            className={`button_type_profile ${
              !isFormValid && "button_type_disabled"
            }`}
            type="submit"
            isFormValid={isFormValid}
          >
            Редактировать
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