import React from "react";
import { Link } from "react-router-dom";
import { useModal } from "../components/context/ModalContextProvider";
import Contact from "../components/modals/Contact";

const Home: React.FC = () => {
    const { setIsModalOpen, setModalContent } = useModal();

    const openModal = () => {
        setModalContent(<Contact />);
        setIsModalOpen(true);
    }

    return (
        <main className="md:pl-60 md:pt-[20rem] px-10 pt-[13rem]">
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 text-gray-400">
                Hello! I'm <span className="text-emerald-400">Aleksi</span> Pamilo
            </h1>
            <div className="max-w-[58rem] mt-5 text-gray-300">
                <p>Recent graduate in Information and Communication Technologies with exposure to various programming languages including JS, TS, and introductory knowledge in C#. Proficient in web development, specializing in React, Next.js, and TypeScript. Eager to continue learning and expanding my skills in the dynamic field of software development.</p>
            </div>

            <div className="mt-6 ">
                <button
                    onClick={openModal}
                    className="text-white font-semibold py-2 px-8 shadow-md rounded-sm border border-emerald-300 hover:bg-emerald-400 transition-all ease-in-out duration-700">
                    Contact Me!
                </button>
            </div>
        </main>
    )
}

export default Home;
