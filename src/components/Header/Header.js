import React from "react";

import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import AccountButton from "../AccountButton/AccountButton";
import "./Header.css";

function Header() {
  
    return (
      <header className="header app__header">
        <nav className="header__nav">
          <Logo className="logo header__logo" />
          <ul className="header__links">
            <li className="header__link header__link_active">Фильмы</li>
            <li className="header__link">Сохраненные фильмы</li>
          </ul>
        </nav>
        <div className="header__account-menu">
          {/* <Button className="button_type_none">Регистрация</Button>
          <Button className="button_type_green">Войти</Button> */}
        </div>
        {/*<Sidebar isOpen={isSidebarOpen} closeHandler={sidebarHandler} /> */}
      </header>
    );
  }
  
  export default Header;