import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Project } from "../data/Projects";
import ImageSlider from "./ImageSlider";

type ProjectsSliderProps = {
    projects: Project[];
};

const ProjectsSlider: React.FC<ProjectsSliderProps> = ({ projects }) => {
    const [current, setCurrent] = React.useState<number>(0);
    const currentProject = projects[current];

    return (
        <div className="relative">
            <div className="flex items-center justify-center">
                <div key={currentProject.name} className="flex flex-col items-center mt-8 w-full h-full gap-4">
                    <h2 className="text-3xl font-bold">{currentProject.name}</h2>
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className={`${currentProject?.images ? "max-w-[25rem]" : "max-w-[40rem]"} text-center`}>
                            <div>
                                <p>{currentProject.description}</p>
                                <h4 className="my-2">Technologies used:</h4>
                                <ul>
                                    {
                                        currentProject.technologies.map((tech, index) => (
                                            <li key={index}>{tech}</li>
                                        ))
                                    }
                                </ul>
                            </div>

                            {currentProject.link && (
                                <div className="mt-3">
                                    <a href={currentProject.link} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">
                                        {currentProject.link}
                                    </a>
                                </div>
                            )}
                        </div>
                        {
                            currentProject.images && (
                                <div className="w-[300px] h-[180px] md:w-[500px] md:h-[280px]">
                                    <ImageSlider images={currentProject.images} link={currentProject.link} />
                                </div>
                            )
                        }
                    </div>
                    <div className="flex w-full items-center justify-between mt-8">
                        <button
                            onClick={() => setCurrent(current === 0 ? projects.length - 1 : current - 1)}
                            className="p-3 bg-zinc-900 rounded-md hover:bg-zinc-800"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <FaAngleLeft className="w-6 h-6 text-white" />
                                <p>Previous Project</p>
                            </span>
                        </button>
                        <div className="hidden md:flex gap-2">
                            {projects.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-4 h-4 rounded-full bg-zinc-500 cursor-pointer ${index === current ? "bg-opacity-100" : "bg-opacity-50"}`}
                                    onClick={() => setCurrent(index)}
                                />
                            ))}
                        </div>
                        <button
                            onClick={() => setCurrent(current === 0 ? projects.length - 1 : current - 1)}
                            className="p-3 bg-zinc-900 rounded-md hover:bg-zinc-800"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <p>Next Project</p>
                                <FaAngleRight className="w-6 h-6 text-white" />
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectsSlider;
