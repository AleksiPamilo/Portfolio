import React, { useEffect } from "react";
import { HiLogout } from "react-icons/hi";
import { useAuthContext } from "../../components/context/authContextProvider";

const Messages: React.FC = () => {
    const { checkLogin, handleLogout } = useAuthContext();

    useEffect(() => {
        checkLogin();
    }, [checkLogin]);

    return (
        <div className="flex w-full h-full pt-[10rem]">
            <button onClick={handleLogout} className="absolute top-0 right-0 mt-3 mr-[15%] md:mr-[10%] bg-cyan-600 py-2 px-3 rounded-lg"><HiLogout className="w-5 h-5 text-white" /></button>
            <div className="">
                <h1 className="text-4xl font-bold text-center">Messages</h1>

            </div>
        </div>
    )
}

export default Messages;
