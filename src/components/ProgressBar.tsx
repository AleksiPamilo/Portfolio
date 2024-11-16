import React from "react";

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    return (
        <div className="w-full h-1 relative rounded-full bg-slate-800 transition-all">
            <div className="h-full bg-blue-800 rounded-full transition-all duration-1000" style={{ width: progress + "%" }} />
        </div>
    )
}

export default ProgressBar;
