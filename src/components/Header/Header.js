import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import Burger from "../Icons/Burger"
import Button from "../Button/Button";
import Container from "../Container/Container";
import AccountButton from "../AccountButton/AccountButton";
import Sidebar from "../Sidebar/Sidebar";
import "./Header.css";

function Header({ className }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isAuth = true; // для смены кнопок

  const sidebarHandler = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <Container>
      <header className={`header app__header ${className}`}>
      <a className="header__link-logo" href="/">
            <Logo className="logo header__logo" />
        </a>
      {isAuth && (
        <nav className="header__nav">
          <ul className="header__links">
            <NavLink
              className="header__link"
              activeClassName="header__link_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              className="header__link"
              activeClassName="header__link_active"
              to="/saved-movies"
            >
              Сохраненные фильмы
            </NavLink>
          </ul>
        </nav>
                )}
        <div className="header__account-menu">
          {isAuth ? (
            <AccountButton />
          ) : (
            <>
            <div className="header__links">
            <Link to="/signup">
              <Button className="button_type_header button_type_white-text">
                Регистрация
              </Button>
            </Link>
            <Link to="/signin">
              <Button className="button_type_header button_type_green">
                Войти
              </Button>
            </Link>
            </div>
            </>
          )}
        </div>
        {isAuth && (
          <Burger
            className="header__burger-icon"
            handler={sidebarHandler}
          />
        )}
        <Sidebar isOpen={isSidebarOpen} closeHandler={sidebarHandler} />
      </header>
    </Container>
  );
  }
  
  export default Header;