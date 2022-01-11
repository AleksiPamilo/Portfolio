import React from 'react'
import Darkmode from "../Darkmode/Main";
import logo from "../../media/logo.png";
import "./Main.css";

import { Link } from "react-router-dom"
import { FaBars, FaTimes  } from "react-icons/fa";

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
                <Link to="/" className="flex items-center py-5 px-2 txt-color">
                  <img src={logo} alt="" className="w-6 h-6" />
                </Link>
            </div>

            { /* Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">Home</Link>
              <Link to="/projects" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">Projects</Link>
              <Link to="/cv" className="py-2 px-3 txt-color rounded transition duration-300 hover:text-cyan-500">CV</Link>
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
          <Link to="/" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">Home</Link>
          <Link to="/projects" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">Projects</Link>
          <Link to="/cv" className="block text-center py-2 px-4 text-sm hover:bg-cyan-500">CV</Link>
          <Darkmode />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
