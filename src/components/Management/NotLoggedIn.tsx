import React from "react";
import { Link } from "react-router-dom";
import { BiLogInCircle } from "react-icons/bi";

import "./NotLoggedIn.css";

const NotLoggedIn: React.FC = () => {
    return (
        <div className="absolute w-full h-full bg-color pt-64 md:pl-0 select-none">
            <div className="relative max-w-[30rem] h-[8rem] m-auto rounded-lg border-8 border-gray-500 form text-gray-900">
                <span className="w-full h-2">
                    <p className="pt-2 pb-3 pl-2 text-black bg-cyan-300">Not Logged In</p>
                    <hr className="border-2 border-black mt-0" />
                    <p className="pl-2">Log in to continue.</p>
                </span>
                <span className="absolute w-full h-full text-right pr-4">
                    <Link to="/login" className="pt-2 pb-[13px] px-3 bg-cyan-500 rounded-lg">
                        <BiLogInCircle className="inline h-6 w-6 mr-4" />
                        <p className="inline">Log In</p>
                    </Link>
                </span>
            </div>
        </div>
    )
}

export default NotLoggedIn;
