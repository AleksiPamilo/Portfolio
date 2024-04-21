import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { social } from "../data/navItems";
import projects from "../data/projects.json";
import ProjectSlider from "../components/ProjectSlider";
import { IProject } from "../interfaces/project";

const Projects: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const project = useRef<IProject | null>(null);

    useEffect(() => {
        project.current = projects.find(project => project.slug === slug) ?? null;
    }, [slug]);

    return (
        <main className="flex flex-col justify-center items-center w-full h-screen max-md:mt-28 max-lg:mt-10">
            <ProjectSlider projects={projects.slice().reverse()} currentProject={project.current} />

            <p className="text-center mt-4 pb-8 flex">You can find more projects on my
                <a className="text-blue-800 hover:text-blue-700 ml-1" href={social.GitHub}>GitHub</a>!
            </p>
        </main>
    )
}

export default Projects;
