import React from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { IJob } from "../../interfaces/cv";
import formatDate from "../../utils/formatDate";

type JobCardProps = {
    job: IJob,
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="flex flex-col max-w-[25rem] min-h-[7rem] p-4 gap-6 rounded-md border hover:shadow-glow-5">
            <div className="flex flex-row justify-between items-center">
                {
                    job.companyWebsite
                        ? <a href={job.companyWebsite} target="_blank" rel="noreferrer" className="flex flex-row items-center gap-2 hover:underline">
                            <span>{job.company}</span>
                            <FaExternalLinkAlt className="w-4 h-4" />
                        </a>
                        : <p>{job.company}</p>
                }
                <p>{formatDate(job.startDate)} - {
                    job.endDate.toLowerCase() === "present"
                        ? job.endDate
                        : formatDate(job.endDate)}
                </p>
            </div>
            <p>{job.desc}</p>

        </div>
    )
}

export default JobCard;
