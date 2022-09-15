import React, { useEffect, useState } from 'react'
import { IJob, ISchool, ISkill } from "../interfaces/cv";
import { doc, getDoc } from "firebase/firestore";

import Education from '../components/cv/Education';

import "../styles/resume.css";

import FirebaseServices from "../firebase/firebaseServices";
import Jobs from '../components/cv/Jobs';
import Skills from '../components/cv/Skills';
const db = FirebaseServices.getFirestoreInstance();

const Resume: React.FC = () => {
    document.title = "Portfolio – Resume";

    const [skills, setSkills] = useState<ISkill[]>([]);
    const [jobs, setJobs] = useState<IJob[]>([]);
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
                <div className="flex flex-col gap-5 border border-cyan-600 rounded-lg">
                    <Education schools={schools} />
                    <Jobs jobs={jobs} />
                    <Skills skills={skills} />
                </div>
            </div>
        </div>
    )
}

export default Resume;
