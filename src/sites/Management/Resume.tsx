import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDarkmode } from "../../hooks";
import { IJob, ISchool, ISkill } from "../../interfaces/cv";
import ManagementJobs from "../../components/Management/Jobs";
import ManagementSkills from "../../components/Management/Skills";
import ManagementEducation from "../../components/Management/Education";
import FirebaseServices from "../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

const Resume: React.FC = () => {
    const { isDarkmode } = useDarkmode();

    const [jobs, setJobs] = useState<IJob[]>([]);
    const [skills, setSkills] = useState<ISkill[]>([]);
    const [schools, setSchools] = useState<ISchool[]>([]);

    useEffect(() => {
        getDoc(doc(db, "portfolio", "resume"))
            .then((doc) => {
                if (doc.exists()) {
                    setSchools(doc.data()?.education.sort((a: ISchool, b: ISchool) => {
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                    }));
                    setJobs(doc.data()?.experience.sort((a: IJob, b: IJob) => {
                        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                    }));
                    setSkills(doc.data()?.skills);
                }
            });
    }, []);

    return (
        <div className="flex w-full h-full justify-center pt-[2rem] md:pt-[6rem] select-none">
            <div className="max-w-[80%] rounded-l-lg">
                <h1 className={`${isDarkmode ? "text-white" : "text-black"} text-4xl font-bold`}>Resume Management</h1>
                <div>
                    <div className="rounded-lg mt-2 border-2 border-cyan-600" />
                    <ManagementEducation schools={schools} setSchools={setSchools} />
                    <ManagementJobs jobs={jobs} setJobs={setJobs} />
                    <ManagementSkills skills={skills} setSkills={setSkills} />
                </div>
            </div>
        </div>
    )
}

export default Resume;
