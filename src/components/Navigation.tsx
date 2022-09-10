import React, { useState } from "react";
import Darkmode from "./Darkmode";
import { FaBars, FaTimes } from "react-icons/fa";
import { navItems, managementNavItems } from "../common/navItems";

import "../styles/Navigation.css";

const Navigation: React.FC = () => {
    const [mobileNavVisible, setMobileNavVisible] = useState<boolean>(false);
    const navLinks = window.location.pathname.includes("/management")
        ? managementNavItems
        : navItems;

    const toggleHidden = () => {
        const nav = (document.querySelector(".mobile-nav") as HTMLDivElement);
        nav.classList.toggle("hidden");

        setMobileNavVisible(!mobileNavVisible);
    };

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
                <div className="absolute right-0 pr-[5%]">
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
            <div className="w-full text-center pb-6 select-none mobile-nav absolute rounded-b-lg hidden md:hidden transition-transform ease-linear">
                <hr className="w-[90%] m-auto mb-3 border-gray-600" />
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
                    <Darkmode />
                </div>
            </div>
        </>
    )
}

export default Navigation;
