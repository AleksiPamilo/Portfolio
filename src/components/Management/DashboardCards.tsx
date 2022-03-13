import React from "react";
import { FiUsers } from "react-icons/fi";
import { useDarkmodeContext } from "../context/darkmodeContextProvider";

interface Idata {
    text: string;
    number: number;
    icon: any;
}

const data: Idata[] = [
    { text: "Users", number: Math.floor(Math.random() * 100 + 1), icon: <FiUsers className="w-8 h-8 mt-2 text-gray" /> },
    { text: "x", number: Math.floor(Math.random() * 100 + 1), icon: <FiUsers className="w-8 h-8 mt-2 text-gray" /> },
    { text: "y", number: Math.floor(Math.random() * 100 + 1), icon: <FiUsers className="w-8 h-8 mt-2 text-gray" /> },
    { text: "z", number: Math.floor(Math.random() * 100 + 1), icon: <FiUsers className="w-8 h-8 mt-2 text-gray" /> },
]

const DashboardCards: React.FC = () => {
    const { useDarkmode } = useDarkmodeContext();
    return (
        <>
            {
                data.map((x, i) => (
                    <div key={i} className={`flex w-[350px] mt-6 mr-6 p-6 rounded-lg space-x-2 justify-between shadow-lg ${useDarkmode ? "bg-cyan-900" : "bg-gray-200"}`}>
                        <div>
                            <p className={`${useDarkmode ? "text-gray-500" : "text-gray-400"} text-[16px] font-extrabold`}>{x.text}</p>
                            <p className={`${useDarkmode ? "text-white" : "text-gray-600"} text-2xl font-bold`}>{x.number}</p>
                        </div>
                        {x.icon}
                    </div>
                ))
            }
        </>
    )
}

export default DashboardCards;
