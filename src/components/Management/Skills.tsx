import React from "react";
import { FaPlus } from "react-icons/fa";
import { ISkill } from "../../interfaces/cv";
import { useDarkmode } from "../context/darkmodeContextProvider";
import { useModal } from "../context/modalContextProvider";
import ResumeSkills from "../modals/Management/Skills";

type SkillProps = {
    skills: ISkill[];
    setSkills: React.Dispatch<React.SetStateAction<ISkill[]>>;
};

const Skills: React.FC<SkillProps> = ({ skills, setSkills }) => {
    const { isDarkmode } = useDarkmode();
    const { setModalIsOpen, setModalContent } = useModal();

    const openSkillModal = (skill?: ISkill) => {
        setModalContent(<ResumeSkills skill={skill} skills={skills} setSkills={setSkills} />)
        setModalIsOpen(true);
    }

    return (
        <div className={`${isDarkmode ? "text-white" : "text-black"} mt-12`}>
            <div className="flex justify-between">
                <h1 className={`${isDarkmode ? "text-white" : "text-black"} text-4xl font-bold`}>Manage Skills</h1>
                <button className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg" onClick={() => openSkillModal()}>
                    <FaPlus />
                </button>
            </div>
            <div className="mt-5 justify-center flex flex-wrap gap-5">
                {
                    skills.map((skill) => (
                        <div key={skill.key} className="flex flex-wrap rounded-lg w-[25rem] p-4 border-2 cursor-pointer select-none border-cyan-400 hover:border-cyan-600"
                            onClick={() => openSkillModal(skill)}
                        >
                            <div className="w-full">
                                <div className="float-left">
                                    <h1 className="text-base font-bold">{skill.language.toUpperCase()}</h1>
                                </div>
                                <div className="float-right">
                                    <h1 className="text-sm font-bold pt-1">{skill.percentage}%</h1>
                                </div>
                                <div className="relative mt-10 w-full h-[10px] bg-gray-600 rounded-lg">
                                    <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-lg" style={{ width: skill.percentage + "%" }} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Skills;
