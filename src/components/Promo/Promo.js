import React from "react";
import NavTab from "../NavTab/NavTab";

import "./Promo.css";
import PromoImage from "../Icons/PromoImage";

function Promo() {
  return (
    <section className="promo main__promo">
       <dev className="promo__info">
      <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
      </h1>
        <h2 className="promo__text">
        Листайте ниже, чтобы узнать больше про этот проект и его создателя.
      </h2>
      <NavTab />
      </dev>
      <nav className="promo__image">
      <PromoImage/>
        </nav>
    </section>
  );
}

export default Promo;