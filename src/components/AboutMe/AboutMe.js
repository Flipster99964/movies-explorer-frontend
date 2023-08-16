import React from "react";

import Title from "../Title/Title";
import LinkIcon from "../Icons/LinkIcon";
import photo from "../../images/avatar.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
      <section className="about-me">
        <Title title="Студент" />
        <div className="student about-me__student">
          <div className="student__information">
            <h3 className="student__name">Егор</h3>
            <p className="student__about">
              Начинающий фронтенд-разработчик, 19 лет
            </p>
            <p className="student__description">
              Я родился и живу в Нижнем Новогороде, учусь на физическом факультете ННГУ.
              Я люблю слушать музыку. Недавно начал кодить. После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами.
            </p>
            <ul className="student__socials">
              <li className="student__socials-item">
                <a className="student__link" target="_blank" href="https://github.com/Flipster99964">
                  Github
                </a>
              </li>
            </ul>
          </div>
          <img className="student__photo" src={photo} alt="Толя" />
        </div>
        <div className="portfolio">
          <h3 className="portfolio__title">Портфолио</h3>
          <ul className="portfolio__projects">
            <li className="project__item">
              <a
                href="https://github.com/Flipster99964/how-to-learn"
                className="project__link"
                target="_blank"
                rel="noreferrer"
              >
                Статичный сайт
                <LinkIcon className="project__icon" />
              </a>
            </li>
            <li className="project__item">
              <a
                href="https://flipster99964.github.io/russian-travel/"
                className="project__link"
                target="_blank"
                rel="noreferrer"
              >
                Адаптивный сайт
                <LinkIcon className="project__icon" />
              </a>
            </li>
            <li className="project__item">
              <a
                href="https://github.com/Flipster99964/react-mesto-api-full"
                className="project__link"
                target="_blank"
                rel="noreferrer"
              >
                Одностраничное приложение
                <LinkIcon className="project__icon" />
              </a>
            </li>
          </ul>
        </div>
      </section>
  );
}

export default AboutMe;