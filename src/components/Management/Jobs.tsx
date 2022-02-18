import React, { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Ijobs } from "../../Interfaces/cv";
import { doc, updateDoc } from "firebase/firestore";
import FirebaseServices from "../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

type SkillsProps = { jobs: Ijobs[] }

const Main: React.FC<SkillsProps> = ({ jobs }) => {
    const [key, setKey] = useState<string>();
    const [jobName, setJobName] = useState<string>();
    const [jobDesc, setJobDesc] = useState<string>();
    const [jobText, setJobText] = useState<string>();
    const [jobTime, setJobTime] = useState<string>();

    const jobsArr = jobs;
    const jobsRef = doc(db, "portfolio", "jobs");

    const UpdateData = () => {
        if (!key) return alert("Key Missing");
        if (!jobName) return alert("Job Name Missing");
        if (!jobDesc) return alert("Job Desc Missing");
        if (!jobText) return alert("Job Text Missing");
        if (!jobTime) return alert("Job Time Missing");

        for (let i = 0; i < jobsArr.length; i++) {
            if (jobsArr[i].key === key) {
                jobsArr.splice(i, 1);
                break;
            }
        }

        jobsArr.push({ key, jobName, jobDesc, jobText, jobTime });

        updateDoc(jobsRef, {
            jobsArr
        })
            .then(() => setTimeout(() => window.location.reload(), 500))
    };

    const DeleteData = (key: string) => {
        for (let i = 0; i < jobsArr.length; i++) {
            if (jobsArr[i].key === key) {
                jobsArr.splice(i, 1);
                break;
            }
        }

        updateDoc(jobsRef, {
            jobsArr
        })
            .then(() => setTimeout(() => window.location.reload(), 500))
    };

    return (
        <div className="mt-8 ml-12">
            <h1 className="font-extrabold text-2xl mb-2">Experience</h1>
            {
                jobs.map((x) => (
                    <div className="inline-flex pt-2" key={x.key}>
                        <div className="relative inline-block">
                            <Menu>
                                {({ open }) => (
                                    <>
                                        <span className="rounded-md shadow-sm">
                                            <Menu.Button className="text-center colors inline-flex min-w-[10rem] mr-4 rounded-md border-2 shadow-sm px-4 py-2 text-sm font-medium focus:outline-none">
                                                <span>{x.jobName.toUpperCase()}</span>
                                                { /* <AiOutlineDown className="h-5 w-5" /> */}
                                            </Menu.Button>
                                        </span>

                                        <Transition
                                            show={open}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items
                                                static
                                                className="relative w-[25rem] h-[15rem] mt-2 origin-top-right rounded-md shadow-lg bg-white focus:outline-none"
                                            >
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td className="text-black pt-4 pl-4 pr-12">Key</td>
                                                            <td><input type="text" className="inline-block w-[15rem] colors rounded-lg border-2 text-center" placeholder={x.key} value={key} onChange={(e) => setKey(e.target.value)} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-black pl-4 pr-12">Job Name</td>
                                                            <td><input type="text" className="inline-block w-[15rem] colors rounded-lg border-2 text-center" placeholder={x.jobName} value={jobName} onChange={(e) => setJobName(e.target.value.toLowerCase())} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-black pl-4 pr-12">Job Desc</td>
                                                            <td><input type="text" className="inline-block w-[15rem] colors rounded-lg border-2 text-center" placeholder={x.jobDesc} value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-black pl-4 pr-12">Job Text</td>
                                                            <td><input type="text" className="inline-block w-[15rem] colors rounded-lg border-2 text-center" placeholder={x.jobText} value={jobText} onChange={(e) => setJobText(e.target.value)} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td className="text-black pl-4 pr-12">Job Time</td>
                                                            <td><input type="text" className="inline-block w-[15rem] colors rounded-lg border-2 text-center" placeholder={x.jobTime} value={jobTime} onChange={(e) => setJobTime(e.target.value)} /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <button type="button" className="inline py-3 mt-3 w-[5rem] ml-4 bg-red-500 rounded-lg shadow-md shadow-black text-center"
                                                                    onClick={() => DeleteData(x.key)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                            <td>
                                                                <button type="button" className="inline float-right py-3 mt-3 w-[5rem] ml-4 bg-cyan-500 rounded-lg shadow-md shadow-black text-center"
                                                                    onClick={() => UpdateData()}
                                                                >
                                                                    Save
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Menu.Items>
                                        </Transition>
                                    </>
                                )}
                            </Menu>
                        </div>
                    </div>
                ))
            }
            <hr className="mt-4 w-[82%]" />
        </div>
    )
}

export default Main;
