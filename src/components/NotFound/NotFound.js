import React from "react";

import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__content">
        <div className="not-found__text">
          <p className="not-found__error">404</p>
          <h1 className="not-found__title">Страница не найдена</h1>
        </div>
        <a className="not-found__back" href="javascript:history.back()">
          Назад
        </a>
      </div>
    </section>
  );
}

export default NotFound;