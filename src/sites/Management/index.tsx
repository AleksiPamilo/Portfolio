import React, { useEffect } from "react";
import { useAuthContext } from "../../components/context/authContextProvider";
import { HiLogout } from "react-icons/hi"
import BarChart from "../../components/Management/Charts/BarChart";

const Management: React.FC = () => {
    const { checkLogin, handleLogout } = useAuthContext();
    useEffect(() => checkLogin(), []);

    return (
        <div className="pt-24 flex justify-center items-center">
            <button onClick={handleLogout} className="absolute top-0 right-0 mt-3 mr-[15%] md:mr-[10%] bg-cyan-600 py-2 px-3 rounded-lg"><HiLogout className="w-5 h-5 text-white" /></button>
            <BarChart />
        </div>
    )
}

export default Management;
