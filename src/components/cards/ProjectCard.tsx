import React from "react";
import { IProject } from "../../interfaces/project";

type ProjectCardProps = {
    project: IProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const tags = project.tags ?? project.technologies.slice(0, 4);

    return (
        <a href={"/projects/" + project.slug} className="flex flex-col max-w-[25rem] p-4 gap-6 rounded-md select-none border border-gray-600 hover:shadow-glow-1">
            <span className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{project.name}</h1>
            </span>

            <p className="line-clamp-2 text-gray-400">{project.description}</p>
            <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span key={index} className="text-zinc-600 rounded-md text-sm capitalize">
                        {tag}
                    </span>
                ))}
            </div>
        </a>
    )
}

export default ProjectCard;
