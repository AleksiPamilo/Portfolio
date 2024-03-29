import React from "react";
import { ISkill } from "../../interfaces/skills";

type SkillCardProps = {
    skill: ISkill;
};

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className="flex flex-col max-w-[25rem] p-4 gap-6 rounded-md select-none border border-gray-600">
            <span className="flex items-center gap-2">
                {skill?.icon}
                <h1 className="uppercase font-semibold">{skill.name}</h1>
            </span>

            <p>{skill?.desc}</p>

            {
                skill.tags && (
                    <div className="flex flex-wrap gap-2">
                        {skill.tags.map((tag, index) => (
                            <span key={index} className="bg-zinc-800 rounded-md p-2 text-sm capitalize">{tag}</span>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default SkillCard;
