import React from "react";

import Button from "../Button/Button";
import Like from "../Icons/Like"
import LikeActive from "../Icons/LikeActive"
import "./MoviesCard.css";

function MoviesCard({ title, duration, imageUrl }) {
  return (
    <li className="movies-card">
      <img className="movies-card__image" src={imageUrl} alt={title} />
      <div className="movies-card__footer">
      <div>
      <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration} минут</p>
      </div>  
        <Button className="button_type_card"><LikeActive /></Button>
      </div>
    </li>
  );
}

export default MoviesCard;