import ForumX from "../assets/ForumX.png";
import ForumXLight from "../assets/ForumX-light.png";
import ForumXAdmin from "../assets/ForumX_admin.png";
import ForumXAdminLight from "../assets/ForumX_admin-light.png";

type Image = {
    url: string;
    alt: string;
}

export type Project = {
    name: string;
    description: string;
    images: Image[] | null;
    technologies: string[];
    link?: string;
}

const projects: Project[] = [
    {
        name: "ForumX",
        description: "ForumX is a forum application that I created for fun as a free time project. It is a full-stack application that uses React for the frontend, Firebase for the backend and TailwindCSS for styling.",
        images: [
            {
                url: ForumX,
                alt: "ForumX"
            },
            {
                url: ForumXLight,
                alt: "ForumX-light"
            },
            {
                url: ForumXAdmin,
                alt: "ForumX-admin"
            },

            {
                url: ForumXAdminLight,
                alt: "ForumX-admin-light"
            }
        ],
        technologies: ["React", "Firebase", "TypeScript", "TailwindCSS"],
        link: "https://forum.aleksipamilo.dev/"
    },
    {
        name: "Portfolio",
        description: "This is my portfolio website. It is a full-stack application that uses React for the frontend, Firebase for the backend and TailwindCSS for styling.",
        images: null,
        technologies: ["React", "Firebase", "TypeScript", "TailwindCSS"],
        link: "https://aleksipamilo.dev/"
    }
];

export default projects;
