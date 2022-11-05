import React, { useState } from "react";
import Darkmode from "./Darkmode";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiInstagram, FiLinkedin, FiGithub, FiMessageSquare } from "react-icons/fi";
import { navItems, managementNavItems } from "../common/navItems";
import { useModal } from "../hooks";
import Contact from "./modals/Contact";

import "../styles/navigation.css";

const Navigation: React.FC = () => {
    const { setModalIsOpen: setIsModalOpen, setModalContent } = useModal();
    const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
    const navLinks = window.location.pathname.includes("/management")
        ? managementNavItems
        : navItems;

    const toggleHidden = () => {
        const nav = (document.querySelector(".mobile-nav") as HTMLDivElement);
        nav.classList.toggle("hidden");

        setMobileNavVisible(!mobileNavVisible);
    };


    const openModal = () => {
        setModalContent(<Contact />);
        setIsModalOpen(true);
    }

    return (
        <>
            {/* Desktop */}
            <div className="absolute w-screen items-center justify-center p-4 select-none hidden md:flex">
                <div className="flex gap-6">
                    {
                        navLinks.map((x, i) => <a
                            key={i}
                            href={x.path}
                            className={`${window.location.pathname === x.path ? "text-cyan-600" : "linkColor"} text-lg`}
                        >
                            {x.title}
                        </a>)
                    }
                </div>
                <div className="flex gap-4 absolute right-0 pr-[5%]">
                    <a href="https://www.instagram.com/aleksi.pamilo/" target="_blank" rel="noopener noreferrer" >
                        <FiInstagram className="text-3xl text-gray-700 hover:text-cyan-600" />
                    </a>
                    <a href="https://www.linkedin.com/in/aleksi-pamilo-62aaa5229/" target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="text-3xl text-gray-700 hover:text-cyan-600" />
                    </a>
                    <a href="https://github.com/AleksiPamilo" target="_blank" rel="noopener noreferrer">
                        <FiGithub className="text-3xl text-gray-700 hover:text-cyan-600" />
                    </a>
                    <button onClick={openModal}>
                        <FiMessageSquare className="text-3xl text-gray-700 hover:text-cyan-600" />
                    </button>
                    <Darkmode />
                </div>
            </div>

            {/* Navigation Button */}
            <div className={`text-right p-4 nav-button md:hidden block ${mobileNavVisible && "nav-bg"}`}>
                <button onClick={() => toggleHidden()}>
                    {mobileNavVisible ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile */}
            <div className="w-full text-center pb-6 select-none mobile-nav border-b-2 border-b-cyan-600 drop-shadow-2xl absolute rounded-b-lg z-20 hidden md:hidden transition-transform ease-linear">
                <hr className="w-[90%] m-auto mb-3 border-gray-700" />
                <div className="flex flex-col gap-3 items-center">
                    {
                        navLinks.map((x, i) => <a
                            key={i}
                            href={x.path}
                            className={`${window.location.pathname === x.path ? "text-cyan-600" : "linkColor"}`}
                        >
                            {x.title}
                        </a>)
                    }
                    <div className="flex flex-row gap-2">
                        <a href="https://www.instagram.com/aleksi.pamilo/" target="_blank" rel="noopener noreferrer" >
                            <FiInstagram className="text-3xl text-gray-700 hover:text-cyan-600" />
                        </a>
                        <a href="https://www.linkedin.com/in/aleksi-pamilo-62aaa5229/" target="_blank" rel="noopener noreferrer">
                            <FiLinkedin className="text-3xl text-gray-700 hover:text-cyan-600" />
                        </a>
                        <a href="https://github.com/AleksiPamilo" target="_blank" rel="noopener noreferrer">
                            <FiGithub className="text-3xl text-gray-700 hover:text-cyan-600" />
                        </a>
                        <button onClick={openModal}>
                            <FiMessageSquare className="text-3xl text-gray-700 hover:text-cyan-600" />
                        </button>
                        <Darkmode />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navigation;
