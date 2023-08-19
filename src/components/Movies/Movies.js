import React from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Container from "../Container/Container";
import Icons from "../Icons/Icons";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./Movies.css";
import Button from "../Button/Button";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function Movies() {
    const allMovies = [
        {
          id: 1,
          title: "В погоне за Бенкси",
          duration: 27,
          imageUrl:
            "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        },
        {
          id: 2,
          title: "В погоне за Бенкси",
          duration: 27,
          imageUrl:
            "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            title: "В погоне за Бенкси",
            duration: 27,
            imageUrl:
              "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
          },
        {
          id: 4,
          title: "В погоне за Бенкси",
          duration: 27,
          imageUrl:
            "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
        },
        {
        id: 5,
        title: "В погоне за Бенкси",
        duration: 27,
        imageUrl:
          "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      },
      {
        id: 6,
        title: "В погоне за Бенкси",
        duration: 27,
        imageUrl:
          "https://images.unsplash.com/photo-1647755370031-2bb9782f922a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNnx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=60",
      },
      ];
  return (
    <>
        <section className="movies app__movies" aria-label="Фильмы">
        <Header className="header_type_white"/>
        <SearchForm />
          <MoviesCardList data={allMovies} />
          <div className="movies__footer">
            <Button className="button_type_more">Ещё</Button>
          </div>
        </section>
      <Footer />
    </>
  );
}

export default Movies;