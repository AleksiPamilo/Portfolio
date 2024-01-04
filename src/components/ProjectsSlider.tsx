import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { IProject } from "../interfaces/project";
import ImageSlider from "./ImageSlider";
import ProjectButton from "./project/ProjectButton";
import ProjectPagination from "./project/ProjectPagination";

type ProjectsSliderProps = {
    projects: IProject[];
};

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ projects }) => {
    const [current, setCurrent] = React.useState<number>(0);
    const currentProject = projects[current];

    return (
        <div className="flex flex-col items-center justify-center mt-12 px-4">
            <div>
                <div className="flex flex-col sm:flex-row items-stretch gap-x-4 gap-y-8">
                    {
                        currentProject.images && (
                            <div className="max-w-[50rem]">
                                <ImageSlider images={currentProject.images} />
                            </div>
                        )
                    }
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

                <div className="w-full flex items-center justify-between mt-6">
                    <ProjectButton onClick={() => { }}>
                        <FaAngleLeft className="text-2xl" />
                    </ProjectButton>

                    <ProjectPagination
                        current={current}
                        setCurrent={setCurrent}
                        projects={projects}
                    />

                    <ProjectButton onClick={() => { }}>
                        <FaAngleRight className="text-2xl" />
                    </ProjectButton>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSlider;
