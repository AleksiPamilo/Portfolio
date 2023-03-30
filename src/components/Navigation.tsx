import React from "react";
import scrollTo from "../utils/scrollTo";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { navItems, links } from "../common/navItems";
import { useModal } from "./context/ModalContextProvider";
import Contact from "./modals/Contact";

const Navigation: React.FC = () => {
    const { setIsModalOpen, setModalContent } = useModal();
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const openModal = () => {
        setModalContent(<Contact />);
        setIsModalOpen(true);
    }

    return (
        <nav>
            <div className="hidden md:flex w-full items-center pt-4 justify-around fixed z-10 text-white bg-[#111111]">
                <div className="flex gap-3 text-gray-600">
                    <a href={links.LinkedIn} target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="text-3xl hover:text-white" />
                    </a>
                    <a href={links.GitHub} target="_blank" rel="noopener noreferrer">
                        <FiGithub className="text-3xl hover:text-white" />
                    </a>
                </div>
                <div className="flex gap-5">
                    {
                        navItems.map((item) => (
                            <button className="py-2 px-3 rounded-sm uppercase hover:shadow-glow-5" onClick={() => scrollTo(item.path)}>{item.title}</button>
                        ))
                    }
                    <button className="py-2 px-3 rounded-sm uppercase hover:shadow-glow-5" onClick={openModal}>
                        Contact Me
                    </button>
                </div>
            </div>

            <button className="md:hidden fixed z-50 top-4 right-4 text-white" onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                {
                    isMenuOpen
                        ? <FaTimes className="text-3xl" />
                        : <FaBars className="text-3xl" />
                }
            </button>

            <div className={`md:hidden w-full h-full fixed items-center pt-4 justify-center z-10 text-white bg-[#111111] ${isMenuOpen ? "flex" : "hidden"}`}>
                <div className="flex flex-col gap-5 items-center justify-center">
                    {
                        navItems.map((item) => (
                            <button className="w-full py-2 px-3 rounded-sm uppercase hover:shadow-glow-5" onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                scrollTo(item.path);
                            }}>{item.title}</button>
                        ))
                    }
                    <button className="w-full py-2 px-3 rounded-sm uppercase hover:shadow-glow-5" onClick={openModal}>
                        Contact me
                    </button>
                </div>
                <div className="flex flex-col gap-5 bottom-9 absolute">
                    <div className="flex gap-8 text-4xl text-gray-600">
                        <a href={links.LinkedIn} target="_blank" rel="noopener noreferrer">
                            <FiLinkedin className="hover:text-white" />
                        </a>

                        <a href={links.GitHub} target="_blank" rel="noopener noreferrer">
                            <FiGithub className="hover:text-white" />
                        </a>

                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
