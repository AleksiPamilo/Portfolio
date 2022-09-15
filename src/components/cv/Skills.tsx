import React from "react";
import { ISkill } from "../../interfaces/cv";

import "../../styles/resume.css";

type SkillsProps = {
    skills: ISkill[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div className="colors">
            <h1 className="text-4xl font-bold text-cyan-600 text-center">Professional Skills</h1>
            <div className="mt-5 p-4 flex flex-wrap justify-center gap-5">
                {
                    !skills
                        ? <div className="colors">Loading...</div>
                        : skills.map((x) => (
                            <div key={x.key} className="flex rounded-lg w-[25rem] p-4 border-2 select-none border-cyan-400 hover:border-cyan-600">
                                <div className="w-full">
                                    <div className="float-left">
                                        <h1 className="text-base font-bold">{x.language.toUpperCase()}</h1>
                                    </div>
                                    <div className="float-right">
                                        <h1 className="text-sm font-bold pt-1">{x.percentage}%</h1>
                                    </div>
                                    <div className="relative mt-10 w-full h-[10px] bg-gray-600 rounded-lg">
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
