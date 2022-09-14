import React from "react";
import { FaPlus } from "react-icons/fa";
import { IJob } from "../../interfaces/cv";
import { useDarkmode } from "../context/darkmodeContextProvider";
import { useModal } from "../context/modalContextProvider";
import ResumeJobs from "../modals/Management/ResumeJobs";

type JobsProps = {
    jobs: IJob[];
    setJobs: React.Dispatch<React.SetStateAction<IJob[]>>;
};

const Jobs: React.FC<JobsProps> = ({ jobs, setJobs }) => {
    const { isDarkmode } = useDarkmode();
    const { setModalIsOpen, setModalContent } = useModal();

    const openJobModal = (job?: IJob) => {
        setModalContent(<ResumeJobs job={job} jobs={jobs} setJobs={setJobs} />)
        setModalIsOpen(true);
    }

    return (
        <div className={`${isDarkmode ? "text-white" : "text-black"} mt-12`}>
            <div className="flex justify-between">
                <h1 className={`${isDarkmode ? "text-white" : "text-black"} text-4xl font-bold`}>Resume Jobs</h1>
                <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => openJobModal()}>
                    <FaPlus />
                </button>
            </div>
            <div className="mt-5 justify-center flex flex-wrap gap-5">
                {
                    jobs.map((job) => (
                        <div key={job.key} className="flex flex-wrap rounded-lg githubCard w-[25rem] min-h-[8rem] p-4 border-2 cursor-pointer select-none border-cyan-400 hover:border-cyan-600"
                            onClick={() => openJobModal(job)}
                        >
                            <div className="w-full">
                                <div className="float-left">
                                    <h1 className="text-xl font-bold">{job.company}</h1>
                                </div>
                                <div className="float-right">
                                    <h1 className="text-sm font-bold pt-1">{formatDate(job.startDate)} – {formatDate(job.endDate)}</h1>
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
    )
}

function formatDate(date: string) {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getFullYear()}`;
}

export default Jobs;
