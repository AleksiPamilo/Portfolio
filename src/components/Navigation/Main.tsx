import React, { useState } from 'react'
import Darkmode from "../Darkmode/Main";
import logo from "../../media/logo.webp";
import logo2 from "../../media/logo2.webp";
import "./Main.css";

import { Link } from "react-router-dom"
import { FaBars, FaTimes  } from "react-icons/fa";
import { useDarkmodeContext } from "../context/darkmodeContextProvider";

type NavigationProps = {

}

const Navigation: React.FC<NavigationProps> = () => {

  const [toggle, setToggle] = useState(false);
  const { useDarkmode } = useDarkmodeContext();

  const toggleHidden = () => {
    const menu = (document.querySelector(".mobile-menu") as HTMLDivElement);
    menu.classList.toggle("hidden");

    setToggle(!toggle);
  };

  return (
    <div>

      <nav className="bg-transparent">
        <div className="max-w-[100rem] mt-6 mx-auto px-6">
          <div className="flex justify-between">

            { /* Logo */}
            <div className="flex space-x-1">
                <Link to="/" className="flex items-center py-5 px-2 txt-color">
                  <img src={ useDarkmode ? logo : logo2} alt="" className="w-6 h-6" />
                </Link>
            </div>

            { /* Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="txt-color py-2 px-3 uppercase hover:text-cyan-500">Home</Link>
              <Link to="/projects" className="txt-color py-2 px-3 uppercase hover:text-cyan-500">Projects</Link>
              <Link to="/cv" className="txt-color py-2 px-3 uppercase hover:text-cyan-500">CV</Link>
              <Darkmode />
            </div>
          
            { /* Mobile Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => toggleHidden() }>
                {toggle ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        { /* Mobile Nav */}
        <div className="mobile-menu hidden md:hidden">
          <Link to="/" className="block text-center py-2 px-4 text-sm uppercase hover:bg-cyan-500" onClick={() => toggleHidden() }>Home</Link>
          <Link to="/projects" className="block text-center py-2 px-4 text-sm uppercase hover:bg-cyan-500" onClick={() => toggleHidden() }>Projects</Link>
          <Link to="/cv" className="block text-center py-2 px-4 mb-[3px] text-sm uppercase hover:bg-cyan-500" onClick={() => toggleHidden() }>CV</Link>
          <Darkmode />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
