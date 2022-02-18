import React from "react";
import { Iskills } from "../../Interfaces/cv";

type SkillsProps = {
    skills: Iskills[];
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
    return (
        <div>
            <h1 className="font-bold text-center text-2xl text-[#1f487a] uppercase tracking-wider mb-[50px]">Professional Skills</h1>
            {
                !skills
                    ? <p>Loading...</p>
                    : skills.map((x) => (
                        <div className="box relative grid mb-8 justify-center items-center select-none" key={x.index}>
                            <h2 className="uppercase font-medium text-[#848c90]">{x.language}</h2>
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
