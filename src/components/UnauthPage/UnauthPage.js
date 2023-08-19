import React from "react";

import Logo from "../Logo/Logo";
import "./UnauthPage.css";

function UnauthPage({ title, children }) {
  return (
    <section className="unauth-page">
      <div className="unauth-page__container">
        <a className="logo unauth-page__logo" href="/">
          <Logo className="logo unauth-page__logo" />
        </a>
        <h1 className="unauth-page__title">{title}</h1>
        {children}
      </div>
    </section>
  );
}

export default UnauthPage;