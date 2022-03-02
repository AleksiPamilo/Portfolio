import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import "./Main.css";
import Darkmode from "../Darkmode";

const Navigation: React.FC = () => {
    const [toggle, setToggle] = useState(false);

    const toggleHidden = () => {
        const nav = (document.querySelector(".mobile-nav") as HTMLDivElement);
        nav.classList.toggle("hidden");

        setToggle(!toggle);
    };

    return (
        <div className="bg-transparent select-none">
            { /* Navigation */}
            <nav className="mt-8 mr-24 justify-end items-center hidden md:flex space-x-1">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/projects" className="nav-link">Projects</Link>
                <Link to="/cv" className="nav-link">CV</Link>
                <Link to="/contact" className="nav-link" onClick={() => toggleHidden()}>Contact</Link>
                <Darkmode />
            </nav>

            {/* Navigation Button */}
            <div className="m-4 text-right md:hidden block">
                <button onClick={() => toggleHidden()}>
                    {toggle ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                </button>
            </div>

            { /* Mobile Navigation */}
            <nav className="mobile-nav hidden md:hidden">
                <Link to="/" className="nav-link block text-center m-4" onClick={() => toggleHidden()}>Home</Link>
                <Link to="/projects" className="nav-link block text-center m-4" onClick={() => toggleHidden()}>Projects</Link>
                <Link to="/cv" className="nav-link block text-center m-4" onClick={() => toggleHidden()}>CV</Link>
                <Link to="/contact" className="nav-link block text-center m-4" onClick={() => toggleHidden()}>Contact</Link>
                <Darkmode />
            </nav>
        </div>
    )
}

export default Navigation;
