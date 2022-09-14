import React from "react";
import { ISkill } from "../../interfaces/cv";

import "../../styles/resume.css";

type SkillsProps = {
    skills: ISkill[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div className="mt-6 colors">
            <h1 className="text-4xl font-bold text-cyan-600 text-center">Professional Skills</h1>
            <div className="border rounded-lg border-cyan-600 mt-5 p-4 grid gap-5">
                {
                    !skills
                        ? <div className="colors">Loading...</div>
                        : skills.map((x) => (
                            <div className="box relative grid justify-center items-center select-none" key={x.index}>
                                <h2 className="uppercase text-left font-medium text-[#848c90]">{x.language}</h2>
                                <div className="relative w-full h-[10px] bg-gray-600 rounded-lg">
                                    <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg" style={{ width: x.percentage + "%" }} />
                                </div>
                            </div>
                        ))
                }
            </div>
        </div>
    )
}

export default Skills;
