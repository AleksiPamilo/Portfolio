import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <main className="md:pl-60 md:pt-[20rem] px-10 pt-[13rem]">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-400">
                Hello! I'm <span className="text-emerald-400">Aleksi</span> Pamilo
            </h1>
            <div className="max-w-[58rem] mt-5 text-gray-300">
                <p>Recent graduate in Information and Communication Technologies with exposure to various programming languages including JS, TS, and introductory knowledge in C#. Proficient in web development, specializing in React, Next.js, and TypeScript. Eager to continue learning and expanding my skills in the dynamic field of software development.</p>
            </div>

            <div className="mt-6 ">
                <Link
                    to="/projects"
                    className="text-white font-semibold py-2 px-8 shadow-md rounded-md hover:bg-emerald-400 transition-all ease-in-out duration-700">
                    My Projects
                </Link>
            </div>
        </main>
    )
}

export default Home;
