import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IProject } from "../interfaces/project";
import ImageSlider from "./ImageSlider";
import ProjectButton from "./project/ProjectButton";
import { useParams, useNavigate } from 'react-router-dom';
import NotFound from "./NotFound";

type ProjectsSliderProps = {
    projects: IProject[];
    currentProject: IProject | null;
};

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ projects, currentProject: project }) => {
    const { slug } = useParams();
    const navigate = useNavigate();

    const [currentProject, setCurrentProject] = useState<IProject | null>(project);
    const currentIndex = projects.findIndex(project => project.slug === slug);

    useEffect(() => {
        setCurrentProject(projects.find(project => project.slug === slug) ?? null);
    }, [slug, projects]);

    const handleNextProject = () => {
        const nextIndex = (currentIndex + 1) % projects.length;
        navigate(`/projects/${projects[nextIndex].slug}`);
    };

    const handlePreviousProject = () => {
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
        navigate(`/projects/${projects[prevIndex].slug}`);
    };

    if (!currentProject) {
        return <NotFound />;
    }

    return (
        <div className="flex flex-col items-center justify-center mt-12 px-4">
            <div>
                <div className="flex flex-col sm:flex-row items-stretch gap-x-4 gap-y-8">
                    <div className="max-w-[50rem]">
                        {currentProject.images &&
                            <ImageSlider images={currentProject.images} />
                        }
                    </div>
                    <div className="w-full md:w-[20rem] h-full md:ml-4 flex flex-col gap-y-4 p-4">
                        <h1 className="text-5xl font-bold">{currentProject.name}</h1>
                        <h4 className="text-sm text-zinc-500">{currentProject.description}</h4>

                        <div className="flex flex-col gap-2 mt-4">
                            Technologies used:

                            {
                                currentProject.technologies.map((technology, index) => (
                                    <span key={index} className="text-zinc-500">{technology}</span>
                                ))
                            }
                        </div>
                        <div>
                            {
                                currentProject.link && (
                                    <a className="text-blue-500 hover:text-blue-600" href={currentProject.link} rel="noreferrer" target="_blank">
                                        {currentProject.link}
                                    </a>
                                )
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row items-center justify-between mt-6">
                    <div className="flex items-center justify-between w-full">
                        <ProjectButton onClick={handlePreviousProject}>
                            <FaAngleLeft className="text-2xl" />
                        </ProjectButton>

                        <div>{`Project ${currentIndex + 1} of ${projects.length}`}</div>

                        <ProjectButton onClick={handleNextProject}>
                            <FaAngleRight className="text-2xl" />
                        </ProjectButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSlider;
