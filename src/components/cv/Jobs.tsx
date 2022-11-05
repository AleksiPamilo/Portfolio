import React from "react";
import { IJob } from "../../interfaces/cv";
import { FaExternalLinkAlt } from "react-icons/fa";

import "../../styles/resume.css";

type JobsProps = {
    jobs: IJob[];
};

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
    return (
        <div className="text-white">
            <h1 className="text-4xl font-bold text-cyan-600 text-center">Experience</h1>
            <div className="border-b border-cyan-600 mt-5">
                <div className="flex flex-wrap justify-center gap-5 p-4">
                    {
                        !jobs
                            ? <div />
                            : jobs.map(job => (
                                <div key={job.key} className="flex flex-wrap rounded-lg w-[25rem] min-h-[8rem] p-4 border select-none border-cyan-400 box-shadow">
                                    <div className="w-full">
                                        <div className="float-left">
                                            {
                                                job.companyWebsite
                                                    ? <a className="text-base md:text-xl font-bold text-blue-600 hover:text-blue-800 visited:text-purple-600" href={job.companyWebsite} target="_blank" rel="noreferrer">
                                                        {job.company}
                                                        <FaExternalLinkAlt className="w-5 h-5 pl-2 inline text-white" />
                                                    </a>
                                                    : <h1 className="text-base md:text-xl font-bold">{job.company}</h1>
                                            }
                                        </div>
                                        <div className="float-right">
                                            <h1 className="text-xs md:text-sm font-bold pt-1">{formatDate(job.startDate)} – {formatDate(job.endDate)}</h1>
                                        </div>
                                        <div className="flex flex-row w-full justify-between">
                                            <p className="text-sm">{job.title}</p>
                                        </div>
                                        <p className="text-sm mt-2">{job.desc}</p>
                                    </div>
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