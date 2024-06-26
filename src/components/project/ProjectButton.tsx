import React from 'react';

type ProjectButtonProps = {
    onClick: () => void;
    children: React.ReactNode;
};

const ProjectButton: React.FC<ProjectButtonProps> = ({ onClick, children }) => (
    <button
        onClick={onClick}
        className="p-3 bg-emerald-400 rounded-md hover:bg-emerald-300 flex items-center justify-center w-24 md:w-44 h-12"
    >
        <span className="flex items-center justify-center gap-2">
            {children}
        </span>
    </button>
);

export default ProjectButton;
