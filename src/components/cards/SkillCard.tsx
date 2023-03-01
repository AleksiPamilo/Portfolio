import React from "react";
import { ISkill } from "../../interfaces/cv";

type SkillCardProps = {
    skill: ISkill;
};
const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className="flex flex-col w-[25rem] p-4 gap-6 rounded-md select-none border hover:shadow-glow-5">
            <div className="flex flex-row items-center justify-between uppercase">
                <p>{skill.language}</p>
                <p className="py-1 px-3 bg-white text-black rounded-md">{skill.percentage}%</p>
            </div>
            {skill?.desc && <p>{skill?.desc}</p>}
            <div className="flex flex-row w-full h-2 bg-gray-500 rounded-full">
                <div className="flex flex-row h-full bg-white rounded-full" style={{ width: skill.percentage + "%" }} />
            </div>
        </div>
    )
}

export default SkillCard;
