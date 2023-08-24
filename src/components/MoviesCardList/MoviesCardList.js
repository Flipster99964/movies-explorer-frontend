import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ data }) {
  return (
    <section className="movies-list_section">
    <ul className="movies-list">
    <MoviesCard nameRU = "тест"></MoviesCard>
    {data && data.map((movie) => (
        <MoviesCard nameRU = "тест" key={movie.id} imageUrl={movie.image.url} link={movie.trailerLink} {...movie} />
      ))}
    </ul>
    </section>
  );
}

export default MoviesCardList;