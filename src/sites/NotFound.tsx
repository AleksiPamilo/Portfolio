import React from "react";
import { Link } from "react-router-dom";
import { useDarkmode } from "../hooks";

const NotFound: React.FC = () => {
    const { isDarkmode } = useDarkmode();
    const arr = ["Are you lost? How'd you even get here?", "Oops, You weren't supposed to see this!", "You shouldn't be here."];

    document.title = "Portfolio – 404";

    return (
        <div className={`${isDarkmode ? "text-white" : "text-black"} flex w-screen h-screen absolute justify-center pt-[10rem] md:pt-[15rem]`}>
            <div>
                <p className="text-cyan-500 md:text-2xl text-xl">An error occurred</p>
                <h1 className="name mt-2 md:text-7xl text-3xl">404 | Page Not Found</h1>
                <p className="secondary-txt mt-5 mb-10 md:text-2xl text-md">{String(arr[Math.floor(Math.random() * arr.length)])}</p>
                <Link to="/" className="py-4 px-5 text-xl rounded border-2 text-cyan-500 border-cyan-500 hover:bg-cyan-600 hover:text-white ease-in-out duration-300">Back to Home Page!</Link>
            </div>
        </div>
    )
}

export default NotFound;
