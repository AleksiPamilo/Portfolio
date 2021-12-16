import React from 'react';
import "./Main.css";

type LandingPageProps = {

}

const LandingPage: React.FC<LandingPageProps> = () => {

  document.title = "Portfolio | Home";

  return (
    <div className="ml-60 mt-44">
      <p className="text-cyan-500 text-2xl">Hi, my name is</p>
      <h1 className="name mt-2 text-7xl">Aleksi Pamilo.</h1>
      <h2 className="secondary-txt text-5xl">Welcome to my portfolio!</h2>
      <p className="secondary-txt mt-10 mb-10">I am currently studying information and communication technologies.<br />I have experience in JS, TS, C#, HTML and CSS.</p>
      <a href="/projects" className="py-3 px-4 rounded border-2 text-cyan-500 border-cyan-500">Check out my projects!</a>
    </div>
  )
}

export default LandingPage