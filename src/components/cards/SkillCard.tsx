import React from "react";
import { ISkill } from "../../interfaces/skills";

type SkillCardProps = {
    skill: ISkill;
};

const SkillCard: React.FC<SkillCardProps> = ({ skill }) => {
    return (
        <div className="flex flex-col max-w-[25rem] p-4 gap-6 rounded-md select-none shadow-xl border border-emerald-400">
            <span className="flex items-center gap-2">
                {skill?.icon}
                <h1 className="uppercase font-yellowtail">{skill.name}</h1>
            </span>

            <p>{skill?.desc}</p>

            {
                skill.tags && (
                    <div className="flex flex-wrap gap-4 p-2">
                        {skill.tags.map((tag, index) => (
                            <span key={index} className="text-sm capitalize">{tag}</span>
                        ))}
                    </div>
                )
            }
        </div>
    )
}

export default SkillCard;
