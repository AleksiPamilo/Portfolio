import React from "react";
import { social } from "../data/navItems";
import projects from "../data/projects.json";
import ProjectCard from "../components/cards/ProjectCard";

const Projects: React.FC = () => {
    const reversedProjects = projects.slice().reverse();

    return (
        <main className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center md:gap-10 gap-14 max-w-[1024px]">
                <div className="flex flex-wrap items-center justify-center gap-4">
                    {reversedProjects.map((project, index) => (
                        <ProjectCard key={index} project={project} />
                    ))}
                </div>

                <p className="text-center mt-4 mb-16 flex">You can find more projects on my
                    <a className="text-blue-700 hover:text-blue-600 ml-1" href={social.GitHub}>GitHub</a>!
                </p>
            </div>
        </main>
    )
}

export default Projects;
