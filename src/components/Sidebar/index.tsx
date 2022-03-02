import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import { signOut, getAuth } from "firebase/auth";
import { useDarkmodeContext } from "../context/darkmodeContextProvider";
import { AiOutlineHome, AiOutlineMail, AiOutlineFileText, AiOutlineFundProjectionScreen } from "react-icons/ai";
import { BiExitFullscreen, BiFullscreen, BiLogOutCircle } from "react-icons/bi";

import Darkmode from "../Darkmode";

const Sidebar: React.FC = () => {
    const { useDarkmode } = useDarkmodeContext();
    const [minimized, setMinimized] = useState<boolean>(false);

    useEffect(() => {
        if (isMobile) setMinimized(true)
    }, []);

    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth).catch(() => alert("Logging Out Failed"));
    };

    return (
        <>
            { /* Desktop Sidebar */}
            <div className={`${minimized ? "hidden" : "block"} ${useDarkmode ? "bg-[#0d1117] border-white" : "bg-[#dbf3f5] border-gray-900"} w-64 min-h-screen absolute border-r select-none`}>
                <div className="text-center pt-10">
                    <Link to="/management" className="text-cyan-500 font-bold text-3xl block pb-4">Dashboard.</Link>
                    <span className="text-white bg-cyan-600 rounded-lg p-2">Beta v1.0</span>
                </div>

                <ul className="mt-20">
                    <li className={`mb-2 w-40 h-10 mx-auto rounded-lg pt-2 pl-4 ${useDarkmode ? "text-white" : "text-black hover:text-white"} hover:bg-gray-600`}>
                        <Link className="inline" to="/">
                            <AiOutlineHome className="inline w-5 h-5 mr-6" />
                            Portfolio
                        </Link>
                    </li>
                    <li className={`mb-2 w-40 h-10 mx-auto rounded-lg pt-2 pl-4 ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management" ? "bg-gray-600 text-white" : "hover:bg-gray-600"}`}>
                        <Link className="inline" to="/management">
                            <AiOutlineFundProjectionScreen className="inline w-5 h-5 mr-6" />
                            Dashboard
                        </Link>
                    </li>
                    <li className={`mb-2 w-40 h-10 mx-auto rounded-lg pt-2 pl-4 ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management/cv" ? "bg-gray-600 text-whi" : "hover:bg-gray-600"}`}>
                        <Link className="inline" to="/management/cv">
                            <AiOutlineFileText className="inline w-5 h-5 mr-6" />
                            Modify CV
                        </Link>
                    </li>
                    <li className={`mb-2 w-40 h-10 mx-auto rounded-lg pt-2 pl-4 ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management/email" ? "bg-gray-600 text-whi" : "hover:bg-gray-600"}`}>
                        <Link className="inline" to="/management/email">
                            <AiOutlineMail className="inline w-5 h-5 mr-6" />
                            Emails
                        </Link>
                    </li>
                    <li className={`mb-8 w-40 h-10 mx-auto hover:bg-red-500 rounded-lg pt-2 pl-4 ${useDarkmode ? "text-white" : "text-black hover:text-white"}`}>
                        <BiLogOutCircle className="inline w-5 h-5 mr-6" />
                        <Link className="" to="/login" onClick={handleLogout}>Sign Out</Link>
                    </li>
                </ul>
                <Darkmode />
            </div>

            { /* minimizedd Sidebar */}
            <div className={`${minimized ? "block" : "hidden"} ${useDarkmode ? "bg-[#0d1117] border-white" : "bg-[#dbf3f5] border-gray-900"} w-[3.6rem] min-h-screen absolute border-r select-none`}>

                <div className="text-center mt-10">
                    <Link to="/management" className="text-cyan-500 font-bold text-3xl block mb-4">D.</Link>
                    <span className="text-white text-sm bg-cyan-600 rounded-lg p-2">v1.0</span>
                </div>

                <ul className="mt-20">
                    <li className={`mb-2 w-12 h-10 m-auto rounded-lg pt-2 pl-[14px] ${useDarkmode ? "text-white" : "text-black hover:text-white"} hover:bg-gray-600`}>
                        <div className="relative">
                            <Link className="group cursor-pointer relative inline-block text-center" to="/">
                                <AiOutlineHome className="inline w-5 h-5" />
                                <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute  group-hover:opacity-100 bottom-0 left-1/2 ml-6 px-3">
                                    Portfolio
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className={`mb-2 w-12 h-10 m-auto rounded-lg pt-2 pl-[14px] ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management" ? "bg-gray-600 text-whi" : "hover:bg-gray-600"}`}>
                        <div className="relative">
                            <Link className="group cursor-pointer relative inline-block text-center" to="/management">
                                <AiOutlineFundProjectionScreen className="inline w-5 h-5" />
                                <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute  group-hover:opacity-100 bottom-0 left-1/2 ml-6 px-3">
                                    Dashboard
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className={`mb-2 w-12 h-10 m-auto rounded-lg pt-2 pl-[14px] ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management/cv" ? "bg-gray-600 text-whi" : "hover:bg-gray-600"}`}>
                        <div className="relative">
                            <Link className="group cursor-pointer relative inline-block text-center" to="/management/cv">
                                <AiOutlineFileText className="inline w-5 h-5 mr-4" />
                                <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute  group-hover:opacity-100 bottom-0 left-1/2 ml-6 px-3">
                                    Modify CV
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className={`mb-2 w-12 h-10 m-auto rounded-lg pt-2 pl-[14px] ${useDarkmode ? "text-white" : "text-black hover:text-white"} ${window.location.pathname === "/management/email" ? "bg-gray-600 text-whi" : "hover:bg-gray-600"}`}>
                        <div className="relative">
                            <Link className="group cursor-pointer relative inline-block text-center" to="/management/email">
                                <AiOutlineMail className="inline w-5 h-5 mr-4" />
                                <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute  group-hover:opacity-100 bottom-0 left-1/2 ml-6 px-3">
                                    Emails
                                </div>
                            </Link>
                        </div>
                    </li>
                    <li className="mb-2 w-12 h-10 m-auto rounded-lg pt-2 pl-[14px] hover:bg-red-500">
                        <div className="relative">
                            <Link className="group cursor-pointer relative inline-block text-center" to="/login"
                                onClick={handleLogout}>
                                <BiLogOutCircle className="inline w-5 h-5 mr-4" />
                                <div className="opacity-0 w-28 bg-black text-white text-center text-xs rounded-lg py-2 absolute  group-hover:opacity-100 bottom-0 left-1/2 ml-6 px-3">
                                    Sign Out
                                </div>
                            </Link>
                        </div>
                    </li>
                </ul>
                <Darkmode />
            </div>

            <div className={`absolute mt-2 ${minimized ? "left-[4.2rem]" : "left-[16.5rem]"}`}>
                <button className="py-2 px-3 bg-cyan-500 rounded-lg"
                    onClick={() => setMinimized(!minimized)}>
                    {minimized ? <BiFullscreen /> : <BiExitFullscreen />}
                </button>
            </div>
        </>
    )
}
export default Sidebar;
