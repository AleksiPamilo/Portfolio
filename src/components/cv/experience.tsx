import React from "react";
import { Ijobs } from "../../Interfaces/cv";
import Card from "./Card";

type ExperienceProps = {
    jobs: Ijobs[]
};

const Experience: React.FC<ExperienceProps> = ({ jobs }) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-[#1f487a]">Experience</h1>
            {
                !jobs
                    ? <p className="text-center font-bold text-2xl mt-64">Loading...</p>
                    : jobs.map(x => <Card index={x.key} title={x.jobName} desc={x.jobDesc} text={x.jobText} time={x.jobTime} />)
            }
        </div>
    )
}

export default Experience;
