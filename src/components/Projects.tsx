import React from "react";
import { links } from "../common/navItems";
import projects from "../common/Projects";
import ProjectsSlider from "./ProjectsSlider";

const Projects: React.FC = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <h1 className="mt-52 text-4xl font-bold">Projects</h1>
            <ProjectsSlider projects={projects} />
            <div className="absolute bottom-0">
                <p className="text-center mt-[-6rem] flex">You can find more projects on my
                    <a className="text-blue-500 hover:text-blue-600 ml-1" href={links.GitHub}>GitHub</a>!
                </p>
            </div>
        </div>
    )
}

export default Projects;
