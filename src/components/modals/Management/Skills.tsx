import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { FaTimes } from "react-icons/fa";
import { ISkill } from "../../../interfaces/cv";
import { useModal } from "../../context/modalContextProvider";
import { v1 as uuid } from "uuid";
import Input from "../../Input";
import FirebaseServices from "../../../firebase/firebaseServices";

const db = FirebaseServices.getFirestoreInstance();

type ResumeProps = {
    skill?: ISkill,
    skills: ISkill[],
    setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>,
};
const ResumeSkills: React.FC<ResumeProps> = ({ skill, skills, setSkills }) => {
    const { closeModal } = useModal();

    const [language, setLanguage] = React.useState<string | undefined>(skill?.language);
    const [percentage, setPercentage] = React.useState<number | undefined>(skill?.percentage);
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<string | null>(null);

    const resumeRef = doc(db, "portfolio", "resume");

    const clearFields = () => {
        setLanguage(undefined);
        setPercentage(undefined);
    }

    const handleUpdate = () => {
        if (!language || !percentage) return setError("Please fill in all the fields");

        const key = skill?.key ?? uuid();

        for (const s in skills) {
            if (skills[s].key === key) {
                skills.splice(parseInt(s), 1);
            }
        }

        skills.push({
            key,
            language,
            percentage
        });

        updateDoc(resumeRef, { skills })
            .then(() => {
                setError(null);
                setSuccess("Skill updated successfully");
                clearFields();
                setSkills(skills);
                setTimeout(() => setSuccess(null), 10000);
            })
            .catch(() => {
                setSuccess(null);
                setError("Something went wrong");
                setTimeout(() => setError(null), 10000);
            })
    }

    const handleDelete = () => {
        if (!skill) return;

        for (const s in skills) {
            if (skills[s].key === skill.key) {
                skills.splice(parseInt(s), 1);
                break;
            }
        }

        setSkills(skills);
        updateDoc(resumeRef, { skills });
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[25rem] md:w-[40rem] rounded-lg bg-gray-300 p-4 border-2 border-cyan-600" onClick={e => e.stopPropagation()}>
                <div className="float-left">
                    <h1 className="text-black font-bold text-xl pl-1 select-none">{skill ? "Update Skill" : "Add New Skill"}</h1>
                </div>
                <div className="float-right">
                    <button className="py-2 px-3 rounded-md bg-cyan-600 hover:bg-cyan-700 select-none" onClick={closeModal}>
                        <FaTimes className="w-5 h-5 text-white" />
                    </button>
                </div>

                <div>
                    <div className="grid grid-cols-2 mt-12 gap-1">
                        <Input type="text" placeholder={skill?.language ?? "Language"} value={language ?? ""} onChange={e => setLanguage(String(e.target.value))} />
                        <Input type="text" placeholder={String(skill?.percentage ?? "Percentage")} value={String(percentage ?? "")} onChange={e => setPercentage(e.target.value)} />
                    </div>
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
                            hidden={!!!skill}
                            onClick={() => {
                                if (window.confirm("Are you sure you want to delete this skill?")) {
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
                                skill ? "Update" : "Add"
                            }
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ResumeSkills;
