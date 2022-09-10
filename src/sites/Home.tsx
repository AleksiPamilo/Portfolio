import React from "react";

const Home: React.FC = () => {
  document.title = "Portfolio – Home";

  return (
    <div className="w-full h-full select-none md:pl-60 md:pt-[20rem] pl-5 pt-[5rem]">
      <p className="font-bold text-gray-500">Hello</p>
      <h1 className="text-5xl font-extrabold mt-3 text-gray-600">My name is <span className="text-cyan-600">Aleksi</span> Pamilo</h1>
      <h4 className="mt-5 text-gray-500">I am currently studying information and communication technologies.<br />I have experience in JS, TS, C#, HTML, CSS, React and Vue.</h4>
      <div className="mt-10">
        <a href="/projects" className="text-white bg-cyan-600 font-semibold py-2 px-14 rounded-sm hover:bg-cyan-700">My Projects</a>
      </div>
    </div>
  )
}

export default Home;
