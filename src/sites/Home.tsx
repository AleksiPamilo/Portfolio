import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <main className="md:pl-60 md:pt-[20rem] px-10 pt-[13rem]">
            <p className="font-bold text-gray-400">Hello</p>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-500">My name is <span className="text-white">Aleksi</span> Pamilo</h1>
            <div className="max-w-[58rem] mt-5 text-gray-400">
                <p>Recent graduate in Information and Communication Technologies with exposure to various programming languages including JS, TS, and introductory knowledge in C#. Proficient in web development, specializing in React, Next.js, and TypeScript. Eager to continue learning and expanding my skills in the dynamic field of software development.</p>
            </div>

            <div className="mt-6">
                <Link to="/projects" className="text-white border font-semibold py-2 px-14 rounded-sm hover:shadow-glow-5 transition ease-in-out duration-300">My Projects</Link>
            </div>
        </main>
    )
}

export default Home;
