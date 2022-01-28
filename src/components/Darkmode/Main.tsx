import React from 'react'
import { useDarkmodeContext } from '../context/darkmodeContextProvider';

const Darkmode: React.FC = () => {
    const { useDarkmode, setUseDarkmode } = useDarkmodeContext();

    return (
        <div className="text-center">
            <button
                className="py-2 px-3 rounded-xl border-2 border-cyan-500 transition duration-300 hover:bg-cyan-500"
                onClick={() => {
                    setUseDarkmode(!useDarkmode);
                    localStorage.setItem("useDarkmode", `${!useDarkmode}`)
                }}
            >
                { useDarkmode ? "LIGHT MODE" : "DARK MODE"}
            </button>
        </div>
    )
}

export default Darkmode