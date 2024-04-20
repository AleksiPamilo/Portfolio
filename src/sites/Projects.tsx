import React from "react";
import { social } from "../data/navItems";
import projects from "../data/projects.json";
import ProjectCard from "../components/cards/ProjectCard";
import sortByDate from "../utils/sortProjects";

const Projects: React.FC = () => {
    const sortedProjects = sortByDate(projects);

    return (
        <main className="flex flex-col items-center min-h-screen py-24 gap-14 md:gap-10">
            <div className="flex flex-wrap items-center justify-center gap-4">
                {sortedProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>

            <p className="text-center mt-4 mb-16 flex">You can find more projects on my
                <a className="text-blue-500 hover:text-blue-600 ml-1" href={social.GitHub}>GitHub</a>!
            </p>
        </main>
    )
}

export default Projects;
