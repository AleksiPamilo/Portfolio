import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { navItems, social } from "../data/navItems";
import { useModal } from "./context/ModalContextProvider";
import Contact from "./modals/Contact";

const Navigation: React.FC = () => {
    const navigate = useNavigate();
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
                    <a href={social.LinkedIn} target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="text-3xl hover:text-white" />
                    </a>
                    <a href={social.GitHub} target="_blank" rel="noopener noreferrer">
                        <FiGithub className="text-3xl hover:text-white" />
                    </a>
                </div>
                <div className="flex gap-5">
                    {
                        navItems.map((item) => (
                            <Link to={item.path} className="py-2 px-3 rounded-sm uppercase hover:opacity-60">{item.title}</Link>
                        ))
                    }
                    <button className="py-2 px-3 rounded-sm uppercase hover:opacity-60" onClick={openModal}>
                        Contact
                    </button>
                </div>
            </div>

            <button className="md:hidden fixed z-50 top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2" onClick={() => { setIsMenuOpen(!isMenuOpen) }}>
                {
                    isMenuOpen
                        ? <FaTimes className="text-3xl" />
                        : <FaBars className="text-3xl" />
                }
            </button>

            <div className={`md:hidden max-md:w-screen h-screen fixed flex items-center pt-4 justify-center z-10 text-white bg-[#111111] transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
                <div className="flex flex-col gap-5 items-center justify-center">
                    {
                        navItems.map((item) => (
                            <button className="w-full py-2 px-3 rounded-sm uppercase hover:opacity-60" onClick={() => {
                                setIsMenuOpen(!isMenuOpen);
                                navigate(item.path)
                            }}>{item.title}</button>
                        ))
                    }
                    <button className="w-full py-2 px-3 rounded-sm uppercase hover:opacity-60" onClick={openModal}>
                        Contact
                    </button>
                </div>
                <div className="flex flex-col gap-5 bottom-9 absolute">
                    <div className="flex gap-8 text-4xl text-gray-600">
                        <a href={social.LinkedIn} target="_blank" rel="noopener noreferrer">
                            <FiLinkedin className="hover:text-white" />
                        </a>

                        <a href={social.GitHub} target="_blank" rel="noopener noreferrer">
                            <FiGithub className="hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
