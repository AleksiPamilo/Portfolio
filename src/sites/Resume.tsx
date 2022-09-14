import React, { useEffect, useState } from 'react'
import { IJob, ISchool, ISkill } from "../interfaces/cv";
import { collection, getDocs } from "firebase/firestore";

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
    const [profileText, setProfileText] = useState<string | null>(null);

    useEffect(() => {
        getDocs(collection(db, "portfolio"))
            .then((querySnapshot) => {
                const obj: any = {};

                querySnapshot.forEach((doc) => {
                    obj[doc.id] = doc.data();
                });

                setSkills(obj.skills.skillsArr);
                setJobs(obj.jobs.jobsArr.sort((a: IJob, b: IJob) => {
                    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
                }));
                setSchools(obj.education.schools);
                setProfileText(obj.profile.text);
            })
    }, []);

    return (
        <div className="flex w-full h-full justify-center pt-[2rem] md:pt-[6rem] select-none">
            <div className="max-w-[80%] rounded-l-lg">
                <div className="font-bold text-xl text-center colors mb-5">
                    {profileText}
                </div>
                <div className="flex flex-col gap-5">
                    <Education schools={schools} />
                    <Jobs jobs={jobs} />
                    <Skills skills={skills} />
                </div>
            </div>
        </div>
    )
}

export default Resume;
