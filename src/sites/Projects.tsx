import React from "react";
import { social } from "../data/navItems";
import projects from "../data/projects.json";
import ProjectsSlider from "../components/ProjectsSlider";

const Projects: React.FC = () => {
    return (
        <main className="flex flex-col justify-center items-center w-full h-screen">
            <ProjectsSlider projects={projects} />

            <p className="text-center mt-4 mb-16 flex">You can find more projects on my
                <a className="text-blue-500 hover:text-blue-600 ml-1" href={social.GitHub}>GitHub</a>!
            </p>
        </main>
    )
}

export default Projects;
