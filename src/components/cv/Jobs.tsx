import React from "react";
import { IJob } from "../../interfaces/cv";

import "../../styles/resume.css";

type JobsProps = {
    jobs: IJob[];
};

const Jobs: React.FC<JobsProps> = ({ jobs }) => {
    return (
        <div className="mt-6 colors">
            <h1 className="text-4xl font-bold text-cyan-600">Experience</h1>
            {
                !jobs
                    ? <div />
                    : jobs.map(x => (
                        <div className="w-full flex flex-col justify-center items-center mt-4" key={x.key}>
                            <div className="w-[85%]">
                                <div className="flex flex-col float-left">
                                    <h1 className="text-left text-base font-bold text-blue-600">{x.company}</h1>
                                    <h2 className="text-lg">{x.desc}</h2>
                                </div>
                                <div className="flex float-right">
                                    {x.time}
                                </div>
                            </div>
                            <hr className="mt-2 m-auto w-[85%] border rounded-lg border-gray-400" />
                        </div>
                    ))
            }
        </div>
    )
}

export default Jobs;