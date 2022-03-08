import React, { useEffect, useState } from 'react'
import { Ijobs, Ischools, Iskills } from "../../../Interfaces/cv";
import { FaEnvelope, FaLinkedinIn } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";

import Experience from '../../cv/experience';
import Education from '../../cv/education';
import Skills from '../../cv/skills';

import "./Main.css"

import FirebaseServices from "../../../firebase/firebaseServices";
const db = FirebaseServices.getFirestoreInstance();

const CV: React.FC = () => {
    document.title = "Portfolio – CV";

    const [skills, setSkills] = useState<Iskills[]>([]);
    const [jobs, setJobs] = useState<Ijobs[]>([]);
    const [schools, setSchools] = useState<Ischools[]>([]);
    const [profileText, setProfileText] = useState<string>("");

    useEffect(() => {
        getDocs(collection(db, "portfolio"))
            .then((querySnapshot) => {
                const obj: any = {};

                querySnapshot.forEach((doc) => {
                    obj[doc.id] = doc.data();
                });

                setSkills(obj.skills.skillsArr);
                setJobs(obj.jobs.jobsArr);
                setSchools(obj.education.schools);
                setProfileText(obj.profile.text);
            })
    }, []);

    return (
        <div className="relative text-left flex items-center justify-center h-full align-middle mt-12">
            <div className="w-[912px] pt-[8px] px-[32px] pb-[32px]">
                <h1 className="text-center text-4xl font-bold">CV</h1>
                <div className="mt-4 text-center">
                    <p className="text-xl">{profileText}</p>
                    <div className="text-white font-bold pt-10">
                        <ul className="w-[14rem] mx-auto">
                            <li className="text-left">
                                <FaLinkedinIn className="inline-block text-blue-600 mr-2" />
                                <a href="https://www.linkedin.com/in/aleksi-pamilo-62aaa5229/" target="_blank" rel="noreferrer">www.linkedin.com/</a>
                            </li>
                            <li className="text-left">
                                <FaEnvelope className="inline-block text-blue-600 mr-2" />
                                <a href="mailto:aleksi.pamilo@gmail.com" target="_blank" rel="noreferrer">aleksi.pamilo@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                    <hr className="mt-8 m-auto max-w-[60rem] border-2 border-color" />
                </div>

                <div className="mt-8 text-center">
                    <Education schools={schools} />
                    <hr className="mt-8 m-auto max-w-[60rem] border-2 border-color" />
                </div>

                <div className="mt-8 text-center">
                    <Experience jobs={jobs} />
                    <hr className="mt-8 m-auto max-w-[60rem] border-2 border-color" />
                </div>

                <div className="mt-8">
                    <Skills skills={skills} />
                    <hr className="mt-8 m-auto max-w-[60rem] border-2 border-color" />
                </div>

            </div>
        </div>
    )
}

export default CV;
