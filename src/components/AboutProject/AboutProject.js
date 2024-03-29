import React from "react";

import TextCard from "../TextCard/TextCard";
import Roadmap from "../Roadmap/Roadmap";
import Title from "../Title/Title";
import "./AboutProject.css";

const textCards = [
  {
    id: 1,
    title: "Дипломный проект включал 5 этапов",
    description:
      "Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.",
  },
  {
    id: 2,
    title: "На выполнение диплома ушло 5 недель",
    description:
      "У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.",
  },
];

function AboutProject() {
  return (
      <section className="about" id="about">
        <Title title="О проекте" />
        <div className="about__cards">
          {textCards.map(({ id, title, description }) => (
            <TextCard key={id} title={title} description={description} />
          ))}
        </div>
        <Roadmap />
      </section>
  );
}

export default AboutProject;