import React from "react";
import { IProject } from "../../interfaces/project";

type ProjectCardProps = {
    project: IProject;
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const center = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center px-8";
    const animation = "transition-all ease-in-out duration-500";

    return (
        <a key={project.name} href={"/projects/" + project.slug} className={`relative flex items-center justify-center w-[25rem] h-[10rem] rounded-md group bg-gradient-to-tr ${[
            "from-fuchsia-500 to-emerald-500",
            "from-fuchsia-700 to-indigo-600",
            "from-rose-200 to-emerald-500",
            "from-yellow-300 to-indigo-600",
            "from-green-500 to-pink-200",
            "from-purple-500 to-blue-200",
            "from-blue-300 to-yellow-300",
            "from-indigo-500 to-pink-200",
            "from-green-400 to-orange-500",
            "from-lime-400 to-indigo-600"
        ][Math.floor(Math.random() * 10)]}`}>
            <div className="text-4xl px-8 py-12">
                <h1 className={`font-yellowtail group-hover:opacity-0 ${center} ${animation}`}>{project.name}</h1>
                <p className={`text-base font-light line-clamp-2 opacity-0 group-hover:opacity-100 ${center} ${animation}`}>{project.description}</p>
            </div>
        </a>
    )
}

export default ProjectCard;
