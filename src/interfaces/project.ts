interface ProjectImage {
    url: string;
    alt: string;
}

export interface IProject {
    name: string;
    slug: string;
    description: string;
    images: ProjectImage[] | null;
    technologies: string[];
    startDate: string;
    finishDate: string | null;
    gradient: string;
    tags?: string[];
    link?: string;
}