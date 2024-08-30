import { FaReact, FaHtml5, FaGithub } from "react-icons/fa";
import { SiMongodb, SiTypescript, SiCsharp, SiMysql } from "react-icons/si";
import { ISkill } from "../interfaces/skills";

export const skills: ISkill[] = [
    {
        key: "html",
        name: "html",
        desc: "Having worked on numerous websites, I am well-versed in HTML, making it a cornerstone of my projects.",
        tags: ["websites"],
        icon: <FaHtml5 />,
    },
    {
        key: "css",
        name: "css",
        desc: "To enhance the visual appeal of websites, I consistently use CSS in all my projects.",
        tags: ["websites", "TailwindCSS", "SASS", "SCSS"],
        icon: <FaHtml5 />,
    },
    {
        key: "react",
        name: "react",
        desc: "I primarily develop with React or Next.js, utilizing React extensively for both professional and personal projects.",
        tags: ["websites", "NextJS"],
        icon: <FaReact />,
    },
    {
        key: "typescript",
        name: "typescript",
        desc: "TypeScript is my language of choice, heavily utilized in both my professional work and personal endeavors.",
        tags: ["NodeJS", "JavaScript", "websites"],
        icon: <SiTypescript />,
    },
    {
        key: "C#",
        name: "c#",
        desc: "I have used C# for scripting in Unity and for small .NET projects, enhancing my understanding of object-oriented programming.",
        tags: ["Unity", "games", ".NET"],
        icon: <SiCsharp />,
    },
    {
        key: "git-github",
        name: "git & github",
        desc: "I regularly use Git and GitHub across work, academic, and personal projects to manage version control effectively.",
        tags: ["Version Control"],
        icon: <FaGithub />,
    },
    {
        key: "mysql",
        name: "mysql",
        desc: "MySQL has been a reliable database solution for both my personal projects and academic coursework.",
        tags: ["databases"],
        icon: <SiMysql />,
    },
    {
        key: "mongodb",
        name: "mongodb",
        desc: "I've leveraged MongoDB for several personal and school projects, appreciating its flexibility and scalability.",
        tags: ["databases", "NodeJS"],
        icon: <SiMongodb />,
    },
];
