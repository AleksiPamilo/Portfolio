import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { social } from "../data/navItems";
import projects from "../data/projects.json";
import ProjectsSlider from "../components/ProjectsSlider";
import { IProject } from "../interfaces/project";

const Projects: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = useRef<IProject | null>(null);

    useEffect(() => {
        project.current = projects.find(project => project.slug === slug) ?? null;
    }, [slug]);

    return (
        <main className="flex flex-col justify-center items-center w-full h-screen">
            <ProjectsSlider projects={projects} currentProject={project.current} />

            <p className="text-center mt-4 mb-16 flex">You can find more projects on my
                <a className="text-blue-500 hover:text-blue-600 ml-1" href={social.GitHub}>GitHub</a>!
            </p>
        </main>
    )
}

export default Projects;
