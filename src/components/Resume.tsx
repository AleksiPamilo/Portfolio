import { useEffect, useState } from "react";
import { IJob, ISchool, ISkill } from "../interfaces/cv";
import { getDoc, doc } from "firebase/firestore";
import FirebaseServices from "../firebase/firebaseServices";
import JobCard from "./cards/JobCard";
import SchoolCard from "./cards/SchoolCard";
import SkillCard from "./cards/SkillCard";

const db = FirebaseServices.getFirestoreInstance();

const Resume: React.FC = () => {
    const [education, setEducation] = useState<ISchool[]>([]);
    const [experience, setExperience] = useState<IJob[]>([]);
    const [skills, setSkills] = useState<ISkill[]>([]);

    useEffect(() => {
        const docRef = doc(db, "portfolio", "resume");

        getDoc(docRef).then((doc) => {
            if (doc.exists()) {
                const data = doc.data();
                setEducation(data.education);
                setExperience(data.experience);
                setSkills(data.skills);
            } else {
                console.log("No such document!");
            }
        });
    }, []);

    return (
        <div className="flex flex-col gap-10">
            <div className="flex flex-col items-center">
                <h1 className="flex flex-wrap items-center justify-center text-3xl font-bold mb-4">Education</h1>
                {education.map((school) => (
                    <SchoolCard key={school.key} school={school} />
                ))}
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Experience</h1>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {experience.map((job) => (
                        <JobCard key={job.key} job={job} />
                    ))}
                </div>
            </div>

            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-4">Skills</h1>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {skills.map((skill) => (
                        <SkillCard key={skill.key} skill={skill} />
                    ))}
                </div>
            </div>
        </div >
    )
}

export default Resume;
