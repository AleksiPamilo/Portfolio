import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import { useDarkmodeContext } from "./context/darkmodeContextProvider";

import "../styles/Darkmode.css";

const Darkmode: React.FC = () => {
    const { useDarkmode, setUseDarkmode } = useDarkmodeContext();

    return (
        <button
            className="text-center"
            onClick={() => {
                setUseDarkmode(!useDarkmode);
                localStorage.setItem("useDarkmode", `${!useDarkmode}`);
            }}
        >
            {
                useDarkmode
                    ? <BsSun className="w-6 h-6 hover:text-cyan-600 darkmodeBtn" />
                    : <BsMoon className="w-6 h-6 hover:text-cyan-600 darkmodeBtn" />
            }
        </button>
    )
}

export default Darkmode;
