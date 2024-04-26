import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { navItems, social } from "../data/navItems";
import { useModal } from "./context/ModalContextProvider";
import Contact from "./modals/Contact";

const Navigation: React.FC = () => {
    const { setIsModalOpen, setModalContent } = useModal();

    const openModal = () => {
        setModalContent(<Contact />);
        setIsModalOpen(true);
    }

    return (
        <nav>
            <div className="hidden md:flex top-0 left-0 w-full items-center pt-4 justify-around absolute z-10 text-white py-4">
                <div className="flex gap-3 text-gray-600">
                    <a href={social.LinkedIn} target="_blank" rel="noopener noreferrer">
                        <FiLinkedin className="text-3xl hover:text-emerald-400" />
                    </a>
                    <a href={social.GitHub} target="_blank" rel="noopener noreferrer">
                        <FiGithub className="text-3xl hover:text-emerald-400" />
                    </a>
                </div>
                <div className="flex">
                    {
                        navItems.map((item) => (
                            <Link to={item.path} className="flex items-center justify-center w-28 h-9 rounded uppercase hover:text-emerald-400">{item.title}</Link>
                        ))
                    }
                    <button className="w-28 h-9 rounded uppercase hover:text-emerald-400" onClick={openModal}>
                        Contact
                    </button>
                </div>
            </div>

            <div className="flex md:hidden bottom-0 z-50 left-0 fixed w-full p-4 items-center bg-zinc-900">
                <div className="flex items-center justify-center w-full gap-5 text-sm">
                    {
                        navItems.map((item) => (
                            <Link to={item.path} className="flex flex-col gap-1 items-center uppercase hover:text-emerald-400">
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        ))
                    }
                    <button className="flex flex-col gap-1 items-center uppercase hover:text-emerald-400" onClick={openModal}>
                        <FaEnvelope className="w-4 h-4" />
                        <span>Contact</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;
