import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useDarkmodeContext } from "./context/darkmodeContextProvider";

const Darkmode: React.FC = () => {
    const { useDarkmode: isDarkmode, setUseDarkmode } = useDarkmodeContext();

    return (
        <button
            className="text-center"
            onClick={() => {
                setUseDarkmode(!isDarkmode);
                localStorage.setItem("useDarkmode", `${!isDarkmode}`);
            }}
        >
            {
                isDarkmode
                    ? <BsSun className={`w-6 h-6 hover:text-cyan-600 ${isDarkmode ? "text-white" : "text-black"}`} />
                    : <BsMoon className={`w-6 h-6 hover:text-cyan-600 ${isDarkmode ? "text-white" : "text-black"}`} />
            }
        </button>
    )
}

export default Darkmode;
