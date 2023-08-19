import React from "react";

import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

function MoviesCardList({ data }) {
  return (
    <section className="movies-list_section">
    <ul className="movies-list">
      {data.map((movie) => (
        <MoviesCard key={movie.id} {...movie} />
      ))}
    </ul>
    </section>
  );
}

export default MoviesCardList;