interface ProjectImage {
    url: string;
    alt: string;
}

export interface IProject {
    name: string;
    description: string;
    images: ProjectImage[] | null;
    technologies: string[];
    link?: string;
}