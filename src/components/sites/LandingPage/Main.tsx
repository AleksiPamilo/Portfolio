import React from 'react';
import "./Main.css";

import { Link } from "react-router-dom";

type LandingPageProps = {};
const LandingPage: React.FC<LandingPageProps> = () => {

  document.title = "Portfolio | Home";

  return (
    <div className="select-none md:ml-60 md:mt-44 ml-5 mt-12">
      <p className="text-cyan-500 text-xl md:text-2xl">Hi, my name is</p>
      <h1 className="name mt-2 text-5xl md:text-7xl">Aleksi Pamilo.</h1>
      <h2 className="secondary-txt text-3xl md:text-5xl">Welcome to my portfolio!</h2>
      <p className="secondary-txt mt-10 mb-10">I am currently studying information and communication technologies.<br />I have experience in JS, TS, C#, HTML, CSS and React.</p>
      <Link to="/projects" className="inline-block py-3 px-4 w-[200px] text-center rounded-lg border-2 text-cyan-500 border-cyan-500 mr-3 mb-3 hover:text-white hover:bg-cyan-500 transition ease-in-out duration-500">Check out my projects!</Link>
      <Link to="/cv" className="inline-block py-3 px-4 w-[200px] text-center rounded-lg border-2 text-cyan-500 border-cyan-500 mr-3 hover:text-white hover:bg-cyan-500 transition ease-in-out duration-500">Check out my CV!</Link>
    </div>
  )
}

export default LandingPage