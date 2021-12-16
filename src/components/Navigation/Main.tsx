import React from 'react'
import Darkmode from "../Darkmode/Main";
import "./Main.css";

import { FaBars, FaTimes  } from "react-icons/fa";
import { AiOutlineHome } from "react-icons/ai";

type NavigationProps = {

}

const Navigation: React.FC<NavigationProps> = () => {

  const [toggle, setToggle] = React.useState(false);

  const toggleHidden = () => {
    const menu = (document.querySelector(".mobile-menu") as HTMLDivElement);
    menu.classList.toggle("hidden");

    setToggle(!toggle);
  };

  return (
    <div>

      <nav className="bg-transparent">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex justify-between">

            { /* Logo */}
            <div className="flex space-x-4">
                <a href="/" className="flex items-center py-5 px-2 txt-color">
                  <AiOutlineHome className="w-6 h-6" />
                </a>
            </div>

            { /* Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="/" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">Home</a>
              <a href="/projects" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">Projects</a>
              <a href="/cv" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">CV</a>
              <button className="py-2 px-3 rounded-xl border-2 border-cyan-500 transition duration-300 hover:bg-cyan-500"><Darkmode /></button>
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
          <a href="/" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">Home</a>
          <a href="/projects" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">Projects</a>
          <a href="/cv" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">CV</a>
          <Darkmode />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
