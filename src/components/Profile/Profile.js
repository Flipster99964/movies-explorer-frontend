import React from "react";
import { NavLink, Link } from "react-router-dom";

import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile({ setIsLoggedIn }) {
  const history = useNavigate();

  const signOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    history.push("/signin");
  };
  return (
    <section className="profile">
      <Header className="header_type_white"/>
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <Input label="Имя" type="name" modifier="profile" maxlength={20} minlength={2}/>
          <Input label="E-mail" type="email" modifier="profile" />
        </form>
        <div className="profile__buttons">
          <Button type="button" className="button_type_profile">Редактировать</Button>
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