import React from 'react'
import { useDarkmodeContext } from '../context/darkmodeContextProvider';

import darkmode from "../../media/darkmode.png";
import lightmode from "../../media/lightmode.png";

const Darkmode: React.FC = () => {
    const { useDarkmode, setUseDarkmode } = useDarkmodeContext();

    return (
        <div className="text-center">
            <button
                className="py-2 px-3"
                onClick={() => {
                    setUseDarkmode(!useDarkmode);
                    localStorage.setItem("useDarkmode", `${!useDarkmode}`)
                }}
            >
                <img className="w-6 h-6" alt="" src={useDarkmode ? darkmode : lightmode} />
            </button>
        </div>
    )
}

export default Darkmode;
