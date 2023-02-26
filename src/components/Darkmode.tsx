import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useDarkmode } from "../hooks";

const Darkmode: React.FC = () => {
    const { isDarkmode, setIsDarkmode } = useDarkmode();

    return (
        <button
            className="text-center"
            onClick={() => {
                setIsDarkmode(!isDarkmode);
                localStorage.setItem("useDarkmode", `${!isDarkmode}`);
            }}
        >
            {
                isDarkmode
                    ? <FiMoon className="text-3xl text-cyan-600 hover:text-cyan-400" />
                    : <FiSun className="text-3xl text-cyan-600 hover:text-cyan-400" />
            }
        </button>
    )
}

export default Darkmode;
