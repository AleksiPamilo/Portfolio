import React from "react";
import { ISkill } from "../../interfaces/cv";

import "../../styles/resume.css";

type SkillsProps = {
    skills: ISkill[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div className="text-white">
            <h1 className="text-4xl font-bold text-cyan-600 text-center">Professional Skills</h1>
            <div className="mt-5 p-4 flex flex-wrap justify-center gap-5">
                {
                    !skills
                        ? <div className="colors">Loading...</div>
                        : skills.map((x) => (
                            <div key={x.key} className="flex rounded-lg w-[20rem] h-[5rem] p-4 select-none border border-cyan-400 box-shadow">
                                <div className="w-full">
                                    <div className="flex flex-row justify-between items-center peer">
                                        <h1 className="text-base font-bold">{x.language.toUpperCase()}</h1>
                                        <h1 className="text-sm font-bold py-1 px-2 text-cyan-300 bg-cyan-700 rounded-md">{x.percentage}%</h1>
                                    </div>
                                    <div className="relative mt-4 w-full h-[6px] bg-black rounded-lg">
                                        <div className="absolute top-0 left-0 h-full bg-cyan-500 rounded-lg" style={{ width: x.percentage + "%" }} />
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
