import React from "react";
import { NavLink, Link } from "react-router-dom";

import Header from "../Header/Header";
import Input from "../Input/Input";
import Button from "../Button/Button";
import "./Profile.css";

function Profile() {
  return (
    <section className="profile">
      <Header className="header_type_white"/>
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">
          <Input label="Имя" type="name" modifier="profile" />
          <Input label="E-mail" type="email" modifier="profile" />
        </form>
        <div className="profile__buttons">
          <Button type="button" className="button_type_profile">Редактировать</Button>
          <Link to="/" className="button_type_profile">
          <Button type="button" className="button_type_profile button_type_red-text">
            Выйти из аккаунта
          </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Profile;