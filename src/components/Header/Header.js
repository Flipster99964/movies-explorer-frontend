import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import Logo from "../Logo/Logo";
import Burger from "../Icons/Burger"
import Button from "../Button/Button";
import Container from "../Container/Container";
import AccountButton from "../AccountButton/AccountButton";
import Sidebar from "../Sidebar/Sidebar";
import currentUserContext from "../../context/currentUserContext";
import "./Header.css";

function Header({ className }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  {/*const isAuth = true; // для смены кнопок*/}
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { currentUser, setCurrentUser } = useContext(currentUserContext);

  const sidebarHandler = () => setIsSidebarOpen(!isSidebarOpen);
 
  useEffect(() => {
    currentUser.name === ""
      ? setIsLoggedIn(false)
      : setIsLoggedIn(true);
    }, [currentUser.name])

  return (
    <Container>
      <header className={`header app__header ${className}`}>
      <a className="header__link-logo" href="/">
            <Logo className="logo header__logo" />
      </a>
      {isLoggedIn && (
        <nav className="header__nav">
          <ul className={`header__links ${isLoggedIn
            ? ""
            : "header__links_type_hidden"}`}>
            <NavLink
              type="button"
              className="header__link"
              activeClassName="header__link_active"
              to="/movies"
            >
              Фильмы
            </NavLink>
            <NavLink
              type="button"
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
          {isLoggedIn ? (
          <div className="header__account-button">
            <AccountButton />
          </div>
          ) : (
            <>
            <div className="header__links">
            <Link to="/signup">
              <Button type="button" className="button_type_header button_type_white-text">
                Регистрация
              </Button>
            </Link>
            <Link to="/signin">
              <Button type="button" className="button_type_header button_type_green">
                Войти
              </Button>
            </Link>
            </div>
            </>
          )}
        </div>
        {isLoggedIn && (
          <Button type="button" className="button_type_burger" onclick={setIsSidebarOpen}>
          <Burger
            className="header__burger-icon"
            handler={sidebarHandler}
          />
          </Button>
        )}
        <Sidebar isOpen={isSidebarOpen} closeHandler={sidebarHandler} />
      </header>
    </Container>
  );
  }
  
  export default Header;