import React from "react";
import { FiInstagram, FiLinkedin, FiGithub, FiMessageSquare } from "react-icons/fi";
import { useModal } from "../hooks";
import Contact from "./modals/Contact";

const Footer: React.FC = () => {
    const { setModalIsOpen: setIsModalOpen, setModalContent } = useModal();

    const openModal = () => {
        setModalContent(<Contact />);
        setIsModalOpen(true);
    }

    return (
        <div className="w-full absolute right-0 left-0 bottom-0 pb-12 pl-24">
            <div className="flex items-center">
                <a href="https://www.instagram.com/aleksi.pamilo/" target="_blank" rel="noopener noreferrer" >
                    <FiInstagram className="text-3xl text-gray-700 hover:text-cyan-600" />
                </a>
                <a href="https://www.linkedin.com/in/aleksi-pamilo-62aaa5229/" target="_blank" rel="noopener noreferrer" className="ml-5">
                    <FiLinkedin className="text-3xl text-gray-700 hover:text-cyan-600" />
                </a>
                <a href="https://github.com/AleksiPamilo" target="_blank" rel="noopener noreferrer" className="ml-5">
                    <FiGithub className="text-3xl text-gray-700 hover:text-cyan-600" />
                </a>
                <button className="ml-5" onClick={openModal}>
                    <FiMessageSquare className="text-3xl text-gray-700 hover:text-cyan-600" />
                </button>
            </div>
        </div>
    )
}

export default Footer;