import React from 'react';
import "./Main.css";

import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {

  document.title = "Portfolio | Home";

  return (
    <div className="select-none md:ml-60 md:mt-44 ml-5 mt-12">
      <p className="text-cyan-600 text-xl md:text-2xl">Hi, my name is</p>
      <h1 className="name mt-2 text-5xl md:text-7xl">Aleksi Pamilo.</h1>
      <h2 className="secondary-txt text-3xl md:text-5xl">Welcome to my portfolio!</h2>
      <p className="secondary-txt mt-10 mb-10 font-bold">I am currently studying information and communication technologies.<br />I have experience in JS, TS, C#, HTML, CSS and React.</p>
      <Link to="/projects" className="inline-block py-3 px-4 w-[250px] rounded-lg text-center border-2 text-cyan-600 border-cyan-600 mr-3 mb-3 hover:border-4">Check out my projects!</Link>
      <Link to="/cv" className="inline-block py-3 px-4 w-[250px] rounded-lg text-center border-2 text-cyan-600 border-cyan-600 mr-3 hover:border-4">Check out my CV!</Link>
    </div>
  )
}

export default LandingPage
