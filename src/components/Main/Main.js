import React from "react";
import AboutProject from "../AboutProject/AboutProject";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Main() {
  return (
    <>
    <main className='content'>
      <Header/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Footer/>
    </main>
      </>
  );
}

export default Main;