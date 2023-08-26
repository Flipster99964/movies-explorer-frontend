import React from "react";
import "./Footer.css";

const links = [
  {
    id: 1,
    title: "Яндекс.Практикум",
    url: "https://practicum.yandex.ru/",
  },
  {
    id: 2,
    title: "Github",
    url: "https://github.com/flipster99964",
  }
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__information">
          <p className="footer__year">&#169; 2022</p>
          <ul className="footer__links">
          <li className="footer__socials-item">
                <a className="footer__link" target="_blank" href="https://practicum.yandex.ru/">
                  Яндекс.Практикум
                </a>
              </li>
          <li className="footer__socials-item">
                <a className="footer__link" target="_blank" href="https://github.com/flipster99964">
                  Github
                </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;