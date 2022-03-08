import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLinks } from "./NavLinks";

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
                {
                    NavLinks.map((x, i) => <Link key={i} to={x.path} className={`nav-link ${window.location.pathname === x.path ? "text-white" : "text-[#a0a0a0] hover:text-white"} `}>{x.title}</Link>)
                }
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
                {
                    NavLinks.map((x, i) => <Link
                        key={i}
                        to={x.path}
                        className={`nav-link block text-center m-4 ${window.location.pathname === x.path ? "text-white" : "text-[#a0a0a0] hover:text-white"} `}
                        onClick={toggleHidden}
                    >
                        {x.title}
                    </Link>)
                }
                <Darkmode />
            </nav>
        </div>
    )
}

export default Navigation;
