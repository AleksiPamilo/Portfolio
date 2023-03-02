import React from "react";
import scrollTo from "../utils/scrollTo";

const Home: React.FC = () => {
    return (
        <div className="md:pl-60 md:pt-[20rem] px-10 pt-[13rem]">
            <p className="font-bold text-gray-400">Hello</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-500">My name is <span className="text-white">Aleksi</span> Pamilo</h1>
            <div className="mt-5 text-gray-400">
                <p>I am currently studying information and communication technologies.</p>
                <p>I have experience including but not limited to JS, TS, C#, HTML, CSS and Vue.</p>
                <p>Currently i code mainly with React or NextJS and TypeScript!</p>
            </div>
            <div className="mt-10">
                <button onClick={() => scrollTo("projects")} className="text-white border font-semibold py-2 px-14 rounded-sm hover:shadow-glow-5 transition ease-in-out duration-300">My Projects</button>
            </div>
        </div>
    )
}

export default Home;
