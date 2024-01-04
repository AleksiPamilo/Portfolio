import React from "react";

type ProjectPaginationProps = {
    projects: any[];
    current: number;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

const ProjectPagination: React.FC<ProjectPaginationProps> = ({ projects, current, setCurrent }) => (
    <div className="hidden md:flex gap-2">
        {
            `Project ${current + 1} of ${projects.length}`
        }
    </div>
);

export default ProjectPagination;
