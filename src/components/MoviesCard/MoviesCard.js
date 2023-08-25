import React, { useState, useEffect } from "react";

import Button from "../Button/Button";
import Like from "../Icons/Like"
import Delete from "../Icons/Delete"
import { getCorrectDuration } from "../../utils/getCorrectDuration";
import LikeActive from "../Icons/LikeActive"
import "./MoviesCard.css";

function MoviesCard({ onSavedPage, savedMovies, onSaveHandler, onDeleteHandler, ...props }) {
  const [isSaved, setIsSaved] = useState(false);
  const SERVER_URL = "https://api.nomoreparties.co/";

  useEffect(() => {
    if (savedMovies.some((movie) => movie.movieId === props.id)) {
      setIsSaved(true);
    }
  }, [savedMovies, props.id])

  const handleSave = () => {
    const movieData = {
      country: props.country,
      director: props.director,
      duration: props.duration,
      year: props.year,
      description: props.description,
      image: SERVER_URL + props.image.url,
      trailerLink: props.trailerLink,
      nameRU: props.nameRU,
      nameEN: props.nameEN,
      thumbnail: SERVER_URL + props.image.formats.thumbnail.url,
      movieId: props.id,
    };
  onSaveHandler(movieData, setIsSaved);
  };

  const handleDelete = () => {
    onDeleteHandler(props._id || props.id, setIsSaved);
  };

  return (
    <li className="movies-card">
        <a
        className="movies-card__link"
        href={props.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={onSavedPage ? props.image : SERVER_URL + props.image.url}
          alt={props.nameRU}
        />
      </a>
      <div className="movies-card__footer">
      <div>
      <h2 className="movies-card__title">{props.nameRU}</h2>
        <p className="movies-card__duration">
          {getCorrectDuration(props.duration)}
        </p>
      </div>  
        <Button
          className={`button_type_card ${
            isSaved && !onSavedPage
            ? "button_type_red"
            : "button_type_gray"
          }`}
          handler={onSavedPage
            ? handleDelete
            : isSaved
              ? handleDelete
              : handleSave}
        >
          {onSavedPage
            ? (<Delete />)
            : (isSaved
              ? (<LikeActive />)
              : <Like />)}
        </Button>
      </div>
    </li>
  );
}

export default MoviesCard;