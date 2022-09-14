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
        <div className="w-full h-full flex items-center justify-center md:pt-[5rem]">
            <div className="w-[23rem] md:w-[35rem] lg:w-[57rem] text-center">
                <h1 className="text-4xl font-bold text-cyan-600">Resume</h1>
                <p className="text-xl mt-6 colors">{profileText ?? "Loading..."}</p>
                <hr className="mt-8 m-auto w-full border-2 border-gray-400" />

                <Education schools={schools} />
                <hr className="mt-8 m-auto w-full border-2 border-gray-400" />

                <Jobs jobs={jobs} />
                <hr className="mt-8 m-auto w-full border-2 border-gray-400" />

                <Skills skills={skills} />
                <hr className="mt-8 m-auto w-full border-2 border-gray-400" />

            </div>
        </div>
    )
}

export default Resume;
