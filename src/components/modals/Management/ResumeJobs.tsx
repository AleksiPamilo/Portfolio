import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import { IJob } from "../../../interfaces/cv";
import { useModal } from "../../context/modalContextProvider";
import Input from "../../Input";
import FirebaseServices from "../../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

type ResumeProps = {
    job?: IJob,
    jobs: IJob[],
    setJobs: React.Dispatch<React.SetStateAction<IJob[]>>,
};
const ResumeJobs: React.FC<ResumeProps> = ({ job, jobs, setJobs }) => {
    const { closeModal } = useModal();

    const [key, setKey] = React.useState<string | undefined>(job?.key);
    const [company, setCompany] = React.useState<string | undefined>(job?.company);
    const [desc, setDesc] = React.useState<string | undefined>(job?.desc);
    const [title, setTitle] = React.useState<string | undefined>(job?.title);
    const [time, setTime] = React.useState<string | undefined>(job?.time);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const jobsRef = doc(db, "portfolio", "jobs");

    const clearFields = () => {
        setKey(undefined);
        setCompany(undefined);
        setDesc(undefined);
        setTitle(undefined);
        setTime(undefined);
    }

    const handleUpdate = () => {
        if (!key || !company || !desc || !title || !time) return setError("Please fill in all the fields");

        for (const j in jobs) {
            if (jobs[j].key === key) {
                jobs.splice(parseInt(j), 1);
            }
        }

        jobs.push({
            key: key,
            company: company,
            desc: desc,
            title: title,
            time: time,
        });

        updateDoc(jobsRef, { jobsArr: jobs })
            .then(() => {
                setError(null);
                setSuccess("Job updated successfully");
                clearFields();
                setJobs(jobs);
                setTimeout(() => setSuccess(null), 10000);
            })
            .catch(() => {
                setSuccess(null);
                setError("Something went wrong");
                setTimeout(() => setError(null), 10000);
            })
    }

    const handleDelete = () => {
        for (const j in jobs) {
            if (jobs[j].key === job?.key) {
                jobs.splice(parseInt(j), 1);
                break;
            }
        }

        setJobs(jobs);
        updateDoc(jobsRef, { jobsArr: jobs });
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600" onClick={e => e.stopPropagation()}>
                <div className="float-left">
                    <h1 className="text-black font-bold text-xl pl-1 select-none">{job?.title ?? "Add New Job"}</h1>
                </div>
                <div className="float-right">
                    <button className="py-2 px-3 rounded-md bg-cyan-600 hover:bg-cyan-700 select-none" onClick={closeModal}>
                        <FaTimes className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div>
                    <div className="mt-12 grid grid-cols-2 gap-1">
                        <Input type="text" placeholder={job?.key ?? "Key"} value={key ?? ""} onChange={e => setKey(String(e.target.value))} />
                        <Input type="text" placeholder={job?.company ?? "Company"} value={company ?? ""} onChange={e => setCompany(String(e.target.value))} />
                        <Input type="text" placeholder={job?.title ?? "Title"} value={title ?? ""} onChange={e => setTitle(String(e.target.value))} />
                        <Input type="text" placeholder={job?.time ?? "Time"} value={time ?? ""} onChange={e => setTime(String(e.target.value))} />
                    </div>

                    <textarea
                        className="w-full h-[5rem] min-h-[3rem] max-h-[8rem] md:max-h-[30rem] resize-y px-4 pt-2 mt-1 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-cyan-600"
                        placeholder={job?.desc ?? "Description"}
                        value={desc ?? ""}
                        onChange={e => setDesc(e.target.value)}
                    />
                </div>

                <div className="py-1">
                    <div className="float-left" hidden={!!!error}>
                        <div className="flex items-center w-full max-w-[29.3rem] h-10 px-4 rounded-lg border-2 text-red-600 bg-white border-red-500">
                            {error}
                        </div>
                    </div>
                    <div className="float-left" hidden={!!!success}>
                        <div className="flex items-center w-full h-10 px-4 rounded-lg border-2 text-green-600 bg-white border-green-400" >
                            {success}
                        </div>
                    </div>
                    <div className="float-right">
                        <button className="w-[8rem] h-10 rounded-md text-white font-bold bg-red-600 hover:bg-red-700"
                            hidden={!!!job}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this job?")) {
                                    handleDelete();
                                    closeModal();
                                }
                            }}
                        >
                            Delete
                        </button>
                        <button className="w-[8rem] h-10 rounded-md text-white font-bold bg-cyan-600 hover:bg-cyan-700 ml-2 mr-1"
                            onClick={handleUpdate}
                        >
                            {
                                job ? "Update" : "Add"
                            }
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ResumeJobs;
