import { skills } from "../data/skills";
import SkillCard from "../components/cards/SkillCard";

const Resume: React.FC = () => {
    return (
        <main className="flex flex-col min-h-screen py-24 gap-14 md:gap-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {skills.map((skill) => (
                    <SkillCard key={skill.key} skill={skill} />
                ))}
            </div>
        </main>
    )
}

export default Resume;
