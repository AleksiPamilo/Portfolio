import React from "react";
import { ISchool } from "../../interfaces/cv";

import "../../styles/resume.css";

type EducationProps = {
    schools: ISchool[];
};

const Jobs: React.FC<EducationProps> = ({ schools }) => {
    return (
        <div className="mt-6 text-white">
            <h1 className="text-4xl font-bold text-cyan-600 text-center">Education</h1>
            <div className="border-b border-cyan-600 mt-5">
                <div className="flex flex-wrap justify-center gap-5 p-4">
                    {
                        !schools
                            ? <div />
                            : schools.map(school => (
                                <div key={school.key} className="flex flex-wrap rounded-lg w-[25rem] min-h-[8rem] p-4 border-2 select-none border-cyan-400 box-shadow">
                                    <h1 className="text-base md:text-xl font-bold">{school.name}</h1>
                                    <div className="flex flex-row w-full justify-between">
                                        <p className="text-sm mt-2">{school.desc}</p>
                                    </div>
                                    <h1 className="text-sm font-bold pt-5">{formatDate(school.startDate)} – {formatDate(school.endDate)}</h1>
                                </div>
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
}

export default Jobs;