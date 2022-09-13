import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDarkmode } from "../../hooks";
import FirebaseServices from "../../firebase/firebaseServices";
import { IJob } from "../../interfaces/cv";
import Jobs from "../../components/Management/Jobs";

const db = FirebaseServices.getFirestoreInstance();

const Resume: React.FC = () => {
    const { isDarkmode } = useDarkmode();

    const [jobs, setJobs] = useState<IJob[]>([]);

    useEffect(() => {
        getDocs(collection(db, "portfolio"))
            .then((snapshot) => {
                const obj: any = {};

                snapshot.forEach((doc) => {
                    obj[doc.id] = doc.data();
                });

                setJobs(obj.jobs.jobsArr);
            })
    }, []);

    return (
        <div className="flex w-full h-full justify-center pt-[2rem] md:pt-[6rem] select-none">
            <div className="max-w-[80%] rounded-l-lg">
                <h1 className={`${isDarkmode ? "text-white" : "text-black"} text-4xl font-bold`}>Resume Management</h1>
                <div className="max-h-[45rem]">
                    <div className="rounded-lg mt-2 border-2 border-cyan-600" />
                    <Jobs jobs={jobs} setJobs={setJobs} />
                </div>
            </div>
        </div>
    )
}

export default Resume;
