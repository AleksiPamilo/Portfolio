import React from "react";
import { Iskills } from "../../interfaces/cv";

import "../../styles/Resume.css";

type SkillsProps = {
    skills: Iskills[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div className="mt-6 colors">
            <h1 className="text-4xl font-bold text-cyan-600">Professional Skills</h1>
            {
                !skills
                    ? <div className="colors">Loading...</div>
                    : skills.map((x) => (
                        <div className="box relative grid mt-8 justify-center items-center select-none" key={x.index}>
                            <h2 className="uppercase text-left font-medium text-[#848c90]">{x.language}</h2>
                            <div className="relative w-full h-[10px] bg-gray-600 rounded-lg">
                                <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg" style={{ width: x.percentage + "%" }} />
                            </div>
                        </div>
                    ))
            }
        </div>
    )
}

export default Skills;
