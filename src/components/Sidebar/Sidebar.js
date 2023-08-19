import React from "react";
import { NavLink, Link } from "react-router-dom";

import AccountButton from "../AccountButton/AccountButton";
import Close from "../Icons/Close";
import "./Sidebar.css";

function Sidebar({ isOpen, closeHandler }) {
  return (
    <div className={`app__overlay ${isOpen ? "app__overlay_visible" : ""}`}>
      <div
        className={`sidebar ${isOpen ? "sidebar_visible" : "sidebar_hidden"}`}
      >
        <ul className="sidebar__links">
        <NavLink
          type="button"
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/"
            exact
          >
          Главная
          </NavLink>
          <NavLink
            type="button"
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/movies"
          >
          Фильмы
          </NavLink>
          <NavLink
            type="button"
            className="sidebar__link"
            activeClassName="sidebar__link_active"
            to="/saved-movies"
          >
            Сохранённые фильмы
          </NavLink>
        </ul>
        <AccountButton />
        <Close type="button" className="sidebar__close-icon" handler={closeHandler} />
      </div>
    </div>
  );
}

export default Sidebar;